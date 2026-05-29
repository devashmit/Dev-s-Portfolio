import { motion } from 'framer-motion';
import TextScramble from './TextScramble';
import Magnetic from './Magnetic';
import RoleCycler from './RoleCycler';

// ─── Each element gets its own animation signature ────────────────────────────

/** Availability badge: enters from the left — telegraphs "status indicator" feel */
const slideFromLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }
  }
};

/** Name / primary headline: classic upward reveal — the most prominent element */
const maskReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

/** Role / sub-headline: blurs into focus — softer, secondary priority */
const blurIn = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: 'easeOut' }
  }
};

/** Tagline body text: pure opacity — no spatial movement, just presence */
const pureFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.0, ease: 'easeOut' }
  }
};

/** Badges: spring scale-pop — playful, interactive feel */
const springPop = {
  hidden: { opacity: 0, scale: 0.78 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 280, damping: 20, mass: 0.8 }
  }
};

/** CTA row: slides up — action-oriented, the last thing you notice */
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
      staggerChildren: 0.14,
      delayChildren: 2.2,
    }
  }
};

export default function Hero() {
  return (
    <section id="hero" aria-label="Introduction">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Slide from left — status badge */}
        <motion.div className="hero-availability" variants={slideFromLeft}>
          <span className="status-dot"></span> Available for new opportunities
        </motion.div>

        <div className="hero-name-block">
          {/* Upward reveal — primary headline */}
          <motion.h1 className="hero-name" variants={maskReveal}>
            <TextScramble text="Ashmit Dev" delay={2.3} />
          </motion.h1>
          {/* Blur fade-in — secondary headline, softer entry */}
          <motion.h2 className="hero-role" variants={blurIn} style={{ display: 'flex', gap: '0.5ch' }}>
            <RoleCycler />
          </motion.h2>
        </div>

        <div className="hero-footer-row">
          {/* Pure opacity — body copy, no drama */}
          <motion.p className="hero-tagline" variants={pureFade}>
            I build responsive, scalable, and visually polished web applications using React, Node.js, Java, and modern frontend technologies.
          </motion.p>

          {/* Spring pop — playful, interactive elements */}
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

          {/* Slide up — CTA, the call to action comes in last */}
          <motion.div className="hero-cta" variants={slideUp}>
            <Magnetic>
              <a className="btn btn-primary" href="#projects">View Work</a>
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

      {/* Scroll indicator — delayed pure fade, no movement */}
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
