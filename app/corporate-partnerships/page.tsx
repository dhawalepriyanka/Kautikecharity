import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export const metadata = {
  title: "Corporate Partnerships & CSR · Kautike Charitable Foundation",
  description: "Collaborate with Kautike Charitable Foundation for statutory 2% CSR mandates, employee payroll giving, strategic impact programs, and 80G tax exemptions.",
};

export default function CorporatePartnershipsPage() {
  return (
    <main className="page-fade-in" id="top">
      <Header />

      {/* Hero */}
      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <span className="subpage-badge">CORPORATE CSR PARTNERSHIPS</span>
          <h1>Strategic alliances for <span className="yellow-hand">high-impact CSR</span></h1>
          <p>
            Partner with Kautike Charitable Foundation to achieve your statutory 2% Corporate Social Responsibility goals with measurable outcomes, rigorous audit trails, and transformative grassroots impact.
          </p>
        </div>
      </section>

      {/* CSR Pillars */}
      <section className="section-pad bg-white">
        <div className="about-container">
          <div className="text-center">
            <span className="mini-title">MODELS OF ENGAGEMENT</span>
            <h2 className="section-heading">How Your Company Can <span className="yellow-hand">Partner</span></h2>
          </div>

          <div className="csr-models-grid">
            <div className="csr-model-card">
              <div className="csr-icon">🎯</div>
              <h3>Statutory 2% CSR Projects</h3>
              <p>Turnkey implementation of education, malnutrition eradication, water sanitation, or environmental sustainability projects aligned with Schedule VII of the Companies Act, 2013.</p>
            </div>

            <div className="csr-model-card">
              <div className="csr-icon">💳</div>
              <h3>Employee Payroll Giving</h3>
              <p>Empower your workforce to contribute a small voluntary amount directly from their monthly payroll, with matching corporate grants to double impact.</p>
            </div>

            <div className="csr-model-card">
              <div className="csr-icon">🏷️</div>
              <h3>Cause-Related Marketing</h3>
              <p>Tie product or service sales to a social cause (e.g. ₹5 per unit sold donated to plant trees or educate children), boosting consumer trust and brand affinity.</p>
            </div>

            <div className="csr-model-card">
              <div className="csr-icon">🌳</div>
              <h3>Corporate ESG &amp; Carbon Offsetting</h3>
              <p>Sponsor large-scale native micro-forest plantations for your organization&apos;s carbon mitigation and ESG compliance with GPS geo-tagged tree monitoring.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Due Diligence */}
      <section className="section-pad bg-cream">
        <div className="about-container">
          <div className="compliance-box">
            <div className="text-center mb-6">
              <span className="mini-title">REGULATORY INTEGRITY &amp; ACCREDITATIONS</span>
              <h2>Complete Compliance &amp; Governance Rigour</h2>
            </div>

            <div className="compliance-badges-row">
              <div className="comp-item">
                <span className="comp-check">✓</span>
                <div>
                  <strong>Section 8 Registered NGO</strong>
                  <p>Incorporated under the Ministry of Corporate Affairs (MCA), Government of India.</p>
                </div>
              </div>

              <div className="comp-item">
                <span className="comp-check">✓</span>
                <div>
                  <strong>80G &amp; 12A Certified</strong>
                  <p>50% Income Tax exemption certificates issued promptly to corporate donors.</p>
                </div>
              </div>

              <div className="comp-item">
                <span className="comp-check">✓</span>
                <div>
                  <strong>NITI Aayog Darpan Registered</strong>
                  <p>Fully compliant with central NGO transparency and governance benchmarks.</p>
                </div>
              </div>

              <div className="comp-item">
                <span className="comp-check">✓</span>
                <div>
                  <strong>Audited Financial Statements</strong>
                  <p>Independent Chartered Accountant audits with transparent project-wise budget reporting.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Form */}
      <section className="section-pad bg-white" id="csr-contact">
        <div className="form-container">
          <div className="text-center mb-8">
            <span className="mini-title">START A CSR DIALOGUE</span>
            <h2 className="section-heading">Connect with Our <span className="yellow-hand">CSR Advisory Team</span></h2>
            <p>Our CSR partnerships lead will contact you with a customized project proposal and budget brief.</p>
          </div>

          <form className="styled-app-form" onSubmit={(e) => { e.preventDefault(); alert("Thank you! Our CSR team will reach out within 24 hours."); }}>
            <div className="form-row-2">
              <div className="form-group">
                <label>Company / Organization Name *</label>
                <input type="text" required placeholder="e.g. Tata Consultancy, Infosys, etc." />
              </div>
              <div className="form-group">
                <label>Contact Person Name &amp; Designation *</label>
                <input type="text" required placeholder="e.g. Priya Sharma (CSR Lead)" />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Work Email Address *</label>
                <input type="email" required placeholder="contact@company.com" />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" required placeholder="+91 98765 43210" />
              </div>
            </div>

            <div className="form-group">
              <label>Preferred Focus Area</label>
              <select defaultValue="education">
                <option value="education">Child Education &amp; Digital Classrooms</option>
                <option value="nutrition">Malnutrition &amp; Healthcare Interventions</option>
                <option value="plantation">Afforestation, ESG &amp; Tree Plantation</option>
                <option value="protection">Girl Child Dignity &amp; Skill Development</option>
                <option value="multiple">Multiple / Comprehensive Program</option>
              </select>
            </div>

            <div className="form-group">
              <label>Estimated CSR Budget / Scope</label>
              <textarea rows={3} placeholder="Please share details about your CSR timeline, locations, or specific goals..."></textarea>
            </div>

            <button type="submit" className="cry-yellow-btn w-full">Request CSR Collaboration Proposal</button>
          </form>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
