import { getAssetUrl } from "./assetHelper";
export const PHONICS_WORDS = {
  a: { word: 'Ayam', emoji: '🐔' },
  b: { word: 'Bola', emoji: '⚽' },
  c: { word: 'Cawan', emoji: '☕' },
  d: { word: 'Dadu', emoji: '🎲' },
  e: { word: 'Epal', emoji: '🍎' },
  f: { word: 'Feri', emoji: '⛴️' },
  g: { word: 'Gajah', emoji: '🐘' },
  h: { word: 'Harimau', emoji: '🐯' },
  i: { word: 'Ikan', emoji: '🐟' },
  j: { word: 'Jam', emoji: '⏰' },
  k: { word: 'Kucing', emoji: '🐱' },
  l: { word: 'Lilin', emoji: '🕯️' },
  m: { word: 'Mata', emoji: '👀' },
  n: { word: 'Nasi', emoji: '🍚' },
  o: { word: 'Oren', emoji: '🍊' },
  p: { word: 'Pokok', emoji: '🌳' },
  q: { word: 'Qari', emoji: '📖' },
  r: { word: 'Roti', emoji: '🍞' },
  s: { word: 'Susu', emoji: '🥛' },
  t: { word: 'Topi', emoji: '🧢' },
  u: { word: 'Udang', emoji: '🦐' },
  v: { word: 'Van', emoji: '🚐' },
  w: { word: 'Wau', emoji: '🪁' },
  x: { word: 'Xilofon', emoji: '🎵' },
  y: { word: 'Yo-yo', emoji: '🪀' },
  z: { word: 'Zirafah', emoji: '🦒' },
};

// Audio synthesis & Voice-Over management for Malay Literacy Game

let audioCtx = null;
let soundEnabled = true;
let selectedGender = 'female'; // 'female' or 'male'
let customPitch = 1.15;
let customRate = 0.9;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

let currentLetterAudio = null;
const audioCache = {};

// Background Music (BGM) Manager
let bgmAudio = null;
let bgmEnabled = true;
let bgmVolume = 0.08; // Actual audio volume locked at 8%
let bgmSliderValue = 0.50; // Slider bar default at 50% (middle)

// Voice-over settings
let voiceEnabled = true;
let voiceVolume = 0.85; // Pleasant voice volume
let voiceRate = 0.92; // Slightly slower, clear and child-friendly

export function initBGM() {
  if (bgmAudio || typeof window === 'undefined') return;
  
  bgmAudio = new Audio();
  bgmAudio.src = getAssetUrl('/audio/bgm.mp3');
  bgmAudio.loop = true;
  bgmAudio.volume = bgmVolume;

  const fallbackSources = [getAssetUrl('/audio/bgm.mp3'), getAssetUrl('/audio/music.mp3'), getAssetUrl('/audio/background.mp3'), getAssetUrl('/bgm.mp3')];
  let currentSourceIndex = 0;

  bgmAudio.addEventListener('error', () => {
    currentSourceIndex++;
    if (currentSourceIndex < fallbackSources.length) {
      bgmAudio.src = fallbackSources[currentSourceIndex];
      if (bgmEnabled) {
        bgmAudio.play().catch(() => {});
      }
    }
  });
}

export function playBGM() {
  if (!bgmEnabled) return;
  initBGM();
  if (bgmAudio) {
    bgmAudio.volume = bgmVolume;
    bgmAudio.play().catch(() => {
      // Browser autoplay policy requires user interaction first
    });
  }
}

export function pauseBGM() {
  if (bgmAudio) {
    bgmAudio.pause();
  }
}

export function toggleBGM() {
  bgmEnabled = !bgmEnabled;
  if (bgmEnabled) {
    playBGM();
  } else {
    pauseBGM();
  }
  return bgmEnabled;
}

export function isBGMEnabled() {
  return bgmEnabled;
}

export function setBGMEnabled(enabled) {
  bgmEnabled = enabled;
  if (enabled) {
    playBGM();
  } else {
    pauseBGM();
  }
}

export function setBGMSliderValue(sliderVal) {
  bgmSliderValue = Math.max(0, Math.min(1, sliderVal));
  // 50% slider (0.50) maps directly to 8% actual audio volume (0.08)
  bgmVolume = bgmSliderValue * 0.16;
  if (bgmAudio) {
    bgmAudio.volume = bgmVolume;
  }
}

export function getBGMSliderValue() {
  return bgmSliderValue;
}

export function setBGMVolume(vol) {
  bgmVolume = Math.max(0, Math.min(1, vol));
  bgmSliderValue = Math.max(0, Math.min(1, bgmVolume / 0.16));
  if (bgmAudio) {
    bgmAudio.volume = bgmVolume;
  }
}

export function getBGMVolume() {
  return bgmVolume;
}

export function setVoiceEnabled(enabled) {
  voiceEnabled = enabled;
  if (!enabled && currentLetterAudio) {
    currentLetterAudio.pause();
    currentLetterAudio.currentTime = 0;
  }
}

