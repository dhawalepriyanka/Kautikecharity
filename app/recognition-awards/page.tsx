"use client";

import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

type AwardItem = {
  id: string;
  title: string;
  titleMr?: string;
  issuingAuthority: string;
  location: string;
  udiseCode?: string;
  date: string;
  beneficiaries?: string;
  signatory?: string;
  quoteMr?: string;
  quoteAuthor?: string;
  summary: string;
  image: string;
  pdfUrl?: string;
};

const defaultAwards: AwardItem[] = [
  {
    id: "award-raigad-school-2026",
    title: "Letter of Gratitude & Appreciation",
    titleMr: "रायगड जिल्हा परिषद शाळा फरशीपाडा",
    issuingAuthority: "Raigad Zilla Parishad School Farshipada",
    location: "Taluka Panvel, District Raigad, Maharashtra",
    udiseCode: "27240817007",
    date: "10 August 2026",
    beneficiaries: "36 Rural Primary Students",
    signatory: "S. M. Patil (President / Secretary) & Headmaster",
    quoteMr: "शिक्षणाची ज्ञानज्योत प्रज्वलित ठेवण्यासाठी आपण दिलेले हे दातृत्व विद्यार्थ्यांच्या उज्ज्वल भविष्यासाठी अत्यंत प्रेरणादायी आहे.",
    quoteAuthor: "School Management Committee & Headmaster, RZP School Farshipada",
    summary: "Awarded by the School Management Committee & Headmaster of Raigad Zilla Parishad Primary School Farshipada (Taluka Panvel, District Raigad) to Kautike Charitable Foundation for providing vital educational literature, school kits, and learning supplies to 36 rural students.",
    image: "/images/awards/raigad-school-appreciation-letter.png",
    pdfUrl: "/documents/raigad-school-appreciation-letter.pdf",
  },
];

