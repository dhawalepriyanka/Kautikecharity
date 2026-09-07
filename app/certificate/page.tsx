"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CertificateOfContribution } from "../components/CertificateOfContribution";
import { DonationReceipt } from "../components/DonationReceipt";

export default function CertificatePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"receipt" | "certificate">("receipt");
  const [donorName, setDonorName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [pan, setPan] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [receiptNumber, setReceiptNumber] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [loaded, setLoaded] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const nameParam = params.get("name");
      const amountParam = params.get("amount");
      const panParam = params.get("pan");
      const tabParam = params.get("tab");

      if (!nameParam && !amountParam) {
        router.replace("/donate");
        return;
      }

      if (nameParam) setDonorName(nameParam);
      if (amountParam && !isNaN(Number(amountParam))) setAmount(Number(amountParam));
      if (panParam) setPan(panParam);
      if (tabParam === "certificate" || tabParam === "receipt") setActiveTab(tabParam);
      setLoaded(true);
    }
  }, [router]);

  return (
    <main className="page-fade-in bg-cream" id="top" style={{ backgroundColor: "#FAF8F5", minHeight: "100vh" }}>
      <Header />

      <section className="simple-page-header no-print" style={{ textAlign: "center", padding: "48px 20px 24px" }}>
        <span className="subpage-badge" style={{ backgroundColor: "#134B36", color: "#FFFFFF", padding: "6px 14px", borderRadius: "20px", fontSize: "11px", fontWeight: 800, letterSpacing: "0.06em", display: "inline-block", marginBottom: "12px" }}>
          OFFICIAL VERIFIED DONOR PORTAL
        </span>
        <h1 className="cry-wc-main-title" style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 900, color: "#0F172A", margin: "0 0 8px" }}>
          Donation Receipt & <span className="cry-hand-gold" style={{ color: "#134B36" }}>Certificate</span>
        </h1>
        <div className="cry-wc-yellow-bar" style={{ width: "60px", height: "4px", backgroundColor: "#D4AF37", margin: "8px auto 16px", borderRadius: "2px" }} />
        <p className="cry-wc-lead-text" style={{ maxWidth: "680px", margin: "0 auto 20px", color: "#475569", fontSize: "15px", lineHeight: 1.5 }}>
          View, customize, and download official 80G tax exemption receipts and certificates of contribution issued by Kautike Charitable Foundation.
        </p>

        {/* Tab Selector */}
        <div
          style={{
            display: "inline-flex",
            background: "#FFFFFF",
            padding: "4px",
            borderRadius: "12px",
            border: "1.5px solid #E2E8F0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            gap: "4px",
            margin: "0 auto 16px",
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab("receipt")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "receipt" ? "#134B36" : "transparent",
              color: activeTab === "receipt" ? "#FFFFFF" : "#475569",
              fontWeight: 800,
              fontSize: "13.5px",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            📄 80G Donation Receipt
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("certificate")}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "certificate" ? "#134B36" : "transparent",
              color: activeTab === "certificate" ? "#FFFFFF" : "#475569",
              fontWeight: 800,
              fontSize: "13.5px",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            📜 Certificate of Contribution
          </button>
        </div>

        {/* Customize Data Toggle */}
        <div style={{ marginBottom: "8px" }}>
          <button
            type="button"
            onClick={() => setShowCustomizer(!showCustomizer)}
            style={{
              background: "transparent",
              border: "none",
              color: "#134B36",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {showCustomizer ? "▲ Hide Demo Details Form" : "✏️ Customize Demo Donor Details"}
          </button>
        </div>

        {/* Live Input Controls */}
        {showCustomizer && (
          <div
            style={{
              maxWidth: "720px",
              margin: "12px auto 24px",
              background: "#FFFFFF",
              padding: "18px 24px",
              borderRadius: "12px",
              border: "1.5px solid #E2E8F0",
              boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
              textAlign: "left",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                  Donor Name
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                  PAN Number
                </label>
                <input
                  type="text"
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", marginBottom: "4px" }}>
                  Receipt Number
                </label>
                <input
                  type="text"
                  value={receiptNumber}
                  onChange={(e) => setReceiptNumber(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px" }}
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Main Document Display */}
      <section style={{ padding: "0 clamp(12px, 4vw, 32px) 80px", maxWidth: "980px", margin: "0 auto" }}>
        {loaded && (
          activeTab === "receipt" ? (
            <DonationReceipt
              donorName={donorName}
              email={email}
              phone={phone}
              address={address}
              pan={pan}
              amount={amount}
              date={date}
              receiptNumber={receiptNumber}
              paymentId="UPI/426812345678"
              paymentMode="UPI"
              purpose="General Donation"
            />
          ) : (
            <CertificateOfContribution
              donorName={donorName}
              amount={amount}
              date={date}
            />
          )
        )}
      </section>

      <Footer />
    </main>
  );
}
