"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    id: 1,
    value: 2338980,
    suffix: "",
    label: "children impacted overall",
    badgeType: "children",
  },
  {
    id: 2,
    value: 91,
    suffix: "%",
    label: "children in Kautike project areas, between the ages of 6–18 years, in school",
    note: "*In the 15-18 age group, our enrolment and retention rate is 14% better than the all-India status.",
    badgeType: "education",
  },
  {
    id: 3,
    value: 96,
    suffix: "%",
    label: "children in Kautike project areas, under the age of 5 years, protected from undernourishment",
    note: "*Only 2% children in project areas are underweight, as compared to 32% all-India status.",
    badgeType: "health",
  },
  {
    id: 4,
    value: 88,
    suffix: "%",
    label: "of adolescent girls, in Kautike project areas, between 11–18 years, protected from child marriage",
    badgeType: "safety",
  },
  {
    id: 5,
    value: 90,
    suffix: "%",
    label: "children, in Kautike project areas, between the ages of 6–18 years, protected from child labour & environmental care",
    badgeType: "labour",
  },
];

export function ImpactStats() {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cry-impact-container" ref={ref}>
      {/* Row 1: Cards 1 & 2 */}
      <div className="cry-impact-row row-2-col">
        <StatCard {...stats[0]} active={active} />
        <StatCard {...stats[1]} active={active} />
      </div>

      {/* Row 2: Cards 3 & 4 */}
      <div className="cry-impact-row row-2-col">
        <StatCard {...stats[2]} active={active} />
        <StatCard {...stats[3]} active={active} />
      </div>

      {/* Row 3: Centered Card 5 */}
      <div className="cry-impact-row row-1-col">
        <StatCard {...stats[4]} active={active} />
      </div>
    </div>
  );
}

function StatCard({
  value,
  suffix,
  label,
  note,
  badgeType,
  active,
}: {
  value: number;
  suffix: string;
  label: string;
  note?: string;
  badgeType: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const duration = 1400;

    let frameId: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * easeOut));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, value]);

  return (
    <div className="cry-impact-card">
      {/* Overlapping Top Vector Badge */}
      <div className="cry-impact-badge">
        {badgeType === "children" && (
          <svg viewBox="0 0 50 50" fill="none">
            <circle cx="25" cy="18" r="7" fill="#FFC107" />
            <path d="M14 36 C14 28 36 28 36 36" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            <path d="M10 22 L18 16 M40 22 L32 16" stroke="#FFC107" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
        {badgeType === "education" && (
          <svg viewBox="0 0 50 50" fill="none">
            <circle cx="25" cy="16" r="6" fill="#475569" />
            <path d="M14 38 L25 32 L36 38 L36 26 L14 26 Z" fill="#FFC107" />
          </svg>
        )}
        {badgeType === "health" && (
          <svg viewBox="0 0 50 50" fill="none">
            <path d="M12 30 Q25 40 38 30 L35 20 Q25 24 15 20 Z" fill="#FFC107" />
            <circle cx="25" cy="16" r="6" fill="#00BCD4" />
          </svg>
        )}
        {badgeType === "safety" && (
          <svg viewBox="0 0 50 50" fill="none">
            <circle cx="20" cy="20" r="10" fill="#9E9E9E" opacity="0.6" />
            <circle cx="28" cy="22" r="10" fill="#FFC107" />
            <path d="M28 17 C28 17 33 22 28 27 C23 22 28 17 28 17 Z" fill="#E91E63" />
          </svg>
        )}
        {badgeType === "labour" && (
          <svg viewBox="0 0 50 50" fill="none">
            <circle cx="20" cy="20" r="10" fill="#9E9E9E" opacity="0.6" />
            <circle cx="28" cy="22" r="10" fill="#FFC107" />
            <path d="M28 18 L28 26 M24 22 L32 22" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
      </div>

      <div className="cry-impact-num">
        {count.toLocaleString("en-IN")}
        {suffix}
      </div>

      <p className="cry-impact-label">{label}</p>

      {note && <span className="cry-impact-note">{note}</span>}
    </div>
  );
}
