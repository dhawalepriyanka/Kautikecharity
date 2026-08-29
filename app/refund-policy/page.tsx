import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export const metadata = {
  title: "Refund & Cancellation Policy | Razorpay Compliance · Kautike Charitable Foundation",
  description: "Read the official Refund and Cancellation Policy of Kautike Charitable Foundation for online donations and contributions.",
};

export default function RefundPolicyPage() {
  return (
    <main className="page-fade-in" id="top">
      <Header />

      <div className="cry-wc-page">
        {/* Header */}
        <div className="cry-wc-hero-header text-center">
          <span className="subpage-badge">LEGAL &amp; COMPLIANCE</span>
          <h1 className="cry-wc-main-title">Refund &amp; Cancellation Policy</h1>
          <div className="cry-wc-yellow-bar" />
          <p className="cry-wc-lead-text">
            Last Updated: August 2026 | Kautike Charitable Foundation
          </p>
        </div>

        {/* Policy Content */}
        <div className="about-container section-pad">
          <div className="policy-card">
            
            <div className="policy-block">
              <h3>1. General Policy on Donations</h3>
              <p>
                Kautike Charitable Foundation is a non-profit charitable trust registered in India. All donations and contributions made online via our official website through our secure payment gateway (Razorpay) are voluntary and intended to support our charitable causes, including child education, malnutrition relief, social welfare, and tree plantation drives across Maharashtra and India.
              </p>
            </div>

            <div className="policy-block">
              <h3>2. Refund Eligibility &amp; Erroneous Transactions</h3>
              <p>
                As a standard rule, donations once made are non-refundable since they are immediately allocated towards ongoing grassroots relief projects and child welfare drives. However, Kautike Charitable Foundation will examine requests for refunds under the following specific circumstances:
              </p>
              <ul className="policy-list">
                <li><strong>Technical Duplication:</strong> An accidental double/multiple deduction occurred during payment gateway processing due to network latency.</li>
                <li><strong>Incorrect Amount Charged:</strong> An amount higher than the intended donation was debited due to a system glitch.</li>
                <li><strong>Unauthorized Card Usage:</strong> An unauthorized transaction occurred using a stolen or compromised debit/credit card or bank account, verified by legal dispute proof.</li>
              </ul>
            </div>

            <div className="policy-block">
              <h3>3. Refund Application Window &amp; Process</h3>
              <p>
                To request a refund for an erroneous or duplicate transaction, the donor must contact Kautike Charitable Foundation within <strong>7 (seven) days</strong> of making the transaction. Requests made after 7 days may not be eligible for a refund as funds are disbursed to field operations.
              </p>
              <p className="mt-3">
                Please email your refund request to <strong>info@kautikefoundation.org</strong> with the following details:
              </p>
              <ul className="policy-list">
                <li>Full Name of the Donor</li>
                <li>Registered Email Address &amp; Mobile Number</li>
                <li>Razorpay Payment ID &amp; Order ID</li>
                <li>Date and Exact Amount of Transaction</li>
                <li>Bank Account Statement / Screenshot showing duplicate deduction</li>
                <li>Valid reason for the refund request</li>
              </ul>
            </div>

            <div className="policy-block">
              <h3>4. Processing &amp; Mode of Refund</h3>
              <p>
                Once your refund request is received and verified by our finance team, the refund will be initiated through the original payment mode (Razorpay gateway) back to the donor&apos;s originating bank account, credit/debit card, or UPI VPA.
              </p>
              <p className="mt-3">
                Refunds typically reflect in the donor&apos;s account within <strong>5 to 7 working days</strong> from the date of approval, subject to standard banking clearing cycles.
              </p>
            </div>

            <div className="policy-block">
              <h3>5. Cancellation of Recurring / Monthly Pledges</h3>
              <p>
                Donors who have set up a recurring monthly donation mandate via Razorpay Subscriptions / e-Mandate can cancel their recurring plan at any time with zero penalty. Simply send an email to <strong>info@kautikefoundation.org</strong> at least 3 business days before the next scheduled deduction date, and your mandate will be stopped immediately.
              </p>
            </div>

            <div className="policy-block">
              <h3>6. 80G Tax Exemption Certificate Implications</h3>
              <p>
                If an official Section 80G Tax Exemption Certificate (Form 10BE) has already been issued for the donated amount prior to the refund request, the certificate will be formally revoked and invalidated with the Income Tax Department upon refund processing. The donor must not claim tax deductions on refunded contributions.
              </p>
            </div>

            <div className="policy-block">
              <h3>7. Contact for Grievances &amp; Support</h3>
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
