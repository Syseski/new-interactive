import { getAssetUrl } from "../utils/assetHelper";
import React, { useState, useEffect } from 'react';
import { playPopSound, playWhooshSound } from '../utils/soundEffects';
import { Lock, Sparkles, ArrowRight, Settings } from 'lucide-react';

/* =========================================================================
   1. DETAILED ANIME/CARTOON MASCOTS (BOY, GIRL, FULL-BODY LION)
   ========================================================================= */

// Cute Anime Boy Waving (Right hand raised high waving with 5 spread fingers)
const CuteBoyMascot = ({ className = "w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24" }) => {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <img
        src={getAssetUrl("/images/boy.png")}
        alt="Kanak-kanak Lelaki"
        onError={() => setImgError(true)}
        className={`${className} object-contain filter drop-shadow-lg flex-shrink-0 animate-float`}
      />
    );
  }

  return (
    <svg className={`${className} filter drop-shadow-lg flex-shrink-0`} viewBox="0 0 120 140" fill="none">
      {/* Body / Torso - Green striped t-shirt */}
      <path d="M38 90 L82 90 L88 140 L32 140 Z" fill="#22c55e" stroke="#16a34a" strokeWidth="2.5" />
      <path d="M36 104 L84 104 L83 114 L35 114 Z" fill="#15803d" />
      <path d="M34 124 L86 124 L85 134 L33 134 Z" fill="#15803d" />
      
      {/* Left Arm resting at side/hip */}
      <path d="M38 90 Q22 105 24 122" stroke="#fcd34d" strokeWidth="12" strokeLinecap="round" />
      <circle cx="24" cy="122" r="7.5" fill="#fed7aa" />

      {/* Right Raised Waving Arm (Waving towards the title) */}
      <g className="animate-wave-right" style={{ transformOrigin: '80px 90px' }}>
        <path d="M80 90 Q98 68 104 42" stroke="#fcd34d" strokeWidth="13" strokeLinecap="round" />
        {/* Palm */}
        <ellipse cx="104" cy="38" rx="9" ry="8" fill="#fed7aa" />
        {/* 5 Open Waving Fingers */}
        <path d="M96 34 L93 22" stroke="#fed7aa" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M101 32 L101 18" stroke="#fed7aa" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M106 32 L108 17" stroke="#fed7aa" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M110 34 L114 20" stroke="#fed7aa" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M113 38 L118 28" stroke="#fed7aa" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Neck */}
      <rect x="52" y="78" width="16" height="15" fill="#fcd34d" rx="4" />

      {/* Head */}
      <ellipse cx="60" cy="50" rx="28" ry="26" fill="#fed7aa" />

      {/* Big Anime Eyes */}
      <g>
        {/* Left Eye */}
        <ellipse cx="48" cy="50" rx="6.5" ry="8" fill="#1e293b" />
        <ellipse cx="46" cy="47" rx="2.5" ry="3.5" fill="#ffffff" />
        <circle cx="51" cy="53" r="1.2" fill="#ffffff" />
        <path d="M42 38 Q48 34 54 38" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

        {/* Right Eye */}
        <ellipse cx="72" cy="50" rx="6.5" ry="8" fill="#1e293b" />
        <ellipse cx="70" cy="47" rx="2.5" ry="3.5" fill="#ffffff" />
        <circle cx="75" cy="53" r="1.2" fill="#ffffff" />
        <path d="M66 38 Q72 34 78 38" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Rosy Cheeks */}
      <ellipse cx="40" cy="58" rx="5" ry="3.5" fill="#fb7185" opacity="0.65" />
      <ellipse cx="80" cy="58" rx="5" ry="3.5" fill="#fb7185" opacity="0.65" />

      {/* Cheerful Open Mouth with Tongue */}
      <path d="M51 60 Q60 74 69 60 Z" fill="#b91c1c" />
      <path d="M54 66 Q60 72 66 66 Q60 62 54 66 Z" fill="#f43f5e" />

      {/* Cute Chibi Dark Messy Hair */}
      <path
        d="M32 46 C28 20, 92 18, 88 46 C88 28, 76 12, 60 12 C44 12, 32 28, 32 46 Z"
        fill="#0f172a"
      />
      <path d="M30 46 C32 30, 48 24, 60 30 C72 24, 88 30, 90 46 C84 32, 74 26, 60 32 C46 26, 36 32, 30 46 Z" fill="#1e293b" />
      <path d="M42 22 L46 12 L52 24 Z" fill="#0f172a" />
      <path d="M58 20 L64 10 L70 22 Z" fill="#0f172a" />
      <path d="M32 34 L24 28 L34 42 Z" fill="#0f172a" />
      <path d="M88 34 L96 28 L86 42 Z" fill="#0f172a" />
    </svg>
  );
};

// Cute Anime Girl Waving (Left hand raised high waving with 5 spread fingers, holding green book in right hand)
const CuteGirlMascot = ({ className = "w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24" }) => {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <img
        src={getAssetUrl("/images/girl.png")}
        alt="Kanak-kanak Perempuan"
        onError={() => setImgError(true)}
        className={`${className} object-contain filter drop-shadow-lg flex-shrink-0 animate-float`}
        style={{ animationDelay: '1.4s' }}
      />
    );
  }

  return (
    <svg className={`${className} filter drop-shadow-lg flex-shrink-0`} viewBox="0 0 120 140" fill="none">
      {/* Body / Torso - Pink Overalls with straps */}
      <path d="M38 90 L82 90 L88 140 L32 140 Z" fill="#f43f5e" stroke="#e11d48" strokeWidth="2.5" />
      <path d="M44 90 L44 140 M76 90 L76 140" stroke="#be123c" strokeWidth="3" />
      <path d="M46 90 L74 90 L70 102 L50 102 Z" fill="#ffffff" />
      <circle cx="44" cy="106" r="2.5" fill="#fde047" />
      <circle cx="76" cy="106" r="2.5" fill="#fde047" />

      {/* Right Arm holding Green Storybook */}
      <path d="M82 90 Q98 106 94 122" stroke="#fcd34d" strokeWidth="12" strokeLinecap="round" />
      {/* Green Book */}
      <g transform="translate(86, 102) rotate(10)">
        <rect x="0" y="0" width="22" height="28" rx="4" fill="#16a34a" stroke="#15803d" strokeWidth="2" />
        <rect x="4" y="2" width="16" height="24" rx="2" fill="#dcfce7" />
        <line x1="8" y1="8" x2="16" y2="8" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="14" x2="16" y2="14" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Left Raised Waving Arm (Waving towards the title) */}
      <g className="animate-wave-left" style={{ transformOrigin: '40px 90px' }}>
        <path d="M40 90 Q22 68 16 42" stroke="#fcd34d" strokeWidth="13" strokeLinecap="round" />
        {/* Palm */}
        <ellipse cx="16" cy="38" rx="9" ry="8" fill="#fed7aa" />
        {/* 5 Open Waving Fingers */}
        <path d="M24 34 L27 22" stroke="#fed7aa" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M19 32 L19 18" stroke="#fed7aa" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M14 32 L12 17" stroke="#fed7aa" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M10 34 L6 20" stroke="#fed7aa" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M7 38 L2 28" stroke="#fed7aa" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Neck */}
      <rect x="52" y="78" width="16" height="15" fill="#fcd34d" rx="4" />

      {/* Head */}
      <ellipse cx="60" cy="50" rx="28" ry="26" fill="#fed7aa" />

      {/* Brown Hair Base */}
      <path d="M30 48 C24 16, 96 16, 90 48 C88 24, 76 16, 60 16 C44 16, 32 24, 30 48 Z" fill="#78350f" />
      
      {/* Red / Pink Headband with Cute Bow on top right */}
      <path d="M32 40 Q60 22 88 40" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" />
      <g transform="translate(82, 22)">
        <ellipse cx="0" cy="0" rx="7" ry="5" fill="#e11d48" transform="rotate(-25)" />
        <ellipse cx="10" cy="-2" rx="7" ry="5" fill="#e11d48" transform="rotate(25)" />
        <circle cx="5" cy="-1" r="3.5" fill="#fda4af" />
      </g>

      {/* Hair Buns / Pigtails */}
      <circle cx="26" cy="32" r="11" fill="#78350f" />
      <circle cx="94" cy="32" r="11" fill="#78350f" />
      <circle cx="26" cy="32" r="4.5" fill="#fb7185" />
      <circle cx="94" cy="32" r="4.5" fill="#fb7185" />

      {/* Big Sparkling Anime Eyes with Eyelashes */}
      <g>
        <ellipse cx="48" cy="50" rx="6.5" ry="8" fill="#1e293b" />
        <ellipse cx="46" cy="47" rx="2.5" ry="3.5" fill="#ffffff" />
        <circle cx="51" cy="53" r="1.2" fill="#ffffff" />
        <path d="M40 44 L44 48 M42 42 L48 46" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />

        <ellipse cx="72" cy="50" rx="6.5" ry="8" fill="#1e293b" />
        <ellipse cx="70" cy="47" rx="2.5" ry="3.5" fill="#ffffff" />
        <circle cx="75" cy="53" r="1.2" fill="#ffffff" />
        <path d="M80 44 L76 48 M78 42 L72 46" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Rosy Cheeks */}
      <ellipse cx="40" cy="58" rx="5" ry="3.5" fill="#fb7185" opacity="0.65" />
      <ellipse cx="80" cy="58" rx="5" ry="3.5" fill="#fb7185" opacity="0.65" />

      {/* Cheerful Smile */}
      <path d="M52 60 Q60 70 68 60" stroke="#b91c1c" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
};