export function isVoiceEnabled() {
  return voiceEnabled;
}

export function setVoiceVolume(vol) {
  voiceVolume = Math.max(0, Math.min(1, vol));
  if (currentLetterAudio) {
    currentLetterAudio.volume = voiceVolume;
  }
}

export function getVoiceVolume() {
  return voiceVolume;
}

export function setSoundEnabled(enabled) {
  soundEnabled = enabled;
  if (!enabled && currentLetterAudio) {
    currentLetterAudio.pause();
    currentLetterAudio.currentTime = 0;
  }
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function setVoiceGender(gender) {
  selectedGender = gender;
  if (gender === 'male') {
    customPitch = 0.8;
  } else {
    customPitch = 1.15;
  }
}

export function getVoiceGender() {
  return selectedGender;
}

// Find Malay voice (specifically Amira ms-MY or Malay/Indo)
export function getBestMalayVoice() {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();

  // 1. Prioritize Amira (ms-MY)
  const amira = voices.find(v => v.name.includes('Amira') || v.lang === 'ms-MY' || v.lang === 'ms_MY');
  if (amira) return amira;

  // 2. Any Malay voice
  const malayVoice = voices.find(v => v.lang.startsWith('ms'));
  if (malayVoice) return malayVoice;

  // 3. Fallback Indonesian voice
  const indoVoice = voices.find(v => v.lang.startsWith('id'));
  if (indoVoice) return indoVoice;

  return null;
}


// Speak / Play ONLY the letter audio using custom recorded MP3 files from public/audio/letters/
export function speakLetter(letter) {
  if (!soundEnabled || !voiceEnabled) return;

  const upper = (letter || '').toUpperCase();
  const audioSrc = getAssetUrl(`/audio/letters/${upper}.mp3`);

  try {
    // Stop previous audio playback & cancel any ongoing speech
    if (currentLetterAudio) {
      currentLetterAudio.pause();
      currentLetterAudio.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    if (!audioCache[upper]) {
      audioCache[upper] = new Audio(audioSrc);
    }

    const audio = audioCache[upper];
    audio.currentTime = 0;
    audio.volume = voiceVolume;
    audio.playbackRate = 1.0; // Play natural recorded human voice at standard speed
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          currentLetterAudio = audio;
        })
        .catch((err) => {
          console.warn(`Could not play custom audio file for letter ${upper}:`, err);
        });
    }
  } catch (err) {
    console.warn(`Audio playback error for letter ${upper}:`, err);
  }
}

export function numberToMalayWord(num) {
  const units = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'lapan', 'sembilan', 'sepuluh', 'sebelas'];
  const n = parseInt(num, 10);
  if (isNaN(n)) return (num || '').toString();
  if (n === 0) return 'sifar';
  if (n <= 11) return units[n];
  if (n < 20) return units[n - 10] + ' belas';
  if (n < 100) {
    const tens = Math.floor(n / 10);
    const remainder = n % 10;
    return units[tens] + ' puluh' + (remainder > 0 ? ' ' + units[remainder] : '');
  }
  if (n === 100) return 'seratus';
  return n.toString();
}

// In-memory or custom recorded audio blobs store
const recordedNumberAudios = {};

export function setRecordedNumberAudio(num, audioUrlOrBlob) {
  recordedNumberAudios[num] = audioUrlOrBlob;
}

let currentInstructionAudio = null;

// Play custom audio recording for Literacy 3 instruction ("Buka dua kad untuk mencari pasangan huruf besar dan kecil")
export function playMemoryInstructionAudio(onFallback) {
  if (!soundEnabled || !voiceEnabled) return;

  const candidateSources = [
    getAssetUrl('/audio/literasi3_soalan.mp3'),
    getAssetUrl('/audio/literasi3_instruction.mp3'),
    getAssetUrl('/audio/memory_instruction.mp3'),
    getAssetUrl('/audio/soalan_literasi3.mp3'),
  ];

  try {
    if (currentInstructionAudio) {
      currentInstructionAudio.pause();
      currentInstructionAudio.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    let sourceIndex = 0;
    const audio = new Audio(candidateSources[0]);
    audio.volume = voiceVolume;
    audio.playbackRate = 1.0;

    const tryNextOrFallback = () => {
      sourceIndex++;
      if (sourceIndex < candidateSources.length) {
        audio.src = candidateSources[sourceIndex];
        audio.play().then(() => {
          currentInstructionAudio = audio;
        }).catch(() => {
          tryNextOrFallback();
        });
      } else {
        if (typeof onFallback === 'function') {
          onFallback();
        }
      }
    };

    audio.addEventListener('error', tryNextOrFallback);

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          currentInstructionAudio = audio;
        })
        .catch(() => {
          tryNextOrFallback();
        });
    }
  } catch (err) {
    if (typeof onFallback === 'function') {
      onFallback();
    }
  }
}

export function getRecordedNumberAudio(num) {
  return recordedNumberAudios[num] || null;
}

