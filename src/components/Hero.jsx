import { useEffect } from 'react';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import TextScramble from './TextScramble';
import Magnetic from './Magnetic';
import RoleCycler from './RoleCycler';

export default function Hero() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 2.2, // Wait for preloader
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="hero" aria-label="Introduction">
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-availability" variants={itemVariants}>
          <span className="status-dot"></span> Available for new opportunities
        </motion.div>
        
        <div className="hero-name-block">
          <motion.h1 className="hero-name" variants={itemVariants}>
            <TextScramble text="Ashmit Dev" delay={2.3} />
          </motion.h1>
          <motion.h2 className="hero-role" variants={itemVariants} style={{ display: 'flex', gap: '0.5ch' }}>
            <RoleCycler />
          </motion.h2>
        </div>
        
        <div className="hero-footer-row">
          <motion.p className="hero-tagline" variants={itemVariants}>
            I build responsive, scalable, and visually polished web applications using React, Node.js, Java, and modern frontend technologies.
          </motion.p>
          
          <motion.div className="hero-badges" variants={itemVariants}>
            <Magnetic>
              <motion.span drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.2} whileDrag={{ scale: 1.1, zIndex: 10, cursor: 'grabbing' }} whileHover={{ scale: 1.05 }} className="badge">React</motion.span>
            </Magnetic>
            <Magnetic>
              <motion.span drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.2} whileDrag={{ scale: 1.1, zIndex: 10, cursor: 'grabbing' }} whileHover={{ scale: 1.05 }} className="badge">TypeScript</motion.span>
            </Magnetic>
            <Magnetic>
              <motion.span drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.2} whileDrag={{ scale: 1.1, zIndex: 10, cursor: 'grabbing' }} whileHover={{ scale: 1.05 }} className="badge">Node.js</motion.span>
            </Magnetic>
            <Magnetic>
              <motion.span drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.2} whileDrag={{ scale: 1.1, zIndex: 10, cursor: 'grabbing' }} whileHover={{ scale: 1.05 }} className="badge">Java</motion.span>
            </Magnetic>
          </motion.div>
          
          <motion.div className="hero-cta" variants={itemVariants}>
            <Magnetic>
              <a className="btn btn-primary" href="#projects">View Work</a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href="https://github.com/devashmit" target="_blank" rel="noopener noreferrer">GitHub &#8594;</a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        className="hero-scroll" 
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.8 }}
      >
        <span className="hero-scroll-line"></span>
        <span className="hero-scroll-label">SCROLL</span>
      </motion.div>
    </section>
  );
}
