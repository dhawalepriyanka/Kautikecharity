"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Overview = { total_paid: number; paid_count: number; pending_count: number; message_count: number };
type Donation = { id: string; donor_name: string; email: string; amount_inr: number; campaign: string; status: string; created_at: string };
type Message = { id: string; name: string; email: string; phone: string | null; message: string; created_at: string };
const apiUrl = "http://localhost:4000";

export default function AdminPage() {
  const [section, setSection] = useState("Overview");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [authorized, setAuthorized] = useState(false);
  const [overview, setOverview] = useState<Overview | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notice, setNotice] = useState("");
  const today = useMemo(() => new Intl.DateTimeFormat("en-IN", { dateStyle: "full" }).format(new Date()), []);
  const auth = () => ({ Authorization: `Basic ${btoa(`${credentials.username}:${credentials.password}`)}` });
  const request = async (path: string, method = "GET") => { const response = await fetch(`${apiUrl}${path}`, { method, headers: auth() }); const data = await response.json(); if (!response.ok) throw new Error(data.message ?? "Unable to load data."); return data; };
  const load = async () => { try { const [dashboard, donationRows, messageRows] = await Promise.all([request("/api/admin/overview"), request("/api/admin/donations"), request("/api/admin/messages")]); setOverview(dashboard); setDonations(donationRows); setMessages(messageRows); } catch (error) { setNotice(error instanceof Error ? error.message : "Unable to connect to the API."); } };
  useEffect(() => { if (authorized) void load(); }, [authorized]);
  const login = async (event: FormEvent) => { event.preventDefault(); setNotice(""); try { await request("/api/admin/login", "POST"); setAuthorized(true); } catch (error) { setNotice(error instanceof Error ? error.message : "Sign-in failed."); } };

  if (!authorized) return <main className="admin-login-page"><form className="admin-login-card" onSubmit={login}><img src="/kautike-logo.png" alt="Kautike Charitable Foundation" /><p>KAUTIKE CHARITABLE FOUNDATION</p><h1>Admin sign in</h1><label>Username<input required value={credentials.username} onChange={(event) => setCredentials({ ...credentials, username: event.target.value })} /></label><label>Password<input required type="password" value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} /></label>{notice && <div className="admin-error">{notice}</div>}<button type="submit">Sign in</button><a href="/">← Back to website</a></form></main>;

  return <main className="admin-page"><aside className="admin-sidebar"><a className="admin-brand" href="/"><img src="/kautike-logo.png" alt="Kautike Charitable Foundation" /><span>Kautike<br /><small>Admin Portal</small></span></a><nav aria-label="Admin navigation">{["Overview", "Donations", "Messages"].map((item) => <button key={item} className={section === item ? "admin-nav-active" : ""} onClick={() => setSection(item)}>{item}</button>)}</nav><a className="admin-back-link" href="/">← View website</a></aside><section className="admin-main"><header className="admin-topbar"><div><p>ADMIN DASHBOARD</p><h1>{section}</h1></div><div className="admin-profile"><span>{today}</span><strong>{credentials.username}</strong></div></header>{notice && <div className="admin-notice" role="status">{notice}</div>}{section === "Overview" && <><div className="admin-summary-grid"><Metric label="Verified donations" value={`₹${Number(overview?.total_paid ?? 0).toLocaleString("en-IN")}`} note={`${overview?.paid_count ?? 0} successful payments`} /><Metric label="Pending donations" value={String(overview?.pending_count ?? 0)} note="Awaiting payment confirmation" /><Metric label="Contact messages" value={String(overview?.message_count ?? 0)} note="Saved in PostgreSQL" /><Metric label="Website status" value="Local" note="Not published" /></div><section className="admin-card"><div className="admin-card-heading"><div><p>DONATIONS</p><h2>Recent activity</h2></div><button onClick={() => { setSection("Donations"); void load(); }}>Refresh</button></div><DonationTable rows={donations.slice(0, 5)} /></section></>}{section === "Donations" && <section className="admin-card"><div className="admin-card-heading"><div><p>PAYMENTS</p><h2>All donation intents</h2></div><button onClick={() => void load()}>Refresh</button></div><DonationTable rows={donations} /></section>}{section === "Messages" && <section className="admin-card"><div className="admin-card-heading"><div><p>CONTACT</p><h2>Incoming messages</h2></div><button onClick={() => void load()}>Refresh</button></div><div className="admin-message-list">{messages.length ? messages.map((message) => <article key={message.id}><strong>{message.name}</strong><span>{message.email}{message.phone ? ` · ${message.phone}` : ""}</span><p>{message.message}</p></article>) : <p className="admin-empty-row">No saved messages yet.</p>}</div></section>}</section></main>;
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) { return <article className="admin-metric"><p>{label}</p><strong>{value}</strong><span>{note}</span></article>; }
function DonationTable({ rows }: { rows: Donation[] }) { return <div className="admin-table-wrap"><table><thead><tr><th>Donor</th><th>Cause</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>{rows.length ? rows.map((row) => <tr key={row.id}><td><strong>{row.donor_name}</strong><br /><small>{row.email}</small></td><td>{row.campaign}</td><td>₹{Number(row.amount_inr).toLocaleString("en-IN")}</td><td><span className="admin-status">{row.status}</span></td><td>{new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(row.created_at))}</td></tr>) : <tr><td colSpan={5} className="admin-empty-row">No donation records yet.</td></tr>}</tbody></table></div>; }
