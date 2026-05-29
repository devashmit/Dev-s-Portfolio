import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import Magnetic from './Magnetic';
import TextReveal from './TextReveal';
import { projectsData } from '../data/content';

/* ─── Canvas Previews (same draw logic, different container) ─────────── */
function ProjectCanvasPreview({ type }) {
  const canvasRef = useRef(null);
  const animRef  = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame = 0;
    let bloomProgress = 0.45;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  || 360;
      canvas.height = canvas.offsetHeight || 220;
    };
    resize();
    window.addEventListener('resize', resize);

    // Petals
    const petals = [];
    if (type === 'floating-petals') {
      for (let i = 0; i < 18; i++) {
        petals.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 4 + 3,
          vx: Math.random() * 0.4 - 0.2,
          vy: Math.random() * 0.5 + 0.15,
          angle: Math.random() * 360,
          spin: Math.random() * 1.5 - 0.75,
          offset: Math.random() * 100,
        });
      }
    }

    // Nodes
    const nodes = [], connections = [];
    if (type === 'node-network') {
      const count = 7;
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: 50 + Math.random() * (canvas.width - 100),
          y: 30 + Math.random() * (canvas.height - 60),
          r: Math.random() * 2 + 2,
          pulse: Math.random() * 100,
        });
      }
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 130 || Math.random() < 0.3) connections.push([i, j]);
        }
      }
    }

    const getColors = () => {
      const isLight = document.documentElement.classList.contains('light-mode');
      return {
        accent:  isLight ? '#D97706' : '#FACC15',
        ink:     isLight ? '#0F172A' : '#F8FAFC',
        inkMid:  isLight ? '#475569' : '#94A3B8',
      };
    };

    const draw = () => {
      frame++;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const c = getColors();

      if (type === 'cv-flow') {
        const spacing = 16;
        ctx.strokeStyle = c.accent + '08'; ctx.lineWidth = 1;
        for (let x = 0; x < width; x += spacing) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,height); ctx.stroke(); }
        for (let y = 0; y < height; y += spacing) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(width,y); ctx.stroke(); }

        const scanY = (frame * 1.6) % height;
        ctx.strokeStyle = c.accent + '44'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(0, scanY); ctx.lineTo(width, scanY); ctx.stroke();

        const grad = ctx.createLinearGradient(0, scanY - 40, 0, scanY);
        grad.addColorStop(0, 'transparent'); grad.addColorStop(1, c.accent + '0a');
        ctx.fillStyle = grad; ctx.fillRect(0, Math.max(0, scanY - 40), width, 40);

        const lines = ['> whoami: ashmit_dev','> compiler: typescript_v5','> status: BUILDING','> uplink: ONLINE'];
        ctx.font = '400 9px var(--font-mono)';
        lines.forEach((l, i) => {
          const chars = Math.min(l.length, Math.floor(frame / 3) - i * 5);
          if (chars > 0) {
            ctx.fillStyle = l.includes('ashmit') ? c.accent : c.ink + 'bb';
            ctx.fillText(l.slice(0, chars), 16, 32 + i * 20);
          }
        });

      } else if (type === 'flower-bloom') {
        const cx = width / 2, cy = height / 2;
        ctx.save(); ctx.translate(cx, cy);
        ctx.rotate(frame * 0.012);
        bloomProgress += (0.9 - bloomProgress) * 0.05;
        ctx.shadowBlur = 18; ctx.shadowColor = c.accent;
        for (let i = 0; i < 8; i++) {
          ctx.rotate(Math.PI / 4);
          ctx.strokeStyle = c.accent + 'aa'; ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-30*bloomProgress,-30*bloomProgress,-15*bloomProgress,-70*bloomProgress,0,-78*bloomProgress);
          ctx.bezierCurveTo(15*bloomProgress,-70*bloomProgress,30*bloomProgress,-30*bloomProgress,0,0);
          ctx.stroke();
        }
        ctx.shadowBlur = 0; ctx.restore();
        ctx.fillStyle = c.inkMid + '55'; ctx.font = '500 7px var(--font-mono)';
        ctx.fillText(`BLOOM: ${(bloomProgress*100).toFixed(0)}%`, 12, height - 12);

      } else if (type === 'floating-petals') {
        petals.forEach(p => {
          p.y -= p.vy * 1.2;
          p.x += Math.sin(frame * 0.02 + p.offset) * 0.3 + p.vx;
          p.angle += p.spin;
          if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
          if (p.x < -10 || p.x > width + 10) p.x = p.x < 0 ? width : 0;
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate((p.angle * Math.PI) / 180);
          ctx.fillStyle = c.accent + '22'; ctx.strokeStyle = c.accent + '88'; ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, -p.r);
          ctx.quadraticCurveTo(p.r*1.4, -p.r*0.4, p.r, p.r);
          ctx.quadraticCurveTo(-p.r*0.4, p.r*1.4, -p.r, 0);
          ctx.quadraticCurveTo(-p.r, -p.r, 0, -p.r);
          ctx.fill(); ctx.stroke(); ctx.restore();
        });
        ctx.fillStyle = c.inkMid + '77'; ctx.font = '700 8px var(--font-mono)';
        ctx.fillText('PETAL_ECOSYSTEM', 12, 20);

      } else if (type === 'node-network') {
        connections.forEach(([i, j]) => {
          ctx.strokeStyle = c.accent + '33'; ctx.lineWidth = 0.6;
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
          if (frame % 60 < 20) {
            const t = (frame % 20) / 20;
            const px = nodes[i].x + (nodes[j].x - nodes[i].x) * t;
            const py = nodes[i].y + (nodes[j].y - nodes[i].y) * t;
            ctx.fillStyle = c.accent;
            ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2); ctx.fill();
          }
        });
        nodes.forEach(n => {
          n.pulse += 0.06;
          const r = n.r + Math.sin(n.pulse) * 1.2;
          ctx.strokeStyle = c.accent + '55'; ctx.lineWidth = 0.75;
          ctx.beginPath(); ctx.arc(n.x, n.y, r * 2.5, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = c.accent;
          ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fill();
        });
        ctx.fillStyle = c.inkMid + '77'; ctx.font = '700 8px var(--font-mono)';
        ctx.fillText('SYNAPSE_GRID::ONLINE', 12, 20);
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}

