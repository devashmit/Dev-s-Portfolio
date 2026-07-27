import React from 'react';
import { motion } from 'framer-motion';

export default function LightSweep() {
  return (
    <motion.div
      className="light-sweep-beam"
      initial={{ x: '-50vw', opacity: 0 }}
      animate={{ x: '150vw', opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 3.0,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom ease-in-out curve for smooth camera feel
        times: [0, 0.2, 0.8, 1]
      }}
    />
  );
}
