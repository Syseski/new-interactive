import { getAssetUrl } from "../utils/assetHelper";
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Settings,
  Tag,
  XCircle,
  ChevronRight,
} from 'lucide-react';
import {
  playPopSound,
  playVictorySound,
  playWhooshSound,
  playMatchSuccessSound,
} from '../utils/soundEffects';
import { GoldenStarIllustration, ThreeGoldenStarsCluster } from './PhonicsIllustration';

// Multi-Set Data for Activity 7: Label Objek
const GAME_SETS = [
  {
    id: 'set1',
    title: 'Set 1',
    subtitle: 'Bilik Darjah',
    instruction: 'Isi menggunakan jawapan yang betul.',
    imageSrc: getAssetUrl('/images/label-objects/scene.png'),
    fallbackType: 'classroom',
    wordOptions: ['Kerusi', 'Pintu', 'Jam', 'Tingkap', 'Langsir', 'Papan Hitam'],
    slots: [
      { id: 1, number: 1, answer: 'Langsir', hint: 'Langsir pada tingkap' },
      { id: 2, number: 2, answer: 'Papan Hitam', hint: 'Papan hitam di hadapan kelas' },
      { id: 3, number: 3, answer: 'Jam', hint: 'Jam dinding di atas' },
      { id: 4, number: 4, answer: 'Tingkap', hint: 'Tingkap bilik darjah' },
      { id: 5, number: 5, answer: 'Kerusi', hint: 'Kerusi murid' },
      { id: 6, number: 6, answer: 'Pintu', hint: 'Pintu masuk kelas' },
    ],
  },
  {
    id: 'set2',
    title: 'Set 2',
    subtitle: 'Stesen Bas',
    instruction: 'Isi menggunakan jawapan yang betul.',
    imageSrc: getAssetUrl('/images/label-objects/scene2.png'),
    fallbackType: 'bus_station',
    wordOptions: ['Motor', 'Bas', 'Buku', 'Beg', 'Kereta', 'Pokok'],
    slots: [
      { id: 1, number: 1, answer: 'Kereta', hint: 'Kereta merah di jalan' },
      { id: 2, number: 2, answer: 'Buku', hint: 'Buku cerita murid' },
      { id: 3, number: 3, answer: 'Bas', hint: 'Bas ekspres' },
      { id: 4, number: 4, answer: 'Beg', hint: 'Beg sandang merah' },
      { id: 5, number: 5, answer: 'Pokok', hint: 'Pokok hijau di persekitaran' },
      { id: 6, number: 6, answer: 'Motor', hint: 'Motosikal berpenunggang' },
    ],
  },
];

