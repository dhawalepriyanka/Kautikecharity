"use client";

import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

const faqData = [
  {
    q: "Is my donation to Kautike Charitable Foundation eligible for 80G tax exemption?",
    a: "Yes, absolutely. Kautike Charitable Foundation is registered under Section 80G of the Income Tax Act, 1961. Indian resident donors can claim a 50% tax deduction on their total donation amount. A formal 80G certificate with our 10BE registration number is issued to your registered email upon donation confirmation.",
  },
  {
    q: "How quickly will I receive my official 80G Tax Exemption receipt?",
    a: "You will receive an instant provisional receipt via email immediately after online payment completion. The formal 80G certificate required for filing your annual Income Tax Return (ITR) is generated and emailed to you within 24 to 48 hours.",
  },
  {
    q: "How does Kautike Charitable Foundation utilize donated funds?",
    a: "87% of all donations directly fund grassroots programs—including classroom infrastructure, learning materials, school bags, teacher training, daily nutritional feeds for underweight children, and saplings for tree plantation drives. 8% supports legal audit, field governance, and accounting, while 5% supports public awareness campaigns.",
  },
  {
    q: "Can I donate offline or via direct Bank Transfer (NEFT / RTGS / IMPS)?",
    a: "Yes! You can transfer funds directly into our official Foundation bank account. After making the transfer, please email the transaction reference number (UTR), your PAN card number, and donor name to kautikecharitable@gmail.com so we can generate your 80G certificate.",
  },
  {
    q: "Is online payment completely safe and encrypted?",
    a: "Yes, all online transactions on our portal are processed through RBI-approved, PCI-DSS Level 1 certified payment gateways with 256-bit SSL banking-grade encryption. We never store credit/debit card numbers or netbanking credentials.",
  },
  {
    q: "Can I sponsor a tree plantation drive in honor of a birthday or special milestone?",
    a: "Yes! You can dedicate tree saplings for birthdays, anniversaries, or in memory of loved ones. We provide digital plantation certificates along with GPS coordinates and photos of the planted micro-forest corridor.",
  },
  {
    q: "How can my company partner with Kautike Foundation for 2% CSR compliance?",
    a: "We provide turnkey statutory CSR project execution, comprehensive baseline surveys, quarterly impact tracking reports, and audited utilization certificates meeting MCA and NITI Aayog norms. Visit our Corporate Partnerships page or email kautikecharitable@gmail.com.",
  },
];

export default function FaqsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <main className="page-fade-in" id="top">
      <Header />

      {/* Hero */}
      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <span className="subpage-badge">HELP &amp; TAX EXEMPTION</span>
          <h1>Frequently Asked Questions &amp; <span className="yellow-hand">Tax Benefits</span></h1>
          <p>
            Everything you need to know about 80G tax deductions, donation security, field utilization, and NGO verification.
          </p>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section-pad bg-white">
        <div className="about-container">
          <div className="faqs-accordion-wrap">
            {faqData.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} className={`faq-accordion-item ${isOpen ? "open" : ""}`}>
                  <button className="faq-question-btn" onClick={() => toggleFaq(idx)}>
                    <span>{item.q}</span>
                    <span className="faq-toggle-icon">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-pane">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="cry-cta-banner">
        <div className="cry-cta-inner">
          <h2>Have more questions or need assistance?</h2>
          <p>Our team is available over phone and email to guide you with your donation and 80G receipts.</p>
          <div className="cta-btn-group">
            <a href="/donate" className="cry-yellow-btn">♥ Donate Online Now</a>
            <a href="/contact" className="cry-outline-btn">Contact Support Team</a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
