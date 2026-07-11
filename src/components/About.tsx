import { motion } from "framer-motion";
import { type Lang, T } from "../i18n";
import SectionHead from "./ui/SectionHead";

interface AboutProps {
  lang: Lang;
}

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

export default function About({ lang }: AboutProps) {
  const t = T[lang];

  return (
    <motion.section
      id="sobre"
      aria-labelledby="sobre-h"
      {...reveal}
      className="section"
    >
      <SectionHead num="01" id="sobre-h" label={t.about.heading} />

      <div className="about-grid">
        <div>
          <p className="lead-text">{t.about.p1}</p>
          <p className="para-text">{t.about.p2}</p>
          <p className="para-text">{t.about.p3}</p>
        </div>

        <div className="info-cards">
          {[
            { label: t.about.focusL, value: t.about.focusV },
            { label: t.about.availL, value: t.about.availV },
            { label: t.about.langsL, value: t.about.langsV },
          ].map((item, i) => (
            <div key={i} className="info-card">
              <div className="info-label">{item.label}</div>
              <div className="info-value">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