// Helper to shuffle an array
function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Fallback Classroom Vector Illustration (Set 1)
function ClassroomLabelFallbackIllustration({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 600 380" className={className} fill="none">
      <defs>
        <linearGradient id="wallBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
      </defs>

      {/* Wall & Floor */}
      <rect x="0" y="0" width="600" height="280" fill="url(#wallBg)" />
      <rect x="0" y="280" width="600" height="100" fill="#E2E8F0" />

      {/* 4: Window & 1: Curtain */}
      <rect x="20" y="40" width="90" height="170" rx="4" fill="#BAE6FD" stroke="#0284C7" strokeWidth="4" />
      <line x1="65" y1="40" x2="65" y2="210" stroke="#0284C7" strokeWidth="3" />
      <line x1="20" y1="120" x2="110" y2="120" stroke="#0284C7" strokeWidth="3" />
      <path d="M100 35 Q125 100 115 210 L95 210 Q105 100 90 35 Z" fill="#FDA4AF" stroke="#E11D48" strokeWidth="2" />

      {/* 3: Clock */}
      <circle cx="210" cy="50" r="24" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
      <line x1="210" y1="50" x2="210" y2="34" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="210" y1="50" x2="222" y2="50" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />

      {/* 2: Blackboard */}
      <rect x="170" y="85" width="260" height="135" rx="6" fill="#166534" stroke="#78350F" strokeWidth="6" />

      {/* Notice Board */}
      <rect x="445" y="85" width="70" height="100" rx="4" fill="#FBBF24" stroke="#B45309" strokeWidth="3" />
      <rect x="453" y="95" width="54" height="35" rx="2" fill="#FFFFFF" />
      <rect x="453" y="140" width="54" height="35" rx="2" fill="#FFFFFF" />

      {/* 6: Door */}
      <rect x="530" y="65" width="60" height="215" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="4" />
      <rect x="540" y="80" width="40" height="85" rx="2" fill="#93C5FD" stroke="#60A5FA" strokeWidth="2" />
      <circle cx="545" cy="180" r="4" fill="#FACC15" />

      {/* Teacher Desk */}
      <rect x="80" y="200" width="130" height="75" rx="4" fill="#D97706" stroke="#78350F" strokeWidth="3" />

      {/* 5: Student Desk & Chair */}
      <g transform="translate(100, 240)">
        <rect x="0" y="15" width="110" height="40" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="2" />
        <rect x="25" y="-10" width="60" height="35" rx="6" fill="#1E40AF" stroke="#1E3A8A" strokeWidth="2" />
      </g>
      <g transform="translate(260, 250)">
        <rect x="0" y="15" width="110" height="40" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="2" />
        <rect x="25" y="-10" width="60" height="35" rx="6" fill="#1E40AF" stroke="#1E3A8A" strokeWidth="2" />
      </g>
      <g transform="translate(420, 250)">
        <rect x="0" y="15" width="110" height="40" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="2" />
        <rect x="25" y="-10" width="60" height="35" rx="6" fill="#1E40AF" stroke="#1E3A8A" strokeWidth="2" />
      </g>

      {/* Star Badges */}
      <g transform="translate(110, 50)">
        <polygon points="12,0 15,9 24,9 17,14 19,23 12,18 5,23 7,14 0,9 9,9" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
        <text x="12" y="15" textAnchor="middle" fill="#713F12" fontSize="11" fontWeight="bold">1</text>
      </g>
      <g transform="translate(175, 95)">
        <polygon points="12,0 15,9 24,9 17,14 19,23 12,18 5,23 7,14 0,9 9,9" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
        <text x="12" y="15" textAnchor="middle" fill="#713F12" fontSize="11" fontWeight="bold">2</text>
      </g>
      <g transform="translate(185, 30)">
        <polygon points="12,0 15,9 24,9 17,14 19,23 12,18 5,23 7,14 0,9 9,9" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
        <text x="12" y="15" textAnchor="middle" fill="#713F12" fontSize="11" fontWeight="bold">3</text>
      </g>
      <g transform="translate(25, 90)">
        <polygon points="12,0 15,9 24,9 17,14 19,23 12,18 5,23 7,14 0,9 9,9" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
        <text x="12" y="15" textAnchor="middle" fill="#713F12" fontSize="11" fontWeight="bold">4</text>
      </g>
      <g transform="translate(140, 245)">
        <polygon points="12,0 15,9 24,9 17,14 19,23 12,18 5,23 7,14 0,9 9,9" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
        <text x="12" y="15" textAnchor="middle" fill="#713F12" fontSize="11" fontWeight="bold">5</text>
      </g>
      <g transform="translate(560, 190)">
        <polygon points="12,0 15,9 24,9 17,14 19,23 12,18 5,23 7,14 0,9 9,9" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
        <text x="12" y="15" textAnchor="middle" fill="#713F12" fontSize="11" fontWeight="bold">6</text>
      </g>
    </svg>
  );
}

