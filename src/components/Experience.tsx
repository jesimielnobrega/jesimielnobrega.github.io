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

      <div className="flex flex-col">
        {t.exp.items.map((item, i) => (
          <div key={i} className="grid grid-cols-[auto_1fr] gap-6 pb-9">
            <div className="flex flex-col items-center">
              <span className="exp-dot" />
              <span className="exp-line" />
            </div>

            <div className="pb-1.5">
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <span className="exp-role">{item.role}</span>
                <span className="exp-period">{item.period}</span>
              </div>
              <div className="exp-org">{item.org}</div>
              <p className="text-[14.5px] leading-[1.65] text-[var(--txt-muted)] max-w-[700px]">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