export default function RecognitionAwardsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [awards, setAwards] = useState<AwardItem[]>(defaultAwards);

  useEffect(() => {
    try {
      const savedAwards = localStorage.getItem("kautike_admin_awards");
      if (savedAwards) {
        const parsed = JSON.parse(savedAwards);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAwards(parsed);
        }
      }
    } catch (_) {}
  }, []);

  return (
    <main className="page-fade-in bg-cream" id="top" style={{ backgroundColor: "#FAF8F5", minHeight: "100vh" }}>
      <Header />

      {/* ── Page Header Banner ── */}
      <section className="simple-page-header" style={{ padding: "48px 24px 28px", textAlign: "center" }}>
        <span
          className="subpage-badge"
          style={{
            backgroundColor: "#134B36",
            color: "#FFFFFF",
            padding: "6px 16px",
            borderRadius: "20px",
            fontSize: "11.5px",
            fontWeight: 800,
            letterSpacing: "0.06em",
            display: "inline-block",
            marginBottom: "12px",
          }}
        >
          OFFICIAL APPRECIATIONS &amp; CERTIFICATIONS
        </span>
        <h1 className="cry-wc-main-title" style={{ fontSize: "clamp(28px, 4.5vw, 42px)", fontWeight: 900, color: "#0F172A", margin: "0 0 10px" }}>
          Recognitions &amp; <span className="cry-hand-gold" style={{ color: "#134B36" }}>Awards</span>
        </h1>
        <div className="cry-wc-yellow-bar" style={{ width: "64px", height: "4px", backgroundColor: "#D4AF37", margin: "8px auto 16px", borderRadius: "2px" }} />
        <p className="cry-wc-lead-text" style={{ maxWidth: "760px", margin: "0 auto", color: "#475569", fontSize: "15.5px", lineHeight: 1.6 }}>
          Honoring our commitment to grassroots transformation. Explore official appreciation letters, government statutory registrations, and institutional recognitions awarded to <strong>Kautike Charitable Foundation</strong> for impactful social service across Maharashtra.
        </p>
      </section>

      {/* ── Main Container ── */}
      <section style={{ maxWidth: "1220px", margin: "0 auto", padding: "10px 24px 70px" }}>

        {/* ── DYNAMIC RECOGNITION LETTERS LIST ── */}
        <div style={{ display: "grid", gap: "48px", marginBottom: "48px" }}>
          {awards.map((award) => (
            <div
              key={award.id}
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                border: "1.5px solid #E2E8F0",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                overflow: "hidden",
              }}
            >
              {/* Card Top Accent Bar */}
              <div style={{ background: "linear-gradient(90deg, #134B36 0%, #2F963A 50%, #D4AF37 100%)", height: "6px" }} />

              <div style={{ padding: "clamp(24px, 4vw, 40px)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "36px", alignItems: "center" }}>
                  
                  {/* Left Column: Full Resolution Document Display */}
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        position: "relative",
                        borderRadius: "10px",
                        overflow: "hidden",
                        border: "1.5px solid #CBD5E1",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      <img
                        src={award.image || "/images/awards/raigad-school-appreciation-letter.png"}
                        alt={award.title}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          backgroundColor: "#FFFFFF",
                        }}
                      />
                    </div>

                    {/* Direct Download & Action Buttons */}
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "16px", flexWrap: "wrap" }}>
                      {award.image && (
                        <a
                          href={award.image}
                          download="Appreciation_Letter.png"
                          style={{
                            background: "#0F766E",
                            color: "#FFFFFF",
                            padding: "10px 18px",
                            borderRadius: "8px",
                            fontSize: "13px",
                            fontWeight: 700,
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            boxShadow: "0 4px 12px rgba(15,118,110,0.2)",
                          }}
                        >
                          🖼️ Download PNG
                        </a>
                      )}
                      {award.pdfUrl && (
                        <a
                          href={award.pdfUrl}
                          download="Appreciation_Letter_Kautike_Foundation.pdf"
                          style={{
                            background: "#134B36",
                            color: "#FFFFFF",
                            padding: "10px 18px",
                            borderRadius: "8px",
                            fontSize: "13px",
                            fontWeight: 700,
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            boxShadow: "0 4px 12px rgba(19,75,54,0.2)",
                          }}
                        >
                          📥 Download PDF
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Structured Overview & Transcriptions */}
                  <div>
                    <div
                      style={{
                        display: "inline-block",
                        background: "#FEF3C7",
                        color: "#92400E",
                        padding: "4px 12px",
                        borderRadius: "6px",
                        fontSize: "11.5px",
                        fontWeight: 800,
                        letterSpacing: "0.05em",
                        marginBottom: "12px",
                      }}
                    >
                      🏆 OFFICIAL INSTITUTIONAL RECOGNITION
                    </div>
                    
                    <h2 style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 800, color: "#0F172A", margin: "0 0 8px" }}>
                      {award.title}
                    </h2>
                    
                    {award.titleMr && (
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#134B36", margin: "0 0 16px" }}>
                        {award.titleMr}
                      </h3>
                    )}

                    <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6, margin: "0 0 18px" }}>
                      {award.summary}
                    </p>

                    {/* Key Quote Box */}
                    {award.quoteMr && (
                      <div
                        style={{
                          background: "#F0FDF4",
                          borderLeft: "4px solid #134B36",
                          padding: "14px 18px",
                          borderRadius: "0 8px 8px 0",
                          marginBottom: "20px",
                        }}
                      >
                        <p style={{ margin: 0, fontSize: "14.5px", fontWeight: 700, color: "#14532D", fontStyle: "italic", lineHeight: 1.5 }}>
                          “{award.quoteMr}”
                        </p>
                        {award.quoteAuthor && (
                          <span style={{ display: "block", fontSize: "12px", color: "#166534", marginTop: "6px" }}>
                            — {award.quoteAuthor}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Document Metadata Table */}
                    <div style={{ background: "#FAF8F5", borderRadius: "10px", padding: "16px", border: "1px solid #E2E8F0" }}>
                      <table style={{ width: "100%", fontSize: "13px", borderCollapse: "collapse" }}>
                        <tbody>
                          <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                            <td style={{ padding: "8px 0", color: "#64748B", fontWeight: 600, width: "40%" }}>Issuing Authority:</td>
                            <td style={{ padding: "8px 0", color: "#0F172A", fontWeight: 700 }}>{award.issuingAuthority}</td>
                          </tr>
                          {award.location && (
                            <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                              <td style={{ padding: "8px 0", color: "#64748B", fontWeight: 600 }}>Location:</td>
                              <td style={{ padding: "8px 0", color: "#0F172A" }}>{award.location}</td>
                            </tr>
                          )}
                          {award.udiseCode && (
                            <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                              <td style={{ padding: "8px 0", color: "#64748B", fontWeight: 600 }}>UDISE Code:</td>
                              <td style={{ padding: "8px 0", color: "#0F172A", fontFamily: "monospace", fontWeight: 700 }}>{award.udiseCode}</td>
                            </tr>
                          )}
                          {award.date && (
                            <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                              <td style={{ padding: "8px 0", color: "#64748B", fontWeight: 600 }}>Date of Issue:</td>
                              <td style={{ padding: "8px 0", color: "#0F172A" }}>{award.date}</td>
                            </tr>
                          )}
                          {award.beneficiaries && (
                            <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                              <td style={{ padding: "8px 0", color: "#64748B", fontWeight: 600 }}>Beneficiaries:</td>
                              <td style={{ padding: "8px 0", color: "#134B36", fontWeight: 700 }}>{award.beneficiaries}</td>
                            </tr>
                          )}
                          {award.signatory && (
                            <tr>
                              <td style={{ padding: "8px 0", color: "#64748B", fontWeight: 600 }}>Signed &amp; Stamped By:</td>
                              <td style={{ padding: "8px 0", color: "#0F172A", fontWeight: 600 }}>
                                {award.signatory}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── STATUTORY & GOVERNMENT REGISTRATIONS ── */}
        <div style={{ marginBottom: "54px" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 800,
                color: "#134B36",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              GOVERNMENT OF INDIA &amp; STATE STATUTORY COMPLIANCES
            </span>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "#0F172A", margin: "6px 0 0" }}>
              Official Trust Certifications &amp; Approvals
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            
            {/* 80G Approval */}
            <div style={{ background: "#FFFFFF", padding: "24px", borderRadius: "12px", border: "1.5px solid #E2E8F0", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>📜</div>
              <h3 style={{ fontSize: "16.5px", fontWeight: 800, color: "#0F172A", margin: "0 0 6px" }}>
                Section 80G Tax Exemption
              </h3>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#134B36", marginBottom: "10px" }}>
                URN: AALCK6167AF20251
              </div>
              <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5, margin: 0 }}>
                Approved by the Income Tax Department, Government of India. Donors receive 50% tax exemption under Section 80G of the Income Tax Act, 1961.
              </p>
            </div>

            {/* 12A Registration */}
            <div style={{ background: "#FFFFFF", padding: "24px", borderRadius: "12px", border: "1.5px solid #E2E8F0", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>🏛️</div>
              <h3 style={{ fontSize: "16.5px", fontWeight: 800, color: "#0F172A", margin: "0 0 6px" }}>
                Section 12A Non-Profit Status
              </h3>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#134B36", marginBottom: "10px" }}>
                Form 10AC Provisional Approval
              </div>
              <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5, margin: 0 }}>
                Granted perpetual non-profit charitable status, certifying all foundation revenue is strictly utilized for public welfare and child empowerment.
              </p>
            </div>

            {/* MCA Section 8 NGO Incorporation */}
            <div style={{ background: "#FFFFFF", padding: "24px", borderRadius: "12px", border: "1.5px solid #E2E8F0", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>⚖️</div>
              <h3 style={{ fontSize: "16.5px", fontWeight: 800, color: "#0F172A", margin: "0 0 6px" }}>
                Ministry of Corporate Affairs (MCA)
              </h3>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#134B36", marginBottom: "10px" }}>
                CIN: U88900MH2025NPL441296
              </div>
              <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5, margin: 0 }}>
                Incorporated under Section 8 of the Companies Act, 2013, meeting the highest standards of financial audit, compliance, and corporate governance.
              </p>
            </div>

            {/* NITI Aayog NGO Darpan */}
            <div style={{ background: "#FFFFFF", padding: "24px", borderRadius: "12px", border: "1.5px solid #E2E8F0", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>🇮🇳</div>
              <h3 style={{ fontSize: "16.5px", fontWeight: 800, color: "#0F172A", margin: "0 0 6px" }}>
                NITI Aayog NGO Darpan
              </h3>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#134B36", marginBottom: "10px" }}>
                Verified Partner Portal
              </div>
              <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.5, margin: 0 }}>
                Registered on the Government of India portal for civil society organizations, enabling seamless collaboration with state and central welfare programs.
              </p>
            </div>

          </div>
        </div>

        {/* ── CALL TO ACTION SECTION ── */}
        <div
          style={{
            background: "linear-gradient(135deg, #0F3F2E 0%, #134B36 100%)",
            borderRadius: "16px",
            padding: "clamp(28px, 4vw, 44px)",
            textAlign: "center",
            color: "#FFFFFF",
            boxShadow: "0 10px 30px rgba(19,75,54,0.2)",
          }}
        >
          <span
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "#FEF3C7",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 800,
              display: "inline-block",
              marginBottom: "12px",
            }}
          >
            PARTNER WITH KAUTIKE CHARITABLE FOUNDATION
          </span>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 32px)", fontWeight: 800, margin: "0 0 12px" }}>
            Help Us Bring Joy &amp; Education to More Rural Schools
          </h2>
          <p style={{ maxWidth: "680px", margin: "0 auto 24px", color: "#E2E8F0", fontSize: "15px", lineHeight: 1.6 }}>
            Every contribution enables us to adopt more remote village schools, distribute learning kits, provide child nutrition, and plant trees across Maharashtra.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <a
              href="/donate"
              style={{
                background: "#D4AF37",
                color: "#0F172A",
                padding: "12px 28px",
                borderRadius: "8px",
                fontWeight: 800,
                fontSize: "14px",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(212,175,55,0.3)",
              }}
            >
              ♥ Donate with 80G Tax Benefit ➔
            </a>
            <a
              href="/corporate-partnerships"
              style={{
                background: "transparent",
                color: "#FFFFFF",
                border: "1.5px solid rgba(255,255,255,0.6)",
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              CSR &amp; School Partnerships ➔
            </a>
          </div>
        </div>

      </section>

      {/* ── FULL SCREEN DOCUMENT LIGHTBOX MODAL ── */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            boxSizing: "border-box",
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(94vw, 760px)",
              height: "85vh",
              maxHeight: "85vh",
              background: "#FFFFFF",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.6)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Modal Header (Fixed height, always visible at top) */}
            <div
              style={{
                height: "48px",
                padding: "0 16px",
                background: "#134B36",
                color: "#FFFFFF",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: "13.5px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
                📜 Raigad Z.P. School Farshipada - Letter of Appreciation
              </span>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close dialog"
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  color: "#FFFFFF",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  transition: "background 0.2s ease",
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Image Body (Strictly constrained within modal bounds with smooth scroll) */}
            <div
              style={{
                flex: "1 1 0%",
                minHeight: 0,
                overflowY: "auto",
                overflowX: "hidden",
                padding: "0",
                backgroundColor: "#F8FAFC",
              }}
            >
              <img
                src="/images/awards/raigad-school-appreciation-letter.png"
                alt="Full Appreciation Letter - Raigad Zilla Parishad Primary School Farshipada"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>

            {/* Modal Footer (Fixed height, always visible at bottom) */}
            <div
              style={{
                height: "52px",
                padding: "0 16px",
                background: "#FFFFFF",
                borderTop: "1px solid #E2E8F0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexShrink: 0,
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>
                UDISE: 27240817007 · Panvel, Raigad
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                <a
                  href="/images/awards/raigad-school-appreciation-letter.png"
                  download="Raigad_School_Appreciation_Letter.png"
                  style={{
                    background: "#0F766E",
                    color: "#FFFFFF",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  🖼️ Download PNG
                </a>
                <a
                  href="/documents/raigad-school-appreciation-letter.pdf"
                  download="Raigad_School_Appreciation_Letter_Kautike_Foundation.pdf"
                  style={{
                    background: "#134B36",
                    color: "#FFFFFF",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  📥 Download PDF
                </a>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{
                    background: "#F1F5F9",
                    color: "#334155",
                    border: "1px solid #CBD5E1",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      <Footer />
      <FloatingActions />
    </main>
  );
}
