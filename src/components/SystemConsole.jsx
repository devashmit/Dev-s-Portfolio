import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect, useMemo, useRef } from 'react';
import { Terminal, MapPin, Cpu, Clock, GitBranch, Shield, Play, RotateCw, CheckCircle2, AlertTriangle, RefreshCw, Zap, Award } from 'lucide-react';

const appRouterCode = [
  { text: "const", type: "keyword" },
  { text: " developerProfile ", type: "variable" },
  { text: "= {", type: "punctuation" },
  { text: "\n  engineer: ", type: "property" },
  { text: '"Ashmit Dev"', type: "string" },
  { text: ",\n  specialties: ", type: "property" },
  { text: '["Full Stack", "Systems Architecture"]', type: "string" },
  { text: ",\n  environment: ", type: "property" },
  { text: '"Secure Core Terminal"', type: "string" },
  { text: ",\n  system_status: ", type: "property" },
  { text: '"Production Ready"', type: "string" },
  { text: ",\n  latency: ", type: "property" },
  { text: '"0.08ms (Optimized)"', type: "string" },
  { text: ",\n  active_tech_stack: [", type: "property" },
  { text: '"React"', type: "string" },
  { text: ", ", type: "punctuation" },
  { text: '"TypeScript"', type: "string" },
  { text: ", ", type: "punctuation" },
  { text: '"Node.js"', type: "string" },
  { text: ", ", type: "punctuation" },
  { text: '"Java"', type: "string" },
  { text: "],\n", type: "punctuation" },
  { text: "  coordinates: ", type: "property" },
  { text: '"27.7172 N, 85.3240 E"\n', type: "string" },
  { text: "};", type: "punctuation" }
];

const dataMeshCode = [
  { text: "import", type: "keyword" },
  { text: " time, random\n\n", type: "variable" },
  { text: "def", type: "keyword" },
  { text: " run_pipeline", type: "variable" },
  { text: "():", type: "punctuation" },
  { text: "\n    print", type: "keyword" },
  { text: "(", type: "punctuation" },
  { text: '"Initializing data mesh scan..."', type: "string" },
  { text: ")\n    time.sleep(", type: "punctuation" },
  { text: "0.25", type: "property" },
  { text: ")\n    ", type: "punctuation" },
  { text: "active_nodes", type: "variable" },
  { text: " = [", type: "punctuation" },
  { text: '"KTM_04"', type: "string" },
  { text: ", ", type: "punctuation" },
  { text: '"SYS_01"', type: "string" },
  { text: "]\n    ", type: "punctuation" },
  { text: "for", type: "keyword" },
  { text: " n ", type: "variable" },
  { text: "in", type: "keyword" },
  { text: " active_nodes:", type: "punctuation" },
  { text: "\n        print", type: "keyword" },
  { text: "(", type: "punctuation" },
  { text: 'f"Connecting -> {n}... STATUS: OK"', type: "string" },
  { text: ")\n\n", type: "punctuation" },
  { text: "run_pipeline", type: "variable" },
  { text: "()", type: "punctuation" }
];

const secureUplinkCode = [
  { text: "#!/bin/bash\n\n", type: "punctuation" },
  { text: "echo", type: "keyword" },
  { text: " ", type: "punctuation" },
  { text: '"Establishing secure tactical uplink..."', type: "string" },
  { text: "\n", type: "punctuation" },
  { text: "export", type: "keyword" },
  { text: " UPLINK_LEVEL=", type: "variable" },
  { text: "100", type: "property" },
  { text: "\n", type: "punctuation" },
  { text: "export", type: "keyword" },
  { text: " SUMMON_TOY=", type: "variable" },
  { text: "1", type: "property" },
  { text: "\n\n", type: "punctuation" },
  { text: "# SUMMONS THE CAT COMPANION BALL/RAT TOY!\n", type: "punctuation" },
  { text: "echo", type: "keyword" },
  { text: " ", type: "punctuation" },
  { text: '"[SUCCESS] TACTICAL TOY SUMMON DEPLOYED!"', type: "string" },
  { text: "\n", type: "punctuation" },
  { text: "echo", type: "keyword" },
  { text: " ", type: "punctuation" },
  { text: '"--> Toy spawned! Click anywhere to make cat chase it!"', type: "string" }
];

