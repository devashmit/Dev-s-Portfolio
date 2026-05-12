// modules/nav.js
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

function updateNepalClock() {
  const now    = new Date()
  const utcMs  = now.getTime() + (now.getTimezoneOffset() * 60000)
  const npMs   = utcMs + (5 * 3600000) + (45 * 60000)
  const nepal  = new Date(npMs)
  const h = String(nepal.getHours()).padStart(2, '0')
  const m = String(nepal.getMinutes()).padStart(2, '0')
  const el = document.getElementById('nepal-time')
  if (el) el.textContent = `${h}:${m}`
}

export function initNav() {
  const nav       = document.getElementById('nav')
  const links     = document.querySelectorAll('.nav-links a[data-section]')
  const hamburger = document.querySelector('.nav-hamburger')

  // Slide nav down on preloader complete
  document.addEventListener('preloader:complete', () => {
    gsap.to(nav, { translateY: 0, duration: 0.7, ease: 'expo.out', delay: 0.1 })
  })

  // Nepal clock
  updateNepalClock()
  setInterval(updateNepalClock, 30000)

  // Active section tracking
  const sections = ['hero', 'about', 'stack', 'projects', 'contact']
  sections.forEach(id => {
    const el = document.getElementById(id)
    if (!el) return
    ScrollTrigger.create({
      trigger: el,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => setActive(id),
      onEnterBack: () => setActive(id),
    })
  })

  function setActive(id) {
    links.forEach(a => {
      a.classList.toggle('active', a.dataset.section === id)
    })
  }

  // Hamburger toggle (mobile)
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open')
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false')
    })

    // Close on link click
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => {
        document.body.classList.remove('nav-open')
        hamburger.setAttribute('aria-expanded', 'false')
      })
    })
  }
}
