"use client";

import { useEffect, useState } from "react";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="floating-actions" aria-label="Quick Actions">
      {showTop && (
        <button
          onClick={scrollToTop}
          className="floating-top-btn"
          title="Scroll back to top"
          aria-label="Back to top"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </button>
      )}

      <a
        href="https://wa.me/918108362688?text=Hello%20Kautike%20Foundation"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-help-btn"
        title="Chat with us on WhatsApp or get help"
      >
        <span style={{ fontSize: "16px" }}>💬</span>
        <span>Help?</span>
      </a>
    </div>
  );
}
