"use client";

import { useState, useEffect, useRef } from "react";

const newsAndStories = [
  {
    id: 1,
    badge: "LOKMAT (लोकमत)",
    tagColor: "#B45309",
    tagBg: "#FEF3C7",
    title: "कोंडप येथील शाळेत शैक्षणिक साहित्याची मदत",
    text: "पनवेल तालुक्यातील जिल्हा परिषदेच्या कोंडप शाळेत २६ गरजू विद्यार्थ्यांना वह्या, पेन, पेन्सिल, व खाऊचे वाटप करण्यात आले.",
    image: "/images/news/news-lokmat.jpg",
    location: "Kondap, Panvel, Raigad",
    buttonText: "Read Coverage",
    href: "/stories",
  },
  {
    id: 2,
    badge: "NEWSBAND MUMBAI",
    tagColor: "#1D4ED8",
    tagBg: "#DBEAFE",
    title: "Kautike Foundation Distributes School Supplies in Raigad",
    text: "Essential educational kits, stationery, and biscuits distributed to uplift underprivileged students at RZP Primary School.",
    image: "/images/news/news-newsband.jpg",
    location: "Panvel, Raigad",
    buttonText: "Read Article",
    href: "/stories",
  },
  {
    id: 3,
    badge: "DAINIK LOKDRISHTI (लोकदृष्टी)",
    tagColor: "#047857",
    tagBg: "#D1FAE5",
    title: "ग्रामीण विद्यार्थ्यांना शालेय साहित्य वाटप — महोदर जि.प. शाळा",
    text: "आदिवासी व ग्रामीण भागातील गरजू विद्यार्थ्यांना शैक्षणिक साहित्याचे विनामूल्य वाटप करून शैक्षणिक प्रवाहास मदत.",
    image: "/images/news/news-lokdrishti.jpg",
    location: "Mahodar, Panvel",
    buttonText: "Read Coverage",
    href: "/stories",
  },
  {
    id: 4,
    badge: "AAPLA NAVE SHAHAR (नवे शहर)",
    tagColor: "#D97706",
    tagBg: "#FEF3C7",
    title: "आदिवासी व ग्रामीण विद्यार्थ्यांसाठी शैक्षणिक साहित्याची मदत",
    text: "महोदर रायगड जिल्हा परिषद शाळा मधील सर्व विद्यार्थ्यांना शैक्षणिक साहित्याचे विनामूल्य वाटप.",
    image: "/images/news/news-naveshahar.jpg",
    location: "Mahodar, Raigad",
    buttonText: "Read Coverage",
    href: "/stories",
  },
  {
    id: 5,
    badge: "NAVARASHTRA (नवराष्ट्र)",
    tagColor: "#6D28D9",
    tagBg: "#EDE9FE",
    title: "ग्रामीण विद्यार्थ्यांना शालेय साहित्यवाटप उपक्रम",
    text: "रायगड जिल्ह्यातील ग्रामीण भागातील आर्थिकदृष्ट्या दुर्बल विद्यार्थ्यांसाठी उपयुक्त शैक्षणिक संच वाटप मोहीम.",
    image: "/images/news/news-navarashtra.jpg",
    location: "Navi Mumbai & Raigad",
    buttonText: "Read Coverage",
    href: "/stories",
  },
];

export function StoryCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-play rotation every 5.5 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % newsAndStories.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prev = () => {
    setIndex((i) => (i === 0 ? newsAndStories.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i + 1) % newsAndStories.length);
  };

  // Touch Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      next(); // Swiped left
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prev(); // Swiped right
    }
  };

  return (
    <div
      className="cry-story-slider-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation Arrows */}
      <button
        className="cry-story-nav-btn nav-prev"
        onClick={prev}
        aria-label="Previous story"
      >
        ‹
      </button>
      <button
        className="cry-story-nav-btn nav-next"
        onClick={next}
        aria-label="Next story"
      >
        ›
      </button>

      {/* Slider Viewport */}
      <div className="cry-story-track-viewport">
        <div
          className="cry-story-track-list"
          style={{
            transform: `translateX(calc(-${index * 100}% - ${index * 32}px))`,
          }}
        >
          {newsAndStories.map((story, i) => {
            const isActive = index === i;
            return (
              <div
                key={story.id}
                className={`cry-single-hero-card ${isActive ? "is-active" : "is-inactive"}`}
              >
                {/* 2-Column Split: Image on Left, Clear Typography on Right */}
                <div className="cry-story-split-grid">
                  
                  {/* Left: Framed Newspaper Clipping Photo */}
                  <div className="cry-story-img-col">
                    <div className="cry-story-clipping-frame">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="cry-story-clipping-img"
                        loading="lazy"
                      />
                      <span className="cry-story-zoom-hint">📰 Press Clipping</span>
                    </div>
                  </div>

                  {/* Right: Clean Content & Read Button */}
                  <div className="cry-story-copy-col">
                    <span 
                      className="cry-card-news-badge"
                      style={{ color: story.tagColor, backgroundColor: story.tagBg }}
                    >
                      {story.badge}
                    </span>
                    
                    <h3 className="cry-story-title">{story.title}</h3>
                    <p className="cry-story-desc">{story.text}</p>
                    
                    <div className="story-meta-row">
                      <span className="story-meta-loc">📍 {story.location}</span>
                    </div>

                    <a href={story.href} className="cry-story-action-btn">
                      {story.buttonText} ➔
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Dot Indicators */}
      <div className="story-indicators-row">
        {newsAndStories.map((_, i) => (
          <button
            key={i}
            className={`story-dot ${index === i ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
