import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import TextReveal from './TextReveal';
import { projectsData } from '../data/content';

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: '14px', height: '14px' }}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ProjectVisual = ({ type }) => {
  switch(type) {
    case 'cv-flow':
      return (
        <div className="bento-visual cv-flow">
          <div className="cv-box header"></div>
          <div className="cv-line short"></div>
          <div className="cv-line long"></div>
          <div className="cv-line medium"></div>
          <div className="cv-box body"></div>
        </div>
      );
    case 'flower-bloom':
      return (
        <div className="bento-visual flower-bloom">
           <div className="petal p1"></div>
           <div className="petal p2"></div>
           <div className="petal p3"></div>
           <div className="petal p4"></div>
           <div className="flower-center"></div>
        </div>
      );
    case 'floating-petals':
      return (
        <div className="bento-visual floating-petals">
          <div className="float-petal f1"></div>
          <div className="float-petal f2"></div>
          <div className="float-petal f3"></div>
          <div className="float-petal f4"></div>
        </div>
      );
    case 'node-network':
      return (
        <div className="bento-visual node-network">
          <div className="node n1"></div>
          <div className="node n2"></div>
          <div className="node n3"></div>
          <div className="node n4"></div>
          <svg className="node-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="20" y1="20" x2="80" y2="40" />
            <line x1="80" y1="40" x2="50" y2="80" />
            <line x1="50" y1="80" x2="20" y2="20" />
            <line x1="20" y1="20" x2="10" y2="70" />
            <line x1="10" y1="70" x2="50" y2="80" />
          </svg>
        </div>
      );
    default:
      return <div className="bento-visual generic"></div>;
  }
}

/* ─── Bento Box Project Card ───────────────────────── */
function ProjectCard({ project, index, isWide }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out mouse tracking for tilt
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Transform mouse position to rotation angles (subtle for bento)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
    ref.current.style.setProperty('--mouse-x', `${mouseX}px`);
    ref.current.style.setProperty('--mouse-y', `${mouseY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`project-card bento-card ${isWide ? 'wide' : 'square'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, rotateX: -5 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
    >
      <div className="project-glow-layer"></div>
      
      {/* Visual background element */}
      <div className="project-visual-wrapper" style={{ transform: "translateZ(10px)" }}>
        <ProjectVisual type={project.previewType} />
      </div>

      <div className="project-details" style={{ transform: "translateZ(30px)" }}>
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

          <div className="project-actions">
            {project.github && project.github !== '#' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-action-btn"
                aria-label={`View ${project.title} on GitHub`}
              >
                <GithubIcon />
                <span>Code</span>
              </a>
            )}
            {project.link && project.link !== '#' && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-action-btn"
                aria-label={`Open Live Project of ${project.title}`}
              >
                <ExternalLink className="w-3 h-3" />
                <span>Demo</span>
              </a>
            )}
          </div>
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
    <section id="projects" aria-label="Featured Projects" className="projects-section">
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
        <TextReveal text="Featured Projects" className="section-title" tag="h2" delay={0.1} />
      </div>

      {/* Filters strip */}
      <motion.div
        className="proj-filters"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, damping: 24, delay: 0.1 }}
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

      {/* Elegant Bento Box Grid */}
      <div className="projects-bento-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, idx) => {
            // Determine if card should be wide. 
            // If all 4 are shown, index 0 and 3 are wide.
            // If filtered, we can just make every other one wide or dynamically calculate.
            const isWide = filtered.length > 2 ? (idx === 0 || idx === 3) : true;
            return (
              <ProjectCard
                key={project.title}
                project={project}
                index={idx}
                isWide={isWide}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
