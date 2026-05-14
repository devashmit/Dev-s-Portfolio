import { useEffect } from 'react';

export default function RippleEffect() {
  useEffect(() => {
    function createRipple(clientX, clientY) {
      let ripple = document.createElement("div");
      ripple.classList.add("ripple");
      ripple.style.top = clientY + "px";
      ripple.style.left = clientX + "px";
      document.body.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    }

    const handleClick = (ev) => {
      // Don't ripple on links/buttons to avoid interfering too much, or do it everywhere.
      createRipple(ev.clientX, ev.clientY);
    };

    const handleTouch = (ev) => {
      if (ev.touches.length > 0) {
        createRipple(ev.touches[0].clientX, ev.touches[0].clientY);
      }
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleTouch, { passive: true });

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  return null;
}
