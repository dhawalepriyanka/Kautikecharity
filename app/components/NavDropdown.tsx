"use client";

import { useState } from "react";

interface DropdownMenu {
  title: string;
  links: { label: string; href: string }[];
}

export const menus: DropdownMenu[] = [
  {
    title: "Who We Are?",
    links: [
      { label: "About Kautike Foundation", href: "/about" },
      { label: "Why Children & Community?", href: "/why-children" },
      { label: "Our Approach", href: "/approach" },
      { label: "Our Impact", href: "/impact" },
    ],
  },
  {
    title: "What We Do?",
    links: [
      { label: "Child Education", href: "/child-education" },
      { label: "Health & Nutrition", href: "/health-nutrition" },
      { label: "Community Relief", href: "/community-relief" },
      { label: "Social Welfare & Protection", href: "/social-welfare" },
      { label: "Tree Plantation Drives", href: "/tree-plantation" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Donate Now", href: "/donate" },
      { label: "Volunteering & Internships", href: "/volunteer" },
      { label: "Corporate Partnerships", href: "/corporate-partnerships" },
      { label: "Spread the Word", href: "/get-involved" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Events & Photo Gallery", href: "/events" },
      { label: "Impact Reports", href: "/impact" },
      { label: "Stories & News", href: "/stories" },
      { label: "FAQs & Tax Exemption (80G)", href: "/faqs" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export function NavDropdown() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Show the programme pages as soon as the mobile menu opens.
  const [expandedCategory, setExpandedCategory] = useState<number | null>(1);

  const toggleCategory = (idx: number) => {
    setExpandedCategory((current) => (current === idx ? null : idx));
  };

  return (
    <>
      {/* Mobile Menu Toggle Hamburger */}
      <button 
        className="mobile-hamburger" 
        type="button"
        onClick={() =>
          setMobileOpen((current) => {
            const next = !current;
            if (next) setExpandedCategory(1);
            return next;
          })
        }
        aria-label="Toggle mobile menu"
        aria-expanded={mobileOpen}
        aria-controls="mobile-navigation"
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      {/* Desktop Navigation */}
      <nav className="main-nav" aria-label="Main Navigation">
        <a href="/" className="nav-link-home">
          Home
        </a>
        {menus.map((menu, i) => (
          <div
            key={menu.title}
            className="nav-item"
            onMouseEnter={() => setOpenIndex(i)}
            onMouseLeave={() => setOpenIndex(null)}
          >
            <button
              className="nav-trigger"
              aria-expanded={openIndex === i}
              aria-haspopup="true"
            >
              {menu.title}
              <span className="caret">▾</span>
            </button>
            <div className={`nav-dropdown ${openIndex === i ? "is-open" : ""}`} role="menu">
              {menu.links.map((link) => (
                <a key={link.label} href={link.href} role="menuitem">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Mobile Accordion Navbar Dropdown (Directly under Header Bar like CRY.org) */}
      {mobileOpen && (
        <div id="mobile-navigation" className="cry-mobile-nav-panel" aria-label="Mobile navigation">
          <div className="cry-mobile-nav-inner">
            <a className="cry-mobile-home-link" href="/">
              <span>Home</span>
              <span className="link-arrow">›</span>
            </a>
            {menus.map((menu, idx) => {
              const isExpanded = expandedCategory === idx;
              return (
                <div key={menu.title} className="cry-mobile-accordion-group">
                  <button 
                    type="button"
                    className={`cry-mobile-category-header ${isExpanded ? "active" : ""}`}
                    onClick={() => toggleCategory(idx)}
                    aria-expanded={isExpanded}
                    aria-controls={`mobile-category-${idx}`}
                  >
                    <span>{menu.title}</span>
                    <span className="cry-mobile-caret">{isExpanded ? "−" : "+"}</span>
                  </button>

                  {isExpanded && (
                    <div id={`mobile-category-${idx}`} className="cry-mobile-category-links">
                      {menu.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                        >
                          <span className="link-arrow">›</span>
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="cry-mobile-nav-footer">
              <a
                href="/donate"
                className="cry-mobile-donate-btn"
                onClick={() => setMobileOpen(false)}
              >
                ♥ DONATE NOW
              </a>
              <div className="cry-mobile-social-wrap">
                <span className="cry-mobile-social-title">Connect with us</span>
                <div className="cry-mobile-social-pills">
                  <a
                    href="https://www.facebook.com/share/1Leu6EybCU/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cry-soc-pill-fb"
                    aria-label="Facebook"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </a>
                  <a
                    href="https://youtube.com/@kautikecharitablefoundation?si=Mj2ijYX7_Qm-U6L4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cry-soc-pill-yt"
                    aria-label="YouTube"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span>YouTube</span>
                  </a>
                  <a
                    href="https://www.instagram.com/kautikecharitablefoundation?igsi=MTBhOW9vaWZmNG1oMg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cry-soc-pill-ig"
                    aria-label="Instagram"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
