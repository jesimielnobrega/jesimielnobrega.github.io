import { useState, useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { type Lang } from "./i18n";
import { useTheme } from "./hooks/useTheme";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { Terminal as TerminalIcon, Gamepad2 } from "lucide-react";

import ScrollProgress from "./components/ui/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Stack from "./components/Stack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BugHunterGame from "./components/BugHunterGame";
import TerminalModal from "./components/TerminalModal";

export default function App() {
  const [lang, setLang] = useState<Lang>("pt");
  const { isDark, toggleTheme } = useTheme();
  const activeSection = useScrollSpy();

  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Global Keyboard Shortcut listener (Ctrl+K / Cmd+K to open Terminal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const glowY = useTransform(heroScrollProgress, [0, 1], [0, -46]);

  return (
    <div style={{ position: "relative" }}>
      <ScrollProgress />

      <div className="bg-grid mask-fade-top" />

      <div
        aria-hidden="true"
        className="animate-pulse-glow fixed -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #4d6bff 0%, transparent 60%)",
          filter: "blur(30px)",
          opacity: "var(--glow-op)",
        }}
      />

      <Navbar
        lang={lang}
        setLang={setLang}
        isDark={isDark}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
      />

      <main>
        <span ref={heroRef} style={{ display: "block" }}>
          <Hero lang={lang} glowY={glowY} />
        </span>

        <About lang={lang} />

        <Projects lang={lang} />

        <Experience lang={lang} />

        <Stack lang={lang} />

        <Contact lang={lang} />
      </main>

      <Footer lang={lang} />

      {/* Floating Interactive Dock (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col sm:flex-row items-end sm:items-center gap-2.5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsGameOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0F172A]/90 hover:bg-[#1E293B] text-sky-400 border border-sky-500/30 shadow-lg shadow-sky-500/10 backdrop-blur-md font-mono text-xs transition-all"
        >
          <Gamepad2 size={16} className="animate-pulse text-amber-400" />
          <span>Mini-Game</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsTerminalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0F172A]/90 hover:bg-[#1E293B] text-slate-200 border border-slate-700 shadow-lg backdrop-blur-md font-mono text-xs transition-all"
        >
          <TerminalIcon size={15} className="text-emerald-400" />
          <span>Terminal <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-400">Ctrl+K</kbd></span>
        </motion.button>
      </div>

      {/* Bug Hunter Arcade Modal */}
      <BugHunterGame
        isOpen={isGameOpen}
        onClose={() => setIsGameOpen(false)}
      />

      {/* Terminal CLI Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenGame={() => {
          setIsTerminalOpen(false);
          setIsGameOpen(true);
        }}
      />
    </div>
  );
}
