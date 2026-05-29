import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

// Main interactive nodes
const mainNodesConfig = [
  { 
    id: 'github', 
    label: 'GitHub', 
    icon: <FaGithub />, 
    href: 'https://github.com/devashmit', 
    handle: 'devashmit', 
    detail: '5.2k Followers', 
    baseHue: 180, // Cyan
    theta: 0, 
    phi: Math.PI / 2 
  },
  { 
    id: 'linkedin', 
    label: 'LinkedIn', 
    icon: <FaLinkedin />, 
    href: 'https://www.linkedin.com/in/abhishek-dev-5b5148357', 
    handle: 'Ashmit Dev', 
    detail: '2.1k Connections', 
    baseHue: 210, // Blue
    theta: (2 * Math.PI) / 3, 
    phi: Math.PI / 2 
  },
  { 
    id: 'whatsapp', 
    label: 'WhatsApp', 
    icon: <FaWhatsapp />, 
    href: 'https://wa.me/message/6VRRX2XZZ4UFO1', 
    handle: 'Whatsapp', 
    detail: 'Online Now', 
    baseHue: 140, // Emerald Green
    theta: (4 * Math.PI) / 3, 
    phi: Math.PI / 2 
  },
];

// Constellation filler nodes to form a full sphere network
const fillerNodesConfig = [
  { id: 'f1', theta: Math.PI / 4, phi: Math.PI / 4, baseHue: 180 },
  { id: 'f2', theta: Math.PI / 3, phi: 3 * Math.PI / 4, baseHue: 210 },
  { id: 'f3', theta: 5 * Math.PI / 4, phi: Math.PI / 3, baseHue: 140 },
  { id: 'f4', theta: 7 * Math.PI / 6, phi: 2 * Math.PI / 3, baseHue: 35 },
  { id: 'f5', theta: 3 * Math.PI / 2, phi: Math.PI / 4, baseHue: 180 },
  { id: 'f6', theta: Math.PI / 6, phi: 5 * Math.PI / 6, baseHue: 140 },
];

