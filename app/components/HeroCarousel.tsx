"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1800&q=88",
    alt: "Children learning together in a bright classroom",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=88",
    alt: "Children engaged in active learning activities",
  },
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1800&q=88",
    alt: "Community nutrition and healthcare programme",
  },
  {
    src: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=1800&q=88",
    alt: "Children smiling and celebrating together",
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="hero-carousel-bg">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`hero-slide ${i === active ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.src})` }}
            role="img"
            aria-label={slide.alt}
          />
        ))}
      </div>
      <div className="hero-dots" aria-label="Slide Selection">
        {slides.map((_, i) => (
          <button
            key={i}
            className={i === active ? "active" : ""}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}
