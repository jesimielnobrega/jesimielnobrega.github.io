import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, BrainCircuit, Terminal, FileText, MessageSquare } from "lucide-react";

interface InteractiveDockProps {
  onOpenGame: () => void;
  onOpenLogicGame: () => void;
  onOpenTerminal: () => void;
  lang: "pt" | "en";
}

export default function InteractiveDock({
  onOpenGame,
  onOpenLogicGame,
  onOpenTerminal,
  lang,
}: InteractiveDockProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const isPt = lang === "pt";

  const dockItems = [
    {
      id: "bughunter",
      icon: Gamepad2,
      label: "Bug Hunter",
      sub: isPt ? "Arcade Mini-Game" : "Arcade Mini-Game",
      colorClass: "hover:text-sky-400 hover:border-sky-500/50",
      action: onOpenGame,
    },
    {
      id: "logicpuzzle",
      icon: BrainCircuit,
      label: "Logic Architect",
      sub: isPt ? "Desafio Lógico" : "Logic Puzzle",
      colorClass: "hover:text-purple-400 hover:border-purple-500/50",
      action: onOpenLogicGame,
    },
    {
      id: "terminal",
      icon: Terminal,
      label: "Nóbrega Shell",
      sub: "CLI (Ctrl+K)",
      colorClass: "hover:text-emerald-400 hover:border-emerald-500/50",
      action: onOpenTerminal,
    },
    {
      id: "cv",
      icon: FileText,
      label: "Curriculum Vitae",
      sub: isPt ? "Formato A4" : "A4 Resume",
      colorClass: "hover:text-amber-400 hover:border-amber-500/50",
      action: () => {
        window.open(isPt ? "cv/CV-JesimielNobrega-PT-Claro.html" : "cv/CV-JesimielNobrega-EN-Claro.html", "_blank");
      },
    },
    {
      id: "whatsapp",
      icon: MessageSquare,
      label: isPt ? "Falar Comigo" : "Chat Direct",
      sub: "WhatsApp",
      colorClass: "hover:text-emerald-300 hover:border-emerald-500/50",
      action: () => {
        window.open("https://wa.me/244942031240", "_blank");
      },
    },
  ];

  // Subtle, elegant magnification scale and offset to prevent clipping or extreme overflow
  const getScale = (idx: number) => {
    if (hoveredIdx === null) return 1;
    const distance = Math.abs(hoveredIdx - idx);
    if (distance === 0) return 1.18;
    if (distance === 1) return 1.08;
    return 1;
  };

  const getYOffset = (idx: number) => {
    if (hoveredIdx === null) return 0;
    const distance = Math.abs(hoveredIdx - idx);
    if (distance === 0) return -4;
    if (distance === 1) return -2;
    return 0;
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none">
      {/* Centered Theme-Aware Glassmorphism Dock Container */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        style={{
          background: "var(--bg-nav)",
          borderColor: "var(--bdr-strong)",
          boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3), 0 0 0 1px var(--bdr-strong)",
        }}
        className="px-4 py-3 backdrop-blur-2xl border rounded-full flex items-center gap-2.5 sm:gap-3.5 transition-all duration-300"
      >
        {dockItems.map((item, idx) => {
          const Icon = item.icon;
          const isHovered = hoveredIdx === idx;
          const scale = getScale(idx);
          const yOffset = getYOffset(idx);

          return (
            <div key={item.id} className="relative group">
              {/* Floating Tooltip Badge */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.92 }}
                    animate={{ opacity: 1, y: -18, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 450, damping: 25 }}
                    style={{
                      background: "var(--bg-mobile)",
                      borderColor: "var(--bdr-strong)",
                      color: "var(--txt)",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                    }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 border rounded-xl pointer-events-none whitespace-nowrap z-50 flex flex-col items-center backdrop-blur-2xl"
                  >
                    <span className="text-xs font-bold leading-tight" style={{ color: "var(--txt-white)" }}>
                      {item.label}
                    </span>
                    <span className="text-[10px] font-mono mt-0.5" style={{ color: "var(--txt-subtle)" }}>
                      {item.sub}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dock Icon Button with Physics Magnification */}
              <motion.button
                animate={{ scale, y: yOffset }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
                whileTap={{ scale: 0.94 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={item.action}
                style={{
                  background: "var(--bg-surface)",
                  borderColor: "var(--bdr)",
                  color: "var(--txt-card)",
                }}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border transition-colors duration-200 cursor-pointer shadow-sm ${item.colorClass}`}
              >
                <Icon size={19} />
              </motion.button>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
