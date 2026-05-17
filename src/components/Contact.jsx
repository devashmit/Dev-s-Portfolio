import { motion } from 'framer-motion';
import Magnetic from './Magnetic';
import BentoCard from './BentoCard';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

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
        <motion.p 
          className="contact-subtitle"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants}
        >
          Open for new opportunities. Let's build something amazing together.
        </motion.p>
      </div>
      
      <motion.div 
        className="contact-layout"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants} className="contact-main">
          <BentoCard className="contact-card-main">
            <div className="contact-main-content">
              <div>
                <div className="contact-status">
                  <span className="status-dot"></span>
                  <span>Available for work</span>
                </div>
                <h3 className="contact-main-title">Have a project in mind?</h3>
                <p className="contact-main-desc">I'm currently available for freelance work and full-time roles. If you're looking for a developer who can bring your ideas to life, let's talk.</p>
              </div>
              
              <Magnetic>
                <a href="mailto:devvv0264@gmail.com" className="contact-cta-btn">
                  <MdEmail className="contact-icon-large" />
                  <span>Drop me an email</span>
                </a>
              </Magnetic>
            </div>
          </BentoCard>
        </motion.div>

        <motion.div variants={itemVariants} className="contact-socials">
          <div className="socials-grid">
            <Magnetic>
              <a href="https://github.com/devashmit" target="_blank" rel="noopener noreferrer" className="social-card">
                <BentoCard className="social-bento">
                  <FaGithub className="social-icon" />
                  <span className="social-label">GitHub</span>
                  <span className="social-value">devashmit &#8594;</span>
                </BentoCard>
              </a>
            </Magnetic>
            
            <Magnetic>
              <a href="https://www.linkedin.com/in/abhishek-dev-5b5148357" target="_blank" rel="noopener noreferrer" className="social-card">
                <BentoCard className="social-bento">
                  <FaLinkedin className="social-icon" />
                  <span className="social-label">LinkedIn</span>
                  <span className="social-value">Ashmit Dev &#8594;</span>
                </BentoCard>
              </a>
            </Magnetic>
            
            <Magnetic>
              <a href="https://wa.me/message/6VRRX2XZZ4UFO1" target="_blank" rel="noopener noreferrer" className="social-card">
                <BentoCard className="social-bento">
                  <FaWhatsapp className="social-icon" />
                  <span className="social-label">WhatsApp</span>
                  <span className="social-value">Message Me &#8594;</span>
                </BentoCard>
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
