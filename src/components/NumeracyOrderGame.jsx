import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Settings,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Trophy,
  Flame,
} from 'lucide-react';
import {
  playPopSound,
  playVictorySound,
  playWhooshSound,
  playMatchSuccessSound,
  playOopsSound,
  speakMalayText,
} from '../utils/soundEffects';

/* =========================================================================
   1. QUESTION DATA (5 SETS: MENAIK, MENURUN, POLA & NOMBOR BESAR)
   ========================================================================= */

const ORDER_SETS = [
  {
    id: 'set1',
    title: 'Set 1: Nombor 1 - 10',
    subtitle: 'Tertib Menaik (Kecil ke Besar)',
    mode: 'ascending', // 'ascending', 'descending', 'missing'
    instruction: 'Susun nombor mengikut tertib menaik daripada kecil ke besar.',
    badgeText: 'Tertib Menaik ⬆️',
    badgeColor: 'bg-emerald-500 text-white border-emerald-300',
    questions: [
      {
        id: 1,
        initialBank: [4, 1, 3, 2],
        correctOrder: [1, 2, 3, 4],
        type: 'arrange',
      },
      {
        id: 2,
        initialBank: [6, 2, 8, 4],
        correctOrder: [2, 4, 6, 8],
        type: 'arrange',
      },
      {
        id: 3,
        initialBank: [7, 3, 9, 5],
        correctOrder: [3, 5, 7, 9],
        type: 'arrange',
      },
      {
        id: 4,
        initialBank: [10, 6, 9, 7, 8],
        correctOrder: [6, 7, 8, 9, 10],
        type: 'arrange',
      },
    ],
  },
  {
    id: 'set2',
    title: 'Set 2: Nombor 1 - 10',
    subtitle: 'Tertib Menurun (Besar ke Kecil)',
    mode: 'descending',
    instruction: 'Susun nombor mengikut tertib menurun daripada besar ke kecil.',
    badgeText: 'Tertib Menurun ⬇️',
    badgeColor: 'bg-rose-500 text-white border-rose-300',
    questions: [
      {
        id: 1,
        initialBank: [2, 5, 1, 4],
        correctOrder: [5, 4, 2, 1],
        type: 'arrange',
      },
      {
        id: 2,
        initialBank: [8, 3, 7, 5],
        correctOrder: [8, 7, 5, 3],
        type: 'arrange',
      },
      {
        id: 3,
        initialBank: [4, 10, 6, 8],
        correctOrder: [10, 8, 6, 4],
        type: 'arrange',
      },
      {
        id: 4,
        initialBank: [3, 7, 5, 9, 1],
        correctOrder: [9, 7, 5, 3, 1],
        type: 'arrange',
      },
    ],
  },
  {
    id: 'set3',
    title: 'Set 3: Nombor 11 - 30',
    subtitle: 'Campuran Menaik & Menurun',
    mode: 'mixed',
    instruction: 'Perhatikan arahan dan susun nombor dengan tepat!',
    badgeText: 'Cabaran Belasan 🌟',
    badgeColor: 'bg-sky-500 text-white border-sky-300',
    questions: [
      {
        id: 1,
        mode: 'ascending',
        badgeText: 'Tertib Menaik ⬆️',
        badgeColor: 'bg-emerald-500 text-white border-emerald-300',
        initialBank: [14, 11, 15, 12, 13],
        correctOrder: [11, 12, 13, 14, 15],
        type: 'arrange',
      },
      {
        id: 2,
        mode: 'descending',
        badgeText: 'Tertib Menurun ⬇️',
        badgeColor: 'bg-rose-500 text-white border-rose-300',
        initialBank: [18, 20, 16, 19, 17],
        correctOrder: [20, 19, 18, 17, 16],
        type: 'arrange',
      },
      {
        id: 3,
        mode: 'ascending',
        badgeText: 'Tertib Menaik ⬆️',
        badgeColor: 'bg-emerald-500 text-white border-emerald-300',
        initialBank: [26, 21, 29, 24],
        correctOrder: [21, 24, 26, 29],
        type: 'arrange',
      },
      {
        id: 4,
        mode: 'descending',
        badgeText: 'Tertib Menurun ⬇️',
        badgeColor: 'bg-rose-500 text-white border-rose-300',
        initialBank: [28, 22, 30, 25],
        correctOrder: [30, 28, 25, 22],
        type: 'arrange',
      },
    ],
  },
  {
    id: 'set4',
    title: 'Set 4: Pola & Siri Nombor',
    subtitle: 'Lengkapkan Nombor Hilang',
    mode: 'missing',
    instruction: 'Cari nombor yang sesuai untuk melengkapkan siri turutan.',
    badgeText: 'Lengkapkan Pola 🧩',
    badgeColor: 'bg-purple-500 text-white border-purple-300',
    questions: [
      {
        id: 1,
        patternDesc: 'Membilang dua-dua (Menaik)',
        sequence: [2, 4, null, 8, 10],
        missingIndex: 2,
        correctAnswer: 6,
        options: [5, 6, 7],
        type: 'missing',
      },
      {
        id: 2,
        patternDesc: 'Membilang lima-lima (Menaik)',
        sequence: [5, 10, 15, null, 25],
        missingIndex: 3,
        correctAnswer: 20,
        options: [18, 20, 22],
        type: 'missing',
      },
      {
        id: 3,
        patternDesc: 'Membilang sepuluh-sepuluh (Menaik)',
        sequence: [10, 20, null, 40, 50],
        missingIndex: 2,
        correctAnswer: 30,
        options: [25, 30, 35],
        type: 'missing',
      },
      {
        id: 4,
        patternDesc: 'Menurun satu-satu (Menurun)',
        sequence: [19, 18, 17, null, 15],
        missingIndex: 3,
        correctAnswer: 16,
        options: [16, 14, 20],
        type: 'missing',
      },
    ],
  },
  {
    id: 'set5',
    title: 'Set 5: Cabaran Hebat',
    subtitle: 'Nombor Hingga 100',
    mode: 'mixed',
    instruction: 'Susun nombor puluhan dan selesaikan cabaran!',
    badgeText: 'Bintang Matematik ⭐',
    badgeColor: 'bg-amber-500 text-white border-amber-300',
    questions: [
      {
        id: 1,
        mode: 'ascending',
        badgeText: 'Tertib Menaik ⬆️',
        badgeColor: 'bg-emerald-500 text-white border-emerald-300',
        initialBank: [45, 12, 89, 63],
        correctOrder: [12, 45, 63, 89],
        type: 'arrange',
      },
      {
        id: 2,
        mode: 'descending',
        badgeText: 'Tertib Menurun ⬇️',
        badgeColor: 'bg-rose-500 text-white border-rose-300',
        initialBank: [72, 95, 38, 54],
        correctOrder: [95, 72, 54, 38],
        type: 'arrange',
      },
      {
        id: 3,
        patternDesc: 'Membilang lima-lima (Menaik)',
        sequence: [35, 40, null, 50, 55],
        missingIndex: 2,
        correctAnswer: 45,
        options: [42, 45, 48],
        type: 'missing',
      },
      {
        id: 4,
        patternDesc: 'Menurun sepuluh-sepuluh (Menurun)',
        sequence: [80, 70, 60, null, 40],
        missingIndex: 3,
        correctAnswer: 50,
        options: [50, 55, 65],
        type: 'missing',
      },
    ],
  },
];

