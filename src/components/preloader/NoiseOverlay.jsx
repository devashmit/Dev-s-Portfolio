import React from 'react';

export default function NoiseOverlay() {
  return (
    <div className="preloader-noise-container" aria-hidden="true">
      <div className="preloader-grain"></div>
      <div className="preloader-scanlines"></div>
      <div className="preloader-vignette"></div>
    </div>
  );
}
