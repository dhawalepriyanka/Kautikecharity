"use client";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";
import { useEffect, useRef, useState } from "react";

function CountUp({ target }: { target: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState("0");
  const hasRun = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasRun.current) {
        hasRun.current = true;
        const numericStr = target.replace(/[^0-9.]/g, "");
        const suffix = target.replace(/[0-9.]/g, "");
        const numericTarget = parseFloat(numericStr);
        const isDecimal = numericStr.includes(".");
        const duration = 1800; const steps = 60;
        const increment = numericTarget / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= numericTarget) { current = numericTarget; clearInterval(timer); }
          setDisplayed(isDecimal ? current.toFixed(1) + suffix : Math.round(current).toLocaleString("en-IN") + suffix);
        }, duration / steps);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{displayed}</span>;
}

const defaultStories = [
  {
    id: "s1",
    name: "Sunita More",
    location: "Z.P. School, Palghar",
    quote: "With Kautike's joy kits and regular meals, our attendance jumped from 62% to 94% in a single academic year.",
  },
  {
    id: "s2",
    name: "Ramesh Pawar",
    location: "Kondap Village, Raigad",
    quote: "My daughter was about to drop out in 7th standard. The scholarship and guidance helped her continue her schooling.",
  },
  {
    id: "s3",
    name: "Pooja Patil",
    location: "Tribal Ashram School, Nashik",
    quote: "The health monitoring camp diagnosed my child's severe anemia early. Today she is healthy, active and top of her class.",
  },
];

