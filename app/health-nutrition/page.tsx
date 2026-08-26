import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export const metadata = {
  title: "Health & Nutrition | Kautike Charitable Foundation",
  description: "Kautike combats malnutrition and preventable diseases through nutrition supplementation, health camps, and maternal care across Maharashtra.",
};

export default function HealthNutritionPage() {
  return (
    <main className="page-fade-in" id="top">
      <Header />

      <section className="simple-page-header">
        <span className="mini-title">WHAT WE DO</span>
        <h1>Child Health &amp; <span className="yellow-hand">Nutrition</span></h1>
        <p>Combating malnutrition and preventable childhood diseases through timely, community-based intervention across Maharashtra.</p>
      </section>

      {/* CRY-style intro section */}
      <section className="health-intro-section">
        <div className="health-intro-text">
          <h2 className="health-intro-heading">Transforming Child Health and<br />Nutrition in Maharashtra</h2>
          <div className="health-intro-divider"></div>
          <p className="health-intro-desc">
            As a leading child health and nutrition organisation in Maharashtra, Kautike believes in every child's right to survival.
            We understand the critical role that proper nutrition and quality primary healthcare play in a child's overall development.
            Therefore we strive to ensure that no child, regardless of their socio-economic background, suffers from <span className="health-intro-highlight">malnutrition</span> or <span className="health-intro-highlight">poor health</span>.
          </p>
        </div>
        <div className="health-intro-photo-wrap">
          <img src="/images/children-nutrition.jpg" alt="Health worker examining a child" className="health-intro-photo" />
        </div>
      </section>

      {/* Health Impact Stats Band — unique to this page */}
      <section className="health-stats-band">
        <div className="health-stats-band-inner">
          <div className="health-stat-item">
            <span className="health-stat-icon">🏥</span>
            <strong>34,000+</strong>
            <span>Infants Treated</span>
          </div>
          <div className="health-stat-divider"></div>
          <div className="health-stat-item">
            <span className="health-stat-icon">⛺</span>
            <strong>480+</strong>
            <span>Health Camps Run</span>
          </div>
          <div className="health-stat-divider"></div>
          <div className="health-stat-item">
            <span className="health-stat-icon">🏫</span>
            <strong>100+</strong>
            <span>Anganwadis Supported</span>
          </div>
          <div className="health-stat-divider"></div>
          <div className="health-stat-item">
            <span className="health-stat-icon">👩‍⚕️</span>
            <strong>7+</strong>
            <span>Years of Impact</span>
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="about-container">
          <div className="text-center mb-8">
            <span className="mini-title">OUR APPROACH</span>
            <h2 className="section-heading">How We <span className="yellow-hand">Fight Malnutrition</span></h2>
          </div>
          <div className="prog-pillars-grid">
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">&#x1F957;</div>
              <h3>Nutrition Supplementation</h3>
              <p>Providing protein-rich micronutrient porridge and fresh meals for underweight infants and children under 5 suffering from severe acute malnutrition.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">&#x1F3E5;</div>
              <h3>Anganwadi Capacity Building</h3>
              <p>Equipping frontline Anganwadi workers with modern growth-monitoring tools, digital records, and early diagnosis protocols for faster intervention.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">&#x1F469;&#x200D;&#x2695;&#xFE0F;</div>
              <h3>Maternal Health Camps</h3>
              <p>Educating pregnant and lactating mothers on prenatal nutrition, safe breastfeeding practices, and basic hygiene to protect both mother and child.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">&#x1F4CA;</div>
              <h3>Weight Recovery Tracking</h3>
              <p>Monthly weight monitoring of treated children with follow-up home visits to ensure sustained recovery and prevent relapse into malnutrition.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">&#x1F48A;</div>
              <h3>Iron &amp; Vitamin Drives</h3>
              <p>Distributing iron-folic acid tablets, Vitamin A supplements and deworming medication to combat anaemia and preventable diseases in schools.</p>
            </div>
            <div className="prog-pillar-card">
              <div className="prog-pillar-icon">&#x1F91D;</div>
              <h3>Community Awareness</h3>
              <p>Training village SHG women groups to identify early signs of malnutrition and refer children to our health camps before conditions worsen.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="about-container">
          <div className="prog-story-split">
            <div
              className="prog-story-img"
              style={{
                backgroundImage: "url(/images/health-nutrition-story.jpg)",
                backgroundPosition: "center 25%",
              }}
            ></div>
            <div className="prog-story-copy">
              <span className="mini-title">FIELD STORY</span>
              <h2 className="section-heading">Back to a <span className="yellow-hand">Healthy Weight</span></h2>
              <p>Priya was 2 years old and severely underweight when our field worker found her in Nashik district. After 3 months on our nutrition program, she recovered fully. Her mother now volunteers at our health camps.</p>
              <a href="/stories" className="cry-yellow-btn">Read More Stories</a>
            </div>
          </div>
        </div>
      </section>

      <section className="edu-cta-redesign">
        <div className="edu-cta-left">
          <div className="edu-cta-badge">MAKE A DIFFERENCE</div>
          <h2 className="edu-cta-heading">
            Help a child recover<br />
            <span className="edu-cta-accent">from malnutrition.</span>
          </h2>
          <p className="edu-cta-sub">
            Rs 300 funds one child complete nutrition recovery program for a full month.
          </p>
          <div className="edu-cta-actions">
            <a href="/donate" className="edu-cta-primary-btn">Fund A Nutrition Kit</a>
            <a href="/impact" className="edu-cta-ghost-btn">See Our Impact</a>
          </div>
          <div className="edu-cta-trust">
            <span>&#x1F512; 80G Tax Exempt</span>
            <span>&#x2713; Transparent Reporting</span>
            <span>&#x2764;&#xFE0F; 34,000+ Children Treated</span>
          </div>
        </div>
        <div className="edu-cta-right">
          <div className="edu-cta-card">
            <div className="edu-cta-stat-big">Rs 300<span>/month</span></div>
            <p>funds one child full nutrition recovery</p>
            <div className="edu-cta-mini-stats">
              <div><strong>34K+</strong><span>Infants</span></div>
              <div><strong>480+</strong><span>Camps</span></div>
              <div><strong>100+</strong><span>Anganwadis</span></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
