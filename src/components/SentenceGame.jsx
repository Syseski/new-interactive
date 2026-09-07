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
  RefreshCw,
} from 'lucide-react';
import {
  playPopSound,
  playVictorySound,
  playWhooshSound,
  playMatchSuccessSound,
} from '../utils/soundEffects';
import { GoldenStarIllustration, ThreeGoldenStarsCluster } from './PhonicsIllustration';

// Data Soalan Susun Ayat (100% Bahasa Melayu)
const SENTENCE_SETS = [
  {
    id: 'set1',
    title: 'Set 1',
    subtitle: 'Susun Ayat Lengkap',
    instruction: 'Susun semula perkataan dan jadikan ayat lengkap.',
    questions: [
      {
        id: 1,
        number: 1,
        shuffledWords: ['baharu.', 'memakai', 'Anis', 'beg'],
        correctWords: ['Anis', 'memakai', 'beg', 'baharu.'],
        fullSentence: 'Anis memakai beg baharu.',
      },
      {
        id: 2,
        number: 2,
        shuffledWords: ['bola', 'Anas', 'di padang.', 'bermain'],
        correctWords: ['Anas', 'bermain', 'bola', 'di padang.'],
        fullSentence: 'Anas bermain bola di padang.',
      },
      {
        id: 3,
        number: 3,
        shuffledWords: ['ikan.', 'Kakak', 'memasak', 'kari'],
        correctWords: ['Kakak', 'memasak', 'kari', 'ikan.'],
        fullSentence: 'Kakak memasak kari ikan.',
      },
      {
        id: 4,
        number: 4,
        shuffledWords: ['wangi.', 'mawar', 'berbau', 'Bunga'],
        correctWords: ['Bunga', 'mawar', 'berbau', 'wangi.'],
        fullSentence: 'Bunga mawar berbau wangi.',
      },
    ],
  },
  {
    id: 'set2',
    title: 'Set 2',
    subtitle: 'Aktiviti Harian',
    instruction: 'Susun semula perkataan dan jadikan ayat lengkap.',
    questions: [
      {
        id: 1,
        number: 1,
        shuffledWords: ['di dapur.', 'pinggan', 'Ibu', 'mencuci'],
        correctWords: ['Ibu', 'mencuci', 'pinggan', 'di dapur.'],
        fullSentence: 'Ibu mencuci pinggan di dapur.',
      },
      {
        id: 2,
        number: 2,
        shuffledWords: ['kereta', 'memandu', 'Ayah', 'baharu.'],
        correctWords: ['Ayah', 'memandu', 'kereta', 'baharu.'],
        fullSentence: 'Ayah memandu kereta baharu.',
      },
      {
        id: 3,
        number: 3,
        shuffledWords: ['buku', 'Murid', 'cerita.', 'membaca'],
        correctWords: ['Murid', 'membaca', 'buku', 'cerita.'],
        fullSentence: 'Murid membaca buku cerita.',
      },
      {
        id: 4,
        number: 4,
        shuffledWords: ['susu', 'Adik', 'suam.', 'minum'],
        correctWords: ['Adik', 'minum', 'susu', 'suam.'],
        fullSentence: 'Adik minum susu suam.',
      },
    ],
  },
];

// Leaf / Vine card border SVG background
function LeafBorderFrame({ children, isSelected, isPlaced, onClick, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`
        relative px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-2xl bg-white border-2 transition-all duration-200 cursor-pointer select-none
        ${
          isSelected
            ? 'border-emerald-500 ring-3 ring-emerald-300 shadow-md scale-105 bg-emerald-50 text-emerald-950'
            : isPlaced
            ? 'border-emerald-400 bg-emerald-100 text-emerald-900 shadow-xs'
            : 'border-lime-500 hover:border-emerald-500 hover:bg-lime-50/70 text-slate-800 shadow-sm'
        }
        ${className}
      `}
    >
      {/* Decorative leaf ornaments at 4 corners */}
      <svg
        className="absolute top-0.5 left-0.5 w-4 h-4 text-emerald-600 opacity-60 pointer-events-none"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
      </svg>
      <svg
        className="absolute top-0.5 right-0.5 w-4 h-4 text-emerald-600 opacity-60 pointer-events-none scale-x-[-1]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
      </svg>
      <svg
        className="absolute bottom-0.5 left-0.5 w-4 h-4 text-emerald-600 opacity-60 pointer-events-none scale-y-[-1]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
      </svg>
      <svg
        className="absolute bottom-0.5 right-0.5 w-4 h-4 text-emerald-600 opacity-60 pointer-events-none scale-[-1]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
      </svg>
      {children}
    </div>
  );
}

