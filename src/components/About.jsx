import { motion, useScroll, useTransform, useMotionValue, useSpring, useTime } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';
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
  const rotate = useTransform(time, [0, 10000], [0, 360], { clamp: false });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // Generate random "shards" for the orbital
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

        {/* Connection Lines (Procedural) */}
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
      <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none font-mono text-[7px] opacity-30">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
             <div>CORE_TEMP: 32°C</div>
             <div>PROCESS_SYNC: OK</div>
          </div>
          <div className="text-right">
             <div>MEM_USAGE: 1.2GB</div>
             <div>UPLINK: ACTIVE</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const [activeEntry, setActiveEntry] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
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
        
        {/* Left: Innovative Visual Anchor */}
        <div className="flex items-center justify-center">
          <NeuralCore activeEntry={activeEntry} />
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
              onMouseLeave={() => setActiveEntry(null)}
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
