"use client";

import { useEffect, useState } from "react";
import { NavDropdown } from "./NavDropdown";

const DEFAULT_SETTINGS = {
  phone: "+91 810 836 2688",
  email: "kc.chfoundation2025@gmail.com",
};

export function Header() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kautike_admin_personal");
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings({
          phone: parsed.phone || DEFAULT_SETTINGS.phone,
          email: parsed.email || DEFAULT_SETTINGS.email,
        });
      }

      fetch("http://localhost:4000/api/settings")
        .then((res) => res.json())
        .then((data) => {
          if (data && (data.email || data.phone)) {
            setSettings({
              phone: data.phone || DEFAULT_SETTINGS.phone,
              email: data.email || DEFAULT_SETTINGS.email,
            });
          }
        })
        .catch(() => {});
    } catch (_) {}
  }, []);

  return (
    <>
      {/* 1. TOP UTILITY BAR */}
      <div className="utility-bar">
        <div className="utility-inner">
          <div className="utility-brand">
            <a href="/" className="utility-logo-link" aria-label="Kautike Charitable Foundation">
              <img src="/kautike-logo.png" alt="Kautike Logo" className="utility-logo-img" />
              <span>KAUTIKE CHARITABLE FOUNDATION</span>
            </a>
          </div>
          <div className="contact-links">
            <a href={`mailto:${settings.email}`} aria-label="Email Kautike Charitable Foundation">
              ✉ {settings.email}
            </a>
            <a href={`tel:${settings.phone.replace(/[^0-9+]/g, "")}`} aria-label="Call Kautike Charitable Foundation">
              📞 {settings.phone}
            </a>
          </div>
          <div className="socials">
            <a href="https://www.facebook.com/share/1Leu6EybCU/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">fb</a>
            <a href="https://www.instagram.com/kc_foundation__?igsi=eHd2eWV0amQ2d3hw" target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>
          </div>
        </div>
      </div>

      {/* 2. STICKY HEADER (EXACT MOCKUP MATCH) */}
      <header className="site-header">
        <div className="site-header-container">
          <div className="site-header-left">
            <NavDropdown />
            <a
              href="/"
              className="mobile-header-logo"
              aria-label="Kautike Charitable Foundation home"
              style={{ display: "none" }}
            >
              <img src="/kautike-logo.png" alt="Kautike Charitable Foundation" />
            </a>
          </div>

          <div className="site-header-right">
            <a href="/donate" className="header-donate">
              ♥ Donate Now
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
