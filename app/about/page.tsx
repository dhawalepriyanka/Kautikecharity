"use client";

import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

const defaultPresidentData = {
  name: "Nilesh Kute",
  role: "President & Founder",
  image: "/images/team/nilesh-kute.png",
  location: "Maharashtra, India",
  bio: "Leading Kautike Charitable Foundation with a relentless commitment to child welfare, education retention in rural schools, and community-driven social transformation.",
  quote: "“Every child deserves the dignity of education, nutritious food, and an environment that fosters hope and dreams.”",
};

const defaultVolunteers = [
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
  const [volunteers, setVolunteers] = useState(defaultVolunteers);
  const [president, setPresident] = useState(defaultPresidentData);
  const [contactInfo, setContactInfo] = useState({
    email: "kc.chfoundation2025@gmail.com",
    phone: "+91 810 836 2688",
    address: "Office No. A-1, D'Souza Sadan, Lokmanya Tilak Nagar, 90 Feet Road, Sakinaka, Mumbai - 400 072",
  });

  useEffect(() => {
    try {
      // 1. Load from localStorage for instantaneous updates in same browser
      const savedVols = localStorage.getItem("kautike_admin_volunteers");
      if (savedVols) {
        const parsed = JSON.parse(savedVols);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setVolunteers(parsed);
        }
      }

      const savedPersonal = localStorage.getItem("kautike_admin_personal");
      if (savedPersonal) {
        const p = JSON.parse(savedPersonal);
        if (p.presidentName) {
          setPresident({
            name: p.presidentName,
            role: p.presidentRole || "President & Founder",
            image: p.presidentImage || "/images/team/nilesh-kute.png",
            location: p.presidentLocation || "Maharashtra, India",
            bio: p.presidentBio || defaultPresidentData.bio,
            quote: p.presidentQuote || defaultPresidentData.quote,
          });
        }
        if (p.email || p.phone) {
          setContactInfo({
            email: p.email || "kc.chfoundation2025@gmail.com",
            phone: p.phone || "+91 810 836 2688",
            address: p.address || contactInfo.address,
          });
        }
      }

      // 2. Fetch from backend API
      fetch("http://localhost:4000/api/volunteers")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setVolunteers(data);
          }
        })
        .catch(() => {});

      fetch("http://localhost:4000/api/settings")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.presidentName) {
            setPresident({
              name: data.presidentName,
              role: data.presidentRole || "President & Founder",
              image: data.presidentImage || "/images/team/nilesh-kute.png",
              location: data.presidentLocation || "Maharashtra, India",
              bio: data.presidentBio || defaultPresidentData.bio,
              quote: data.presidentQuote || defaultPresidentData.quote,
            });
            if (data.email || data.phone) {
              setContactInfo({
                email: data.email || "kc.chfoundation2025@gmail.com",
                phone: data.phone || "+91 810 836 2688",
                address: data.address || contactInfo.address,
              });
            }
          }
        })
        .catch(() => {});
    } catch (_) {}
  }, []);

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
            <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%", display: "block" }}>
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

      {/* 2. CRY-STYLE 3-PILLAR GOALS */}
      <section className="section-pad bg-cream" style={{ backgroundColor: "#FAF8F5" }}>
        <div className="about-container">
          <div className="text-center mb-12">
            <span className="subpage-badge">OUR CORE PILLARS</span>
            <h2 className="cry-wc-main-title">
              What Guides <span className="cry-hand-gold">Our Mission</span>
            </h2>
            <div className="cry-wc-yellow-bar" />
          </div>

          <div className="cry-3cards-grid">
            <div className="cry-3card">
              <div className="cry-3card-art-wrap">
                <svg className="cry-3card-svg" viewBox="0 0 160 140" fill="none" aria-hidden="true">
                  <circle cx="80" cy="70" r="56" fill="#FFF8E7" />
                  <circle cx="80" cy="50" r="22" fill="#FBBF24" />
                  <path d="M60 92 C60 76 100 76 100 92 Z" fill="#F97316" />
                  <path d="M50 108 C50 88 110 88 110 108 Z" fill="#0EA5E9" />
                  <line x1="80" y1="92" x2="80" y2="124" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
                  <line x1="68" y1="124" x2="92" y2="124" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="cry-3card-name">Opportunity &amp; Potential</h3>
              <p className="cry-3card-desc">
                To enable individuals and communities to discover and develop their potential for taking action to restore children&apos;s fundamental rights.
              </p>
            </div>

            <div className="cry-3card">
              <div className="cry-3card-art-wrap">
                <svg className="cry-3card-svg" viewBox="0 0 160 140" fill="none" aria-hidden="true">
                  <circle cx="80" cy="70" r="56" fill="#F0FDF4" />
                  <circle cx="80" cy="46" r="18" fill="#FBBF24" />
                  <path d="M64 80 C64 68 96 68 96 80 Z" fill="#10B981" />
                  <path d="M40 76 Q60 50 80 72 Q100 50 120 76 Q80 126 40 76 Z" fill="#EC4899" opacity="0.8" />
                  <circle cx="80" cy="80" r="14" fill="#FBBF24" />
                </svg>
              </div>
              <h3 className="cry-3card-name">Children at the Centre</h3>
              <p className="cry-3card-desc">
                To restore to children their rights to education, health, nutrition, and dignity through community participation and systemic advocacy.
              </p>
            </div>

            <div className="cry-3card">
              <div className="cry-3card-art-wrap">
                <svg className="cry-3card-svg" viewBox="0 0 160 140" fill="none" aria-hidden="true">
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
                    src={president.image}
                    alt={president.name}
                    className="cry-pres-avatar-img"
                  />
                  <div className="cry-pres-star-badge">
                    ⭐ FOUNDER &amp; PRESIDENT
                  </div>
                </div>
              </div>

              <div className="cry-pres-info-col">
                <div className="cry-pres-role-pill">LEADERSHIP &amp; GOVERNANCE</div>
                <h3 className="cry-pres-title">{president.name}</h3>
                <span className="cry-pres-loc">📍 {president.location}</span>
                
                <p className="cry-pres-bio-p">{president.bio}</p>

                <div className="cry-pres-quote-box">
                  <span className="cry-quote-mark">“</span>
                  <p>{president.quote.replace(/[“”]/g, "")}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Volunteers Section Divider */}
          <div className="cry-vol-section-head text-center mb-10">
            <span className="mini-title">GRASSROOTS CHANGEMAKERS</span>
            <h3 className="cry-vol-main-title">
              Our Active <span className="cry-hand-gold">Volunteers</span> ({volunteers.length})
            </h3>
            <p className="cry-vol-lead">
              The on-ground force leading school kit distributions, remedial classes, and nutrition outreach.
            </p>
          </div>

          {/* Dynamic Responsive CRY-Style Volunteer Cards */}
          <div className="cry-team-cards-grid">
            {volunteers.map((vol, idx) => (
              <div key={(vol as any).id || vol.name + idx} className="cry-team-card-item">
                <div className="cry-team-card-top-bar" />
                
                <div className="cry-team-avatar-wrapper">
                  <div className="cry-team-avatar-ring">
                    {vol.image ? (
                      <img
                        src={vol.image}
                        alt={vol.name}
                        className="cry-team-avatar-img"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "#f1f5f9",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 32,
                        }}
                      >
                        👤
                      </div>
                    )}
                  </div>
                  <span className="cry-team-vol-pill">{vol.role ? vol.role.toUpperCase() : "VOLUNTEER"}</span>
                </div>

                <div className="cry-team-card-body">
                  <h4 className="cry-team-member-name">{vol.name}</h4>
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
                    <p>{contactInfo.address}</p>
                  </div>
                </div>

                <div className="office-info-block">
                  <span className="o-icon">✉️</span>
                  <div>
                    <strong>Email Contact</strong>
                    <p>{contactInfo.email}</p>
                  </div>
                </div>

                <div className="office-info-block">
                  <span className="o-icon">📞</span>
                  <div>
                    <strong>Helpline &amp; Contact</strong>
                    <p>{contactInfo.phone}</p>
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