// Cute Flower Badge Number Icon
function FlowerNumberBadge({ number, isDone }) {
  return (
    <div className="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center flex-shrink-0">
      <svg className="w-full h-full filter drop-shadow-xs" viewBox="0 0 100 100" fill="none">
        {/* Flower Petals */}
        <circle cx="50" cy="20" r="18" fill={isDone ? '#10B981' : '#F43F5E'} />
        <circle cx="80" cy="50" r="18" fill={isDone ? '#10B981' : '#F43F5E'} />
        <circle cx="50" cy="80" r="18" fill={isDone ? '#10B981' : '#F43F5E'} />
        <circle cx="20" cy="50" r="18" fill={isDone ? '#10B981' : '#F43F5E'} />
        <circle cx="28" cy="28" r="16" fill={isDone ? '#34D399' : '#FB7185'} />
        <circle cx="72" cy="28" r="16" fill={isDone ? '#34D399' : '#FB7185'} />
        <circle cx="72" cy="72" r="16" fill={isDone ? '#34D399' : '#FB7185'} />
        <circle cx="28" cy="72" r="16" fill={isDone ? '#34D399' : '#FB7185'} />
        {/* Flower Center */}
        <circle cx="50" cy="50" r="22" fill="#FFFFFF" stroke={isDone ? '#059669' : '#BE123C'} strokeWidth="2.5" />
      </svg>
      <span className="absolute font-black text-sm sm:text-base font-['Fredoka'] text-slate-800">
        {number}
      </span>
    </div>
  );
}

