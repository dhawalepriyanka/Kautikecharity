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
          <div className="footer-social-row">
            <span className="footer-social-label">Follow Us:</span>
            <div className="footer-social-links">
              <a href="https://www.facebook.com/share/1Leu6EybCU/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </a>
              <a href="https://youtube.com/@kautikecharitablefoundation?si=Mj2ijYX7_Qm-U6L4" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>YouTube</span>
              </a>
              <a href="https://www.instagram.com/kautikecharitablefoundation?igsi=MTBhOW9vaWZmNG1oMg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </a>
            </div>
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
            <li><a href="/community-relief">Community Relief</a></li>
            <li><a href="/what-we-do#protection">Child Protection & Rights</a></li>
            <li><a href="/what-we-do#protection">Girl Child Empowerment</a></li>
            <li><a href="/what-we-do#plantation">Tree Plantation Drives</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Get Involved</h4>
          <ul>
            <li><a href="/donate">Donate Online (Tax Exempt 80G)</a></li>
            <li><a href="/volunteer">Volunteering &amp; Internships</a></li>
            <li><a href="/corporate-partnerships">CSR Corporate Partnerships</a></li>
            <li><a href="/stories">Stories of Hope</a></li>
            <li><a href="/faqs">FAQs &amp; Tax Exemption</a></li>
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
