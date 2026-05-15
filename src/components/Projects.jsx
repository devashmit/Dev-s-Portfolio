import { motion } from 'framer-motion';
import BentoCard from './BentoCard';
import Magnetic from './Magnetic';
import TextReveal from './TextReveal';

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30, rotateX: 15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      rotateX: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.2, 0.65, 0.3, 0.9] 
      } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
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
      </div>

      <motion.div 
        className="bento-grid projects-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.article variants={itemVariants} className="project-col-6">
          <BentoCard className="project-card">
            <div className="project-card-inner">
              <div className="project-header">
                <span className="project-year">2024</span>
                <Magnetic>
                  <a href="https://github.com/devashmit/BerojgarCv" target="_blank" rel="noopener noreferrer" className="project-external-link" aria-label="View on GitHub">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                </Magnetic>
              </div>
              <h3 className="project-title">BerojgarCv</h3>
              <p className="project-desc">A professional CV generator built with TypeScript. The irony is load-bearing structural code.</p>
              <div className="project-tags">
                <span>TypeScript</span><span>Web</span>
              </div>
            </div>
          </BentoCard>
        </motion.article>

        <motion.article variants={itemVariants} className="project-col-6">
          <BentoCard className="project-card">
            <div className="project-card-inner">
              <div className="project-header">
                <span className="project-year">2024</span>
                <Magnetic>
                  <a href="https://github.com/devashmit/Devs-bouquet" target="_blank" rel="noopener noreferrer" className="project-external-link" aria-label="View on GitHub">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                </Magnetic>
              </div>
              <h3 className="project-title">Devs-bouquet</h3>
              <p className="project-desc">Interactive canvas experience for creating soft, hand-drawn digital flower arrangements.</p>
              <div className="project-tags">
                <span>Canvas API</span><span>Creative Coding</span>
              </div>
            </div>
          </BentoCard>
        </motion.article>

        <motion.article variants={itemVariants} className="project-col-6">
          <BentoCard className="project-card">
            <div className="project-card-inner">
              <div className="project-header">
                <span className="project-year">2024</span>
                <Magnetic>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="project-external-link" aria-label="View Project">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                </Magnetic>
              </div>
              <h3 className="project-title">Virtual Petals</h3>
              <p className="project-desc">A beautiful digital garden where users can plant, grow, and customize interactive virtual flower petals.</p>
              <div className="project-tags">
                <span>Canvas</span><span>Interactive</span>
              </div>
            </div>
          </BentoCard>
        </motion.article>

        <motion.article variants={itemVariants} className="project-col-12 project-card--featured-wrapper">
          <BentoCard className="project-card project-card--featured">
            <div className="project-card-inner">
              <div className="project-header">
                <span className="project-year">2025</span>
                <Magnetic>
                  <a href="https://github.com/devashmit/SYP" target="_blank" rel="noopener noreferrer" className="project-external-link" aria-label="View on GitHub">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                </Magnetic>
              </div>
              <h3 className="project-title">Sahayogi</h3>
              <p className="project-desc">A companion helper application. Still in active development.</p>
              <div className="project-tags">
                <span>WIP</span><span>Systems</span>
              </div>
            </div>
          </BentoCard>
        </motion.article>
      </motion.div>
    </section>
  );
}