/* =========================================================================
   2. THEME VISUAL ASSETS (TRAIN, BALLOONS, CATERPILLAR)
   ========================================================================= */

// Cute 3D Train Engine
function TrainEngine({ className = 'w-16 h-16 sm:w-20 sm:h-20' }) {
  return (
    <svg className={`${className} filter drop-shadow-lg flex-shrink-0`} viewBox="0 0 100 100" fill="none">
      {/* Chimney Steam Puffs */}
      <circle cx="28" cy="12" r="5" fill="#FFFFFF" opacity="0.8" className="animate-ping" style={{ animationDuration: '2s' }} />
      <circle cx="20" cy="8" r="3.5" fill="#FFFFFF" opacity="0.6" className="animate-ping" style={{ animationDuration: '2.5s' }} />

      {/* Chimney */}
      <rect x="24" y="20" width="10" height="14" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
      <rect x="22" y="18" width="14" height="4" rx="1.5" fill="#D97706" />

      {/* Main Boiler Body */}
      <rect x="14" y="34" width="48" height="36" rx="6" fill="#0284C7" stroke="#0369A1" strokeWidth="2.5" />
      {/* Front Nose Rounding */}
      <path d="M14 34 Q6 52 14 70 Z" fill="#38BDF8" stroke="#0369A1" strokeWidth="2" />
      {/* Headlight */}
      <circle cx="8" cy="52" r="5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
      <circle cx="8" cy="52" r="2.5" fill="#FEF08A" />

      {/* Driver Cabin */}
      <rect x="54" y="22" width="36" height="48" rx="6" fill="#F43F5E" stroke="#BE123C" strokeWidth="2.5" />
      {/* Cabin Roof */}
      <path d="M50 22 L94 22 L90 14 L54 14 Z" fill="#9F1239" stroke="#881337" strokeWidth="1.5" />
      {/* Cabin Window */}
      <rect x="62" y="28" width="20" height="18" rx="3" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
      
      {/* Cute Animal Driver in Window (Baby Lion / Kancil) */}
      <circle cx="72" cy="38" r="6" fill="#F59E0B" />
      <circle cx="68" cy="36" r="1" fill="#1E293B" />
      <circle cx="76" cy="36" r="1" fill="#1E293B" />
      <polygon points="72,39 70,38 74,38" fill="#78350F" />

      {/* Base Chassis */}
      <rect x="8" y="70" width="86" height="10" rx="3" fill="#334155" stroke="#1E293B" strokeWidth="2" />
      {/* Cowcatcher / Front Buffer */}
      <polygon points="8,70 2,80 12,80" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />

      {/* Wheels */}
      <circle cx="28" cy="82" r="11" fill="#475569" stroke="#1E293B" strokeWidth="3" />
      <circle cx="28" cy="82" r="5" fill="#CBD5E1" />
      <circle cx="50" cy="82" r="11" fill="#475569" stroke="#1E293B" strokeWidth="3" />
      <circle cx="50" cy="82" r="5" fill="#CBD5E1" />
      <circle cx="78" cy="82" r="13" fill="#475569" stroke="#1E293B" strokeWidth="3" />
      <circle cx="78" cy="82" r="6" fill="#CBD5E1" />

      {/* Golden Connect Pin on Right */}
      <rect x="92" y="66" width="8" height="6" rx="2" fill="#F59E0B" />
    </svg>
  );
}

