// src/utils/motion.js

// Easing preset (cubic-bezier 0.22, 1, 0.36, 1)
export const EASE_PRESET = [0.22, 1, 0.36, 1];

// Timing durations (in seconds)
export const DURATIONS = {
  fast: 0.25,
  medium: 0.45,
  slow: 0.7,
  hero: 1.0,
  extra: 1.4
};

// Unified Framer Motion transition config generators
export const getTransition = (type = 'medium', delay = 0) => ({
  duration: DURATIONS[type] || DURATIONS.medium,
  ease: EASE_PRESET,
  delay
});

// Reusable scroll reveal transition variant
export const scrollRevealVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    filter: 'blur(12px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: DURATIONS.slow,
      ease: EASE_PRESET
    }
  }
};

// Reusable stagger container configurations
export const getStaggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});
