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
  Star,
  Plus,
  Equal,
} from 'lucide-react';
import {
  playPopSound,
  playOopsSound,
  playVictorySound,
  playWhooshSound,
  playMatchSuccessSound,
  speakMalayText,
} from '../utils/soundEffects';
import { GoldenStarIllustration, ThreeGoldenStarsCluster } from './PhonicsIllustration';

// Addition Data Sets categorized by skill levels
export const ADDITION_SETS = [
  {
    id: 'set1',
    title: 'Set 1: Asas (Jumlah 1 - 5)',
    subtitle: 'Hasil Tambah hingga 5',
    instruction: 'Kira objek dalam kedua-dua kumpulan dan cari jumlahnya!',
    questions: [
      {
        id: 'q1',
        num1: 1,
        num2: 1,
        answer: 2,
        emoji: '🍎',
        itemName: 'Epal Merah',
        options: [2, 3, 1, 4],
        spokenEquation: 'Satu tambah satu sama dengan dua.',
      },
      {
        id: 'q2',
        num1: 2,
        num2: 1,
        answer: 3,
        emoji: '🦆',
        itemName: 'Itik Comel',
        options: [3, 2, 4, 5],
        spokenEquation: 'Dua tambah satu sama dengan tiga.',
      },
      {
        id: 'q3',
        num1: 2,
        num2: 2,
        answer: 4,
        emoji: '🎈',
        itemName: 'Belon Ceria',
        options: [4, 3, 5, 2],
        spokenEquation: 'Dua tambah dua sama dengan empat.',
      },
      {
        id: 'q4',
        num1: 3,
        num2: 1,
        answer: 4,
        emoji: '⭐',
        itemName: 'Bintang Emas',
        options: [4, 5, 2, 3],
        spokenEquation: 'Tiga tambah satu sama dengan empat.',
      },
      {
        id: 'q5',
        num1: 3,
        num2: 2,
        answer: 5,
        emoji: '🌸',
        itemName: 'Bunga Wangi',
        options: [5, 4, 6, 3],
        spokenEquation: 'Tiga tambah dua sama dengan lima.',
      },
      {
        id: 'q6',
        num1: 4,
        num2: 1,
        answer: 5,
        emoji: '🍓',
        itemName: 'Strawberi',
        options: [5, 3, 4, 6],
        spokenEquation: 'Empat tambah satu sama dengan lima.',
      },
    ],
  },
  {
    id: 'set2',
    title: 'Set 2: Seronok (Jumlah 6 - 10)',
    subtitle: 'Hasil Tambah hingga 10',
    instruction: 'Kira bilangan objek dan pilih nombor jawapan yang tepat!',
    questions: [
      {
        id: 'q1',
        num1: 3,
        num2: 3,
        answer: 6,
        emoji: '🐟',
        itemName: 'Ikan Lincah',
        options: [6, 5, 7, 8],
        spokenEquation: 'Tiga tambah tiga sama dengan enam.',
      },
      {
        id: 'q2',
        num1: 4,
        num2: 3,
        answer: 7,
        emoji: '🦋',
        itemName: 'Rama-rama',
        options: [7, 6, 8, 5],
        spokenEquation: 'Empat tambah tiga sama dengan tujuh.',
      },
      {
        id: 'q3',
        num1: 5,
        num2: 3,
        answer: 8,
        emoji: '🍀',
        itemName: 'Daun Tuah',
        options: [8, 7, 9, 6],
        spokenEquation: 'Lima tambah tiga sama dengan lapan.',
      },
      {
        id: 'q4',
        num1: 6,
        num2: 3,
        answer: 9,
        emoji: '🚗',
        itemName: 'Kereta Laju',
        options: [9, 8, 10, 7],
        spokenEquation: 'Enam tambah tiga sama dengan sembilan.',
      },
      {
        id: 'q5',
        num1: 5,
        num2: 5,
        answer: 10,
        emoji: '🍬',
        itemName: 'Gula-gula',
        options: [10, 9, 8, 11],
        spokenEquation: 'Lima tambah lima sama dengan sepuluh.',
      },
      {
        id: 'q6',
        num1: 7,
        num2: 2,
        answer: 9,
        emoji: '⚽',
        itemName: 'Bola Sepak',
        options: [9, 8, 10, 7],
        spokenEquation: 'Tujuh tambah dua sama dengan sembilan.',
      },
    ],
  },
  {
    id: 'set3',
    title: 'Set 3: Pintar (Cabaran Tambah)',
    subtitle: 'Operasi Tambah Pelbagai',
    instruction: 'Gabungkan kedua-dua nombor dan dapatkan hasil tambahnya!',
    questions: [
      {
        id: 'q1',
        num1: 4,
        num2: 4,
        answer: 8,
        emoji: '🎲',
        itemName: 'Dadu Mainan',
        options: [8, 7, 9, 6],
        spokenEquation: 'Empat tambah empat sama dengan lapan.',
      },
      {
        id: 'q2',
        num1: 6,
        num2: 4,
        answer: 10,
        emoji: '🍊',
        itemName: 'Buah Oren',
        options: [10, 9, 11, 8],
        spokenEquation: 'Enam tambah empat sama dengan sepuluh.',
      },
      {
        id: 'q3',
        num1: 7,
        num2: 4,
        answer: 11,
        emoji: '🍞',
        itemName: 'Roti Sedap',
        options: [11, 10, 12, 9],
        spokenEquation: 'Tujuh tambah empat sama dengan sebelas.',
      },
      {
        id: 'q4',
        num1: 6,
        num2: 6,
        answer: 12,
        emoji: '🐱',
        itemName: 'Kucing Comel',
        options: [12, 11, 13, 10],
        spokenEquation: 'Enam tambah enam sama dengan dua belas.',
      },
      {
        id: 'q5',
        num1: 8,
        num2: 2,
        answer: 10,
        emoji: '☕',
        itemName: 'Cawan Teh',
        options: [10, 9, 11, 8],
        spokenEquation: 'Lapan tambah dua sama dengan sepuluh.',
      },
      {
        id: 'q6',
        num1: 5,
        num2: 4,
        answer: 9,
        emoji: '🧁',
        itemName: 'Kek Cawan',
        options: [9, 8, 10, 7],
        spokenEquation: 'Lima tambah empat sama dengan sembilan.',
      },
    ],
  },
];

