"use client";

import { useEffect, useState } from "react";

const campaigns = [
  {
    title: "SUPPORT CHILDREN'S EDUCATION",
    text: "Help them stay in school",
    photo: "/images/education-campaign.jpg",
    href: "/donate",
  },
  {
    title: "HELP UNDERPRIVILEGED MOTHERS",
    text: "Provide them the nutritional care",
    photo: "/childeren17.png",
    href: "/donate",
  },
  {
    title: "PLANTATION & GREEN INDIA",
    text: "Help plant trees & protect nature",
    photo: "/images/plantation-campaign.jpg",
    href: "/donate",
  },
  {
    title: "STOP CHILD LABOUR",
    text: "Help children go to school instead",
    photo: "/images/child-labour-campaign.jpg",
    href: "/donate",
  },
];

// Tripled list [...campaigns, ...campaigns, ...campaigns] for seamless infinite cycling
const items = [...campaigns, ...campaigns, ...campaigns];

export function CampaignSlider() {
  const [index, setIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 40;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 2800);
    return () => clearInterval(interval);
  }, [isPaused, index]);

  const handleNext = () => {
    setWithTransition(true);
    setIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex >= campaigns.length * 2) {
        setTimeout(() => {
          setWithTransition(false);
          setIndex(nextIndex - campaigns.length);
        }, 600);
      }
      return nextIndex;
    });
  };

  const handlePrev = () => {
    setWithTransition(true);
    setIndex((prev) => {
      if (prev === 0) {
        setWithTransition(false);
        setIndex(campaigns.length);
        return campaigns.length - 1;
      }
      return prev - 1;
    });
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <section
      className="help-today-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="help-today-grid">
        {/* Left Copy Column */}
        <div className="help-today-left">
          <h2 className="help-today-title">
            How do you want to <br />
            <span className="yellow-hand">help children & plants</span> today?
          </h2>

          <p className="help-today-lead">
            Your smallest contribution makes a big difference to children&apos;s lives and nature. We count on the generosity of people like you to educate children, plant trees, and create real change for India&apos;s future!
          </p>

          <a href="/donate" className="cry-yellow-btn">
            🌱 Support Children & Tree Plantation!
          </a>
        </div>

        {/* Right Multi-Card Infinite Photo Carousel */}
        <div 
          className="help-today-right"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Stacked Vertical Arrows (Exact CRY.org Placement: Overlapping Left Edge of First Card) */}
          <div className="cry-stacked-arrows">
            <button onClick={handlePrev} className="cry-arrow-btn" aria-label="Previous campaign">
              ‹
            </button>
            <button onClick={handleNext} className="cry-arrow-btn" aria-label="Next campaign">
              ›
            </button>
          </div>

          <div
            className="campaign-track"
            style={{
              transform: `translateX(-${index * (typeof window !== "undefined" && window.innerWidth <= 820 ? Math.min(window.innerWidth - 48, 344) : 384)}px)`,
              transition: withTransition ? "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)" : "none",
            }}
          >
            {items.map((item, idx) => (
              <a href={item.href} className="campaign-card" key={`${item.title}-${idx}`}>
                <div
                  className="campaign-photo"
                  style={{ backgroundImage: `url(${item.photo})` }}
                >
                  {item.badge && (
                    <span className="campaign-badge">{item.badge}</span>
                  )}
                </div>
                <div className="campaign-info">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
                <div className="campaign-yellow-bar" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
