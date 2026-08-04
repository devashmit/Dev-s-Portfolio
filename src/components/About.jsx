import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// Custom CountUp Component that triggers when in view
function CountUp({ value, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const targetNumber = parseInt(value, 10);
    if (isNaN(targetNumber)) {
      setCount(value);
      return;
    }

    const startTime = performance.now();
    const animateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Ease out quad
      const easedProgress = progress * (2 - progress);
      setCount(Math.round(easedProgress * targetNumber));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(targetNumber);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, value, duration]);

  const suffix = value.toString().replace(/[0-9]/g, '');

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// Scrambling interactive word component
function InteractiveWord({ word, isHighlight = false }) {
  const [displayWord, setDisplayWord] = useState(word);
  const [isAnimating, setIsAnimating] = useState(false);
  const CHARS = '0123456789ABCDEF█░▒▓<>_[]{}';
  
  const scramble = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayWord(() => {
        return word.split('').map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration) return word[index];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');
      });
      
      iteration += 1 / 2;
      if (iteration >= word.length) {
        clearInterval(interval);
        setDisplayWord(word);
        setIsAnimating(false);
      }
    }, 30);
  };

  const handleClick = () => {
    if (isHighlight) {
      // Summons the cat's toy at the cursor position
      const event = new CustomEvent('cat:summon_toy', { detail: { active: true } });
      document.dispatchEvent(event);
      
      // Play high-tech audio chime
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } catch (err) {}
    }
    scramble();
  };

  return (
    <motion.span
      className={isHighlight ? "philosophy-highlight cursor-pointer" : "interactive-word cursor-default"}
      onMouseEnter={scramble}
      onClick={handleClick}
      whileHover={{ 
        scale: 1.05, 
        color: isHighlight ? undefined : 'var(--accent)',
        textShadow: isHighlight ? undefined : '0 0 15px rgba(6, 182, 212, 0.4)'
      }}
      style={{ display: 'inline-block', transition: 'color 0.25s' }}
    >
      {displayWord}
    </motion.span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    }
  }
};

const lineVariants = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const highlightVariants = {
  hidden: { scaleX: 0.7, opacity: 0 },
  show: { 
    scaleX: 1, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 90, damping: 12, delay: 0.5 }
  }
};

const labelVariants = {
  hidden: { x: -28, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
};

const textFadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.3 } }
};

export default function About() {
  return (
    <section id="about" className="philosophy-section">
      <div className="philosophy-container">
        
        {/* Eyebrow Label: Slides in from left */}
        <motion.div 
          className="philosophy-eyebrow"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={labelVariants}
        >
          <span>02 / PHILOSOPHY</span>
        </motion.div>

        {/* Headline: Staggered line reveal */}
        <motion.h2 
          className="philosophy-title"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="line-wrapper" style={{ overflow: 'hidden' }}>
            <motion.span style={{ display: 'block' }} variants={lineVariants}>
              <InteractiveWord word="BUILDING" />
            </motion.span>
          </div>
          <div className="line-wrapper" style={{ overflow: 'hidden' }}>
            <motion.span style={{ display: 'block' }} variants={lineVariants}>
              <InteractiveWord word="DIGITAL" />
            </motion.span>
          </div>
          <div className="line-wrapper" style={{ overflow: 'hidden' }}>
            <motion.span style={{ display: 'block' }} variants={lineVariants}>
              <InteractiveWord word="EXPERIENCES" />
            </motion.span>
          </div>
          <div className="line-wrapper" style={{ overflow: 'hidden' }}>
            <motion.span style={{ display: 'block' }} variants={lineVariants}>
              <InteractiveWord word="THAT" />
            </motion.span>
          </div>
          <div className="line-wrapper" style={{ overflow: 'hidden', paddingBottom: '0.1em' }}>
            <motion.span 
              className="philosophy-highlight-wrapper" 
              variants={highlightVariants}
              style={{ display: 'inline-block', transformOrigin: 'left' }}
            >
              <InteractiveWord word="LAST" isHighlight={true} />
            </motion.span>
          </div>
        </motion.h2>

        {/* Narrative bio: Fades in with small upward shift */}
        <motion.p 
          className="philosophy-bio"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={textFadeUp}
        >
          I build modern web applications that combine thoughtful design, scalable architecture, and intuitive user experiences.
          <br /><br />
          I shape digital spaces where code meets curiosity—crafting clean, fluid interfaces that turn complex logic into poetry in motion.
        </motion.p>

        {/* Animated divider: expands left to right */}
        <motion.div 
          className="philosophy-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{ transformOrigin: "left" }}
        />

        {/* Statistics list: Counts up when in view */}
        <div className="philosophy-stats">
          <div className="philosophy-stat-item">
            <span className="stat-number">
              <CountUp value="15+" />
            </span>
            <span className="stat-label">PROJECTS DESIGNED & BUILT</span>
          </div>
          <div className="philosophy-stat-item">
            <span className="stat-number">
              <CountUp value="4+" />
            </span>
            <span className="stat-label">YEARS LEARNING & BUILDING</span>
          </div>
          <div className="philosophy-stat-item">
            <span className="stat-number">
              <CountUp value="20+" />
            </span>
            <span className="stat-label">TECHNOLOGIES USED</span>
          </div>
          <div className="philosophy-stat-item">
            <span className="stat-number">
              <CountUp value="100%" />
            </span>
            <span className="stat-label">FOCUS ON PRODUCT QUALITY</span>
          </div>
        </div>

      </div>
    </section>
  );
}
