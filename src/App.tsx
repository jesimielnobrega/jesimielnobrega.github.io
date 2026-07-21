import { useState, useEffect, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { type Lang } from "./i18n";
import { useTheme } from "./hooks/useTheme";
import { useScrollSpy } from "./hooks/useScrollSpy";

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
import InteractiveDock from "./components/InteractiveDock";

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

      {/* Glassmorphism Interactive Floating Dock */}
      <InteractiveDock
        lang={lang}
        onOpenGame={() => setIsGameOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

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
