import crypto from "node:crypto";
import pg from "pg";
import Razorpay from "razorpay";

const { Pool } = pg;
let pool;

function getPool() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured on the deployed server.");
  pool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  });
  return pool;
}

function getRazorpay() {
  const { RAZORPAY_KEY_ID: keyId, RAZORPAY_KEY_SECRET: keySecret } = process.env;
  if (!keyId || !keySecret) throw new Error("Razorpay is not configured on the deployed server.");
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

export function sendJson(response, status, body) {
  response.status(status).json(body);
}

export function onlyPost(request, response) {
  if (request.method === "POST") return true;
  response.setHeader("Allow", "POST");
  sendJson(response, 405, { message: "Method not allowed." });
  return false;
}

export async function createDonationOrder(body) {
  const { donorName, email, phone, amount, purpose = "General Donation" } = body ?? {};
  if (!donorName?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim() ?? "") || !/^[0-9+\-\s()]{8,20}$/.test(phone?.trim() ?? "") || !Number.isInteger(amount) || amount < 1 || amount > 1000000) {
    const error = new Error("Enter a valid name, email, mobile number, and amount from ₹1 to ₹10,00,000.");
    error.status = 400;
    throw error;
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const database = getPool();
  const created = await database.query(
    "INSERT INTO donation_intents (donor_name, email, phone, amount_inr, campaign) VALUES ($1,$2,$3,$4,$5) RETURNING id",
    [donorName.trim(), email.trim().toLowerCase(), phone.trim(), amount, String(purpose).slice(0, 180)],
  );
  const donationId = created.rows[0]?.id;
  if (!donationId) throw new Error("Could not prepare this donation. Please try again.");

  const order = await getRazorpay().orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: `kcf_${String(donationId).replaceAll("-", "").slice(0, 28)}`,
    notes: { donation_id: donationId, purpose },
  });
  await database.query(
    "UPDATE donation_intents SET razorpay_order_id = $1, updated_at = NOW() WHERE id = $2",
    [order.id, donationId],
  );

  return { donationId, order_id: order.id, orderId: order.id, amount: order.amount, currency: order.currency, keyId };
}

export async function verifyDonationPayment(body) {
  const { donationId, razorpay_payment_id: paymentId, razorpay_order_id: orderId, razorpay_signature: signature } = body ?? {};
  if (!donationId || !paymentId || !orderId || !signature) {
    const error = new Error("Payment verification data is incomplete.");
    error.status = 400;
    throw error;
  }

  const database = getPool();
  const result = await database.query(
    "SELECT id, donor_name, razorpay_order_id, amount_inr FROM donation_intents WHERE id = $1",
    [donationId],
  );
  const donation = result.rows[0];
  if (!donation?.razorpay_order_id || donation.razorpay_order_id !== orderId) {
    const error = new Error("Payment order does not match this donation.");
    error.status = 400;
    throw error;
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) throw new Error("Razorpay is not configured on the deployed server.");
  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${donation.razorpay_order_id}|${paymentId}`)
    .digest("hex");
  if (!safeEqual(signature, expectedSignature)) {
    const error = new Error("Payment signature verification failed.");
    error.status = 400;
    throw error;
  }

  await database.query(
    "UPDATE donation_intents SET status = 'paid', razorpay_payment_id = $1, razorpay_signature = $2, updated_at = NOW() WHERE id = $3 AND status <> 'paid'",
    [paymentId, signature, donation.id],
  );
  return { id: donation.id, donorName: donation.donor_name, paymentId, amount: donation.amount_inr, status: "SUCCESS", date: new Date().toISOString() };
}

export async function updateDonationStatus(id, status) {
  if (!id || !["failed", "cancelled"].includes(status)) {
    const error = new Error("Invalid donation status.");
    error.status = 400;
    throw error;
  }
  await getPool().query("UPDATE donation_intents SET status = $1, updated_at = NOW() WHERE id = $2 AND status = 'pending'", [status, id]);
  return { ok: true };
}

function safeEqual(left, right) {
  const a = Buffer.from(left ?? "");
  const b = Buffer.from(right ?? "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
