import { useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  const count = useMotionValue(0);
  const [displayCount, setDisplayCount] = useState("000");

  useEffect(() => {
    // Reduced motion check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsComplete(true);
      document.dispatchEvent(new CustomEvent('preloader:complete'));
      return;
    }

    const controls = animate(count, 100, {
      duration: 1.6,
      ease: "easeInOut",
      onUpdate: (latest) => {
        setDisplayCount(String(Math.round(latest)).padStart(3, '0'));
      },
      onComplete: () => {
        setTimeout(() => {
          setIsComplete(true);
          document.dispatchEvent(new CustomEvent('preloader:complete'));
        }, 700);
      }
    });

    return controls.stop;
  }, [count]);

  if (isComplete) return null;

  const letterVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      id="preloader" 
      aria-hidden="true"
      initial={{ clipPath: 'inset(0 0 0 0)' }}
      animate={ count.get() >= 100 ? { clipPath: 'inset(0 0 100% 0)' } : { clipPath: 'inset(0 0 0 0)' } }
      transition={{ delay: 1.8, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="pre-inner">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.35em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1.25rem', opacity: 0.8, textAlign: 'center' }}>
          ASHMIT DEV · CORE SYSTEM BOOT v5.02
        </div>
        <div className="pre-count">{displayCount}%</div>
        <motion.div 
          className="pre-name"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.06
              }
            }
          }}
        >
          <motion.span variants={letterVariants}>A</motion.span>
          <motion.span variants={letterVariants}>S</motion.span>
          <motion.span variants={letterVariants}>H</motion.span>
          <motion.span variants={letterVariants}>M</motion.span>
          <motion.span variants={letterVariants}>I</motion.span>
          <motion.span variants={letterVariants}>T</motion.span>
          <span className="pre-space">&nbsp;</span>
          <motion.span variants={letterVariants}>D</motion.span>
          <motion.span variants={letterVariants}>E</motion.span>
          <motion.span variants={letterVariants}>V</motion.span>
        </motion.div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--ink-dim)', marginTop: '1.5rem', textAlign: 'center', textTransform: 'uppercase' }}>
          [ DECRYPTING SECURE DEVELOPER DOSSIER... ]
        </div>
      </div>
    </motion.div>
  );
}

import { animate } from "framer-motion";
