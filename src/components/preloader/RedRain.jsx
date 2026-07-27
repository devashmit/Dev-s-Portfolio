import React, { useEffect, useRef } from 'react';

export default function RedRain() {
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

    const maxDrops = 40; // Restrained count
    const drops = [];

    // Initialize slow, light red rain drops
    for (let i = 0; i < maxDrops; i++) {
      const depth = Math.random();
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vy: 2.5 + depth * 3.5,       // Slower velocity for cinematic look
        vx: -0.2 - depth * 0.4,       // Slight wind drift
        len: 8 + depth * 15,          // Shorter, elegant streaks
        width: 0.4 + depth * 0.6,
        opacity: 0.01 + depth * 0.03  // Ultra-subtle opacity strictly below 4%
      });
    }

    const draw = () => {
      // Clear canvas with trace effect
      ctx.fillStyle = 'rgba(8, 8, 8, 0.2)'; // Fades trailing lines beautifully
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < maxDrops; i++) {
        const d = drops[i];

        const gradient = ctx.createLinearGradient(d.x, d.y, d.x + d.vx, d.y + d.len);
        gradient.addColorStop(0, 'rgba(239, 68, 68, 0)');
        gradient.addColorStop(0.5, `rgba(239, 68, 68, ${d.opacity})`);
        gradient.addColorStop(1, `rgba(244, 63, 94, ${d.opacity * 1.5})`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = d.width;
        ctx.lineCap = 'round';
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.vx, d.y + d.len);
        ctx.stroke();

        // Update position
        d.y += d.vy;
        d.x += d.vx;

        // Reset if offscreen
        if (d.y > canvas.height || d.x < -d.len) {
          d.x = Math.random() * (canvas.width + 50);
          d.y = -d.len;
          const depth = Math.random();
          d.vy = 2.5 + depth * 3.5;
          d.vx = -0.2 - depth * 0.4;
          d.len = 8 + depth * 15;
          d.width = 0.4 + depth * 0.6;
          d.opacity = 0.01 + depth * 0.03;
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
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2
      }}
      aria-hidden="true"
    />
  );
}
