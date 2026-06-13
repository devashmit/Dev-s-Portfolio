import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Magnetic from './Magnetic';
import TextReveal from './TextReveal';
import TextScramble from './TextScramble';
import { 
  Mail, 
  Calendar, 
  MapPin, 
  Clock, 
  Shield, 
  MessageSquare, 
  Zap,
  ArrowRight,
  MessageCircle
} from 'lucide-react';

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
};

const MagneticBentoCard = ({ card, idx, activeCard, setActiveCard }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleTiltMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleTiltLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`os-window-card ${activeCard === idx ? 'active-focus' : ''}`}
      onPointerDown={() => setActiveCard(idx)}
      onMouseMove={handleTiltMove}
      onMouseLeave={handleTiltLeave}
      style={{
        '--card-accent': card.accent,
        '--card-accent-rgb': card.accentRgb,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      initial={{ opacity: 0, scale: 0.85, y: 30, perspective: 1000 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: idx * 0.1 }}
    >
      <div style={{ transform: "translateZ(20px)" }}>
        {/* OS Window Chrome Bar */}
        <div className="os-window-bar">

          <span className="os-window-title font-mono">{card.filename}</span>
          <span className="os-window-number">{card.num}</span>
        </div>

        {/* OS Window Content Body */}
        <div className="os-window-body" onMouseMove={handleMouseMove}>
          <div className="os-window-header">
            <div className="os-window-icon-box">
              {card.icon}
            </div>
          </div>
          <div className="os-window-details">
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </div>
          <a
            href={card.href}
            target={card.href.startsWith('http') ? '_blank' : '_self'}
            rel={card.href.startsWith('http') ? 'noopener noreferrer' : ''}
            className="os-window-action"
          >
            <span>{card.action}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function Contact() {
  const [activeCard, setActiveCard] = useState(null);
  const [time, setTime] = useState('');
  const [dateStr, setDateStr] = useState('');
  const workspaceRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }) + ' ' + now.toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2]);
      setDateStr(now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const cards = [
    {
      num: '01',
      title: 'Email',
      value: 'devvv0264@gmail.com',
      action: 'Send me an email',
      href: 'mailto:devvv0264@gmail.com',
      icon: <Mail className="w-5 h-5" />,
      accent: '#ea4335',
      accentRgb: '234, 67, 53',
      filename: 'email_sync.sh',
      defaultPos: { left: '4%', top: '6%' }
    },
    {
      num: '02',
      title: 'LinkedIn',
      value: 'Professional network',
      action: "Let's connect",
      href: 'https://www.linkedin.com/in/abhishek-dev-5b5148357',
      icon: <LinkedinIcon />,
      accent: '#0a66c2',
      accentRgb: '10, 102, 194',
      filename: 'linkedin_dossier.lnk',
      defaultPos: { right: '6%', top: '4%' }
    },
    {
      num: '03',
      title: 'GitHub',
      value: 'Open source repos',
      action: 'View my work',
      href: 'https://github.com/devashmit',
      icon: <GithubIcon />,
      accent: '#a855f7',
      accentRgb: '168, 85, 247',
      filename: 'repo_analyzer.cfg',
      defaultPos: { left: '8%', bottom: '6%' }
    },
    {
      num: '04',
      title: 'WhatsApp',
      value: '+977 9829306607',
      action: 'Chat on WhatsApp',
      href: 'https://wa.me/9779829306607',
      icon: <MessageCircle className="w-5 h-5" />,
      accent: '#25d366',
      accentRgb: '37, 211, 102',
      filename: 'comms_uplink.bin',
      defaultPos: { right: '4%', bottom: '8%' }
    }
  ];

  return (
    <section id="contact" aria-label="Contact">
      <div className="contact-layout-split">
        {/* Left Side Column */}
        <div className="contact-left-content">
          <span className="contact-eyebrow-accent">
            <TextScramble text="// LET'S CONNECT" />
          </span>
          <h2 className="contact-huge-title">
            <TextReveal text="Let's build" tag="span" />
            <br />
            <TextReveal text="something" tag="span" delay={0.1} />
            <br />
            <TextReveal text="exceptional." tag="span" delay={0.2} />
          </h2>
          <p className="contact-short-desc">
            I'm open to exciting opportunities, collaborations, and innovative projects. 
            Drop me a message and let's create impact together.
          </p>

          <div className="contact-cta-wrapper">
            <Magnetic>
              <a href="mailto:devvv0264@gmail.com" className="contact-cta-primary">
                <span>SEND MESSAGE</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#" className="contact-cta-secondary">
                <span>VIEW RESUME</span>
                <Zap className="w-4 h-4" />
              </a>
            </Magnetic>
          </div>

          <div className="contact-status-panel">
            <div className="status-panel-col">
              <div className="status-eyebrow">
                <span className="status-dot-blink" />
                <span>AVAILABLE FOR WORK</span>
              </div>
              <div className="status-info-row">
                <MapPin className="w-4 h-4" />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="status-info-row">
                <Clock className="w-4 h-4" />
                <span>Response time: &lt; 24h</span>
              </div>
            </div>
            <div className="status-panel-col">
              <span className="time-label">LOCAL TIME</span>
              <div className="time-display">
                {time ? time.split(' ')[0] : '00:00'}
                <span className="time-zone">{time ? time.split(' ')[1] : 'NPT'}</span>
              </div>
              <div className="time-date">{dateStr || 'Loading...'}</div>
            </div>
          </div>
        </div>

        {/* Right Side Column */}
        <div className="contact-bento-container">
          <div className="contact-os-workspace" ref={workspaceRef}>
            {cards.map((card, idx) => (
              <MagneticBentoCard
                key={idx}
                card={card}
                idx={idx}
                activeCard={activeCard}
                setActiveCard={setActiveCard}
              />
            ))}
          </div>

          <div className="contact-side-vertical-bar">
            <div className="side-dot-group">
              <span className="side-dot" />
              <span className="side-dot" />
              <span className="side-dot active" />
            </div>
            <div className="side-vertical-text">LET'S CREATE SOMETHING GREAT</div>
          </div>
        </div>
      </div>

      {/* Bottom Status bar */}
      <div className="contact-system-bar">
        <div className="system-bar-item">
          <div className="system-bar-icon">
            <Shield className="w-5 h-5" />
          </div>
          <div className="system-bar-info">
            <span className="system-bar-title">SECURE CONNECTION</span>
            <span className="system-bar-desc">All messages are encrypted</span>
          </div>
        </div>

        <div className="system-bar-item">
          <div className="system-bar-icon">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="system-bar-info">
            <span className="system-bar-title">PREFERRED CONTACT</span>
            <span className="system-bar-desc">Email for fastest response</span>
          </div>
        </div>

        <div className="system-bar-item">
          <div className="system-bar-icon">
            <Zap className="w-5 h-5" />
          </div>
          <div className="system-bar-info">
            <span className="system-bar-title">LET'S WORK TOGETHER</span>
            <span className="system-bar-desc">Turning ideas into real products</span>
          </div>
        </div>
      </div>
    </section>
  );
}
