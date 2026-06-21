import React from 'react';

export default function HUD() {
  return (
    <div className="preloader-hud-container" aria-hidden="true">
      {/* HUD Corners */}
      <div className="hud-corner top-left"></div>
      <div className="hud-corner top-right"></div>
      <div className="hud-corner bottom-left"></div>
      <div className="hud-corner bottom-right"></div>

      {/* Cross Dual-Laser scan lines */}
      <div className="hud-laser-scanner horiz"></div>
      <div className="hud-laser-scanner vert"></div>

      {/* Top Header */}
      <div className="hud-top-header">
        <span className="hud-system-title glitch-hover" data-text="ASHMIT DEV • CORE SYSTEM BOOT v5.02">
          ASHMIT DEV • CORE SYSTEM BOOT v5.02
        </span>
      </div>

      {/* Sidebar / Peripheral Telemetry */}
      <div className="hud-telemetry left-side">
        <div className="telemetry-item"><span className="telemetry-label">SYS_STATUS:</span> <span className="telemetry-value text-glow">BOOTING</span></div>
        <div className="telemetry-item"><span className="telemetry-label">SECURE_LINK:</span> <span className="telemetry-value">ESTABLISHED</span></div>
        <div className="telemetry-item"><span className="telemetry-label">NODE:</span> <span className="telemetry-value">NX-709</span></div>
        <div className="telemetry-item"><span className="telemetry-label">PORT:</span> <span className="telemetry-value">443/TLS</span></div>
        
        {/* Animated telemetry waveform (equalizer) */}
        <div className="hud-equalizer">
          <div className="eq-bar"></div>
          <div className="eq-bar"></div>
          <div className="eq-bar"></div>
          <div className="eq-bar"></div>
          <div className="eq-bar"></div>
          <div className="eq-bar"></div>
          <div className="eq-bar"></div>
          <div className="eq-bar"></div>
        </div>
      </div>

      <div className="hud-telemetry right-side">
        <div className="telemetry-item"><span className="telemetry-label">ENCRYPTION:</span> <span className="telemetry-value">RSA_4096</span></div>
        <div className="telemetry-item"><span className="telemetry-label">LOC:</span> <span className="telemetry-value">VERIFIED</span></div>
        <div className="telemetry-item"><span className="telemetry-label">BLOOM:</span> <span className="telemetry-value text-glow">ACTIVE</span></div>
        <div className="telemetry-item"><span className="telemetry-label">FPS:</span> <span className="telemetry-value text-glow">60.00</span></div>

        {/* Animated telemetry waveform (equalizer) */}
        <div className="hud-equalizer right-aligned">
          <div className="eq-bar"></div>
          <div className="eq-bar"></div>
          <div className="eq-bar"></div>
          <div className="eq-bar"></div>
          <div className="eq-bar"></div>
          <div className="eq-bar"></div>
          <div className="eq-bar"></div>
          <div className="eq-bar"></div>
        </div>
      </div>
    </div>
  );
}
