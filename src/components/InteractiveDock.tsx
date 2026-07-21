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
      activeColorStyle: {
        color: "#38BDF8",
        borderColor: "rgba(56, 189, 248, 0.7)",
        background: "rgba(56, 189, 248, 0.12)",
        boxShadow: "0 0 16px rgba(56, 189, 248, 0.35)",
      },
      action: onOpenGame,
    },
    {
      id: "logicpuzzle",
      icon: BrainCircuit,
      label: "Logic Architect",
      sub: isPt ? "Desafio Lógico" : "Logic Puzzle",
      activeColorStyle: {
        color: "#A855F7",
        borderColor: "rgba(168, 85, 247, 0.7)",
        background: "rgba(168, 85, 247, 0.12)",
        boxShadow: "0 0 16px rgba(168, 85, 247, 0.35)",
      },
      action: onOpenLogicGame,
    },
    {
      id: "terminal",
      icon: Terminal,
      label: "Nóbrega Shell",
      sub: "CLI (Ctrl+K)",
      activeColorStyle: {
        color: "#10B981",
        borderColor: "rgba(16, 185, 129, 0.7)",
        background: "rgba(16, 185, 129, 0.12)",
        boxShadow: "0 0 16px rgba(16, 185, 129, 0.35)",
      },
      action: onOpenTerminal,
    },
    {
      id: "cv",
      icon: FileText,
      label: "Curriculum Vitae",
      sub: isPt ? "Formato A4" : "A4 Resume",
      activeColorStyle: {
        color: "#F59E0B",
        borderColor: "rgba(245, 158, 11, 0.7)",
        background: "rgba(245, 158, 11, 0.12)",
        boxShadow: "0 0 16px rgba(245, 158, 11, 0.35)",
      },
      action: () => {
        window.open(isPt ? "cv/CV-JesimielNobrega-PT-Claro.html" : "cv/CV-JesimielNobrega-EN-Claro.html", "_blank");
      },
    },
    {
      id: "whatsapp",
      icon: MessageSquare,
      label: isPt ? "Falar Comigo" : "Chat Direct",
      sub: "WhatsApp",
      activeColorStyle: {
        color: "#22C55E",
        borderColor: "rgba(34, 197, 94, 0.7)",
        background: "rgba(34, 197, 94, 0.12)",
        boxShadow: "0 0 16px rgba(34, 197, 94, 0.35)",
      },
      action: () => {
        window.open("https://wa.me/244942031240", "_blank");
      },
    },
  ];

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
          boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.25), 0 0 0 1px var(--bdr-strong)",
        }}
        className="px-4 py-3 backdrop-blur-2xl border rounded-full flex items-center gap-2.5 sm:gap-3.5 transition-colors duration-300"
      >
        {dockItems.map((item, idx) => {
          const Icon = item.icon;
          const isHovered = hoveredIdx === idx;

          return (
            <div key={item.id} className="relative group">
              {/* Floating Tooltip Badge */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.92 }}
                    animate={{ opacity: 1, y: -16, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 450, damping: 25 }}
                    style={{
                      background: "var(--bg-mobile)",
                      borderColor: item.activeColorStyle.borderColor,
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

              {/* Dock Icon Button - Isolated Hover Scaling & Vibrant Highlight Color */}
              <motion.button
                animate={{
                  scale: isHovered ? 1.16 : 1,
                  y: isHovered ? -3 : 0,
                }}
                transition={{ type: "spring", stiffness: 450, damping: 24 }}
                whileTap={{ scale: 0.94 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={item.action}
                style={
                  isHovered
                    ? item.activeColorStyle
                    : {
                        background: "var(--bg-surface)",
                        borderColor: "var(--bdr)",
                        color: "var(--txt-card)",
                      }
                }
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border transition-colors duration-200 cursor-pointer shadow-sm"
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