const developerProfileCode = [
  { text: "{\n", type: "punctuation" },
  { text: '  "name"', type: "property" },
  { text: ": ", type: "punctuation" },
  { text: '"Abhishek Dev"', type: "string" },
  { text: ",\n", type: "punctuation" },
  { text: '  "alias"', type: "property" },
  { text: ": ", type: "punctuation" },
  { text: '"Ashmit Dev"', type: "string" },
  { text: ",\n", type: "punctuation" },
  { text: '  "location"', type: "property" },
  { text: ": ", type: "punctuation" },
  { text: '"Kathmandu, Nepal"', type: "string" },
  { text: ",\n", type: "punctuation" },
  { text: '  "security_pass"', type: "property" },
  { text: ": ", type: "punctuation" },
  { text: "true", type: "keyword" },
  { text: ",\n", type: "punctuation" },
  { text: '  "firewall"', type: "property" },
  { text: ": ", type: "punctuation" },
  { text: '"ACTIVE_SECURE"', type: "string" },
  { text: "\n}", type: "punctuation" }
];

function GravityComposer({ onPlayNote }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  const [preset, setPreset] = useState('pluck'); // 'pluck', 'chime', '8bit'
  const [gravity, setGravity] = useState(0.3);
  const [ballCount, setBallCount] = useState(3);
  const [activeLinesCount, setActiveLinesCount] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(true);

  // Pentatonic scale frequencies
  const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];

  // Refs for loop variables (to prevent stale closures in requestAnimationFrame)
  const stateRef = useRef({
    balls: [],
    lines: [],
    particles: [],
    drawingLine: null,
    preset: 'pluck',
    gravity: 0.3,
    scale,
    isMuted: false,
    isIntersecting: true
  });

  // Intersection Observer to mute sound and pause simulation when out of view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => {
      observer.unobserve(container);
    };
  }, []);

  // Sync state refs
  useEffect(() => {
    stateRef.current.preset = preset;
    stateRef.current.gravity = gravity;
    stateRef.current.isMuted = isMuted;
    stateRef.current.isIntersecting = isIntersecting;
  }, [preset, gravity, isMuted, isIntersecting]);

  // Audio trigger
  let audioCtx = null;
  const triggerSynth = (freq) => {
    if (stateRef.current.isMuted || !stateRef.current.isIntersecting) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      const p = stateRef.current.preset;
      if (p === 'chime') {
        osc.type = 'sine';
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 1.3);
      } else if (p === '8bit') {
        osc.type = 'square';
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.22);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.25);
      } else { // pluck
        osc.type = 'triangle';
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.35, audioCtx.currentTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.6);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.65);
      }

      if (onPlayNote) onPlayNote(freq);
    } catch (e) {
      console.warn("Audio Context init blocked by browser autoplay policy.");
    }
  };

  // Math helper: closest point on segment
  const getClosestPointOnSegment = (bx, by, x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return { x: x1, y: y1, t: 0 };
    let t = ((bx - x1) * dx + (by - y1) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t));
    return { x: x1 + t * dx, y: y1 + t * dy, t };
  };

  // Spawns particle burst
  const spawnBurst = (x, y, color) => {
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      stateRef.current.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
        size: Math.random() * 2 + 1
      });
    }
  };

  // Canvas Resize and Loop management
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
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${Math.max(320, rect.height)}px`;
      ctx.scale(dpi, dpi);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Initial setup: add a couple of starting helper lines to bounce off immediately!
    setTimeout(() => {
      if (!canvas || !canvas.parentNode) return;
      const rect = canvas.parentNode.getBoundingClientRect();
      const w = rect.width;
      const h = Math.max(320, rect.height);
      stateRef.current.lines = [
        { x1: w * 0.2, y1: h * 0.4, x2: w * 0.45, y2: h * 0.52, flash: 0 },
        { x1: w * 0.8, y1: h * 0.45, x2: w * 0.55, y2: h * 0.58, flash: 0 },
        { x1: w * 0.35, y1: h * 0.72, x2: w * 0.65, y2: h * 0.72, flash: 0 }
      ];
      setActiveLinesCount(3);
    }, 100);

    let animationFrameId;
    let spawnTimer = 0;

    const loop = () => {
      if (!canvas || !canvas.parentNode) return;
      const state = stateRef.current;
      if (!state.isIntersecting) {
        animationFrameId = requestAnimationFrame(loop);
        return;
      }
      const rect = canvas.parentNode.getBoundingClientRect();
      const width = rect.width;
      const height = Math.max(320, rect.height);
      ctx.clearRect(0, 0, width, height);

      // 1. Spawning Logic
      spawnTimer++;
      if (state.balls.length < ballCount && spawnTimer > 75) {
        state.balls.push({
          x: width * 0.5 + (Math.random() - 0.5) * 40,
          y: 20,
          vx: (Math.random() - 0.5) * 3,
          vy: 1,
          radius: 6,
          color: '#f43f5e'
        });
        spawnTimer = 0;
      }

      // 2. Render Emitter
      ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
      ctx.beginPath();
      ctx.arc(width * 0.5, 20, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(width * 0.5, 20, 5, 0, Math.PI * 2);
      ctx.fill();

      // 3. Update & Draw Particles
      state.particles = state.particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.035;
        if (p.alpha <= 0) return false;
        ctx.fillStyle = `rgba(244, 63, 94, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      // 4. Draw Lines
      state.lines.forEach(line => {
        if (line.flash > 0) line.flash -= 0.05;
        ctx.lineWidth = line.flash > 0 ? 5 + line.flash * 4 : 3;
        ctx.strokeStyle = line.flash > 0 ? `rgba(244, 63, 94, ${0.4 + line.flash * 0.6})` : 'rgba(255,255,255,0.22)';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = line.flash > 0 ? line.flash * 15 : 0;
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
        ctx.shadowBlur = 0; // reset glow
      });

      // 5. Draw Active Preview Line
      if (state.drawingLine) {
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.7)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(state.drawingLine.x1, state.drawingLine.y1);
        ctx.lineTo(state.drawingLine.x2, state.drawingLine.y2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 6. Update & Draw Balls
      state.balls.forEach((ball, bIdx) => {
        // Gravity acceleration
        ball.vy += state.gravity;

        // Position update
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Bounce walls
        if (ball.x - ball.radius < 0) {
          ball.x = ball.radius;
          ball.vx = -ball.vx * 0.78;
        } else if (ball.x + ball.radius > width) {
          ball.x = width - ball.radius;
          ball.vx = -ball.vx * 0.78;
        }

        if (ball.y - ball.radius < 0) {
          ball.y = ball.radius;
          ball.vy = -ball.vy * 0.78;
        }

        // Bottom hit trigger (recycle ball)
        if (ball.y - ball.radius > height) {
          // Play a baseline pad note
          const padIdx = Math.floor((ball.x / width) * 5);
          const baseFreq = scale[Math.min(padIdx, 4)];
          triggerSynth(baseFreq);
          spawnBurst(ball.x, height - 10, '#f43f5e');

          // Recycle
          ball.x = width * 0.5 + (Math.random() - 0.5) * 40;
          ball.y = 20;
          ball.vx = (Math.random() - 0.5) * 3;
          ball.vy = 1;
          return;
        }

        // Segment Collisions
        state.lines.forEach((line) => {
          const closest = getClosestPointOnSegment(ball.x, ball.y, line.x1, line.y1, line.x2, line.y2);
          const dx = ball.x - closest.x;
          const dy = ball.y - closest.y;
          const dist = Math.hypot(dx, dy);

          if (dist < ball.radius) {
            // Normal vector pointing outwards from segment center to ball center
            const nx = dist > 0 ? dx / dist : 0;
            const ny = dist > 0 ? dy / dist : -1;

            // Project ball outside of line to prevent sticking/collision loops
            ball.x = closest.x + nx * (ball.radius + 0.5);
            ball.y = closest.y + ny * (ball.radius + 0.5);

            // Relative dot product
            const dot = ball.vx * nx + ball.vy * ny;
            if (dot < 0) {
              // Elastic reflection: V' = V - 2(V.N)N
              ball.vx = (ball.vx - 2 * dot * nx) * 0.85;
              ball.vy = (ball.vy - 2 * dot * ny) * 0.85;

              // Line flash feedback
              line.flash = 1.0;

              // Trigger Audio Note based on collision coordinate height
              const hitHeightRatio = Math.max(0, Math.min(1, closest.y / height));
              const noteIndex = Math.floor((1 - hitHeightRatio) * scale.length);
              const targetNote = scale[Math.min(noteIndex, scale.length - 1)];
              triggerSynth(targetNote);

              // Visual sparks
              spawnBurst(closest.x, closest.y, '#f43f5e');
            }
          }
        });

        // Draw Ball
        ctx.fillStyle = '#f43f5e';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [ballCount]);

  // Mouse / Pointer Event handlers
  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    stateRef.current.drawingLine = { x1: x, y1: y, x2: x, y2: y };
  };

  const handlePointerMove = (e) => {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    if (!canvas || !state.drawingLine) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    state.drawingLine.x2 = x;
    state.drawingLine.y2 = y;
  };

  const handlePointerUp = (e) => {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    if (!canvas || !state.drawingLine) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - state.drawingLine.x1;
    const dy = y - state.drawingLine.y1;
    const length = Math.hypot(dx, dy);

    // If it's a drag segment, record it. If it is just a click, spawn a ball at that position!
    if (length > 10) {
      state.lines.push({
        x1: state.drawingLine.x1,
        y1: state.drawingLine.y1,
        x2: x,
        y2: y,
        flash: 0
      });
      setActiveLinesCount(state.lines.length);
    } else {
      // Click spawning mechanics! Spawns directly at click location
      state.balls.push({
        x: state.drawingLine.x1,
        y: state.drawingLine.y1,
        vx: (Math.random() - 0.5) * 4,
        vy: -2,
        radius: 6,
        color: '#f43f5e'
      });
    }

    state.drawingLine = null;
  };

  const clearCanvas = () => {
    stateRef.current.lines = [];
    stateRef.current.balls = [];
    setActiveLinesCount(0);
  };

  return (
    <div className="game-wrapper" ref={containerRef}>
      {/* Synth Controls HUD */}
      <div className="game-hud">
        <div className="hud-metric">
          <span className="label">INSTRUMENT</span>
          <div className="preset-selector-row mt-1">
            <button className={`btn-preset ${preset === 'pluck' ? 'active' : ''}`} onClick={() => setPreset('pluck')}>PLUCK</button>
            <button className={`btn-preset ${preset === 'chime' ? 'active' : ''}`} onClick={() => setPreset('chime')}>CHIME</button>
            <button className={`btn-preset ${preset === '8bit' ? 'active' : ''}`} onClick={() => setPreset('8bit')}>8-BIT</button>
          </div>
        </div>
        <div className="hud-metric">
          <span className="label">GRAVITY</span>
          <span className="value text-accent font-mono">{(gravity * 10).toFixed(0)}x</span>
          <input 
            type="range" 
            min="0" 
            max="0.8" 
            step="0.1" 
            value={gravity} 
            onChange={(e) => setGravity(parseFloat(e.target.value))} 
            className="gravity-slider"
          />
        </div>
        <div className="hud-metric">
          <span className="label">BOUNCERS</span>
          <span className="value font-mono">{activeLinesCount}</span>
        </div>
        <div className="hud-metric" style={{ alignItems: 'flex-end', flexDirection: 'row', gap: '0.5rem' }}>
          <button 
            className={`btn btn-ghost text-[10px] font-mono py-1 px-2 border border-white/10 rounded ${isMuted ? 'text-accent border-accent/25 bg-accent/5' : 'text-ink-mid hover:text-white'}`} 
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? '🔊 UNMUTE' : '🔇 MUTE'}
          </button>
          <button className="btn btn-ghost btn-clear text-xs font-mono" onClick={clearCanvas}>
            CLEAR ALL
          </button>
        </div>
      </div>

      {/* Physics Canvas Viewport */}
      <div className="canvas-container relative flex-1">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="physics-canvas cursor-crosshair w-full block rounded-lg bg-black/30 border border-white/5"
          style={{ touchAction: 'none' }}
        />
        {activeLinesCount === 0 && (
          <div className="canvas-instruction-overlay pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <p className="font-mono text-xs text-ink-dim tracking-wide">DRAG TO DRAW CHORD DEFLECTORS</p>
            <p className="font-mono text-[0.65rem] text-ink-dim opacity-60 mt-1">CLICK ANYWHERE TO DROP GRAVITY NODES</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SystemConsole() {
  const [activeFile, setActiveFile] = useState('app-router.ts');
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
      setActiveFile('gravity-composer.exe');
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
    'app-router.ts': {
      code: appRouterCode,
      linesCount: 11,
      lang: 'TS',
      color: 'var(--accent)',
      ping: '12ms',
      node: 'KTM_04',
      status: 'ONLINE'
    },
    'data-mesh.py': {
      code: dataMeshCode,
      linesCount: 10,
      lang: 'PY',
      color: '#306998',
      ping: '18ms',
      node: 'SYS_01',
      status: 'ONLINE'
    },
    'secure-uplink.sh': {
      code: secureUplinkCode,
      linesCount: 9,
      lang: 'SH',
      color: '#4EAA25',
      ping: '8ms',
      node: 'UPLINK_09',
      status: 'ACTIVE_TOY'
    },
    'developer-profile.json': {
      code: developerProfileCode,
      linesCount: 8,
      lang: 'JSON',
      color: 'var(--accent)',
      ping: '4ms',
      node: 'PASS_00',
      status: 'ONLINE'
    },
    'gravity-composer.exe': {
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
    // Dispatch Toy Summon Event to CatCompanion if secure-uplink is loaded!
    if (activeFile === 'secure-uplink.sh') {
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
                    {fileName === 'gravity-composer.exe' && (
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
                // Only render active tab and profile tab to simulate open editor buffers
                if (fileName !== 'developer-profile.json' && fileName !== activeFile) return null;
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
              {activeFile === 'gravity-composer.exe' ? (
                <GravityComposer onPlayNote={(freq) => {
                  setDiagnosticLogs(prev => [
                    ...prev,
                    `[AUDIO BOUNCE] Frequency triggered: ${freq} Hz`,
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
