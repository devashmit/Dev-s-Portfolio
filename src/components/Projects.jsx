import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import TextReveal from './TextReveal';
import Magnetic from './Magnetic';
import { projectsData, stackItems } from '../data/content';

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '18px', height: '18px' }}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const CvFlowVisual = () => {
  return (
    <div className="bento-visual cv-flow-container">
      <motion.div 
        className="cv-flow-card"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ 
          y: -12, 
          rotateX: -2,
          rotateY: 2,
          boxShadow: "0 30px 60px rgba(6, 182, 212, 0.15)"
        }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        <div className="cv-flow-card-glow" />
        
        {/* CV Header Mockup */}
        <div className="cv-flow-header">
          <div className="cv-flow-avatar">
            <div className="cv-flow-avatar-inner" />
          </div>
          <div className="cv-flow-meta">
            <div className="cv-flow-line-header-name" />
            <div className="cv-flow-line-header-role" />
          </div>
          <div className="cv-flow-badge-top">TS</div>
        </div>

        {/* CV Body Columns */}
        <div className="cv-flow-body">
          {/* Left Panel */}
          <div className="cv-flow-panel-left">
            <div className="cv-flow-panel-title" />
            <div className="cv-flow-skills-list">
              <div className="cv-flow-skill-item">
                <div className="cv-flow-skill-label" style={{ width: '40%' }} />
                <div className="cv-flow-skill-track"><motion.div className="cv-flow-skill-fill" initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ delay: 0.2, duration: 1 }} /></div>
              </div>
              <div className="cv-flow-skill-item">
                <div className="cv-flow-skill-label" style={{ width: '55%' }} />
                <div className="cv-flow-skill-track"><motion.div className="cv-flow-skill-fill" initial={{ width: 0 }} whileInView={{ width: '90%' }} transition={{ delay: 0.3, duration: 1 }} /></div>
              </div>
              <div className="cv-flow-skill-item">
                <div className="cv-flow-skill-label" style={{ width: '30%' }} />
                <div className="cv-flow-skill-track"><motion.div className="cv-flow-skill-fill" initial={{ width: 0 }} whileInView={{ width: '75%' }} transition={{ delay: 0.4, duration: 1 }} /></div>
              </div>
            </div>
          </div>
          
          {/* Right Panel */}
          <div className="cv-flow-panel-right">
            <div className="cv-flow-panel-title" style={{ width: '50%' }} />
            <div className="cv-flow-timeline">
              <div className="cv-flow-timeline-node">
                <div className="cv-flow-timeline-dot" />
                <div className="cv-flow-timeline-content">
                  <div className="cv-flow-line-body-long" />
                  <div className="cv-flow-line-body-short" />
                </div>
              </div>
              <div className="cv-flow-timeline-node">
                <div className="cv-flow-timeline-dot" />
                <div className="cv-flow-timeline-content">
                  <div className="cv-flow-line-body-medium" />
                  <div className="cv-flow-line-body-short" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Badges */}
        <motion.div 
          className="cv-flow-float-tag react-tag"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          React
        </motion.div>
        <motion.div 
          className="cv-flow-float-tag css-tag"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          Tailwind
        </motion.div>
      </motion.div>
    </div>
  );
};

