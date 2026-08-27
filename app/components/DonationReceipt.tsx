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
  isPreview?: boolean;
  onClose?: () => void;
};

const formatAmount = (amount: number) =>
  `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

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
  isPreview = false,
  onClose,
}: ReceiptProps) {
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingPng, setDownloadingPng] = useState(false);

  const safeFilename = `Kautike_Donation_Receipt_${(receiptNumber || "receipt").replace(/[^a-zA-Z0-9_-]/g, "_")}`;

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    try {
      const element = document.getElementById("donation-receipt-print-area");
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 3.5, // Ultra-high resolution 3.5x scale (approx 3000px high)
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF",
        imageTimeout: 0,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "NONE");
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
        scale: 3.5, // Ultra-high resolution 3.5x scale
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF",
        imageTimeout: 0,
      });

      const imgData = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.download = `${safeFilename}.png`;
      a.href = imgData;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("PNG download failed:", err);
    } finally {
      setDownloadingPng(false);
    }
  };

  const printReceipt = () => window.print();

  return (
    <section className="donation-receipt" aria-label="Donation receipt">
      {/* Top Action Bar */}
      <div
        className="donation-receipt-actions no-print"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "18px",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "9px 18px",
              borderRadius: "8px",
              border: "1.5px solid #CBD5E1",
              background: "#FFFFFF",
              cursor: "pointer",
              fontWeight: 700,
              color: "#334155",
              fontSize: "13.5px",
            }}
          >
            ← Back to donation
          </button>
        )}

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
          {/* Direct Download PDF Button */}
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

          {/* Download Image Button */}
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

          {/* Print Button */}
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
          maxWidth: "860px",
          margin: "0 auto",
          position: "relative",
          boxShadow: "0 12px 36px rgba(0,0,0,0.08)",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        {isPreview && (
          <div
            className="no-print"
            style={{
              position: "absolute",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              backgroundColor: "#FEF3C7",
              color: "#92400E",
              border: "1px dashed #F59E0B",
              borderRadius: "4px",
              textAlign: "center",
              fontSize: "11px",
              fontWeight: 800,
              padding: "4px 14px",
              letterSpacing: "0.06em",
            }}
          >
            SAMPLE RECEIPT — NOT A PAYMENT CONFIRMATION
          </div>
        )}

        {/* The 100% authentic clean template image from receipt.jpeg */}
        <img
          src="/images/receipt-clean-template.png"
          alt="Kautike Donation Receipt"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />

        {/* Dynamic Verified Text Overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            fontFamily: "'Inter', 'Montserrat', Arial, sans-serif",
            fontSize: "clamp(8px, 1.35vw, 15px)",
            color: "#1E293B",
            pointerEvents: "none",
          }}
        >
          {/* Receipt No & Date Block */}
          <div
            style={{
              position: "absolute",
              left: "66.5%",
              top: "4.8%",
              width: "28%",
            }}
          >
            <div style={{ fontSize: "0.85em", color: "#475569", fontWeight: 600 }}>
              Receipt No.
            </div>
            <div
              style={{
                fontSize: "1.18em",
                fontWeight: 800,
                color: "#134B36",
                letterSpacing: "0.02em",
                margin: "2px 0 6px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {receiptNumber}
            </div>
            <div style={{ fontSize: "0.95em", color: "#1E293B", fontWeight: 700 }}>
              <span style={{ color: "#134B36" }}>Date:</span>{" "}
              <span style={{ fontWeight: 600 }}>{date}</span>
            </div>
          </div>

          {/* Left Column Values */}
          {/* Donor Name */}
          <div
            style={{
              position: "absolute",
              left: "27.2%",
              top: "32.6%",
              width: "22%",
              fontWeight: 800,
              color: "#134B36",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {donorName || "Generous Donor"}
          </div>

          {/* PAN */}
          <div
            style={{
              position: "absolute",
              left: "27.2%",
              top: "36.5%",
              width: "22%",
              fontWeight: 700,
              color: "#0F172A",
              letterSpacing: "0.04em",
            }}
          >
            {pan ? pan.toUpperCase() : "—"}
          </div>

          {/* Address */}
          <div
            style={{
              position: "absolute",
              left: "27.2%",
              top: "39.4%",
              width: "22%",
              fontSize: "0.78em",
              lineHeight: 1.3,
              color: "#334155",
              maxHeight: "8%",
              overflow: "hidden",
            }}
          >
            {address || "—"}
          </div>

          {/* Email */}
          <div
            style={{
              position: "absolute",
              left: "27.2%",
              top: "48.4%",
              width: "22%",
              color: "#334155",
              fontSize: "0.85em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {email || "—"}
          </div>

          {/* Mobile */}
          <div
            style={{
              position: "absolute",
              left: "27.2%",
              top: "52.3%",
              width: "22%",
              color: "#334155",
              fontWeight: 600,
            }}
          >
            {phone || "—"}
          </div>

          {/* Right Column Values */}
          {/* Donation Amount */}
          <div
            style={{
              position: "absolute",
              left: "76.6%",
              top: "32.6%",
              width: "20%",
              fontWeight: 800,
              color: "#134B36",
              fontSize: "1.05em",
            }}
          >
            {formatAmount(amount)}
          </div>

          {/* Payment Mode */}
          <div
            style={{
              position: "absolute",
              left: "76.6%",
              top: "36.5%",
              width: "20%",
              fontWeight: 700,
              color: "#134B36",
            }}
          >
            Online (Razorpay)
          </div>

          {/* Transaction ID */}
          <div
            style={{
              position: "absolute",
              left: "76.6%",
              top: "40.5%",
              width: "20%",
              fontFamily: "monospace",
              fontSize: "0.78em",
              color: "#334155",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {paymentId}
          </div>

          {/* Donation Purpose */}
          <div
            style={{
              position: "absolute",
              left: "76.6%",
              top: "43.5%",
              width: "20%",
              fontSize: "0.82em",
              lineHeight: 1.3,
            }}
          >
            <div style={{ fontWeight: 700, color: "#0F172A" }}>{purpose}</div>
            <div style={{ fontSize: "0.85em", color: "#64748B" }}>
              (Towards Charitable Activities)
            </div>
          </div>

          {/* Amount in Words */}
          <div
            style={{
              position: "absolute",
              left: "32.6%",
              top: "53.7%",
              width: "58%",
              fontStyle: "italic",
              fontWeight: 700,
              color: "#134B36",
              fontSize: "0.95em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {amountInWords(amount)}
          </div>
        </div>
      </article>
    </section>
  );
}
