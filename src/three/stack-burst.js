// three/stack-burst.js -- BoxGeometry shard explosion
import * as THREE from 'three'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { stack } from '../data/content.js'

// Grid target positions -- 4 cols x 2 rows
function getTargetPositions() {
  const cols = 4, rows = 2
  const spacingX = 2.7, spacingY = 1.9
  return stack.map((_, i) => ({
    x: ((i % cols) - (cols - 1) / 2) * spacingX,
    y: (Math.floor(i / cols) - (rows - 1) / 2) * spacingY * -1,
    z: 0,
  }))
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function wrapText(ctx, text, x, y, maxW, lineH) {
  const words = text.split(' ')
  let line = '', lines = []
  for (const word of words) {
    const test = line + word + ' '
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line.trim())
      line = word + ' '
    } else { line = test }
  }
  if (line.trim()) lines.push(line.trim())
  const startY = y - ((lines.length - 1) * lineH) / 2
  lines.forEach((l, i) => ctx.fillText(l, x, startY + i * lineH))
}

function createBadgeTexture(item) {
  const size   = 512
  const canvas = document.createElement('canvas')
  canvas.width = size; canvas.height = size
  const ctx = canvas.getContext('2d')

  // Card background
  ctx.fillStyle = '#1A1612'
  roundRect(ctx, 0, 0, size, size, 40)
  ctx.fill()

  // Border
  ctx.strokeStyle = 'rgba(237,232,220,0.12)'
  ctx.lineWidth = 2
  roundRect(ctx, 1, 1, 510, 510, 39)
  ctx.stroke()

  // Name
  ctx.fillStyle = '#EDE8DC'
  ctx.font = 'bold 60px "Space Mono", monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const nameW = ctx.measureText(item.name).width
  if (nameW > 420) ctx.font = 'bold 44px "Space Mono", monospace'
  ctx.fillText(item.name, 256, 210)

  // Note
  ctx.fillStyle = 'rgba(122,112,96,0.85)'
  ctx.font = '300 26px "DM Sans", sans-serif'
  wrapText(ctx, item.note, 256, 330, 420, 34)

  return new THREE.CanvasTexture(canvas)
}

export function initStackBurst(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setClearColor(0x000000, 0)
  renderer.setSize(container.clientWidth, container.clientHeight)
  container.appendChild(renderer.domElement)

  const scene  = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100)
  camera.position.z = 8

  // Lighting
  scene.add(new THREE.AmbientLight(0xEDE8DC, 0.4))
  const dir = new THREE.DirectionalLight(0xFFEEDD, 1.8)
  dir.position.set(3, 4, 5)
  scene.add(dir)
  const fill = new THREE.DirectionalLight(0xB85C38, 0.3)
  fill.position.set(-4, -2, 3)
  scene.add(fill)

  const targets = getTargetPositions()

  const shards = stack.map((item, i) => {
    const geo     = new THREE.BoxGeometry(1.65, 1.05, 0.06, 1, 1, 1)
    const texture = createBadgeTexture(item)

    const edgeMat  = new THREE.MeshStandardMaterial({ color: 0x1A1612, roughness: 0.8, metalness: 0.1 })
    const faceMat  = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.6, metalness: 0.05 })
    const backMat  = new THREE.MeshStandardMaterial({ color: 0x0F0D0A, roughness: 0.9, metalness: 0.0 })

    // BoxGeometry face order: right, left, top, bottom, front, back
    const materials = [ edgeMat, edgeMat, edgeMat, edgeMat, faceMat, backMat ]

    const mesh = new THREE.Mesh(geo, materials)

    // Initial state: clustered at origin, tumbling
    mesh.position.set(
      (Math.random() - 0.5) * 0.4,
      (Math.random() - 0.5) * 0.4,
      (Math.random() - 0.5) * 0.4,
    )
    const rx = (Math.random() - 0.5) * Math.PI * 1.5
    const ry = (Math.random() - 0.5) * Math.PI * 1.5
    const rz = (Math.random() - 0.5) * Math.PI * 1.5
    mesh.rotation.set(rx, ry, rz)
    mesh.scale.setScalar(0.01)

    scene.add(mesh)

    return { mesh, target: targets[i], initRot: { x: rx, y: ry, z: rz } }
  })

  // ScrollTrigger scrub
  let progress = 0
  ScrollTrigger.create({
    trigger: '#stack',
    start: 'top 60%',
    end: 'bottom 40%',
    scrub: 1.2,
    onUpdate: self => { progress = self.progress },
  })

  // Mouse tilt
  const mouse = new THREE.Vector2(0, 0)
  window.addEventListener('mousemove', e => {
    mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  })

  // IntersectionObserver
  let visible = true
  const obs = new IntersectionObserver(e => { visible = e[0].isIntersecting })
  obs.observe(container)

  let animId
  const clock = new THREE.Timer()

  function animate() {
    animId = requestAnimationFrame(animate)
    if (!visible) return

    clock.update()
    const t = clock.getElapsed()

    shards.forEach(({ mesh, target, initRot }, i) => {
      const delay   = i * 0.05
      const localP  = Math.max(0, Math.min(1, (progress - delay) / (1 - delay + 0.001)))
      const eased   = easeExpoOut(localP)

      mesh.position.x = lerp(0, target.x, eased)
      mesh.position.y = lerp(0, target.y, eased)
      mesh.position.z = lerp(0, target.z, eased)

      mesh.scale.setScalar(lerp(0.01, 1, eased))

      mesh.rotation.x = lerp(initRot.x, 0, eased)
      mesh.rotation.y = lerp(initRot.y, mouse.x * 0.08, eased)
      mesh.rotation.z = lerp(initRot.z, 0, eased)

      // Idle float
      mesh.position.y += Math.sin(t * 0.6 + i * 0.8) * 0.0006
    })

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
      shards.forEach(({ mesh }) => {
        mesh.geometry.dispose()
        Array.isArray(mesh.material)
          ? mesh.material.forEach(m => m.dispose())
          : mesh.material.dispose()
      })
      renderer.dispose()
      window.removeEventListener('resize', resize)
    },
  }
}

function lerp(a, b, t) { return a + (b - a) * t }
function easeExpoOut(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t) }
