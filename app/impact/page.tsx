import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export const metadata = {
  title: "Impact & Governance | Verified Reports · Kautike Charitable Foundation",
  description: "View verified metrics, annual financial disclosures, audited accounts, and statutory governance accreditations of Kautike Charitable Foundation.",
};

export default function ImpactPage() {
  return (
    <main className="page-fade-in" id="top">
      <Header />

      {/* Hero */}
      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <span className="subpage-badge">MEASURABLE IMPACT</span>
          <h1>Numbers backed by <span className="yellow-hand">real lives transformed</span></h1>
          <p>
            We adhere to the highest standards of fiscal stewardship and public accountability. Here is how your generosity translates into tangible change on the ground.
          </p>
        </div>
      </section>

      {/* Main Impact Metrics Grid */}
      <section className="section-pad bg-white">
        <div className="about-container">
          <div className="text-center mb-8">
            <span className="mini-title">GROUND EVIDENCE (2025-2026)</span>
            <h2 className="section-heading">Our Verified <span className="yellow-hand">Footprint</span></h2>
          </div>

          <div className="impact-stats-large-grid">
            <div className="impact-stat-box">
              <span className="stat-giant-num">15.5L+</span>
              <h4>Children Supported</h4>
              <p>Provided with foundational learning kits, enrolled into formal schools, and protected from premature dropouts.</p>
            </div>

            <div className="impact-stat-box">
              <span className="stat-giant-num">34,000+</span>
              <h4>Malnourished Children Treated</h4>
              <p>Under-5 infants and mothers receiving micronutrient porridge, medical screening, and weight recovery tracking.</p>
            </div>

            <div className="impact-stat-box">
              <span className="stat-giant-num">45,000+</span>
              <h4>Girls Empowered</h4>
              <p>Secondary school scholarship recipients and adolescent life-skill champions preventing child marriage in their villages.</p>
            </div>

            <div className="impact-stat-box">
              <span className="stat-giant-num">12,000+</span>
              <h4>Minors Rescued from Labour</h4>
              <p>Intervened with local law enforcement and child welfare committees to safely repatriate and re-enroll child labourers.</p>
            </div>

            <div className="impact-stat-box">
              <span className="stat-giant-num">50,000+</span>
              <h4>Native Trees Planted</h4>
              <p>Neem, Peepal, Banyan, and fruit-bearing trees planted across government schools and community corridors with 85%+ survival.</p>
            </div>

            <div className="impact-stat-box">
              <span className="stat-giant-num">480+</span>
              <h4>Villages Reached</h4>
              <p>Active grassroots interventions across Maharashtra, fostering self-sustaining Bal Panchayats and SMC committees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Financials & Governance Section */}
      <section className="section-pad bg-cream" id="governance">
        <div className="about-container">
          <div className="text-center mb-8">
            <span className="mini-title">FINANCIAL TRANSPARENCY</span>
            <h2 className="section-heading">How Every <span className="yellow-hand">Rupee</span> Is Spent</h2>
            <p className="section-lead centered">87% of all funds directly support grassroots programmatic expenditure.</p>
          </div>

          <div className="fund-split-container">
            <div className="fund-bar-wrap">
              <div className="fund-bar-fill programs" style={{ width: "87%" }}>87% Programmatic Relief &amp; Child Welfare</div>
              <div className="fund-bar-fill ops" style={{ width: "8%" }}>8% Ops</div>
              <div className="fund-bar-fill fund" style={{ width: "5%" }}>5%</div>
            </div>

            <div className="fund-legend-row">
              <div className="legend-item"><span className="dot dot-gold"></span><strong>87% Programs &amp; Direct Relief:</strong> Classrooms, meals, teacher training, tree saplings, medical kits.</div>
              <div className="legend-item"><span className="dot dot-navy"></span><strong>8% Administration &amp; Audits:</strong> Field monitoring, accounting, governance, and legal compliance.</div>
              <div className="legend-item"><span className="dot dot-muted"></span><strong>5% Communications:</strong> Public awareness drives, campaign dissemination, and volunteer drives.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Annual Reports Download Box */}
      <section className="section-pad bg-white">
        <div className="about-container">
          <div className="text-center mb-8">
            <span className="mini-title">PUBLIC DISCLOSURES</span>
            <h2 className="section-heading">Download <span className="yellow-hand">Annual Reports</span></h2>
          </div>

          <div className="reports-download-grid">
            <div className="report-card">
              <div className="report-pdf-icon">📄</div>
              <div>
                <h4>Annual Impact Report 2025–26</h4>
                <p>Audited programmatic achievements, field surveys, and audited financial statements.</p>
                <a href="#download" className="download-link">📥 Download PDF (4.2 MB)</a>
              </div>
            </div>

            <div className="report-card">
              <div className="report-pdf-icon">📄</div>
              <div>
                <h4>Audited Balance Sheet &amp; P&amp;L 2024–25</h4>
                <p>Statutory audit report certified by Independent Chartered Accountants.</p>
                <a href="#download" className="download-link">📥 Download PDF (2.8 MB)</a>
              </div>
            </div>

            <div className="report-card">
              <div className="report-pdf-icon">📜</div>
              <div>
                <h4>80G &amp; 12A Exemption Certificate</h4>
                <p>Permanent Income Tax Registration Order issued by the Ministry of Finance, GoI.</p>
                <a href="#download" className="download-link">📥 Download PDF (1.1 MB)</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cry-cta-banner">
        <div className="cry-cta-inner">
          <h2>Your trust powers our commitment</h2>
          <p>Join thousands of active donors bringing transparent, verified change to India.</p>
          <div className="cta-btn-group">
            <a href="/donate" className="cry-yellow-btn">♥ Donate with 80G Tax Exemption</a>
            <a href="/stories" className="cry-outline-btn">Read Field Stories</a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
