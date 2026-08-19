import { CampaignSlider } from "./components/CampaignSlider";
import { DonationWidget } from "./components/DonationWidget";
import { HeroMedia } from "./components/HeroMedia";
import { ImpactStats } from "./components/ImpactStats";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FloatingActions } from "./components/FloatingActions";
import { PageMotion } from "./components/PageMotion";
import { StoryCarousel } from "./components/StoryCarousel";

const causes = [
  {
    tag: "Environment & Plants",
    title: "Tree Plantation & Plant Conservation Drives",
    text: "Planting saplings, restoring urban green cover, nurturing local flora, and involving school children in environmental care.",
    photo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80",
    href: "/what-we-do#plantation",
  },
  {
    tag: "Child Education",
    title: "Ensure Every Child Goes to School",
    text: "Providing school kits, academic support centers, and teacher training to keep children in classrooms.",
    photo: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80",
    href: "/what-we-do#education",
  },
  {
    tag: "Health & Nutrition",
    title: "Combat Malnutrition & Support Healthcare",
    text: "Increasing access to essential medical care, growth monitoring, and nutritious meals for infants and mothers.",
    photo: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80",
    href: "/what-we-do#health",
  },
  {
    tag: "Safety & Protection",
    title: "Protect Children from Labour & Abuse",
    text: "Mobilizing local protection committees, preventing child marriages, and safeguarding vulnerable youth.",
    photo: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80",
    href: "/what-we-do#protection",
  },
];

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

          <a href="#donate" className="cry-yellow-btn">
            ♥ Yes! I Want To Help!
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



      {/* 4. HOW DO YOU WANT TO HELP CHILDREN TODAY (EXACT CRY.ORG HORIZONTAL PHOTO CAMPAIGN CAROUSEL) */}
      <CampaignSlider />

      {/* 4b. WHAT WE DO FULL-BLEED YELLOW PAINT BRUSH WAVE SECTION (PLACED AFTER CARDS) */}
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
                <div className="wwd-svg-illus">
                  <svg viewBox="0 0 140 100" fill="none">
                    <rect x="25" y="40" width="42" height="50" rx="4" fill="#9C27B0" opacity="0.15" />
                    <rect x="73" y="40" width="42" height="50" rx="4" fill="#9C27B0" opacity="0.15" />
                    <path d="M 15 50 Q 70 70 125 50 L 120 85 Q 70 98 20 85 Z" fill="#6A1B9A" />
                    <path d="M 20 48 Q 70 65 120 48" stroke="#FFD54F" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="45" cy="25" r="14" fill="#FFB74D" />
                    <circle cx="95" cy="25" r="14" fill="#FF8A65" />
                  </svg>
                </div>
                <h3 className="wwd-card-title">Education</h3>
                <div className="wwd-indicator bar-pink" />
              </div>
              <div className="wwd-card-back">
                <h3 className="wwd-card-title">Education</h3>
                <p className="wwd-card-text">Providing school kits, academic support centers, and learning materials for every child.</p>
                <a href="#donate" className="wwd-btn btn-pink">Know More</a>
              </div>
              <div className="wwd-bar bar-pink" />
            </div>

            {/* Card 2: Health & Nutrition */}
            <div className="wwd-card card-cyan">
              <div className="wwd-card-front">
                <div className="wwd-svg-illus">
                  <svg viewBox="0 0 140 100" fill="none">
                    <circle cx="70" cy="30" r="15" fill="#4DB6AC" />
                    <path d="M 58 26 Q 70 14 82 26" fill="#004D40" />
                    <path d="M 30 75 Q 70 95 110 75 L 105 60 Q 70 70 35 60 Z" fill="#00BCD4" />
                    <circle cx="50" cy="55" r="8" fill="#81C784" />
                    <circle cx="70" cy="50" r="10" fill="#E57373" />
                  </svg>
                </div>
                <h3 className="wwd-card-title">Health & Nutrition</h3>
                <div className="wwd-indicator bar-cyan" />
              </div>
              <div className="wwd-card-back">
                <h3 className="wwd-card-title">Health & Nutrition</h3>
                <p className="wwd-card-text">Increasing access to proper nutrition, growth monitoring, and quality healthcare.</p>
                <a href="#donate" className="wwd-btn btn-cyan">Know More</a>
              </div>
              <div className="wwd-bar bar-cyan" />
            </div>

            {/* Card 3: Safety & Protection */}
            <div className="wwd-card card-purple">
              <div className="wwd-card-front">
                <div className="wwd-svg-illus">
                  <svg viewBox="0 0 140 100" fill="none">
                    <path d="M 30 45 C 30 15 110 15 110 45 Z" fill="#E91E63" />
                    <path d="M 70 45 L 70 85 C 70 90 60 90 60 85" stroke="#37474F" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="70" cy="60" r="12" fill="#FFB74D" />
                  </svg>
                </div>
                <h3 className="wwd-card-title">Safety & Protection</h3>
                <div className="wwd-indicator bar-purple" />
              </div>
              <div className="wwd-card-back">
                <h3 className="wwd-card-title">Safety & Protection</h3>
                <p className="wwd-card-text">Preventing child labor, supporting child rights, and protecting vulnerable youth.</p>
                <a href="#donate" className="wwd-btn btn-purple">Know More</a>
              </div>
              <div className="wwd-bar bar-purple" />
            </div>

            {/* Card 4: Environment & Plants */}
            <div className="wwd-card card-orange">
              <div className="wwd-card-front">
                <div className="wwd-svg-illus">
                  <svg viewBox="0 0 140 100" fill="none">
                    <circle cx="70" cy="78" r="18" fill="#8D6E63" opacity="0.3" />
                    <path d="M 70 75 L 70 45" stroke="#4CAF50" strokeWidth="5" strokeLinecap="round" />
                    <path d="M 70 55 C 50 35 40 50 70 55 Z" fill="#66BB6A" />
                    <path d="M 70 48 C 90 28 100 43 70 48 Z" fill="#43A047" />
                  </svg>
                </div>
                <h3 className="wwd-card-title">Environment & Plants</h3>
                <div className="wwd-indicator bar-orange" />
              </div>
              <div className="wwd-card-back">
                <h3 className="wwd-card-title">Environment & Plants</h3>
                <p className="wwd-card-text">Planting saplings, restoring urban green cover, and promoting environmental care.</p>
                <a href="#donate" className="wwd-btn btn-orange">Know More</a>
              </div>
              <div className="wwd-bar bar-orange" />
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
              We focus on changing behaviours and practices at the grassroots level and influencing public policy at a systemic level – thereby creating an ecosystem where children are made the nation&apos;s priority.
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
                    backgroundImage: `url(/images/children-orbital.jpg)`
                  }}
                />
                <span className="cry-center-label">Children</span>
              </div>

              {/* Orbital Nodes with CRY.org Tooltip Popups */}
              {/* 1. Family (Top Left) */}
              <div className="cry-orbit-node node-family">
                <div className="node-icon-circle">
                  <svg viewBox="0 0 40 40" fill="none">
                    <path d="M20 10 C22 10 24 12 24 14 C24 16 22 18 20 18 C18 18 16 16 16 14 C16 12 18 10 20 10 Z" fill="#E67E22" />
                    <path d="M14 26 C14 21 26 21 26 26 L26 30 L14 30 Z" fill="#F5A623" />
                  </svg>
                </div>
                <span className="node-label">Family</span>
                <div className="node-tooltip tooltip-left">
                  Building awareness among parents &amp; guardians to change attitudes towards child education, health, and gender equality.
                </div>
              </div>

              {/* 2. Community (Top Right) */}
              <div className="cry-orbit-node node-community">
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
              </div>

              {/* 3. Government (Bottom Right - Default Visible Matching CRY.org) */}
              <div className="cry-orbit-node node-government active-tooltip-node">
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
                <div className="node-tooltip tooltip-left visible-card">
                  Partnering with district, state and national level governments to strengthen policy and advocacy systems for children
                </div>
              </div>

              {/* 4. Public (Bottom Left) */}
              <div className="cry-orbit-node node-public">
                <div className="node-icon-circle">
                  <svg viewBox="0 0 40 40" fill="none">
                    <circle cx="16" cy="14" r="4" fill="#F5A623" />
                    <circle cx="24" cy="14" r="4" fill="#E67E22" />
                    <path d="M10 28 C10 23 20 23 20 28" stroke="#F5A623" strokeWidth="3" />
                    <path d="M20 28 C20 23 30 23 30 28" stroke="#E67E22" strokeWidth="3" />
                  </svg>
                </div>
                <span className="node-label">Public</span>
                <div className="node-tooltip tooltip-left">
                  Sensitizing public society, youth, and volunteers to champion child rights and environmental care.
                </div>
              </div>
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
        <div className="cry-quote-mark">“</div>
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

      {/* 9. DONATION PANEL */}
      <section className="donate-section-wrap" id="donate">
        <div className="donate-panel">
          <div className="donate-copy">
            <span className="mini-title">Take Part Today</span>
            <h2>
              Help create a future full of <em>possibility.</em>
            </h2>
            <p>
              Your support funds school supplies, nutritious meals, child protection initiatives, and emergency relief for families in need.
            </p>

            <ul>
              <li>
                <span className="check-icon">✓</span>
                100% transparent utilization & progress updates
              </li>
              <li>
                <span className="check-icon">✓</span>
                Eligible for 80G Tax Exemption receipts
              </li>
              <li>
                <span className="check-icon">✓</span>
                Secure online donation via card, UPI, or Net Banking
              </li>
              <li>
                <span className="check-icon">✓</span>
                Monthly updates on the children & causes you support
              </li>
            </ul>
          </div>

          <DonationWidget />
        </div>
      </section>

      {/* 10. CRY.ORG PREMIUM TRUST BADGES BAR */}
      <section className="cry-wc-trust-badges-section">
        <div className="cry-trust-bar">
          <div className="cry-trust-item">
            <div className="cry-trust-badge-icon yellow-heart">💛</div>
            <div className="cry-trust-text">
              <h4 className="cry-trust-card-title">100% Impact Driven</h4>
              <p className="cry-trust-card-desc">All our efforts are made possible only because of your support</p>
            </div>
          </div>
          <div className="cry-trust-item">
            <div className="cry-trust-badge-icon yellow-doc">📋</div>
            <div className="cry-trust-text">
              <h4 className="cry-trust-card-title">80G Tax Exemption</h4>
              <p className="cry-trust-card-desc">Your donations are tax exempted under 80G of the Indian Income Tax Act</p>
            </div>
          </div>
          <div className="cry-trust-item">
            <div className="cry-trust-badge-icon yellow-lock">🔒</div>
            <div className="cry-trust-text">
              <h4 className="cry-trust-card-title">100% Safe &amp; Secure</h4>
              <p className="cry-trust-card-desc">Your donation transactions are completely safe, encrypted and secure</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. CRY.ORG SEO & FAQ INFORMATION SECTION */}
      <section className="cry-seo-faq-section">
        <div className="cry-seo-container">
          <h2>Ensure Happy Childhoods For India's Children With Kautike Charitable Foundation NGO</h2>
          <p>
            Started with a vision for children in India, Kautike Charitable Foundation is a top NGO for children in India. We work for every child's right to a happy, healthy childhood. Our mission is to ensure happier childhoods for every child in India by protecting and upholding their rights. As a leading child rights NGO in India, we are focused on creating lasting change. Together, we can build a future where every child thrives. Help us make a difference today.
          </p>

          <h3>Our Focus Areas</h3>
          <p>
            As one of the best NGOs for children in India, Kautike Charitable Foundation works relentlessly to ensure that every child enjoys their right to education, health, safety, protection, and participation. Our key areas of focus include improving access to quality education and healthcare, preventing child labour, stopping child marriages, empowering girls, and creating a safer and brighter future for all children.
          </p>

          <h3>Child Education</h3>
          <p>
            As a leading NGO for child education, we're committed to ensuring education for underprivileged children. Our programs ensure every child has access to quality education to help them break the cycle of poverty. As an NGO working for child education, we focus on creating safe learning environments so children can attend school and complete their education without facing discrimination based on gender, caste, or socio-economic status. Join us in empowering India's future through education.
          </p>

          <h3>Support Girl Child Education</h3>
          <p>
            As a leading NGO advocating for the rights of girl children, we encourage equal educational opportunities regardless of gender. Our programmes focus on breaking barriers preventing girls from attending school, such as cultural biases and economic constraints. We connect girls and their families to social benefits, and government schemes and conduct community awareness campaigns to ensure girls learn, grow, and succeed in life.
          </p>

          <h3>Stop Child Marriage</h3>
          <p>
            We work tirelessly to protect children from child marriage. Our initiatives aim to end the practice of child marriage through community education, legal advocacy, and support for at-risk girls. We empower young women to continue their education and make informed decisions about their future. We aim to create a world where every girl gets opportunities to reach her full potential.
          </p>

          <h3>Prevent Child Trafficking</h3>
          <p>
            We are dedicated to combating child trafficking in India. Our efforts focus on connecting rescue victims to the government mechanism, restoration and rehabilitation of the trafficked victims through counseling support for children. As a leading child rights NGO, we are committed to creating a safer environment where children are protected from exploitation. Join us in our fight against this heinous crime.
          </p>

          <h3>Environment & Tree Plantation Drives</h3>
          <p>
            At Kautike Charitable Foundation, we believe every child deserves a clean, green, and healthy environment to thrive in. Our tree plantation initiatives engage local communities, school children, and volunteers to plant native saplings, restore urban green cover, and instill environmental stewardship from an early age for a sustainable future.
          </p>

          <div className="cry-faq-wrap">
            <h2>FAQs</h2>
            
            <div className="cry-faq-item">
              <h4>What is the Mission of Kautike Charitable Foundation?</h4>
              <p>
                Kautike Charitable Foundation was born of a dream to ensure happier childhoods for all children. Our mission is to empower people to take responsibility for underprivileged Indian children. We aim to motivate individuals to act, both independently and collectively, to help children reach their full potential. Kautike Charitable Foundation focuses on mobilizing people's potential for change and inspiring diverse groups to work together in protecting and honouring children's rights across India.
              </p>
            </div>

            <div className="cry-faq-item">
              <h4>What are the main areas of focus for Kautike Charitable Foundation?</h4>
              <p>
                Kautike Charitable Foundation focuses on key areas: <strong>Education</strong> - ensuring children attend and complete school; <strong>Health & Nutrition</strong> - improving access to adequate nutrition and healthcare; <strong>Safety & Protection</strong> - addressing child labour and trafficking; <strong>Environment & Plants</strong> - tree plantation and green restoration; and <strong>Child Participation</strong> - ensuring children's voices are heard.
              </p>
            </div>

            <div className="cry-faq-item">
              <h4>How does Kautike Charitable Foundation contribute to environmental conservation & tree plantation?</h4>
              <p>
                We organize community and school tree plantation drives across underserved urban and rural regions. By involving children and families in planting native saplings and caring for young trees, we foster environmental responsibility and create healthier, greener spaces for future generations.
              </p>
            </div>

            <div className="cry-faq-item">
              <h4>How can I donate to Kautike Charitable Foundation?</h4>
              <p>
                You can donate online securely through UPI, Credit/Debit Cards, Net Banking, or direct bank transfer on our official website. All eligible donations receive 80G tax exemption certificates under the Indian Income Tax Act.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
