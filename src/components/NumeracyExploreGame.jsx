import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Settings,
  Volume2,
  Mic,
  Square,
  Play,
  Check,
  Trophy,
  Flame,
  HelpCircle,
  Folder,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import {
  playPopSound,
  playVictorySound,
  playWhooshSound,
  playMatchSuccessSound,
  playOopsSound,
  speakNumber,
  numberToMalayWord,
  setRecordedNumberAudio,
  getRecordedNumberAudio,
} from '../utils/soundEffects';

/* =========================================================================
   1. COUNT OBJECTS & COLORS FOR NUMBERS 1 TO 10
   ========================================================================= */

const NUMBERS_1_TO_10 = [
  {
    num: 1,
    word: 'Satu',
    emoji: '🍎',
    objectName: 'Epal',
    color: 'from-rose-400 via-pink-400 to-rose-500 border-rose-600 text-white',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
  },
  {
    num: 2,
    word: 'Dua',
    emoji: '⚽',
    objectName: 'Bola',
    color: 'from-amber-400 via-yellow-400 to-amber-500 border-amber-600 text-amber-950',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  {
    num: 3,
    word: 'Tiga',
    emoji: '🐱',
    objectName: 'Kucing',
    color: 'from-emerald-400 via-green-400 to-green-500 border-green-600 text-white',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  {
    num: 4,
    word: 'Empat',
    emoji: '🚗',
    objectName: 'Kereta',
    color: 'from-sky-400 via-blue-400 to-blue-500 border-blue-600 text-white',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
  },
  {
    num: 5,
    word: 'Lima',
    emoji: '⭐',
    objectName: 'Bintang',
    color: 'from-purple-400 via-violet-400 to-violet-500 border-violet-600 text-white',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
  },
  {
    num: 6,
    word: 'Enam',
    emoji: '🍦',
    objectName: 'Aiskrim',
    color: 'from-teal-400 via-cyan-400 to-teal-500 border-teal-600 text-white',
    badgeBg: 'bg-teal-100 text-teal-800 border-teal-300',
  },
  {
    num: 7,
    word: 'Tujuh',
    emoji: '🌸',
    objectName: 'Bunga',
    color: 'from-pink-400 via-rose-400 to-pink-500 border-pink-600 text-white',
    badgeBg: 'bg-pink-100 text-pink-800 border-pink-300',
  },
  {
    num: 8,
    word: 'Lapan',
    emoji: '🎈',
    objectName: 'Belon',
    color: 'from-orange-400 via-amber-400 to-orange-500 border-orange-600 text-white',
    badgeBg: 'bg-orange-100 text-orange-800 border-orange-300',
  },
  {
    num: 9,
    word: 'Sembilan',
    emoji: '🦋',
    objectName: 'Rama-rama',
    color: 'from-indigo-400 via-blue-500 to-indigo-600 border-indigo-700 text-white',
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  },
  {
    num: 10,
    word: 'Sepuluh',
    emoji: '🧁',
    objectName: 'Kek Cawan',
    color: 'from-lime-400 via-emerald-400 to-green-500 border-emerald-600 text-white',
    badgeBg: 'bg-lime-100 text-emerald-800 border-lime-300',
  },
];

/* =========================================================================
   2. MAIN COMPONENT: KENAL & SEBUT NOMBOR 1 - 10
   ========================================================================= */

export default function NumeracyExploreGame({
  orientation = 'portrait',
  onBackToMenu,
  onOpenSettings,
}) {
  const [activeNumber, setActiveNumber] = useState(1);
  const [gameMode, setGameMode] = useState('explore'); // 'explore' or 'quiz'

  // Quiz Mode State
  const [quizTarget, setQuizTarget] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState(null); // 'correct', 'wrong'
  const [showVictoryModal, setShowVictoryModal] = useState(false);

  // Voice Recording Studio Modal
  const [showVoiceStudio, setShowVoiceStudio] = useState(false);
  const [studioTargetNumber, setStudioTargetNumber] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  // Handle number click in Explore Mode
  const handleNumberClick = (num) => {
    setActiveNumber(num);
    playPopSound();
    speakNumber(num);

    if (gameMode === 'quiz') {
      handleQuizAnswer(num);
    }
  };

  // Start a new quiz question
  const startNewQuiz = () => {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    setQuizTarget(randomNum);
    setQuizFeedback(null);
    setTimeout(() => {
      speakNumber(randomNum);
    }, 400);
  };

  useEffect(() => {
    if (gameMode === 'quiz') {
      startNewQuiz();
    }
  }, [gameMode]);

  const handleQuizAnswer = (selectedNum) => {
    if (selectedNum === quizTarget) {
      playMatchSuccessSound();
      setQuizFeedback('correct');
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);

      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
      });

      if (score + 1 >= 5) {
        setTimeout(() => {
          playVictorySound();
          setShowVictoryModal(true);
        }, 800);
      } else {
        setTimeout(() => {
          startNewQuiz();
        }, 1200);
      }
    } else {
      playOopsSound();
      setQuizFeedback('wrong');
      setStreak(0);
      setTimeout(() => {
        setQuizFeedback(null);
      }, 1000);
    }
  };

  // ---------------- MICROPHONE RECORDING LOGIC ----------------
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedBlobUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      alert('Sila benarkan akses mikrofon dalam pelayar web anda untuk merakam suara.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const saveRecording = () => {
    if (recordedBlobUrl) {
      setRecordedNumberAudio(studioTargetNumber, recordedBlobUrl);
      playVictorySound();
      alert(`Suara anda untuk nombor "${studioTargetNumber}" telah disimpan! 🎉`);
    }
  };

  const playCustomPreview = () => {
    if (recordedBlobUrl) {
      const audio = new Audio(recordedBlobUrl);
      audio.play();
    }
  };

  const activeItem =
    NUMBERS_1_TO_10.find((item) => item.num === activeNumber) ||
    NUMBERS_1_TO_10[0];

  return (
    <div className="relative w-full h-full min-h-0 overflow-y-auto select-none font-['Nunito',sans-serif] flex flex-col items-center justify-between p-2 sm:p-3 md:p-4 bg-gradient-to-b from-sky-400 via-sky-100 to-emerald-100">
      {/* Background clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-4 left-6 w-36 h-12 bg-white/80 rounded-full blur-[1px] animate-float" />
        <div
          className="absolute top-12 right-8 w-48 h-16 bg-white/70 rounded-full blur-[1px] animate-float"
          style={{ animationDelay: '1.8s' }}
        />
      </div>

      {/* TOP HEADER CONTAINER */}
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

          {/* Title */}
          <div className="flex flex-col items-center">
            <span className="font-['Fredoka'] font-black text-sm sm:text-lg text-emerald-800 tracking-wide flex items-center gap-1.5">
              <span>🗣️</span> Kenal Nombor 1 - 10
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-600">
              {gameMode === 'explore' ? 'Mod Teroka & Dengar' : 'Mod Kuiz Cari Nombor'}
            </span>
          </div>

          {/* Right: Studio & Settings */}
          <div className="flex items-center gap-1.5">
            {/* Open Voice Studio Button */}
            <button
              onClick={() => {
                playPopSound();
                setStudioTargetNumber(activeNumber);
                setShowVoiceStudio(true);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl font-['Fredoka'] font-bold text-xs shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Rakam Suara Sendiri"
            >
              <Mic className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Rakam Suara</span>
            </button>

            <button
              onClick={onOpenSettings}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Tetapan Audio"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* MODE TOGGLE (TEROKA vs KUIZ) */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center bg-white/90 p-0.5 rounded-full border border-slate-200 shadow-xs text-xs font-['Fredoka'] font-bold">
            <button
              onClick={() => {
                playPopSound();
                setGameMode('explore');
              }}
              className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                gameMode === 'explore'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Teroka & Dengar
            </button>
            <button
              onClick={() => {
                playPopSound();
                setGameMode('quiz');
              }}
              className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                gameMode === 'quiz'
                  ? 'bg-purple-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kuiz Cari Nombor
            </button>
          </div>

          {/* Streak & Score Counter in Quiz */}
          {gameMode === 'quiz' && (
            <div className="flex items-center gap-2">
              {streak > 1 && (
                <div className="flex items-center gap-1 px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-lg font-black text-xs font-['Fredoka'] animate-bounce">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span>{streak}x</span>
                </div>
              )}
              <div className="flex items-center gap-1 px-2.5 py-0.5 bg-yellow-100 text-yellow-900 border border-yellow-300 rounded-lg font-black text-xs font-['Fredoka']">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400" />
                <span>{score} Bintang</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CENTER ARENA: ACTIVE NUMBER HIGHLIGHT CARD + 10 NUMBER CARDS */}
      <div className="relative z-10 w-full max-w-3xl bg-white/95 backdrop-blur-md rounded-3xl p-3 sm:p-4 shadow-2xl border-4 border-white/90 my-auto flex flex-col justify-between gap-3">
        {/* TOP SHOWCASE CARD FOR CURRENT NUMBER */}
        {gameMode === 'explore' ? (
          <div className="w-full bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-2 border-amber-300/80 rounded-2xl p-2.5 sm:p-3.5 flex items-center justify-between gap-3 shadow-sm">
            {/* Left: 3D Giant Number Badge */}
            <button
              onClick={() => {
                playPopSound();
                speakNumber(activeNumber);
              }}
              className={`
                w-16 h-16 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-br ${activeItem.color}
                border-3 sm:border-4 flex items-center justify-center font-['Fredoka'] font-black
                text-3xl sm:text-5xl shadow-md transform hover:scale-105 active:scale-95 transition-transform cursor-pointer flex-shrink-0
              `}
              title="Tekan untuk dengar sebutan"
            >
              {activeNumber}
            </button>

            {/* Middle: Malay Spelling & Audio button */}
            <div className="flex flex-col items-start flex-1 min-w-0">
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                Ejaan Bahasa Melayu:
              </span>
              <span className="font-['Fredoka'] font-black text-2xl sm:text-3xl text-emerald-800 capitalize tracking-wide">
                {activeItem.word}
              </span>

              <button
                onClick={() => {
                  playPopSound();
                  speakNumber(activeNumber);
                }}
                className="mt-1 flex items-center gap-1.5 px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold text-xs shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Dengar Sebutan</span>
              </button>
            </div>

            {/* Right: Visual Count Items for 1 to 10 */}
            <div className="flex flex-col items-end flex-shrink-0 bg-white/80 p-2 sm:p-2.5 rounded-2xl border border-amber-200">
              <span className="text-[10px] sm:text-xs font-extrabold text-slate-500">
                Bilangan: {activeNumber} {activeItem.objectName}
              </span>
              <div className="flex flex-wrap max-w-[130px] justify-end gap-1 text-base sm:text-lg mt-1">
                {Array.from({ length: activeNumber }).map((_, i) => (
                  <span
                    key={i}
                    className="animate-bounce inline-block"
                    style={{
                      animationDuration: '2s',
                      animationDelay: `${i * 0.1}s`,
                    }}
                  >
                    {activeItem.emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Quiz Target Banner */
          <div className="w-full bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 border-2 border-purple-300 rounded-2xl p-3 flex items-center justify-between gap-2 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl">🎯</span>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-purple-900">
                  Cari dan tekan nombor:
                </span>
                <span className="font-['Fredoka'] font-black text-2xl text-purple-700 uppercase">
                  "{quizTarget ? numberToMalayWord(quizTarget) : '...'}"
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                if (quizTarget) speakNumber(quizTarget);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold text-xs shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Dengar Semula</span>
            </button>
          </div>
        )}

        {/* 10 NUMBER CARDS GRID (1 TO 10) */}
        <div className="w-full">
          <div className="grid grid-cols-5 gap-2 sm:gap-3.5">
            {NUMBERS_1_TO_10.map((item) => {
              const isSelected = activeNumber === item.num;
              return (
                <button
                  key={item.num}
                  onClick={() => handleNumberClick(item.num)}
                  type="button"
                  className={`
                    relative group flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl
                    border-3 sm:border-4 transition-all duration-200 shadow-md cursor-pointer
                    ${
                      isSelected
                        ? `bg-gradient-to-br ${item.color} ring-4 ring-emerald-300 scale-105 shadow-xl`
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:scale-103'
                    }
                    h-[86px] sm:h-[105px] md:h-[118px] active:scale-95
                  `}
                >
                  {/* Number */}
                  <span
                    className={`font-['Fredoka'] font-black text-3xl sm:text-4xl md:text-5xl leading-none ${
                      isSelected ? 'text-white' : 'text-slate-800'
                    }`}
                  >
                    {item.num}
                  </span>

                  {/* Malay Word (Clearly visible without clipping) */}
                  <span
                    className={`text-xs sm:text-sm md:text-base font-black capitalize leading-tight mt-1.5 tracking-wide ${
                      isSelected ? 'text-white' : 'text-slate-700'
                    }`}
                  >
                    {item.word}
                  </span>

                  {/* Mini Emoji Object */}
                  <span className="text-sm sm:text-base md:text-lg mt-0.5">
                    {item.emoji}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* VOICE RECORDING STUDIO MODAL */}
      {showVoiceStudio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border-4 border-purple-300 flex flex-col items-center animate-scaleUp">
            {/* Header */}
            <div className="flex items-center justify-between w-full border-b pb-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <Mic className="w-5 h-5" />
                </div>
                <span className="font-['Fredoka'] font-black text-lg text-purple-900">
                  Studio Rakaman Suara (1 - 10)
                </span>
              </div>

              <button
                onClick={() => {
                  stopRecording();
                  setShowVoiceStudio(false);
                }}
                className="text-slate-400 hover:text-slate-600 font-black text-lg p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Target Number Picker (1 to 10) */}
            <div className="flex items-center justify-center gap-3 my-2">
              <button
                onClick={() => setStudioTargetNumber((prev) => Math.max(1, prev - 1))}
                className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex flex-col items-center justify-center text-white font-['Fredoka'] font-black text-2xl shadow-md">
                <span>{studioTargetNumber}</span>
                <span className="text-[10px] font-normal">
                  {numberToMalayWord(studioTargetNumber)}
                </span>
              </div>

              <button
                onClick={() => setStudioTargetNumber((prev) => Math.min(10, prev + 1))}
                className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Quick 1-10 Buttons for fast picker */}
            <div className="flex flex-wrap justify-center gap-1.5 my-2">
              {Array.from({ length: 10 }).map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setStudioTargetNumber(idx + 1)}
                  className={`w-7 h-7 rounded-lg text-xs font-black font-['Fredoka'] transition-all cursor-pointer ${
                    studioTargetNumber === idx + 1
                      ? 'bg-purple-600 text-white shadow-xs scale-110'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <p className="text-xs text-center font-bold text-slate-600 mb-3">
              Rakam sebutan anda untuk nombor{' '}
              <strong className="text-purple-700">
                "{numberToMalayWord(studioTargetNumber)}"
              </strong>
            </p>

            {/* Record / Stop Buttons */}
            <div className="flex items-center justify-center gap-3 mb-4">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-['Fredoka'] font-black text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <div className="w-3 h-3 rounded-full bg-white animate-ping" />
                  <span>Mula Rakam</span>
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-['Fredoka'] font-black text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer animate-pulse"
                >
                  <Square className="w-4 h-4 text-rose-400 fill-rose-400" />
                  <span>Berhenti ({recordingTime}s)</span>
                </button>
              )}

              {recordedBlobUrl && (
                <button
                  onClick={playCustomPreview}
                  className="p-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="Dengar Semula"
                >
                  <Play className="w-5 h-5 fill-white" />
                </button>
              )}
            </div>

            {/* Save Button */}
            {recordedBlobUrl && (
              <button
                onClick={saveRecording}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl font-['Fredoka'] font-black text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 mb-2"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Suara untuk Nombor {studioTargetNumber}</span>
              </button>
            )}

            {/* File Path Instruction Tip */}
            <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-[11px] text-slate-600 flex flex-col gap-1">
              <span className="font-bold flex items-center gap-1 text-slate-800">
                <Folder className="w-3.5 h-3.5 text-amber-500" />
                Penggunaan Fail MP3 Sendiri:
              </span>
              <p>
                Simpan fail audio anda di folder:{' '}
                <code className="bg-slate-200 px-1 py-0.5 rounded text-purple-700 font-bold">
                  public/audio/numbers/{studioTargetNumber}.mp3
                </code>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* QUIZ VICTORY CELEBRATION MODAL */}
      {showVictoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border-4 border-amber-300 flex flex-col items-center text-center animate-scaleUp">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-full flex items-center justify-center border-4 border-white shadow-xl -mt-12 mb-3">
              <Trophy className="w-10 h-10 text-white fill-yellow-200" />
            </div>

            <span className="font-['Fredoka'] font-black text-2xl text-emerald-800 tracking-wide">
              Tahniah! Hebat!
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1 mb-4">
              Anda telah berjaya menjawab semua soalan kuiz nombor 1 hingga 10 dengan cemerlang!
            </p>

            <button
              onClick={() => {
                playPopSound();
                setScore(0);
                setStreak(0);
                setShowVictoryModal(false);
                startNewQuiz();
              }}
              className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 text-white rounded-2xl font-['Fredoka'] font-black text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Main Kuiz Semula
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
