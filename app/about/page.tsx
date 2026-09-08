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
  { id: "v0", name: "Nilesh Kute", role: "Volunteer", image: "/images/team/nilesh-kute.png", location: "Maharashtra, India", phone: "+91 810 836 2688" },
  { id: "v1", name: "Ashish Mishra", role: "Volunteer", image: "/images/team/ashish-mishra.png", location: "Panvel, Raigad", phone: "+91 98201 12345" },
  { id: "v2", name: "Abhinay Singh", role: "Volunteer", image: "/images/team/abhinay-singh-hd.png", location: "Mumbai & Raigad", phone: "+91 98202 23456" },
  { id: "v4", name: "Dnyaneshwar Jadhav", role: "Volunteer", image: "/images/team/dnyaneshwar-jadhav.png", location: "Panvel, Raigad", phone: "+91 98204 45678" },
  { id: "v5", name: "Jayshree Sutar", role: "Volunteer", image: "/images/team/jayshree-sutar.png", location: "Maharashtra", phone: "+91 98205 56789" },
  { id: "v6", name: "Santosh Jadhav", role: "Volunteer", image: "/images/team/santosh-jadhav.png", location: "Panvel, Raigad", phone: "+91 98206 67890" },
  { id: "v7", name: "Vijay Jadhav", role: "Volunteer", image: "/images/team/vijay-jadhav.png", location: "Mahodar, Panvel", phone: "+91 98207 78901" },
  { id: "v8", name: "Satish Jadhav", role: "Volunteer", image: "/images/team/satish-jadhav.png", location: "Panvel, Raigad", phone: "+91 98208 89012" },
  { id: "v9", name: "Deepak Thorat", role: "Volunteer", image: "/images/team/deepak-thorat.png", location: "Kondap, Panvel", phone: "+91 98209 90123" },
  { id: "v10", name: "Suman Yadav", role: "Volunteer", image: "/images/team/suman-yadav.png", location: "Maharashtra, India", phone: "+91 98210 01234" },
  { id: "v11", name: "Ankit Dubey", role: "Volunteer", image: "/images/team/ankit-dubey.png", location: "Mumbai, Maharashtra", phone: "+91 98211 12345" },
  { id: "v12", name: "Brijesh Pandey", role: "Volunteer", image: "/images/team/brijesh-pandey.png", location: "Maharashtra, India", phone: "+91 98212 23456" },
  { id: "v13", name: "Akash Mishra", role: "Volunteer", image: "/images/team/akash-mishra.png", location: "Maharashtra, India", phone: "+91 98213 34567" },
  { id: "v14", name: "Vinayak Jadhav", role: "Volunteer", image: "/images/team/vinayak-jadhav.png", location: "Maharashtra, India", phone: "+91 98214 45678" },
  { id: "v15", name: "Vicky Jadhav", role: "Volunteer", image: "/images/team/vicky-jadhav.png", location: "Maharashtra, India", phone: "+91 98215 56789" },
  { id: "v16", name: "Abhishek Singh", role: "Volunteer", image: "/images/team/abhishek-singh.png", location: "Maharashtra, India", phone: "+91 98216 67890" },
];

function mergeVolunteersList(savedList: any[]) {
  if (!Array.isArray(savedList) || savedList.length === 0) return defaultVolunteers;
  const map = new Map();
  defaultVolunteers.forEach((v) => {
    if (v.name.toLowerCase().includes("yogesh")) return;
    map.set(v.name.toLowerCase().trim(), v);
  });
  savedList.forEach((v) => {
    if (v && v.name) {
      const key = v.name.toLowerCase().trim();
      if (key.includes("yogesh")) return;
      const existing = map.get(key);
      map.set(key, { ...(existing || {}), ...v, id: v.id || existing?.id });
    }
  });
  return Array.from(map.values()).filter((v: any) => !v?.name?.toLowerCase().includes("yogesh"));
}

