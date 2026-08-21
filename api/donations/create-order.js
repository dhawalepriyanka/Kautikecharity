import { createDonationOrder, onlyPost, sendJson } from "../_payments.js";

export default async function handler(request, response) {
  if (!onlyPost(request, response)) return;
  try {
    sendJson(response, 201, await createDonationOrder(request.body));
  } catch (error) {
    console.error("Razorpay order failed", error);
    const message = error.statusCode === 401
      ? "Razorpay authentication failed. Check the Vercel Test Mode credentials."
      : error.message === "DATABASE_URL is not configured on the deployed server."
        ? error.message
        : /ECONNREFUSED|ENOTFOUND|authentication failed|connection terminated/i.test(error.message ?? "")
          ? "The deployed database is unavailable. Set Vercel DATABASE_URL to an externally accessible PostgreSQL database."
          : "Unable to start checkout. Please try again.";
    sendJson(response, error.status ?? (error.statusCode === 401 ? 401 : 500), { message });
  }
}
