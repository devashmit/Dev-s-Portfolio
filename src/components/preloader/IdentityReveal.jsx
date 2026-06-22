import React from 'react';
import { motion } from 'framer-motion';

export default function IdentityReveal({ progress, activeLogs = [], isLoaded, onComplete }) {
  return (
    <div className="glass-compiler-card">

      {/* Details Header */}
      <div className="identity-details">
        <h1 className="identity-name">ASHMIT DEV</h1>
        <h2 className="identity-role">FULL STACK DEVELOPER</h2>
      </div>

      <div className="compiler-divider"></div>

      {/* Terminal logs panel */}
      <div className="compiler-terminal">
        {activeLogs.map((log, idx) => {
          const isActive = idx === activeLogs.length - 1;
          return (
            <div key={idx} className={`compiler-log-line ${isActive ? 'active' : ''}`}>
              <span className="log-prefix">&gt;</span>
              {log}
            </div>
          );
        })}
        {activeLogs.length === 0 && (
          <div className="compiler-log-line">
            <span className="log-prefix">&gt;</span>
            <span className="blinking-cursor">▮</span>
          </div>
        )}
      </div>

      {/* Progress & Launch Button Area */}
      <div className="compiler-ready-container">
        {!isLoaded ? (
          <div className="compiler-progress-wrapper">
            <div className="compiler-progress-track">
              <div 
                className="compiler-progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="compiler-progress-meta">
              <span>COMPILING SYSTEM</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        ) : (
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="preloader-cta-btn" 
            onClick={onComplete}
          >
            Launch Interface <span className="btn-arrow">→</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}
