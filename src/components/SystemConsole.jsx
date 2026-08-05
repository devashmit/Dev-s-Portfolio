import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect, useMemo, useRef } from 'react';
import { Terminal, MapPin, Cpu, Clock, GitBranch, Shield, Play, RotateCw, CheckCircle2, AlertTriangle, RefreshCw, Zap, Award } from 'lucide-react';

const catCompanionCode = [
  { text: "import ", type: "keyword" },
  { text: "{ useEffect, useRef } ", type: "variable" },
  { text: "from ", type: "keyword" },
  { text: "'react';\n\n", type: "string" },
  { text: "export default function ", type: "keyword" },
  { text: "CatCompanion", type: "variable" },
  { text: "() {\n", type: "punctuation" },
  { text: "  const ", type: "keyword" },
  { text: "catRef ", type: "variable" },
  { text: "= useRef(null);\n", type: "punctuation" },
  { text: "  const ", type: "keyword" },
  { text: "toyRef ", type: "variable" },
  { text: "= useRef(null);\n\n", type: "punctuation" },
  { text: "  // Listen to tactical toy summon events\n", type: "punctuation" },
  { text: "  useEffect(() => {\n", type: "keyword" },
  { text: "    const ", type: "keyword" },
  { text: "handleSummon ", type: "variable" },
  { text: " = (e) => {\n", type: "punctuation" },
  { text: "      const ", type: "keyword" },
  { text: "{ active } ", type: "variable" },
  { text: "= e.detail;\n", type: "punctuation" },
  { text: "      summonToy(active);\n", type: "variable" },
  { text: "    };\n", type: "punctuation" },
  { text: "    document.addEventListener(", type: "punctuation" },
  { text: "'cat:summon_toy'", type: "string" },
  { text: ", handleSummon);\n", type: "punctuation" },
  { text: "    return ", type: "keyword" },
  { text: "() => document.removeEventListener(", type: "punctuation" },
  { text: "'cat:summon_toy'", type: "string" },
  { text: ", handleSummon);\n", type: "punctuation" },
  { text: "  }, []);\n", type: "punctuation" },
  { text: "}", type: "punctuation" }
];

const physicsEngineCode = [
  { text: "import", type: "keyword" },
  { text: " math\n\n", type: "variable" },
  { text: "def", type: "keyword" },
  { text: " calculate_elastic_force", type: "variable" },
  { text: "(displacement, k=0.15, damping=0.08):\n", type: "punctuation" },
  { text: "    \"\"\"Simulates responsive drag spring constraints for UI elements\"\"\"\n", type: "string" },
  { text: "    rest_length = ", type: "variable" },
  { text: "0.0", type: "property" },
  { text: "\n    force = -k * (displacement - rest_length)\n", type: "variable" },
  { text: "    damping_force = -damping * force\n", type: "variable" },
  { text: "    return", type: "keyword" },
  { text: " math.round(force + damping_force, ", type: "punctuation" },
  { text: "4", type: "property" },
  { text: ")\n", type: "punctuation" }
];

const secureUplinkCode = [
  { text: "#!/bin/bash\n\n", type: "punctuation" },
  { text: "echo", type: "keyword" },
  { text: " ", type: "punctuation" },
  { text: '"[INIT] Deploying custom web application to Vercel Edge Server..."', type: "string" },
  { text: "\n", type: "punctuation" },
  { text: "npm", type: "keyword" },
  { text: " run build --minify\n", type: "variable" },
  { text: "echo", type: "keyword" },
  { text: " ", type: "punctuation" },
  { text: '"[SYSTEM] Syncing Kathmandu core node KTM_04..."', type: "string" },
  { text: "\n", type: "punctuation" },
  { text: "curl", type: "keyword" },
  { text: " -H ", type: "punctuation" },
  { text: '"Authorization: Bearer KTM_SECURE"', type: "string" },
  { text: " -X POST https://api.ashmit.dev/v1/deploy\n", type: "string" },
  { text: "echo", type: "keyword" },
  { text: " ", type: "punctuation" },
  { text: '"[SUCCESS] Core node deployed with 0.08ms latency."', type: "string" }
];

