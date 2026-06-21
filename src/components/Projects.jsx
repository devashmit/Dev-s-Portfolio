import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, ArrowLeft } from 'lucide-react';
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
      <div className="cv-flow-card">
        <div className="cv-flow-header">
          <div className="cv-flow-avatar"></div>
          <div className="cv-flow-meta">
            <div className="cv-line-1"></div>
            <div className="cv-line-2"></div>
          </div>
        </div>
        <div className="cv-flow-body">
          <div className="cv-left">
            <div className="cv-bar-1"></div>
            <div className="cv-bar-2"></div>
          </div>
          <div className="cv-right">
            <div className="cv-node"></div>
            <div className="cv-node"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FlowerBloomVisual = () => {
  return (
    <div className="bento-visual flower-bloom-container">
      <svg viewBox="0 0 200 200" className="flower-bloom-svg">
        {[...Array(8)].map((_, i) => (
          <path
            key={i}
            d="M 100 100 C 130 50, 150 70, 100 160 C 50 70, 70 50, 100 100 Z"
            fill="rgba(255, 27, 45, 0.25)"
            stroke="var(--pre-accent)"
            strokeWidth="0.5"
            transform={`rotate(${i * 45} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="10" fill="var(--pre-accent)" />
      </svg>
    </div>
  );
};

const FloatingPetalsVisual = () => {
  return (
    <div className="bento-visual floating-petals-container">
      <div className="petal-flow-1"></div>
      <div className="petal-flow-2"></div>
      <div className="petal-flow-3"></div>
    </div>
  );
};

const NodeNetworkVisual = () => {
  return (
    <div className="bento-visual node-network-container">
      <svg viewBox="0 0 200 200" className="network-svg">
        <line x1="50" y1="50" x2="150" y2="70" stroke="rgba(255,27,45,0.2)" strokeWidth="1" />
        <line x1="150" y1="70" x2="100" y2="150" stroke="rgba(255,27,45,0.2)" strokeWidth="1" />
        <line x1="100" y1="150" x2="50" y2="50" stroke="rgba(255,27,45,0.2)" strokeWidth="1" />
        <line x1="50" y1="50" x2="100" y2="100" stroke="rgba(255,27,45,0.2)" strokeWidth="1" />
        <line x1="150" y1="70" x2="100" y2="100" stroke="rgba(255,27,45,0.2)" strokeWidth="1" />
        
        <circle cx="50" cy="50" r="5" fill="var(--pre-accent)" className="net-node" />
        <circle cx="150" cy="70" r="5" fill="var(--pre-accent)" className="net-node" />
        <circle cx="100" cy="150" r="5" fill="var(--pre-accent)" className="net-node" />
        <circle cx="100" cy="100" r="4" fill="#ffffff" className="net-node" />
      </svg>
    </div>
  );
};

const DollarColonyVisual = () => {
  return (
    <div className="bento-visual dollar-colony-container">
      <div className="colony-grid">
        <div className="colony-tile t-1"></div>
        <div className="colony-tile t-2"></div>
        <div className="colony-tile t-3"></div>
        <div className="colony-tile t-4"></div>
        
        <svg viewBox="0 0 100 100" className="colony-svg-wires">
          <path d="M20,50 L50,20 L80,50 L50,80 Z" fill="none" stroke="rgba(255, 27, 45, 0.4)" strokeWidth="0.8" />
          <circle cx="50" cy="20" r="2" fill="var(--pre-accent)" className="colony-pulse" />
          <circle cx="80" cy="50" r="2" fill="var(--pre-accent)" className="colony-pulse-2" />
        </svg>
      </div>
    </div>
  );
};

const ProjectVisual = ({ type }) => {
  switch (type) {
    case 'cv-flow':
      return <CvFlowVisual />;
    case 'flower-bloom':
      return <FlowerBloomVisual />;
    case 'floating-petals':
      return <FloatingPetalsVisual />;
    case 'node-network':
      return <NodeNetworkVisual />;
    case 'dollar-colony':
      return <DollarColonyVisual />;
    default:
      return <div className="bento-visual generic"></div>;
  }
};

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Calculate rotation steps
  const totalProjects = projectsData.length;
  const rotationAngle = -activeIndex * (360 / totalProjects);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % totalProjects);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  const selectProject = (idx) => {
    setActiveIndex(idx);
  };

  const activeProject = projectsData[activeIndex];

  return (
    <section id="projects" aria-label="Featured Projects" className="projects-wheel-section">
      <div className="projects-wheel-header">
        <p className="section-eyebrow">// 01 / SELECTED WORK</p>
        <TextReveal text="Product Showcase" className="section-title" tag="h2" delay={0.1} />
      </div>

      <div className="projects-wheel-layout">
        {/* Left Side: Dynamic Details Panel */}
        <div className="projects-info-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="project-info-inner"
            >
              <div className="project-info-header">
                <span className="project-info-year font-mono">{activeProject.year}</span>
                <div className="project-info-tags">
                  {activeProject.tags.map((t) => (
                    <span key={t} className="project-info-tag font-mono">{t}</span>
                  ))}
                </div>
              </div>

              <h3 className="project-info-title">{activeProject.title}</h3>
              <p className="project-info-desc">{activeProject.desc}</p>

              <div className="project-info-stack">
                {activeProject.stack?.map((tech) => {
                  const techData = stackItems.find((item) => item.name === tech);
                  if (!techData) return null;
                  return (
                    <div key={tech} className="project-info-icon" title={tech}>
                      <img
                        src={techData.icon}
                        alt={tech}
                        className={techData.invertInDark ? 'invert-in-dark' : ''}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="project-info-actions">
                {activeProject.github && activeProject.github !== '#' && (
                  <Magnetic>
                    <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="showcase-btn btn-ghost" aria-label={`View ${activeProject.title} on GitHub`}>
                      <GithubIcon /> <span>Source</span>
                    </a>
                  </Magnetic>
                )}
                {activeProject.link && activeProject.link !== '#' && (
                  <Magnetic>
                    <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="showcase-btn btn-primary" aria-label={`Open Live Project of ${activeProject.title}`}>
                      <span>Preview</span> <ArrowRight className="w-4 h-4" />
                    </a>
                  </Magnetic>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="project-wheel-nav">
            <button onClick={prevProject} className="wheel-nav-btn" aria-label="Previous Project">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="wheel-nav-indicator font-mono">
              {String(activeIndex + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
            </span>
            <button onClick={nextProject} className="wheel-nav-btn" aria-label="Next Project">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Side: Rotating Radial Wheel */}
        <div className="projects-wheel-panel">
          <div className="projects-radial-container">
            {/* Spinning Outer Ring */}
            <div 
              className="projects-radial-wheel"
              style={{ transform: `rotate(${rotationAngle}deg)` }}
            >
              {projectsData.map((proj, idx) => {
                const angle = idx * (360 / totalProjects);
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={proj.title}
                    onClick={() => selectProject(idx)}
                    className={`project-wheel-node ${isActive ? 'active' : ''}`}
                    style={{
                      transform: `rotate(${angle}deg) translateY(-145px) rotate(-${angle}deg)`
                    }}
                    aria-label={`Select project ${proj.title}`}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </button>
                );
              })}
            </div>

            {/* Static Center Viewer */}
            <div className="project-wheel-center">
              <div className="wheel-center-glow"></div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="wheel-center-visual-wrapper"
                >
                  <ProjectVisual type={activeProject.previewType} />
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Compass HUD decoration */}
            <div className="wheel-decor-ring"></div>
            <div className="wheel-decor-ticks"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
