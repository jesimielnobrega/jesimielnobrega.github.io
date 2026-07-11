import { useState } from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { type Lang, T } from "../i18n";
import { type SectionId } from "../hooks/useScrollSpy";

interface NavbarProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  isDark: boolean;
  toggleTheme: () => void;
  activeSection: SectionId;
}

const NAV_ITEMS = [
  { id: "sobre", key: "about" },
  { id: "projetos", key: "projects" },
  { id: "experiencia", key: "experience" },
  { id: "stack", key: "skills" },
] as const;

export default function Navbar({
  lang,
  setLang,
  isDark,
  toggleTheme,
  activeSection,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = T[lang];

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar" aria-label="Navegação Principal">
        <a href="#top" className="brand">
          <span className="brand-mark">JN</span>
          <span className="brand-name">Jesimiel Nóbrega</span>
        </a>

        <div className="nav-right">
          <div className="nav-links">
            {NAV_ITEMS.map(({ id, key }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`nav-link ${activeSection === id ? "active" : ""}`}
              >
                {t.nav[key as keyof typeof t.nav]}
              </a>
            ))}
          </div>

          <div
            className="lang-group"
            role="group"
            aria-label="Seletor de idioma / Language selector"
          >
            {(["pt", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                className={`lang-btn ${lang === l ? "active" : ""}`}
                onClick={() => setLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="theme-btn"
            aria-label={
              isDark ? "Mudar para tema claro" : "Mudar para tema escuro"
            }
            onClick={toggleTheme}
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <a href="#contacto" className="cta-btn">
            {t.nav.contact}
          </a>

          <button
            type="button"
            className="burger-btn"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {NAV_ITEMS.map(({ id, key }) => (
            <a
              key={id}
              href={`#${id}`}
              className="mobile-nav-link"
              onClick={handleLinkClick}
            >
              {t.nav[key as keyof typeof t.nav]}
            </a>
          ))}
          <a href="#contacto" className="mobile-cta" onClick={handleLinkClick}>
            {t.nav.contact}
          </a>
        </div>
      )}
    </>
  );
}
