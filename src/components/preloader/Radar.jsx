import React, { useEffect, useState } from 'react';

export default function Radar() {
  const [blips, setBlips] = useState([]);

  useEffect(() => {
    // Spawn a new scanning target (blip) periodically
    const spawnInterval = setInterval(() => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 40 + Math.random() * 130;
      const x = 200 + Math.cos(angle) * radius;
      const y = 200 + Math.sin(angle) * radius;
      const id = Date.now() + Math.random();

      setBlips((prev) => [
        ...prev.slice(-4), // Limit maximum simultaneous blips
        { id, x, y, opacity: 1 }
      ]);
    }, 900);

    // Fade existing blips out gradually
    const fadeInterval = setInterval(() => {
      setBlips((prev) =>
        prev
          .map((b) => ({ ...b, opacity: b.opacity - 0.08 }))
          .filter((b) => b.opacity > 0)
      );
    }, 100);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(fadeInterval);
    };
  }, []);

  return (
    <div className="radar-scanner-wrapper" aria-hidden="true">
      <svg className="radar-svg" viewBox="0 0 400 400" width="100%" height="100%">
        {/* Concentric grid circles */}
        <circle cx="200" cy="200" r="190" className="radar-grid-circle" />
        <circle cx="200" cy="200" r="140" className="radar-grid-circle" />
        <circle cx="200" cy="200" r="90" className="radar-grid-circle" />
        <circle cx="200" cy="200" r="40" className="radar-grid-circle" />
        
        {/* Crosshair lines */}
        <line x1="200" y1="0" x2="200" y2="400" className="radar-axis-line" />
        <line x1="0" y1="200" x2="400" y2="200" className="radar-axis-line" />
        
        {/* Radar Sweep Ring */}
        <circle cx="200" cy="200" r="165" className="radar-sweep-ring" />
        
        {/* Outer dash array ring */}
        <circle cx="200" cy="200" r="180" className="radar-dashed-ring" />

        {/* Dynamic Targets (Blips) */}
        {blips.map((b) => (
          <g key={b.id}>
            {/* Pulsing ring around blip */}
            <circle 
              cx={b.x} 
              cy={b.y} 
              r="8" 
              fill="none" 
              stroke="var(--pre-accent)" 
              strokeWidth="0.8"
              className="radar-blip-ring"
              style={{ opacity: b.opacity }}
            />
            {/* Blip Core */}
            <circle 
              cx={b.x} 
              cy={b.y} 
              r="3.5" 
              fill="var(--pre-accent)" 
              className="radar-blip-core"
              style={{ opacity: b.opacity }}
            />
          </g>
        ))}
      </svg>
      {/* CSS-based rotating sweep overlay */}
      <div className="radar-sweep-bar"></div>
    </div>
  );
}
