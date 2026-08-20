"use client";

import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

const defaultMediaClippings = [
  {
    id: "news-lokmat",
    publication: "Lokmat (लोकमत)",
    edition: "Hello Navi Mumbai · Page 5",
    date: "Sunday, 3 August 2025",
    headline: "कोंडप येथील शाळेत शैक्षणिक साहित्याची मदत",
    subheadline: "२६ विद्यार्थ्यांना विविध शैक्षणिक साहित्य व खाऊचे वाटप",
    image: "/images/news/news-lokmat.jpg",
    language: "Marathi",
    location: "Zilla Parishad School Kondap, Panvel, Raigad",
    summary:
      "कौतिके चॅरिटेबल फाउंडेशनने पनवेल तालुक्यातील जिल्हा परिषदेच्या कोंडप शाळेत २ ऑगस्ट रोजी शैक्षणिक साहित्याचे वाटप करून विद्यार्थ्यांच्या शैक्षणिक वाटचालीस हातभार लावला. यावेळी २६ गरजू विद्यार्थ्यांना वह्या, पेन, पेन्सिल व खाऊचे वाटप करण्यात आले. भविष्यातही फाउंडेशनच्या माध्यमातून शैक्षणिक मदतीचे आश्वासन देण्यात आले.",
    attendees: [
      "Ashish Mishra (President)",
      "Abhinay Singh (Secretary)",
      "Dnyaneshwar Jadhav (Treasurer)",
      "Nilesh Kute (Vice President)",
      "Deepak Thorat",
      "Aslam Choche (Headmaster)",
      "Amit Sawant",
    ],
  },
  {
    id: "news-newsband",
    publication: "Newsband (English Daily)",
    edition: "Navi Mumbai & Raigad · Page 5",
    date: "Sunday, 3 August 2025",
    headline: "Kautike Charitable Foundation distributes school supplies",
    subheadline: "Educational kit & nutrition drives at RZP School Kondap",
    image: "/images/news/news-newsband.jpg",
    language: "English",
    location: "RZP School, Kondap, Panvel, Raigad",
    summary:
      "Kautike Charitable Foundation organized a community service event at RZP School in Kondap, Panvel. Volunteers distributed essential educational kits including notebooks, pencils, and nutritious biscuits to students. Guided by the motto 'Every help brings new hope', the foundation continues its commitment to public welfare, hygienic sanitation, and child education.",
    attendees: [
      "Ashish Mishra (President)",
      "Nilesh Kute (Vice President)",
      "Abhinay Singh (Secretary)",
      "Dnyaneshwar Jadhav (Treasurer)",
    ],
  },
  {
    id: "news-lokdrishti",
    publication: "Dainik Lokdrishti (दैनिक लोकदृष्टी)",
    edition: "Thane & Navi Mumbai · Page 4",
    date: "Saturday, 20 September 2025",
    headline: "कौतिके चॅरिटेबल फाउंडेशनतर्फे ग्रामीण विद्यार्थ्यांना शालेय साहित्य वाटप",
    subheadline: "महोदर जिल्हा परिषद शाळेतील गरजू विद्यार्थ्यांना शैक्षणिक मदत",
    image: "/images/news/news-lokdrishti.jpg",
    language: "Marathi",
    location: "Zilla Parishad School Mahodar, Panvel, Raigad",
    summary:
      "ग्रामीण व आदिवासी भागातील गरजू विद्यार्थ्यांना शैक्षणिक मदत व्हावी या हेतूने कौतिके चॅरिटेबल फाउंडेशनतर्फे पनवेल तालुक्यातील महोदर येथील जिल्हा परिषद शाळा येथील विद्यार्थ्यांना वह्या, पेन, पेन्सिल यांसारख्या आवश्यक शालेय साहित्याचे मोफत वाटप करण्यात आले. ग्रामस्थांनी व शिक्षकांनी या स्तुत्य उपक्रमाचे कौतुक केले.",
    attendees: [
      "Vijay Jadhav",
      "Satish Jadhav",
      "Santosh Jadhav",
      "Jayshree Sutar",
      "Nilesh Kute",
      "Abhishek Singh",
      "Abhinay Singh",
      "Dnyaneshwar Jadhav",
      "Suman Yadav",
      "Pravin Gole",
      "Dnyaneshwar Sakpal",
      "Akash Mishra",
    ],
  },
  {
    id: "news-naveshahar",
    publication: "Aapla Nave Shahar (आपलं नवे शहर)",
    edition: "Thane, Navi Mumbai & Raigad · Page 6",
    date: "Tuesday, 16 September 2025",
    headline: "कौतिके चॅरिटेबल फाउंडेशन तर्फे शालेय साहित्य वाटप",
    subheadline: "महोदर रायगड जिल्हा परिषद शाळेत प्रेरणादायी उपक्रम",
    image: "/images/news/news-naveshahar.jpg",
    language: "Marathi",
    location: "Mahodar, Panvel, Raigad",
    summary:
      "ग्रामीण, आदिवासी भागातील गरजू विद्यार्थ्यांना शैक्षणिक मदत पुरवण्यासाठी कौतिके चॅरिटेबल फाउंडेशनतर्फे प्रेरणादायी उपक्रम हाती घेण्यात आला. महोदर येथील रायगड जिल्हा परिषद शाळा मधील सर्व विद्यार्थी-विद्यार्थिनींना वह्या, पेन, पेन्सिल या आवश्यक शैक्षणिक साहित्याचे विनामूल्य वाटप करण्यात आले.",
    attendees: [
      "Vijay Jadhav",
      "Satish Jadhav",
      "Santosh Jadhav",
      "Jayshree Sutar",
      "Core Volunteers",
    ],
  },
  {
    id: "news-navarashtra",
    publication: "Navarashtra (नवराष्ट्र)",
    edition: "Thane Navi Mumbai Plus Edition · Page 4",
    date: "Saturday, 20 September 2025",
    headline: "ग्रामीण विद्यार्थ्यांना शालेय साहित्यवाटप",
    subheadline: "आर्थिकदृष्ट्या दुर्बल विद्यार्थ्यांना कौतिके फाउंडेशनचा आधार",
    image: "/images/news/news-navarashtra.jpg",
    language: "Marathi",
    location: "Z.P. School Mahodar, Panvel, Raigad",
    summary:
      "ग्रामीण भागातील आर्थिकदृष्ट्या कमकुवत पार्श्वभूमी असलेल्या विद्यार्थ्यांसाठी कौतिके चॅरिटेबल फाउंडेशनतर्फे शालेय साहित्य वाटपाचा उपक्रम राबविण्यात आला. जिल्हा परिषद शाळा महोदर येथे सर्व विद्यार्थ्यांना शैक्षणिक संच देण्यात आले.",
    attendees: [
      "Vijay Jadhav",
      "Satish Jadhav",
      "Santosh Jadhav",
      "Jayshree Sutar",
      "Nilesh Kute",
      "Abhishek Singh",
      "Abhinay Singh",
      "Dnyaneshwar Jadhav",
      "Akash Mishra",
    ],
  },
];

