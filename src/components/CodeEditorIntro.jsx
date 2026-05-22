import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

/* ── Syntax token colours ─────────────────────────────────────────── */
const C = {
  keyword:     '#C678DD',   // purple  – const / let
  variable:    '#E5C07B',   // yellow  – identifier names
  property:    '#56B6C2',   // cyan    – object keys
  string:      '#98C379',   // green   – string values
  bracket:     '#ABB2BF',   // grey    – brackets / commas
  number:      '#D19A66',   // orange  – numbers
  comment:     '#5C6370',   // muted   – comments
  accent:      '#FACC15',   // neon yellow – active glow
};

/* ── Profile data ─────────────────────────────────────────────────── */
const profileLines = [
  { type: 'comment',   raw: '// developer-profile.ts — core node 04' },
  { type: 'blank' },
  { type: 'keyword',   raw: 'const',    rest: ' developerProfile = {' },
  { type: 'property',  key: '  engineer',      value: '"Ashmit Dev"',         comma: true },
  { type: 'property',  key: '  role',           value: '"Full Stack Developer"', comma: true },
  { type: 'property',  key: '  location',       value: '"Kathmandu, Nepal 🇳🇵"', comma: true },
  { type: 'property',  key: '  specialties',    value: '["Systems Arch", "Motion Design"]', comma: true, isArray: true },
  { type: 'property',  key: '  environment',    value: '"Secure Core Terminal"', comma: true },
  { type: 'property',  key: '  system_status',  value: '"Production Ready ✓"',  comma: true },
  { type: 'property',  key: '  latency',        value: '"0.08ms (Optimized)"',  comma: true },
  { type: 'property',  key: '  active_stack',   value: '["React", "Node.js", "Java", "TS"]', comma: true, isArray: true },
  { type: 'property',  key: '  github',         value: '"github.com/devashmit"', comma: true, isLink: true },
  { type: 'property',  key: '  coordinates',    value: '"27.7172° N, 85.3240° E"', comma: false },
  { type: 'close',     raw: '};' },
];

/* ── Sidebar file list ────────────────────────────────────────────── */
const sidebarFiles = [
  { name: 'developer-profile.ts', ext: 'TS',   active: true,  color: '#3178C6' },
  { name: 'app-router.tsx',        ext: 'TSX',  active: false, color: '#61DAFB' },
  { name: 'data-mesh.py',          ext: 'PY',   active: false, color: '#3572A5' },
  { name: 'secure-uplink.sh',      ext: 'SH',   active: false, color: '#89E051' },
];

const sysCommands = [
  '> RUN DIAGNOSTIC',
  '> PING GITHUB',
  '> STATUS CHECK',
];

/* ── Animated typing cursor ───────────────────────────────────────── */
function BlinkCursor() {
  return (
    <span style={{
      display: 'inline-block',
      width: '0.55em', height: '1em',
      background: C.accent,
      marginLeft: 2,
      verticalAlign: 'middle',
      borderRadius: 1,
      animation: 'ceiBlink 1s step-end infinite',
    }} />
  );
}

/* ── Render one line of "code" ────────────────────────────────────── */
function CodeLine({ line, revealed, isLast }) {
  if (line.type === 'blank') return <div style={{ height: '1.45em' }} />;

  if (line.type === 'comment') return (
    <div style={{ color: C.comment, fontStyle: 'italic' }}>
      {line.raw}{isLast && revealed && <BlinkCursor />}
    </div>
  );

  if (line.type === 'keyword') return (
    <div>
      <span style={{ color: C.keyword }}>{line.raw}</span>
      <span style={{ color: C.bracket }}>{line.rest}</span>
      {isLast && revealed && <BlinkCursor />}
    </div>
  );

  if (line.type === 'close') return (
    <div style={{ color: C.bracket }}>
      {line.raw}{isLast && revealed && <BlinkCursor />}
    </div>
  );

  /* property line */
  const keyColor  = C.property;
  let valueEl;

  if (line.isLink) {
    valueEl = (
      <a
        href={`https://${line.value.replace(/"/g, '')}`}
        target="_blank"
        rel="noreferrer"
        style={{ color: C.string, textDecoration: 'underline', textDecorationStyle: 'dotted', cursor: 'pointer' }}
      >
        {line.value}
      </a>
    );
  } else if (line.isArray) {
    // render array inline with bracket colours
    const inner = line.value.slice(1, -1); // strip [ ]
    valueEl = (
      <span>
        <span style={{ color: C.bracket }}>[</span>
        {inner.split(', ').map((item, i, arr) => (
          <span key={i}>
            <span style={{ color: C.string }}>{item.trim()}</span>
            {i < arr.length - 1 && <span style={{ color: C.bracket }}>, </span>}
          </span>
        ))}
        <span style={{ color: C.bracket }}>]</span>
      </span>
    );
  } else {
    valueEl = <span style={{ color: C.string }}>{line.value}</span>;
  }

  return (
    <div>
      <span style={{ color: keyColor }}>{line.key}</span>
      <span style={{ color: C.bracket }}>: </span>
      {valueEl}
      {line.comma && <span style={{ color: C.bracket }}>,</span>}
      {isLast && revealed && <BlinkCursor />}
    </div>
  );
}