export default function HolographicOrbLinks() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Interaction & Parallax states
  const dragStart = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0, y: 0.8 });
  const rotationSpeed = useRef({ x: 0.002, y: 0.005 });
  const mousePos = useRef({ x: 300, y: 200 }); 
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  // Floating code fragments/binary particles for background network depth
  const ambientParticles = useRef([]);

  // Responsive initialization
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = Math.min(window.innerWidth - 32, 850);
        const height = window.innerWidth < 640 ? 300 : 380;
        setDimensions({ width, height });

        // Generate custom network particles (mix of binary codes and tiny code symbols)
        const particles = [];
        const symbols = ['0', '1', '</>', '[]', '{}', 'TS', 'JS', '⚛'];
        for (let i = 0; i < 30; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            char: symbols[Math.floor(Math.random() * symbols.length)],
            size: Math.random() * 8 + 6,
            speedY: Math.random() * 0.15 + 0.05,
            phase: Math.random() * Math.PI * 2,
            driftPhase: Math.random() * Math.PI * 2,
          });
        }
        ambientParticles.current = particles;
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePointerMoveGlobal = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMoveGlobal);
    return () => window.removeEventListener('pointermove', handlePointerMoveGlobal);
  }, []);

  // Compute 3D Projection & Run Canvas Drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let pulseProgress = 0;
    let scanlineOffset = 0;

    const renderLoop = () => {
      const cx = dimensions.width / 2;
      const cy = dimensions.height / 2;

      // Parallax effect responsive to cursor position
      const targetParallaxX = (mousePos.current.x - cx) * 0.06;
      const targetParallaxY = (mousePos.current.y - cy) * 0.06;

      if (!isDragging) {
        const dragFactor = hoveredNode ? 0.04 : 1;
        rotation.current.y += rotationSpeed.current.y * dragFactor;
        rotation.current.x += rotationSpeed.current.x * dragFactor;
      }

      const radius = Math.min(dimensions.width, dimensions.height) * 0.38;
      const cameraDistance = 380;

      const cosX = Math.cos(rotation.current.x);
      const sinX = Math.sin(rotation.current.x);
      const cosY = Math.cos(rotation.current.y);
      const sinY = Math.sin(rotation.current.y);

      const time = Date.now() / 3000;

      const allNodesToProject = [
        ...mainNodesConfig.map(n => ({ ...n, isFiller: false })),
        ...fillerNodesConfig.map(f => ({ ...f, isFiller: true }))
      ];

      const projectedNodes = allNodesToProject.map((node) => {
        // Cartesian spherical coordinates
        let x = radius * Math.sin(node.phi) * Math.cos(node.theta);
        let y = radius * Math.sin(node.phi) * Math.sin(node.theta);
        let z = radius * Math.cos(node.phi);

        // Spherical rotation on Y
        let x1 = x * cosY - z * sinY;
        let z1 = x * sinY + z * cosY;

        // Spherical rotation on X
        let y2 = y * cosX - z1 * sinX;
        let z2 = y * sinX + z1 * cosX;

        const scale = cameraDistance / (cameraDistance + z2);
        
        // Perspective Depth Parallax offset calculation
        const depthBias = (z2 + radius) / (radius * 2); 
        const parallaxOffsetX = targetParallaxX * (depthBias - 0.5);
        const parallaxOffsetY = targetParallaxY * (depthBias - 0.5);

        const screenX = cx + x1 * scale + parallaxOffsetX;
        const screenY = cy + y2 * scale + parallaxOffsetY;

        // Subtle HSL hue shifts over time
        const currentHue = (node.baseHue + Math.sin(time * 1.5 + node.theta) * 15) % 360;
        const color = `hsla(${currentHue}, 95%, 55%, 1)`;
        const glow = `hsla(${currentHue}, 95%, 55%, 0.38)`;

        // Proximity calculation for dynamic light reactivity
        const distanceToCursor = Math.hypot(mousePos.current.x - screenX, mousePos.current.y - screenY);
        const proximityIntensity = Math.max(0, 1 - distanceToCursor / 160);
        const activeGlowScale = 1 + proximityIntensity * 0.9;

        return {
          ...node,
          x: screenX,
          y: screenY,
          z: z2,
          scale,
          opacity: (z2 + radius * 1.5) / (radius * 2.5),
          color,
          glow,
          activeGlowScale,
          proximityIntensity,
        };
      });

      // Z-sort
      projectedNodes.sort((a, b) => b.z - a.z);
      setNodes(projectedNodes);

      // Clear Canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Draw subtle holographic background grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.015)';
      ctx.lineWidth = 0.5;
      const gridSize = 40;
      for (let x = 0; x < dimensions.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + targetParallaxX * 0.05, 0);
        ctx.lineTo(x + targetParallaxX * 0.05, dimensions.height);
        ctx.stroke();
      }
      for (let y = 0; y < dimensions.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + targetParallaxY * 0.05);
        ctx.lineTo(dimensions.width, y + targetParallaxY * 0.05);
        ctx.stroke();
      }

      // Shimmer ambient particle hum
      pulseProgress = (pulseProgress + 0.015) % 1;
      const waveSync = Math.sin(pulseProgress * Math.PI * 2);
      const pulseMultiplier = 1 + Math.max(0, waveSync) * 0.5;

      ambientParticles.current.forEach((p) => {
        p.y -= p.speedY;
        if (p.y < 0) p.y = dimensions.height;

        p.driftPhase += 0.008;
        p.x += Math.sin(p.driftPhase) * 0.12;

        const shimmerOpacity = (0.12 + Math.sin(time * 2 + p.phase) * 0.08) * pulseMultiplier;
        
        ctx.font = `bold ${p.size * (0.85 + Math.max(0, waveSync) * 0.3)}px var(--font-mono)`;
        ctx.fillStyle = `rgba(0, 240, 255, ${shimmerOpacity})`;
        ctx.fillText(p.char, p.x, p.y);
      });

      // Central core coordinates
      const coreX = cx - targetParallaxX * 0.06;
      const coreY = cy - targetParallaxY * 0.06;

      // Pulse waves emanating from Core
      ctx.strokeStyle = `rgba(0, 240, 255, ${(0.15 * (1 - pulseProgress))})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(coreX, coreY, 30 + pulseProgress * 70, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Center HUD core
      ctx.fillStyle = 'rgba(0, 240, 255, 0.03)';
      ctx.beginPath();
      ctx.arc(coreX, coreY, 26, 0, Math.PI * 2);
      ctx.fill();

      // Core details
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(coreX, coreY, 12, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(coreX, coreY, 40 + Math.sin(Date.now() / 200) * 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw printed circuit board (PCB) style orthogonal traces
      projectedNodes.forEach((node) => {
        const isInteractive = !node.isFiller;
        const lineAlpha = isInteractive
          ? (hoveredNode === node.id ? 0.9 : 0.28 + node.proximityIntensity * 0.22) * node.opacity
          : 0.06 * node.opacity;

        ctx.strokeStyle = isInteractive ? node.color : 'rgba(255, 255, 255, 0.12)';
        ctx.globalAlpha = lineAlpha;
        ctx.lineWidth = isInteractive ? 1.8 + node.proximityIntensity * 0.6 : 0.8;

        // Orthogonal 45/90 degree bends for realistic circuit wires
        ctx.beginPath();
        ctx.moveTo(coreX, coreY);

        const midX = (coreX + node.x) / 2;
        const midY = (coreY + node.y) / 2;

        // Dynamic PCB bend formula
        const bendX = coreX + (node.x - coreX) * 0.45;
        const bendY = coreY;

        ctx.lineTo(bendX, bendY);
        ctx.lineTo(node.x, node.y);
        ctx.stroke();

        // Draw solder joints/junctions along the circuit lines
        if (isInteractive) {
          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(bendX, bendY, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw pulsing photon beam (glowing comet trail)
        if (isInteractive) {
          ctx.globalAlpha = node.opacity;
          ctx.fillStyle = node.color;
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 8 + node.proximityIntensity * 6;

          const t = (pulseProgress + node.theta / (Math.PI * 2)) % 1;
          
          // Interpolate along the segmented path
          let px, py;
          if (t < 0.45) {
            const nt = t / 0.45;
            px = coreX + (bendX - coreX) * nt;
            py = coreY;
          } else {
            const nt = (t - 0.45) / 0.55;
            px = bendX + (node.x - bendX) * nt;
            py = bendY + (node.y - bendY) * nt;
          }

          // Main photon head
          ctx.beginPath();
          ctx.arc(px, py, 3 + node.proximityIntensity * 1.5, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw comet tail trail
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 2 + node.proximityIntensity;
          ctx.beginPath();
          ctx.moveTo(px, py);
          
          // Simple reverse tail
          const tailSize = 15;
          let tx = px - (node.x - coreX) * 0.05;
          let ty = py - (node.y - coreY) * 0.05;
          ctx.lineTo(tx, ty);
          ctx.stroke();
          
          ctx.shadowBlur = 0;
        }
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, isDragging, hoveredNode]);

  // Drag handles
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
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

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
        background: 'rgba(10, 12, 16, 0.45)',
        border: '1px solid rgba(0, 240, 255, 0.06)',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
        backdropFilter: 'blur(12px)',
        boxShadow: 'inset 0 0 25px rgba(0, 240, 255, 0.03)',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Corner UI brackets (sci-fi HUD overlay style) */}
      <div style={{ position: 'absolute', top: 12, left: 12, width: 8, height: 8, borderTop: '2px solid rgba(0, 240, 255, 0.3)', borderLeft: '2px solid rgba(0, 240, 255, 0.3)' }} />
      <div style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderTop: '2px solid rgba(0, 240, 255, 0.3)', borderRight: '2px solid rgba(0, 240, 255, 0.3)' }} />
      <div style={{ position: 'absolute', bottom: 12, left: 12, width: 8, height: 8, borderBottom: '2px solid rgba(0, 240, 255, 0.3)', borderLeft: '2px solid rgba(0, 240, 255, 0.3)' }} />
      <div style={{ position: 'absolute', bottom: 12, right: 12, width: 8, height: 8, borderBottom: '2px solid rgba(0, 240, 255, 0.3)', borderRight: '2px solid rgba(0, 240, 255, 0.3)' }} />

      {/* Floating System coordinates */}
      <div style={{ position: 'absolute', top: 12, left: 28, fontFamily: 'var(--font-mono)', fontSize: '0.52rem', color: 'rgba(0, 240, 255, 0.35)', letterSpacing: '0.1em' }}>
        SYS_STATUS // CONST_ACTIVE
      </div>

      <div style={{ position: 'absolute', top: 12, right: 28, fontFamily: 'var(--font-mono)', fontSize: '0.52rem', color: 'rgba(0, 240, 255, 0.35)', letterSpacing: '0.1em' }}>
        LAT: 27.7172 / LNG: 85.3240
      </div>

      {/* HUD background spinning circle */}
      <div 
        style={{
          position: 'absolute',
          width: '76%',
          height: '76%',
          border: '1.2px dashed rgba(0, 240, 255, 0.05)',
          borderRadius: '50%',
          pointerEvents: 'none',
          animation: 'spin 180s linear infinite',
        }}
      />
      
      {/* 3D background canvas layer */}
      <canvas 
        ref={canvasRef} 
        width={dimensions.width} 
        height={dimensions.height}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
        }}
      />

      {/* HTML interactive layer projected in 3D */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {nodes.map((node) => {
          if (node.isFiller) {
            return (
              <div
                key={node.id}
                style={{
                  position: 'absolute',
                  left: node.x,
                  top: node.y,
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: node.color,
                  transform: `translate(-50%, -50%) scale(${node.scale})`,
                  opacity: node.opacity * 0.45,
                  pointerEvents: 'none',
                  boxShadow: `0 0 6px ${node.color}`,
                }}
              />
            );
          }

          const isHovered = hoveredNode === node.id;

          // Glowing shadow calculation with interactive proximity boost
          const shadowBlurRadius = (isHovered ? 34 : 12 + node.proximityIntensity * 16) * node.activeGlowScale;

          return (
            <div
              key={node.id}
              style={{
                position: 'absolute',
                left: node.x,
                top: node.y,
                transform: `translate(-50%, -50%) scale(${node.scale * (isHovered ? 1.25 : 1)})`,
                opacity: node.opacity,
                zIndex: Math.round(100 + node.z),
                pointerEvents: 'auto',
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <a
                href={node.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="holographic-orb-node"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'rgba(8, 10, 14, 0.95)',
                  border: `2px solid ${isHovered ? node.color : 'rgba(255, 255, 255, 0.12)'}`,
                  color: isHovered ? node.color : 'var(--ink-mid)',
                  boxShadow: `0 0 ${shadowBlurRadius}px ${node.glow}, inset 0 0 12px ${node.glow}`,
                  cursor: 'pointer',
                  fontSize: '1.4rem',
                  position: 'relative',
                  backdropFilter: 'blur(8px)',
                  transition: 'border-color 0.25s, color 0.25s, box-shadow 0.25s',
                }}
              >
                {node.icon}

                {/* Target reticle ticks inside node */}
                <div style={{ position: 'absolute', top: '10%', left: '50%', width: '1px', height: '4px', background: isHovered ? node.color : 'rgba(255,255,255,0.1)', transform: 'translateX(-50%)' }} />
                <div style={{ position: 'absolute', bottom: '10%', left: '50%', width: '1px', height: '4px', background: isHovered ? node.color : 'rgba(255,255,255,0.1)', transform: 'translateX(-50%)' }} />
                <div style={{ position: 'absolute', left: '10%', top: '50%', height: '1px', width: '4px', background: isHovered ? node.color : 'rgba(255,255,255,0.1)', transform: 'translateY(-50%)' }} />
                <div style={{ position: 'absolute', right: '10%', top: '50%', height: '1px', width: '4px', background: isHovered ? node.color : 'rgba(255,255,255,0.1)', transform: 'translateY(-50%)' }} />

                {/* Rotating HUD circle rings */}
                {isHovered && (
                  <motion.div
                    layoutId={`hud-ring-${node.id}`}
                    style={{
                      position: 'absolute',
                      inset: -6,
                      borderRadius: '50%',
                      border: `1.2px dashed ${node.color}`,
                      opacity: 0.85,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                  />
                )}
              </a>

              {/* Hologram details card */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      bottom: '66px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '154px',
                      background: 'rgba(6, 8, 12, 0.97)',
                      border: `1px solid ${node.color}`,
                      borderRadius: '8px',
                      padding: '8px 12px',
                      boxShadow: `0 8px 24px rgba(0,0,0,0.7), 0 0 16px ${node.glow}`,
                      pointerEvents: 'none',
                      textAlign: 'center',
                      zIndex: 200,
                    }}
                  >
                    <div 
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(to bottom, transparent 50%, ${node.glow} 50%)`,
                        backgroundSize: '100% 4px',
                        opacity: 0.12,
                        borderRadius: '7px',
                      }}
                    />
                    <div style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {node.label}
                    </div>
                    <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--ink)', marginTop: '2px' }}>
                      {node.handle}
                    </div>
                    <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: node.color, marginTop: '4px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '4px' }}>
                      {node.detail}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Interactive HUD drag prompt */}
      <div 
        style={{
          position: 'absolute',
          bottom: '10px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          color: 'rgba(0, 240, 255, 0.3)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <span style={{ display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(0, 240, 255, 0.5)', animation: 'pulse 1.5s infinite' }} />
        Hold & Drag to Rotate Hologram
      </div>
    </div>
  );
}
