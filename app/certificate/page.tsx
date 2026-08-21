"use client";

import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CertificateOfContribution } from "../components/CertificateOfContribution";

export default function CertificatePage() {
  const [donorName, setDonorName] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const nameParam = params.get("name");
      const amountParam = params.get("amount");
      if (nameParam) setDonorName(nameParam);
      if (amountParam && !isNaN(Number(amountParam))) setAmount(Number(amountParam));
      setLoaded(true);
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

      {/* The Certificate */}
      <section style={{ padding: "0 clamp(12px, 5vw, 40px) 80px", maxWidth: "960px", margin: "0 auto" }}>
        {loaded && (
          donorName ? (
            <CertificateOfContribution
              donorName={donorName}
              amount={amount}
            />
          ) : (
            <div style={{ background: "#FFFFFF", padding: "40px 24px", borderRadius: "16px", border: "1.5px solid #E2E8F0", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>📜</div>
              <h2 style={{ fontSize: "22px", color: "#1E293B", margin: "0 0 8px" }}>Verified Donor Certificate Portal</h2>
              <p style={{ color: "#64748B", fontSize: "14px", maxWidth: "520px", margin: "0 auto 24px", lineHeight: "1.5" }}>
                Official certificates of contribution and 80G tax exemption receipts are issued automatically upon making a donation.
              </p>
              <a
                href="/donate"
                className="cry-yellow-btn"
                style={{ display: "inline-block", padding: "12px 28px", textDecoration: "none", fontSize: "14px", fontWeight: 800 }}
              >
                Make a Contribution to Receive Certificate ➔
              </a>
            </div>
          )
        )}
      </section>

      <Footer />
    </main>
  );
}