const FlowerBloomVisual = () => {
  return (
    <div className="bento-visual flower-bloom-container">
      <motion.div 
        className="flower-bloom-wrapper"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        <motion.div 
          className="flower-bloom-rotate"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 200 200" className="flower-bloom-svg">
            <defs>
              <linearGradient id="petal-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ec4899" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="flower-center-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#facc15" stopOpacity="1" />
                <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </radialGradient>
              <filter id="bloom-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Draw layered overlapping mathematical petals */}
            {[...Array(12)].map((_, i) => {
              const rot = i * 30;
              return (
                <motion.path
                  key={i}
                  d="M 100 100 C 135 45, 165 75, 100 170 C 35 75, 65 45, 100 100 Z"
                  fill="url(#petal-gradient-1)"
                  transform={`rotate(${rot} 100 100)`}
                  initial={{ scale: 0.7, opacity: 0.4 }}
                  whileHover={{ 
                    scale: 1.15, 
                    opacity: 0.95,
                    fill: "url(#petal-gradient-1)"
                  }}
                  transition={{ type: "spring", stiffness: 180, damping: 10 }}
                />
              );
            })}
            
            {/* Decorative orbit ring */}
            <circle cx="100" cy="100" r="75" fill="none" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.4" />
            
            {/* Glow backing */}
            <circle cx="100" cy="100" r="30" fill="url(#flower-center-glow)" filter="url(#bloom-glow)" opacity="0.6" />
            
            {/* Center pistil */}
            <circle cx="100" cy="100" r="12" fill="url(#flower-center-glow)" />
            <circle cx="100" cy="100" r="5" fill="#ffffff" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

const FloatingPetalsVisual = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    class Petal {
      constructor() {
        this.reset();
        this.y = Math.random() * height; // initial random distribution
      }

      reset() {
        this.x = Math.random() * width;
        this.y = -20;
        this.size = Math.random() * 6 + 4;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1.2 + 0.6;
        this.opacity = Math.random() * 0.4 + 0.3;
        this.angle = Math.random() * 360;
        this.spinSpeed = Math.random() * 1.5 - 0.75;
        this.color = Math.random() > 0.5 ? 'rgba(236, 72, 153,' : 'rgba(6, 182, 212,';
      }

      update(mouse) {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y / 40) * 0.4;
        this.angle += this.spinSpeed;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (100 - dist) / 100;
            this.x += (dx / dist) * force * 4;
            this.y += (dy / dist) * force * 2;
          }
        }

        if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size, -this.size / 2, -this.size, this.size, 0, this.size * 1.5);
        ctx.bezierCurveTo(this.size, this.size, this.size, -this.size / 2, 0, 0);

        const grad = ctx.createRadialGradient(0, this.size / 2, 0, 0, this.size / 2, this.size);
        grad.addColorStop(0, `${this.color} ${this.opacity})`);
        grad.addColorStop(1, `${this.color} 0)`);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }
    }

    const petals = Array.from({ length: 30 }, () => new Petal());

    const mouse = { x: null, y: null };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Wind dynamics lines
    const flowLines = Array.from({ length: 4 }, (_, i) => ({
      yPercent: 0.2 + i * 0.2,
      phase: Math.random() * 100,
      speed: 0.02 + Math.random() * 0.01
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw elegant wind vectors
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.04)';
      ctx.lineWidth = 1.5;
      flowLines.forEach(line => {
        line.phase += line.speed;
        ctx.beginPath();
        for (let x = 0; x < width; x += 10) {
          const y = height * line.yPercent + Math.sin(x * 0.01 + line.phase) * 12;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      petals.forEach(petal => {
        petal.update(mouse);
        petal.draw();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="bento-visual floating-petals-canvas" />;
};

const NodeNetworkVisual = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    class Node {
      constructor(x, y, name = '') {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 0.3 - 0.15;
        this.vy = Math.random() * 0.3 - 0.15;
        this.radius = Math.random() * 3 + 4;
        this.name = name;
      }

      update(mouse) {
        this.x += this.vx;
        this.y += this.vy;

        const dxBase = this.x - this.baseX;
        const dyBase = this.y - this.baseY;
        if (Math.abs(dxBase) > 25) this.vx *= -1;
        if (Math.abs(dyBase) > 25) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const force = (140 - dist) / 140;
            this.x += (dx / dist) * force * 2.5;
            this.y += (dy / dist) * force * 2.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + 6, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius + 6);
        grad.addColorStop(0, 'rgba(6, 182, 212, 0.4)');
        grad.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'var(--accent)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        if (this.name) {
          ctx.font = '10px Space Mono';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.fillText(this.name, this.x + 12, this.y + 4);
        }
      }
    }

    const nodeNames = ['DB', 'API', 'AUTH', 'UI', 'SYS', 'CORE'];
    const nodes = [
      new Node(width * 0.25, height * 0.25, 'SYS'),
      new Node(width * 0.75, height * 0.3, 'API'),
      new Node(width * 0.5, height * 0.75, 'UI'),
      new Node(width * 0.2, height * 0.7, 'DB'),
      new Node(width * 0.7, height * 0.7, 'AUTH'),
      new Node(width * 0.45, height * 0.35, 'CORE')
    ];

    const mouse = { x: null, y: null };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Lines and logic
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update(mouse);

        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const alpha = (180 - dist) / 180 * 0.25;
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Animated glowing pulses along connections
            const pulseTime = (Date.now() / 1500) % 1;
            const px = nodes[i].x + (nodes[j].x - nodes[i].x) * pulseTime;
            const py = nodes[i].y + (nodes[j].y - nodes[i].y) * pulseTime;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 2})`;
            ctx.fill();
          }
        }
      }

      nodes.forEach(node => node.draw());
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="bento-visual node-network-canvas" />;
};

const ProjectVisual = ({ type }) => {
  switch(type) {
    case 'cv-flow':
      return <CvFlowVisual />;
    case 'flower-bloom':
      return <FlowerBloomVisual />;
    case 'floating-petals':
      return <FloatingPetalsVisual />;
    case 'node-network':
      return <NodeNetworkVisual />;
    default:
      return <div className="bento-visual generic"></div>;
  }
};

const ProjectCard = ({ project, index, range, targetScale, progress }) => {
  const containerRef = useRef(null);
  
  // Sticky scroll scale effect
  const scale = useTransform(progress, range, [1, targetScale]);
  const overlayOpacity = useTransform(progress, range, [0, 0.4]);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div ref={containerRef} className="project-card-container">
      <motion.div 
        style={{ 
          scale, 
          top: `calc(12vh + ${index * 25}px)`,
          rotateX,
          rotateY,
          transformPerspective: 1200
        }} 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="project-card-inner"
      >
        <div className="project-card-visual">
          <ProjectVisual type={project.previewType} />
          <motion.div style={{ opacity: overlayOpacity }} className="project-card-overlay" />
        </div>
        
        <div className="project-card-content">
          <div className="project-card-header">
            <span className="project-card-num font-mono">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="project-card-tags">
              {project.tags.map(t => (
                <span key={t} className="project-tag font-mono">{t}</span>
              ))}
            </div>
          </div>
          
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-desc">{project.desc}</p>
          
          <div className="project-stack-icons">
            {project.stack?.map(tech => {
              const techData = stackItems.find(item => item.name === tech);
              if (!techData) return null;
              return (
                <div key={tech} className="project-stack-icon" title={tech}>
                  <img 
                    src={techData.icon} 
                    alt={tech} 
                    className={techData.invertInDark ? 'invert-in-dark' : ''} 
                  />
                </div>
              );
            })}
          </div>

          <div className="project-card-actions">
            {project.github && project.github !== '#' && (
              <Magnetic>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="showcase-btn btn-ghost" aria-label={`View ${project.title} on GitHub`}>
                  <GithubIcon /> <span>Source</span>
                </a>
              </Magnetic>
            )}
            {project.link && project.link !== '#' ? (
              <Magnetic>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="showcase-btn btn-primary" aria-label={`Open Live Project of ${project.title}`}>
                  <span>Preview</span> <ArrowRight className="w-4 h-4" />
                </a>
              </Magnetic>
            ) : null}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="projects" aria-label="Featured Projects" className="projects-stacked-section">
      <div className="projects-header-wrapper">
        <motion.p
          className="section-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          // 01 / SELECTED WORK
        </motion.p>
        <TextReveal text="Product Showcase" className="section-title" tag="h2" delay={0.1} />
      </div>

      <div ref={containerRef} className="projects-stack-container">
        {projectsData.map((project, idx) => {
          const targetScale = 1 - (projectsData.length - idx) * 0.05;
          const range = [idx * 0.25, 1];
          return (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={idx} 
              range={range}
              targetScale={targetScale}
              progress={scrollYProgress}
            />
          );
        })}
      </div>
    </section>
  );
}
