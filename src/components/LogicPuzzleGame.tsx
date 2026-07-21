import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, Trophy, CheckCircle2, Zap, BrainCircuit, Sparkles } from "lucide-react";

interface LogicPuzzleGameProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CardItem {
  id: number;
  label: string;
  category: string;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const TECH_CARDS = [
  { label: "React 18", category: "Frontend", icon: "⚛️" },
  { label: "Laravel", category: "Backend", icon: "🔴" },
  { label: "Docker", category: "DevOps", icon: "🐳" },
  { label: "PostgreSQL", category: "Database", icon: "🐘" },
  { label: "TypeScript", category: "Language", icon: "📘" },
  { label: "Redis Cache", category: "Performance", icon: "⚡" },
];

export default function LogicPuzzleGame({ isOpen, onClose }: LogicPuzzleGameProps) {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [time, setTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [bestTime, setBestTime] = useState<number | null>(null);

  // Initialize Game
  const initGame = () => {
    // Create pairs
    const pairs = [...TECH_CARDS, ...TECH_CARDS].map((item, index) => ({
      id: index,
      label: item.label,
      category: item.category,
      icon: item.icon,
      isFlipped: false,
      isMatched: false,
    }));

    // Shuffle cards
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }

    setCards(pairs);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setTime(0);
    setIsCompleted(false);
  };

  useEffect(() => {
    if (isOpen) {
      initGame();
      const savedBest = localStorage.getItem("logicpuzzle_besttime");
      if (savedBest) setBestTime(parseInt(savedBest, 10));
    }
  }, [isOpen]);

  // Timer
  useEffect(() => {
    if (!isOpen || isCompleted) return;
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isCompleted]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstIdx, secondIdx] = newFlipped;

      if (newCards[firstIdx].label === newCards[secondIdx].label) {
        // Match!
        setTimeout(() => {
          newCards[firstIdx].isMatched = true;
          newCards[secondIdx].isMatched = true;
          setCards([...newCards]);
          setFlippedCards([]);
          const newMatches = matches + 1;
          setMatches(newMatches);

          if (newMatches === TECH_CARDS.length) {
            setIsCompleted(true);
            if (!bestTime || time < bestTime) {
              setBestTime(time);
              localStorage.setItem("logicpuzzle_besttime", time.toString());
            }
          }
        }, 300);
      } else {
        // Unflip after delay
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards([...newCards]);
          setFlippedCards([]);
        }, 800);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-[560px] bg-[#0A0E1A] border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10 flex flex-col my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <BrainCircuit size={20} />
              </div>
              <div>
                <h3 className="font-space font-bold text-white text-base leading-none">
                  Logic Architect <span className="text-purple-400">· Desafio Lógico</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">Conecte os módulos do sistema em tempo recorde!</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors bg-slate-800/50 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Stats Header */}
          <div className="flex items-center justify-between px-5 py-3 bg-slate-950 border-b border-slate-800/80 font-mono text-xs text-slate-300">
            <div className="flex items-center gap-4">
              <span>TEMPO: <strong className="text-purple-400">{time}s</strong></span>
              <span>JOGADAS: <strong className="text-sky-400">{moves}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Trophy size={14} />
              <span>RECORD: {bestTime ? `${bestTime}s` : "--"}</span>
            </div>
          </div>

          {/* Puzzle Grid */}
          <div className="p-5 sm:p-6 bg-[#070A14] flex flex-col items-center">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 w-full max-w-[460px]">
              {cards.map((card, idx) => {
                const showContent = card.isFlipped || card.isMatched;

                return (
                  <motion.div
                    key={card.id}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleCardClick(idx)}
                    className={`aspect-square rounded-xl border p-2 flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all duration-300 ${
                      card.isMatched
                        ? "bg-purple-950/40 border-purple-500/50 text-purple-300 shadow-lg shadow-purple-500/10 opacity-80"
                        : card.isFlipped
                        ? "bg-slate-800 border-sky-400 text-white shadow-lg"
                        : "bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-500"
                    }`}
                  >
                    {showContent ? (
                      <div className="flex flex-col items-center justify-center gap-1 animate-fade-in">
                        <span className="text-2xl sm:text-3xl">{card.icon}</span>
                        <span className="text-[11px] font-semibold text-white leading-tight">{card.label}</span>
                        <span className="text-[9px] font-mono text-purple-400">{card.category}</span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-600">
                        <Sparkles size={16} />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Victory Overlay */}
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950/95 text-center backdrop-blur-md"
              >
                <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-3xl mb-3 text-purple-400 animate-bounce">
                  🧠
                </div>
                <h4 className="text-2xl font-space font-bold text-white mb-1">Raciocínio Impecável!</h4>
                <p className="text-xs sm:text-sm text-slate-400 mb-4 max-w-sm">
                  Concluiu o puzzle lógico em <strong className="text-purple-400">{time} segundos</strong> com apenas <strong className="text-sky-400">{moves} jogadas</strong>!
                </p>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 max-w-sm mb-6 text-xs text-slate-300 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                  <span>Capacidade analítica e visão arquitetural prontas para resolver os desafios do seu projeto.</span>
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={initGame}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center gap-2 transition-all border border-slate-700 text-xs sm:text-sm cursor-pointer"
                  >
                    <RotateCcw size={16} /> Jogar Novamente
                  </button>
                  <a
                    href="https://wa.me/244942031240"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium flex items-center gap-2 transition-all shadow-lg shadow-purple-600/20 text-xs sm:text-sm cursor-pointer"
                  >
                    <Zap size={16} /> Falar com o Jesimiel
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Controls */}
          <div className="px-5 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={initGame}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw size={14} /> <span>Reiniciar</span>
            </button>
            <span className="font-mono text-[11px]">System Architect Puzzle</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
