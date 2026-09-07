import { getAssetUrl } from "../utils/assetHelper";
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Settings,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Trophy,
  Flame,
  Award,
  RefreshCw,
} from 'lucide-react';
import {
  playPopSound,
  playVictorySound,
  playWhooshSound,
  playMatchSuccessSound,
  playOopsSound,
} from '../utils/soundEffects';
import { GoldenStarIllustration, ThreeGoldenStarsCluster } from './PhonicsIllustration';

// Cute Vector or Custom Image Object Item for Sets
function ObjectItem({ type, size = 'normal' }) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses =
    size === 'large'
      ? 'w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20'
      : 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14';

  if (!imgError) {
    return (
      <img
        src={getAssetUrl(`/images/numerasi-compare/${type}.png`)}
        alt={type}
        onError={() => setImgError(true)}
        className={`${sizeClasses} object-contain drop-shadow-md hover:scale-115 transition-transform duration-200 cursor-pointer animate-float`}
        style={{ animationDuration: `${2.5 + (type.charCodeAt(0) % 3) * 0.5}s` }}
      />
    );
  }

  switch (type) {
    case 'mangga':
      return (
        <svg viewBox="0 0 60 60" className={`${sizeClasses} drop-shadow-md hover:scale-115 transition-transform`} fill="none">
          <path d="M30 14 C32 8 36 6 42 8 C40 12 36 14 30 14 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
          <path d="M30 14 Q28 8 26 4" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
          <path
            d="M26 14 C14 16 8 28 12 40 C16 52 32 54 42 46 C50 38 48 22 38 15 C34 13 28 13 26 14 Z"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="2"
          />
          <path d="M14 26 C16 20 24 16 32 16" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="22" cy="44" rx="4" ry="7" fill="#F97316" opacity="0.6" transform="rotate(-20 22 44)" />
        </svg>
      );

    case 'manggis':
      return (
        <svg viewBox="0 0 60 60" className={`${sizeClasses} drop-shadow-md hover:scale-115 transition-transform`} fill="none">
          <ellipse cx="30" cy="18" rx="8" ry="4" fill="#15803D" />
          <circle cx="22" cy="18" r="4.5" fill="#22C55E" stroke="#15803D" strokeWidth="1" />
          <circle cx="38" cy="18" r="4.5" fill="#22C55E" stroke="#15803D" strokeWidth="1" />
          <circle cx="30" cy="14" r="4.5" fill="#22C55E" stroke="#15803D" strokeWidth="1" />
          <circle cx="30" cy="20" r="4.5" fill="#16A34A" stroke="#15803D" strokeWidth="1" />
          <path d="M30 12 Q32 6 36 4" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="30" cy="34" r="18" fill="#581C87" stroke="#3B0764" strokeWidth="2" />
          <circle cx="28" cy="32" r="15" fill="#6B21A8" />
          <ellipse cx="24" cy="26" rx="5" ry="3" fill="#A855F7" opacity="0.7" transform="rotate(-30 24 26)" />
        </svg>
      );

    case 'labu':
      return (
        <svg viewBox="0 0 60 60" className={`${sizeClasses} drop-shadow-md hover:scale-115 transition-transform`} fill="none">
          <path d="M30 16 Q34 8 40 10" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="30" cy="34" rx="20" ry="16" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
          <ellipse cx="30" cy="34" rx="14" ry="16" fill="#FB923C" stroke="#C2410C" strokeWidth="1.5" />
          <ellipse cx="30" cy="34" rx="7" ry="16" fill="#FDBA74" stroke="#C2410C" strokeWidth="1.5" />
        </svg>
      );

    case 'tomato':
      return (
        <svg viewBox="0 0 60 60" className={`${sizeClasses} drop-shadow-md hover:scale-115 transition-transform`} fill="none">
          <circle cx="30" cy="32" r="18" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
          <circle cx="28" cy="30" r="15" fill="#F87171" />
          <ellipse cx="22" cy="24" rx="4" ry="2.5" fill="#FCA5A5" transform="rotate(-30 22 24)" />
          <g transform="translate(30, 15)">
            <path d="M0 0 L-6 -4 L-2 -1 L-5 5 L0 1 L5 5 L2 -1 L6 -4 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1" />
            <path d="M0 0 Q2 -6 5 -8" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'kek':
      return (
        <svg viewBox="0 0 60 60" className={`${sizeClasses} drop-shadow-md hover:scale-115 transition-transform`} fill="none">
          <path d="M10 36 L38 20 L52 28 L24 46 Z" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5" />
          <path d="M10 36 L24 46 L24 52 L10 42 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="1.5" />
          <path d="M24 46 L52 28 L52 34 L24 52 Z" fill="#FB7185" stroke="#E11D48" strokeWidth="1.5" />
          <path d="M10 36 L38 20 L52 28 L24 46 Z" fill="#FFF1F2" />
          <circle cx="34" cy="18" r="4.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
          <path d="M34 14 Q38 8 42 10" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'roti':
      return (
        <svg viewBox="0 0 60 60" className={`${sizeClasses} drop-shadow-md hover:scale-115 transition-transform`} fill="none">
          <ellipse cx="30" cy="30" rx="22" ry="11" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          <ellipse cx="30" cy="28" rx="20" ry="9" fill="#FDE68A" />
          <path d="M14 29 Q30 33 46 29" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <path d="M16 28 Q30 31 44 28" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
          <line x1="22" y1="24" x2="25" y2="28" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="29" y1="23" x2="32" y2="27" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="36" y1="24" x2="39" y2="28" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'aiskrim':
      return (
        <svg viewBox="0 0 60 60" className={`${sizeClasses} drop-shadow-md hover:scale-115 transition-transform`} fill="none">
          <polygon points="20,32 40,32 30,56" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          <line x1="24" y1="36" x2="36" y2="48" stroke="#CA8A04" strokeWidth="1" />
          <line x1="36" y1="36" x2="24" y2="48" stroke="#CA8A04" strokeWidth="1" />
          <path
            d="M18 32 C14 26 18 20 22 18 C20 14 26 10 30 10 C34 10 40 14 38 18 C42 20 46 26 42 32 Z"
            fill="#F472B6"
            stroke="#DB2777"
            strokeWidth="1.5"
          />
          <path d="M22 22 Q30 26 38 22" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 28 Q30 32 40 28" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
          <circle cx="26" cy="18" r="1.5" fill="#EF4444" />
          <circle cx="34" cy="22" r="1.5" fill="#3B82F6" />
          <circle cx="30" cy="27" r="1.5" fill="#FACC15" />
        </svg>
      );

    case 'lolipop':
      return (
        <svg viewBox="0 0 60 60" className={`${sizeClasses} drop-shadow-md hover:scale-115 transition-transform`} fill="none">
          <line x1="30" y1="32" x2="22" y2="54" stroke="#FED7AA" strokeWidth="3" strokeLinecap="round" />
          <circle cx="30" cy="20" r="14" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
          <circle cx="30" cy="20" r="10" stroke="#F472B6" strokeWidth="2.5" fill="none" />
          <circle cx="30" cy="20" r="6" stroke="#FDE047" strokeWidth="2.5" fill="none" />
          <circle cx="30" cy="20" r="2.5" fill="#F472B6" />
        </svg>
      );

    case 'jem':
      return (
        <svg viewBox="0 0 60 60" className={`${sizeClasses} drop-shadow-md hover:scale-115 transition-transform`} fill="none">
          <rect x="18" y="20" width="24" height="30" rx="6" fill="#FED7AA" stroke="#78350F" strokeWidth="2" />
          <rect x="20" y="24" width="20" height="24" rx="4" fill="#D97706" />
          <rect x="16" y="16" width="28" height="6" rx="2" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
          <rect x="22" y="30" width="16" height="12" rx="3" fill="#FEF3C7" stroke="#B45309" strokeWidth="1" />
          <ellipse cx="27" cy="36" rx="2.5" ry="4" fill="#D97706" />
          <ellipse cx="33" cy="36" rx="2.5" ry="4" fill="#D97706" />
        </svg>
      );

    case 'susu':
      return (
        <svg viewBox="0 0 60 60" className={`${sizeClasses} drop-shadow-md hover:scale-115 transition-transform`} fill="none">
          <polygon points="18,22 30,14 42,22" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1.5" />
          <polygon points="26,14 34,14 34,10 26,10" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="1.5" />
          <rect x="18" y="22" width="24" height="28" rx="2" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
          <rect x="18" y="28" width="24" height="12" fill="#38BDF8" />
          <text x="30" y="37" textAnchor="middle" fill="#0C4A6E" fontSize="7" fontWeight="900" fontFamily="'Fredoka', sans-serif">SUSU</text>
        </svg>
      );

    default:
      return null;
  }
}

// Data Aktiviti Lebih atau Kurang
const NUMERACY_COMPARE_SETS = [
  {
    id: 'set1',
    title: 'Set 1: Kumpulan Sedikit',
    subtitle: 'Bandingkan Kuantiti Objek',
    instruction: 'Pilih kumpulan objek yang LEBIH SEDIKIT.',
    targetCriteria: 'sedikit',
    badgeColor: 'from-cyan-400 to-blue-500',
    questions: [
      {
        id: 1,
        number: 1,
        leftOption: {
          id: 'left',
          type: 'mangga',
          name: 'Buah Mangga',
          count: 2,
        },
        rightOption: {
          id: 'right',
          type: 'manggis',
          name: 'Buah Manggis',
          count: 5,
        },
        correctSide: 'left',
      },
      {
        id: 2,
        number: 2,
        leftOption: {
          id: 'left',
          type: 'labu',
          name: 'Labu Manis',
          count: 3,
        },
        rightOption: {
          id: 'right',
          type: 'tomato',
          name: 'Buah Tomato',
          count: 4,
        },
        correctSide: 'left',
      },
      {
        id: 3,
        number: 3,
        leftOption: {
          id: 'left',
          type: 'kek',
          name: 'Potongan Kek',
          count: 9,
        },
        rightOption: {
          id: 'right',
          type: 'roti',
          name: 'Roti Sandwic',
          count: 6,
        },
        correctSide: 'right',
      },
      {
        id: 4,
        number: 4,
        leftOption: {
          id: 'left',
          type: 'aiskrim',
          name: 'Aiskrim Kon',
          count: 6,
        },
        rightOption: {
          id: 'right',
          type: 'lolipop',
          name: 'Gula-gula Lolipop',
          count: 3,
        },
        correctSide: 'right',
      },
      {
        id: 5,
        number: 5,
        leftOption: {
          id: 'left',
          type: 'jem',
          name: 'Balang Jem Kacang',
          count: 3,
        },
        rightOption: {
          id: 'right',
          type: 'susu',
          name: 'Kotak Susu Segar',
          count: 5,
        },
        correctSide: 'left',
      },
    ],
  },
  {
    id: 'set2',
    title: 'Set 2: Kumpulan Banyak',
    subtitle: 'Bandingkan Kuantiti Objek',
    instruction: 'Pilih kumpulan objek yang LEBIH BANYAK.',
    targetCriteria: 'banyak',
    badgeColor: 'from-pink-400 to-rose-500',
    questions: [
      {
        id: 1,
        number: 1,
        leftOption: {
          id: 'left',
          type: 'manggis',
          name: 'Buah Manggis',
          count: 7,
        },
        rightOption: {
          id: 'right',
          type: 'mangga',
          name: 'Buah Mangga',
          count: 4,
        },
        correctSide: 'left',
      },
      {
        id: 2,
        number: 2,
        leftOption: {
          id: 'left',
          type: 'labu',
          name: 'Labu Manis',
          count: 3,
        },
        rightOption: {
          id: 'right',
          type: 'tomato',
          name: 'Buah Tomato',
          count: 8,
        },
        correctSide: 'right',
      },
      {
        id: 3,
        number: 3,
        leftOption: {
          id: 'left',
          type: 'roti',
          name: 'Roti Sandwic',
          count: 6,
        },
        rightOption: {
          id: 'right',
          type: 'kek',
          name: 'Potongan Kek',
          count: 2,
        },
        correctSide: 'left',
      },
      {
        id: 4,
        number: 4,
        leftOption: {
          id: 'left',
          type: 'aiskrim',
          name: 'Aiskrim Kon',
          count: 5,
        },
        rightOption: {
          id: 'right',
          type: 'lolipop',
          name: 'Gula-gula Lolipop',
          count: 8,
        },
        correctSide: 'right',
      },
      {
        id: 5,
        number: 5,
        leftOption: {
          id: 'left',
          type: 'susu',
          name: 'Kotak Susu Segar',
          count: 6,
        },
        rightOption: {
          id: 'right',
          type: 'jem',
          name: 'Balang Jem Kacang',
          count: 2,
        },
        correctSide: 'left',
      },
    ],
  },
];

export default function NumeracyCompareGame({
  orientation = 'portrait',
  onBackToMenu,
  onOpenSettings,
}) {
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const currentSet = NUMERACY_COMPARE_SETS[activeSetIndex] || NUMERACY_COMPARE_SETS[0];

  // Current active question index (0 to 4) in the Arena
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const activeQuestion = currentSet?.questions?.[currentQuestionIndex] || currentSet?.questions?.[0] || {
    id: 1,
    number: 1,
    leftOption: { id: 'left', type: 'mangga', name: 'Mangga', count: 2 },
    rightOption: { id: 'right', type: 'manggis', name: 'Manggis', count: 5 },
    correctSide: 'left',
  };


  // User selections: { [questionId]: 'left' | 'right' }
  const [userAnswers, setUserAnswers] = useState({});
  const [streak, setStreak] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [animatingFeedback, setAnimatingFeedback] = useState(null); // 'correct' | 'wrong'

  // Reset state when set changes
  useEffect(() => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setStreak(0);
    setShowCompletionModal(false);
    setAnimatingFeedback(null);
  }, [activeSetIndex]);

  // Handle clicking an option box
  const handleSelectOption = (side) => {
    if (animatingFeedback) return; // Prevent double taps during animation

    playPopSound();
    const isCorrect = activeQuestion.correctSide === side;

    const nextAnswers = {
      ...userAnswers,
      [activeQuestion.id]: side,
    };
    setUserAnswers(nextAnswers);

    if (isCorrect) {
      playMatchSuccessSound();
      setAnimatingFeedback('correct');
      setStreak((prev) => prev + 1);

      // Mini confetti on correct answer
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.65 },
      });

      // Check if all 5 questions are finished
      const allAnswered = currentSet.questions.every(
        (q) => nextAnswers[q.id] === q.correctSide
      );

      setTimeout(() => {
        setAnimatingFeedback(null);
        if (allAnswered) {
          playVictorySound();
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.55 },
          });
          setShowCompletionModal(true);
        } else if (currentQuestionIndex < currentSet.questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        }
      }, 1100);
    } else {
      playOopsSound();
      setAnimatingFeedback('wrong');
      setStreak(0);

      setTimeout(() => {
        setAnimatingFeedback(null);
      }, 700);
    }
  };

  const handleReset = () => {
    playWhooshSound();
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setStreak(0);
    setShowCompletionModal(false);
    setAnimatingFeedback(null);
  };

  const currentSelection = userAnswers[activeQuestion.id];
  const isQuestionAnswered = currentSelection !== undefined;
  const isQuestionCorrect = isQuestionAnswered && currentSelection === activeQuestion.correctSide;
  const correctCount = currentSet.questions.filter(
    (q) => userAnswers[q.id] === q.correctSide
  ).length;

  return (
    <div className="relative w-full h-full min-h-0 overflow-y-auto bg-gradient-to-b from-sky-100 via-purple-50 to-amber-50 select-none font-['Nunito',sans-serif] flex flex-col items-center justify-between p-2 sm:p-4">
      {/* Decorative Playful Background Shapes & Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-300/30 rounded-full blur-2xl" />
        <div className="absolute top-1/3 -right-12 w-64 h-64 bg-purple-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 left-1/4 w-72 h-72 bg-sky-300/30 rounded-full blur-2xl" />
      </div>

      {/* TOP HEADER CONTROLS */}
      <div className="relative z-10 w-full max-w-2xl flex items-center justify-between px-1 sm:px-2 pt-1 pb-2">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 rounded-full shadow-[0_4px_0_0_#fcd34d] border-2 border-amber-300 font-['Fredoka'] font-black text-xs sm:text-sm transition-all hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-amber-500" />
          <span>Menu</span>
        </button>

        {/* Set Switcher 3D Candy Tabs */}
        <div className="flex items-center bg-white/95 p-1 rounded-full shadow-[0_4px_0_0_#e2e8f0] border-2 border-purple-200">
          {NUMERACY_COMPARE_SETS.map((set, idx) => (
            <button
              key={set.id}
              onClick={() => {
                playPopSound();
                setActiveSetIndex(idx);
              }}
              className={`
                px-3 sm:px-4 py-1.5 rounded-full font-black text-xs sm:text-sm font-['Fredoka'] transition-all cursor-pointer flex items-center gap-1
                ${
                  activeSetIndex === idx
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md scale-105'
                    : 'text-slate-600 hover:bg-purple-50'
                }
              `}
            >
              <span>{idx === 0 ? '🍃' : '🌟'}</span>
              <span>Set {idx + 1}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Streak Indicator */}
          {streak > 1 && (
            <div className="flex items-center gap-1 bg-amber-400 text-amber-950 px-2.5 py-1 rounded-full font-['Fredoka'] font-black text-xs shadow-sm border border-amber-500 animate-pop">
              <Flame className="w-3.5 h-3.5 text-red-600 fill-red-600 animate-wiggle" />
              <span>{streak}x Combo!</span>
            </div>
          )}

          <button
            onClick={handleReset}
            title="Mula Semula"
            className="p-2 bg-white hover:bg-slate-100 text-slate-600 rounded-full shadow-[0_4px_0_0_#cbd5e1] border-2 border-slate-300 transition-all hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-600" />
          </button>
          <button
            onClick={onOpenSettings}
            title="Tetapan"
            className="p-2 bg-slate-900 text-amber-300 rounded-full shadow-[0_4px_0_0_#b45309] border-2 border-amber-400 transition-all hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer"
          >
            <Settings className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>

      {/* ROUND STEPPER & PROGRESS TRACK */}
      <div className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl p-2.5 sm:p-3 shadow-[0_6px_0_0_#e2e8f0] border-3 border-purple-200 mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 sm:gap-2">
          {currentSet.questions.map((q, idx) => {
            const isDone = userAnswers[q.id] === q.correctSide;
            const isCurrent = idx === currentQuestionIndex;

            return (
              <button
                key={q.id}
                onClick={() => {
                  playPopSound();
                  setCurrentQuestionIndex(idx);
                }}
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-['Fredoka'] font-black text-xs sm:text-sm transition-all duration-200 cursor-pointer
                  ${
                    isCurrent
                      ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-[0_3px_0_0_#4338ca] scale-110 ring-3 ring-purple-300'
                      : isDone
                      ? 'bg-gradient-to-br from-emerald-400 to-green-500 text-white shadow-[0_2px_0_0_#15803d]'
                      : 'bg-slate-100 text-slate-400 hover:bg-purple-100'
                  }
                `}
              >
                {isDone ? '⭐' : idx + 1}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-['Fredoka'] font-black text-xs sm:text-sm text-purple-800 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
            Pusingan {currentQuestionIndex + 1} / {currentSet.questions.length}
          </span>
        </div>
      </div>

      {/* GAME ARENA: MAIN QUESTION & INTERACTIVE 3D FLOATING PLATES */}
      <div className="relative z-10 w-full max-w-2xl flex-1 flex flex-col justify-center items-center my-1 sm:my-2">
        {/* Animated Question Announcement Banner */}
        <div className="w-full bg-white rounded-3xl p-3 sm:p-4 shadow-[0_8px_0_0_#e2e8f0] border-3 border-purple-300 mb-3 text-center flex flex-col items-center gap-1.5 relative overflow-hidden">
          {/* Cute Corner Mascot Ribbon */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl sm:text-3xl animate-bounce" style={{ animationDuration: '2s' }}>
              {currentSet.targetCriteria === 'sedikit' ? '🍃' : '🌟'}
            </span>
            <h2 className="font-['Fredoka'] font-black text-base sm:text-xl md:text-2xl text-slate-800">
              Mana satu kumpulan objek yang{' '}
              <span
                className={`
                  inline-block px-3 py-0.5 rounded-full font-black text-white uppercase shadow-sm tracking-wide
                  ${
                    currentSet.targetCriteria === 'sedikit'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600'
                      : 'bg-gradient-to-r from-pink-500 to-rose-600'
                  }
                `}
              >
                LEBIH {currentSet.targetCriteria}
              </span>
              ?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-bold">
            Tekan pada pinggan pilihan anda di bawah untuk memilih! 👇
          </p>
        </div>

        {/* 2 GIANT 3D FLOATING PLATES (LEFT VS RIGHT ARENA) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          {/* LEFT ISLAND PLATE */}
          <button
            type="button"
            onClick={() => handleSelectOption('left')}
            className={`
              group relative rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-between min-h-[170px] sm:min-h-[220px]
              border-4 transition-all duration-300 cursor-pointer overflow-hidden
              ${
                currentSelection === 'left' && isQuestionCorrect
                  ? 'bg-gradient-to-b from-emerald-100 via-emerald-50 to-white border-emerald-500 shadow-[0_8px_0_0_#10b981] scale-105 ring-4 ring-emerald-300'
                  : currentSelection === 'left' && !isQuestionCorrect
                  ? 'bg-gradient-to-b from-rose-100 via-rose-50 to-white border-rose-500 shadow-[0_8px_0_0_#f43f5e] animate-shake'
                  : 'bg-gradient-to-b from-white via-amber-50/40 to-orange-50/60 border-amber-300 shadow-[0_8px_0_0_#fcd34d] hover:border-purple-400 hover:shadow-[0_10px_0_0_#c084fc] hover:-translate-y-1.5 active:translate-y-0 active:shadow-[0_2px_0_0_#fcd34d]'
              }
            `}
          >
            {/* Top Plate Tag */}
            <div className="w-full flex items-center justify-between mb-2">
              <span className="px-3 py-1 bg-white/90 text-amber-900 rounded-full font-['Fredoka'] font-black text-xs sm:text-sm shadow-xs border border-amber-200">
                Pinggan A • {activeQuestion.leftOption.name}
              </span>

              {currentSelection === 'left' && isQuestionCorrect && (
                <span className="flex items-center gap-1 bg-emerald-500 text-white px-2.5 py-0.5 rounded-full font-['Fredoka'] font-black text-xs shadow-sm animate-pop">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Betul!
                </span>
              )}
            </div>

            {/* Floating Objects Container */}
            <div className="flex-1 w-full flex flex-wrap items-center justify-center content-center gap-2 sm:gap-3 py-2">
              {Array.from({ length: activeQuestion.leftOption.count }).map((_, i) => (
                <ObjectItem key={i} type={activeQuestion.leftOption.type} size="normal" />
              ))}
            </div>

            {/* Bottom Count Indicator Badge */}
            <div className="mt-2 px-4 py-1 rounded-2xl bg-white/95 text-slate-800 font-['Fredoka'] font-black text-xs sm:text-sm shadow-sm border border-slate-200 flex items-center gap-1.5">
              <span>{activeQuestion.leftOption.count} biji</span>
              <span className="text-slate-400 font-normal">({activeQuestion.leftOption.name})</span>
            </div>
          </button>

          {/* RIGHT ISLAND PLATE */}
          <button
            type="button"
            onClick={() => handleSelectOption('right')}
            className={`
              group relative rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-between min-h-[170px] sm:min-h-[220px]
              border-4 transition-all duration-300 cursor-pointer overflow-hidden
              ${
                currentSelection === 'right' && isQuestionCorrect
                  ? 'bg-gradient-to-b from-emerald-100 via-emerald-50 to-white border-emerald-500 shadow-[0_8px_0_0_#10b981] scale-105 ring-4 ring-emerald-300'
                  : currentSelection === 'right' && !isQuestionCorrect
                  ? 'bg-gradient-to-b from-rose-100 via-rose-50 to-white border-rose-500 shadow-[0_8px_0_0_#f43f5e] animate-shake'
                  : 'bg-gradient-to-b from-white via-sky-50/40 to-indigo-50/60 border-sky-300 shadow-[0_8px_0_0_#7dd3fc] hover:border-purple-400 hover:shadow-[0_10px_0_0_#c084fc] hover:-translate-y-1.5 active:translate-y-0 active:shadow-[0_2px_0_0_#7dd3fc]'
              }
            `}
          >
            {/* Top Plate Tag */}
            <div className="w-full flex items-center justify-between mb-2">
              <span className="px-3 py-1 bg-white/90 text-sky-900 rounded-full font-['Fredoka'] font-black text-xs sm:text-sm shadow-xs border border-sky-200">
                Pinggan B • {activeQuestion.rightOption.name}
              </span>

              {currentSelection === 'right' && isQuestionCorrect && (
                <span className="flex items-center gap-1 bg-emerald-500 text-white px-2.5 py-0.5 rounded-full font-['Fredoka'] font-black text-xs shadow-sm animate-pop">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Betul!
                </span>
              )}
            </div>

            {/* Floating Objects Container */}
            <div className="flex-1 w-full flex flex-wrap items-center justify-center content-center gap-2 sm:gap-3 py-2">
              {Array.from({ length: activeQuestion.rightOption.count }).map((_, i) => (
                <ObjectItem key={i} type={activeQuestion.rightOption.type} size="normal" />
              ))}
            </div>

            {/* Bottom Count Indicator Badge */}
            <div className="mt-2 px-4 py-1 rounded-2xl bg-white/95 text-slate-800 font-['Fredoka'] font-black text-xs sm:text-sm shadow-sm border border-slate-200 flex items-center gap-1.5">
              <span>{activeQuestion.rightOption.count} biji</span>
              <span className="text-slate-400 font-normal">({activeQuestion.rightOption.name})</span>
            </div>
          </button>
        </div>

        {/* BOTTOM NAVIGATION ARROWS (PREV / NEXT ROUND) */}
        <div className="w-full flex items-center justify-between mt-3 px-1">
          <button
            onClick={() => {
              playPopSound();
              setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
            }}
            disabled={currentQuestionIndex === 0}
            className={`
              flex items-center gap-1 px-4 py-2 rounded-2xl font-['Fredoka'] font-bold text-xs sm:text-sm border-2 transition-all cursor-pointer
              ${
                currentQuestionIndex === 0
                  ? 'opacity-40 border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-white hover:bg-purple-50 text-purple-700 border-purple-300 shadow-[0_3px_0_0_#d8b4fe] active:translate-y-0.5'
              }
            `}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Pusingan Lepas</span>
          </button>

          <span className="text-xs font-bold text-slate-500">
            {correctCount}/{currentSet.questions.length} Soalan Selesai
          </span>

          <button
            onClick={() => {
              playPopSound();
              setCurrentQuestionIndex((prev) =>
                Math.min(currentSet.questions.length - 1, prev + 1)
              );
            }}
            disabled={currentQuestionIndex === currentSet.questions.length - 1}
            className={`
              flex items-center gap-1 px-4 py-2 rounded-2xl font-['Fredoka'] font-bold text-xs sm:text-sm border-2 transition-all cursor-pointer
              ${
                currentQuestionIndex === currentSet.questions.length - 1
                  ? 'opacity-40 border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-white hover:bg-purple-50 text-purple-700 border-purple-300 shadow-[0_3px_0_0_#d8b4fe] active:translate-y-0.5'
              }
            `}
          >
            <span>Pusingan Seterusnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* COMPLETION VICTORY MODAL */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-purple-400 text-center flex flex-col items-center animate-pop">
            <ThreeGoldenStarsCluster />

            <h3 className="text-2xl sm:text-3xl font-black font-['Fredoka'] text-purple-700 mt-3">
              Tahniah! Anda Hebat! 🎉
            </h3>
            <p className="text-slate-600 text-sm sm:text-base font-bold mt-1">
              Anda berjaya menjuarai semua pusingan kuantiti objek dengan cemerlang!
            </p>

            <div className="flex items-center justify-center gap-3 mt-6 w-full">
              <button
                onClick={handleReset}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-['Fredoka'] font-bold text-sm sm:text-base transition-transform active:scale-95 cursor-pointer shadow-sm"
              >
                Main Semula
              </button>

              {activeSetIndex < NUMERACY_COMPARE_SETS.length - 1 ? (
                <button
                  onClick={() => {
                    playPopSound();
                    setActiveSetIndex((prev) => prev + 1);
                  }}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl font-['Fredoka'] font-black text-sm sm:text-base shadow-[0_4px_0_0_#4338ca] transition-transform hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer"
                >
                  Set Seterusnya →
                </button>
              ) : (
                <button
                  onClick={onBackToMenu}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-['Fredoka'] font-black text-sm sm:text-base shadow-[0_4px_0_0_#15803d] transition-transform hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer"
                >
                  Ke Menu Utama 🏆
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

