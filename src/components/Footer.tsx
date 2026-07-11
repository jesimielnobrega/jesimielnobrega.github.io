import { type Lang, T } from "../i18n";

interface FooterProps {
  lang: Lang;
}

export default function Footer({ lang }: FooterProps) {
  const t = T[lang];

  return (
    <footer className="relative z-1 max-w-[1440px] mx-auto px-[clamp(24px,6vw,80px)] pb-12 pt-7 flex flex-wrap gap-3.5 justify-between items-center border-t border-[var(--bdr-footer)] font-mono text-xs">
      <span className="text-[var(--txt-footer-a)]">
        © 2026 Jesimiel Nóbrega · Luanda, Angola
      </span>
      <span className="text-[var(--txt-footer-b)]">{t.footerRole}</span>
    </footer>
  );
}