export default function NumeracyAdditionGame({ orientation, onBackToMenu, onOpenSettings }) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const currentSet = ADDITION_SETS[currentSetIndex] || ADDITION_SETS[0];

  const [questionIndex, setQuestionIndex] = useState(0);
  const currentQ = currentSet.questions[questionIndex] || currentSet.questions[0];

  // Persistent answered state per question: { 'set1-q1': { placedAnswer: 5, isCorrect: true } }
  const [savedAnswers, setSavedAnswers] = useState({});
  // Completed questions tracking
  const [completedQuestions, setCompletedQuestions] = useState({});

  // Active placed answer in target slot
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Status: 'idle', 'correct', 'wrong'
  const [feedbackStatus, setFeedbackStatus] = useState('idle');
  // Shake / wrong choice trigger
  const [wrongChoice, setWrongChoice] = useState(null);
  // Dragged number
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

  // Handle selecting / placing a number
  const handleSelectOption = (opt) => {
    if (feedbackStatus === 'correct') return;
    playPopSound();

    setSelectedAnswer(opt);

    if (opt === currentQ.answer) {
      // Correct!
      playMatchSuccessSound();
      setFeedbackStatus('correct');
      setWrongChoice(null);

      speakMalayText(`${currentQ.num1} tambah ${currentQ.num2} sama dengan ${currentQ.answer}! Tepat sekali!`);

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

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Check if all questions in this set are completed
      const allDone = currentSet.questions.every(
        (q) => newCompleted[`${currentSet.id}-${q.id}`]
      );

      if (allDone && !hasCelebrated) {
        setTimeout(() => {
          setHasCelebrated(true);
          setShowCelebration(true);
          playVictorySound();
        }, 1200);
      }
    } else {
      // Wrong!
      playOopsSound();
      setFeedbackStatus('wrong');
      setWrongChoice(opt);
      speakMalayText('Cuba kira semula ya!');

      setTimeout(() => {
        setSelectedAnswer(null);
        setFeedbackStatus('idle');
        setWrongChoice(null);
      }, 900);
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (e, opt) => {
    setDraggedNumber(opt);
    e.dataTransfer.setData('text/plain', opt.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const val = parseInt(e.dataTransfer.getData('text/plain'), 10) || draggedNumber;
    if (val !== null && val !== undefined) {
      handleSelectOption(val);
    }
  };

  // Speak equation
  const handleSpeakEquation = () => {
    playPopSound();
    speakMalayText(
      `${currentQ.num1} ${currentQ.itemName} tambah ${currentQ.num2} ${currentQ.itemName}. Berapakah jumlah semuanya?`
    );
  };

  // Tap individual items to count
  const handleTapItem = (groupIndex, itemIdx) => {
    playPopSound();
    const countNum = groupIndex === 1 ? itemIdx + 1 : currentQ.num1 + itemIdx + 1;
    speakMalayText(countNum.toString());
  };

  // Reset current question
  const handleResetCurrentQuestion = () => {
    playPopSound();
    setSelectedAnswer(null);
    setFeedbackStatus('idle');
    setWrongChoice(null);

    setSavedAnswers((prev) => {
      const next = { ...prev };
      delete next[qKey];
      return next;
    });
    setCompletedQuestions((prev) => {
      const next = { ...prev };
      delete next[qKey];
      return next;
    });
  };

  // Reset entire set
  const handleResetFullSet = () => {
    playPopSound();
    setSavedAnswers({});
    setCompletedQuestions({});
    setQuestionIndex(0);
    setShowCelebration(false);
    setHasCelebrated(false);
  };

  // Switch sets
  const handleSwitchSet = (idx) => {
    if (idx === currentSetIndex) return;
    playPopSound();
    setCurrentSetIndex(idx);
    setQuestionIndex(0);
    setShowCelebration(false);
    setHasCelebrated(false);
  };

  // Next and previous question navigation
  const handlePrevQuestion = () => {
    if (questionIndex > 0) {
      playWhooshSound();
      setQuestionIndex(questionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (questionIndex < currentSet.questions.length - 1) {
      playWhooshSound();
      setQuestionIndex(questionIndex + 1);
    }
  };

  const hasNextSet = currentSetIndex < ADDITION_SETS.length - 1;
  const isAnswerCorrect = feedbackStatus === 'correct';

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between bg-gradient-to-b from-rose-100 via-amber-50 to-emerald-100 p-2 sm:p-4 select-none overflow-y-auto font-['Nunito']">
      {/* 1. TOP HEADER: Back, Set selector, Audio settings */}
      <div className="w-full max-w-4xl flex items-center justify-between gap-2 z-20 mb-1 px-1">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md border-2 border-emerald-300 transition-all hover:scale-105 active:scale-95 cursor-pointer font-['Fredoka']"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        {/* Set Selector Pills */}
        <div className="flex items-center gap-1.5 bg-white/95 px-2 py-1 rounded-full shadow-sm border-2 border-rose-300 overflow-x-auto">
          {ADDITION_SETS.map((set, idx) => {
            const isActive = idx === currentSetIndex;
            const isSetDone = set.questions.every((q) => completedQuestions[`${set.id}-${q.id}`]);

            return (
              <button
                key={set.id}
                onClick={() => handleSwitchSet(idx)}
                className={`
                  flex items-center gap-1 px-3 py-1 rounded-full font-black text-xs font-['Fredoka'] transition-all cursor-pointer
                  ${
                    isActive
                      ? 'bg-rose-500 text-white shadow-xs scale-105'
                      : 'bg-rose-50 hover:bg-rose-100 text-rose-900'
                  }
                `}
              >
                <span>{set.title.split(':')[0]}</span>
                {isSetDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Actions (Reset & Settings) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleResetCurrentQuestion}
            title="Kira Semula Soalan Ini"
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

      {/* 2. INSTRUCTION & PROGRESS BANNER */}
      <div className="w-full max-w-4xl flex flex-col gap-1.5 z-20 mb-2 px-1">
        <div className="flex items-center justify-between bg-gradient-to-r from-rose-200 via-amber-100 to-emerald-200 px-3.5 py-2 rounded-2xl shadow-sm border-2 border-rose-300">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl sm:text-2xl flex-shrink-0">➕</span>
            <p className="text-xs sm:text-sm md:text-base font-extrabold text-rose-950 font-['Fredoka'] truncate">
              {currentSet.instruction}
            </p>
          </div>

          <button
            onClick={handleSpeakEquation}
            className="flex items-center gap-1 px-2.5 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold shadow-xs transition-transform active:scale-95 cursor-pointer flex-shrink-0"
            title="Dengar Soalan"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-['Fredoka']">Dengar</span>
          </button>
        </div>

        {/* Question Stepper Dots */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-1.5">
            {currentSet.questions.map((q, idx) => {
              const isCurrent = idx === questionIndex;
              const isDone = completedQuestions[`${currentSet.id}-${q.id}`];

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    playPopSound();
                    setQuestionIndex(idx);
                  }}
                  className={`
                    w-7 h-7 sm:w-8 sm:h-8 rounded-full font-black text-xs font-['Fredoka'] transition-all flex items-center justify-center cursor-pointer border-2
                    ${
                      isCurrent
                        ? 'bg-rose-500 text-white border-rose-600 scale-110 shadow-sm ring-2 ring-rose-300'
                        : isDone
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                        : 'bg-white/80 text-slate-600 border-slate-300 hover:bg-rose-50'
                    }
                  `}
                >
                  {isDone ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : idx + 1}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-black text-slate-600 font-['Fredoka']">
            Soalan {questionIndex + 1} / {currentSet.questions.length}
          </span>
        </div>
      </div>

      {/* 3. MAIN ADDITION INTERACTIVE ARENA */}
      <div className="w-full max-w-4xl flex-1 flex flex-col items-center justify-center my-auto px-1">
        <div className="w-full bg-white/95 p-3.5 sm:p-6 rounded-3xl border-3 border-rose-300 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
          {/* Header Label inside card */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-200">
            <span className="text-xs sm:text-sm font-black text-rose-900 font-['Fredoka']">
              {currentQ.itemName} ({currentQ.emoji})
            </span>
          </div>

          {/* EQUATION ROW: [Group 1 Objects] ➕ [Group 2 Objects] 🟰 [Target Result Box] */}
          <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 my-1">
            {/* GROUP 1 CARD */}
            <div className="flex flex-col items-center bg-gradient-to-b from-rose-50 to-white p-3 sm:p-4 rounded-2xl border-2 border-rose-300 shadow-md min-w-[100px] sm:min-w-[130px]">
              <span className="text-2xl sm:text-4xl font-black font-['Fredoka'] text-rose-600 mb-1">
                {currentQ.num1}
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 max-w-[110px] min-h-[48px]">
                {Array.from({ length: currentQ.num1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTapItem(1, idx)}
                    className="text-2xl sm:text-3xl transition-transform active:scale-75 hover:scale-110 cursor-pointer"
                    title={`Objek ${idx + 1}`}
                  >
                    {currentQ.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* PLUS OPERATOR SIGN */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md border-2 border-rose-300 flex-shrink-0 animate-pulse">
              <Plus className="w-6 h-6 sm:w-7 sm:h-7 stroke-[3]" />
            </div>

            {/* GROUP 2 CARD */}
            <div className="flex flex-col items-center bg-gradient-to-b from-amber-50 to-white p-3 sm:p-4 rounded-2xl border-2 border-amber-300 shadow-md min-w-[100px] sm:min-w-[130px]">
              <span className="text-2xl sm:text-4xl font-black font-['Fredoka'] text-amber-600 mb-1">
                {currentQ.num2}
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 max-w-[110px] min-h-[48px]">
                {Array.from({ length: currentQ.num2 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTapItem(2, idx)}
                    className="text-2xl sm:text-3xl transition-transform active:scale-75 hover:scale-110 cursor-pointer"
                    title={`Objek ${currentQ.num1 + idx + 1}`}
                  >
                    {currentQ.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* EQUALS OPERATOR SIGN */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800 text-amber-300 flex items-center justify-center shadow-md border-2 border-slate-700 flex-shrink-0">
              <Equal className="w-6 h-6 sm:w-7 sm:h-7 stroke-[3]" />
            </div>

            {/* RESULT TARGET DROP / ANSWER BOX */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border-3 transition-all min-w-[110px] sm:min-w-[150px] min-h-[110px] sm:min-h-[125px]
                ${
                  isAnswerCorrect
                    ? 'bg-emerald-50 border-emerald-500 shadow-lg scale-105'
                    : isDragOver
                    ? 'bg-rose-100 border-rose-500 border-dashed scale-105'
                    : 'bg-white border-rose-300 border-dashed shadow-inner'
                }
              `}
            >
              {selectedAnswer !== null ? (
                <div className="flex flex-col items-center justify-center animate-pop">
                  <span
                    className={`text-3xl sm:text-5xl font-black font-['Fredoka'] ${
                      isAnswerCorrect ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {selectedAnswer}
                  </span>
                  {isAnswerCorrect && (
                    <div className="flex flex-wrap items-center justify-center gap-1 mt-1 max-w-[120px]">
                      {Array.from({ length: currentQ.answer }).map((_, idx) => (
                        <span key={idx} className="text-base sm:text-xl">
                          {currentQ.emoji}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400">
                  <span className="text-3xl sm:text-4xl font-black font-['Fredoka'] text-rose-300">
                    ?
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500 text-center font-['Fredoka']">
                    Letak Jawapan
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Feedback message banner */}
          <div className="mt-3 sm:mt-4 min-h-[28px] flex items-center justify-center">
            {feedbackStatus === 'correct' && (
              <div className="flex items-center gap-1.5 px-4 py-1 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300 animate-pop font-['Fredoka'] font-bold text-xs sm:text-sm shadow-xs">
                <span>🎉</span>
                <span>Tahniah! {currentQ.spokenEquation}</span>
              </div>
            )}
            {feedbackStatus === 'wrong' && (
              <div className="flex items-center gap-1.5 px-4 py-1 bg-rose-100 text-rose-800 rounded-full border border-rose-300 animate-shake font-['Fredoka'] font-bold text-xs sm:text-sm shadow-xs">
                <span>❌</span>
                <span>Kurang tepat! Cuba kira semula bilangan objek di atas ya.</span>
              </div>
            )}
            {feedbackStatus === 'idle' && (
              <p className="text-xs text-slate-500 font-semibold font-['Fredoka']">
                Pilih atau seret nombor jawapan yang betul di bawah:
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 4. BOTTOM NUMBER TILES BANK & NAVIGATION */}
      <div className="w-full max-w-4xl flex flex-col gap-2 z-20 mt-1">
        {/* Number Options Bank */}
        <div className="w-full bg-white/95 p-2 sm:p-3 rounded-2xl shadow-md border-2 border-rose-300 flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto">
          {currentQ.options.map((opt) => {
            const isChosen = selectedAnswer === opt;
            const isThisWrong = wrongChoice === opt;

            return (
              <button
                key={opt}
                draggable
                onDragStart={(e) => handleDragStart(e, opt)}
                onClick={() => handleSelectOption(opt)}
                className={`
                  w-12 h-12 sm:w-16 sm:h-16 rounded-2xl font-black text-xl sm:text-3xl font-['Fredoka'] shadow-md border-2 transition-all cursor-pointer flex items-center justify-center active:scale-90
                  ${
                    isThisWrong
                      ? 'bg-rose-500 text-white border-rose-600 animate-shake'
                      : isChosen && isAnswerCorrect
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-200'
                      : 'bg-gradient-to-b from-rose-50 to-rose-100 hover:from-rose-100 hover:to-rose-200 text-rose-800 border-rose-300 hover:scale-105'
                  }
                `}
              >
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Previous & Next Navigation Buttons */}
        <div className="flex items-center justify-between px-1">
          <button
            onClick={handlePrevQuestion}
            disabled={questionIndex === 0}
            className={`
              flex items-center gap-1 px-4 py-2 rounded-full font-black text-xs sm:text-sm font-['Fredoka'] transition-all
              ${
                questionIndex === 0
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-300 shadow-sm active:scale-95 cursor-pointer'
              }
            `}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelum</span>
          </button>

          <button
            onClick={handleNextQuestion}
            disabled={questionIndex === currentSet.questions.length - 1}
            className={`
              flex items-center gap-1 px-4 py-2 rounded-full font-black text-xs sm:text-sm font-['Fredoka'] transition-all
              ${
                questionIndex === currentSet.questions.length - 1
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  : 'bg-rose-500 hover:bg-rose-600 text-white border-2 border-rose-400 shadow-md active:scale-95 cursor-pointer'
              }
            `}
          >
            <span>Seterusnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5. VICTORY CELEBRATION MODAL */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-4 border-rose-400 rounded-3xl p-5 sm:p-6 max-w-sm w-full shadow-2xl text-center animate-pop flex flex-col items-center">
            {/* 3D Golden Star Reward */}
            <GoldenStarIllustration size={100} className="w-24 h-24 sm:w-28 sm:h-28 mb-1" animated={true} />
            <ThreeGoldenStarsCluster className="mb-2" />

            <h3 className="text-2xl font-black text-emerald-600 font-['Fredoka'] mb-1">
              Tahniah! Cemerlang! 🎉
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm font-bold mb-4">
              {hasNextSet
                ? `Anda berjaya menyelesaikan semua soalan ${currentSet.title}!`
                : 'Hebat sekali! Anda telah menguasai kesemua soalan Operasi Tambah Mudah!'}
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
                  onClick={() => handleSwitchSet(currentSetIndex + 1)}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black rounded-xl text-sm shadow-md transition-all active:scale-95 font-['Fredoka'] cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Teruskan ke Set 2</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : null}

              <button
                onClick={handleResetFullSet}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black rounded-xl text-sm shadow-md transition-all active:scale-95 font-['Fredoka'] cursor-pointer"
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
