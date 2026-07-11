import { type Lang, T } from "../i18n";

interface FooterProps {
  lang: Lang;
}

export default function Footer({ lang }: FooterProps) {
  const t = T[lang];

  return (
    <footer className="footer">
      <span className="footer-copy">
        © 2026 Jesimiel Nóbrega · Luanda, Angola
      </span>
      <span className="footer-role">{t.footerRole}</span>
    </footer>
  );
}
