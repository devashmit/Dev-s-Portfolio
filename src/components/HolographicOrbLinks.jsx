import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

// Main interactive nodes + decoration constellation nodes
const initialNodes = [
  { 
    id: 'github', 
    label: 'GitHub', 
    icon: <FaGithub />, 
    href: 'https://github.com/devashmit', 
    handle: 'devashmit', 
    detail: '5.2k Followers', 
    color: 'rgba(0, 240, 255, 1)', 
    glow: 'rgba(0, 240, 255, 0.4)',
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
    color: 'rgba(0, 136, 255, 1)', 
    glow: 'rgba(0, 136, 255, 0.4)',
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
    color: 'rgba(0, 255, 136, 1)', 
    glow: 'rgba(0, 255, 136, 0.4)',
    theta: (4 * Math.PI) / 3, 
    phi: Math.PI / 2 
  },
  // Constellation filler nodes to construct a complete sphere
  { id: 'f1', isFiller: true, color: 'rgba(0, 240, 255, 0.6)', theta: Math.PI / 4, phi: Math.PI / 4 },
  { id: 'f2', isFiller: true, color: 'rgba(0, 136, 255, 0.6)', theta: Math.PI / 3, phi: 3 * Math.PI / 4 },
  { id: 'f3', isFiller: true, color: 'rgba(0, 255, 136, 0.6)', theta: 5 * Math.PI / 4, phi: Math.PI / 3 },
  { id: 'f4', isFiller: true, color: 'rgba(250, 204, 21, 0.6)', theta: 7 * Math.PI / 6, phi: 2 * Math.PI / 3 },
  { id: 'f5', isFiller: true, color: 'rgba(0, 240, 255, 0.6)', theta: 3 * Math.PI / 2, phi: Math.PI / 4 },
  { id: 'f6', isFiller: true, color: 'rgba(0, 255, 136, 0.6)', theta: Math.PI / 6, phi: 5 * Math.PI / 6 },
];

