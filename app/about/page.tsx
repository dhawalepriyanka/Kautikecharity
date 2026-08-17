import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export const metadata = {
  title: "About Us | Our Vision & Mission · Kautike Charitable Foundation",
  description: "Discover Kautike Charitable Foundation's vision, mission, story, core values, and grassroots team working for child rights and environmental care across India.",
};

// Sheet 1: 3 columns × 3 rows
// Sheet 2: 3 cols × 2 rows
const teamMembers = [
  // Sheet 1
  { name: "NILESH KUTE",         role: "Core Organizer / Volunteer", id: "#001", phone: "+91 83560 08675", sheet: 1, bgX: "0%",   bgY: "0%"   },
  { name: "VIJAY JADHAV",        role: "Volunteer",                  id: "#002", phone: "+91 98206 23005", sheet: 1, bgX: "50%",  bgY: "0%"   },
  { name: "ABHINAY SINGH",       role: "Volunteer",                  id: "#003", phone: "+91 91202 83508", sheet: 1, bgX: "100%", bgY: "0%"   },
  { name: "ASHISH MISHRA",       role: "Volunteer",                  id: "#004", phone: "+91 76665 49586", sheet: 1, bgX: "0%",   bgY: "50%"  },
  { name: "SANTOSH JADHAV",      role: "Volunteer",                  id: "#005", phone: "+91 93247 73738", sheet: 1, bgX: "50%",  bgY: "50%"  },
  { name: "DNYANESHWAR J.",      role: "Volunteer",                  id: "#006", phone: "+91 93223 58458", sheet: 1, bgX: "100%", bgY: "50%"  },
  { name: "YOGESH SHINDE",       role: "Volunteer",                  id: "#007", phone: "+91 98709 15575", sheet: 1, bgX: "0%",   bgY: "100%" },
  { name: "SATISH JADHAV",       role: "Volunteer",                  id: "#008", phone: "+91 80828 08258", sheet: 1, bgX: "50%",  bgY: "100%" },
  { name: "DEEPAK THORAT",       role: "Volunteer",                  id: "#009", phone: "+91 98700 44491", sheet: 1, bgX: "100%", bgY: "100%" },
  // Sheet 2
  { name: "VINAYAK JADHAV",      role: "Volunteer",                  id: "#010", phone: "+91 77386 82535", sheet: 2, bgX: "0%",   bgY: "0%"   },
  { name: "VICKY JADHAV",        role: "Volunteer",                  id: "#011", phone: "+91 75886 31471", sheet: 2, bgX: "50%",  bgY: "0%"   },
  { name: "ADV. ANAND KUMAR M.", role: "Legal Advisor & Volunteer",  id: "#012", phone: "+91 90048 36678", sheet: 2, bgX: "100%", bgY: "0%"   },
  { name: "ABHISHEK SINGH",      role: "Volunteer",                  id: "#013", phone: "+91 90820 57164", sheet: 2, bgX: "0%",   bgY: "100%" },
  { name: "AKASH MISHRA",        role: "Volunteer",                  id: "#014", phone: "+91 83692 50096", sheet: 2, bgX: "50%",  bgY: "100%" },
];

