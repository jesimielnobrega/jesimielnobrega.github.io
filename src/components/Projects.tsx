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
      <p className="text-[15.5px] text-[var(--txt-subtle)] mb-9 max-w-[640px]">
        {t.proj.intro}
      </p>

      <div className="proj-grid">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-card"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="grid place-items-center w-[54px] h-[54px] rounded-[14px] bg-white border border-[var(--bdr-logo)] p-2">
                <img src={p.logo} alt={`Logo de ${p.name}`} loading="lazy" className="w-full h-full object-contain block" />
              </div>
              <span data-arrow className="flex text-neutral-400">
                <ArrowUpRight size={20} />
              </span>
            </div>

            <span className="proj-scope">{p.scope}</span>

            <span className="proj-name">{p.name}</span>

            <p className="text-sm leading-relaxed text-[var(--txt-muted)] mb-[18px] flex-1">
              {p.desc}
            </p>

            <div className="proj-domain">{p.domain}</div>

            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="proj-tag">
                  {s}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-[22px] p-[18px_22px] bg-[var(--bg-pynote)] border border-[var(--bdr-pynote)] rounded-[14px]">
        <Code2 size={20} color="#4d6bff" className="shrink-0" />
        <span className="text-sm text-[var(--txt-pynote)] leading-relaxed">
          {t.proj.pyNote}
        </span>
      </div>

      <div className="mt-[22px]">
        <span className="font-mono text-xs text-[var(--txt-dim)] uppercase tracking-[1.5px]">
          {t.proj.othersLabel} —{" "}
        </span>
        <span className="text-sm text-[var(--txt-muted)]">
          {t.proj.othersList}
        </span>
      </div>
    </motion.section>
  );
}
