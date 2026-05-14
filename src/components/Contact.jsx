import { motion } from 'framer-motion';
import Magnetic from './Magnetic';
import BentoCard from './BentoCard';

export default function Contact() {
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <section id="contact" aria-label="Contact">
      <div className="contact-header">
        <motion.p 
          className="section-eyebrow" 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants}
        >
          04 / REACH ME
        </motion.p>
        <motion.h2 
          className="section-title"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants}
        >
          Let's connect.
        </motion.h2>
      </div>
      
      <motion.div 
        className="bento-grid contact-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants} style={{ gridColumn: 'span 3' }}>
          <Magnetic>
            <a href="https://github.com/devashmit" target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
              <BentoCard className="contact-card">
                <span className="contact-card-label">GitHub</span>
                <span className="contact-card-value">devashmit &#8594;</span>
              </BentoCard>
            </a>
          </Magnetic>
        </motion.div>

        <motion.div variants={itemVariants} style={{ gridColumn: 'span 3' }}>
          <Magnetic>
            <a href="https://www.linkedin.com/in/abhishek-dev-5b5148357" target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
              <BentoCard className="contact-card">
                <span className="contact-card-label">LinkedIn</span>
                <span className="contact-card-value">Ashmit Dev &#8594;</span>
              </BentoCard>
            </a>
          </Magnetic>
        </motion.div>

        <motion.div variants={itemVariants} style={{ gridColumn: 'span 3' }}>
          <Magnetic>
            <a href="mailto:devvv0264@gmail.com" target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
              <BentoCard className="contact-card">
                <span className="contact-card-label">Email</span>
                <span className="contact-card-value">devvv0264 &#8594;</span>
              </BentoCard>
            </a>
          </Magnetic>
        </motion.div>

        <motion.div variants={itemVariants} style={{ gridColumn: 'span 3' }}>
          <Magnetic>
            <a href="https://wa.me/message/6VRRX2XZZ4UFO1" target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
              <BentoCard className="contact-card">
                <span className="contact-card-label">WhatsApp</span>
                <span className="contact-card-value">Message Me &#8594;</span>
              </BentoCard>
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
