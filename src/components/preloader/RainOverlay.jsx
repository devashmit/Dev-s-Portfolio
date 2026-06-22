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

    const maxDrops = 70;
    const drops = [];

    for (let i = 0; i < maxDrops; i++) {
      const depth = Math.random();
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vy: 6 + depth * 8,       // Slower velocity
        vx: -0.8 - depth * 1.2,   // Slower wind drift
        len: 12 + depth * 22,     // Slightly shorter streaks for slower rain
        width: 0.5 + depth * 1.0,
        opacity: 0.05 + depth * 0.22,
        depth
      });
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(9, 9, 11, 0.2)';
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

        d.y += d.vy;
        d.x += d.vx;

        if (d.y > canvas.height || d.x < -d.len) {
          d.x = Math.random() * (canvas.width + 100);
          d.y = -d.len;
          const depth = Math.random();
          d.vy = 6 + depth * 8;
          d.vx = -0.8 - depth * 1.2;
          d.len = 12 + depth * 22;
          d.width = 0.5 + depth * 1.0;
          d.opacity = 0.05 + depth * 0.22;
          d.depth = depth;
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
