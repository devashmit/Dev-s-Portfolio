import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Custom cursor now enabled on all devices to allow cat to follow it

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onPointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
      if (dot.classList.contains('hidden')) {
        dot.classList.remove('hidden');
        ring.style.opacity = '1';
      }
    };

    const onPointerLeave = () => {
      dot.classList.add('hidden');
      ring.style.opacity = '0';
    };

    const onPointerEnter = () => {
      dot.classList.remove('hidden');
      ring.style.opacity = '1';
    };

    window.addEventListener('pointermove', onPointerMove);
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    document.documentElement.addEventListener('pointerenter', onPointerEnter);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .bento-card, .btn');
    
    const handleHoverEnter = () => {
      ring.classList.add('hover');
    };
    const handleHoverLeave = () => {
      ring.classList.remove('hover');
    };

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverEnter);
      el.addEventListener('mouseleave', handleHoverLeave);
    });

    let animationFrameId;
    const render = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      document.documentElement.removeEventListener('pointerenter', onPointerEnter);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverEnter);
        el.removeEventListener('mouseleave', handleHoverLeave);
      });
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} aria-hidden="true" className="hidden"></div>
      <div id="cursor-ring" ref={ringRef} aria-hidden="true" style={{ opacity: 0 }}></div>
    </>
  );
}
