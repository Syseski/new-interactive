import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  ArrowLeft,
  Settings,
  Trophy,
  Minus,
  Equal,
  HelpCircle,
  XCircle,
} from 'lucide-react';
import {
  playPopSound,
  playOopsSound,
  playVictorySound,
  playWhooshSound,
  playMatchSuccessSound,
  speakMalayText,
} from '../../utils/soundEffects';
import { GoldenStarIllustration, ThreeGoldenStarsCluster } from '../literasi/PhonicsIllustration';

// SUBTRACTION DATA SETS
export const SUBTRACTION_SETS = [
  {
    id: 'set1',
    title: 'Set 1: Asas Tolak (Jumlah 1 - 5)',
    subtitle: 'Operasi Tolak hingga 5',
    instruction: 'Kira baki objek yang tinggal selepas ditolak/dibuang!',
    questions: [
      {
        id: 'q1',
        num1: 2,
        num2: 1,
        answer: 1,
        emoji: '🍎',
        itemName: 'Epal Merah',
        options: [1, 2, 3, 0],
        spokenEquation: 'Dua tolak satu sama dengan satu.',
      },
      {
        id: 'q2',
        num1: 3,
        num2: 1,
        answer: 2,
        emoji: '🦆',
        itemName: 'Itik Comel',
        options: [2, 1, 3, 4],
        spokenEquation: 'Tiga tolak satu sama dengan dua.',
      },
      {
        id: 'q3',
        num1: 4,
        num2: 2,
        answer: 2,
        emoji: '🎈',
        itemName: 'Belon Ceria',
        options: [2, 1, 3, 4],
        spokenEquation: 'Empat tolak dua sama dengan dua.',
      },
      {
        id: 'q4',
        num1: 5,
        num2: 1,
        answer: 4,
        emoji: '⭐',
        itemName: 'Bintang Emas',
        options: [4, 3, 5, 2],
        spokenEquation: 'Lima tolak satu sama dengan empat.',
      },
      {
        id: 'q5',
        num1: 5,
        num2: 3,
        answer: 2,
        emoji: '🌸',
        itemName: 'Bunga Wangi',
        options: [2, 3, 1, 4],
        spokenEquation: 'Lima tolak tiga sama dengan dua.',
      },
      {
        id: 'q6',
        num1: 4,
        num2: 3,
        answer: 1,
        emoji: '🍓',
        itemName: 'Strawberi',
        options: [1, 2, 3, 0],
        spokenEquation: 'Empat tolak tiga sama dengan satu.',
      },
    ],
  },
  {
    id: 'set2',
    title: 'Set 2: Tolak Seronok (Jumlah 6 - 10)',
    subtitle: 'Operasi Tolak hingga 10',
    instruction: 'Kira baki objek yang tidak dipangkah untuk mencari jawapannya!',
    questions: [
      {
        id: 'q1',
        num1: 6,
        num2: 2,
        answer: 4,
        emoji: '🐟',
        itemName: 'Ikan Lincah',
        options: [4, 3, 5, 2],
        spokenEquation: 'Enam tolak dua sama dengan empat.',
      },
      {
        id: 'q2',
        num1: 7,
        num2: 3,
        answer: 4,
        emoji: '🦋',
        itemName: 'Rama-rama',
        options: [4, 5, 3, 6],
        spokenEquation: 'Tujuh tolak tiga sama dengan empat.',
      },
      {
        id: 'q3',
        num1: 8,
        num2: 4,
        answer: 4,
        emoji: '🍀',
        itemName: 'Daun Tuah',
        options: [4, 3, 5, 6],
        spokenEquation: 'Lapan tolak empat sama dengan empat.',
      },
      {
        id: 'q4',
        num1: 9,
        num2: 3,
        answer: 6,
        emoji: '🚗',
        itemName: 'Kereta Laju',
        options: [6, 5, 7, 8],
        spokenEquation: 'Sembilan tolak tiga sama dengan enam.',
      },
      {
        id: 'q5',
        num1: 10,
        num2: 5,
        answer: 5,
        emoji: '🍬',
        itemName: 'Gula-gula',
        options: [5, 4, 6, 3],
        spokenEquation: 'Sepuluh tolak lima sama dengan lima.',
      },
      {
        id: 'q6',
        num1: 10,
        num2: 2,
        answer: 8,
        emoji: '⚽',
        itemName: 'Bola Sepak',
        options: [8, 7, 9, 6],
        spokenEquation: 'Sepuluh tolak dua sama dengan lapan.',
      },
    ],
  },
  {
    id: 'set3',
    title: 'Set 3: Cabaran Tolak Pintar',
    subtitle: 'Operasi Tolak Pelbagai',
    instruction: 'Selesaikan persamaan tolak dengan tepat dan pantas!',
    questions: [
      {
        id: 'q1',
        num1: 8,
        num2: 5,
        answer: 3,
        emoji: '🎲',
        itemName: 'Dadu Mainan',
        options: [3, 2, 4, 5],
        spokenEquation: 'Lapan tolak lima sama dengan tiga.',
      },
      {
        id: 'q2',
        num1: 10,
        num2: 4,
        answer: 6,
        emoji: '🍊',
        itemName: 'Buah Oren',
        options: [6, 5, 7, 8],
        spokenEquation: 'Sepuluh tolak empat sama dengan enam.',
      },
      {
        id: 'q3',
        num1: 11,
        num2: 3,
        answer: 8,
        emoji: '🍞',
        itemName: 'Roti Sedap',
        options: [8, 7, 9, 6],
        spokenEquation: 'Sebelas tolak tiga sama dengan lapan.',
      },
      {
        id: 'q4',
        num1: 12,
        num2: 6,
        answer: 6,
        emoji: '🐱',
        itemName: 'Kucing Comel',
        options: [6, 5, 7, 8],
        spokenEquation: 'Dua belas tolak enam sama dengan enam.',
      },
      {
        id: 'q5',
        num1: 12,
        num2: 4,
        answer: 8,
        emoji: '🧁',
        itemName: 'Kek Cawan',
        options: [8, 7, 9, 10],
        spokenEquation: 'Dua belas tolak empat sama dengan lapan.',
      },
      {
        id: 'q6',
        num1: 9,
        num2: 5,
        answer: 4,
        emoji: '☕',
        itemName: 'Cawan Teh',
        options: [4, 3, 5, 6],
        spokenEquation: 'Sembilan tolak lima sama dengan empat.',
      },
    ],
  },
];

