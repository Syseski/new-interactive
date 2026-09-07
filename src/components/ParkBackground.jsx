import React from 'react';

export default function ParkBackground({ orientation = 'portrait' }) {
  const isLandscape = orientation === 'landscape';

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      <svg
        viewBox={isLandscape ? "0 0 1600 900" : "0 0 1080 1527"}
        preserveAspectRatio="none"
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="40%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>

          <linearGradient id="grassGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>

          <linearGradient id="grassGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>

          <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="50%" stopColor="#ffedd5" />
            <stop offset="100%" stopColor="#fde047" stopOpacity="0.4" />
          </linearGradient>

          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Sky */}
        <rect width="100%" height="100%" fill="url(#skyGrad)" />

        {/* Sun and Glow */}
        <circle cx={isLandscape ? "800" : "540"} cy="80" r="140" fill="#fef08a" opacity="0.4" />
        <circle cx={isLandscape ? "800" : "540"} cy="80" r="85" fill="#fde047" opacity="0.8" />

        {/* Rainbow Arc */}
        <g opacity="0.6">
          <ellipse cx={isLandscape ? "800" : "540"} cy="250" rx={isLandscape ? "450" : "360"} ry={isLandscape ? "240" : "190"} fill="none" stroke="#f87171" strokeWidth="12" />
          <ellipse cx={isLandscape ? "800" : "540"} cy="250" rx={isLandscape ? "438" : "348"} ry={isLandscape ? "228" : "178"} fill="none" stroke="#fbbf24" strokeWidth="12" />
          <ellipse cx={isLandscape ? "800" : "540"} cy="250" rx={isLandscape ? "426" : "336"} ry={isLandscape ? "216" : "166"} fill="none" stroke="#60a5fa" strokeWidth="12" />
        </g>

        {/* Hot Air Balloon */}
        <g transform={isLandscape ? "translate(1300, 100) scale(0.75)" : "translate(880, 110) scale(0.65)"}>
          <ellipse cx="60" cy="60" rx="45" ry="55" fill="#f97316" />
          <path d="M 30 60 Q 60 20 90 60 Q 60 100 30 60" fill="#fbbf24" />
          <ellipse cx="60" cy="60" rx="15" ry="55" fill="#3b82f6" />
          <polygon points="40,110 80,110 70,130 50,130" fill="#78350f" />
          <line x1="35" y1="100" x2="48" y2="110" stroke="#78350f" strokeWidth="2" />
          <line x1="85" y1="100" x2="72" y2="110" stroke="#78350f" strokeWidth="2" />
        </g>

        {/* Clouds */}
        <g fill="#ffffff" opacity="0.85">
          <circle cx="160" cy="90" r="45" />
          <circle cx="210" cy="80" r="55" />
          <circle cx="270" cy="95" r="40" />
          <ellipse cx="210" cy="110" rx="80" ry="25" />

          <circle cx={isLandscape ? "1150" : "750"} cy="180" r="35" />
          <circle cx={isLandscape ? "1190" : "790"} cy="170" r="45" />
          <circle cx={isLandscape ? "1240" : "840"} cy="185" r="35" />
        </g>

        {/* Rolling Green Hills (Back) */}
        <path
          d={
            isLandscape
              ? "M 0 350 Q 400 220 800 320 T 1600 280 L 1600 900 L 0 900 Z"
              : "M 0 380 Q 270 260 540 340 T 1080 300 L 1080 1527 L 0 1527 Z"
          }
          fill="url(#grassGrad1)"
        />

        {/* Trees in background */}
        <g fill="#15803d" opacity="0.9">
          <circle cx="90" cy={isLandscape ? "330" : "360"} r="60" />
          <circle cx="160" cy={isLandscape ? "340" : "370"} r="50" />
          <circle cx={isLandscape ? "1520" : "1010"} cy={isLandscape ? "300" : "330"} r="70" />
          <circle cx={isLandscape ? "1450" : "940"} cy={isLandscape ? "320" : "350"} r="55" />
        </g>

        {/* Main Rolling Foreground Hill */}
        <path
          d={
            isLandscape
              ? "M 0 450 Q 500 350 1100 440 T 1600 420 L 1600 900 L 0 900 Z"
              : "M 0 520 Q 350 420 750 510 T 1080 490 L 1080 1527 L 0 1527 Z"
          }
          fill="url(#grassGrad2)"
        />

        {/* Winding Sandy Road / Path */}
        {isLandscape ? (
          // Landscape path curving smoothly across width
          <path
            d="M 120 280 C 600 270 1100 280 1480 320 C 1580 460 1400 560 1150 550 C 700 540 300 550 150 630 C 100 780 400 780 750 780 C 1100 780 1350 790 1480 790"
            fill="none"
            stroke="#fde68a"
            strokeWidth="110"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        ) : (
          // Portrait path curving back and forth through the 4 rows (like in the screenshot)
          <path
            d="M 220 280 C 580 270 850 280 920 320 C 1000 370 1020 540 920 620 C 700 680 360 670 200 720 C 100 780 100 920 220 980 C 450 1020 850 1010 930 1060 C 1020 1120 980 1280 900 1330 C 750 1370 420 1370 220 1370"
            fill="none"
            stroke="#fed7aa"
            strokeWidth="155"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.92"
          />
        )}

        {/* Path texture highlight / footprints */}
        {!isLandscape && (
          <path
            d="M 220 280 C 580 270 850 280 920 320 C 1000 370 1020 540 920 620 C 700 680 360 670 200 720 C 100 780 100 920 220 980 C 450 1020 850 1010 930 1060 C 1020 1120 980 1280 900 1330 C 750 1370 420 1370 220 1370"
            fill="none"
            stroke="#fef3c7"
            strokeWidth="24"
            strokeDasharray="18 28"
            strokeLinecap="round"
            opacity="0.7"
          />
        )}

        {/* Bicycle riders on the path (matching the screenshot between rows 1 and 2) */}
        {!isLandscape && (
          <g transform="translate(420, 500) scale(0.65)">
            {/* Lamp Post on left of path */}
            <g transform="translate(-120, -50)">
              <rect x="0" y="30" width="8" height="120" fill="#334155" />
              <polygon points="-8,30 16,30 12,10 -4,10" fill="#334155" />
              <circle cx="4" cy="20" r="10" fill="#fef08a" opacity="0.8" />
            </g>

            {/* Rider 1 (Blue shirt) */}
            <g transform="translate(20, 0)">
              {/* Bike Wheels */}
              <circle cx="20" cy="70" r="22" fill="none" stroke="#1e293b" strokeWidth="4" />
              <circle cx="80" cy="70" r="22" fill="none" stroke="#1e293b" strokeWidth="4" />
              {/* Bike Frame */}
              <line x1="20" y1="70" x2="48" y2="70" stroke="#3b82f6" strokeWidth="4" />
              <line x1="48" y1="70" x2="38" y2="45" stroke="#3b82f6" strokeWidth="4" />
              <line x1="80" y1="70" x2="60" y2="35" stroke="#3b82f6" strokeWidth="4" />
              <line x1="38" y1="45" x2="60" y2="42" stroke="#3b82f6" strokeWidth="4" />
              {/* Kid */}
              <circle cx="50" cy="15" r="14" fill="#fed7aa" />
              <path d="M 38 12 Q 50 0 62 12 Z" fill="#f59e0b" /> {/* Helmet */}
              <rect x="42" y="27" width="16" height="24" rx="4" fill="#60a5fa" /> {/* Shirt */}
            </g>

            {/* Rider 2 (Pink/Red shirt) */}
            <g transform="translate(110, 10)">
              {/* Bike Wheels */}
              <circle cx="20" cy="70" r="22" fill="none" stroke="#1e293b" strokeWidth="4" />
              <circle cx="80" cy="70" r="22" fill="none" stroke="#1e293b" strokeWidth="4" />
              {/* Bike Frame */}
              <line x1="20" y1="70" x2="48" y2="70" stroke="#ef4444" strokeWidth="4" />
              <line x1="48" y1="70" x2="38" y2="45" stroke="#ef4444" strokeWidth="4" />
              <line x1="80" y1="70" x2="60" y2="35" stroke="#ef4444" strokeWidth="4" />
              <line x1="38" y1="45" x2="60" y2="42" stroke="#ef4444" strokeWidth="4" />
              {/* Kid */}
              <circle cx="50" cy="15" r="14" fill="#fed7aa" />
              <path d="M 38 12 Q 50 0 62 12 Z" fill="#10b981" /> {/* Helmet */}
              <rect x="42" y="27" width="16" height="24" rx="4" fill="#f43f5e" /> {/* Shirt */}
            </g>
          </g>
        )}

        {/* Playground Slide Set (Bottom Left in screenshot) */}
        <g transform={isLandscape ? "translate(80, 580) scale(0.7)" : "translate(220, 1140) scale(0.85)"}>
          {/* Platform & roof */}
          <polygon points="60,0 120,0 90,-40" fill="#ef4444" />
          <rect x="65" y="0" width="50" height="40" fill="#3b82f6" />
          {/* Pillars */}
          <rect x="65" y="40" width="8" height="60" fill="#f59e0b" />
          <rect x="107" y="40" width="8" height="60" fill="#f59e0b" />
          {/* Yellow Slide */}
          <path d="M 65 30 C 30 30 0 70 -30 95 L -20 100 C 10 80 35 45 65 40 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        </g>

        {/* Picnic Mat & Basket (Bottom Right in screenshot) */}
        <g transform={isLandscape ? "translate(1380, 550) scale(0.8)" : "translate(820, 1140) scale(0.85)"}>
          {/* Red-white checkered picnic mat */}
          <polygon points="0,40 120,10 160,60 40,90" fill="#fee2e2" stroke="#f87171" strokeWidth="3" />
          <line x1="30" y1="32" x2="70" y2="82" stroke="#ef4444" strokeWidth="3" />
          <line x1="60" y1="25" x2="100" y2="75" stroke="#ef4444" strokeWidth="3" />
          <line x1="90" y1="18" x2="130" y2="68" stroke="#ef4444" strokeWidth="3" />
          {/* Basket */}
          <rect x="55" y="30" width="40" height="28" rx="4" fill="#b45309" />
          <path d="M 65 30 Q 75 10 85 30" fill="none" stroke="#78350f" strokeWidth="3" />
          {/* Watermelon / Fruit slice */}
          <path d="M 105 50 Q 120 60 125 45 Z" fill="#ef4444" />
        </g>

        {/* Red Finish Flag at Z */}
        <g transform={isLandscape ? "translate(1420, 720) scale(0.9)" : "translate(180, 1310) scale(0.9)"}>
          <line x1="20" y1="0" x2="20" y2="65" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          <polygon points="20,0 65,15 20,30" fill="#ef4444" />
          <circle cx="20" cy="0" r="5" fill="#f59e0b" />
        </g>

        {/* Lush Greenery / Shrubs / Flowers at sides */}
        <g fill="#16a34a">
          {/* Left bushes */}
          <circle cx="0" cy={isLandscape ? "500" : "850"} r="90" />
          <circle cx="40" cy={isLandscape ? "580" : "960"} r="80" />
          <circle cx="0" cy={isLandscape ? "700" : "1150"} r="95" />
          {/* Right bushes */}
          <circle cx={isLandscape ? "1600" : "1080"} cy={isLandscape ? "450" : "750"} r="90" />
          <circle cx={isLandscape ? "1560" : "1030"} cy={isLandscape ? "600" : "880"} r="85" />
          <circle cx={isLandscape ? "1600" : "1080"} cy={isLandscape ? "750" : "1250"} r="110" />
        </g>

        {/* Flower accents */}
        <g fill="#ffffff">
          <circle cx="45" cy={isLandscape ? "520" : "880"} r="8" fill="#f43f5e" />
          <circle cx="65" cy={isLandscape ? "550" : "920"} r="7" fill="#ffffff" />
          <circle cx="50" cy={isLandscape ? "650" : "1100"} r="9" fill="#fbbf24" />
          <circle cx={isLandscape ? "1540" : "1020"} cy={isLandscape ? "480" : "800"} r="8" fill="#ffffff" />
          <circle cx={isLandscape ? "1530" : "1010"} cy={isLandscape ? "650" : "940"} r="9" fill="#f43f5e" />
        </g>
      </svg>
    </div>
  );
}
