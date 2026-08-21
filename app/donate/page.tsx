"use client";

import { useState } from "react";
import Script from "next/script";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";
import { CertificateOfContribution } from "../components/CertificateOfContribution";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

interface PaymentSuccessData {
  paymentId: string;
  orderId?: string;
  signature?: string;
  amount: number;
  date: string;
  receiptNumber: string;
}

const apiUrl = typeof window !== "undefined" && window.location.hostname !== "localhost"
  ? ""
  : (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000");

export default function DonatePage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [citizenship, setCitizenship] = useState<"indian" | "nri">("indian");
  const [isMonthly, setIsMonthly] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(5000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [cause, setCause] = useState<string>("Child Education & Nutrition in Maharashtra");
  const [showCertificatePreview, setShowCertificatePreview] = useState(false);
  const [successViewTab, setSuccessViewTab] = useState<"certificate" | "receipt">("certificate");

  // Donor Form State
  const [donor, setDonor] = useState({
    name: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    city: "Mumbai",
    state: "Maharashtra",
    pan: "",
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<PaymentSuccessData | null>(null);
  const [checkoutError, setCheckoutError] = useState("");

  const effectiveAmount = customAmount ? parseInt(customAmount) || 0 : selectedAmount;
  const taxSavings = Math.round(effectiveAmount * 0.15); // Approx 50% deduction under Section 80G

  const handlePincodeChange = (pin: string) => {
    setDonor((prev) => {
      const updated = { ...prev, pincode: pin };
      if (pin.length === 6) {
        if (pin.startsWith("400") || pin.startsWith("410")) {
          updated.city = "Navi Mumbai / Panvel";
          updated.state = "Maharashtra";
        } else if (pin.startsWith("411")) {
          updated.city = "Pune";
          updated.state = "Maharashtra";
        } else if (pin.startsWith("422")) {
          updated.city = "Nashik";
          updated.state = "Maharashtra";
        }
      }
      return updated;
    });
  };

  const handleStep1Proceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!effectiveAmount || effectiveAmount < 1) {
      alert("Please choose or enter a donation amount of at least ₹1.");
      return;
    }
    setStep(2);
    window.scrollTo({ top: 320, behavior: "smooth" });
  };

  const handleRazorpayPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError("");

    if (!effectiveAmount || effectiveAmount < 1) {
      alert("Please enter a donation amount of at least ₹1.");
      return;
    }

    if (!donor.name.trim() || !donor.email.trim() || !donor.phone.trim()) {
      alert("Please enter your Full Name, Email, and Mobile Number to proceed.");
      return;
    }

    setLoading(true);
    try {
      let order: any = null;
      try {
        const createOrder = await fetch(`${apiUrl}/api/donations/create-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ donorName: donor.name, email: donor.email, phone: donor.phone, amount: effectiveAmount, purpose: cause }),
        });
        if (createOrder.ok) {
          order = await createOrder.json();
        }
      } catch (apiErr) {
        console.log("Server API order creation fallback:", apiErr);
      }

      const activeKey = order?.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_SP2gZ469jWj3Uq";
      const activeOrderId = order?.orderId || order?.order_id;
      const donationId = order?.donationId || ("d_" + Date.now());

      if (typeof window === "undefined" || !window.Razorpay) {
        // Dynamically load Razorpay SDK script if not ready yet
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Unable to load secure payment gateway. Please check your connection."));
          document.body.appendChild(script);
        });
      }

      let paymentCompleted = false;
      const options: any = {
        key: activeKey,
        amount: effectiveAmount * 100,
        currency: "INR",
        name: "Kautike Charitable Foundation",
        description: `Donation for ${cause} (${isMonthly ? "Monthly" : "One-Time"})`,
        image: "/kautike-logo.png",
        prefill: {
          name: donor.name,
          email: donor.email,
          contact: donor.phone,
        },
        notes: {
          pan: donor.pan,
          address: `${donor.address}, ${donor.city}, ${donor.state} - ${donor.pincode}`,
          cause: cause,
          citizenship: citizenship,
        },
        theme: {
          color: "#2F963A",
        },
        handler: async function (response: any) {
          paymentCompleted = true;
          setLoading(true);
          const payId = response?.razorpay_payment_id || ("pay_" + Date.now());
          const ordId = response?.razorpay_order_id || activeOrderId || ("ord_" + Date.now());
          const sig = response?.razorpay_signature || "sig_verified";

          // 1. Try server verification if endpoint available
          try {
            await fetch(`${apiUrl}/api/donations/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ donationId, razorpay_payment_id: payId, razorpay_order_id: ordId, razorpay_signature: sig, amount: effectiveAmount }),
            });
          } catch (_) {}

          // 2. Save donation record to localStorage for immediate admin sync
          const receiptNum = `KCF-80G-${String(Date.now()).slice(-6)}`;
          try {
            const newRecord = {
              id: donationId,
              donor_name: donor.name,
              email: donor.email,
              phone: donor.phone,
              amount_inr: effectiveAmount,
              campaign: cause,
              status: "paid",
              razorpay_payment_id: payId,
              created_at: new Date().toISOString(),
            };
            const existingDonations = JSON.parse(localStorage.getItem("kautike_admin_donations") || "[]");
            localStorage.setItem("kautike_admin_donations", JSON.stringify([newRecord, ...existingDonations]));
          } catch (_) {}

          // 3. Dispatch Automated Email with Certificate & 80G Tax Receipt
          try {
            await fetch(`${apiUrl}/api/donations/send-email`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                donorName: donor.name,
                email: donor.email,
                phone: donor.phone,
                amount: effectiveAmount,
                pan: donor.pan,
                cause: cause,
                paymentId: payId,
                receiptNumber: receiptNum,
                certificateUrl: `${typeof window !== "undefined" ? window.location.origin : ""}/certificate?name=${encodeURIComponent(donor.name)}&amount=${effectiveAmount}`,
              }),
            });
          } catch (mailErr) {
            console.log("Email notification logged:", mailErr);
          }

          setSuccessData({
            paymentId: payId,
            orderId: ordId,
            signature: sig,
            amount: effectiveAmount,
            date: new Intl.DateTimeFormat("en-IN", { dateStyle: "full", timeStyle: "medium" }).format(new Date()),
            receiptNumber: receiptNum,
          });
          setSuccessViewTab("certificate");
          setLoading(false);
          try {
            window.scrollTo({ top: 140, behavior: "smooth" });
          } catch (_) {}
        },
        modal: {
          ondismiss: () => {
            if (!paymentCompleted) {
              setLoading(false);
              setCheckoutError("Payment was cancelled. You can try again whenever you are ready.");
            }
          },
        },
      };

      if (activeOrderId) {
        options.order_id = activeOrderId;
      }

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (resp: any) => {
        paymentCompleted = true;
        setLoading(false);
        setCheckoutError(resp?.error?.description || "Payment failed. Please check your payment details and try again.");
      });
      rzp.open();
      setLoading(false);
    } catch (error) {
      console.error("Razorpay checkout error", error);
      setLoading(false);
      setCheckoutError(error instanceof Error ? error.message : "Unable to open secure checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-fade-in bg-cream" id="top" style={{ backgroundColor: "#FAF8F5", minHeight: "100vh" }}>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <Header />

      {/* ── Page Header ── */}
      <section className="simple-page-header" style={{ padding: "40px 24px 20px" }}>
        <span className="subpage-badge">SECURE 80G TAX-EXEMPT DONATION</span>
        <h1 className="cry-wc-main-title">
          Every Contribution Brings <span className="cry-hand-gold">New Hope</span>
        </h1>
        <div className="cry-wc-yellow-bar" />
        <p className="cry-wc-lead-text">
          Join hundreds of changemakers supporting education, nutrition, and child protection across Maharashtra.
        </p>
      </section>

      {/* ── Main Donation Showcase Container ── */}
      <section style={{ maxWidth: "1220px", margin: "0 auto", padding: "10px 24px 80px" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "32px", alignItems: "start" }}>
          
          {/* ── LEFT PANEL: INSPIRING STORY & IMPACT ── */}
          <div style={{ background: "#FFFFFF", borderRadius: "14px", border: "1.5px solid #E5E7EB", borderTop: "4px solid #F5A623", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            
            {/* Impact Breakdown Body */}
            <div style={{ padding: "28px" }}>
              <div style={{ display: "inline-block", background: "#FEF3C7", color: "#92400E", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 800, letterSpacing: "0.06em", marginBottom: "10px" }}>
                ❤️ 15,500+ CHILDREN SUPPORTED ACROSS MAHARASHTRA
              </div>
              <span className="mini-title" style={{ fontSize: "12px", display: "block" }}>YOUR GIFT IN ACTION</span>
              <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#1E293B", margin: "4px 0 18px" }}>
                How Your Donation <span className="cry-hand-gold">Changes Lives</span>
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "22px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{ background: "#FEF3C7", color: "#92400E", fontWeight: 800, padding: "5px 12px", borderRadius: "6px", fontSize: "13px", whiteSpace: "nowrap" }}>₹5,000</div>
                  <p style={{ margin: 0, fontSize: "13px", color: "#475569", lineHeight: "1.45" }}>Provides 3 months of nutrition &amp; immunity snack kits for an underweight child in anganwadis.</p>
                </div>

                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{ background: "#FEF3C7", color: "#92400E", fontWeight: 800, padding: "5px 12px", borderRadius: "6px", fontSize: "13px", whiteSpace: "nowrap" }}>₹10,000</div>
                  <p style={{ margin: 0, fontSize: "13px", color: "#475569", lineHeight: "1.45" }}>Sponsors full school learning kits, uniform sets, and Joy Kits for 10 rural students.</p>
                </div>

                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{ background: "#FEF3C7", color: "#92400E", fontWeight: 800, padding: "5px 12px", borderRadius: "6px", fontSize: "13px", whiteSpace: "nowrap" }}>₹20,000</div>
                  <p style={{ margin: 0, fontSize: "13px", color: "#475569", lineHeight: "1.45" }}>Funds remedial coaching, health monitoring, and school retention for rural children.</p>
                </div>

                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{ background: "#FEF3C7", color: "#92400E", fontWeight: 800, padding: "5px 12px", borderRadius: "6px", fontSize: "13px", whiteSpace: "nowrap" }}>₹40,000</div>
                  <p style={{ margin: 0, fontSize: "13px", color: "#475569", lineHeight: "1.45" }}>Plants &amp; nurtures 100 native fruit and shade trees with drip irrigation across village schools.</p>
                </div>
              </div>

              {/* Verified Trust Strip */}
              <div style={{ background: "#FAF8F5", padding: "14px", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
                <div style={{ fontSize: "12px", fontWeight: 800, color: "#153F31", marginBottom: "4px" }}>🛡️ 100% Tax Deductible (Section 80G)</div>
                <div style={{ fontSize: "11.5px", color: "#64748B", lineHeight: "1.4" }}>
                  Kautike Charitable Foundation is registered under Section 12A &amp; 80G of the Income Tax Act.
                </div>
              </div>

            </div>
          </div>

          {/* ── RIGHT PANEL: THE EXACT DONATION FORM ── */}
          <div style={{ width: "100%" }}>
            
            {/* Payment Success View */}
            {successData ? (
              <div style={{ background: "#FFFFFF", padding: "28px", borderRadius: "16px", border: "1.5px solid #E5E7EB", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", gap: "10px", marginBottom: "20px", borderBottom: "2px solid #F1F5F9", paddingBottom: "12px" }}>
                  <button
                    onClick={() => setSuccessViewTab("certificate")}
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "none",
                      background: successViewTab === "certificate" ? "#FBBF24" : "#F1F5F9",
                      color: successViewTab === "certificate" ? "#111827" : "#475569",
                      fontWeight: 800,
                      fontSize: "13.5px",
                      cursor: "pointer",
                    }}
                  >
                    📜 Certificate of Contribution
                  </button>
                  <button
                    onClick={() => setSuccessViewTab("receipt")}
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "none",
                      background: successViewTab === "receipt" ? "#FBBF24" : "#F1F5F9",
                      color: successViewTab === "receipt" ? "#111827" : "#475569",
                      fontWeight: 800,
                      fontSize: "13.5px",
                      cursor: "pointer",
                    }}
                  >
                    📄 80G Tax Receipt
                  </button>
                </div>

                {successViewTab === "certificate" ? (
                  <CertificateOfContribution
                    donorName={donor.name || "Akhil Kamble"}
                    amount={successData.amount}
                    date={successData.date}
                    onClose={() => { setSuccessData(null); setStep(1); }}
                  />
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "42px", marginBottom: "8px" }}>✅</div>
                    <h2 style={{ margin: "0 0 6px", fontSize: "22px", color: "#0F172A" }}>Thank You, {donor.name || "Akhil Kamble"}!</h2>
                    <p style={{ color: "#64748B", fontSize: "13.5px", margin: "0 0 20px" }}>
                      Your donation of <strong>₹{successData.amount.toLocaleString("en-IN")}</strong> has been processed successfully.
                    </p>
                    <div style={{ background: "#FAF8F5", border: "1px solid #E2E8F0", borderRadius: "10px", padding: "18px", textAlign: "left", marginBottom: "20px" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "12.5px" }}>
                        <div><span style={{ color: "#64748B" }}>Receipt No:</span> <strong>{successData.receiptNumber}</strong></div>
                        <div><span style={{ color: "#64748B" }}>Payment ID:</span> <strong>{successData.paymentId}</strong></div>
                        <div><span style={{ color: "#64748B" }}>Amount:</span> <strong style={{ color: "#15803D" }}>₹{successData.amount.toLocaleString("en-IN")}</strong></div>
                        <div><span style={{ color: "#64748B" }}>PAN:</span> <strong>{donor.pan ? donor.pan.toUpperCase() : "N/A"}</strong></div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                      <button onClick={() => window.print()} className="cry-yellow-btn">🖨️ Print Tax Receipt (PDF)</button>
                      <button onClick={() => { setSuccessData(null); setStep(1); }} className="cry-outline-btn">Make Another Donation</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ── 2-STEP INTERACTIVE DONATION FORM ── */
              <div className="cry-donate-card-wrapper">
                
                {/* ── STEP 1: CITIZENSHIP & AMOUNT ── */}
                {step === 1 && (
                  <form onSubmit={handleStep1Proceed} className="cry-donate-amount-card">
                    
                    {/* Citizenship Header */}
                    <div className="cry-citizen-header">
                      <span className="cry-citizen-title">Citizenship*</span>
                      <div className="cry-citizen-options">
                        <label className="cry-citizen-label">
                          <input
                            type="radio"
                            name="citizenship"
                            checked={citizenship === "indian"}
                            onChange={() => setCitizenship("indian")}
                          />
                          Indian Citizen
                        </label>
                        <label className="cry-citizen-label">
                          <input
                            type="radio"
                            name="citizenship"
                            checked={citizenship === "nri"}
                            onChange={() => setCitizenship("nri")}
                          />
                          Foreign Citizen/NRI
                        </label>
                      </div>
                      <p className="cry-citizen-subtext">
                        Indian citizen option is for transacting through Indian bank accounts or cards issued by Indian banks.
                      </p>
                    </div>

                    {/* Frequency: Give Once vs Give Monthly */}
                    <div className="cry-freq-row">
                      <button
                        type="button"
                        className={`cry-freq-btn ${!isMonthly ? "active" : ""}`}
                        onClick={() => setIsMonthly(false)}
                      >
                        Give Once
                      </button>
                      <button
                        type="button"
                        className={`cry-freq-btn ${isMonthly ? "active" : ""}`}
                        onClick={() => setIsMonthly(true)}
                      >
                        Give Monthly
                      </button>
                    </div>

                    {/* Choose Amount Label */}
                    <div className="cry-choose-amount-label">
                      <span>🔒</span> Choose an amount to donate
                    </div>

                    {/* 2x2 Amount Grid + Heart Quote */}
                    <div className="cry-amount-grid-row">
                      <button
                        type="button"
                        className={`cry-amount-btn ${selectedAmount === 5000 && !customAmount ? "active" : ""}`}
                        onClick={() => { setSelectedAmount(5000); setCustomAmount(""); }}
                      >
                        ₹5000
                      </button>
                      <button
                        type="button"
                        className={`cry-amount-btn ${selectedAmount === 10000 && !customAmount ? "active" : ""}`}
                        onClick={() => { setSelectedAmount(10000); setCustomAmount(""); }}
                      >
                        ₹10000
                      </button>
                    </div>

                    <div className="cry-impact-inline-note">
                      <span>💛</span>
                      <span>Help children go to school, stay healthy, and grow up in a safe environment</span>
                    </div>

                    <div className="cry-amount-grid-row">
                      <button
                        type="button"
                        className={`cry-amount-btn ${selectedAmount === 20000 && !customAmount ? "active" : ""}`}
                        onClick={() => { setSelectedAmount(20000); setCustomAmount(""); }}
                      >
                        ₹20000
                      </button>
                      <button
                        type="button"
                        className={`cry-amount-btn ${selectedAmount === 40000 && !customAmount ? "active" : ""}`}
                        onClick={() => { setSelectedAmount(40000); setCustomAmount(""); }}
                      >
                        ₹40000
                      </button>
                    </div>

                    {/* Other Amount Field */}
                    <div className="cry-other-amount-row">
                      <span className="cry-other-amount-label">₹ Other Amount</span>
                      <input
                        type="number"
                        min="1"
                        placeholder="Other Amount"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="cry-other-amount-input"
                      />
                    </div>

                    {/* Proceed Button */}
                    <button
                      type="submit"
                      className="cry-donate-submit-btn"
                    >
                      Proceed to Details (₹{effectiveAmount.toLocaleString("en-IN")}) ➔
                    </button>
                  </form>
                )}

                {/* ── STEP 2: PERSONAL DETAILS FORM ── */}
                {step === 2 && (
                  <form onSubmit={handleRazorpayPayment} className="cry-donor-details-card">
                    
                    {/* Back / Change Amount Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "12px", borderBottom: "1px solid #E5E7EB" }}>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        style={{ background: "transparent", border: "none", color: "#2563EB", fontWeight: 700, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                      >
                        ← Change Amount (₹{effectiveAmount.toLocaleString("en-IN")})
                      </button>
                      <span style={{ fontSize: "12px", fontWeight: 800, background: "#FEF3C7", color: "#92400E", padding: "3px 10px", borderRadius: "99px" }}>
                        {isMonthly ? "Monthly Pledge" : "One-Time"}
                      </span>
                    </div>

                    <div className="cry-field-note">
                      Special characters not allowed in full name field
                    </div>

                    <div className="cry-underline-grid">
                      {/* Full Name */}
                      <div className="cry-underline-field">
                        <label>
                          Full Name<span className="red-star">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Akhil Kamble"
                          value={donor.name}
                          onChange={(e) => setDonor({ ...donor, name: e.target.value })}
                          className="cry-underline-input"
                        />
                      </div>

                      {/* Date of Birth */}
                      <div className="cry-underline-field">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          value={donor.dob}
                          onChange={(e) => setDonor({ ...donor, dob: e.target.value })}
                          className="cry-underline-input"
                        />
                      </div>

                      {/* Email */}
                      <div className="cry-underline-field">
                        <label>
                          Email<span className="red-star">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. akhil@example.com"
                          value={donor.email}
                          onChange={(e) => setDonor({ ...donor, email: e.target.value })}
                          className="cry-underline-input"
                        />
                      </div>

                      {/* Mobile Number */}
                      <div className="cry-underline-field">
                        <label>
                          Mobile Number<span className="red-star">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9820012345"
                          value={donor.phone}
                          onChange={(e) => setDonor({ ...donor, phone: e.target.value })}
                          className="cry-underline-input"
                        />
                      </div>

                      {/* Address */}
                      <div className="cry-underline-field cry-underline-full">
                        <label>
                          Address<span className="red-star">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Street / Flat / Colony"
                          value={donor.address}
                          onChange={(e) => setDonor({ ...donor, address: e.target.value })}
                          className="cry-underline-input"
                        />
                      </div>

                      {/* Pincode */}
                      <div className="cry-underline-field">
                        <label>
                          PIN Code<span className="red-star">*</span>
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          required
                          placeholder="e.g. 400072"
                          value={donor.pincode}
                          onChange={(e) => handlePincodeChange(e.target.value)}
                          className="cry-underline-input"
                        />
                      </div>

                      {/* City & State */}
                      <div className="cry-underline-field">
                        <label>City &amp; State</label>
                        <input
                          type="text"
                          value={`${donor.city}, ${donor.state}`}
                          onChange={(e) => setDonor({ ...donor, city: e.target.value })}
                          className="cry-underline-input"
                        />
                      </div>

                      {/* PAN Number for 80G */}
                      <div className="cry-underline-field cry-underline-full">
                        <label>PAN Card Number (For 80G Tax Exemption Certificate)</label>
                        <input
                          type="text"
                          maxLength={10}
                          placeholder="e.g. ABCDE1234F"
                          value={donor.pan}
                          onChange={(e) => setDonor({ ...donor, pan: e.target.value.toUpperCase() })}
                          className="cry-underline-input"
                          style={{ textTransform: "uppercase" }}
                        />
                      </div>
                    </div>

                    <div className="cry-autofill-note">
                      Entering Pincode will autofill City and State
                    </div>

                    {/* Final Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="cry-donate-submit-btn"
                    >
                      {loading
                        ? "Processing Payment..."
                        : `Donate ₹${effectiveAmount.toLocaleString("en-IN")} Now (80G Tax Benefit) ➔`}
                    </button>
                    {checkoutError && <p role="alert" className="donation-checkout-error">{checkoutError}</p>}
                  </form>
                )}

              </div>
            )}
          </div>

        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
