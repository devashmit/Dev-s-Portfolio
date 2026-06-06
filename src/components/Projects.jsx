import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';
import TextReveal from './TextReveal';
import { projectsData } from '../data/content';

/* ─── Procedural Canvas Visualizers ──────────────────────────────────── */
function ProjectCanvasPreview({ type }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth || 360;
      canvas.height = canvas.offsetHeight || 200;
    };
    resize();

    // Resize listener
    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);

    const getColors = () => {
      const isLight = document.documentElement.classList.contains('light-mode');
      return {
        accent: isLight ? '#0284c7' : '#06b6d4',
        accentGlow: isLight ? 'rgba(2, 132, 199, 0.15)' : 'rgba(6, 182, 212, 0.25)',
        ink: isLight ? '#09090b' : '#fafafa',
        inkMid: isLight ? '#52525b' : '#a1a1aa',
        gridColor: isLight ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)'
      };
    };

    // Specific Visualizer Initializers
    // 1. cv-flow (Flowchart Node-tree)
    const flowNodes = [
      { x: 40, y: 100, label: 'INPUT' },
      { x: 120, y: 50, label: 'PARSER' },
      { x: 120, y: 150, label: 'TEMPLATE' },
      { x: 200, y: 100, label: 'COMPILER' },
      { x: 280, y: 100, label: 'PDF_OUT' }
    ];
    let packets = [];

    // 2. flower-bloom
    const flowerParticles = [];
    for (let i = 0; i < 30; i++) {
      flowerParticles.push({
        angle: Math.random() * Math.PI * 2,
        dist: Math.random() * 80 + 10,
        speed: Math.random() * 0.2 + 0.1,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    // 3. floating-petals
    const petals = [];
    const petalCount = 18;
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * 320,
        y: Math.random() * 180,
        size: Math.random() * 5 + 3,
        speedY: Math.random() * 0.4 + 0.3,
        speedX: Math.random() * 0.2 - 0.1,
        swing: Math.random() * 4 + 2,
        swingSpeed: Math.random() * 0.015 + 0.005,
        phase: Math.random() * Math.PI * 2,
        rotSpeed: Math.random() * 0.02 - 0.01,
        angle: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.03 + 0.01
      });
    }
    const pollen = [];
    for (let i = 0; i < 15; i++) {
      pollen.push({
        x: Math.random() * 320,
        y: Math.random() * 180,
        speedY: Math.random() * 0.3 + 0.2,
        size: Math.random() * 1.2 + 0.6,
        alpha: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2
      });
    }

    // 4. node-network (WebSocket hub)
    const networkNodes = [];
    const netCount = 10;
    for (let i = 0; i < netCount; i++) {
      networkNodes.push({
        x: Math.random() * 260 + 30,
        y: Math.random() * 140 + 30,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 3 + 2,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    const draw = () => {
      frame++;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const c = getColors();

      // Draw baseline tech grid
      const gridSpacing = 16;
      ctx.strokeStyle = c.gridColor;
      ctx.lineWidth = 0.5;
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Draw custom visual based on type
      if (type === 'cv-flow') {
        // Draw flowchart connection channels with glowing lines
        ctx.lineWidth = 1;
        ctx.strokeStyle = c.accent + '15';
        
        // Define paths for rendering & packet transit
        const connections = [
          [0, 1], [0, 2], [1, 3], [2, 3], [3, 4]
        ];

        connections.forEach(([fromIdx, toIdx]) => {
          const fromNode = flowNodes[fromIdx];
          const toNode = flowNodes[toIdx];
          const fx = (fromNode.x / 320) * width;
          const fy = (fromNode.y / 200) * height;
          const tx = (toNode.x / 320) * width;
          const ty = (toNode.y / 200) * height;

          // Background channel line
          ctx.beginPath();
          ctx.moveTo(fx, fy);
          ctx.lineTo(tx, ty);
          ctx.stroke();

          // Overlay dynamic glowing dashed link
          ctx.strokeStyle = c.accent + '2d';
          ctx.setLineDash([4, 12]);
          ctx.lineDashOffset = -frame * 0.2;
          ctx.beginPath();
          ctx.moveTo(fx, fy);
          ctx.lineTo(tx, ty);
          ctx.stroke();
          ctx.setLineDash([]); // Reset
        });

        // Spawn packets along specific connections
        if (frame % 35 === 0) {
          // Select a random path route
          const pathOption = Math.random() > 0.5 ? [0, 1, 3, 4] : [0, 2, 3, 4];
          packets.push({
            route: pathOption,
            step: 0,
            progress: 0,
            color: c.accent,
            history: [] // For tail particles
          });
        }

        // Draw and update packets
        packets.forEach((p, idx) => {
          p.progress += 0.025; // Speed of packets
          
          if (p.progress >= 1) {
            p.progress = 0;
            p.step += 1;
          }

          if (p.step >= p.route.length - 1) {
            packets.splice(idx, 1);
            return;
          }

          const fromNode = flowNodes[p.route[p.step]];
          const toNode = flowNodes[p.route[p.step + 1]];
          const fx = (fromNode.x / 320) * width;
          const fy = (fromNode.y / 200) * height;
          const tx = (toNode.x / 320) * width;
          const ty = (toNode.y / 200) * height;

          const px = fx + (tx - fx) * p.progress;
          const py = fy + (ty - fy) * p.progress;

          // Record history for tail effect
          p.history.push({ x: px, y: py });
          if (p.history.length > 8) p.history.shift();

          // Render tail
          p.history.forEach((h, hIdx) => {
            const alpha = (hIdx / p.history.length) * 0.4;
            ctx.fillStyle = c.accent + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            ctx.beginPath();
            ctx.arc(h.x, h.y, 1.5 + (hIdx * 0.15), 0, Math.PI * 2);
            ctx.fill();
          });

          // Glowing packet head
          ctx.fillStyle = '#fff';
          ctx.shadowBlur = 8;
          ctx.shadowColor = c.accent;
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Draw Flow Nodes
        flowNodes.forEach((n, idx) => {
          const nx = (n.x / 320) * width;
          const ny = (n.y / 200) * height;
          const pulse = Math.sin(frame * 0.05 + idx) * 1.5;

          // Label
          ctx.fillStyle = c.inkMid;
          ctx.font = '700 7.5px var(--font-mono)';
          ctx.fillText(n.label, nx - 18, ny - 10);

          // Outer glowing ring
          ctx.strokeStyle = c.accent + '44';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(nx, ny, 7 + pulse, 0, Math.PI * 2);
          ctx.stroke();

          // Solid node core
          ctx.strokeStyle = c.accent;
          ctx.lineWidth = 1.5;
          ctx.fillStyle = '#030406';
          ctx.beginPath();
          ctx.arc(nx, ny, 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        });

      } else if (type === 'flower-bloom') {
        const cx = width / 2;
        const cy = height / 2;
        const maxRadius = Math.min(width, height) * 0.38;

        // Background Golden Ratio particles spiral
        flowerParticles.forEach(p => {
          p.dist += p.speed;
          p.angle += 0.003;
          if (p.dist > 110) {
            p.dist = 5;
            p.angle = Math.random() * Math.PI * 2;
          }
          const px = cx + Math.cos(p.angle) * p.dist;
          const py = cy + Math.sin(p.angle) * p.dist;

          ctx.fillStyle = c.accent + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Multi-layered beautiful organic curves (Rose & Rhodonea equations)
        const layers = [
          { petals: 5, scale: 0.95, speed: 0.003, colorAlpha: '20' },
          { petals: 6, scale: 0.70, speed: -0.005, colorAlpha: '45' },
          { petals: 8, scale: 0.45, speed: 0.008, colorAlpha: '70' }
        ];

        layers.forEach((lyr, lIdx) => {
          const rotateAngle = frame * lyr.speed;
          ctx.strokeStyle = c.accent + lyr.colorAlpha;
          ctx.fillStyle = c.accent + '05';
          ctx.lineWidth = 1.0;

          ctx.beginPath();
          for (let a = 0; a <= Math.PI * 2; a += 0.01) {
            const rad = maxRadius * lyr.scale * Math.cos(lyr.petals * a);
            const finalAngle = a + rotateAngle;
            const x = cx + Math.cos(finalAngle) * rad;
            const y = cy + Math.sin(finalAngle) * rad;

            if (a === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        });

        // Dynamic center hub
        ctx.fillStyle = c.accent;
        ctx.shadowBlur = 15;
        ctx.shadowColor = c.accent;
        ctx.beginPath();
        ctx.arc(cx, cy, 5 + Math.sin(frame * 0.03) * 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

      } else if (type === 'floating-petals') {
        // Render wind flow lines
        ctx.strokeStyle = c.accent + '08';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let j = 0; j < 3; j++) {
          const wy = 40 + j * 50;
          ctx.moveTo(0, wy + Math.sin(frame * 0.01 + j) * 12);
          for (let wx = 0; wx <= width; wx += 20) {
            ctx.lineTo(wx, wy + Math.sin((frame + wx) * 0.015 + j) * 12);
          }
        }
        ctx.stroke();

        // Twinkling pollen particles
        pollen.forEach(p => {
          p.y += p.speedY;
          p.x += Math.sin(frame * 0.01 + p.phase) * 0.15;
          if (p.y > height + 10) {
            p.y = -10;
            p.x = Math.random() * width;
          }
          const opacityVal = p.alpha * (0.6 + Math.sin(frame * 0.05 + p.phase) * 0.4);
          ctx.fillStyle = c.accent + Math.floor(opacityVal * 255).toString(16).padStart(2, '0');
          ctx.shadowBlur = 3;
          ctx.shadowColor = c.accent;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Drifted Leafy Petals with 3D flip animation
        petals.forEach(p => {
          p.y += p.speedY;
          p.x += p.speedX + Math.sin(frame * p.swingSpeed + p.phase) * (p.swing * 0.15);
          p.angle += p.rotSpeed;

          if (p.y > height + 10) {
            p.y = -10;
            p.x = Math.random() * width;
          }

          // Calculate 3D leaf flip scale factor
          const flipScale = Math.sin(frame * p.flipSpeed + p.phase);

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.scale(1, flipScale); // Performs the 3D flipping action

          // Gradient fill for organic look
          const grad = ctx.createLinearGradient(-p.size, 0, p.size, 0);
          grad.addColorStop(0, c.accent + '25');
          grad.addColorStop(0.5, c.accent + '66');
          grad.addColorStop(1, c.accent + '15');
          
          ctx.fillStyle = grad;
          ctx.strokeStyle = c.accent + 'cc';
          ctx.lineWidth = 0.8;

          // Draw double curve leaf shape
          ctx.beginPath();
          ctx.moveTo(-p.size * 1.5, 0);
          ctx.quadraticCurveTo(0, -p.size * 0.9, p.size * 1.5, 0);
          ctx.quadraticCurveTo(0, p.size * 0.9, -p.size * 1.5, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Petal mid-line vector
          ctx.strokeStyle = c.accent + '88';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(-p.size * 1.5, 0);
          ctx.lineTo(p.size * 1.2, 0);
          ctx.stroke();

          ctx.restore();
        });

      } else if (type === 'node-network') {
        // Draw orbital connection path guides
        const cx = width / 2;
        const cy = height / 2;
        ctx.strokeStyle = c.accent + '07';
        ctx.lineWidth = 0.5;
        [40, 75, 110].forEach(r => {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        });

        // Update node movement vectors
        networkNodes.forEach(n => {
          n.x += n.vx;
          n.y += n.vy;

          // Bounce bounds
          if (n.x < 15 || n.x > width - 15) n.vx *= -1;
          if (n.y < 15 || n.y > height - 15) n.vy *= -1;
        });

        // Draw connections (Mesh grid networking topology)
        ctx.lineWidth = 0.6;
        for (let i = 0; i < networkNodes.length; i++) {
          for (let j = i + 1; j < networkNodes.length; j++) {
            const dx = networkNodes[i].x - networkNodes[j].x;
            const dy = networkNodes[i].y - networkNodes[j].y;
            const dist = Math.hypot(dx, dy);

            // Connect nodes if they are close
            if (dist < 60) {
              const alpha = (1 - dist / 60) * 0.28;
              ctx.strokeStyle = c.accent + Math.floor(alpha * 255).toString(16).padStart(2, '0');
              ctx.beginPath();
              ctx.moveTo(networkNodes[i].x, networkNodes[i].y);
              ctx.lineTo(networkNodes[j].x, networkNodes[j].y);
              ctx.stroke();
            }
          }
        }

        // Draw active nodes
        networkNodes.forEach((n, idx) => {
          const pulse = Math.sin(frame * 0.04 + n.pulsePhase) * 1.2;
          const nx = n.x;
          const ny = n.y;

          // Glowing halos for select nodes
          if (idx % 3 === 0) {
            ctx.fillStyle = c.accent + '1a';
            ctx.beginPath();
            ctx.arc(nx, ny, n.r + 4 + pulse, 0, Math.PI * 2);
            ctx.fill();
          }

          // Node core
          ctx.fillStyle = idx % 2 === 0 ? c.accent : '#ffffff';
          ctx.shadowBlur = idx % 2 === 0 ? 5 : 0;
          ctx.shadowColor = c.accent;
          ctx.beginPath();
          ctx.arc(nx, ny, n.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Render binary telemetry fragments drifting down
        ctx.fillStyle = c.accent + '15';
        ctx.font = '700 7px var(--font-mono)';
        const binCols = 6;
        for (let k = 0; k < binCols; k++) {
          const bx = (width / binCols) * k + 20;
          const by = ((frame * 0.4 + k * 40) % (height + 20)) - 10;
          const binaryChar = (Math.floor(frame * 0.02 + k) % 2).toString();
          ctx.fillText(binaryChar, bx, by);
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
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

/* ─── Single Project OS Window Card ──────────────────────────────────── */
function ProjectOSCard({ project, index }) {
  return (
    <motion.div
      className="project-os-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        y: -6,
        rotateX: -2,
        rotateY: 2,
        transition: { duration: 0.25, ease: 'easeOut' }
      }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      {/* OS Bar */}
      <div className="os-bar">
        <div className="os-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <span className="os-title font-mono">{project.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.sh</span>
      </div>

      {/* Embedded Live Preview Canvas (The Window Desktop) */}
      <div className="project-desktop-screen">
        <ProjectCanvasPreview type={project.previewType} />
        <div className="screen-scanline" />
      </div>

      {/* Content panel */}
      <div className="project-details">
        <div className="project-detail-header">
          <h3 className="project-name">{project.title}</h3>
          <span className="project-year font-mono">{project.year}</span>
        </div>
        
        <p className="project-desc">{project.desc}</p>

        <div className="project-footer">
          <div className="project-tags">
            {project.tags.map(t => (
              <span key={t} className="project-tag-pill font-mono">{t}</span>
            ))}
          </div>

          <Magnetic>
            <a
              href={project.github}
              target={project.github !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="project-link-btn"
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
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Projects Redesign Component ───────────────────────────────── */
export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');

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
    <section id="projects" aria-label="Featured Projects redesign layout" className="projects-section">
      <div className="section-intro">
        <motion.p
          className="section-eyebrow"
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          // 01 / SELECTED WORK
        </motion.p>
        <TextReveal text="Featured Projects" className="section-title" tag="h2" delay={0.2} />
      </div>

      {/* Filters strip */}
      <motion.div
        className="proj-filters"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, damping: 24, delay: 0.18 }}
      >
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`proj-filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* OS Windows Card Grid */}
      <div className="projects-os-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, idx) => (
            <ProjectOSCard
              key={project.title}
              project={project}
              index={idx}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
