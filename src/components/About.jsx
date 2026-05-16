import { motion } from 'framer-motion';
import BentoCard from './BentoCard';

export default function About() {
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
    hidden: { opacity: 0, scale: 0.95, y: 30, rotateX: 10 },
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
    <section id="about" aria-label="About">
      <div className="section-intro">
        <motion.p 
          className="section-eyebrow" 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants}
        >
          03 / BACKGROUND
        </motion.p>
        <motion.h2 
          className="section-title"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants}
        >
          Journey
        </motion.h2>
      </div>

      <motion.div 
        className="bento-grid about-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.article variants={itemVariants} className="about-col-8">
          <BentoCard className="about-card about-card--large">
            <h3 className="about-card-title">Who I Am</h3>
            <p className="about-card-text">Final year BSc Hons in Computer Science student at Itahari International College (London Metropolitan University) in Nepal. I study systems during the day and build them at night.</p>
          </BentoCard>
        </motion.article>
        
        <motion.article variants={itemVariants} className="about-col-4">
          <BentoCard className="about-card">
            <h3 className="about-card-title">What I Do</h3>
            <p className="about-card-text">I write TypeScript and build functional web applications. My focus is on creating scalable, responsive digital products with clean architecture and engaging user interfaces.</p>
          </BentoCard>
        </motion.article>

        <motion.article variants={itemVariants} className="about-col-4">
          <BentoCard className="about-card">
            <h3 className="about-card-title">Philosophy</h3>
            <p className="about-card-text">Code is honest. I believe in continuous learning and iteration. Most things we build start slightly beyond our grasp, and the development process is the journey to master them.</p>
          </BentoCard>
        </motion.article>
      </motion.div>
    </section>
  );
}
