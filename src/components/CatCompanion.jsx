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
      
      // Always update target coordinates
      lastX = clientX;
      lastY = clientY;

      // Flip based on direction
      if (Math.abs(dx) > 5) {
        catScaleX = dx > 0 ? -1 : 1; 
      }

      // Only change to running animation if there's significant movement
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        cat.style.backgroundImage = `url(${runningGif})`;
      }

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        if (!isActing) {
          cat.style.backgroundImage = `url(${staticImage})`;
        }
      }, 150);
    }

    const onPointerMove = (e) => updateCat(e.clientX, e.clientY);

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

    let animationFrameId;
    const render = () => {
      if (!isActing) {
        // Tuned following speed (0.06) to stay close to the 'black spot'
        catX += (lastX - catX) * 0.06;
        catY += (lastY - catY) * 0.06;
      }
      cat.style.transform = `translate(-50%, -50%) translate(${catX}px, ${catY}px) scale(${catScaleX * catScale}, ${catScale})`;
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    window.addEventListener('pointermove', onPointerMove);
    document.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(moveTimeout);
    };
  }, []);

  return (
    <div id="cat" ref={catRef}>
      <div className="cat-hud-target">
        <svg viewBox="0 0 100 100" className="cat-hud-svg">
          <circle cx="50" cy="50" r="40" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="6,4" fill="none" />
          <circle cx="50" cy="50" r="28" stroke="var(--accent)" strokeWidth="0.75" strokeDasharray="2,2" fill="none" opacity="0.4" />
          <path d="M 50 8 L 50 16 M 50 84 L 50 92 M 8 50 L 16 50 M 84 50 L 92 50" stroke="var(--accent)" strokeWidth="1.5" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
}
