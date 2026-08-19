import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export const metadata = {
  title: "Community Relief | Kautike Charitable Foundation",
  description: "Kautike Charitable Foundation supports families with school supplies, essential relief kits and community-led service initiatives.",
};

const supportAreas = [
  { title: "School Supply Drives", text: "Notebooks, pencils, learning materials and hygiene essentials that help children participate confidently in class.", image: "/images/stories/august-2026/field-story-01.jpeg" },
  { title: "Family Relief Kits", text: "Practical food, sanitation and daily-use support for households facing a difficult period.", image: "/images/stories/august-2026/field-story-06.jpeg" },
  { title: "Community Service Days", text: "Volunteer-led activities that identify urgent local needs and deliver help respectfully and directly.", image: "/images/stories/august-2026/field-story-03.jpeg" },
];

export default function CommunityReliefPage() {
  return (
    <main className="page-fade-in">
      <Header />
      <section className="relief-hero">
        <div className="relief-hero-copy">
          <span>KAUTIKE COMMUNITY RELIEF</span>
          <h1>Standing together when support matters <em>most.</em></h1>
          <p>We work with local communities to provide immediate, practical help while protecting every family’s dignity.</p>
          <a href="/donate" className="relief-primary-action">Support community relief <span aria-hidden="true">→</span></a>
        </div>
        <div className="relief-hero-image">
          <img src="/images/stories/august-2026/field-story-03.jpeg" alt="Kautike volunteers supporting a community initiative" />
          <div className="relief-hero-caption">Care. Dignity. Community.</div>
        </div>
      </section>

      <section className="relief-intro">
        <span className="mini-title">HOW WE HELP</span>
        <h2>Practical support, delivered with <span>care.</span></h2>
        <p>Community relief is about showing up with the right help at the right time — for children, their families and the neighbourhoods they call home.</p>
      </section>

      <section className="relief-areas">
        <div className="relief-areas-grid">
          {supportAreas.map((area, index) => (
            <article className="relief-area-card" key={area.title}>
              <img src={area.image} alt="" />
              <div>
                <span>0{index + 1}</span>
                <h3>{area.title}</h3>
                <p>{area.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relief-callout">
        <div>
          <span>EVERY CONTRIBUTION HELPS</span>
          <h2>Turn compassion into <em>meaningful action.</em></h2>
        </div>
        <p>Your support helps Kautike respond to immediate needs and build stronger, more caring communities over time.</p>
        <a href="/donate">Donate for community relief →</a>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
