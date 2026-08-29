import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export const metadata = {
  title: "Donation Receipt & Digital Delivery Policy | Kautike Charitable Foundation",
  description: "Official Donation Receipt and 80G Tax Certificate Digital Delivery Policy of Kautike Charitable Foundation.",
};

export default function ShippingPolicyPage() {
  return (
    <main className="page-fade-in" id="top">
      <Header />

      <div className="cry-wc-page">
        {/* Header */}
        <div className="cry-wc-hero-header text-center">
          <span className="subpage-badge">CHARITABLE TRUST POLICY</span>
          <h1 className="cry-wc-main-title">Donation Receipt &amp; Digital Delivery Policy</h1>
          <div className="cry-wc-yellow-bar" />
          <p className="cry-wc-lead-text">
            Kautike Charitable Foundation | Registered Non-Profit Charitable Trust (Maharashtra, India)
          </p>
        </div>

        {/* Policy Content */}
        <div className="about-container section-pad">
          <div className="policy-card">
            
            <div className="policy-block">
              <h3>1. Nature of Services (Non-Physical Goods)</h3>
              <p>
                Kautike Charitable Foundation is a non-governmental charitable trust dedicated to child education, malnutrition relief, social welfare, and tree plantation across Maharashtra and India.
              </p>
              <p className="mt-3">
                All transactions conducted through our website (<strong>https://kautikecharitable.org</strong>) are voluntary charitable donations and financial contributions. As an NGO, we do not sell or ship physical retail products, merchandise, or tangible commodities. Therefore, standard physical courier/postal shipping charges do not apply.
              </p>
            </div>

            <div className="policy-block">
              <h3>2. Digital Delivery of Donation Receipts</h3>
              <p>
                Upon the successful completion of an online donation transaction via our integrated Razorpay payment gateway:
              </p>
              <ul className="policy-list">
                <li><strong>Instant Digital Confirmation:</strong> An instant on-screen payment confirmation and printable transaction receipt is displayed immediately on the screen.</li>
                <li><strong>Email Dispatch:</strong> A formal payment acknowledgment and digital receipt is automatically dispatched to the donor&apos;s registered email address within <strong>15 minutes to 2 hours</strong> of transaction completion.</li>
                <li><strong>SMS / WhatsApp Notification:</strong> A transaction confirmation message containing the payment reference ID is sent to the donor&apos;s mobile number.</li>
              </ul>
            </div>

            <div className="policy-block">
              <h3>3. Section 80G Tax Exemption Certificate Delivery</h3>
              <p>
                For all Indian donors eligible for tax exemptions under Section 80G of the Income Tax Act, 1961:
              </p>
              <ul className="policy-list">
                <li>An official, digitally signed <strong>Section 80G Donation Receipt (Form 10BE compliant)</strong> containing the Foundation&apos;s 80G registration number and donor PAN will be delivered via email within <strong>24 to 48 business hours</strong>.</li>
                <li>At the end of the financial year, a consolidated annual tax statement of all contributions will be emailed to recurring monthly donors for seamless income tax filing.</li>
              </ul>
            </div>

            <div className="policy-block">
              <h3>4. Delivery Issues &amp; Re-issuance Requests</h3>
              <p>
                If you do not receive your digital donation receipt or 80G certificate in your email inbox within the specified timeframe (please also verify your spam/junk folder), you can request a duplicate digital copy at zero cost.
              </p>
              <p className="mt-3">
                Please email us at <strong>info@kautikefoundation.org</strong> with your Name, Phone Number, Date of Contribution, and Razorpay Payment ID. Our support team will re-issue your certificate within 24 working hours.
              </p>
            </div>

            <div className="policy-block">
              <h3>5. Contact Details for Delivery Support</h3>
              <div className="contact-callout-box">
                <p><strong>Kautike Charitable Foundation</strong></p>
                <p>📧 Email: <a href="mailto:info@kautikefoundation.org">info@kautikefoundation.org</a></p>
                <p>📞 Phone: <a href="tel:+918108362688">+91 810 836 2688</a></p>
                <p>📍 Registered Address: Maharashtra, India</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      <Footer />
      <FloatingActions />
    </main>
  );
}
