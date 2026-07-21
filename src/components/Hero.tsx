import { motion, type MotionValue } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { type Lang, T } from "../i18n";

interface HeroProps {
  lang: Lang;
  glowY: MotionValue<number>;
}

const containerAnim = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const itemAnim = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero({ lang, glowY }: HeroProps) {
  const t = T[lang];

  return (
    <motion.header
      id="top"
      variants={containerAnim}
      initial="hidden"
      animate="show"
      className="hero-grid"
    >
      <div>
        <motion.div variants={itemAnim} className="hero-badge">
          <span className="badge-dot" />
          {t.hero.badge}
        </motion.div>

        <motion.h1 variants={itemAnim} className="hero-title">
          {t.hero.titleMain}{" "}
          <span className="text-gradient">{t.hero.titleAccent}</span>
        </motion.h1>

        <motion.p variants={itemAnim} className="hero-sub">
          {t.hero.sub}
        </motion.p>

        <motion.div variants={itemAnim} className="hero-ctas">
          <a href="#projetos" className="btn-primary">
            {t.hero.ctaProjects} <ArrowRight size={16} />
          </a>
          <a
            href={
              lang === "en"
                ? "cv/CV-JesimielNobrega-EN-Claro.html"
                : "cv/CV-JesimielNobrega-PT-Claro.html"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <FileText size={16} /> {t.hero.cvBtn}
          </a>
        </motion.div>

        <motion.div variants={itemAnim} className="flex flex-wrap gap-[clamp(28px,4vw,52px)]">
          {[
            { num: t.hero.stat1n, label: t.hero.stat1l },
            { num: t.hero.stat2n, label: t.hero.stat2l },
            { num: t.hero.stat3n, label: t.hero.stat3l },
          ].map((stat, i) => (
            <div key={i}>
              <div className="font-space font-bold text-[32px] text-[var(--txt-white)] tracking-[-1.5px]">
                {stat.num}
              </div>
              <div className="text-[13px] text-[var(--txt-subtle)] mt-[3px]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div variants={itemAnim} className="hero-photo">
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: -20,
            borderRadius: 26,
            y: glowY,
            background:
              "radial-gradient(circle at 50% 30%, #4d6bff, transparent 70%)",
            opacity: "var(--glow-op)",
            filter: "blur(32px)",
          }}
        />

        <div className="photo-frame">
          <img
            src="./assets/hero.png"
            alt="Retrato de Jesimiel Nóbrega"
            loading="eager"
          />
          <div className="photo-shade" />
        </div>

        <div className="photo-loc">
          <span className="text-accent">◆</span> Luanda · Angola
        </div>

        <div className="photo-chip animate-floaty">
          &lt;/&gt; {t.hero.badgeTech}
        </div>
      </motion.div>
    </motion.header>
  );
}
