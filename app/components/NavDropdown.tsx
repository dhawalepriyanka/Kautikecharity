"use client";

import { useState } from "react";

interface DropdownMenu {
  title: string;
  links: { label: string; href: string }[];
}

export const menus: DropdownMenu[] = [
  {
    title: "Who We Are",
    links: [
      { label: "About Kautike Foundation", href: "/about" },
      { label: "Why Children & Community?", href: "/why-children" },
      { label: "Our Approach", href: "/approach" },
      { label: "Financials & Governance", href: "/impact#governance" },
    ],
  },
  {
    title: "What We Do",
    links: [
      { label: "Child Education", href: "/what-we-do#education" },
      { label: "Health & Nutrition", href: "/what-we-do#health" },
      { label: "Community Relief", href: "/what-we-do#community" },
      { label: "Social Welfare & Protection", href: "/what-we-do#protection" },
      { label: "Tree Plantation Drives", href: "/what-we-do#plantation" },
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
  const [expandedCategory, setExpandedCategory] = useState<number | null>(0);

  const toggleCategory = (idx: number) => {
    setExpandedCategory(expandedCategory === idx ? null : idx);
  };

  return (
    <>
      {/* Mobile Menu Toggle Hamburger */}
      <button 
        className="mobile-hamburger" 
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle mobile menu"
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      {/* Desktop Navigation */}
      <nav className="main-nav" aria-label="Main Navigation">
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
              <span className="caret">▼</span>
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
        <div className="cry-mobile-nav-panel">
          <div className="cry-mobile-nav-inner">
            {menus.map((menu, idx) => {
              const isExpanded = expandedCategory === idx;
              return (
                <div key={menu.title} className="cry-mobile-accordion-group">
                  <button 
                    className={`cry-mobile-category-header ${isExpanded ? "active" : ""}`}
                    onClick={() => toggleCategory(idx)}
                  >
                    <span>{menu.title}</span>
                    <span className="cry-mobile-caret">{isExpanded ? "−" : "+"}</span>
                  </button>

                  {isExpanded && (
                    <div className="cry-mobile-category-links">
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
