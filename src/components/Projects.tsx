import { motion } from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";
import { type Lang, T } from "../i18n";
import { buildProjects } from "../data";
import SectionHead from "./ui/SectionHead";

interface ProjectsProps {
  lang: Lang;
}

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

export default function Projects({ lang }: ProjectsProps) {
  const t = T[lang];
  const projects = buildProjects(t.proj);

  return (
    <motion.section
      id="projetos"
      aria-labelledby="proj-h"
      {...reveal}
      className="section"
    >
      <SectionHead num="02" id="proj-h" label={t.proj.heading} />
      <p className="proj-intro">{t.proj.intro}</p>

      <div className="proj-grid">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-card"
          >
            <div className="proj-card-top">
              <div className="proj-logo-box">
                <img src={p.logo} alt={`Logo de ${p.name}`} loading="lazy" />
              </div>
              <span data-arrow className="flex text-neutral-400">
                <ArrowUpRight size={20} />
              </span>
            </div>

            <span className="proj-scope">{p.scope}</span>

            <span className="proj-name">{p.name}</span>

            <p className="proj-desc">{p.desc}</p>

            <div className="proj-domain">{p.domain}</div>

            <div className="proj-tags">
              {p.stack.map((s) => (
                <span key={s} className="proj-tag">
                  {s}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      <div className="pynote">
        <Code2 size={20} color="#4d6bff" className="shrink-0" />
        <span className="pynote-text">{t.proj.pyNote}</span>
      </div>

      <div className="others-row">
        <span className="others-lbl">{t.proj.othersLabel} — </span>
        <span className="others-val">{t.proj.othersList}</span>
      </div>
    </motion.section>
  );
}
