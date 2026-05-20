import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BentoCard from './BentoCard';
import Magnetic from './Magnetic';
import TextReveal from './TextReveal';
import { projectsData } from '../data/content';

function ProjectHUDPreview({ type, isHovered }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = canvas.offsetWidth || 300);
    let height = (canvas.height = canvas.offsetHeight || 170);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 300;
      height = canvas.height = canvas.offsetHeight || 170;
    };
    window.addEventListener('resize', handleResize);

    let frame = 0;
    let bloomProgress = 0.35;
    
    // Floating petals setup
    const petals = [];
    if (type === 'floating-petals') {
      for (let i = 0; i < 16; i++) {
        petals.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 4 + 3,
          vx: Math.random() * 0.4 - 0.2,
          vy: Math.random() * 0.4 + 0.15,
          angle: Math.random() * 360,
          spin: Math.random() * 1.5 - 0.75,
          offset: Math.random() * 100,
        });
      }
    }

    // Node network setup
    const nodes = [];
    const connections = [];
    if (type === 'node-network') {
      const nodeCount = 6;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: 40 + Math.random() * (width - 80),
          y: 30 + Math.random() * (height - 60),
          r: Math.random() * 2 + 1.5,
          pulse: Math.random() * 100,
        });
      }
      // Connect nodes close to each other
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120 || Math.random() < 0.35) {
            connections.push([i, j]);
          }
        }
      }
    }

    // Color definitions respecting active theme mode
    const getColors = () => {
      const isLight = document.documentElement.classList.contains('light-mode');
      return {
        accent: isLight ? '#D97706' : '#FACC15',
        ink: isLight ? '#0F172A' : '#F8FAFC',
        inkMid: isLight ? '#475569' : '#94A3B8',
        border: isLight ? 'rgba(15, 23, 42, 0.05)' : 'rgba(250, 204, 21, 0.05)'
      };
    };

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const colors = getColors();

      if (type === 'cv-flow') {
        // Cybernetic Scanning Grid
        ctx.strokeStyle = colors.accent + '0a';
        ctx.lineWidth = 1;
        const spacing = 14;
        for (let x = 0; x < width; x += spacing) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = 0; y < height; y += spacing) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }

        // Animated scan sweep
        const scanY = (frame * (isHovered ? 2.5 : 1.2)) % height;
        ctx.strokeStyle = colors.accent + '33';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(width, scanY);
        ctx.stroke();

        // Scan reflection gradient
        const grad = ctx.createLinearGradient(0, scanY - 30, 0, scanY);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, colors.accent + '08');
        ctx.fillStyle = grad;
        ctx.fillRect(0, Math.max(0, scanY - 30), width, 30);

        // Terminal telemetry data
        ctx.fillStyle = colors.inkMid + '99';
        ctx.font = '700 8px var(--font-mono)';
        ctx.fillText('CORE::SYS_CV_GEN', 15, 20);
        ctx.fillText('UPLINK: ONLINE', width - 85, 20);

        const statements = [
          'whoami: ashmit_dev',
          'compiler: typescript_v5',
          'structural: load_bearing_irony',
          'systems: cv_assembler_core',
          'uplink: ok_node_04'
        ];

        ctx.font = '400 9px var(--font-mono)';
        statements.forEach((stmt, idx) => {
          const maxChars = Math.min(stmt.length, Math.floor(frame / 4) - idx * 4);
          if (maxChars > 0) {
            ctx.fillStyle = stmt.includes('ashmit_dev') ? colors.accent : colors.ink + 'bb';
            ctx.fillText('> ' + stmt.slice(0, maxChars), 15, 45 + idx * 18);
          }
        });

        // Vertical glowing capacity visualizer
        ctx.strokeStyle = colors.accent + '44';
        ctx.strokeRect(width - 35, 40, 20, 80);
        
        ctx.fillStyle = colors.accent;
        const capacityVal = isHovered ? 6 : Math.floor(4 + Math.sin(frame * 0.08) * 2);
        for (let i = 0; i < capacityVal; i++) {
          ctx.fillRect(width - 32, 112 - i * 11, 14, 8);
        }

      } else if (type === 'flower-bloom') {
        // Procedural blooming geometric matrix flower
        const cx = width / 2;
        const cy = height / 2;
        ctx.translate(cx, cy);

        const rotSpeed = isHovered ? 0.02 : 0.006;
        ctx.rotate(frame * rotSpeed);

        const targetProgress = isHovered ? 0.95 : 0.45;
        bloomProgress += (targetProgress - bloomProgress) * 0.08;

        ctx.shadowBlur = isHovered ? 20 : 8;
        ctx.shadowColor = colors.accent;

        const petalsCount = 8;
        for (let i = 0; i < petalsCount; i++) {
          ctx.rotate((Math.PI * 2) / petalsCount);
          ctx.strokeStyle = colors.accent + (isHovered ? 'aa' : '3e');
          ctx.lineWidth = 1.25;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(
            -30 * bloomProgress, 
            -30 * bloomProgress, 
            -15 * bloomProgress, 
            -70 * bloomProgress, 
            0, 
            -78 * bloomProgress
          );
          ctx.bezierCurveTo(
            15 * bloomProgress, 
            -70 * bloomProgress, 
            30 * bloomProgress, 
            -30 * bloomProgress, 
            0, 
            0
          );
          ctx.stroke();

          // Internal vein line
          ctx.strokeStyle = colors.accent + '15';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -55 * bloomProgress);
          ctx.stroke();
        }

        ctx.shadowBlur = 0;
        ctx.translate(-cx, -cy);

        // Core system metadata
        ctx.fillStyle = colors.inkMid + '66';
        ctx.font = '500 7px var(--font-mono)';
        ctx.fillText(`ANGLE_SPIN: ${(rotSpeed * 1000).toFixed(0)}RAD/S`, 15, height - 12);
        ctx.fillText(`GEOMETRIC_BLOOM: ${(bloomProgress * 100).toFixed(0)}%`, width - 110, height - 12);

      } else if (type === 'floating-petals') {
        // Drift and float system petals
        ctx.fillStyle = colors.accent + (isHovered ? '25' : '0f');
        ctx.strokeStyle = colors.accent + (isHovered ? '88' : '33');
        ctx.lineWidth = 1;

        petals.forEach((p) => {
          p.y -= p.vy * (isHovered ? 2.2 : 0.9);
          p.x += Math.sin(frame * 0.02 + p.offset) * 0.25 + p.vx * (isHovered ? 1.5 : 0.6);
          p.angle += p.spin * (isHovered ? 1.8 : 0.6);

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10 || p.x > width + 10) {
            p.x = p.x < 0 ? width : 0;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.angle * Math.PI) / 180);
          
          ctx.beginPath();
          ctx.moveTo(0, -p.r);
          ctx.quadraticCurveTo(p.r * 1.4, -p.r * 0.4, p.r, p.r);
          ctx.quadraticCurveTo(-p.r * 0.4, p.r * 1.4, -p.r, 0);
          ctx.quadraticCurveTo(-p.r, -p.r, 0, -p.r);
          ctx.fill();
          ctx.stroke();

          ctx.restore();
        });

        // Core system label
        ctx.fillStyle = colors.inkMid + '88';
        ctx.font = '700 8px var(--font-mono)';
        ctx.fillText('CANVAS::PETALS_ECOSYSTEM', 15, 20);

      } else if (type === 'node-network') {
        // Systems network interactive visualizer
        ctx.lineWidth = 0.5;

        // Draw node links
        connections.forEach(([i, j]) => {
          const n1 = nodes[i];
          const n2 = nodes[j];
          if (!n1 || !n2) return;
          ctx.strokeStyle = colors.accent + (isHovered ? '2f' : '12');
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();

          // Data particle flow
          if (isHovered && frame % 90 < 30) {
            const step = (frame % 30) / 30;
            const px = n1.x + (n2.x - n1.x) * step;
            const py = n1.y + (n2.y - n1.y) * step;
            ctx.fillStyle = colors.accent;
            ctx.beginPath();
            ctx.arc(px, py, 1.75, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        // Draw nodes
        nodes.forEach((n, idx) => {
          n.pulse += isHovered ? 0.07 : 0.035;
          const pulsingRadius = n.r + Math.sin(n.pulse) * (isHovered ? 1.25 : 0.45);

          // Glowing border ring
          ctx.strokeStyle = colors.accent + (isHovered ? '66' : '1e');
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.arc(n.x, n.y, pulsingRadius * 2.2, 0, Math.PI * 2);
          ctx.stroke();

          // Central solid node dot
          ctx.fillStyle = isHovered ? colors.accent : colors.ink + 'cc';
          ctx.beginPath();
          ctx.arc(n.x, n.y, pulsingRadius, 0, Math.PI * 2);
          ctx.fill();

          if (isHovered) {
            ctx.fillStyle = colors.inkMid + 'aa';
            ctx.font = '600 6px var(--font-mono)';
            ctx.fillText(`NODE0${idx + 1}::ACTIVE`, n.x - 14, n.y - pulsingRadius * 3.2);
          }
        });

        // Telemetry header
        ctx.fillStyle = colors.inkMid + '88';
        ctx.font = '700 8px var(--font-mono)';
        ctx.fillText('SYSTEMS::SYNAPSE_GRID_ONLINE', 15, 20);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [type, isHovered]);

  return (
    <div className="project-preview-wrapper" style={{ width: '100%', height: '170px', marginBottom: '1.25rem', overflow: 'hidden', position: 'relative', borderRadius: '10px', background: 'rgba(0,0,0,0.18)', border: '1px solid var(--border)' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    { id: 'all', label: 'ALL_SYS' },
    { id: 'web', label: 'WEB_APP' },
    { id: 'systems', label: 'SYS_CORE' },
    { id: 'creative', label: 'CREATIVE' }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30, rotateX: 12 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      rotateX: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.2, 0.65, 0.3, 0.9] 
      } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="projects" aria-label="Selected projects">
      <div className="section-intro">
        <motion.p 
          className="section-eyebrow" 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants}
        >
          01 / SELECTED WORK
        </motion.p>
        <TextReveal text="Featured Projects" className="section-title" tag="h2" delay={0.2} />
        
        {/* Modern Interactive Cybernetic Tag Filters */}
        <motion.div 
          className="projects-filter-bar"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem', fontFamily: 'var(--font-mono)' }}
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <Magnetic key={cat.id}>
                <button
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '0.45rem 1.1rem',
                    borderRadius: '8px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: isActive ? 'var(--accent)' : 'var(--glass-bg)',
                    color: isActive ? 'var(--bg)' : 'var(--ink-mid)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--accent)' : 'var(--glass-border)',
                    letterSpacing: '0.08em',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.borderColor = 'var(--accent)';
                      e.target.style.color = 'var(--ink)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.borderColor = 'var(--glass-border)';
                      e.target.style.color = 'var(--ink-mid)';
                    }
                  }}
                >
                  {isActive ? `[ ${cat.label} ]` : cat.label}
                </button>
              </Magnetic>
            );
          })}
        </motion.div>
      </div>

      <motion.div 
        className="bento-grid projects-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const isFeatured = project.title === 'Sahayogi';
            const colClass = isFeatured ? 'project-col-12 project-card--featured-wrapper' : 'project-col-6';
            
            return (
              <motion.article 
                layout
                key={project.title}
                variants={itemVariants} 
                className={colClass}
                onMouseEnter={() => setHoveredCard(project.title)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ originY: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15, transition: { duration: 0.3 } }}
              >
                <BentoCard className="project-card">
                  <div className="project-card-inner">
                    
                    {/* Glowing Interactive Visual Previews */}
                    <ProjectHUDPreview type={project.previewType} isHovered={hoveredCard === project.title} />

                    <div className="project-header">
                      <span className="project-year">{project.year}</span>
                      <Magnetic>
                        <a 
                          href={project.github} 
                          target={project.github !== '#' ? '_blank' : undefined} 
                          rel="noopener noreferrer" 
                          className="project-external-link" 
                          aria-label="View Project Link"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>
                      </Magnetic>
                    </div>

                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.desc}</p>
                    
                    <div className="project-tags" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {project.tags.map(tag => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </BentoCard>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
