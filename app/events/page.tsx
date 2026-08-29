"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingActions } from "../components/FloatingActions";

export type EventItem = {
  id: string;
  title: string;
  titleMr?: string;
  category: "Education" | "Health" | "Environment" | "Relief" | string;
  date: string;
  location: string;
  coverImage: string;
  gallery?: string[];
  summary: string;
  attendees?: string[];
};

const initialEvents: EventItem[] = [
  {
    id: "notebook-distribution-2025",
    title: "Notebook Distribution to Needy Students",
    category: "Education",
    date: "2025-08-02",
    location: "RZP School Kondap, Kondap, Panvel, Raigad",
    coverImage: "/images/events/mission-1/mission-1-01.jpeg",
    gallery: Array.from({ length: 28 }, (_, index) => `/images/events/mission-1/mission-1-${String(index + 1).padStart(2, "0")}.jpeg`),
    summary: "Distributed educational notebooks and essential study supplies to underprivileged students.",
  },
  {
    id: "school-supplies-2025",
    title: "School Supplies Distribution to 48 Students",
    category: "Education",
    date: "2025-09-13",
    location: "Raigad Zilla Parishad School, Mahodar, Panvel, Raigad",
    coverImage: "/images/events/mission-2/mission-2-01.jpeg",
    gallery: Array.from({ length: 10 }, (_, index) => `/images/events/mission-2/mission-2-${String(index + 1).padStart(2, "0")}.jpeg`),
    summary: "Distributed comprehensive school kits, stationery, and drawing materials to 48 deserving students.",
  },
  {
    id: "saundari-school-supplies-2025",
    title: "School Supplies Distribution at Saundari",
    titleMr: "शालेय साहित्य वाटप - जि.प. प्राथ. शाळा सौंदरी",
    category: "Education",
    date: "2025-10-04",
    location: "Zilla Parishad Primary School Saundari, Mahabaleshwar, Satara",
    coverImage: "/images/events/mission-3/mission-3-01.jpg",
    gallery: [
      "/images/events/mission-3/mission-3-01.jpg",
      "/images/events/mission-3/mission-3-02.jpg",
      "/images/events/mission-3/mission-3-03.jpg",
      "/images/events/mission-3/mission-3-04.jpg",
      "/images/events/mission-3/mission-3-05.jpg",
      "/images/events/mission-3/mission-3-06.jpg",
    ],
    summary: "Provided educational supplies, notebooks, and learning kits to students in rural Saundari.",
  },
  {
    id: "educational-supplies-2026",
    title: "Educational Supplies for 40 Students",
    titleMr: "Every act of kindness — a new ray of hope",
    category: "Education",
    date: "2026-08-08",
    location: "Raigad Zilla Parishad School, Farshipada, Panvel, Raigad",
    coverImage: "/images/events/mission-10/mission-10-01.jpeg",
    gallery: Array.from({ length: 14 }, (_, index) => `/images/events/mission-10/mission-10-${String(index + 1).padStart(2, "0")}.jpeg`),
    summary: "Distributed educational kits, notebooks, and study essentials to 40 primary students.",
  },
  {
    id: "mission-6-wavloli-ashram-school-2025",
    title: "Educational Kits & Water Coolers at Wavloli Ashram School",
    titleMr: "शालेय साहित्य व पिण्याच्या पाण्याचे जार वाटप - वावलोली आश्रम शाळा",
    category: "Education",
    date: "2025-12-13",
    location: "Ashram School (E. A. M. Prashala), Wavloli, Sudhagad, Raigad",
    coverImage: "/images/events/varasgaon-drive/varasgaon-09.jpg",
    gallery: [
      "/images/events/varasgaon-drive/varasgaon-09.jpg",
      "/images/events/varasgaon-drive/varasgaon-01.jpg",
      "/images/events/varasgaon-drive/varasgaon-02.jpg",
      "/images/events/varasgaon-drive/varasgaon-03.jpg",
      "/images/events/varasgaon-drive/varasgaon-04.jpg",
      "/images/events/varasgaon-drive/varasgaon-05.jpg",
      "/images/events/varasgaon-drive/varasgaon-06.jpg",
      "/images/events/varasgaon-drive/varasgaon-07.jpg",
      "/images/events/varasgaon-drive/varasgaon-08.jpg",
      "/images/events/varasgaon-drive/varasgaon-10.jpg",
      "/images/events/varasgaon-drive/varasgaon-11.jpg",
      "/images/events/varasgaon-drive/varasgaon-12.jpg",
      "/images/events/varasgaon-drive/varasgaon-13.jpg",
      "/images/events/varasgaon-drive/varasgaon-14.jpg",
      "/images/events/varasgaon-drive/varasgaon-15.jpg",
    ],
    summary: "Distributed 15 classroom water coolers, 500 drawing books, 500 colour boxes, and 50 sets of 10th Std question sets.",
  },
  {
    id: "devecamp-school-supplies-distribution-2026",
    title: "Educational Kit & Study Supplies Distribution at Devecamp",
    titleMr: "शैक्षणिक साहित्य वाटप - रायगड जिल्हा परिषद शाळा देवकॅम्प",
    category: "Education",
    date: "2026-08-27",
    location: "Raigad Zilla Parishad School, Devecamp, Panvel, Raigad",
    coverImage: "/images/events/devecamp-school-drive/devecamp-01.jpg",
    gallery: [
      "/images/events/devecamp-school-drive/devecamp-01.jpg",
      "/images/events/devecamp-school-drive/devecamp-02.jpg",
      "/images/events/devecamp-school-drive/devecamp-03.jpg",
      "/images/events/devecamp-school-drive/devecamp-04.jpg",
      "/images/events/devecamp-school-drive/devecamp-05.jpg",
      "/images/events/devecamp-school-drive/devecamp-06.jpg",
    ],
    summary: "Distributed notebooks, drawing books, colour sets, and essential study materials to students.",
  },
];

