import { NavDropdown } from "./NavDropdown";

export function Header() {
  return (
    <>
      {/* 1. TOP UTILITY BAR */}
      <div className="utility-bar">
        <div className="utility-inner">
          <div className="contact-links">
            <a href="mailto:kautikecharitable@gmail.com" aria-label="Email Kautike Charitable Foundation">
              ✉ kautikecharitable@gmail.com
            </a>
            <a href="tel:+918108362688" aria-label="Call Kautike Charitable Foundation">
              📞 +91 810 836 2688
            </a>
          </div>
          <div className="socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">fb</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">x</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
          </div>
        </div>
      </div>

      {/* 2. STICKY HEADER */}
      <header className="site-header">
        <div className="site-header-container">
          <div className="site-header-left">
            <NavDropdown />
            <a href="/" className="logo-badge" aria-label="Kautike Charitable Foundation Home">
              <img src="/kautike-logo.png" alt="Kautike Foundation Logo" />
              <div className="logo-text-wrap">
                <strong>KAUTIKE</strong>
                <span>Charitable Foundation</span>
              </div>
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

