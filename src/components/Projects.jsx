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

const ProjectVisual = ({ type }) => {
  const images = {
    'cv-flow': '/images/berojgar-cv.png',
    'flower-bloom': '/images/devs-bouquet.png',
    'floating-petals': '/images/virtual-petals.png',
    'node-network': '/images/sahayogi.png',
    'dollar-colony': '/images/dollar-colony.png'
  };

  const src = images[type] || '/images/cyberpunk-skyline.png';

  return (
    <div className="bento-visual project-image-visual w-full h-full relative overflow-hidden">
      <img src={src} alt={type} className="w-full h-full object-cover" style={{ filter: 'brightness(0.9) contrast(1.1)' }} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-transparent to-transparent opacity-60"></div>
      <div className="absolute inset-0 border border-white/5 pointer-events-none"></div>
      {/* Sci-fi Overlay Detail */}
      <div className="absolute top-2 left-2 text-[8px] font-mono opacity-40 text-white tracking-widest uppercase">
        {type} // SCAN_ACTIVE
      </div>
    </div>
  );
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
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="project-info-year font-mono"
                >
                  {activeProject.year}
                </motion.span>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.08 }}
                  className="project-info-tags"
                >
                  {activeProject.tags.map((t) => (
                    <span key={t} className="project-info-tag font-mono">{t}</span>
                  ))}
                </motion.div>
              </div>

              <motion.h3 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                className="project-info-title"
              >
                {activeProject.title}
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.18 }}
                className="project-info-desc"
              >
                {activeProject.desc}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.24 }}
                className="project-info-stack"
              >
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
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="project-info-actions"
              >
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
              </motion.div>
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
                      transform: `rotate(${angle}deg) translateY(var(--translate-y, -145px)) rotate(-${angle + rotationAngle}deg)`
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
                  initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 8 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
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
