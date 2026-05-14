import { useEffect } from 'react'
import Lenis from 'lenis'
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
import './App.css'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <Preloader />
      <CustomCursor />
      <RippleEffect />
      <Nav />

      <main id="main">
        <Hero />
        <Projects />
        <Stack />
        <About />
        <Contact />
      </main>

      <footer>
        <p className="footer-l1">ASHMIT DEV · 2026 · BUILT WITH REACT & FRAMER MOTION</p>
        <p className="footer-l2">SYSTEM STATUS: ONLINE</p>
      </footer>

      <CatCompanion />
      
      <div id="color-mode">
        <div id="toggle-button" onClick={() => {
          document.documentElement.classList.toggle('light-mode');
          if (document.documentElement.classList.contains('light-mode')) {
            localStorage.setItem('color-mode', 'light-mode');
          } else {
            localStorage.setItem('color-mode', 'dark-mode');
          }
        }}></div>
      </div>
    </>
  )
}

export default App
