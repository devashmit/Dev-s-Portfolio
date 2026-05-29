import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { Terminal, MapPin, Cpu, Clock, GitBranch, Shield } from 'lucide-react';

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
    const currentCode = filesMap[activeFile].code;
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
        <motion.div 
          className="hud-status-bar"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Module 1: System Status */}
          <div className="hud-metric-card" title="Host cluster status. Changes based on active workspace file.">
            <div className="hud-status-node">
              <span 
                className="hud-pulse-dot" 
                style={{ 
                  color: activeFile === 'secure-uplink.sh' ? '#ef4444' : (activeFile === 'developer-profile.json' ? 'var(--accent)' : '#10b981') 
                }}
              ></span>
              <Terminal className="hud-icon accent" size={13} />
              <span className="hud-label">SYS_STATUS:</span>
              <span className="hud-metric-val">{filesMap[activeFile].status}</span>
            </div>
            <div className="hud-tooltip">Host cluster status. Dynamic state change.</div>
          </div>
          
          <span className="hud-divider">//</span>

          {/* Module 2: Security Firewall */}
          <div className="hud-metric-card" title="Sandboxed local environment. Hardware firewall active.">
            <Shield className="hud-icon green" size={13} />
            <span className="hud-metric-label">SECURE:</span>
            <span className="hud-metric-val">AES-256</span>
            <div className="hud-tooltip">Sandboxed core environment. Hardware firewall.</div>
          </div>

          <span className="hud-divider">//</span>

          {/* Module 3: Geolocation Coordinates */}
          <div className="hud-metric-card" title="Developer local coordinates. GMT +5:45 timezone.">
            <MapPin className="hud-icon accent" size={13} />
            <span className="hud-metric-label">LOC:</span>
            <span className="hud-metric-val">27.7172° N, 85.3240° E</span>
            <div className="hud-tooltip">Kathmandu, Nepal (Workstation standard timezone)</div>
          </div>

          <span className="hud-divider">//</span>

          {/* Module 4: Live Simulated Engine Performance */}
          <div className="hud-metric-card" title="Live CPU engine load. Dyn-resource allocation.">
            <Cpu className="hud-icon yellow" size={13} />
            <span className="hud-metric-label">CPU:</span>
            <span className="hud-metric-val">{cpuLoad}</span>
            <div className="hud-tooltip">Live engine load balancer. CPU resources stable.</div>
          </div>

          <span className="hud-divider">//</span>

          {/* Module 5: Repository Branch */}
          <div className="hud-metric-card hide-mobile" title="Current git version control node.">
            <GitBranch className="hud-icon blue" size={13} />
            <span className="hud-metric-label">BRANCH:</span>
            <span className="hud-metric-val">main@v2.4.0</span>
            <div className="hud-tooltip">Git version control. Encrypted production branch.</div>
          </div>

          <span className="hud-divider hide-mobile">//</span>

          {/* Module 6: Live clock and elapsed time */}
          <div className="hud-metric-card hide-mobile" title="System session uptime & real-time clock.">
            <Clock className="hud-icon purple" size={13} />
            <span className="hud-metric-label">UPTIME:</span>
            <span className="hud-metric-val">{uptime}</span>
            <span className="hud-metric-sep">/</span>
            <span className="hud-metric-val text-dim">{liveTime}</span>
            <div className="hud-tooltip">Session elapsed uptime & active local workstation clock.</div>
          </div>
        </motion.div>


        {/* Rebuilt Typographic Heading */}
        <motion.h2
          className="console-spotlight-text"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-hollow">FULL STACK</span>
          <br/>
          <span className="text-solid">DEVELOPER</span>
        </motion.h2>

        {/* Enhanced Readable Sub-Headline */}
        <motion.p
          className="console-spotlight-sub"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
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
          <div className="ide-controls">
            <div className="ide-dot red"></div>
            <div className="ide-dot yellow"></div>
            <div className="ide-dot green"></div>
          </div>
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
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
