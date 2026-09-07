import React from 'react';

// Illustrated SVG drawings for all 26 letters (Malay Phonics)
export function PhonicsIllustration({ letter, className = "w-10 h-10", size = 48 }) {
  const char = (letter || 'a').toLowerCase();

  switch (char) {
    case 'a': // Ayam (Rooster / Chicken)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ayamBody" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE047" />
              <stop offset="1" stopColor="#EAB308" />
            </linearGradient>
            <linearGradient id="combGrad" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#EF4444" />
              <stop offset="1" stopColor="#B91C1C" />
            </linearGradient>
          </defs>
          {/* Comb (Crest) */}
          <path d="M42 22C42 16 48 14 52 18C56 12 64 14 65 20C69 16 75 18 73 25C71 28 65 30 62 30Z" fill="url(#combGrad)" />
          {/* Tail Feathers */}
          <path d="M22 45C12 38 10 24 20 20C26 28 30 38 32 46Z" fill="#F97316" />
          <path d="M16 52C8 46 8 34 16 30C22 38 26 48 26 55Z" fill="#EF4444" />
          <path d="M20 60C12 58 10 48 18 44C24 50 28 58 28 62Z" fill="#0EA5E9" />
          {/* Main Body */}
          <ellipse cx="50" cy="56" rx="28" ry="24" fill="url(#ayamBody)" stroke="#CA8A04" strokeWidth="2.5" />
          {/* Wing */}
          <path d="M36 54C36 44 48 42 56 48C60 56 52 68 40 66C36 64 36 58 36 54Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          {/* Head & Neck */}
          <circle cx="64" cy="38" r="16" fill="url(#ayamBody)" stroke="#CA8A04" strokeWidth="2.5" />
          {/* Eye */}
          <circle cx="68" cy="34" r="4.5" fill="#1E293B" />
          <circle cx="69.5" cy="32.5" r="1.5" fill="#FFFFFF" />
          {/* Rosy Cheek */}
          <ellipse cx="62" cy="42" rx="3.5" ry="2.5" fill="#F87171" opacity="0.7" />
          {/* Beak */}
          <polygon points="76,34 88,39 76,44" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
          {/* Wattle */}
          <path d="M72 44C76 48 74 54 70 54C67 54 66 48 70 44Z" fill="url(#combGrad)" />
          {/* Legs */}
          <path d="M44 78L44 88M44 88L38 92M44 88L48 92" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M56 78L56 88M56 88L50 92M56 88L60 92" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'b': // Bola (Soccer / Beach ball)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="ballShine" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </radialGradient>
            <linearGradient id="ballBlue" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="ballRed" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#F87171" />
              <stop offset="1" stopColor="#DC2626" />
            </linearGradient>
            <linearGradient id="ballYellow" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#FDE047" />
              <stop offset="1" stopColor="#EAB308" />
            </linearGradient>
          </defs>
          {/* Outer Sphere */}
          <circle cx="50" cy="50" r="42" fill="url(#ballShine)" stroke="#1E293B" strokeWidth="3.5" />
          {/* Star / Beach Panels */}
          {/* Center Pentagon */}
          <polygon points="50,32 64,42 59,58 41,58 36,42" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
          {/* Connecting lines & Colored patches */}
          <path d="M50 32L50 10C56 12 66 16 74 24L64 42Z" fill="url(#ballBlue)" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M64 42L88 44C91 52 90 62 84 72L59 58Z" fill="url(#ballRed)" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M59 58L68 88C58 92 46 92 36 86L41 58Z" fill="url(#ballYellow)" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M41 58L16 70C10 60 10 50 14 40L36 42Z" fill="url(#ballBlue)" stroke="#1E293B" strokeWidth="2.5" />
          <path d="M36 42L18 20C26 13 38 9 50 10Z" fill="url(#ballRed)" stroke="#1E293B" strokeWidth="2.5" />
          {/* Highlight gloss */}
          <ellipse cx="36" cy="26" rx="14" ry="7" transform="rotate(-30 36 26)" fill="#FFFFFF" opacity="0.6" />
        </svg>
      );

    case 'c': // Cawan (Cup)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cupGrad" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#60A5FA" />
              <stop offset="1" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="saucerGrad" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#93C5FD" />
              <stop offset="1" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>
          {/* Steam */}
          <path d="M36 22C34 16 40 12 36 6" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <path d="M48 20C46 12 52 8 48 2" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
          <path d="M60 22C58 16 64 12 60 6" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          {/* Saucer */}
          <ellipse cx="48" cy="84" rx="38" ry="8" fill="url(#saucerGrad)" stroke="#1E3A8A" strokeWidth="2.5" />
          <ellipse cx="48" cy="82" rx="30" ry="5" fill="#DBEAFE" />
          {/* Cup Handle */}
          <path d="M68 40C80 40 84 62 68 66" fill="none" stroke="#2563EB" strokeWidth="7" strokeLinecap="round" />
          <path d="M68 40C80 40 84 62 68 66" fill="none" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" />
          {/* Cup Body */}
          <path d="M24 32H72L66 74C65 79 58 82 48 82C38 82 31 79 30 74L24 32Z" fill="url(#cupGrad)" stroke="#1E3A8A" strokeWidth="3" />
          {/* Cup Rim / Liquid */}
          <ellipse cx="48" cy="32" rx="24" ry="6" fill="#78350F" stroke="#1E3A8A" strokeWidth="2.5" />
          <ellipse cx="48" cy="33" rx="20" ry="4" fill="#92400E" />
          {/* Cute Heart on Cup */}
          <path d="M48 58C48 58 40 52 40 46C40 42 43 40 46 42C48 44 48 44 48 44C48 44 48 44 50 42C53 40 56 42 56 46C56 52 48 58 48 58Z" fill="#F43F5E" />
          {/* Gloss shine */}
          <path d="M28 38L32 70" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case 'd': // Dadu (Dice)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 3D Isometric Dice */}
          {/* Top Face */}
          <polygon points="50,14 82,28 50,44 18,28" fill="#F8FAFC" stroke="#334155" strokeWidth="3" strokeLinejoin="round" />
          {/* Right Face */}
          <polygon points="82,28 82,68 50,86 50,44" fill="#CBD5E1" stroke="#334155" strokeWidth="3" strokeLinejoin="round" />
          {/* Left Face */}
          <polygon points="18,28 50,44 50,86 18,68" fill="#E2E8F0" stroke="#334155" strokeWidth="3" strokeLinejoin="round" />
          {/* Pips - Top Face (1 Big Red Pip) */}
          <ellipse cx="50" cy="29" rx="5" ry="3.5" fill="#EF4444" />
          {/* Pips - Left Face (3 Pips) */}
          <ellipse cx="28" cy="42" rx="3.5" ry="4.5" fill="#1E293B" />
          <ellipse cx="34" cy="56" rx="3.5" ry="4.5" fill="#1E293B" />
          <ellipse cx="40" cy="70" rx="3.5" ry="4.5" fill="#1E293B" />
          {/* Pips - Right Face (2 Pips) */}
          <ellipse cx="64" cy="48" rx="3.5" ry="4.5" fill="#1E293B" />
          <ellipse cx="70" cy="68" rx="3.5" ry="4.5" fill="#1E293B" />
        </svg>
      );

    case 'e': // Epal (Apple)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="appleGrad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#F87171" />
              <stop offset="40%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#991B1B" />
            </radialGradient>
          </defs>
          {/* Stem */}
          <path d="M50 28C50 18 56 12 62 10" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          {/* Leaf */}
          <path d="M52 20C62 14 74 18 76 26C66 28 56 24 52 20Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
          {/* Apple Body */}
          <path d="M50 32C42 22 20 24 16 46C12 68 28 88 44 88C48 88 50 84 50 84C50 84 52 88 56 88C72 88 88 68 84 46C80 24 58 22 50 32Z" fill="url(#appleGrad)" stroke="#7F1D1D" strokeWidth="3" />
          {/* Specular Highlight */}
          <ellipse cx="32" cy="42" rx="8" ry="14" transform="rotate(-30 32 42)" fill="#FFFFFF" opacity="0.55" />
          <circle cx="26" cy="60" r="3" fill="#FFFFFF" opacity="0.4" />
        </svg>
      );

    case 'f': // Feri (Ferry Boat)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ferryHull" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#EF4444" />
              <stop offset="1" stopColor="#B91C1C" />
            </linearGradient>
          </defs>
          {/* Smoke */}
          <circle cx="62" cy="16" r="4" fill="#E2E8F0" opacity="0.8" />
          <circle cx="66" cy="10" r="6" fill="#CBD5E1" opacity="0.6" />
          {/* Chimney / Funnel */}
          <rect x="58" y="24" width="10" height="14" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          <rect x="56" y="22" width="14" height="4" rx="1" fill="#1E293B" />
          {/* Upper Cabin */}
          <rect x="28" y="36" width="46" height="20" rx="4" fill="#FFFFFF" stroke="#334155" strokeWidth="2.5" />
          {/* Windows */}
          <rect x="34" y="42" width="8" height="8" rx="2" fill="#38BDF8" />
          <rect x="47" y="42" width="8" height="8" rx="2" fill="#38BDF8" />
          <rect x="60" y="42" width="8" height="8" rx="2" fill="#38BDF8" />
          {/* Ferry Hull */}
          <path d="M12 58H88L80 80C78 84 74 86 68 86H28C22 86 18 84 16 80L12 58Z" fill="url(#ferryHull)" stroke="#7F1D1D" strokeWidth="3" />
          {/* Hull Stripe */}
          <path d="M14 66H86" stroke="#FFFFFF" strokeWidth="3" />
          {/* Ocean Waves */}
          <path d="M6 86C14 82 22 90 30 86C38 82 46 90 54 86C62 82 70 90 78 86C86 82 94 88 98 86" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'g': // Gajah (Elephant)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="eleGrad" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#93C5FD" />
              <stop offset="1" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
          {/* Body */}
          <ellipse cx="56" cy="56" rx="28" ry="22" fill="url(#eleGrad)" stroke="#2563EB" strokeWidth="2.5" />
          {/* Legs */}
          <rect x="38" y="68" width="10" height="20" rx="4" fill="#60A5FA" stroke="#2563EB" strokeWidth="2" />
          <rect x="52" y="70" width="10" height="18" rx="4" fill="#3B82F6" stroke="#2563EB" strokeWidth="2" />
          <rect x="66" y="68" width="10" height="20" rx="4" fill="#60A5FA" stroke="#2563EB" strokeWidth="2" />
          {/* Tail */}
          <path d="M82 54C88 58 86 68 84 72" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
          {/* Head */}
          <circle cx="34" cy="46" r="18" fill="url(#eleGrad)" stroke="#2563EB" strokeWidth="2.5" />
          {/* Trunk */}
          <path d="M24 50C16 54 12 44 14 36C15 32 18 32 18 36C16 42 22 46 26 44" fill="#60A5FA" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
          {/* Tusk */}
          <path d="M26 56C20 56 18 52 18 50C22 50 26 52 26 56Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
          {/* Big Ear */}
          <path d="M38 34C48 34 52 46 48 56C44 64 36 62 34 54Z" fill="#BFDBFE" stroke="#2563EB" strokeWidth="2" />
          {/* Eye */}
          <circle cx="28" cy="40" r="3" fill="#1E293B" />
          <circle cx="29" cy="39" r="1" fill="#FFFFFF" />
          {/* Rosy Cheek */}
          <circle cx="32" cy="48" r="3" fill="#F472B6" opacity="0.6" />
        </svg>
      );

    case 'h': // Harimau (Tiger)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tigerGrad" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#FB923C" />
              <stop offset="1" stopColor="#EA580C" />
            </linearGradient>
          </defs>
          {/* Ears */}
          <circle cx="30" cy="28" r="12" fill="url(#tigerGrad)" stroke="#9A3412" strokeWidth="2.5" />
          <circle cx="30" cy="28" r="6" fill="#FEE2E2" />
          <circle cx="70" cy="28" r="12" fill="url(#tigerGrad)" stroke="#9A3412" strokeWidth="2.5" />
          <circle cx="70" cy="28" r="6" fill="#FEE2E2" />
          {/* Head */}
          <ellipse cx="50" cy="54" rx="34" ry="28" fill="url(#tigerGrad)" stroke="#9A3412" strokeWidth="3" />
          {/* Tiger Stripes */}
          {/* Forehead stripes */}
          <polygon points="50,30 46,38 54,38" fill="#1E293B" />
          <polygon points="40,32 38,40 44,38" fill="#1E293B" />
          <polygon points="60,32 62,40 56,38" fill="#1E293B" />
          {/* Side stripes */}
          <polygon points="20,50 30,52 22,56" fill="#1E293B" />
          <polygon points="80,50 70,52 78,56" fill="#1E293B" />
          {/* Muzzle */}
          <ellipse cx="43" cy="62" rx="9" ry="7" fill="#FFFFFF" />
          <ellipse cx="57" cy="62" rx="9" ry="7" fill="#FFFFFF" />
          {/* Nose & Mouth */}
          <polygon points="47,56 53,56 50,61" fill="#F43F5E" />
          <path d="M44 64C47 67 50 63 50 61C50 63 53 67 56 64" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
          {/* Eyes */}
          <circle cx="38" cy="48" r="5" fill="#1E293B" />
          <circle cx="40" cy="46" r="1.5" fill="#FFFFFF" />
          <circle cx="62" cy="48" r="5" fill="#1E293B" />
          <circle cx="64" cy="46" r="1.5" fill="#FFFFFF" />
          {/* Whiskers */}
          <path d="M22 62H32M22 66H34M78 62H68M78 66H66" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'i': // Ikan (Fish)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fishGrad" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#F97316" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>
          {/* Bubbles */}
          <circle cx="86" cy="30" r="4" fill="#BAE6FD" opacity="0.8" />
          <circle cx="92" cy="20" r="2.5" fill="#BAE6FD" opacity="0.7" />
          {/* Tail Fin */}
          <path d="M28 50L10 32C14 44 14 56 10 68L28 50Z" fill="#F97316" stroke="#C2410C" strokeWidth="2.5" />
          {/* Dorsal Fin */}
          <path d="M42 32C46 18 62 20 68 28Z" fill="#FB923C" stroke="#C2410C" strokeWidth="2" />
          {/* Ventral Fin */}
          <path d="M46 68C50 78 60 76 64 70Z" fill="#FB923C" stroke="#C2410C" strokeWidth="2" />
          {/* Fish Body */}
          <path d="M26 50C34 32 64 30 80 50C64 70 34 68 26 50Z" fill="url(#fishGrad)" stroke="#C2410C" strokeWidth="3" />
          {/* White stripes (Clownfish style) */}
          <path d="M52 34C56 42 56 58 52 66" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <path d="M36 40C38 46 38 54 36 60" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          {/* Eye */}
          <circle cx="70" cy="46" r="5.5" fill="#FFFFFF" stroke="#C2410C" strokeWidth="1.5" />
          <circle cx="71.5" cy="46" r="3" fill="#1E293B" />
          <circle cx="72.5" cy="45" r="1" fill="#FFFFFF" />
          {/* Smiling Mouth */}
          <path d="M78 54C76 56 73 55 72 54" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'j': // Jam (Clock)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="clockBody" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#F43F5E" />
              <stop offset="1" stopColor="#BE123C" />
            </linearGradient>
          </defs>
          {/* Alarm Bells */}
          <ellipse cx="26" cy="24" rx="12" ry="7" transform="rotate(-35 26 24)" fill="#FBBF24" stroke="#B45309" strokeWidth="2.5" />
          <ellipse cx="74" cy="24" rx="12" ry="7" transform="rotate(35 74 24)" fill="#FBBF24" stroke="#B45309" strokeWidth="2.5" />
          {/* Hammer / Top handle */}
          <rect x="46" y="14" width="8" height="8" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
          {/* Feet */}
          <rect x="24" y="78" width="8" height="12" rx="3" transform="rotate(25 24 78)" fill="#475569" />
          <rect x="68" y="78" width="8" height="12" rx="3" transform="rotate(-25 68 78)" fill="#475569" />
          {/* Main Clock Casing */}
          <circle cx="50" cy="54" r="32" fill="url(#clockBody)" stroke="#9F1239" strokeWidth="3.5" />
          {/* Dial Face */}
          <circle cx="50" cy="54" r="24" fill="#FFFFFF" stroke="#334155" strokeWidth="2" />
          {/* Hour markers */}
          <circle cx="50" cy="34" r="1.5" fill="#1E293B" />
          <circle cx="70" cy="54" r="1.5" fill="#1E293B" />
          <circle cx="50" cy="74" r="1.5" fill="#1E293B" />
          <circle cx="30" cy="54" r="1.5" fill="#1E293B" />
          {/* Hands (Pointing to 3:00) */}
          <line x1="50" y1="54" x2="50" y2="38" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="54" x2="64" y2="54" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="54" r="3" fill="#1E293B" />
        </svg>
      );

    case 'k': // Kucing (Cat)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="catGrad" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#FED7AA" />
              <stop offset="1" stopColor="#FB923C" />
            </linearGradient>
          </defs>
          {/* Ears */}
          <polygon points="24,40 32,16 46,32" fill="url(#catGrad)" stroke="#C2410C" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="28,36 34,22 42,32" fill="#FDA4AF" />
          <polygon points="76,40 68,16 54,32" fill="url(#catGrad)" stroke="#C2410C" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="72,36 66,22 58,32" fill="#FDA4AF" />
          {/* Head */}
          <circle cx="50" cy="54" r="30" fill="url(#catGrad)" stroke="#C2410C" strokeWidth="3" />
          {/* Cat Eyes */}
          <ellipse cx="38" cy="48" rx="5" ry="7" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
          <ellipse cx="38" cy="48" rx="2" ry="5.5" fill="#1E293B" />
          <circle cx="39.5" cy="45" r="1.5" fill="#FFFFFF" />
          <ellipse cx="62" cy="48" rx="5" ry="7" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
          <ellipse cx="62" cy="48" rx="2" ry="5.5" fill="#1E293B" />
          <circle cx="63.5" cy="45" r="1.5" fill="#FFFFFF" />
          {/* Nose & Mouth */}
          <polygon points="48,58 52,58 50,61" fill="#F43F5E" />
          <path d="M44 64C47 67 50 63 50 61C50 63 53 67 56 64" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
          {/* Whiskers */}
          <path d="M22 56H34M20 62H34M78 56H66M80 62H66" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" />
          {/* Rosy Cheeks */}
          <circle cx="32" cy="58" r="4" fill="#FDA4AF" opacity="0.6" />
          <circle cx="68" cy="58" r="4" fill="#FDA4AF" opacity="0.6" />
        </svg>
      );

    case 'l': // Lilin (Candle)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
              <stop stopColor="#EF4444" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>
            <linearGradient id="candleGrad" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#A7F3D0" />
              <stop offset="50%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          {/* Glowing Aura */}
          <circle cx="50" cy="24" r="18" fill="#FEF08A" opacity="0.35" />
          {/* Flame */}
          <path d="M50 8C42 18 42 26 50 32C58 26 58 18 50 8Z" fill="url(#flameGrad)" />
          {/* Inner white flame */}
          <ellipse cx="50" cy="25" rx="3" ry="5" fill="#FFFFFF" opacity="0.8" />
          {/* Wick */}
          <line x1="50" y1="32" x2="50" y2="38" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          {/* Candle Body */}
          <rect x="36" y="38" width="28" height="46" rx="4" fill="url(#candleGrad)" stroke="#047857" strokeWidth="2.5" />
          {/* Melted wax drip */}
          <path d="M42 38V48C42 50 45 50 45 48V38" fill="#6EE7B7" />
          {/* Holder / Plate */}
          <ellipse cx="50" cy="84" rx="34" ry="8" fill="#FBBF24" stroke="#B45309" strokeWidth="2.5" />
          <ellipse cx="50" cy="83" rx="26" ry="5" fill="#FDE68A" />
        </svg>
      );

    case 'm': // Mata (Eyes)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="irisGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="70%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </radialGradient>
          </defs>
          {/* Left Eye Sclera */}
          <ellipse cx="32" cy="50" rx="20" ry="18" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
          {/* Left Iris */}
          <circle cx="34" cy="50" r="11" fill="url(#irisGrad)" />
          {/* Left Pupil */}
          <circle cx="34" cy="50" r="6" fill="#0F172A" />
          {/* Specular Sparkles */}
          <circle cx="31" cy="46" r="3.5" fill="#FFFFFF" />
          <circle cx="37" cy="53" r="1.5" fill="#FFFFFF" />
          {/* Left Eyelash / Brow */}
          <path d="M16 38C24 32 38 32 48 38" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />

          {/* Right Eye Sclera */}
          <ellipse cx="68" cy="50" rx="20" ry="18" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
          {/* Right Iris */}
          <circle cx="66" cy="50" r="11" fill="url(#irisGrad)" />
          {/* Right Pupil */}
          <circle cx="66" cy="50" r="6" fill="#0F172A" />
          {/* Specular Sparkles */}
          <circle cx="63" cy="46" r="3.5" fill="#FFFFFF" />
          <circle cx="69" cy="53" r="1.5" fill="#FFFFFF" />
          {/* Right Eyelash / Brow */}
          <path d="M52 38C62 32 76 32 84 38" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'n': // Nasi (Rice Bowl)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bowlGrad" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#F43F5E" />
              <stop offset="1" stopColor="#BE123C" />
            </linearGradient>
          </defs>
          {/* Steam */}
          <path d="M38 24C36 18 42 14 38 8" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <path d="M50 20C48 14 54 10 50 4" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <path d="M62 24C60 18 66 14 62 8" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          {/* Rice Mound */}
          <ellipse cx="50" cy="48" rx="32" ry="20" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
          <circle cx="42" cy="40" r="2" fill="#E2E8F0" />
          <circle cx="52" cy="38" r="2.5" fill="#E2E8F0" />
          <circle cx="60" cy="42" r="2" fill="#E2E8F0" />
          {/* Green Garnish / Peas */}
          <circle cx="48" cy="34" r="3" fill="#22C55E" />
          <circle cx="54" cy="35" r="2.5" fill="#16A34A" />
          {/* Bowl */}
          <path d="M16 48C16 74 30 84 50 84C70 84 84 74 84 48H16Z" fill="url(#bowlGrad)" stroke="#9F1239" strokeWidth="3" />
          {/* Bowl Base */}
          <rect x="38" y="84" width="24" height="6" rx="2" fill="#9F1239" />
          {/* Bowl Pattern */}
          <path d="M22 54H78" stroke="#FDA4AF" strokeWidth="2.5" strokeDasharray="4 4" />
          {/* Chopsticks */}
          <line x1="20" y1="30" x2="80" y2="44" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <line x1="18" y1="36" x2="76" y2="48" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'o': // Oren (Orange Fruit)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="orangeGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FDBA74" />
              <stop offset="40%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#EA580C" />
            </radialGradient>
          </defs>
          {/* Stem & Leaf */}
          <path d="M50 20C50 12 54 8 58 6" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M52 14C64 8 74 12 76 20C64 22 54 18 52 14Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
          {/* Whole Orange */}
          <circle cx="50" cy="54" r="34" fill="url(#orangeGrad)" stroke="#C2410C" strokeWidth="3" />
          {/* Dimple textures */}
          <circle cx="36" cy="46" r="1.5" fill="#C2410C" opacity="0.4" />
          <circle cx="44" cy="62" r="1.5" fill="#C2410C" opacity="0.4" />
          <circle cx="60" cy="52" r="1.5" fill="#C2410C" opacity="0.4" />
          {/* Specular Highlight */}
          <ellipse cx="36" cy="40" rx="8" ry="14" transform="rotate(-30 36 40)" fill="#FFFFFF" opacity="0.5" />
        </svg>
      );

    case 'p': // Pokok (Tree)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#92400E" />
              <stop offset="1" stopColor="#78350F" />
            </linearGradient>
            <radialGradient id="foliageGrad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="60%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#15803D" />
            </radialGradient>
          </defs>
          {/* Ground */}
          <ellipse cx="50" cy="88" rx="36" ry="6" fill="#86EFAC" stroke="#16A34A" strokeWidth="2" />
          {/* Trunk */}
          <path d="M42 54H58L62 88H38L42 54Z" fill="url(#trunkGrad)" stroke="#451A03" strokeWidth="2.5" />
          {/* Tree Foliage Clouds */}
          <circle cx="34" cy="46" r="18" fill="url(#foliageGrad)" stroke="#166534" strokeWidth="2.5" />
          <circle cx="66" cy="46" r="18" fill="url(#foliageGrad)" stroke="#166534" strokeWidth="2.5" />
          <circle cx="38" cy="28" r="16" fill="url(#foliageGrad)" stroke="#166534" strokeWidth="2.5" />
          <circle cx="62" cy="28" r="16" fill="url(#foliageGrad)" stroke="#166534" strokeWidth="2.5" />
          <circle cx="50" cy="22" r="18" fill="url(#foliageGrad)" stroke="#166534" strokeWidth="2.5" />
          <circle cx="50" cy="42" r="22" fill="url(#foliageGrad)" />
          {/* Little Apples on Tree */}
          <circle cx="36" cy="38" r="3.5" fill="#EF4444" />
          <circle cx="60" cy="34" r="3.5" fill="#EF4444" />
          <circle cx="48" cy="48" r="3.5" fill="#EF4444" />
        </svg>
      );

    case 'q': // Qari / Quran Rehal
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bookGrad" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#10B981" />
              <stop offset="1" stopColor="#047857" />
            </linearGradient>
          </defs>
          {/* Wooden Rehal Stand (X-Shape) */}
          <polygon points="18,74 82,74 74,86 26,86" fill="#78350F" stroke="#451A03" strokeWidth="2" />
          <polygon points="26,56 46,74 38,78 18,60" fill="#92400E" />
          <polygon points="74,56 54,74 62,78 82,60" fill="#92400E" />
          {/* Open Book Left Page */}
          <path d="M50 56C36 50 20 54 16 34C30 30 46 36 50 42V56Z" fill="#F8FAFC" stroke="#047857" strokeWidth="2.5" />
          {/* Open Book Right Page */}
          <path d="M50 56C64 50 80 54 84 34C70 30 54 36 50 42V56Z" fill="#F8FAFC" stroke="#047857" strokeWidth="2.5" />
          {/* Book Spine / Cover */}
          <path d="M14 36C28 32 46 38 50 44C54 38 72 32 86 36" stroke="url(#bookGrad)" strokeWidth="4" strokeLinecap="round" />
          {/* Arabic Calligraphy Lines Style */}
          <path d="M24 38C30 38 38 40 44 44" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M22 44C28 44 36 46 44 50" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M56 44C62 40 70 38 76 38" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M56 50C64 46 72 44 78 44" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
          {/* Golden Crescent Icon */}
          <path d="M52 24C48 24 45 21 45 17C45 15 46 13 47 12C43 13 40 16 40 20C40 25 44 29 49 29C52 29 55 27 56 25C54 25 53 24 52 24Z" fill="#FBBF24" />
        </svg>
      );

    case 'r': // Roti (Bread Loaf)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="crustGrad" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#D97706" />
              <stop offset="1" stopColor="#92400E" />
            </linearGradient>
            <linearGradient id="crumbGrad" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#FEF3C7" />
              <stop offset="1" stopColor="#FDE68A" />
            </linearGradient>
          </defs>
          {/* Bread Loaf Back */}
          <path d="M36 34C36 24 64 24 64 34V66H36V34Z" fill="url(#crustGrad)" stroke="#78350F" strokeWidth="2.5" />
          {/* Bread Front Slice */}
          <path d="M24 42C24 28 54 26 58 38C62 26 92 28 92 42C92 56 86 74 76 76H40C30 74 24 56 24 42Z" fill="url(#crustGrad)" stroke="#78350F" strokeWidth="3" />
          {/* Soft Bread Inside */}
          <path d="M30 44C30 34 52 32 58 42C64 32 86 34 86 44C86 54 80 68 72 70H44C36 68 30 54 30 44Z" fill="url(#crumbGrad)" />
          {/* Melting Butter on top */}
          <rect x="50" y="44" width="16" height="10" rx="3" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
          <path d="M52 54C52 58 56 58 56 54" fill="#FBBF24" />
        </svg>
      );

    case 's': // Susu (Milk Bottle & Glass)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#E0F2FE" />
              <stop offset="1" stopColor="#BAE6FD" />
            </linearGradient>
          </defs>
          {/* Milk Bottle Cap */}
          <rect x="30" y="14" width="16" height="6" rx="2" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
          {/* Bottle Neck */}
          <rect x="33" y="20" width="10" height="8" fill="#F0F9FF" stroke="#0284C7" strokeWidth="2" />
          {/* Bottle Body */}
          <path d="M24 34C24 28 32 28 33 28H43C44 28 52 28 52 34V76C52 80 48 84 44 84H32C28 84 24 80 24 76V34Z" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" />
          {/* Milk Label */}
          <rect x="24" y="46" width="28" height="20" fill="#38BDF8" />
          {/* Cute Cow spot / text */}
          <circle cx="34" cy="56" r="4" fill="#FFFFFF" />
          <circle cx="42" cy="54" r="3" fill="#FFFFFF" />

          {/* Milk Glass */}
          <path d="M60 48H84L80 82C80 84 76 86 72 86C68 86 64 84 64 82L60 48Z" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" />
          <ellipse cx="72" cy="48" rx="12" ry="3.5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
          {/* Red Striped Straw */}
          <line x1="72" y1="56" x2="86" y2="24" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
          <line x1="72" y1="56" x2="86" y2="24" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 4" />
        </svg>
      );

    case 't': // Topi (Cap)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="brimGrad" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#F43F5E" />
              <stop offset="1" stopColor="#BE123C" />
            </linearGradient>
          </defs>
          {/* Cap Crown / Dome */}
          <path d="M22 62C20 40 34 26 54 26C72 26 84 40 84 62H22Z" fill="url(#capGrad)" stroke="#0369A1" strokeWidth="3" />
          {/* Top Button */}
          <circle cx="54" cy="26" r="4.5" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
          {/* Seams */}
          <path d="M54 26C48 38 42 50 40 62" stroke="#0284C7" strokeWidth="2" />
          <path d="M54 26C60 38 66 50 68 62" stroke="#0284C7" strokeWidth="2" />
          {/* Air eyelets */}
          <circle cx="42" cy="40" r="1.5" fill="#FFFFFF" />
          <circle cx="66" cy="40" r="1.5" fill="#FFFFFF" />
          {/* Visor / Brim */}
          <path d="M20 62C16 62 10 66 12 72C14 78 36 82 64 78C74 76 80 72 84 62H20Z" fill="url(#brimGrad)" stroke="#9F1239" strokeWidth="3" />
          {/* Brim Highlight */}
          <path d="M18 70C30 75 52 76 68 74" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'u': // Udang (Prawn / Shrimp)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="shrimpGrad" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#FB7185" />
              <stop offset="50%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
          </defs>
          {/* Antennae */}
          <path d="M74 38C84 32 94 34 96 24" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
          <path d="M72 42C86 40 92 48 94 52" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
          {/* Tail Fan */}
          <polygon points="18,68 8,76 14,84 26,76" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
          <polygon points="20,72 14,84 24,88 28,78" fill="#FB7185" stroke="#BE123C" strokeWidth="1.5" />
          {/* Curved Shrimp Body Segments */}
          <path d="M24 72C20 60 22 46 32 34C44 20 66 22 76 34C82 42 80 54 72 60C62 68 46 68 36 64L24 72Z" fill="url(#shrimpGrad)" stroke="#BE123C" strokeWidth="3" />
          {/* Segment Ribs */}
          <path d="M38 30C42 40 40 54 36 64" stroke="#FFE4E6" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M52 24C56 36 54 50 48 62" stroke="#FFE4E6" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M66 28C68 38 66 48 60 58" stroke="#FFE4E6" strokeWidth="2.5" strokeLinecap="round" />
          {/* Eye */}
          <circle cx="70" cy="38" r="4.5" fill="#1E293B" />
          <circle cx="71.5" cy="36.5" r="1.5" fill="#FFFFFF" />
          {/* Tiny Swimmerets (Legs) */}
          <path d="M42 64L40 72M52 64L50 72M62 60L62 68" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'v': // Van (Van Vehicle)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="vanGrad" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#34D399" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
          </defs>
          {/* Van Body */}
          <path d="M14 62V42C14 36 18 34 24 34H62L76 46L86 52C88 54 88 58 88 62V72C88 74 86 76 84 76H18C15 76 14 74 14 72V62Z" fill="url(#vanGrad)" stroke="#064E3B" strokeWidth="3" />
          {/* Windows */}
          <path d="M22 40H40V54H22V40Z" fill="#E0F2FE" stroke="#064E3B" strokeWidth="2" />
          <path d="M44 40H60V54H44V40Z" fill="#E0F2FE" stroke="#064E3B" strokeWidth="2" />
          <path d="M64 42H74L80 54H64V42Z" fill="#E0F2FE" stroke="#064E3B" strokeWidth="2" />
          {/* Side Stripe */}
          <path d="M14 60H88" stroke="#FDE047" strokeWidth="3" />
          {/* Headlight */}
          <rect x="84" y="60" width="4" height="6" rx="2" fill="#FBBF24" />
          {/* Wheels */}
          <circle cx="32" cy="76" r="10" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
          <circle cx="32" cy="76" r="4" fill="#94A3B8" />
          <circle cx="72" cy="76" r="10" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
          <circle cx="72" cy="76" r="4" fill="#94A3B8" />
        </svg>
      );

    case 'w': // Wau (Malaysian Kite)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wauGrad1" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#F59E0B" />
              <stop offset="1" stopColor="#EF4444" />
            </linearGradient>
            <linearGradient id="wauGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#6366F1" />
            </linearGradient>
          </defs>
          {/* Wau Upper Wings */}
          <path d="M50 14C30 18 10 32 12 48C24 48 40 44 50 38C60 44 76 48 88 48C90 32 70 18 50 14Z" fill="url(#wauGrad1)" stroke="#B45309" strokeWidth="2.5" />
          {/* Wau Crescent Lower Body */}
          <path d="M50 38C34 50 20 62 26 78C38 78 46 68 50 58C54 68 62 78 74 78C80 62 66 50 50 38Z" fill="url(#wauGrad2)" stroke="#3730A3" strokeWidth="2.5" />
          {/* Center Spine Stick */}
          <line x1="50" y1="10" x2="50" y2="84" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          {/* Decorative Tassels */}
          <circle cx="50" cy="14" r="3" fill="#FBBF24" />
          <path d="M26 78C22 84 20 90 22 94M74 78C78 84 80 90 78 94" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
          {/* Floral Batik Accents */}
          <circle cx="50" cy="28" r="4" fill="#FFFFFF" />
          <circle cx="34" cy="36" r="3" fill="#FEF08A" />
          <circle cx="66" cy="36" r="3" fill="#FEF08A" />
        </svg>
      );

    case 'x': // Xilofon (Xylophone)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Wooden Base Frame */}
          <polygon points="16,36 84,24 88,76 12,68" fill="#92400E" stroke="#78350F" strokeWidth="2.5" />
          <polygon points="20,40 80,28 84,72 16,64" fill="#D97706" />
          {/* Colorful Xylophone Bars */}
          {/* Bar 1 (Red - Longest) */}
          <rect x="18" y="28" width="8" height="46" rx="2" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
          <circle cx="22" cy="32" r="1.5" fill="#FFFFFF" />
          <circle cx="22" cy="70" r="1.5" fill="#FFFFFF" />
          {/* Bar 2 (Orange) */}
          <rect x="29" y="30" width="8" height="42" rx="2" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
          {/* Bar 3 (Yellow) */}
          <rect x="40" y="32" width="8" height="38" rx="2" fill="#EAB308" stroke="#A16207" strokeWidth="1.5" />
          {/* Bar 4 (Green) */}
          <rect x="51" y="34" width="8" height="34" rx="2" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
          {/* Bar 5 (Blue) */}
          <rect x="62" y="36" width="8" height="30" rx="2" fill="#0EA5E9" stroke="#0369A1" strokeWidth="1.5" />
          {/* Bar 6 (Purple - Shortest) */}
          <rect x="73" y="38" width="8" height="26" rx="2" fill="#A855F7" stroke="#7E22CE" strokeWidth="1.5" />
          {/* Mallet / Stick */}
          <line x1="30" y1="84" x2="68" y2="20" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="68" cy="20" r="4.5" fill="#F43F5E" stroke="#9F1239" strokeWidth="1.5" />
        </svg>
      );

    case 'y': // Yo-yo
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="yoyoGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="50%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#9F1239" />
            </radialGradient>
          </defs>
          {/* Yo-yo String */}
          <path d="M50 12V34C50 40 44 42 44 48" stroke="#F1F5F9" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 3" />
          <circle cx="50" cy="12" r="3" fill="#F1F5F9" />
          {/* Back Half */}
          <ellipse cx="44" cy="56" rx="14" ry="28" fill="#FB7185" stroke="#9F1239" strokeWidth="2.5" />
          {/* Axle Center */}
          <rect x="44" y="50" width="8" height="12" rx="2" fill="#FBBF24" />
          {/* Front Half Disc */}
          <ellipse cx="56" cy="56" rx="16" ry="28" fill="url(#yoyoGrad)" stroke="#881337" strokeWidth="3" />
          {/* Side Pattern / Star */}
          <polygon points="56,44 59,52 68,52 61,58 64,66 56,61 48,66 51,58 44,52 53,52" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
          {/* Spin motion sparkle lines */}
          <path d="M78 42C84 48 84 64 78 70" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
          <path d="M82 48C86 52 86 60 82 64" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'z': // Zirafah (Giraffe)
      return (
        <svg viewBox="0 0 100 100" className={className} width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="girGrad" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#FDE047" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          {/* Long Neck */}
          <path d="M42 42L44 88H62L58 42Z" fill="url(#girGrad)" stroke="#D97706" strokeWidth="2.5" />
          {/* Mane */}
          <path d="M42 42L40 48L42 54L40 60L42 66L40 72L42 78L40 84" stroke="#92400E" strokeWidth="3.5" strokeLinecap="round" />
          {/* Giraffe Spots on Neck */}
          <ellipse cx="50" cy="52" rx="4" ry="3" fill="#B45309" />
          <ellipse cx="54" cy="64" rx="4.5" ry="3.5" fill="#B45309" />
          <ellipse cx="48" cy="76" rx="4" ry="4" fill="#B45309" />
          {/* Horns (Ossicones) */}
          <line x1="50" y1="26" x2="48" y2="14" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <circle cx="48" cy="13" r="3" fill="#78350F" />
          <line x1="60" y1="26" x2="62" y2="14" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <circle cx="62" cy="13" r="3" fill="#78350F" />
          {/* Ears */}
          <ellipse cx="38" cy="28" rx="7" ry="3.5" transform="rotate(-30 38 28)" fill="url(#girGrad)" stroke="#D97706" strokeWidth="2" />
          <ellipse cx="70" cy="28" rx="7" ry="3.5" transform="rotate(30 70 28)" fill="url(#girGrad)" stroke="#D97706" strokeWidth="2" />
          {/* Head */}
          <ellipse cx="54" cy="32" rx="14" ry="12" fill="url(#girGrad)" stroke="#D97706" strokeWidth="2.5" />
          {/* Muzzle */}
          <ellipse cx="54" cy="40" rx="11" ry="8" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
          {/* Nostrils */}
          <circle cx="50" cy="40" r="1.5" fill="#92400E" />
          <circle cx="58" cy="40" r="1.5" fill="#92400E" />
          {/* Smiling Mouth */}
          <path d="M50 44C52 46 56 46 58 44" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
          {/* Eyes */}
          <circle cx="48" cy="30" r="3" fill="#1E293B" />
          <circle cx="49" cy="29" r="1" fill="#FFFFFF" />
          <circle cx="60" cy="30" r="3" fill="#1E293B" />
          <circle cx="61" cy="29" r="1" fill="#FFFFFF" />
          {/* Rosy Cheeks */}
          <circle cx="44" cy="36" r="2.5" fill="#F87171" opacity="0.6" />
          <circle cx="64" cy="36" r="2.5" fill="#F87171" opacity="0.6" />
        </svg>
      );

    default:
      return null;
  }
}