const systemConfigCode = [
  { text: "{\n", type: "punctuation" },
  { text: '  "workstation"', type: "property" },
  { text: ": ", type: "punctuation" },
  { text: '"core-node-04"', type: "string" },
  { text: ",\n", type: "punctuation" },
  { text: '  "engineer"', type: "property" },
  { text: ": ", type: "punctuation" },
  { text: '"Ashmit Dev"', type: "string" },
  { text: ",\n", type: "punctuation" },
  { text: '  "coordinates"', type: "property" },
  { text: ": ", type: "punctuation" },
  { text: '"27.7172 N, 85.3240 E"', type: "string" },
  { text: ",\n", type: "punctuation" },
  { text: '  "features"', type: "property" },
  { text: ": {\n", type: "punctuation" },
  { text: '    "cat_companion": "active",\n', type: "string" },
  { text: '    "custom_synth": true\n', type: "string" },
  { text: "  }\n}", type: "punctuation" }
];

function CyberWorm({ onPlayNote }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const canvasContainerRef = useRef(null);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('cyberworm_highscore') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [speed, setSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'loss'

  // Grid settings
  const GRID_SIZE_X = 40;
  const GRID_SIZE_Y = 22;
  
  const stateRef = useRef({
    snake: [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ],
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    food: { x: 25, y: 10 },
    particles: [],
    score: 0,
    highScore: 0,
    speedLevel: 1,
    isMuted: false,
    gameLoopDelay: 110 // ms per frame
  });

  // Sync state refs
  useEffect(() => {
    stateRef.current.isMuted = isMuted;
    stateRef.current.score = score;
    stateRef.current.highScore = highScore;
    stateRef.current.speedLevel = speed;
    stateRef.current.gameLoopDelay = Math.max(50, 115 - speed * 8);
  }, [isMuted, score, highScore, speed]);

  // Web Audio Synth
  const playSound = (type) => {
    if (stateRef.current.isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (type === 'turn') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } else if (type === 'eat') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.08); // E5
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.22);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.22);
        if (onPlayNote) onPlayNote(659.25);
      } else if (type === 'crash') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(260, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
        if (onPlayNote) onPlayNote(100);
      } else if (type === 'highscore') {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const o = audioCtx.createOscillator();
          const g = audioCtx.createGain();
          o.connect(g);
          g.connect(audioCtx.destination);
          o.type = 'sine';
          o.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.07);
          g.gain.setValueAtTime(0, audioCtx.currentTime);
          g.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + idx * 0.07 + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + idx * 0.07 + 0.3);
          o.start(audioCtx.currentTime + idx * 0.07);
          o.stop(audioCtx.currentTime + idx * 0.07 + 0.35);
        });
      }
    } catch (e) {
      console.warn("Audio Context init blocked.", e);
    }
  };

  const spawnSparks = (x, y, color) => {
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      stateRef.current.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1.0,
        color,
        size: Math.random() * 2 + 1
      });
    }
  };

  const generateFood = (snake) => {
    let newFood;
    let overlapping = true;
    while (overlapping) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE_X),
        y: Math.floor(Math.random() * GRID_SIZE_Y)
      };
      overlapping = snake.some(s => s.x === newFood.x && s.y === newFood.y);
    }
    return newFood;
  };

  const [isTouch, setIsTouch] = useState(false);
  const touchStartRef = useRef(null);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleDirectionChange = (newDir) => {
    const state = stateRef.current;
    const dir = state.direction;
    if (newDir.x !== 0 && dir.x === 0) {
      state.nextDirection = newDir;
      playSound('turn');
    } else if (newDir.y !== 0 && dir.y === 0) {
      state.nextDirection = newDir;
      playSound('turn');
    }
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    const diffX = touch.clientX - touchStartRef.current.x;
    const diffY = touch.clientY - touchStartRef.current.y;
    const minSwipe = 30;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (Math.abs(diffX) > minSwipe) {
        if (diffX > 0) {
          handleDirectionChange({ x: 1, y: 0 });
        } else {
          handleDirectionChange({ x: -1, y: 0 });
        }
        touchStartRef.current = null;
      }
    } else {
      if (Math.abs(diffY) > minSwipe) {
        if (diffY > 0) {
          handleDirectionChange({ x: 0, y: 1 });
        } else {
          handleDirectionChange({ x: 0, y: -1 });
        }
        touchStartRef.current = null;
      }
    }
  };

  const resetGame = () => {
    stateRef.current.snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    stateRef.current.direction = { x: 1, y: 0 };
    stateRef.current.nextDirection = { x: 1, y: 0 };
    stateRef.current.food = generateFood(stateRef.current.snake);
    stateRef.current.particles = [];
    setScore(0);
    setSpeed(1);
    setGameState('playing');
  };

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const preventDefault = (e) => {
      if (gameState === 'playing') {
        e.preventDefault();
      }
    };

    container.addEventListener('touchstart', preventDefault, { passive: false });
    container.addEventListener('touchmove', preventDefault, { passive: false });

    return () => {
      container.removeEventListener('touchstart', preventDefault);
      container.removeEventListener('touchmove', preventDefault);
    };
  }, [gameState]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          handleDirectionChange({ x: 0, y: -1 });
          e.preventDefault();
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          handleDirectionChange({ x: 0, y: 1 });
          e.preventDefault();
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          handleDirectionChange({ x: -1, y: 0 });
          e.preventDefault();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          handleDirectionChange({ x: 1, y: 0 });
          e.preventDefault();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main Canvas & Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      if (!canvas || !canvas.parentNode) return;
      const rect = canvas.parentNode.getBoundingClientRect();
      const dpi = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpi;
      canvas.height = Math.max(320, rect.height) * dpi;
      ctx.scale(dpi, dpi);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    let lastTickTime = 0;

    const render = (timestamp) => {
      const state = stateRef.current;
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      const isMobile = window.innerWidth <= 900;
      
      const cellW = width / GRID_SIZE_X;
      const cellH = height / GRID_SIZE_Y;

      if (gameState === 'playing' && timestamp - lastTickTime > state.gameLoopDelay) {
        lastTickTime = timestamp;

        state.direction = state.nextDirection;

        const head = state.snake[0];
        const newHead = {
          x: head.x + state.direction.x,
          y: head.y + state.direction.y
        };

        if (newHead.x < 0 || newHead.x >= GRID_SIZE_X || newHead.y < 0 || newHead.y >= GRID_SIZE_Y) {
          setGameState('loss');
          playSound('crash');
          return;
        }

        const bitSelf = state.snake.some((s, idx) => idx > 0 && s.x === newHead.x && s.y === newHead.y);
        if (bitSelf) {
          setGameState('loss');
          playSound('crash');
          return;
        }

        state.snake.unshift(newHead);

        if (newHead.x === state.food.x && newHead.y === state.food.y) {
          playSound('eat');
          spawnSparks(state.food.x * cellW + cellW / 2, state.food.y * cellH + cellH / 2, '#06b6d4');
          
          setScore(prev => {
            const next = prev + 100;
            if (next > state.highScore) {
              setHighScore(next);
              localStorage.setItem('cyberworm_highscore', next.toString());
            }
            const nextLvl = Math.min(8, 1 + Math.floor(next / 800));
            setSpeed(nextLvl);
            return next;
          });

          state.food = generateFood(state.snake);
        } else {
          state.snake.pop();
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Draw Grid Matrix Background Dots (High-performance optimization)
      ctx.fillStyle = 'rgba(6, 182, 212, 0.08)';
      for (let x = 0; x < GRID_SIZE_X; x++) {
        for (let y = 0; y < GRID_SIZE_Y; y++) {
          ctx.fillRect(x * cellW + cellW / 2 - 0.75, y * cellH + cellH / 2 - 0.75, 1.5, 1.5);
        }
      }

      // Draw Food (glowing data core)
      const fx = state.food.x * cellW + cellW / 2;
      const fy = state.food.y * cellH + cellH / 2;
      const pulseSize = 4.5 + Math.sin(timestamp * 0.008) * 1.5;

      if (!isMobile) {
        ctx.fillStyle = 'rgba(244, 63, 94, 0.18)';
        ctx.beginPath();
        ctx.arc(fx, fy, pulseSize * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f43f5e';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(fx, fy, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.arc(fx, fy, pulseSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Snake
      state.snake.forEach((segment, idx) => {
        const sx = segment.x * cellW + cellW / 2;
        const sy = segment.y * cellH + cellH / 2;
        const alpha = Math.max(0.22, 1 - (idx / state.snake.length) * 0.7);
        const radius = Math.max(3, (cellW / 2 - 1) * (1 - (idx / state.snake.length) * 0.45));

        ctx.fillStyle = idx === 0 ? '#00f0ff' : `rgba(6, 182, 212, ${alpha})`;
        if (idx === 0 && !isMobile) {
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 10;
        }
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Particles
      state.particles = state.particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.035;
        if (p.alpha <= 0) return false;
        ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      if (gameState === 'playing') {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (gameState === 'playing') {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState]);

  return (
    <div className="game-wrapper" ref={containerRef}>
      <div className="game-hud">
        <div className="hud-left">
          <div className="hud-item">
            <span className="label">SCORE</span>
            <span className="value text-accent">{score}</span>
          </div>
          <div className="hud-item">
            <span className="label">HIGH SCORE</span>
            <span className="value">{highScore}</span>
          </div>
          <div className="hud-item">
            <span className="label">SPEED LEVEL</span>
            <span className="value text-accent">{speed}</span>
          </div>
        </div>
        <div className="hud-right">
          <button 
            className={`btn btn-ghost text-[10px] py-1 px-2 border border-white/10 rounded mr-2 ${isMuted ? 'text-accent border-accent/25 bg-accent/5' : 'text-ink-mid hover:text-white'}`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? '🔊 UNMUTE' : '🔇 MUTE'}
          </button>
          <button className="btn btn-ghost text-xs border border-white/10 rounded py-1 px-2" onClick={resetGame}>
            RESTART
          </button>
        </div>
      </div>

      <div 
        ref={canvasContainerRef}
        className="canvas-container relative flex-1"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {gameState === 'loss' && (
          <div className="game-overlay">
            <h3 className="overlay-title loss">Worm Fragmented</h3>
            <p className="overlay-desc">Buffer overflow. System connection lost.</p>
            <button className="btn-game-action" onClick={resetGame}>REBOOT KERNEL (REPLAY)</button>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="game-canvas"
        />

        {isTouch && (
          <div className="mobile-dpad">
            <button className="dpad-btn up" onClick={() => handleDirectionChange({ x: 0, y: -1 })}>▲</button>
            <button className="dpad-btn left" onClick={() => handleDirectionChange({ x: -1, y: 0 })}>◀</button>
            <button className="dpad-btn down" onClick={() => handleDirectionChange({ x: 0, y: 1 })}>▼</button>
            <button className="dpad-btn right" onClick={() => handleDirectionChange({ x: 1, y: 0 })}>▶</button>
          </div>
        )}
      </div>
    </div>
  );
}



export default function SystemConsole() {
  const [activeFile, setActiveFile] = useState('CatCompanion.jsx');
  const [typedCode, setTypedCode] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [diagnosticMode, setDiagnosticMode] = useState(false);
  const [diagnosticLogs, setDiagnosticLogs] = useState([]);

  // Dynamic metrics for the professional HUD
  const [uptime, setUptime] = useState('00:00');
  const [cpuLoad, setCpuLoad] = useState('4.2%');
  const [liveTime, setLiveTime] = useState('');

  // 1. Live Uptime tracker (elapsed time since page load)
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const seconds = String(elapsed % 60).padStart(2, '0');
      setUptime(`${minutes}:${seconds}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Simulated real-time CPU fluctuations (feels alive!)
  useEffect(() => {
    const interval = setInterval(() => {
      const base = 3.5;
      const variation = Math.random() * 2.8;
      setCpuLoad(`${(base + variation).toFixed(1)}%`);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // 3. Real-time local clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setLiveTime(now.toTimeString().split(' ')[0]);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleOpenGame = () => {
      setActiveFile('void-serpent.exe');
      setDiagnosticMode(false);
      setTypedCode([]);
      setCurrentIndex(0);
    };
    document.addEventListener('console:open_game', handleOpenGame);
    return () => {
      document.removeEventListener('console:open_game', handleOpenGame);
    };
  }, []);


  // 3D Tilt & Parallax Grid Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Springs for smooth, responsive animations
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 150, damping: 20 });
  const gridX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 25 });
  const gridY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 25 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const filesMap = useMemo(() => ({
    'CatCompanion.jsx': {
      code: catCompanionCode,
      linesCount: 15,
      lang: 'JSX',
      color: 'var(--accent)',
      ping: '12ms',
      node: 'KTM_04',
      status: 'ONLINE'
    },
    'physics-engine.py': {
      code: physicsEngineCode,
      linesCount: 11,
      lang: 'PY',
      color: '#306998',
      ping: '18ms',
      node: 'SYS_01',
      status: 'ONLINE'
    },
    'summon-toy.sh': {
      code: secureUplinkCode,
      linesCount: 10,
      lang: 'SH',
      color: '#4EAA25',
      ping: '8ms',
      node: 'UPLINK_09',
      status: 'ACTIVE_TOY'
    },
    'system-config.json': {
      code: systemConfigCode,
      linesCount: 12,
      lang: 'JSON',
      color: 'var(--accent)',
      ping: '4ms',
      node: 'PASS_00',
      status: 'ONLINE'
    },
    'void-serpent.exe': {
      code: [],
      linesCount: 0,
      lang: 'SYNTH',
      color: '#f43f5e',
      ping: '0ms',
      node: 'SYS_AUDIO',
      status: 'INTERACTIVE'
    }
  }), []);

  // Trigger typing simulation when active file changes
  useEffect(() => {
    // Dispatch Toy Summon Event to CatCompanion if summon-toy is loaded!
    if (activeFile === 'summon-toy.sh') {
      const event = new CustomEvent('cat:summon_toy', { detail: { active: true } });
      document.dispatchEvent(event);
    }
  }, [activeFile]);

  useEffect(() => {
    if (diagnosticMode) return;
    const currentFile = filesMap[activeFile];
    if (!currentFile || !currentFile.code || currentFile.code.length === 0) return;
    const currentCode = currentFile.code;
    if (currentIndex < currentCode.length) {
      const timer = setTimeout(() => {
        setTypedCode(prev => [...prev, currentCode[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 35 + Math.random() * 50); // Faster, snappier coding flow
      return () => clearTimeout(timer);
    }
  }, [currentIndex, activeFile, diagnosticMode, filesMap]);

  // Systems Diagnostics simulation
  const runDiagnostics = () => {
    setDiagnosticMode(true);
    setDiagnosticLogs([]);
    
    // Trigger Toy Summon as a diagnostic reward!
    const summonEvent = new CustomEvent('cat:summon_toy', { detail: { active: true } });
    document.dispatchEvent(summonEvent);

    const logs = [
      "SYSTEM INITIATED: KERNEL DIAGNOSTIC BUILD v2.4.0",
      "ESTABLISHING SECURE CONNECTION... NODE [KTM_04] RESPONDING",
      "VERIFYING ENCRYPTION PROTOCOLS... AES-256 ACTIVE",
      "COMPILING DYNAMIC BUNDLES... 100% SUCCESS",
      "SYNCING NEURAL GRAPH... LATENCY < 10ms",
      "INITIALIZING INTERACTIVE MODULES... READY",
      "ALL SYSTEMS NOMINAL. DEVELOPMENT ENVIRONMENT ONLINE."
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setDiagnosticLogs(prev => [...prev, log]);
      }, index * 400);
    });
  };

  return (
    <div 
      className="console-container relative-z"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Modern Grid Background */}
      <div className="modern-grid-overlay">
        <motion.div 
          style={{ x: gridX, y: gridY }}
          className="modern-grid-inner"
        />
      </div>
      
      <div className="console-spotlight">
        {/* Systems Diagnostics HUD Bar */}



        {/* Rebuilt Typographic Heading - clipPath mask reveal */}
        <motion.h2
          className="console-spotlight-text"
          initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          whileInView={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-hollow">FULL STACK</span>
          <br/>
          <span className="text-solid">DEVELOPER</span>
        </motion.h2>

        {/* Enhanced Readable Sub-Headline - blur fade-in */}
        <motion.p
          className="console-spotlight-sub"
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.35, ease: 'easeOut' }}
        >
          Building <span className="text-highlight">immersive digital experiences</span> through <span className="text-highlight-accent">engineering + motion design</span>.
        </motion.p>
      </div>

      {/* Interactive IDE Window */}
      <motion.div 
        className="ide-window"
        style={{ rotateX, rotateY }}
      >
        {/* Window Header */}
        <div className="ide-header">

          <div className="ide-title">DEVELOPER WORKSTATION - core-node-04</div>
          <div className="ide-spacer"></div>
        </div>

        {/* Window Body */}
        <div className="ide-body">
          {/* Sidebar Explorer */}
          <div className="ide-sidebar">
            <div className="ide-sidebar-title">CORE_PROJECTS</div>
            <ul className="ide-file-list">
              {Object.keys(filesMap).map((fileName) => {
                const fileInfo = filesMap[fileName];
                const isActive = activeFile === fileName;
                return (
                  <li 
                    key={fileName} 
                    className={isActive ? 'active' : ''} 
                    onClick={() => {
                      setActiveFile(fileName);
                      setDiagnosticMode(false);
                      setTypedCode([]);
                      setCurrentIndex(0);
                    }}
                  >
                    <span 
                      className="file-icon" 
                      style={{ 
                        background: isActive ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.05)', 
                        color: fileInfo.color 
                      }}
                    >
                      {fileInfo.lang}
                    </span> 
                    {fileName}
                    {fileName === 'void-serpent.exe' && (
                      <span className="play-badge-glow">PLAY</span>
                    )}
                  </li>
                );
              })}
            </ul>
            
            <div className="ide-sidebar-title mt-6">SYSTEM COMMANDS</div>
            <button
              className="btn btn-ghost"
              onClick={runDiagnostics}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                padding: '0.45rem',
                border: '1px solid var(--border)',
                borderColor: diagnosticMode ? 'var(--accent)' : 'var(--border)',
                color: diagnosticMode ? 'var(--accent)' : 'var(--ink-mid)',
                background: 'rgba(0,0,0,0.15)',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                borderRadius: '6px',
                display: 'block'
              }}
            >
              &gt; RUN_DIAGNOSTIC
            </button>

            <div className="ide-sidebar-title mt-6">SYSTEM STATUS</div>
            <div className="ide-status-item" style={{ gap: '0.4rem', color: 'var(--accent)' }}>
              <span className="status-dot"></span> UPLINK SECURE
            </div>
            <div className="ide-status-item" style={{ marginTop: '0.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink-mid)' }}>
              // COGNITIVE LEVEL: 100%
            </div>
            <div className="ide-status-item" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink-mid)' }}>
              // FIREWALL: ACTIVE
            </div>
          </div>

          {/* Main Editor */}
          <div className="ide-main">
            <div className="ide-tabs">
              {Object.keys(filesMap).map((fileName) => {
                const fileInfo = filesMap[fileName];
                const isActive = activeFile === fileName;
                // Only render active tab and config tab to simulate open editor buffers
                if (fileName !== 'system-config.json' && fileName !== activeFile) return null;
                return (
                  <div 
                    key={fileName}
                    className={`ide-tab ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveFile(fileName);
                      setDiagnosticMode(false);
                      setTypedCode([]);
                      setCurrentIndex(0);
                    }}
                  >
                    <span 
                      className="file-icon" 
                      style={{ 
                        background: isActive ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.05)', 
                        color: fileInfo.color 
                      }}
                    >
                      {fileInfo.lang}
                    </span> 
                    {fileName}
                  </div>
                );
              })}
            </div>
            
            <div className="ide-editor-content">
              {activeFile === 'void-serpent.exe' ? (
                <CyberWorm onPlayNote={(freq) => {
                  setDiagnosticLogs(prev => [
                    ...prev,
                    `[UPLINK LAUNCH] Probe frequency / trajectory sync: ${freq} Hz`,
                  ].slice(-10));
                }} />
              ) : (
                <>
                  <div className="ide-line-numbers">
                    {diagnosticMode 
                      ? [1,2,3,4,5,6,7,8].map(num => <div key={num}>{num}</div>)
                      : Array.from({ length: filesMap[activeFile].linesCount }, (_, i) => i + 1).map(num => <div key={num}>{num}</div>)
                    }
                  </div>
                  <div className="ide-code">
                    <pre>
                      {diagnosticMode ? (
                        <code>
                          {diagnosticLogs.map((log, i) => (
                            <div key={i} className="token variable" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                              {log}
                            </div>
                          ))}
                          <span className="ide-cursor"></span>
                        </code>
                      ) : (
                        <code>
                          {typedCode.map((segment, i) => (
                            <span key={i} className={`token ${segment.type}`}>
                              {segment.text}
                            </span>
                          ))}
                          <span className="ide-cursor"></span>
                        </code>
                      )}
                    </pre>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
