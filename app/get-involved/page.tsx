import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export const metadata = {
  title: "Get Involved | Join the Movement · Kautike Charitable Foundation",
  description: "Discover meaningful ways to stand with children and nature. Donate, volunteer, partner through CSR, or champion youth rights in your city.",
};

export default function GetInvolvedPage() {
  return (
    <main className="page-fade-in" id="top">
      <Header />

      {/* Hero Banner */}
      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <span className="subpage-badge">GET INVOLVED</span>
          <h1>Everyone has the power to <span className="yellow-hand">create change</span></h1>
          <p>
            Whether through financial contributions, volunteering your professional skills, mobilizing college campus drives, or corporate CSR partnerships—you can bring smiles to thousands of children today.
          </p>
        </div>
      </section>

      {/* Pathways Grid */}
      <section className="section-pad bg-white get-involved-pathways">
        <div className="about-container">
          <div className="pathways-grid">
            <div className="pathway-card">
              <div className="pathway-icon">💛</div>
              <h3>Donate Online</h3>
              <p>Make a one-time or monthly recurring contribution. Even ₹500 a month funds a child&apos;s complete educational materials and daily nutrition.</p>
              <span className="tax-notice">✓ 80G Tax Exemption Certificate Provided</span>
              <a href="/donate" className="cry-yellow-btn">Donate Now</a>
            </div>

            <div className="pathway-card">
              <div className="pathway-icon">🤝</div>
              <h3>Volunteer &amp; Intern</h3>
              <p>Join our grassroots initiatives across Maharashtra. Teach in remedial classes, assist in medical camps, or lead weekend tree plantation drives.</p>
              <span className="tax-notice">✓ Certificate of Volunteering Provided</span>
              <a href="/volunteer" className="cry-yellow-btn">Become A Volunteer</a>
            </div>

            <div className="pathway-card">
              <div className="pathway-icon">🏢</div>
              <h3>Corporate CSR</h3>
              <p>Partner with Kautike Charitable Foundation for statutory 2% CSR compliance, strategic employee giving, cause marketing, and measurable social ROI.</p>
              <span className="tax-notice">✓ MCA &amp; NITI Aayog Compliant Reporting</span>
              <a href="/corporate-partnerships" className="cry-yellow-btn">CSR Partnerships</a>
            </div>

            <div className="pathway-card" id="spread-the-word">
              <div className="pathway-icon">📢</div>
              <h3>Spread the Word</h3>
              <p>Amplify our voice on social media, organize local donation drives in your residential society, or invite our founders for talks at your school or workplace.</p>
              <span className="tax-notice">✓ Download Campaign Toolkit</span>
              <a href="/contact" className="cry-outline-btn">Get In Touch</a>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Highlights */}
      <section className="section-pad bg-cream get-involved-campaigns">
        <div className="about-container text-center">
          <span className="mini-title">ACTIVE CAMPAIGNS</span>
          <h2 className="section-heading">Join Our <span className="yellow-hand">Ongoing Missions</span></h2>
          <p className="section-lead centered">Direct your energy and donations to targeted campaigns delivering high-impact field results.</p>

          <div className="active-campaigns-grid">
            <div className="campaign-box">
              <div className="campaign-box-img" style={{ backgroundImage: "url(/images/help-tomorrow.jpg)" }}></div>
              <div className="campaign-box-body">
                <h4>Back to School Drive 2026</h4>
                <p>Equipping 10,000 out-of-school rural children with bags, textbooks, stationery, and uniforms for the new academic year.</p>
                <a href="/donate" className="cry-yellow-btn">Support Education</a>
              </div>
            </div>

            <div className="campaign-box">
              <div className="campaign-box-img" style={{ backgroundImage: "url(/images/plantation-campaign.jpg)" }}></div>
              <div className="campaign-box-body">
                <h4>Mission 1,00,000 Trees</h4>
                <p>Greening dryland districts, rural school grounds, and riverbanks with fruit and shade-giving native trees to combat drought.</p>
                <a href="/donate" className="cry-yellow-btn">Plant Trees</a>
              </div>
            </div>

            <div className="campaign-box">
              <div className="campaign-box-img" style={{ backgroundImage: "url(/images/mothers-campaign.jpg)" }}></div>
              <div className="campaign-box-body">
                <h4>Nourish Mother &amp; Child</h4>
                <p>Delivering high-protein supplementary nutrition kits to pregnant mothers and malnourished children in slum settlements.</p>
                <a href="/donate" className="cry-yellow-btn">Provide Nutrition</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cry-cta-banner">
        <div className="cry-cta-inner">
          <h2>Ready to take the first step?</h2>
          <p>Every contribution, big or small, helps create an India where children flourish.</p>
          <div className="cta-btn-group">
            <a href="/donate" className="cry-yellow-btn">♥ Donate Today</a>
            <a href="/contact" className="cry-outline-btn">Contact Us</a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
