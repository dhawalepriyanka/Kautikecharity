import { CampaignSlider } from "./components/CampaignSlider";
import { HeroMedia } from "./components/HeroMedia";
import { ImpactStats } from "./components/ImpactStats";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FloatingActions } from "./components/FloatingActions";
import { PageMotion } from "./components/PageMotion";
import { StoryCarousel } from "./components/StoryCarousel";

export default function Home() {
  return (
    <main className="page-fade-in" id="top">
      <PageMotion />

      <Header />

      {/* 3. EXACT CRY.ORG HERO WITH VIDEO & ORGANIC PAINT STROKE FRAME */}
      <section className="hero-cry-split" id="top">
        <div className="hero-cry-copy">
          <h1>
            Nurturing <span className="yellow-hand">children,</span> <br />
            planting <span className="yellow-text">hope,</span> <br />
            protecting our future
          </h1>

          <a href="/donate" className="cry-yellow-btn">
            ? Yes! I Want To Help!
          </a>

          <div className="cry-scroll-hint">
            <div className="cry-scroll-line">
              <div className="cry-scroll-dot" />
            </div>
            <span>Scroll For More</span>
          </div>
        </div>

        {/* Right Video with Organic Expressive Paint Splatters */}
        <HeroMedia />
      </section>

      {/* 4. HOW DO YOU WANT TO HELP CHILDREN TODAY */}
      <CampaignSlider />

      {/* 4b. WHAT WE DO FULL-BLEED YELLOW PAINT BRUSH WAVE SECTION (REAL PHOTOS) */}
      <section className="cry-wwd-full-section" id="about">
        {/* Top Organic Yellow Brush Wave */}
        <div className="cry-wwd-paint-wave">
          <svg className="cry-wave-svg" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M0,32 C180,90 360,10 540,65 C720,110 900,20 1080,75 C1260,115 1380,45 1440,32 L1440,120 L0,120 Z"
              fill="#F5A623"
            />
          </svg>
        </div>

        {/* Yellow Banner Header & Cards */}
        <div className="cry-wwd-yellow-bg">
          <div className="cry-wwd-header-pill">
            <h2>What We Do</h2>
          </div>

          {/* 4 Interactive Overlapping Cards */}
          <div className="cry-wwd-cards-row">
            {/* Card 1: Education */}
            <div className="wwd-card card-pink">
              <div className="wwd-card-front">
                <div className="wwd-real-photo-wrap">
                  <img src="/images/education-campaign.jpg" alt="Education Drive" className="wwd-real-photo" />
                </div>
                <h3 className="wwd-card-title">Education</h3>
              </div>
              <div className="wwd-card-back">
                <h3 className="wwd-card-title">Education</h3>
                <p className="wwd-card-text">Providing school kits, academic support centers, and learning materials for every child.</p>
              </div>
            </div>

            {/* Card 2: Health & Nutrition */}
            <div className="wwd-card card-cyan">
              <div className="wwd-card-front">
                <div className="wwd-real-photo-wrap">
                  <img src="/images/children-nutrition.jpg" alt="Health & Nutrition" className="wwd-real-photo" />
                </div>
                <h3 className="wwd-card-title">Health &amp; Nutrition</h3>
              </div>
              <div className="wwd-card-back">
                <h3 className="wwd-card-title">Health &amp; Nutrition</h3>
                <p className="wwd-card-text">Increasing access to proper nutrition, growth monitoring, and quality healthcare.</p>
              </div>
            </div>

            {/* Card 3: Safety & Protection */}
            <div className="wwd-card card-purple">
              <div className="wwd-card-front">
                <div className="wwd-real-photo-wrap">
                  <img src="/images/child-labour-campaign.jpg" alt="Safety & Protection" className="wwd-real-photo" />
                </div>
                <h3 className="wwd-card-title">Safety &amp; Protection</h3>
              </div>
              <div className="wwd-card-back">
                <h3 className="wwd-card-title">Safety &amp; Protection</h3>
                <p className="wwd-card-text">Preventing child labor, supporting child rights, and protecting vulnerable youth.</p>
              </div>
            </div>

            {/* Card 4: Environment & Plants */}
            <div className="wwd-card card-orange">
              <div className="wwd-card-front">
                <div className="wwd-real-photo-wrap">
                  <img src="/images/plantation-campaign.jpg" alt="Environment & Plants" className="wwd-real-photo" />
                </div>
                <h3 className="wwd-card-title">Environment &amp; Plants</h3>
              </div>
              <div className="wwd-card-back">
                <h3 className="wwd-card-title">Environment &amp; Plants</h3>
                <p className="wwd-card-text">Planting saplings, restoring urban green cover, and promoting environmental care.</p>
              </div>
            </div>
          </div>

          {/* Bottom Yellow Brush Wave Transition */}
          <div className="cry-wwd-bottom-wave">
            <svg className="cry-wave-svg" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M0,0 L1440,0 L1440,30 C1250,90 1050,15 850,75 C650,110 450,20 250,85 C120,110 0,40 0,30 Z"
                fill="#F5A623"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* 5. EXACT CRY.ORG SYSTEMIC APPROACH SECTION */}
      <section className="cry-approach-section" id="approach">
        <div className="cry-approach-grid">
          {/* Left Text Column */}
          <div className="cry-approach-left">
            <h2 className="cry-approach-title">
              Our approach is modeled around bringing change <span className="yellow-hand">at all levels</span>
            </h2>

            <p className="cry-approach-p">
              With your support, we address children&apos;s critical needs by working with parents, teachers, Anganwadi workers, communities, district and state level governments as well as the children themselves.
            </p>

            <p className="cry-approach-p">
              We focus on changing behaviours and practices at the grassroots level and influencing public policy at a systemic level ? thereby creating an ecosystem where children are made the nation&apos;s priority.
            </p>
          </div>

          {/* Right Systemic Orbital Diagram */}
          <div className="cry-orbital-wrap">
            <div className="cry-orbital-circle">
              {/* Outer Dashed Orbit Ring */}
              <div className="cry-orbit-ring" />

              {/* Central Children Photo */}
              <div className="cry-center-node">
                <div
                  className="cry-center-img"
                  style={{
                    backgroundImage: "url('/images/children-orbital.jpg')"
                  }}
                />
                <span className="cry-center-label">Children</span>
              </div>

              {/* Orbital Nodes with CRY.org Tooltip Popups */}
              {/* 1. Family (Top Left) */}
              <button type="button" className="cry-orbit-node node-family" aria-label="Show Family information">
                <div className="node-icon-circle">
                  <svg viewBox="0 0 40 40" fill="none">
                    <path d="M20 10 C22 10 24 12 24 14 C24 16 22 18 20 18 C18 18 16 16 16 14 C16 12 18 10 20 10 Z" fill="#E67E22" />
                    <path d="M14 26 C14 21 26 21 26 26 L26 30 L14 30 Z" fill="#F5A623" />
                  </svg>
                </div>
                <span className="node-label">Family</span>
                <div className="node-tooltip tooltip-right">
                  Building awareness among parents &amp; guardians to change attitudes towards child education, health, and gender equality.
                </div>
              </button>

              {/* 2. Community (Top Right) */}
              <button type="button" className="cry-orbit-node node-community" aria-label="Show Community information">
                <div className="node-icon-circle">
                  <svg viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="14" r="4" fill="#F5A623" />
                    <circle cx="12" cy="18" r="3" fill="#E67E22" />
                    <circle cx="28" cy="18" r="3" fill="#E67E22" />
                    <path d="M12 28 C12 24 28 24 28 28" stroke="#F5A623" strokeWidth="3" />
                  </svg>
                </div>
                <span className="node-label">Community</span>
                <div className="node-tooltip tooltip-left">
                  Mobilizing grassroots leaders, teachers, Anganwadi workers, and village child protection committees.
                </div>
              </button>

              {/* 3. Government (Bottom Right) */}
              <button type="button" className="cry-orbit-node node-government" aria-label="Show Government information">
                <div className="node-icon-circle">
                  <svg viewBox="0 0 40 40" fill="none">
                    <path d="M8 16 L20 8 L32 16 L32 18 L8 18 Z" fill="#F5A623" />
                    <rect x="10" y="20" width="4" height="10" fill="#E67E22" />
                    <rect x="18" y="20" width="4" height="10" fill="#E67E22" />
                    <rect x="26" y="20" width="4" height="10" fill="#E67E22" />
                    <rect x="6" y="30" width="28" height="4" fill="#F5A623" />
                  </svg>
                </div>
                <span className="node-label">Government</span>
                <div className="node-tooltip tooltip-left">
                  Partnering with district, state and national level governments to strengthen policy and advocacy systems for children.
                </div>
              </button>

              {/* 4. Public (Bottom Left) */}
              <button type="button" className="cry-orbit-node node-public" aria-label="Show Public information">
                <div className="node-icon-circle">
                  <svg viewBox="0 0 40 40" fill="none">
                    <circle cx="16" cy="14" r="4" fill="#F5A623" />
                    <circle cx="24" cy="14" r="4" fill="#E67E22" />
                    <path d="M10 28 C10 23 20 23 20 28" stroke="#F5A623" strokeWidth="3" />
                    <path d="M20 28 C20 23 30 23 30 28" stroke="#E67E22" strokeWidth="3" />
                  </svg>
                </div>
                <span className="node-label">Public</span>
                <div className="node-tooltip tooltip-right">
                  Sensitizing public society, youth, and volunteers to champion child rights and environmental care.
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. IMPACT STATS BANNER */}
      <section className="impact-section reveal-on-scroll" id="impact">
        <h2 className="cry-impact-heading">
          This is the impact <span className="yellow-hand">You</span> helped us achieve in 2025-26
        </h2>

        <ImpactStats />

        <p className="impact-note">
          * Impact figures reflect verified cumulative programme reports and are updated periodically.
        </p>
      </section>

      {/* 7. EXACT CRY.ORG STORIES & UPDATES PHOTO BANNER + YELLOW PAINT WAVE SECTION */}
      <section className="cry-stories-full-section" id="stories">
        {/* Top Fluid Organic Watercolor Wave Transition */}
        <div className="cry-stories-top-paint-wave">
          <svg className="cry-wave-svg" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M0,0 L1440,0 L1440,40 C1300,75 1160,20 1020,55 C880,90 740,30 600,65 C460,95 320,35 180,60 C100,75 40,30 0,45 Z"
              fill="#FAF8F5"
            />
          </svg>
        </div>

        {/* Full-Bleed Photo Banner with Smiling Student */}
        <div className="cry-stories-photo-hero">
          <img
            src="/images/stories-banner.jpg"
            alt="Kautike Charitable Foundation - Nurturing Children"
            className="cry-stories-img-element"
          />
          
          {/* Bottom Organic Yellow Brush Wave */}
          <div className="cry-stories-paint-wave">
            <svg className="cry-wave-svg" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M0,35 C180,90 360,10 540,65 C720,110 900,20 1080,75 C1260,115 1380,45 1440,35 L1440,120 L0,120 Z"
                fill="#F5A623"
              />
            </svg>
          </div>
        </div>

        {/* Yellow Background Section Header & Overlapping Story Carousel */}
        <div className="cry-stories-yellow-bg">
          <div className="cry-stories-header">
            <h2 className="cry-stories-title">Stories &amp; Updates</h2>
          </div>

          <div className="cry-stories-container">
            <StoryCarousel />
          </div>

          {/* Bottom Yellow Organic Brush Wave Cutout */}
          <div className="cry-stories-bottom-wave">
            <svg className="cry-wave-svg" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M0,40 C180,95 360,15 540,75 C720,115 900,25 1080,85 C1260,115 1380,45 1440,35 L1440,100 L0,100 Z"
                fill="#FAF8F5"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* 8. EXACT CRY.ORG FOUNDER'S QUOTE SECTION */}
      <section className="cry-quote-section">
        <div className="cry-quote-mark">?</div>
        <blockquote className="cry-quote-text">
          If we all do something, then together there is no problem that we cannot solve!
        </blockquote>
        <div className="cry-quote-author-wrap">
          <span className="cry-author-role">KAUTIKE CHARITABLE FOUNDATION</span>
        </div>
      </section>

      {/* Full-Bleed Students Photo Banner with Top and Bottom Organic Paint Waves */}
      <div className="cry-students-photo-banner">
        {/* Top Organic Paint Wave Transition (Gentle Wave) */}
        <div className="cry-students-top-wave">
          <svg className="cry-wave-svg" viewBox="0 0 1440 50" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M0,0 L1440,0 L1440,15 C1260,35 1080,10 900,25 C720,5 540,28 360,10 C180,25 0,12 0,15 Z"
              fill="#FAF8F5"
            />
          </svg>
        </div>

        <img
          src="/images/smiling-girl-writing.jpg"
          alt="Kautike Charitable Foundation - Girls Education"
          className="cry-students-img"
        />

        {/* Bottom Yellow Organic Brush Wave */}
        <div className="cry-students-paint-wave">
          <svg className="cry-wave-svg" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M0,35 C180,90 360,10 540,65 C720,110 900,20 1080,75 C1260,115 1380,45 1440,35 L1440,100 L0,100 Z"
              fill="#FFC107"
            />
          </svg>
        </div>
      </div>

      {/* 10. CRY.ORG PREMIUM TRUST BADGES BAR */}
      <section className="cry-wc-trust-badges-section">
        <div className="cry-trust-bar">
          <div className="cry-trust-item">
            <div className="cry-trust-badge-icon yellow-heart">??</div>
            <div className="cry-trust-text">
              <h4 className="cry-trust-card-title">100% Impact Driven</h4>
              <p className="cry-trust-card-desc">All our efforts are made possible only because of your support</p>
            </div>
          </div>

          <div className="cry-trust-item">
            <div className="cry-trust-badge-icon lock-badge">??</div>
            <div className="cry-trust-text">
              <h4 className="cry-trust-card-title">Safe &amp; Secure Payments</h4>
              <p className="cry-trust-card-desc">256-bit encrypted Razorpay payment gateway</p>
            </div>
          </div>

          <div className="cry-trust-item">
            <div className="cry-trust-badge-icon shield-badge">???</div>
            <div className="cry-trust-text">
              <h4 className="cry-trust-card-title">Tax Exemption 80G</h4>
              <p className="cry-trust-card-desc">Receive instant 80G tax receipt for every contribution</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      <section className="cry-wc-faq-section" id="faqs">
        <div className="cry-wc-faq-container">
          <h2 className="cry-wc-faq-title">Frequently Asked Questions</h2>
          <p className="cry-wc-faq-subtitle">
            Find answers to common questions regarding donations, 80G tax exemption, and our grassroots impact.
          </p>

          <div className="cry-wc-faq-list">
            <details className="cry-wc-faq-item">
              <summary className="cry-wc-faq-question">
                <span>Is my donation tax-exempt?</span>
                <span className="cry-wc-faq-toggle">+</span>
              </summary>
              <div className="cry-wc-faq-answer">
                <p>
                  Yes! All donations made to Kautike Charitable Foundation are eligible for tax deduction under Section 80G of the Income Tax Act, 1961. You will receive an instant 80G tax exemption certificate and donation receipt immediately upon successful payment.
                </p>
              </div>
            </details>

            <details className="cry-wc-faq-item">
              <summary className="cry-wc-faq-question">
                <span>How will my donation be utilized?</span>
                <span className="cry-wc-faq-toggle">+</span>
              </summary>
              <div className="cry-wc-faq-answer">
                <p>
                  Your contribution directly funds child education kits, nutritional support drives, tree plantation initiatives, and community development across Maharashtra. We publish transparent impact reports regularly.
                </p>
              </div>
            </details>

            <details className="cry-wc-faq-item">
              <summary className="cry-wc-faq-question">
                <span>Can I make a donation offline via bank transfer?</span>
                <span className="cry-wc-faq-toggle">+</span>
              </summary>
              <div className="cry-wc-faq-answer">
                <p>
                  Yes. You can directly transfer funds to our official Foundation bank account. Contact our team at info@kautikefoundation.org or call +91 810 836 2688 for bank details.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
