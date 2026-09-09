import { sendJson } from "../_payments.js";
import nodemailer from "nodemailer";
import pg from "pg";
import fs from "node:fs";
import path from "node:path";

const { Pool } = pg;
let pool;

function getPool() {
  if (!process.env.DATABASE_URL) return null;
  pool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  });
  return pool;
}

function readDonorsFromFile() {
  try {
    const filePath = path.resolve("server/data/donors.json");
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch (_) {}
  return [];
}

export function buildBirthdayEmailHtml({ donorName }) {
  const cleanName = donorName || "Valued Supporter";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Happy Birthday from Kautike Charitable Foundation!</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #FAF8F5; color: #1E293B;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FAF8F5; padding: 36px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1.5px solid #E2E8F0;">
          
          <!-- Festive Golden Emerald Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0F3F2E 0%, #134B36 50%, #1E5C45 100%); padding: 40px 30px 30px; text-align: center; color: #FFFFFF; position: relative;">
              <div style="font-size: 38px; margin-bottom: 8px;">🎂 ✨ 🎈</div>
              <h1 style="margin: 0 0 6px 0; font-size: 24px; font-weight: 800; letter-spacing: 0.04em;">HAPPY BIRTHDAY!</h1>
              <p style="margin: 0; font-size: 13px; color: #D4AF37; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">
                Kautike Charitable Foundation
              </p>
            </td>
          </tr>

          <!-- Main Greeting Content -->
          <tr>
            <td style="padding: 36px 32px 28px;">
              <h2 style="margin: 0 0 16px 0; font-size: 22px; color: #0F172A; font-weight: 800; text-align: center;">
                Dear <span style="color: #134B36;">${cleanName}</span>,
              </h2>

              <p style="font-size: 15.5px; line-height: 1.7; color: #334155; margin: 0 0 18px 0; text-align: center;">
                On your very special day, the children, trustees, and volunteers at <strong>Kautike Charitable Foundation</strong> send you our warmest greetings, joy, and heartfelt blessings!
              </p>

              <!-- Blessing Card Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(145deg, #F0FDF4 0%, #FEFCE8 100%); border: 1.5px solid #BBF7D0; border-radius: 12px; margin: 24px 0;">
                <tr>
                  <td style="padding: 24px 20px; text-align: center;">
                    <div style="font-size: 28px; margin-bottom: 8px;">🌟 🎁 🌟</div>
                    <div style="font-size: 16px; font-weight: 800; color: #14532D; margin-bottom: 8px;">
                      "A Heart That Gives Brings Eternal Light"
                    </div>
                    <div style="font-size: 14px; line-height: 1.6; color: #334155;">
                      Your generous support continues to illuminate the lives of underprivileged children across Maharashtra—empowering them with education, nutrition, and hope for a brighter future.
                    </div>
                  </td>
                </tr>
              </table>

              <p style="font-size: 15px; line-height: 1.7; color: #475569; margin: 0 0 24px 0; text-align: center;">
                May this coming year bring you and your loved ones abundant health, lasting happiness, peace, and boundless success!
              </p>

              <!-- Signatures -->
              <table width="100%" cellspacing="0" cellpadding="0" style="border-top: 1.5px solid #E2E8F0; padding-top: 24px; margin-top: 20px;">
                <tr>
                  <td width="50%" align="left" style="vertical-align: top;">
                    <div style="font-size: 13.5px; font-weight: 800; color: #0F172A;">Nilesh Kute</div>
                    <div style="font-size: 11.5px; font-weight: 600; color: #134B36;">President & Founder</div>
                    <div style="font-size: 11px; color: #64748B;">Kautike Charitable Foundation</div>
                  </td>
                  <td width="50%" align="right" style="vertical-align: top;">
                    <div style="font-size: 13.5px; font-weight: 800; color: #C59428;">Vijay Jadhav</div>
                    <div style="font-size: 11.5px; font-weight: 600; color: #134B36;">Trustee</div>
                    <div style="font-size: 11px; color: #64748B;">Kautike Charitable Foundation</div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #FAF8F5; padding: 22px 30px; text-align: center; border-top: 1px solid #E2E8F0; font-size: 11.5px; color: #64748B; line-height: 1.6;">
              <strong>Kautike Charitable Foundation</strong><br>
              Regd. Under Section 12A & 80G | URN: AALCK6167AF20251<br>
              Office No. A-1, D'Souza Sadan, Lokmanya Tilak Nagar, 90 Feet Road, Sakinaka, Mumbai - 400 072<br>
              Helpline: +91 83560 08675 | <a href="https://kautikefoundation.org" style="color: #134B36; font-weight: 600;">kautikefoundation.org</a>
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
  if (request.method !== "POST" && request.method !== "GET") {
    response.setHeader("Allow", "POST, GET");
    return sendJson(response, 405, { message: "Method not allowed." });
  }

  const { specificEmail, testName } = request.body ?? request.query ?? {};

  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpUser = process.env.SMTP_USER || "kc.foundation2025@gmail.com";
  const smtpPass = process.env.SMTP_PASS || "rekswtyhdldnelso";
  const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
  const smtpFrom = process.env.SMTP_FROM || `"Kautike Charitable Foundation" <${smtpUser}>`;

  const transporter = (smtpUser && smtpPass)
    ? nodemailer.createTransport(
        (smtpHost === "smtp.gmail.com" || smtpUser.endsWith("@gmail.com"))
          ? { service: "gmail", auth: { user: smtpUser, pass: smtpPass } }
          : { host: smtpHost, port: smtpPort, secure: smtpSecure, auth: { user: smtpUser, pass: smtpPass } }
      )
    : null;

  const currentYear = new Date().getFullYear();
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // 1-12
  const currentDay = today.getDate(); // 1-31

  const results = {
    checkedDate: `${currentDay.toString().padStart(2, "0")}-${currentMonth.toString().padStart(2, "0")}`,
    totalFound: 0,
    wishesSent: 0,
    alreadyWished: 0,
    details: [],
  };

  // If testing a single specific recipient
  if (specificEmail) {
    const donorName = testName || "Generous Donor";
    const html = buildBirthdayEmailHtml({ donorName });
    if (transporter) {
      try {
        const info = await transporter.sendMail({
          from: smtpFrom,
          to: specificEmail,
          subject: `🎂 Happy Birthday from Kautike Charitable Foundation, ${donorName}! 🎉`,
          html,
        });
        return sendJson(response, 200, {
          ok: true,
          message: `Birthday greeting email sent directly to ${specificEmail}`,
          messageId: info.messageId,
        });
      } catch (err) {
        return sendJson(response, 500, { ok: false, message: err.message });
      }
    } else {
      return sendJson(response, 200, {
        ok: true,
        simulated: true,
        message: `Birthday wish prepared for ${specificEmail}`,
      });
    }
  }

  // Scanning database for today's birthdays
  const poolInstance = getPool();
  let donorsToWish = [];

  if (poolInstance) {
    try {
      const res = await poolInstance.query(
        `SELECT DISTINCT ON (LOWER(email)) id, donor_name, email, dob, last_birthday_wish_year
         FROM donation_intents
         WHERE dob IS NOT NULL
           AND EXTRACT(MONTH FROM dob) = $1
           AND EXTRACT(DAY FROM dob) = $2
         ORDER BY LOWER(email), created_at DESC`,
        [currentMonth, currentDay]
      );
      donorsToWish = res.rows.map(r => ({
        id: r.id,
        name: r.donor_name,
        email: r.email,
        dob: r.dob,
        lastYear: r.last_birthday_wish_year,
      }));
    } catch (e) {
      console.warn("Database birthday query error:", e.message);
    }
  }

  // Fallback to local donors.json if needed
  const fileDonors = readDonorsFromFile();
  for (const d of fileDonors) {
    if (d.dob && d.email) {
      try {
        const parts = String(d.dob).split("T")[0].split("-").map(Number);
        if (parts.length >= 3) {
          const m = parts[1];
          const day = parts[2];
          if (m === currentMonth && day === currentDay) {
            if (!donorsToWish.some(x => x.email.toLowerCase() === d.email.toLowerCase())) {
              donorsToWish.push({
                id: d.id,
                name: d.name,
                email: d.email,
                dob: d.dob,
                lastYear: d.last_birthday_wish_year,
              });
            }
          }
        }
      } catch (_) {}
    }
  }

  results.totalFound = donorsToWish.length;

  for (const donor of donorsToWish) {
    if (donor.lastYear === currentYear) {
      results.alreadyWished++;
      results.details.push({ email: donor.email, status: "Already sent this year" });
      continue;
    }

    if (transporter && donor.email) {
      try {
        const html = buildBirthdayEmailHtml({ donorName: donor.name });
        const text = `Dear ${donor.name},\n\nHappy Birthday from everyone at Kautike Charitable Foundation! On this special day, we wish you joy, health, and happiness. Thank you for making a difference in the lives of children in need.\n\nWarm regards,\nNilesh Kute & Vijay Jadhav\nKautike Charitable Foundation`;
        await transporter.sendMail({
          from: smtpFrom,
          replyTo: smtpUser,
          to: donor.email,
          subject: `Happy Birthday from Kautike Charitable Foundation, ${donor.name}!`,
          text,
          html,
          headers: {
            "X-Entity-Ref-ID": `birthday-${donor.id || Date.now()}`,
            "List-Unsubscribe": "<mailto:kc.foundation2025@gmail.com?subject=unsubscribe>",
          },
        });

        results.wishesSent++;
        results.details.push({ email: donor.email, status: "Sent successfully" });

        // Update database
        if (poolInstance && donor.id) {
          try {
            await poolInstance.query("UPDATE donation_intents SET last_birthday_wish_year = $1 WHERE id = $2", [currentYear, donor.id]);
          } catch (_) {}
        }
      } catch (sendErr) {
        results.details.push({ email: donor.email, status: `Failed: ${sendErr.message}` });
      }
    }
  }

  return sendJson(response, 200, {
    ok: true,
    summary: results,
    message: `Processed ${results.totalFound} birthday(s) today. Sent: ${results.wishesSent}, Already sent: ${results.alreadyWished}.`,
  });
}
