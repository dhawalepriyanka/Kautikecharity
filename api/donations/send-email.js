import { sendJson } from "../_payments.js";
import nodemailer from "nodemailer";
import { jsPDF } from "jspdf";
import { buildBirthdayEmailHtml } from "./send-birthday-wishes.js";
import fs from "node:fs";
import path from "node:path";

function saveDonorRecord(donor) {
  try {
    const dataDir = path.resolve("server/data");
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    const filePath = path.join(dataDir, "donors.json");
    let list = [];
    if (fs.existsSync(filePath)) {
      list = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
    const idx = list.findIndex((d) => d.email?.toLowerCase() === donor.email?.toLowerCase());
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...donor };
    } else {
      list.unshift(donor);
    }
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf8");
  } catch (_) {}
}

function generateFallbackReceiptPdf(donorName, amount, receiptNo, pan, date) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  doc.setFillColor(19, 75, 54);
  doc.rect(0, 0, 210, 42, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("KAUTIKE CHARITABLE FOUNDATION", 105, 18, { align: "center" });
  doc.setFontSize(10);
  doc.setTextColor(212, 175, 55);
  doc.text("EMPOWERING LIVES, ENRICHING SOCIETY", 105, 26, { align: "center" });
  doc.setFontSize(8.5);
  doc.setTextColor(226, 232, 240);
  doc.text("Regd. Under Section 12A & 80G of Income Tax Act | URN: AALCK6167AF20251", 105, 34, { align: "center" });

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("DONATION RECEIPT (SECTION 80G TAX EXEMPTION)", 105, 54, { align: "center" });

  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(18, 62, 174, 110, 3, 3, "FD");

  doc.setFontSize(11);
  doc.setTextColor(71, 85, 105);
  doc.setFont("helvetica", "bold");
  doc.text("Receipt Number:", 26, 76);
  doc.text("Date of Issue:", 115, 76);
  doc.text("Donor Name:", 26, 92);
  doc.text("Donation Amount:", 115, 92);
  doc.text("PAN Number:", 26, 108);
  doc.text("Payment Mode:", 115, 108);
  doc.text("Purpose / Cause:", 26, 124);
  doc.text("Tax Exemption:", 115, 124);

  doc.setTextColor(15, 23, 42);
  doc.text(receiptNo, 62, 76);
  doc.text(date || new Date().toLocaleDateString("en-IN", { dateStyle: "long" }), 148, 76);
  doc.setTextColor(19, 75, 54);
  doc.text(donorName, 62, 92);
  doc.text("INR " + Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 2 }), 156, 92);
  doc.setTextColor(15, 23, 42);
  doc.text(pan || "APPLIED / N.A.", 62, 108);
  doc.text("Online / Razorpay", 152, 108);
  doc.text("Child Education & Nutrition", 62, 124);
  doc.setTextColor(22, 101, 52);
  doc.text("50% Deductible (80G)", 152, 124);

  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  doc.text("Thank you for your valuable contribution towards child education drives of", 26, 144);
  doc.text("Kautike Charitable Foundation. This receipt is eligible for 50% tax deduction under Section 80G.", 26, 150);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(19, 75, 54);
  doc.text("For Kautike Charitable Foundation", 140, 195);
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("Authorized Signatory & Trustee", 140, 203);

  return Buffer.from(doc.output("arraybuffer"));
}

