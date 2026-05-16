import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const roles = [
  "Creative Developer",
  "UI Engineer",
  "Full Stack Dev",
  "Motion Designer"
];

const logs = [
  { prefix: "SYSTEM", text: "Portfolio initialized..." },
  { prefix: "ROLE", text: "Full Stack Developer" },
  { prefix: "FOCUS", text: "UI Engineering + Motion Design" },
  { prefix: "STATUS", text: "Available for freelance" },
  { prefix: "STACK", text: "React • Node • Framer Motion • Java" },
  { prefix: "BUILD", text: "Experiments shipping..." },
  { prefix: "CORE", text: "Performance-first architecture" },
  { prefix: "USER", text: "Session authenticated: GUEST_01" }
];

function ResourceMonitor() {
  const [stats, setStats] = useState([74, 42, 18]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setStats([
        Math.floor(60 + Math.random() * 20),
        Math.floor(30 + Math.random() * 30),
        Math.floor(10 + Math.random() * 40)
      ]);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="console-sidebar">
      <div className="hud-stat-box">
        <div className="hud-stat-label">
          <span>CPU LOAD</span>
          <span>{stats[0]}%</span>
        </div>
        <div className="hud-visual-bars">
          <div className="hud-bar"><div className="hud-bar-fill" style={{ '--fill': `${stats[0]}%` }}></div></div>
        </div>
      </div>

      <div className="hud-stat-box">
        <div className="hud-stat-label">
          <span>MEMORY</span>
          <span>{stats[1]}%</span>
        </div>
        <div className="hud-visual-bars">
          <div className="hud-bar"><div className="hud-bar-fill" style={{ '--fill': `${stats[1]}%` }}></div></div>
        </div>
      </div>

      <div className="hud-stat-box">
        <div className="hud-stat-label">
          <span>TRAFFIC</span>
          <span>{stats[2]}%</span>
        </div>
        <div className="hud-visual-bars">
          <div className="hud-bar"><div className="hud-bar-fill" style={{ '--fill': `${stats[2]}%` }}></div></div>
        </div>
      </div>

      <div className="mt-auto opacity-30 font-mono text-[10px] space-y-1">
        <div>UUID: 7F-B2-01-A4</div>
        <div>KERNEL: DARWIN_X64</div>
        <div>LATENCY: 12ms</div>
      </div>
    </div>
  );
}

export default function SystemConsole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [logIndex, setLogIndex] = useState(0);
  
  // 3D Tilt Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 100, damping: 20 });

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
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (logIndex < logs.length) {
      const timer = setTimeout(() => {
        setVisibleLogs((prev) => [...prev, logs[logIndex]]);
        setLogIndex((prev) => prev + 1);
      }, 800 + Math.random() * 1500);
      return () => clearTimeout(timer);
    } else {
        const resetTimer = setTimeout(() => {
            setVisibleLogs([]);
            setLogIndex(0);
        }, 12000);
        return () => clearTimeout(resetTimer);
    }
  }, [logIndex]);

  return (
    <div className="console-container relative-z">
      <div className="console-glow"></div>
      
      {/* Cinematic Spotlight */}
      <div className="console-spotlight">
        <AnimatePresence mode="wait">
          <motion.h2
            key={roles[roleIndex]}
            className="console-spotlight-text"
            initial={{ opacity: 0, y: 20, filter: 'blur(15px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(15px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {roles[roleIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Cyberdeck HUD Window */}
      <motion.div 
        className="console-window"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
      >
        <div className="console-scanlines"></div>
        
        {/* Decorative Corners */}
        <div className="hud-corner hud-corner-tl"></div>
        <div className="hud-corner hud-corner-tr"></div>
        <div className="hud-corner hud-corner-bl"></div>
        <div className="hud-corner hud-corner-br"></div>

        {/* Window Header */}
        <div className="console-header">
          <div className="console-controls">
            <div className="console-dot red"></div>
            <div className="console-dot yellow"></div>
            <div className="console-dot green"></div>
          </div>
          <div className="console-title">ashmit@portfolio: ~/arsenal/kernel_init.sh</div>
          <div className="opacity-20 font-mono text-[10px]">VER_2.1.0</div>
        </div>

        {/* Window Body */}
        <div className="console-body">
          {/* Main Feed */}
          <div className="console-main-feed">
            {visibleLogs.map((log, i) => (
              <motion.div 
                key={i} 
                className="console-log-line"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="console-log-prefix">[{log.prefix}]</span>
                <span className="console-log-text">{log.text}</span>
              </motion.div>
            ))}
            <div className="console-log-line">
              <span className="console-log-prefix">&gt;</span>
              <span className="console-caret"></span>
            </div>
          </div>

          {/* Sidebar Monitor */}
          <ResourceMonitor />
        </div>
      </motion.div>
    </div>
  );
}
