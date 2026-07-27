import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function BackgroundGlow({ activeIndex }) {
  const glowRef = useRef(null);

  // Map of project indices to colors matching their glow
  // Index 0: Dollar Colony (cyan glow)
  // Index 1: BerojgarCv (purple glow)
  // Index 2: Sahayogi (orange glow)
  // Index 3: Devs-bouquet (rose glow)
  // Index 4: Virtual Petals (emerald glow)
  const colors = [
    'rgba(6, 182, 212, 0.15)',  // 001: Dollar Colony (cyan)
    'rgba(168, 85, 247, 0.15)', // 002: BerojgarCv (purple)
    'rgba(249, 115, 22, 0.15)',  // 003: Sahayogi (orange)
    'rgba(244, 63, 94, 0.15)',   // 004: Devs-bouquet (rose)
    'rgba(16, 185, 129, 0.15)'   // 005: Virtual Petals (emerald)
  ];

  useEffect(() => {
    if (!glowRef.current) return;
    const targetColor = colors[activeIndex] || colors[0];
    
    // Smoothly interpolate background glow color
    gsap.to(glowRef.current, {
      background: `radial-gradient(circle, ${targetColor} 0%, rgba(9, 9, 11, 0) 70%)`,
      duration: 1.2,
      ease: 'power2.out'
    });
  }, [activeIndex]);

  return (
    <div 
      ref={glowRef}
      className="project-background-glow"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.8,
        willChange: 'background'
      }}
    />
  );
}
