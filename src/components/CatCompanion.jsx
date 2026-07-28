import { useEffect, useRef, useState } from 'react';

export default function CatCompanion() {
  const catRef = useRef(null);
  const toyRef = useRef(null);

  useEffect(() => {
    const cat = catRef.current;
    const toy = toyRef.current;
    if (!cat || !toy) return;

    const runningGif = '/cat/running-run.gif';
    const staticImage = '/cat/catani1.png';
    const actionImage = '/cat/catani2.png';

    let isActing = false;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let catX = lastX;
    let catY = lastY;
    let catScaleX = 1;
    let catScale = 1;
    let moveTimeout;

    // Interactive Toy variables
    let toyActive = false;
    let toyType = 'ball'; // alternates between 'ball' and 'rat'
    let toyX = lastX;
    let toyY = lastY;
    let mouseX = lastX;
    let mouseY = lastY;

    cat.style.transform = `translate(-50%, -50%) translate(${catX}px, ${catY}px) scale(${catScaleX * catScale}, ${catScale})`;

    const handleSummonToy = () => {
      toyActive = true;
      // Alternate between ball and rat toy modes dynamically
      toyType = Math.random() < 0.5 ? 'ball' : 'rat';
      
      if (toy) {
        toy.style.display = 'block';
        toy.style.backgroundImage = `url(${toyType === 'ball' ? '/cat/ball-run.gif' : '/cat/rat-run.gif'})`;
        toyX = mouseX;
        toyY = mouseY;
        toy.style.transform = `translate(-50%, -50%) translate(${toyX}px, ${toyY}px)`;
      }
    };

    // Bind custom summon event emitted from SystemConsole.jsx
    document.addEventListener('cat:summon_toy', handleSummonToy);

    function updateCat(clientX, clientY) {
      if (isActing) return;

      const dx = clientX - catX;
      const dy = clientY - catY;
      
      lastX = clientX;
      lastY = clientY;

      // Flip cat image based on relative move direction
      if (Math.abs(dx) > 4) {
        catScaleX = dx > 0 ? -1 : 1; 
      }

      // Play running gif on movement
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

    const onPointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      updateCat(e.clientX, e.clientY);
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

    let animationFrameId;
    const render = () => {
      // Track and animate the toy first
      if (toyActive) {
        toyX += (mouseX - toyX) * 0.22; // smooth spring lag to the cursor
        toyY += (mouseY - toyY) * 0.22;
        if (toy) {
          toy.style.transform = `translate(-50%, -50%) translate(${toyX}px, ${toyY}px)`;
        }
      }

      // Cat chase pathing AI
      if (!isActing) {
        const targetX = toyActive ? toyX : lastX;
        const targetY = toyActive ? toyY : lastY;
        
        // Pursue toy faster than the cursor
        const chaseSpeed = toyActive ? 0.085 : 0.06;
        catX += (targetX - catX) * chaseSpeed;
        catY += (targetY - catY) * chaseSpeed;
      }

      // Keep cat outside the active game window/workspace if it exists
      const isPlayingGame = document.querySelector('.game-canvas');
      const gameBox = isPlayingGame 
        ? document.querySelector('.ide-window') 
        : document.querySelector('.game-canvas, .physics-canvas, .canvas-container');

      if (gameBox) {
        const rect = gameBox.getBoundingClientRect();
        const margin = isPlayingGame ? 65 : 55; // Keep the cat fully outside the IDE frame or game canvas
        const boxLeft = rect.left - margin;
        const boxRight = rect.right + margin;
        const boxTop = rect.top - margin;
        const boxBottom = rect.bottom + margin;

        if (isPlayingGame && Math.random() < 0.01) {
          console.log("COLLISION DEBUG:", {
            isPlayingGame: !!isPlayingGame,
            gameBoxClass: gameBox.className,
            rect,
            catX,
            catY,
            boxLeft,
            boxRight,
            boxTop,
            boxBottom
          });
        }

        if (catX > boxLeft && catX < boxRight && catY > boxTop && catY < boxBottom) {
          const dl = catX - boxLeft;
          const dr = boxRight - catX;
          const dt = catY - boxTop;
          const db = boxBottom - catY;
          const minDist = Math.min(dl, dr, dt, db);
          if (minDist === dl) {
            catX = boxLeft;
          } else if (minDist === dr) {
            catX = boxRight;
          } else if (minDist === dt) {
            catY = boxTop;
          } else {
            catY = boxBottom;
          }
        }
      }

      // Position the cat companion
      cat.style.transform = `translate(-50%, -50%) translate(${catX}px, ${catY}px) scale(${catScaleX * catScale}, ${catScale})`;

      // Collision boundary evaluation (Toy Catching Easter Egg)
      if (toyActive && !isActing) {
        const dx = toyX - catX;
        const dy = toyY - catY;
        const dist = Math.hypot(dx, dy);

        if (dist < 28) {
          isActing = true;
          cat.style.backgroundImage = `url(${actionImage})`;
          
          // Play catching sound chimes!
          const chime = new Audio('/cat/cat-aud.mp3');
          chime.volume = 0.2;
          chime.play().catch(() => {}); // catch silent autoplay restrictions

          // Celebration hop
          const startY = catY;
          let start = null;
          const animateCatchHop = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            if (progress < 250) {
              catScale = 1.35;
              catY = startY - 32;
              requestAnimationFrame(animateCatchHop);
            } else if (progress < 500) {
              catScale = 1;
              catY = startY;
              requestAnimationFrame(animateCatchHop);
            } else {
              isActing = false;
              cat.style.backgroundImage = `url(${staticImage})`;
              
              // Deactivate and hide toy
              toyActive = false;
              if (toy) {
                toy.style.display = 'none';
              }
            }
          };
          requestAnimationFrame(animateCatchHop);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    window.addEventListener('pointermove', onPointerMove);
    document.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('click', onClick);
      document.removeEventListener('cat:summon_toy', handleSummonToy);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(moveTimeout);
    };
  }, []);

  return (
    <>
      <div id="cat" ref={catRef}>
        <div className="cat-hud-target">
          <svg viewBox="0 0 100 100" className="cat-hud-svg">
            <circle cx="50" cy="50" r="40" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="6,4" fill="none" />
            <circle cx="50" cy="50" r="28" stroke="var(--accent)" strokeWidth="0.75" strokeDasharray="2,2" fill="none" opacity="0.4" />
            <path d="M 50 8 L 50 16 M 50 84 L 50 92 M 8 50 L 16 50 M 84 50 L 92 50" stroke="var(--accent)" strokeWidth="1.5" opacity="0.8" />
          </svg>
        </div>
      </div>
      
      {/* Target summon toy follower */}
      <div 
        id="cat-toy" 
        ref={toyRef} 
        style={{ 
          display: 'none', 
          position: 'fixed', 
          left: 0, 
          top: 0, 
          width: '45px', 
          height: '45px', 
          zIndex: 9998, 
          pointerEvents: 'none', 
          backgroundSize: 'contain', 
          backgroundRepeat: 'no-repeat', 
          backgroundPosition: 'center', 
          filter: 'drop-shadow(0 0 10px var(--accent))' 
        }} 
      />
    </>
  );
}