// Cute Bunny Reading a Book with Stack of Storybooks beside it (Literasi Theme)
const CuteRabbitReadingBook = () => {
  const [rabbitImgError, setRabbitImgError] = useState(false);
  const [booksImgError, setBooksImgError] = useState(false);

  return (
    <div className="flex items-end justify-center gap-3 sm:gap-4">
      {/* Stack of Colorful Storybooks beside Rabbit */}
      <div className="flex flex-col items-center mb-1">
        {!booksImgError ? (
          <img
            src={getAssetUrl("/images/books.png")}
            alt="Buku Cerita"
            onError={() => setBooksImgError(true)}
            className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 object-contain drop-shadow-md"
          />
        ) : (
          <svg className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 filter drop-shadow-md" viewBox="0 0 100 100" fill="none">
            {/* Bottom Purple Book */}
            <rect x="15" y="70" width="70" height="14" rx="3" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="2" />
            <rect x="22" y="70" width="60" height="4" fill="#DDD6FE" />
            {/* Middle Cyan Book */}
            <rect x="18" y="52" width="64" height="14" rx="3" fill="#06B6D4" stroke="#0891B2" strokeWidth="2" />
            <rect x="25" y="52" width="54" height="4" fill="#CFFAFE" />
            {/* Top Orange Book with Bookmark */}
            <rect x="22" y="34" width="56" height="14" rx="3" fill="#F97316" stroke="#EA580C" strokeWidth="2" />
            <rect x="28" y="34" width="48" height="4" fill="#FFEDD5" />
            {/* Red ribbon bookmark */}
            <polygon points="62,48 68,48 68,68 65,64 62,68" fill="#EF4444" />
            {/* Star Sticker on Top Book */}
            <circle cx="40" cy="41" r="4.5" fill="#FACC15" />
            <text x="40" y="44" textAnchor="middle" fill="#713F12" fontSize="7" fontWeight="900" fontFamily="'Fredoka', sans-serif">⭐</text>
            {/* Magic sparkle */}
            <text x="78" y="30" fontSize="12">✨</text>
          </svg>
        )}
      </div>

      {/* Full-Body Cute Sitting Rabbit Reading Book */}
      <div className="animate-bounce" style={{ animationDuration: '3.5s' }}>
        {!rabbitImgError ? (
          <img
            src={getAssetUrl("/images/rabbit.png")}
            alt="Arnab Membaca Buku"
            onError={() => setRabbitImgError(true)}
            className="w-16 h-16 sm:w-22 sm:h-22 md:w-28 md:h-28 object-contain drop-shadow-xl"
          />
        ) : (
          <svg className="w-16 h-16 sm:w-22 sm:h-22 md:w-28 md:h-28 filter drop-shadow-xl" viewBox="0 0 140 140" fill="none">
            {/* Fluffy Round Tail */}
            <circle cx="34" cy="110" r="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <circle cx="34" cy="110" r="7" fill="#F8FAFC" />

            {/* Back Body / Chubby Hips */}
            <ellipse cx="70" cy="100" rx="34" ry="28" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" />
            {/* Soft Pink Tummy */}
            <ellipse cx="70" cy="102" rx="20" ry="18" fill="#FFF1F2" />

            {/* Hind Paws */}
            <ellipse cx="40" cy="122" rx="14" ry="9" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <ellipse cx="100" cy="122" rx="14" ry="9" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <ellipse cx="40" cy="122" rx="8" ry="5" fill="#FCE7F3" />
            <ellipse cx="100" cy="122" rx="8" ry="5" fill="#FCE7F3" />
            {/* Toe pads */}
            <circle cx="34" cy="118" r="2.5" fill="#FCE7F3" />
            <circle cx="40" cy="116" r="2.5" fill="#FCE7F3" />
            <circle cx="46" cy="118" r="2.5" fill="#FCE7F3" />
            <circle cx="94" cy="118" r="2.5" fill="#FCE7F3" />
            <circle cx="100" cy="116" r="2.5" fill="#FCE7F3" />
            <circle cx="106" cy="118" r="2.5" fill="#FCE7F3" />

            {/* Left Long Ear */}
            <g transform="translate(42, 6)">
              <ellipse cx="12" cy="24" rx="9" ry="24" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" transform="rotate(-8 12 24)" />
              <ellipse cx="12" cy="24" rx="5" ry="18" fill="#FCE7F3" transform="rotate(-8 12 24)" />
            </g>

            {/* Right Long Ear (Playfully folded / floppy) */}
            <g transform="translate(74, 6)">
              <ellipse cx="14" cy="24" rx="9" ry="24" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" transform="rotate(12 14 24)" />
              <ellipse cx="14" cy="24" rx="5" ry="18" fill="#FCE7F3" transform="rotate(12 14 24)" />
              <path d="M10 8 Q16 1 24 6 Q20 14 12 10 Z" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5" />
            </g>

            {/* Head */}
            <circle cx="70" cy="58" r="30" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" />

            {/* Big Sparkling Anime Eyes */}
            <g>
              <ellipse cx="56" cy="54" rx="6.5" ry="8" fill="#1E293B" />
              <ellipse cx="54" cy="51" rx="2.5" ry="3.5" fill="#FFFFFF" />
              <circle cx="59" cy="57" r="1.2" fill="#FFFFFF" />

              <ellipse cx="84" cy="54" rx="6.5" ry="8" fill="#1E293B" />
              <ellipse cx="82" cy="51" rx="2.5" ry="3.5" fill="#FFFFFF" />
              <circle cx="87" cy="57" r="1.2" fill="#FFFFFF" />
            </g>

            {/* Rosy Blushing Cheeks */}
            <ellipse cx="46" cy="64" rx="6" ry="4" fill="#FDA4AF" opacity="0.75" />
            <ellipse cx="94" cy="64" rx="6" ry="4" fill="#FDA4AF" opacity="0.75" />

            {/* Cute Pink Heart / Triangular Nose */}
            <polygon points="70,64 66,59 74,59" fill="#FB7185" />

            {/* Bunny Mouth Smile */}
            <path d="M64 65 Q70 71 70 65 Q70 71 76 65" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Whiskers */}
            <line x1="44" y1="62" x2="30" y2="60" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="44" y1="66" x2="30" y2="68" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="96" y1="62" x2="110" y2="60" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="96" y1="66" x2="110" y2="68" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />

            {/* Open Storybook in Bunny's Paws */}
            <g transform="translate(42, 82)">
              {/* Book Cover */}
              <path d="M2,14 Q28,6 28,34 Q2,26 2,14 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
              <path d="M54,14 Q28,6 28,34 Q54,26 54,14 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
              {/* Book Pages */}
              <path d="M5,15 Q28,8 28,32 Q5,24 5,15 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
              <path d="M51,15 Q28,8 28,32 Q51,24 51,15 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
              {/* Text lines on book */}
              <line x1="9" y1="18" x2="24" y2="16" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="9" y1="22" x2="22" y2="20" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="9" y1="26" x2="25" y2="24" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="32" y1="16" x2="47" y2="18" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="34" y1="20" x2="47" y2="22" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="32" y1="24" x2="45" y2="26" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
              {/* Heart Illustration inside open book */}
              <path d="M38,20 C38,18 41,18 41,20 C41,22 38,24 38,24 C38,24 35,22 35,20 C35,18 38,18 38,20 Z" fill="#F43F5E" />
              {/* Spine */}
              <line x1="28" y1="7" x2="28" y2="34" stroke="#0369A1" strokeWidth="2.5" />
            </g>

            {/* Front Paws Holding the Book */}
            <circle cx="48" cy="98" r="5.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="92" cy="98" r="5.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          </svg>
        )}
      </div>
    </div>
  );
};

