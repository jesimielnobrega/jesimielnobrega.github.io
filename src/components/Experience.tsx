import { motion } from "framer-motion";
import { type Lang, T } from "../i18n";
import SectionHead from "./ui/SectionHead";

interface ExperienceProps {
  lang: Lang;
}

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

export default function Experience({ lang }: ExperienceProps) {
  const t = T[lang];

  return (
    <motion.section
      id="experiencia"
      aria-labelledby="exp-h"
      {...reveal}
      className="section"
    >
      <SectionHead num="03" id="exp-h" label={t.exp.heading} />

      <div className="exp-list">
        {t.exp.items.map((item, i) => (
          <div key={i} className="exp-item">
            <div className="exp-rail">
              <span className="exp-dot" />
              <span className="exp-line" />
            </div>

            <div className="pb-1.5">
              <div className="exp-head">
                <span className="exp-role">{item.role}</span>
                <span className="exp-period">{item.period}</span>
              </div>
              <div className="exp-org">{item.org}</div>
              <p className="exp-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
