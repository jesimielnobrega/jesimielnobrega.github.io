import { motion } from "framer-motion";
import { type Lang, T } from "../i18n";
import { coreStack, marquee, courses } from "../data";
import SectionHead from "./ui/SectionHead";

interface StackProps {
  lang: Lang;
}

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

export default function Stack({ lang }: StackProps) {
  const t = T[lang];

  return (
    <motion.section
      id="stack"
      aria-labelledby="stack-h"
      {...reveal}
      className="py-20 relative z-1"
    >
      <div className="wrap">
        <SectionHead num="04" id="stack-h" label={t.skills.heading} />
        <p className="skills-intro">{t.skills.intro}</p>

        <div className="core-grid">
          {coreStack.map((core) => (
            <div key={core.name} className="core-tile">
              <div className="core-icons">
                {core.icon && (
                  <img
                    src={`./assets/tech/${core.icon}.svg`}
                    alt={core.name}
                    className="core-icon"
                    style={
                      core.invert
                        ? { filter: "invert(1) brightness(1.6)" }
                        : undefined
                    }
                  />
                )}
                {core.mono && (
                  <span className="core-mono">{core.mono}</span>
                )}
              </div>

              <span className="core-label">
                {core.name}
                {core.name2 && (
                  <>
                    <span> & </span>
                    <span>{core.name2}</span>
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-wrap mask-fade-x">
        <div className="marquee-track animate-scroll-x">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="marquee-item">
              <img
                src={`./assets/tech/${m.icon}.svg`}
                alt=""
                aria-hidden="true"
                className="marquee-icon"
                style={
                  m.invert ? { filter: "invert(1) brightness(1.6)" } : undefined
                }
              />
              <span className="marquee-label">{m.name}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="edu-grid">
          <div className="edu-card">
            <div className="edu-label">{t.edu.heading}</div>
            <div className="edu-item">
              <div className="edu-title">{t.edu.uniTitle}</div>
              <div className="edu-sub">{t.edu.uniSub}</div>
            </div>
            <div className="edu-item">
              <div className="edu-title">{t.edu.ipilTitle}</div>
              <div className="edu-sub">{t.edu.ipilSub}</div>
            </div>
          </div>

          <div className="edu-card">
            <div className="edu-label">{t.edu.certL}</div>
            <div className="chips">
              {courses.map((course) => (
                <span key={course} className="chip">
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
