import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import TextReveal from './TextReveal';

/* ─── ANIMATION VARIANTS ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25,0.1,0.25,1] } },
};

const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show:   { transition: { staggerChildren, delayChildren } },
});

const slideLeft = {
  hidden: { opacity: 0, x: -20 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25,0.1,0.25,1] } },
};

/* ─── DATA ─────────────────────────────────────────────────────────── */
const systemOverview = [
  { label: 'RENDER ENGINE',  value: '60 FPS'  },
  { label: 'AVG NETWORK RTT', value: '12 MS'  },
  { label: 'SOCKET LATENCY',  value: '14 MS'  },
  { label: 'UPTIME',          value: '99.98%' },
  { label: 'AVAILABILITY',    value: 'OPEN'   },
];

const coreValues = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Performance First',
    desc: 'Every millisecond matters. I architect systems around speed: optimizing render trees, deferring non-critical work, and eliminating layout thrash to deliver sub-100ms interactions.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    title: 'Clean Architecture',
    desc: 'Codebases that are readable, testable, and maintainable. I apply SOLID principles and established design patterns so that any engineer can navigate the codebase with confidence.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: 'User Focused',
    desc: 'The best engineering is invisible to the user. I obsess over the feel of interactions: timing, friction, feedback. Great UX is a direct product of great engineering decisions.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: 'Attention to Detail',
    desc: 'Pixel-perfect typography, consistent spacing, and intentional micro-animations. The polish that separates a good product from an exceptional one lives entirely in the details.',
  },
];

const timelineItems = [
  {
    year: '2025 - PRESENT',
    title: 'Distributed Systems and Real-Time Engineering',
    desc: 'Currently engineering Sahayogi, a high-performance platform built around distributed WebSocket channels, atomic session cache layers, and microservice topologies. Every architectural decision is evaluated against latency budgets and horizontal scalability requirements. Focus areas include event-driven architecture, zero-downtime deployments, and secure stateless authentication via JWT refresh cycles.',
    tags: ['WebSockets', 'Microservices', 'Node.js', 'Redis', 'JWT', 'Docker'],
  },
  {
    year: '2024',
    title: 'High-Performance Frontend Architecture',
    desc: 'Pivoted into mastering component-driven UI engineering. Built Devs-Bouquet, a generative canvas physics engine using custom trigonometric vector math. Developed BerojgarCv, an automated resume templating pipeline with dynamic PDF generation. Focused intensely on React render optimization, memoization patterns, code-splitting strategies, and achieving consistent 60FPS on constrained hardware.',
    tags: ['React', 'Vite', 'Canvas API', 'Framer Motion', 'PDF Generation', 'CSS Architecture'],
  },
  {
    year: '2023',
    title: 'Software Architecture and Design Patterns',
    desc: 'Dedicated this year to the fundamentals of software design. Studied and applied structural OOP patterns including Factory, Strategy, Observer, and Singleton across real CLI tools and backend services. Mastered computational complexity analysis, relational schema design with normalization, and built disciplined code through test-driven development.',
    tags: ['OOP Design Patterns', 'Complexity Theory', 'SQL', 'Python', 'Java', 'TDD'],
  },
  {
    year: '2022',
    title: 'Foundational Computer Science and Algorithms',
    desc: 'The beginning. Committed entirely to building a rigorous mathematical foundation. Implemented every major data structure from scratch in Java: linked lists, B-Trees, AVL trees, directed graphs with Dijkstra. Analysed their time and space complexities thoroughly. This year established the analytical framework applied to every engineering decision today.',
    tags: ['Java', 'Data Structures', 'Graph Algorithms', 'Recursion', 'Sorting', 'Mathematics'],
  },
];

const creativeProjects = [
  {
    label: 'FEATURED PROJECT',
    title: 'Devs-Bouquet',
    subtitle: 'Generative Canvas Physics Engine',
    desc: 'A custom rendering engine that uses Bezier curve mathematics, parametric equations, and spring physics to procedurally generate organic flower animations on an HTML Canvas. Zero external libraries: every frame is rendered by hand-crafted vector algorithms at 60 FPS.',
    tags: ['Canvas API', 'Vector Math', 'Procedural Generation', 'Vanilla JS'],
  },
  {
    label: 'FEATURED PROJECT',
    title: 'Sahayogi',
    subtitle: 'Real-Time Distributed Communication Platform',
    desc: 'A production-grade messaging and collaboration platform with persistent WebSocket connections, atomic session management, and real-time event streaming. Architected for zero data loss under network partition and horizontal scalability from day one.',
    tags: ['Node.js', 'WebSockets', 'Redis', 'React', 'PostgreSQL', 'Docker'],
  },
  {
    label: 'FEATURED PROJECT',
    title: 'BerojgarCv',
    subtitle: 'Automated Document Generation Pipeline',
    desc: 'An automated resume and cover letter templating system with dynamic PDF generation, custom layout engines, and structured data schemas. Built to generate pixel-perfect, print-ready PDFs programmatically from user-defined structured inputs.',
    tags: ['PDF Generation', 'Template Engines', 'REST API', 'Node.js'],
  },
  {
    label: 'DESIGN SYSTEM',
    title: 'Ashmit Portfolio',
    subtitle: 'This Interface, From Concept to Code',
    desc: 'A fully custom design system built without UI libraries. Every component including the custom cursor, scroll animations, 3D isometric keyboard, typed text effects, and this dashboard is hand-engineered with precision CSS and Framer Motion to create a cohesive, high-performance user experience.',
    tags: ['React', 'Framer Motion', 'CSS Architecture', 'Design Systems', 'Animation'],
  },
];

