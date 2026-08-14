"use client";

import { useState } from "react";

const storiesData = [
  {
    id: 1,
    bgColor: "#C2185B", // Magenta / Crimson
    title: "Celebrate Happy Childhoods With A #BachpanKiDhun",
    text: "Bringing music, learning, and playful care to children in rural education centers.",
    buttonText: "Know More",
    href: "#donate",
  },
  {
    id: 2,
    bgColor: "#1E60BE", // Exact CRY.org Royal Blue Card
    title: "Here’s How We Increased The Enrolment Rate By Upto 90%!",
    text: "Kautike Academic and Psychosocial Support Centers are helping children to get back to their studies.",
    buttonText: "Know More",
    href: "#donate",
  },
  {
    id: 3,
    bgColor: "#2E7D32", // Green
    title: "2025 Recap: Kautike's Top 10 Highlights",
    text: "Thank you for your unwavering support in transforming the lives of India's children. It's you who made it possible!",
    buttonText: "Watch The Video",
    href: "#donate",
  },
  {
    id: 4,
    bgColor: "#C2185B", // Magenta
    title: "Meet Our Champions Around Menstrual Health & Rights",
    text: "We share Nandini's desire for more girls to stay in school, complete their education, and live with health and dignity.",
    buttonText: "Know More",
    href: "#donate",
  },
];

export function StoryCarousel() {
  const [index, setIndex] = useState(1); // Default active to Blue Card matching screenshot!

  const prev = () => {
    setIndex((i) => (i === 0 ? storiesData.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i + 1) % storiesData.length);
  };

  const cardStep = 640; // width of card + gap

  return (
    <div className="cry-story-slider-wrapper">
      {/* Navigation Arrows */}
      <button className="cry-story-nav-btn nav-prev" onClick={prev} aria-label="Previous story">
        ‹
      </button>
      <button className="cry-story-nav-btn nav-next" onClick={next} aria-label="Next story">
        ›
      </button>

      {/* Slider Viewport with Left Peek Offset */}
      <div className="cry-story-track-viewport">
        <div
          className="cry-story-track-list"
          style={{ transform: `translateX(calc(-${index * cardStep}px + 80px))` }}
        >
          {storiesData.map((story) => (
            <div
              key={story.id}
              className="cry-single-hero-card"
              style={{ backgroundColor: story.bgColor }}
            >
              <div className="cry-card-text-inner">
                <h3>{story.title}</h3>
                <p>{story.text}</p>
                <a href={story.href} className="cry-yellow-pill-btn">
                  {story.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
