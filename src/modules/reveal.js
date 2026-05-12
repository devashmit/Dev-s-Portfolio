// modules/reveal.js
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export function initReveal() {

  // MODE A -- [data-reveal="words"]
  // SplitText-style word mask-up reveal (manual because GSAP SplitText is Club)
  document.querySelectorAll('[data-reveal="words"]').forEach(el => {
    // Split into words manually
    const html = el.innerHTML
    const wrapped = html.replace(/(<br\s*\/?>)/gi, ' {{BR}} ').split(/\s+/).map(word => {
      if (word === '{{BR}}') return '<br>'
      if (!word) return ''
      return `<span class="reveal-word-wrap" style="overflow:hidden;display:inline-block;vertical-align:bottom;"><span class="reveal-word" style="display:inline-block;transform:translateY(105%);">${word}</span></span>`
    }).join(' ')
    el.innerHTML = wrapped

    const words = el.querySelectorAll('.reveal-word')

    ScrollTrigger.create({
      trigger: el,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        gsap.to(words, {
          y: '0%',
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.04,
        })
      },
    })
  })

  // MODE B -- [data-reveal="fade"]
  document.querySelectorAll('[data-reveal="fade"]').forEach(el => {
    gsap.set(el, { opacity: 0, y: 15 })
    ScrollTrigger.create({
      trigger: el,
      start: 'top 87%',
      once: true,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
      },
    })
  })
}
