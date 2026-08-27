"use client";

import { useState } from "react";
import Script from "next/script";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";
import { CertificateOfContribution } from "../components/CertificateOfContribution";
import { DonationReceipt } from "../components/DonationReceipt";

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
  verified?: boolean;
  preview?: boolean;
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
    city: "",
    state: "",
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
      if (pin.length !== 6) {
        updated.city = "";
        updated.state = "";
      } else {
        if (pin.startsWith("400") || pin.startsWith("410")) {
          updated.city = "Navi Mumbai / Panvel";
          updated.state = "Maharashtra";
        } else if (pin.startsWith("411")) {
          updated.city = "Pune";
          updated.state = "Maharashtra";
        } else if (pin.startsWith("422")) {
          updated.city = "Nashik";
          updated.state = "Maharashtra";
        } else {
          updated.city = "";
          updated.state = "";
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
      const createOrder = await fetch(`${apiUrl}/api/donations/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donorName: donor.name, email: donor.email, phone: donor.phone, amount: effectiveAmount, purpose: cause }),
      });
      const orderPayload = await createOrder.json().catch(() => null);
      if (!createOrder.ok) {
        throw new Error(orderPayload?.message || "Unable to start secure checkout. Please try again.");
      }
      const order = orderPayload;

      const activeKey = order?.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      const activeOrderId = order?.orderId || order?.order_id;
      const donationId = order?.donationId;
      if (!activeKey || !activeOrderId || !donationId) {
        throw new Error("Secure checkout could not be prepared. Please try again.");
      }

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
          const payId = response?.razorpay_payment_id || "";
          const ordId = response?.razorpay_order_id || activeOrderId || "";
          const sig = response?.razorpay_signature || "";

          try {
            if (!payId || !ordId || !sig) {
              throw new Error("Payment details were incomplete, so a receipt cannot be issued. Please contact us with your Razorpay payment details.");
            }
            const verification = await fetch(`${apiUrl}/api/donations/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ donationId, razorpay_payment_id: payId, razorpay_order_id: ordId, razorpay_signature: sig, amount: effectiveAmount, donorName: donor.name, email: donor.email }),
            });
            const verificationPayload = await verification.json().catch(() => null);
            if (!verification.ok || verificationPayload?.status !== "SUCCESS") {
              throw new Error(verificationPayload?.message || "Your payment could not be verified. Please contact us with your payment ID.");
            }

            const receiptNum = `KCF/${new Date().getFullYear()}/${donationId.replaceAll("-", "").slice(-5).toUpperCase()}`;
            setSuccessData({
              paymentId: payId,
              orderId: ordId,
              signature: sig,
              amount: Number(verificationPayload.amount) || effectiveAmount,
              date: new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date()),
              receiptNumber: receiptNum,
              verified: true,
            });
            setSuccessViewTab("receipt");

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
            try {
              const existingDonations = JSON.parse(localStorage.getItem("kautike_admin_donations") || "[]");
              localStorage.setItem("kautike_admin_donations", JSON.stringify([newRecord, ...existingDonations]));
            } catch (_) {}
          } catch (verificationError) {
            console.error("Payment verification failed", verificationError);
            setCheckoutError(verificationError instanceof Error ? verificationError.message : "Your payment could not be verified. Please contact us with your payment ID.");
          } finally {
            setLoading(false);
          }
          try { window.scrollTo({ top: 140, behavior: "smooth" }); } catch (_) {}
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
        
        <div className="donate-main-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "32px", alignItems: "start" }}>
          
          {/* ── LEFT PANEL: INSPIRING STORY & IMPACT ── */}
          <div style={{ display: successData ? "none" : undefined, background: "#FFFFFF", borderRadius: "14px", border: "1.5px solid #E5E7EB", borderTop: "4px solid #F5A623", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            
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
                  Kautike Charitable Foundation is registered under Section 12A &amp; 80G of the Income Tax Act. Official 80G tax receipt and Certificate of Contribution are issued immediately upon successful donation.
                </div>
                <div style={{ marginTop: "8px" }}>
                  <a href="/receipt-preview" target="_blank" rel="noopener noreferrer" style={{ fontSize: "11.5px", fontWeight: 800, color: "#134B36", textDecoration: "underline", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    👁️ View Sample 80G Tax Receipt ➔
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* ── RIGHT PANEL: THE EXACT DONATION FORM ── */}
          <div style={{ width: "100%", gridColumn: successData ? "1 / -1" : undefined }}>
            
            {/* Payment Success View: Official Certificate of Contribution */}
            {successData ? (
              <div style={{ background: "#FFFFFF", padding: "24px clamp(12px, 2.5vw, 30px)", borderRadius: "16px", border: "1.5px solid #E5E7EB", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
                <div style={{ textAlign: "center", marginBottom: "16px" }}>
                  <div style={{ fontSize: "36px", marginBottom: "4px" }}>🎉</div>
                  <h2 style={{ margin: "0 0 4px", fontSize: "22px", color: "#0F172A", fontWeight: 800 }}>
                    Thank You, {donor.name || "Generous Donor"}!
                  </h2>
                  <p style={{ color: "#64748B", fontSize: "13.5px", margin: "0" }}>
                    Your donation of <strong>₹{successData.amount.toLocaleString("en-IN")}</strong> has been successfully received and verified. Your 80G tax receipt and official certificate are ready below.
                  </p>
                </div>

                <div className="donation-success-tabs no-print" role="tablist" aria-label="Donation documents">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={successViewTab === "receipt"}
                    className={successViewTab === "receipt" ? "active" : ""}
                    onClick={() => setSuccessViewTab("receipt")}
                  >
                    Donation Receipt (80G)
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={successViewTab === "certificate"}
                    className={successViewTab === "certificate" ? "active" : ""}
                    onClick={() => setSuccessViewTab("certificate")}
                  >
                    Certificate of Contribution
                  </button>
                </div>

                {successViewTab === "receipt" ? (
                  <DonationReceipt
                    donorName={donor.name || "Generous Donor"}
                    email={donor.email}
                    phone={donor.phone}
                    address={[donor.address, donor.city, donor.state, donor.pincode].filter(Boolean).join(", ")}
                    pan={donor.pan}
                    amount={successData.amount}
                    date={successData.date}
                    receiptNumber={successData.receiptNumber}
                    paymentId={successData.paymentId}
                    purpose={cause}
                    onClose={() => { setSuccessData(null); setStep(1); }}
                  />
                ) : (
                  <CertificateOfContribution
                    donorName={donor.name || "Generous Donor"}
                    amount={successData.amount}
                    date={successData.date}
                    onClose={() => { setSuccessData(null); setStep(1); }}
                  />
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
                          value={[donor.city, donor.state].filter(Boolean).join(", ")}
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
