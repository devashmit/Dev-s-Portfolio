import { useEffect } from 'react';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';

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
          <TextReveal text="Ashmit Dev" className="hero-name" tag="h1" delay={2.3} />
          <TextReveal text="Full Stack Developer & UI Engineer" className="hero-role" tag="h2" delay={2.5} />
        </div>
        
        <div className="hero-footer-row">
          <motion.p className="hero-tagline" variants={itemVariants}>
            I build responsive, scalable, and visually polished web applications using React, Node.js, Java, and modern frontend technologies.
          </motion.p>
          
          <motion.div className="hero-badges" variants={itemVariants}>
            <motion.span drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.2} whileDrag={{ scale: 1.1, zIndex: 10, cursor: 'grabbing' }} whileHover={{ scale: 1.05 }} className="badge">React</motion.span>
            <motion.span drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.2} whileDrag={{ scale: 1.1, zIndex: 10, cursor: 'grabbing' }} whileHover={{ scale: 1.05 }} className="badge">TypeScript</motion.span>
            <motion.span drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.2} whileDrag={{ scale: 1.1, zIndex: 10, cursor: 'grabbing' }} whileHover={{ scale: 1.05 }} className="badge">Node.js</motion.span>
            <motion.span drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.2} whileDrag={{ scale: 1.1, zIndex: 10, cursor: 'grabbing' }} whileHover={{ scale: 1.05 }} className="badge">Java</motion.span>
          </motion.div>
          
          <motion.div className="hero-cta" variants={itemVariants}>
            <a className="btn btn-primary" href="#projects">View Work</a>
            <a className="btn btn-ghost" href="https://github.com/devashmit" target="_blank" rel="noopener noreferrer">GitHub &#8594;</a>
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
