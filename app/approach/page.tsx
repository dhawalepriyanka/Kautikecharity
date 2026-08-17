import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export const metadata = {
  title: "Our Approach | Empowering Maharashtra · Kautike Charitable Foundation",
  description: "Learn how Kautike Charitable Foundation works directly with children, families, Gram Panchayats, and government systems across Maharashtra to create sustainable, lasting change.",
};

export default function ApproachPage() {
  return (
    <main className="page-fade-in" id="top">
      <Header />

      <div className="cry-wc-page">

        {/* 1. Header Title & Subtitle */}
        <div className="cry-wc-hero-header text-center">
          <h1 className="cry-wc-main-title">Our Approach</h1>
          <div className="cry-wc-yellow-bar" />
          <p className="cry-wc-lead-text">
            Kautike Charitable Foundation works directly with children and rural communities across Maharashtra,
            as well as partnering with local schools, Gram Panchayats, Anganwadis, and district administrations to create sustainable change.
          </p>
        </div>



        {/* 3. Children Banner with Exact CRY Style Top Paint Edge & Animated Yellow Splash Bottom */}
        <div className="cry-wc-banner-fullscreen mt-8">
          <div className="cry-wc-fs-wrapper" style={{ height: "clamp(760px, 90vw, 1050px)" }}>
            
            {/* Top Subtle Organic Watercolor Edge (Exact CRY Style) */}
            <div className="cry-wc-top-paint-edge" style={{ height: "clamp(18px, 2.5vw, 32px)" }}>
              <svg viewBox="0 0 1440 36" preserveAspectRatio="none" className="cry-wc-top-svg">
                <path
                  d="M0,0 L1440,0 L1440,14 C1320,5 1200,20 1080,10 C960,3 840,16 720,7 C600,18 480,4 360,13 C240,3 120,17 0,8 Z"
                  fill="#FAF8F5"
                />
              </svg>
            </div>

            {/* Full Child Photo */}
            <img
              src="/images/approach-maharashtra-child.jpg"
              alt="Child receiving nutrition kit in Maharashtra - Kautike Charitable Foundation"
              className="cry-wc-full-photo-img"
              style={{ objectPosition: "center 0%" }}
            />

            {/* Organic Slim Animated Watercolor Yellow Splash at Bottom */}
            <div className="cry-wc-splash-overlay" style={{ height: "clamp(60px, 8vw, 100px)" }}>
              <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" className="cry-wc-splash-svg">
                <path
                  d="M0,100 L0,35 C120,15 240,45 360,25 C480,10 600,40 720,20 C840,8 960,35 1080,18 C1200,5 1320,30 1440,15 L1440,100 Z"
                  fill="#F5A623"
                  opacity="0.9"
                  className="splash-wave-layer-1"
                />
                <path
                  d="M0,100 L0,55 C160,35 320,65 480,48 C640,30 800,60 960,42 C1120,28 1280,55 1440,40 L1440,100 Z"
                  fill="#FBBF24"
                  opacity="0.95"
                  className="splash-wave-layer-2"
                />
                <path
                  d="M0,100 L0,75 C180,55 360,85 540,65 C720,50 900,80 1080,62 C1260,48 1380,75 1440,60 L1440,100 Z"
                  fill="#FAF8F5"
                  className="splash-wave-layer-3"
                />
              </svg>
            </div>
          </div>
        </div>
        <section className="approach-levels-section">
          <div className="approach-levels-container">
            
            {/* Left Column: Heading & Description */}
            <div className="approach-levels-copy">
              <h2>
                Our approach is modeled around bringing change <span className="cry-hand-gold">at all levels</span> across Maharashtra.
              </h2>
              <div className="cry-yellow-line" style={{ margin: "16px 0 20px" }} />
              <p>
                With your support, we address children&apos;s critical needs in Maharashtra by working with parents, teachers, Anganwadi workers, Gram Panchayats, district administrations, and the children themselves.
              </p>
              <p className="mt-4">
                We believe that lasting transformation only occurs when all stakeholder spheres surrounding a child are mobilized, accountable, and empowered to protect child rights.
              </p>
            </div>

            {/* Right Column: Interactive Multi-Sphere Orbit Diagram */}
            <div className="approach-orbit-wrapper">
              
              {/* Level 1: Family */}
              <div className="orbit-card orbit-family">
                <div className="orbit-icon-circle">👨‍👩‍👧</div>
                <div className="orbit-info">
                  <h4>Family &amp; Parents</h4>
                  <p>Parental counseling against child labor, ensuring school attendance, and improving maternal nutrition.</p>
                </div>
              </div>

              {/* Level 2: Community */}
              <div className="orbit-card orbit-community">
                <div className="orbit-icon-circle">🏡</div>
                <div className="orbit-info">
                  <h4>Community &amp; Gram Panchayat</h4>
                  <p>Mobilizing village vigilance committees, Mahila Mandals, and youth volunteers to safeguard child welfare.</p>
                </div>
              </div>

              {/* Level 3: Government Systems */}
              <div className="orbit-card orbit-govt">
                <div className="orbit-icon-circle">🏛️</div>
                <div className="orbit-info">
                  <h4>Government &amp; Zilla Parishad</h4>
                  <p>Strengthening public schools, ensuring midday meals, and facilitating government scheme access across Maharashtra.</p>
                </div>
              </div>

              {/* Level 4: Children (Center Hub) */}
              <div className="orbit-card orbit-children">
                <div className="orbit-icon-circle gold-center">🧒</div>
                <div className="orbit-info">
                  <h4>Children (At The Center)</h4>
                  <p>Forming Bal Panchayats and children&apos;s activity clubs so kids can speak up and claim their rights with confidence.</p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 5. 4 Strategic Pillars in Maharashtra */}
        <section className="approach-pillars-section">
          <div className="approach-pillars-container">
            <div className="text-center mb-12">
              <span className="mini-title">OUR 4-STAGE INTERVENTION IN MAHARASHTRA</span>
              <h2 style={{ fontSize: "clamp(26px, 3.2vw, 38px)", fontWeight: 800, color: "#1E293B" }}>
                How We Create <span className="cry-hand-gold">Irreversible Change</span>
              </h2>
            </div>

            <div className="approach-pillars-grid">
              
              <div className="approach-p-card">
                <div className="p-card-num">01</div>
                <div className="p-card-icon">🍎</div>
                <h3>Immediate Relief &amp; Nutrition</h3>
                <p>
                  Conducting regular health checkups and supplying fortified nutritional snack kits to malnourished children in rural Maharashtra to prevent stunting.
                </p>
                <div className="p-card-tag">Health &amp; Survival</div>
              </div>

              <div className="approach-p-card">
                <div className="p-card-num">02</div>
                <div className="p-card-icon">🎒</div>
                <h3>Education Kits &amp; Retention</h3>
                <p>
                  Providing school bags, Marathi workbooks, stationery, and Joy Kits to ensure zero school dropouts across Zilla Parishad primary schools.
                </p>
                <div className="p-card-tag">Education &amp; Development</div>
              </div>

              <div className="approach-p-card">
                <div className="p-card-num">03</div>
                <div className="p-card-icon">🛡️</div>
                <h3>Child Protection &amp; Advocacy</h3>
                <p>
                  Educating communities against child marriage, child labor in seasonal harvesting, and creating safe, child-friendly spaces in every village.
                </p>
                <div className="p-card-tag">Protection &amp; Safety</div>
              </div>

              <div className="approach-p-card">
                <div className="p-card-num">04</div>
                <div className="p-card-icon">📜</div>
                <h3>Government Scheme Linkages</h3>
                <p>
                  Enabling rural families to avail government welfare schemes including Bal Sangopan Yojana, Sanjay Gandhi Niradhar Yojana, and RTE free quotas.
                </p>
                <div className="p-card-tag">Systemic Empowerment</div>
              </div>

            </div>
          </div>
        </section>

        {/* 6. Call to Action */}
        <section className="cry-wc-help-section text-center">
          <h2 className="cry-wc-help-title">
            Help Us Transform More Lives in <span className="cry-hand-gold">Maharashtra</span>
          </h2>
          <p className="cry-wc-help-sub">
            Your support directly enables education, nutrition, and child rights protection across villages and towns in Maharashtra.
          </p>
          <div className="cta-btn-group" style={{ justifyContent: "center", marginTop: "28px" }}>
            <a href="/donate" className="cry-yellow-pill-btn">♥ Donate To Empower Maharashtra&apos;s Children</a>
            <a href="/volunteer" className="cry-outline-btn">Join As Volunteer</a>
          </div>
        </section>

        {/* 7. Trust Badges Row */}
        <section className="cry-wc-trust-badges-section">
          <div className="cry-wc-trust-grid">
            <div className="cry-wc-trust-item">
              <div className="cry-wc-trust-icon">💛</div>
              <p>All our efforts in Maharashtra are powered by generous donors and volunteers</p>
            </div>
            <div className="cry-wc-trust-item">
              <div className="cry-wc-trust-icon">📋</div>
              <p>Your donations are 100% tax exempted under Section 80G of the Income Tax Act</p>
            </div>
            <div className="cry-wc-trust-item">
              <div className="cry-wc-trust-icon">🔒</div>
              <p>100% Secure donation process with instant 80G tax receipt generation</p>
            </div>
          </div>
        </section>

      </div>

      <Footer />
      <FloatingActions />
    </main>
  );
}
