import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import TextReveal from './TextReveal';

/* ─── DATA & METRICS ─────────────────────────────────────────────── */
const milestones = [
  {
    year: '2022',
    title: 'The Ignition',
    tagline: 'Kernel initialization & core algorithm design',
    details: 'Initiated developer journey. Formulated mathematical models and custom algorithms. Structured extensive Java DSA implementations (Trees, Graphs, Sorting engines) from absolute ground zero.',
    systemLog: 'SYS_INIT: Booting development kernel...\nDSA_LOADED: Active memory buffers mapped.\nALGO_SUCCESS: High-efficiency search patterns established.'
  },
  {
    year: '2023',
    title: 'CS Foundations',
    tagline: 'Architecture compilation & pattern mastery',
    details: 'Deep-dived into OOP architecture, structural patterns, and computational complexity theory. Crafted math-driven computational tools and abstract systems using Python and Java.',
    systemLog: 'COMPILER_INIT: Translating object-oriented schemas...\nCOMPLEXITY_METRIC: O(log N) average query latency verified.\nPATTERN_CHECK: Factory, Strategy, and Singleton layers integrated.'
  },
  {
    year: '2024',
    title: 'Interactive UIs',
    tagline: 'Creative layout systems & state scaling',
    details: 'Pivoted to frontend mastery. Designed Devs-Bouquet (generative procedurally-drawn canvas physics) and BerojgarCv (automated templating engine). Shipped scalable full-stack pipelines.',
    systemLog: 'FRONTEND_READY: React v19 workspace mounted.\nPHYSICS_ENGINE: Procedural flower bloom sequence calibrated.\nAPI_ROUTER: Shipped REST handlers; throughput stable.'
  },
  {
    year: '2025',
    title: 'Distributed Systems',
    tagline: 'Real-time telemetry & WebSocket arrays',
    details: 'Currently engineering Sahayogi — a high-performance system featuring distributed web sockets, secure atomic session caches, and high-frequency real-time event streaming.',
    systemLog: 'SOCKET_ESTABLISHED: Listening on port 8080...\nLATENCY_AVG: 4.2ms socket heartbeat.\nSYNC_STATE: Active multi-threaded database replication running.'
  }
];

const telemetryMetrics = [
  { label: 'Dark Mode bias', value: '100%', extra: 'True Obsidian' },
  { label: 'Standard Focus State', value: 'Hyperdrive', extra: 'Coffee Powered' },
  { label: 'Key Stroke Latency', value: '18ms', extra: 'Mechanical Blue' },
  { label: 'UI Precision Margin', value: '0px', extra: 'Pixel Perfect' }
];

