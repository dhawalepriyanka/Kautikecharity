import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export const metadata = {
  title: "Why Children & Community? | Kautike Charitable Foundation",
  description: "Children are the building blocks of our nation's future. Learn why Kautike Charitable Foundation focuses on child welfare, education, nutrition and community development.",
};

export default function WhyChildrenPage() {
  return (
    <main className="page-fade-in" id="top">
      <Header />

      <div className="cry-wc-page">

        {/* 1. Header Title & Subtitle */}
        <div className="cry-wc-hero-header text-center">
          <h1 className="cry-wc-main-title">Why Children?</h1>
          <div className="cry-wc-yellow-bar" />
          <p className="cry-wc-lead-text">
            Children are the building blocks of our nation&apos;s future. Let&apos;s invest in their potential today, so that they can
            become our scientists, politicians, sportspeople, journalists and teachers of tomorrow!
          </p>
        </div>

        {/* 2. Main Children Banner (100% Full Photo with Top Criss-Cross & Animated Yellow Splash) */}
        <div className="cry-wc-banner-fullscreen">
          <div className="cry-wc-fs-wrapper">
            {/* Top Sharp Criss-Cross Zigzag Cutout */}
            <div className="cry-wc-top-crisscross">
              <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true" className="cry-wc-top-svg">
                <path
                  d="M0,0 L1440,0 L1440,0 L1200,55 L960,10 L720,60 L480,8 L240,58 L0,5 Z"
                  fill="#FAF8F5"
                />
              </svg>
            </div>

            {/* Full Photo filling 100% of the banner */}
            <img
              src="/images/why-children-girls-event.jpg"
              alt="School girls in uniform - Kautike Charitable Foundation"
              className="cry-wc-full-photo-img"
            />

            {/* 100% Full-Screen Edge-to-Edge Multi-layered Animated Yellow Powder Splash */}
            <div className="cry-wc-splash-overlay">
              <svg viewBox="0 0 1440 220" fill="none" preserveAspectRatio="none" className="cry-wc-splash-svg">
                <defs>
                  <linearGradient id="yellowPowderGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
                    <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.75" />
                    <stop offset="70%" stopColor="#FBBF24" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#FAF8F5" stopOpacity="1" />
                  </linearGradient>
                  <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Layer 1: Soft Golden Glow Base */}
                <rect x="0" y="40" width="1440" height="180" fill="url(#yellowPowderGlow)" className="splash-glow-base" />

                {/* Layer 2: Organic Textured Paint Powder Splash Clouds (Animated Wave 1) */}
                <path
                  d="M0,220 L0,75 C90,30 180,95 280,55 C380,20 460,105 560,55 C660,15 740,85 860,35 C960,5 1040,80 1160,30 C1260,5 1360,65 1440,25 L1440,220 Z"
                  fill="#F59E0B"
                  opacity="0.85"
                  filter="url(#softGlow)"
                  className="splash-wave-layer-1"
                />

                {/* Layer 3: Vibrant Sunlight Yellow Mid Splash (Animated Wave 2) */}
                <path
                  d="M0,220 L0,100 C110,60 220,120 340,80 C460,45 540,115 660,70 C780,35 880,105 1000,60 C1120,25 1220,95 1340,55 C1390,40 1420,70 1440,50 L1440,220 Z"
                  fill="#FBBF24"
                  opacity="0.94"
                  className="splash-wave-layer-2"
                />

                {/* Layer 4: Intense Gold Lower Wave (Animated Wave 3) */}
                <path
                  d="M0,220 L0,130 C150,90 290,145 430,115 C570,80 690,140 830,105 C970,75 1090,130 1230,95 C1330,75 1400,110 1440,90 L1440,220 Z"
                  fill="#F5A623"
                  className="splash-wave-layer-3"
                />

                {/* Layer 5: Seamless Crisp Cream Grounding Base */}
                <path
                  d="M0,220 L0,160 C190,135 370,175 550,145 C730,120 890,165 1070,140 C1230,115 1350,155 1440,135 L1440,220 Z"
                  fill="#FAF8F5"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 3. Overlapping Population Stat Card (Exact CRY Style) */}
        <div className="cry-wc-card-wrapper">
          <div className="cry-wc-stat-card">
            <div className="cry-wc-stat-grid">
              
              {/* 10x10 Person Icons (40% gold) with India Map Watermark */}
              <div className="cry-wc-icons-box">
                <div className="cry-wc-map-watermark">
                  <svg viewBox="0 0 100 120" fill="none" opacity="0.08">
                    <path
                      d="M35 5 C40 2 60 5 65 15 C70 25 85 30 85 45 C85 60 75 75 65 95 C55 110 50 118 45 118 C40 118 35 105 25 85 C15 65 15 45 25 25 Z"
                      fill="#0F172A"
                    />
                  </svg>
                </div>
                <div className="cry-wc-icons-grid">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className={`cry-wc-person ${i < 40 ? "gold" : "gray"}`}>
                      <svg viewBox="0 0 16 28" fill="currentColor">
                        <circle cx="8" cy="4" r="3.2" />
                        <path d="M2 9.5 C2 8 14 8 14 9.5 L13 18 L11 18 L11 26 L9 26 L9 18 L7 18 L7 26 L5 26 L5 18 L3 18 Z" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Info */}
              <div className="cry-wc-stat-details">
                <h2 className="cry-wc-stat-heading">
                  At 472 million, children <span className="cry-hand-gold">account for 40%</span> of India&apos;s population
                </h2>
                <p className="cry-wc-stat-desc">
                  And yet, only 2.46% of the 2021-22 Union Budget was allocated to their development and welfare. In fact, the
                  National Plan of Action for Children recommends that budgetary allocations for children should be 5% of the
                  country&apos;s GDP – ours has been stagnant at 0.43% of GDP for the last two years.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* 4. Circumstances Title */}
        <div className="cry-wc-circumstances-header text-center">
          <h2>
            India&apos;s children battle <span className="cry-hand-gold">some of the worst circumstances</span> in the world.
          </h2>
        </div>

        {/* 5. Complete Stat Cards Hierarchy (Matching Screenshot Exactly) */}
        <div className="cry-wc-stats-container">
          
          {/* Row 1: 2 Cards */}
          <div className="cry-wc-two-cards-row">
            <div className="cry-wc-metric-card-lg">
              <div className="cry-wc-num-lg">33</div>
              <div className="cry-wc-num-script">million</div>
              <p className="cry-wc-metric-text-lg">child labourers go to work instead of school</p>
              <span className="cry-wc-metric-source-lg">Census 2011</span>
            </div>

            <div className="cry-wc-metric-card-lg">
              <div className="cry-wc-num-lg">1 of 3</div>
              <div className="cry-wc-num-script">child</div>
              <p className="cry-wc-metric-text-lg">brides in the world is from India</p>
              <span className="cry-wc-metric-source-lg">UNICEF 2014</span>
            </div>
          </div>

          {/* Row 2: 2 Cards */}
          <div className="cry-wc-two-cards-row mt-6">
            <div className="cry-wc-metric-card-lg">
              <div className="cry-wc-num-lg">2 of 3</div>
              <div className="cry-wc-num-script">child</div>
              <p className="cry-wc-metric-text-lg">deaths, below the age of 5, are caused by malnutrition</p>
              <span className="cry-wc-metric-source-lg">UNICEF 2019</span>
            </div>

            <div className="cry-wc-metric-card-lg">
              <div className="cry-wc-num-lg">2 of 5</div>
              <div className="cry-wc-num-script">children</div>
              <p className="cry-wc-metric-text-lg">do not receive complete immunization</p>
              <span className="cry-wc-metric-source-lg">NFHS 4 2016</span>
            </div>
          </div>

          {/* Row 3: 1 Centered Card */}
          <div className="cry-wc-single-card-row mt-6">
            <div className="cry-wc-metric-card-lg centered-single">
              <div className="cry-wc-num-lg">500%</div>
              <div className="cry-wc-num-script">increase</div>
              <p className="cry-wc-metric-text-lg">in crimes against children between 2008-2018</p>
              <span className="cry-wc-metric-source-lg">NCRB 2018</span>
            </div>
          </div>

        </div>

        {/* 6. "This problem before us is a mammoth one" Callout Block */}
        <div className="cry-wc-mammoth-callout text-center">
          <h2 className="cry-wc-mammoth-title">
            This problem before us is a mammoth one. But <span className="cry-hand-gold">one that can be solved within our lifetimes.</span>
          </h2>
          <p className="cry-wc-mammoth-sub">
            All it needs is for each one of us to come together and do everything in our power to contribute to a sustainable solution.
          </p>
          <div style={{ marginTop: "24px" }}>
            <a href="/donate" className="cry-yellow-pill-btn">♥ Yes, I want to help!</a>
          </div>
        </div>

        {/* 7. Yellow Paint Splash Transition into Crimson Section */}
        <div className="cry-wc-crimson-transition">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="cry-wc-transition-svg">
            <path
              d="M0,120 L0,35 C140,10 280,65 420,30 C560,0 700,60 840,25 C980,-5 1120,50 1260,20 C1350,5 1400,35 1440,25 L1440,120 Z"
              fill="#F5A623"
            />
            <path
              d="M0,120 L0,55 C160,30 320,85 480,50 C640,20 800,80 960,45 C1120,15 1280,70 1440,40 L1440,120 Z"
              fill="#D81B60"
            />
          </svg>
        </div>

        {/* 8. Crimson Red Section: The Importance Of Children's Rights */}
        <section className="cry-wc-crimson-section">
          <div className="cry-wc-crimson-container">
            
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="cry-wc-crimson-heading">The Importance Of Children&apos;s Rights</h2>
              <p className="cry-wc-crimson-lead">
                According to the United Nations Convention on the Rights of the Child (UNCRC), which was ratified by India in 1992, all children have fundamental rights which must be recognized by governments and citizens alike. At Kautike Charitable Foundation, we&apos;re committed to doing everything we can to ensure the rights of India&apos;s children and so, work on 4 key programmatic areas.
              </p>
            </div>

            {/* Program Area 1: Education (Right To Development) */}
            <div className="cry-wc-program-block">
              <div className="cry-wc-program-grid">
                
                {/* Photo with Organic Yellow Brush Frame */}
                <div className="cry-wc-brush-photo-wrap">
                  <div className="cry-wc-brush-frame">
                    <img src="/images/why-child-4.jpg" alt="Child in school - Education Rights" />
                  </div>
                </div>

                {/* Content */}
                <div className="cry-wc-program-copy">
                  <h3 className="cry-wc-program-title">Education</h3>
                  <div className="cry-wc-program-badge">Right To Development</div>
                  <div className="cry-wc-program-line" />
                  
                  <p>
                    A quality education not only builds knowledge, capabilities, life skills and values amongst children but also develops their creative, social and emotional abilities. It is crucial for their cognitive and personal development, including critical thinking and problem-solving.
                  </p>
                  <p className="mt-3">
                    We believe that every child should be able to go to school and complete their education without any discrimination based on gender, caste or socio-economic status.
                  </p>
                </div>

              </div>

              {/* 3 Pillars for Education */}
              <div className="cry-wc-pillars-row mt-8">
                <div className="cry-wc-pillar-col">
                  <div className="cry-wc-pillar-icon">🎓</div>
                  <h4>Early Childhood Education</h4>
                  <span className="cry-wc-pillar-age">0 – 6 Years</span>
                  <p>A child&apos;s early years are the foundation for developing their future learning abilities. Research says that 90% of a child&apos;s brain is developed by the age of 5, which makes early childhood education an essential building block.</p>
                </div>

                <div className="cry-wc-pillar-col">
                  <div className="cry-wc-pillar-icon">🏫</div>
                  <h4>School Readiness</h4>
                  <span className="cry-wc-pillar-age">6 – 8 Years</span>
                  <p>Anganwadi centers and primary schools play a big role in preparing children for formal education. They help children develop the skills, knowledge and attitudes which are critical for them to succeed in school.</p>
                </div>

                <div className="cry-wc-pillar-col">
                  <div className="cry-wc-pillar-icon">📚</div>
                  <h4>Learning Outcomes</h4>
                  <span className="cry-wc-pillar-age">6 – 18 Years</span>
                  <p>Learning outcomes are influenced by children&apos;s uninterrupted access to quality education. Ensuring children are enrolled in school and don&apos;t drop out is a critical area of intervention.</p>
                </div>
              </div>
            </div>

            {/* Program Area 2: Health & Nutrition (Right To Survival) */}
            <div className="cry-wc-program-block mt-16">
              <div className="cry-wc-program-grid reverse">
                
                {/* Content */}
                <div className="cry-wc-program-copy">
                  <h3 className="cry-wc-program-title">Health &amp; Nutrition</h3>
                  <div className="cry-wc-program-badge">Right To Survival</div>
                  <div className="cry-wc-program-line" />
                  
                  <p>
                    Proper nutrition and quality primary healthcare are essential for a child&apos;s physical, mental and cognitive development. Timely, regular and adequate intake of essential nutrition is necessary from the time of conception itself to avoid long-term and in some cases, irreversible damage to the child&apos;s health.
                  </p>
                  <p className="mt-3">
                    We believe that no child should suffer from malnutrition or poor health irrespective of their socio-economic background.
                  </p>
                  <p className="mt-3">
                    Our health and nutrition programs adopt a preventative and responsive approach towards reducing malnourishment as well as India&apos;s infant mortality rate (IMR) and child mortality rate (CMR) by connecting communities to government healthcare benefits.
                  </p>
                </div>

                {/* Photo with Organic Yellow Brush Frame */}
                <div className="cry-wc-brush-photo-wrap">
                  <div className="cry-wc-brush-frame">
                    <img src="/images/why-child-2.jpg" alt="Child enjoying meal - Health & Nutrition" />
                  </div>
                </div>

              </div>

              {/* 3 Pillars for Health & Nutrition */}
              <div className="cry-wc-pillars-row mt-8">
                <div className="cry-wc-pillar-col">
                  <div className="cry-wc-pillar-icon">🍼</div>
                  <h4>Prenatal &amp; Postnatal Care</h4>
                  <span className="cry-wc-pillar-age">Mothers &amp; Newborns</span>
                  <p>Proper and timely care for expectant as well as lactating mothers is essential for child&apos;s healthy development. Regular checkups and supplementary nutrition ensure strong survival outcomes.</p>
                </div>

                <div className="cry-wc-pillar-col">
                  <div className="cry-wc-pillar-icon">⚖️</div>
                  <h4>Growth Monitoring</h4>
                  <span className="cry-wc-pillar-age">0 – 5 Years</span>
                  <p>Regular growth monitoring for children till the age of 5 years is imperative to prevent nutritional disorders. Tracking weight-for-age and height-for-age prevents severe acute malnutrition.</p>
                </div>

                <div className="cry-wc-pillar-col">
                  <div className="cry-wc-pillar-icon">🥗</div>
                  <h4>Nutrition &amp; Meal Drives</h4>
                  <span className="cry-wc-pillar-age">All Children</span>
                  <p>Direct intervention drives providing nutrient-dense breakfast and snack kits to children across Anganwadis and community learning centers to boost immunity and physical stamina.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 9. Transition from Crimson back to Cream with Yellow Paint Wave */}
        <div className="cry-wc-crimson-bottom-transition">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="cry-wc-transition-svg">
            <path
              d="M0,0 L1440,0 L1440,30 C1280,65 1120,15 960,50 C800,85 640,25 480,60 C320,95 160,35 0,70 Z"
              fill="#D81B60"
            />
            <path
              d="M0,35 C160,75 320,20 480,55 C640,90 800,30 960,65 C1120,100 1280,45 1440,80 L1440,120 L0,120 Z"
              fill="#F5A623"
              opacity="0.9"
            />
            <path
              d="M0,65 C180,105 360,50 540,85 C720,120 880,60 1060,95 C1220,125 1340,75 1440,110 L1440,120 L0,120 Z"
              fill="#FAF8F5"
            />
          </svg>
        </div>

        {/* 10. "How do you want to help children today?" Section */}
        <section className="cry-wc-help-section text-center">
          <h2 className="cry-wc-help-title">
            How do you want to <span className="cry-hand-gold">help children</span> today?
          </h2>
          <p className="cry-wc-help-sub">
            Your smallest contribution makes a big difference to children&apos;s lives. We count on the generosity of people like you to be able to create real change for India&apos;s children!
          </p>
          <div style={{ marginTop: "24px" }}>
            <a href="/donate" className="cry-yellow-pill-btn">
              ♥ Donate For Happier Childhoods
            </a>
          </div>
        </section>



        {/* 12. 3 Trust Badges Row (100% Support, 80G Tax Exemption, Safe & Secure) */}
        <section className="cry-wc-trust-badges-section">
          <div className="cry-wc-trust-grid">
            
            <div className="cry-wc-trust-item">
              <div className="cry-wc-trust-icon">💛</div>
              <p>All our efforts are made possible only because of your support</p>
            </div>

            <div className="cry-wc-trust-item">
              <div className="cry-wc-trust-icon">📋</div>
              <p>Your donations are tax exempted under 80G of the Indian Income Tax Act</p>
            </div>

            <div className="cry-wc-trust-item">
              <div className="cry-wc-trust-icon">🔒</div>
              <p>Your donation transactions are completely safe and secure</p>
            </div>

          </div>
        </section>

      </div>

      <Footer />
      <FloatingActions />
    </main>
  );
}
