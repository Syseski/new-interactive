import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import GameBoard from './components/GameBoard';
import LetterDrawingGame from './components/LetterDrawingGame';
import MemoryCardGame from './components/MemoryCardGame';
import DragMatchGame from './components/DragMatchGame';
import FillInBlankGame from './components/FillInBlankGame';
import ChooseCorrectGame from './components/ChooseCorrectGame';
import LabelObjectGame from './components/LabelObjectGame';
import CrosswordGame from './components/CrosswordGame';
import SyllableGame from './components/SyllableGame';
import SentenceGame from './components/SentenceGame';
import NumeracyCompareGame from './components/NumeracyCompareGame';
import NumeracyCountColorGame from './components/NumeracyCountColorGame';
import NumeracyOrderGame from './components/NumeracyOrderGame';
import NumeracyExploreGame from './components/NumeracyExploreGame';
import NumeracySifirGame from './components/NumeracySifirGame';
import VictoryModal from './components/VictoryModal';
import GameSelectionMenu from './components/GameSelectionMenu';
import SettingsModal from './components/SettingsModal';
import {
  playPopSound,
  playRevealSound,
  playVictorySound,
  speakLetter,
  setSoundEnabled,
  getBestMalayVoice,
  playBGM,
  toggleBGM,
  setBGMEnabled,
} from './utils/soundEffects';

