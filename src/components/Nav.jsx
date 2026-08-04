import { useState, useEffect } from 'react';
import Magnetic from './Magnetic';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Kathmandu', hour: '2-digit', minute: '2-digit', hour12: false };
      setTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav id="nav" aria-label="Main navigation" className={isOpen ? 'nav-open' : ''} style={{ transform: 'translateY(0)' }}>
      <Magnetic>
        <a className="nav-logo" href="#hero">ASHMIT<span className="nav-dot">·</span>DEV</a>
      </Magnetic>
      
      <button 
        className="nav-hamburger" 
        aria-label="Toggle navigation" 
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span><span></span><span></span>
      </button>

      <ul className="nav-links" role="list" id="nav-menu">
        <li><Magnetic><a href="#about" onClick={() => setIsOpen(false)}>ABOUT</a></Magnetic></li>
        <li><Magnetic><a href="#projects" onClick={() => setIsOpen(false)}>WORK</a></Magnetic></li>
        <li><Magnetic><a href="#stack" onClick={() => setIsOpen(false)}>STACK</a></Magnetic></li>
        <li><Magnetic><a href="#contact" onClick={() => setIsOpen(false)}>CONTACT</a></Magnetic></li>
      </ul>

      <div className="nav-clock" aria-label="Current time in Nepal">
        <span id="nepal-time">{time}</span>
        <span className="nav-tz">NPT</span>
      </div>
    </nav>
  );
}
