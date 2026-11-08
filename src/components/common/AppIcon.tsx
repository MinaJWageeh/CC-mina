import React from 'react';

interface AppIconProps {
  className?: string;
  size?: number;
}

export const AppIcon: React.FC<AppIconProps> = ({ className = 'w-8 h-8', size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
      width={size}
      height={size}
    >
      <defs>
        <radialGradient id="app-icon-bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="60%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>

        <linearGradient id="app-icon-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="35%" stopColor="#0284c7" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>

        <linearGradient id="app-icon-bolt" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#38bdf8" />
          <stop offset="65%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>

        <linearGradient id="app-icon-core" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>

        <filter id="app-icon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Hex Shield Frame */}
      <path
        d="M 256 24 L 444 86 A 32 32 0 0 1 464 116 L 464 300 A 48 48 0 0 1 436 344 L 268 480 A 24 24 0 0 1 244 480 L 76 344 A 48 48 0 0 1 48 300 L 48 116 A 32 32 0 0 1 68 86 Z"
        fill="url(#app-icon-bg)"
        stroke="url(#app-icon-ring)"
        strokeWidth="14"
      />

      {/* Background Circuit Traces */}
      <g stroke="#0284c7" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" fill="none">
        <line x1="160" y1="90" x2="160" y2="140" />
        <line x1="256" y1="65" x2="256" y2="130" />
        <line x1="352" y1="90" x2="352" y2="140" />
        <circle cx="160" cy="90" r="7" fill="#38bdf8" />
        <circle cx="256" cy="65" r="7" fill="#38bdf8" />
        <circle cx="352" cy="90" r="7" fill="#38bdf8" />
      </g>

      {/* Contactor Terminals & Contacts */}
      <g opacity="0.8">
        <circle cx="180" cy="170" r="9" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" />
        <circle cx="256" cy="160" r="9" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" />
        <circle cx="332" cy="170" r="9" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" />
        <line x1="160" y1="210" x2="352" y2="210" stroke="#f59e0b" strokeWidth="7" strokeLinecap="round" strokeDasharray="14 8" />
        <circle cx="180" cy="250" r="9" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
        <circle cx="256" cy="260" r="9" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
        <circle cx="332" cy="250" r="9" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
      </g>

      {/* Center Stylized Lightning Bolt */}
      <polygon
        points="280,60 140,260 250,260 190,450 372,220 262,220"
        fill="url(#app-icon-bolt)"
        filter="url(#app-icon-glow)"
      />

      {/* Core Specular Highlight */}
      <polygon
        points="274,75 160,250 255,250 205,420 350,230 255,230"
        fill="url(#app-icon-core)"
        opacity="0.85"
      />

      {/* Solder / Spark Flares */}
      <circle cx="250" cy="260" r="9" fill="#ffffff" />
      <circle cx="270" cy="180" r="5" fill="#ffffff" />
    </svg>
  );
};