export default function AboutPage() {
  const [volunteers, setVolunteers] = useState(defaultVolunteers);
  const [president, setPresident] = useState(defaultPresidentData);
  const [contactInfo, setContactInfo] = useState({
    email: "info@kautikefoundation.org",
    phone: "+91 810 836 2688",
    address: "Office No. A-1, D'Souza Sadan, Lokmanya Tilak Nagar, 90 Feet Road, Sakinaka, Mumbai - 400 072",
  });

  const loadVolunteersData = () => {
    try {
      const savedVols = localStorage.getItem("kautike_admin_volunteers");
      if (savedVols) {
        const parsed = JSON.parse(savedVols);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setVolunteers(mergeVolunteersList(parsed));
        }
      }
    } catch (_) {}
  };

  useEffect(() => {
    loadVolunteersData();

    // Listen for storage events in case admin updates volunteers in another tab
    window.addEventListener("storage", loadVolunteersData);

    try {
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
        const cleanAddress = (addr?: string) => {
          if (!addr || addr.includes("Panvel") || addr.includes("Shanti Heights")) {
            return "Office No. A-1, D'Souza Sadan, Lokmanya Tilak Nagar, 90 Feet Road, Sakinaka, Mumbai - 400 072";
          }
          return addr;
        };

        if (p.email || p.phone || p.address) {
          setContactInfo({
            email: p.email || "info@kautikefoundation.org",
            phone: p.phone || "+91 810 836 2688",
            address: cleanAddress(p.address),
          });
        }
      }

      // 2. Fetch from backend API
      fetch("http://localhost:4000/api/volunteers")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const merged = mergeVolunteersList(data);
            setVolunteers(merged);
            localStorage.setItem("kautike_admin_volunteers", JSON.stringify(merged));
          }
        })
        .catch(() => {});

      fetch("http://localhost:4000/api/settings")
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            const cleanAddr = (!data.address || data.address.includes("Panvel") || data.address.includes("Shanti Heights"))
              ? "Office No. A-1, D'Souza Sadan, Lokmanya Tilak Nagar, 90 Feet Road, Sakinaka, Mumbai - 400 072"
              : data.address;
            setContactInfo({
              email: data.email || "info@kautikefoundation.org",
              phone: data.phone || "+91 810 836 2688",
              address: cleanAddr,
            });
          }
        })
        .catch(() => {});
    } catch (_) {}

    return () => {
      window.removeEventListener("storage", loadVolunteersData);
    };
  }, []);

  return (
    <main className="page-fade-in bg-cream" id="top" style={{ backgroundColor: "#FAF8F5" }} suppressHydrationWarning>
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
            <div className="cry-3card-item">
              <div className="cry-3card-art" style={{ marginBottom: 24 }}>
                <img
                  src="/images/education-drive-real.jpg"
                  alt="Opportunity & Potential"
                  style={{
                    width: 144,
                    height: 144,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid #F5A623",
                    boxShadow: "0 10px 24px rgba(245, 166, 35, 0.25)",
                  }}
                />
              </div>
              <h3 className="cry-3card-name">Opportunity &amp; Potential</h3>
              <p className="cry-3card-desc">
                To enable individuals and communities to discover and develop their potential for taking action to restore children&apos;s fundamental rights.
              </p>
            </div>

            <div className="cry-3card-item">
              <div className="cry-3card-art" style={{ marginBottom: 24 }}>
                <img
                  src="/images/approach-maharashtra-child.jpg"
                  alt="Children at the Centre"
                  style={{
                    width: 144,
                    height: 144,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid #F5A623",
                    boxShadow: "0 10px 24px rgba(245, 166, 35, 0.25)",
                  }}
                />
              </div>
              <h3 className="cry-3card-name">Children at the Centre</h3>
              <p className="cry-3card-desc">
                To restore to children their rights to education, health, nutrition, and dignity through community participation and systemic advocacy.
              </p>
            </div>

            <div className="cry-3card-item">
              <div className="cry-3card-art" style={{ marginBottom: 24 }}>
                <img
                  src="/images/environment-plants-real.jpg"
                  alt="Inspiring Collective Action"
                  style={{
                    width: 144,
                    height: 144,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid #F5A623",
                    boxShadow: "0 10px 24px rgba(245, 166, 35, 0.25)",
                  }}
                />
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
            {volunteers.map((vol: any, idx) => (
              <div key={vol.id || vol.name + idx} className="cry-team-card-item">
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
                  <span className="cry-team-vol-pill" suppressHydrationWarning>VOLUNTEER</span>
                </div>

                <div className="cry-team-card-body" style={{ padding: "10px 14px 16px", textAlign: "center" }}>
                  <h4 className="cry-team-member-name" style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#0F172A" }}>
                    {vol.name}
                  </h4>
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
