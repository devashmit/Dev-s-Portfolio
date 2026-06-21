import React from 'react';

export default function IdentityReveal() {
  return (
    <div className="identity-reveal-container">
      {/* Verification State */}
      <div className="identity-status-wrapper">
        <span className="identity-badge-glow"></span>
        <span className="identity-status-text">IDENTITY DETECTED</span>
      </div>

      {/* Holographic Central Emblem */}
      <div className="identity-emblem-wrapper">
        <div className="concentric-ring ring-outer"></div>
        <div className="concentric-ring ring-middle"></div>
        <div className="concentric-ring ring-inner"></div>
        
        {/* Emblem Core SVG */}
        <div className="emblem-core">
          <svg viewBox="0 0 100 100" width="80" height="80" className="emblem-svg">
            {/* Sci-fi geometric emblem: overlapping triangles & hexagon */}
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" className="emblem-poly-outer" />
            <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" className="emblem-poly-inner" />
            <circle cx="50" cy="50" r="10" className="emblem-circle-core" />
            <path d="M 50,15 L 50,85 M 20,32 L 80,68 M 20,68 L 80,32" className="emblem-grid-lines" />
          </svg>
        </div>
      </div>

      {/* Primary Bio Info */}
      <div className="identity-details">
        <h1 className="identity-name">ASHMIT DEV</h1>
        <h2 className="identity-role">FULL STACK DEVELOPER</h2>
        <p className="identity-description">
          Building scalable, high-performance digital experiences.
        </p>
      </div>

      {/* Final Action Controls */}
      <div className="identity-actions">
        <button className="preloader-cta-btn" onClick={() => {
          // Immediately dispatch completion
          document.dispatchEvent(new CustomEvent('preloader:complete'));
        }}>
          Explore My Work <span className="btn-arrow">→</span>
        </button>

        <div className="scroll-indicator-wrapper">
          <div className="mouse-icon">
            <div className="mouse-wheel"></div>
          </div>
          <span className="scroll-text">SYSTEM READY</span>
        </div>
      </div>
    </div>
  );
}
