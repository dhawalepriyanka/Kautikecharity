import { sendJson } from "../_payments.js";
import nodemailer from "nodemailer";

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

  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
  const smtpFrom = process.env.SMTP_FROM || (smtpUser ? `"Kautike Charitable Foundation" <${smtpUser}>` : '"Kautike Charitable Foundation" <info@kautikefoundation.org>');

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: { user: smtpUser, pass: smtpPass },
      });

      const info = await transporter.sendMail({
        from: smtpFrom,
        to: email,
        subject: `Official 80G Tax Receipt & Certificate of Contribution - ${donorName} (₹${safeAmount.toLocaleString("en-IN")})`,
        html: htmlContent,
        attachments,
      });

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
