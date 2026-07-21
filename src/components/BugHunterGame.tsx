import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, RotateCcw, Trophy, Volume2, VolumeX, MessageSquare, Zap, ArrowLeft, ArrowRight, Flame } from "lucide-react";

interface BugHunterGameProps {
  isOpen: boolean;
  onClose: () => void;
}

class SoundFX {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playShoot() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Ignore
    }
  }

  playHit() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Ignore
    }
  }

  playLevelUp() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.setValueAtTime(554, this.ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(659, this.ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {
      // Ignore
    }
  }
}

const sfx = new SoundFX();

export default function BugHunterGame({ isOpen, onClose }: BugHunterGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<"start" | "playing" | "gameover">("start");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [soundOn, setSoundOn] = useState(true);
  const [levelUpToast, setLevelUpToast] = useState<string | null>(null);

  // Virtual Touch Controls State
  const touchCtrlRef = useRef({ left: false, right: false, fire: false });

  const scoreRef = useRef(0);
  const levelRef = useRef(1);

  useEffect(() => {
    const saved = localStorage.getItem("bughunter_highscore");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  useEffect(() => {
    sfx.enabled = soundOn;
  }, [soundOn]);

  const triggerLevelUpToast = useCallback((lvlName: string) => {
    setLevelUpToast(lvlName);
    sfx.playLevelUp();
    setTimeout(() => setLevelUpToast(null), 2000);
  }, []);

  useEffect(() => {
    if (!isOpen || gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    scoreRef.current = 0;
    levelRef.current = 1;
    setScore(0);
    setLevel(1);

    const player = {
      x: canvas.width / 2 - 25,
      y: canvas.height - 45,
      width: 50,
      height: 32,
      speed: 450,
    };

    let lasers: Array<{ x: number; y: number; width: number; height: number; speed: number }> = [];
    let bugs: Array<{ x: number; y: number; width: number; height: number; speed: number; label: string; color: string; hp: number }> = [];
    let particles: Array<{ x: number; y: number; vx: number; vy: number; color: string; alpha: number }> = [];

    const bugTypes = [
      { label: "NullPointer", color: "#EF4444", hp: 1, speed: 140 },
      { label: "500 Error", color: "#F59E0B", hp: 2, speed: 110 },
      { label: "Merge Conflict", color: "#EC4899", hp: 2, speed: 125 },
      { label: "Memory Leak", color: "#8B5CF6", hp: 3, speed: 90 },
      { label: "Infinite Loop", color: "#10B981", hp: 1, speed: 190 },
    ];

    let spawnTimer = 0;
    let lastShoot = 0;
    const keys: Record<string, boolean> = {};

    const fireLaser = () => {
      if (performance.now() - lastShoot > 170) {
        lasers.push({
          x: player.x + player.width / 2 - 3,
          y: player.y,
          width: 6,
          height: 14,
          speed: 650,
        });
        sfx.playShoot();
        lastShoot = performance.now();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ([" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
      keys[e.key] = true;

      if (e.key === " ") {
        fireLaser();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const mouseX = (e.clientX - rect.left) * scaleX;
      player.x = Math.max(0, Math.min(canvas.width - player.width, mouseX - player.width / 2));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const touchX = (e.touches[0].clientX - rect.left) * scaleX;
        player.x = Math.max(0, Math.min(canvas.width - player.width, touchX - player.width / 2));
      }
    };

    const handleCanvasClick = () => {
      fireLaser();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("click", handleCanvasClick);

    const createExplosion = (x: number, y: number, color: string) => {
      if (particles.length > 40) particles.splice(0, 15);
      for (let i = 0; i < 8; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 220,
          vy: (Math.random() - 0.5) * 220,
          color,
          alpha: 1,
        });
      }
    };

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#090D16";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(77, 107, 255, 0.06)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Move Player (Keyboard or Touch DPad)
      if (keys["ArrowLeft"] || keys["a"] || keys["A"] || touchCtrlRef.current.left) {
        player.x = Math.max(0, player.x - player.speed * dt);
      }
      if (keys["ArrowRight"] || keys["d"] || keys["D"] || touchCtrlRef.current.right) {
        player.x = Math.min(canvas.width - player.width, player.x + player.speed * dt);
      }
      if (touchCtrlRef.current.fire) {
        fireLaser();
      }

      // Draw Ship
      ctx.save();
      ctx.fillStyle = "#38BDF8";
      ctx.shadowColor = "#38BDF8";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(player.x + player.width / 2, player.y);
      ctx.lineTo(player.x + player.width, player.y + player.height);
      ctx.lineTo(player.x, player.y + player.height);
      ctx.closePath();
      ctx.fill();

      // Thruster
      ctx.fillStyle = "#F59E0B";
      ctx.beginPath();
      ctx.moveTo(player.x + 18, player.y + player.height);
      ctx.lineTo(player.x + 25, player.y + player.height + 6 + Math.random() * 6);
      ctx.lineTo(player.x + 32, player.y + player.height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Level Up Check
      const calcLevel = Math.floor(scoreRef.current / 100) + 1;
      if (calcLevel !== levelRef.current) {
        levelRef.current = calcLevel;
        setLevel(calcLevel);
        const titles = ["Junior Dev", "Pleno Dev", "Senior Dev", "Tech Lead", "Software Architect"];
        const title = titles[Math.min(calcLevel - 1, titles.length - 1)];
        triggerLevelUpToast(`NÍVEL ${calcLevel}: ${title.toUpperCase()}!`);
      }

      // Spawn Bugs
      spawnTimer += dt;
      const spawnInterval = Math.max(0.4, 1.2 - (levelRef.current - 1) * 0.15);

      if (spawnTimer > spawnInterval) {
        spawnTimer = 0;
        const bType = bugTypes[Math.floor(Math.random() * bugTypes.length)];
        bugs.push({
          x: Math.random() * (canvas.width - 90),
          y: -30,
          width: 85,
          height: 28,
          speed: bType.speed + (levelRef.current - 1) * 20,
          label: bType.label,
          color: bType.color,
          hp: bType.hp,
        });
      }

      // Lasers
      for (let lIndex = lasers.length - 1; lIndex >= 0; lIndex--) {
        const laser = lasers[lIndex];
        laser.y -= laser.speed * dt;

        ctx.save();
        ctx.fillStyle = "#60A5FA";
        ctx.shadowColor = "#60A5FA";
        ctx.shadowBlur = 8;
        ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
        ctx.restore();

        if (laser.y < -20) lasers.splice(lIndex, 1);
      }

      // Bugs
      for (let bIndex = bugs.length - 1; bIndex >= 0; bIndex--) {
        const bug = bugs[bIndex];
        bug.y += bug.speed * dt;

        ctx.save();
        ctx.fillStyle = bug.color;
        ctx.shadowColor = bug.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.roundRect(bug.x, bug.y, bug.width, bug.height, 6);
        ctx.fill();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`🐛 ${bug.label}`, bug.x + bug.width / 2, bug.y + 18);
        ctx.restore();

        // Player Collision
        if (
          bug.y + bug.height >= player.y &&
          bug.x + bug.width >= player.x &&
          bug.x <= player.x + player.width
        ) {
          createExplosion(player.x + player.width / 2, player.y, "#38BDF8");
          sfx.playHit();
          setGameState("gameover");
          return;
        }

        // Bottom Reached
        if (bug.y > canvas.height) {
          sfx.playHit();
          setGameState("gameover");
          return;
        }

        // Laser Hits
        for (let lIndex = lasers.length - 1; lIndex >= 0; lIndex--) {
          const laser = lasers[lIndex];
          if (
            laser.x >= bug.x &&
            laser.x <= bug.x + bug.width &&
            laser.y <= bug.y + bug.height &&
            laser.y >= bug.y
          ) {
            bug.hp--;
            lasers.splice(lIndex, 1);
            createExplosion(laser.x, laser.y, bug.color);

            if (bug.hp <= 0) {
              sfx.playHit();
              scoreRef.current += 15;
              setScore(scoreRef.current);
              bugs.splice(bIndex, 1);

              setHighScore((prev) => {
                const next = Math.max(prev, scoreRef.current);
                localStorage.setItem("bughunter_highscore", next.toString());
                return next;
              });
              break;
            }
          }
        }
      }

      // Particles
      for (let pIndex = particles.length - 1; pIndex >= 0; pIndex--) {
        const p = particles[pIndex];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.alpha -= 2.0 * dt;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.alpha <= 0) particles.splice(pIndex, 1);
      }

      if (gameState === "playing") {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [isOpen, gameState, triggerLevelUpToast]);

  const startGame = () => {
    scoreRef.current = 0;
    levelRef.current = 1;
    setScore(0);
    setLevel(1);
    setGameState("playing");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-[620px] bg-[#0B0F19] border border-sky-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-sky-500/10 flex flex-col my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800/80 bg-slate-900/90">
            <div className="flex items-center gap-2.5">
              <span className="text-xl sm:text-2xl">👾</span>
              <div>
                <h3 className="font-space font-bold text-white text-sm sm:text-base leading-none">
                  Bug Hunter <span className="text-sky-400">· Arcade</span>
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-1">Elimine os bugs e escale o sistema!</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundOn(!soundOn)}
                className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors bg-slate-800/50 cursor-pointer"
                title={soundOn ? "Mutar Som" : "Ativar Som"}
              >
                {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors bg-slate-800/50 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-slate-950 border-b border-slate-800/60 font-mono text-xs text-slate-300">
            <div className="flex items-center gap-3 sm:gap-5">
              <span>PONTOS: <strong className="text-sky-400">{score}</strong></span>
              <span>NÍVEL: <strong className="text-amber-400">{level}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Trophy size={14} />
              <span>{highScore}</span>
            </div>
          </div>

          {/* Game Canvas Box */}
          <div className="relative w-full aspect-[4/3] sm:h-[380px] bg-slate-950 flex items-center justify-center overflow-hidden">
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              className="w-full h-full cursor-crosshair touch-none select-none"
            />

            {/* Level Up Notification Toast */}
            {levelUpToast && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="absolute top-4 inset-x-0 mx-auto w-max px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-md"
              >
                <Zap size={14} className="animate-bounce text-amber-400" />
                <span>{levelUpToast}</span>
              </motion.div>
            )}

            {/* Start Overlay */}
            {gameState === "start" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-950/90 text-center">
                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center mb-3 text-3xl animate-pulse">
                  🚀
                </div>
                <h4 className="text-xl sm:text-2xl font-space font-bold text-white mb-2">Bug Hunter: Tech Lead Edition</h4>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-5 leading-relaxed">
                  No PC: **Setas / Rato** · **Espaço** para disparar. <br />
                  No Telemóvel: Use os **Botões de Toque** ou toque direto no ecrã!
                </p>

                <button
                  onClick={startGame}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold flex items-center gap-2 hover:opacity-90 shadow-lg shadow-sky-500/20 transition-all hover:scale-105 cursor-pointer"
                >
                  <Play size={18} /> Iniciar Jogo
                </button>
              </div>
            )}

            {/* GameOver Overlay */}
            {gameState === "gameover" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-950/95 text-center animate-fade-in">
                <div className="text-4xl mb-2">💥</div>
                <h4 className="text-xl sm:text-2xl font-space font-bold text-rose-500 mb-1">Bug em Produção!</h4>
                <p className="text-xs sm:text-sm text-slate-400 mb-4">
                  Eliminou <strong className="text-white">{Math.floor(score / 15)} bugs</strong> e alcançou <strong className="text-sky-400">{score} pontos</strong>!
                </p>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 max-w-sm mb-5 text-xs text-slate-300 leading-relaxed">
                  💡 <em>&quot;Precisa de um Tech Lead para eliminar os bugs e acelerar a sua equipa?&quot;</em>
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={startGame}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center gap-2 transition-all border border-slate-700 text-xs sm:text-sm cursor-pointer"
                  >
                    <RotateCcw size={16} /> Jogar De Novo
                  </button>
                  <a
                    href="https://wa.me/244942031240"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20 text-xs sm:text-sm cursor-pointer"
                  >
                    <MessageSquare size={16} /> Falar com o Jesimiel
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Virtual Mobile Touch Controls Bar */}
          {gameState === "playing" && (
            <div className="px-4 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3">
              {/* Movement DPad */}
              <div className="flex items-center gap-2">
                <button
                  onMouseDown={() => (touchCtrlRef.current.left = true)}
                  onMouseUp={() => (touchCtrlRef.current.left = false)}
                  onTouchStart={() => (touchCtrlRef.current.left = true)}
                  onTouchEnd={() => (touchCtrlRef.current.left = false)}
                  className="w-12 h-11 rounded-xl bg-slate-800 active:bg-sky-600/80 border border-slate-700 text-white flex items-center justify-center cursor-pointer select-none active:scale-95 transition-all"
                  title="Mover para Esquerda"
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  onMouseDown={() => (touchCtrlRef.current.right = true)}
                  onMouseUp={() => (touchCtrlRef.current.right = false)}
                  onTouchStart={() => (touchCtrlRef.current.right = true)}
                  onTouchEnd={() => (touchCtrlRef.current.right = false)}
                  className="w-12 h-11 rounded-xl bg-slate-800 active:bg-sky-600/80 border border-slate-700 text-white flex items-center justify-center cursor-pointer select-none active:scale-95 transition-all"
                  title="Mover para Direita"
                >
                  <ArrowRight size={20} />
                </button>
              </div>

              {/* Virtual Fire Button */}
              <button
                onMouseDown={() => (touchCtrlRef.current.fire = true)}
                onMouseUp={() => (touchCtrlRef.current.fire = false)}
                onTouchStart={() => (touchCtrlRef.current.fire = true)}
                onTouchEnd={() => (touchCtrlRef.current.fire = false)}
                className="flex-1 max-w-[200px] h-11 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 active:from-sky-600 active:to-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer select-none shadow-md shadow-sky-500/20 active:scale-95 transition-all"
              >
                <Flame size={18} className="text-amber-300 animate-pulse" />
                <span>DISPARAR</span>
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
