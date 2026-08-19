import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export const metadata = {
  title: "About Us | Our Vision & Mission · Kautike Charitable Foundation",
  description: "Discover Kautike Charitable Foundation's vision, mission, story, core values, and grassroots team working for child rights and environmental care across India.",
};

const presidentData = {
  name: "Nilesh Kute",
  role: "President & Founder",
  image: "/images/team/nilesh-kute.png",
  location: "Maharashtra, India",
  bio: "Leading Kautike Charitable Foundation with a relentless commitment to child welfare, education retention in rural schools, and community-driven social transformation.",
  quote: "“Every child deserves the dignity of education, nutritious food, and an environment that fosters hope and dreams.”",
};

const volunteerList = [
  { name: "Ashish Mishra", role: "Volunteer", image: "/images/team/ashish-mishra.png", location: "Panvel, Raigad" },
  { name: "Abhinay Singh", role: "Volunteer", image: "/images/team/abhinay-singh-hd.png", location: "Mumbai & Raigad" },
  { name: "Yogesh Shinde", role: "Volunteer", image: "/images/team/yogesh-shinde.png", location: "Maharashtra" },
  { name: "Dnyaneshwar Jadhav", role: "Volunteer", image: "/images/team/dnyaneshwar-jadhav.png", location: "Panvel, Raigad" },
  { name: "Jayshree Sutar", role: "Volunteer", image: "/images/team/jayshree-sutar.png", location: "Maharashtra" },
  { name: "Santosh Jadhav", role: "Volunteer", image: "/images/team/santosh-jadhav.png", location: "Panvel, Raigad" },
  { name: "Vijay Jadhav", role: "Volunteer", image: "/images/team/vijay-jadhav.png", location: "Mahodar, Panvel" },
  { name: "Satish Jadhav", role: "Volunteer", image: "/images/team/satish-jadhav.png", location: "Panvel, Raigad" },
  { name: "Deepak Thorat", role: "Volunteer", image: "/images/team/deepak-thorat.png", location: "Kondap, Panvel" },
];

