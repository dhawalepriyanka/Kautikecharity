"use client";

import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "80g-receipt",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 600);
  };

  return (
    <main className="page-fade-in" id="top">
      <Header />

      <div className="cry-wc-page">

        {/* 1. Hero Header */}
        <div className="cry-wc-hero-header text-center">
          <span className="subpage-badge">GET IN TOUCH</span>
          <h1 className="cry-wc-main-title">
            We are here to <span className="cry-hand-gold">listen &amp; assist</span>
          </h1>
          <div className="cry-wc-yellow-bar" />
          <p className="cry-wc-lead-text">
            Have a question regarding online donations, 80G tax exemption certificates, volunteer drives, or corporate CSR partnerships? Connect with our team directly.
          </p>
        </div>

        {/* 2. Top 3 Direct Contact Cards */}
        <section className="contact-quick-cards-section">
          <div className="about-container">
            <div className="contact-cards-grid">
              
              {/* Card 1: WhatsApp */}
              <div className="contact-quick-card">
                <div className="c-card-icon-wrap" style={{ background: "#DCFCE7", color: "#16A34A" }}>
                  💬
                </div>
                <h3>WhatsApp Helpline</h3>
                <p>Chat directly with our volunteer coordinator on WhatsApp for quick support.</p>
                <a
                  href="https://wa.me/918108362688?text=Hello%20Kautike%20Charitable%20Foundation,%20I%20would%20like%20to%20know%20more%20about%20your%20initiatives."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-action-link"
                >
                  Chat on WhatsApp ➔
                </a>
              </div>

              {/* Card 2: Phone Call */}
              <div className="contact-quick-card">
                <div className="c-card-icon-wrap" style={{ background: "#FEF3C7", color: "#D97706" }}>
                  📞
                </div>
                <h3>Call Our Office</h3>
                <p>Available Monday to Saturday, 9:30 AM – 6:30 PM IST.</p>
                <a href="tel:+918108362688" className="contact-action-link">
                  +91 810 836 2688 ➔
                </a>
              </div>

              {/* Card 3: Email */}
              <div className="contact-quick-card">
                <div className="c-card-icon-wrap" style={{ background: "#E0E7FF", color: "#4F46E5" }}>
                  ✉️
                </div>
                <h3>Email Inquiries</h3>
                <p>Send your queries, donation receipts, or proposal documents.</p>
                <a href="mailto:kautikecharitable@gmail.com" className="contact-action-link">
                  kautikecharitable@gmail.com ➔
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Main Content & Form Grid */}
        <section className="section-pad bg-white">
          <div className="about-container">
            <div className="contact-split-grid">
              
              {/* Left Column: NGO Transparency & Operation Hubs */}
              <div className="contact-info-column">
                
                <div className="contact-info-box">
                  <span className="mini-title">REGISTERED TRUST IDENTITY</span>
                  <h2 className="contact-box-title">
                    Head Office &amp; <span className="cry-hand-gold">Field Operations</span>
                  </h2>
                  <p className="contact-desc">
                    Kautike Charitable Foundation is a registered non-profit charitable organization dedicated to child education, nutrition, and community welfare across Maharashtra.
                  </p>

                  <div className="contact-detail-items">
                    <div className="c-detail-item">
                      <div className="c-dot-icon">📍</div>
                      <div>
                        <strong>Registered Office Address</strong>
                        <p>Kautike Charitable Foundation<br />Panvel, Navi Mumbai &amp; Raigad District, Maharashtra, India</p>
                      </div>
                    </div>

                    <div className="c-detail-item">
                      <div className="c-dot-icon">🛡️</div>
                      <div>
                        <strong>Legal &amp; Tax Certifications</strong>
                        <p>Registered Charitable Trust · 80G &amp; 12A Certified · NITI Aayog NGO Darpan</p>
                      </div>
                    </div>

                    <div className="c-detail-item">
                      <div className="c-dot-icon">🕒</div>
                      <div>
                        <strong>Operational Hours</strong>
                        <p>Monday to Saturday: 9:30 AM – 6:30 PM (Sunday: Ground field drives)</p>
                      </div>
                    </div>

                    <div className="c-detail-item">
                      <div className="c-dot-icon">🌱</div>
                      <div>
                        <strong>Primary Operational Districts</strong>
                        <p>Raigad (Panvel, Kondap, Mahodar), Thane, Palghar, Mumbai Suburbs &amp; Rural Maharashtra</p>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badge */}
                  <div className="contact-trust-pill mt-6">
                    <span>✨ 100% Volunteer Driven · Transparent Governance</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Send Message Form */}
              <div className="contact-form-column">
                <div className="contact-form-card">
                  {sent ? (
                    <div className="contact-success-state text-center">
                      <div className="success-emoji">✉️</div>
                      <h3>Thank You for Contacting Us!</h3>
                      <p>
                        Your message has been received by Kautike Charitable Foundation. A team member will reply to <strong>{form.email}</strong> within 24 hours.
                      </p>
                      <button
                        onClick={() => {
                          setSent(false);
                          setForm({ name: "", email: "", phone: "", subject: "80g-receipt", message: "" });
                        }}
                        className="cry-yellow-btn mt-6"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="contact-actual-form">
                      <h3 className="form-card-heading">Send Us a Direct Message</h3>
                      <p className="form-card-sub">
                        Fill out the form below and we will get back to you promptly.
                      </p>

                      <div className="form-group mt-4">
                        <label className="input-field-label">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Nilesh Patil"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="form-input-field"
                        />
                      </div>

                      <div className="form-grid-2col mt-4">
                        <div className="form-group">
                          <label className="input-field-label">Email Address *</label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. nilesh@gmail.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="form-input-field"
                          />
                        </div>

                        <div className="form-group">
                          <label className="input-field-label">Phone / WhatsApp Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. 9820012345"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="form-input-field"
                          />
                        </div>
                      </div>

                      <div className="form-group mt-4">
                        <label className="input-field-label">Subject / Purpose of Inquiry *</label>
                        <select
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="form-select-field"
                        >
                          <option value="80g-receipt">Donation &amp; 80G Tax Certificate Inquiry</option>
                          <option value="volunteer">Volunteering &amp; Internship Opportunities</option>
                          <option value="csr">Corporate CSR Partnership &amp; Grant Sponsorship</option>
                          <option value="tree-plantation">Tree Plantation &amp; School Green Drives</option>
                          <option value="general">General Feedback or Other Queries</option>
                        </select>
                      </div>

                      <div className="form-group mt-4">
                        <label className="input-field-label">Your Message *</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Please share details of your query, request, or feedback..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="form-input-field"
                          style={{ resize: "vertical" }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="cry-yellow-btn mt-6"
                        style={{ width: "100%", justifyContent: "center" }}
                      >
                        {submitting ? "Sending..." : "✉ Send Message Now"}
                      </button>

                      <div className="form-security-footer">
                        <span>🔒 Your information is confidential and never shared.</span>
                      </div>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Trust Badges Row */}
        <section className="cry-wc-trust-badges-section">
          <div className="cry-wc-trust-grid">
            <div className="cry-wc-trust-item">
              <div className="cry-wc-trust-icon">🛡️</div>
              <div>
                <strong>100% Tax Deductible</strong>
                <p>All eligible donations receive Form 10BE certificates under Section 80G.</p>
              </div>
            </div>
            <div className="cry-wc-trust-item">
              <div className="cry-wc-trust-icon">⚡</div>
              <div>
                <strong>Quick 24h Response</strong>
                <p>Our volunteer coordination team responds to all queries within 24 working hours.</p>
              </div>
            </div>
            <div className="cry-wc-trust-item">
              <div className="cry-wc-trust-icon">🤝</div>
              <div>
                <strong>Community Powered</strong>
                <p>Every initiative is led transparently on the ground with local Gram Panchayats.</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />
      <FloatingActions />
    </main>
  );
}
