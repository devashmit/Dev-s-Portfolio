import { motion } from 'framer-motion';
import TextScramble from './TextScramble';
import Magnetic from './Magnetic';
import RoleCycler from './RoleCycler';
import { springtune, tigranzs } from '../data/content';

// ─── Each element gets its own animation signature ────────────────────────────

/** Availability badge: enters from the left - telegraphs "status indicator" feel */
const slideFromLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }
  }
};

/** Name / primary headline: classic upward reveal with subtle 3D tilt */
const maskReveal = {
  hidden: { opacity: 0, y: 32, rotateX: -15, perspective: 1000 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

/** Role / sub-headline: blurs into focus - softer, secondary priority */
const blurIn = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 15 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.9, ease: 'easeOut' }
  }
};

/** Tagline body text: pure opacity - no spatial movement, just presence */
const pureFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.0, ease: 'easeOut' }
  }
};

/** Badges: spring scale-pop - playful, interactive feel */
const springPop = {
  hidden: { opacity: 0, scale: 0.78 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springtune
  }
};

/** CTA row: slides up - action-oriented, the last thing you notice */
const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    }
  }
};

function CyberDust() {
  const particles = Array.from({ length: 15 });
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            backgroundColor: '#06b6d4',
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [0, Math.random() * 0.5 + 0.2, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
        />
      ))}
    </div>
  );
}

export default function Hero({ isRevealStarted = false }) {
  return (
    <section id="hero" aria-label="Introduction" style={{ position: 'relative' }}>
      <CyberDust />
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate={isRevealStarted ? "visible" : "hidden"}
      >
        {/* Slide from left - status badge */}
        <motion.div className="hero-availability" variants={slideFromLeft}>
          <span className="status-dot"></span> Available for new opportunities
        </motion.div>

        <div className="hero-name-block">
          {/* Upward reveal - primary headline */}
          <motion.h1 className="hero-name" variants={maskReveal}>
            <TextScramble text="Ashmit Dev" delay={0.2} />
          </motion.h1>
          {/* Blur fade-in - secondary headline, softer entry */}
          <motion.h2 className="hero-role" variants={blurIn} style={{ display: 'flex', gap: '0.5ch' }}>
            <RoleCycler />
          </motion.h2>
        </div>

        <div className="hero-footer-row">
          {/* Pure opacity - body copy, no drama */}
          <motion.p className="hero-tagline" variants={pureFade}>
            I build responsive, scalable, and visually polished web applications using React, Node.js, Java, and modern frontend technologies.
          </motion.p>

          {/* Spring pop - playful, interactive elements */}
          <motion.div className="hero-badges" variants={springPop}>
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

          {/* Slide up - CTA, the call to action comes in last */}
          <motion.div className="hero-cta" variants={slideUp}>
            <Magnetic>
              <a className="btn btn-primary" href="#projects">View Work</a>
            </Magnetic>
            <Magnetic>
              <a 
                className="btn btn-accent btn-game-trigger" 
                href="#stack"
                style={{
                  borderColor: '#f43f5e',
                  background: 'linear-gradient(135deg, rgba(244,63,94,0.2) 0%, rgba(225,29,72,0.1) 100%)',
                  color: '#f43f5e',
                  boxShadow: '0 0 15px rgba(244,63,94,0.15)',
                  fontWeight: 600
                }}
                onClick={(e) => {
                  const target = document.querySelector('#stack');
                  if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                  setTimeout(() => {
                    document.dispatchEvent(new CustomEvent('console:open_game'));
                  }, 450);
                }}
              >
                🎮 Void Serpent
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-accent" href="/Ashmit_Dev_CV.pdf" download="Ashmit_Dev_CV.pdf">Download CV &#8595;</a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href="https://github.com/devashmit" target="_blank" rel="noopener noreferrer">GitHub &#8594;</a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator - delayed pure fade, no movement */}
      <motion.div
        className="hero-scroll"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6, duration: 1.4, ease: 'easeOut' }}
      >
        <span className="hero-scroll-line"></span>
        <span className="hero-scroll-label">SCROLL</span>
      </motion.div>
    </section>
  );
}
