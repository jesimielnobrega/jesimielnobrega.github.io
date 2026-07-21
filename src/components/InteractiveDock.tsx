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
      color: "hover:text-sky-400 hover:border-sky-500/50 hover:bg-sky-500/10",
      action: onOpenGame,
    },
    {
      id: "logicpuzzle",
      icon: BrainCircuit,
      label: "Logic Architect",
      sub: isPt ? "Desafio Lógico" : "Logic Puzzle",
      color: "hover:text-purple-400 hover:border-purple-500/50 hover:bg-purple-500/10",
      action: onOpenLogicGame,
    },
    {
      id: "terminal",
      icon: Terminal,
      label: "Nóbrega Shell",
      sub: "CLI (Ctrl+K)",
      color: "hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10",
      action: onOpenTerminal,
    },
    {
      id: "cv",
      icon: FileText,
      label: "Curriculum Vitae",
      sub: isPt ? "Formato A4" : "A4 Resume",
      color: "hover:text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/10",
      action: () => {
        window.open(isPt ? "cv/CV-JesimielNobrega-PT-Claro.html" : "cv/CV-JesimielNobrega-EN-Claro.html", "_blank");
      },
    },
    {
      id: "whatsapp",
      icon: MessageSquare,
      label: isPt ? "Falar Comigo" : "Chat Direct",
      sub: "WhatsApp",
      color: "hover:text-emerald-300 hover:border-emerald-500/50 hover:bg-emerald-500/10",
      action: () => {
        window.open("https://wa.me/244942031240", "_blank");
      },
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
      {/* Centered Glassmorphism Dock Pill */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="px-3.5 py-2.5 bg-[#090D16]/85 backdrop-blur-2xl border border-white/15 rounded-full shadow-2xl shadow-black/80 flex items-center gap-2 sm:gap-3"
      >
        {dockItems.map((item, idx) => {
          const Icon = item.icon;
          const isHovered = hoveredIdx === idx;

          return (
            <div key={item.id} className="relative group">
              {/* Pinterest/macOS Style Floating Tooltip Badge */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: -12, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-3 py-1.5 bg-[#090D16]/95 border border-slate-700/80 rounded-xl shadow-xl pointer-events-none whitespace-nowrap z-50 flex flex-col items-center backdrop-blur-md"
                  >
                    <span className="text-xs font-bold text-white leading-tight">{item.label}</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">{item.sub}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dock Icon Button */}
              <motion.button
                whileHover={{ scale: 1.22, y: -4 }}
                whileTap={{ scale: 0.92 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={item.action}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-slate-800/80 border border-slate-700/60 text-slate-300 transition-all duration-200 cursor-pointer shadow-md ${item.color}`}
              >
                <Icon size={20} />
              </motion.button>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