export default function SentenceGame({ orientation, onBackToMenu, onOpenSettings }) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const currentSet = SENTENCE_SETS[currentSetIndex] || SENTENCE_SETS[0];

  const [questionIndex, setQuestionIndex] = useState(0);
  const currentQ = currentSet.questions[questionIndex] || currentSet.questions[0];

  // Placed words array for the current question e.g. ['Anis', 'memakai', null, null]
  const [placedWords, setPlacedWords] = useState([]);
  // Available words in pool with unique tracking IDs
  const [availableWords, setAvailableWords] = useState([]);

  // Question validation state: 'idle', 'correct', 'wrong'
  const [feedbackStatus, setFeedbackStatus] = useState('idle');
  // Completed questions tracking: { 'set1-1': true }
  const [completedQuestions, setCompletedQuestions] = useState({});
  // Completed sets tracking: { 'set1': true }
  const [completedSets, setCompletedSets] = useState({});
  // Victory modal
  const [showCelebration, setShowCelebration] = useState(false);

  // Initialize or reset question state
  useEffect(() => {
    if (!currentQ) return;

    setPlacedWords(new Array(currentQ.correctWords.length).fill(null));

    const pool = currentQ.shuffledWords.map((word, idx) => ({
      id: `${questionIndex}-${idx}-${word}`,
      text: word,
      originalIdx: idx,
    }));
    setAvailableWords(pool);
    setFeedbackStatus('idle');
  }, [questionIndex, currentSetIndex]);

  // Handle selecting a word from available pool
  const handleSelectPoolWord = (item) => {
    if (feedbackStatus === 'correct') return;
    playPopSound();

    const firstEmptyIndex = placedWords.findIndex((w) => w === null);
    if (firstEmptyIndex === -1) return;

    const newPlaced = [...placedWords];
    newPlaced[firstEmptyIndex] = item;
    setPlacedWords(newPlaced);

    const newAvailable = availableWords.filter((w) => w.id !== item.id);
    setAvailableWords(newAvailable);

    // Check answer when all words are placed
    if (newPlaced.every((w) => w !== null)) {
      validateAnswer(newPlaced);
    }
  };

  // Handle removing a placed word back to pool
  const handleRemovePlacedWord = (slotIdx) => {
    if (feedbackStatus === 'correct') return;
    const item = placedWords[slotIdx];
    if (!item) return;

    playPopSound();
    const newPlaced = [...placedWords];
    newPlaced[slotIdx] = null;
    setPlacedWords(newPlaced);

    setAvailableWords((prev) => [...prev, item]);
    setFeedbackStatus('idle');
  };

  // Validate placed words against correct sentence
  const validateAnswer = (placedArray) => {
    const constructedSentence = placedArray.map((w) => (w ? w.text : '')).join(' ');
    const isExactMatch = placedArray.every(
      (w, idx) => w && w.text.trim() === currentQ.correctWords[idx].trim()
    );

    if (isExactMatch) {
      // Correct!
      setFeedbackStatus('correct');
      playMatchSuccessSound();

      const newCompleted = {
        ...completedQuestions,
        [`${currentSet.id}-${currentQ.id}`]: true,
      };
      setCompletedQuestions(newCompleted);

      // Check if all questions in this set are done
      const allDone = currentSet.questions.every(
        (q) => newCompleted[`${currentSet.id}-${q.id}`]
      );

      if (allDone) {
        setCompletedSets((prev) => ({ ...prev, [currentSet.id]: true }));
        setTimeout(() => {
          triggerVictoryCelebration();
        }, 1200);
      }
    } else {
      // Wrong!
      setFeedbackStatus('wrong');
      playWhooshSound();
    }
  };

  // Reset current question
  const handleResetCurrentQuestion = () => {
    playPopSound();
    setPlacedWords(new Array(currentQ.correctWords.length).fill(null));
    const pool = currentQ.shuffledWords.map((word, idx) => ({
      id: `${questionIndex}-${idx}-${word}`,
      text: word,
      originalIdx: idx,
    }));
    setAvailableWords(pool);
    setFeedbackStatus('idle');
  };

  // Switch sets
  const handleSwitchSet = (idx) => {
    if (idx === currentSetIndex) return;
    playPopSound();
    setCurrentSetIndex(idx);
    setQuestionIndex(0);
    setShowCelebration(false);
  };

  // Prev / Next question navigation
  const handlePrevQuestion = () => {
    if (questionIndex > 0) {
      playPopSound();
      setQuestionIndex(questionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (questionIndex < currentSet.questions.length - 1) {
      playPopSound();
      setQuestionIndex(questionIndex + 1);
    }
  };

  // Full set victory trigger
  const triggerVictoryCelebration = () => {
    setShowCelebration(true);
    playVictorySound();

    const count = 200;
    const defaults = { origin: { y: 0.7 } };
    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const hasNextSet = currentSetIndex < SENTENCE_SETS.length - 1;
  const isCurrentQDone = completedQuestions[`${currentSet.id}-${currentQ.id}`];

  return (
    <div className="relative w-full h-full min-h-[620px] flex flex-col items-center justify-between bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-100 p-2 sm:p-4 select-none overflow-y-auto font-['Nunito']">
      {/* 1. TOP HEADER NAVIGATION */}
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
        <div className="flex items-center gap-1.5 bg-white/95 px-2 py-1 rounded-full shadow-sm border-2 border-emerald-300">
          {SENTENCE_SETS.map((set, idx) => {
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
                      ? 'bg-purple-600 text-white shadow-xs scale-105'
                      : 'bg-purple-50 hover:bg-purple-100 text-purple-900'
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
            onClick={handleResetCurrentQuestion}
            title="Susun Semula"
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

      {/* 2. THEME HEADER BANNER (Matching Worksheet Header with Mascot, Sun & Rainbow) */}
      <div className="w-full max-w-3xl flex flex-col gap-1.5 z-20 mb-2 px-1">
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-500 px-3.5 py-2.5 rounded-2xl shadow-md border-2 border-purple-400 flex items-center justify-between text-white">
          {/* Header text */}
          <div className="flex items-center gap-2.5 z-10">
            <div>
              <span className="text-sm sm:text-base md:text-lg font-black font-['Fredoka'] tracking-wide block leading-tight">
                Ayat
              </span>
              <p className="text-[11px] sm:text-xs text-purple-100 font-bold">
                {currentSet.instruction}
              </p>
            </div>
          </div>

          <span className="text-[11px] sm:text-xs font-black text-purple-950 bg-amber-300 px-2.5 py-1 rounded-lg border border-amber-400 z-10 shadow-xs">
            {currentSet.subtitle}
          </span>
        </div>

        {/* Question Selector Tabs */}
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-2">
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
                    flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs font-['Fredoka'] transition-all cursor-pointer border-2
                    ${
                      isCurrent
                        ? 'bg-purple-600 text-white border-purple-700 scale-105 shadow-sm ring-2 ring-purple-300'
                        : isDone
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-400 hover:bg-emerald-200'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-amber-50'
                    }
                  `}
                >
                  <span>Soalan {q.number}</span>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-black text-slate-600 font-['Fredoka']">
            {questionIndex + 1} / {currentSet.questions.length}
          </span>
        </div>
      </div>

      {/* 3. MAIN INTERACTIVE ARENA */}
      <div className="w-full max-w-3xl flex-1 flex flex-col items-center justify-center gap-3 sm:gap-4 my-auto">
        <div className="w-full bg-white/95 p-4 sm:p-6 rounded-3xl border-3 border-emerald-400 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
          {/* Question Header & Reset */}
          <div className="w-full flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2.5">
              <FlowerNumberBadge number={currentQ.number} isDone={isCurrentQDone} />
              <div>
                <span className="text-xs sm:text-sm font-black text-slate-700 font-['Fredoka']">
                  Soalan {currentQ.number}:
                </span>
                <p className="text-[11px] sm:text-xs text-slate-500 font-bold">
                  Tekan perkataan mengikut susunan ayat yang betul.
                </p>
              </div>
            </div>

            <button
              onClick={handleResetCurrentQuestion}
              className="flex items-center gap-1 text-slate-500 hover:text-slate-800 font-bold text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full border border-slate-200 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Susun Semula</span>
            </button>
          </div>

          {/* A. SCRAMBLED WORDS TILES (PILIHAN PERKATAAN DENGAN CORAK DAUN SEPERTI LEMBARAN KERJA) */}
          <div className="w-full flex flex-col items-center gap-2 mb-5">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider font-['Fredoka']">
              Pilihan Perkataan:
            </span>

            <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 flex-wrap min-h-[58px]">
              {availableWords.length === 0 ? (
                <div className="text-xs font-bold text-slate-400 py-2">
                  {feedbackStatus === 'correct'
                    ? '🎉 Tahniah! Semua perkataan telah disusun dengan betul.'
                    : 'Semua perkataan telah dimasukkan ke dalam garisan ayat di bawah.'}
                </div>
              ) : (
                availableWords.map((wordObj) => (
                  <LeafBorderFrame
                    key={wordObj.id}
                    onClick={() => handleSelectPoolWord(wordObj)}
                    className="hover:scale-105 active:scale-95 shadow-sm"
                  >
                    <span className="text-base sm:text-xl md:text-2xl font-black font-['Fredoka'] text-slate-900">
                      {wordObj.text}
                    </span>
                  </LeafBorderFrame>
                ))
              )}
            </div>
          </div>

          {/* B. TARGET SENTENCE LINE / ANSWER SLOTS (GARISAN AYAT LENGKAP) */}
          <div className="w-full flex flex-col items-center gap-2 pt-4 border-t-2 border-dashed border-amber-300">
            <span className="text-xs font-black text-slate-600 font-['Fredoka'] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Garisan Jawapan Ayat:</span>
            </span>

            {/* Dotted underline box matching worksheet style */}
            <div className="w-full min-h-[80px] sm:min-h-[96px] p-3 sm:p-4 rounded-2xl bg-amber-50/70 border-2 border-dashed border-amber-400 flex items-center justify-center gap-2 sm:gap-3 flex-wrap shadow-inner">
              {placedWords.map((slotItem, slotIdx) => {
                const isFilled = slotItem !== null;

                if (!isFilled) {
                  return (
                    <div
                      key={`slot-${slotIdx}`}
                      className="min-w-[70px] sm:min-w-[90px] h-11 sm:h-13 px-3 rounded-xl bg-white/70 border-2 border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400 font-bold"
                    >
                      Perkataan {slotIdx + 1}
                    </div>
                  );
                }

                return (
                  <div
                    key={`slot-${slotIdx}`}
                    onClick={() => handleRemovePlacedWord(slotIdx)}
                    className={`
                      relative px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl font-black text-base sm:text-xl md:text-2xl font-['Fredoka']
                      flex items-center justify-center border-2 transition-all duration-200 cursor-pointer select-none
                      ${
                        feedbackStatus === 'correct'
                          ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105 animate-bounce'
                          : feedbackStatus === 'wrong'
                          ? 'bg-rose-100 text-rose-900 border-rose-500 animate-shake'
                          : 'bg-lime-400 text-lime-950 border-lime-600 shadow-xs scale-102 hover:bg-lime-300'
                      }
                    `}
                  >
                    <span>{slotItem.text}</span>
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] flex items-center justify-center shadow-xs">
                      ✕
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Solid continuous underline decoration */}
            <div className="w-full max-w-xl h-0.5 bg-slate-300 rounded-full mt-1" />
          </div>

          {/* Feedback message banner */}
          {feedbackStatus === 'correct' && (
            <div className="mt-4 px-4 py-2 bg-emerald-100 border-2 border-emerald-400 text-emerald-900 rounded-full font-black text-xs sm:text-sm font-['Fredoka'] flex items-center gap-1.5 animate-pop">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Tahniah! Ayat yang betul: "{currentQ.fullSentence}"</span>
            </div>
          )}

          {feedbackStatus === 'wrong' && (
            <div className="mt-4 px-4 py-2 bg-rose-100 border-2 border-rose-400 text-rose-900 rounded-full font-black text-xs sm:text-sm font-['Fredoka'] flex items-center gap-1.5 animate-shake">
              <span>Susunan belum tepat. Tekan perkataan pada garisan jawapan untuk tukar semula.</span>
            </div>
          )}
        </div>

        {/* Bottom Pagination Controls (Sebelum / Seterusnya) */}
        <div className="w-full flex items-center justify-between px-2">
          <button
            onClick={handlePrevQuestion}
            disabled={questionIndex === 0}
            className={`
              flex items-center gap-1 px-4 py-2 rounded-full font-black text-xs sm:text-sm font-['Fredoka'] transition-all
              ${
                questionIndex === 0
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  : 'bg-white hover:bg-purple-50 text-slate-800 border-2 border-purple-300 shadow-sm active:scale-95 cursor-pointer'
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
                  : 'bg-purple-600 hover:bg-purple-700 text-white border-2 border-purple-500 shadow-md active:scale-95 cursor-pointer'
              }
            `}
          >
            <span>Seterusnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. VICTORY CELEBRATION MODAL */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-4 border-purple-400 rounded-3xl p-5 sm:p-6 max-w-sm w-full shadow-2xl text-center animate-pop flex flex-col items-center">
            {/* 3D Golden Star Reward */}
            <GoldenStarIllustration size={100} className="w-24 h-24 sm:w-28 sm:h-28 mb-1" animated={true} />

            {/* 3 Golden Stars Cluster */}
            <ThreeGoldenStarsCluster className="mb-2" />

            <h3 className="text-2xl font-black text-emerald-600 font-['Fredoka'] mb-1">
              Tahniah! Cemerlang! 🎉
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm font-bold mb-4">
              {hasNextSet
                ? `Anda telah berjaya menyusun kesemua ayat dalam ${currentSet.title}!`
                : 'Hebat sekali! Anda telah berjaya menguasai kesemua susunan ayat dalam permainan ini!'}
            </p>

            <div className="flex flex-col gap-2 w-full">
              {hasNextSet ? (
                <button
                  onClick={() => handleSwitchSet(currentSetIndex + 1)}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black rounded-xl text-sm shadow-md transition-all active:scale-95 font-['Fredoka'] cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Teruskan ke Set 2</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : null}

              <button
                onClick={() => {
                  setShowCelebration(false);
                  setQuestionIndex(0);
                  handleResetCurrentQuestion();
                }}
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
