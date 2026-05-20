import { motion, useTransform, useMotionValue, useSpring, useTime, AnimatePresence } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import TextReveal from './TextReveal';

const dossierData = [
  {
    label: "IDENTITY",
    command: "> whoami",
    response: "CS scholar specialized in <span>system architecture</span>. Engineering robust backends and <span>pixel-perfect interfaces</span>."
  },
  {
    label: "MISSION",
    command: "> focus",
    response: "Fusing <span>algorithmic efficiency</span> with <span>premium motion design</span>. Building web experiences that feel alive and intentional."
  },
  {
    label: "VALUES",
    command: "> philosophy",
    response: "<span>Code is honest</span>. Mastery through endless iteration. Designing products that are as <span>resilient</span> as they are beautiful."
  }
];

function NeuralCore({ activeEntry }) {
  const time = useTime();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const shards = useMemo(() => [...Array(12)].map((_, i) => ({
    id: i,
    size: Math.random() * 40 + 20,
    orbit: Math.random() * 100 + 120,
    speed: Math.random() * 0.5 + 0.2,
    offset: Math.random() * 360
  })), []);

  return (
    <div className="neural-anchor" onMouseMove={handleMouseMove}>
      <motion.div 
        className="neural-container"
        style={{ 
          rotateX: useTransform(springY, [-0.5, 0.5], [30, -30]),
          rotateY: useTransform(springX, [-0.5, 0.5], [-30, 30]),
          transformStyle: 'preserve-3d'
        }}
      >
        {/* The Central Polyhedron Core */}
        <motion.div 
          className="neural-core"
          animate={{ 
            scale: [1, 1.1, 1],
            rotateY: [0, 180, 360],
            filter: activeEntry !== null ? ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)'] : 'none'
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
            <motion.path
              d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-accent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <path d="M50 5 L50 95 M5 25 L95 75 M5 75 L95 25" stroke="currentColor" strokeWidth="0.2" className="text-accent opacity-30" />
          </svg>
          <div className="neural-core-glow"></div>
        </motion.div>

        {/* Orbital Shards */}
        {shards.map((shard) => (
          <motion.div
            key={shard.id}
            className="neural-shard"
            style={{
              width: shard.size,
              height: 2,
              x: useTransform(time, t => Math.cos((t * shard.speed + shard.offset) * 0.002) * shard.orbit),
              y: useTransform(time, t => Math.sin((t * shard.speed + shard.offset) * 0.002) * shard.orbit),
              z: useTransform(time, t => Math.sin((t * shard.speed + shard.offset) * 0.001) * 50),
              rotateZ: useTransform(time, t => t * shard.speed * 0.1)
            }}
          >
             <div className="w-full h-full bg-accent opacity-20"></div>
             <span className="absolute -top-4 left-0 font-mono text-[6px] opacity-40">0x{shard.id.toString(16)}</span>
          </motion.div>
        ))}

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <motion.line 
            x1="50%" y1="50%" 
            x2="150%" y2={activeEntry !== null ? `${activeEntry * 33 + 15}%` : "50%"}
            stroke="currentColor" 
            strokeWidth="0.5" 
            className="text-accent opacity-20"
            animate={{ opacity: activeEntry !== null ? 0.4 : 0 }}
          />
        </svg>

      </motion.div>

      {/* Floating System Data */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none font-mono text-[7px] opacity-35">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
             <div>CORE_TEMP: 34°C</div>
             <div>PROCESS_SYNC: OK</div>
          </div>
          <div className="text-right">
             <div>MEM_USAGE: 1.1GB</div>
             <div>UPLINK: ACTIVE</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UplinkRadar({ activeEntry }) {
  // Coordinates representing specialties mapped to angles and radii
  const targets = useMemo(() => [
    { label: "SYS_ARCH::REACT_A11Y", r: 120, angle: 45, idx: 0 },
    { label: "SYS_ARCH::DISTRIB_NODES", r: 160, angle: 135, idx: 0 },
    { label: "CR_MOTION::FRAMER_THREE", r: 140, angle: 220, idx: 1 },
    { label: "CR_MOTION::CANVAS_BLOOM", r: 95, angle: 190, idx: 1 },
    { label: "ALG_EFF::PERF_OPTI", r: 150, angle: 310, idx: 2 },
    { label: "ALG_EFF::RESILIENT_SEC", r: 105, angle: 280, idx: 2 }
  ], []);

  return (
    <div className="radar-anchor" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="radar-container" style={{ position: 'relative' }}>
        {/* Conic Sweep Scanline */}
        <div className="radar-sweep"></div>
        
        {/* Concentric Coordinate Rings */}
        <div className="radar-circle radar-circle--1"></div>
        <div className="radar-circle radar-circle--2"></div>
        <div className="radar-circle radar-circle--3"></div>
        
        {/* Crosshair Grids */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible opacity-30" style={{ color: 'var(--accent)' }}>
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 5" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 5" />
          
          {targets.map((t, idx) => {
            const rad = (t.angle * Math.PI) / 180;
            // Radius scaling factor (400 is total size, so dividing by 400 scales properly)
            const cx = 50 + (t.r / 400) * 100 * Math.cos(rad);
            const cy = 50 + (t.r / 400) * 100 * Math.sin(rad);
            const isHighlighted = activeEntry === t.idx;

            return (
              <motion.line
                key={idx}
                x1="50%" y1="50%"
                x2={`${cx}%`} y2={`${cy}%`}
                stroke="currentColor"
                strokeWidth={isHighlighted ? "0.75" : "0.25"}
                className={isHighlighted ? "text-accent" : "text-ink-dim"}
                animate={{ opacity: isHighlighted ? 0.65 : 0.15 }}
                transition={{ duration: 0.3 }}
              />
            );
          })}
        </svg>

        {/* Pulsing Radar Markers */}
        {targets.map((t, idx) => {
          const rad = (t.angle * Math.PI) / 180;
          const cx = (t.r / 400) * 100 * Math.cos(rad);
          const cy = (t.r / 400) * 100 * Math.sin(rad);
          const isHighlighted = activeEntry === t.idx;

          return (
            <div
              key={idx}
              className="radar-dot"
              style={{
                top: `calc(50% + ${cy}% - 3px)`,
                left: `calc(50% + ${cx}% - 3px)`,
                background: isHighlighted ? 'var(--accent)' : 'var(--ink-dim)',
                boxShadow: isHighlighted ? '0 0 15px var(--accent)' : 'none',
                transform: isHighlighted ? 'scale(1.4)' : 'scale(1)',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}
            >
              {/* Radar Specialty HUD label */}
              <div
                style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '6px',
                  color: isHighlighted ? 'var(--accent)' : 'var(--ink-dim)',
                  fontWeight: isHighlighted ? 'bold' : 'normal',
                  opacity: isHighlighted ? 1 : 0.45,
                  letterSpacing: '0.05em',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none'
                }}
              >
                {t.label}
              </div>
            </div>
          );
        })}

        {/* Center Target cross */}
        <div style={{ position: 'absolute', width: '20px', height: '20px', border: '1px dashed var(--accent)', borderRadius: '50%', opacity: 0.3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '4px', height: '4px', background: 'var(--accent)', borderRadius: '50%' }}></div>
        </div>
      </div>

      {/* Telemetry indicators overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none font-mono text-[7px] opacity-35" style={{ color: 'var(--ink-mid)' }}>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div>RADAR_LOCK: ACTIVE</div>
            <div>SCAN_FREQ: 9.38GHz</div>
          </div>
          <div className="text-right">
            <div>COORD_Y: 27.7172° N</div>
            <div>COORD_X: 85.3240° E</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const [activeEntry, setActiveEntry] = useState(0);
  const [viewMode, setViewMode] = useState('neural'); // 'neural' or 'radar'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const entryVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="about" aria-label="About" className="section-padding relative overflow-hidden">
      
      <div className="section-intro relative-z">
        <motion.p 
          className="section-eyebrow" 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          03 / BACKGROUND
        </motion.p>
        <TextReveal text="Journey" className="section-title" tag="h2" delay={0.1} />
      </div>

      <div className="dossier-layout relative-z">
        
        {/* Left: Innovative Visual Anchor (Dual-Mode Viewport) */}
        <div className="flex flex-col items-center justify-center gap-6" style={{ position: 'relative', width: '100%', minHeight: '480px' }}>
          
          {/* Tactical View Switcher Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', zIndex: 10, fontFamily: 'var(--font-mono)', background: 'rgba(0,0,0,0.15)', border: '1px solid var(--border)', padding: '0.35rem 0.75rem', borderRadius: '30px', backdropFilter: 'blur(8px)' }}>
            <button
              onClick={() => setViewMode('neural')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: viewMode === 'neural' ? 'var(--accent)' : 'var(--ink-dim)',
                fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem',
                textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'color 0.2s'
              }}
            >
              {viewMode === 'neural' ? '⌖ [ NEURAL_CORE ]' : '⌖ NEURAL_CORE'}
            </button>
            <span style={{ color: 'var(--border)', opacity: 0.3 }}>|</span>
            <button
              onClick={() => setViewMode('radar')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: viewMode === 'radar' ? 'var(--accent)' : 'var(--ink-dim)',
                fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem',
                textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'color 0.2s'
              }}
            >
              {viewMode === 'radar' ? '📡 [ UPLINK_RADAR ]' : '📡 UPLINK_RADAR'}
            </button>
          </div>

          {/* Graphics Viewport */}
          <div style={{ position: 'relative', width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              {viewMode === 'neural' ? (
                <motion.div
                  key="neural"
                  initial={{ opacity: 0, scale: 0.94, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.94, rotate: 8 }}
                  transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                  style={{ position: 'absolute' }}
                >
                  <NeuralCore activeEntry={activeEntry} />
                </motion.div>
              ) : (
                <motion.div
                  key="radar"
                  initial={{ opacity: 0, scale: 0.94, rotate: 8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.94, rotate: -8 }}
                  transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                  style={{ position: 'absolute' }}
                >
                  <UplinkRadar activeEntry={activeEntry} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Dossier Content */}
        <motion.div 
          className="dossier-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Vertical Scan Bar */}
          <div 
            className="dossier-scan-bar" 
            style={{ top: `${activeEntry * 140 + 40}px` }}
          ></div>

          {dossierData.map((entry, idx) => (
            <motion.article 
              key={idx} 
              className="dossier-entry"
              variants={entryVariants}
              onMouseEnter={() => setActiveEntry(idx)}
            >
              <span className="dossier-entry-label">[ {entry.label} ]</span>
              <div className="dossier-entry-command">{entry.command}</div>
              <h3 
                className="dossier-entry-response"
                dangerouslySetInnerHTML={{ __html: entry.response }}
              />
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
