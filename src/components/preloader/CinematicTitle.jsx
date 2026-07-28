import React from 'react';
import { motion } from 'framer-motion';
import { springtune, tigranzs } from '../../data/content';

export default function CinematicTitle({ isDissolved = false, prefersReducedMotion = false }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.4
      }
    },
    dissolve: {
      transition: {
        staggerChildren: 0.12,
        staggerDirection: -1
      }
    }
  };

  const letterVariants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { 
          opacity: 0, 
          y: 70, 
          rotateX: -80, 
          filter: 'blur(16px)', 
          scale: 0.8 
        },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      filter: 'blur(0px)', 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 45,
        damping: 18,
        mass: 1.1
      }
    },
    dissolve: prefersReducedMotion
      ? { opacity: 0 }
      : { 
          opacity: 0, 
          y: -40, 
          rotateX: 45, 
          filter: 'blur(10px)', 
          scale: 1.05,
          transition: {
            type: 'spring',
            stiffness: 60,
            damping: 20
          }
        }
  };

  return (
    <motion.div 
      className="cinematic-title-container"
      variants={containerVariants}
      initial="hidden"
      animate={isDissolved ? "dissolve" : "visible"}
      style={{ perspective: 1200 }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {["D", "E", "V"].map((letter, i) => (
          <motion.span
            key={i}
            className="cinematic-title-letter"
            variants={letterVariants}
            style={{ display: 'inline-block', transformOrigin: "bottom center" }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {!prefersReducedMotion && (
        <motion.div 
          className="cinematic-title-glow"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={isDissolved ? { scale: 1.3, opacity: 0 } : { scale: 1, opacity: 0.4 }}
          transition={{ type: 'spring', ...tigranzs, delay: 0.2 }}
        />
      )}
    </motion.div>
  );
}
