import { onlyPost, sendJson, verifyDonationPayment } from "../_payments.js";

export default async function handler(request, response) {
  if (!onlyPost(request, response)) return;
  try {
    sendJson(response, 200, await verifyDonationPayment(request.body));
  } catch (error) {
    console.error("Payment verification failed", error);
    sendJson(response, error.status ?? 500, { message: error.status ? error.message : "We could not verify this payment." });
  }
}
