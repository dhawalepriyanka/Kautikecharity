"use client";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export default function CorporatePartnershipsPage() {
  return (
    <main className="page-fade-in" id="top">
      <Header />

      {/* Simple CRY-style header */}
      <section className="simple-page-header">
        <span className="mini-title">CORPORATE CSR PARTNERSHIPS</span>
        <h1>Partner with us for <span className="yellow-hand">high-impact CSR</span></h1>
        <p>Achieve your statutory 2% CSR goals with measurable outcomes, rigorous audit trails, and real grassroots impact across Maharashtra.</p>
      </section>

      {/* CRY-style intro with wide image */}
      <section className="cry-impact-intro">
        <div className="cry-impact-intro-text">
          <h2 className="cry-impact-intro-heading">Transforming CSR into<br />Lasting Child Impact</h2>
          <div className="health-intro-divider"></div>
          <p className="cry-impact-intro-desc">
            Kautike Charitable Foundation offers corporates a trusted, compliant, and result-driven CSR partnership.
            With 7+ years of field experience across Maharashtra, we ensure every rupee reaches the right child — with full transparency and documentation.
          </p>
        </div>
        <div className="health-intro-photo-wrap">
          <img src="/images/students-banner.jpg" alt="Students benefiting from CSR programs" className="health-intro-photo" />
        </div>
      </section>

      {/* Quick trust stats */}
      <section className="health-stats-band">
        <div className="health-stats-band-inner">
          <div className="health-stat-item">
            <span className="health-stat-icon">🏛️</span>
            <strong>Section 8</strong>
            <span>Registered NGO</span>
          </div>
          <div className="health-stat-divider"></div>
          <div className="health-stat-item">
            <span className="health-stat-icon">📋</span>
            <strong>80G &amp; 12A</strong>
            <span>Tax Certified</span>
          </div>
          <div className="health-stat-divider"></div>
          <div className="health-stat-item">
            <span className="health-stat-icon">🇮🇳</span>
            <strong>NITI Aayog</strong>
            <span>Darpan Registered</span>
          </div>
          <div className="health-stat-divider"></div>
          <div className="health-stat-item">
            <span className="health-stat-icon">📊</span>
            <strong>CA Audited</strong>
            <span>Financial Reports</span>
          </div>
        </div>
      </section>

      {/* 4 Engagement Models */}
      <section className="cry-programs-strip">
        <div className="cry-programs-header">
          <span className="mini-title">MODELS OF ENGAGEMENT</span>
          <h2 className="section-heading">How Your Company Can <span className="yellow-hand">Partner</span></h2>
        </div>
        <div className="csr-engage-grid">
          <div className="csr-engage-card">
            <div className="csr-engage-icon">🎯</div>
            <h3>Statutory 2% CSR Projects</h3>
            <p>Turnkey implementation of education, malnutrition, water, or environmental projects aligned with Schedule VII of the Companies Act, 2013.</p>
            <ul className="csr-engage-list">
              <li>Full implementation &amp; monitoring</li>
              <li>Project-wise utilization reports</li>
              <li>Photographic &amp; video documentation</li>
            </ul>
          </div>
          <div className="csr-engage-card">
            <div className="csr-engage-icon">💳</div>
            <h3>Employee Payroll Giving</h3>
            <p>Empower your workforce to contribute voluntarily from their monthly payroll, with corporate matching grants to double impact.</p>
            <ul className="csr-engage-list">
              <li>Automated payroll integration</li>
              <li>80G certificates for employees</li>
              <li>Monthly impact newsletters</li>
            </ul>
          </div>
          <div className="csr-engage-card">
            <div className="csr-engage-icon">🏷️</div>
            <h3>Cause-Related Marketing</h3>
            <p>Tie product sales to a social cause — ₹5 per unit donated to plant trees or educate children — boosting consumer trust and brand affinity.</p>
            <ul className="csr-engage-list">
              <li>Co-branded campaign materials</li>
              <li>Real-time impact dashboard</li>
              <li>Press &amp; PR support</li>
            </ul>
          </div>
          <div className="csr-engage-card">
            <div className="csr-engage-icon">🌳</div>
            <h3>ESG &amp; Carbon Offsetting</h3>
            <p>Sponsor large-scale native micro-forest plantations for your organization's carbon mitigation and ESG compliance reporting.</p>
            <ul className="csr-engage-list">
              <li>GPS geo-tagged tree monitoring</li>
              <li>ESG compliance certificates</li>
              <li>85%+ tree survival rate</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Compliance strip */}
      <section className="csr-compliance-section">
        <div className="csr-compliance-inner">
          <div className="csr-compliance-header">
            <span className="mini-title">REGULATORY INTEGRITY</span>
            <h2 className="section-heading">Complete Compliance &amp; <span className="yellow-hand">Governance</span></h2>
          </div>
          <div className="csr-comp-row">
            <div className="csr-comp-item">
              <span className="csr-comp-check">✓</span>
              <div>
                <strong>Section 8 Registered NGO</strong>
                <p>Incorporated under Ministry of Corporate Affairs (MCA), Government of India.</p>
              </div>
            </div>
            <div className="csr-comp-item">
              <span className="csr-comp-check">✓</span>
              <div>
                <strong>80G &amp; 12A Certified</strong>
                <p>50% Income Tax exemption certificates issued promptly to corporate donors.</p>
              </div>
            </div>
            <div className="csr-comp-item">
              <span className="csr-comp-check">✓</span>
              <div>
                <strong>NITI Aayog Darpan</strong>
                <p>Fully compliant with central NGO transparency and governance benchmarks.</p>
              </div>
            </div>
            <div className="csr-comp-item">
              <span className="csr-comp-check">✓</span>
              <div>
                <strong>CA Audited Financials</strong>
                <p>Independent Chartered Accountant audits with transparent project-wise reporting.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSR Contact Form */}
      <section className="csr-form-section" id="csr-contact">
        <div className="csr-form-wrap">
          <div className="csr-form-left">
            <span className="mini-title">START A CSR DIALOGUE</span>
            <h2 className="section-heading">Connect with Our <span className="yellow-hand">CSR Advisory Team</span></h2>
            <p>Our CSR partnerships lead will contact you within 24 hours with a customised project proposal and budget brief.</p>
            <div className="csr-form-trust">
              <div><span>🔒</span><span>100% Confidential</span></div>
              <div><span>⚡</span><span>24hr Response</span></div>
              <div><span>📄</span><span>Free Proposal</span></div>
            </div>
          </div>
          <div className="csr-form-right">
            <form className="csr-styled-form" onSubmit={(e) => { e.preventDefault(); alert("Thank you! Our CSR team will reach out within 24 hours."); }}>
              <div className="csr-form-row">
                <div className="csr-form-group">
                  <label>Company / Organization Name *</label>
                  <input type="text" required placeholder="e.g. Tata Consultancy, Infosys" />
                </div>
                <div className="csr-form-group">
                  <label>Contact Person &amp; Designation *</label>
                  <input type="text" required placeholder="e.g. Priya Sharma (CSR Lead)" />
                </div>
              </div>
              <div className="csr-form-row">
                <div className="csr-form-group">
                  <label>Work Email Address *</label>
                  <input type="email" required placeholder="contact@company.com" />
                </div>
                <div className="csr-form-group">
                  <label>Phone Number *</label>
                  <input type="tel" required placeholder="+91 98765 43210" />
                </div>
              </div>
              <div className="csr-form-group">
                <label>Preferred Focus Area</label>
                <select defaultValue="education">
                  <option value="education">Child Education &amp; Digital Classrooms</option>
                  <option value="nutrition">Malnutrition &amp; Healthcare Interventions</option>
                  <option value="plantation">Afforestation, ESG &amp; Tree Plantation</option>
                  <option value="protection">Girl Child Dignity &amp; Skill Development</option>
                  <option value="multiple">Multiple / Comprehensive Program</option>
                </select>
              </div>
              <div className="csr-form-group">
                <label>Estimated CSR Budget / Scope</label>
                <textarea rows={3} placeholder="Share details about your CSR timeline, budget range, or specific goals..."></textarea>
              </div>
              <button type="submit" className="edu-cta-primary-btn" style={{width:"100%", padding:"16px", fontSize:"1rem"}}>
                Request CSR Collaboration Proposal →
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
