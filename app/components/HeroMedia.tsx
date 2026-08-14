"use client";

export function HeroMedia() {
  return (
    <div className="hero-artistic-frame">
      {/* Background Soft Paint Glow Halo */}
      <div className="artistic-paint-halo" />

      {/* SVG Texture Filter */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="artistic-brush-roughness" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035 0.07" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Outer Organic Paint Brush Arc & Border Overlays */}
      <svg
        className="artistic-brush-svg"
        viewBox="0 0 820 660"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Bold Hand-brushed stroke outline wrapping around pebble shape (#F5A623) */}
        <path
          d="
            M 120,80 
            C 300,10 600,20 740,120 
            C 840,220 820,440 700,540 
            C 560,630 260,640 100,500 
            C -20,340 10,170 120,80 
            Z
          "
          fill="none"
          stroke="#F5A623"
          strokeWidth="18"
          strokeLinecap="round"
          filter="url(#artistic-brush-roughness)"
          opacity="0.96"
        />

        {/* Top-Left Bold Golden Paint Splash Arc (#F5A623) */}
        <path
          d="M 60,190 C 15,90 120,5 250,38 C 360,65 140,130 60,190 Z"
          fill="#F5A623"
          filter="url(#artistic-brush-roughness)"
          opacity="0.95"
        />

        {/* Bottom-Right Deep Crimson Maroon Stroke (#7A1C2E) */}
        <path
          d="M 440,570 C 580,510 740,490 820,550 C 740,615 580,635 440,570 Z"
          fill="#7A1C2E"
          filter="url(#artistic-brush-roughness)"
          opacity="0.96"
        />

        {/* Bottom-Right Rich Sunset Orange Stroke (#E67E22) */}
        <path
          d="M 360,605 C 520,545 700,535 800,590 C 690,645 520,655 360,605 Z"
          fill="#E67E22"
          filter="url(#artistic-brush-roughness)"
          opacity="0.95"
        />

        {/* Bottom-Right Vivid Kautike Gold Foreground Sweep (#F5A623) */}
        <path
          d="M 280,630 C 460,575 660,565 770,615 C 650,665 460,675 280,630 Z"
          fill="#F5A623"
          filter="url(#artistic-brush-roughness)"
        />

        {/* Dynamic Outward Paint Spray Dots */}
        <g fill="#F5A623">
          <circle cx="85" cy="45" r="5.5" />
          <circle cx="160" cy="20" r="7.5" />
          <circle cx="280" cy="25" r="5" />
          <circle cx="40" cy="135" r="6.5" />
          <circle cx="28" cy="255" r="6" />
          <circle cx="390" cy="635" r="7" />
          <circle cx="580" cy="645" r="5.5" />
          <circle cx="740" cy="630" r="7.5" />
        </g>
      </svg>

      {/* Main Video Element inside Organic Fluid Pebble Shape */}
      <div className="artistic-pebble-wrap">
        <video
          className="hero-video"
          src="/hero-community.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </div>
  );
}