export default function AboutPage() {
  return (
    <main className="page-fade-in" id="top">
      <Header />

      {/* 1. CRY-STYLE VISION SECTION (MATCHING EXACT SCREENSHOT) */}
      <section className="cry-vision-section">
        <div className="cry-vision-content text-center">
          <h2 className="cry-clean-title">Our Vision</h2>
          <div className="cry-yellow-line" />
          <p className="cry-vision-text">
            Kautike Charitable Foundation is dedicated to empowering communities through education, healthcare, and social welfare. From supporting underprivileged students with school supplies and scholarships to promoting community development and environmental sustainability, we are committed to building a more compassionate and equitable society.
          </p>
          <p className="cry-vision-text" style={{marginTop: "18px"}}>
            Together, we can nurture minds, strengthen communities, and create a greener tomorrow. Through our education programs and community welfare initiatives, every effort reflects our belief that education, health, and social support form the foundation of lasting change.
          </p>
        </div>

        <div className="cry-vision-banner-wrap">
          {/* Top Sharp Criss-Cross Zigzag Cutout */}
          <div className="cry-vision-top-wave">
            <svg className="cry-wave-svg" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M0,0 L1440,0 L1440,0 L1200,55 L960,10 L720,60 L480,8 L240,58 L0,5 Z"
                fill="#FAF8F5"
              />
            </svg>
          </div>

          <img 
            src="/images/about-vision-user-photo.jpg"
            alt="School children in uniform receiving nutrition snack boxes"
            className="cry-vision-img"
          />

          {/* Bottom Sharp Criss-Cross Yellow Zigzag */}
          <div className="cry-paint-splatter-wave">
            <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{position:'absolute',bottom:0,left:0,width:'100%',height:'100%',display:'block'}}>
              <path
                d="M0,90 L0,55 L240,10 L480,62 L720,8 L960,60 L1200,12 L1440,55 L1440,90 Z"
                fill="#F5A623"
              />
              <path
                d="M0,90 L0,68 L240,28 L480,75 L720,25 L960,75 L1200,30 L1440,68 L1440,90 Z"
                fill="#FFC107"
                opacity="0.6"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* 2. CRY.ORG EXACT OUR MISSION SECTION WITH 3 WHITE CARDS & WATERCOLOR SPLATTERS */}
      <section className="cry-mission-paint-section">
        {/* Background Watercolor Splatter Accents */}
        <div className="splatter-accent-left" aria-hidden="true" />
        <div className="splatter-accent-right" aria-hidden="true" />

        <div className="cry-mission-paint-inner text-center">
          <h2 className="cry-mission-title">Our Mission</h2>

          <div className="cry-3cards-grid">
            {/* Card 1: Taking Responsibility */}
            <div className="cry-3card-item">
              <div className="cry-3card-art art-hero">
                <svg viewBox="0 0 160 160" fill="none" className="cry-card-svg">
                  {/* Background Soft Glow */}
                  <circle cx="80" cy="80" r="60" fill="#FFF9E6" />
                  <ellipse cx="80" cy="130" rx="45" ry="10" fill="#E2E8F0" opacity="0.6" />
                  
                  {/* Cape */}
                  <path d="M78 68 C100 68 125 80 135 110 C120 105 100 115 82 92 Z" fill="#E11D48" />
                  
                  {/* Body & Shirt */}
                  <path d="M68 66 L92 66 L98 108 L62 108 Z" fill="#2563EB" />
                  <polygon points="68,66 92,66 80,82" fill="#1D4ED8" />
                  
                  {/* Head & Hair */}
                  <circle cx="80" cy="46" r="14" fill="#FBBF24" />
                  <path d="M66 42 C68 28 92 28 94 42 C90 34 70 34 66 42 Z" fill="#1E293B" />
                  
                  {/* Hands on Hips */}
                  <path d="M68 72 L54 84 L64 96" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M92 72 L106 84 L96 96" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Legs */}
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
                  {/* Background Soft Glow */}
                  <circle cx="80" cy="80" r="60" fill="#FFFDF0" />
                  <ellipse cx="80" cy="130" rx="50" ry="10" fill="#E2E8F0" opacity="0.6" />
                  
                  {/* Left Jumping Figure */}
                  <circle cx="58" cy="52" r="10" fill="#FBBF24" />
                  <path d="M52 48 C54 38 68 38 70 48 Z" fill="#1E293B" />
                  <path d="M50 64 L68 64 L72 94 L48 94 Z" fill="#7C3AED" />
                  <path d="M50 68 L36 50" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />
                  <path d="M68 68 L80 58" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />
                  <line x1="54" y1="94" x2="48" y2="124" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
                  <line x1="66" y1="94" x2="72" y2="120" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />

                  {/* Right Dancing Figure with Yellow Dress */}
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
                  {/* Background Soft Glow */}
                  <circle cx="80" cy="80" r="60" fill="#FFF8E7" />
                  <ellipse cx="80" cy="132" rx="50" ry="10" fill="#E2E8F0" opacity="0.6" />
                  
                  {/* Left Companion */}
                  <circle cx="54" cy="62" r="8" fill="#FBBF24" />
                  <path d="M46 72 L62 72 L64 104 L44 104 Z" fill="#0EA5E9" />
                  <line x1="50" y1="104" x2="48" y2="128" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
                  <line x1="58" y1="104" x2="60" y2="128" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />

                  {/* Right Companion */}
                  <circle cx="106" cy="62" r="8" fill="#FBBF24" />
                  <path d="M98 72 L114 72 L116 104 L96 104 Z" fill="#10B981" />
                  <line x1="102" y1="104" x2="100" y2="128" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
                  <line x1="110" y1="104" x2="112" y2="128" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />

                  {/* Center Leader Figure with Arms Crossed */}
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
      <section className="section-pad bg-white" id="our-story">
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



      {/* 4. OUR DEDICATED TEAM & VOLUNTEERS */}
      <section className="section-pad bg-cream" id="team">
        <div className="about-container">
          <div className="text-center mb-8">
            <span className="mini-title">OUR PEOPLE</span>
            <h2 className="section-heading">Meet Our <span className="yellow-hand">Dedicated Team</span> &amp; Volunteers</h2>
            <p className="section-lead centered">
              Meet the passionate ground leaders, organizers, and verified volunteers who make our daily mission possible across Maharashtra.
            </p>
          </div>

          <div className="team-cards-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-id-card-v2">
                <div
                  className="team-id-card-img"
                  style={{
                    backgroundImage: `url(/images/team-sheet-${member.sheet}.jpg)`,
                    backgroundPosition: `${member.bgX} ${member.bgY}`,
                    backgroundSize: member.sheet === 1 ? "300% 300%" : "300% 200%",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Official Registered Office & Motto Card */}
          <div className="office-official-card mt-8">
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
                  <span className="o-icon">📞</span>
                  <div>
                    <strong>Official Helplines</strong>
                    <p><a href="tel:+918356008675">+91 83560 08675</a> / <a href="tel:+918108362688">+91 81083 62688</a></p>
                  </div>
                </div>

                <div className="office-info-block">
                  <span className="o-icon">✉️</span>
                  <div>
                    <strong>Official Email Addresses</strong>
                    <p><a href="mailto:kc.foundation2025@gmail.com">kc.foundation2025@gmail.com</a> / <a href="mailto:kautikecharitable@gmail.com">kautikecharitable@gmail.com</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="cry-cta-banner">
        <div className="cry-cta-inner">
          <h2>Be a part of our journey</h2>
          <p>Your contribution directly sponsors children&apos;s education, nutrition kits, and tree plantation drives across India.</p>
          <div className="cta-btn-group">
            <a href="/donate" className="cry-yellow-btn">♥ Donate Now (80G Tax Exempt)</a>
            <a href="/volunteer" className="cry-outline-btn">Join As A Volunteer</a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
