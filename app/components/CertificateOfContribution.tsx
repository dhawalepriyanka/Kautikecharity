"use client";

import React, { useState, useEffect, useRef } from "react";

interface CertificateProps {
  donorName: string;
  amount?: number;
  date?: string;
  onPrint?: () => void;
  onClose?: () => void;
}

export function CertificateOfContribution({
  donorName,
  onClose,
}: CertificateProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const cleanName = (donorName || "DHANASHRI WALE").trim().toUpperCase();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/certificate-template.png";

    const renderCertificate = () => {
      // High-resolution internal canvas dimensions matching template
      canvas.width = img.naturalWidth || 1024;
      canvas.height = img.naturalHeight || 723;

      // 1. Draw original template
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 2. Clear ONLY the sample name "AKHIL KAMBLE" (preserve the original divider and text below)
      const clearX = 180;
      const clearY = 305;
      const clearW = canvas.width - clearX * 2; // 664px width
      const clearH = 70; // 70px height
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(clearX, clearY, clearW, clearH);

      // 3. Draw dynamic donor name in the exact Cinzel / luxury gold uppercase styling
      const centerX = canvas.width / 2;
      const centerY = 340;

      // Auto-fit font size based on name length
      let fontSize = 36;
      if (cleanName.length > 30) fontSize = 22;
      else if (cleanName.length > 24) fontSize = 26;
      else if (cleanName.length > 18) fontSize = 30;

      ctx.font = `600 ${fontSize}px "Cinzel", "Cinzel Decorative", "Montserrat", "Trajan Pro", Georgia, serif`;
      ctx.fillStyle = "#C59428";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Enhanced Letter Spacing for classical luxury look
      try {
        (ctx as any).letterSpacing = cleanName.length > 22 ? "3px" : "6px";
      } catch (_) {}

      const spacedName = (ctx as any).letterSpacing
        ? cleanName
        : cleanName.split("").join(cleanName.length > 20 ? " " : "  ");

      ctx.fillText(spacedName, centerX, centerY);
      setImageLoaded(true);
    };

    img.onload = () => {
      if (typeof document !== "undefined" && document.fonts) {
        document.fonts.ready.then(renderCertificate).catch(renderCertificate);
      } else {
        renderCertificate();
      }
    };
  }, [cleanName]);

  const handleDirectDownload = () => {
    setDownloading(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) {
        setDownloading(false);
        return;
      }

      const imgData = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      const safeFileName = cleanName.replace(/[^A-Z0-9_-]/g, "_");
      a.download = `Certificate-of-Contribution-${safeFileName}.png`;
      a.href = imgData;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Direct download error:", err);
      window.print();
    } finally {
      setDownloading(false);
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
        <html>
          <head>
            <title>Certificate of Contribution - ${cleanName}</title>
            <style>
              @page { size: landscape; margin: 0; }
              body { margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh; background: #FFF; }
              img { max-width: 100%; max-height: 100%; object-fit: contain; }
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
    <div className="certificate-modal-wrapper" style={{ width: "100%", maxWidth: "980px", margin: "0 auto" }}>
      {/* Top Action Bar */}
      <div className="certificate-actions-bar no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
        {onClose && (
          <button onClick={onClose} className="cert-btn-ghost" style={{ padding: "8px 16px", borderRadius: "8px", border: "1.5px solid #CBD5E1", background: "#FFFFFF", cursor: "pointer", fontWeight: 700 }}>
            ← Back to Donation
          </button>
        )}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", width: onClose ? "auto" : "100%", justifyContent: onClose ? "flex-end" : "center" }}>
          <button
            onClick={handleDirectDownload}
            disabled={downloading}
            className="cert-btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#2F963A",
              color: "#FFFFFF",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(47,150,58,0.3)",
            }}
          >
            {downloading ? "⏳ Preparing Certificate File..." : "📥 Direct Download Certificate (.PNG)"}
          </button>
          <button
            onClick={handlePrint}
            className="cert-btn-ghost"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#FFFFFF",
              color: "#1E293B",
              border: "1.5px solid #CBD5E1",
              padding: "12px 20px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            🖨️ Print / Save as PDF
          </button>
        </div>
      </div>

      {/* ── THE OFFICIAL CERTIFICATE CANVAS ── */}
      <div
        id="certificate-print-area"
        style={{
          background: "#FFFFFF",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: "4px",
            aspectRatio: "1024 / 723",
            backgroundColor: "#FFFFFF",
          }}
        />
        {!imageLoaded && (
          <div style={{ padding: "40px", textAlign: "center", color: "#64748B" }}>
            ⏳ Loading Official Certificate...
          </div>
        )}
      </div>
    </div>
  );
}
