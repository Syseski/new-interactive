import { getAssetUrl } from "../../utils/assetHelper";
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Settings,
  BookOpen,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Award,
} from 'lucide-react';
import {
  playPopSound,
  playVictorySound,
  playWhooshSound,
  playMatchSuccessSound,
} from '../../utils/soundEffects';
import { GoldenStarIllustration, ThreeGoldenStarsCluster } from './PhonicsIllustration';

// Multi-Set Question Data
const GAME_SETS = [
  {
    id: 'set1',
    title: 'Set 1',
    subtitle: 'Cikgu Fatin',
    instruction: 'Isi menggunakan jawapan yang betul.',
    imageSrc: getAssetUrl('/images/fill-in/scene.png'),
    fallbackType: 'classroom',
    wordOptions: ['Baik', 'Sayang', 'Membantu', 'Cikgu'],
    sentences: [
      {
        id: 1,
        number: 1,
        prefix: 'Ini',
        suffix: 'Fatin.',
        answer: 'Cikgu',
      },
      {
        id: 2,
        number: 2,
        prefix: 'Cikgu Fatin seorang yang',
        suffix: '.',
        answer: 'Baik',
      },
      {
        id: 3,
        number: 3,
        prefix: 'Beliau selalu',
        suffix: 'murid-muridnya.',
        answer: 'Membantu',
      },
      {
        id: 4,
        number: 4,
        prefix: 'Semua murid',
        suffix: 'Cikgu Fatin.',
        answer: 'Sayang',
      },
    ],
  },
  {
    id: 'set2',
    title: 'Set 2',
    subtitle: 'Mencuci Motorsikal',
    instruction: 'Isi menggunakan jawapan yang betul.',
    imageSrc: getAssetUrl('/images/fill-in/scene2.png'),
    fallbackType: 'motorcycle',
    wordOptions: ['Membantu', 'Mengelap', 'Mencuci'],
    sentences: [
      {
        id: 1,
        number: 1,
        prefix: 'Hari ini hari minggu. Irfan rajin',
        suffix: 'ayahnya mencuci motorsikal.',
        answer: 'Membantu',
      },
      {
        id: 2,
        number: 2,
        prefix: 'Mereka',
        suffix: 'motorsikal pada waktu petang.',
        answer: 'Mencuci',
      },
      {
        id: 3,
        number: 3,
        prefix: 'Irfan dan ayahnya menggunakan kain yang bersih untuk',
        suffix: 'motorsikal.',
        answer: 'Mengelap',
      },
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
function ClassroomFallbackIllustration({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 500 320" className={className} fill="none">
      <defs>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
      </defs>
      {/* Wall */}
      <rect x="0" y="0" width="500" height="240" fill="url(#wallGrad)" />
      {/* Floor */}
      <rect x="0" y="240" width="500" height="80" fill="#E2E8F0" />
      {/* Whiteboard */}
      <rect x="140" y="40" width="220" height="130" rx="6" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="4" />
      <rect x="145" y="45" width="210" height="20" fill="#E0F2FE" />
      <text x="250" y="60" textAnchor="middle" fill="#0284C7" fontSize="11" fontWeight="bold" fontFamily="'Fredoka', sans-serif">
        Kepentingan Amalan Baik
      </text>
      <line x1="160" y1="85" x2="320" y2="85" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="160" y1="110" x2="300" y2="110" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="160" y1="135" x2="310" y2="135" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />

      {/* Clock on Wall */}
      <circle cx="430" cy="50" r="20" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
      <line x1="430" y1="50" x2="430" y2="38" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      <line x1="430" y1="50" x2="440" y2="50" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />

      {/* Notice Board Left */}
      <rect x="30" y="40" width="70" height="110" rx="4" fill="#FBBF24" stroke="#B45309" strokeWidth="3" />
      <rect x="38" y="50" width="54" height="24" rx="2" fill="#FFFFFF" />
      <rect x="38" y="82" width="54" height="24" rx="2" fill="#FFFFFF" />
      <rect x="38" y="114" width="54" height="24" rx="2" fill="#FFFFFF" />

      {/* Teacher (Cikgu Anis) Standing at Board */}
      <g transform="translate(300, 75)">
        <path d="M40 20 C25 20 20 40 22 75 C24 95 35 105 45 105 C55 105 66 95 68 75 C70 40 65 20 40 20 Z" fill="#FDA4AF" stroke="#E11D48" strokeWidth="2" />
        <ellipse cx="45" cy="48" rx="14" ry="16" fill="#FED7AA" />
        <circle cx="39" cy="46" r="2.5" fill="#1E293B" />
        <circle cx="51" cy="46" r="2.5" fill="#1E293B" />
        <path d="M42 54 Q45 58 48 54" stroke="#991B1B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M30 100 L15 200 L75 200 L60 100 Z" fill="#F472B6" stroke="#BE123C" strokeWidth="2" />
        <path d="M30 105 L-10 80" stroke="#F472B6" strokeWidth="8" strokeLinecap="round" />
        <circle cx="-10" cy="80" r="4" fill="#FED7AA" />
      </g>

      {/* Student Desks & Children */}
      <g transform="translate(60, 190)">
        <rect x="0" y="20" width="100" height="40" rx="4" fill="#D97706" stroke="#78350F" strokeWidth="2" />
        <circle cx="50" cy="-5" r="16" fill="#1E293B" />
        <ellipse cx="50" cy="2" rx="12" ry="10" fill="#FED7AA" />
        <path d="M35 15 L65 15 L70 45 L30 45 Z" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
        <path d="M62 10 L75 -15" stroke="#FED7AA" strokeWidth="6" strokeLinecap="round" />
      </g>

      <g transform="translate(200, 200)">
        <rect x="0" y="20" width="100" height="40" rx="4" fill="#D97706" stroke="#78350F" strokeWidth="2" />
        <circle cx="50" cy="-5" r="16" fill="#1E293B" />
        <ellipse cx="50" cy="2" rx="12" ry="10" fill="#FED7AA" />
        <path d="M35 15 L65 15 L70 45 L30 45 Z" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
      </g>
    </svg>
  );
}

// Fallback Motorcycle Wash Vector Illustration (Set 2)
function MotorcycleFallbackIllustration({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 500 320" className={className} fill="none">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#E0F2FE" />
        </linearGradient>
      </defs>
      {/* Sky & Porch background */}
      <rect x="0" y="0" width="500" height="220" fill="url(#skyGrad)" />
      {/* House Porch Wall */}
      <rect x="250" y="30" width="250" height="190" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="2" />
      <rect x="350" y="60" width="80" height="90" rx="4" fill="#93C5FD" stroke="#60A5FA" strokeWidth="3" />
      <line x1="390" y1="60" x2="390" y2="150" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="350" y1="105" x2="430" y2="105" stroke="#FFFFFF" strokeWidth="2" />
      {/* Ground / Porch Floor with Water */}
      <rect x="0" y="220" width="500" height="100" fill="#CBD5E1" />
      <ellipse cx="250" cy="280" rx="200" ry="25" fill="#93C5FD" opacity="0.5" />

      {/* Motorcycle (Blue & Black) */}
      <g transform="translate(160, 90)">
        {/* Wheels */}
        <circle cx="30" cy="130" r="30" fill="#334155" stroke="#1E293B" strokeWidth="5" />
        <circle cx="30" cy="130" r="14" fill="#94A3B8" />
        <circle cx="160" cy="130" r="30" fill="#334155" stroke="#1E293B" strokeWidth="5" />
        <circle cx="160" cy="130" r="14" fill="#94A3B8" />
        {/* Frame & Seat */}
        <path d="M30 130 L80 90 L130 90 L160 130 L100 135 Z" fill="#1E40AF" stroke="#1E3A8A" strokeWidth="3" />
        <path d="M80 85 L140 85 C145 85 150 90 145 95 L75 95 Z" fill="#0F172A" />
        {/* Handlebars & Headlight */}
        <path d="M50 85 L35 45 L55 40" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
        <circle cx="35" cy="45" r="9" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
        {/* Soap Bubbles on Bike */}
        <circle cx="65" cy="80" r="10" fill="#FFFFFF" opacity="0.8" stroke="#38BDF8" strokeWidth="1.5" />
        <circle cx="85" cy="75" r="7" fill="#FFFFFF" opacity="0.8" stroke="#38BDF8" strokeWidth="1.5" />
        <circle cx="120" cy="95" r="9" fill="#FFFFFF" opacity="0.8" stroke="#38BDF8" strokeWidth="1.5" />
      </g>

      {/* Father (Right) */}
      <g transform="translate(330, 95)">
        <circle cx="35" cy="25" r="18" fill="#1E293B" />
        <ellipse cx="35" cy="30" rx="14" ry="16" fill="#FED7AA" />
        <circle cx="30" cy="27" r="2.5" fill="#1E293B" />
        <circle cx="42" cy="27" r="2.5" fill="#1E293B" />
        <path d="M33 37 Q36 42 40 37" stroke="#991B1B" strokeWidth="1.5" fill="none" />
        <path d="M15 50 L55 50 L60 120 L10 120 Z" fill="#334155" />
        {/* Arm wiping bike */}
        <path d="M20 60 L-30 75" stroke="#FED7AA" strokeWidth="8" strokeLinecap="round" />
        <circle cx="-30" cy="75" r="8" fill="#FACC15" />
      </g>

      {/* Irfan / Boy (Left) */}
      <g transform="translate(70, 140)">
        <circle cx="30" cy="20" r="15" fill="#1E293B" />
        <ellipse cx="30" cy="24" rx="12" ry="13" fill="#FED7AA" />
        <circle cx="26" cy="22" r="2" fill="#1E293B" />
        <circle cx="35" cy="22" r="2" fill="#1E293B" />
        <path d="M28 30 Q30 34 33 30" stroke="#991B1B" strokeWidth="1.5" fill="none" />
        <path d="M15 40 L45 40 L50 95 L10 95 Z" fill="#2563EB" />
        {/* Arm wiping front */}
        <path d="M40 50 L75 45" stroke="#FED7AA" strokeWidth="7" strokeLinecap="round" />
        <circle cx="75" cy="45" r="7" fill="#FACC15" />
      </g>

      {/* Bucket & Water Hose */}
      <g transform="translate(170, 240)">
        <path d="M10 0 L35 0 L30 35 L15 35 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
        <ellipse cx="22.5" cy="2" rx="12.5" ry="4" fill="#BAE6FD" />
      </g>
    </svg>
  );
}

export default function FillInBlankGame({ orientation, onBackToMenu, onOpenSettings }) {
  // Current active set index (0 = Set 1, 1 = Set 2)
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  // Map of sentenceId -> filled word (e.g. { 1: 'Cikgu', 2: 'Baik' })
  const [filledAnswers, setFilledAnswers] = useState({});
  // Selected word card in the bank for tap-to-place
  const [selectedWord, setSelectedWord] = useState(null);
  // Shuffled word options in the bank for current set
  const [shuffledWords, setShuffledWords] = useState([]);
  // Currently dragged word
  const [draggedWord, setDraggedWord] = useState(null);
  // Drag over target blank id
  const [dragOverBlankId, setDragOverBlankId] = useState(null);
  // Image error fallback toggle per set
  const [imgFailed, setImgFailed] = useState(false);
  // Show celebration modal when all sentences in current set are correct
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);
  // Track completed set IDs
  const [completedSets, setCompletedSets] = useState({});

  const currentSet = GAME_SETS[currentSetIndex] || GAME_SETS[0];

  // Initialize or switch sets
  useEffect(() => {
    setFilledAnswers({});
    setSelectedWord(null);
    setShowCelebration(false);
    setHasCelebrated(false);
    setImgFailed(false);
    setShuffledWords(shuffleArray(currentSet.wordOptions));
  }, [currentSetIndex]);

  // Check for completion in active set
  useEffect(() => {
    const totalSentences = currentSet.sentences.length;
    let correctCount = 0;

    currentSet.sentences.forEach((s) => {
      if (filledAnswers[s.id] && filledAnswers[s.id].toLowerCase() === s.answer.toLowerCase()) {
        correctCount++;
      }
    });

    if (totalSentences > 0 && correctCount === totalSentences && !hasCelebrated) {
      setHasCelebrated(true);
      setShowCelebration(true);
      setCompletedSets((prev) => ({ ...prev, [currentSet.id]: true }));
      playVictorySound();
      confetti({
        particleCount: 120,
        spread: 85,
        origin: { y: 0.6 },
      });
    }
  }, [filledAnswers, hasCelebrated, currentSet]);

  // Handle placing a word into a sentence blank
  const handlePlaceWord = (sentenceId, word) => {
    if (!word) return;

    const sentence = currentSet.sentences.find((s) => s.id === sentenceId);
    if (!sentence) return;

    if (sentence.answer.toLowerCase() === word.toLowerCase()) {
      // Correct answer!
      playMatchSuccessSound();
    } else {
      // Placed, can be retried
      playPopSound();
    }

    setFilledAnswers((prev) => ({
      ...prev,
      [sentenceId]: word,
    }));
    setSelectedWord(null);
    setDraggedWord(null);
    setDragOverBlankId(null);
  };

  // Remove a word from a blank and return it to the bank
  const handleRemoveWord = (sentenceId) => {
    playWhooshSound();
    setFilledAnswers((prev) => {
      const updated = { ...prev };
      delete updated[sentenceId];
      return updated;
    });
  };

  // Drag handlers
  const handleDragStart = (e, word) => {
    setDraggedWord(word);
    e.dataTransfer.setData('text/plain', word);
  };

  const handleDragOver = (e, sentenceId) => {
    e.preventDefault();
    setDragOverBlankId(sentenceId);
  };

  const handleDragLeave = () => {
    setDragOverBlankId(null);
  };

  const handleDrop = (e, sentenceId) => {
    e.preventDefault();
    const word = e.dataTransfer.getData('text/plain') || draggedWord;
    if (word) {
      handlePlaceWord(sentenceId, word);
    }
    setDragOverBlankId(null);
  };

  // Tap handler on a word card in the bank
  const handleWordCardClick = (word) => {
    playPopSound();
    if (selectedWord === word) {
      setSelectedWord(null);
    } else {
      setSelectedWord(word);
    }
  };

  // Tap handler on a sentence blank
  const handleBlankClick = (sentenceId) => {
    if (filledAnswers[sentenceId]) {
      handleRemoveWord(sentenceId);
      return;
    }

    if (selectedWord) {
      handlePlaceWord(sentenceId, selectedWord);
    }
  };

  const handleResetCurrentSet = () => {
    playPopSound();
    setFilledAnswers({});
    setSelectedWord(null);
    setShowCelebration(false);
    setHasCelebrated(false);
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

  const isPortrait = orientation === 'portrait';
  const hasNextSet = currentSetIndex < GAME_SETS.length - 1;

  return (
    <div className="relative w-full h-full min-h-[620px] flex flex-col items-center justify-between bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-100 p-2 sm:p-4 select-none overflow-y-auto font-['Nunito']">
      {/* Top Header: Kembali ke Menu, Set Navigation & Tetapan */}
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
            onClick={handleResetCurrentSet}
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

      {/* Instruction & Set Info Banner */}
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

      {/* MAIN CONTAINER: Scene Image Box + Word Bank + Sentences */}
      <div className="w-full max-w-3xl flex flex-col gap-3 my-1">
        {/* 1. SCENE IMAGE DISPLAY BOX */}
        <div className="w-full bg-white/95 p-2 sm:p-3 rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-amber-300 shadow-xl overflow-hidden flex items-center justify-center">
          <div className="relative w-full max-h-[220px] sm:max-h-[280px] md:max-h-[320px] rounded-xl sm:rounded-2xl overflow-hidden bg-amber-50 flex items-center justify-center border border-amber-200/80">
            {!imgFailed ? (
              <img
                key={`${currentSet.id}-${currentSet.imageSrc}`}
                src={currentSet.imageSrc}
                alt={currentSet.subtitle}
                onError={() => {
                  setImgFailed(true);
                }}
                className="w-full h-full object-contain max-h-[220px] sm:max-h-[280px] md:max-h-[320px] drop-shadow-sm transition-transform hover:scale-[1.01]"
              />
            ) : (
              <div className="w-full h-full min-h-[180px] flex items-center justify-center">
                {currentSet.fallbackType === 'motorcycle' ? (
                  <MotorcycleFallbackIllustration />
                ) : (
                  <ClassroomFallbackIllustration />
                )}
              </div>
            )}
          </div>
        </div>

        {/* 2. DRAGGABLE / TAPPABLE WORD BANK (PILIHAN JAWAPAN) */}
        <div className="w-full bg-white/95 p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl border-3 border-amber-300 shadow-lg flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs sm:text-sm font-black text-amber-950 font-['Fredoka'] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Pilihan Jawapan ({currentSet.title}):</span>
            </span>
            {selectedWord && (
              <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full animate-pulse">
                Tekan petak ayat sasaran!
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 py-1">
            {shuffledWords.map((word) => {
              const isUsed = Object.values(filledAnswers).includes(word);
              const isSelected = selectedWord === word;

              return (
                <div
                  key={word}
                  draggable={!isUsed}
                  onDragStart={(e) => !isUsed && handleDragStart(e, word)}
                  onClick={() => !isUsed && handleWordCardClick(word)}
                  className={`
                    px-4 sm:px-6 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl font-black text-xs sm:text-base font-['Fredoka'] shadow-md select-none transition-all duration-150 border-2
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

        {/* 3. SENTENCES WITH BLANK SLOTS */}
        <div className="w-full bg-[#FAFAF9] p-3 sm:p-5 rounded-2xl sm:rounded-3xl border-3 border-amber-300 shadow-xl flex flex-col gap-3 sm:gap-4">
          {currentSet.sentences.map((sentence) => {
            const filledWord = filledAnswers[sentence.id];
            const isCorrect = filledWord && filledWord.toLowerCase() === sentence.answer.toLowerCase();
            const isDragOver = dragOverBlankId === sentence.id;
            const isSelectedTarget = !!selectedWord && !filledWord;

            return (
              <div
                key={sentence.id}
                className="flex items-center flex-wrap sm:flex-nowrap gap-2 sm:gap-3 text-slate-800 font-extrabold text-sm sm:text-lg font-['Nunito']"
              >
                {/* Star Number Badge */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-amber-400 text-amber-950 font-black text-xs sm:text-sm shadow-xs flex-shrink-0 font-['Fredoka']">
                  ⭐ {sentence.number}
                </div>

                {/* Sentence Flow: Prefix Text + Blank Box + Suffix Text */}
                <div className="flex items-center flex-wrap gap-2 leading-relaxed">
                  {sentence.prefix && <span>{sentence.prefix}</span>}

                  {/* Interactive Drop / Tap Blank Box */}
                  <div
                    onDragOver={(e) => handleDragOver(e, sentence.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, sentence.id)}
                    onClick={() => handleBlankClick(sentence.id)}
                    className={`
                      inline-flex items-center justify-center min-w-[95px] sm:min-w-[130px] h-8 sm:h-10 px-3 rounded-xl border-2 sm:border-3 font-black text-xs sm:text-base font-['Fredoka'] transition-all cursor-pointer select-none
                      ${
                        isCorrect
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-800 shadow-xs'
                          : filledWord
                          ? 'bg-amber-100 border-amber-500 text-amber-900 shadow-xs'
                          : isDragOver || isSelectedTarget
                          ? 'bg-amber-200 border-dashed border-amber-600 ring-2 ring-amber-400 animate-pulse text-amber-800'
                          : 'bg-slate-200/80 border-dashed border-slate-400 text-slate-400 hover:bg-slate-300/80'
                      }
                    `}
                    title={filledWord ? 'Tekan untuk padam jawapan' : 'Seret atau tekan jawapan di sini'}
                  >
                    {filledWord ? (
                      <div className="flex items-center gap-1.5">
                        {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                        <span>{filledWord}</span>
                        <XCircle className="w-3.5 h-3.5 text-slate-400 hover:text-rose-500 transition-colors ml-0.5" />
                      </div>
                    ) : (
                      <span className="text-[11px] sm:text-xs text-slate-400 font-semibold opacity-70">
                        [ Kosong ]
                      </span>
                    )}
                  </div>

                  {sentence.suffix && <span>{sentence.suffix}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* VICTORY CELEBRATION MODAL */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-4 border-amber-400 rounded-3xl p-5 sm:p-6 max-w-sm w-full shadow-2xl text-center animate-pop flex flex-col items-center">
            {/* 3D Shining Golden Star Reward Graphic */}
            <GoldenStarIllustration size={100} className="w-24 h-24 sm:w-28 sm:h-28 mb-1" animated={true} />

            {/* 3 Golden Stars Rating Cluster */}
            <ThreeGoldenStarsCluster className="mb-2" />

            <h3 className="text-2xl font-black text-emerald-600 font-['Fredoka'] mb-1">
              Tahniah! Cemerlang! 🎉
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm font-bold mb-4">
              {hasNextSet
                ? `Anda telah berjaya melengkapkan ${currentSet.title} (${currentSet.subtitle})!`
                : 'Hebat! Anda telah berjaya melengkapkan kesemua set soalan Isi Tempat Kosong!'}
            </p>

            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={() => {
                  playPopSound();
                  setShowCelebration(false);
                }}
                className="w-full py-2.5 px-4 bg-sky-100 hover:bg-sky-200 text-sky-800 font-black rounded-xl text-sm shadow-sm transition-all active:scale-95 font-['Fredoka'] cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>👁️</span>
                <span>Lihat Jawapan</span>
              </button>

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
                onClick={handleResetCurrentSet}
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
