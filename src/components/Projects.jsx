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
    window.addEventL    // 3D particles & dynamic telemetry grid
    const particles = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * 300 - 150,
        y: Math.random() * 200 - 100,
        z: Math.random() * 200 - 100,
        vx: Math.random() * 0.6 - 0.3,
        vy: Math.random() * 0.6 - 0.3,
        vz: Math.random() * 0.8 - 0.4,
        size: Math.random() * 1.5 + 0.8
      });
    }

    const getColors = () => {
      const isLight = document.documentElement.classList.contains('light-mode');
      return {
        accent:  isLight ? '#0284c7' : '#06b6d4',
        accentGlow: isLight ? 'rgba(2, 132, 199, 0.2)' : 'rgba(6, 182, 212, 0.3)',
        ink:     isLight ? '#09090b' : '#fafafa',
        inkMid:  isLight ? '#52525b' : '#a1a1aa'
      };
    };

    const draw = () => {
      frame++;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const c = getColors();

      // Premium technical background grids
      const spacing = 18;
      ctx.strokeStyle = c.accent + '05';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < width; x += spacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += spacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Advanced matrix scan-line
      const scanY = (frame * 1.4) % height;
      ctx.strokeStyle = c.accent + '33';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.stroke();

      const grad = ctx.createLinearGradient(0, scanY - 30, 0, scanY);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(1, c.accentGlow);
      ctx.fillStyle = grad;
      ctx.fillRect(0, Math.max(0, scanY - 30), width, 30);

      // Rendering beautiful 3D particle cloud projections with parallax and depth rotation
      const cx = width / 2;
      const cy = height / 2;
      const fov = 150;

      // Dynamic rotation matrices based on elapsed frames
      const angleY = frame * 0.007;
      const angleX = frame * 0.005;

      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX), sinX = Math.sin(angleX);

      const projected = [];

      particles.forEach(p => {
        // Step velocities
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Bounce inside volume bounds
        if (Math.abs(p.x) > 130) p.vx *= -1;
        if (Math.abs(p.y) > 90) p.vy *= -1;
        if (Math.abs(p.z) > 90) p.vz *= -1;

        // Rotate Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // Rotate X
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        // Projection physics
        const scale = fov / (fov + z2);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          projected.push({ x: px, y: py, size: p.size * scale, z: z2 });
        }
      });

      // Draw connection vectors (Quantum entanglement networking representation)
      ctx.lineWidth = 0.45;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dist = Math.hypot(projected[i].x - projected[j].x, projected[i].y - projected[j].y);
          if (dist < 45) {
            const alpha = ((45 - dist) / 45) * 0.35;
            ctx.strokeStyle = c.accent + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      projected.forEach(p => {
        const opacity = (200 - p.z) / 300; // Depth fading
        ctx.fillStyle = c.accent + Math.floor(Math.min(1, Math.max(0, opacity)) * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Glowing core nodes
        if (p.z < -30) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = c.accent;
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Overlay dynamic diagnostic telemetry
      ctx.fillStyle = c.inkMid + '44';
      ctx.font = '700 7.5px var(--font-mono)';
      ctx.fillText(`VECTOR_MATRIX: [x: ${Math.sin(frame*0.01).toFixed(4)}, y: ${Math.cos(frame*0.015).toFixed(4)}]`, 16, 26);
      ctx.fillText(`GRAVITY_CONSTANT: -9.80665 m/s²`, 16, 38);
      ctx.fillText(`QUANTUM_STATES: ENTANGLED_35_NODES`, 16, 50);
      ctx.fillText(`RENDER_MODE: CORE_VECTOR_3D_ACCEL`, 16, height - 16);
      ctx.fillText(`UPLINK_STATUS: SECURE_CHANNEL_PASS`, width - 150, height - 16);

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

  // Add parallax variables based on relative cursor offset inside the preview window
  const mouseRelX = useMotionValue(0);
  const mouseRelY = useMotionValue(0);
  const springRelX = useSpring(mouseRelX, { stiffness: 100, damping: 20 });
  const springRelY = useSpring(mouseRelY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const onMove = (e) => {
      const px = e.clientX - 160;
      const py = e.clientY - 210;
      x.set(px);
      y.set(py);

      // Map dynamic tilt relative to viewport center or mouse coordinates
      const dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouseRelX.set(dx * 12); // Max 12 degrees tilt
      mouseRelY.set(dy * -12); // Max 12 degrees tilt
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y, mouseRelX, mouseRelY]);

  return (
    <AnimatePresence>
      {visible && project && (
        <motion.div
          className="project-floating-preview"
          style={{ 
            left: springX, 
            top: springY,
            rotateX: springRelY,
            rotateY: springRelX,
            transformStyle: 'preserve-3d',
            perspective: 800
          }}
          initial={{ opacity: 0, scale: 0.88, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 15 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div 
            className="pfp-canvas-wrap" 
            style={{ 
              transform: 'translateZ(25px)',
              transition: 'transform 0.1s ease'
            }}
          >
            <ProjectCanvasPreview type={project.previewType} />
          </div>
          <div className="pfp-meta" style={{ transform: 'translateZ(10px)' }}>
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
function ProjectRow({ project, index, onHover, onLeave, isHovered, isAnyHovered }) {
  const isDimmed = isAnyHovered && !isHovered;
  return (
    <motion.div
      className={`proj-row${isHovered ? ' proj-row--active' : ''}${isDimmed ? ' proj-row--dimmed' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => onHover(project)}
      onMouseLeave={onLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
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

  const isAnyHovered = hoveredProject !== null;

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
              isAnyHovered={isAnyHovered}
              onHover={setHoveredProject}
              onLeave={() => setHoveredProject(null)}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
