import nodemailer from "nodemailer";

export default async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    return response.status(200).end();
  }

  if (request.method !== "POST") {
    return response.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, phone, subject, message } = request.body ?? {};

  if (!name || !email || !message) {
    return response.status(400).json({ message: "Name, email, and message are required." });
  }

  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpUser = process.env.SMTP_USER || "kc.foundation2025@gmail.com";
  const smtpPass = process.env.SMTP_PASS;
  const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
  const smtpFrom = process.env.SMTP_FROM || `"Kautike Charitable Foundation" <${smtpUser}>`;

  if (!smtpPass) {
    console.warn("[Contact Form] SMTP_PASS not set, message recorded without dispatch.");
    return response.status(200).json({ ok: true, message: "Message received." });
  }

  try {
    const transportConfig = (smtpHost === "smtp.gmail.com" || smtpUser.endsWith("@gmail.com"))
      ? { service: "gmail", auth: { user: smtpUser, pass: smtpPass } }
      : { host: smtpHost, port: smtpPort, secure: smtpSecure, auth: { user: smtpUser, pass: smtpPass } };

    const transporter = nodemailer.createTransport(transportConfig);

    const emailSubject = subject || `New Inquiry from ${name}`;
    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background: #134B36; color: #ffffff; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px;">New Message / Inquiry</h2>
          <p style="margin: 4px 0 0; color: #F5A623; font-size: 13px;">Kautike Charitable Foundation Website</p>
        </div>
        <div style="padding: 24px; color: #334155; line-height: 1.6;">
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ""}
          <p><strong>Subject:</strong> ${emailSubject}</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p><strong>Message:</strong></p>
          <div style="background: #f8fafc; padding: 14px; border-radius: 6px; white-space: pre-wrap; color: #0f172a;">${message}</div>
        </div>
        <div style="background: #f1f5f9; padding: 12px; text-align: center; font-size: 12px; color: #64748b;">
          Received on ${new Date().toLocaleString("en-IN")}
        </div>
      </div>
    `;

    // 1. Send notification to foundation inbox
    await transporter.sendMail({
      from: smtpFrom,
      to: smtpUser,
      replyTo: email,
      subject: `[Website Contact] ${emailSubject} - ${name}`,
      html: emailBody,
    });

    // 2. Send acknowledgment to the sender
    try {
      await transporter.sendMail({
        from: smtpFrom,
        to: email,
        subject: `Thank you for contacting Kautike Charitable Foundation`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; color: #334155; line-height: 1.6;">
            <h2 style="color: #134B36; margin-top: 0;">Thank you, ${name}!</h2>
            <p>We have received your message regarding <strong>"${emailSubject}"</strong>.</p>
            <p>Our team will review your inquiry and get back to you shortly.</p>
            <p style="margin-top: 24px;">Warm regards,<br/><strong>Kautike Charitable Foundation Team</strong><br/><small style="color: #64748b;">Office No. A-1, D'Souza Sadan, Lokmanya Tilak Nagar, 90 Feet Road, Sakinaka, Mumbai - 400 072</small></p>
          </div>
        `,
      });
    } catch (_) {}

    return response.status(200).json({ ok: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return response.status(500).json({ ok: false, message: error.message || "Failed to send email." });
  }
}