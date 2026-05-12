// modules/hero.js
import gsap from 'gsap'
import { initHeroField } from '../three/hero-field.js'

export function initHero() {
  const canvas      = document.getElementById('hero-canvas')
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Three.js particle field -- desktop only
  if (!isTouchDevice && canvas) {
    initHeroField(canvas)
  }

  document.addEventListener('preloader:complete', () => {
    if (prefersReduced) {
      gsap.set(['.hero-availability', '.hero-name', '.hero-role', '.hero-tagline', '.hero-badges', '.hero-cta', '.hero-scroll'], { opacity: 1, y: 0 })
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // 1. Availability
    tl.to('.hero-availability', { opacity: 1, y: 0, duration: 0.8 }, 0.1)

    // 2. Name & Role
    tl.to('.hero-name', { opacity: 1, y: 0, duration: 0.8 }, 0.2)
      .to('.hero-role', { opacity: 1, y: 0, duration: 0.8 }, 0.3)

    // 3. Tagline
    tl.to('.hero-tagline', { opacity: 1, y: 0, duration: 0.8 }, 0.45)

    // 4. Badges
    tl.to('.hero-badges', { opacity: 1, y: 0, duration: 0.8 }, 0.6)

    // 5. CTAs
    tl.to('.hero-cta', { opacity: 1, y: 0, duration: 0.8 }, 0.75)

    // 6. Scroll indicator
    tl.to('.hero-scroll', { opacity: 1, duration: 0.8 }, 1.0)
  })
}