const diagnosticRows = [
  { metric: 'Main Thread Execution',    target: '< 50ms',      actual: '22ms',     status: 'OPTIMAL' },
  { metric: 'First Contentful Paint',   target: '< 1.2s',      actual: '0.8s',     status: 'OPTIMAL' },
  { metric: 'Largest Contentful Paint', target: '< 2.5s',      actual: '1.4s',     status: 'OPTIMAL' },
  { metric: 'Cumulative Layout Shift',  target: '< 0.1',       actual: '0.02',     status: 'OPTIMAL' },
  { metric: 'WebSocket Ping (avg)',      target: '< 20ms',      actual: '14ms',     status: 'OPTIMAL' },
  { metric: 'DOM Node Depth',           target: '< 14 levels', actual: '8 levels', status: 'OPTIMAL' },
  { metric: 'Animation Frame Drop',     target: '0%',          actual: '0%',       status: 'OPTIMAL' },
  { metric: 'Bundle Size (gzip)',        target: '< 150kb',     actual: '98kb',     status: 'OPTIMAL' },
];

const rings = [
  { pct: 98,  label: 'CODE QUALITY',  color: '#10b981' },
  { pct: 100, label: 'ACCESSIBILITY', color: '#d4af37' },
  { pct: 96,  label: 'PERFORMANCE',   color: '#6366f1' },
  { pct: 100, label: 'MOBILE READY',  color: '#f97316' },
];

function dashOffset(pct) {
  const circ = 2 * Math.PI * 40;
  return circ - (pct / 100) * circ;
}

