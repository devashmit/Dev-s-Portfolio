import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { tigranzs } from '../data/content';

export default function PageSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scale = useMotionValue(1);
  const opacity = useMotionValue(0); // start at 0 and fade in on first movement

  const smoothX = useSpring(mouseX, tigranzs);
  const smoothY = useSpring(mouseY, tigranzs);
  const smoothScale = useSpring(scale, tigranzs);
  const smoothOpacity = useSpring(opacity, tigranzs);

  useEffect(() => {
    let hasMoved = false;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!hasMoved) {
        hasMoved = true;
        opacity.set(1);
      }
    };

    const handleMouseLeave = () => {
      opacity.set(0);
    };

    const handleMouseEnter = () => {
      opacity.set(1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    // Dynamic spotlight expansion on hovering interactive UI elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, .bento-card, .btn, .contact-social-row, .stack-tag, #toggle-button'
    );

    const handleHoverEnter = () => {
      scale.set(1.4); // expand the spotlight when focusing on interactive elements
    };

    const handleHoverLeave = () => {
      scale.set(1);
    };

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverEnter);
      el.addEventListener('mouseleave', handleHoverLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverEnter);
        el.removeEventListener('mouseleave', handleHoverLeave);
      });
    };
  }, [mouseX, mouseY, scale, opacity]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: -400,
        left: -400,
        width: 800,
        height: 800,
        pointerEvents: 'none',
        zIndex: 9995,
        x: smoothX,
        y: smoothY,
        scale: smoothScale,
        opacity: smoothOpacity,
        background: `radial-gradient(circle, var(--spotlight-color, rgba(250, 204, 21, 0.08)) 0%, transparent 70%)`,
      }}
    />
  );
}

