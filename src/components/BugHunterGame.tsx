import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, RotateCcw, Trophy, Volume2, VolumeX, MessageSquare } from "lucide-react";

interface BugHunterGameProps {
  isOpen: boolean;
  onClose: () => void;
}

// Simple Web Audio API sound synthesizer
class SoundFX {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user action
  }

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
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playHit() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(250, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playPowerup() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.setValueAtTime(600, this.ctx.currentTime + 0.08);
    osc.frequency.setValueAtTime(900, this.ctx.currentTime + 0.16);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
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

  useEffect(() => {
    const saved = localStorage.getItem("bughunter_highscore");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  useEffect(() => {
    sfx.enabled = soundOn;
  }, [soundOn]);

  useEffect(() => {
    if (!isOpen || gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Game state variables
    const player = {
      x: canvas.width / 2 - 25,
      y: canvas.height - 45,
      width: 50,
      height: 35,
      speed: 7,
      dx: 0,
    };

    let lasers: Array<{ x: number; y: number; width: number; height: number; speed: number }> = [];
    let bugs: Array<{ x: number; y: number; width: number; height: number; speed: number; label: string; color: string; hp: number }> = [];
    let particles: Array<{ x: number; y: number; vx: number; vy: number; color: string; alpha: number }> = [];

    const bugTypes = [
      { label: "NullPointer", color: "#EF4444", hp: 1, speed: 2.2 },
      { label: "500 Error", color: "#F59E0B", hp: 2, speed: 1.8 },
      { label: "Merge Conflict", color: "#EC4899", hp: 2, speed: 2.0 },
      { label: "Memory Leak", color: "#8B5CF6", hp: 3, speed: 1.4 },
      { label: "Infinite Loop", color: "#10B981", hp: 1, speed: 3.0 },
    ];

    let currentScore = 0;
    let spawnTimer = 0;
    let lastShoot = 0;

    // Controls
    const keys: Record<string, boolean> = {};

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key] = true;
      if (e.key === " " && Date.now() - lastShoot > 180) {
        lasers.push({
          x: player.x + player.width / 2 - 3,
          y: player.y,
          width: 6,
          height: 14,
          speed: 10,
        });
        sfx.playShoot();
        lastShoot = Date.now();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      player.x = Math.max(0, Math.min(canvas.width - player.width, mouseX - player.width / 2));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        player.x = Math.max(0, Math.min(canvas.width - player.width, touchX - player.width / 2));
      }
    };

    const handleCanvasClick = () => {
      if (Date.now() - lastShoot > 180) {
        lasers.push({
          x: player.x + player.width / 2 - 3,
          y: player.y,
          width: 6,
          height: 14,
          speed: 10,
        });
        sfx.playShoot();
        lastShoot = Date.now();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("click", handleCanvasClick);

    // Particle explosion
    const createExplosion = (x: number, y: number, color: string) => {
      for (let i = 0; i < 12; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          color,
          alpha: 1,
        });
      }
    };

    // Game loop
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background stars / grid
      ctx.fillStyle = "#0B0F19";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(77, 107, 255, 0.08)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Update Player Position
      if (keys["ArrowLeft"] || keys["a"] || keys["A"]) {
        player.x = Math.max(0, player.x - player.speed);
      }
      if (keys["ArrowRight"] || keys["d"] || keys["D"]) {
        player.x = Math.min(canvas.width - player.width, player.x + player.speed);
      }

      // Draw Player Ship (Dev Rocket)
      ctx.save();
      ctx.fillStyle = "#38BDF8";
      ctx.shadowColor = "#38BDF8";
      ctx.shadowBlur = 12;

      // Ship body
      ctx.beginPath();
      ctx.moveTo(player.x + player.width / 2, player.y);
      ctx.lineTo(player.x + player.width, player.y + player.height);
      ctx.lineTo(player.x, player.y + player.height);
      ctx.closePath();
      ctx.fill();

      // Ship thruster flame
      ctx.fillStyle = "#F59E0B";
      ctx.beginPath();
      ctx.moveTo(player.x + 18, player.y + player.height);
      ctx.lineTo(player.x + 25, player.y + player.height + 8 + Math.random() * 6);
      ctx.lineTo(player.x + 32, player.y + player.height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Spawn Bugs
      spawnTimer++;
      const currentLevel = Math.floor(currentScore / 100) + 1;
      setLevel(currentLevel);

      const spawnInterval = Math.max(25, 60 - currentLevel * 5);

      if (spawnTimer > spawnInterval) {
        spawnTimer = 0;
        const bType = bugTypes[Math.floor(Math.random() * bugTypes.length)];
        bugs.push({
          x: Math.random() * (canvas.width - 90),
          y: -30,
          width: 85,
          height: 28,
          speed: bType.speed + (currentLevel - 1) * 0.4,
          label: bType.label,
          color: bType.color,
          hp: bType.hp,
        });
      }

      // Update & Draw Lasers
      lasers.forEach((laser, lIndex) => {
        laser.y -= laser.speed;

        ctx.save();
        ctx.fillStyle = "#60A5FA";
        ctx.shadowColor = "#60A5FA";
        ctx.shadowBlur = 10;
        ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
        ctx.restore();

        if (laser.y < -20) lasers.splice(lIndex, 1);
      });

      // Update & Draw Bugs
      bugs.forEach((bug, bIndex) => {
        bug.y += bug.speed;

        // Draw Bug box
        ctx.save();
        ctx.fillStyle = bug.color;
        ctx.shadowColor = bug.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.roundRect(bug.x, bug.y, bug.width, bug.height, 6);
        ctx.fill();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`🐛 ${bug.label}`, bug.x + bug.width / 2, bug.y + 18);
        ctx.restore();

        // Collision with player -> GameOver
        if (
          bug.y + bug.height >= player.y &&
          bug.x + bug.width >= player.x &&
          bug.x <= player.x + player.width
        ) {
          createExplosion(player.x + player.width / 2, player.y, "#38BDF8");
          sfx.playHit();
          setGameState("gameover");
        }

        // Bug reached bottom -> GameOver
        if (bug.y > canvas.height) {
          sfx.playHit();
          setGameState("gameover");
        }

        // Collision with lasers
        lasers.forEach((laser, lIndex) => {
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
              currentScore += 15;
              setScore(currentScore);
              bugs.splice(bIndex, 1);

              if (currentScore > highScore) {
                setHighScore(currentScore);
                localStorage.setItem("bughunter_highscore", currentScore.toString());
              }
            }
          }
        });
      });

      // Update & Draw Particles
      particles.forEach((p, pIndex) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.03;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.alpha <= 0) particles.splice(pIndex, 1);
      });

      if (gameState === "playing") {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [isOpen, gameState, highScore]);

  const startGame = () => {
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-[650px] bg-[#0F172A] border border-sky-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-sky-500/10 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
            <div className="flex items-center gap-2">
              <span className="text-xl">👾</span>
              <div>
                <h3 className="font-space font-bold text-white text-base leading-none">
                  Bug Hunter <span className="text-sky-400">· Arcade</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">Elimine os bugs e proteja o código!</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSoundOn(!soundOn)}
                className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors bg-slate-800/50"
                title={soundOn ? "Mutar Som" : "Ativar Som"}
              >
                {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors bg-slate-800/50"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-between px-6 py-2.5 bg-slate-900/50 border-b border-slate-800/60 font-mono text-xs text-slate-300">
            <div className="flex items-center gap-4">
              <span>PONTOS: <strong className="text-sky-400">{score}</strong></span>
              <span>NÍVEL: <strong className="text-amber-400">{level}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <Trophy size={14} />
              <span>RECORDE: {highScore}</span>
            </div>
          </div>

          {/* Canvas & Overlay screens */}
          <div className="relative w-full h-[400px] bg-slate-950 flex items-center justify-center overflow-hidden">
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              className="w-full h-full cursor-crosshair touch-none"
            />

            {/* Start Overlay */}
            {gameState === "start" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-950/90 text-center">
                <div className="w-16 h-16 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center mb-4 text-3xl animate-bounce">
                  🚀
                </div>
                <h4 className="text-2xl font-space font-bold text-white mb-2">Bug Hunter: Tech Lead Edition</h4>
                <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
                  Utilize as **Setas / A-D** ou o **Rato** para mover o foguete. Prima **Espaço** ou **Clique** para disparar soluções e eliminar os bugs!
                </p>

                <button
                  onClick={startGame}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold flex items-center gap-2 hover:opacity-90 shadow-lg shadow-sky-500/20 transition-all hover:scale-105"
                >
                  <Play size={18} /> Iniciar Jogo
                </button>
              </div>
            )}

            {/* GameOver Overlay */}
            {gameState === "gameover" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-950/95 text-center animate-fade-in">
                <div className="text-4xl mb-2">💥</div>
                <h4 className="text-2xl font-space font-bold text-rose-500 mb-1">Bug em Produção!</h4>
                <p className="text-sm text-slate-400 mb-4">
                  Eliminou <strong className="text-white">{Math.floor(score / 15)} bugs</strong> e alcançou <strong className="text-sky-400">{score} pontos</strong>!
                </p>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 max-w-sm mb-6 text-xs text-slate-300 leading-relaxed">
                  💡 <em>"Precisa de um Tech Lead experiente para eliminar os bugs e escalar o seu projeto?"</em>
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={startGame}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center gap-2 transition-all border border-slate-700"
                  >
                    <RotateCcw size={16} /> Jogar De Novo
                  </button>
                  <a
                    href="https://wa.me/244942031240"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
                  >
                    <MessageSquare size={16} /> Falar com o Jesimiel
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls Help */}
          <div className="px-6 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Controlo: Setas / Rato (Mover) · Espaço / Clique (Disparar)</span>
            <span>Made with ❤️ by Jesimiel</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