// Cute Caterpillar Head
function CaterpillarHead({ className = 'w-14 h-14 sm:w-16 sm:h-16' }) {
  return (
    <svg className={`${className} filter drop-shadow-lg flex-shrink-0`} viewBox="0 0 100 100" fill="none">
      {/* Antennae */}
      <path d="M38 28 Q30 12 24 10" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="22" cy="10" r="5" fill="#EF4444" />
      <path d="M62 28 Q70 12 76 10" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="78" cy="10" r="5" fill="#EF4444" />

      {/* Head Circle */}
      <circle cx="50" cy="54" r="36" fill="#22C55E" stroke="#15803D" strokeWidth="3" />
      <circle cx="50" cy="54" r="30" fill="#4ADE80" />

      {/* Eyes */}
      <ellipse cx="38" cy="46" rx="6" ry="8" fill="#1E293B" />
      <circle cx="36" cy="43" r="2.5" fill="#FFFFFF" />
      <ellipse cx="62" cy="46" rx="6" ry="8" fill="#1E293B" />
      <circle cx="60" cy="43" r="2.5" fill="#FFFFFF" />

      {/* Cheeks */}
      <circle cx="28" cy="58" r="5" fill="#FB7185" opacity="0.75" />
      <circle cx="72" cy="58" r="5" fill="#FB7185" opacity="0.75" />

      {/* Big Smile */}
      <path d="M40 60 Q50 72 60 60" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <circle cx="50" cy="65" r="3" fill="#EF4444" />
    </svg>
  );
}

/* =========================================================================
   3. COLOR PALETTES FOR NUMBER TILES
   ========================================================================= */

const TILE_GRADIENTS = [
  'from-amber-400 via-yellow-400 to-amber-500 border-amber-600 text-amber-950',
  'from-sky-400 via-blue-400 to-blue-500 border-blue-600 text-white',
  'from-rose-400 via-pink-400 to-pink-500 border-pink-600 text-white',
  'from-emerald-400 via-green-400 to-green-500 border-green-600 text-white',
  'from-purple-400 via-violet-400 to-violet-500 border-violet-600 text-white',
  'from-orange-400 via-orange-500 to-amber-600 border-orange-700 text-white',
];

