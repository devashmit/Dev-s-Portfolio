import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { initHeroField } from '../three/hero-field';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    let field;
    if (!isTouchDevice && canvasRef.current) {
      field = initHeroField(canvasRef.current);
    }
    return () => {
      if (field) field.dispose();
    };
  }, []);

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
      <canvas id="hero-canvas" ref={canvasRef} aria-hidden="true"></canvas>
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
          <motion.h1 className="hero-name" variants={itemVariants}>Ashmit Dev</motion.h1>
          <motion.h2 className="hero-role" variants={itemVariants}>Full Stack Developer & UI Engineer</motion.h2>
        </div>
        
        <div className="hero-footer-row">
          <motion.p className="hero-tagline" variants={itemVariants}>
            I build responsive, scalable, and visually polished web applications using React, Node.js, Java, and modern frontend technologies.
          </motion.p>
          
          <motion.div className="hero-badges" variants={itemVariants}>
            <span className="badge">React</span>
            <span className="badge">TypeScript</span>
            <span className="badge">Node.js</span>
            <span className="badge">Java</span>
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
