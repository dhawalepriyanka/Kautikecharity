import { onlyPost, sendJson, updateDonationStatus } from "../../_payments.js";

export default async function handler(request, response) {
  if (!onlyPost(request, response)) return;
  try {
    sendJson(response, 200, await updateDonationStatus(request.query.id, request.body?.status));
  } catch (error) {
    console.error("Donation status update failed", error);
    sendJson(response, error.status ?? 500, { message: error.status ? error.message : "Unable to update donation status." });
  }
}
