import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import TextReveal from './TextReveal';
import { stackItems, floatingIcons } from '../data/content';

function StackCard({ item, index }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tilt and magnetic effect
  const springConfig = { stiffness: 150, damping: 15 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  const translateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const translateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);

    // Set CSS variables for the glow effect
    cardRef.current.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`);
    cardRef.current.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12,
        delay: index * 0.05 
      } 
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      className="stack-icon-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        '--brand-color': item.color,
        rotateX,
        rotateY,
        x: translateX,
        y: translateY,
      }}
    >
      <div className="stack-icon-glow"></div>
      <div className="stack-icon-inner">
        <img src={item.icon} alt={item.name} className={item.invertInDark ? 'invert-in-dark' : ''} />
      </div>
      <span className="stack-icon-name">{item.name}</span>
    </motion.div>
  );
}

export default function Stack() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -250]);

  return (
    <section id="stack" aria-label="Technical skills" ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Dynamic Background Elements */}
      <div className="floating-icons-container">
        {floatingIcons.map((icon, idx) => (
          <motion.img 
            key={idx}
            src={icon} 
            className={`floating-icon float-${idx}`}
            style={{ 
              y: idx % 2 === 0 ? y1 : idx % 3 === 0 ? y2 : y3,
              filter: 'grayscale(100%) brightness(0.5)',
              opacity: 0.03
            }}
            alt=""
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="section-intro relative-z">
        <motion.p 
          className="section-eyebrow" 
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
        >
          02 / THE ARSENAL
        </motion.p>
        <TextReveal text="Tech Stack" className="section-title" tag="h2" delay={0.1} />
      </div>

      <div className="stack-icon-grid relative-z">
        {stackItems.map((item, idx) => (
          <StackCard key={idx} item={item} index={idx} />
        ))}
      </div>

      {/* Infinite Marquee */}
      <div className="marquee-container relative-z">
        <motion.div 
          className="marquee-track"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30 // Slower, more premium feel
          }}
        >
          {Array(4).fill(null).map((_, i) => (
            <span key={i}>
              AVAILABLE FOR FREELANCE • FULL STACK DEVELOPER • UI ENGINEER • 
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
