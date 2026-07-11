import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { type Lang, T } from "../i18n";

interface ContactProps {
  lang: Lang;
}

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

const GitHubLogo = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="block"
  >
    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-1.7c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
  </svg>
);

const LinkedInLogo = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="block"
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33 0-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

export default function Contact({ lang }: ContactProps) {
  const t = T[lang];

  return (
    <motion.section
      id="contacto"
      aria-labelledby="cont-h"
      {...reveal}
      className="section"
    >
      <div className="contact-card">
        <div
          aria-hidden="true"
          className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-[600px] h-[480px]"
          style={{
            background: "radial-gradient(circle, #4d6bff, transparent 65%)",
            opacity: 0.18,
            filter: "blur(48px)",
          }}
        />

        <div className="relative">
          <div className="contact-eyebrow">05 · {t.contact.eyebrow}</div>
          <h2 id="cont-h" className="contact-title">
            {t.contact.heading}
          </h2>
          <p className="contact-sub">{t.contact.sub}</p>

          <div className="flex flex-wrap gap-3 justify-center mb-9">
            <a
              href="mailto:jesimielnobrega25@gmail.com"
              className="contact-mail"
            >
              <Mail size={17} /> jesimielnobrega25@gmail.com
            </a>
            <a
              href="https://wa.me/244942031240"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-wa"
            >
              <Phone size={17} /> +244 942 031 240
            </a>
          </div>

          <div className="flex gap-4 justify-center items-center">
            <a
              href="https://github.com/jesimielnobrega"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="social-link"
            >
              <GitHubLogo /> @jesimielnobrega
            </a>
            <span className="dot-sep">·</span>
            <a
              href="https://www.linkedin.com/in/jesimielnobrega/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="social-link"
            >
              <LinkedInLogo /> Jesimiel Nóbrega
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
