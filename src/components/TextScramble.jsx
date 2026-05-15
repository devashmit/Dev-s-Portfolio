import { useState, useEffect, useCallback } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export default function TextScramble({ text, className = '', delay = 0, duration = 1.5 }) {
  const [displayText, setDisplayText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      scramble();
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [scramble, delay]);

  const handleMouseEnter = () => {
    if (!isHovered) {
      setIsHovered(true);
      scramble();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <span 
      className={className} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'default' }}
    >
      {displayText || text.split('').map(() => ' ').join('')}
    </span>
  );
}
