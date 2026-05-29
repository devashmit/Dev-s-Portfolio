import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const SYMBOLS = ['0', '1', '</>', '[]', '{}', 'TS', 'JS', '⚛', 'fn', '()'];

// Main interactive nodes
const mainNodesConfig = [
  {
    id: 'github',
    label: 'GitHub',
    icon: <FaGithub />,
    href: 'https://github.com/devashmit',
    handle: 'devashmit',
    detail: '5.2k Followers',
    baseHue: 355,             // Red-ish for GitHub
    themeRGB: '220, 60, 60',  // used for canvas overlay & border
    theta: 0,
    phi: Math.PI / 2,
    orbitFactor: 0.22,
    speedFactor: 1.5,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: <FaLinkedin />,
    href: 'https://www.linkedin.com/in/abhishek-dev-5b5148357',
    handle: 'Ashmit Dev',
    detail: '2.1k Connections',
    baseHue: 214,
    themeRGB: '10, 102, 194',
    theta: (2 * Math.PI) / 3,
    phi: Math.PI / 2,
    orbitFactor: 0.31,
    speedFactor: 1.1,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: <FaWhatsapp />,
    href: 'https://wa.me/message/6VRRX2XZZ4UFO1',
    handle: 'Whatsapp',
    detail: 'Online Now',
    baseHue: 142,
    themeRGB: '37, 211, 102',
    theta: (4 * Math.PI) / 3,
    phi: Math.PI / 2,
    orbitFactor: 0.40,
    speedFactor: 0.8,
  },
  {
    id: 'email',
    label: 'Email',
    icon: <MdEmail />,
    href: 'mailto:devvv0264@gmail.com',
    handle: 'devvv0264@gmail.com',
    detail: 'Send a message',
    baseHue: 35,
    themeRGB: '251, 146, 60',
    theta: Math.PI,
    phi: Math.PI / 2,
    orbitFactor: 0.49,
    speedFactor: 0.5,
  },
];

// Constellation filler nodes
const fillerNodesConfig = [
  { id: 'f1', theta: Math.PI / 4, phi: Math.PI / 4, baseHue: 180, orbitFactor: 0.26, speedFactor: 1.3 },
  { id: 'f2', theta: Math.PI / 3, phi: 3 * Math.PI / 4, baseHue: 214, orbitFactor: 0.35, speedFactor: 0.95 },
  { id: 'f3', theta: 5 * Math.PI / 4, phi: Math.PI / 3, baseHue: 142, orbitFactor: 0.44, speedFactor: 0.65 },
  { id: 'f4', theta: 7 * Math.PI / 6, phi: 2 * Math.PI / 3, baseHue: 35, orbitFactor: 0.28, speedFactor: 1.25 },
  { id: 'f5', theta: 3 * Math.PI / 2, phi: Math.PI / 4, baseHue: 180, orbitFactor: 0.37, speedFactor: 0.85 },
  { id: 'f6', theta: Math.PI / 6, phi: 5 * Math.PI / 6, baseHue: 142, orbitFactor: 0.47, speedFactor: 0.55 },
];

// Initialize particles with a size so they don't show "undefined"
function makeParticles(width, height) {
  return Array.from({ length: 30 }, () => ({
    x: Math.random() * (width || 600),
    y: Math.random() * (height || 380),
    char: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    size: Math.random() * 7 + 6,
    speedY: Math.random() * 0.15 + 0.05,
    phase: Math.random() * Math.PI * 2,
    driftPhase: Math.random() * Math.PI * 2,
  }));
}