const ALL_LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function App() {
  const [activeGame, setActiveGame] = useState('menu');
  const [currentSubject, setCurrentSubject] = useState('literasi'); // 'literasi' or 'numerasi' // 'menu', 'trail', 'drawing', 'memory'
  const [gameMode, setGameMode] = useState('puzzle');
  const [orientationMode, setOrientationMode] = useState('auto'); // 'auto', 'portrait', 'landscape'
  const [deviceOrientation, setDeviceOrientation] = useState(
    window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
  );
  const [revealedLetters, setRevealedLetters] = useState(
    () => new Set()
  );
  const [soundOn, setSoundOn] = useState(true);
  const [bgmOn, setBgmOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [mascotMessage, setMascotMessage] = useState(
    'Tekan mana-mana huruf kelabu untuk lihat animasi garisan huruf!'
  );

  // Auto-play BGM on first user interaction (browser policy)
  useEffect(() => {
    const handleFirstInteraction = () => {
      playBGM();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
    };
  }, []);

  // Monitor screen resize for auto orientation
  useEffect(() => {
    const handleResize = () => {
      setDeviceOrientation(
        window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
      );
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const effectiveOrientation =
    orientationMode === 'auto' ? deviceOrientation : orientationMode;

  const triggerVictory = useCallback(() => {
    setShowVictory(true);
    playVictorySound();

    // Trigger colorful confetti shower
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
  }, []);

  // When a letter is clicked in Game 1 (Laluan Huruf)
  const handleLetterClick = (letter) => {
    const isNewReveal = !revealedLetters.has(letter);

    if (isNewReveal) {
      const nextSet = new Set(revealedLetters);
      nextSet.add(letter);
      setRevealedLetters(nextSet);

      playRevealSound();
      speakLetter(letter);
      setMascotMessage(`Hebat! Huruf "${letter.toUpperCase()}" berjaya dilukis & dibuka!`);

      if (nextSet.size === ALL_LETTERS.length) {
        setMascotMessage('Tahniah! Semua 26 huruf telah lengkap!');
        setTimeout(triggerVictory, 600);
      }
    } else {
      playPopSound();
      speakLetter(letter);
      setMascotMessage(`Ini huruf "${letter.toUpperCase()}". Bagus!`);
    }
  };

  const handleReset = () => {
    setRevealedLetters(new Set());
    setShowVictory(false);
    setMascotMessage('Tekan mana-mana huruf kelabu untuk lihat animasi garisan huruf!');
    playPopSound();
  };

  const handleModeChange = (mode) => {
    setGameMode(mode);
    setShowVictory(false);
    setRevealedLetters(new Set());
    if (mode === 'puzzle') {
      setMascotMessage('Tekan mana-mana huruf kelabu untuk lihat animasi garisan huruf!');
    } else {
      setMascotMessage('Mod Teroka: Tekan mana-mana huruf untuk dengar sebutan!');
    }
    playPopSound();
  };

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  const handleToggleBGM = () => {
    const next = !bgmOn;
    setBgmOn(next);
    setBGMEnabled(next);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error(err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((err) => {
        console.error(err);
      });
    }
  };

  const handleChangeGame = (gameId) => {
    playPopSound();
    if (typeof gameId === 'string' && gameId.startsWith('num_')) {
      setCurrentSubject('numerasi');
    } else if (typeof gameId === 'string' && gameId !== 'menu') {
      setCurrentSubject('literasi');
    }
    setActiveGame(gameId);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center select-none font-['Nunito',sans-serif]">
      {/* Navbar Portal Header */}
      <Navbar
        activeGame={activeGame}
        onOpenSettings={() => setShowSettings(true)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        orientationMode={orientationMode}
        onChangeOrientation={setOrientationMode}
        gameMode={gameMode}
        onChangeGameMode={handleModeChange}
        progressCount={revealedLetters.size}
        totalLetters={ALL_LETTERS.length}
      />

      {/* Main Game Arena / Wrapper */}
      <main className="flex-1 w-full h-[calc(100dvh-56px)] sm:h-[calc(100dvh-64px)] flex items-center justify-center p-0 sm:p-2 md:p-3 overflow-hidden">
        <div
          className={`
            relative w-full h-full overflow-hidden transition-all duration-300
            ${
              effectiveOrientation === 'portrait'
                ? 'max-w-md sm:max-w-lg md:max-w-xl sm:max-h-[960px] rounded-none sm:rounded-3xl shadow-none sm:shadow-2xl border-0 sm:border-4 sm:border-amber-300'
                : 'w-full max-w-5xl sm:max-h-[850px] rounded-none sm:rounded-3xl shadow-none sm:shadow-2xl border-0 sm:border-4 sm:border-amber-300'
            }
          `}
        >
          {activeGame === 'menu' && (
            <GameSelectionMenu
              onSelectGame={handleChangeGame}
              onOpenSettings={() => setShowSettings(true)}
              orientation={effectiveOrientation}
              currentSubject={currentSubject}
              onSubjectChange={setCurrentSubject}
            />
          )}

          {activeGame === 'trail' && (
            <GameBoard
              revealedLetters={revealedLetters}
              onLetterClick={handleLetterClick}
              orientation={effectiveOrientation}
              onReset={handleReset}
              onBackToMenu={() => handleChangeGame('menu')}
              onOpenSettings={() => setShowSettings(true)}
              mascotMessage={mascotMessage}
            />
          )}

          {activeGame === 'drawing' && (
            <LetterDrawingGame
              orientation={effectiveOrientation}
              onBackToMenu={() => handleChangeGame('menu')}
              onOpenSettings={() => setShowSettings(true)}
            />
          )}

          {activeGame === 'memory' && (
            <MemoryCardGame
              orientation={effectiveOrientation}
              onBackToMenu={() => handleChangeGame('menu')}
              onOpenSettings={() => setShowSettings(true)}
            />
          )}

          {activeGame === 'dragmatch' && (
            <DragMatchGame
              orientation={effectiveOrientation}
              onBackToMenu={() => handleChangeGame('menu')}
              onOpenSettings={() => setShowSettings(true)}
            />
          )}

          {activeGame === 'fillblank' && (
            <FillInBlankGame
              orientation={effectiveOrientation}
              onBackToMenu={() => handleChangeGame('menu')}
              onOpenSettings={() => setShowSettings(true)}
            />
          )}

          {activeGame === 'choosecorrect' && (
            <ChooseCorrectGame
              orientation={effectiveOrientation}
              onBackToMenu={() => handleChangeGame('menu')}
              onOpenSettings={() => setShowSettings(true)}
            />
          )}

          {activeGame === 'labelobjects' && (
            <LabelObjectGame
              orientation={effectiveOrientation}
              onBackToMenu={() => handleChangeGame('menu')}
              onOpenSettings={() => setShowSettings(true)}
            />
          )}

          {activeGame === 'crossword' && (
            <CrosswordGame
              orientation={effectiveOrientation}
              onBackToMenu={() => handleChangeGame('menu')}
              onOpenSettings={() => setShowSettings(true)}
            />
          )}

          {activeGame === 'syllables' && (
            <SyllableGame
              orientation={effectiveOrientation}
              onBackToMenu={() => handleChangeGame('menu')}
              onOpenSettings={() => setShowSettings(true)}
            />
          )}

          {activeGame === 'sentence' && (
            <SentenceGame
              orientation={effectiveOrientation}
              onBackToMenu={() => handleChangeGame('menu')}
              onOpenSettings={() => setShowSettings(true)}
            />
          )}

          {activeGame === 'num_compare' && (
            <NumeracyCompareGame
              orientation={effectiveOrientation}
              onBackToMenu={() => {
                setCurrentSubject('numerasi');
                handleChangeGame('menu');
              }}
              onOpenSettings={() => setShowSettings(true)}
            />
          )}

          {activeGame === 'num_count' && (
            <NumeracyCountColorGame
              orientation={effectiveOrientation}
              onBackToMenu={() => {
                setCurrentSubject('numerasi');
                handleChangeGame('menu');
              }}
              onOpenSettings={() => setShowSettings(true)}
            />
          )}

          {activeGame === 'num_order' && (
            <NumeracyOrderGame
              orientation={effectiveOrientation}
              onBackToMenu={() => {
                setCurrentSubject('numerasi');
                handleChangeGame('menu');
              }}
              onOpenSettings={() => setShowSettings(true)}
            />
          )}

                    {activeGame === 'num_sifir' && (
            <NumeracySifirGame
              orientation={effectiveOrientation}
              onBackToMenu={() => {
                setCurrentSubject('numerasi');
                handleChangeGame('menu');
              }}
              onOpenSettings={() => setShowSettings(true)}
            />
          )}

          {activeGame === 'num_explore' && (
            <NumeracyExploreGame
              orientation={effectiveOrientation}
              onBackToMenu={() => {
                setCurrentSubject('numerasi');
                handleChangeGame('menu');
              }}
              onOpenSettings={() => setShowSettings(true)}
            />
          )}
        </div>
      </main>

      {/* Audio & Sound Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {/* Victory Celebration Modal for Game 1 */}
      <VictoryModal
        isOpen={showVictory}
        onRestart={handleReset}
        onClose={() => {
          playPopSound();
          setShowVictory(false);
        }}
      />
    </div>
  );
}