// Fallback Bus Station Vector Illustration (Set 2)
function BusStationFallbackIllustration({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 600 380" className={className} fill="none">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#E0F2FE" />
        </linearGradient>
      </defs>

      {/* Sky & Ground */}
      <rect x="0" y="0" width="600" height="220" fill="url(#skyGrad)" />
      <rect x="0" y="220" width="600" height="160" fill="#CBD5E1" />
      {/* Road asphalt */}
      <path d="M200 220 L600 220 L600 380 L350 380 Z" fill="#475569" />

      {/* 5: Trees */}
      <g transform="translate(420, 90)">
        <circle cx="30" cy="30" r="30" fill="#16A34A" />
        <circle cx="60" cy="25" r="35" fill="#22C55E" />
        <rect x="40" y="55" width="10" height="35" fill="#78350F" />
      </g>

      {/* Bus Station Roof & Sign */}
      <rect x="20" y="20" width="280" height="40" rx="4" fill="#1E40AF" stroke="#1E3A8A" strokeWidth="3" />
      <text x="160" y="46" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="bold" fontFamily="'Fredoka', sans-serif">
        🚏 STESEN BAS
      </text>
      <rect x="30" y="60" width="8" height="160" fill="#64748B" />
      <rect x="280" y="60" width="8" height="160" fill="#64748B" />

      {/* 3: Express Bus */}
      <g transform="translate(130, 80)">
        <rect x="0" y="10" width="230" height="140" rx="12" fill="#DC2626" stroke="#991B1B" strokeWidth="4" />
        <rect x="0" y="70" width="230" height="60" fill="#2563EB" />
        <rect x="20" y="25" width="190" height="45" rx="6" fill="#93C5FD" stroke="#1E3A8A" strokeWidth="2" />
        <text x="115" y="45" textAnchor="middle" fill="#FEF08A" fontSize="12" fontWeight="bold">KUALA LUMPUR</text>
        <circle cx="45" cy="150" r="18" fill="#1E293B" stroke="#64748B" strokeWidth="3" />
        <circle cx="185" cy="150" r="18" fill="#1E293B" stroke="#64748B" strokeWidth="3" />
      </g>

      {/* 1: Red Car */}
      <g transform="translate(380, 180)">
        <rect x="0" y="25" width="130" height="50" rx="10" fill="#EF4444" stroke="#B91C1C" strokeWidth="3" />
        <path d="M20 25 L40 5 L95 5 L115 25 Z" fill="#93C5FD" stroke="#B91C1C" strokeWidth="2" />
        <circle cx="30" cy="75" r="14" fill="#1E293B" />
        <circle cx="100" cy="75" r="14" fill="#1E293B" />
      </g>

      {/* 6: Blue Motorcycle */}
      <g transform="translate(420, 240)">
        <circle cx="20" cy="50" r="18" fill="#1E293B" />
        <circle cx="90" cy="50" r="18" fill="#1E293B" />
        <path d="M20 50 L50 25 L80 25 L90 50 Z" fill="#2563EB" stroke="#1E40AF" strokeWidth="3" />
        <circle cx="60" cy="5" r="12" fill="#1E293B" />
      </g>

      {/* Blue Bench with Boy (2: Buku) & (4: Beg) */}
      <g transform="translate(20, 230)">
        {/* Bench */}
        <rect x="0" y="30" width="120" height="12" rx="3" fill="#2563EB" stroke="#1D4ED8" strokeWidth="2" />
        <rect x="10" y="42" width="6" height="30" fill="#1E293B" />
        <rect x="105" y="42" width="6" height="30" fill="#1E293B" />

        {/* Boy reading book */}
        <circle cx="45" cy="0" r="14" fill="#FED7AA" />
        <path d="M35 14 L55 14 L60 45 L30 45 Z" fill="#16A34A" />
        {/* 2: Book */}
        <rect x="35" y="16" width="22" height="16" rx="2" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />

        {/* 4: Backpack Red */}
        <rect x="75" y="15" width="25" height="30" rx="6" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
      </g>

      {/* Star Badges */}
      <g transform="translate(430, 200)">
        <polygon points="12,0 15,9 24,9 17,14 19,23 12,18 5,23 7,14 0,9 9,9" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
        <text x="12" y="15" textAnchor="middle" fill="#713F12" fontSize="11" fontWeight="bold">1</text>
      </g>
      <g transform="translate(55, 240)">
        <polygon points="12,0 15,9 24,9 17,14 19,23 12,18 5,23 7,14 0,9 9,9" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
        <text x="12" y="15" textAnchor="middle" fill="#713F12" fontSize="11" fontWeight="bold">2</text>
      </g>
      <g transform="translate(260, 150)">
        <polygon points="12,0 15,9 24,9 17,14 19,23 12,18 5,23 7,14 0,9 9,9" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
        <text x="12" y="15" textAnchor="middle" fill="#713F12" fontSize="11" fontWeight="bold">3</text>
      </g>
      <g transform="translate(105, 255)">
        <polygon points="12,0 15,9 24,9 17,14 19,23 12,18 5,23 7,14 0,9 9,9" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
        <text x="12" y="15" textAnchor="middle" fill="#713F12" fontSize="11" fontWeight="bold">4</text>
      </g>
      <g transform="translate(450, 95)">
        <polygon points="12,0 15,9 24,9 17,14 19,23 12,18 5,23 7,14 0,9 9,9" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
        <text x="12" y="15" textAnchor="middle" fill="#713F12" fontSize="11" fontWeight="bold">5</text>
      </g>
      <g transform="translate(480, 275)">
        <polygon points="12,0 15,9 24,9 17,14 19,23 12,18 5,23 7,14 0,9 9,9" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
        <text x="12" y="15" textAnchor="middle" fill="#713F12" fontSize="11" fontWeight="bold">6</text>
      </g>
    </svg>
  );
}