export default function HolographicOrbLinks() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const hoveredNodeRef = useRef(null); // sync ref so canvas loop reads latest
  const [isDragging, setIsDragging] = useState(false);

  const velocity = useRef({ x: 0.002, y: 0.005 });
  const dragStart = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0, y: 0.8 });
  const mousePos = useRef({ x: 300, y: 200 });
  const [dimensions, setDimensions] = useState({ width: 680, height: 420 });

  // keep ref in sync with state
  useEffect(() => { hoveredNodeRef.current = hoveredNode; }, [hoveredNode]);

  // Ambient particles – initialise immediately so no undefined text on first frame
  const ambientParticles = useRef(makeParticles(680, 420));

  // Responsive resize
  useEffect(() => {
    const handleResize = () => {
      const width = Math.min(window.innerWidth - 32, 880);
      const height = window.innerWidth < 640 ? 320 : 420;
      setDimensions({ width, height });
      ambientParticles.current = makeParticles(width, height);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track cursor inside container for parallax & dynamic lighting
  useEffect(() => {
    const handleMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let pulse = 0;

    const loop = () => {
      const { width, height } = dimensions;
      const cx = width / 2;
      const cy = height / 2;

      const parallaxX = (mousePos.current.x - cx) * 0.06;
      const parallaxY = (mousePos.current.y - cy) * 0.06;

      if (isDragging) {
        // Decay velocity if mouse is held still
        velocity.current.x *= 0.85;
        velocity.current.y *= 0.85;
      } else {
        const isHovered = hoveredNodeRef.current !== null;
        
        // Orbit around the vertical axis (Y-axis rotation = orbital motion)
        const targetAmbientY = isHovered ? 0.0005 : 0.003;
        const targetAmbientX = 0; // No tumbleweed rotation
        
        // Friction coefficient
        const friction = isHovered ? 0.85 : 0.96;
        
        // Apply friction
        velocity.current.x *= friction;
        velocity.current.y *= friction;
        
        // Gently pull velocity towards target orbital speed
        velocity.current.x += (targetAmbientX - velocity.current.x) * 0.04;
        velocity.current.y += (targetAmbientY - velocity.current.y) * 0.04;

        // Gently restore the view's tilt (rotation.x) to a premium tilted perspective
        const targetTilt = 0.45; // ~25 degrees tilt
        rotation.current.x += (targetTilt - rotation.current.x) * 0.03;
      }

      // Apply velocity to rotation
      rotation.current.x += velocity.current.x;
      rotation.current.y += velocity.current.y;

      const baseRadius = Math.min(width, height);
      const cam = 380;
      const cosX = Math.cos(rotation.current.x), sinX = Math.sin(rotation.current.x);
      const time = Date.now() / 3000;

      // Project nodes
      const allNodes = [
        ...mainNodesConfig.map(n => ({ ...n, isFiller: false })),
        ...fillerNodesConfig.map(n => ({ ...n, isFiller: true })),
      ];

      const projected = allNodes.map(node => {
        const nodeRadius = baseRadius * node.orbitFactor;
        const currentTheta = node.theta + rotation.current.y * node.speedFactor;
        
        let x = nodeRadius * Math.sin(node.phi) * Math.cos(currentTheta);
        let y = nodeRadius * Math.sin(node.phi) * Math.sin(currentTheta);
        let z = nodeRadius * Math.cos(node.phi);
        
        // Tilt rotation (around horizontal X-axis only)
        let x1 = x;
        let y2 = y * cosX - z * sinX;
        let z2 = y * sinX + z * cosX;
        
        const scale = cam / (cam + z2);
        const depthBias = (z2 + nodeRadius) / (nodeRadius * 2);
        const sx = cx + x1 * scale + parallaxX * (depthBias - 0.5);
        const sy = cy + y2 * scale + parallaxY * (depthBias - 0.5);
        const hue = (node.baseHue + Math.sin(time * 1.5 + currentTheta) * 12) % 360;
        const color = `hsla(${hue}, 95%, 60%, 1)`;
        const glow = `hsla(${hue}, 95%, 60%, 0.38)`;
        const dist = Math.hypot(mousePos.current.x - sx, mousePos.current.y - sy);
        const prox = Math.max(0, 1 - dist / 160);
        return { ...node, x: sx, y: sy, z: z2, scale, opacity: (z2 + nodeRadius * 1.5) / (nodeRadius * 2.5), color, glow, prox };
      });
      projected.sort((a, b) => b.z - a.z);
      setNodes(projected);

      // ── Clear ──
      ctx.clearRect(0, 0, width, height);

      // ── Theme hover overlay – entire canvas glows in node's brand color ──
      const activeId = hoveredNodeRef.current;
      const activeCfg = activeId ? mainNodesConfig.find(n => n.id === activeId) : null;
      if (activeCfg) {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.8);
        grad.addColorStop(0, `rgba(${activeCfg.themeRGB}, 0.18)`);
        grad.addColorStop(0.5, `rgba(${activeCfg.themeRGB}, 0.07)`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // ── Background grid ──
      ctx.strokeStyle = 'rgba(0,240,255,0.015)';
      ctx.lineWidth = 0.5;
      const gs = 40;
      for (let gx = 0; gx < width; gx += gs) {
        ctx.beginPath(); ctx.moveTo(gx + parallaxX * 0.05, 0); ctx.lineTo(gx + parallaxX * 0.05, height); ctx.stroke();
      }
      for (let gy = 0; gy < height; gy += gs) {
        ctx.beginPath(); ctx.moveTo(0, gy + parallaxY * 0.05); ctx.lineTo(width, gy + parallaxY * 0.05); ctx.stroke();
      }

      // ── Concentric Orbit Rings ──
      ctx.lineWidth = 1;
      mainNodesConfig.forEach(node => {
        const isHov = activeId === node.id;
        const r = baseRadius * node.orbitFactor;
        ctx.strokeStyle = isHov ? `rgba(${node.themeRGB}, 0.12)` : 'rgba(0, 240, 255, 0.025)';
        ctx.beginPath();
        // Draw orbital track tilted around the X-axis
        ctx.ellipse(cx - parallaxX * 0.06, cy - parallaxY * 0.06, r, r * Math.abs(cosX), 0, 0, Math.PI * 2);
        ctx.stroke();
      });

      // ── Ambient shimmer particles ──
      pulse = (pulse + 0.015) % 1;
      const wave = Math.sin(pulse * Math.PI * 2);
      const pm = 1 + Math.max(0, wave) * 0.5;
      ambientParticles.current.forEach(p => {
        p.y -= p.speedY;
        if (p.y < 0) p.y = height;
        p.driftPhase += 0.008;
        p.x += Math.sin(p.driftPhase) * 0.12;
        const opac = (0.11 + Math.sin(time * 2 + p.phase) * 0.07) * pm;
        ctx.font = `bold ${p.size * (0.85 + Math.max(0, wave) * 0.3)}px monospace`;
        ctx.fillStyle = `rgba(0,240,255,${opac})`;
        ctx.fillText(p.char, p.x, p.y);
      });

      // ── Core pulse ring ──
      ctx.strokeStyle = `rgba(0,240,255,${0.18 * (1 - pulse)})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx - parallaxX * 0.06, cy - parallaxY * 0.06, 30 + pulse * 72, 0, Math.PI * 2);
      ctx.stroke();

      // ── Core ──
      const coreX = cx - parallaxX * 0.06, coreY = cy - parallaxY * 0.06;
      ctx.fillStyle = 'rgba(0,240,255,0.04)';
      ctx.beginPath(); ctx.arc(coreX, coreY, 28, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(0,240,255,0.45)';
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.arc(coreX, coreY, 12, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = 'rgba(0,240,255,0.22)';
      ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.arc(coreX, coreY, 42 + Math.sin(Date.now() / 200) * 2, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);

      // ── PCB circuit traces + photon pulses ──
      projected.forEach(node => {
        const isMain = !node.isFiller;
        const isHov = activeId === node.id;
        const alpha = isMain ? (isHov ? 0.9 : 0.3 + node.prox * 0.2) * node.opacity : 0.06 * node.opacity;
        ctx.strokeStyle = isMain ? node.color : 'rgba(255,255,255,0.1)';
        ctx.globalAlpha = alpha;
        ctx.lineWidth = isMain ? 1.8 + node.prox * 0.6 : 0.75;

        const bendX = coreX + (node.x - coreX) * 0.45;
        const bendY = coreY;
        ctx.beginPath(); ctx.moveTo(coreX, coreY); ctx.lineTo(bendX, bendY); ctx.lineTo(node.x, node.y); ctx.stroke();

        if (isMain) {
          // solder joint
          ctx.fillStyle = node.color;
          ctx.beginPath(); ctx.arc(bendX, bendY, 2.5, 0, Math.PI * 2); ctx.fill();

          // photon
          ctx.globalAlpha = node.opacity;
          ctx.fillStyle = node.color;
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 9 + node.prox * 7;
          const t = (pulse + node.theta / (Math.PI * 2)) % 1;
          let px, py;
          if (t < 0.45) { const nt = t / 0.45; px = coreX + (bendX - coreX) * nt; py = coreY; }
          else { const nt = (t - 0.45) / 0.55; px = bendX + (node.x - bendX) * nt; py = bendY + (node.y - bendY) * nt; }
          ctx.beginPath(); ctx.arc(px, py, 3 + node.prox * 1.5, 0, Math.PI * 2); ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(animId);
  }, [dimensions, isDragging]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };
  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    rotation.current.y += dx * 0.005;
    rotation.current.x += dy * 0.005;
    
    // smooth velocity response
    velocity.current.y = velocity.current.y * 0.15 + (dx * 0.005) * 0.85;
    velocity.current.x = velocity.current.x * 0.15 + (dy * 0.005) * 0.85;
    
    dragStart.current = { x: e.clientX, y: e.clientY };
  };
  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Derive active theme for container border
  const activeCfg = hoveredNode ? mainNodesConfig.find(n => n.id === hoveredNode) : null;
  const borderColor = activeCfg
    ? `rgba(${activeCfg.themeRGB}, 0.7)`
    : 'rgba(0, 240, 255, 0.06)';
  const containerGlow = activeCfg
    ? `0 0 40px rgba(${activeCfg.themeRGB}, 0.2), inset 0 0 30px rgba(${activeCfg.themeRGB}, 0.05)`
    : 'inset 0 0 25px rgba(0, 240, 255, 0.03)';

  return (
    <div
      ref={containerRef}
      className="holographic-orb-container"
      style={{
        position: 'relative',
        width: dimensions.width,
        height: dimensions.height,
        margin: '1.25rem auto 0 auto',
        userSelect: 'none',
        touchAction: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10, 12, 16, 0.5)',
        border: `1px solid ${borderColor}`,
        borderRadius: '16px',
        overflow: 'visible',
        cursor: isDragging ? 'grabbing' : 'grab',
        backdropFilter: 'blur(14px)',
        boxShadow: containerGlow,
        transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* HUD corner brackets */}
      {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v, h]) => (
        <div key={`${v}-${h}`} style={{
          position: 'absolute', [v]: 12, [h]: 12,
          width: 10, height: 10,
          borderTop: v === 'top' ? `2px solid rgba(0,240,255,0.35)` : 'none',
          borderBottom: v === 'bottom' ? `2px solid rgba(0,240,255,0.35)` : 'none',
          borderLeft: h === 'left' ? `2px solid rgba(0,240,255,0.35)` : 'none',
          borderRight: h === 'right' ? `2px solid rgba(0,240,255,0.35)` : 'none',
          pointerEvents: 'none',
        }} />
      ))}

      {/* HUD status text */}
      <div style={{ position:'absolute', top:14, left:28, fontFamily:'var(--font-mono)', fontSize:'0.5rem', color:'rgba(0,240,255,0.38)', letterSpacing:'0.1em', pointerEvents:'none' }}>
        SYS_STATUS // CONST_ACTIVE
      </div>
      <div style={{ position:'absolute', top:14, right:28, fontFamily:'var(--font-mono)', fontSize:'0.5rem', color:'rgba(0,240,255,0.38)', letterSpacing:'0.1em', pointerEvents:'none' }}>
        LAT: 27.7172 / LNG: 85.3240
      </div>

      {/* Spinning HUD ring */}
      <div style={{ position:'absolute', width:'76%', height:'76%', border:'1.2px dashed rgba(0,240,255,0.05)', borderRadius:'50%', pointerEvents:'none', animation:'spin 180s linear infinite' }} />

      {/* Canvas */}
      <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height}
        style={{ position:'absolute', top:0, left:0, pointerEvents:'none' }} />

      {/* Projected HTML nodes */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
        {nodes.map(node => {
          if (node.isFiller) return (
            <div key={node.id} style={{
              position:'absolute', left:node.x, top:node.y,
              width:5, height:5, borderRadius:'50%',
              background:node.color,
              transform:`translate(-50%,-50%) scale(${node.scale})`,
              opacity:node.opacity * 0.4,
              boxShadow:`0 0 6px ${node.color}`,
              pointerEvents:'none',
            }} />
          );

          const isHov = hoveredNode === node.id;
          const activeCfgNode = mainNodesConfig.find(n => n.id === node.id);
          const shadowBlur = isHov ? 40 : 14 + node.prox * 18;
          const shadowColor = isHov && activeCfgNode
            ? `rgba(${activeCfgNode.themeRGB}, 0.7)`
            : node.glow;
          const borderColorNode = isHov && activeCfgNode
            ? `rgba(${activeCfgNode.themeRGB}, 1)`
            : 'rgba(255,255,255,0.12)';
          const iconColor = isHov && activeCfgNode
            ? `rgba(${activeCfgNode.themeRGB}, 1)`
            : 'var(--ink-mid)';

          return (
            <div key={node.id} style={{
              position:'absolute', left:node.x, top:node.y,
              transform:`translate(-50%,-50%) scale(${node.scale * (isHov ? 1.22 : 1)})`,
              opacity:node.opacity,
              zIndex:Math.round(100 + node.z),
              pointerEvents:'auto',
              transition:'transform 0.25s cubic-bezier(0.16,1,0.3,1)',
            }}>
              <a
                href={node.href}
                target={node.id === 'email' ? undefined : '_blank'}
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{
                  display:'flex', alignItems:'center', justifyContent:'center',
                  width:'78px', height:'78px',
                  borderRadius:'50%',
                  background: isHov && activeCfgNode
                    ? `rgba(${activeCfgNode.themeRGB}, 0.12)`
                    : 'rgba(8,10,14,0.95)',
                  border:`2px solid ${borderColorNode}`,
                  color:iconColor,
                  boxShadow:`0 0 ${shadowBlur}px ${shadowColor}, inset 0 0 14px ${shadowColor}`,
                  cursor:'pointer',
                  fontSize:'2.2rem',
                  position:'relative',
                  backdropFilter:'blur(8px)',
                  transition:'border-color 0.3s, color 0.3s, box-shadow 0.3s, background 0.3s',
                }}
              >
                {node.icon}

                {/* Cross-hair ticks */}
                {[{top:'8%',left:'50%',w:'1px',h:'5px',tx:'-50%'},{bottom:'8%',left:'50%',w:'1px',h:'5px',tx:'-50%'},{left:'8%',top:'50%',w:'5px',h:'1px',ty:'-50%'},{right:'8%',top:'50%',w:'5px',h:'1px',ty:'-50%'}].map((s,i) => (
                  <div key={i} style={{
                    position:'absolute', ...s,
                    width:s.w, height:s.h,
                    background: isHov && activeCfgNode ? `rgba(${activeCfgNode.themeRGB}, 0.8)` : 'rgba(255,255,255,0.1)',
                    transform: s.tx ? `translateX(${s.tx})` : s.ty ? `translateY(${s.ty})` : undefined,
                    transition:'background 0.3s',
                  }} />
                ))}

                {/* Spinning ring on hover */}
                {isHov && activeCfgNode && (
                  <motion.div
                    style={{
                      position:'absolute', inset:-8, borderRadius:'50%',
                      border:`1.5px dashed rgba(${activeCfgNode.themeRGB}, 0.85)`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                  />
                )}
              </a>

              {/* Hologram tooltip */}
              <AnimatePresence>
                {isHov && activeCfgNode && (
                  <motion.div
                    initial={{ opacity:0, y:15, scale:0.9 }}
                    animate={{ opacity:1, y:0, scale:1 }}
                    exit={{ opacity:0, y:10, scale:0.9 }}
                    transition={{ duration:0.2, ease:'easeOut' }}
                    style={{
                      position:'absolute', bottom:'88px', left:'50%',
                      transform:'translateX(-50%)',
                      width:'162px',
                      background:'rgba(6,8,12,0.97)',
                      border:`1px solid rgba(${activeCfgNode.themeRGB}, 0.8)`,
                      borderRadius:'8px',
                      padding:'8px 12px',
                      boxShadow:`0 8px 24px rgba(0,0,0,0.7), 0 0 20px rgba(${activeCfgNode.themeRGB}, 0.3)`,
                      pointerEvents:'none',
                      textAlign:'center',
                      zIndex:200,
                    }}
                  >
                    <div style={{ position:'absolute', inset:0, background:`linear-gradient(to bottom, transparent 50%, rgba(${activeCfgNode.themeRGB},0.08) 50%)`, backgroundSize:'100% 4px', opacity:0.4, borderRadius:'7px' }} />
                    <div style={{ fontSize:'0.6rem', fontFamily:'var(--font-mono)', color:'rgba(255,255,255,0.45)', textTransform:'uppercase', letterSpacing:'0.08em' }}>{node.label}</div>
                    <div style={{ fontSize:'0.82rem', fontFamily:'var(--font-display)', fontWeight:700, color:'var(--ink)', marginTop:'2px' }}>{node.handle}</div>
                    <div style={{ fontSize:'0.65rem', fontFamily:'var(--font-mono)', color:`rgba(${activeCfgNode.themeRGB},1)`, marginTop:'4px', borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:'4px' }}>{node.detail}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Drag prompt */}
      <div style={{
        position:'absolute', bottom:10, fontFamily:'var(--font-mono)',
        fontSize:'0.58rem', color:'rgba(0,240,255,0.3)',
        letterSpacing:'0.12em', textTransform:'uppercase',
        pointerEvents:'none', display:'flex', alignItems:'center', gap:5,
      }}>
        <span style={{ display:'inline-block', width:5, height:5, borderRadius:'50%', background:'rgba(0,240,255,0.55)', animation:'pulse 1.5s infinite' }} />
        Hold &amp; Drag to Rotate Hologram
      </div>
    </div>
  );
}
