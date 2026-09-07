import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Sparkles,
  Trophy,
  Volume2,
  CheckCircle2,
  HelpCircle,
  Shuffle,
  ArrowLeft,
  Settings,
} from 'lucide-react';
import {
  PHONICS_WORDS,
  playPopSound,
  playRevealSound,
  playOopsSound,
  playVictorySound,
  speakLetter,
  getBestMalayVoice,
} from '../utils/soundEffects';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

// Colors for the 6 matched pairs
const PAIR_THEMES = [
  { border: '#38bdf8', text: '#0284c7', bg: '#f0f9ff' }, // Sky
  { border: '#f472b6', text: '#db2777', bg: '#fdf2f8' }, // Pink
  { border: '#10b981', text: '#059669', bg: '#ecfdf5' }, // Green
  { border: '#f59e0b', text: '#d97706', bg: '#fffbeb' }, // Amber
  { border: '#a855f7', text: '#7e22ce', bg: '#faf5ff' }, // Purple
  { border: '#ef4444', text: '#dc2626', bg: '#fef2f2' }, // Red
];

// Pick 6 random letters and generate 12 cards (6 uppercase + 6 lowercase)
function generateCards() {
  // Shuffle alphabet to select 6 random letters
  const shuffledAlphabet = [...ALPHABET].sort(() => 0.5 - Math.random());
  const selectedLetters = shuffledAlphabet.slice(0, 6);

  const cardList = [];
  selectedLetters.forEach((letter, index) => {
    const theme = PAIR_THEMES[index % PAIR_THEMES.length];
    const info = PHONICS_WORDS[letter] || { word: letter.toUpperCase(), emoji: '⭐' };

    // Uppercase card
    cardList.push({
      id: `${letter}_upper`,
      letter: letter,
      displayChar: letter.toUpperCase(),
      isUpper: true,
      label: 'Huruf BESAR',
      theme,
      emoji: info.emoji,
      word: info.word,
    });

    // Lowercase card
    cardList.push({
      id: `${letter}_lower`,
      letter: letter,
      displayChar: letter.toLowerCase(),
      isUpper: false,
      label: 'huruf kecil',
      theme,
      emoji: info.emoji,
      word: info.word,
    });
  });

  // Fisher-Yates shuffle the 12 cards
  for (let i = cardList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardList[i], cardList[j]] = [cardList[j], cardList[i]];
  }

  return { cards: cardList, letters: selectedLetters };
}

// Cute Card Back Component (Face Down)
function CuteCardBack() {
  return (
    <div
      className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 border-3 border-purple-200 flex flex-col items-center justify-center p-2 shadow-md overflow-hidden relative"
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {/* Background cute polka dot pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:10px_10px]" />

      {/* Decorative dashed inner stitch frame */}
      <div className="absolute inset-1.5 sm:inset-2 rounded-xl sm:rounded-2xl border-2 border-dashed border-white/40 pointer-events-none" />

      {/* Twinkling Corner Mini Stars */}
      <span className="absolute top-1.5 left-2 text-[10px] sm:text-xs opacity-75 select-none">✨</span>
      <span className="absolute top-1.5 right-2 text-[10px] sm:text-xs opacity-75 select-none">✨</span>
      <span className="absolute bottom-1.5 left-2 text-[10px] sm:text-xs opacity-75 select-none">⭐</span>
      <span className="absolute bottom-1.5 right-2 text-[10px] sm:text-xs opacity-75 select-none">⭐</span>

      {/* Central Cute Shining Star Badge */}
      <div className="relative z-10 w-10 h-10 sm:w-13 sm:h-13 rounded-2xl bg-white/25 backdrop-blur-xs flex items-center justify-center border-2 border-white/60 shadow-md animate-float">
        <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-9 sm:h-9 filter drop-shadow-sm" fill="none">
          {/* 3D Shining Golden Star */}
          <polygon
            points="50,8 62,35 92,38 69,58 76,88 50,72 24,88 31,58 8,38 38,35"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Cute smiley eyes and smile on star */}
          <circle cx="42" cy="46" r="3.5" fill="#713F12" />
          <circle cx="58" cy="46" r="3.5" fill="#713F12" />
          <path d="M44 56 Q50 62 56 56" stroke="#713F12" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Cheeks */}
          <circle cx="36" cy="52" r="3" fill="#FB7185" opacity="0.9" />
          <circle cx="64" cy="52" r="3" fill="#FB7185" opacity="0.9" />
        </svg>
      </div>

      {/* Cute Label */}
      <span className="relative z-10 text-[10px] sm:text-xs font-black text-white/95 mt-1 font-['Fredoka'] tracking-wider drop-shadow-xs">
        Buka Kad
      </span>
    </div>
  );
}

