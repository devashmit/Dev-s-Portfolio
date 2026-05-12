// modules/cursor.js
export function initCursor() {
  // Touch/mobile: skip
  if (window.matchMedia('(pointer: coarse)').matches) return

  const dot  = document.getElementById('cursor-dot')
  const ring = document.getElementById('cursor-ring')
  if (!dot || !ring) return

  let mx = 0, my = 0, rx = 0, ry = 0

  document.addEventListener('mousemove', e => {
    mx = e.clientX
    my = e.clientY
    dot.style.left = mx + 'px'
    dot.style.top  = my + 'px'
  })

  function lerp() {
    rx += (mx - rx) * 0.12
    ry += (my - ry) * 0.12
    ring.style.left = rx + 'px'
    ring.style.top  = ry + 'px'
    requestAnimationFrame(lerp)
  }
  lerp()

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hidden')
      ring.classList.add('hover')
    })
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hidden')
      ring.classList.remove('hover')
    })
  })
}
