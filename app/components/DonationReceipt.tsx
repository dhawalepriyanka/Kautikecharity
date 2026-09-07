"use client";

import { useState, useEffect, useRef } from "react";
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
  paymentId?: string;
  paymentMode?: string;
  purpose?: string;
  onClose?: () => void;
};

const formatAmount = (amount: number) =>
  `₹ ${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

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

// Helper to wrap text nicely on canvas
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number = 3
): string[] {
  if (!text) return [];
  
  // First try splitting by commas if available for clean address formatting
  const rawParts = text.split(",").map((s) => s.trim()).filter(Boolean);
  const lines: string[] = [];
  let currentLine = "";

  for (let i = 0; i < rawParts.length; i++) {
    const part = i < rawParts.length - 1 ? `${rawParts[i]},` : rawParts[i];
    const testLine = currentLine ? `${currentLine} ${part}` : part;
    const testWidth = ctx.measureText(testLine).width;

    if (testWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = part;
    }
    if (lines.length >= maxLines - 1) break;
  }
  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  // Fallback to word-by-word if single line is still too wide
  if (lines.length === 0 || (lines.length === 1 && ctx.measureText(lines[0]).width > maxWidth)) {
    const words = text.split(/\s+/);
    const wordLines: string[] = [];
    let cur = "";
    for (const w of words) {
      const test = cur ? `${cur} ${w}` : w;
      if (ctx.measureText(test).width <= maxWidth) {
        cur = test;
      } else {
        if (cur) wordLines.push(cur);
        cur = w;
      }
      if (wordLines.length >= maxLines - 1) break;
    }
    if (cur && wordLines.length < maxLines) wordLines.push(cur);
    return wordLines;
  }

  return lines;
}

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
  paymentMode,
  purpose,
  onClose,
}: ReceiptProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const safeReceiptNo = receiptNumber || `KCF/${new Date().getFullYear()}/${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  const safeDate = date || "";
  const safeName = donorName?.trim() || "Generous Donor";
  const safePan = pan?.trim() ? pan.trim().toUpperCase() : "";
  const safeAddress = address?.trim() || "";
  const safeEmail = email?.trim() || "";
  const safePhone = phone?.trim() || "";
  const safeAmount = typeof amount === "number" && !isNaN(amount) ? amount : 0;
  const safePaymentMode = paymentMode || "UPI / Online";
  const safePaymentId = paymentId || "";
  const safePurpose = purpose || "General Donation";

  const safeFilename = `Kautike_Donation_Receipt_${safeReceiptNo.replace(/[^a-zA-Z0-9_-]/g, "_")}`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/images/receipt-clean-template.png";

    const drawReceipt = () => {
      // Native high-res dimensions matching template
      canvas.width = 1149;
      canvas.height = 1369;

      // 1. Draw base clean template image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 2. Receipt No (Top Right under "Receipt No.")
      ctx.font = '800 21px "Inter", "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = "#0F172A";
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillText(safeReceiptNo, 760, 150);

      // 3. Left Column: Donor Details
      // Donor Name
      ctx.font = '800 17.5px "Inter", "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = "#0F172A";
      ctx.fillText(safeName, 312, 452);

      // PAN (Only rendered if donor entered PAN)
      if (safePan) {
        ctx.font = '700 17px "Inter", "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = "#0F172A";
        ctx.fillText(safePan, 312, 502);
      }

      // Address (wrapped)
      ctx.font = '500 14.5px "Inter", "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = "#1E293B";
      const addressLines = wrapText(ctx, safeAddress, 240, 3);
      addressLines.forEach((line, idx) => {
        ctx.fillText(line, 312, 546 + idx * 20);
      });

      // Email
      ctx.font = '500 15.5px "Inter", "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = "#1E293B";
      ctx.fillText(safeEmail, 312, 640);

      // Mobile
      ctx.font = '600 16px "Inter", "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = "#1E293B";
      ctx.fillText(safePhone, 312, 688);

      // 5. Right Column: Donation Details
      // Donation Amount
      ctx.font = '800 18px "Inter", "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = "#0F172A";
      ctx.fillText(formatAmount(safeAmount), 878, 452);

      // Payment Mode
      ctx.font = '500 16.5px "Inter", "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = "#0F172A";
      ctx.fillText(safePaymentMode, 878, 502);

      // Transaction ID
      ctx.font = '500 15.5px "Inter", "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = "#1E293B";
      ctx.fillText(safePaymentId, 878, 552);

      // Donation Purpose
      ctx.font = '700 16px "Inter", "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = "#0F172A";
      ctx.fillText(safePurpose, 878, 622);

      // Purpose subtext
      ctx.font = '500 13px "Inter", "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = "#64748B";
      ctx.fillText("(Towards Charitable Activities)", 878, 644);

      // 6. Amount in Words
      ctx.font = 'italic 700 20px "Caveat", Georgia, serif';
      ctx.fillStyle = "#134B36";
      ctx.fillText(amountInWords(safeAmount), 380, 755);

      setLoaded(true);
    };

    img.onload = () => {
      if (typeof document !== "undefined" && document.fonts) {
        document.fonts.ready.then(drawReceipt).catch(drawReceipt);
      } else {
        drawReceipt();
      }
    };
  }, [
    safeReceiptNo,
    safeDate,
    safeName,
    safePan,
    safeAddress,
    safeEmail,
    safePhone,
    safeAmount,
    safePaymentMode,
    safePaymentId,
    safePurpose,
  ]);

  const handleDownloadPdf = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setDownloadingPdf(true);
    try {
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
      handlePrint();
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handlePrint = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      window.print();
      return;
    }
    const dataUrl = canvas.toDataURL("image/png");
    const printWin = window.open("", "_blank");
    if (printWin) {
      printWin.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Donation Receipt - ${safeReceiptNo}</title>
            <style>
              @page { size: portrait; margin: 0; }
              body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #FFFFFF; }
              img { width: 100%; max-width: 210mm; height: auto; object-fit: contain; }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" onload="window.print();window.close();" />
          </body>
        </html>
      `);
      printWin.document.close();
    } else {
      window.print();
    }
  };

  return (
    <section className="donation-receipt-wrapper" style={{ padding: "16px 8px" }}>
      {/* Top Action Toolbar */}
      <div
        className="donation-receipt-actions no-print"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "16px",
          maxWidth: "860px",
          margin: "0 auto 16px auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "#134B36" }}>
            ✓ Verified Official 80G Receipt
          </span>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          {onClose && (
            <button
              type="button"
              className="donation-receipt-close"
              onClick={onClose}
              style={{
                padding: "8px 14px",
                background: "#F1F5F9",
                border: "1.5px solid #CBD5E1",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#475569",
                cursor: "pointer",
              }}
            >
              ← Back to Donation
            </button>
          )}

          <button
            type="button"
            className="donation-receipt-download-pdf"
            disabled={downloadingPdf || !loaded}
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
              cursor: loaded ? "pointer" : "not-allowed",
              boxShadow: "0 4px 14px rgba(19,75,54,0.28)",
              opacity: loaded ? 1 : 0.6,
              transition: "all 0.15s ease",
            }}
          >
            {downloadingPdf ? "⏳ Generating PDF..." : "📥 Download Receipt (PDF)"}
          </button>

          <button
            type="button"
            className="donation-receipt-print"
            disabled={!loaded}
            onClick={handlePrint}
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
              cursor: loaded ? "pointer" : "not-allowed",
            }}
          >
            🖨 Print
          </button>
        </div>
      </div>

      {/* Main Official Receipt Document Rendered on HTML5 Canvas */}
      <div
        id="donation-receipt-print-area"
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          position: "relative",
          borderRadius: "8px",
          boxShadow: "0 12px 36px rgba(0,0,0,0.08)",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: "8px",
          }}
        />
      </div>
    </section>
  );
}
