import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import NoiseOverlay from './NoiseOverlay';
import RainOverlay from './RainOverlay';
import IdentityReveal from './IdentityReveal';

const COMPILER_LOGS = [
  { threshold: 0, text: 'Initializing load-bearing systems...' },
  { threshold: 22, text: 'Fetching selected work & canvas...' },
  { threshold: 48, text: 'Binding smooth scroll context...' },
  { threshold: 75, text: 'Assembling React UI components...' },
  { threshold: 100, text: 'Compilation successful. System ready.' }
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [activeLogs, setActiveLogs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const containerRef = useRef(null);

  useEffect(() => {
    // Disable automatic browser scroll restoration and force top scroll
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Freeze page scrolling during loading
    document.body.style.overflow = 'hidden';

    // Simulate system compilation progress
    let startTimestamp = null;
    const duration = 2800; // 2.8 seconds compilation duration

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(currentProgress);

      // Map logs matching threshold
      const visibleLogs = COMPILER_LOGS.filter(log => currentProgress >= log.threshold).map(log => log.text);
      setActiveLogs(visibleLogs);

      if (currentProgress < 100) {
        window.requestAnimationFrame(step);
      } else {
        setIsLoaded(true);
      }
    };

    window.requestAnimationFrame(step);

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleLaunch = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.04,
      filter: 'blur(16px)',
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        window.scrollTo(0, 0);
        document.body.style.overflow = '';
        setIsComplete(true);
      }
    });
  };

  if (isComplete) return null;

  return (
    <div ref={containerRef} id="premium-preloader" className="premium-preloader-root">
      {/* Moving Ambient Cyan Spotlights */}
      <div className="preloader-ambient-glow-1"></div>
      <div className="preloader-ambient-glow-2"></div>
      
      {/* Very Light animated rain canvas (behind the card) */}
      <RainOverlay />

      {/* Retro overlays (grain, vignette) - very clean now */}
      <NoiseOverlay />

      {/* Glassmorphic Central Compiler Card */}
      <IdentityReveal 
        progress={progress}
        activeLogs={activeLogs}
        isLoaded={isLoaded}
        onComplete={handleLaunch}
      />
    </div>
  );
}
