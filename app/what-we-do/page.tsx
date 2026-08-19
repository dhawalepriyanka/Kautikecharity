import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export const metadata = {
  title: "What We Do | Focus Areas · Kautike Charitable Foundation",
  description: "Explore our programmatic interventions in child education, malnutrition eradication, child rights protection, girl child empowerment, and tree plantation drives across India.",
};

export default function WhatWeDoPage() {
  return (
    <main className="page-fade-in" id="top">
      <Header />

      {/* Subpage Hero */}
      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <span className="subpage-badge">WHAT WE DO</span>
          <h1>Holistic <span className="yellow-hand">interventions</span> for children &amp; the environment</h1>
          <p>
            From remedial classrooms and nutritious meal programs to safeguarding girl children and greening degraded lands, our multifaceted initiatives address the root drivers of systemic inequality.
          </p>
        </div>
      </section>

      {/* Focus Area 1: Education */}
      <section className="section-pad bg-white" id="education">
        <div className="focus-detail-grid">
          <div className="focus-detail-copy">
            <span className="focus-label">PILLAR 01</span>
            <h2>Child Education &amp; Foundational Literacy</h2>
            <p className="focus-lead">
              Ensuring every child from marginalized backgrounds accesses quality, joyful, and continuous schooling.
            </p>
            <ul className="focus-bullets">
              <li><strong>Remedial Learning Centres:</strong> After-school support bridging learning gaps in mathematics, reading, and digital literacy.</li>
              <li><strong>School Enrolment Drives:</strong> Door-to-door counseling convincing migrant and daily-wage families to enroll out-of-school children.</li>
              <li><strong>Smart Kits &amp; Libraries:</strong> Equipping rural schools with age-appropriate STEM kits, textbooks, and interactive storybooks.</li>
            </ul>
            <div className="focus-stats-mini">
              <div><strong>15.5 Lakh+</strong><span>Children Supported</span></div>
              <div><strong>1,200+</strong><span>Classrooms Upgraded</span></div>
            </div>
            <a href="/donate" className="cry-yellow-btn">Sponsor A Child&apos;s Schooling</a>
          </div>
          <div className="focus-detail-image" style={{ backgroundImage: `url(/images/help-tomorrow.jpg)` }}>
            <div className="image-overlay-badge">📚 100% Retention Target</div>
          </div>
        </div>
      </section>

      {/* Focus Area 2: Health & Nutrition */}
      <section className="section-pad bg-cream" id="health">
        <div className="focus-detail-grid reverse">
          <div className="focus-detail-image" style={{ backgroundImage: `url(/images/mothers-campaign.jpg)` }}>
            <div className="image-overlay-badge">🥗 Zero Malnutrition Goal</div>
          </div>
          <div className="focus-detail-copy">
            <span className="focus-label">PILLAR 02</span>
            <h2>Child Health, Growth &amp; Maternal Nutrition</h2>
            <p className="focus-lead">
              Combating severe acute malnutrition, anaemia, and preventable childhood diseases through timely intervention.
            </p>
            <ul className="focus-bullets">
              <li><strong>Nutrition Supplementation:</strong> Providing protein-rich micronutrient porridge and fresh meals for underweight infants.</li>
              <li><strong>Anganwadi Capacity Building:</strong> Equipping frontline workers with modern growth-monitoring tools and early diagnosis protocols.</li>
              <li><strong>Maternal Health Camps:</strong> Educating pregnant and lactating mothers on prenatal nutrition, safe breastfeeding, and hygiene.</li>
            </ul>
            <div className="focus-stats-mini">
              <div><strong>34,000+</strong><span>Infants Treated</span></div>
              <div><strong>480+</strong><span>Health Camps Conducted</span></div>
            </div>
            <a href="/donate" className="cry-yellow-btn">Fund A Nutrition Kit</a>
          </div>
        </div>
      </section>

      {/* Focus Area 3: Community Relief */}
      <section className="section-pad bg-white" id="community">
        <div className="focus-detail-grid">
          <div className="focus-detail-copy">
            <span className="focus-label">PILLAR 03</span>
            <h2>Community Relief &amp; Essential Support</h2>
            <p className="focus-lead">
              Responding with dignity when families need practical support most — at school, at home, and during local emergencies.
            </p>
            <ul className="focus-bullets">
              <li><strong>School Supply Drives:</strong> Distributing notebooks, pencils, learning materials and hygiene essentials so children can continue their education with confidence.</li>
              <li><strong>Family Relief Kits:</strong> Supporting vulnerable households with essential food, sanitation and daily-use supplies during difficult periods.</li>
              <li><strong>Community Service Days:</strong> Working with volunteers, schools and local groups to identify immediate needs and deliver help directly.</li>
            </ul>
            <div className="focus-stats-mini">
              <div><strong>Direct</strong><span>Community Support</span></div>
              <div><strong>Dignified</strong><span>Relief for Families</span></div>
            </div>
            <a href="/donate" className="cry-yellow-btn">Support Community Relief</a>
          </div>
          <div className="focus-detail-image" style={{ backgroundImage: `url(/images/stories/august-2026/field-story-03.jpeg)` }}>
            <div className="image-overlay-badge">Community Care in Action</div>
          </div>
        </div>
      </section>

      {/* Focus Area 4: Child Protection & Rights */}
      <section className="section-pad bg-cream" id="protection">
        <div className="focus-detail-grid">
          <div className="focus-detail-copy">
            <span className="focus-label">PILLAR 04</span>
            <h2>Child Protection, Anti-Labour &amp; Girl Dignity</h2>
            <p className="focus-lead">
              Creating safe, abuse-free community environments where children can play, learn, and grow fearlessly.
            </p>
            <ul className="focus-bullets">
              <li><strong>Rescue &amp; Rehabilitation:</strong> Intervening directly with Child Welfare Committees (CWCs) to rescue minors from hazardous labour.</li>
              <li><strong>Preventing Child Marriage:</strong> Empowering adolescent girls with secondary education scholarships and leadership workshops.</li>
              <li><strong>Community Child Protection Committees:</strong> Training local youth collectives and village leaders to monitor child rights violations.</li>
            </ul>
            <div className="focus-stats-mini">
              <div><strong>12,000+</strong><span>Children Rescued</span></div>
              <div><strong>45,000+</strong><span>Girls Empowered</span></div>
            </div>
            <a href="/donate" className="cry-yellow-btn">Protect Vulnerable Youth</a>
          </div>
          <div className="focus-detail-image" style={{ backgroundImage: `url(/images/child-labour-campaign.jpg)` }}>
            <div className="image-overlay-badge">🛡️ Community Vigilance</div>
          </div>
        </div>
      </section>

      {/* Focus Area 5: Tree Plantation & Environment */}
      <section className="section-pad bg-white" id="plantation">
        <div className="focus-detail-grid reverse">
          <div className="focus-detail-image" style={{ backgroundImage: `url(/images/plantation-campaign.jpg)` }}>
            <div className="image-overlay-badge">🌱 Green India Initiative</div>
          </div>
          <div className="focus-detail-copy">
            <span className="focus-label">PILLAR 05</span>
            <h2>Tree Plantation Drives &amp; Ecological Restoration</h2>
            <p className="focus-lead">
              Connecting child welfare to climate action by planting native trees, greening school campuses, and replenishing groundwater.
            </p>
            <ul className="focus-bullets">
              <li><strong>Native Species Afforestation:</strong> Planting fruit-bearing and oxygenating native trees (Neem, Peepal, Banyan, Jamun, Moringa).</li>
              <li><strong>Eco-Clubs in Rural Schools:</strong> Teaching students hands-on organic sapling cultivation, compost making, and water conservation.</li>
              <li><strong>Community Green Corridors:</strong> Collaborating with farmers and Gram Panchayats to develop protected community micro-forests.</li>
            </ul>
            <div className="focus-stats-mini">
              <div><strong>50,000+</strong><span>Trees Planted</span></div>
              <div><strong>85%+</strong><span>Survival Rate</span></div>
            </div>
            <a href="/donate" className="cry-yellow-btn">Plant A Tree (₹150/Sapling)</a>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="cry-cta-banner">
        <div className="cry-cta-inner">
          <h2>Transform the future for India&apos;s children and nature</h2>
          <p>Every rupee donated is eligible for 50% tax exemption under Section 80G of the Income Tax Act.</p>
          <div className="cta-btn-group">
            <a href="/donate" className="cry-yellow-btn">♥ Donate Now</a>
            <a href="/stories" className="cry-outline-btn">Read Field Stories</a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