// Cute Full-Body Baby Lion with 1-2-3 Wooden Blocks (Numerasi Theme)
const CuteFullBodyLionWithBlocks = () => (
  <div className="flex items-end justify-center gap-3 sm:gap-4">
    {/* 1-2-3 Wooden Toy Blocks */}
    <div className="flex flex-col items-center">
      {/* Block 1 (Yellow) */}
      <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-amber-300 to-yellow-400 border-2 border-amber-600 flex items-center justify-center font-black font-['Fredoka'] text-xs sm:text-sm md:text-base text-amber-950 shadow-md transform hover:scale-105 transition-transform -mb-1 z-10">
        1
      </div>
      {/* Row 2 & 3 (Pink & Blue) */}
      <div className="flex items-center gap-1">
        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 border-2 border-rose-700 flex items-center justify-center font-black font-['Fredoka'] text-xs sm:text-sm md:text-base text-white shadow-md transform hover:scale-105 transition-transform">
          2
        </div>
        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 border-2 border-blue-700 flex items-center justify-center font-black font-['Fredoka'] text-xs sm:text-sm md:text-base text-white shadow-md transform hover:scale-105 transition-transform">
          3
        </div>
      </div>
    </div>

    {/* Full-Body Sitting Lion */}
    <div className="animate-bounce" style={{ animationDuration: '3.5s' }}>
      <svg className="w-16 h-16 sm:w-22 sm:h-22 md:w-28 md:h-28 filter drop-shadow-xl" viewBox="0 0 140 140" fill="none">
        {/* Lion Tail */}
        <path d="M96 100 Q124 95 120 74 Q116 66 122 62" stroke="#d97706" strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="122" cy="62" r="7" fill="#78350f" />

        {/* Back Body / Chubby Hips */}
        <ellipse cx="70" cy="98" rx="34" ry="26" fill="#f59e0b" stroke="#d97706" strokeWidth="2.5" />
        {/* Tummy */}
        <ellipse cx="70" cy="100" rx="20" ry="16" fill="#fef3c7" />

        {/* Hind Paws */}
        <ellipse cx="40" cy="120" rx="13" ry="9" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
        <ellipse cx="100" cy="120" rx="13" ry="9" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
        <circle cx="36" cy="120" r="2.5" fill="#fef3c7" />
        <circle cx="42" cy="122" r="2.5" fill="#fef3c7" />
        <circle cx="48" cy="120" r="2.5" fill="#fef3c7" />
        <circle cx="92" cy="120" r="2.5" fill="#fef3c7" />
        <circle cx="98" cy="122" r="2.5" fill="#fef3c7" />
        <circle cx="104" cy="120" r="2.5" fill="#fef3c7" />

        {/* Front Paws */}
        <g>
          <rect x="52" y="94" width="14" height="28" rx="7" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
          <ellipse cx="59" cy="122" rx="9" ry="7" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
          <circle cx="55" cy="124" r="2" fill="#fef3c7" />
          <circle cx="59" cy="125" r="2" fill="#fef3c7" />
          <circle cx="63" cy="124" r="2" fill="#fef3c7" />

          <rect x="74" y="94" width="14" height="28" rx="7" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
          <ellipse cx="81" cy="122" rx="9" ry="7" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
          <circle cx="77" cy="124" r="2" fill="#fef3c7" />
          <circle cx="81" cy="125" r="2" fill="#fef3c7" />
          <circle cx="85" cy="124" r="2" fill="#fef3c7" />
        </g>

        {/* Fluffy Caramel Mane */}
        <g>
          <circle cx="70" cy="54" r="44" fill="#92400e" />
          <circle cx="70" cy="54" r="40" fill="#b45309" />
          <circle cx="70" cy="54" r="36" fill="#d97706" />
        </g>

        {/* Cute Ears */}
        <circle cx="44" cy="30" r="12" fill="#d97706" stroke="#92400e" strokeWidth="2" />
        <circle cx="44" cy="30" r="7" fill="#fed7aa" />
        <circle cx="96" cy="30" r="12" fill="#d97706" stroke="#92400e" strokeWidth="2" />
        <circle cx="96" cy="30" r="7" fill="#fed7aa" />

        {/* Lion Face */}
        <circle cx="70" cy="56" r="28" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />

        {/* Big Sparkling Anime Eyes */}
        <g>
          <ellipse cx="58" cy="52" rx="6.5" ry="8" fill="#1e293b" />
          <ellipse cx="56" cy="49" rx="2.5" ry="3.5" fill="#ffffff" />
          <circle cx="61" cy="55" r="1.2" fill="#ffffff" />

          <ellipse cx="82" cy="52" rx="6.5" ry="8" fill="#1e293b" />
          <ellipse cx="80" cy="49" rx="2.5" ry="3.5" fill="#ffffff" />
          <circle cx="85" cy="55" r="1.2" fill="#ffffff" />
        </g>

        {/* Rosy Cheeks */}
        <circle cx="50" cy="62" r="4.5" fill="#fb7185" opacity="0.6" />
        <circle cx="90" cy="62" r="4.5" fill="#fb7185" opacity="0.6" />

        {/* Muzzle & Nose */}
        <ellipse cx="70" cy="65" rx="14" ry="9" fill="#fef3c7" />
        <polygon points="70,60 63,54 77,54" fill="#78350f" />

        {/* Whiskers */}
        <line x1="48" y1="64" x2="36" y2="62" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
        <line x1="48" y1="68" x2="36" y2="70" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
        <line x1="92" y1="64" x2="104" y2="62" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
        <line x1="92" y1="68" x2="104" y2="70" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />

        {/* Smile */}
        <path d="M64 65 Q70 72 76 65" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  </div>
);


/* =========================================================================
   2. DETAILED VECTOR ICONS FOR 10 ACTIVITY SLOTS
   ========================================================================= */

const StackOfBooksIcon = () => (
  <svg className="w-8 h-8 sm:w-10 sm:h-10 filter drop-shadow-sm flex-shrink-0" viewBox="0 0 100 100" fill="none">
    <path d="M12 70 L78 70 Q88 70 88 80 L22 80 Q12 80 12 70 Z" fill="#ea580c" />
    <path d="M22 66 L88 66 L88 72 L22 72 Z" fill="#fed7aa" />
    <rect x="10" y="70" width="12" height="12" rx="3" fill="#c2410c" />
    
    <path d="M16 52 L82 52 Q92 52 92 62 L26 62 Q16 62 16 52 Z" fill="#0284c7" />
    <path d="M26 48 L92 48 L92 54 L26 54 Z" fill="#e0f2fe" />
    <rect x="14" y="52" width="12" height="12" rx="3" fill="#0369a1" />

    <path d="M20 34 L86 34 Q96 34 96 44 L30 44 Q20 44 20 34 Z" fill="#16a34a" />
    <path d="M30 30 L96 30 L96 36 L30 36 Z" fill="#dcfce7" />
    <rect x="18" y="34" width="12" height="12" rx="3" fill="#15803d" />
    <path d="M60 30 L60 46 L65 42 L70 46 L70 30 Z" fill="#e11d48" />
    <circle cx="52" cy="38" r="3" fill="#fef08a" />
  </svg>
);

const OpenNotebookIcon = () => (
  <svg className="w-8 h-8 sm:w-10 sm:h-10 filter drop-shadow-sm flex-shrink-0" viewBox="0 0 100 100" fill="none">
    <rect x="10" y="24" width="76" height="56" rx="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="2.5" />
    <path d="M12 26 L48 26 L48 78 L12 78 Z" fill="#ffffff" />
    <path d="M52 26 L84 26 L84 78 L52 78 Z" fill="#fdfefe" />
    <line x1="18" y1="36" x2="42" y2="36" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
    <line x1="18" y1="46" x2="42" y2="46" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
    <line x1="18" y1="56" x2="36" y2="56" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
    <line x1="18" y1="66" x2="40" y2="66" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
    
    <line x1="56" y1="36" x2="78" y2="36" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
    <line x1="56" y1="46" x2="78" y2="46" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
    <line x1="56" y1="56" x2="74" y2="56" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
    <circle cx="50" cy="32" r="2.5" fill="#64748b" />
    <circle cx="50" cy="44" r="2.5" fill="#64748b" />
    <circle cx="50" cy="56" r="2.5" fill="#64748b" />
    <circle cx="50" cy="68" r="2.5" fill="#64748b" />

    <g transform="translate(42, 10) rotate(35)">
      <rect x="0" y="0" width="46" height="12" rx="2" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
      <rect x="-10" y="0" width="10" height="12" rx="2" fill="#fb7185" />
      <rect x="-3" y="0" width="4" height="12" fill="#cbd5e1" />
      <path d="M46 0 L60 6 L46 12 Z" fill="#fde047" stroke="#a16207" strokeWidth="1" />
      <path d="M54 3.5 L60 6 L54 8.5 Z" fill="#1e293b" />
    </g>
  </svg>
);

const AlphabetBlocksIcon = () => (
  <svg className="w-8 h-8 sm:w-10 sm:h-10 filter drop-shadow-sm flex-shrink-0" viewBox="0 0 100 100" fill="none">
    <g transform="translate(32, 12)">
      <rect x="0" y="0" width="34" height="34" rx="6" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />
      <rect x="2" y="2" width="30" height="12" rx="4" fill="#fb7185" />
      <text x="17" y="25" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="'Fredoka', sans-serif">A</text>
    </g>
    <g transform="translate(14, 46)">
      <rect x="0" y="0" width="34" height="34" rx="6" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
      <rect x="2" y="2" width="30" height="12" rx="4" fill="#38bdf8" />
      <text x="17" y="25" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="'Fredoka', sans-serif">B</text>
    </g>
    <g transform="translate(52, 46)">
      <rect x="0" y="0" width="34" height="34" rx="6" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
      <rect x="2" y="2" width="30" height="12" rx="4" fill="#fbbf24" />
      <text x="17" y="25" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="'Fredoka', sans-serif">C</text>
    </g>
  </svg>
);

const DragAndDropMatchIcon = () => (
  <svg className="w-8 h-8 sm:w-10 sm:h-10 filter drop-shadow-sm flex-shrink-0" viewBox="0 0 100 100" fill="none">
    {/* Target Slot Frame */}
    <rect x="12" y="18" width="42" height="34" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="4 4" />
    <polygon points="33,26 36,33 44,34 38,39 40,47 33,43 26,47 28,39 22,34 30,33" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
    {/* Draggable Word Tile with Red Cat Accent */}
    <g transform="translate(36, 44)">
      <rect x="0" y="0" width="54" height="36" rx="8" fill="#f43f5e" stroke="#be123c" strokeWidth="2.5" />
      <rect x="3" y="3" width="48" height="12" rx="4" fill="#fb7185" />
      <text x="27" y="27" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="'Fredoka', sans-serif">Kucing</text>
    </g>
    {/* Pointer Hand / Cursor */}
    <g transform="translate(68, 64)">
      <circle cx="10" cy="10" r="12" fill="#38bdf8" opacity="0.3" className="animate-ping" />
      <path d="M4 18 L12 2 L16 12 L24 14 Z" fill="#facc15" stroke="#78350f" strokeWidth="2" strokeLinejoin="round" />
    </g>
  </svg>
);

const SpeechBubbleIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    <path
      d="M16 28 C16 18, 28 12, 50 12 C72 12, 84 18, 84 28 C84 46, 68 56, 50 56 C44 56, 38 58, 28 66 C30 58, 26 54, 20 50 C16 44, 16 36, 16 28 Z"
      fill="#38bdf8"
      stroke="#0284c7"
      strokeWidth="3"
    />
    <circle cx="36" cy="34" r="5" fill="#ffffff" />
    <circle cx="50" cy="34" r="5" fill="#ffffff" />
    <circle cx="64" cy="34" r="5" fill="#ffffff" />
  </svg>
);

const FillInTheBlankIcon = () => (
  <svg className="w-8 h-8 sm:w-10 sm:h-10 filter drop-shadow-sm flex-shrink-0" viewBox="0 0 100 100" fill="none">
    {/* Open Notebook Page */}
    <rect x="14" y="14" width="72" height="72" rx="10" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2.5" />
    {/* Sentence lines with blank slot */}
    <line x1="24" y1="30" x2="40" y2="30" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
    <rect x="44" y="22" width="32" height="16" rx="4" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
    <line x1="24" y1="48" x2="52" y2="48" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
    <rect x="56" y="40" width="22" height="16" rx="4" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
    <line x1="24" y1="66" x2="76" y2="66" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
    {/* Cute Yellow Pencil */}
    <g transform="translate(54, 48) rotate(35)">
      <rect x="0" y="0" width="38" height="10" rx="2" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
      <polygon points="38,0 48,5 38,10" fill="#fed7aa" stroke="#b45309" strokeWidth="1" />
      <polygon points="44,3 48,5 44,7" fill="#1e293b" />
      <rect x="-8" y="0" width="8" height="10" rx="2" fill="#f43f5e" />
    </g>
  </svg>
);

const ChooseCorrectQuizIcon = () => (
  <svg className="w-8 h-8 sm:w-10 sm:h-10 filter drop-shadow-sm flex-shrink-0" viewBox="0 0 100 100" fill="none">
    {/* Question Card with Checkmark */}
    <rect x="12" y="14" width="76" height="72" rx="10" fill="#fdf4ff" stroke="#a855f7" strokeWidth="2.5" />
    {/* Mini picture frame inside */}
    <rect x="20" y="22" width="28" height="28" rx="6" fill="#fae8ff" stroke="#c084fc" strokeWidth="1.5" />
    <circle cx="34" cy="36" r="6" fill="#a855f7" />
    {/* Choice Option 1 (Green Checkmark Selected) */}
    <rect x="52" y="24" width="30" height="14" rx="4" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
    <path d="M58 31 L63 35 L76 27" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Choice Option 2 */}
    <rect x="52" y="44" width="30" height="14" rx="4" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
    {/* Lower Row preview */}
    <rect x="20" y="58" width="28" height="20" rx="4" fill="#e2e8f0" />
    <rect x="52" y="62" width="30" height="14" rx="4" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
  </svg>
);

const StationeryCupIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    <path d="M25 45 L32 88 L68 88 L75 45 Z" fill="#f43f5e" stroke="#be123c" strokeWidth="3" rx="4" />
    <rect x="22" y="42" width="56" height="8" rx="3" fill="#fb7185" />
    <rect x="34" y="16" width="7" height="30" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
    <path d="M34 16 L37.5 8 L41 16 Z" fill="#1e293b" />
    <rect x="46" y="20" width="7" height="26" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
    <path d="M46 20 L49.5 12 L53 20 Z" fill="#1e293b" />
    <rect x="58" y="12" width="9" height="34" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
  </svg>
);

const LabelObjectsTagIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    {/* Blackboard Mini */}
    <rect x="15" y="20" width="70" height="50" rx="6" fill="#166534" stroke="#78350F" strokeWidth="3" />
    <rect x="22" y="27" width="56" height="36" rx="3" fill="#14532d" />
    {/* Chalk lines */}
    <line x1="28" y1="38" x2="52" y2="38" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="28" y1="48" x2="68" y2="48" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    {/* Star Tag */}
    <g transform="translate(56, 12)">
      <polygon points="14,2 17,11 26,11 19,16 21,25 14,20 7,25 9,16 2,11 11,11" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
      <text x="14" y="17" textAnchor="middle" fill="#713F12" fontSize="10" fontWeight="900" fontFamily="'Fredoka', sans-serif">⭐</text>
    </g>
    {/* Chalk piece on ledge */}
    <rect x="35" y="70" width="12" height="4" rx="1.5" fill="#ffffff" />
  </svg>
);

const CutePencilIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    <g transform="translate(15, 15) rotate(45)">
      <rect x="0" y="0" width="56" height="18" rx="4" fill="#facc15" stroke="#ca8a04" strokeWidth="2.5" />
      <rect x="-12" y="0" width="12" height="18" rx="4" fill="#fb7185" />
      <path d="M56 0 L72 9 L56 18 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
      <path d="M66 5 L72 9 L66 13 Z" fill="#1e293b" />
    </g>
  </svg>
);

const CrosswordPuzzleMenuIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    {/* Mini Crossword Grid */}
    <rect x="15" y="15" width="32" height="32" rx="4" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.5" />
    <text x="31" y="38" textAnchor="middle" fill="#713F12" fontSize="18" fontWeight="900" fontFamily="'Fredoka', sans-serif">A</text>
    
    <rect x="53" y="15" width="32" height="32" rx="4" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2.5" />
    <text x="69" y="38" textAnchor="middle" fill="#713F12" fontSize="18" fontWeight="900" fontFamily="'Fredoka', sans-serif">B</text>
    
    <rect x="15" y="53" width="32" height="32" rx="4" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2.5" />
    <text x="31" y="76" textAnchor="middle" fill="#713F12" fontSize="18" fontWeight="900" fontFamily="'Fredoka', sans-serif">C</text>
    
    <rect x="53" y="53" width="32" height="32" rx="4" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
    <text x="69" y="76" textAnchor="middle" fill="#0C4A6E" fontSize="18" fontWeight="900" fontFamily="'Fredoka', sans-serif">D</text>
  </svg>
);

const SyllablePuzzleIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    {/* First Syllable Block: BA */}
    <rect x="8" y="22" width="38" height="38" rx="8" fill="#84CC16" stroke="#4D7C0F" strokeWidth="2.5" />
    <text x="27" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="900" fontFamily="'Fredoka', sans-serif">BA</text>
    
    {/* Plus / Link symbol */}
    <circle cx="50" cy="41" r="7" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
    <path d="M50 37 L50 45 M46 41 L54 41" stroke="#713F12" strokeWidth="2" strokeLinecap="round" />

    {/* Second Syllable Block: JU */}
    <rect x="54" y="22" width="38" height="38" rx="8" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
    <text x="73" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="900" fontFamily="'Fredoka', sans-serif">JU</text>
    
    {/* Result Word Bar below */}
    <rect x="16" y="68" width="68" height="18" rx="6" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
    <text x="50" y="81" textAnchor="middle" fill="#713F12" fontSize="11" fontWeight="900" fontFamily="'Fredoka', sans-serif">BAJU</text>
  </svg>
);

const SentenceArrangeIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    {/* Page / Blackboard with lined sentence */}
    <rect x="12" y="14" width="76" height="72" rx="10" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="2.5" />
    
    {/* Flower Badge Mini */}
    <circle cx="28" cy="32" r="10" fill="#EC4899" />
    <circle cx="28" cy="32" r="6" fill="#FFFFFF" />
    <text x="28" y="36" textAnchor="middle" fill="#BE185D" fontSize="10" fontWeight="900" fontFamily="'Fredoka', sans-serif">1</text>
    
    {/* First word tile */}
    <rect x="42" y="24" width="38" height="16" rx="4" fill="#10B981" stroke="#059669" strokeWidth="1.5" />
    <text x="61" y="35" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="'Fredoka', sans-serif">Anis</text>
    
    {/* Second word tile */}
    <rect x="18" y="48" width="40" height="16" rx="4" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="1.5" />
    <text x="38" y="59" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="900" fontFamily="'Fredoka', sans-serif">memakai</text>
    
    {/* Third word tile */}
    <rect x="62" y="48" width="22" height="16" rx="4" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
    <text x="73" y="59" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="'Fredoka', sans-serif">beg</text>

    {/* Underline */}
    <line x1="18" y1="74" x2="82" y2="74" stroke="#C4B5FD" strokeWidth="2.5" strokeDasharray="4,3" strokeLinecap="round" />
  </svg>
);

const NotepadIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    <rect x="20" y="20" width="60" height="68" rx="6" fill="#fffbeb" stroke="#f59e0b" strokeWidth="3" />
    <line x1="30" y1="38" x2="70" y2="38" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
    <line x1="30" y1="50" x2="70" y2="50" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
    <line x1="30" y1="62" x2="60" y2="62" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
    <line x1="30" y1="74" x2="65" y2="74" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
    <rect x="36" y="14" width="28" height="12" rx="3" fill="#10b981" stroke="#047857" strokeWidth="2" />
  </svg>
);

const RainbowLettersIcon = () => (
  <svg className="w-9 h-7 sm:w-11 sm:h-8 flex-shrink-0" viewBox="0 0 120 70" fill="none">
    <text x="8" y="48" fill="#ef4444" fontSize="34" fontWeight="900" fontFamily="'Fredoka', sans-serif">A</text>
    <text x="34" y="48" fill="#f59e0b" fontSize="34" fontWeight="900" fontFamily="'Fredoka', sans-serif">B</text>
    <text x="62" y="48" fill="#10b981" fontSize="34" fontWeight="900" fontFamily="'Fredoka', sans-serif">C</text>
    <text x="90" y="48" fill="#3b82f6" fontSize="34" fontWeight="900" fontFamily="'Fredoka', sans-serif">D</text>
  </svg>
);

const StudentReadingIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    <path d="M15 50 Q50 44 50 82 Q15 76 15 50 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
    <path d="M85 50 Q50 44 50 82 Q85 76 85 50 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
    <path d="M18 52 Q50 47 50 80 Q18 75 18 52 Z" fill="#ffffff" />
    <path d="M82 52 Q50 47 50 80 Q82 75 82 52 Z" fill="#ffffff" />
    <circle cx="50" cy="30" r="16" fill="#fed7aa" />
    <path d="M34 26 C34 14, 66 14, 66 26 C60 20, 40 20, 34 26 Z" fill="#334155" />
    <circle cx="44" cy="30" r="2" fill="#1e293b" />
    <circle cx="56" cy="30" r="2" fill="#1e293b" />
    <path d="M46 36 Q50 40 54 36" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ---------------- NUMERACY SVG ICONS ----------------
const CountAndMatchIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    {/* Counting Apple & Number 3 */}
    <circle cx="34" cy="54" r="22" fill="#EF4444" stroke="#B91C1C" strokeWidth="2.5" />
    <ellipse cx="28" cy="46" rx="5" ry="3" fill="#FCA5A5" />
    <path d="M34 32 L34 22 Q40 18 44 24" stroke="#65A30D" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Number 3 badge */}
    <rect x="52" y="32" width="36" height="42" rx="8" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.5" />
    <text x="70" y="63" textAnchor="middle" fill="#713F12" fontSize="26" fontWeight="900" fontFamily="'Fredoka', sans-serif">3</text>
  </svg>
);

const NumberTrainIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    {/* Numbers 1 2 3 Blocks */}
    <rect x="8" y="30" width="26" height="34" rx="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
    <text x="21" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900" fontFamily="'Fredoka', sans-serif">1</text>
    <rect x="37" y="24" width="26" height="40" rx="6" fill="#4ADE80" stroke="#16A34A" strokeWidth="2" />
    <text x="50" y="52" textAnchor="middle" fill="#FFFFFF" fontSize="19" fontWeight="900" fontFamily="'Fredoka', sans-serif">2</text>
    <rect x="66" y="18" width="26" height="46" rx="6" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
    <text x="79" y="50" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="900" fontFamily="'Fredoka', sans-serif">3</text>
    {/* Upward Arrow */}
    <path d="M14 74 L86 74 M74 66 L86 74 L74 82" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AddMathIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    <rect x="12" y="14" width="76" height="72" rx="12" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2.5" />
    {/* Plus sign */}
    <circle cx="50" cy="50" r="24" fill="#F59E0B" />
    <path d="M50 36 L50 64 M36 50 L64 50" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

const SubtractMathIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    <rect x="12" y="14" width="76" height="72" rx="12" fill="#FFE4E6" stroke="#F43F5E" strokeWidth="2.5" />
    {/* Minus sign */}
    <circle cx="50" cy="50" r="24" fill="#F43F5E" />
    <path d="M34 50 L66 50" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

const GeometryShapesIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    {/* Circle */}
    <circle cx="28" cy="34" r="16" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
    {/* Triangle */}
    <polygon points="72,18 54,48 90,48" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.5" />
    {/* Square */}
    <rect x="18" y="58" width="28" height="28" rx="4" fill="#4ADE80" stroke="#16A34A" strokeWidth="2.5" />
    {/* Star */}
    <polygon points="72,56 76,68 88,68 78,75 82,87 72,80 62,87 66,75 56,68 68,68" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
  </svg>
);

const CompareBalanceIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    {/* Scale Pillar */}
    <rect x="46" y="24" width="8" height="54" fill="#78350F" rx="2" />
    <rect x="30" y="74" width="40" height="10" fill="#B45309" rx="3" />
    {/* Beam tilted */}
    <line x1="16" y1="36" x2="84" y2="28" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
    {/* Left Pan (Lower - heavier) */}
    <path d="M16 36 L10 58 L36 58 Z" fill="#FCD34D" stroke="#CA8A04" strokeWidth="1.5" />
    <circle cx="23" cy="50" r="5" fill="#EF4444" />
    {/* Right Pan (Higher - lighter) */}
    <path d="M84 28 L78 50 L96 50 Z" fill="#FCD34D" stroke="#CA8A04" strokeWidth="1.5" />
  </svg>
);

const MoneyCoinsIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    {/* RM Banknote */}
    <rect x="12" y="26" width="62" height="36" rx="4" fill="#34D399" stroke="#059669" strokeWidth="2" />
    <circle cx="43" cy="44" r="8" fill="#A7F3D0" />
    <text x="22" y="48" fill="#065F46" fontSize="10" fontWeight="900" fontFamily="'Fredoka', sans-serif">RM</text>
    {/* Golden Coin */}
    <circle cx="70" cy="58" r="20" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.5" />
    <circle cx="70" cy="58" r="14" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" strokeDasharray="3 3" />
    <text x="70" y="65" textAnchor="middle" fill="#713F12" fontSize="14" fontWeight="900" fontFamily="'Fredoka', sans-serif">50¢</text>
  </svg>
);

const ClockTimeIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="38" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="4" />
    <circle cx="50" cy="50" r="4" fill="#1E293B" />
    {/* Hour Hand pointing at 3 */}
    <line x1="50" y1="50" x2="68" y2="50" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
    {/* Minute Hand pointing at 12 */}
    <line x1="50" y1="50" x2="50" y2="24" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
    {/* Hour ticks */}
    <circle cx="50" cy="18" r="2.5" fill="#F59E0B" />
    <circle cx="82" cy="50" r="2.5" fill="#F59E0B" />
    <circle cx="50" cy="82" r="2.5" fill="#F59E0B" />
    <circle cx="18" cy="50" r="2.5" fill="#F59E0B" />
  </svg>
);

const PizzaFractionIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    {/* Pie Fraction: 1/2 */}
    <circle cx="50" cy="50" r="34" fill="#FDE047" stroke="#CA8A04" strokeWidth="3" />
    {/* Half colored */}
    <path d="M50 16 A34 34 0 0 1 50 84 Z" fill="#FB923C" stroke="#EA580C" strokeWidth="2" />
    <line x1="50" y1="16" x2="50" y2="84" stroke="#78350F" strokeWidth="3" />
    {/* 1/2 Text Badge */}
    <rect x="62" y="16" width="30" height="24" rx="4" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
    <text x="77" y="32" textAnchor="middle" fill="#0369A1" fontSize="12" fontWeight="900" fontFamily="'Fredoka', sans-serif">½</text>
  </svg>
);

const MathCrosswordIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    {/* Math Crossword Grid */}
    <rect x="14" y="14" width="32" height="32" rx="4" fill="#818CF8" stroke="#4338CA" strokeWidth="2.5" />
    <text x="30" y="38" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900" fontFamily="'Fredoka', sans-serif">5</text>
    <rect x="54" y="14" width="32" height="32" rx="4" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" />
    <text x="70" y="38" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900" fontFamily="'Fredoka', sans-serif">+</text>
    <rect x="14" y="54" width="32" height="32" rx="4" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
    <text x="30" y="78" textAnchor="middle" fill="#713F12" fontSize="18" fontWeight="900" fontFamily="'Fredoka', sans-serif">=</text>
    <rect x="54" y="54" width="32" height="32" rx="4" fill="#34D399" stroke="#059669" strokeWidth="2.5" />
    <text x="70" y="78" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900" fontFamily="'Fredoka', sans-serif">7</text>
  </svg>
);

const SpeakerNumberSoundIcon = () => (
  <svg className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    <rect x="12" y="34" width="24" height="32" rx="4" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
    <polygon points="36,34 68,14 68,86 36,66" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
    <path d="M76 34 Q88 50 76 66" stroke="#EA580C" strokeWidth="4.5" strokeLinecap="round" fill="none" />
    <path d="M86 22 Q102 50 86 78" stroke="#EA580C" strokeWidth="4.5" strokeLinecap="round" fill="none" />
    <circle cx="24" cy="50" r="7" fill="#FEF08A" />
    <text x="24" y="54.5" textAnchor="middle" fill="#78350F" fontSize="11" fontWeight="900" fontFamily="'Fredoka', sans-serif">1</text>
  </svg>
);


/* =========================================================================
   3. RESPONSIVE NATURE PARK BACKGROUND (PURE VECTOR)
   ========================================================================= */

