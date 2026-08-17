import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export const metadata = {
  title: "Stories of Hope & Field Dispatches · Kautike Charitable Foundation",
  description: "Read real stories of transformation: from rescued child labourers stepping into classrooms to barren rural school grounds blossoming with trees.",
};

const storiesList = [
  {
    title: "How 11-year-old Pooja Returned to the Classroom",
    category: "Education & Retention",
    location: "Palghar District, Maharashtra",
    image: "/images/help-tomorrow.jpg",
    excerpt: "When Pooja's family migrated for seasonal brick-kiln work, her education came to an abrupt halt. Discover how Kautike's bridge learning centre brought her back to the topper list.",
    quote: "“I want to become a science teacher and teach every girl in my village.”",
  },
  {
    title: "Saving 18-month-old Aarav from Severe Malnutrition",
    category: "Health & Nutrition",
    location: "Thane Rural, Maharashtra",
    image: "/images/mothers-campaign.jpg",
    excerpt: "Weighing barely 6.2 kg at 18 months, Aarav was identified during a Kautike Anganwadi screening camp. Within 90 days of targeted nutrient feeds, Aarav reached the green health zone.",
    quote: "“Kautike's health sevikas saved my baby when I had lost all hope.” — Sunita (Mother)",
  },
  {
    title: "5,000 Native Trees: Greening a Drought-Prone Village",
    category: "Ecological Restoration",
    location: "Solapur, Maharashtra",
    image: "/images/plantation-campaign.jpg",
    excerpt: "A barren 12-acre stretch around three government secondary schools has been turned into a thriving community bio-forest with 88% survival rate through youth eco-clubs.",
    quote: "“Our school temperature is cooler, and our groundwater levels are visibly rising.” — Headmaster Patil",
  },
  {
    title: "Rescued from a Hazardous Auto-Garage, Now an Aspiring Engineer",
    category: "Child Rights & Protection",
    location: "Mumbai Suburbs",
    image: "/images/child-labour-campaign.jpg",
    excerpt: "13-year-old Sameer spent 10 hours daily handling greasy engine parts. Today, rehabilitated through our child welfare collective, Sameer is enrolled in 8th grade with full academic sponsorship.",
    quote: "“I never thought I could hold a pencil again without grease on my hands.”",
  },
];

export default function StoriesPage() {
  return (
    <main className="page-fade-in" id="top">
      <Header />

      {/* Hero */}
      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <span className="subpage-badge">STORIES OF HOPE</span>
          <h1>Voices of resilience &amp; <span className="yellow-hand">triumph</span></h1>
          <p>
            Behind every number is a human journey of grit, dignity, and newly discovered potential. Read how your support turns despair into unstoppable hope.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="section-pad bg-white">
        <div className="about-container">
          <div className="stories-cards-grid">
            {storiesList.map((story) => (
              <article key={story.title} className="story-full-card">
                <div className="story-card-img" style={{ backgroundImage: `url(${story.image})` }}>
                  <span className="story-category-pill">{story.category}</span>
                </div>
                <div className="story-card-content">
                  <span className="story-loc">📍 {story.location}</span>
                  <h3>{story.title}</h3>
                  <p className="story-excerpt">{story.excerpt}</p>
                  <blockquote className="story-quote">{story.quote}</blockquote>
                  <a href="/donate" className="story-support-link">Support More Children Like This ➔</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cry-cta-banner">
        <div className="cry-cta-inner">
          <h2>Write the next story of transformation</h2>
          <p>Your donation today ensures another child steps into a classroom, receives nutritious meals, and smiles fearlessly.</p>
          <div className="cta-btn-group">
            <a href="/donate" className="cry-yellow-btn">♥ Sponsor A Life Today</a>
            <a href="/volunteer" className="cry-outline-btn">Join Us on the Ground</a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
