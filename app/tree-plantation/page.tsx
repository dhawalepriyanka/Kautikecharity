import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export const metadata = {
  title: "Tree Plantation Drives | Kautike Charitable Foundation",
  description: "Kautike plants native trees across Maharashtra, greening school campuses and building community micro-forests for a sustainable future.",
};

export default function TreePlantationPage() {
  return (
    <main className="page-fade-in" id="top">
      <Header />

      <section className="prog-hero" style={{ background: "linear-gradient(135deg, #14532D 0%, #052E16 100%)" }}>
        <div className="prog-hero-inner">
          <span className="subpage-badge">WHAT WE DO</span>
          <h1>Tree Plantation &amp; <span className="yellow-hand">Green India</span></h1>
          <p>Connecting child welfare to climate action by planting native trees, greening school campuses, and replenishing groundwater across Maharashtra villages.</p>
          <div className="prog-hero-stats">
            <div className="prog-hero-stat"><strong>50,000+</strong><span>Trees Planted</span></div>
            <div className="prog-hero-stat"><strong>85%+</strong><span>Survival Rate</span></div>
            <div className="prog-hero-stat"><strong>300+</strong><span>Schools Greened</span></div>
          </div>
        </div>
        <div className="prog-hero-wave">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,20 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#FAF8F5" />
          </svg>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="about-container">
          <div className="text-center mb-8">
            <span className="mini-title">OUR APPROACH</span>
            <h2 className="section-heading">How We <span className="yellow-hand">Green India</span></h2>
          </div>
          <div className="prog-pillars-grid">
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">🌳</div>
              <h3>Native Species Afforestation</h3>
              <p>Planting fruit-bearing and oxygenating native trees including Neem, Peepal, Banyan, Jamun, and Moringa selected for local soil and climate conditions.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">🏫</div>
              <h3>Eco-Clubs in Rural Schools</h3>
              <p>Teaching students hands-on organic sapling cultivation, compost making, and water conservation through school eco-clubs that run year-round.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">🌾</div>
              <h3>Community Green Corridors</h3>
              <p>Collaborating with farmers and Gram Panchayats to develop protected community micro-forests on government and common land.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">💧</div>
              <h3>Groundwater Recharge</h3>
              <p>Strategically planting trees near water bodies and degraded land to recharge groundwater tables and prevent soil erosion in water-stressed regions.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">📍</div>
              <h3>GPS Tree Tracking</h3>
              <p>Each planted tree is GPS-tagged and photographed quarterly, giving donors transparent updates on the survival and growth of their sponsored saplings.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">👨‍🌾</div>
              <h3>Farmer Partnerships</h3>
              <p>Partnering with local farmers to integrate fruit-bearing trees on agricultural land, boosting biodiversity while supplementing family incomes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="about-container">
          <div className="prog-story-split">
            <div className="prog-story-img" style={{ backgroundImage: "url(/images/plantation-campaign.jpg)" }}></div>
            <div className="prog-story-copy">
              <span className="mini-title">FIELD STORY</span>
              <h2 className="section-heading">Children Who <span className="yellow-hand">Own Their Forest</span></h2>
              <p>In Amravati, 200 children planted trees together last monsoon season. They water them every morning before class. They named each tree and call the school campus their forest. Three years later, the same school has become the greenest in the district.</p>
              <a href="/stories" className="cry-yellow-btn">Read More Stories</a>
            </div>
          </div>
        </div>
      </section>

      <section className="cry-cta-banner">
        <div className="cry-cta-inner">
          <h2>Plant a tree, change a climate</h2>
          <p>Just 150 rupees plants and nurtures one native tree with GPS tracking for 3 years.</p>
          <div className="cta-btn-group">
            <a href="/donate" className="cry-yellow-btn">Plant A Tree</a>
            <a href="/impact" className="cry-outline-btn">See Our Impact</a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
