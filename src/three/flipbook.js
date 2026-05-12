// three/flipbook.js -- 3D scroll-driven page-turn book
import * as THREE from 'three'
import ScrollTrigger from 'gsap/ScrollTrigger'

const PAGES = [
  {
    num:   'PAGE 01',
    title: 'WHO I AM',
    body:  'Final year BSc Hons in Computer Science. Itahari International College -- London Metropolitan University. Nepal. I study systems during the day and build them at night, usually past the hour when certainty is available.',
  },
  {
    num:   'PAGE 02',
    title: 'WHAT I DO',
    body:  'I write TypeScript. I build things that carry meaning -- a CV generator named after unemployment, a bouquet that runs in a browser, a helper project that is still deciding what to help with. Systems that function, though their purpose remains distant.',
  },
  {
    num:   'PAGE 03',
    title: 'THE PHILOSOPHY',
    body:  'The code obeys me, yet I am never certain I command it. I find this honest. Most things we build are slightly beyond us. That distance is not failure -- it is the correct relationship between a maker and what they make.',
  },
]

function makePageTexture(page) {
  const size = 1024
  const canvas = document.createElement('canvas')
  canvas.width  = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  // Vellum background
  ctx.fillStyle = '#F2EDE0'
  ctx.fillRect(0, 0, size, size)

  // Subtle paper grain lines
  ctx.strokeStyle = 'rgba(53,47,40,0.06)'
  ctx.lineWidth = 1
  for (let y = 80; y < size; y += 28) {
    ctx.beginPath(); ctx.moveTo(60, y); ctx.lineTo(size - 60, y); ctx.stroke()
  }

  // Left margin rule
  ctx.strokeStyle = 'rgba(184,92,56,0.18)'
  ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(90, 60); ctx.lineTo(90, size - 60); ctx.stroke()

  // Page number + title
  ctx.fillStyle = '#7A7060'
  ctx.font = '500 28px "Space Mono", monospace'
  ctx.fillText(page.num, 110, 100)

  ctx.fillStyle = '#352F28'
  ctx.font = '700 36px "Space Mono", monospace'
  ctx.fillText(page.title, 110, 155)

  // Divider
  ctx.strokeStyle = 'rgba(53,47,40,0.15)'
  ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(110, 175); ctx.lineTo(size - 60, 175); ctx.stroke()

  // Body text
  ctx.fillStyle = '#352F28'
  ctx.font = '300 30px "DM Sans", sans-serif'
  wrapText(ctx, page.body, 110, 230, size - 170, 48)

  return new THREE.CanvasTexture(canvas)
}

function wrapText(ctx, text, x, y, maxW, lineH) {
  const words = text.split(' ')
  let line = ''
  let cy   = y
  for (const word of words) {
    const test = line + word + ' '
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line.trim(), x, cy)
      cy += lineH
      line = word + ' '
    } else {
      line = test
    }
  }
  if (line.trim()) ctx.fillText(line.trim(), x, cy)
}

export function initFlipbook(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setClearColor(0x000000, 0)
  renderer.setSize(container.clientWidth, container.clientHeight)
  container.appendChild(renderer.domElement)

  const scene  = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)
  camera.position.set(0, 0.2, 5.5)

  // Lighting
  scene.add(new THREE.AmbientLight(0xF2EDE0, 0.8))
  const dir = new THREE.DirectionalLight(0xFFEEDD, 1.2)
  dir.position.set(2, 3, 4)
  scene.add(dir)
  const fill = new THREE.DirectionalLight(0xB85C38, 0.2)
  fill.position.set(-3, -1, 2)
  scene.add(fill)

  const W = 3.2, H = 4.2
  const pageGeo = new THREE.PlaneGeometry(W, H, 1, 1)

  // Build page meshes -- stacked, each with a canvas texture
  const pageMeshes = PAGES.map((p, i) => {
    const texture = makePageTexture(p)
    const mat     = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
      roughness: 0.85,
      metalness: 0,
    })
    const mesh = new THREE.Mesh(pageGeo, mat)
    mesh.position.set(0, 0, -i * 0.015) // slight z-offset so pages don't z-fight
    mesh.rotation.y = 0
    scene.add(mesh)
    return mesh
  })

  // Cover (back) -- dark card
  const coverMat  = new THREE.MeshStandardMaterial({ color: 0x141311, roughness: 0.9 })
  const coverMesh = new THREE.Mesh(pageGeo, coverMat)
  coverMesh.position.z = -PAGES.length * 0.015 - 0.02
  scene.add(coverMesh)

  // Book group for idle rotation
  const group = new THREE.Group()
  scene.add(group)
  pageMeshes.forEach(m => { group.add(m); scene.remove(m) })
  group.add(coverMesh); scene.remove(coverMesh)

  // ScrollTrigger -- scrub drives page rotation
  let currentProgress = 0
  ScrollTrigger.create({
    trigger: '#about',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1.5,
    onUpdate: self => { currentProgress = self.progress },
  })

  // IntersectionObserver to pause
  let visible = true
  const obs = new IntersectionObserver(e => { visible = e[0].isIntersecting })
  obs.observe(container)

  const clock = new THREE.Timer()
  const mouse = new THREE.Vector2(0, 0)
  window.addEventListener('mousemove', e => {
    mouse.x = (e.clientX / window.innerWidth)  * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  })

  let animId
  function animate() {
    animId = requestAnimationFrame(animate)
    if (!visible) return

    const t = clock.getElapsed()
    const totalPages = PAGES.length
    const progress   = currentProgress * totalPages

    pageMeshes.forEach((mesh, i) => {
      // Each page turns when progress crosses its index
      const angle = Math.max(0, Math.min(1, progress - i)) * -Math.PI
      mesh.rotation.y = angle
    })

    // Idle group bob
    group.rotation.y  = Math.sin(t * 0.3) * 0.04 + mouse.x * 0.06
    group.rotation.x  = Math.sin(t * 0.2) * 0.02 - mouse.y * 0.04
    group.position.y  = Math.sin(t * 0.5) * 0.04

    renderer.render(scene, camera)
  }
  animate()

  function resize() {
    const w = container.clientWidth
    const h = container.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', resize)
  resize()

  return {
    dispose() {
      cancelAnimationFrame(animId)
      obs.disconnect()
      pageGeo.dispose()
      renderer.dispose()
      window.removeEventListener('resize', resize)
    },
  }
}
