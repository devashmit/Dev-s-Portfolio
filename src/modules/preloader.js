// modules/preloader.js
import gsap from 'gsap'

export function initPreloader() {
  return new Promise(resolve => {
    const preloader = document.getElementById('preloader')
    const counter   = document.querySelector('.pre-count')
    const chars     = document.querySelectorAll('.pre-name span')

    // Reduced motion: skip entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      preloader.remove()
      document.dispatchEvent(new CustomEvent('preloader:complete'))
      resolve()
      return
    }

    const tl = gsap.timeline()

    // 1. Counter 000 -> 100
    tl.to({ val: 0 }, {
      val: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: function () {
        counter.textContent = String(Math.round(this.targets()[0].val)).padStart(3, '0')
      },
    }, 0)

    // 2. Name characters assemble
    tl.to(chars, {
      y: 0,
      opacity: 1,
      duration: 0.55,
      stagger: 0.06,
      ease: 'expo.out',
    }, 0.3)

    // 3. Short hold then curtain wipe up
    tl.to(preloader, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.7,
      ease: 'expo.inOut',
      onComplete: () => {
        preloader.remove()
        document.dispatchEvent(new CustomEvent('preloader:complete'))
        resolve()
      },
    }, 2.0)
  })
}
