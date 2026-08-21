"use client";

import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CertificateOfContribution } from "../components/CertificateOfContribution";

export default function CertificatePage() {
  const [donorName, setDonorName] = useState("Akhil Kamble");
  const [amount, setAmount] = useState<number>(5000);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const nameParam = params.get("name");
      const amountParam = params.get("amount");
      if (nameParam) setDonorName(nameParam);
      if (amountParam && !isNaN(Number(amountParam))) setAmount(Number(amountParam));
    }
  }, []);

  return (
    <main className="page-fade-in bg-cream" id="top" style={{ backgroundColor: "#FAF8F5", minHeight: "100vh" }}>
      <Header />

      <section className="simple-page-header no-print">
        <span className="subpage-badge">OFFICIAL DONOR RECOGNITION</span>
        <h1 className="cry-wc-main-title">Certificate of <span className="cry-hand-gold">Contribution</span></h1>
        <div className="cry-wc-yellow-bar" />
        <p className="cry-wc-lead-text">
          Official certificate presented to verified donors and changemakers supporting Kautike Charitable Foundation.
        </p>
      </section>

      {/* Interactive Controls Bar for Admin / Donor */}
      <section className="section-pad no-print" style={{ padding: "0 6vw 24px" }}>
        <div className="about-container" style={{ maxWidth: "860px" }}>
          <div style={{ background: "#FFFFFF", padding: "18px 24px", borderRadius: "12px", border: "1.5px solid #E5E7EB", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "space-between", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", gap: "12px", flex: 1, minWidth: "260px" }}>
              <div style={{ flex: 2 }}>
                <label style={{ fontSize: "11px", fontWeight: 800, color: "#64748B", display: "block", marginBottom: "4px" }}>DONOR FULL NAME</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Enter Donor Name"
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1.5px solid #CBD5E1", fontSize: "14px", fontWeight: 700 }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "11px", fontWeight: 800, color: "#64748B", display: "block", marginBottom: "4px" }}>AMOUNT (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1.5px solid #CBD5E1", fontSize: "14px", fontWeight: 700 }}
                />
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="cry-yellow-btn"
              style={{ padding: "10px 20px", fontSize: "13.5px" }}
            >
              🖨️ Download / Print Certificate (PDF)
            </button>
          </div>
        </div>
      </section>

      {/* The Certificate */}
      <section style={{ padding: "0 6vw 80px" }}>
        <CertificateOfContribution
          donorName={donorName}
          amount={amount}
        />
      </section>

      <Footer />
    </main>
  );
}
