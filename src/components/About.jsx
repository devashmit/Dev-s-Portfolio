import { motion, useTransform, useMotionValue, useSpring, useTime, AnimatePresence } from 'framer-motion';
import { useRef, useState, useMemo, useEffect } from 'react';
import TextReveal from './TextReveal';

/* ─── Data ─────────────────────────────────────────────────────────── */
const dossierData = [
  {
    label: 'IDENTITY',
    command: '> whoami',
    response: 'CS scholar specialized in <span>system architecture</span>. Engineering robust backends and <span>pixel-perfect interfaces</span>.',
  },
  {
    label: 'MISSION',
    command: '> focus',
    response: 'Fusing <span>algorithmic efficiency</span> with <span>premium motion design</span>. Building web experiences that feel alive and intentional.',
  },
  {
    label: 'EXPERIENCE',
    command: '> trace',
    response: 'Developing systems in Nepal. Evolving from basic algorithms to complete <span>full-stack architectures</span> and <span>interactive canvases</span>.',
  },
  {
    label: 'EDUCATION',
    command: '> source',
    response: 'Studying Computer Science and Mathematics. Focused on <span>distributed systems</span>, graphics computation, and <span>HCI principles</span>.',
  },
  {
    label: 'VALUES',
    command: '> philosophy',
    response: '<span>Code is honest</span>. Mastery through endless iteration. Designing systems as <span>resilient</span> as they are beautiful.',
  },
];

