"use client";

import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

const presetAmounts = [500, 1000, 2500, 5000, 10000];

export default function DonatePage() {
  const [isMonthly, setIsMonthly] = useState(true);
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [cause, setCause] = useState<string>("all");
  const [donor, setDonor] = useState({
    name: "",
    email: "",
    phone: "",
    pan: "",
  });
  const [completed, setCompleted] = useState(false);

  const effectiveAmount = customAmount ? parseInt(customAmount) || 0 : selectedAmount;
  const taxSavingsEstimate = Math.round(effectiveAmount * 0.15); // Approximate 50% deduction @ 30% slab

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!effectiveAmount || effectiveAmount < 100) {
      alert("Please select or enter an amount of at least ₹100.");
      return;
    }
    setCompleted(true);
  };

  return (
    <main className="page-fade-in" id="top">
      <Header />

      {/* Hero */}
      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <span className="subpage-badge">50% TAX EXEMPTION UNDER SECTION 80G</span>
          <h1>Every contribution fuels <span className="yellow-hand">hope &amp; dignity</span></h1>
          <p>
            Your gift provides daily nutrition, quality classroom learning kits, emergency shelter, and native tree saplings to nurture India&apos;s children and environment.
          </p>
        </div>
      </section>

      {/* Main Donation Container */}
      <section className="section-pad bg-white">
        <div className="donate-portal-grid">
          {/* Left Summary & Impact Info */}
          <div className="donate-portal-left">
            <div className="portal-impact-summary">
              <span className="mini-title">YOUR GENEROSITY IN ACTION</span>
              <h2>What your <span className="yellow-hand">donation</span> achieves</h2>
              
              <div className="impact-tier-item">
                <div className="tier-pill">₹500</div>
                <p>Funds 1 month of supplementary protein nutrition &amp; healthcare for an underweight infant.</p>
              </div>

              <div className="impact-tier-item">
                <div className="tier-pill">₹1,000</div>
                <p>Provides a complete school kit (bag, uniform, notebooks, geometry set) + remedial coaching.</p>
              </div>

              <div className="impact-tier-item">
                <div className="tier-pill">₹2,500</div>
                <p>Plants &amp; cares for 15 native trees with drip irrigation in a drought-hit rural school.</p>
              </div>

              <div className="impact-tier-item">
                <div className="tier-pill">₹5,000</div>
                <p>Sponsors a full year of secondary schooling scholarship for a vulnerable girl child.</p>
              </div>

              <div className="trust-callout">
                <h4>🛡️ Verified 80G Certified Non-Profit</h4>
                <p>All donations receive an official Form 10BE compliant 80G certificate for 50% Income Tax deduction.</p>
              </div>
            </div>
          </div>

          {/* Right Checkout Card */}
          <div className="donate-portal-right">
            {completed ? (
              <div className="donation-success-card text-center">
                <div style={{ fontSize: "52px", marginBottom: "16px" }}>🎉</div>
                <h3>Thank You for Your Generosity!</h3>
                <p>
                  You have pledged <strong>₹{effectiveAmount.toLocaleString("en-IN")} {isMonthly ? "/ month" : ""}</strong> to support <strong>{cause === "all" ? "Children Welfare & Tree Plantation" : cause}</strong>.
                </p>
                <div className="success-receipt-box">
                  <p>A provisional receipt and payment confirmation has been dispatched to <strong>{donor.email}</strong>.</p>
                  <p className="text-muted mt-2" style={{ fontSize: "12.5px" }}>Official 80G Tax Exemption Certificate will follow within 24 hours.</p>
                </div>
                <button onClick={() => setCompleted(false)} className="cry-yellow-btn mt-6">
                  Make Another Donation
                </button>
              </div>
            ) : (
              <form onSubmit={handleDonateSubmit} className="checkout-donation-card">
                {/* Frequency Toggle */}
                <div className="frequency-toggle-row">
                  <button
                    type="button"
                    className={`freq-btn ${isMonthly ? "active" : ""}`}
                    onClick={() => setIsMonthly(true)}
                  >
                    💛 Give Monthly (Recommended)
                  </button>
                  <button
                    type="button"
                    className={`freq-btn ${!isMonthly ? "active" : ""}`}
                    onClick={() => setIsMonthly(false)}
                  >
                    Give One-Time
                  </button>
                </div>

                {/* Amount Selector */}
                <div className="form-section-block">
                  <label className="block-label">Select Donation Amount</label>
                  <div className="preset-amounts-grid">
                    {presetAmounts.map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        className={`preset-btn ${selectedAmount === amt && !customAmount ? "active" : ""}`}
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount("");
                        }}
                      >
                        ₹{amt.toLocaleString("en-IN")}
                      </button>
                    ))}
                  </div>

                  <div className="custom-input-wrap">
                    <span className="rupee-symbol">₹</span>
                    <input
                      type="number"
                      placeholder="Or enter custom amount in INR"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                      }}
                    />
                  </div>

                  {effectiveAmount > 0 && (
                    <div className="tax-estimate-pill">
                      ✨ Estimated 80G Tax Deduction Benefit: <strong>₹{taxSavingsEstimate.toLocaleString("en-IN")}</strong>
                    </div>
                  )}
                </div>

                {/* Cause Preference */}
                <div className="form-section-block">
                  <label className="block-label">Allocate To Priority Cause</label>
                  <select value={cause} onChange={(e) => setCause(e.target.value)} className="cause-select">
                    <option value="all">Where Needed Most (Education, Nutrition &amp; Trees)</option>
                    <option value="Child Education & Retention">Child Education &amp; Remedial Schools</option>
                    <option value="Child Health & Nutrition">Malnutrition &amp; Healthcare Interventions</option>
                    <option value="Tree Plantation & Environment">Tree Plantation &amp; Eco Restoration</option>
                    <option value="Girl Child Empowerment">Girl Child Scholarships &amp; Dignity</option>
                  </select>
                </div>

                {/* Donor Details */}
                <div className="form-section-block">
                  <label className="block-label">Donor Information (For 80G Tax Receipt)</label>
                  <div className="donor-fields-grid">
                    <input
                      type="text"
                      required
                      placeholder="Full Name (as per PAN) *"
                      value={donor.name}
                      onChange={(e) => setDonor({ ...donor, name: e.target.value })}
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address (for receipt) *"
                      value={donor.email}
                      onChange={(e) => setDonor({ ...donor, email: e.target.value })}
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number *"
                      value={donor.phone}
                      onChange={(e) => setDonor({ ...donor, phone: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="PAN Number (Optional, for 80G)"
                      value={donor.pan}
                      onChange={(e) => setDonor({ ...donor, pan: e.target.value.toUpperCase() })}
                    />
                  </div>
                </div>

                <button type="submit" className="cry-yellow-btn donate-submit-btn">
                  ♥ Proceed to Secure Payment · ₹{effectiveAmount.toLocaleString("en-IN")} {isMonthly ? "/ Month" : ""}
                </button>

                <div className="security-badges-row">
                  <span>🔒 256-Bit SSL Encrypted</span>
                  <span>💳 UPI / NetBanking / Cards</span>
                  <span>📑 Instant 80G Receipt</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
