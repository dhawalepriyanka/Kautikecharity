"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

const presetAmounts = [500, 1000, 2500, 5000, 10000];

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

export default function DonatePage() {
  const [activeTab, setActiveTab] = useState<"gateway" | "bank">("gateway");
  const [isMonthly, setIsMonthly] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [cause, setCause] = useState<string>("Child Education & Nutrition in Maharashtra");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  // Donor Form State
  const [donor, setDonor] = useState({
    name: "",
    email: "",
    phone: "",
    pan: "",
    address: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<PaymentSuccessData | null>(null);

  const effectiveAmount = customAmount ? parseInt(customAmount) || 0 : selectedAmount;
  const taxSavings = Math.round(effectiveAmount * 0.15); // Approx 50% deduction on 30% slab

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleRazorpayPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!effectiveAmount || effectiveAmount < 100) {
      alert("Please enter a donation amount of at least ₹100.");
      return;
    }

    if (!donor.name.trim() || !donor.email.trim() || !donor.phone.trim()) {
      alert("Please enter your Name, Email, and Mobile Number to proceed with Razorpay checkout.");
      return;
    }

    if (typeof window === "undefined" || !window.Razorpay) {
      alert("Razorpay checkout SDK is loading. Please check your internet connection or try again in a moment.");
      return;
    }

    if (isMonthly) {
      alert("Monthly donations need a Razorpay Subscription setup. Please select One-Time Donation for now.");
      return;
    }
    setLoading(true);
    try {
      const createOrder = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/donations/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donorName: donor.name, email: donor.email, phone: donor.phone, amount: effectiveAmount, purpose: cause }),
      });
      const order = await createOrder.json();
      if (!createOrder.ok) throw new Error(order.message ?? "Unable to create your donation order.");
      const options = {
      key: order.keyId,
      order_id: order.orderId,
      amount: order.amount,
      currency: order.currency,
      name: "Kautike Charitable Foundation",
      description: `Donation for ${cause} (${isMonthly ? "Monthly Pledge" : "One-Time"})`,
      image: "/kautike-logo.png",
      prefill: {
        name: donor.name,
        email: donor.email,
        contact: donor.phone,
      },
      notes: {
        cause: cause,
        donor_pan: donor.pan || "Not Provided",
        donor_city: donor.city || "Not Provided",
        frequency: isMonthly ? "Monthly" : "One-Time",
      },
      theme: {
        color: "#F5A623", // Kautike Gold Brand Color
      },
      config: {
        display: {
          blocks: {
            upi: {
              name: "Pay using UPI",
              instruments: [{ method: "upi" }],
            },
          },
          sequence: ["block.upi", "card", "netbanking", "wallet", "paylater"],
          preferences: { show_default_blocks: true },
        },
      },
      handler: async function (payment: any) {
        try {
          const verification = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/donations/verify-payment`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ donationId: order.donationId, donorName: donor.name, ...payment }) });
          const verified = await verification.json();
          if (!verification.ok || !verified.status) throw new Error(verified.message ?? "Payment could not be verified.");
          setSuccessData({ paymentId: verified.paymentId, orderId: order.orderId, signature: undefined, amount: verified.amount, date: new Date(verified.date).toLocaleString("en-IN"), receiptNumber: `KCF-${order.donationId.slice(0, 8).toUpperCase()}` });
        } catch (verificationError) { alert(verificationError instanceof Error ? verificationError.message : "Payment verification failed. Please contact us with your payment ID."); }
        finally { setLoading(false); }
      },
      modal: {
        ondismiss: function () {
          void fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/donations/${order.donationId}/status`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "cancelled" }) });
          setLoading(false);
        },
      },
    };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        void fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"}/api/donations/${order.donationId}/status`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "failed" }) });
        setLoading(false);
        alert(`Payment Failed: ${response.error.description || "Transaction could not be completed."}`);
      });
      rzp.open();
    } catch (err) {
      setLoading(false);
      console.error("Razorpay error:", err);
      alert(err instanceof Error ? err.message : "An error occurred opening the Razorpay checkout window.");
    }
  };

  return (
    <main className="page-fade-in" id="top">
      {/* Load Razorpay Standard Checkout SDK Script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <Header />

      <div className="cry-wc-page">

        {/* 1. Header Hero */}
        <div className="cry-wc-hero-header text-center">
          <span className="subpage-badge">SECURE 80G TAX EXEMPTION GATEWAY</span>
          <h1 className="cry-wc-main-title">Make a Donation for <span className="cry-hand-gold">Children&apos;s Future</span></h1>
          <div className="cry-wc-yellow-bar" />
          <p className="cry-wc-lead-text">
            Every contribution directly funds child education, nutrition meals, and grassroots community welfare in Maharashtra.
            All Indian donations are 50% tax exempt under Section 80G.
          </p>
        </div>

        {/* 2. Main Portal Grid */}
        <div className="about-container section-pad">
          <div className="donate-portal-grid">
            
            {/* Left Column: Impact Summary & Trust */}
            <div className="donate-portal-left">
              
              <div className="portal-impact-summary">
                <span className="mini-title">YOUR IMPACT AT A GLANCE</span>
                <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#1E293B", margin: "8px 0 20px" }}>
                  How your gift <span className="cry-hand-gold">transforms lives</span>
                </h2>

                <div className="impact-tier-item">
                  <div className="tier-pill">₹500</div>
                  <p>Provides 1 month of supplementary nutrition and immunity snack kits for an underweight child.</p>
                </div>

                <div className="impact-tier-item">
                  <div className="tier-pill">₹1,000</div>
                  <p>Sponsors a full school learning kit (school bag, Marathi workbooks, stationery, Joy Kit) for a rural student.</p>
                </div>

                <div className="impact-tier-item">
                  <div className="tier-pill">₹2,500</div>
                  <p>Funds remedial coaching, health monitoring, and school retention for 2 at-risk girls for an entire term.</p>
                </div>

                <div className="impact-tier-item">
                  <div className="tier-pill">₹5,000</div>
                  <p>Plants &amp; nurtures 25 native shade and fruit-bearing trees with drip irrigation in drought-prone rural schools.</p>
                </div>

                {/* Trust Callout */}
                <div className="trust-callout mt-8">
                  <h4>🛡️ 100% Verified Non-Profit · 80G Tax Benefits</h4>
                  <p>
                    Kautike Charitable Foundation is an officially registered non-profit trust in India.
                    Eligible donations receive an automated Form 10BE compliant 80G tax certificate.
                  </p>
                  <div className="payment-modes-row mt-4">
                    <span>UPI</span>
                    <span>Google Pay</span>
                    <span>PhonePe</span>
                    <span>Paytm</span>
                    <span>Net Banking</span>
                    <span>Debit/Credit Cards</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Checkout Interface */}
            <div className="donate-portal-right">
              
              {/* Payment Success View with Instant Printable 80G Receipt */}
              {successData ? (
                <div className="donation-success-card">
                  <div className="success-badge-icon">✅</div>
                  <span className="success-tag">PAYMENT SUCCESSFUL · 80G RECEIPT</span>
                  <h2>Thank You, {donor.name}!</h2>
                  <p className="success-sub">
                    Your generous donation of <strong>₹{successData.amount.toLocaleString("en-IN")}</strong> has been received successfully via Razorpay.
                  </p>

                  {/* Printable Official Receipt Box */}
                  <div className="official-receipt-box printable-area">
                    <div className="receipt-header-row">
                      <div>
                        <strong>Kautike Charitable Foundation</strong>
                        <p className="text-muted" style={{ fontSize: "12px", margin: "2px 0 0" }}>Regd. Non-Profit Charitable Trust · Maharashtra, India</p>
                      </div>
                      <div className="receipt-badge-80g">80G TAX EXEMPT</div>
                    </div>

                    <div className="receipt-divider" />

                    <div className="receipt-meta-grid">
                      <div>
                        <span className="meta-label">Receipt Number:</span>
                        <span className="meta-val">{successData.receiptNumber}</span>
                      </div>
                      <div>
                        <span className="meta-label">Payment ID:</span>
                        <span className="meta-val">{successData.paymentId}</span>
                      </div>
                      <div>
                        <span className="meta-label">Date &amp; Time:</span>
                        <span className="meta-val">{successData.date}</span>
                      </div>
                      <div>
                        <span className="meta-label">Donation Amount:</span>
                        <span className="meta-val" style={{ color: "#2E7D32", fontWeight: 800 }}>₹{successData.amount.toLocaleString("en-IN")}</span>
                      </div>
                      <div>
                        <span className="meta-label">Donor Name:</span>
                        <span className="meta-val">{donor.name}</span>
                      </div>
                      <div>
                        <span className="meta-label">Donor PAN:</span>
                        <span className="meta-val">{donor.pan ? donor.pan.toUpperCase() : "N/A"}</span>
                      </div>
                      <div>
                        <span className="meta-label">Email:</span>
                        <span className="meta-val">{donor.email}</span>
                      </div>
                      <div>
                        <span className="meta-label">Cause Supported:</span>
                        <span className="meta-val">{cause}</span>
                      </div>
                    </div>

                    <div className="receipt-footer-note">
                      <p>
                        * Eligible for 50% deduction under Section 80G of the Indian Income Tax Act.
                        An official digitally signed certificate has also been dispatched to <strong>{donor.email}</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="receipt-actions-row">
                    <button
                      onClick={() => window.print()}
                      className="cry-yellow-btn"
                    >
                      🖨️ Print / Save Receipt (PDF)
                    </button>
                    <button
                      onClick={() => {
                        setSuccessData(null);
                        setCustomAmount("");
                      }}
                      className="cry-outline-btn"
                    >
                      Make Another Donation
                    </button>
                  </div>
                </div>
              ) : (
                /* Donation Form */
                <div className="donation-card-box">
                  
                  {/* Mode Tabs */}
                  <div className="donation-tabs-header">
                    <button
                      type="button"
                      className={`d-tab-btn ${activeTab === "gateway" ? "active" : ""}`}
                      onClick={() => setActiveTab("gateway")}
                    >
                      💳 Online Payment (UPI / Cards / Netbanking)
                    </button>
                    <button
                      type="button"
                      className={`d-tab-btn ${activeTab === "bank" ? "active" : ""}`}
                      onClick={() => setActiveTab("bank")}
                    >
                      🏛️ Bank Transfer
                    </button>
                  </div>

                  {/* TAB 1: ONLINE PAYMENT GATEWAY CHECKOUT */}
                  {activeTab === "gateway" && (
                    <form onSubmit={handleRazorpayPayment} className="donation-form-body">
                      
                      {/* Frequency Toggle */}
                      <div className="frequency-selector">
                        <button
                          type="button"
                          className={`freq-btn ${!isMonthly ? "active" : ""}`}
                          onClick={() => setIsMonthly(false)}
                        >
                          One-Time Donation
                        </button>
                        <button
                          type="button"
                          className={`freq-btn ${isMonthly ? "active" : ""}`}
                          onClick={() => setIsMonthly(true)}
                        >
                          ♥ Give Monthly (Pledge)
                        </button>
                      </div>

                      {/* Preset Amount Buttons */}
                      <div className="amount-selection-block">
                        <label className="input-field-label">Choose an Amount (INR)</label>
                        <div className="preset-amounts-row">
                          {presetAmounts.map((amt) => (
                            <button
                              key={amt}
                              type="button"
                              className={`amt-pill ${selectedAmount === amt && !customAmount ? "selected" : ""}`}
                              onClick={() => {
                                setSelectedAmount(amt);
                                setCustomAmount("");
                              }}
                            >
                              ₹{amt.toLocaleString("en-IN")}
                            </button>
                          ))}
                        </div>

                        {/* Custom Amount Input */}
                        <div className="custom-amt-input-wrap mt-3">
                          <span className="currency-symbol">₹</span>
                          <input
                            type="number"
                            min="100"
                            placeholder="Or enter custom amount (Min. ₹100)"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            className="custom-amt-field"
                          />
                        </div>

                        {effectiveAmount > 0 && (
                          <div className="tax-benefit-banner">
                            💰 Estimated Tax Exemption: <strong>Save ~₹{taxSavings.toLocaleString("en-IN")}</strong> under Section 80G
                          </div>
                        )}
                      </div>

                      {/* Cause Dropdown */}
                      <div className="form-group mt-4">
                        <label className="input-field-label">Select Cause to Support</label>
                        <select
                          value={cause}
                          onChange={(e) => setCause(e.target.value)}
                          className="form-select-field"
                        >
                          <option value="Child Education & Retention in Maharashtra">Child Education &amp; School Kits</option>
                          <option value="Malnutrition & Healthcare Relief in Rural Maharashtra">Child Nutrition &amp; Healthcare Drives</option>
                          <option value="Community Welfare & Child Protection">Child Protection &amp; Anti-Child Labour</option>
                          <option value="Tree Plantation & Green Schools Drive">Tree Plantation &amp; Environmental Sustainability</option>
                          <option value="General Corpus Fund (Where Most Needed)">General Corpus Fund (Where Most Needed)</option>
                        </select>
                      </div>

                      {/* Donor Information */}
                      <div className="donor-info-block mt-6">
                        <h4 className="donor-info-title">Donor Information (For 80G Tax Receipt)</h4>
                        
                        <div className="form-grid-2col">
                          <div className="form-group">
                            <label className="input-field-label">Full Name *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Ramesh Patil"
                              value={donor.name}
                              onChange={(e) => setDonor({ ...donor, name: e.target.value })}
                              className="form-input-field"
                            />
                          </div>

                          <div className="form-group">
                            <label className="input-field-label">Email Address *</label>
                            <input
                              type="email"
                              required
                              placeholder="e.g. ramesh@gmail.com"
                              value={donor.email}
                              onChange={(e) => setDonor({ ...donor, email: e.target.value })}
                              className="form-input-field"
                            />
                          </div>
                        </div>

                        <div className="form-grid-2col mt-3">
                          <div className="form-group">
                            <label className="input-field-label">Mobile Number (For WhatsApp Receipt) *</label>
                            <input
                              type="tel"
                              required
                              placeholder="e.g. 9820012345"
                              value={donor.phone}
                              onChange={(e) => setDonor({ ...donor, phone: e.target.value })}
                              className="form-input-field"
                            />
                          </div>

                          <div className="form-group">
                            <label className="input-field-label">PAN Number (Mandatory for 80G deduction)</label>
                            <input
                              type="text"
                              maxLength={10}
                              placeholder="e.g. ABCDE1234F"
                              value={donor.pan}
                              onChange={(e) => setDonor({ ...donor, pan: e.target.value.toUpperCase() })}
                              className="form-input-field"
                              style={{ textTransform: "uppercase" }}
                            />
                          </div>
                        </div>

                        <div className="form-grid-2col mt-3">
                          <div className="form-group">
                            <label className="input-field-label">City</label>
                            <input
                              type="text"
                              placeholder="e.g. Mumbai / Pune"
                              value={donor.city}
                              onChange={(e) => setDonor({ ...donor, city: e.target.value })}
                              className="form-input-field"
                            />
                          </div>

                          <div className="form-group">
                            <label className="input-field-label">PIN Code</label>
                            <input
                              type="text"
                              maxLength={6}
                              placeholder="e.g. 400001"
                              value={donor.pincode}
                              onChange={(e) => setDonor({ ...donor, pincode: e.target.value })}
                              className="form-input-field"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="razorpay-submit-btn mt-6"
                      >
                        {loading ? "Opening Secure Payment..." : `♥ Proceed to Pay ₹${effectiveAmount.toLocaleString("en-IN")} Securely`}
                      </button>

                      <div className="security-notice-row">
                        <span>🔒 256-Bit SSL Encrypted</span>
                        <span>⚡ Instant 80G Tax Receipt</span>
                        <span>🛡️ PCI-DSS Certified</span>
                      </div>

                    </form>
                  )}

                  {/* Bank NEFT / RTGS Transfer */}
                  {activeTab === "bank" && (
                    <div className="bank-tab-content">
                      <h4 style={{ fontSize: "17px", fontWeight: 800, color: "#1E293B", marginBottom: "16px" }}>
                        Official Bank Account Details for NEFT / RTGS / IMPS
                      </h4>
                      <div className="bank-details-grid">
                        <div className="bank-row">
                          <span className="bank-lbl">Account Name:</span>
                          <span className="bank-val">KAUTIKE CHARITABLE FOUNDATION</span>
                        </div>
                        <div className="bank-row">
                          <span className="bank-lbl">Account Number:</span>
                          <span className="bank-val">
                            432109876543
                            <button
                              type="button"
                              onClick={() => copyToClipboard("432109876543", "acc")}
                              className="copy-mini-btn"
                            >
                              {copiedKey === "acc" ? "✓" : "Copy"}
                            </button>
                          </span>
                        </div>
                        <div className="bank-row">
                          <span className="bank-lbl">Bank Name:</span>
                          <span className="bank-val">State Bank of India (SBI)</span>
                        </div>
                        <div className="bank-row">
                          <span className="bank-lbl">IFSC Code:</span>
                          <span className="bank-val">
                            SBIN0001234
                            <button
                              type="button"
                              onClick={() => copyToClipboard("SBIN0001234", "ifsc")}
                              className="copy-mini-btn"
                            >
                              {copiedKey === "ifsc" ? "✓" : "Copy"}
                            </button>
                          </span>
                        </div>
                        <div className="bank-row">
                          <span className="bank-lbl">Branch:</span>
                          <span className="bank-val">Maharashtra, India</span>
                        </div>
                        <div className="bank-row">
                          <span className="bank-lbl">Account Type:</span>
                          <span className="bank-val">Current Account (Charitable Trust)</span>
                        </div>
                      </div>
                      <div className="bank-note mt-4">
                        💡 Please share your transaction UTR reference &amp; PAN card details to <strong>kautikecharitable@gmail.com</strong> to receive your Form 10BE tax exemption receipt.
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>
        </div>

        {/* 3. Razorpay Compliance Policies Footer Links */}
        <section className="razorpay-compliance-bar">
          <div className="about-container text-center">
            <p className="compliance-text">
              By proceeding with payment, you agree to our{" "}
              <a href="/terms">Terms &amp; Conditions</a>,{" "}
              <a href="/privacy">Privacy Policy</a>,{" "}
              <a href="/refund-policy">Refund Policy</a>, and{" "}
              <a href="/shipping-policy">80G Receipt &amp; Digital Delivery Policy</a>.
            </p>
          </div>
        </section>

      </div>

      <Footer />
      <FloatingActions />
    </main>
  );
}
