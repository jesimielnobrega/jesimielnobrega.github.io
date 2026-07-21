import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from "lucide-react";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGame: () => void;
}

interface CommandLog {
  id: string;
  command?: string;
  output?: React.ReactNode;
  isError?: boolean;
}

export default function TerminalModal({ isOpen, onClose, onOpenGame }: TerminalModalProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: "welcome-1",
      output: (
        <div className="text-slate-300 space-y-1">
          <div className="text-sky-400 font-bold">Nóbrega Shell v2.4.0 (x86_64-pc-linux-gnu)</div>
          <div>Digite ou toque nos botões rápidos abaixo para executar os comandos.</div>
          <div>Dica: Digite <span className="text-emerald-400 font-mono font-bold">game</span> para abrir o Arcade ou <span className="text-purple-400 font-mono font-bold">matrix</span> para ativá-lo!</div>
        </div>
      ),
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const quickCommands = [
    { label: "help", color: "border-sky-500/40 text-sky-400" },
    { label: "about", color: "border-slate-700 text-slate-300" },
    { label: "projects", color: "border-amber-500/40 text-amber-400" },
    { label: "stack", color: "border-blue-500/40 text-blue-400" },
    { label: "game", color: "border-emerald-500/40 text-emerald-400 font-bold" },
    { label: "matrix", color: "border-purple-500/40 text-purple-400" },
    { label: "sudo hire", color: "border-emerald-500/60 text-emerald-300 font-bold" },
    { label: "cv", color: "border-slate-700 text-slate-300" },
    { label: "clear", color: "border-slate-800 text-slate-500" },
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Matrix Rain Canvas Effect
  useEffect(() => {
    if (!isMatrixActive) return;
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10B981";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, [isMatrixActive]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    const newCmdHistory = [...cmdHistory, cmdStr];
    setCmdHistory(newCmdHistory);
    setHistoryIdx(-1);

    let outputNode: React.ReactNode = null;
    let isError = false;

    switch (trimmed) {
      case "help":
        outputNode = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="text-amber-400 font-bold mb-1">Comandos Disponíveis:</div>
            <div><strong className="text-sky-400 w-24 inline-block">help</strong> — Exibe esta lista de ajuda</div>
            <div><strong className="text-sky-400 w-24 inline-block">about</strong> — Resumo sobre Jesimiel Nóbrega</div>
            <div><strong className="text-sky-400 w-24 inline-block">projects</strong> — Lista de projetos de impacto nacional/provincial</div>
            <div><strong className="text-sky-400 w-24 inline-block">stack</strong> — Principais tecnologias e ferramentas</div>
            <div><strong className="text-emerald-400 w-24 inline-block">game</strong> — Inicia o mini-jogo Arcade Bug Hunter</div>
            <div><strong className="text-emerald-400 w-24 inline-block">matrix</strong> — Ativa/Desativa o efeito chuva de código Matrix</div>
            <div><strong className="text-purple-400 w-24 inline-block">sudo hire</strong> — Redireciona diretamente para o WhatsApp do Jesimiel</div>
            <div><strong className="text-sky-400 w-24 inline-block">cv</strong> — Abre o Curriculum Vitae</div>
            <div><strong className="text-sky-400 w-24 inline-block">contact</strong> — Informações de contacto direto</div>
            <div><strong className="text-sky-400 w-24 inline-block">clear</strong> — Limpa a consola do terminal</div>
          </div>
        );
        break;

      case "about":
        outputNode = (
          <div className="text-xs text-slate-300 space-y-1">
            <div className="text-sky-400 font-bold">Jesimiel Nóbrega — Fullstack Developer & Tech Lead @ SOSOFT LDA</div>
            <p>Especialista na conceção e arquitetura de plataformas de larga escala em Angola (Acesso ETP, SIPE-GPEL, Portal do IPIL).</p>
            <p>Estudante de Engenharia Informática na Universidade Metodista de Angola.</p>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="text-amber-400 font-bold">🇦🇴 Projetos de Grande Escala em Produção:</div>
            <div>• <strong className="text-white">Acesso ETP</strong> (acessoetp.ao) — Plataforma Nacional de acesso ao Ensino Técnico-Profissional.</div>
            <div>• <strong className="text-white">SIPE / SIPE-GPEL</strong> (sipe.ao) — Sistema de gestão provincial para o Governo de Luanda.</div>
            <div>• <strong className="text-white">Portal do IPIL</strong> (ipil.ao) — Sistema institucional do Instituto Politécnico Industrial de Luanda.</div>
          </div>
        );
        break;

      case "stack":
        outputNode = (
          <div className="text-xs text-slate-300 space-y-1">
            <div className="text-sky-400 font-bold">Stack Tecnológica Principal:</div>
            <div>⚡ Frontend: React, Next.js, React Native, TypeScript, TailwindCSS, Inertia.js</div>
            <div>⚙️ Backend: Laravel (PHP), Node.js, Python, C# (.NET)</div>
            <div>🗄️ Bancos de Dados: PostgreSQL, MySQL, MongoDB, SQLite</div>
            <div>🐳 DevOps: Docker, GitHub Actions CI/CD, Linux</div>
          </div>
        );
        break;

      case "game":
      case "play":
        onOpenGame();
        outputNode = <div className="text-emerald-400 font-bold">🚀 A iniciar Bug Hunter Arcade...</div>;
        break;

      case "matrix":
        setIsMatrixActive((prev) => !prev);
        outputNode = (
          <div className="text-emerald-400 font-bold">
            {isMatrixActive ? "⏹️ Efeito Matrix desativado." : "🟢 Efeito Matrix ativado! Entrando na Matrix..."}
          </div>
        );
        break;

      case "sudo hire":
      case "hire":
        outputNode = (
          <div className="text-emerald-400 font-bold space-y-1">
            <div>[ROOT ACCESS GRANTED] A redirecionar para o WhatsApp do Jesimiel...</div>
          </div>
        );
        setTimeout(() => {
          window.open("https://wa.me/244942031240", "_blank");
        }, 1200);
        break;

      case "cv":
        window.open("cv/CV-JesimielNobrega-PT-Claro.html", "_blank");
        outputNode = <div className="text-sky-400">A abrir o Curriculum Vitae...</div>;
        break;

      case "contact":
        outputNode = (
          <div className="text-xs text-slate-300 space-y-1">
            <div>✉️ Email: <a href="mailto:jesimielnobrega25@gmail.com" className="text-sky-400 underline">jesimielnobrega25@gmail.com</a></div>
            <div>💼 LinkedIn: <a href="https://linkedin.com/in/jesimielnobrega" target="_blank" rel="noreferrer" className="text-sky-400 underline">Jesimiel Nóbrega</a></div>
            <div>📱 WhatsApp: <a href="https://wa.me/244942031240" target="_blank" rel="noreferrer" className="text-emerald-400 underline">+244 942 031 240</a></div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        isError = true;
        outputNode = (
          <div className="text-rose-400 text-xs">
            Comando não reconhecido: &quot;{cmdStr}&quot;. Digite ou toque em <strong className="text-amber-300">help</strong> para ver a lista.
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        command: cmdStr,
        output: outputNode,
        isError,
      },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIdx + 1 < cmdHistory.length ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || "");
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal("");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Matrix Background Canvas */}
      {isMatrixActive && (
        <canvas
          ref={matrixCanvasRef}
          className="fixed inset-0 z-40 pointer-events-none opacity-80"
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className={`relative bg-[#090D16] border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${
            isMaximized ? "w-full h-full max-w-none rounded-none" : "w-full max-w-[720px] h-[520px] sm:h-[480px]"
          }`}
        >
          {/* Top Titlebar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0F172A] border-b border-slate-800 select-none">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span onClick={onClose} className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 cursor-pointer block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 block" />
                <span onClick={() => setIsMaximized(!isMaximized)} className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 cursor-pointer block" />
              </div>
              <div className="flex items-center gap-2 ml-3 text-slate-400 font-mono text-xs">
                <TerminalIcon size={14} className="text-sky-400" />
                <span>jesimiel@nobrega-dev:~ (bash)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1 hover:text-white transition-colors cursor-pointer"
              >
                {isMaximized ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>
              <button onClick={onClose} className="p-1 hover:text-white transition-colors cursor-pointer">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Terminal Screen Logs */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="flex-1 p-4 font-mono text-xs sm:text-sm overflow-y-auto space-y-3 cursor-text selection:bg-sky-500 selection:text-white"
          >
            {history.map((log) => (
              <div key={log.id} className="space-y-1">
                {log.command && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400 font-bold">jesimiel@nobrega-dev:~$</span>
                    <span>{log.command}</span>
                  </div>
                )}
                {log.output && <div className="pl-2">{log.output}</div>}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Quick Mobile Touch Command Pills Bar */}
          <div className="px-3 py-2 bg-[#0C1220] border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-mono text-slate-500 shrink-0 flex items-center gap-1">
              <Sparkles size={11} className="text-amber-400" /> Atalhos:
            </span>
            {quickCommands.map((qc) => (
              <button
                key={qc.label}
                onClick={() => handleCommand(qc.label)}
                className={`px-2.5 py-1 rounded-lg border bg-slate-900/90 text-[11px] font-mono shrink-0 hover:bg-slate-800 transition-all cursor-pointer ${qc.color}`}
              >
                {qc.label}
              </button>
            ))}
          </div>

          {/* Active Prompt Input Bar */}
          <div className="p-3 bg-[#0D1322] border-t border-slate-800/80 flex items-center gap-2 font-mono text-xs sm:text-sm">
            <span className="text-emerald-400 font-bold shrink-0">jesimiel@nobrega-dev:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite um comando ou toque nos atalhos acima..."
              className="flex-1 bg-transparent text-slate-100 focus:outline-none placeholder:text-slate-600 border-none p-0"
              autoFocus
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="p-1.5 text-slate-400 hover:text-sky-400 transition-colors cursor-pointer"
            >
              <CornerDownLeft size={16} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