function getTileColor(index) {
  return TILE_GRADIENTS[index % TILE_GRADIENTS.length];
}

/* =========================================================================
   4. MAIN COMPONENT: NUMERACY ORDER GAME
   ========================================================================= */

export default function NumeracyOrderGame({
  orientation = 'portrait',
  onBackToMenu,
  onOpenSettings,
}) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [activeTheme, setActiveTheme] = useState('train'); // 'train', 'balloon', 'caterpillar'
  const [placedSlots, setPlacedSlots] = useState([]); // Array of numbers or null for target slots
  const [availableBank, setAvailableBank] = useState([]); // Array of numbers remaining in bank
  const [selectedBankIndex, setSelectedBankIndex] = useState(null);
  // Saved question answers map { 'set0-q0': { placedSlots, availableBank, isSuccess } }
  const [savedAnswers, setSavedAnswers] = useState({});

  // Status & Feedback states
  const [isChecking, setIsChecking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [totalStars, setTotalStars] = useState(0);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [mascotDialogue, setMascotDialogue] = useState('');

  const currentSet = ORDER_SETS[currentSetIndex] || ORDER_SETS[0];
  const currentQuestion =
    currentSet.questions[currentQuestionIndex] || currentSet.questions[0];

  // Initialize or reset question state
  useEffect(() => {
    resetQuestionState();
  }, [currentSetIndex, currentQuestionIndex]);

  const resetQuestionState = () => {
    setIsChecking(false);
    setIsWrong(false);
    setSelectedBankIndex(null);

    const question =
      currentSet?.questions?.[currentQuestionIndex] ||
      currentSet?.questions?.[0];

    if (!question) return;

    const qKey = `${currentSet.id}-${question.id}`;
    const saved = savedAnswers[qKey];

    if (saved) {
      setPlacedSlots(saved.placedSlots);
      setAvailableBank(saved.availableBank);
      setIsSuccess(saved.isSuccess);
      if (saved.isSuccess) {
        setMascotDialogue('Hebat! Susunan nombor soalan ini telah tepat! 🎉');
      }
    } else {
      setIsSuccess(false);
      if (question.type === 'missing') {
        // Missing number mode: prepare slots from pattern with null at missing index
        const slots = [...question.sequence];
        setPlacedSlots(slots);
        setAvailableBank([...question.options]);
        setMascotDialogue(`Pilih nombor yang sesuai untuk isi tempat kosong! 🧩`);
      } else {
        // Arrange order mode: slots are empty based on correctOrder length
        const emptySlots = new Array(question.correctOrder.length).fill(null);
        setPlacedSlots(emptySlots);
        setAvailableBank([...question.initialBank]);
        
        const badge = question.mode === 'descending' || currentSet.mode === 'descending'
          ? 'Tertib Menurun (Besar ke Kecil)'
          : 'Tertib Menaik (Kecil ke Besar)';
        setMascotDialogue(`Susun nombor mengikut ${badge}! 🚂`);
      }
    }
  };

  // Speak Instruction on demand
  const handleSpeakInstruction = () => {
    playPopSound();
    const question = currentQuestion;
    if (question.type === 'missing') {
      speakMalayText('Lengkapkan turutan pola nombor ini.');
    } else if (question.mode === 'descending' || currentSet.mode === 'descending') {
      speakMalayText('Susun nombor mengikut tertib menurun daripada besar ke kecil.');
    } else {
      speakMalayText('Susun nombor mengikut tertib menaik daripada kecil ke besar.');
    }
  };

  // Handle clicking a number tile in the bank
  const handleBankTileClick = (number, bankIndex) => {
    playPopSound();
    speakMalayText(number.toString());

    if (currentQuestion.type === 'missing') {
      // Place in the missing slot
      const nextSlots = [...placedSlots];
      nextSlots[currentQuestion.missingIndex] = number;
      setPlacedSlots(nextSlots);
      setSelectedBankIndex(bankIndex);

      // Auto-validate immediately
      validateAnswer(nextSlots);
      return;
    }

    // In arrange mode: Find first empty slot
    const firstEmptyIndex = placedSlots.findIndex((slot) => slot === null);
    if (firstEmptyIndex !== -1) {
      const nextSlots = [...placedSlots];
      nextSlots[firstEmptyIndex] = number;
      setPlacedSlots(nextSlots);

      const nextBank = [...availableBank];
      nextBank.splice(bankIndex, 1);
      setAvailableBank(nextBank);

      // Check if all slots filled
      if (!nextSlots.includes(null)) {
        setTimeout(() => validateAnswer(nextSlots), 300);
      }
    }
  };

  // Handle clicking a placed slot to return it to the bank
  const handleSlotClick = (slotIndex) => {
    if (isSuccess) return;

    if (currentQuestion.type === 'missing') {
      // If it's the missing slot that was filled, remove it
      if (slotIndex === currentQuestion.missingIndex && placedSlots[slotIndex] !== null) {
        playPopSound();
        const nextSlots = [...placedSlots];
        nextSlots[slotIndex] = null;
        setPlacedSlots(nextSlots);
        setSelectedBankIndex(null);
        setIsWrong(false);
      }
      return;
    }

    const numberInSlot = placedSlots[slotIndex];
    if (numberInSlot !== null) {
      playPopSound();
      const nextSlots = [...placedSlots];
      nextSlots[slotIndex] = null;
      setPlacedSlots(nextSlots);

      setAvailableBank([...availableBank, numberInSlot]);
      setIsWrong(false);
    }
  };

  // Validate the answer
  const validateAnswer = (slotsToTest = placedSlots) => {
    setIsChecking(true);

    if (currentQuestion.type === 'missing') {
      const placedVal = slotsToTest[currentQuestion.missingIndex];
      if (placedVal === currentQuestion.correctAnswer) {
        handleCorrect();
      } else {
        handleIncorrect();
      }
      return;
    }

    // Check array equality
    const isCorrect = slotsToTest.every(
      (val, idx) => val === currentQuestion.correctOrder[idx]
    );

    if (isCorrect) {
      handleCorrect(slotsToTest);
    } else {
      handleIncorrect();
    }
  };

  const handleCorrect = (finalSlots = placedSlots) => {
    playMatchSuccessSound();
    setIsSuccess(true);
    setIsWrong(false);
    setStreakCount((prev) => prev + 1);
    setTotalStars((prev) => prev + 1);
    setMascotDialogue('Hebat! Susunan nombor anda tepat sekali! 🎉');

    const qKey = `${currentSet.id}-${currentQuestion.id}`;
    setSavedAnswers((prev) => ({
      ...prev,
      [qKey]: {
        placedSlots: finalSlots,
        availableBank: [],
        isSuccess: true,
      },
    }));

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      // Move to next question or show victory
      if (currentQuestionIndex < currentSet.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        playVictorySound();
        setShowVictoryModal(true);
      }
    }, 1400);
  };

  const handleIncorrect = () => {
    playOopsSound();
    setIsWrong(true);
    setStreakCount(0);
    setMascotDialogue('Alamak! Cuba semak semula turutan nombor ya. 😊');
    setTimeout(() => {
      setIsWrong(false);
      setIsChecking(false);
    }, 1200);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentSet.questions.length - 1) {
      playWhooshSound();
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      playWhooshSound();
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSelectSet = (setIdx) => {
    playPopSound();
    setSavedAnswers({});
    setCurrentSetIndex(setIdx);
    setCurrentQuestionIndex(0);
    setShowVictoryModal(false);
  };

  const isAllFilled = !placedSlots.includes(null);
  const currentBadge =
    currentQuestion.badgeText || currentSet.badgeText || 'Susun Nombor';
  const currentBadgeColor =
    currentQuestion.badgeColor || currentSet.badgeColor || 'bg-emerald-500 text-white';

  return (
    <div className="relative w-full h-full min-h-0 overflow-y-auto select-none font-['Nunito',sans-serif] flex flex-col items-center justify-between p-2 sm:p-3 md:p-4 bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-100">
      {/* Background Decorative Grass & Rails */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Clouds */}
        <div className="absolute top-4 left-6 w-32 h-10 bg-white/80 rounded-full blur-[1px] animate-float" />
        <div
          className="absolute top-10 right-10 w-44 h-14 bg-white/70 rounded-full blur-[1px] animate-float"
          style={{ animationDelay: '1.5s' }}
        />

        {/* Bottom Rolling Hills */}
        <svg
          className="absolute bottom-0 left-0 w-full h-32 sm:h-44"
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
        >
          <path d="M 0,90 Q 250,30 500,80 T 1000,50 L 1000,200 L 0,200 Z" fill="#34d399" opacity="0.6" />
          <path d="M 0,110 Q 300,70 650,110 T 1000,90 L 1000,200 L 0,200 Z" fill="#10b981" />
          {/* Railroad Track on Meadow */}
          {activeTheme === 'train' && (
            <g opacity="0.7">
              <line x1="0" y1="160" x2="1000" y2="160" stroke="#78350F" strokeWidth="6" />
              <line x1="0" y1="174" x2="1000" y2="174" stroke="#78350F" strokeWidth="6" />
              {Array.from({ length: 30 }).map((_, i) => (
                <line
                  key={i}
                  x1={i * 35}
                  y1="154"
                  x2={i * 35}
                  y2="180"
                  stroke="#451A03"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              ))}
            </g>
          )}
        </svg>
      </div>

      {/* TOP NAVBAR CONTAINER */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-md border-2 border-emerald-300">
          {/* Back Button */}
          <button
            onClick={() => {
              playPopSound();
              onBackToMenu();
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl font-['Fredoka'] font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Menu</span>
          </button>

          {/* Title & Set Indicator */}
          <div className="flex flex-col items-center">
            <span className="font-['Fredoka'] font-black text-sm sm:text-lg text-emerald-800 tracking-wide flex items-center gap-1.5">
              <span>🔢</span> Susun Nombor
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-600">
              {currentSet.title}
            </span>
          </div>

          {/* Right Controls: Streak, Stars & Settings */}
          <div className="flex items-center gap-2">
            {/* Streak Counter */}
            {streakCount > 1 && (
              <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-lg font-black text-xs font-['Fredoka'] animate-bounce">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>{streakCount}x</span>
              </div>
            )}

            {/* Total Stars */}
            <div className="flex items-center gap-1 px-2.5 py-1 bg-yellow-100 text-yellow-900 border border-yellow-300 rounded-lg font-black text-xs font-['Fredoka']">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400" />
              <span>{totalStars}</span>
            </div>

            {/* Settings Button */}
            <button
              onClick={onOpenSettings}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Tetapan Audio"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SET SELECTOR TABS (Set 1 to Set 5) */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto py-0.5 no-scrollbar">
          {ORDER_SETS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => handleSelectSet(idx)}
              className={`
                px-2.5 sm:px-3 py-1 rounded-xl font-['Fredoka'] font-black text-[11px] sm:text-xs transition-all cursor-pointer whitespace-nowrap shadow-xs
                ${
                  currentSetIndex === idx
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md scale-105 ring-2 ring-emerald-300'
                    : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-200'
                }
              `}
            >
              Set {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* CENTER ARENA CARD */}
      <div className="relative z-10 w-full max-w-3xl bg-white/95 backdrop-blur-md rounded-3xl p-3 sm:p-5 shadow-2xl border-4 border-white/90 my-2 flex flex-col justify-between min-h-[360px] sm:min-h-[420px]">
        {/* TOP BAR INSIDE CARD: INSTRUCTION BADGE & THEME TOGGLES */}
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-2">
          {/* Badge & Voice Reader */}
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full font-['Fredoka'] font-black text-xs sm:text-sm border shadow-xs flex items-center gap-1 ${currentBadgeColor}`}
            >
              {currentBadge}
            </span>

            <button
              onClick={handleSpeakInstruction}
              title="Dengar Arahan Suara"
              className="flex items-center gap-1 px-2.5 py-1 bg-sky-100 hover:bg-sky-200 text-sky-700 border border-sky-300 rounded-full font-bold text-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dengar</span>
            </button>
          </div>

          {/* Theme Selector: Train, Balloon, Caterpillar */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-full border border-slate-200 text-xs font-bold font-['Fredoka']">
            <button
              onClick={() => {
                playPopSound();
                setActiveTheme('train');
              }}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                activeTheme === 'train'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🚂</span>
              <span className="hidden sm:inline">Kereta Api</span>
            </button>
            <button
              onClick={() => {
                playPopSound();
                setActiveTheme('balloon');
              }}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                activeTheme === 'balloon'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🎈</span>
              <span className="hidden sm:inline">Belon</span>
            </button>
            <button
              onClick={() => {
                playPopSound();
                setActiveTheme('caterpillar');
              }}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                activeTheme === 'caterpillar'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🐛</span>
              <span className="hidden sm:inline">Ulat</span>
            </button>
          </div>
        </div>

        {/* MASCOT DIALOGUE / HINT BAR */}
        <div className="w-full bg-emerald-50/90 border-2 border-emerald-200/80 rounded-2xl p-2 px-3 flex items-center justify-between gap-2 my-1">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl">💡</span>
            <p className="text-xs sm:text-sm font-extrabold text-emerald-900 truncate">
              {mascotDialogue}
            </p>
          </div>

          <div className="text-[11px] sm:text-xs font-black text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200 flex-shrink-0">
            Soalan {currentQuestionIndex + 1} / {currentSet.questions.length}
          </div>
        </div>

        {/* STAGE ARENA: TARGET SLOTS (TRAIN CARRIAGES / BALLOONS / CATERPILLAR BODY) */}
        <div className="flex-1 flex flex-col items-center justify-center py-2 sm:py-4">
          <div
            className={`
              w-full flex items-center justify-center flex-wrap sm:flex-nowrap gap-2 sm:gap-3 py-2 px-1
              ${isWrong ? 'animate-shake' : ''}
              ${isSuccess ? 'animate-bounce' : ''}
            `}
          >
            {/* Theme Head Mascot: Train Engine or Caterpillar Head */}
            {activeTheme === 'train' && <TrainEngine />}
            {activeTheme === 'caterpillar' && <CaterpillarHead />}

            {/* Target Wagons / Target Slots */}
            {placedSlots.map((slotValue, slotIdx) => {
              const isMissingSlot =
                currentQuestion.type === 'missing' &&
                slotIdx === currentQuestion.missingIndex;
              const isFixedSlot =
                currentQuestion.type === 'missing' && !isMissingSlot;

              return (
                <div
                  key={slotIdx}
                  onClick={() => handleSlotClick(slotIdx)}
                  className={`
                    relative flex flex-col items-center justify-center transition-all duration-200
                    ${isFixedSlot ? 'cursor-default' : 'cursor-pointer'}
                  `}
                >
                  {/* Wagon / Balloon Container */}
                  <div
                    className={`
                      relative w-12 h-14 sm:w-16 sm:h-20 md:w-20 md:h-24 rounded-2xl flex flex-col items-center justify-center font-['Fredoka'] font-black text-xl sm:text-2xl md:text-3xl shadow-md transition-all
                      ${
                        slotValue !== null
                          ? `bg-gradient-to-br ${getTileColor(slotIdx)} border-3 sm:border-4 hover:scale-105`
                          : isMissingSlot
                          ? 'bg-amber-50 border-3 border-dashed border-amber-400 text-amber-400 animate-pulse'
                          : 'bg-slate-100/90 border-3 border-dashed border-slate-300 text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/50'
                      }
                    `}
                  >
                    {/* Number Value or Question Mark */}
                    {slotValue !== null ? (
                      <span>{slotValue}</span>
                    ) : (
                      <span className="text-slate-300 text-sm sm:text-lg">
                        {isMissingSlot ? '❓' : slotIdx + 1}
                      </span>
                    )}

                    {/* Cute Wheels under each carriage (Train theme only) */}
                    {activeTheme === 'train' && (
                      <div className="absolute -bottom-2 flex items-center justify-between w-full px-1">
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-slate-700 border-2 border-slate-900 shadow-xs" />
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-slate-700 border-2 border-slate-900 shadow-xs" />
                      </div>
                    )}
                  </div>

                  {/* Slot Number Label / Subtext */}
                  <span className="text-[10px] sm:text-xs font-extrabold text-slate-500 mt-1">
                    {isMissingSlot ? 'Isi Sini' : `Gerabak ${slotIdx + 1}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM TRAY: AVAILABLE NUMBER BANK (TILES TO CHOOSE) */}
        <div className="w-full bg-slate-50 border-2 border-slate-200/80 rounded-2xl p-2 sm:p-3 flex flex-col items-center gap-1.5">
          <div className="flex items-center justify-between w-full px-1">
            <span className="text-[11px] sm:text-xs font-extrabold text-slate-600 flex items-center gap-1">
              <span>👇</span>
              {currentQuestion.type === 'missing'
                ? 'Pilih nombor jawapan:'
                : 'Tekan nombor untuk disusun:'}
            </span>

            {/* Reset Button */}
            <button
              onClick={() => {
                playPopSound();
                resetQuestionState();
              }}
              className="flex items-center gap-1 px-2 py-0.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-300 rounded-lg text-[10px] sm:text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Susun Semula</span>
            </button>
          </div>

          {/* Number Choices Grid */}
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 py-1">
            {availableBank.map((num, idx) => (
              <button
                key={idx}
                onClick={() => handleBankTileClick(num, idx)}
                type="button"
                className={`
                  w-11 h-12 sm:w-14 sm:h-16 md:w-16 md:h-18 rounded-2xl bg-gradient-to-br ${getTileColor(
                    idx
                  )}
                  border-3 sm:border-4 flex items-center justify-center font-['Fredoka'] font-black
                  text-lg sm:text-2xl md:text-3xl shadow-md transform hover:scale-110 active:scale-95
                  transition-all cursor-pointer
                `}
              >
                {num}
              </button>
            ))}

            {availableBank.length === 0 && !isAllFilled && (
              <span className="text-xs font-bold text-slate-400 py-2">
                Semua nombor telah diletakkan!
              </span>
            )}
          </div>
        </div>

        {/* FOOTER STEPPER NAVIGATION & CHECK BUTTON */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-1">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`
              flex items-center gap-1 px-3 py-1.5 rounded-xl font-['Fredoka'] font-bold text-xs sm:text-sm transition-all
              ${
                currentQuestionIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-xs hover:scale-105 active:scale-95 cursor-pointer'
              }
            `}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelum</span>
          </button>

          {/* Stepper Dots */}
          <div className="flex items-center gap-1.5">
            {currentSet.questions.map((q, idx) => (
              <div
                key={q.id}
                onClick={() => {
                  playPopSound();
                  setCurrentQuestionIndex(idx);
                }}
                className={`
                  w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all cursor-pointer
                  ${
                    currentQuestionIndex === idx
                      ? 'bg-emerald-500 ring-2 ring-emerald-300 scale-125'
                      : 'bg-slate-200 hover:bg-slate-300'
                  }
                `}
              />
            ))}
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === currentSet.questions.length - 1}
            className={`
              flex items-center gap-1 px-3 py-1.5 rounded-xl font-['Fredoka'] font-bold text-xs sm:text-sm transition-all
              ${
                currentQuestionIndex === currentSet.questions.length - 1
                  ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xs hover:scale-105 active:scale-95 cursor-pointer'
              }
            `}
          >
            <span>Seterusnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* VICTORY CELEBRATION MODAL */}
      {showVictoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border-4 border-amber-300 flex flex-col items-center text-center animate-scaleUp">
            {/* Mascot Trophy Cluster */}
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-full flex items-center justify-center border-4 border-white shadow-xl -mt-12 mb-3">
              <Trophy className="w-10 h-10 text-white fill-yellow-200" />
            </div>

            <span className="font-['Fredoka'] font-black text-2xl text-emerald-800 tracking-wide">
              Tahniah! Hebat!
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1 mb-4">
              Anda telah berjaya menyelesaikan semua soalan dalam {currentSet.title}!
            </p>

            {/* Star Awards Grid */}
            <div className="flex items-center justify-center gap-2 mb-4 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-200">
              <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-400 animate-spin" />
              <span className="font-['Fredoka'] font-black text-lg text-amber-900">
                +{totalStars} Bintang Juara!
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={() => {
                  playPopSound();
                  setShowVictoryModal(false);
                }}
                className="w-full py-2.5 bg-sky-100 hover:bg-sky-200 text-sky-800 rounded-2xl font-['Fredoka'] font-black text-sm shadow-sm transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>👁️</span>
                <span>Lihat Jawapan</span>
              </button>

              {currentSetIndex < ORDER_SETS.length - 1 && (
                <button
                  onClick={() => {
                    handleSelectSet(currentSetIndex + 1);
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl font-['Fredoka'] font-black text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Main Set Seterusnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => {
                  playPopSound();
                  setSavedAnswers({});
                  setCurrentQuestionIndex(0);
                  setShowVictoryModal(false);
                }}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-['Fredoka'] font-bold text-xs transition-all cursor-pointer"
              >
                Ulang Set Ini Semula
              </button>

              <button
                onClick={() => {
                  playPopSound();
                  setShowVictoryModal(false);
                  onBackToMenu();
                }}
                className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-2xl font-['Fredoka'] font-bold text-xs transition-all cursor-pointer"
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