const NatureParkBackground = () => {
  const [cloudImgError, setCloudImgError] = useState(false);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Blue Sky Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-100" />

      {/* Floating Clouds (Custom Cloud Image OR Vector Fallback) */}
      {!cloudImgError ? (
        <>
          <img
            src={getAssetUrl("/images/cloud.png")}
            alt="Awan"
            onError={() => setCloudImgError(true)}
            className="absolute top-2 left-4 w-28 sm:w-40 object-contain drop-shadow-md opacity-90 animate-float"
          />
          <img
            src={getAssetUrl("/images/cloud.png")}
            alt="Awan"
            onError={() => setCloudImgError(true)}
            className="absolute top-8 right-6 w-36 sm:w-52 object-contain drop-shadow-md opacity-85 animate-float"
            style={{ animationDelay: '1.6s' }}
          />
          <img
            src={getAssetUrl("/images/cloud.png")}
            alt="Awan"
            onError={() => setCloudImgError(true)}
            className="absolute top-16 left-1/3 w-24 sm:w-36 object-contain drop-shadow-sm opacity-75 animate-float hidden sm:block"
            style={{ animationDelay: '2.8s' }}
          />
        </>
      ) : (
        <>
          <div className="absolute top-4 left-6 w-32 h-14 bg-white/80 rounded-full blur-[1px] animate-float" />
          <div className="absolute top-10 right-12 w-44 h-16 bg-white/80 rounded-full blur-[1px] animate-float" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-20 left-1/4 w-28 h-10 bg-white/60 rounded-full blur-[1px] animate-float" style={{ animationDelay: '2.8s' }} />
        </>
      )}

      {/* Lush Green Trees Framing Left & Right */}
      {/* Top-Left Tree Foliage */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-600/90 rounded-full blur-[1px]" />
      <div className="absolute top-6 -left-8 w-40 h-40 bg-green-500 rounded-full" />
      <div className="absolute -top-6 left-16 w-36 h-36 bg-lime-500/90 rounded-full" />

      {/* Top-Right Tree Foliage */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-600/90 rounded-full blur-[1px]" />
      <div className="absolute top-6 -right-8 w-40 h-40 bg-green-500 rounded-full" />
      <div className="absolute -top-6 right-16 w-36 h-36 bg-lime-500/90 rounded-full" />

      {/* Bottom Rolling Hills, Dirt Path & Wildflowers */}
      <svg
        className="absolute bottom-0 left-0 w-full h-40 sm:h-52 md:h-64"
        viewBox="0 0 1000 300"
        preserveAspectRatio="none"
      >
        {/* Background Hills */}
        <path d="M 0,140 Q 250,80 500,130 T 1000,100 L 1000,300 L 0,300 Z" fill="#34d399" />
        {/* Foreground Green Meadow */}
        <path d="M 0,170 Q 300,120 650,160 T 1000,140 L 1000,300 L 0,300 Z" fill="#10b981" />
        
        {/* Sandy Dirt Trail leading to center bottom */}
        <path d="M 220,300 C 350,210 440,210 480,160 C 520,110 540,150 660,300 Z" fill="#d97706" opacity="0.4" />
        <path d="M 240,300 C 360,220 450,220 485,170 C 515,130 535,165 640,300 Z" fill="#f59e0b" opacity="0.85" />
        <path d="M 290,300 C 390,235 460,230 490,180 C 520,145 540,180 590,300 Z" fill="#fbbf24" opacity="0.9" />

        {/* Colorful Flowers on the grass */}
        <circle cx="80" cy="220" r="9" fill="#f43f5e" /><circle cx="80" cy="220" r="3.5" fill="#fef08a" />
        <circle cx="130" cy="250" r="11" fill="#38bdf8" /><circle cx="130" cy="250" r="4" fill="#fef08a" />
        <circle cx="190" cy="230" r="9" fill="#eab308" /><circle cx="190" cy="230" r="3.5" fill="#ffffff" />
        
        <circle cx="810" cy="220" r="9" fill="#ec4899" /><circle cx="810" cy="220" r="3.5" fill="#fef08a" />
        <circle cx="870" cy="250" r="11" fill="#a855f7" /><circle cx="870" cy="250" r="4" fill="#fef08a" />
        <circle cx="930" cy="225" r="9" fill="#eab308" /><circle cx="930" cy="225" r="3.5" fill="#ffffff" />
      </svg>
    </div>
  );
};


/* =========================================================================
   4. MAIN RESPONSIVE GAME SELECTION MENU COMPONENT
   ========================================================================= */

export default function GameSelectionMenu({
  onSelectGame,
  onOpenSettings,
  orientation = 'portrait',
  currentSubject = 'literasi',
  onSubjectChange,
}) {
  const [selectedSubject, setSelectedSubject] = useState(currentSubject || 'literasi');
  const [lockedToast, setLockedToast] = useState(null);

  useEffect(() => {
    if (currentSubject) {
      setSelectedSubject(currentSubject);
    }
  }, [currentSubject]);

  const handleSubjectSwitch = (subj) => {
    if (subj === selectedSubject) return;
    playPopSound();
    setSelectedSubject(subj);
    if (onSubjectChange) onSubjectChange(subj);
  };

  const handleGameClick = (game) => {
    if (game.active && game.gameId) {
      playWhooshSound();
      onSelectGame(game.gameId);
    } else {
      playPopSound();
      setLockedToast(`${game.title} akan datang tidak lama lagi! 🌟`);
      setTimeout(() => setLockedToast(null), 2500);
    }
  };

  const LITERACY_GAMES_LIST = [
    {
      id: 1,
      number: '1',
      title: 'Laluan Huruf',
      subtitle: 'Kenal Abjad A-Z',
      active: true,
      gameId: 'trail',
      numColor: 'from-blue-400 to-sky-500 border-sky-300 text-white',
      titleColor: 'text-sky-600',
      bgHover: 'hover:bg-sky-50/90 hover:border-sky-400 hover:shadow-md',
      cardBorder: 'border-sky-300/80',
      cardBg: 'bg-sky-50/60',
      icon: <StackOfBooksIcon />,
    },
    {
      id: 2,
      number: '2',
      title: 'Tulis & Lukis',
      subtitle: 'Garisan & Warna',
      active: true,
      gameId: 'drawing',
      numColor: 'from-emerald-400 to-green-500 border-emerald-300 text-white',
      titleColor: 'text-emerald-600',
      bgHover: 'hover:bg-emerald-50/90 hover:border-emerald-400 hover:shadow-md',
      cardBorder: 'border-emerald-300/80',
      cardBg: 'bg-emerald-50/60',
      icon: <OpenNotebookIcon />,
    },
    {
      id: 3,
      number: '3',
      title: 'Kad Memori',
      subtitle: 'Padan Huruf A-a',
      active: true,
      gameId: 'memory',
      numColor: 'from-amber-400 to-orange-500 border-amber-300 text-white',
      titleColor: 'text-amber-600',
      bgHover: 'hover:bg-amber-50/90 hover:border-amber-400 hover:shadow-md',
      cardBorder: 'border-amber-300/80',
      cardBg: 'bg-amber-50/60',
      icon: <AlphabetBlocksIcon />,
    },
    {
      id: 4,
      number: '4',
      title: 'Seret & Padan',
      subtitle: 'Objek & Kata',
      active: true,
      gameId: 'dragmatch',
      numColor: 'from-pink-500 to-rose-500 border-rose-300 text-white',
      titleColor: 'text-rose-600',
      bgHover: 'hover:bg-rose-50/90 hover:border-rose-400 hover:shadow-md',
      cardBorder: 'border-rose-300/80',
      cardBg: 'bg-rose-50/60',
      icon: <DragAndDropMatchIcon />,
    },
    {
      id: 5,
      number: '5',
      title: 'Isi Tempat Kosong',
      subtitle: 'Lengkapkan Ayat',
      active: true,
      gameId: 'fillblank',
      numColor: 'from-sky-400 to-blue-500 border-sky-300 text-white',
      titleColor: 'text-sky-600',
      bgHover: 'hover:bg-sky-50/90 hover:border-sky-400 hover:shadow-md',
      cardBorder: 'border-sky-300/80',
      cardBg: 'bg-sky-50/60',
      icon: <FillInTheBlankIcon />,
    },
    {
      id: 6,
      number: '6',
      title: 'Pilih Jawapan',
      subtitle: 'Kuiz Bergambar',
      active: true,
      gameId: 'choosecorrect',
      numColor: 'from-purple-500 to-violet-600 border-purple-300 text-white',
      titleColor: 'text-purple-600',
      bgHover: 'hover:bg-purple-50/90 hover:border-purple-400 hover:shadow-md',
      cardBorder: 'border-purple-300/80',
      cardBg: 'bg-purple-50/60',
      icon: <ChooseCorrectQuizIcon />,
    },
    {
      id: 7,
      number: '7',
      title: 'Label Objek',
      subtitle: 'Bilik Darjah',
      active: true,
      gameId: 'labelobjects',
      numColor: 'from-teal-400 to-emerald-500 border-teal-300 text-white',
      titleColor: 'text-teal-600',
      bgHover: 'hover:bg-teal-50/90 hover:border-teal-400 hover:shadow-md',
      cardBorder: 'border-teal-300/80',
      cardBg: 'bg-teal-50/60',
      icon: <LabelObjectsTagIcon />,
    },
    {
      id: 8,
      number: '8',
      title: 'Teka Silang Kata',
      subtitle: 'Silang Kata Gambar',
      active: true,
      gameId: 'crossword',
      numColor: 'from-amber-400 to-orange-500 border-amber-300 text-white',
      titleColor: 'text-amber-600',
      bgHover: 'hover:bg-amber-50/90 hover:border-amber-400 hover:shadow-md',
      cardBorder: 'border-amber-300/80',
      cardBg: 'bg-amber-50/60',
      icon: <CrosswordPuzzleMenuIcon />,
    },
    {
      id: 9,
      number: '9',
      title: 'Susun Suku Kata',
      subtitle: 'Bina Perkataan',
      active: true,
      gameId: 'syllables',
      numColor: 'from-lime-400 to-emerald-500 border-lime-300 text-white',
      titleColor: 'text-lime-600',
      bgHover: 'hover:bg-lime-50/90 hover:border-lime-400 hover:shadow-md',
      cardBorder: 'border-lime-300/80',
      cardBg: 'bg-lime-50/60',
      icon: <SyllablePuzzleIcon />,
    },
    {
      id: 10,
      number: '10',
      title: 'Susun Ayat',
      subtitle: 'Bina Ayat Lengkap',
      active: true,
      gameId: 'sentence',
      numColor: 'from-purple-500 to-indigo-600 border-purple-300 text-white',
      titleColor: 'text-purple-600',
      bgHover: 'hover:bg-purple-50/90 hover:border-purple-400 hover:shadow-md',
      cardBorder: 'border-purple-300/80',
      cardBg: 'bg-purple-50/60',
      icon: <SentenceArrangeIcon />,
    },
  ];

  const MultiplicationSifirIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    <rect x="10" y="10" width="80" height="80" rx="16" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="28" fill="#F59E0B" />
    <path d="M38 38 L62 62 M62 38 L38 62" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
    <circle cx="24" cy="24" r="5" fill="#EF4444" />
    <circle cx="76" cy="76" r="5" fill="#10B981" />
  </svg>
);

const NumberDrawingCrayonIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none">
    <rect x="10" y="10" width="80" height="80" rx="16" fill="#FFE4E6" stroke="#F43F5E" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="28" fill="#FB7185" />
    <text x="32" y="62" fill="#FFFFFF" fontSize="32" fontWeight="bold" fontFamily="Fredoka">1</text>
    {/* Cute Crayon Icon */}
    <g transform="translate(48, 22) rotate(25)">
      <rect x="0" y="8" width="14" height="34" rx="3" fill="#FDE047" stroke="#EAB308" strokeWidth="2" />
      <path d="M0 8 L7 -4 L14 8 Z" fill="#F43F5E" stroke="#E11D48" strokeWidth="1.5" />
      <circle cx="7" cy="0" r="2" fill="#1E293B" />
      <line x1="2" y1="18" x2="12" y2="18" stroke="#EAB308" strokeWidth="1.5" />
    </g>
  </svg>
);

  const NUMERACY_GAMES_LIST = [
    {
      id: 1,
      number: '1',
      title: 'Kira & Warna',
      subtitle: 'Kira Bilangan',
      active: true,
      gameId: 'num_count',
      numColor: 'from-blue-400 to-sky-500 border-sky-300 text-white',
      titleColor: 'text-sky-600',
      bgHover: 'hover:bg-sky-50/90 hover:border-sky-400 hover:shadow-md',
      cardBorder: 'border-sky-300/80',
      cardBg: 'bg-sky-50/60',
      icon: <CountAndMatchIcon />,
    },
    {
      id: 2,
      number: '2',
      title: 'Susun Nombor',
      subtitle: 'Menaik & Menurun',
      active: true,
      gameId: 'num_order',
      numColor: 'from-emerald-400 to-green-500 border-emerald-300 text-white',
      titleColor: 'text-emerald-600',
      bgHover: 'hover:bg-emerald-50/90 hover:border-emerald-400 hover:shadow-md',
      cardBorder: 'border-emerald-300/80',
      cardBg: 'bg-emerald-50/60',
      icon: <NumberTrainIcon />,
    },
    {
      id: 3,
      number: '3',
      title: 'Kenal & Sebut',
      subtitle: 'Nombor 1 - 10',
      active: true,
      gameId: 'num_explore',
      numColor: 'from-amber-400 to-orange-500 border-amber-300 text-white',
      titleColor: 'text-amber-600',
      bgHover: 'hover:bg-amber-50/90 hover:border-amber-400 hover:shadow-md',
      cardBorder: 'border-amber-300/80',
      cardBg: 'bg-amber-50/60',
      icon: <SpeakerNumberSoundIcon />,
    },
    {
      id: 4,
      number: '4',
      title: 'Tulis & Lukis',
      subtitle: 'Nombor 0 - 10',
      active: true,
      gameId: 'num_drawing',
      numColor: 'from-rose-400 to-red-500 border-rose-300 text-white',
      titleColor: 'text-rose-600',
      bgHover: 'hover:bg-rose-50/90 hover:border-rose-400 hover:shadow-md',
      cardBorder: 'border-rose-300/80',
      cardBg: 'bg-rose-50/60',
      icon: <NumberDrawingCrayonIcon />,
    },
    {
      id: 5,
      number: '5',
      title: 'Bentuk & Pola',
      subtitle: 'Geometri & Corak',
      active: false,
      gameId: 'num_shapes',
      numColor: 'from-sky-400 to-blue-500 border-sky-300 text-white',
      titleColor: 'text-sky-600',
      bgHover: 'hover:bg-sky-50/90 hover:border-sky-400 hover:shadow-md',
      cardBorder: 'border-sky-300/80',
      cardBg: 'bg-sky-50/60',
      icon: <GeometryShapesIcon />,
    },
    {
      id: 6,
      number: '6',
      title: 'Lebih Kurang',
      subtitle: 'Banding Nilai',
      active: true,
      gameId: 'num_compare',
      numColor: 'from-purple-500 to-violet-600 border-purple-300 text-white',
      titleColor: 'text-purple-600',
      bgHover: 'hover:bg-purple-50/90 hover:border-purple-400 hover:shadow-md',
      cardBorder: 'border-purple-300/80',
      cardBg: 'bg-purple-50/60',
      icon: <CompareBalanceIcon />,
    },
    {
      id: 7,
      number: '7',
      title: 'Wang Saku',
      subtitle: 'Duit Syiling & RM',
      active: false,
      gameId: 'num_money',
      numColor: 'from-teal-400 to-emerald-500 border-teal-300 text-white',
      titleColor: 'text-teal-600',
      bgHover: 'hover:bg-teal-50/90 hover:border-teal-400 hover:shadow-md',
      cardBorder: 'border-teal-300/80',
      cardBg: 'bg-teal-50/60',
      icon: <MoneyCoinsIcon />,
    },
    {
      id: 8,
      number: '8',
      title: 'Waktu & Masa',
      subtitle: 'Kenal Jam & Waktu',
      active: false,
      gameId: 'num_time',
      numColor: 'from-amber-400 to-orange-500 border-amber-300 text-white',
      titleColor: 'text-amber-600',
      bgHover: 'hover:bg-amber-50/90 hover:border-amber-400 hover:shadow-md',
      cardBorder: 'border-amber-300/80',
      cardBg: 'bg-amber-50/60',
      icon: <ClockTimeIcon />,
    },
    {
      id: 9,
      number: '9',
      title: 'Cabaran Sifir',
      subtitle: 'Sifir 2, 4, 6 & Lebih',
      active: true,
      gameId: 'num_sifir',
      numColor: 'from-amber-400 to-orange-500 border-amber-300 text-white',
      titleColor: 'text-amber-600',
      bgHover: 'hover:bg-amber-50/90 hover:border-amber-400 hover:shadow-md',
      cardBorder: 'border-amber-300/80',
      cardBg: 'bg-amber-50/60',
      icon: <MultiplicationSifirIcon />,
    },
    {
      id: 10,
      number: '10',
      title: 'Silang Nombor',
      subtitle: 'Matematik Pintar',
      active: false,
      gameId: 'num_crossword',
      numColor: 'from-purple-500 to-indigo-600 border-purple-300 text-white',
      titleColor: 'text-purple-600',
      bgHover: 'hover:bg-purple-50/90 hover:border-purple-400 hover:shadow-md',
      cardBorder: 'border-purple-300/80',
      cardBg: 'bg-purple-50/60',
      icon: <MathCrosswordIcon />,
    },
  ];

  const [literasiTitleImgError, setLiterasiTitleImgError] = useState(false);
  const [numerasiTitleImgError, setNumerasiTitleImgError] = useState(false);

  const activeGameList =
    selectedSubject === 'numerasi' ? NUMERACY_GAMES_LIST : LITERACY_GAMES_LIST;
  const col1 = activeGameList.slice(0, 5);
  const col2 = activeGameList.slice(5, 10);

  const LITERACY_TITLE = [
    { char: 'L', bg: 'from-sky-400 to-blue-600' },
    { char: 'I', bg: 'from-emerald-400 to-green-600' },
    { char: 'T', bg: 'from-cyan-400 to-teal-600' },
    { char: 'E', bg: 'from-purple-400 to-violet-600' },
    { char: 'R', bg: 'from-amber-400 to-orange-600' },
    { char: 'A', bg: 'from-rose-400 to-red-600' },
    { char: 'S', bg: 'from-teal-400 to-emerald-600' },
    { char: 'I', bg: 'from-blue-400 to-indigo-600' },
  ];

  const NUMERACY_TITLE = [
    { char: 'N', bg: 'from-emerald-400 to-teal-600' },
    { char: 'U', bg: 'from-sky-400 to-blue-600' },
    { char: 'M', bg: 'from-amber-400 to-orange-600' },
    { char: 'E', bg: 'from-purple-400 to-violet-600' },
    { char: 'R', bg: 'from-rose-400 to-red-600' },
    { char: 'A', bg: 'from-cyan-400 to-teal-600' },
    { char: 'S', bg: 'from-lime-400 to-green-600' },
    { char: 'I', bg: 'from-indigo-400 to-purple-600' },
  ];

  const titleChars =
    selectedSubject === 'numerasi' ? NUMERACY_TITLE : LITERACY_TITLE;

  return (
    <div className="relative w-full h-full min-h-0 overflow-y-auto select-none font-['Nunito',sans-serif] flex flex-col items-center justify-between p-2 sm:p-3 md:p-4">
      {/* Pure Vector Scalable Nature Park Background */}
      <NatureParkBackground />

      {/* Floating Settings Button in Menu */}
      <button
        onClick={onOpenSettings}
        title="Tetapan Audio & Bunyi"
        className="absolute top-2 right-2 sm:top-3 sm:right-3 z-30 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-slate-900/85 hover:bg-slate-900 text-amber-300 hover:text-white rounded-full shadow-lg border-2 border-amber-400/80 font-['Fredoka'] font-bold text-[11px] sm:text-xs md:text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs"
      >
        <Settings className="w-3.5 h-3.5 text-amber-400" />
        <span>Tetapan</span>
      </button>

      {/* Floating Toast Notification for Locked Activities */}
      {lockedToast && (
        <div className="fixed top-14 z-50 animate-bounce bg-slate-900/95 text-amber-300 border-2 border-amber-400 px-4 py-2 rounded-full shadow-2xl font-extrabold text-xs sm:text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{lockedToast}</span>
        </div>
      )}

      {/* TOP HEADER: SUBJECT TOGGLE, MASCOTS & 3D BUBBLE TITLE / CUSTOM IMAGE LOGO */}
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center pt-1 sm:pt-2">
        {/* PROMINENT SUBJECT SWITCHER: LITERASI vs NUMERASI */}
        <div className="flex items-center bg-white/95 p-0.5 sm:p-1 rounded-full shadow-lg border-2 sm:border-3 border-amber-300 z-20 mb-1">
          <button
            onClick={() => handleSubjectSwitch('literasi')}
            className={`
              flex items-center gap-1.5 px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-full font-black text-xs sm:text-sm md:text-base font-['Fredoka'] transition-all cursor-pointer
              ${
                selectedSubject === 'literasi'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md scale-105 ring-2 ring-sky-300'
                  : 'text-slate-600 hover:bg-sky-50'
              }
            `}
          >
            <span>📚</span>
            <span>Literasi</span>
          </button>

          <button
            onClick={() => handleSubjectSwitch('numerasi')}
            className={`
              flex items-center gap-1.5 px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-full font-black text-xs sm:text-sm md:text-base font-['Fredoka'] transition-all cursor-pointer
              ${
                selectedSubject === 'numerasi'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md scale-105 ring-2 ring-emerald-300'
                  : 'text-slate-600 hover:bg-emerald-50'
              }
            `}
          >
            <span>🔢</span>
            <span>Numerasi</span>
          </button>
        </div>

        {/* 3D Bubble Title (LITERASI or NUMERASI) OR Custom Image Logo */}
        <div className="flex items-center justify-center gap-0.5 sm:gap-1.5 px-2 py-0.5 min-h-[44px] sm:min-h-[56px]">
          {selectedSubject === 'literasi' && !literasiTitleImgError ? (
            <div className="animate-title-bounce">
              <img
                src={getAssetUrl("/images/literasi-title.png")}
                alt="LITERASI"
                onError={() => setLiterasiTitleImgError(true)}
                className="h-12 sm:h-16 md:h-20 max-w-[85vw] object-contain drop-shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer filter brightness-105"
              />
            </div>
          ) : selectedSubject === 'numerasi' && !numerasiTitleImgError ? (
            <div className="animate-title-bounce">
              <img
                src={getAssetUrl("/images/numerasi-title.png")}
                alt="NUMERASI"
                onError={() => setNumerasiTitleImgError(true)}
                className="h-12 sm:h-16 md:h-20 max-w-[85vw] object-contain drop-shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer filter brightness-105"
              />
            </div>
          ) : (
            titleChars.map((item, idx) => (
              <span
                key={idx}
                className={`
                  inline-block font-black font-['Fredoka',cursive] text-xl sm:text-3xl md:text-4xl
                  px-1.5 sm:px-2.5 py-0.5 rounded-lg sm:rounded-xl text-white
                  bg-gradient-to-b ${item.bg} shadow-md sm:shadow-lg border-2 border-white
                  transform transition-transform hover:scale-110 cursor-pointer
                `}
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.25), 0 -1px 0 rgba(255,255,255,0.4)',
                }}
              >
                {item.char}
              </span>
            ))
          )}
        </div>

        {/* Pink Ribbon Banner: PILIH PERMAINAN */}
        <div className="relative mt-1 mb-1.5 flex items-center justify-center">
          <div className="w-3 sm:w-5 h-6 sm:h-7 bg-rose-400 transform -skew-y-6 rounded-l-md shadow-sm" />
          <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 text-white font-extrabold tracking-wider text-[11px] sm:text-xs md:text-sm px-4 sm:px-8 py-0.5 sm:py-1 shadow-md border-y-2 border-white uppercase flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-yellow-200" />
            <span>
              {selectedSubject === 'numerasi' ? 'Pilih Permainan Matematik' : 'Pilih Permainan Literasi'}
            </span>
            <Sparkles className="w-3 h-3 text-yellow-200" />
          </div>
          <div className="w-3 sm:w-5 h-6 sm:h-7 bg-rose-400 transform skew-y-6 rounded-r-md shadow-sm" />
        </div>
      </div>

      {/* CENTER MAIN WHITE ROUNDED CARD (10 ACTIVITY SLOTS) WITH MASCOTS SITTING ON TOP */}
      <div className="relative z-10 w-full max-w-md sm:max-w-xl md:max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-2 sm:p-3 md:p-4 shadow-xl sm:shadow-2xl border-2 sm:border-4 border-white/90 my-auto pt-3 sm:pt-4">
        {/* Mascots Sitting / Standing Prominently on Top of Game Card */}
        <div className="absolute -top-21 sm:-top-25 md:-top-28 left-0 sm:left-2 z-20 pointer-events-none">
          <CuteBoyMascot className="w-15 h-19 sm:w-18 sm:h-24 md:w-22 md:h-28" />
        </div>
        <div className="absolute -top-20 sm:-top-24 md:-top-28 right-0 sm:right-2 z-20 pointer-events-none">
          <CuteGirlMascot className="w-16 h-20 sm:w-20 sm:h-26 md:w-24 md:h-30" />
        </div>
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5">
          {/* Column 1 (Activities 1 to 5) */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            {col1.map((game) => (
              <button
                key={game.id}
                onClick={() => handleGameClick(game)}
                type="button"
                className={`
                  relative group flex items-center justify-between px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl
                  border-2 ${game.cardBorder} ${game.cardBg} ${game.bgHover}
                  h-[54px] sm:h-[60px] md:h-[64px]
                  transition-all duration-200 text-left overflow-hidden shadow-xs hover:shadow-sm
                  ${game.active ? 'cursor-pointer hover:scale-[1.02] active:scale-95' : 'cursor-pointer opacity-75 hover:opacity-90'}
                `}
              >
                {/* Left: 3D Number Badge */}
                <div
                  className={`
                    w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg sm:rounded-xl bg-gradient-to-br ${game.numColor}
                    border-2 flex items-center justify-center font-black font-['Fredoka']
                    text-xs sm:text-sm md:text-base shadow-xs flex-shrink-0 mr-1.5 sm:mr-2
                  `}
                >
                  {game.number}
                </div>

                {/* Middle: Title & Subtitle */}
                <div className="flex flex-col justify-center min-w-0 flex-1 pr-1">
                  <span className={`font-black text-[11px] sm:text-xs md:text-[13px] font-['Fredoka'] tracking-wide truncate leading-tight ${game.titleColor}`}>
                    {game.title}
                  </span>
                  <span className="text-[8.5px] sm:text-[9.5px] md:text-[10.5px] text-slate-500 font-bold leading-tight truncate">
                    {game.active ? (
                      <span className="text-emerald-600 font-bold">
                        {game.subtitle}
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5 flex-shrink-0" />
                        Akan Datang
                      </span>
                    )}
                  </span>
                </div>

                {/* Right: Graphic Icon */}
                <div className="flex items-center justify-center flex-shrink-0 ml-auto">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
                    {game.icon}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Column 2 (Activities 6 to 10) */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            {col2.map((game) => (
              <button
                key={game.id}
                onClick={() => handleGameClick(game)}
                type="button"
                className={`
                  relative group flex items-center justify-between px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl
                  border-2 ${game.cardBorder} ${game.cardBg} ${game.bgHover}
                  h-[54px] sm:h-[60px] md:h-[64px]
                  transition-all duration-200 text-left overflow-hidden shadow-xs hover:shadow-sm
                  ${game.active ? 'cursor-pointer hover:scale-[1.02] active:scale-95' : 'cursor-pointer opacity-75 hover:opacity-90'}
                `}
              >
                {/* Left: 3D Number Badge */}
                <div
                  className={`
                    w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg sm:rounded-xl bg-gradient-to-br ${game.numColor}
                    border-2 flex items-center justify-center font-black font-['Fredoka']
                    text-xs sm:text-sm md:text-base shadow-xs flex-shrink-0 mr-1.5 sm:mr-2
                  `}
                >
                  {game.number}
                </div>

                {/* Middle: Title & Subtitle */}
                <div className="flex flex-col justify-center min-w-0 flex-1 pr-1">
                  <span className={`font-black text-[11px] sm:text-xs md:text-[13px] font-['Fredoka'] tracking-wide truncate leading-tight ${game.titleColor}`}>
                    {game.title}
                  </span>
                  <span className="text-[8.5px] sm:text-[9.5px] md:text-[10.5px] text-slate-500 font-bold leading-tight truncate">
                    {game.active ? (
                      <span className="text-emerald-600 font-bold">
                        {game.subtitle}
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-0.5">
                        <Lock className="w-2.5 h-2.5 flex-shrink-0" />
                        Akan Datang
                      </span>
                    )}
                  </span>
                </div>

                {/* Right: Graphic Icon */}
                <div className="flex items-center justify-center flex-shrink-0 ml-auto">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
                    {game.icon}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM MASCOT: CUTE RABBIT READING BOOK (LITERASI) OR LION WITH BLOCKS (NUMERASI) */}
      <div className="relative z-10 pt-1 pb-1">
        {selectedSubject === 'numerasi' ? (
          <CuteFullBodyLionWithBlocks />
        ) : (
          <CuteRabbitReadingBook />
        )}
      </div>
    </div>
  );
}
