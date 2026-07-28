import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import TextReveal from './TextReveal';
import { stackItems, springtune, tigranzs } from '../data/content';
import SystemConsole from './SystemConsole';

function Keycap({ item, index, onHover, onLeave, isActive }) {
  // Mechanical keypress spring configuration - using springtune preset
  const springConfig = springtune;

  // Audio click generator for physical realism
  const playClick = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isActive ? 120 : 150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // AudioContext blocked or not supported
    }
  };

  return (
    <motion.div
      className={`keycap-container ${isActive ? 'active' : ''}`}
      onMouseEnter={() => {
        onHover(item);
        playClick();
      }}
      onMouseLeave={onLeave}
      style={{
        '--key-color': item.color,
      }}
      initial={{ opacity: 0, scale: 0.3, z: -100 }}
      whileInView={{ 
        opacity: 1, 
        scale: 1, 
        z: 0,
        transition: { 
          type: "spring",
          stiffness: 120,
          damping: 14,
          delay: index * 0.03
        }
      }}
      viewport={{ once: true }}
    >
      {/* 3D Keycap Base (Clear Switch Housing) */}
      <div className="keycap-switch-base">
        <div className="switch-face top"></div>
        <div className="switch-face front"></div>
        <div className="switch-face right"></div>
      </div>

      {/* 3D Keycap Body */}
      <motion.div 
        className="keycap-3d"
        animate={isActive ? {
          y: 6, // Push keycap down
          scale: 0.96,
        } : {
          y: 0,
          scale: 1,
        }}
        transition={springConfig}
      >
        {/* Top Face */}
        <div className="keycap-face">
          <div className="keycap-icon-wrapper">
            <img 
              src={item.icon} 
              alt={item.name} 
              className={`keycap-icon ${item.invertInDark ? 'invert-in-dark' : ''}`} 
            />
          </div>
        </div>
        {/* Extruded Sides */}
        <div className="keycap-side front"></div>
        <div className="keycap-side right"></div>
      </motion.div>

      {/* Brand Colored Underglow LED */}
      <div className={`key-led-glow ${isActive ? 'active' : ''}`}></div>
    </motion.div>
  );
}

export default function Stack() {
  const [activeItem, setActiveItem] = useState(null);
  const leaveTimeout = useRef(null);

  const handleHover = (item) => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    setActiveItem(item);
  };

  const handleLeave = () => {
    // Soft delay to prevent quick flickering between key selections
    leaveTimeout.current = setTimeout(() => {
      setActiveItem(null);
    }, 400);
  };

  return (
    <section id="stack" aria-label="Technical skills" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* HUD Scanline & Grid overlay */}
      <div className="hud-scanline"></div>

      <div className="section-intro relative-z">
        <motion.p 
          className="section-eyebrow" 
          initial={{ opacity: 0, x: -18 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          02 / THE ARSENAL
        </motion.p>
        <TextReveal text="Tech Stack" className="section-title" tag="h2" delay={0.1} />
        <p className="keyboard-hint">(hint: hover over a key to type)</p>
      </div>

      <div className="stack-keyboard-workspace relative-z">
        
        {/* Telemetry Display Terminal - slides in from right */}
        <motion.div
          className="stack-telemetry-panel"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ ...tigranzs, delay: 0.1 }}
        >
          <div className="telemetry-chrome">

            <span className="telemetry-title">Skill_Telemetry.sh</span>
          </div>
          
          <div className="telemetry-body">
            <AnimatePresence mode="wait">
              {activeItem ? (
                <motion.div 
                  key={activeItem.name}
                  initial={{ opacity: 0, filter: 'blur(4px)', x: -10 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                  exit={{ opacity: 0, filter: 'blur(4px)', x: 10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="telemetry-content"
                >
                  <div className="telemetry-header">
                    <span className="telemetry-label" style={{ color: activeItem.color }}>
                      {activeItem.name.toUpperCase()}
                    </span>
                    <span className="telemetry-badge" style={{ borderColor: activeItem.color, color: activeItem.color }}>
                      {activeItem.status}
                    </span>
                  </div>
                  
                  {/* Glowing custom description - blurs in after the header */}
                  <motion.h3 
                    className="telemetry-description"
                    initial={{ opacity: 0, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    transition={{ delay: 0.08, duration: 0.35, ease: 'easeOut' }}
                  >
                    {activeItem.desc}
                  </motion.h3>

                  <div className="telemetry-stats">
                    <div className="stat-row">
                      <span className="stat-lbl">CONNECTION:</span>
                      <span className="stat-val text-green">SECURE</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-lbl">LATENCY:</span>
                      <span className="stat-val">1.2ms</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  className="telemetry-content-empty"
                >
                  <div className="pulse-prompt-line">
                    <span className="prompt-cursor">&gt;</span> Awaiting input...
                  </div>
                  <p className="prompt-subtext">Hover or tap on any mechanical keycap on the board to review systemic diagnostic details and competency levels.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 3D Isometric Mechanical Keyboard Deck */}
        <motion.div 
          className="keyboard-chassis-wrapper"
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ ...tigranzs, delay: 0.2 }}
        >
          <div className="keyboard-isometric-deck">
            {/* Base Bevel Frame */}
            <div className="keyboard-base-plate">
              <div className="keyboard-inner-tray">
                {stackItems.map((item, idx) => (
                  <Keycap 
                    key={item.name} 
                    item={item} 
                    index={idx}
                    isActive={activeItem?.name === item.name}
                    onHover={handleHover}
                    onLeave={handleLeave}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      <SystemConsole />
    </section>
  );
}
