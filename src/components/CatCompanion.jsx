import { useEffect, useRef } from 'react';

export default function CatCompanion() {
  const catRef = useRef(null);

  useEffect(() => {
    const cat = catRef.current;
    if (!cat) return;

    // We don't use Framer Motion here because GSAP is perfect for this specific follower logic 
    // and we already imported GSAP or we can just use manual requestAnimationFrame for the cat.
    // To minimize dependencies since we moved to Framer Motion, we can implement it with pure JS requestAnimationFrame.

    const runningGif = '/cat/running-run.gif';
    const staticImage = '/cat/catani1.png';
    const actionImage = '/cat/catani2.png';

    let isActing = false;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let catX = lastX;
    let catY = lastY;
    let catRotation = 0;
    let catScaleX = 1;
    let catScale = 1;
    let moveTimeout;

    cat.style.transform = `translate(-50%, -50%) translate(${catX}px, ${catY}px) rotate(${catRotation}deg) scale(${catScaleX * catScale}, ${catScale})`;

    function updateCat(clientX, clientY) {
      if (isActing) return;

      const dx = clientX - catX;
      const dy = clientY - catY;
      
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        catRotation = Math.atan2(dy, dx) * (180 / Math.PI);
        catScaleX = dx > 0 ? -1 : 1; 
        
        cat.style.backgroundImage = `url(${runningGif})`;
        
        // Target positions updated
        lastX = clientX;
        lastY = clientY;
      }

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        if (!isActing) {
          cat.style.backgroundImage = `url(${staticImage})`;
        }
      }, 300);
    }

    const onMouseMove = (e) => updateCat(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches.length > 0) updateCat(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onClick = () => {
      if (isActing) return;
      isActing = true;
      
      cat.style.backgroundImage = `url(${actionImage})`;
      
      // Simple jump animation
      const startY = catY;
      let start = null;
      
      const animateJump = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        
        if (progress < 200) {
          catScale = 1.4;
          catY = startY - 20;
          requestAnimationFrame(animateJump);
        } else if (progress < 400) {
          catScale = 1;
          catY = startY;
          requestAnimationFrame(animateJump);
        } else {
          isActing = false;
          cat.style.backgroundImage = `url(${staticImage})`;
        }
      };
      
      requestAnimationFrame(animateJump);
    };

    let animationFrameId;
    const render = () => {
      if (!isActing) {
        catX += (lastX - catX) * 0.05;
        catY += (lastY - catY) * 0.05;
      }
      cat.style.transform = `translate(-50%, -50%) translate(${catX}px, ${catY}px) rotate(${catRotation}deg) scale(${catScaleX * catScale}, ${catScale})`;
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onTouchMove);
      document.addEventListener('click', onClick);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(moveTimeout);
    };
  }, []);

  return <div id="cat" ref={catRef}></div>;
}
