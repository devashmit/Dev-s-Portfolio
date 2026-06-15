import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
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
    style={{ width: '18px', height: '18px' }}
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

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projectsData[activeIndex];

  return (
    <section id="projects" aria-label="Featured Projects" className="projects-showcase-section">
      <div className="showcase-container">
        
        {/* Left Side: Live Preview Area */}
        <div className="showcase-preview-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.title}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="showcase-visual-wrapper"
            >
              {/* Huge Background Watermark */}
              <div className="showcase-watermark">
                {String(activeIndex + 1).padStart(2, '0')}
              </div>

              <div className="showcase-visual-bg">
                <ProjectVisual type={activeProject.previewType} />
              </div>
              
              <div className="showcase-project-details-overlay">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                  className="showcase-details-content"
                >
                  <div className="showcase-tags">
                    {activeProject.tags.map(t => (
                      <span key={t} className="showcase-tag font-mono">{t}</span>
                    ))}
                  </div>

                  <p className="showcase-desc">{activeProject.desc}</p>

                  <div className="showcase-actions">
                    {activeProject.github && activeProject.github !== '#' && (
                      <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="showcase-btn btn-ghost" aria-label={`View ${activeProject.title} on GitHub`}>
                        <GithubIcon /> <span>Source Code</span>
                      </a>
                    )}
                    {activeProject.link && activeProject.link !== '#' && (
                      <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="showcase-btn btn-primary" aria-label={`Open Live Project of ${activeProject.title}`}>
                        <span>Live Preview</span> <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Vertical Navigation */}
        <div className="showcase-navigation-area">
          <div className="showcase-header">
            <motion.p
              className="section-eyebrow"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              // 01 / SELECTED WORK
            </motion.p>
            <TextReveal text="Product Showcase" className="showcase-title" tag="h2" delay={0.1} />
          </div>

          <div className="showcase-list">
            {projectsData.map((project, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div 
                  key={project.title}
                  className={`showcase-list-item ${isActive ? 'active' : ''}`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                >
                  <span className="showcase-item-num font-mono">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="showcase-item-title">{project.title}</h3>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