export default function HolographicOrbLinks() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0, y: 0.8 }); // starting angles
  const rotationSpeed = useRef({ x: 0.002, y: 0.005 });
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  // Update canvas boundaries responsively
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = Math.min(window.innerWidth - 32, 720);
        const height = window.innerWidth < 640 ? 320 : 420;
        setDimensions({ width, height });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute 3D Projection & Run Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Pulse properties for circuit beams
    let pulseProgress = 0;

    const renderLoop = () => {
      // 1. Handle auto-rotation decay or steady rotation
      if (!isDragging) {
        const dragFactor = hoveredNode ? 0.05 : 1; // slow down significantly on hover
        rotation.current.y += rotationSpeed.current.y * dragFactor;
        rotation.current.x += rotationSpeed.current.x * dragFactor;
      }

      const cx = dimensions.width / 2;
      const cy = dimensions.height / 2;
      const radius = Math.min(dimensions.width, dimensions.height) * 0.38;
      const cameraDistance = 380;

      // Sin/Cos values for 3D rotations on X and Y axis
      const cosX = Math.cos(rotation.current.x);
      const sinX = Math.sin(rotation.current.x);
      const cosY = Math.cos(rotation.current.y);
      const sinY = Math.sin(rotation.current.y);

      // Project all nodes
      const projectedNodes = initialNodes.map((node) => {
        // Spherical to Cartesian coordinates
        let x = radius * Math.sin(node.phi) * Math.cos(node.theta);
        let y = radius * Math.sin(node.phi) * Math.sin(node.theta);
        let z = radius * Math.cos(node.phi);

        // Apply rotation on Y axis
        let x1 = x * cosY - z * sinY;
        let z1 = x * sinY + z * cosY;

        // Apply rotation on X axis
        let y2 = y * cosX - z1 * sinX;
        let z2 = y * sinX + z1 * cosX;

        // Perspective projection formula
        const scale = cameraDistance / (cameraDistance + z2);
        const screenX = cx + x1 * scale;
        const screenY = cy + y2 * scale;

        return {
          ...node,
          x: screenX,
          y: screenY,
          z: z2,
          scale,
          opacity: (z2 + radius * 1.5) / (radius * 2.5),
        };
      });

      // Sort by Z depth (back-to-front rendering)
      projectedNodes.sort((a, b) => b.z - a.z);
      setNodes(projectedNodes);

      // 2. Canvas drawing: connections & background circuits
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      ctx.lineWidth = 1;

      // Draw outer rotating orbits
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.25, 0, Math.PI * 2);
      ctx.stroke();

      // Pulsing grid scanlines (aesthetic hologram layer)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < dimensions.height; i += 8) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(dimensions.width, i);
        ctx.stroke();
      }

      // Draw Center HUD core
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fill();

      // Central core outer dotted HUD ring
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy, 48 + Math.sin(Date.now() / 300) * 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. Draw connection lines between Central Core and projected nodes
      pulseProgress = (pulseProgress + 0.015) % 1;

      projectedNodes.forEach((node) => {
        const isInteractive = !node.isFiller;
        const lineAlpha = isInteractive
          ? (hoveredNode === node.id ? 0.75 : 0.25) * node.opacity
          : 0.1 * node.opacity;

        ctx.strokeStyle = isInteractive ? node.color : 'rgba(255, 255, 255, 0.2)';
        ctx.globalAlpha = lineAlpha;
        ctx.lineWidth = isInteractive ? 1.5 : 0.8;

        // Draw dynamic network circuit path (curved bezier wire)
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        
        // Control point adds a nice orbital bend
        const midX = (cx + node.x) / 2 + Math.sin(node.theta + rotation.current.y) * 20;
        const midY = (cy + node.y) / 2 + Math.cos(node.theta + rotation.current.x) * 20;
        
        ctx.quadraticCurveTo(midX, midY, node.x, node.y);
        ctx.stroke();

        // 4. Draw pulsing data packet beams (photons) traveling along circuits
        if (isInteractive) {
          ctx.globalAlpha = node.opacity;
          ctx.fillStyle = node.color;
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 8;

          // Calculate point on Bezier curve
          const t = (pulseProgress + node.theta / (Math.PI * 2)) % 1;
          const px = (1 - t) * (1 - t) * cx + 2 * (1 - t) * t * midX + t * t * node.x;
          const py = (1 - t) * (1 - t) * cy + 2 * (1 - t) * t * midY + t * t * node.y;

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
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

  // Drag handlers
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
        margin: '2rem auto 0 auto',
        userSelect: 'none',
        touchAction: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(15, 17, 21, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.03)',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
        backdropFilter: 'blur(8px)',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* HUD background grid circle */}
      <div 
        style={{
          position: 'absolute',
          width: '80%',
          height: '80%',
          border: '1px dashed rgba(0, 240, 255, 0.06)',
          borderRadius: '50%',
          pointerEvents: 'none',
          animation: 'spin 120s linear infinite',
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

      {/* Pulsing HUD center core */}
      <div 
        className="hud-core-center"
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          background: '#00f0ff',
          borderRadius: '50%',
          boxShadow: '0 0 16px #00f0ff',
          pointerEvents: 'none',
        }}
      />

      {/* HTML interactive layer projected in 3D */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {nodes.map((node) => {
          if (node.isFiller) {
            // Render small background dots in 3D space
            return (
              <div
                key={node.id}
                style={{
                  position: 'absolute',
                  left: node.x,
                  top: node.y,
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: node.color,
                  transform: `translate(-50%, -50%) scale(${node.scale})`,
                  opacity: node.opacity * 0.4,
                  pointerEvents: 'none',
                  boxShadow: `0 0 8px ${node.color}`,
                }}
              />
            );
          }

          const isHovered = hoveredNode === node.id;

          return (
            <div
              key={node.id}
              style={{
                position: 'absolute',
                left: node.x,
                top: node.y,
                transform: `translate(-50%, -50%) scale(${node.scale * (isHovered ? 1.2 : 1)})`,
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
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(15, 17, 21, 0.85)',
                  border: `2px solid ${isHovered ? node.color : 'rgba(255, 255, 255, 0.15)'}`,
                  color: isHovered ? node.color : 'var(--ink-mid)',
                  boxShadow: isHovered 
                    ? `0 0 25px ${node.glow}, inset 0 0 12px ${node.glow}`
                    : '0 4px 12px rgba(0, 0, 0, 0.3)',
                  cursor: 'pointer',
                  fontSize: '1.7rem',
                  position: 'relative',
                  backdropFilter: 'blur(4px)',
                  transition: 'border-color 0.3s, color 0.3s, box-shadow 0.3s',
                }}
              >
                {node.icon}

                {/* Animated outer ring orbits */}
                {isHovered && (
                  <motion.div
                    layoutId={`hud-ring-${node.id}`}
                    style={{
                      position: 'absolute',
                      inset: -8,
                      borderRadius: '50%',
                      border: `1.5px dashed ${node.color}`,
                      opacity: 0.8,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                  />
                )}
              </a>

              {/* Holographic Tooltip Data Card */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      bottom: '76px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '160px',
                      background: 'rgba(10, 12, 16, 0.95)',
                      border: `1px solid ${node.color}`,
                      borderRadius: '8px',
                      padding: '8px 12px',
                      boxShadow: `0 8px 24px rgba(0,0,0,0.6), 0 0 12px ${node.glow}`,
                      pointerEvents: 'none',
                      textAlign: 'center',
                      zIndex: 200,
                    }}
                  >
                    {/* Scanner line animation */}
                    <div 
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(to bottom, transparent 50%, ${node.glow} 50%)`,
                        backgroundSize: '100% 4px',
                        opacity: 0.15,
                        borderRadius: '7px',
                      }}
                    />
                    <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {node.label}
                    </div>
                    <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--ink)', marginTop: '2px' }}>
                      {node.handle}
                    </div>
                    <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: node.color, marginTop: '4px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '4px' }}>
                      {node.detail}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Floating Drag Prompt HUD indicator */}
      <div 
        style={{
          position: 'absolute',
          bottom: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          color: 'rgba(255, 255, 255, 0.25)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.3)', animation: 'pulse 1.5s infinite' }} />
        Hold & Drag to Rotate Hologram
      </div>
    </div>
  );
}