let currentNumberAudio = null;

export function speakNumber(num) {
  if (!soundEnabled || !voiceEnabled) return;

  const numKey = num.toString();
  const word = numberToMalayWord(num);

  try {
    // Stop previous audio playback & cancel TTS
    if (currentNumberAudio) {
      currentNumberAudio.pause();
      currentNumberAudio.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // 1. Check if user recorded custom audio in-session/storage
    if (recordedNumberAudios[numKey]) {
      const audio = new Audio(recordedNumberAudios[numKey]);
      audio.volume = voiceVolume;
      audio.play().then(() => {
        currentNumberAudio = audio;
      }).catch(() => {
        fallbackNumberTTS(word);
      });
      return;
    }

    // 2. Check if custom audio file exists in public/audio/numbers/${num}.mp3 or /audio/nombor/${num}.mp3
    const audioSrc = getAssetUrl(`/audio/numbers/${numKey}.mp3`);
    if (!audioCache[`num_${numKey}`]) {
      audioCache[`num_${numKey}`] = new Audio(audioSrc);
    }

    const audio = audioCache[`num_${numKey}`];
    audio.currentTime = 0;
    audio.volume = voiceVolume;
    audio.playbackRate = voiceRate;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          currentNumberAudio = audio;
        })
        .catch(() => {
          // File not found -> Fallback to Malay speech synthesis
          fallbackNumberTTS(word);
        });
    }
  } catch (err) {
    fallbackNumberTTS(word);
  }
}

function fallbackNumberTTS(word) {
  if (!soundEnabled || !voiceEnabled) return;
  speakMalayText(word);
}

export function speakLetterAndWord(letter) {
  // Only speak the letter itself as requested!
  speakLetter(letter);
}

// Sound effects: Pop
export function playPopSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {
    console.error(e);
  }
}

// Sound effects: Oops
export function playOopsSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(260, now);
    gain1.gain.setValueAtTime(0.18, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.12);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(195, now + 0.12);
    gain2.gain.setValueAtTime(0.18, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.28);
  } catch (e) {
    console.error(e);
  }
}

// Magic chime sound for revealing a letter
export function playRevealSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.35);
    });
  } catch (e) {
    console.error(e);
  }
}

// Victory fanfare
export function playVictorySound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [
      { f: 523.25, d: 0.12 },
      { f: 659.25, d: 0.12 },
      { f: 783.99, d: 0.12 },
      { f: 1046.50, d: 0.35 },
      { f: 880.00, d: 0.15 },
      { f: 1046.50, d: 0.5 },
    ];

    let current = ctx.currentTime;
    notes.forEach(({ f, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, current);

      gain.gain.setValueAtTime(0.25, current);
      gain.gain.exponentialRampToValueAtTime(0.01, current + d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(current);
      osc.stop(current + d);

      current += d * 0.85;
    });
  } catch (e) {
    console.error(e);
  }
}

// Whoosh sound
export function playWhooshSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  } catch (e) {
    console.error(e);
  }
}

export function speakOops() {
  playOopsSound();
}

// Speak any custom Malay word or text phrase using SpeechSynthesis
export function speakMalayText(text) {
  if (!soundEnabled || !voiceEnabled || typeof window === 'undefined') return;
  if (!('speechSynthesis' in window)) return;

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = selectedGender === 'male' ? 0.85 : 1.15;
    utterance.rate = voiceRate; // Slower, comfortable child pace
    utterance.volume = voiceVolume;
    utterance.lang = 'ms-MY';
    const voice = getBestMalayVoice();
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.error('TTS speech error:', e);
  }
}

// Synthesized Interactive Sounds for Objects
export function playCatMeow() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.18);
    osc.frequency.exponentialRampToValueAtTime(380, now + 0.45);
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  } catch (e) {
    console.error(e);
  }
}

export function playCarHonk() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [0, 0.12].forEach((offset) => {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = 'triangle';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(380, now + offset);
      osc2.frequency.setValueAtTime(460, now + offset);
      gain.gain.setValueAtTime(0.16, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.09);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start(now + offset);
      osc2.start(now + offset);
      osc1.stop(now + offset + 0.09);
      osc2.stop(now + offset + 0.09);
    });
  } catch (e) {
    console.error(e);
  }
}

export function playBirdChirp() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [0, 0.09, 0.18].forEach((offset, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const baseFreq = 1800 + idx * 200;
      osc.frequency.setValueAtTime(baseFreq, now + offset);
      osc.frequency.exponentialRampToValueAtTime(baseFreq + 600, now + offset + 0.04);
      osc.frequency.exponentialRampToValueAtTime(baseFreq, now + offset + 0.07);
      gain.gain.setValueAtTime(0.12, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.07);
    });
  } catch (e) {
    console.error(e);
  }
}

export function playDuckQuack() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.15);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  } catch (e) {
    console.error(e);
  }
}

export function playMatchSuccessSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0.18, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.22);
    });
  } catch (e) {
    console.error(e);
  }
}