/* ─── TERMINAL WRITER HELPER ───────────────────────────────────────── */
function TerminalWriter({ logText, details, title, tagline }) {
  const [typedText, setTypedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < logText.length) {
        setTypedText((prev) => prev + logText.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 12);
    return () => clearInterval(timer);
  }, [logText]);

  return (
    <div className="terminal-box">
      <div className="terminal-bar">
        <div className="terminal-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="terminal-tab">system_log.sh</div>
      </div>
      <div className="terminal-body font-mono">
        <div className="log-success">// EXECUTION TERMINAL SUCCESSFUL</div>
        <pre className="log-code">{typedText}<span className="blink-cursor">_</span></pre>
        
        <div className="terminal-milestone-info">
          <h4>{title}</h4>
          <h5>{tagline}</h5>
          <p>{details}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN ABOUT EXPORT ──────────────────────────────────────────── */
export default function About() {
  const [activeTab, setActiveTab] = useState('bio');
  const [selectedMilestone, setSelectedMilestone] = useState(0);
  const creativeWorkspaceRef = useRef(null);
  const [activeCreativeCard, setActiveCreativeCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Tab configurations
  const tabs = [
    { id: 'bio', label: '[01. MISSION]' },
    { id: 'timeline', label: '[02. TIMELINE]' },
    { id: 'creative', label: '[03. CREATIVE]' },
    { id: 'specs', label: '[04. DIAGNOSTICS]' }
  ];

  return (
    <section id="about" aria-label="About Me Redesign" className="workstation-section">
      
      {/* ─── Header ─── */}
      <div className="workstation-header">
        <motion.p
          className="section-eyebrow"
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          // CORE LOGIC INTERFACE
        </motion.p>
        <TextReveal text="About Me" className="section-title" tag="h2" delay={0.1} />
        <motion.p
          className="workstation-tagline"
          initial={{ opacity: 0, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
        >
          An interactive, high-fidelity developer workstation displaying biological logs, engineering philosophies, and performance metrics.
        </motion.p>
      </div>

      {/* ─── Interactive Console HUD ─── */}
      <div className="console-wrapper">
        
        {/* HUD Navigation Tabs */}
        <div className="console-tabs-bar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`console-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  className="active-indicator"
                  layoutId="activeTabIndicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Console Workspace Screen */}
        <div className="console-screen">
          <div className="screen-scanline" />
          <div className="screen-corner-braces top-left" />
          <div className="screen-corner-braces top-right" />
          <div className="screen-corner-braces bottom-left" />
          <div className="screen-corner-braces bottom-right" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              className="screen-content"
            >
              {/* TAB 1: BIO & MISSION */}
              {activeTab === 'bio' && (
                <div className="workspace-bio-tab">
                  <div className="blueprint-visual-wrap">
                    <svg viewBox="0 0 200 200" className="blueprint-svg">
                      <defs>
                        <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="var(--accent-hover)" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>
                      <motion.circle
                        cx="100" cy="100" r="80"
                        fill="none" stroke="url(#glow-grad)" strokeWidth="1" strokeDasharray="5 3"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                      />
                      <motion.circle
                        cx="100" cy="100" r="60"
                        fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.3"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                      />
                      <circle cx="100" cy="100" r="40" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6" strokeDasharray="30 10 5 10" />
                      <circle cx="100" cy="100" r="10" fill="none" stroke="var(--accent)" strokeWidth="2" />
                      <motion.line
                        x1="100" y1="100" x2="100" y2="20"
                        stroke="var(--accent)" strokeWidth="1"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        style={{ transformOrigin: '100px 100px' }}
                      />
                      <circle cx="100" cy="20" r="4" fill="var(--accent)" />
                    </svg>
                    <div className="blueprint-glow-halo" />
                  </div>

                  <div className="bio-narrative font-body">
                    <h3>// ENGINEERING PHILOSOPHY</h3>
                    <p className="highlighted-bio-txt">
                      "Clean compilation is not enough. Visual computing, atomic physics engines, and high-fidelity systems must mesh to create true digital artwork."
                    </p>
                    <p>
                      Hello, I'm Ashmit. I build highly responsive, performance-driven web products. By merging procedural vector calculations, deep algorithmic paradigms, and robust backend micro-architectures, I design systems that feel organic, alive, and interactive.
                    </p>
                    <p>
                      Whether optimizing distributed websocket message queues or building hand-crafted creative physics pipelines, my objective remains absolute: <strong>absolute pixel perfection, bulletproof reliability, and gorgeous interactive styling.</strong>
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: JOURNEY TIMELINE */}
              {activeTab === 'timeline' && (
                <div className="workspace-timeline-tab">
                  <div className="timeline-rail">
                    {milestones.map((milestone, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedMilestone(idx)}
                        className={`timeline-step-btn ${selectedMilestone === idx ? 'active' : ''}`}
                      >
                        <span className="step-year font-mono">{milestone.year}</span>
                        <div className="step-glow-dot" />
                        <span className="step-title">{milestone.title}</span>
                      </button>
                    ))}
                  </div>

                  <div className="timeline-terminal-wrap">
                    <TerminalWriter
                      key={selectedMilestone}
                      logText={milestones[selectedMilestone].systemLog}
                      title={milestones[selectedMilestone].title}
                      tagline={milestones[selectedMilestone].tagline}
                      details={milestones[selectedMilestone].details}
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: CREATIVE SANDBOX */}
              {activeTab === 'creative' && (
                <div className="workspace-creative-tab" ref={creativeWorkspaceRef}>
                  {/* Card 1: Generative Canvas Physics */}
                  <motion.div
                    className={`creative-os-card ${activeCreativeCard === 0 ? 'active-focus' : ''}`}
                    drag={!isMobile}
                    dragConstraints={creativeWorkspaceRef}
                    dragElastic={0.08}
                    dragMomentum={false}
                    onPointerDown={() => setActiveCreativeCard(0)}
                    style={{
                      width: isMobile ? '100%' : '350px',
                      ...(isMobile ? {} : { left: '4%', top: '6%' })
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="creative-os-bar">
                      <div className="creative-os-dots">
                        <span className="dot red" />
                        <span className="dot yellow" />
                        <span className="dot green" />
                      </div>
                      <span className="creative-os-title font-mono">flower_bloom_engine.sh</span>
                    </div>
                    <div className="creative-os-body">
                      <div className="sandbox-canvas-placeholder">
                        <svg viewBox="0 0 100 100" className="generative-flower-svg">
                          <motion.path
                            d="M 50 50 C 30 20, 70 20, 50 50 C 20 30, 20 70, 50 50 C 70 80, 30 80, 50 50 C 80 70, 80 30, 50 50"
                            fill="none" stroke="var(--accent)" strokeWidth="0.8"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                          />
                          <circle cx="50" cy="50" r="5" fill="var(--accent)" />
                        </svg>
                      </div>
                      <h4>Devs-Bouquet & Soft Mathematics</h4>
                      <p>Building procedurally computed curves using organic math algorithms. Making code flower on the screen with hand-drawn physics vectors.</p>
                    </div>
                  </motion.div>

                  {/* Card 2: Extreme Precision */}
                  <motion.div
                    className={`creative-os-card ${activeCreativeCard === 1 ? 'active-focus' : ''}`}
                    drag={!isMobile}
                    dragConstraints={creativeWorkspaceRef}
                    dragElastic={0.08}
                    dragMomentum={false}
                    onPointerDown={() => setActiveCreativeCard(1)}
                    style={{
                      width: isMobile ? '100%' : '270px',
                      ...(isMobile ? {} : { right: '6%', top: '10%' })
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <div className="creative-os-bar">
                      <div className="creative-os-dots">
                        <span className="dot red" />
                        <span className="dot yellow" />
                        <span className="dot green" />
                      </div>
                      <span className="creative-os-title font-mono">precision_calibrator.cfg</span>
                    </div>
                    <div className="creative-os-body">
                      <h4>Extreme Precision</h4>
                      <p>We are obsessed with smooth framerates, zero design-compromises, and ultra-fluid responsiveness.</p>
                      <span className="aesthetic-badge">// FPS: 60 / HIGH_HZ</span>
                    </div>
                  </motion.div>

                  {/* Card 3: Technical Diversity */}
                  <motion.div
                    className={`creative-os-card ${activeCreativeCard === 2 ? 'active-focus' : ''}`}
                    drag={!isMobile}
                    dragConstraints={creativeWorkspaceRef}
                    dragElastic={0.08}
                    dragMomentum={false}
                    onPointerDown={() => setActiveCreativeCard(2)}
                    style={{
                      width: isMobile ? '100%' : '300px',
                      ...(isMobile ? {} : { left: '26%', bottom: '8%' })
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="creative-os-bar">
                      <div className="creative-os-dots">
                        <span className="dot red" />
                        <span className="dot yellow" />
                        <span className="dot green" />
                      </div>
                      <span className="creative-os-title font-mono">stack_orbit.bin</span>
                    </div>
                    <div className="creative-os-body">
                      <h4>Full Stack Orbit</h4>
                      <p>Blending Node engines with React layers. Deploying optimized schemas with atomic WebSockets.</p>
                      <span className="aesthetic-badge">// ACTIVE STACK</span>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* TAB 4: SYSTEM DIAGNOSTICS */}
              {activeTab === 'specs' && (
                <div className="workspace-specs-tab">
                  <div className="specs-metrics-grid">
                    {telemetryMetrics.map((m, idx) => (
                      <div key={idx} className="metric-glass-card">
                        <span className="metric-label font-mono">{m.label}</span>
                        <h4 className="metric-val text-glow font-display">{m.value}</h4>
                        <span className="metric-extra">{m.extra}</span>
                      </div>
                    ))}
                  </div>

                  <div className="diagnostic-logs-panel font-mono">
                    <div className="diag-header">// DIAGNOSTIC DIAGRAM READOUTS</div>
                    <div className="diag-grid">
                      <div className="diag-progress-wrap">
                        <svg viewBox="0 0 100 100" width="80" height="80">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(250,204,21,0.06)" strokeWidth="6" />
                          <motion.circle
                            cx="50" cy="50" r="40" fill="none" stroke="var(--accent)" strokeWidth="6"
                            strokeDasharray="251.2"
                            initial={{ strokeDashoffset: 251.2 }}
                            animate={{ strokeDashoffset: 50.24 }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                          />
                        </svg>
                        <span className="diag-ring-label">SYSTEM LATENCY (LOW)</span>
                      </div>

                      <div className="diag-status-rows">
                        <div className="diag-row">
                          <span className="lbl">CPU THREADS LOAD</span>
                          <span className="val success">OK / OPTIMIZED</span>
                        </div>
                        <div className="diag-row">
                          <span className="lbl">PIXEL MARGIN ALIGNMENT</span>
                          <span className="val success">100% PERFECT</span>
                        </div>
                        <div className="diag-row">
                          <span className="lbl">FRAMER MOTION INTERPOLATION</span>
                          <span className="val success">HARDWARE_ACCEL</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
