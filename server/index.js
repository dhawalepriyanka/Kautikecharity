import "dotenv/config";
import cors from "cors";
import express from "express";
import pg from "pg";
const { Pool } = pg; const app = express(); const port = Number(process.env.API_PORT ?? 4000); const pool = new Pool({ connectionString: process.env.DATABASE_URL });
app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? "http://localhost:3000" })); app.use(express.json());
app.get("/api/health", async (_request, response) => { try { await pool.query("SELECT 1"); response.json({ ok: true, database: "connected" }); } catch { response.status(503).json({ ok: false, database: "unavailable" }); } });
app.post("/api/donations", async (request, response) => { const { donorName, email, amount, campaign = "General fund" } = request.body ?? {}; if (!donorName?.trim() || !email?.trim() || !Number.isInteger(amount) || amount < 100) return response.status(400).json({ message: "Please provide a name, email and a donation amount of at least ₹100." }); try { const result = await pool.query("INSERT INTO donation_intents (donor_name, email, amount_inr, campaign) VALUES ($1, $2, $3, $4) RETURNING id", [donorName.trim(), email.trim().toLowerCase(), amount, campaign]); return response.status(201).json({ id: result.rows[0].id, message: "Donation request saved." }); } catch (error) { console.error("Unable to save donation request", error); return response.status(500).json({ message: "We could not save your donation request right now." }); } });
app.listen(port, () => console.log(`Kautike API listening on http://localhost:${port}`));
