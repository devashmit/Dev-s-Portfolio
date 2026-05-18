import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const codeLines = [
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

export default function SystemConsole() {
  const [typedCode, setTypedCode] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    if (currentIndex < codeLines.length) {
      const timer = setTimeout(() => {
        setTypedCode(prev => [...prev, codeLines[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 100 + Math.random() * 150); // Random typing delay
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <div 
      className="console-container relative-z"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Concentric Sonar Grid Background */}
      <div className="sonar-grid-overlay">
        <motion.div 
          style={{ x: gridX, y: gridY }}
          className="sonar-grid-inner"
        >
          <svg width="100%" height="100%" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="400" cy="400" r="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" className="sonar-ring ring-1" />
            <circle cx="400" cy="400" r="200" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" className="sonar-ring ring-2" />
            <circle cx="400" cy="400" r="300" stroke="currentColor" strokeWidth="1" className="sonar-ring ring-3" />
            <circle cx="400" cy="400" r="380" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 15" className="sonar-ring ring-4" />
            
            <line x1="400" y1="0" x2="400" y2="800" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
            <line x1="0" y1="400" x2="800" y2="400" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
            
            <line x1="117" y1="117" x2="683" y2="683" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 8" />
            <line x1="117" y1="683" x2="683" y2="117" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 8" />
            
            <circle cx="400" cy="400" r="4" fill="var(--accent)" className="sonar-center-dot" />
          </svg>
        </motion.div>
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
          <div className="hud-status-node">
            <span className="hud-pulse-dot"></span>
            <span className="hud-label">SYS_STATUS: ACTIVE</span>
          </div>
          <span className="hud-divider">//</span>
          <div className="hud-metric">
            <span className="hud-metric-label">LOC:</span>
            <span className="hud-metric-val">27.7172° N, 85.3240° E</span>
          </div>
          <span className="hud-divider">//</span>
          <div className="hud-metric">
            <span className="hud-metric-label">NODE:</span>
            <span className="hud-metric-val">KTM_04</span>
          </div>
          <span className="hud-divider">//</span>
          <div className="hud-metric hide-mobile">
            <span className="hud-metric-label">PING:</span>
            <span className="hud-metric-val">12ms</span>
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
              <li className="active"><span className="file-icon" style={{ background: 'rgba(250,204,21,0.15)', color: 'var(--accent)' }}>TS</span> app-router.ts</li>
              <li><span className="file-icon">PY</span> data-mesh.py</li>
              <li><span className="file-icon">SH</span> secure-uplink.sh</li>
              <li><span className="file-icon">JSON</span> developer-profile.json</li>
            </ul>
            
            <div className="ide-sidebar-title mt-6">SYSTEM STATUS</div>
            <div className="ide-status-item" style={{ gap: '0.4rem', color: 'var(--accent)' }}>
              <span className="status-dot"></span> UPLINK ONLINE
            </div>
            <div className="ide-status-item" style={{ marginTop: '0.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              ⚡ COGNITIVE LEVEL: 100%
            </div>
            <div className="ide-status-item" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              🛡️ FIREWALL: ACTIVE
            </div>
          </div>

          {/* Main Editor */}
          <div className="ide-main">
            <div className="ide-tabs">
              <div className="ide-tab active">
                <span className="file-icon" style={{ background: 'rgba(250,204,21,0.15)', color: 'var(--accent)' }}>TS</span> app-router.ts
              </div>
              <div className="ide-tab">
                <span className="file-icon">JSON</span> developer-profile.json
              </div>
            </div>
            
            <div className="ide-editor-content">
              <div className="ide-line-numbers">
                {[1,2,3,4,5,6,7,8,9,10,11].map(num => <div key={num}>{num}</div>)}
              </div>
              <div className="ide-code">
                <pre>
                  <code>
                    {typedCode.map((segment, i) => (
                      <span key={i} className={`token ${segment.type}`}>
                        {segment.text}
                      </span>
                    ))}
                    <span className="ide-cursor"></span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