export default function LabelObjectGame({ orientation, onBackToMenu, onOpenSettings }) {
  // Current active set index (0 = Set 1: Bilik Darjah, 1 = Set 2: Stesen Bas)
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  // Map of slotId -> filled word
  const [filledAnswers, setFilledAnswers] = useState({});
  // Selected word in word bank for tap-to-place
  const [selectedWord, setSelectedWord] = useState(null);
  // Shuffled words for active set
  const [shuffledWords, setShuffledWords] = useState([]);
  // Dragged word
  const [draggedWord, setDraggedWord] = useState(null);
  // Target slot id being dragged over
  const [dragOverSlotId, setDragOverSlotId] = useState(null);
  // Image error fallback toggle per set
  const [imgFailed, setImgFailed] = useState(false);
  // Celebration state
  const [showCelebration, setShowCelebration] = useState(false);
  // Completed sets tracker
  const [completedSets, setCompletedSets] = useState({});

  const currentSet = GAME_SETS[currentSetIndex] || GAME_SETS[0];

  // Initialize and shuffle options on set change
  useEffect(() => {
    setFilledAnswers({});
    setSelectedWord(null);
    setShowCelebration(false);
    setImgFailed(false);
    setShuffledWords(shuffleArray(currentSet.wordOptions));
  }, [currentSetIndex]);

  // Check completion
  useEffect(() => {
    const totalSlots = currentSet.slots.length;
    let correctCount = 0;

    currentSet.slots.forEach((slot) => {
      if (filledAnswers[slot.id] && filledAnswers[slot.id].toLowerCase() === slot.answer.toLowerCase()) {
        correctCount++;
      }
    });

    if (totalSlots > 0 && correctCount === totalSlots && !showCelebration) {
      setShowCelebration(true);
      setCompletedSets((prev) => ({ ...prev, [currentSet.id]: true }));
      playVictorySound();
      confetti({
        particleCount: 130,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  }, [filledAnswers, showCelebration, currentSet]);

  // Place word into a slot
  const handlePlaceWord = (slotId, word) => {
    if (!word) return;

    const slot = currentSet.slots.find((s) => s.id === slotId);
    if (!slot) return;

    if (slot.answer.toLowerCase() === word.toLowerCase()) {
      playMatchSuccessSound();
    } else {
      playPopSound();
    }

    setFilledAnswers((prev) => ({
      ...prev,
      [slotId]: word,
    }));
    setSelectedWord(null);
    setDraggedWord(null);
    setDragOverSlotId(null);
  };

  // Remove word from a slot
  const handleRemoveWord = (slotId) => {
    playWhooshSound();
    setFilledAnswers((prev) => {
      const updated = { ...prev };
      delete updated[slotId];
      return updated;
    });
  };

  // Drag & Drop
  const handleDragStart = (e, word) => {
    setDraggedWord(word);
    e.dataTransfer.setData('text/plain', word);
  };

  const handleDragOver = (e, slotId) => {
    e.preventDefault();
    setDragOverSlotId(slotId);
  };

  const handleDragLeave = () => {
    setDragOverSlotId(null);
  };

  const handleDrop = (e, slotId) => {
    e.preventDefault();
    const word = e.dataTransfer.getData('text/plain') || draggedWord;
    if (word) {
      handlePlaceWord(slotId, word);
    }
    setDragOverSlotId(null);
  };

  // Tap handler on word bank card
  const handleWordClick = (word) => {
    playPopSound();
    if (selectedWord === word) {
      setSelectedWord(null);
    } else {
      setSelectedWord(word);
    }
  };

  // Tap handler on a target star slot
  const handleSlotClick = (slotId) => {
    if (filledAnswers[slotId]) {
      handleRemoveWord(slotId);
      return;
    }

    if (selectedWord) {
      handlePlaceWord(slotId, selectedWord);
    }
  };

  const handleReset = () => {
    playPopSound();
    setFilledAnswers({});
    setSelectedWord(null);
    setShowCelebration(false);
    setShuffledWords(shuffleArray(currentSet.wordOptions));
  };

  const handleSwitchSet = (idx) => {
    if (idx === currentSetIndex) return;
    playPopSound();
    setCurrentSetIndex(idx);
  };

  const handleNextSet = () => {
    if (currentSetIndex < GAME_SETS.length - 1) {
      playPopSound();
      setCurrentSetIndex(currentSetIndex + 1);
    }
  };

  const hasNextSet = currentSetIndex < GAME_SETS.length - 1;

  return (
    <div className="relative w-full h-full min-h-[620px] flex flex-col items-center justify-between bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-100 p-2 sm:p-4 select-none overflow-y-auto font-['Nunito']">
      {/* 1. TOP HEADER: Kembali ke Menu, Set Navigation & Tetapan */}
      <div className="w-full max-w-3xl flex items-center justify-between gap-2 z-20 mb-1 px-1">
        {/* Back Button */}
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md border-2 border-emerald-300 transition-all hover:scale-105 active:scale-95 cursor-pointer font-['Fredoka']"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        {/* Set Selector Pills */}
        <div className="flex items-center gap-1.5 bg-white/95 px-2 py-1 rounded-full shadow-sm border-2 border-amber-300">
          {GAME_SETS.map((set, idx) => {
            const isActive = idx === currentSetIndex;
            const isSetDone = completedSets[set.id];

            return (
              <button
                key={set.id}
                onClick={() => handleSwitchSet(idx)}
                className={`
                  flex items-center gap-1 px-3 py-1 rounded-full font-black text-xs font-['Fredoka'] transition-all cursor-pointer
                  ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-xs scale-105'
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-900'
                  }
                `}
              >
                <span>{set.title}</span>
                {isSetDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Actions (Reset & Settings) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleReset}
            title="Set Semula"
            className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full shadow-sm border border-amber-300 transition-transform active:scale-90 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenSettings}
            title="Tetapan Audio"
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800/90 hover:bg-slate-800 text-amber-300 font-bold text-xs rounded-full shadow-md border border-slate-700 transition-transform active:scale-95 cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Tetapan</span>
          </button>
        </div>
      </div>

      {/* 2. INSTRUCTION & SUBTITLE BANNER */}
      <div className="w-full max-w-3xl flex items-center justify-between gap-2 z-20 mb-2 px-1">
        <div className="flex-1 flex items-center justify-between bg-gradient-to-r from-amber-200 via-amber-100 to-orange-200 px-4 py-2 rounded-2xl shadow-sm border-2 border-amber-400">
          <p className="text-xs sm:text-sm md:text-base font-extrabold text-amber-950 font-['Fredoka'] tracking-wide">
            {currentSet.instruction}
          </p>
          <span className="text-[11px] sm:text-xs font-black text-amber-800 bg-amber-300/80 px-2.5 py-0.5 rounded-lg border border-amber-400">
            {currentSet.subtitle}
          </span>
        </div>
      </div>

      {/* 3. MAIN WORK AREA */}
      <div className="w-full max-w-3xl flex flex-col gap-3 my-1">
        {/* A. SCENE IMAGE DISPLAY WITH LABELED STARS */}
        <div className="w-full bg-white/95 p-2 sm:p-3 rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-amber-300 shadow-xl overflow-hidden flex items-center justify-center">
          <div className="relative w-full max-h-[240px] sm:max-h-[300px] md:max-h-[340px] rounded-xl sm:rounded-2xl overflow-hidden bg-amber-50 flex items-center justify-center border border-amber-200/80">
            {!imgFailed ? (
              <img
                key={`${currentSet.id}-${currentSet.imageSrc}`}
                src={currentSet.imageSrc}
                alt={currentSet.subtitle}
                onError={() => {
                  setImgFailed(true);
                }}
                className="w-full h-full object-contain max-h-[240px] sm:max-h-[300px] md:max-h-[340px] drop-shadow-sm transition-transform hover:scale-[1.01]"
              />
            ) : (
              <div className="w-full h-full min-h-[200px] flex items-center justify-center">
                {currentSet.fallbackType === 'bus_station' ? (
                  <BusStationFallbackIllustration />
                ) : (
                  <ClassroomLabelFallbackIllustration />
                )}
              </div>
            )}
          </div>
        </div>

        {/* B. WORD BANK (PILIHAN JAWAPAN) */}
        <div className="w-full bg-white/95 p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl border-3 border-amber-300 shadow-lg flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs sm:text-sm font-black text-amber-950 font-['Fredoka'] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Pilihan Jawapan ({currentSet.title}):</span>
            </span>
            {selectedWord && (
              <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full animate-pulse">
                Tekan petak bintang sasaran!
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-1">
            {shuffledWords.map((word) => {
              const isUsed = Object.values(filledAnswers).includes(word);
              const isSelected = selectedWord === word;

              return (
                <div
                  key={word}
                  draggable={!isUsed}
                  onDragStart={(e) => !isUsed && handleDragStart(e, word)}
                  onClick={() => !isUsed && handleWordClick(word)}
                  className={`
                    px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl font-black text-xs sm:text-base font-['Fredoka'] shadow-md select-none transition-all duration-150 border-2
                    ${
                      isUsed
                        ? 'bg-slate-100 text-slate-300 border-slate-200 opacity-40 cursor-default shadow-none'
                        : isSelected
                        ? 'bg-amber-400 text-slate-900 border-amber-600 scale-110 ring-4 ring-amber-300 shadow-xl animate-bounce cursor-pointer'
                        : 'bg-[#FED7AA] hover:bg-[#FDBA74] text-amber-950 border-[#EA580C] hover:scale-105 active:scale-95 cursor-grab active:cursor-grabbing shadow-sm'
                    }
                  `}
                >
                  <span>{word}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* C. 6 STAR NUMBER SLOTS (2-COLUMN GRID) */}
        <div className="w-full bg-[#FAFAF9] p-2.5 sm:p-4 rounded-2xl sm:rounded-3xl border-3 border-amber-300 shadow-xl">
          <div className="grid grid-cols-2 gap-2 sm:gap-3.5">
            {currentSet.slots.map((slot) => {
              const filledWord = filledAnswers[slot.id];
              const isCorrect = filledWord && filledWord.toLowerCase() === slot.answer.toLowerCase();
              const isDragOver = dragOverSlotId === slot.id;
              const isSelectedTarget = !!selectedWord && !filledWord;

              return (
                <div
                  key={slot.id}
                  className="flex items-center gap-1.5 sm:gap-3 bg-white p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl border-2 border-amber-200 shadow-xs hover:border-amber-400 transition-all"
                >
                  {/* Star Badge with Number */}
                  <div className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-amber-400 text-amber-950 font-black text-xs sm:text-sm shadow-xs flex-shrink-0 font-['Fredoka']">
                    ⭐ {slot.number}
                  </div>

                  {/* Drop / Tap Slot */}
                  <div
                    onDragOver={(e) => handleDragOver(e, slot.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, slot.id)}
                    onClick={() => handleSlotClick(slot.id)}
                    className={`
                      flex-1 flex items-center justify-center h-9 sm:h-11 px-1.5 sm:px-3 rounded-lg sm:rounded-xl border-2 sm:border-3 font-black text-xs sm:text-sm font-['Fredoka'] transition-all cursor-pointer select-none min-w-0
                      ${
                        isCorrect
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-800 shadow-xs'
                          : filledWord
                          ? 'bg-amber-100 border-amber-500 text-amber-900 shadow-xs'
                          : isDragOver || isSelectedTarget
                          ? 'bg-amber-200 border-dashed border-amber-600 ring-2 ring-amber-400 animate-pulse text-amber-800'
                          : 'bg-slate-100 border-dashed border-slate-300 text-slate-400 hover:bg-slate-200/70'
                      }
                    `}
                    title={filledWord ? 'Tekan untuk padam jawapan' : 'Seret atau tekan jawapan di sini'}
                  >
                    {filledWord ? (
                      <div className="flex items-center gap-1 min-w-0">
                        {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />}
                        <span className="truncate">{filledWord}</span>
                        <XCircle className="w-3 h-3 text-slate-400 hover:text-rose-500 transition-colors flex-shrink-0 ml-0.5" />
                      </div>
                    ) : (
                      <span className="text-[11px] sm:text-xs text-slate-400 font-semibold opacity-70">
                        [ Kosong ]
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. VICTORY CELEBRATION MODAL */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-4 border-amber-400 rounded-3xl p-5 sm:p-6 max-w-sm w-full shadow-2xl text-center animate-pop flex flex-col items-center">
            {/* 3D Shining Golden Star Graphic */}
            <GoldenStarIllustration size={100} className="w-24 h-24 sm:w-28 sm:h-28 mb-1" animated={true} />

            {/* 3 Golden Stars Rating */}
            <ThreeGoldenStarsCluster className="mb-2" />

            <h3 className="text-2xl font-black text-emerald-600 font-['Fredoka'] mb-1">
              Tahniah! Cemerlang! 🎉
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm font-bold mb-4">
              {hasNextSet
                ? `Anda berjaya melabel kesemua 6 objek dalam ${currentSet.title} (${currentSet.subtitle})!`
                : 'Hebat! Anda telah berjaya melengkapkan kesemua set soalan Label Objek!'}
            </p>

            <div className="flex flex-col gap-2 w-full">
              {hasNextSet ? (
                <button
                  onClick={handleNextSet}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black rounded-xl text-sm shadow-md transition-all active:scale-95 font-['Fredoka'] cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Seterusnya (Set 2)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : null}

              <button
                onClick={handleReset}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black rounded-xl text-sm shadow-md transition-all active:scale-95 font-['Fredoka'] cursor-pointer"
              >
                Main Semula Set Ini
              </button>

              <button
                onClick={onBackToMenu}
                className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm transition-all font-['Fredoka'] cursor-pointer"
              >
                Kembali ke Menu Utama
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
