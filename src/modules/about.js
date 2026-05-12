// modules/about.js
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export function initAbout() {
  const cards = document.querySelectorAll('.about-card')
  if (!cards.length) return

  gsap.set(cards, { opacity: 0, y: 30 })

  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 75%',
    once: true,
    onEnter: () => {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
      })
    },
  })
}
