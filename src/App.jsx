import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Stack from './components/Stack'
import About from './components/About'
import Contact from './components/Contact'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import CatCompanion from './components/CatCompanion'
import RippleEffect from './components/RippleEffect'
import PageSpotlight from './components/PageSpotlight'
import ScrollProgress from './components/ScrollProgress'
import FloatingIcons from './components/FloatingIcons'

gsap.registerPlugin(ScrollTrigger);

// Premium coordinated ScrollReveal component using 0.22, 1, 0.36, 1 easing
function ScrollReveal({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);
  const [isRevealStarted, setIsRevealStarted] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Connect Lenis to ScrollTrigger update
    lenis.on('scroll', ScrollTrigger.update)

    // Run Lenis on GSAP Ticker
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerUpdate)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerUpdate)
    }
  }, [])

  return (
    <>
      <ScrollProgress />
      <PageSpotlight />
      <div id="bg-layer"></div>
      <div className="global-grain-overlay" aria-hidden="true"></div>
      <a className="skip-link" href="#main">Skip to main content</a>
      {isPreloaderActive && (
        <Preloader
          onRevealStart={() => setIsRevealStarted(true)}
          onComplete={() => setIsPreloaderActive(false)}
        />
      )}
      <CustomCursor />
      <RippleEffect />
      <FloatingIcons />

      <motion.div
        initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
        animate={isRevealStarted ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 35, filter: 'blur(10px)' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: isRevealStarted ? 'auto' : 'none' }}
      >
        <Nav />

        <main id="main">
          <Hero isRevealStarted={isRevealStarted} />
          <Projects />
          <ScrollReveal><Stack /></ScrollReveal>
          <ScrollReveal><About /></ScrollReveal>
          <ScrollReveal><Contact /></ScrollReveal>
        </main>

        <footer>
          <p className="footer-l1">ASHMIT DEV · 2026 · BUILT WITH REACT & FRAMER MOTION</p>
          <p className="footer-l2">SYSTEM STATUS: ONLINE</p>
        </footer>
      </motion.div>

      <CatCompanion />
      
      <div id="color-mode">
        <div id="toggle-button" onClick={(e) => {
          const toggleTheme = () => {
            document.documentElement.classList.toggle('light-mode');
            if (document.documentElement.classList.contains('light-mode')) {
              localStorage.setItem('color-mode', 'light-mode');
            } else {
              localStorage.setItem('color-mode', 'dark-mode');
            }
          };

          if (!document.startViewTransition) {
            toggleTheme();
            return;
          }

          const x = e.clientX;
          const y = e.clientY;
          const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
          );

          const transition = document.startViewTransition(() => {
            toggleTheme();
          });

          transition.ready.then(() => {
            const isLight = document.documentElement.classList.contains('light-mode');
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${endRadius}px at ${x}px ${y}px)`
                ]
              },
              {
                duration: 500,
                easing: 'ease-in-out',
                pseudoElement: isLight ? '::view-transition-new(root)' : '::view-transition-old(root)'
              }
            );
          });
        }}></div>
      </div>
    </>
  )
}

export default App
