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
    subject: "general",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="page-fade-in" id="top">
      <Header />

      {/* Hero */}
      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <span className="subpage-badge">GET IN TOUCH</span>
          <h1>We are here to <span className="yellow-hand">listen &amp; assist</span></h1>
          <p>
            Have a question regarding donations, 80G tax certificates, volunteer opportunities, or corporate CSR partnerships? Reach out to us anytime.
          </p>
        </div>
      </section>

      {/* Contact Info & Form Grid */}
      <section className="section-pad bg-white">
        <div className="contact-main-grid">
          {/* Left Contact Details */}
          <div className="contact-details-panel">
            <h2>Head Office &amp; Operations</h2>
            <p className="contact-intro">
              Kautike Charitable Foundation works on the ground across multiple districts in Maharashtra, India.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="c-icon">📍</div>
                <div>
                  <strong>Head Office Address</strong>
                  <p>Kautike Charitable Foundation<br />Mumbai, Maharashtra 400001, India</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="c-icon">✉️</div>
                <div>
                  <strong>Email Inquiries</strong>
                  <p><a href="mailto:kautikecharitable@gmail.com">kautikecharitable@gmail.com</a></p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="c-icon">📞</div>
                <div>
                  <strong>Helpline / WhatsApp</strong>
                  <p><a href="tel:+918108362688">+91 810 836 2688</a> (Mon–Sat, 9:30 AM – 6:30 PM)</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="c-icon">🛡️</div>
                <div>
                  <strong>NGO Registration &amp; Certifications</strong>
                  <p>Registered Non-Profit Section 8 Organization · 80G &amp; 12A Certified · NITI Aayog Darpan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Message Form */}
          <div className="contact-form-panel">
            {sent ? (
              <div className="success-box text-center">
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>✉️</div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. Our support team will respond to <strong>{form.email}</strong> within 24 hours.</p>
                <button onClick={() => setSent(false)} className="cry-yellow-btn mt-4">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="styled-app-form">
                <h3>Send Us A Direct Message</h3>
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Subject / Purpose</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="80g">80G Tax Exemption Certificate Query</option>
                    <option value="donation">Donation Support &amp; Receipts</option>
                    <option value="csr">Corporate CSR Partnership</option>
                    <option value="volunteer">Volunteering &amp; Internships</option>
                    <option value="plantation">Tree Plantation Drives</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message or inquiry here..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="cry-yellow-btn w-full">
                  Send Message
                </button>
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
