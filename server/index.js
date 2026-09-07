import "dotenv/config";
import crypto from "node:crypto";
import cors from "cors";
import express from "express";
import pg from "pg";
import Razorpay from "razorpay";
import nodemailer from "nodemailer";

const { Pool } = pg;
const app = express();
const port = Number(process.env.API_PORT ?? 4000);
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
const razorpayWebhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
const razorpay = razorpayKeyId && razorpayKeySecret
  ? new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret })
  : null;

// SMTP Transporter for sending donor receipts and certificates
const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
const smtpFrom = process.env.SMTP_FROM || (smtpUser ? `"Kautike Charitable Foundation" <${smtpUser}>` : '"Kautike Charitable Foundation" <info@kautikefoundation.org>');

const mailTransporter = (smtpUser && smtpPass)
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: { user: smtpUser, pass: smtpPass },
    })
  : null;

app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? "http://localhost:3000" }));
app.post("/api/donations/webhook", express.raw({ type: "application/json" }), async (request, response) => {
  const signature = request.headers["x-razorpay-signature"];
  if (!razorpayWebhookSecret || !signature) return response.status(400).json({ message: "Webhook is not configured." });
  const expected = crypto.createHmac("sha256", razorpayWebhookSecret).update(request.body).digest("hex");
  if (!safeEqual(signature, expected)) return response.status(400).json({ message: "Invalid webhook signature." });
  try {
    const event = JSON.parse(request.body.toString("utf8"));
    const payment = event.payload?.payment?.entity;
    if (!payment?.order_id) return response.status(200).json({ ok: true });
    const status = event.event === "payment.captured" ? "paid" : event.event === "payment.failed" ? "failed" : null;
    if (status) await pool.query("UPDATE donation_intents SET status = $1, razorpay_payment_id = COALESCE(razorpay_payment_id, $2), updated_at = NOW() WHERE razorpay_order_id = $3 AND status <> 'paid'", [status, payment.id, payment.order_id]);
    response.status(200).json({ ok: true });
  } catch (error) { console.error("Webhook processing failed", error); response.status(500).json({ message: "Webhook processing failed." }); }
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

function safeEqual(left, right) {
  const a = Buffer.from(left ?? "");
  const b = Buffer.from(right ?? "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function adminOnly(request, response, next) {
  const token = request.headers.authorization?.replace(/^Basic\s+/i, "");
  const [username, password] = token ? Buffer.from(token, "base64").toString("utf8").split(":") : [];
  if (!adminUsername || !adminPassword || !safeEqual(username, adminUsername) || !safeEqual(password, adminPassword)) {
    return response.status(401).json({ message: "Admin sign-in required." });
  }
  next();
}

app.get("/api/health", async (_request, response) => {
  try { await pool.query("SELECT 1"); response.json({ ok: true, database: "connected" }); }
  catch { response.status(503).json({ ok: false, database: "unavailable" }); }
});

app.post("/api/donations", async (request, response) => {
  const { donorName, email, amount, campaign = "General fund" } = request.body ?? {};
  if (!donorName?.trim() || !email?.trim() || !Number.isInteger(amount) || amount < 1) return response.status(400).json({ message: "Please provide a name, email and a donation amount of at least ₹1." });
  try {
    const result = await pool.query("INSERT INTO donation_intents (donor_name, email, amount_inr, campaign) VALUES ($1, $2, $3, $4) RETURNING id", [donorName.trim(), email.trim().toLowerCase(), amount, campaign]);
    response.status(201).json({ id: result.rows[0].id, message: "Donation request saved." });
  } catch (error) { console.error("Unable to save donation request", error); response.status(500).json({ message: "We could not save your donation request right now." }); }
});

app.post("/api/donations/create-order", async (request, response) => {
  const { donorName, email, phone, amount, purpose = "General Donation" } = request.body ?? {};
  if (!donorName?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim() ?? "") || !/^[0-9+\-\s()]{8,20}$/.test(phone?.trim() ?? "") || !Number.isInteger(amount) || amount < 1 || amount > 1000000) return response.status(400).json({ message: "Enter a valid name, email, mobile number, and amount from ₹1 to ₹10,00,000." });
  if (!razorpay) return response.status(503).json({ message: "Razorpay Test Mode is not configured on the server." });
  try {
    const created = await pool.query("INSERT INTO donation_intents (donor_name, email, phone, amount_inr, campaign) VALUES ($1,$2,$3,$4,$5) RETURNING id", [donorName.trim(), email.trim().toLowerCase(), phone.trim(), amount, String(purpose).slice(0, 180)]);
    const donationId = created.rows[0].id;
    const order = await razorpay.orders.create({ amount: amount * 100, currency: "INR", receipt: `kcf_${donationId.replaceAll("-", "").slice(0, 28)}`, notes: { donation_id: donationId, purpose } });
    await pool.query("UPDATE donation_intents SET razorpay_order_id = $1, updated_at = NOW() WHERE id = $2", [order.id, donationId]);
    response.status(201).json({ donationId, order_id: order.id, orderId: order.id, amount: order.amount, currency: order.currency, keyId: razorpayKeyId });
  } catch (error) {
    console.error("Razorpay order failed", error);
    const status = error?.statusCode === 401 ? 401 : 502;
    response.status(status).json({ message: status === 401 ? "Razorpay authentication failed. Check the server keys." : "Unable to start checkout. Please try again." });
  }
});

app.post("/api/donations/verify-payment", async (request, response) => {
  const { donationId, razorpay_payment_id: paymentId, razorpay_order_id: orderId, razorpay_signature: signature } = request.body ?? {};
  if (!donationId || !paymentId || !orderId || !signature || !razorpayKeySecret) return response.status(400).json({ message: "Payment verification data is incomplete." });
  try {
    const result = await pool.query("SELECT id, razorpay_order_id, amount_inr, status FROM donation_intents WHERE id = $1", [donationId]); const donation = result.rows[0];
    if (!donation?.razorpay_order_id || donation.razorpay_order_id !== orderId) return response.status(400).json({ message: "Payment order does not match this donation." });
    const expected = crypto.createHmac("sha256", razorpayKeySecret).update(`${donation.razorpay_order_id}|${paymentId}`).digest("hex");
    if (!safeEqual(signature, expected)) return response.status(400).json({ message: "Payment signature verification failed." });
    await pool.query("UPDATE donation_intents SET status = 'paid', razorpay_payment_id = $1, razorpay_signature = $2, updated_at = NOW() WHERE id = $3 AND status <> 'paid'", [paymentId, signature, donation.id]);
    response.json({ id: donation.id, donorName: request.body.donorName, amount: donation.amount_inr, paymentId, status: "SUCCESS", date: new Date().toISOString() });
  } catch (error) { console.error("Payment verification failed", error); response.status(500).json({ message: "We could not verify this payment." }); }
});

app.post("/api/donations/:id/status", async (request, response) => {
  const { status } = request.body ?? {};
  if (!["failed", "cancelled"].includes(status)) return response.status(400).json({ message: "Invalid donation status." });
  try {
    await pool.query("UPDATE donation_intents SET status = $1, updated_at = NOW() WHERE id = $2 AND status = 'pending'", [status, request.params.id]);
    response.json({ ok: true });
  } catch { response.status(500).json({ message: "Unable to update donation status." }); }
});

function buildDonorEmailHtml({ donorName, amount, receiptNumber, paymentId, date, purpose, pan }) {
  const formattedAmount = `₹ ${Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
  const displayDate = date || new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date());

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Donation Receipt & Certificate - Kautike Charitable Foundation</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #F8FAFC; color: #1E293B;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="620" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #E2E8F0;">
          <tr>
            <td style="background: linear-gradient(135deg, #0F3F2E 0%, #134B36 100%); padding: 32px 30px; text-align: center; color: #FFFFFF;">
              <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 800; letter-spacing: 0.05em;">KAUTIKE CHARITABLE FOUNDATION</h1>
              <p style="margin: 0; font-size: 12px; color: #D4AF37; font-weight: 600; letter-spacing: 0.04em;">EMPOWERING LIVES, ENRICHING SOCIETY</p>
              <div style="margin-top: 10px; display: inline-block; background: rgba(255,255,255,0.12); padding: 4px 12px; border-radius: 20px; font-size: 11px; color: #E2E8F0;">
                Reg. Under Section 12A & 80G • URN: AALCK6167AF20251
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 30px;">
              <h2 style="margin: 0 0 14px 0; font-size: 20px; color: #0F172A; font-weight: 700;">
                Dear ${donorName},
              </h2>
              <p style="font-size: 15px; line-height: 1.6; color: #334155; margin: 0 0 16px 0;">
                On behalf of the entire team and trustees at <strong>Kautike Charitable Foundation</strong>, we express our profound gratitude for your generous contribution of <strong style="color: #134B36;">${formattedAmount}</strong>.
              </p>
              <p style="font-size: 14.5px; line-height: 1.6; color: #475569; margin: 0 0 24px 0;">
                Your support directly fuels our grassroots initiatives in child education, nutrition, healthcare, and rural empowerment across Maharashtra.
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F8FAF8; border: 1.5px solid #E2EBE5; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 14px 20px; border-bottom: 1px solid #E2EBE5;">
                    <strong style="color: #134B36; font-size: 13px;">DONATION SUMMARY & 80G DETAILS</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px;">
                    <table width="100%" cellspacing="0" cellpadding="4" style="font-size: 13.5px;">
                      <tr>
                        <td width="40%" style="color: #64748B;">Donor Name:</td>
                        <td width="60%" style="font-weight: 700; color: #0F172A;">${donorName}</td>
                      </tr>
                      ${pan ? `<tr>
                        <td style="color: #64748B;">PAN Number:</td>
                        <td style="font-weight: 700; color: #0F172A;">${pan}</td>
                      </tr>` : ""}
                      <tr>
                        <td style="color: #64748B;">Amount Donated:</td>
                        <td style="font-weight: 800; color: #134B36; font-size: 15px;">${formattedAmount}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748B;">Receipt Number:</td>
                        <td style="font-weight: 700; color: #0F172A;">${receiptNumber}</td>
                      </tr>
                      ${paymentId ? `<tr>
                        <td style="color: #64748B;">Transaction ID:</td>
                        <td style="color: #334155; font-family: monospace;">${paymentId}</td>
                      </tr>` : ""}
                      <tr>
                        <td style="color: #64748B;">Date:</td>
                        <td style="color: #0F172A;">${displayDate}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748B;">Cause / Purpose:</td>
                        <td style="color: #0F172A;">${purpose || "General Donation"}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748B;">80G Tax Exemption:</td>
                        <td style="color: #134B36; font-weight: 700;">50% Deduction under Section 80G</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <div style="background-color: #FEF3C7; border: 1px solid #FCD34D; border-radius: 8px; padding: 14px 18px; margin-bottom: 24px;">
                <div style="font-weight: 700; color: #92400E; font-size: 13.5px; margin-bottom: 4px;">
                  📎 Attached Official PDF Documents:
                </div>
                <div style="font-size: 13px; color: #78350F; line-height: 1.5;">
                  1. <strong>Section 80G Tax Exemption Donation Receipt (PDF)</strong><br>
                  2. <strong>Official Certificate of Contribution (PDF)</strong>
                </div>
              </div>
              <p style="font-size: 13.5px; color: #475569; line-height: 1.5; margin: 0 0 24px 0;">
                Please preserve the attached 80G Tax Receipt for your income tax filings. For any queries, feel free to contact us at <a href="mailto:info@kautikefoundation.org" style="color: #134B36; font-weight: 600;">info@kautikefoundation.org</a>.
              </p>
              <table width="100%" cellspacing="0" cellpadding="0" style="border-top: 1px solid #E2E8F0; padding-top: 20px;">
                <tr>
                  <td>
                    <div style="font-size: 14px; font-weight: 800; color: #C59428;">VIJAY JADHAV</div>
                    <div style="font-size: 12px; font-weight: 700; color: #134B36;">Trustee, Kautike Charitable Foundation</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color: #FAF8F5; padding: 20px 30px; text-align: center; border-top: 1px solid #E2E8F0; font-size: 11.5px; color: #64748B; line-height: 1.5;">
              <strong>Kautike Charitable Foundation</strong><br>
              Office No. A-1, D'Souza Sadan, Lokmanya Tilak Nagar, 90 Feet Road, Sakinaka, Mumbai - 400 072<br>
              Helpline: +91 83560 08675 / 81083 62688 | <a href="https://kautikefoundation.org" style="color: #134B36;">kautikefoundation.org</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

app.post("/api/donations/send-email", async (request, response) => {
  const {
    donorName,
    email,
    amount,
    receiptNumber,
    paymentId,
    date,
    purpose,
    pan,
    receiptPdfBase64,
    certificatePdfBase64,
  } = request.body ?? {};

  if (!email || !donorName) {
    return response.status(400).json({ message: "Donor name and email required." });
  }

  const safeAmount = Number(amount) || 1;
  const safeReceipt = receiptNumber || `KCF/${new Date().getFullYear()}/${String(Date.now()).slice(-5)}`;
  const safeDate = date || new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date());
  const safePan = pan ? String(pan).trim().toUpperCase() : "";

  const attachments = [];

  if (receiptPdfBase64) {
    const cleanBase64 = receiptPdfBase64.replace(/^data:[^;]+;base64,/, "");
    attachments.push({
      filename: `Kautike_80G_Receipt_${safeReceipt.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`,
      content: Buffer.from(cleanBase64, "base64"),
      contentType: "application/pdf",
    });
  }

  if (certificatePdfBase64) {
    const cleanBase64 = certificatePdfBase64.replace(/^data:[^;]+;base64,/, "");
    attachments.push({
      filename: `Kautike_Certificate_${donorName.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`,
      content: Buffer.from(cleanBase64, "base64"),
      contentType: "application/pdf",
    });
  }

  const htmlContent = buildDonorEmailHtml({
    donorName,
    amount: safeAmount,
    receiptNumber: safeReceipt,
    paymentId,
    date: safeDate,
    purpose,
    pan: safePan,
  });

  const mailOptions = {
    from: smtpFrom,
    to: email,
    subject: `Official 80G Tax Receipt & Certificate of Contribution - ${donorName} (₹${safeAmount.toLocaleString("en-IN")})`,
    html: htmlContent,
    attachments,
  };

  try {
    if (mailTransporter) {
      const info = await mailTransporter.sendMail(mailOptions);
      console.log(`[Email Service] Live email sent to ${email} (MessageID: ${info.messageId}) with ${attachments.length} PDF attachments.`);
      return response.json({
        ok: true,
        sent: true,
        messageId: info.messageId,
        message: `Official 80G Tax Receipt and Certificate of Contribution sent to ${email}`,
      });
    } else {
      console.log(`[Email Service Simulation] SMTP not configured in .env. Email prepared for ${email} with ${attachments.length} attachments.`);
      return response.json({
        ok: true,
        sent: false,
        simulated: true,
        message: `Receipt & Certificate prepared for ${email}. (Add SMTP credentials to .env to deliver live emails directly to inbox)`,
      });
    }
  } catch (error) {
    console.error("[Email Service] Failed to send email:", error);
    return response.status(500).json({
      ok: false,
      message: error.message || "Failed to dispatch email.",
    });
  }
});

app.get("/api/donations/:id", adminOnly, async (request, response) => {
  const result = await pool.query("SELECT id, donor_name, email, phone, amount_inr, currency, campaign, status, razorpay_payment_id, created_at FROM donation_intents WHERE id = $1", [request.params.id]);
  if (!result.rows[0]) return response.status(404).json({ message: "Donation not found." });
  response.json(result.rows[0]);
});

app.post("/api/contact", async (request, response) => {
  const { name, email, phone, subject = "General inquiry", message } = request.body ?? {};
  if (!name?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim() ?? "") || !message?.trim()) {
    return response.status(400).json({ message: "Please enter a valid name, email, and message." });
  }

  const newMsg = {
    id: "msg-" + Date.now(),
    name: name.trim().slice(0, 120),
    email: email.trim().toLowerCase(),
    phone: phone?.trim().slice(0, 30) || null,
    message: `Subject: ${subject}\n\n${message.trim().slice(0, 5000)}`,
    created_at: new Date().toISOString(),
    status: "Unread",
  };

  // 1. Always save to JSON file fallback
  const existingMsgs = readJsonFile("messages.json", []);
  writeJsonFile("messages.json", [newMsg, ...existingMsgs]);

  // 2. Try PostgreSQL if available
  try {
    await pool.query("INSERT INTO contact_messages (name, email, phone, message) VALUES ($1, $2, $3, $4)", [newMsg.name, newMsg.email, newMsg.phone, newMsg.message]);
  } catch (err) {
    console.log("DB message save fallback used:", err.message);
  }

  response.status(201).json({ ok: true, message: "Message saved successfully.", data: newMsg });
});

app.post("/api/admin/login", adminOnly, (_request, response) => response.json({ ok: true }));

app.get("/api/admin/overview", adminOnly, async (_request, response) => {
  const fileMsgs = readJsonFile("messages.json", []);
  try {
    const [donations, messages] = await Promise.all([
      pool.query("SELECT COALESCE(SUM(amount_inr) FILTER (WHERE status = 'paid'), 0)::int AS total_paid, COUNT(*) FILTER (WHERE status = 'paid')::int AS paid_count, COUNT(*) FILTER (WHERE status = 'pending')::int AS pending_count FROM donation_intents"),
      pool.query("SELECT COUNT(*)::int AS count FROM contact_messages"),
    ]);
    response.json({ ...donations.rows[0], message_count: Math.max(messages.rows[0]?.count || 0, fileMsgs.length) });
  } catch (error) {
    response.json({ total_paid: 0, paid_count: 0, pending_count: 0, message_count: fileMsgs.length });
  }
});

app.get("/api/admin/donations", adminOnly, async (_request, response) => {
  try {
    const result = await pool.query("SELECT id, donor_name, email, amount_inr, campaign, status, created_at FROM donation_intents ORDER BY created_at DESC LIMIT 100");
    response.json(result.rows);
  } catch (error) {
    response.json([]);
  }
});

app.get("/api/admin/messages", adminOnly, async (_request, response) => {
  const fileMsgs = readJsonFile("messages.json", []);
  try {
    const result = await pool.query("SELECT id, name, email, phone, message, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 100");
    if (result.rows && result.rows.length > 0) {
      // Merge unique
      const ids = new Set(result.rows.map(r => r.id));
      const combined = [...result.rows, ...fileMsgs.filter(m => !ids.has(m.id))];
      return response.json(combined);
    }
  } catch (_) {}
  response.json(fileMsgs);
});

app.delete("/api/admin/messages/:id", adminOnly, async (request, response) => {
  const { id } = request.params;
  const fileMsgs = readJsonFile("messages.json", []);
  const filtered = fileMsgs.filter((m) => m.id !== id);
  writeJsonFile("messages.json", filtered);
  try {
    await pool.query("DELETE FROM contact_messages WHERE id = $1", [id]);
  } catch (_) {}
  response.json({ ok: true, message: "Message deleted." });
});

import fs from "node:fs";
import path from "node:path";

const dataDir = path.resolve("server/data");

function readJsonFile(filename, fallback) {
  try {
    const filePath = path.join(dataDir, filename);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch (err) {
    console.error("Error reading " + filename, err);
  }
  return fallback;
}

function writeJsonFile(filename, data) {
  try {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error writing " + filename, err);
    return false;
  }
}

app.get("/api/settings", (_req, res) => {
  res.json(readJsonFile("settings.json", null));
});

app.post("/api/admin/settings", adminOnly, (req, res) => {
  const ok = writeJsonFile("settings.json", req.body);
  if (ok) res.json({ ok: true, message: "Settings saved successfully." });
  else res.status(500).json({ message: "Failed to save settings to server." });
});

app.get("/api/stories", (_req, res) => {
  res.json(readJsonFile("stories.json", []));
});

app.post("/api/admin/stories", adminOnly, (req, res) => {
  const ok = writeJsonFile("stories.json", req.body);
  if (ok) res.json({ ok: true, message: "Stories saved successfully." });
  else res.status(500).json({ message: "Failed to save stories to server." });
});

app.get("/api/volunteers", (_req, res) => {
  res.json(readJsonFile("volunteers.json", []));
});

app.post("/api/admin/volunteers", adminOnly, (req, res) => {
  const ok = writeJsonFile("volunteers.json", req.body);
  if (ok) res.json({ ok: true, message: "Volunteers saved successfully." });
  else res.status(500).json({ message: "Failed to save volunteers to server." });
});

app.get("/api/pages", (_req, res) => {
  res.json(readJsonFile("pages.json", []));
});

app.post("/api/admin/pages", adminOnly, (req, res) => {
  const ok = writeJsonFile("pages.json", req.body);
  if (ok) res.json({ ok: true, message: "Pages saved successfully." });
  else res.status(500).json({ message: "Failed to save pages to server." });
});

app.get("/api/news", (_req, res) => {
  res.json(readJsonFile("news.json", []));
});

app.get("/api/events", (_req, res) => {
  res.json(readJsonFile("events.json", []));
});

app.post("/api/admin/events", adminOnly, (req, res) => {
  const ok = writeJsonFile("events.json", req.body);
  if (ok) res.json({ ok: true, message: "Events saved successfully." });
  else res.status(500).json({ message: "Failed to save events to server." });
});

app.listen(port, () => console.log(`Kautike API listening on http://localhost:${port}`));