/* ── Telemetry bar (live metrics) ─────────────────────────────────── */
function TelemetryBar() {
  const [metrics, setMetrics] = useState({ cpu: 18, mem: 1.12, ping: 4, uptime: '99.98%' });
  useEffect(() => {
    const id = setInterval(() => setMetrics({
      cpu:    Math.floor(15 + Math.random() * 12),
      mem:    parseFloat((1.0 + Math.random() * 0.3).toFixed(2)),
      ping:   Math.floor(3 + Math.random() * 4),
      uptime: '99.98%',
    }), 2200);
    return () => clearInterval(id);
  }, []);

  const sep = <span style={{ color: 'rgba(250,204,21,0.2)', margin: '0 0.5rem' }}>|</span>;

  return (
    <div className="cei-telemetry">
      <span className="cei-tele-dot" />
      <span style={{ color: C.accent, fontWeight: 700 }}>ONLINE</span>
      {sep}
      <span className="cei-tele-label">CPU</span>
      <span className="cei-tele-val">{metrics.cpu}%</span>
      {sep}
      <span className="cei-tele-label">MEM</span>
      <span className="cei-tele-val">{metrics.mem}GB</span>
      {sep}
      <span className="cei-tele-label">PING</span>
      <span className="cei-tele-val">{metrics.ping}ms</span>
      {sep}
      <span className="cei-tele-label">UPTIME</span>
      <span className="cei-tele-val">{metrics.uptime}</span>
    </div>
  );
}

/* ── Main Export ──────────────────────────────────────────────────── */
export default function CodeEditorIntro() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [activeFile, setActiveFile]       = useState(0);
  const [hoveredLine, setHoveredLine]     = useState(null);
  const timerRef = useRef(null);

  /* Typewriter reveal: one line per 110ms */
  useEffect(() => {
    if (revealedCount >= profileLines.length) return;
    timerRef.current = setTimeout(() => setRevealedCount(n => n + 1), 110);
    return () => clearTimeout(timerRef.current);
  }, [revealedCount]);

  const visibleLines = profileLines.slice(0, revealedCount);
  const lineNums     = visibleLines.map((_, i) => i + 1);

  return (
    <motion.div
      className="cei-wrapper"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Window chrome ── */}
      <div className="cei-chrome">
        <div className="cei-dots">
          <span className="cei-dot" style={{ background: '#FF5F56' }} />
          <span className="cei-dot" style={{ background: '#FFBD2E' }} />
          <span className="cei-dot" style={{ background: '#27C93F' }} />
        </div>
        <span className="cei-window-title">DEVELOPER WORKSTATION — core-node-04</span>
        <TelemetryBar />
      </div>

      {/* ── Body: sidebar + editor ── */}
      <div className="cei-body">

        {/* Sidebar */}
        <div className="cei-sidebar">
          <div className="cei-sidebar-section">CORE_PROJECTS</div>
          <ul className="cei-file-list">
            {sidebarFiles.map((f, i) => (
              <li
                key={i}
                className={`cei-file-item${i === activeFile ? ' active' : ''}`}
                onClick={() => setActiveFile(i)}
              >
                <span className="cei-file-ext" style={{ background: f.color + '22', color: f.color }}>
                  {f.ext}
                </span>
                {f.name}
              </li>
            ))}
          </ul>

          <div className="cei-sidebar-section" style={{ marginTop: '1.5rem' }}>SYSTEM COMMANDS</div>
          <ul className="cei-cmd-list">
            {sysCommands.map((cmd, i) => (
              <li key={i} className="cei-cmd-item">{cmd}</li>
            ))}
          </ul>
        </div>

        {/* Editor */}
        <div className="cei-editor">
          {/* Tabs */}
          <div className="cei-tabs">
            {sidebarFiles.slice(0, 2).map((f, i) => (
              <button
                key={i}
                className={`cei-tab${i === activeFile ? ' active' : ''}`}
                onClick={() => setActiveFile(i)}
              >
                <span className="cei-file-ext" style={{ background: f.color + '22', color: f.color, fontSize: '0.6rem' }}>
                  {f.ext}
                </span>
                {f.name}
              </button>
            ))}
          </div>

          {/* Code area */}
          <div className="cei-code-area">
            {/* Line numbers */}
            <div className="cei-line-nums" aria-hidden="true">
              {lineNums.map(n => (
                <div
                  key={n}
                  style={{ color: hoveredLine === n - 1 ? 'var(--accent)' : undefined }}
                >
                  {n}
                </div>
              ))}
            </div>

            {/* Code */}
            <div className="cei-code">
              <AnimatePresence>
                {visibleLines.map((line, idx) => (
                  <motion.div
                    key={idx}
                    className={`cei-code-line${hoveredLine === idx ? ' hovered' : ''}`}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18 }}
                    onMouseEnter={() => setHoveredLine(idx)}
                    onMouseLeave={() => setHoveredLine(null)}
                  >
                    <CodeLine
                      line={line}
                      revealed={idx === visibleLines.length - 1}
                      isLast={idx === visibleLines.length - 1 && revealedCount < profileLines.length}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Status bar */}
          <div className="cei-status-bar">
            <span style={{ color: C.accent }}>● TypeScript</span>
            <span>Ln {revealedCount}, Col 1</span>
            <span>UTF-8</span>
            <span style={{ color: '#10b981' }}>✓ No Problems</span>
            <span>Spaces: 2</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