/* ─── Neural Core ───────────────────────────────────────────────────── */
function NeuralCore({ activeEntry }) {
  const time = useTime();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const [telemetry, setTelemetry] = useState({ temp: 34, mem: 1.1, sync: 'OK', load: 24 });

  useEffect(() => {
    const id = setInterval(() => {
      setTelemetry({
        temp: Math.floor(32 + Math.random() * 6),
        mem: parseFloat((1.0 + Math.random() * 0.3).toFixed(2)),
        sync: Math.random() > 0.05 ? 'OK' : 'SYNCING',
        load: Math.floor(18 + Math.random() * 15),
      });
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const shards = useMemo(
    () =>
      [...Array(12)].map((_, i) => ({
        id: i,
        size: Math.random() * 40 + 20,
        orbit: Math.random() * 100 + 120,
        speed: Math.random() * 0.5 + 0.2,
        offset: Math.random() * 360,
      })),
    []
  );

  return (
    <div className="neural-anchor" onMouseMove={handleMouseMove}>
      <motion.div
        className="neural-container"
        style={{
          rotateX: useTransform(springY, [-0.5, 0.5], [30, -30]),
          rotateY: useTransform(springX, [-0.5, 0.5], [-30, 30]),
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Central Polyhedron */}
        <motion.div
          className="neural-core"
          animate={{
            scale: [1, 1.1, 1],
            rotateY: [0, 180, 360],
            filter: activeEntry !== null ? ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)'] : 'none',
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', opacity: 0.6 }}>
            <motion.path
              d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <path
              d="M50 5 L50 95 M5 25 L95 75 M5 75 L95 25"
              stroke="var(--accent)"
              strokeWidth="0.2"
              style={{ opacity: 0.3 }}
            />
          </svg>
          <div className="neural-core-glow" />
        </motion.div>

        {/* Orbital Shards */}
        {shards.map((shard) => (
          <motion.div
            key={shard.id}
            className="neural-shard"
            style={{
              width: shard.size,
              height: 2,
              x: useTransform(time, (t) => Math.cos((t * shard.speed + shard.offset) * 0.002) * shard.orbit),
              y: useTransform(time, (t) => Math.sin((t * shard.speed + shard.offset) * 0.002) * shard.orbit),
              z: useTransform(time, (t) => Math.sin((t * shard.speed + shard.offset) * 0.001) * 50),
              rotateZ: useTransform(time, (t) => t * shard.speed * 0.1),
            }}
          >
            <div style={{ width: '100%', height: '100%', background: 'var(--accent)', opacity: 0.2, boxShadow: '0 0 8px var(--accent)' }} />
            <span style={{ position: 'absolute', top: '-16px', left: 0, fontFamily: 'var(--font-mono)', fontSize: '6px', opacity: 0.4, color: 'var(--accent)' }}>
              0x{shard.id.toString(16)}
            </span>
          </motion.div>
        ))}

        {/* Connection line */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
          <motion.line
            x1="50%" y1="50%"
            x2="150%"
            y2={activeEntry !== null ? `${(activeEntry / 4) * 80 + 10}%` : '50%'}
            stroke="var(--accent)"
            strokeWidth="0.5"
            animate={{ opacity: activeEntry !== null ? 0.4 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </svg>
      </motion.div>

      {/* Live Telemetry */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '1rem', pointerEvents: 'none',
        fontFamily: 'var(--font-mono)', fontSize: '7px', opacity: 0.35,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div>CORE_TEMP: {telemetry.temp}°C</div>
            <div>PROCESS_SYNC: {telemetry.sync}</div>
          </div>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div>MEM_USAGE: {telemetry.mem}GB</div>
            <div>CPU_LOAD: {telemetry.load}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Uplink Radar ──────────────────────────────────────────────────── */
function UplinkRadar({ activeEntry }) {
  const targets = useMemo(() => [
    { label: 'SYS_ARCH::REACT_A11Y',     r: 120, angle: 45,  idx: 0 },
    { label: 'SYS_ARCH::DISTRIB_NODES',  r: 160, angle: 135, idx: 0 },
    { label: 'CR_MOTION::FRAMER_THREE',  r: 140, angle: 220, idx: 1 },
    { label: 'CR_MOTION::CANVAS_BLOOM',  r: 95,  angle: 190, idx: 1 },
    { label: 'SYS_DEV::PROD_GRADE',      r: 170, angle: 300, idx: 2 },
    { label: 'SYS_DEV::STACK_APIS',      r: 130, angle: 260, idx: 2 },
    { label: 'CS_SCHOLAR::DISTRIB_SYS',  r: 110, angle: 90,  idx: 3 },
    { label: 'CS_SCHOLAR::GRAPHICS',     r: 150, angle: 115, idx: 3 },
    { label: 'ALG_EFF::PERF_OPTI',       r: 155, angle: 330, idx: 4 },
    { label: 'ALG_EFF::RESILIENT_SEC',   r: 105, angle: 20,  idx: 4 },
  ], []);

  const [scanFreq, setScanFreq] = useState(9.38);
  useEffect(() => {
    const id = setInterval(() => setScanFreq(parseFloat((9.2 + Math.random() * 0.4).toFixed(2))), 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="radar-anchor" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="radar-container" style={{ position: 'relative' }}>
        <div className="radar-sweep" />
        <div className="radar-circle radar-circle--1" />
        <div className="radar-circle radar-circle--2" />
        <div className="radar-circle radar-circle--3" />

        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible', opacity: 0.3, color: 'var(--accent)' }}>
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 5" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 5" />
          {targets.map((t, idx) => {
            const rad = (t.angle * Math.PI) / 180;
            const cx = 50 + (t.r / 400) * 100 * Math.cos(rad);
            const cy = 50 + (t.r / 400) * 100 * Math.sin(rad);
            const lit = activeEntry === t.idx;
            return (
              <motion.line
                key={idx}
                x1="50%" y1="50%"
                x2={`${cx}%`} y2={`${cy}%`}
                stroke={lit ? 'var(--accent)' : 'var(--ink-dim)'}
                strokeWidth={lit ? '0.75' : '0.25'}
                animate={{ opacity: lit ? 0.65 : 0.15 }}
                transition={{ duration: 0.3 }}
              />
            );
          })}
        </svg>

        {targets.map((t, idx) => {
          const rad = (t.angle * Math.PI) / 180;
          const cx = (t.r / 400) * 100 * Math.cos(rad);
          const cy = (t.r / 400) * 100 * Math.sin(rad);
          const lit = activeEntry === t.idx;
          return (
            <div
              key={idx}
              className="radar-dot"
              style={{
                top: `calc(50% + ${cy}% - 3px)`,
                left: `calc(50% + ${cx}% - 3px)`,
                background: lit ? 'var(--accent)' : 'var(--ink-dim)',
                boxShadow: lit ? '0 0 15px var(--accent)' : 'none',
                transform: lit ? 'scale(1.4)' : 'scale(1)',
                transition: 'all 0.3s ease',
                zIndex: 10,
              }}
            >
              <div style={{
                position: 'absolute', top: '-15px', left: '12px',
                fontFamily: 'var(--font-mono)', fontSize: '6px',
                color: lit ? 'var(--accent)' : 'var(--ink-dim)',
                fontWeight: lit ? 'bold' : 'normal',
                opacity: lit ? 1 : 0.45,
                letterSpacing: '0.05em',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}>
                {t.label}
              </div>
            </div>
          );
        })}

        {/* Center cross */}
        <div style={{
          position: 'absolute', width: '20px', height: '20px',
          border: '1px dashed var(--accent)', borderRadius: '50%',
          opacity: 0.3, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: '4px', height: '4px', background: 'var(--accent)', borderRadius: '50%' }} />
        </div>
      </div>

      {/* Telemetry overlay */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '1rem', pointerEvents: 'none',
        fontFamily: 'var(--font-mono)', fontSize: '7px', opacity: 0.35, color: 'var(--ink-mid)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div>RADAR_LOCK: ACTIVE</div>
            <div>SCAN_FREQ: {scanFreq}GHz</div>
          </div>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div>COORD_Y: 27.7172° N</div>
            <div>COORD_X: 85.3240° E</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Chrono Log ────────────────────────────────────────────────────── */
const chronoMilestones = [
  {
    year: '2024',
    label: 'FOUNDATION / SYSTEMS',
    details: 'Built <span>BerojgarCv</span> — automated TypeScript CV generators. Crafted <span>Devs-bouquet</span> hand-drawn HTML5 canvas interactive art. Solidified full-stack React skills.',
  },
  {
    year: '2025',
    label: 'COMPANIONS & SERVICES',
    details: 'Architected <span>Sahayogi</span> assistant nodes. Integrated robust backend services, database meshes, and real-time socket channels across distributed systems.',
  },
  {
    year: '2026',
    label: 'PREMIUM MOTION ARCHITECTURES',
    details: 'Creating <span>state-of-the-art</span> interactive web platforms. Fusing custom physics engines, WebGL/Three.js, and high-fidelity Framer Motion animations into production systems.',
  },
];

function ChronoLog({ activeYear, setActiveYear }) {
  return (
    <div className="chrono-anchor">
      <div className="chrono-container">
        <div className="chrono-line">
          <motion.div
            className="chrono-line-progress"
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </div>
        <div className="chrono-milestones">
          {chronoMilestones.map((m, idx) => (
            <div
              key={idx}
              className={`chrono-node${activeYear === idx ? ' active' : ''}`}
              onClick={() => setActiveYear(idx)}
              onMouseEnter={() => setActiveYear(idx)}
            >
              <div className="chrono-dot-outer">
                <div className="chrono-dot-inner" />
              </div>
              <div className="chrono-label-block">
                <span className="chrono-year">{m.year}</span>
                <span className="chrono-label">{m.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details card */}
      <div className="chrono-details-box">
        <div className="chrono-details-header">
          <span>LOG_FILE_202{activeYear + 4}.SYS</span>
          <span style={{ color: 'var(--accent)' }}>DECRYPTED</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={activeYear}
            className="chrono-details-text"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            dangerouslySetInnerHTML={{ __html: chronoMilestones[activeYear].details }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Bio Decryptor ─────────────────────────────────────────────────── */
function BioDecryptor() {
  const [phase, setPhase] = useState('idle'); // idle | decrypting | done
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phase !== 'decrypting') return;
    let pct = 0;
    const id = setInterval(() => {
      pct += Math.floor(Math.random() * 14) + 5;
      if (pct >= 100) {
        pct = 100;
        clearInterval(id);
        setPhase('done');
      }
      setProgress(pct);
    }, 70);
    return () => clearInterval(id);
  }, [phase]);

  const start = () => {
    if (phase === 'idle') {
      setPhase('decrypting');
    }
  };

  if (phase === 'idle') {
    return (
      <button className="decrypt-btn" onClick={start}>
        <span className="terminal-prompt">&gt;</span>
        RUN SYSTEM-DECRYPT --BIO
      </button>
    );
  }

  if (phase === 'decrypting') {
    return (
      <div className="decrypt-btn" style={{ cursor: 'default', gap: '0.75rem' }}>
        <span className="terminal-prompt">&gt;</span>
        <span>DECRYPTING CORE_BIO</span>
        <span style={{ marginLeft: 'auto', color: 'var(--ink)', fontWeight: 700 }}>[{progress}%]</span>
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          height: '2px', background: 'var(--accent)',
          width: `${progress}%`, transition: 'width 0.07s linear',
          boxShadow: '0 0 8px var(--accent)', borderRadius: '0 0 8px 8px',
        }} />
      </div>
    );
  }

  return (
    <motion.div
      className="decrypted-terminal"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="terminal-header">
        <span>[DEC_STATUS: SUCCESS]</span>
        <span className="glow-bullet" />
      </div>
      <div className="terminal-body">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 8px',
          fontSize: '8px', color: 'var(--ink-mid)',
          borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '8px', marginBottom: '8px',
        }}>
          <div>ALIAS: <span style={{ color: 'var(--ink)' }}>Ashmit Dev</span></div>
          <div>CLASS: <span style={{ color: 'var(--ink)' }}>CS Scholar</span></div>
          <div>LOC: <span style={{ color: 'var(--ink)' }}>Kathmandu, Nepal</span></div>
          <div>SIGNATURE: <span style={{ color: 'var(--ink)' }}>ABHISHEK_DEV</span></div>
        </div>
        <p style={{ fontSize: '9px', lineHeight: 1.6, color: 'var(--ink-mid)', marginBottom: '10px' }}>
          A systems-focused developer crafting performant web frontends &amp; backend services.
          Specialized in React, low-latency APIs, and mathematical algorithms.
        </p>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: '8px', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '8px',
        }}>
          <span style={{ color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.05em' }}>UPLINK SECURE</span>
          <a href="/resume.pdf" download className="cv-download-btn">DOWNLOAD_CV.SYS</a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── ViewSwitcher Button ───────────────────────────────────────────── */
function ViewBtn({ id, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`about-view-btn${active ? ' active' : ''}`}
    >
      {active ? `[ ${label} ]` : label}
    </button>
  );
}

/* ─── Main About Section ────────────────────────────────────────────── */
export default function About() {
  const [activeEntry, setActiveEntry] = useState(0);
  const [viewMode, setViewMode] = useState('neural');
  const [activeYear, setActiveYear] = useState(2);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const entryVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  };

  const handleEntryHover = (idx) => {
    setActiveEntry(idx);
    if (idx === 2) setActiveYear(0);
    else if (idx === 3) setActiveYear(1);
    else if (idx === 4) setActiveYear(2);
  };

  const viewportMotion = {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1 },
    exit:    { opacity: 0, scale: 0.94 },
    transition: { duration: 0.38, ease: [0.25, 1, 0.5, 1] },
  };

  const divider = <span style={{ color: 'rgba(250,204,21,0.15)', userSelect: 'none' }}>|</span>;

  return (
    <section id="about" aria-label="About" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>

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

        {/* ── LEFT: Viewport Column ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', position: 'relative', width: '100%', minHeight: '480px' }}>

          {/* Mode Switcher */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.25rem', zIndex: 10,
            background: 'rgba(0,0,0,0.18)', border: '1px solid var(--border)',
            padding: '0.3rem 0.7rem', borderRadius: '30px', backdropFilter: 'blur(10px)',
            flexWrap: 'wrap', justifyContent: 'center',
          }}>
            <ViewBtn id="neural" label="⌖ NEURAL_CORE" active={viewMode === 'neural'} onClick={() => setViewMode('neural')} />
            {divider}
            <ViewBtn id="radar"  label="📡 UPLINK_RADAR" active={viewMode === 'radar'}  onClick={() => setViewMode('radar')} />
            {divider}
            <ViewBtn id="chrono" label="📟 CHRONO_LOG"  active={viewMode === 'chrono'} onClick={() => setViewMode('chrono')} />
          </div>

          {/* Viewport Frame */}
          <div style={{ position: 'relative', width: '100%', height: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              {viewMode === 'neural' && (
                <motion.div key="neural" {...viewportMotion} style={{ position: 'absolute' }}>
                  <NeuralCore activeEntry={activeEntry} />
                </motion.div>
              )}
              {viewMode === 'radar' && (
                <motion.div key="radar" {...viewportMotion} style={{ position: 'absolute' }}>
                  <UplinkRadar activeEntry={activeEntry} />
                </motion.div>
              )}
              {viewMode === 'chrono' && (
                <motion.div key="chrono" {...viewportMotion} style={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <ChronoLog activeYear={activeYear} setActiveYear={setActiveYear} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── RIGHT: Dossier Content ── */}
        <motion.div
          className="dossier-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {dossierData.map((entry, idx) => (
            <motion.article
              key={idx}
              className={`dossier-entry${activeEntry === idx ? ' active' : ''}`}
              variants={entryVariants}
              onMouseEnter={() => handleEntryHover(idx)}
            >
              <span className="dossier-entry-label">[ {entry.label} ]</span>
              <div className="dossier-entry-command">{entry.command}</div>
              <h3
                className="dossier-entry-response"
                dangerouslySetInnerHTML={{ __html: entry.response }}
              />
            </motion.article>
          ))}

          {/* Bio Decryptor */}
          <div className="dossier-console">
            <BioDecryptor />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
