import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';
import TextReveal from './TextReveal';
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { 
  Mail, 
  Calendar, 
  MapPin, 
  Clock, 
  Shield, 
  MessageSquare, 
  Zap,
  ArrowRight
} from 'lucide-react';

export default function Contact() {
  const [time, setTime] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // NPT (Nepal Standard Time) is UTC +5:45
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const nptOffset = 5.75 * 3600000;
      const nptDate = new Date(utc + nptOffset);
      
      let hours = nptDate.getHours();
      const minutes = String(nptDate.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const timeString = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
      
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      const dateString = nptDate.toLocaleDateString('en-US', options);
      
      setTime(timeString);
      setDateStr(dateString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const cards = [
    {
      num: '01',
      title: 'Email',
      value: 'devvv0264@gmail.com',
      action: 'Send me an email',
      href: 'mailto:devvv0264@gmail.com',
      icon: <Mail className="w-5 h-5" />,
      accent: '#ea4335',
      accentRgb: '234, 67, 53'
    },
    {
      num: '02',
      title: 'LinkedIn',
      value: 'Professional network',
      action: "Let's connect",
      href: 'https://www.linkedin.com/in/abhishek-dev-5b5148357',
      icon: <FaLinkedin className="w-5 h-5" />,
      accent: '#0a66c2',
      accentRgb: '10, 102, 194'
    },
    {
      num: '03',
      title: 'GitHub',
      value: 'Open source projects and experiments',
      action: 'View my work',
      href: 'https://github.com/devashmit',
      icon: <FaGithub className="w-5 h-5" />,
      accent: '#a855f7',
      accentRgb: '168, 85, 247'
    },
    {
      num: '04',
      title: 'WhatsApp',
      value: '+977 9829306607',
      action: 'Chat on WhatsApp',
      href: 'https://wa.me/9779829306607',
      icon: <FaWhatsapp className="w-5 h-5" />,
      accent: '#25d366',
      accentRgb: '37, 211, 102'
    }
  ];

  return (
    <section id="contact" aria-label="Contact">
      <div className="contact-layout-split">
        {/* Left Side Column */}
        <div className="contact-left-content">
          <span className="contact-eyebrow-accent">// LET'S CONNECT</span>
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
          <div className="contact-bento-grid">
            {cards.map((card, idx) => (
              <motion.a
                key={idx}
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : '_self'}
                rel={card.href.startsWith('http') ? 'noopener noreferrer' : ''}
                className="contact-bento-card"
                onMouseMove={handleMouseMove}
                style={{
                  '--card-accent': card.accent,
                  '--card-accent-rgb': card.accentRgb
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="bento-card-header">
                  <div className="bento-card-icon-box">
                    {card.icon}
                  </div>
                  <span className="bento-card-number">{card.num}</span>
                </div>
                <div className="bento-card-body">
                  <h3 className="bento-card-title">{card.title}</h3>
                  <p className="bento-card-value">{card.value}</p>
                  <div className="bento-card-action">
                    <span>{card.action}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.a>
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
