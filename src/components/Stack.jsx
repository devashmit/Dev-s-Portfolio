import { motion } from 'framer-motion';
import BentoCard from './BentoCard';
import { stackData } from '../data/content';

export default function Stack() {
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
    <section id="stack" aria-label="Technical skills">
      <div className="section-intro">
        <motion.p 
          className="section-eyebrow" 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants}
        >
          02 / THE ARSENAL
        </motion.p>
        <motion.h2 
          className="section-title"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants}
        >
          Tech Stack
        </motion.h2>
      </div>

      <motion.div 
        className="bento-grid stack-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {stackData.map((category, idx) => (
          <motion.div key={idx} variants={itemVariants} style={{ gridColumn: 'span 6' }}>
            <BentoCard className="stack-card">
              <div className="stack-category">
                <div dangerouslySetInnerHTML={{ __html: category.icon }} />
                {category.category}
              </div>
              <div className="stack-items">
                {category.items.map((item, i) => (
                  <div key={i} className="stack-item-card">
                    <span className="stack-item-name">{item.name}</span>
                    <span className="stack-item-level">{item.level}</span>
                  </div>
                ))}
              </div>
            </BentoCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Infinite Marquee using Framer Motion */}
      <div className="marquee-container">
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
