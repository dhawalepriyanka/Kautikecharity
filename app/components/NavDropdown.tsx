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
                          onClick={() => setMobileOpen(false)}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
