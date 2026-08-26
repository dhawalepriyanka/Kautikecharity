"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const newSubscriber = {
      id: "sub-" + Date.now(),
      email: email.trim().toLowerCase(),
      created_at: new Date().toISOString(),
    };

    // 1. Save to local storage for instant persistence
    try {
      const existingSubs = JSON.parse(localStorage.getItem("kautike_subscribers") || "[]");
      if (!existingSubs.some((s: any) => s.email === newSubscriber.email)) {
        localStorage.setItem("kautike_subscribers", JSON.stringify([newSubscriber, ...existingSubs]));
      }

      // Also record in admin messages
      const existingMsgs = JSON.parse(localStorage.getItem("kautike_admin_messages") || "[]");
      const msgEntry = {
        id: "msg-sub-" + Date.now(),
        name: "Newsletter Subscriber",
        email: newSubscriber.email,
        phone: null,
        message: `New newsletter subscription received for: ${newSubscriber.email}`,
        created_at: new Date().toISOString(),
        status: "Unread",
      };
      localStorage.setItem("kautike_admin_messages", JSON.stringify([msgEntry, ...existingMsgs]));
    } catch (_) {}

    // 2. Post to backend API if available
    try {
      await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email: newSubscriber.email,
          subject: "Newsletter Subscription",
          message: `Please subscribe ${newSubscriber.email} to foundation dispatches.`,
        }),
      });
    } catch (_) {}

    setStatus("success");
    setEmail("");
  }

  if (status === "success") {
    return (
      <div
        style={{
          background: "rgba(47, 143, 70, 0.2)",
          border: "1px solid #2f8f46",
          borderRadius: 12,
          padding: "10px 14px",
          marginTop: 12,
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "#86efac",
          fontSize: 13,
          animation: "fadeInUp 0.3s ease",
        }}
      >
        <span style={{ fontSize: 18 }}>✓</span>
        <div>
          <strong style={{ display: "block", color: "#fff" }}>Subscribed successfully!</strong>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>Thank you for joining our mission.</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          placeholder="Enter your email"
          className="newsletter-input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          required
          disabled={status === "loading"}
        />
        <button
          type="submit"
          className="newsletter-btn"
          disabled={status === "loading"}
          style={{ opacity: status === "loading" ? 0.7 : 1 }}
        >
          {status === "loading" ? "..." : "Join"}
        </button>
      </form>
      {status === "error" && (
        <small style={{ color: "#f87171", fontSize: 11, display: "block", marginTop: 6 }}>
          {errorMsg}
        </small>
      )}
    </div>
  );
}
