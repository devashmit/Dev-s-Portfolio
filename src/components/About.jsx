import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import TextReveal from './TextReveal';

const journey = [
  {
    year: '2025',
    title: 'Distributed Systems',
    desc: 'Engineering high-performance platforms, focusing on real-time event streaming, zero-downtime deployments, and robust microservices architecture.',
  },
  {
    year: '2024',
    title: 'Frontend Architecture',
    desc: 'Mastering component-driven UI engineering. Building custom generative physics engines and optimizing React render cycles for consistent 60FPS.',
  },
  {
    year: '2023',
    title: 'Software Design Patterns',
    desc: 'Applying structural OOP patterns across backend services. Deep dive into computational complexity analysis and relational schema design.',
  },
  {
    year: '2022',
    title: 'Foundational Computer Science',
    desc: 'Implementing core data structures and graph algorithms from scratch. Establishing a rigorous mathematical foundation for engineering decisions.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const slideRight = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export default function About() {
  return (
    <section id="about" className="minimal-about-section">
      <div className="minimal-about-container">
        
        {/* Header */}
        <div className="minimal-about-header">
          <TextReveal text="About Me" tag="h2" className="minimal-section-title" delay={0.1} />
        </div>

        {/* Content Split */}
        <div className="minimal-about-split">
          
          {/* Left: Bio */}
          <motion.div 
            className="minimal-bio-column"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
          >
            <h3 className="minimal-bio-heading">
              Building digital experiences with rigorous engineering and deliberate design.
            </h3>
            
            <div className="minimal-bio-text">
              <p>
                I am Ashmit, a full-stack engineer who specializes in building high-performance digital products. My work lives at the intersection of systems thinking and creative craftsmanship.
              </p>
              <p>
                Whether designing a real-time WebSocket architecture or hand-crafting a subtle CSS micro-interaction, the standard is always the same: precise, performant, and polished. I care deeply about the architectural decisions that make a codebase maintainable at scale, and equally about the details that make an interface feel exceptional.
              </p>
            </div>
            
            <a href="#contact" className="minimal-contact-link">
              <span>Let's collaborate</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Right: Journey */}
          <motion.div 
            className="minimal-journey-column"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
            }}
          >
            <div className="minimal-journey-label">PROFESSIONAL JOURNEY</div>
            
            <div className="minimal-journey-container" style={{ position: 'relative', paddingLeft: '24px' }}>
              {/* The Timeline Line that draws itself */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '1px',
                  background: 'linear-gradient(to bottom, #06b6d4, transparent)',
                  transformOrigin: 'top'
                }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              />

              {/* The pulsing dot that travels */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: '-3.5px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#06b6d4',
                  boxShadow: '0 0 10px #06b6d4'
                }}
                initial={{ top: '0%' }}
                whileInView={{ top: '100%' }}
                viewport={{ once: true, margin: '-100px' }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  top: { duration: 2.5, ease: "easeInOut", delay: 0.2 },
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
              />

              <div className="minimal-journey-list">
                {journey.map((item, idx) => (
                  <motion.div key={idx} className="minimal-journey-item" variants={slideRight} style={{ marginBottom: '2rem' }}>
                    <div className="minimal-journey-year">{item.year}</div>
                    <div className="minimal-journey-content">
                      <h4 className="minimal-journey-title">{item.title}</h4>
                      <p className="minimal-journey-desc">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