export default function MemoryCardGame({ orientation, onBackToMenu, onOpenSettings }) {
  const [deck, setDeck] = useState(() => generateCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedLetters, setMatchedLetters] = useState(() => new Set());
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [mascotTip, setMascotTip] = useState(
    'Buka dua kad untuk cari pasangan huruf BESAR & kecil!'
  );

  const isLandscape = orientation === 'landscape';

  // Speak voice feedback
  const speakFeedback = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const ut = new SpeechSynthesisUtterance(text);
      ut.lang = 'ms-MY';
      ut.rate = 0.9;
      const voice = getBestMalayVoice();
      if (voice) ut.voice = voice;
      window.speechSynthesis.speak(ut);
    }
  };

  // Start fresh game with 6 brand new random letters
  const handleStartNewGame = useCallback(() => {
    playPopSound();
    const newDeck = generateCards();
    setDeck(newDeck);
    setFlippedIndices([]);
    setMatchedLetters(new Set());
    setMoves(0);
    setIsLocked(false);
    setShowVictory(false);
    setMascotTip('Huruf baharu dipilih! Cari pasangan huruf besar dan kecil.');
  }, []);

  const handleCardClick = (index) => {
    if (isLocked) return;
    if (flippedIndices.includes(index)) return;

    const card = deck.cards[index];
    if (matchedLetters.has(card.letter)) return;

    playPopSound();

    const nextFlipped = [...flippedIndices, index];
    setFlippedIndices(nextFlipped);

    // If 2 cards are now open
    if (nextFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      setIsLocked(true);

      const [firstIdx, secondIdx] = nextFlipped;
      const card1 = deck.cards[firstIdx];
      const card2 = deck.cards[secondIdx];

      // Check if both cards are the same letter (one is upper, one is lower)
      if (card1.letter === card2.letter) {
        // MATCH SUCCESS!
        playRevealSound();
        const updatedMatches = new Set(matchedLetters);
        updatedMatches.add(card1.letter);
        setMatchedLetters(updatedMatches);

        setMascotTip(
          `Tepat sekali! Huruf "${card1.letter.toUpperCase()}" besar padan dengan "${card1.letter.toLowerCase()}" kecil (${card1.word})!`
        );
        speakLetter(card1.letter);

        setFlippedIndices([]);
        setIsLocked(false);

        // Check if all 6 pairs are found
        if (updatedMatches.size === 6) {
          setTimeout(() => {
            playVictorySound();
            setShowVictory(true);
            confetti({
              particleCount: 150,
              spread: 90,
              origin: { y: 0.6 },
            });
          }, 600);
        }
      } else {
        // NO MATCH
        playOopsSound();
        setMascotTip('Belum sepadan. Cuba ingat rupa dan kedudukan kad ini ya!');

        setTimeout(() => {
          setFlippedIndices([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between bg-gradient-to-b from-indigo-100 via-amber-50 to-sky-100 p-2 sm:p-4 select-none overflow-hidden font-['Nunito']">
      {/* Top Header: Kembali ke Menu & Tetapan */}
      <div className="w-full max-w-2xl flex items-center justify-between gap-2 z-10 mb-1">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md border-2 border-emerald-300 transition-all hover:scale-105 active:scale-95 cursor-pointer font-['Fredoka']"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <button
          onClick={onOpenSettings}
          title="Tetapan Audio & Bunyi"
          className="flex items-center gap-1.5 px-3 py-1 bg-slate-800/90 hover:bg-slate-800 text-amber-300 font-bold text-xs sm:text-sm rounded-full shadow-md border border-slate-700 transition-all hover:scale-105 active:scale-95 cursor-pointer font-['Fredoka']"
        >
          <Settings className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Tetapan</span>
        </button>
      </div>

      {/* Top Banner: Stats, Current Random Letters & New Round Button */}
      <div className="w-full max-w-2xl bg-white/95 rounded-2xl px-3 sm:px-4 py-2 shadow-md border-2 border-amber-300 z-10">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Progress Counters */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-xs sm:text-sm font-black text-emerald-800">
                {matchedLetters.size} / 6 Pasangan
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-sky-100 border border-sky-300 px-3 py-1 rounded-xl">
              <span className="text-xs sm:text-sm font-bold text-sky-900">
                Cubaan: <strong className="text-sky-700 font-black">{moves}</strong>
              </span>
            </div>
          </div>

          {/* New Random Letters Round Button */}
          <button
            onClick={handleStartNewGame}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-slate-900 font-extrabold text-xs sm:text-sm rounded-xl shadow-sm transition-all active:scale-95"
            title="Pilih 6 huruf baharu dari A-Z"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Huruf Baharu</span>
          </button>
        </div>

        {/* Selected 6 letters pill preview */}
        <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-slate-100">
          <div className="flex items-center gap-1 overflow-x-auto">
            <span className="text-[11px] font-bold text-slate-400 mr-1">
              Pusingan Ini:
            </span>
            {deck.letters.map((char) => {
              const isFound = matchedLetters.has(char);
              return (
                <span
                  key={char}
                  className={`px-2 py-0.5 rounded-lg text-xs font-black transition-all ${
                    isFound
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {char.toUpperCase()}{char.toLowerCase()}
                </span>
              );
            })}
          </div>

          {/* Audio read tip */}
          <button
            onClick={() => speakFeedback(mascotTip)}
            className="p-1 text-amber-700 hover:text-amber-900"
            title="Dengar Arahan"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center 12-Card Grid (3x4 or 4x3) */}
      <div className="relative flex-1 w-full max-w-2xl my-2 flex items-center justify-center">
        <div
          className={`
            grid w-full h-full max-h-[62vh] sm:max-h-[66vh] gap-2 sm:gap-3 p-1 sm:p-2
            ${
              isLandscape
                ? 'grid-cols-4 grid-rows-3 aspect-[4/3]'
                : 'grid-cols-3 grid-rows-4 sm:grid-cols-4 sm:grid-rows-3 aspect-[3/4] sm:aspect-[4/3]'
            }
          `}
        >
          {deck.cards.map((card, idx) => {
            const isFlipped = flippedIndices.includes(idx);
            const isMatched = matchedLetters.has(card.letter);
            const isOpen = isFlipped || isMatched;

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(idx)}
                className={`
                  relative w-full h-full rounded-2xl sm:rounded-3xl cursor-pointer select-none
                  transition-all duration-300 transform-gpu
                  ${isMatched ? 'scale-98 cursor-default' : 'hover:scale-102 active:scale-95'}
                `}
                style={{ perspective: '1000px' }}
              >
                {/* 3D Card Inner Container */}
                <div
                  className={`
                    w-full h-full rounded-2xl sm:rounded-3xl shadow-md transition-transform duration-500 relative
                    ${isOpen ? 'rotate-y-180' : ''}
                  `}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isOpen ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Card Back (Face Down) */}
                  <CuteCardBack />

                  {/* Card Front (Face Up) */}
                  <div
                    className={`
                      absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl flex flex-col items-center justify-between p-2 sm:p-3 shadow-lg
                      ${
                        isMatched
                          ? 'bg-emerald-50 border-4 border-emerald-400 ring-4 ring-emerald-300/60'
                          : 'bg-white border-3'
                      }
                    `}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      borderColor: isMatched ? '#10b981' : card.theme.border,
                      backgroundColor: isMatched ? '#ecfdf5' : card.theme.bg,
                    }}
                  >
                    {/* Top small label: BESAR / kecil */}
                    <span
                      className={`text-[9px] sm:text-[11px] font-black px-2 py-0.5 rounded-full ${
                        card.isUpper
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-sky-100 text-sky-900 border border-sky-300'
                      }`}
                    >
                      {card.label}
                    </span>

                    {/* Main Character in Center */}
                    <div className="flex-1 flex items-center justify-center">
                      <span
                        className="font-black leading-none font-['Fredoka'] select-none"
                        style={{
                          fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                          color: card.theme.text,
                        }}
                      >
                        {card.displayChar}
                      </span>
                    </div>

                    {/* Bottom word / icon clue */}
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs font-extrabold text-slate-700">
                      <span>{card.emoji}</span>
                      <span className="hidden sm:inline">{card.word}</span>
                    </div>

                    {/* Matched Star Stamp */}
                    {isMatched && (
                      <span className="absolute -top-1.5 -right-1.5 text-lg sm:text-2xl animate-bounce">
                        ⭐
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Mascot Guidance Bar */}
      <div className="w-full max-w-2xl bg-white/95 rounded-2xl px-4 py-2 shadow-md border-2 border-amber-300 flex items-center justify-between gap-2 z-10">
        <p className="text-xs sm:text-sm font-bold text-slate-700 leading-tight">
          💡 {mascotTip}
        </p>

        <button
          onClick={handleStartNewGame}
          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl border border-slate-300 transition-all active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
          <span>Mula Semula</span>
        </button>
      </div>

      {/* Victory Celebration Modal */}
      {showVictory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-gradient-to-b from-amber-50 to-white border-4 border-amber-400 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden animate-pop">
            <div className="relative mx-auto w-20 h-20 mb-3 flex items-center justify-center bg-amber-100 rounded-full border-4 border-amber-300 shadow-inner">
              <Trophy className="w-12 h-12 text-amber-500 animate-bounce" />
              <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-spin" />
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-amber-900 mb-1 font-['Fredoka']">
              Tahniah! Anda Menang! 🎉
            </h2>
            <p className="text-slate-600 text-sm font-semibold mb-4">
              Kesemua 6 pasangan huruf besar dan kecil berjaya dipadankan dalam <strong>{moves} cubaan</strong>!
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-2 mb-6 text-4xl text-amber-400">
              <span>⭐</span>
              <span className="scale-125">🌟</span>
              <span>⭐</span>
            </div>

            {/* Play Again with 6 Fresh Random Letters */}
            <button
              onClick={handleStartNewGame}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 text-base sm:text-lg"
            >
              <Shuffle className="w-5 h-5" />
              <span>Main Lagi (6 Huruf Baharu)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
