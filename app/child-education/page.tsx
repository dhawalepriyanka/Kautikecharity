import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export const metadata = {
  title: "Child Education | Kautike Charitable Foundation",
  description: "Kautike Charitable Foundation ensures every child accesses quality schooling across Maharashtra.",
};

export default function ChildEducationPage() {
  return (
    <main className="page-fade-in" id="top">
      <Header />

      <section className="prog-hero" style={{ background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)" }}>
        <div className="prog-hero-inner">
          <span className="subpage-badge">WHAT WE DO</span>
          <h1>Child Education &amp; <span className="yellow-hand">Foundational Literacy</span></h1>
          <p>Ensuring every child from marginalized backgrounds accesses quality, joyful, and continuous schooling — because education is the most powerful tool to break the cycle of poverty.</p>
          <div className="prog-hero-stats">
            <div className="prog-hero-stat"><strong>15.5L+</strong><span>Children Supported</span></div>
            <div className="prog-hero-stat"><strong>1,200+</strong><span>Classrooms Upgraded</span></div>
            <div className="prog-hero-stat"><strong>480+</strong><span>Villages Reached</span></div>
          </div>
        </div>
        <div className="prog-hero-wave">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,20 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#FAF8F5" />
          </svg>
        </div>
      </section>

      {/* CRY-style Children Portrait Row */}
      <section className="edu-children-showcase">
        <div className="edu-showcase-headline">
          <h2>
            7+ Years. Maharashtra.<br />
            <span className="edu-showcase-yellow">15.5 Lakh+</span>{" "}
            <span className="edu-showcase-script">Children.</span>
          </h2>
          <p>We have been able to make a positive impact on the lives of so many children, all thanks to your unwavering support.</p>
          <hr className="edu-showcase-divider" />
        </div>

        <div className="edu-children-row">
          <div className="edu-child-card" style={{ "--card-bg": "#22C55E" } as React.CSSProperties}>
            <img src="/images/why-child-1.jpg" alt="Child supported by Kautike" />
          </div>
          <div className="edu-child-card" style={{ "--card-bg": "#F97316" } as React.CSSProperties}>
            <img src="/images/why-child-2.jpg" alt="Child supported by Kautike" />
          </div>
          <div className="edu-child-card" style={{ "--card-bg": "#22C55E" } as React.CSSProperties}>
            <img src="/images/smiling-girl.jpg" alt="Child supported by Kautike" />
          </div>
          <div className="edu-child-card" style={{ "--card-bg": "#3B82F6" } as React.CSSProperties}>
            <img src="/images/why-child-3.jpg" alt="Child supported by Kautike" />
          </div>
          <div className="edu-child-card" style={{ "--card-bg": "#A855F7" } as React.CSSProperties}>
            <img src="/images/why-child-4.jpg" alt="Child supported by Kautike" />
          </div>
          <div className="edu-child-card" style={{ "--card-bg": "#14B8A6" } as React.CSSProperties}>
            <img src="/images/approach-maharashtra-child.jpg" alt="Child supported by Kautike" />
          </div>
        </div>

        <div className="edu-yellow-brush">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,60 C200,20 400,100 600,55 C800,15 1000,90 1200,50 C1320,30 1400,70 1440,60 L1440,120 L0,120 Z" fill="#FFC107" opacity="0.9" />
            <path d="M0,80 C180,50 350,110 550,70 C750,35 950,100 1150,65 C1300,42 1400,80 1440,75 L1440,120 L0,120 Z" fill="#F5A623" opacity="0.6" />
          </svg>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="about-container">
          <div className="text-center mb-8">
            <span className="mini-title">OUR APPROACH</span>
            <h2 className="section-heading">How We <span className="yellow-hand">Make It Happen</span></h2>
          </div>
          <div className="prog-pillars-grid">
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">🏫</div>
              <h3>Remedial Learning Centres</h3>
              <p>After-school support bridging learning gaps in mathematics, reading, and digital literacy for children who fall behind in government schools.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">🚪</div>
              <h3>School Enrolment Drives</h3>
              <p>Door-to-door counseling convincing migrant and daily-wage families to enroll out-of-school children in formal education.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">📚</div>
              <h3>Smart Kits &amp; Libraries</h3>
              <p>Equipping rural schools with age-appropriate STEM kits, textbooks, and interactive storybooks to make learning engaging.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">👩‍🏫</div>
              <h3>Teacher Training</h3>
              <p>Upskilling government school teachers with modern pedagogy, child-friendly teaching methods, and assessment tools.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">💻</div>
              <h3>Digital Literacy</h3>
              <p>Introducing tablets, projectors and e-learning content in remote village schools to bridge the digital divide.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">🎒</div>
              <h3>School Supplies</h3>
              <p>Distributing free school bags, notebooks, uniforms and stationery so no child misses school due to lack of materials.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="about-container">
          <div className="prog-story-split">
            <div className="prog-story-img" style={{ backgroundImage: "url(/images/help-tomorrow.jpg)" }}></div>
            <div className="prog-story-copy">
              <span className="mini-title">FIELD STORY</span>
              <h2 className="section-heading">From Child Labour to <span className="yellow-hand">Class Topper</span></h2>
              <p>Ravi, 11, from Palghar was helping his parents at a brick kiln when our field team intervened. Enrolled into a remedial centre, within 6 months he stood first in his class. Today he dreams of becoming an engineer.</p>
              <a href="/stories" className="cry-yellow-btn">Read More Stories</a>
            </div>
          </div>
        </div>
      </section>

      <section className="edu-cta-redesign">
        <div className="edu-cta-left">
          <div className="edu-cta-badge">MAKE A DIFFERENCE</div>
          <h2 className="edu-cta-heading">
            Every child deserves<br />
            <span className="edu-cta-accent">a chance to learn.</span>
          </h2>
          <p className="edu-cta-sub">
            ₹500 per month keeps one child in school for a full year — with books, supplies, and dedicated support.
          </p>
          <div className="edu-cta-actions">
            <a href="/donate" className="edu-cta-primary-btn">Sponsor A Child</a>
            <a href="/impact" className="edu-cta-ghost-btn">See Our Impact →</a>
          </div>
          <div className="edu-cta-trust">
            <span>🔒 80G Tax Exempt</span>
            <span>✓ Transparent Reporting</span>
            <span>❤️ 15.5L+ Children Helped</span>
          </div>
        </div>
        <div className="edu-cta-right">
          <div className="edu-cta-card">
            <div className="edu-cta-stat-big">₹500<span>/month</span></div>
            <p>funds one child's full year of schooling</p>
            <div className="edu-cta-mini-stats">
              <div><strong>15.5L+</strong><span>Children</span></div>
              <div><strong>480+</strong><span>Villages</span></div>
              <div><strong>1200+</strong><span>Classrooms</span></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
