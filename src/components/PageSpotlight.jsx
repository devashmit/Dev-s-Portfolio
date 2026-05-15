import { useEffect, useState } from 'react';

export default function PageSpotlight() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9995,
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.05), transparent 80%)`,
      }}
    />
  );
}
