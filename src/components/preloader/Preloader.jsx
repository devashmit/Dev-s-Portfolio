import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LightSweep from './LightSweep';
import DustParticles from './DustParticles';
import CinematicTitle from './CinematicTitle';
import RevealTransition from './RevealTransition';
import NoiseOverlay from './NoiseOverlay';
import RedRain from './RedRain';

export default function Preloader({ onRevealStart, onComplete }) {
  const [showAmbient, setShowAmbient] = useState(false);
  const [showSweep, setShowSweep] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [isDissolved, setIsDissolved] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);

    // Initial page scroll prep
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    let timers = [];

    if (mediaQuery.matches) {
      // Reduced motion timeline: simple fade in and fade out
      setShowTitle(true);
      
      timers.push(setTimeout(() => {
        setIsDissolved(true);
        if (onRevealStart) onRevealStart();
      }, 1000));

      timers.push(setTimeout(() => {
        setIsRevealing(true);
      }, 1400));

      timers.push(setTimeout(() => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }, 1800));
    } else {
      // Standard cinematic timeline
      // 0.6s - Ambient light appears
      timers.push(setTimeout(() => {
        setShowAmbient(true);
      }, 600));

      // 1.4s - Soft light sweeps across center
      timers.push(setTimeout(() => {
        setShowSweep(true);
      }, 1400));

      // 2.2s - "DEV" emerges from darkness
      timers.push(setTimeout(() => {
        setShowTitle(true);
      }, 2200));

      // 4.2s - Title gently dissolves, start portfolio reveal and fade out preloader simultaneously
      timers.push(setTimeout(() => {
        setIsDissolved(true);
        setIsRevealing(true);
        if (onRevealStart) onRevealStart();
      }, 4200));

      // 4.6s - Complete preloader unmount
      timers.push(setTimeout(() => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }, 4600));
    }

    return () => {
      timers.forEach(clearTimeout);
      mediaQuery.removeEventListener('change', handleChange);
      document.body.style.overflow = '';
    };
  }, [onRevealStart, onComplete]);

  return (
    <motion.div
      id="premium-preloader"
      className="premium-preloader-root"
      animate={isRevealing ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background Cinematic Overlays */}
      <div className="cinematic-vignette" />
      {showAmbient && <div className="cinematic-haze" />}

      {/* Subtle organic noise/film grain */}
      <NoiseOverlay />

      {/* Subtle light red rain falling slowly */}
      <RedRain />

      {/* Subtle slow floating dust particles */}
      {!prefersReducedMotion && <DustParticles />}

      {/* Horizontal Light Sweep Beam */}
      {!prefersReducedMotion && showSweep && <LightSweep />}

      <RevealTransition isRevealing={isRevealing}>
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          animate={prefersReducedMotion ? {} : { scale: [0.99, 1.015] }}
          transition={{ duration: 4.6, ease: [0.25, 0.46, 0.45, 0.94] }} // slow camera push-in zoom
        >
          {showTitle && (
            <CinematicTitle
              isDissolved={isDissolved}
              prefersReducedMotion={prefersReducedMotion}
            />
          )}
        </motion.div>
      </RevealTransition>
    </motion.div>
  );
}