// 3D Golden Celebration Star Reward Graphic
export function GoldenStarIllustration({ className = "w-24 h-24", size = 96, animated = true }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Background radial sunburst glow */}
      <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-xl scale-125 animate-pulse" />

      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={animated ? "animate-bounce drop-shadow-2xl" : "drop-shadow-lg"}
      >
        <defs>
          {/* Rich 3D Golden Gradients */}
          <linearGradient id="gold3d" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="25%" stopColor="#FDE047" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="starShineGrad" x1="20" y1="10" x2="80" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="starEyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </radialGradient>
        </defs>

        {/* Back 3D Shadow Layer */}
        <path
          d="M60 12L74 44L108 47L82 71L90 104L60 86L30 104L38 71L12 47L46 44L60 12Z"
          fill="#92400E"
          transform="translate(0, 6)"
        />

        {/* Outer Golden Border Rim */}
        <path
          d="M60 10L74 42L108 45L82 69L90 102L60 84L30 102L38 69L12 45L46 42L60 10Z"
          fill="#D97706"
          stroke="#78350F"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Main 3D Golden Star Body */}
        <path
          d="M60 14L72 42L104 45L79 67L86 98L60 81L34 98L41 67L16 45L48 42L60 14Z"
          fill="url(#gold3d)"
          stroke="#FDE047"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* 3D Bevel Facet Shading */}
        {/* Top-Right Facet */}
        <polygon points="60,14 60,60 72,42" fill="#FFFFFF" opacity="0.35" />
        {/* Right Facet */}
        <polygon points="104,45 60,60 79,67" fill="#B45309" opacity="0.3" />
        {/* Bottom-Right Facet */}
        <polygon points="86,98 60,60 60,81" fill="#78350F" opacity="0.3" />
        {/* Bottom-Left Facet */}
        <polygon points="34,98 60,60 41,67" fill="#B45309" opacity="0.25" />
        {/* Left Facet */}
        <polygon points="16,45 60,60 48,42" fill="#FFFFFF" opacity="0.4" />
        {/* Top-Left Facet */}
        <polygon points="60,14 60,60 48,42" fill="#FFFFFF" opacity="0.5" />

        {/* Glossy Upper Highlight */}
        <path
          d="M60 16L70 38L96 41C86 46 72 50 60 50C48 50 34 46 24 41L50 38L60 16Z"
          fill="url(#starShineGrad)"
        />

        {/* Cute Face Elements */}
        {/* Left Eye */}
        <ellipse cx="48" cy="56" rx="4.5" ry="6" fill="url(#starEyeGlow)" />
        <circle cx="49.5" cy="53.5" r="2" fill="#FFFFFF" />
        <circle cx="46.5" cy="58" r="1" fill="#FFFFFF" />

        {/* Right Eye */}
        <ellipse cx="72" cy="56" rx="4.5" ry="6" fill="url(#starEyeGlow)" />
        <circle cx="73.5" cy="53.5" r="2" fill="#FFFFFF" />
        <circle cx="70.5" cy="58" r="1" fill="#FFFFFF" />

        {/* Rosy Cheeks */}
        <ellipse cx="42" cy="63" rx="4.5" ry="3" fill="#F43F5E" opacity="0.65" />
        <ellipse cx="78" cy="63" rx="4.5" ry="3" fill="#F43F5E" opacity="0.65" />

        {/* Big Happy Smile */}
        <path
          d="M52 64C52 69 56 73 60 73C64 73 68 69 68 64"
          stroke="#0F172A"
          strokeWidth="3"
          strokeLinecap="round"
          fill="#EF4444"
        />
        {/* Little White Tooth */}
        <path d="M57 65H63V67C63 68 57 68 57 67V65Z" fill="#FFFFFF" />

        {/* Little Sparkle Diamonds */}
        <polygon points="98,16 102,24 110,28 102,32 98,40 94,32 86,28 94,24" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.8" />
        <circle cx="98" cy="28" r="2" fill="#FFFFFF" />

        <polygon points="18,78 21,83 26,85 21,87 18,92 15,87 10,85 15,83" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

// 3-Star Rating Cluster for Completion / Victory
export function ThreeGoldenStarsCluster({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-1 sm:gap-2 ${className}`}>
      <GoldenStarIllustration size={48} className="w-10 h-10 sm:w-12 sm:h-12 transform -rotate-12 scale-90" animated={false} />
      <GoldenStarIllustration size={72} className="w-14 h-14 sm:w-18 sm:h-18 transform -translate-y-2 scale-110" animated={true} />
      <GoldenStarIllustration size={48} className="w-10 h-10 sm:w-12 sm:h-12 transform rotate-12 scale-90" animated={false} />
    </div>
  );
}
