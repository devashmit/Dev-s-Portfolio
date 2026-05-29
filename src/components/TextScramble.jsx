import { useState, useEffect, useCallback, useRef } from 'react';

const CHARS = '0123456789ABCDEF█░▒▓<>_[]{}';

export default function TextScramble({ text, className = '', delay = 0 }) {
  const [scrambleProgress, setScrambleProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);

  const startScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    setIsAnimating(true);
    setScrambleProgress(0);
    let iteration = 0;
    
    intervalRef.current = setInterval(() => {
      iteration += 1 / 3;
      setScrambleProgress(iteration);

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        setIsAnimating(false);
      }
    }, 30);
  }, [text]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      startScramble();
    }, delay * 1000);
    
    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startScramble, delay]);

  const handleMouseEnter = () => {
    if (!isHovered && !isAnimating) {
      setIsHovered(true);
      startScramble();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Generate deterministic character for scrambling letters based on index and progress
  const getScrambleChar = (index) => CHARS[Math.floor((index * 7 + scrambleProgress * 13) % CHARS.length)] || CHARS[0];

  return (
    <span 
      className={`scramble-wrapper ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'default', display: 'inline-flex', alignItems: 'center' }}
    >
      <span className="scramble-bracket">[</span>
      
      <span className="scramble-content" style={{ display: 'inline-flex', alignItems: 'center' }}>
        {text.split('').map((char, index) => {
          const isResolved = index < scrambleProgress;
          
          if (char === ' ') {
            return <span key={index} className="scramble-space">&nbsp;</span>;
          }
          
          if (isResolved) {
            return (
              <span key={index} className="scramble-char resolved">
                {char}
              </span>
            );
          } else {
            return (
              <span key={index} className="scramble-char active-scramble">
                {getScrambleChar(index)}
              </span>
            );
          }
        })}
      </span>
      
      {/* Dynamic Terminal Cursor that shows during compilation */}
      {isAnimating && <span className="scramble-cursor">▮</span>}
      
      <span className="scramble-bracket">]</span>
    </span>
  );
}
