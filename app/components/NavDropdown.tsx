"use client";

import { useState } from "react";

interface DropdownMenu {
  title: string;
  links: { label: string; href: string }[];
}

const menus: DropdownMenu[] = [
  {
    title: "Who We Are",
    links: [
      { label: "About Kautike Foundation", href: "#about" },
      { label: "Why Children & Community?", href: "#about" },
      { label: "Our Approach", href: "#approach" },
      { label: "Financials & Governance", href: "#impact" },
    ],
  },
  {
    title: "What We Do",
    links: [
      { label: "Child Education", href: "#focus" },
      { label: "Health & Nutrition", href: "#focus" },
      { label: "Community Relief", href: "#focus" },
      { label: "Social Welfare & Protection", href: "#focus" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Donate Now", href: "#donate" },
      { label: "Volunteering & Internships", href: "#stories" },
      { label: "Corporate Partnerships", href: "#stories" },
      { label: "Spread the Word", href: "#stories" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Impact Reports", href: "#impact" },
      { label: "Stories & News", href: "#stories" },
      { label: "FAQs & Tax Exemption (80G)", href: "#donate" },
    ],
  },
];

export function NavDropdown() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
            <div className="nav-dropdown" role="menu">
              {menu.links.map((link) => (
                <a key={link.label} href={link.href} role="menuitem">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Mobile Overlay Drawer Menu */}
      {mobileOpen && (
        <div className="mobile-drawer-overlay">
          <div className="mobile-drawer-inner">
            {menus.map((menu) => (
              <div key={menu.title} className="mobile-menu-group">
                <div className="mobile-group-title">{menu.title}</div>
                <div className="mobile-group-links">
                  {menu.links.map((link) => (
                    <a 
                      key={link.label} 
                      href={link.href} 
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <a 
              href="#donate" 
              className="mobile-drawer-donate-btn"
              onClick={() => setMobileOpen(false)}
            >
              ♥ Donate Now
            </a>
          </div>
        </div>
      )}
    </>
  );
}
