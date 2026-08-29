import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export const metadata = {
  title: "Privacy Policy · Kautike Charitable Foundation",
  description: "Privacy Policy and data protection terms for donors, volunteers, and visitors of Kautike Charitable Foundation.",
};

export default function PrivacyPage() {
  return (
    <main className="page-fade-in" id="top">
      <Header />

      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <span className="subpage-badge">LEGAL &amp; PRIVACY</span>
          <h1>Privacy <span className="yellow-hand">Policy</span></h1>
          <p>We are committed to protecting your personal information and maintaining the highest privacy standards.</p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="legal-content-container">
          <h2>1. Information We Collect</h2>
          <p>When you donate, register as a volunteer, or subscribe to our newsletter, we collect details such as your name, email address, telephone number, mailing address, and PAN card number (solely for issuing statutory 80G tax exemption receipts as required by the Indian Income Tax Department).</p>

          <h2>2. How We Use Your Data</h2>
          <p>Your data is used exclusively to process your donations, transmit statutory 80G tax certificates, dispatch impact updates, and respond to inquiries. We do not sell, rent, or trade your personal information to any third parties.</p>

          <h2>3. Security &amp; Encryption</h2>
          <p>All financial transactions are conducted through banking-grade 256-bit SSL encrypted payment gateways. We never store credit/debit card numbers, CVVs, or online banking passwords on our servers.</p>

          <h2>4. Contact for Privacy Inquiries</h2>
          <p>For any questions regarding your personal data or to update your contact preferences, please email us at <a href="mailto:info@kautikefoundation.org">info@kautikefoundation.org</a>.</p>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
