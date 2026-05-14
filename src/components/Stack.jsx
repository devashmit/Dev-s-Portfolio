import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import TextReveal from './TextReveal';
import { stackItems, floatingIcons } from '../data/content';

export default function Stack() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }
  };

  return (
    <section id="stack" aria-label="Technical skills" ref={containerRef} style={{ position: 'relative' }}>
      
      {/* Floating Background Icons */}
      <div className="floating-icons-container">
        {floatingIcons.map((icon, idx) => (
          <motion.img 
            key={idx}
            src={icon} 
            className={`floating-icon float-${idx}`}
            style={{ y: idx % 2 === 0 ? y1 : idx % 3 === 0 ? y2 : y3 }}
            alt=""
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="section-intro relative-z">
        <motion.p 
          className="section-eyebrow" 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          02 / THE ARSENAL
        </motion.p>
        <TextReveal text="Tech Stack" className="section-title" tag="h2" delay={0.1} />
      </div>

      <motion.div 
        className="stack-icon-grid relative-z"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {stackItems.map((item, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            className="stack-icon-card"
            style={{ '--brand-color': item.color }}
            whileHover={{ y: -5 }}
          >
            <div className="stack-icon-glow"></div>
            <div className="stack-icon-inner">
              <img src={item.icon} alt={item.name} className={item.invertInDark ? 'invert-in-dark' : ''} />
            </div>
            <span className="stack-icon-name">{item.name}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Infinite Marquee using Framer Motion */}
      <div className="marquee-container relative-z">
        <motion.div 
          className="marquee-track"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20
          }}
        >
          <span>AVAILABLE FOR FREELANCE • FULL STACK DEVELOPER • UI ENGINEER • </span>
          <span>AVAILABLE FOR FREELANCE • FULL STACK DEVELOPER • UI ENGINEER • </span>
          <span>AVAILABLE FOR FREELANCE • FULL STACK DEVELOPER • UI ENGINEER • </span>
          <span>AVAILABLE FOR FREELANCE • FULL STACK DEVELOPER • UI ENGINEER • </span>
        </motion.div>
      </div>
    </section>
  );
}
