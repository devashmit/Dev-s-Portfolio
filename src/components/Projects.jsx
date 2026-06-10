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

    // 3. floating-petals (Upgraded)
    const petals = [];
    const petalCount = 28;
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * 320,
        y: Math.random() * 180,
        size: Math.random() * 6 + 4,
        speedY: Math.random() * 0.5 + 0.3,
        speedX: Math.random() * 0.4 + 0.1,
        swing: Math.random() * 5 + 3,
        swingSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        rotSpeed: Math.random() * 0.03 - 0.015,
        angle: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.04 + 0.01,
        hueOffset: Math.random() * 40 - 20 // Slight color variation
      });
    }
    const pollen = [];
    for (let i = 0; i < 35; i++) {
      pollen.push({
        x: Math.random() * 320,
        y: Math.random() * 180,
        speedY: Math.random() * 0.4 + 0.2,
        speedX: Math.random() * 0.3 + 0.1,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        phase: Math.random() * Math.PI * 2
      });
    }

    // 4. node-network (Upgraded Sahayogi Hub)
    const networkNodes = [];
    const netCount = 14;
    for (let i = 0; i < netCount; i++) {
      networkNodes.push({
        x: Math.random() * 260 + 30,
        y: Math.random() * 140 + 30,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 4 + 2,
        pulsePhase: Math.random() * Math.PI * 2,
        isHub: i < 2 // First two nodes act as central hubs
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
        // Fluid wind flow lines
        ctx.strokeStyle = c.accent + '11';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let j = 0; j < 4; j++) {
          const wy = 30 + j * 45;
          ctx.moveTo(0, wy + Math.sin(frame * 0.01 + j) * 15);
          for (let wx = 0; wx <= width; wx += 15) {
            ctx.lineTo(wx, wy + Math.sin((frame * 1.5 + wx) * 0.01 + j) * 18);
          }
        }
        ctx.stroke();

        // Glowing pollen dust
        ctx.globalCompositeOperation = 'screen';
        pollen.forEach(p => {
          p.y -= p.speedY; // Float up
          p.x += Math.sin(frame * 0.01 + p.phase) * 0.2 + p.speedX;
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x > width + 10) p.x = -10;

          const opacityVal = p.alpha * (0.4 + Math.sin(frame * 0.04 + p.phase) * 0.6);
          
          ctx.beginPath();
          ctx.fillStyle = c.accent + Math.floor(opacityVal * 255).toString(16).padStart(2, '0');
          ctx.shadowBlur = 6;
          ctx.shadowColor = c.accent;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.shadowBlur = 0;
        ctx.globalCompositeOperation = 'source-over';

        // Rich 3D Petals
        petals.forEach(p => {
          p.y += p.speedY + Math.sin(frame * 0.02) * 0.2;
          p.x += p.speedX + Math.sin(frame * p.swingSpeed + p.phase) * (p.swing * 0.2);
          p.angle += p.rotSpeed;

          if (p.y > height + 15) p.y = -15;
          if (p.x > width + 15) p.x = -15;

          const flipScale = Math.sin(frame * p.flipSpeed + p.phase);

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.scale(1, flipScale);

          // Beautiful floral gradient
          const grad = ctx.createLinearGradient(-p.size * 1.5, 0, p.size * 1.5, 0);
          grad.addColorStop(0, c.accent + '99');
          grad.addColorStop(0.5, '#f472b6aa'); // Soft pinkish mix
          grad.addColorStop(1, c.accent + '33');
          
          ctx.fillStyle = grad;
          ctx.strokeStyle = c.accent + 'dd';
          ctx.lineWidth = 1;

          // Drawing a more organic petal shape
          ctx.beginPath();
          ctx.moveTo(-p.size * 2, 0);
          ctx.bezierCurveTo(-p.size, -p.size * 1.2, p.size, -p.size * 1.2, p.size * 2, 0);
          ctx.bezierCurveTo(p.size, p.size * 1.2, -p.size, p.size * 1.2, -p.size * 2, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Petal vein detailing
          ctx.strokeStyle = '#ffffff66';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(-p.size * 1.8, 0);
          ctx.lineTo(p.size * 1.4, 0);
          ctx.stroke();

          ctx.restore();
        });

      } else if (type === 'node-network') {
        const cx = width / 2;
        const cy = height / 2;

        // Draw animated scanning radar/orbital rings
        ctx.strokeStyle = c.accent + '11';
        ctx.lineWidth = 1;
        [50, 85, 120].forEach((r, idx) => {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(frame * 0.002 * (idx % 2 === 0 ? 1 : -1));
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 1.5);
          ctx.stroke();
          
          // Orbital scanner points
          ctx.fillStyle = c.accent + '88';
          ctx.beginPath();
          ctx.arc(r, 0, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Update nodes
        networkNodes.forEach(n => {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 15 || n.x > width - 15) n.vx *= -1;
          if (n.y < 15 || n.y > height - 15) n.vy *= -1;
        });

        // Complex Mesh Connections with glowing energy
        for (let i = 0; i < networkNodes.length; i++) {
          for (let j = i + 1; j < networkNodes.length; j++) {
            const dx = networkNodes[i].x - networkNodes[j].x;
            const dy = networkNodes[i].y - networkNodes[j].y;
            const dist = Math.hypot(dx, dy);
            const maxDist = networkNodes[i].isHub || networkNodes[j].isHub ? 110 : 65;

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.4;
              ctx.lineWidth = networkNodes[i].isHub || networkNodes[j].isHub ? 1.2 : 0.6;
              
              // Energy gradient along the connection
              const grad = ctx.createLinearGradient(networkNodes[i].x, networkNodes[i].y, networkNodes[j].x, networkNodes[j].y);
              grad.addColorStop(0, c.accent + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
              grad.addColorStop(0.5, c.accent + Math.floor(alpha * 100).toString(16).padStart(2, '0'));
              grad.addColorStop(1, c.accent + Math.floor(alpha * 255).toString(16).padStart(2, '0'));

              ctx.strokeStyle = grad;
              ctx.beginPath();
              ctx.moveTo(networkNodes[i].x, networkNodes[i].y);
              ctx.lineTo(networkNodes[j].x, networkNodes[j].y);
              ctx.stroke();

              // Moving data packets along lines
              if (frame % 40 === 0 && Math.random() > 0.5) {
                 ctx.fillStyle = '#fff';
                 const t = (frame * 0.05) % 1;
                 const px = networkNodes[i].x + dx * t;
                 const py = networkNodes[i].y + dy * t;
                 ctx.shadowBlur = 8;
                 ctx.shadowColor = c.accent;
                 ctx.beginPath(); ctx.arc(px, py, 1.5, 0, Math.PI*2); ctx.fill();
                 ctx.shadowBlur = 0;
              }
            }
          }
        }

        // Draw Nodes
        networkNodes.forEach((n, idx) => {
          const pulse = Math.sin(frame * 0.05 + n.pulsePhase) * 2;
          const isHub = n.isHub;

          // Glowing halos
          ctx.fillStyle = c.accent + (isHub ? '22' : '11');
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + (isHub ? 8 : 4) + pulse, 0, Math.PI * 2);
          ctx.fill();

          // Node core
          ctx.fillStyle = isHub ? '#ffffff' : (idx % 2 === 0 ? c.accent : '#ffffff');
          ctx.shadowBlur = isHub ? 12 : (idx % 2 === 0 ? 6 : 0);
          ctx.shadowColor = c.accent;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + (isHub ? 1.5 : 0), 0, Math.PI * 2);
          ctx.fill();
          
          if (isHub) {
            ctx.strokeStyle = c.accent;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
          ctx.shadowBlur = 0;
        });

        // Binary Rain overlay
        ctx.fillStyle = c.accent + '1a';
        ctx.font = '600 8px var(--font-mono)';
        for (let k = 0; k < 8; k++) {
          const bx = (width / 8) * k + 10;
          const by = ((frame * 0.5 + k * 50) % (height + 30)) - 15;
          const binaryChar = (Math.floor(frame * 0.03 + k) % 2).toString();
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
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="project-card-scene"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setIsFlipped(f => !f)}
      role="button"
      tabIndex={0}
      aria-label={`${project.title} — click to ${isFlipped ? 'see preview' : 'read more'}`}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setIsFlipped(f => !f)}
    >
      <motion.div
        className="project-card-flipper"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ── FRONT FACE ── */}
        <div className="project-os-card project-face project-face--front">
          {/* OS Bar */}
          <div className="os-bar">
            <div className="os-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="os-title font-mono">{project.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.sh</span>
          </div>

          {/* Canvas Preview */}
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
              {/* Flip hint icon */}
              <span className="project-flip-hint" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <div className="project-os-card project-face project-face--back">
          {/* OS Bar */}
          <div className="os-bar">
            <div className="os-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="os-title font-mono">readme.md</span>
          </div>

          <div className="project-back-content">
            {/* Title block */}
            <div className="project-back-header">
              <h3 className="project-name">{project.title}</h3>
              <span className="project-year font-mono">{project.year}</span>
            </div>

            {/* Full description */}
            <p className="project-back-desc">{project.desc}</p>

            {/* Tags */}
            <div className="project-tags project-back-tags">
              {project.tags.map(t => (
                <span key={t} className="project-tag-pill font-mono">{t}</span>
              ))}
            </div>

            {/* GitHub CTA */}
            <a
              href={project.github}
              target={project.github !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="project-github-cta"
              aria-label={`Open ${project.title} on GitHub`}
              onClick={e => {
                e.stopPropagation();
                if (project.github === '#') e.preventDefault();
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span>View on GitHub</span>
              <svg className="project-github-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
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
