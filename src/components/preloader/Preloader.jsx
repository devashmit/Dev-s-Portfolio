import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import NoiseOverlay from './NoiseOverlay';
import RainOverlay from './RainOverlay';
import HUD from './HUD';
import Radar from './Radar';
import SystemText from './SystemText';
import IdentityReveal from './IdentityReveal';

export default function Preloader() {
  const [isComplete, setIsComplete] = useState(false);
  
  const containerRef = useRef(null);
  const bgImageRef = useRef(null);
  const parallaxLayersRef = useRef([]);

  useEffect(() => {
    // Disable automatic browser scroll restoration and force top scroll
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Freeze page scrolling during loading
    document.body.style.overflow = 'hidden';

    // 3D Parallax Mouse Move Handler
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Normalize coordinate offsets from -0.5 to 0.5
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;

      // Animate layers at different speeds (depth factors)
      parallaxLayersRef.current.forEach((layer) => {
        if (!layer) return;
        const depth = parseFloat(layer.getAttribute('data-depth')) || 0;
        gsap.to(layer, {
          x: x * 50 * depth,
          y: y * 50 * depth,
          rotateX: -y * 15 * depth,
          rotateY: x * 15 * depth,
          duration: 1.2,
          ease: 'power2.out'
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Pause for 500ms at the end of step 5, then fade out
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: 'power4.inOut',
            delay: 0.5,
            onComplete: () => {
              window.scrollTo(0, 0);
              document.body.style.overflow = '';
              setIsComplete(true);
              document.dispatchEvent(new CustomEvent('preloader:complete'));
            }
          });
        }
      });

      // Target elements
      const bg = bgImageRef.current;
      const hud = containerRef.current.querySelector('.preloader-hud-container');
      const scanner = containerRef.current.querySelector('.radar-scanner-wrapper');
      const systemConsole = containerRef.current.querySelector('.preloader-system-text');
      const identity = containerRef.current.querySelector('.identity-reveal-container');

      const statusBadge = identity.querySelector('.identity-status-wrapper');
      const emblem = identity.querySelector('.identity-emblem-wrapper');
      const detailsName = identity.querySelector('.identity-name');
      const detailsRole = identity.querySelector('.identity-role');
      const detailsDesc = identity.querySelector('.identity-description');
      const actions = identity.querySelector('.identity-actions');

      // Set initial states
      gsap.set([hud, scanner, systemConsole, statusBadge, emblem, detailsName, detailsRole, detailsDesc, actions], {
        opacity: 0
      });
      gsap.set(bg, { scale: 1.15, opacity: 0.05 });
      gsap.set(emblem, { scale: 0.5 });
      gsap.set([detailsName, detailsRole, detailsDesc], { y: 15 });

      // ==========================================
      // STEP 1 (0.0s - 0.8s): Black Screen to Boot
      // ==========================================
      tl.to(hud, { opacity: 1, duration: 0.6, ease: 'sine.inOut' }, 0.1)
        .to(systemConsole, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.2);

      // ==========================================
      // STEP 2 (0.8s - 1.6s): Scanner & Telemetry
      // ==========================================
      tl.to(scanner, { opacity: 0.7, duration: 0.8, ease: 'sine.inOut' }, 0.8)
        .to(statusBadge, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.0)
        .to(bg, { opacity: 0.35, scale: 1.05, duration: 1.0, ease: 'power2.out' }, 0.8);

      // ==========================================
      // STEP 3 (1.6s - 2.5s): Central Emblem Power-On
      // ==========================================
      tl.to(emblem, { 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        ease: 'back.out(1.7)' 
      }, 1.6);

      // ==========================================
      // STEP 4 (2.5s - 3.6s): Name Typography
      // ==========================================
      tl.to(detailsName, { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: 'power4.out' 
      }, 2.5)
      .to(detailsRole, { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: 'power4.out' 
      }, 2.8)
      .to(detailsDesc, { 
        opacity: 0.8, 
        y: 0, 
        duration: 0.6, 
        ease: 'power3.out' 
      }, 3.1);

      // ==========================================
      // STEP 5 (3.6s - 4.5s): Reveal & Ready Controls
      // ==========================================
      tl.to(bg, { opacity: 0.45, scale: 1.0, duration: 0.9, ease: 'power3.out' }, 3.6)
        .to(actions, { opacity: 1, duration: 0.7, ease: 'power2.out' }, 3.8);

      // Add a clean exit trigger listener
      const handleForceComplete = () => {
        tl.kill(); // Stop playing timeline
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power3.inOut',
          onComplete: () => {
            window.scrollTo(0, 0);
            document.body.style.overflow = '';
            setIsComplete(true);
            document.dispatchEvent(new CustomEvent('preloader:complete'));
          }
        });
      };

      document.addEventListener('preloader:complete', handleForceComplete);
      return () => {
        document.removeEventListener('preloader:complete', handleForceComplete);
      };
    });

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.overflow = '';
    };
  }, []);

  if (isComplete) return null;

  // Helper to register parallax layers
  const registerLayer = (el) => {
    if (el && !parallaxLayersRef.current.includes(el)) {
      parallaxLayersRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} id="premium-preloader" className="premium-preloader-root">
      {/* Moving Ambient Red Spotlights */}
      <div className="preloader-ambient-glow-1"></div>
      <div className="preloader-ambient-glow-2"></div>

      {/* City skyline background */}
      <div 
        ref={bgImageRef} 
        className="preloader-bg-skyline"
        style={{ backgroundImage: `url('/images/cyberpunk-skyline.png')` }}
      />
      
      {/* Light animated rain canvas */}
      <RainOverlay />

      {/* Retro overlays (grain, scanlines, vignette) */}
      <NoiseOverlay />

      {/* Holographic Radar Sweep (Parallax Depth: 0.6) */}
      <div ref={registerLayer} data-depth="0.6" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <Radar />
      </div>

      {/* Sci-fi HUD elements (Parallax Depth: 0.3) */}
      <div ref={registerLayer} data-depth="0.3" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <HUD />
      </div>

      {/* Terminal log panel (Parallax Depth: 0.4) */}
      <div ref={registerLayer} data-depth="0.4" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <SystemText />
      </div>

      {/* Central Profile Data & Actions (Parallax Depth: 1.0) */}
      <div ref={registerLayer} data-depth="1.0" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IdentityReveal />
      </div>
    </div>
  );
}
