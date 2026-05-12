// modules/contact.js
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export function initContact() {
  const cards = document.querySelectorAll('.contact-card')
  if (!cards.length) return

  gsap.set(cards, { opacity: 0, scale: 0.95 })

  ScrollTrigger.create({
    trigger: '#contact',
    start: 'top 75%',
    once: true,
    onEnter: () => {
      gsap.to(cards, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
      })
    },
  })
}