export default function NumeracySubtractionGame({ orientation, onBackToMenu, onOpenSettings }) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const currentSet = SUBTRACTION_SETS[currentSetIndex] || SUBTRACTION_SETS[0];

  const [questionIndex, setQuestionIndex] = useState(0);
  const currentQ = currentSet.questions[questionIndex] || currentSet.questions[0];

  // Persistent answered state per question
  const [savedAnswers, setSavedAnswers] = useState({});
  // Completed questions tracking
  const [completedQuestions, setCompletedQuestions] = useState({});

  // Active placed answer
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Status: 'idle', 'correct', 'wrong'
  const [feedbackStatus, setFeedbackStatus] = useState('idle');
  // Shake / wrong choice trigger
  const [wrongChoice, setWrongChoice] = useState(null);
  // Drag state
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Victory celebration modal
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const qKey = `${currentSet.id}-${currentQ.id}`;

  // Sync state when question or set changes
  useEffect(() => {
    const saved = savedAnswers[qKey];
    if (saved) {
      setSelectedAnswer(saved.placedAnswer);
      setFeedbackStatus(saved.isCorrect ? 'correct' : 'idle');
    } else {
      setSelectedAnswer(null);
      setFeedbackStatus('idle');
    }
    setWrongChoice(null);
    setIsDragOver(false);
  }, [questionIndex, currentSetIndex, qKey, savedAnswers]);

  // Handle selecting / placing a number option
  const handleSelectOption = (opt) => {
    if (feedbackStatus === 'correct') return;
    playPopSound();

    setSelectedAnswer(opt);

    if (opt === currentQ.answer) {
      // Correct!
      playMatchSuccessSound();
      setFeedbackStatus('correct');
      setWrongChoice(null);

      speakMalayText(`${currentQ.num1} tolak ${currentQ.num2} sama dengan ${currentQ.answer}! Tepat sekali!`);

      const newSaved = {
        ...savedAnswers,
        [qKey]: { placedAnswer: opt, isCorrect: true },
      };
      setSavedAnswers(newSaved);

      const newCompleted = {
        ...completedQuestions,
        [qKey]: true,
      };
      setCompletedQuestions(newCompleted);

      // Check if all questions in this set are completed
      const totalInSet = currentSet.questions.length;
      const completedCount = currentSet.questions.filter((q) => newCompleted[`${currentSet.id}-${q.id}`]).length;

      if (completedCount === totalInSet && !hasCelebrated) {
        setTimeout(() => {
          setShowCelebration(true);
          setHasCelebrated(true);
          playVictorySound();

          confetti({
            particleCount: 160,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#F43F5E', '#FB923C', '#FACC15', '#10B981', '#38BDF8'],
          });
        }, 800);
      }
    } else {
      // Wrong
      playOopsSound();
      setFeedbackStatus('wrong');
      setWrongChoice(opt);
      speakMalayText(`Cuba lagi! ${currentQ.num1} tolak ${currentQ.num2} bukan ${opt}.`);

      setTimeout(() => {
        setWrongChoice(null);
        if (!savedAnswers[qKey]?.isCorrect) {
          setSelectedAnswer(null);
          setFeedbackStatus('idle');
        }
      }, 1000);
    }
  };

  // Drag & Drop handlers
  const handleDragStart = (e, opt) => {
    if (feedbackStatus === 'correct') return;
    setDraggedNumber(opt);
    e.dataTransfer.setData('text/plain', String(opt));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (draggedNumber !== null) {
      handleSelectOption(draggedNumber);
      setDraggedNumber(null);
    }
  };

  // Speak question equation
  const handleSpeakEquation = () => {
    playWhooshSound();
    speakMalayText(currentQ.spokenEquation || `${currentQ.num1} tolak ${currentQ.num2} sama dengan berapa?`);
  };

  // Speak remaining count when object tapped
  const handleTapObject = (idx, isSubtracted) => {
    playPopSound();
    if (isSubtracted) {
      speakMalayText('Objek ini ditolak.');
    } else {
      const remainingCount = idx + 1;
      speakMalayText(`${remainingCount}`);
    }
  };

  // Navigation handlers
  const handleNextQuestion = () => {
    playPopSound();
    if (questionIndex < currentSet.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    playPopSound();
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const handleSwitchSet = (idx) => {
    if (idx === currentSetIndex) return;
    playPopSound();
    setCurrentSetIndex(idx);
    setQuestionIndex(0);
    setHasCelebrated(false);
    setShowCelebration(false);
  };

  const handleResetCurrentSet = () => {
    playPopSound();
    const newSaved = { ...savedAnswers };
    const newCompleted = { ...completedQuestions };

    currentSet.questions.forEach((q) => {
      delete newSaved[`${currentSet.id}-${q.id}`];
      delete newCompleted[`${currentSet.id}-${q.id}`];
    });

    setSavedAnswers(newSaved);
    setCompletedQuestions(newCompleted);
    setSelectedAnswer(null);
    setFeedbackStatus('idle');
    setHasCelebrated(false);
    setShowCelebration(false);
  };

  const totalAnsweredInSet = useMemo(() => {
    return currentSet.questions.filter((q) => completedQuestions[`${currentSet.id}-${q.id}`]).length;
  }, [currentSet, completedQuestions]);

  const isCurrentQuestionAnswered = !!completedQuestions[qKey];
  const remainingCount = currentQ.num1 - currentQ.num2;

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-rose-400 via-pink-100 to-amber-100 font-['Nunito',sans-serif]">
      {/* Background Decorative Emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-6 left-6 text-5xl animate-float" style={{ animationDuration: '4s' }}>
          🎈
        </div>
        <div className="absolute top-12 right-10 text-5xl animate-float" style={{ animationDuration: '5s' }}>
          ⭐
        </div>
        <div className="absolute bottom-16 left-12 text-5xl animate-float" style={{ animationDuration: '4.5s' }}>
          🍎
        </div>
        <div className="absolute bottom-12 right-8 text-5xl animate-float" style={{ animationDuration: '6s' }}>
          🍬
        </div>
      </div>

      {/* --- TOP HEADER & BAR --- */}
      <header className="relative z-20 w-full bg-slate-900/80 backdrop-blur-md px-3 py-2 sm:px-4 border-b border-rose-400/40 text-white flex items-center justify-between shadow-md">
        {/* Left: Back to Menu & Game Title */}
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToMenu}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition cursor-pointer active:scale-95"
            title="Kembali ke Menu Utama"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-extrabold text-rose-400 font-['Fredoka']">
                🔢 10. Tolak Ceria
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-slate-300 hidden xs:inline">
              {currentSet.subtitle}
            </span>
          </div>
        </div>

        {/* Center: Set Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
          {SUBTRACTION_SETS.map((s, idx) => {
            const isSetCompleted = s.questions.every((q) => completedQuestions[`${s.id}-${q.id}`]);
            return (
              <button
                key={s.id}
                onClick={() => handleSwitchSet(idx)}
                className={`px-2 sm:px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer font-['Fredoka'] ${
                  currentSetIndex === idx
                    ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                <span>Set {idx + 1}</span>
                {isSetCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />}
              </button>
            );
          })}
        </div>

        {/* Right: Reset, Settings & Progress Pill */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleResetCurrentSet}
            title="Ulang Set Ini"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenSettings}
            title="Tetapan"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
          <div className="hidden sm:flex items-center gap-1 bg-rose-950/80 border border-rose-400/40 px-2.5 py-1 rounded-lg text-xs font-bold text-rose-300">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {totalAnsweredInSet}/{currentSet.questions.length}
            </span>
          </div>
        </div>
      </header>

      {/* --- QUESTION PROGRESS BAR / PILLS --- */}
      <div className="relative z-10 w-full px-3 py-1.5 bg-rose-500/15 backdrop-blur-xs flex items-center justify-between border-b border-rose-300/30">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={handlePrevQuestion}
            disabled={questionIndex === 0}
            className="p-1 rounded-lg text-rose-950 bg-white/70 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer shadow-sm"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {currentSet.questions.map((q, idx) => {
              const qDone = completedQuestions[`${currentSet.id}-${q.id}`];
              const isCurrent = idx === questionIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    playPopSound();
                    setQuestionIndex(idx);
                  }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-black text-xs transition-all flex items-center justify-center cursor-pointer font-['Fredoka'] ${
                    isCurrent
                      ? 'bg-rose-600 text-white scale-110 shadow-md ring-2 ring-rose-300'
                      : qDone
                      ? 'bg-rose-400 text-rose-950 shadow-sm'
                      : 'bg-white/80 text-rose-950 hover:bg-white'
                  }`}
                >
                  {qDone ? '✓' : idx + 1}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={questionIndex === currentSet.questions.length - 1}
            className="p-1 rounded-lg text-rose-950 bg-white/70 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer shadow-sm"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* --- MAIN GAME ARENA --- */}
      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-2 sm:p-4 overflow-y-auto">
        {/* QUESTION CARD */}
        <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-xl border-3 border-rose-300/80 flex flex-col items-center relative transition-all duration-300">
          {/* Audio Speaker & Question Header */}
          <div className="w-full flex items-center justify-between gap-2 mb-2 sm:mb-3 pb-2 border-b border-rose-100">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSpeakEquation}
                className="p-2 rounded-xl bg-rose-500 text-white hover:bg-rose-600 active:scale-95 shadow-md transition cursor-pointer flex items-center gap-1.5"
                title="Dengar Persamaan Suara"
              >
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                <span className="text-xs font-bold font-['Fredoka'] hidden xs:inline">Dengar</span>
              </button>
              <h2 className="text-sm sm:text-base md:text-lg font-black text-slate-800 font-['Fredoka'] leading-tight">
                {currentQ.num1} {currentQ.itemName} tolak {currentQ.num2} = ?
              </h2>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-['Fredoka'] flex-shrink-0">
              Soalan {questionIndex + 1}/{currentSet.questions.length}
            </span>
          </div>

          {/* VISUAL OBJECTS SUBTRACTION AREA */}
          <div className="w-full min-h-[140px] sm:min-h-[180px] bg-gradient-to-br from-rose-50/80 via-pink-50/80 to-amber-50/80 rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center border-2 border-dashed border-rose-300 relative overflow-hidden">
            {/* Visual Object Grid */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 my-2 max-w-xl">
              {Array.from({ length: currentQ.num1 }).map((_, idx) => {
                const isSubtracted = idx >= remainingCount;
                return (
                  <div
                    key={idx}
                    onClick={() => handleTapObject(idx, isSubtracted)}
                    className={`
                      relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all select-none cursor-pointer transform hover:scale-110 active:scale-95
                      ${
                        isSubtracted
                          ? 'bg-rose-100/60 border-2 border-dashed border-rose-400 opacity-60'
                          : 'bg-white shadow-md border-2 border-rose-300'
                      }
                    `}
                    title={isSubtracted ? 'Objek Ditolak' : `Objek Baki: ${idx + 1}`}
                  >
                    <span className={`text-3xl sm:text-4xl md:text-5xl ${isSubtracted ? 'filter grayscale-50' : 'animate-float'}`}>
                      {currentQ.emoji}
                    </span>
                    {/* Cross-out indicator for subtracted items */}
                    {isSubtracted ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-rose-500/20 rounded-2xl">
                        <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-rose-600 drop-shadow" />
                      </div>
                    ) : (
                      <span className="text-[10px] sm:text-xs font-black text-rose-800 font-['Fredoka'] mt-0.5">
                        {idx + 1}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Subtraction Info Pill */}
            <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-white/90 rounded-full border border-rose-200 shadow-sm text-xs font-bold text-slate-700 font-['Fredoka']">
              <span className="text-emerald-700">Baki Tinggal: {remainingCount}</span>
              <span>•</span>
              <span className="text-rose-600">Ditolak: {currentQ.num2} ❌</span>
            </div>
          </div>

          {/* EQUATION ROW WITH TARGET SLOT [ ? ] */}
          <div className="w-full flex items-center justify-center gap-2 sm:gap-4 my-3 sm:my-4">
            {/* Num 1 Card */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white font-black text-xl sm:text-3xl flex items-center justify-center shadow-md border-2 border-rose-400 font-['Fredoka']">
              {currentQ.num1}
            </div>

            {/* Minus Symbol */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-black text-xl sm:text-2xl shadow-inner">
              −
            </div>

            {/* Num 2 Card */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 text-white font-black text-xl sm:text-3xl flex items-center justify-center shadow-md border-2 border-orange-300 font-['Fredoka']">
              {currentQ.num2}
            </div>

            {/* Equal Symbol */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-black text-xl sm:text-2xl shadow-inner">
              =
            </div>

            {/* Target Answer Slot [ ? ] */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl flex flex-col items-center justify-center border-3 transition-all duration-300
                ${
                  feedbackStatus === 'correct'
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-lg scale-105'
                    : wrongChoice !== null
                    ? 'bg-rose-500 text-white border-rose-600 animate-shake shadow-md'
                    : isDragOver
                    ? 'bg-amber-100 border-amber-400 border-dashed scale-105 shadow-md'
                    : 'bg-white border-dashed border-rose-400 shadow-inner'
                }
              `}
            >
              {selectedAnswer !== null ? (
                <span className="font-black text-2xl sm:text-4xl font-['Fredoka'] animate-pop">
                  {selectedAnswer}
                </span>
              ) : (
                <div className="flex flex-col items-center text-rose-400">
                  <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 animate-bounce" />
                  <span className="text-[9px] sm:text-[10px] font-bold text-rose-600 font-['Fredoka']">
                    Letak Sini
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Positive Success Banner */}
          {feedbackStatus === 'correct' && (
            <div className="mb-2 flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white rounded-full font-bold text-xs sm:text-sm font-['Fredoka'] shadow animate-bounce">
              <Sparkles className="w-4 h-4" />
              <span>Tahniah! Jawapan Tepat!</span>
            </div>
          )}

          {/* ANSWER CHOICES BANK (TAP OR DRAG & DROP) */}
          <div className="w-full mt-1 sm:mt-2">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <span className="text-xs font-bold text-slate-600 font-['Fredoka']">
                Pilih atau Seret Nombor Jawapan:
              </span>
              <span className="text-[10px] text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full font-bold">
                Boleh Tekan / Tarik (Drag)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedAnswer === opt;
                const isCorrectOpt = isCurrentQuestionAnswered && opt === currentQ.answer;
                const isWrongOpt = wrongChoice === opt;

                return (
                  <button
                    key={oIdx}
                    draggable={feedbackStatus !== 'correct'}
                    onDragStart={(e) => handleDragStart(e, opt)}
                    onClick={() => handleSelectOption(opt)}
                    className={`
                      relative p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer select-none
                      border-3 active:scale-95 font-['Fredoka']
                      ${
                        isCorrectOpt
                          ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-102 ring-2 ring-emerald-300'
                          : isWrongOpt
                          ? 'bg-rose-500 text-white border-rose-600 animate-shake shadow-md'
                          : isSelected
                          ? 'bg-sky-500 text-white border-sky-600 shadow-sm'
                          : 'bg-white hover:bg-rose-50/80 text-slate-800 border-slate-200 hover:border-rose-300 shadow-md hover:shadow-lg'
                      }
                    `}
                  >
                    <span className="text-2xl sm:text-3xl font-black">{opt}</span>
                    {isCorrectOpt && (
                      <span className="absolute top-1.5 right-1.5 bg-white text-emerald-600 rounded-full p-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* --- FOOTER CONTROLS --- */}
      <footer className="relative z-10 w-full px-3 py-2 bg-white/80 backdrop-blur-md border-t border-rose-200 flex items-center justify-between">
        <button
          onClick={handlePrevQuestion}
          disabled={questionIndex === 0}
          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer font-['Fredoka']"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelum</span>
        </button>

        <span className="text-xs font-bold text-slate-600 font-['Fredoka']">
          Kemajuan Set: {totalAnsweredInSet}/{currentSet.questions.length} Selesai
        </span>

        <button
          onClick={handleNextQuestion}
          disabled={questionIndex === currentSet.questions.length - 1}
          className="px-3 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer font-['Fredoka'] shadow-sm"
        >
          <span>Seterusnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>

      {/* --- VICTORY CELEBRATION MODAL --- */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-rose-50 via-pink-50 to-amber-50 rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-rose-300 text-center flex flex-col items-center animate-scaleUp">
            {/* Golden Star Banner */}
            <div className="mb-2">
              <ThreeGoldenStarsCluster className="w-24 sm:w-28 object-contain" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-rose-700 font-['Fredoka'] mb-1">
              Tahniah! Hebat Sekali! 🎉
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mb-4">
              Anda telah berjaya menyelesaikan semua soalan dalam <span className="font-bold text-rose-800">{currentSet.title}</span>!
            </p>

            {/* Action Buttons */}
            <div className="w-full flex flex-col gap-2">
              {/* LIHAT JAWAPAN BUTTON */}
              <button
                onClick={() => {
                  playPopSound();
                  setShowCelebration(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm sm:text-base font-['Fredoka'] shadow-md transition cursor-pointer flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Lihat Jawapan</span>
              </button>

              {/* NEXT SET BUTTON (if available) */}
              {currentSetIndex < SUBTRACTION_SETS.length - 1 && (
                <button
                  onClick={() => {
                    handleSwitchSet(currentSetIndex + 1);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-sm sm:text-base font-['Fredoka'] shadow-md transition cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>Set Seterusnya ➔</span>
                </button>
              )}

              {/* RESTART SET */}
              <button
                onClick={handleResetCurrentSet}
                className="w-full py-2 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs sm:text-sm font-['Fredoka'] transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Main Semula Set Ini</span>
              </button>

              {/* BACK TO MENU */}
              <button
                onClick={onBackToMenu}
                className="w-full py-1.5 px-4 text-xs font-bold text-slate-500 hover:text-slate-800 transition cursor-pointer"
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
