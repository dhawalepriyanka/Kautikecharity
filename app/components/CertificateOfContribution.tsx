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
        // Clone to a fixed-width landscape container off-screen for perfect high-res landscape export
        const clone = el.cloneNode(true) as HTMLElement;
        clone.style.width = "1050px";
        clone.style.minWidth = "1050px";
        clone.style.maxWidth = "1050px";
        clone.style.minHeight = "720px";
        clone.style.position = "fixed";
        clone.style.left = "-9999px";
        clone.style.top = "0";
        clone.style.zIndex = "-100";
        document.body.appendChild(clone);

        const canvas = await html2canvas(clone, {
          scale: 2.5,
          useCORS: true,
          backgroundColor: "#FFFFFF",
          logging: false,
          width: 1050,
          windowWidth: 1050,
        });

        document.body.removeChild(clone);

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
            {downloading ? "⏳ Preparing High-Res Certificate..." : "📥 Direct Download Certificate (.PNG)"}
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

      {/* ── THE OFFICIAL LANDSCAPE CERTIFICATE CANVAS ── */}
      <div className="cert-scroll-container">
        <div className="official-certificate-canvas printable-cert" id="certificate-print-area">
          {/* Golden Double Frame */}
          <div className="cert-gold-frame">
            
            {/* Top Left & Right Abstract Gold Lines */}
            <div className="cert-bg-waves" aria-hidden="true">
              <svg viewBox="0 0 1000 700" fill="none" className="cert-waves-svg" preserveAspectRatio="none">
                <path d="M-80,-20 C100,60 220,180 120,320 C20,460 240,540 320,720" stroke="#D4AF37" strokeWidth="1.8" opacity="0.45" fill="none" />
                <path d="M-110,20 C70,100 190,220 90,360 C-10,500 210,580 290,750" stroke="#E5C158" strokeWidth="1.4" opacity="0.35" fill="none" />
                <path d="M-50,-60 C130,20 250,140 150,280 C50,420 270,500 350,680" stroke="#B8860B" strokeWidth="1.2" opacity="0.3" fill="none" />
                <path d="M-140,60 C40,140 160,260 60,400 C-40,540 180,620 260,780" stroke="#D4AF37" strokeWidth="1" opacity="0.25" fill="none" />
                {/* Bottom Right Wave Lines */}
                <path d="M680,720 C760,560 840,440 980,320" stroke="#D4AF37" strokeWidth="1.6" opacity="0.4" fill="none" />
                <path d="M720,740 C800,580 880,460 1020,340" stroke="#E5C158" strokeWidth="1.2" opacity="0.3" fill="none" />
                <path d="M640,700 C720,540 800,420 940,300" stroke="#B8860B" strokeWidth="1" opacity="0.25" fill="none" />
              </svg>
            </div>

            {/* Golden Corner Leaf Sprig (Right side) */}
            <div className="cert-gold-floral-right" aria-hidden="true">
              <svg viewBox="0 0 110 320" fill="none" style={{ width: "95px", height: "300px" }}>
                <path d="M75,20 Q35,90 85,170 Q35,230 65,300" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" fill="none" />
                {/* Gold Leaves */}
                <path d="M75,20 Q100,8 95,32 Q75,38 75,20 Z" fill="#E5C158" />
                <path d="M55,65 Q25,52 42,75 Q60,75 55,65 Z" fill="#D4AF37" />
                <path d="M80,105 Q105,88 105,112 Q85,122 80,105 Z" fill="#F3CA65" />
                <path d="M55,145 Q30,132 42,158 Q60,158 55,145 Z" fill="#D4AF37" />
                <path d="M85,190 Q112,175 106,202 Q88,208 85,190 Z" fill="#E5C158" />
                <path d="M60,240 Q35,228 48,252 Q68,252 60,240 Z" fill="#F3CA65" />
                <path d="M78,285 Q102,270 96,295 Q80,300 78,285 Z" fill="#D4AF37" />
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
                {(donorName?.trim() || "DHANASHRI WALE").toUpperCase()}
              </div>

              {/* Decorative Vintage Gold Divider */}
              <div className="cert-divider-ornament">
                <svg viewBox="0 0 240 16" fill="none" style={{ width: "220px", height: "16px" }}>
                  <line x1="0" y1="8" x2="95" y2="8" stroke="#B8860B" strokeWidth="1.5" />
                  <circle cx="120" cy="8" r="4.5" fill="#B8860B" />
                  <circle cx="108" cy="8" r="2.8" fill="#D4AF37" />
                  <circle cx="132" cy="8" r="2.8" fill="#D4AF37" />
                  <line x1="145" y1="8" x2="240" y2="8" stroke="#B8860B" strokeWidth="1.5" />
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
                    <svg viewBox="0 0 100 110" fill="none" style={{ width: "95px", height: "105px" }}>
                      <defs>
                        <radialGradient id="goldGradCert" cx="50%" cy="45%" r="50%">
                          <stop offset="0%" stopColor="#FFF4B8" />
                          <stop offset="35%" stopColor="#E5C158" />
                          <stop offset="80%" stopColor="#B8860B" />
                          <stop offset="100%" stopColor="#8A6405" />
                        </radialGradient>
                      </defs>
                      {/* Ribbon Tails */}
                      <path d="M36,68 L24,104 L44,95 L48,72 Z" fill="#B8860B" />
                      <path d="M64,68 L76,104 L56,95 L52,72 Z" fill="#8A6405" />
                      {/* Medal Circle */}
                      <circle cx="50" cy="45" r="38" fill="url(#goldGradCert)" stroke="#D4AF37" strokeWidth="1.5" />
                      <circle cx="50" cy="45" r="32" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="3 2" fill="none" opacity="0.65" />
                      {/* Inner Emblem Star */}
                      <polygon points="50,22 54,34 67,34 56,42 60,54 50,46 40,54 44,42 33,34 46,34" fill="#FFFFFF" opacity="0.9" />
                    </svg>
                  </div>
                </div>

                {/* Right Signature Col */}
                <div className="cert-signature-col">
                  <div className="cert-sig-img-wrap">
                    {/* Exact Hand Cursive Signature of Vijay Jadhav */}
                    <svg viewBox="0 0 160 55" fill="none" style={{ width: "150px", height: "50px" }}>
                      <path
                        d="M20,38 C28,14 36,8 44,22 C48,32 40,46 32,42 C26,38 35,26 50,20 C65,14 78,8 72,28 C68,40 60,42 74,32 C85,24 94,18 92,30 C90,40 102,26 114,20 C126,14 135,24 145,28"
                        stroke="#0F172A"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
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
    </div>
  );
}