/* ─── ANIMATED RING ──────────────────────────────────────────────── */
function AnimatedRing({ pct, label, color }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const circ = 2 * Math.PI * 40;
  const offset = inView ? dashOffset(pct) : circ;

  return (
    <div className="pro-ring-item" ref={ref}>
      <svg viewBox="0 0 100 100" className="pro-circular-chart">
        <path className="pro-circle-bg" d="M50 10 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80" />
        <path
          className="pro-circle"
          d="M50 10 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80"
          strokeDasharray={`${circ} ${circ}`}
          style={{
            strokeDashoffset: offset,
            stroke: color,
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
        <motion.text
          x="50" y="55"
          className="pro-ring-text"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          {pct}%
        </motion.text>
      </svg>
      <motion.span
        className="pro-ring-label"
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7, duration: 0.4 }}
      >
        {label}
      </motion.span>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function About() {
  const [activeTab, setActiveTab] = useState('mission');

  const tabs = [
    { id: 'mission',     label: '01. MISSION'     },
    { id: 'timeline',    label: '02. TIMELINE'    },
    { id: 'creative',    label: '03. CREATIVE'    },
    { id: 'diagnostics', label: '04. DIAGNOSTICS' },
  ];

  return (
    <section id="about" aria-label="About Me" className="professional-about-section">

      {/* Header */}
      <div className="pro-about-header">
        <TextReveal text="About Me" className="pro-section-title" tag="h2" delay={0.1} />
        <motion.p
          className="pro-section-subtitle"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Engineering scalable web experiences through disciplined architecture, creative vision, and an obsessive attention to quality.
        </motion.p>
      </div>

      {/* Dashboard */}
      <motion.div
        className="pro-dashboard-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Tabs */}
        <div className="pro-tabs-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pro-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="pro-tab-label">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  className="pro-tab-indicator"
                  layoutId="proTabIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="pro-dashboard-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="pro-tab-panel"
            >

              {/* MISSION */}
              {activeTab === 'mission' && (
                <div className="pro-mission-layout">
                  {/* Left */}
                  <motion.div
                    className="pro-mission-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                  >
                    <div className="pro-system-overview">
                      <div className="pro-overview-header">
                        <span className="pro-bullet" />
                        <span className="pro-overview-title">SYSTEM OVERVIEW</span>
                      </div>
                      <motion.ul
                        className="pro-metrics-list"
                        variants={staggerContainer(0.07, 0.1)}
                        initial="hidden"
                        animate="show"
                      >
                        {systemOverview.map((item, i) => (
                          <motion.li key={i} variants={slideLeft}>
                            <span className="pro-metric-label">{item.label}</span>
                            <span className="pro-metric-value">{item.value}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>

                    <div className="pro-wireframe-graphics">
                      <svg viewBox="0 0 400 200" className="pro-topo-svg" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="topo-fade" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                          </linearGradient>
                        </defs>
                        <motion.path
                          d="M0,150 Q50,140 100,100 T200,80 T300,120 T400,90 L400,200 L0,200 Z"
                          fill="none" stroke="url(#topo-fade)" strokeWidth="1"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
                        />
                        <motion.path
                          d="M0,160 Q60,150 110,120 T220,100 T310,130 T400,100 L400,200 L0,200 Z"
                          fill="none" stroke="url(#topo-fade)" strokeWidth="0.8" opacity="0.6"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.6 }}
                          transition={{ duration: 1.4, delay: 0.5, ease: 'easeOut' }}
                        />
                        <motion.path
                          d="M0,170 Q70,160 120,140 T240,120 T320,140 T400,110 L400,200 L0,200 Z"
                          fill="none" stroke="url(#topo-fade)" strokeWidth="0.5" opacity="0.3"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.3 }}
                          transition={{ duration: 1.4, delay: 0.7, ease: 'easeOut' }}
                        />
                        <g stroke="rgba(255,255,255,0.025)" strokeWidth="1">
                          {[50,150,250,350].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" />)}
                          {[50,100,150].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} />)}
                        </g>
                        <g stroke="rgba(255,255,255,0.25)" strokeWidth="1">
                          <path d="M280,45 L280,55 M275,50 L285,50" />
                          <path d="M80,145 L80,155 M75,150 L85,150" />
                        </g>
                      </svg>
                      <motion.div
                        className="pro-coordinates font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                      >
                        X: 1284.21 &nbsp;&nbsp; Y: 862.18 &nbsp;&nbsp; Z: 452.66
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Right */}
                  <motion.div
                    className="pro-mission-right"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <motion.div className="pro-philosophy-header" variants={fadeUp} initial="hidden" animate="show">
                      <span className="pro-eyebrow">ENGINEERING PHILOSOPHY</span>
                    </motion.div>
                    <motion.h3
                      className="pro-main-heading"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.15 }}
                    >
                      Building experiences that are<br />fast, thoughtful, and built to last.
                    </motion.h3>
                    <motion.p
                      className="pro-body-text"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.22 }}
                    >
                      I'm Ashmit, a full-stack engineer who specialises in building high-performance digital products. My work lives at the intersection of rigorous systems thinking and creative craftsmanship. I care deeply about the architectural decisions that make a codebase maintainable at scale, and equally about the micro-interactions that make an interface feel exceptional.
                    </motion.p>
                    <motion.p
                      className="pro-body-text"
                      style={{ marginTop: '-2rem' }}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      I have built distributed real-time platforms, custom canvas physics engines, and automated document generation pipelines. Whether designing a WebSocket event stream or hand-crafting a CSS animation, the standard is always the same: precise, performant, and polished.
                    </motion.p>

                    <motion.div
                      className="pro-values-grid"
                      variants={staggerContainer(0.09, 0.35)}
                      initial="hidden"
                      animate="show"
                    >
                      {coreValues.map((v, i) => (
                        <motion.div key={i} className="pro-value-card" variants={fadeUp}>
                          <div className="pro-value-icon-box">{v.icon}</div>
                          <h4 className="pro-value-title">{v.title}</h4>
                          <p className="pro-value-desc">{v.desc}</p>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div
                      className="pro-footer-row"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      <div className="pro-availability">
                        <span className="pro-status-dot" />
                        <span className="pro-status-text">AVAILABLE FOR SELECT PROJECTS</span>
                      </div>
                      <a href="#contact" className="pro-cta-link">
                        Let's build something great <span className="arrow">&#8594;</span>
                      </a>
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* TIMELINE */}
              {activeTab === 'timeline' && (
                <div className="pro-timeline-layout">
                  <motion.div className="pro-philosophy-header" variants={fadeUp} initial="hidden" animate="show">
                    <span className="pro-eyebrow">PROFESSIONAL JOURNEY</span>
                  </motion.div>
                  <motion.h3
                    className="pro-main-heading"
                    style={{ marginBottom: '0.75rem' }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                  >
                    Four years of deliberate, compounding growth.
                  </motion.h3>
                  <motion.p
                    className="pro-body-text"
                    style={{ marginBottom: '3rem' }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.12 }}
                  >
                    Every year has been defined by a focused domain of mastery: from foundational algorithms to distributed production systems.
                  </motion.p>

                  <div className="pro-timeline-container">
                    <motion.div
                      className="pro-timeline-track"
                      initial={{ scaleY: 0, originY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                    />
                    {timelineItems.map((item, i) => (
                      <motion.div
                        key={i}
                        className="pro-timeline-item"
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: [0.25,0.1,0.25,1] }}
                      >
                        <motion.div
                          className="pro-timeline-marker"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.35, delay: 0.25 + i * 0.12, type: 'spring', stiffness: 280 }}
                        />
                        <div className="pro-timeline-content">
                          <span className="pro-timeline-year">{item.year}</span>
                          <h4 className="pro-timeline-title">{item.title}</h4>
                          <p className="pro-timeline-desc">{item.desc}</p>
                          <motion.div
                            className="pro-timeline-tags"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 + i * 0.12, duration: 0.4 }}
                          >
                            {item.tags.map((tag, j) => (
                              <motion.span
                                key={j}
                                className="pro-timeline-tag"
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.45 + i * 0.12 + j * 0.04 }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* CREATIVE */}
              {activeTab === 'creative' && (
                <div className="pro-creative-layout">
                  <motion.div className="pro-philosophy-header" variants={fadeUp} initial="hidden" animate="show">
                    <span className="pro-eyebrow">FEATURED WORK</span>
                  </motion.div>
                  <motion.h3
                    className="pro-main-heading"
                    style={{ marginBottom: '0.75rem' }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                  >
                    Where engineering discipline meets creative execution.
                  </motion.h3>
                  <motion.p
                    className="pro-body-text"
                    style={{ marginBottom: '3rem' }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.12 }}
                  >
                    Each project is an exercise in solving a non-trivial problem. No templates, no shortcuts: only purposeful architecture and deliberate design.
                  </motion.p>

                  <motion.div
                    className="pro-creative-grid"
                    variants={staggerContainer(0.1, 0.15)}
                    initial="hidden"
                    animate="show"
                  >
                    {creativeProjects.map((p, i) => (
                      <motion.div
                        key={i}
                        className="pro-creative-card"
                        variants={fadeUp}
                        whileHover={{ y: -6, transition: { duration: 0.25 } }}
                      >
                        <div className="pro-creative-card-top">
                          <span className="pro-creative-label">{p.label}</span>
                          <h4 className="pro-creative-title">{p.title}</h4>
                          <p className="pro-creative-subtitle">{p.subtitle}</p>
                        </div>
                        <p className="pro-creative-desc">{p.desc}</p>
                        <div className="pro-creative-tags">
                          {p.tags.map((tag, j) => (
                            <span key={j} className="pro-creative-tag">{tag}</span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )}

              {/* DIAGNOSTICS */}
              {activeTab === 'diagnostics' && (
                <div className="pro-diagnostics-layout">
                  <motion.div className="pro-philosophy-header" variants={fadeUp} initial="hidden" animate="show">
                    <span className="pro-eyebrow">SYSTEM TELEMETRY</span>
                  </motion.div>
                  <motion.h3
                    className="pro-main-heading"
                    style={{ marginBottom: '0.75rem' }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                  >
                    Quality metrics, measured objectively.
                  </motion.h3>
                  <motion.p
                    className="pro-body-text"
                    style={{ marginBottom: '3rem' }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.12 }}
                  >
                    Engineering quality is measurable. Every project is benchmarked against strict performance and accessibility targets before release.
                  </motion.p>

                  <div className="pro-diag-rings-row">
                    {rings.map((r, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.1, duration: 0.45 }}
                      >
                        <AnimatedRing pct={r.pct} label={r.label} color={r.color} />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="pro-diag-table-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <table className="pro-diag-table">
                      <thead>
                        <tr>
                          <th>METRIC</th>
                          <th>TARGET</th>
                          <th>ACTUAL</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {diagnosticRows.map((row, i) => (
                          <motion.tr
                            key={i}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.55 + i * 0.06, duration: 0.35 }}
                          >
                            <td>{row.metric}</td>
                            <td>{row.target}</td>
                            <td className="highlight">{row.actual}</td>
                            <td><span className="pro-status-badge success">{row.status}</span></td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>

                  <motion.div
                    className="pro-diag-footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                  >
                    <span className="pro-diag-quote">"Make it work, make it right, make it fast: in that order."</span>
                    <span className="pro-diag-attribution">Kent Beck</span>
                  </motion.div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