export default function ImpactPage() {
  const [stories, setStories] = useState(defaultStories);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kautike_admin_stories");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setStories(parsed);
      }
      fetch("http://localhost:4000/api/stories")
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) setStories(data);
        })
        .catch(() => {});
    } catch (_) {}
  }, []);

  return (
    <main className="page-fade-in" id="top">
      <Header />

      {/* ── SYSTEM SUBPAGE HERO ── */}
      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <span className="subpage-badge">OUR IMPACT · 2025–26</span>
          <h1>
            Real change for real <span className="yellow-hand">children.</span>
          </h1>
          <p>
            Since 2018, Kautike Charitable Foundation has worked across 480+ rural and tribal villages in Maharashtra — from schools in Palghar to anganwadis in Nashik and Raigad — ensuring no child is left behind due to poverty, hunger, or lack of resources.
          </p>

          {/* Trust badges pills */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginTop: "22px" }}>
            <span style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, color: "#1E293B", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
              ❤️ 15.5L+ Children Supported
            </span>
            <span style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, color: "#1E293B", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
              🌱 50,000+ Trees Planted
            </span>
            <span style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, color: "#1E293B", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
              📍 480+ Villages Reached
            </span>
            <span style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, color: "#1E293B", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
              📜 100% 80G Tax-Exempt
            </span>
          </div>
        </div>
      </section>

      {/* ── CRY-style large stat counters ── */}
      <section className="cry-impact-numbers">
        <div className="cry-impact-numbers-inner">
          <div className="cry-impact-num-card">
            <div className="cry-num-icon">🎒</div>
            <div className="cry-num-value"><CountUp target="15.5L+" /></div>
            <div className="cry-num-label">Children Supported</div>
            <p>Learning kits, school enrollment &amp; dropout prevention</p>
          </div>
          <div className="cry-impact-num-card">
            <div className="cry-num-icon">🌱</div>
            <div className="cry-num-value"><CountUp target="50000+" /></div>
            <div className="cry-num-label">Trees Planted</div>
            <p>Neem, Peepal, Banyan &amp; fruit trees — 85%+ survival rate</p>
          </div>
          <div className="cry-impact-num-card">
            <div className="cry-num-icon">👧</div>
            <div className="cry-num-value"><CountUp target="45000+" /></div>
            <div className="cry-num-label">Girls Empowered</div>
            <p>Scholarships &amp; life-skill training against child marriage</p>
          </div>
          <div className="cry-impact-num-card">
            <div className="cry-num-icon">🍲</div>
            <div className="cry-num-value"><CountUp target="34000+" /></div>
            <div className="cry-num-label">Children Treated</div>
            <p>Malnourished infants &amp; mothers given nutritional support</p>
          </div>
          <div className="cry-impact-num-card">
            <div className="cry-num-icon">🚸</div>
            <div className="cry-num-value"><CountUp target="12000+" /></div>
            <div className="cry-num-label">Minors Rescued</div>
            <p>From child labour — back in school, safe and learning</p>
          </div>
          <div className="cry-impact-num-card">
            <div className="cry-num-icon">🏘️</div>
            <div className="cry-num-value"><CountUp target="480+" /></div>
            <div className="cry-num-label">Villages Reached</div>
            <p>Across Maharashtra with active grassroots interventions</p>
          </div>
        </div>
      </section>

      {/* ── CRY-style 4 programs horizontal strip ── */}
      <section className="cry-programs-strip">
        <div className="cry-programs-header">
          <span className="mini-title">WHAT WE FOCUS ON</span>
          <h2 className="section-heading">Our <span className="yellow-hand">4 Core Programs</span></h2>
        </div>
        <div className="cry-programs-row">
          <a href="/child-education" className="cry-prog-item">
            <div className="cry-prog-dot cry-prog-dot-edu"></div>
            <div className="cry-prog-emoji">📚</div>
            <h3>Child Education</h3>
            <p>Learning kits, school enrollment &amp; dropout prevention across 480+ villages.</p>
            <span className="cry-prog-badge">15.5L+ children</span>
          </a>
          <div className="cry-prog-sep"></div>
          <a href="/health-nutrition" className="cry-prog-item">
            <div className="cry-prog-dot cry-prog-dot-health"></div>
            <div className="cry-prog-emoji">🥗</div>
            <h3>Health &amp; Nutrition</h3>
            <p>Treating malnourished children &amp; mothers through 480+ health camps.</p>
            <span className="cry-prog-badge">34,000+ treated</span>
          </a>
          <div className="cry-prog-sep"></div>
          <a href="/social-welfare" className="cry-prog-item">
            <div className="cry-prog-dot cry-prog-dot-girl"></div>
            <div className="cry-prog-emoji">🌸</div>
            <h3>Girls' Education &amp; Safety</h3>
            <p>Scholarships, life-skills &amp; anti-child-marriage drives for adolescent girls.</p>
            <span className="cry-prog-badge">45,000+ girls</span>
          </a>
          <div className="cry-prog-sep"></div>
          <a href="/tree-plantation" className="cry-prog-item">
            <div className="cry-prog-dot cry-prog-dot-green"></div>
            <div className="cry-prog-emoji">🌳</div>
            <h3>Tree Plantation</h3>
            <p>Native trees on school campuses &amp; village land with community care.</p>
            <span className="cry-prog-badge">50,000+ trees</span>
          </a>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="cry-impact-testimonials">
        <div className="cry-test-header">
          <span className="mini-title">VOICES FROM THE FIELD</span>
          <h2 className="section-heading">Stories that <span className="yellow-hand">inspire change</span></h2>
          <div className="health-intro-divider" style={{ margin: "14px auto 0" }}></div>
        </div>
        <div className="cry-test-grid">
          {stories.map((s, i) => (
            <div key={s.id || s.name + i} className={`cry-test-card ${i === 1 ? "cry-test-highlight" : ""}`}>
              <div className="cry-test-quote">“</div>
              <p>"{s.quote.replace(/[“”"]/g, "")}"</p>
              <div className="cry-test-author">
                <strong>{s.name}</strong>
                <span>{s.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="edu-cta-redesign">
        <div className="edu-cta-left">
          <div className="edu-cta-badge">MAKE A DIFFERENCE</div>
          <h2 className="edu-cta-heading">Be the reason a child<br /><span className="edu-cta-accent">smiles tomorrow.</span></h2>
          <p className="edu-cta-sub">Join thousands of donors making real, transparent change across Maharashtra.</p>
          <div className="edu-cta-actions">
            <a href="/donate" className="edu-cta-primary-btn">♥ Donate with 80G Tax Benefit</a>
            <a href="/stories" className="edu-cta-ghost-btn">Read Field Stories →</a>
          </div>
          <div className="edu-cta-trust">
            <span>🔒 80G Tax Exempt</span>
            <span>✓ Verified NGO</span>
            <span>❤️ 15.5L+ Children</span>
          </div>
        </div>
        <div className="edu-cta-right">
          <div className="edu-cta-card">
            <div className="edu-cta-stat-big">₹500<span>/month</span></div>
            <p>keeps one child in school for a full year</p>
            <div className="edu-cta-mini-stats">
              <div><strong>480+</strong><span>Villages</span></div>
              <div><strong>7+</strong><span>Years</span></div>
              <div><strong>100%</strong><span>Transparent</span></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
