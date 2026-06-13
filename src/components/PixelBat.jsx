import React from 'react';
import './PixelBat.css';

export default function PixelBat() {
  return (
    <div className="forward-bat-wrapper">
      <svg 
        width="64" 
        height="64" 
        viewBox="0 0 15 9" 
        fill="#54556b" 
        xmlns="http://www.w3.org/2000/svg"
        className="forward-bat-svg"
      >
        <path d="M2 0h1v1H2zm10 0h1v1h-1zM1 1h3v1H1zm10 0h3v1h-3zM0 2h5v1H0zm10 0h5v1h-5zM0 3h15v1H0zM1 4h13v1H1zM6 5h3v1H6zM6 6h1v1H6zm2 0h1v1H8z"/>
        <rect x="5" y="3" width="1" height="1" fill="#ff5f56" />
        <rect x="9" y="3" width="1" height="1" fill="#ff5f56" />
      </svg>
    </div>
  );
}
