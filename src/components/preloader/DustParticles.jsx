import React, { useEffect, useRef } from 'react';

export default function DustParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particleCount = 40;
    const particles = [];

    // Initialize particles with very slow velocities and low opacity
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.12,  // Extremely slow horizontal drift
        vy: -Math.random() * 0.18 - 0.05,  // Slow upward drift
        radius: Math.random() * 0.8 + 0.4, // Small size
        opacity: Math.random() * 0.03 + 0.01 // Opacity strictly between 1% and 4%
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        // Update positions
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -5 || p.x > canvas.width + 5) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 5;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="cinematic-particles-canvas"
      aria-hidden="true"
    />
  );
}