export default function StoriesPage() {
  const [mediaClippings, setMediaClippings] = useState(defaultMediaClippings);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kautike_admin_news");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setMediaClippings(parsed);
      }
      fetch("http://localhost:4000/api/news")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) setMediaClippings(data);
        })
        .catch(() => {});
    } catch (_) {}
  }, []);

  return (
    <main className="page-fade-in" id="top">
      <Header />

      {/* Hero Header */}
      <section className="subpage-hero">
        <div className="subpage-hero-inner">
          <span className="subpage-badge">PRESS &amp; MEDIA COVERAGE</span>
          <h1>In The News · <span className="yellow-hand">वृत्तपत्र प्रसिद्धी</span></h1>
          <p>
            Ground dispatches and community welfare drives of Kautike Charitable Foundation covered by leading English &amp; Marathi publications across Maharashtra.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-pad bg-white">
        <div className="about-container">

          <div className="news-media-section">
            <div className="news-section-header text-center mb-10">
              <span className="mini-title">VERIFIED PRESS COVERAGE</span>
              <h2 className="news-main-title">
                Media Highlights &amp; <span className="cry-hand-gold">Published Articles</span>
              </h2>
              <div className="cry-yellow-line" style={{ margin: "14px auto 18px" }} />
              <p className="news-sub-text">
                Click on any newspaper article to view and read the full print clipping in high resolution.
              </p>
            </div>

            <div className="news-clippings-grid">
              {mediaClippings.map((item) => (
                <article key={item.id} className="news-clipping-card">
                  {/* Newspaper Clipping Image Box with Zoom Trigger */}
                  <div
                    className="news-image-wrapper"
                    onClick={() => setSelectedImage(item.image)}
                    title="Click to view full newspaper clipping"
                  >
                    <img
                      src={item.image}
                      alt={`${item.publication} - ${item.headline}`}
                      className="news-clipping-img"
                      loading="lazy"
                    />
                    <div className="news-zoom-overlay">
                      <span>🔍 Click to View Full Print</span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="news-content-box">
                    <div className="news-meta-top">
                      <span className="news-pub-badge">{item.publication}</span>
                      <span className="news-date-text">{item.date}</span>
                    </div>

                    <h3 className="news-headline">{item.headline}</h3>
                    <p className="news-subheadline">{item.subheadline}</p>

                    <div className="news-location-tag">
                      📍 <strong>Location:</strong> {item.location}
                    </div>

                    <p className="news-summary-para">{item.summary}</p>

                    {/* Volunteer Attendees Tag */}
                    <div className="news-attendees-box">
                      <span className="attendees-lbl">Team &amp; Volunteers Present:</span>
                      <div className="attendees-tags-wrap">
                        {item.attendees.map((person, idx) => (
                          <span key={idx} className="attendee-tag">
                            {person}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expand / View Full Button */}
                    <button
                      onClick={() => setSelectedImage(item.image)}
                      className="view-clipping-btn mt-4"
                    >
                      📄 View Official Print Edition
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Image Lightbox Modal for Reading Full Clippings */}
      {selectedImage && (
        <div className="news-lightbox-backdrop" onClick={() => setSelectedImage(null)}>
          <div className="news-lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="news-lightbox-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close newspaper viewer"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Newspaper Press Clipping Full View"
              className="news-lightbox-full-img"
            />
          </div>
        </div>
      )}

      {/* Bottom CTA Banner */}
      <section className="cry-cta-banner">
        <div className="cry-cta-inner">
          <h2>Be Part of the Next Headline of Change</h2>
          <p>
            Your contribution provides school kits, study stationery, supplementary nutrition, and tree saplings to children across rural Maharashtra.
          </p>
          <div className="cta-btn-group">
            <a href="/donate" className="cry-yellow-btn">
              ♥ Donate Online (80G Tax Exempt)
            </a>
            <a href="/volunteer" className="cry-outline-btn">
              Join as a Ground Volunteer
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
