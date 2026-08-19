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
          <span className="subpage-badge">OUR CORE MISSION · बाल हक्क व सक्षमीकरण</span>
          <h1 className="cry-wc-main-title">
            Why Children &amp; <span className="cry-hand-gold">Their Future?</span>
          </h1>
          <div className="cry-wc-yellow-bar" />
          <p className="cry-wc-lead-text">
            Children are the building blocks of our nation&apos;s future. Let&apos;s invest in their potential, education, and health today, so that they can
            become tomorrow&apos;s scientists, doctors, educators, and changemakers!
          </p>
        </div>

        {/* 2. Main Children Banner (Full Edge-to-Edge with Fluid Top Wave & Multi-layered Animated Golden Splash) */}
        <div className="cry-wc-banner-fullscreen">
          <div className="cry-wc-fs-wrapper">
            {/* Top Fluid Organic Watercolor Wave */}
            <div className="cry-wc-top-crisscross">
              <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true" className="cry-wc-top-svg">
                <path
                  d="M0,0 L1440,0 L1440,40 C1300,75 1160,20 1020,55 C880,90 740,30 600,65 C460,95 320,35 180,60 C100,75 40,30 0,45 Z"
                  fill="#FAF8F5"
                />
              </svg>
            </div>

            {/* Full Photo */}
            <img
              src="/images/why-children-girls-event.jpg"
              alt="School girls in uniform - Kautike Charitable Foundation"
              className="cry-wc-full-photo-img"
            />

            {/* Bottom Clean Cream Watercolor Wave (No yellow lines) */}
            <div className="cry-wc-splash-overlay">
              <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="cry-wc-splash-svg">
                <path
                  d="M0,45 C150,95 320,15 480,65 C640,115 800,20 960,70 C1120,110 1280,35 1440,60 L1440,120 L0,120 Z"
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

              {/* 100 Icons Grid with Map Watermark */}
              <div className="cry-wc-icons-box">
                <div className="cry-wc-map-watermark">
                  <svg viewBox="0 0 200 240" fill="none">
                    <path
                      d="M100 20 C120 40, 140 30, 150 60 C160 90, 180 110, 170 140 C160 170, 140 190, 120 210 C100 230, 90 220, 80 190 C70 160, 50 140, 40 110 C30 80, 50 50, 70 30 Z"
                      fill="#FEF3C7"
                      opacity="0.6"
                    />
                  </svg>
                </div>
                <div className="cry-wc-icons-grid">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <span
                      key={i}
                      className={`cry-wc-person ${i < 40 ? "gold" : "gray"}`}
                      title={i < 40 ? "40% Children" : "60% Adult Population"}
                    >
                      ♟
                    </span>
                  ))}
                </div>
              </div>

              {/* Text Information */}
              <div className="cry-wc-stat-info">
                <h3 className="cry-wc-stat-h3">
                  At 472 million, children <span className="cry-hand-gold">account for 40%</span> of India&apos;s population
                </h3>
                <p className="cry-wc-stat-p">
                  And yet, only 2.46% of the Union Budget is allocated to their development and welfare. In fact, the National Plan of Action for Children recommends that budgetary allocations for children should be 5% of the country&apos;s GDP – ours has been stagnant at 0.43% of GDP.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* 4. Circumstances Title */}
        <div className="cry-wc-circumstances-header text-center">
          <span className="mini-title">GROUND REALITIES</span>
          <h2>
            India&apos;s children battle <span className="cry-hand-gold">some of the worst circumstances</span> in the world.
          </h2>
        </div>

        {/* 5. Complete Stat Cards Hierarchy (Balanced 3 + 2 Layout) */}
        <div className="cry-wc-stats-container">
          
          {/* Row 1: 3 Cards */}
          <div className="cry-wc-three-cards-row">
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

            <div className="cry-wc-metric-card-lg">
              <div className="cry-wc-num-lg">2 of 3</div>
              <div className="cry-wc-num-script">child</div>
              <p className="cry-wc-metric-text-lg">deaths, below age 5, are caused by malnutrition</p>
              <span className="cry-wc-metric-source-lg">UNICEF 2019</span>
            </div>
          </div>

          {/* Row 2: 2 Centered Cards */}
          <div className="cry-wc-two-cards-centered-row mt-6">
            <div className="cry-wc-metric-card-lg">
              <div className="cry-wc-num-lg">2 of 5</div>
              <div className="cry-wc-num-script">children</div>
              <p className="cry-wc-metric-text-lg">do not receive complete immunization</p>
              <span className="cry-wc-metric-source-lg">NFHS 4 2016</span>
            </div>

            <div className="cry-wc-metric-card-lg">
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



        {/* 12. 3 Premium Trust Badges Cards */}
        <section className="cry-wc-trust-badges-section">
          <div className="cry-wc-trust-grid">
            
            <div className="cry-wc-trust-item">
              <div className="cry-wc-trust-icon">💛</div>
              <div className="cry-wc-trust-text-wrap">
                <h4 className="cry-trust-card-title">100% Impact Driven</h4>
                <p>All our efforts are made possible only because of your support</p>
              </div>
            </div>

            <div className="cry-wc-trust-item">
              <div className="cry-wc-trust-icon">📋</div>
              <div className="cry-wc-trust-text-wrap">
                <h4 className="cry-trust-card-title">80G Tax Exemption</h4>
                <p>Your donations are tax exempted under 80G of the Indian Income Tax Act</p>
              </div>
            </div>

            <div className="cry-wc-trust-item">
              <div className="cry-wc-trust-icon">🔒</div>
              <div className="cry-wc-trust-text-wrap">
                <h4 className="cry-trust-card-title">100% Safe &amp; Secure</h4>
                <p>Your donation transactions are completely safe, encrypted and secure</p>
              </div>
            </div>

          </div>
        </section>

      </div>

      <Footer />
      <FloatingActions />
    </main>
  );
}
