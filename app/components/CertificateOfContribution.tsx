"use client";

import React, { useState } from "react";

interface CertificateProps {
  donorName: string;
  amount?: number;
  date?: string;
  onPrint?: () => void;
  onClose?: () => void;
}

export function CertificateOfContribution({
  donorName,
  amount,
  date,
  onPrint,
  onClose,
}: CertificateProps) {
  const [downloading, setDownloading] = useState(false);
  const displayDate = date || new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date());

  const handleDirectDownload = async () => {
    setDownloading(true);
    try {
      const el = document.getElementById("certificate-print-area");
      if (!el) {
        setDownloading(false);
        return;
      }

      // Load html2canvas if not present
      if (!(window as any).html2canvas) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
          script.onload = () => resolve(true);
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      const html2canvas = (window as any).html2canvas;
      if (html2canvas) {
        const canvas = await html2canvas(el, {
          scale: 3, // Ultra-sharp 300 DPI export
          useCORS: true,
          backgroundColor: "#FFFFFF",
          logging: false,
        });

        // Trigger direct browser file download
        const imgData = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        const safeName = (donorName || "Donor").trim().replace(/[^a-zA-Z0-9_-]/g, "_");
        a.download = `Certificate-of-Contribution-${safeName}.png`;
        a.href = imgData;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        window.print();
      }
    } catch (err) {
      console.error("Direct download error:", err);
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="certificate-modal-wrapper">
      <div className="certificate-actions-bar no-print">
        {onClose && (
          <button onClick={onClose} className="cert-btn-ghost">
            ← Back to Donation
          </button>
        )}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={handleDirectDownload}
            disabled={downloading}
            className="cert-btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            {downloading ? "⏳ Preparing Certificate File..." : "📥 Direct Download Certificate (.PNG)"}
          </button>
          <button
            onClick={() => window.print()}
            className="cert-btn-ghost"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            🖨️ Print / Save as PDF
          </button>
        </div>
      </div>

      {/* ── THE OFFICIAL CERTIFICATE CANVAS ── */}
      <div className="official-certificate-canvas printable-cert" id="certificate-print-area">
        {/* Golden Double Frame */}
        <div className="cert-gold-frame">
          
          {/* Top Left & Right Abstract Gold Lines */}
          <div className="cert-bg-waves" aria-hidden="true">
            <svg viewBox="0 0 900 650" fill="none" className="cert-waves-svg">
              <path d="M-50,0 C120,80 200,200 100,320 C0,440 220,520 300,650" stroke="#D4AF37" strokeWidth="1.5" opacity="0.35" fill="none" />
              <path d="M-80,40 C90,120 170,240 70,360 C-30,480 190,560 270,690" stroke="#E5C158" strokeWidth="1" opacity="0.25" fill="none" />
              <path d="M-20,-40 C150,40 230,160 130,280 C30,400 250,480 330,610" stroke="#B8860B" strokeWidth="1" opacity="0.2" fill="none" />
              <path d="M600,-50 C700,120 850,220 950,400" stroke="#D4AF37" strokeWidth="1.5" opacity="0.3" fill="none" />
              <path d="M550,650 C680,500 780,380 950,280" stroke="#E5C158" strokeWidth="1.2" opacity="0.3" fill="none" />
            </svg>
          </div>

          {/* Golden Corner Leaf Sprig (Right side) */}
          <div className="cert-gold-floral-right" aria-hidden="true">
            <svg viewBox="0 0 100 240" fill="none" style={{ width: "90px", height: "220px" }}>
              <path d="M70,20 Q40,80 80,140 Q40,190 60,230" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Gold Leaves */}
              <path d="M70,20 Q90,10 85,30 Q70,35 70,20 Z" fill="#E5C158" />
              <path d="M55,60 Q30,50 45,70 Q60,70 55,60 Z" fill="#D4AF37" />
              <path d="M75,90 Q95,75 95,95 Q80,105 75,90 Z" fill="#F3CA65" />
              <path d="M55,125 Q35,115 45,135 Q60,135 55,125 Z" fill="#D4AF37" />
              <path d="M78,160 Q100,150 95,170 Q80,175 78,160 Z" fill="#E5C158" />
              <path d="M58,195 Q38,185 50,205 Q65,205 58,195 Z" fill="#F3CA65" />
            </svg>
          </div>

          {/* Certificate Inner Content */}
          <div className="cert-inner-content">
            
            {/* Header Title */}
            <h1 className="cert-main-title">CERTIFICATE</h1>
            <h2 className="cert-sub-title">OF CONTRIBUTION</h2>

            <div className="cert-presented-text">
              THIS CERTIFICATE IS PROUDLY PRESENTED TO
            </div>

            {/* Recipient Name */}
            <div className="cert-recipient-name">
              {donorName?.trim() || "AKHIL KAMBLE"}
            </div>

            {/* Decorative Vintage Gold Divider */}
            <div className="cert-divider-ornament">
              <svg viewBox="0 0 160 14" fill="none" style={{ width: "160px", height: "14px" }}>
                <line x1="0" y1="7" x2="60" y2="7" stroke="#A67C1E" strokeWidth="1.5" />
                <circle cx="80" cy="7" r="4" fill="#B8860B" />
                <circle cx="70" cy="7" r="2" fill="#D4AF37" />
                <circle cx="90" cy="7" r="2" fill="#D4AF37" />
                <line x1="100" y1="7" x2="160" y2="7" stroke="#A67C1E" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Description Body */}
            <p className="cert-body-p">
              For their generous contribution towards <strong>&ldquo;Kautike Charitable Foundation&rdquo;</strong>, supporting our mission to spread kindness, promote education, and help the underprivileged live a better life.
            </p>

            {/* Quote */}
            <p className="cert-quote-p">
              &ldquo;Your kindness creates hope, and your support builds a brighter tomorrow.&rdquo;
            </p>

            {/* Bottom Row: Seal & Signature */}
            <div className="cert-bottom-row">
              
              {/* Left Gold Medallion Seal */}
              <div className="cert-seal-col">
                <div className="cert-gold-medal">
                  {/* Outer Scalloped Medal Circle */}
                  <svg viewBox="0 0 100 100" fill="none" style={{ width: "90px", height: "90px" }}>
                    <defs>
                      <radialGradient id="goldGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FFF2A3" />
                        <stop offset="40%" stopColor="#E5C158" />
                        <stop offset="85%" stopColor="#B8860B" />
                        <stop offset="100%" stopColor="#8A6405" />
                      </radialGradient>
                    </defs>
                    {/* Ribbon Tails */}
                    <path d="M35,70 L25,98 L45,90 L48,72 Z" fill="#B8860B" />
                    <path d="M65,70 L75,98 L55,90 L52,72 Z" fill="#8A6405" />
                    {/* Starburst/Circle Medal */}
                    <circle cx="50" cy="46" r="38" fill="url(#goldGrad)" stroke="#D4AF37" strokeWidth="1.5" />
                    <circle cx="50" cy="46" r="32" stroke="#FFF" strokeWidth="1" strokeDasharray="3 2" fill="none" opacity="0.6" />
                    {/* Center Star / Emblem */}
                    <polygon points="50,22 55,34 68,34 57,42 61,54 50,46 39,54 43,42 32,34 45,34" fill="#FFF8DC" opacity="0.9" />
                  </svg>
                </div>
              </div>

              {/* Center Date (Subtle) */}
              <div className="cert-date-col">
                <span style={{ fontSize: "11px", color: "#64748B", letterSpacing: "0.05em" }}>ISSUED ON: {displayDate}</span>
                {amount && (
                  <span style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#92400E", marginTop: "2px" }}>
                    CONTRIBUTION: ₹{amount.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {/* Right Signature Col */}
              <div className="cert-signature-col">
                <div className="cert-sig-img-wrap">
                  {/* Realistic Hand Signature */}
                  <svg viewBox="0 0 160 60" fill="none" style={{ width: "150px", height: "55px" }}>
                    <path
                      d="M15,42 Q30,12 45,18 Q55,25 40,48 Q30,35 60,20 Q80,10 75,32 Q70,45 95,22 Q115,10 120,35 Q135,15 150,30"
                      stroke="#0F172A"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path d="M25,38 L145,38" stroke="#0F172A" strokeWidth="1" opacity="0.6" />
                  </svg>
                </div>
                <div className="cert-sig-line" />
                <strong className="cert-signer-name">VIJAY JADHAV</strong>
                <span className="cert-signer-role">Trustee</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
