import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export const metadata = {
  title: "Social Welfare & Child Protection | Kautike Charitable Foundation",
  description: "Kautike rescues children from labour, prevents child marriage, and builds safe communities through child protection committees across Maharashtra.",
};

export default function SocialWelfarePage() {
  return (
    <main className="page-fade-in" id="top">
      <Header />

      <section className="prog-hero" style={{ background: "linear-gradient(135deg, #7C2D12 0%, #431407 100%)" }}>
        <div className="prog-hero-inner">
          <span className="subpage-badge">WHAT WE DO</span>
          <h1>Social Welfare &amp; <span className="yellow-hand">Child Protection</span></h1>
          <p>Creating safe, abuse-free community environments where children can play, learn, and grow fearlessly — free from labour exploitation and early marriage.</p>
          <div className="prog-hero-stats">
            <div className="prog-hero-stat"><strong>12,000+</strong><span>Children Rescued</span></div>
            <div className="prog-hero-stat"><strong>45,000+</strong><span>Girls Empowered</span></div>
            <div className="prog-hero-stat"><strong>200+</strong><span>Protection Committees</span></div>
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
            <h2 className="section-heading">How We <span className="yellow-hand">Protect Children</span></h2>
          </div>
          <div className="prog-pillars-grid">
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">🚸</div>
              <h3>Rescue &amp; Rehabilitation</h3>
              <p>Intervening directly with Child Welfare Committees and law enforcement to rescue minors from hazardous labour and safely re-enroll them in school.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">🌸</div>
              <h3>Preventing Child Marriage</h3>
              <p>Empowering adolescent girls with secondary education scholarships, legal awareness workshops, and community-level awareness campaigns.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">🛡️</div>
              <h3>Child Protection Committees</h3>
              <p>Training local youth collectives and village leaders to monitor child rights violations, report abuse, and create vigilant communities.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">⚖️</div>
              <h3>Legal Aid &amp; Awareness</h3>
              <p>Providing free legal counseling and documentation support to families of exploited children, helping them understand and exercise their rights.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">👧</div>
              <h3>Girls Leadership Programs</h3>
              <p>Running adolescent girl clubs that build self-confidence, negotiation skills, and career aspirations among teenage girls in rural Maharashtra.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">🏘️</div>
              <h3>Bal Panchayats</h3>
              <p>Establishing children governance bodies in villages where children elect their own representatives and advocate for their rights to the Gram Panchayat.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="about-container">
          <div className="prog-story-split">
            <div className="prog-story-img" style={{ backgroundImage: "url(/images/child-labour-campaign.jpg)" }}></div>
            <div className="prog-story-copy">
              <span className="mini-title">FIELD STORY</span>
              <h2 className="section-heading">From Brick Kiln to <span className="yellow-hand">Classroom</span></h2>
              <p>Suresh, 9, was working 12-hour days at a brick kiln in Amravati when our team intervened. After rescue and counseling, he was enrolled in school. Today he is in Class 6 and wants to be a police officer to protect children like himself.</p>
              <a href="/stories" className="cry-yellow-btn">Read More Stories</a>
            </div>
          </div>
        </div>
      </section>

      <section className="cry-cta-banner">
        <div className="cry-cta-inner">
          <h2>Protect a child right to a safe childhood</h2>
          <p>Your donation funds rescue operations, rehabilitation, and protection committees.</p>
          <div className="cta-btn-group">
            <a href="/donate" className="cry-yellow-btn">Protect Vulnerable Children</a>
            <a href="/impact" className="cry-outline-btn">See Our Impact</a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
