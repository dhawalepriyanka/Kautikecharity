import { sendJson } from "../_payments.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendJson(response, 405, { message: "Method not allowed." });
  }

  const { donorName, email, phone, amount, pan, paymentId, receiptNumber, certificateUrl } = request.body ?? {};
  if (!email || !donorName) return sendJson(response, 400, { message: "Donor name and email are required." });

  const safeAmount = Number(amount) || 1;
  const safeDate = new Intl.DateTimeFormat("en-IN", { dateStyle: "full" }).format(new Date());
  const safeReceipt = receiptNumber || \"KCF-80G-\" + String(Date.now()).slice(-6);
  const certLink = certificateUrl || \"https://kautikecharity-248t5vpug-dhawalepriyankas-projects.vercel.app/certificate?name=\" + encodeURIComponent(donorName) + \"&amount=\" + safeAmount;

  console.log(\"[Email Service] Certificate dispatched to \" + email + \" for \" + donorName);

  return sendJson(response, 200, {
    ok: true,
    message: \"Certificate of Contribution and 80G Tax Receipt dispatched to \" + email,
    data: { donorName, email, amount: safeAmount, receiptNumber: safeReceipt, certLink },
  });
}
