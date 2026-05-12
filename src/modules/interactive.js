export function initInteractive() {
  // Ripple effect
  function createRipple(clientX, clientY) {
    let ripple = document.createElement("div")
    ripple.classList.add("ripple");
    ripple.style.top = clientY + "px";
    ripple.style.left = clientX + "px";
    document.body.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove())
  }

  window.addEventListener("click", ev => {
    createRipple(ev.clientX, ev.clientY);
  });
  window.addEventListener("touchstart", ev => {
    // Only create ripple on first touch
    if (ev.touches.length > 0) {
      createRipple(ev.touches[0].clientX, ev.touches[0].clientY);
    }
  }, { passive: true });

  // Cat companion
  const cat = document.getElementById('cat');
  if (!cat) return;
  const runningGif = '/cat/running-run.gif';
  const staticImage = '/cat/catani1.png';
  let catMoveTimeout;

  function handleCatMove(event) {
    let clientX, clientY;
    if (event.touches && event.touches.length > 0) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else if (event.clientX !== undefined) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      return;
    }

    const catRect = cat.getBoundingClientRect();
    const catX = catRect.left + catRect.width / 2;
    const catY = catRect.top + catRect.height / 2;

    const directionX = clientX - catX;
    const directionY = clientY - catY;

    const angle = Math.atan2(directionY, directionX);
    const angleDegrees = angle * (180 / Math.PI);

    cat.style.transform = `translate(-50%, -50%) rotate(${angleDegrees}deg) scaleX(-1)`;
    cat.style.backgroundImage = `url(${runningGif})`;
    
    cat.style.left = clientX + 'px';
    cat.style.top = clientY + 'px';

    clearTimeout(catMoveTimeout);
    catMoveTimeout = setTimeout(() => {
      cat.style.backgroundImage = `url(${staticImage})`;
      cat.style.transform = `translate(-50%, -50%) rotate(${angleDegrees}deg) scaleX(-1)`; 
    }, 1500); // 1.5s to match the running CSS transition
  }

  document.addEventListener('click', handleCatMove);

  // Theme Toggle
  const toggleButton = document.querySelector("#color-mode");
  const root = document.documentElement;
  const storageKey = "color-mode";

  // Load from local storage
  const savedMode = localStorage.getItem(storageKey);
  if (savedMode === "light-mode") {
    root.classList.add("light-mode");
  }

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      root.classList.toggle("light-mode");
      
      if (root.classList.contains("light-mode")) {
        localStorage.setItem(storageKey, "light-mode");
      } else {
        localStorage.setItem(storageKey, "dark-mode");
      }
    });
  }
}
