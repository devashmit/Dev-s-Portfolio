// modules/stack.js
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { stackData } from '../data/content.js'

export function initStack() {
  const grid = document.getElementById('stack-grid')
  if (!grid) return

  // Build the bento cards
  stackData.forEach((category) => {
    const card = document.createElement('article')
    card.className = 'bento-card stack-card'
    
    let itemsHtml = category.items.map(item => `
      <div class="stack-item-card">
        <span class="stack-item-name">${item.name}</span>
        <span class="stack-item-level">${item.level}</span>
      </div>
    `).join('')

    card.innerHTML = `
      <div class="stack-category">
        ${category.icon}
        ${category.category}
      </div>
      <div class="stack-items">
        ${itemsHtml}
      </div>
    `
    grid.appendChild(card)
  })

  // Staggered reveal on scroll
  const cards = grid.querySelectorAll('.bento-card')
  gsap.set(cards, { opacity: 0, y: 30 })

  ScrollTrigger.create({
    trigger: '#stack',
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
