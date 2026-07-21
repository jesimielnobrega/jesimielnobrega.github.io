import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Terminal, FileText, MessageSquare, Sparkles } from "lucide-react";

interface InteractiveDockProps {
  onOpenGame: () => void;
  onOpenTerminal: () => void;
  lang: "pt" | "en";
}

export default function InteractiveDock({ onOpenGame, onOpenTerminal, lang }: InteractiveDockProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const isPt = lang === "pt";

  const dockItems = [
    {
      id: "game",
      icon: Gamepad2,
      label: isPt ? "Mini-Jogo Arcade" : "Arcade Mini-Game",
      sub: "Bug Hunter",
      color: "from-sky-500 to-blue-600",
      textColor: "text-sky-400",
      action: () => {
        onOpenGame();
        setIsOpen(false);
      },
    },
    {
      id: "terminal",
      icon: Terminal,
      label: isPt ? "Terminal CLI" : "CLI Terminal",
      sub: "Nóbrega Shell (Ctrl+K)",
      color: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-400",
      action: () => {
        onOpenTerminal();
        setIsOpen(false);
      },
    },
    {
      id: "cv",
      icon: FileText,
      label: isPt ? "Curriculum Vitae" : "Resume / CV",
      sub: isPt ? "Formato A4" : "A4 Printable",
      color: "from-amber-500 to-orange-600",
      textColor: "text-amber-400",
      action: () => {
        window.open(isPt ? "cv/CV-JesimielNobrega-PT-Claro.html" : "cv/CV-JesimielNobrega-EN-Claro.html", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "contact",
      icon: MessageSquare,
      label: isPt ? "Contacto Direto" : "Direct Chat",
      sub: "WhatsApp",
      color: "from-emerald-600 to-green-500",
      textColor: "text-emerald-300",
      action: () => {
        window.open("https://wa.me/244942031240", "_blank");
        setIsOpen(false);
      },
    },
  ];

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end"
      onMouseLeave={() => {
        setHoveredIdx(null);
      }}
    >
      {/* Dock Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="mb-3 p-2 bg-[#0F172A]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-sky-950/40 flex flex-col sm:flex-row items-center gap-2"
          >
            {dockItems.map((item, idx) => {
              const Icon = item.icon;
              const isHovered = hoveredIdx === idx;

              return (
                <div key={item.id} className="relative group">
                  {/* Floating Tooltip */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: -8 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-3 py-1.5 bg-[#090D16]/95 border border-slate-700/80 rounded-xl shadow-xl pointer-events-none whitespace-nowrap z-50 flex flex-col items-center"
                      >
                        <span className="text-xs font-semibold text-white">{item.label}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{item.sub}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Dock Item Button */}
                  <motion.button
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onClick={item.action}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700/60 shadow-md transition-colors ${item.textColor}`}
                  >
                    <Icon size={22} />
                  </motion.button>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Glassmorphism Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0F172A]/90 hover:bg-[#1E293B] border border-sky-500/40 shadow-xl shadow-sky-500/15 backdrop-blur-xl transition-all cursor-pointer overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

        <Sparkles size={18} className="text-amber-400 animate-spin-slow shrink-0" />
        <span className="font-space font-medium text-xs text-white tracking-wide">
          {isPt ? "Central Interativa" : "Interactive Hub"}
        </span>

        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
      </motion.button>
    </div>
  );
}
