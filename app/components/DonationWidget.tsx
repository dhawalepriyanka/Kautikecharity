"use client";

import { FormEvent, useState } from "react";

const amountPresets = [250, 500, 1000, 2500];

export function DonationWidget() {
  const [freq, setFreq] = useState<"monthly" | "once">("monthly");
  const [amount, setAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);

  const finalAmount = customAmount ? parseInt(customAmount, 10) || 0 : amount;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (finalAmount < 1) {
      setMessage({ text: "Please enter a donation amount of at least ₹1.", error: true });
      return;
    }

    setSending(true);
    setMessage(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/donations`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            donorName: name,
            email,
            phone,
            amount: finalAmount,
            frequency: freq,
            campaign: "General fund",
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message ?? "Could not save your donation request.");
      }

      setMessage({
        text: `Thank you! Your donation intent of ₹${finalAmount.toLocaleString("en-IN")} has been registered.`,
      });
      setName("");
      setEmail("");
      setPhone("");
      setCustomAmount("");
    } catch (error) {
      setMessage({
        text: error instanceof Error ? error.message : "Could not complete donation.",
        error: true,
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="donation-widget" onSubmit={handleSubmit} id="donate">
      <div className="donation-widget-head">
        <div>
          <span className="mini-title">SUPPORT THE CAUSE</span>
          <h2>Make a Contribution</h2>
        </div>
        <div className="donation-toggle">
          <button
            type="button"
            className={freq === "monthly" ? "active" : ""}
            onClick={() => setFreq("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            className={freq === "once" ? "active" : ""}
            onClick={() => setFreq("once")}
          >
            One-time
          </button>
        </div>
      </div>

      {/* Amount Buttons */}
      <div className="donation-amounts">
        {amountPresets.map((val) => (
          <button
            type="button"
            key={val}
            className={amount === val && !customAmount ? "active" : ""}
            onClick={() => {
              setAmount(val);
              setCustomAmount("");
            }}
          >
            ₹{val.toLocaleString("en-IN")}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <label>
        Custom amount (₹)
        <input
          type="number"
          min="1"
          placeholder="Other amount"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
        />
      </label>

      <label>
        Full name *
        <input
          required
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Email address *
        <input
          required
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Phone number (Optional)
        <input
          type="tel"
          placeholder="+91 98765 43210"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>

      <button type="submit" className="submit-btn" disabled={sending}>
        {sending
          ? "Processing..."
          : `Donate ₹${finalAmount > 0 ? finalAmount.toLocaleString("en-IN") : "0"} ${
              freq === "monthly" ? "/ Month" : ""
            } →`}
      </button>

      <div className="form-trust">
        <span>🔒 Secure SSL</span>
        <span>🏷️ 80G Tax Exempt</span>
        <span>📜 Verified NGO</span>
      </div>

      {message && (
        <p
          className={`form-message ${message.error ? "error" : ""}`}
          aria-live="polite"
        >
          {message.text}
        </p>
      )}
    </form>
  );
}