function mergeEventsList(savedEvents: EventItem[]) {
  const map = new Map<string, EventItem>();
  if (Array.isArray(savedEvents)) {
    savedEvents.forEach((event) => {
      if (event && event.id && !["evt-1", "evt-2", "evt-3"].includes(event.id)) {
        map.set(event.id, event);
      }
    });
  }
  initialEvents.forEach((event) => {
    map.set(event.id, {
      ...(map.get(event.id) || {}),
      ...event,
      title: event.title,
      titleMr: event.titleMr,
      summary: event.summary,
      location: event.location,
    });
  });
  return Array.from(map.values());
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openGallery = (images: string[], index = 0) => {
    const gallery = images.length > 0 ? images : [];
    if (gallery.length > 0) setLightbox({ images: gallery, index });
  };

  const changeLightboxPhoto = (direction: -1 | 1) => {
    setLightbox((current) => {
      if (!current) return null;
      return {
        ...current,
        index: (current.index + direction + current.images.length) % current.images.length,
      };
    });
  };

  const loadEvents = () => {
    try {
      const saved = localStorage.getItem("kautike_admin_events");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setEvents(mergeEventsList(parsed));
        }
      }
    } catch (_) {}
  };

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightbox]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") changeLightboxPhoto(-1);
      if (e.key === "ArrowRight") changeLightboxPhoto(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  useEffect(() => {
    loadEvents();
    window.addEventListener("storage", loadEvents);

    fetch("http://localhost:4000/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const merged = mergeEventsList(data);
          setEvents(merged);
          try {
            localStorage.setItem("kautike_admin_events", JSON.stringify(merged));
          } catch (_) {}
        }
      })
      .catch(() => {});

    return () => window.removeEventListener("storage", loadEvents);
  }, []);

  const categories = ["All", "Education", "Health", "Environment", "Relief"];

  const filteredEvents = events.filter((evt) => {
    const matchesCategory = activeCategory === "All" || evt.category.toLowerCase() === activeCategory.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      evt.title.toLowerCase().includes(q) ||
      (evt.titleMr && evt.titleMr.toLowerCase().includes(q)) ||
      evt.location.toLowerCase().includes(q) ||
      evt.summary.toLowerCase().includes(q) ||
      (evt.attendees && evt.attendees.some((a) => a.toLowerCase().includes(q)));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="page-fade-in bg-cream" id="top" style={{ backgroundColor: "#FAF8F5", minHeight: "100vh" }}>
      <Header />

      {/* 1. HERO SECTION */}
      <section className="cry-vision-section" style={{ paddingBottom: 40 }}>
        <div className="cry-vision-content text-center">
          <span className="subpage-badge">OUR FIELD WORK</span>
          <h1 className="cry-wc-main-title">
            Events &amp; <span className="cry-hand-gold">Photo Gallery</span>
          </h1>
          <div className="cry-wc-yellow-bar" />
          <p className="cry-vision-text">
            Witness our on-ground drives across Maharashtra — from school kit distributions and nutritional outreach to village community welfare and native tree plantations.
          </p>
        </div>
      </section>

      {/* 2. FILTER & SEARCH BAR */}
      <section style={{ maxWidth: 1200, margin: "0 auto 36px", padding: "0 24px" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "20px 24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            border: "1px solid #E2E8F0",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 18px",
                  borderRadius: 24,
                  border: 0,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: activeCategory === cat ? "#153f31" : "#f1f5f9",
                  color: activeCategory === cat ? "#fff" : "#475569",
                }}
              >
                {cat === "All" ? "🌟 All Events" : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ flex: "1 1 260px", maxWidth: 360, position: "relative" }}>
            <input
              type="text"
              placeholder="🔍 Search event, location, volunteer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 16px",
                borderRadius: 24,
                border: "1px solid #cbd5e1",
                fontSize: 13,
                outline: "none",
                font: "inherit",
                background: "#FAF8F5",
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: 0,
                  cursor: "pointer",
                  color: "#94a3b8",
                  fontSize: 14,
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. EVENTS & PHOTO GALLERY GRID */}
      <section style={{ maxWidth: 1200, margin: "0 auto 60px", padding: "0 24px" }}>
        {filteredEvents.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📸</div>
            <h3 style={{ margin: "0 0 8px", color: "#1E293B" }}>No events found</h3>
            <p style={{ margin: 0, color: "#64748B", fontSize: 14 }}>Try selecting another category or clearing your search query.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 28 }}>
            {filteredEvents.map((evt) => (
              <article
                key={evt.id}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                {/* Cover Image with Lightbox click */}
                <div
                  style={{ position: "relative", height: 300, cursor: "pointer", overflow: "hidden", background: "#F8FAFC" }}
                  onClick={() => openGallery(evt.gallery?.length ? evt.gallery : [evt.coverImage])}
                  title="Click to view full photo"
                >
                  <img
                    src={evt.coverImage}
                    alt={evt.title}
                    style={{ width: "100%", height: "100%", objectFit: "contain", transition: "transform 0.3s ease" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      background: "rgba(21, 63, 49, 0.9)",
                      color: "#fff",
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {evt.category}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 12,
                      right: 12,
                      background: "rgba(0, 0, 0, 0.65)",
                      color: "#fff",
                      padding: "4px 10px",
                      borderRadius: 16,
                      fontSize: 11,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    🔍 View Photo
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: 22, display: "flex", flexDirection: "column", flex: 1 }}>
                  {/* Meta date & location */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, fontSize: 12, color: "#64748B", marginBottom: 10 }}>
                    <span>📅 {new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(evt.date || Date.now()))}</span>
                    <span>📍 {evt.location}</span>
                  </div>

                  <h2 style={{ fontSize: 17, color: "#153f31", margin: "0 0 8px", lineHeight: 1.4, fontWeight: 800 }}>
                    {evt.title}
                  </h2>

                  {evt.titleMr && (
                    <h3 style={{ fontSize: 13, color: "#d97706", margin: "0 0 12px", fontWeight: 600, lineHeight: 1.4 }}>
                      {evt.titleMr}
                    </h3>
                  )}

                  <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, margin: "0 0 16px", flex: 1 }}>
                    {evt.summary}
                  </p>

                  {/* Photo Gallery Thumbnails */}
                  {evt.gallery && evt.gallery.length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <span style={{ display: "block", fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: "#64748B", marginBottom: 6 }}>
                        Event Photo Gallery ({evt.gallery.length})
                      </span>
                      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
                        {evt.gallery.map((imgSrc, idx) => (
                          <img
                            key={idx}
                            src={imgSrc}
                            alt={`${evt.title} photo ${idx + 1}`}
                            onClick={() => openGallery(evt.gallery ?? [imgSrc], idx)}
                            style={{
                              width: 60,
                              height: 60,
                              borderRadius: 8,
                              objectFit: "cover",
                              cursor: "pointer",
                              border: "2px solid #e2e8f0",
                              flexShrink: 0,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Attendees / Volunteers */}
                  {evt.attendees && evt.attendees.length > 0 && (
                    <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 12 }}>
                      <span style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 6 }}>
                        Volunteers &amp; Attendees:
                      </span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {evt.attendees.map((person, pIdx) => (
                          <span
                            key={pIdx}
                            style={{
                              background: "#f1f5f9",
                              color: "#334155",
                              padding: "2px 8px",
                              borderRadius: 12,
                              fontSize: 11,
                              fontWeight: 600,
                            }}
                          >
                            👤 {person}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 4. LIGHTBOX MODAL (PORTAL TO BODY TO ENSURE 100% SCREEN COVERAGE) */}
      {mounted && typeof document !== "undefined" && lightbox
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Image gallery preview"
              onClick={() => setLightbox(null)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.96)",
                zIndex: 99999999,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                boxSizing: "border-box",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  maxWidth: "92vw",
                  maxHeight: "88vh",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setLightbox(null)}
                  aria-label="Close photo preview"
                  style={{
                    position: "absolute",
                    top: "-16px",
                    right: "-16px",
                    background: "#EF4444",
                    color: "#FFFFFF",
                    border: "2px solid #FFFFFF",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    fontSize: "16px",
                    fontWeight: 900,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                  }}
                >
                  ✕
                </button>

                <img
                  src={lightbox.images[lightbox.index]}
                  alt="Event full preview"
                  style={{
                    display: "block",
                    width: "auto",
                    height: "auto",
                    maxWidth: "min(92vw, 1000px)",
                    maxHeight: "82vh",
                    borderRadius: "10px",
                    objectFit: "contain",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
                  }}
                />

                {lightbox.images.length > 1 && (
                  <div
                    style={{
                      marginTop: "12px",
                      color: "#FFFFFF",
                      fontSize: "14px",
                      fontWeight: 700,
                      backgroundColor: "rgba(0,0,0,0.6)",
                      padding: "4px 14px",
                      borderRadius: "20px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {lightbox.index + 1} / {lightbox.images.length}
                  </div>
                )}
              </div>

              {lightbox.images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={(e) => {
                      e.stopPropagation();
                      changeLightboxPhoto(-1);
                    }}
                    style={{
                      position: "fixed",
                      left: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      border: "1.5px solid rgba(255,255,255,0.3)",
                      background: "rgba(0,0,0,0.6)",
                      color: "#FFFFFF",
                      fontSize: "28px",
                      lineHeight: "1",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 99999999,
                      transition: "background 0.2s",
                    }}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={(e) => {
                      e.stopPropagation();
                      changeLightboxPhoto(1);
                    }}
                    style={{
                      position: "fixed",
                      right: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      border: "1.5px solid rgba(255,255,255,0.3)",
                      background: "rgba(0,0,0,0.6)",
                      color: "#FFFFFF",
                      fontSize: "28px",
                      lineHeight: "1",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 99999999,
                      transition: "background 0.2s",
                    }}
                  >
                    ›
                  </button>
                </>
              )}
            </div>,
            document.body
          )
        : null}

      {/* 5. CALL TO ACTION BANNER */}
      <section className="cry-cta-banner">
        <div className="cry-cta-inner">
          <h2>Partner with Us for Community Drives</h2>
          <p>
            Help us organize upcoming school kit distributions, child nutrition camps, and environmental plantation drives across Maharashtra.
          </p>
          <div className="cta-btn-group">
            <a href="/donate" className="cry-yellow-btn">♥ Sponsor A Drive (80G Tax Exempt)</a>
            <a href="/volunteer" className="cry-outline-btn">Join As A Volunteer</a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </main>
  );
}
