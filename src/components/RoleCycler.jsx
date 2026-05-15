import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const roles = [
  "Full Stack Developer",
  "UI Engineer",
  "Creative Coder",
  "Problem Solver"
];

export default function RoleCycler({ className = "" }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`role-cycler-container ${className}`} style={{ height: '1.2em', overflow: 'hidden', position: 'relative', display: 'inline-block', verticalAlign: 'top' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: 'block', whiteSpace: 'nowrap' }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