/* ─── Floating Preview Tooltip ───────────────────────────────────────── */
function FloatingPreview({ project, visible }) {
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);
  const springX = useSpring(x, { stiffness: 220, damping: 28 });
  const springY = useSpring(y, { stiffness: 220, damping: 28 });

  useEffect(() => {
    const onMove = (e) => {
      x.set(e.clientX + 24);
      y.set(e.clientY - 120);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y]);

  return (
    <AnimatePresence>
      {visible && project && (
        <motion.div
          className="project-floating-preview"
          style={{ left: springX, top: springY }}
          initial={{ opacity: 0, scale: 0.88, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 10 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pfp-canvas-wrap">
            <ProjectCanvasPreview type={project.previewType} />
          </div>
          <div className="pfp-meta">
            <span className="pfp-tags">
              {project.tags.map(t => <span key={t}>{t}</span>)}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Single Project Row ─────────────────────────────────────────────── */
function ProjectRow({ project, index, onHover, onLeave, isHovered }) {
  return (
    <motion.div
      className={`proj-row${isHovered ? ' proj-row--active' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={onLeave}
    >
      <span className="proj-index">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="proj-info">
        <h3 className="proj-title">{project.title}</h3>
        <p className="proj-desc">{project.desc}</p>
      </div>

      <div className="proj-tags-inline">
        {project.tags.map(t => (
          <span key={t} className="proj-tag-pill">{t}</span>
        ))}
      </div>

      <span className="proj-year">{project.year}</span>

      <Magnetic>
        <a
          href={project.github}
          target={project.github !== '#' ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="proj-link-btn"
          aria-label={`View ${project.title}`}
          onClick={e => project.github === '#' && e.preventDefault()}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </Magnetic>
    </motion.div>
  );
}

/* ─── Main Projects Section ──────────────────────────────────────────── */
export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);

  const categories = [
    { id: 'all',      label: 'ALL' },
    { id: 'web',      label: 'WEB' },
    { id: 'systems',  label: 'SYSTEMS' },
    { id: 'creative', label: 'CREATIVE' },
  ];

  const filtered = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" aria-label="Selected projects">
      {/* Floating preview portal — rendered outside the list flow */}
      <FloatingPreview project={hoveredProject} visible={!!hoveredProject} />

      <div className="section-intro">
        <motion.p
          className="section-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          01 / SELECTED WORK
        </motion.p>
        <TextReveal text="Featured Projects" className="section-title" tag="h2" delay={0.2} />
      </div>

      {/* Filter strip */}
      <motion.div
        className="proj-filters"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`proj-filter-btn${selectedCategory === cat.id ? ' active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Column header */}
      <motion.div
        className="proj-list-header"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        <span>#</span>
        <span>Project</span>
        <span>Stack</span>
        <span>Year</span>
        <span />
      </motion.div>

      {/* Project rows */}
      <div className="proj-list">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, idx) => (
            <ProjectRow
              key={project.title}
              project={project}
              index={idx}
              isHovered={hoveredProject?.title === project.title}
              onHover={setHoveredProject}
              onLeave={() => setHoveredProject(null)}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