function generateFallbackCertificatePdf(donorName, amount, date) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(3);
  doc.rect(10, 10, 277, 190);
  doc.setLineWidth(0.8);
  doc.rect(14, 14, 269, 182);

  doc.setFillColor(19, 75, 54);
  doc.rect(14, 14, 269, 28, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("KAUTIKE CHARITABLE FOUNDATION", 148.5, 26, { align: "center" });
  doc.setFontSize(9);
  doc.setTextColor(212, 175, 55);
  doc.text("REGISTERED UNDER SECTION 12A & 80G • URN: AALCK6167AF20251", 148.5, 34, { align: "center" });

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(26);
  doc.setFont("times", "bold");
  doc.text("Certificate of Contribution", 148.5, 62, { align: "center" });
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("THIS CERTIFICATE IS PROUDLY PRESENTED TO", 148.5, 76, { align: "center" });

  doc.setFontSize(24);
  doc.setFont("times", "bolditalic");
  doc.setTextColor(19, 75, 54);
  doc.text(donorName, 148.5, 96, { align: "center" });
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1);
  doc.line(60, 102, 237, 102);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  doc.text("In deep appreciation of your generous support of INR " + Number(amount).toLocaleString("en-IN") + " towards", 148.5, 118, { align: "center" });
  doc.text("empowering underprivileged children through education, nutrition, and welfare in Maharashtra.", 148.5, 126, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("Date: " + (date || new Date().toLocaleDateString("en-IN", { dateStyle: "long" })), 35, 175);
  doc.text("Nilesh Kute", 230, 175, { align: "center" });
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("President & Founder", 230, 181, { align: "center" });
  doc.text("Kautike Charitable Foundation", 230, 186, { align: "center" });

  return Buffer.from(doc.output("arraybuffer"));
}

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

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendJson(response, 405, { message: "Method not allowed." });
  }

  const {
    donorName,
    email,
    phone,
    dob,
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
    return sendJson(response, 400, { message: "Donor name and email are required." });
  }

  const safeAmount = Number(amount) || 1;
  const safeReceipt = receiptNumber || `KCF/${new Date().getFullYear()}/${String(Date.now()).slice(-5)}`;
  const safeDate = date || new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date());
  const safePan = pan ? String(pan).trim().toUpperCase() : "";

  // Persist donor registry with DOB
  saveDonorRecord({
    name: donorName,
    email: email.toLowerCase(),
    phone: phone || "",
    dob: dob || "",
    last_amount: safeAmount,
    updated_at: new Date().toISOString(),
  });

  const attachments = [];

  // 1. Official 80G Tax Exemption Receipt Attachment
  let receiptBuffer = null;
  if (receiptPdfBase64 && typeof receiptPdfBase64 === "string" && receiptPdfBase64.length > 500) {
    try {
      const cleanBase64 = receiptPdfBase64.includes(",") ? receiptPdfBase64.split(",").pop() : receiptPdfBase64;
      const buf = Buffer.from(cleanBase64, "base64");
      if (buf.length > 500) {
        receiptBuffer = buf;
      }
    } catch (e) {
      console.error("[Email Receipt Base64 Parse Error]", e);
    }
  }

  if (!receiptBuffer) {
    receiptBuffer = generateFallbackReceiptPdf(donorName, safeAmount, safeReceipt, safePan, safeDate);
  }

  attachments.push({
    filename: `Kautike_80G_Receipt_${safeReceipt.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`,
    content: receiptBuffer,
    contentType: "application/pdf",
  });

  // 2. Official Certificate of Contribution Attachment
  let certificateBuffer = null;
  if (certificatePdfBase64 && typeof certificatePdfBase64 === "string" && certificatePdfBase64.length > 500) {
    try {
      const cleanBase64 = certificatePdfBase64.includes(",") ? certificatePdfBase64.split(",").pop() : certificatePdfBase64;
      const buf = Buffer.from(cleanBase64, "base64");
      if (buf.length > 500) {
        certificateBuffer = buf;
      }
    } catch (e) {
      console.error("[Email Certificate Base64 Parse Error]", e);
    }
  }

  if (!certificateBuffer) {
    certificateBuffer = generateFallbackCertificatePdf(donorName, safeAmount, safeDate);
  }

  attachments.push({
    filename: `Kautike_Certificate_${donorName.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`,
    content: certificateBuffer,
    contentType: "application/pdf",
  });

  const htmlContent = buildDonorEmailHtml({
    donorName,
    amount: safeAmount,
    receiptNumber: safeReceipt,
    paymentId,
    date: safeDate,
    purpose,
    pan: safePan,
  });

  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpUser = process.env.SMTP_USER || "kc.foundation2025@gmail.com";
  const smtpPass = process.env.SMTP_PASS || "rekswtyhdldnelso";
  const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
  const smtpFrom = process.env.SMTP_FROM || `"Kautike Charitable Foundation" <${smtpUser}>`;

  if (smtpUser && smtpPass) {
    try {
      const transportConfig = (smtpHost === "smtp.gmail.com" || smtpUser.endsWith("@gmail.com"))
        ? { service: "gmail", auth: { user: smtpUser, pass: smtpPass } }
        : { host: smtpHost, port: smtpPort, secure: smtpSecure, auth: { user: smtpUser, pass: smtpPass } };

      const transporter = nodemailer.createTransport(transportConfig);

      const info = await transporter.sendMail({
        from: smtpFrom,
        to: email,
        subject: `Official 80G Tax Receipt & Certificate of Contribution - ${donorName} (₹${safeAmount.toLocaleString("en-IN")})`,
        html: htmlContent,
        attachments,
      });

      // If today is the donor's birthday, automatically send the birthday wish email too!
      if (dob) {
        try {
          const now = new Date();
          const parts = String(dob).split("T")[0].split("-").map(Number);
          if (parts.length >= 3 && parts[1] === (now.getMonth() + 1) && parts[2] === now.getDate()) {
            const bHtml = buildBirthdayEmailHtml({ donorName });
            await transporter.sendMail({
              from: smtpFrom,
              to: email,
              subject: `🎂 Happy Birthday from Kautike Charitable Foundation, ${donorName}! 🎉`,
              html: bHtml,
            });
            console.log(`[Email Dispatch] Birthday greeting also sent immediately to ${donorName} (${email})`);
          }
        } catch (bErr) {
          console.error("[Birthday Dispatch Note]", bErr);
        }
      }

      return sendJson(response, 200, {
        ok: true,
        sent: true,
        messageId: info.messageId,
        message: `Official 80G Tax Receipt and Certificate of Contribution sent to ${email}`,
      });
    } catch (error) {
      console.error("[Email Handler Error]", error);
      return sendJson(response, 500, { ok: false, message: error.message || "Failed to send email." });
    }
  }

  return sendJson(response, 200, {
    ok: true,
    sent: false,
    simulated: true,
    message: `Receipt & Certificate prepared for ${email}.`,
  });
}
