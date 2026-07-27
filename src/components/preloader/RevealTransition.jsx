import React from 'react';
import { motion } from 'framer-motion';

export default function RevealTransition({ children, isRevealing = false }) {
  return (
    <motion.div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10
      }}
      animate={isRevealing ? { opacity: 0 } : { opacity: 1 }}
      transition={{
        duration: 1.6,
        ease: [0.22, 1, 0.36, 1] // Custom ease curve for cinematic seamless merge
      }}
    >
      {children}
    </motion.div>
  );
}
