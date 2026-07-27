import React from 'react';
import { motion } from 'framer-motion';

export default function CinematicTitle({ isDissolved = false, prefersReducedMotion = false }) {
  // Stagger letters or animate the full block for a heavy, monolithic cinematic appearance
  const titleVariants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, filter: 'blur(16px)', scale: 0.97 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 2.0,
        ease: [0.22, 1, 0.36, 1] // oppenheimer-style majestic slow reveal
      }
    },
    dissolve: prefersReducedMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          filter: 'blur(10px)',
          scale: 1.03,
          transition: {
            duration: 1.0,
            ease: [0.22, 1, 0.36, 1]
          }
        }
  };

  return (
    <div className="cinematic-title-container">
      <motion.h1
        className="cinematic-title"
        variants={titleVariants}
        initial="hidden"
        animate={isDissolved ? "dissolve" : "visible"}
      >
        ASHMIT DEV
      </motion.h1>
    </div>
  );
}
