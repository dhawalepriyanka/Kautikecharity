"use client";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";
import { useEffect, useRef, useState } from "react";

/* ── Animated Counter ── */
function CountUp({ target }: { target: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState("0");
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const numericStr = target.replace(/[^0-9.]/g, "");
          const suffix = target.replace(/[0-9.]/g, "");
          const numericTarget = parseFloat(numericStr);
          const isDecimal = numericStr.includes(".");
          const duration = 1800;
          const steps = 60;
          const increment = numericTarget / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
              current = numericTarget;
              clearInterval(timer);
            }
            setDisplayed(
              isDecimal
                ? current.toFixed(1) + suffix
                : Math.round(current).toLocaleString("en-IN") + suffix
            );
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{displayed}</span>;
}

export const metadata = {
  title: "Our Impact | Kautike Charitable Foundation",
  description: "See the verified real-world impact of Kautike Charitable Foundation across education, health, girls empowerment, and environment in Maharashtra.",
};

export default function ImpactPage() {
  return (
    <main className="page-fade-in" id="top">
      <Header />

      {/* ── Hero ── */}
      <section className="impact-hero-banner">
        <div className="impact-hero-inner">
          <span className="subpage-badge">OUR IMPACT</span>
          <h1>
            Every child deserves a{" "}
            <span className="yellow-hand">childhood full of hope</span>
          </h1>
          <p>
            Since 2018, Kautike Charitable Foundation has worked across Maharashtra
            to protect children's rights to education, health, and a safe future.
          </p>
        </div>
        <div className="impact-hero-wave">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,20 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#FAF8F5" />
          </svg>
        </div>
      </section>

      {/* ── Big Number Counters ── */}
      <section className="impact-counter-section">
        <div className="about-container">
          <div className="text-center mb-8">
            <span className="mini-title">BY THE NUMBERS · 2025–26</span>
            <h2 className="section-heading">
              Real Lives. <span className="yellow-hand">Real Change.</span>
            </h2>
          </div>

          <div className="impact-big-counter-grid">
            <div className="impact-counter-card">
              <div className="impact-counter-icon">🎒</div>
              <div className="impact-counter-num"><CountUp target="15.5L+" /></div>
              <div className="impact-counter-label">Children Supported</div>
              <p className="impact-counter-desc">Learning kits, school enrollment & dropout prevention</p>
            </div>

            <div className="impact-counter-card">
              <div className="impact-counter-icon">🌱</div>
              <div className="impact-counter-num"><CountUp target="50000+" /></div>
              <div className="impact-counter-label">Trees Planted</div>
              <p className="impact-counter-desc">Neem, Peepal, Banyan & fruit trees with 85%+ survival</p>
            </div>

            <div className="impact-counter-card">
              <div className="impact-counter-icon">👧</div>
              <div className="impact-counter-num"><CountUp target="45000+" /></div>
              <div className="impact-counter-label">Girls Empowered</div>
              <p className="impact-counter-desc">Scholarships & life-skill training against child marriage</p>
            </div>

            <div className="impact-counter-card">
              <div className="impact-counter-icon">🚸</div>
              <div className="impact-counter-num"><CountUp target="12000+" /></div>
              <div className="impact-counter-label">Minors Rescued</div>
              <p className="impact-counter-desc">From child labour — back in school, safe and learning</p>
            </div>

            <div className="impact-counter-card">
              <div className="impact-counter-icon">🍲</div>
              <div className="impact-counter-num"><CountUp target="34000+" /></div>
              <div className="impact-counter-label">Children Treated</div>
              <p className="impact-counter-desc">Malnourished children & mothers given nutritional support</p>
            </div>

            <div className="impact-counter-card">
              <div className="impact-counter-icon">🏘️</div>
              <div className="impact-counter-num"><CountUp target="480+" /></div>
              <div className="impact-counter-label">Villages Reached</div>
              <p className="impact-counter-desc">Across Maharashtra with active grassroots interventions</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Program Pillars ── */}
      <section className="impact-pillars-section">
        <div className="about-container">
          <div className="text-center mb-8">
            <span className="mini-title">WHAT WE FOCUS ON</span>
            <h2 className="section-heading">
              Our <span className="yellow-hand">4 Core Programs</span>
            </h2>
          </div>

          <div className="impact-pillars-grid">
            <div className="impact-pillar-card">
              <div className="pillar-icon-wrap pillar-edu">📚</div>
              <h3>Education for Every Child</h3>
              <p>
                We enroll out-of-school children, supply learning material, train
                teachers, and run community learning centres — keeping children
                curious and in school.
              </p>
              <div className="pillar-stat-row">
                <span>15.5L+ children</span>
                <span>480+ villages</span>
              </div>
            </div>

            <div className="impact-pillar-card">
              <div className="pillar-icon-wrap pillar-health">🥗</div>
              <h3>Child Health & Nutrition</h3>
              <p>
                Our field workers screen, track and treat malnourished children
                under five and their mothers through micronutrient porridge drives
                and regular weight recovery checkups.
              </p>
              <div className="pillar-stat-row">
                <span>34,000+ treated</span>
                <span>100+ camps/year</span>
              </div>
            </div>

            <div className="impact-pillar-card">
              <div className="pillar-icon-wrap pillar-girl">🌸</div>
              <h3>Girls' Education & Safety</h3>
              <p>
                Secondary school scholarships, adolescent life-skill workshops,
                and village-level awareness drives to prevent child marriage
                and keep girls learning.
              </p>
              <div className="pillar-stat-row">
                <span>45,000+ girls</span>
                <span>Zero dropout goal</span>
              </div>
            </div>

            <div className="impact-pillar-card">
              <div className="pillar-icon-wrap pillar-green">🌳</div>
              <h3>Green India — Tree Plantation</h3>
              <p>
                Native tree planting across government school campuses and
                village common land, combined with community stewardship
                training for long-term ecological impact.
              </p>
              <div className="pillar-stat-row">
                <span>50,000+ trees</span>
                <span>85% survival rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact Story Strip ── */}
      <section className="impact-story-strip">
        <div className="about-container">
          <div className="text-center mb-8">
            <span className="mini-title">VOICES FROM THE FIELD</span>
            <h2 className="section-heading">
              Stories that <span className="yellow-hand">inspire change</span>
            </h2>
          </div>
          <div className="impact-story-cards">
            <div className="impact-story-card">
              <div className="story-quote-mark">"</div>
              <p className="story-quote-text">
                Kautike gave my daughter her first school bag and books. Today she
                stands first in class. I never thought this was possible for us.
              </p>
              <div className="story-author">
                <span className="story-author-name">Suman Waghmare</span>
                <span className="story-author-loc">· Palghar, Maharashtra</span>
              </div>
            </div>

            <div className="impact-story-card">
              <div className="story-quote-mark">"</div>
              <p className="story-quote-text">
                My son was working at a brick kiln at age 9. The foundation team
                rescued him and enrolled him in school. He wants to be a doctor now.
              </p>
              <div className="story-author">
                <span className="story-author-name">Rekha Kamble</span>
                <span className="story-author-loc">· Nashik, Maharashtra</span>
              </div>
            </div>

            <div className="impact-story-card">
              <div className="story-quote-mark">"</div>
              <p className="story-quote-text">
                Our village planted 200 trees together last monsoon. The children
                water them every day. They call it "their forest."
              </p>
              <div className="story-author">
                <span className="story-author-name">Prakash Suryavanshi</span>
                <span className="story-author-loc">· Amravati, Maharashtra</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cry-cta-banner">
        <div className="cry-cta-inner">
          <h2>Be the reason a child smiles tomorrow</h2>
          <p>Join thousands of donors making real, transparent change across India.</p>
          <div className="cta-btn-group">
            <a href="/donate" className="cry-yellow-btn">♥ Donate with 80G Tax Benefit</a>
            <a href="/stories" className="cry-outline-btn">Read Field Stories</a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}

