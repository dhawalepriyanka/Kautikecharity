import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export const metadata = {
  title: "Terms & Conditions · Kautike Charitable Foundation",
  description: "Terms and Conditions governing the use of the Kautike Charitable Foundation website and donation portal.",
};

export default function TermsPage() {
  return (
    <main className="page-fade-in" id="top">
      <Header />

      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <span className="subpage-badge">LEGAL &amp; COMPLIANCE</span>
          <h1>Terms &amp; <span className="yellow-hand">Conditions</span></h1>
          <p>Important information regarding online donations, receipt issuance, and website usage.</p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="legal-content-container">
          <h2>1. Use of Website</h2>
          <p>By accessing this website, you agree to comply with and be bound by the following terms of use. The content of this website is for your general information and charitable engagement only.</p>

          <h2>2. Donations &amp; Tax Deductions</h2>
          <p>All donations made to Kautike Charitable Foundation are voluntary, non-refundable charitable contributions utilized strictly for child education, malnutrition eradication, health relief, and ecological restoration. Donations made by Indian citizens are eligible for 50% tax deduction under Section 80G of the Income Tax Act, 1961.</p>

          <h2>3. Issuance of 80G Certificates</h2>
          <p>80G certificates will be issued under the donor name and PAN provided during checkout. Please ensure your PAN number and email address are entered accurately to avoid discrepancies in annual ITR Form 10BE filing.</p>

          <h2>4. Governance &amp; Jurisdiction</h2>
          <p>Any disputes arising out of the use of this website or donation transactions shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.</p>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
