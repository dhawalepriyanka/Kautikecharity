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
    if (finalAmount < 100) {
      setMessage({ text: "Please enter a donation amount of at least ₹100.", error: true });
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
        text: `Thank you, ${name}! Your ${freq === "monthly" ? "monthly" : "one-time"} donation pledge of ₹${finalAmount.toLocaleString("en-IN")} has been received. Our team will contact you shortly to complete payment.`,
      });
      setName("");
      setEmail("");
      setPhone("");
      setCustomAmount("");
    } catch (err) {
      setMessage({
        text: err instanceof Error ? err.message : "Something went wrong. Please try again.",
        error: true,
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="donation-card" onSubmit={handleSubmit}>
      <p className="card-title">Choose your contribution</p>

      {/* Monthly / One-time toggle */}
      <div className="toggle-group" role="radiogroup" aria-label="Donation frequency">
        <button
          type="button"
          className={`toggle-btn ${freq === "monthly" ? "active" : ""}`}
          onClick={() => setFreq("monthly")}
        >
          Give Monthly ♥
        </button>
        <button
          type="button"
          className={`toggle-btn ${freq === "once" ? "active" : ""}`}
          onClick={() => setFreq("once")}
        >
          Give One-Time
        </button>
      </div>

      {/* Preset Amounts */}
      <div className="amounts-grid">
        {amountPresets.map((val) => (
          <button
            key={val}
            type="button"
            className={`amount-btn ${!customAmount && amount === val ? "selected" : ""}`}
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
          min="100"
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
