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
      
      // Flip based on direction
      if (Math.abs(dx) > 5) {
        catScaleX = dx > 0 ? -1 : 1; 
      }

      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        cat.style.backgroundImage = `url(${runningGif})`;
        
        lastX = clientX;
        lastY = clientY;
      }

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        if (!isActing) {
          cat.style.backgroundImage = `url(${staticImage})`;
        }
      }, 150); // Faster return to static
    }

    const onMouseMove = (e) => updateCat(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches.length > 0) updateCat(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchStart = (e) => {
      if (e.touches.length > 0) updateCat(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onClick = () => {
      if (isActing) return;
      isActing = true;
      
      cat.style.backgroundImage = `url(${actionImage})`;
      
      const startY = catY;
      let start = null;
      
      const animateJump = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        
        if (progress < 250) {
          catScale = 1.3;
          catY = startY - 30;
          requestAnimationFrame(animateJump);
        } else if (progress < 500) {
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

    // On mobile, scrolling is the primary interaction. 
    // Let's make the cat react to scrolling.
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const scrollDiff = window.scrollY - lastScrollY;
      lastY += scrollDiff * 0.1; // Cat drifts slightly with scroll
      lastScrollY = window.scrollY;
    };

    let animationFrameId;
    const render = () => {
      if (!isActing) {
        // Slower, smoother following
        catX += (lastX - catX) * 0.04;
        catY += (lastY - catY) * 0.04;
      }
      cat.style.transform = `translate(-50%, -50%) translate(${catX}px, ${catY}px) scale(${catScaleX * catScale}, ${catScale})`;
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('click', onClick);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('click', onClick);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(moveTimeout);
    };
  }, []);

  return <div id="cat" ref={catRef}></div>;
}
