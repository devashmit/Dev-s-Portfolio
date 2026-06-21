import React, { useEffect, useState } from 'react';

const logs = [
  "INITIALIZING SECURE CONNECTION...",
  "ESTABLISHING HANDSHAKE PROTOCOLS...",
  "BYPASSING LOCAL DEFIANCE FIRESWALLS...",
  "LOADING CORE MODULES AND SHADERS...",
  "DECRYPTING PROFILE ENVELOPE...",
  "BIOMETRIC AND CRYPTO SCAN COMPLETE.",
  "DECRYPTED DATA STREAM SECURED.",
  "VERIFYING LOCAL IDENTITY..."
];

export default function SystemText() {
  const [currentLogs, setCurrentLogs] = useState([]);
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < logs.length) {
        setCurrentLogs((prev) => [...prev, logs[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="preloader-system-text" aria-live="polite">
      {currentLogs.map((log, idx) => (
        <div key={idx} className="system-log-line">
          <span className="log-prefix">&gt;</span> {log}
        </div>
      ))}
      <div className="system-log-line active-line">
        <span className="log-prefix">&gt;</span> <span className="blinking-cursor">█</span>
      </div>
    </div>
  );
}