export default function AboutPage() {
  return (
    <main className="page-fade-in bg-cream" id="top" style={{ backgroundColor: "#FAF8F5" }}>
      <Header />

      {/* 1. CRY-STYLE VISION SECTION */}
      <section className="cry-vision-section">
        <div className="cry-vision-content text-center">
          <span className="subpage-badge">WHO WE ARE</span>
          <h1 className="cry-wc-main-title">Our <span className="cry-hand-gold">Vision</span></h1>
          <div className="cry-wc-yellow-bar" />
          <p className="cry-vision-text">
            Kautike Charitable Foundation is dedicated to empowering communities through education, healthcare, and social welfare. From supporting underprivileged students with school supplies and scholarships to promoting community development and environmental sustainability, we are committed to building a more compassionate and equitable society.
          </p>
          <p className="cry-vision-text" style={{ marginTop: "10px" }}>
            Together, we can nurture minds, strengthen communities, and create a greener tomorrow. Through our education programs and community welfare initiatives, every effort reflects our belief that education, health, and social support form the foundation of lasting change.
          </p>
        </div>

        <div className="cry-vision-banner-wrap">
          {/* Top Fluid Organic Watercolor Wave */}
          <div className="cry-vision-top-wave">
            <svg className="cry-wave-svg" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M0,0 L1440,0 L1440,40 C1300,75 1160,20 1020,55 C880,90 740,30 600,65 C460,95 320,35 180,60 C100,75 40,30 0,45 Z"
                fill="#FAF8F5"
              />
            </svg>
          </div>

          <img 
            src="/images/about-vision-user-photo.jpg" 
            alt="Kautike Foundation Vision - Indian School Girls Sharing Midday Snack" 
            className="cry-vision-img"
          />

          {/* Bottom Golden Watercolor Wave */}
          <div className="cry-vision-bottom-wave">
            <svg className="cry-wave-svg" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M0,45 C150,95 320,15 480,65 C640,115 800,20 960,70 C1120,110 1280,35 1440,60 L1440,120 L0,120 Z"
                fill="#FAF8F5"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE MISSION PILLARS */}
      <section className="cry-mission-paint-section">
        <div className="cry-mission-paint-inner">
          <div className="text-center mb-10">
            <span className="mini-title">OUR THREE PILLARS</span>
            <h2 className="cry-mission-title">
              What Drives Our <span className="cry-hand-gold">Mission</span>
            </h2>
            <div className="cry-yellow-line" style={{ margin: "14px auto 24px" }} />
          </div>

          <div className="cry-3cards-grid">
            
            {/* Card 1: Taking Responsibility */}
            <div className="cry-3card-item">
              <div className="cry-3card-art art-responsibility">
                <svg viewBox="0 0 160 160" fill="none" className="cry-card-svg">
                  <circle cx="80" cy="80" r="60" fill="#FEF3C7" />
                  <ellipse cx="80" cy="130" rx="46" ry="8" fill="#E2E8F0" opacity="0.6" />
                  <path d="M78 68 C100 68 125 80 135 110 C120 105 100 115 82 92 Z" fill="#E11D48" />
                  <path d="M68 66 L92 66 L98 108 L62 108 Z" fill="#2563EB" />
                  <polygon points="68,66 92,66 80,82" fill="#1D4ED8" />
                  <circle cx="80" cy="46" r="14" fill="#FBBF24" />
                  <path d="M66 42 C68 28 92 28 94 42 C90 34 70 34 66 42 Z" fill="#1E293B" />
                  <path d="M68 72 L54 84 L64 96" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M92 72 L106 84 L96 96" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="72" y1="108" x2="72" y2="134" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
                  <line x1="88" y1="108" x2="88" y2="134" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="cry-3card-name">Taking Responsibility</h3>
              <p className="cry-3card-desc">
                To empower individuals and communities to take active ownership and responsibility for the situation of underprivileged Indian children.
              </p>
            </div>

            {/* Card 2: Mobilising Potential */}
            <div className="cry-3card-item">
              <div className="cry-3card-art art-potential">
                <svg viewBox="0 0 160 160" fill="none" className="cry-card-svg">
                  <circle cx="80" cy="80" r="60" fill="#FFFDF0" />
                  <ellipse cx="80" cy="130" rx="50" ry="10" fill="#E2E8F0" opacity="0.6" />
                  <circle cx="58" cy="52" r="10" fill="#FBBF24" />
                  <path d="M52 48 C54 38 68 38 70 48 Z" fill="#1E293B" />
                  <path d="M50 64 L68 64 L72 94 L48 94 Z" fill="#7C3AED" />
                  <path d="M50 68 L36 50" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />
                  <path d="M68 68 L80 58" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />
                  <line x1="54" y1="94" x2="48" y2="124" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
                  <line x1="66" y1="94" x2="72" y2="120" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="106" cy="56" r="10" fill="#FBBF24" />
                  <path d="M98 52 C100 42 114 42 118 52 Z" fill="#1E293B" />
                  <path d="M96 70 C88 95 86 115 124 115 C130 95 120 70 106 70 Z" fill="#F59E0B" />
                  <circle cx="100" cy="90" r="2" fill="#ffffff" />
                  <circle cx="112" cy="86" r="2" fill="#ffffff" />
                  <circle cx="106" cy="102" r="2.5" fill="#ffffff" />
                  <path d="M98 72 L86 54" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />
                  <path d="M116 72 L128 58" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />
                  <line x1="102" y1="115" x2="100" y2="132" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
                  <line x1="114" y1="115" x2="116" y2="132" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="cry-3card-name">Mobilising Potential</h3>
              <p className="cry-3card-desc">
                To motivate and mobilize individuals to act, both independently and collectively, to help children reach their full human potential.
              </p>
            </div>

            {/* Card 3: Inspiring Collective Action */}
            <div className="cry-3card-item">
              <div className="cry-3card-art art-collective">
                <svg viewBox="0 0 160 160" fill="none" className="cry-card-svg">
                  <circle cx="80" cy="80" r="60" fill="#FFF8E7" />
                  <ellipse cx="80" cy="132" rx="50" ry="10" fill="#E2E8F0" opacity="0.6" />
                  <circle cx="54" cy="62" r="8" fill="#FBBF24" />
                  <path d="M46 72 L62 72 L64 104 L44 104 Z" fill="#0EA5E9" />
                  <line x1="50" y1="104" x2="48" y2="128" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
                  <line x1="58" y1="104" x2="60" y2="128" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="106" cy="62" r="8" fill="#FBBF24" />
                  <path d="M98 72 L114 72 L116 104 L96 104 Z" fill="#10B981" />
                  <line x1="102" y1="104" x2="100" y2="128" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
                  <line x1="110" y1="104" x2="112" y2="128" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="80" cy="48" r="12" fill="#FBBF24" />
                  <path d="M68 44 C70 30 92 30 94 44 C90 36 72 36 68 44 Z" fill="#1E293B" />
                  <path d="M68 64 L92 64 L96 106 L64 106 Z" fill="#E11D48" />
                  <path d="M66 74 C75 88 85 88 94 74" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" fill="none" />
                  <line x1="72" y1="106" x2="72" y2="132" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
                  <line x1="88" y1="106" x2="88" y2="132" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="cry-3card-name">Inspiring Collective Action</h3>
              <p className="cry-3card-desc">
                To inspire diverse groups to work together across communities and institutions in protecting, honouring, and defending child rights across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR STORY SECTION */}
      <section className="section-pad bg-cream" id="our-story" style={{ backgroundColor: "#FAF8F5" }}>
        <div className="about-container">
          <div className="story-split-grid">
            <div className="story-split-copy">
              <span className="mini-title">THE KAUTIKE STORY</span>
              <h2 className="section-heading">How We <span className="yellow-hand">Began</span></h2>
              <p className="story-lead">
                Kautike Charitable Foundation was born from a simple yet unwavering belief: that real change begins when citizens step forward to take ownership of children&apos;s rights in their communities.
              </p>
              <p>
                Starting from grassroots interventions in Mumbai and surrounding rural districts in Maharashtra, our team of dedicated volunteers came together to support children who were dropping out of school to support daily-wage families.
              </p>
              <p>
                Today, Kautike Charitable Foundation works with Anganwadis, government schools, local Panchayats, and youth collectives to create sustainable, community-owned models of child welfare and environmental resilience.
              </p>
            </div>

            <div className="story-split-card">
              <div className="story-highlight-box">
                <span className="highlight-tag">OUR CORE BELIEF</span>
                <h3>&quot;हर मदत एक नई उम्मीद&quot;</h3>
                <p>
                  Every rupee, every planted sapling, and every hour of volunteer time builds an irreversible foundation of hope, health, and dignity for children across India.
                </p>
                <div className="highlight-badge-pill">
                  🛡️ 100% Transparent · 80G Tax Exempt
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXACT CRY-STYLE LEADERSHIP & PEOPLE SECTION */}
      <section className="section-pad cry-people-section" id="team" style={{ backgroundColor: "#FAF8F5" }}>
        <div className="about-container">
          
          {/* Header */}
          <div className="text-center mb-12">
            <span className="subpage-badge">OUR PEOPLE &amp; CHANGEMAKERS</span>
            <h2 className="cry-wc-main-title">
              The Dedicated Hearts <span className="cry-hand-gold">Behind The Mission</span>
            </h2>
            <div className="cry-wc-yellow-bar" />
            <p className="cry-wc-lead-text">
              Meet the visionary founder and passionate grassroots volunteers driving child rights, educational drives, and nutrition support across Maharashtra.
            </p>
          </div>

          {/* CRY-Style President Hero Showcase */}
          <div className="cry-pres-hero-card mb-16">
            <div className="cry-pres-grid">
              
              <div className="cry-pres-avatar-col">
                <div className="cry-pres-avatar-frame">
                  <img
                    src={presidentData.image}
                    alt={presidentData.name}
                    className="cry-pres-avatar-img"
                  />
                  <div className="cry-pres-star-badge">
                    ⭐ FOUNDER &amp; PRESIDENT
                  </div>
                </div>
              </div>

              <div className="cry-pres-info-col">
                <div className="cry-pres-role-pill">LEADERSHIP &amp; GOVERNANCE</div>
                <h3 className="cry-pres-title">{presidentData.name}</h3>
                <span className="cry-pres-loc">📍 {presidentData.location}</span>
                
                <p className="cry-pres-bio-p">{presidentData.bio}</p>

                <div className="cry-pres-quote-box">
                  <span className="cry-quote-mark">“</span>
                  <p>{presidentData.quote.replace(/[“”]/g, "")}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Volunteers Section Divider */}
          <div className="cry-vol-section-head text-center mb-10">
            <span className="mini-title">GRASSROOTS CHANGEMAKERS</span>
            <h3 className="cry-vol-main-title">
              Our Active <span className="cry-hand-gold">Volunteers</span>
            </h3>
            <p className="cry-vol-lead">
              The on-ground force leading school kit distributions, remedial classes, and nutrition outreach.
            </p>
          </div>

          {/* 3x3 Symmetrical CRY-Style Volunteer Cards */}
          <div className="cry-team-cards-grid">
            {volunteerList.map((vol) => (
              <div key={vol.name} className="cry-team-card-item">
                <div className="cry-team-card-top-bar" />
                
                <div className="cry-team-avatar-wrapper">
                  <div className="cry-team-avatar-ring">
                    <img
                      src={vol.image}
                      alt={vol.name}
                      className="cry-team-avatar-img"
                      loading="lazy"
                    />
                  </div>
                  <span className="cry-team-vol-pill">VOLUNTEER</span>
                </div>

                <div className="cry-team-card-body">
                  <h4 className="cry-team-member-name">{vol.name}</h4>
                  <span className="cry-team-loc-tag">📍 {vol.location}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. OFFICIAL REGISTERED OFFICE & MOTTO */}
      <section className="section-pad bg-cream" style={{ backgroundColor: "#FAF8F5" }}>
        <div className="about-container">
          <div className="office-official-card">
            <div className="office-card-inner">
              <div className="office-motto">
                <h3>हर मदत एक नई उम्मीद</h3>
                <p>Every small help is a new beginning of hope for a child.</p>
              </div>

              <div className="office-details-grid">
                <div className="office-info-block">
                  <span className="o-icon">📍</span>
                  <div>
                    <strong>Head Office Address</strong>
                    <p>Office No. A-1, D&apos;Souza Sadan, Lokmanya Tilak Nagar, 90 Feet Road, Sakinaka, Mumbai - 400 072</p>
                  </div>
                </div>

                <div className="office-info-block">
                  <span className="o-icon">✉️</span>
                  <div>
                    <strong>Email Contact</strong>
                    <p>kautikecharitable@gmail.com</p>
                  </div>
                </div>

                <div className="office-info-block">
                  <span className="o-icon">📞</span>
                  <div>
                    <strong>Helpline &amp; Contact</strong>
                    <p>+91 810 836 2688</p>
                  </div>
                </div>

                <div className="office-info-block">
                  <span className="o-icon">🛡️</span>
                  <div>
                    <strong>Official Registration</strong>
                    <p>Registered Non-Profit Charitable Organization · 80G &amp; 12A Certified · NITI Aayog Darpan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="cry-cta-banner">
        <div className="cry-cta-inner">
          <h2>Be the reason a child stays in school today</h2>
          <p>
            Join hundreds of compassionate changemakers ensuring no child in Maharashtra is forced out of school into labour.
          </p>
          <div className="cta-btn-group">
            <a href="/donate" className="cry-yellow-btn">♥ Donate Online (80G Tax Exempt)</a>
            <a href="/volunteer" className="cry-outline-btn">Join Us as a Volunteer</a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
