"use client";

import React, { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

type ReceiptProps = {
  donorName: string;
  email: string;
  phone: string;
  address: string;
  pan: string;
  amount: number;
  date: string;
  receiptNumber: string;
  paymentId: string;
  purpose: string;
  onClose?: () => void;
};

const formatAmount = (amount: number) =>
  `₹ ${amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

const belowTwenty = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];
const tens = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

const wordsBelowThousand = (value: number): string => {
  if (value < 20) return belowTwenty[value];
  if (value < 100)
    return `${tens[Math.floor(value / 10)]}${
      value % 10 ? ` ${belowTwenty[value % 10]}` : ""
    }`;
  return `${belowTwenty[Math.floor(value / 100)]} Hundred${
    value % 100 ? ` ${wordsBelowThousand(value % 100)}` : ""
  }`;
};

const amountInWords = (amount: number) => {
  let value = Math.max(0, Math.round(amount));
  if (!value) return "Rupees Zero Only";
  const parts: string[] = [];
  const crore = Math.floor(value / 10000000);
  value %= 10000000;
  const lakh = Math.floor(value / 100000);
  value %= 100000;
  const thousand = Math.floor(value / 1000);
  value %= 1000;
  if (crore) parts.push(`${wordsBelowThousand(crore)} Crore`);
  if (lakh) parts.push(`${wordsBelowThousand(lakh)} Lakh`);
  if (thousand) parts.push(`${wordsBelowThousand(thousand)} Thousand`);
  if (value) parts.push(wordsBelowThousand(value));
  return `Rupees ${parts.join(" ")} Only`;
};

export function DonationReceipt({
  donorName,
  email,
  phone,
  address,
  pan,
  amount,
  date,
  receiptNumber,
  paymentId,
  purpose,
  onClose,
}: ReceiptProps) {
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingPng, setDownloadingPng] = useState(false);

  const safeFilename = `Kautike_Donation_Receipt_${(receiptNumber || "KCF_Receipt").replace(/[^a-zA-Z0-9_-]/g, "_")}`;

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    try {
      const element = document.getElementById("donation-receipt-print-area");
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF",
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.98);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, Math.min(pdfHeight, 297), undefined, "FAST");
      pdf.save(`${safeFilename}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      window.print();
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleDownloadPng = async () => {
    setDownloadingPng(true);
    try {
      const element = document.getElementById("donation-receipt-print-area");
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF",
      });

      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${safeFilename}.png`;
      link.href = imgData;
      link.click();
    } catch (err) {
      console.error("Image generation failed:", err);
    } finally {
      setDownloadingPng(false);
    }
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <section className="donation-receipt-wrapper" style={{ padding: "16px 8px" }}>
      {/* Top Action Toolbar */}
      <div
        className="donation-receipt-actions"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "16px",
          maxWidth: "840px",
          margin: "0 auto 16px auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "14px", fontWeight: 800, color: "#134B36" }}>
            ✓ Verified Official 80G Receipt
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <button
            type="button"
            disabled={downloadingPdf}
            onClick={handleDownloadPdf}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#134B36",
              color: "#FFFFFF",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "13.5px",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(19,75,54,0.28)",
              transition: "all 0.15s ease",
            }}
          >
            {downloadingPdf ? "⏳ Generating PDF..." : "📥 Download Receipt (PDF)"}
          </button>

          <button
            type="button"
            disabled={downloadingPng}
            onClick={handleDownloadPng}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#FFFFFF",
              color: "#134B36",
              border: "1.5px solid #134B36",
              padding: "9px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {downloadingPng ? "⏳ Saving Image..." : "🖼️ Download Image (PNG)"}
          </button>

          <button
            type="button"
            className="donation-receipt-print"
            onClick={printReceipt}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#F8FAFC",
              color: "#334155",
              border: "1.5px solid #CBD5E1",
              padding: "9px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            🖨 Print
          </button>
        </div>
      </div>

      {/* Main Official Receipt Document */}
      <article
        id="donation-receipt-print-area"
        style={{
          maxWidth: "840px",
          margin: "0 auto",
          position: "relative",
          backgroundColor: "#FFFFFF",
          border: "3px solid #134B36",
          borderRadius: "6px",
          padding: "4px",
          boxShadow: "0 12px 36px rgba(0,0,0,0.08)",
          fontFamily: "'Inter', 'Montserrat', Arial, sans-serif",
          color: "#1E293B",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            border: "1.5px solid #134B36",
            padding: "clamp(16px, 3vw, 24px)",
            position: "relative",
            background: "#FFFFFF",
            minHeight: "720px",
          }}
        >
          {/* Top Decorative Gold/Green Corner */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "80px",
              height: "80px",
              pointerEvents: "none",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
              <path d="M0,0 L90,0 Q30,10 0,90 Z" fill="#134B36" />
              <path d="M0,0 L60,0 Q20,8 0,60 Z" fill="#D4AF37" />
            </svg>
          </div>

          {/* Top Right Decorative Gold/Green Corner */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "80px",
              height: "80px",
              pointerEvents: "none",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
              <path d="M100,0 L10,0 Q70,10 100,90 Z" fill="#134B36" />
              <path d="M100,0 L40,0 Q80,8 100,60 Z" fill="#D4AF37" />
            </svg>
          </div>

          {/* Bottom Right Decorative Corner */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "70px",
              height: "70px",
              pointerEvents: "none",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
              <path d="M100,100 L10,100 Q70,90 100,10 Z" fill="#134B36" />
              <path d="M100,100 L40,100 Q80,92 100,40 Z" fill="#D4AF37" />
            </svg>
          </div>

          {/* Watermark Logo in Center Background */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "45%",
              transform: "translate(-50%, -50%)",
              width: "320px",
              opacity: 0.04,
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <img
              src="/kautike-logo.png"
              alt="Watermark"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          {/* ── 1. HEADER ROW ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "12px",
              borderBottom: "1.5px solid #E2E8F0",
              gap: "16px",
              position: "relative",
              zIndex: 2,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px", paddingLeft: "10px" }}>
              <img
                src="/kautike-logo.png"
                alt="Kautike Charitable Foundation Logo"
                style={{ width: "76px", height: "76px", objectFit: "contain", flexShrink: 0 }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/icon.png";
                }}
              />
              <div style={{ textAlign: "center" }}>
                <h1
                  style={{
                    margin: 0,
                    fontSize: "26px",
                    fontWeight: 900,
                    fontFamily: "var(--font-cinzel), 'Cinzel', Georgia, serif",
                    color: "#134B36",
                    letterSpacing: "0.05em",
                    lineHeight: 1.1,
                  }}
                >
                  KAUTIKE
                </h1>
                <div
                  style={{
                    fontSize: "13.5px",
                    fontWeight: 800,
                    fontFamily: "var(--font-cinzel), 'Cinzel', Georgia, serif",
                    color: "#134B36",
                    letterSpacing: "0.08em",
                    marginTop: "2px",
                  }}
                >
                  CHARITABLE FOUNDATION
                </div>
                <div
                  style={{
                    fontSize: "10.5px",
                    fontStyle: "italic",
                    color: "#2D3748",
                    marginTop: "3px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <span style={{ color: "#134B36" }}>🍃</span>
                  <span>Empowering Lives, Enriching Society</span>
                </div>
              </div>
            </div>

            <div
              style={{
                borderLeft: "1.5px solid #CBD5E1",
                paddingLeft: "18px",
                textAlign: "left",
                minWidth: "160px",
              }}
            >
              <div style={{ fontSize: "11px", color: "#64748B", fontWeight: 600 }}>
                Receipt No.
              </div>
              <div
                style={{
                  fontSize: "14.5px",
                  fontWeight: 800,
                  color: "#134B36",
                  marginBottom: "4px",
                  letterSpacing: "0.02em",
                }}
              >
                {receiptNumber || "KCF/2026/00001"}
              </div>
              <div style={{ fontSize: "11.5px", color: "#1E293B" }}>
                <span style={{ fontWeight: 700, color: "#134B36" }}>Date:</span>{" "}
                <span style={{ fontWeight: 600 }}>{date}</span>
              </div>
            </div>
          </div>

          {/* ── 2. RECEIPT TITLE & SUBTITLE ── */}
          <div style={{ textAlign: "center", margin: "14px 0 14px", position: "relative", zIndex: 2 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <span style={{ color: "#D4AF37", fontSize: "22px" }}>❧</span>
              <h2
                style={{
                  margin: 0,
                  fontSize: "30px",
                  fontFamily: "var(--font-caveat), 'Caveat', cursive, Georgia, serif",
                  fontWeight: 700,
                  color: "#134B36",
                  letterSpacing: "0.02em",
                }}
              >
                Donation Receipt
              </h2>
              <span style={{ color: "#D4AF37", fontSize: "22px" }}>☙</span>
            </div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#1E293B",
                marginTop: "1px",
              }}
            >
              (Under Section 80G of the Income Tax Act, 1961)
            </div>
            <div
              style={{
                fontSize: "11px",
                fontStyle: "italic",
                fontWeight: 700,
                color: "#134B36",
                marginTop: "2px",
              }}
            >
              Thank you for your generous support!
            </div>
          </div>

          {/* ── 3. DONOR DETAILS & DONATION DETAILS (2-COLUMN GRID) ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px 24px",
              margin: "12px 0 14px",
              fontSize: "12px",
              lineHeight: 1.45,
              position: "relative",
              zIndex: 2,
            }}
          >
            <div>
              <div
                style={{
                  backgroundColor: "#134B36",
                  color: "#FFFFFF",
                  padding: "5px 14px",
                  borderRadius: "20px",
                  fontSize: "11.5px",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "10px",
                  letterSpacing: "0.02em",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                Donor Details
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "100px 12px 1fr", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, color: "#1E293B" }}>Donor Name</span>
                  <span style={{ fontWeight: 700, color: "#64748B" }}>:</span>
                  <span style={{ fontWeight: 800, color: "#134B36" }}>{donorName || "Nilesh Kute"}</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "100px 12px 1fr", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, color: "#1E293B" }}>PAN</span>
                  <span style={{ fontWeight: 700, color: "#64748B" }}>:</span>
                  <span style={{ fontWeight: 700, color: "#0F172A", letterSpacing: "0.05em" }}>
                    {pan ? pan.toUpperCase() : "—"}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "100px 12px 1fr", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, color: "#1E293B" }}>Address</span>
                  <span style={{ fontWeight: 700, color: "#64748B" }}>:</span>
                  <span style={{ color: "#334155", wordBreak: "break-word" }}>
                    {address || "—"}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "100px 12px 1fr", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, color: "#1E293B" }}>Email</span>
                  <span style={{ fontWeight: 700, color: "#64748B" }}>:</span>
                  <span style={{ color: "#334155", wordBreak: "break-all" }}>
                    {email || "—"}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "100px 12px 1fr", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, color: "#1E293B" }}>Mobile</span>
                  <span style={{ fontWeight: 700, color: "#64748B" }}>:</span>
                  <span style={{ color: "#334155" }}>
                    {phone || "—"}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ borderLeft: "1px solid #E2E8F0", paddingLeft: "18px" }}>
              <div
                style={{
                  backgroundColor: "#134B36",
                  color: "#FFFFFF",
                  padding: "5px 14px",
                  borderRadius: "20px",
                  fontSize: "11.5px",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "10px",
                  letterSpacing: "0.02em",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
                Donation Details
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "115px 12px 1fr", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, color: "#1E293B" }}>Donation Amount</span>
                  <span style={{ fontWeight: 700, color: "#64748B" }}>:</span>
                  <span style={{ fontWeight: 900, color: "#134B36", fontSize: "13.5px" }}>
                    {formatAmount(amount)}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "115px 12px 1fr", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, color: "#1E293B" }}>Payment Mode</span>
                  <span style={{ fontWeight: 700, color: "#64748B" }}>:</span>
                  <span style={{ fontWeight: 700, color: "#134B36" }}>
                    UPI
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "115px 12px 1fr", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, color: "#1E293B" }}>Transaction ID</span>
                  <span style={{ fontWeight: 700, color: "#64748B" }}>:</span>
                  <span style={{ fontFamily: "monospace", fontSize: "11px", color: "#334155", wordBreak: "break-all" }}>
                    {paymentId || "UPI/426812345678"}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "115px 12px 1fr", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, color: "#1E293B" }}>Donation Purpose</span>
                  <span style={{ fontWeight: 700, color: "#64748B" }}>:</span>
                  <div>
                    <div style={{ fontWeight: 700, color: "#0F172A" }}>{purpose || "General Donation"}</div>
                    <div style={{ fontSize: "10.5px", color: "#64748B" }}>(Towards Charitable Activities)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 4. AMOUNT IN WORDS CARD ── */}
          <div
            style={{
              position: "relative",
              border: "1.5px solid #134B36",
              borderRadius: "8px",
              padding: "12px 16px 10px",
              margin: "14px 0",
              textAlign: "center",
              zIndex: 2,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-11px",
                left: "14px",
                backgroundColor: "#134B36",
                color: "#FFFFFF",
                padding: "2px 12px",
                borderRadius: "14px",
                fontSize: "11px",
                fontWeight: 800,
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <span>📝</span>
              <span>Amount in Words</span>
            </div>

            <div
              style={{
                fontFamily: "var(--font-caveat), 'Caveat', cursive, Georgia, serif",
                fontSize: "20px",
                fontStyle: "italic",
                fontWeight: 700,
                color: "#134B36",
                marginTop: "2px",
              }}
            >
              {amountInWords(amount)}
            </div>
          </div>

          {/* ── 5. ORGANIZATION DETAILS BOX WITH OFFICIAL STAMP ── */}
          <div
            style={{
              position: "relative",
              border: "1.5px solid #134B36",
              borderRadius: "8px",
              padding: "14px 16px 12px",
              margin: "14px 0",
              zIndex: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-11px",
                left: "14px",
                backgroundColor: "#134B36",
                color: "#FFFFFF",
                padding: "2px 12px",
                borderRadius: "14px",
                fontSize: "11px",
                fontWeight: 800,
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <span>🏛️</span>
              <span>Organization Details</span>
            </div>

            <div style={{ fontSize: "11.5px", display: "flex", flexDirection: "column", gap: "5px", flex: 1 }}>
              <div style={{ display: "grid", gridTemplateColumns: "185px 12px 1fr", alignItems: "baseline" }}>
                <span style={{ fontWeight: 700, color: "#1E293B" }}>Name of the Trust/Organization</span>
                <span style={{ fontWeight: 700, color: "#64748B" }}>:</span>
                <span style={{ fontWeight: 800, color: "#134B36" }}>KAUTIKE CHARITABLE FOUNDATION</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "185px 12px 1fr", alignItems: "baseline" }}>
                <span style={{ fontWeight: 700, color: "#1E293B" }}>PAN</span>
                <span style={{ fontWeight: 700, color: "#64748B" }}>:</span>
                <span style={{ fontWeight: 800, color: "#0F172A", letterSpacing: "0.05em" }}>AALCK6167A</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "185px 12px 1fr", alignItems: "baseline" }}>
                <span style={{ fontWeight: 700, color: "#1E293B" }}>Registered Address</span>
                <span style={{ fontWeight: 700, color: "#64748B" }}>:</span>
                <span style={{ color: "#334155", lineHeight: 1.35 }}>
                  H NO A-1, DSOUZA SADAN, LINK TILAK NGR, SAKINAKA S.O, MUMBAI, MUMBAI, Maharashtra - 400072
                </span>
              </div>
            </div>

            <div style={{ flexShrink: 0, width: "100px", height: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src="/images/kautike-stamp-2026.png"
                alt="Kautike Round Stamp"
                style={{ width: "95px", height: "95px", objectFit: "contain" }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/kautike-stamp.png";
                }}
              />
            </div>
          </div>

          {/* ── 6. 80G PROVISIONAL APPROVAL DETAILS & TRUSTEE SIGNATURE ── */}
          <div
            style={{
              position: "relative",
              border: "1.5px solid #CBD5E1",
              borderRadius: "8px",
              padding: "14px 16px 10px",
              margin: "14px 0",
              zIndex: 2,
              display: "grid",
              gridTemplateColumns: "1.65fr 1fr",
              gap: "16px",
              backgroundColor: "#FAFBFB",
            }}
          >
            <div style={{ fontSize: "11px", display: "flex", flexDirection: "column", gap: "4px" }}>
              <div
                style={{
                  color: "#134B36",
                  fontSize: "11.5px",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "4px",
                }}
              >
                <span style={{ color: "#134B36", fontSize: "13px" }}>🛡️</span>
                <span>80G Provisional Approval Details</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "160px 10px 1fr", alignItems: "baseline" }}>
                <span style={{ color: "#475569", fontWeight: 600 }}>Document Identification No.</span>
                <span>:</span>
                <span style={{ fontWeight: 800, color: "#134B36" }}>AALCK6167AF2025101</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "160px 10px 1fr", alignItems: "baseline" }}>
                <span style={{ color: "#475569", fontWeight: 600 }}>Application No.</span>
                <span>:</span>
                <span style={{ fontWeight: 700, color: "#0F172A" }}>737266840200925</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "160px 10px 1fr", alignItems: "baseline" }}>
                <span style={{ color: "#475569", fontWeight: 600 }}>Unique Registration No.</span>
                <span>:</span>
                <span style={{ fontWeight: 800, color: "#134B36" }}>AALCK6167AF20251</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "160px 10px 1fr", alignItems: "baseline" }}>
                <span style={{ color: "#475569", fontWeight: 600 }}>Section</span>
                <span>:</span>
                <span style={{ color: "#334155", fontSize: "10.5px" }}>
                  12-Sub-clause (A) of clause (iv) of first proviso to sub-section (5) of section 80G
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "160px 10px 1fr", alignItems: "baseline" }}>
                <span style={{ color: "#475569", fontWeight: 600 }}>Date of Provisional Approval</span>
                <span>:</span>
                <span style={{ fontWeight: 700, color: "#0F172A" }}>27-09-2025</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "160px 10px 1fr", alignItems: "baseline" }}>
                <span style={{ color: "#475569", fontWeight: 600 }}>Assessment Year(s)</span>
                <span>:</span>
                <span style={{ fontWeight: 800, color: "#134B36" }}>AY 2026-27 to AY 2028-29</span>
              </div>
            </div>

            {/* Right Sub-Box: Exemption Note & Trustee Signature */}
            <div
              style={{
                borderLeft: "1px solid #CBD5E1",
                paddingLeft: "18px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "center",
                minHeight: "140px",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  color: "#475569",
                  lineHeight: 1.35,
                  textAlign: "left",
                  width: "100%",
                  marginBottom: "8px",
                }}
              >
                This donation is eligible for 100% tax exemption under Section 80G of the Income Tax Act, 1961, subject to the conditions prescribed therein.
              </div>

              {/* Vijay Jadhav Signature Block */}
              <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "auto" }}>
                <div
                  style={{
                    height: "44px",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    marginBottom: "3px",
                  }}
                >
                  <img
                    src="/images/signatures/vijay-jadhav.png"
                    alt="Vijay Jadhav Signature"
                    style={{
                      height: "46px",
                      maxWidth: "140px",
                      width: "auto",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
                <div
                  style={{
                    borderTop: "1.5px solid #134B36",
                    paddingTop: "3px",
                    width: "140px",
                    fontSize: "11px",
                    fontWeight: 900,
                    color: "#134B36",
                    letterSpacing: "0.04em",
                    textAlign: "center",
                  }}
                >
                  VIJAY JADHAV
                </div>
                <div style={{ fontSize: "10px", color: "#64748B", fontWeight: 700, textAlign: "center" }}>
                  Trustee
                </div>
              </div>
            </div>
          </div>

          {/* ── 7. FOOTER CONTACT STRIP & QR CODE ── */}
          <div
            style={{
              borderTop: "1.5px solid #134B36",
              paddingTop: "10px",
              marginTop: "12px",
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "16px",
              alignItems: "center",
              fontSize: "10.5px",
              color: "#334155",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://kautikefoundation.org"
                alt="Website QR"
                style={{ width: "52px", height: "52px", display: "block", border: "1px solid #CBD5E1", borderRadius: "4px" }}
              />
              <div>
                <div style={{ fontSize: "9.5px", color: "#64748B" }}>Scan to visit our website</div>
                <div style={{ fontSize: "10px", fontWeight: 700, color: "#134B36" }}>www.kautikefoundation.org</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2px", lineHeight: 1.3 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "5px" }}>
                <span>📍</span>
                <span style={{ fontSize: "10px" }}>
                  Office No. A-1, D&apos;Souza Sadan, Lokmanya Tilak Nagar, 90 Feet Road, Sakinaka, Mumbai - 400 072.
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span>📞</span>
                <span style={{ fontSize: "10px", fontWeight: 600 }}>+91 83560 08675 / +91 81083 62688</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span>✉️</span>
                <span style={{ fontSize: "10px" }}>info@kautikefoundation.org</span>
              </div>
            </div>

            <div style={{ textAlign: "center", minWidth: "120px" }}>
              <div
                style={{
                  fontFamily: "var(--font-caveat), 'Caveat', cursive, Georgia, serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#134B36",
                  lineHeight: 1.1,
                }}
              >
                Together
                <br />
                We Make a
                <br />
                Difference
              </div>
              <div style={{ fontSize: "12px", marginTop: "2px" }}>💚</div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
