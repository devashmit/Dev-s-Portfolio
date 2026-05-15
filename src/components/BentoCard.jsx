import { useRef } from 'react';

export default function BentoCard({ children, className = '', ...props }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Spotlight variables
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    
    // Tilt variables
    const rotateX = ((y - height / 2) / height) * -12; // Slightly more tilt
    const rotateY = ((x - width / 2) / width) * 12;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Parallax variables (opposite direction for depth)
    const px = ((x - width / 2) / width) * 15; // 15px max shift
    const py = ((y - height / 2) / height) * 15;
    cardRef.current.style.setProperty('--parallax-x', `${-px}px`);
    cardRef.current.style.setProperty('--parallax-y', `${-py}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    cardRef.current.style.setProperty('--parallax-x', `0px`);
    cardRef.current.style.setProperty('--parallax-y', `0px`);
  };

  return (
    <div
      ref={cardRef}
      className={`bento-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.15s ease-out' }}
      {...props}
    >
      <div className="bento-card-spotlight"></div>
      <div className="bento-card-inner-content" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </div>
  );
}
