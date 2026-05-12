// three/hero-field.js -- Dense full-viewport particle field
import * as THREE from 'three'

const MOUSE        = new THREE.Vector2(0, 0)
const MOUSE_TARGET = new THREE.Vector2(0, 0)

export function initHeroField(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setClearColor(0x000000, 0)

  const scene  = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(65, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
  camera.position.z = 5

  function buildLayer(count, sizeVal, opacity, spread) {
    const positions  = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * spread.x
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread.y
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread.z
      velocities[i * 3]     = (Math.random() - 0.5) * 0.0006
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.0006
      velocities[i * 3 + 2] = 0
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const mat = new THREE.PointsMaterial({
      size: sizeVal,
      color: new THREE.Color('#06b6d4'),
      transparent: true,
      opacity,
      sizeAttenuation: true,
    })

    return { geo, mat, velocities, points: new THREE.Points(geo, mat) }
  }

  const fg = buildLayer(300,  0.02, 0.15, { x: 12, y: 8, z: 2 })
  const bg = buildLayer(600,  0.01, 0.08, { x: 14, y: 10, z: 4 })

  scene.add(fg.points)
  scene.add(bg.points)

  // Smooth mouse tracking
  window.addEventListener('mousemove', e => {
    MOUSE_TARGET.x =  (e.clientX / window.innerWidth)  * 2 - 1
    MOUSE_TARGET.y = -(e.clientY / window.innerHeight) * 2 + 1
  })

  // Pause when off-screen
  let visible = true
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting
  })
  observer.observe(canvas)

  let animId

  function animate() {
    animId = requestAnimationFrame(animate)
    if (!visible) return

    MOUSE.x += (MOUSE_TARGET.x - MOUSE.x) * 0.05
    MOUSE.y += (MOUSE_TARGET.y - MOUSE.y) * 0.05

    for (const layer of [fg, bg]) {
      const pos = layer.geo.attributes.position.array
      const vel = layer.velocities
      const count = pos.length / 3

      for (let i = 0; i < count; i++) {
        pos[i * 3]     += vel[i * 3]
        pos[i * 3 + 1] += vel[i * 3 + 1]

        // Wrap
        if (pos[i * 3]     >  7) pos[i * 3]     = -7
        if (pos[i * 3]     < -7) pos[i * 3]     =  7
        if (pos[i * 3 + 1] >  5) pos[i * 3 + 1] = -5
        if (pos[i * 3 + 1] < -5) pos[i * 3 + 1] =  5

        // Mouse parallax repulsion
        const mx   = MOUSE.x * 5
        const my   = MOUSE.y * 4
        const dx   = pos[i * 3] - mx
        const dy   = pos[i * 3 + 1] - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 1.8 && dist > 0) {
          const force = (1.8 - dist) * 0.0006
          pos[i * 3]     += (dx / dist) * force
          pos[i * 3 + 1] += (dy / dist) * force
        }
      }
      layer.geo.attributes.position.needsUpdate = true
    }

    // Subtle camera drift
    camera.position.x += (MOUSE.x * 0.25 - camera.position.x) * 0.02
    camera.position.y += (MOUSE.y * 0.15 - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)

    renderer.render(scene, camera)
  }
  animate()

  function resize() {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', resize)
  resize()

  return {
    dispose() {
      cancelAnimationFrame(animId)
      observer.disconnect()
      fg.geo.dispose(); fg.mat.dispose()
      bg.geo.dispose(); bg.mat.dispose()
      renderer.dispose()
      window.removeEventListener('resize', resize)
    },
  }
}
