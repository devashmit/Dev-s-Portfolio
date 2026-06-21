import React, { useEffect, useRef } from 'react';

export default function RainOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const maxDrops = 100;
    const drops = [];

    for (let i = 0; i < maxDrops; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vy: 10 + Math.random() * 15,
        len: 8 + Math.random() * 12,
        opacity: 0.1 + Math.random() * 0.4
      });
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(4, 4, 4, 0.2)'; // Clear with trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(255, 27, 45, 0.35)'; // Crimson rain drops
      ctx.lineWidth = 1.2;

      for (let i = 0; i < maxDrops; i++) {
        const d = drops[i];
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x, d.y + d.len);
        ctx.stroke();

        d.y += d.vy;

        if (d.y > canvas.height) {
          d.x = Math.random() * canvas.width;
          d.y = -d.len;
          d.vy = 10 + Math.random() * 15;
          d.len = 8 + Math.random() * 12;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="preloader-rain-canvas" 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2
      }}
    />
  );
}
