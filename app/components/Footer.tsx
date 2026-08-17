import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/kautike-logo.png" alt="Kautike Foundation Logo" width="48" height="48" />
            <div>
              <strong>KAUTIKE CHARITABLE FOUNDATION</strong>
              <p>Registered Non-Profit Organization · 80G & 12A Certified</p>
            </div>
          </div>
          <p className="footer-tagline">
            Standing unconditionally for child rights, quality education, holistic healthcare, malnutrition eradication, girl child dignity, and environmental restoration across India.
          </p>
          <div className="footer-badges">
            <span>🛡️ Verified Section 8 NGO</span>
            <span>📑 80G Tax Exemption</span>
            <span>🏛️ MCA & NITI Aayog Compliant</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>About Us</h4>
          <ul>
            <li><a href="/about">Who We Are</a></li>
            <li><a href="/why-children">Why Children & Community</a></li>
            <li><a href="/approach">Our Systemic Approach</a></li>
            <li><a href="/impact#governance">Governance & Trust</a></li>
            <li><a href="/contact">Contact & Head Office</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Focus Areas</h4>
          <ul>
            <li><a href="/what-we-do#education">Child Education & Digital Classrooms</a></li>
            <li><a href="/what-we-do#health">Health, Nutrition & Wellness</a></li>
            <li><a href="/what-we-do#protection">Child Protection & Rights</a></li>
            <li><a href="/what-we-do#protection">Girl Child Empowerment</a></li>
            <li><a href="/what-we-do#plantation">Tree Plantation Drives</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Get Involved</h4>
          <ul>
            <li><a href="/donate">Donate Online (Tax Exempt 80G)</a></li>
            <li><a href="/volunteer">Volunteering & Internships</a></li>
            <li><a href="/corporate-partnerships">CSR Corporate Partnerships</a></li>
            <li><a href="/stories">Stories of Hope</a></li>
            <li><a href="/faqs">FAQs & Tax Exemption</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Stay Updated</h4>
          <p style={{ fontSize: "13px", marginBottom: "12px" }}>
            Subscribe to receive regular story updates, field dispatches, and annual impact reports.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Kautike Charitable Foundation · Mumbai, Maharashtra, India. All Rights Reserved.</span>
        <div className="footer-legal">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms &amp; Conditions</a>
          <a href="/refund-policy">Refund Policy</a>
          <a href="/shipping-policy">80G Receipt &amp; Delivery</a>
          <a href="/faqs">80G Tax FAQs</a>
        </div>
      </div>
    </footer>
  );
}
