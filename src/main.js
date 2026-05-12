// src/main.js -- entry point
import './style.css'

import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Lenis smooth scroll
export const lenis = new Lenis({
  duration: 1.4,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add(time => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

import { initPreloader } from './modules/preloader.js'
import { initNav }       from './modules/nav.js'
import { initCursor }    from './modules/cursor.js'
import { initReveal }    from './modules/reveal.js'
import { initHero }      from './modules/hero.js'
import { initAbout }     from './modules/about.js'
import { initStack }     from './modules/stack.js'
import { initProjects }  from './modules/projects.js'
import { initContact }   from './modules/contact.js'
import { initInteractive } from './modules/interactive.js'

document.addEventListener('DOMContentLoaded', () => {
  initCursor()

  // Hero must be inited before preloader so canvas is ready
  initHero()

  initPreloader().then(() => {
    initNav()
    initReveal()
    initAbout()
    initStack()
    initProjects()
    initContact()
    initInteractive()
    // Give Lenis one tick to settle before refreshing
    requestAnimationFrame(() => ScrollTrigger.refresh())
  })
})
