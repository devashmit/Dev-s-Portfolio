import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import TextReveal from './TextReveal';

const socials = [
  {
    icon: <FaGithub />,
    label: 'GitHub',
    handle: 'devashmit',
    href: 'https://github.com/devashmit',
  },
  {
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    handle: 'Ashmit Dev',
    href: 'https://www.linkedin.com/in/abhishek-dev-5b5148357',
  },
  {
    icon: <FaWhatsapp />,
    label: 'WhatsApp',
    handle: 'Message Me',
    href: 'https://wa.me/message/6VRRX2XZZ4UFO1',
  },
];

function ScrambleText({ text, active }) {
  const [displayVal, setDisplayVal] = useState(text);
  const chars = '0123456789ABCDEF█░▒▓<>_[]{}';
  
  useEffect(() => {
    if (!active) {
      setDisplayVal(text);
      return;
    }
    
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayVal(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iterations) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      iterations += 0.35;
      if (iterations >= text.length) {
        clearInterval(interval);
        setDisplayVal(text);
      }
    }, 25);
    
    return () => clearInterval(interval);
  }, [active, text]);

  return <span>{displayVal}</span>;
}

export default function Contact() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="contact" aria-label="Contact">
      <div className="section-intro">
        <motion.p
          className="section-eyebrow"
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          04 / REACH ME
        </motion.p>
        <TextReveal text="Let's connect." className="section-title" tag="h2" delay={0.15} />
      </div>

      {/* Big email CTA — wipe reveal from top (clipPath curtain) */}
      <motion.div
        className="contact-email-strip"
        initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)', y: 20 }}
        whileInView={{ opacity: 1, clipPath: 'inset(0 0 0% 0)', y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="contact-avail">
          <span className="status-dot" />
          <span>Available for work</span>
        </div>

        <p className="contact-blurb">
          Open for freelance contracts and full-time roles.<br />
          If you have a project in mind — let's talk.
        </p>

        <Magnetic>
          <a href="mailto:devvv0264@gmail.com" className="contact-email-btn" id="contact-email-link">
            <span className="contact-email-icon"><MdEmail /></span>
            <span>devvv0264@gmail.com</span>
            <svg className="contact-email-arrow" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </Magnetic>
      </motion.div>

      {/* Social rows */}
      <div className="contact-socials-list" onMouseLeave={() => setHoveredIndex(null)}>
        {socials.map((s, i) => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-row"
            onMouseEnter={() => setHoveredIndex(i)}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ paddingLeft: '1.25rem' }}
          >
            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.div
                  layoutId="active-social-bg"
                  className="contact-social-hover-bg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '8px',
                    zIndex: -1,
                    background: 'var(--spotlight-color)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                />
              )}
            </AnimatePresence>

            <motion.span 
              className="csr-icon"
              animate={hoveredIndex === i ? { scale: 1.1, rotate: 8, borderColor: 'var(--accent)', color: 'var(--accent)' } : { scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              {s.icon}
            </motion.span>
            
            <motion.span 
              className="csr-label"
              animate={hoveredIndex === i ? { color: 'var(--ink)' } : {}}
            >
              {s.label}
            </motion.span>
            
            <motion.span 
              className="csr-divider"
              animate={hoveredIndex === i ? { backgroundColor: 'var(--accent)', opacity: 0.6 } : {}}
            />
            
            <motion.span 
              className="csr-handle"
              animate={hoveredIndex === i ? { x: -8, color: 'var(--accent)' } : { x: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            >
              <ScrambleText text={s.handle} active={hoveredIndex === i} />
            </motion.span>
            
            <motion.svg 
              className="csr-arrow" 
              viewBox="0 0 24 24" 
              fill="none"
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              aria-hidden="true"
              animate={hoveredIndex === i ? { opacity: 1, x: 0, scale: 1.1 } : { opacity: 0, x: -6 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </motion.a>
        ))}
      </div>

      {/* Footer line — slow pure fade, grounded at bottom */}
      <motion.div
        className="contact-footer-line"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, delay: 0.5, ease: 'easeOut' }}
      >
        <span>Ashmit Dev · {new Date().getFullYear()}</span>
        <span>Kathmandu, Nepal</span>
      </motion.div>
    </section>
  );
}

