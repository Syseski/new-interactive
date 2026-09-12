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
  Shapes,
  HelpCircle,
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

// --- RICH SHAPE SVG COMPONENT WITH GLOSS & KAWAII FACES ---
export function ShapeRenderer({ type, color, size = 'md', hasFace = true, className = '' }) {
  const sizeMap = {
    sm: 'w-10 h-10 sm:w-12 sm:h-12',
    md: 'w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20',
    lg: 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28',
    xl: 'w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36',
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const colorPalettes = {
    red: { fill: '#EF4444', stroke: '#B91C1C', gloss: '#FCA5A5', dark: '#991B1B' },
    blue: { fill: '#38BDF8', stroke: '#0284C7', gloss: '#BAE6FD', dark: '#0369A1' },
    green: { fill: '#22C55E', stroke: '#15803D', gloss: '#BBF7D0', dark: '#166534' },
    yellow: { fill: '#FACC15', stroke: '#CA8A04', gloss: '#FEF08A', dark: '#854D0E' },
    purple: { fill: '#A855F7', stroke: '#7E22CE', gloss: '#E9D5FF', dark: '#581C87' },
    pink: { fill: '#F43F5E', stroke: '#BE123C', gloss: '#FECDD3', dark: '#881337' },
    orange: { fill: '#FB923C', stroke: '#EA580C', gloss: '#FFEDD5', dark: '#9A3412' },
    teal: { fill: '#14B8A6', stroke: '#0F766E', gloss: '#CCFBF1', dark: '#115E59' },
  };

  const palette = colorPalettes[color] || colorPalettes.blue;

  // Render kawaii eyes and smile
  const renderFace = (cx, cy) => {
    if (!hasFace) return null;
    return (
      <g transform={`translate(${cx - 20}, ${cy - 12})`}>
        {/* Left eye */}
        <ellipse cx="12" cy="10" rx="3.2" ry="4" fill="#1E293B" />
        <circle cx="11" cy="8.5" r="1.2" fill="#FFFFFF" />
        {/* Right eye */}
        <ellipse cx="28" cy="10" rx="3.2" ry="4" fill="#1E293B" />
        <circle cx="27" cy="8.5" r="1.2" fill="#FFFFFF" />
        {/* Blushes */}
        <ellipse cx="7" cy="14" rx="2.5" ry="1.5" fill="#FDA4AF" opacity="0.8" />
        <ellipse cx="33" cy="14" rx="2.5" ry="1.5" fill="#FDA4AF" opacity="0.8" />
        {/* Smile */}
        <path d="M16 14 Q20 18 24 14" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    );
  };

  switch (type) {
    case 'bulatan': // Circle
      return (
        <svg viewBox="0 0 100 100" className={`${currentSize} ${className} filter drop-shadow-md`} fill="none">
          <circle cx="50" cy="50" r="44" fill={palette.fill} stroke={palette.stroke} strokeWidth="5" />
          <ellipse cx="36" cy="30" rx="14" ry="7" fill={palette.gloss} transform="rotate(-30 36 30)" opacity="0.75" />
          {renderFace(50, 52)}
        </svg>
      );

    case 'segitiga': // Triangle
      return (
        <svg viewBox="0 0 100 100" className={`${currentSize} ${className} filter drop-shadow-md`} fill="none">
          <polygon
            points="50,12 90,84 10,84"
            fill={palette.fill}
            stroke={palette.stroke}
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path d="M50 20 L24 76" stroke={palette.gloss} strokeWidth="3" strokeLinecap="round" opacity="0.75" />
          {renderFace(50, 60)}
        </svg>
      );

    case 'segiempat_sama': // Square
      return (
        <svg viewBox="0 0 100 100" className={`${currentSize} ${className} filter drop-shadow-md`} fill="none">
          <rect
            x="12"
            y="12"
            width="76"
            height="76"
            rx="14"
            fill={palette.fill}
            stroke={palette.stroke}
            strokeWidth="5"
          />
          <rect x="18" y="18" width="64" height="20" rx="6" fill={palette.gloss} opacity="0.5" />
          {renderFace(50, 52)}
        </svg>
      );

    case 'segiempat_tepat': // Rectangle
      return (
        <svg viewBox="0 0 120 80" className={`${currentSize} ${className} filter drop-shadow-md`} fill="none">
          <rect
            x="8"
            y="10"
            width="104"
            height="60"
            rx="12"
            fill={palette.fill}
            stroke={palette.stroke}
            strokeWidth="5"
          />
          <rect x="14" y="15" width="92" height="16" rx="5" fill={palette.gloss} opacity="0.5" />
          {renderFace(60, 42)}
        </svg>
      );

    case 'bintang': // Star
      return (
        <svg viewBox="0 0 100 100" className={`${currentSize} ${className} filter drop-shadow-md`} fill="none">
          <polygon
            points="50,8 62,36 94,36 68,56 78,88 50,70 22,88 32,56 6,36 38,36"
            fill={palette.fill}
            stroke={palette.stroke}
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="50" r="12" fill={palette.gloss} opacity="0.35" />
          {renderFace(50, 52)}
        </svg>
      );

    case 'hati': // Heart
      return (
        <svg viewBox="0 0 100 100" className={`${currentSize} ${className} filter drop-shadow-md`} fill="none">
          <path
            d="M50 86 C20 60 10 40 10 26 C10 14 20 8 32 8 C40 8 47 13 50 18 C53 13 60 8 68 8 C80 8 90 14 90 26 C90 40 80 60 50 86 Z"
            fill={palette.fill}
            stroke={palette.stroke}
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <ellipse cx="28" cy="22" rx="7" ry="4" fill={palette.gloss} transform="rotate(-30 28 22)" opacity="0.75" />
          {renderFace(50, 45)}
        </svg>
      );

    case 'bujur': // Oval
      return (
        <svg viewBox="0 0 100 100" className={`${currentSize} ${className} filter drop-shadow-md`} fill="none">
          <ellipse cx="50" cy="50" rx="44" ry="32" fill={palette.fill} stroke={palette.stroke} strokeWidth="5" />
          <ellipse cx="36" cy="34" rx="14" ry="6" fill={palette.gloss} transform="rotate(-20 36 34)" opacity="0.75" />
          {renderFace(50, 52)}
        </svg>
      );

    case 'berlian': // Diamond / Rhombus
      return (
        <svg viewBox="0 0 100 100" className={`${currentSize} ${className} filter drop-shadow-md`} fill="none">
          <polygon
            points="50,10 88,50 50,90 12,50"
            fill={palette.fill}
            stroke={palette.stroke}
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path d="M50 18 L24 50" stroke={palette.gloss} strokeWidth="3" strokeLinecap="round" opacity="0.75" />
          {renderFace(50, 52)}
        </svg>
      );

    default:
      return (
        <div className={`${currentSize} rounded-2xl bg-amber-400 flex items-center justify-center font-bold text-white shadow`}>
          ?
        </div>
      );
  }
}

// REAL WORLD OBJECT EMOJI & ICONS FOR SHAPE CONTEXT
export const REAL_OBJECTS = {
  jam: { name: 'Jam Dinding', emoji: '🕒', shape: 'bulatan', shapeName: 'Bulatan' },
  pizza: { name: 'Potongan Pizza', emoji: '🍕', shape: 'segitiga', shapeName: 'Segi Tiga' },
  tingkap: { name: 'Tingkap Rumah', emoji: '🪟', shape: 'segiempat_sama', shapeName: 'Segi Empat Sama' },
  pintu: { name: 'Pintu Bilik', emoji: '🚪', shape: 'segiempat_tepat', shapeName: 'Segi Empat Tepat' },
  telur: { name: 'Telur Ayam', emoji: '🥚', shape: 'bujur', shapeName: 'Bujur' },
  layang: { name: 'Layang-layang', emoji: '🪁', shape: 'berlian', shapeName: 'Berlian' },
  biskut: { name: 'Biskut Coklat', emoji: '🍪', shape: 'bulatan', shapeName: 'Bulatan' },
  hadiah: { name: 'Kotak Hadiah', emoji: '🎁', shape: 'segiempat_sama', shapeName: 'Segi Empat Sama' },
  surat: { name: 'Sampul Surat', emoji: '✉️', shape: 'segiempat_tepat', shapeName: 'Segi Empat Tepat' },
  bintang_laut: { name: 'Bintang Laut', emoji: '⭐', shape: 'bintang', shapeName: 'Bintang' },
};

// SHAPES DATA SETS
export const SHAPES_SETS = [
  {
    id: 'set1',
    title: 'Set 1: Kenal Bentuk & Objek',
    subtitle: 'Bentuk Asas 2D',
    instruction: 'Kenal pasti bentuk geometri dan padankan dengan objek harian!',
    questions: [
      {
        id: 'q1',
        mode: 'identify',
        questionText: 'Manakah bentuk "Segi Tiga"?',
        spokenText: 'Manakah bentuk Segi Tiga?',
        answer: 'segitiga',
        answerName: 'Segi Tiga',
        answerColor: 'red',
        options: [
          { shape: 'bulatan', name: 'Bulatan', color: 'blue' },
          { shape: 'segitiga', name: 'Segi Tiga', color: 'red' },
          { shape: 'segiempat_sama', name: 'Segi Empat Sama', color: 'green' },
          { shape: 'bintang', name: 'Bintang', color: 'yellow' },
        ],
      },
      {
        id: 'q2',
        mode: 'identify',
        questionText: 'Manakah bentuk "Bulatan"?',
        spokenText: 'Manakah bentuk Bulatan?',
        answer: 'bulatan',
        answerName: 'Bulatan',
        answerColor: 'blue',
        options: [
          { shape: 'segiempat_sama', name: 'Segi Empat Sama', color: 'purple' },
          { shape: 'bulatan', name: 'Bulatan', color: 'blue' },
          { shape: 'berlian', name: 'Berlian', color: 'orange' },
          { shape: 'segitiga', name: 'Segi Tiga', color: 'pink' },
        ],
      },
      {
        id: 'q3',
        mode: 'object_match',
        object: REAL_OBJECTS.pizza,
        questionText: 'Potongan Pizza 🍕 ini menyerupai bentuk apa?',
        spokenText: 'Potongan Pizza ini menyerupai bentuk apa?',
        answer: 'segitiga',
        answerName: 'Segi Tiga',
        answerColor: 'orange',
        options: [
          { shape: 'bulatan', name: 'Bulatan', color: 'blue' },
          { shape: 'segiempat_tepat', name: 'Segi Empat Tepat', color: 'yellow' },
          { shape: 'segitiga', name: 'Segi Tiga', color: 'orange' },
          { shape: 'hati', name: 'Hati', color: 'pink' },
        ],
      },
      {
        id: 'q4',
        mode: 'object_match',
        object: REAL_OBJECTS.tingkap,
        questionText: 'Tingkap 🪟 mempunyai 4 sisi sama panjang. Apakah bentuknya?',
        spokenText: 'Tingkap mempunyai empat sisi sama panjang. Apakah bentuknya?',
        answer: 'segiempat_sama',
        answerName: 'Segi Empat Sama',
        answerColor: 'green',
        options: [
          { shape: 'segiempat_sama', name: 'Segi Empat Sama', color: 'green' },
          { shape: 'bulatan', name: 'Bulatan', color: 'red' },
          { shape: 'bujur', name: 'Bujur', color: 'purple' },
          { shape: 'bintang', name: 'Bintang', color: 'yellow' },
        ],
      },
      {
        id: 'q5',
        mode: 'object_match',
        object: REAL_OBJECTS.pintu,
        questionText: 'Pintu bilik 🚪 ini menyerupai bentuk apa?',
        spokenText: 'Pintu bilik ini menyerupai bentuk apa?',
        answer: 'segiempat_tepat',
        answerName: 'Segi Empat Tepat',
        answerColor: 'yellow',
        options: [
          { shape: 'bulatan', name: 'Bulatan', color: 'blue' },
          { shape: 'segiempat_tepat', name: 'Segi Empat Tepat', color: 'yellow' },
          { shape: 'berlian', name: 'Berlian', color: 'teal' },
          { shape: 'hati', name: 'Hati', color: 'pink' },
        ],
      },
      {
        id: 'q6',
        mode: 'identify',
        questionText: 'Manakah bentuk "Bintang"?',
        spokenText: 'Manakah bentuk Bintang?',
        answer: 'bintang',
        answerName: 'Bintang',
        answerColor: 'yellow',
        options: [
          { shape: 'bintang', name: 'Bintang', color: 'yellow' },
          { shape: 'hati', name: 'Hati', color: 'pink' },
          { shape: 'bujur', name: 'Bujur', color: 'purple' },
          { shape: 'bulatan', name: 'Bulatan', color: 'red' },
        ],
      },
    ],
  },
  {
    id: 'set2',
    title: 'Set 2: Lengkapkan Pola Bentuk',
    subtitle: 'Pola Urutan AB & AAB',
    instruction: 'Perhatikan corak urutan dan cari bentuk seterusnya yang hilang!',
    questions: [
      {
        id: 'q1',
        mode: 'pattern',
        patternType: 'AB',
        questionText: 'Lengkapkan pola bentuk ini:',
        spokenText: 'Bulatan, Segi Tiga, Bulatan, Segi Tiga, Bulatan... Apakah bentuk seterusnya?',
        pattern: [
          { shape: 'bulatan', color: 'red', name: 'Bulatan' },
          { shape: 'segitiga', color: 'blue', name: 'Segi Tiga' },
          { shape: 'bulatan', color: 'red', name: 'Bulatan' },
          { shape: 'segitiga', color: 'blue', name: 'Segi Tiga' },
          { shape: 'bulatan', color: 'red', name: 'Bulatan' },
        ],
        answer: 'segitiga',
        answerName: 'Segi Tiga',
        answerColor: 'blue',
        options: [
          { shape: 'segitiga', name: 'Segi Tiga', color: 'blue' },
          { shape: 'bulatan', name: 'Bulatan', color: 'red' },
          { shape: 'segiempat_sama', name: 'Segi Empat Sama', color: 'green' },
          { shape: 'bintang', name: 'Bintang', color: 'yellow' },
        ],
      },
      {
        id: 'q2',
        mode: 'pattern',
        patternType: 'AB',
        questionText: 'Lengkapkan pola bentuk ini:',
        spokenText: 'Segi Empat Sama, Bintang, Segi Empat Sama, Bintang... Apakah bentuk seterusnya?',
        pattern: [
          { shape: 'segiempat_sama', color: 'green', name: 'Segi Empat Sama' },
          { shape: 'bintang', color: 'yellow', name: 'Bintang' },
          { shape: 'segiempat_sama', color: 'green', name: 'Segi Empat Sama' },
          { shape: 'bintang', color: 'yellow', name: 'Bintang' },
          { shape: 'segiempat_sama', color: 'green', name: 'Segi Empat Sama' },
        ],
        answer: 'bintang',
        answerName: 'Bintang',
        answerColor: 'yellow',
        options: [
          { shape: 'bulatan', name: 'Bulatan', color: 'blue' },
          { shape: 'bintang', name: 'Bintang', color: 'yellow' },
          { shape: 'segiempat_sama', name: 'Segi Empat Sama', color: 'green' },
          { shape: 'hati', name: 'Hati', color: 'pink' },
        ],
      },
      {
        id: 'q3',
        mode: 'pattern',
        patternType: 'AAB',
        questionText: 'Lengkapkan pola bentuk ini:',
        spokenText: 'Hati, Hati, Bulatan, Hati, Hati... Apakah bentuk seterusnya?',
        pattern: [
          { shape: 'hati', color: 'pink', name: 'Hati' },
          { shape: 'hati', color: 'pink', name: 'Hati' },
          { shape: 'bulatan', color: 'purple', name: 'Bulatan' },
          { shape: 'hati', color: 'pink', name: 'Hati' },
          { shape: 'hati', color: 'pink', name: 'Hati' },
        ],
        answer: 'bulatan',
        answerName: 'Bulatan',
        answerColor: 'purple',
        options: [
          { shape: 'bulatan', name: 'Bulatan', color: 'purple' },
          { shape: 'hati', name: 'Hati', color: 'pink' },
          { shape: 'segitiga', name: 'Segi Tiga', color: 'orange' },
          { shape: 'berlian', name: 'Berlian', color: 'teal' },
        ],
      },
      {
        id: 'q4',
        mode: 'pattern',
        patternType: 'AB',
        questionText: 'Lengkapkan pola bentuk ini:',
        spokenText: 'Berlian, Segi Empat Tepat, Berlian, Segi Empat Tepat... Apakah bentuk seterusnya?',
        pattern: [
          { shape: 'berlian', color: 'teal', name: 'Berlian' },
          { shape: 'segiempat_tepat', color: 'orange', name: 'Segi Empat Tepat' },
          { shape: 'berlian', color: 'teal', name: 'Berlian' },
          { shape: 'segiempat_tepat', color: 'orange', name: 'Segi Empat Tepat' },
        ],
        answer: 'berlian',
        answerName: 'Berlian',
        answerColor: 'teal',
        options: [
          { shape: 'segiempat_tepat', name: 'Segi Empat Tepat', color: 'orange' },
          { shape: 'berlian', name: 'Berlian', color: 'teal' },
          { shape: 'bintang', name: 'Bintang', color: 'yellow' },
          { shape: 'bujur', name: 'Bujur', color: 'purple' },
        ],
      },
      {
        id: 'q5',
        mode: 'pattern',
        patternType: 'ABB',
        questionText: 'Lengkapkan pola bentuk ini:',
        spokenText: 'Bujur, Bintang, Bintang, Bujur, Bintang... Apakah bentuk seterusnya?',
        pattern: [
          { shape: 'bujur', color: 'purple', name: 'Bujur' },
          { shape: 'bintang', color: 'yellow', name: 'Bintang' },
          { shape: 'bintang', color: 'yellow', name: 'Bintang' },
          { shape: 'bujur', color: 'purple', name: 'Bujur' },
          { shape: 'bintang', color: 'yellow', name: 'Bintang' },
        ],
        answer: 'bintang',
        answerName: 'Bintang',
        answerColor: 'yellow',
        options: [
          { shape: 'bujur', name: 'Bujur', color: 'purple' },
          { shape: 'bintang', name: 'Bintang', color: 'yellow' },
          { shape: 'segitiga', name: 'Segi Tiga', color: 'red' },
          { shape: 'bulatan', name: 'Bulatan', color: 'blue' },
        ],
      },
      {
        id: 'q6',
        mode: 'pattern',
        patternType: 'ABC',
        questionText: 'Lengkapkan pola 3 bentuk ini:',
        spokenText: 'Bulatan, Segi Tiga, Segi Empat Sama, Bulatan, Segi Tiga... Apakah bentuk seterusnya?',
        pattern: [
          { shape: 'bulatan', color: 'red', name: 'Bulatan' },
          { shape: 'segitiga', color: 'blue', name: 'Segi Tiga' },
          { shape: 'segiempat_sama', color: 'green', name: 'Segi Empat Sama' },
          { shape: 'bulatan', color: 'red', name: 'Bulatan' },
          { shape: 'segitiga', color: 'blue', name: 'Segi Tiga' },
        ],
        answer: 'segiempat_sama',
        answerName: 'Segi Empat Sama',
        answerColor: 'green',
        options: [
          { shape: 'segiempat_sama', name: 'Segi Empat Sama', color: 'green' },
          { shape: 'bulatan', name: 'Bulatan', color: 'red' },
          { shape: 'segitiga', name: 'Segi Tiga', color: 'blue' },
          { shape: 'hati', name: 'Hati', color: 'pink' },
        ],
      },
    ],
  },
  {
    id: 'set3',
    title: 'Set 3: Cabaran Pola & Sifat Bentuk',
    subtitle: 'Pola Objek & Geometri Pintar',
    instruction: 'Selesaikan cabaran pola lanjutan dan teka sifat bentuk!',
    questions: [
      {
        id: 'q1',
        mode: 'property',
        questionText: 'Bentuk ini tiada bucu dan berbentuk bulat melengkung sepenuhnya. Apakah ia?',
        spokenText: 'Bentuk ini tiada bucu dan bulat melengkung sepenuhnya. Apakah ia?',
        answer: 'bulatan',
        answerName: 'Bulatan',
        answerColor: 'blue',
        options: [
          { shape: 'segitiga', name: 'Segi Tiga', color: 'red' },
          { shape: 'bulatan', name: 'Bulatan', color: 'blue' },
          { shape: 'segiempat_sama', name: 'Segi Empat Sama', color: 'green' },
          { shape: 'berlian', name: 'Berlian', color: 'orange' },
        ],
      },
      {
        id: 'q2',
        mode: 'property',
        questionText: 'Bentuk ini mempunyai tepat 3 bucu tajam dan 3 sisi lurus. Apakah ia?',
        spokenText: 'Bentuk ini mempunyai tiga bucu tajam dan tiga sisi lurus. Apakah ia?',
        answer: 'segitiga',
        answerName: 'Segi Tiga',
        answerColor: 'red',
        options: [
          { shape: 'segiempat_sama', name: 'Segi Empat Sama', color: 'green' },
          { shape: 'bintang', name: 'Bintang', color: 'yellow' },
          { shape: 'segitiga', name: 'Segi Tiga', color: 'red' },
          { shape: 'bujur', name: 'Bujur', color: 'purple' },
        ],
      },
      {
        id: 'q3',
        mode: 'pattern',
        patternType: 'ABC',
        questionText: 'Lengkapkan pola pelangi bentuk:',
        spokenText: 'Bintang, Hati, Berlian, Bintang, Hati... Apakah bentuk seterusnya?',
        pattern: [
          { shape: 'bintang', color: 'yellow', name: 'Bintang' },
          { shape: 'hati', color: 'pink', name: 'Hati' },
          { shape: 'berlian', color: 'teal', name: 'Berlian' },
          { shape: 'bintang', color: 'yellow', name: 'Bintang' },
          { shape: 'hati', color: 'pink', name: 'Hati' },
        ],
        answer: 'berlian',
        answerName: 'Berlian',
        answerColor: 'teal',
        options: [
          { shape: 'bintang', name: 'Bintang', color: 'yellow' },
          { shape: 'berlian', name: 'Berlian', color: 'teal' },
          { shape: 'hati', name: 'Hati', color: 'pink' },
          { shape: 'bulatan', name: 'Bulatan', color: 'blue' },
        ],
      },
      {
        id: 'q4',
        mode: 'property',
        questionText: 'Bentuk ini menyerupai sebiji telur ayam 🥚. Apakah ia?',
        spokenText: 'Bentuk ini menyerupai sebiji telur ayam. Apakah ia?',
        answer: 'bujur',
        answerName: 'Bujur',
        answerColor: 'purple',
        options: [
          { shape: 'bulatan', name: 'Bulatan', color: 'blue' },
          { shape: 'bujur', name: 'Bujur', color: 'purple' },
          { shape: 'segiempat_tepat', name: 'Segi Empat Tepat', color: 'yellow' },
          { shape: 'hati', name: 'Hati', color: 'pink' },
        ],
      },
      {
        id: 'q5',
        mode: 'pattern',
        patternType: 'AABB',
        questionText: 'Lengkapkan pola bentuk berganda:',
        spokenText: 'Segi Tiga, Segi Tiga, Segi Empat Sama, Segi Empat Sama, Segi Tiga... Apakah bentuk seterusnya?',
        pattern: [
          { shape: 'segitiga', color: 'red', name: 'Segi Tiga' },
          { shape: 'segitiga', color: 'red', name: 'Segi Tiga' },
          { shape: 'segiempat_sama', color: 'green', name: 'Segi Empat Sama' },
          { shape: 'segiempat_sama', color: 'green', name: 'Segi Empat Sama' },
          { shape: 'segitiga', color: 'red', name: 'Segi Tiga' },
        ],
        answer: 'segitiga',
        answerName: 'Segi Tiga',
        answerColor: 'red',
        options: [
          { shape: 'segitiga', name: 'Segi Tiga', color: 'red' },
          { shape: 'segiempat_sama', name: 'Segi Empat Sama', color: 'green' },
          { shape: 'bulatan', name: 'Bulatan', color: 'blue' },
          { shape: 'bintang', name: 'Bintang', color: 'yellow' },
        ],
      },
      {
        id: 'q6',
        mode: 'property',
        questionText: 'Bentuk ini menyerupai layang-layang terbang 🪁 di udara. Apakah ia?',
        spokenText: 'Bentuk ini menyerupai layang-layang terbang di udara. Apakah ia?',
        answer: 'berlian',
        answerName: 'Berlian',
        answerColor: 'orange',
        options: [
          { shape: 'berlian', name: 'Berlian', color: 'orange' },
          { shape: 'segiempat_tepat', name: 'Segi Empat Tepat', color: 'yellow' },
          { shape: 'segitiga', name: 'Segi Tiga', color: 'red' },
          { shape: 'bintang', name: 'Bintang', color: 'teal' },
        ],
      },
    ],
  },
];

export default function NumeracyShapesGame({ orientation, onBackToMenu, onOpenSettings }) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const currentSet = SHAPES_SETS[currentSetIndex] || SHAPES_SETS[0];

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
  const [draggedShape, setDraggedShape] = useState(null);
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

  // Handle selecting / placing a shape
  const handleSelectOption = (opt) => {
    if (feedbackStatus === 'correct') return;
    playPopSound();

    setSelectedAnswer(opt);

    if (opt.shape === currentQ.answer) {
      // Correct!
      playMatchSuccessSound();
      setFeedbackStatus('correct');
      setWrongChoice(null);

      speakMalayText(`Tahniah! Jawapannya ialah ${currentQ.answerName}!`);

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
            colors: ['#EF4444', '#38BDF8', '#22C55E', '#FACC15', '#A855F7', '#F43F5E'],
          });
        }, 800);
      }
    } else {
      // Wrong
      playOopsSound();
      setFeedbackStatus('wrong');
      setWrongChoice(opt.shape);
      speakMalayText(`Cuba lagi! Itu bukan ${currentQ.answerName}.`);

      setTimeout(() => {
        setWrongChoice(null);
        if (!savedAnswers[qKey]?.isCorrect) {
          setSelectedAnswer(null);
          setFeedbackStatus('idle');
        }
      }, 1000);
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (e, opt) => {
    if (feedbackStatus === 'correct') return;
    setDraggedShape(opt);
    e.dataTransfer.setData('text/plain', JSON.stringify(opt));
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
    if (draggedShape) {
      handleSelectOption(draggedShape);
      setDraggedShape(null);
    }
  };

  // Speak question
  const handleSpeakQuestion = () => {
    playWhooshSound();
    speakMalayText(currentQ.spokenText || currentQ.questionText);
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

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-sky-400 via-emerald-100 to-amber-100 font-['Nunito',sans-serif]">
      {/* Background Decorative Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <div className="absolute top-6 left-6 animate-float" style={{ animationDuration: '4s' }}>
          <ShapeRenderer type="bulatan" color="yellow" size="lg" hasFace={false} />
        </div>
        <div className="absolute top-12 right-10 animate-float" style={{ animationDuration: '5s' }}>
          <ShapeRenderer type="bintang" color="pink" size="lg" hasFace={false} />
        </div>
        <div className="absolute bottom-16 left-12 animate-float" style={{ animationDuration: '4.5s' }}>
          <ShapeRenderer type="segitiga" color="teal" size="lg" hasFace={false} />
        </div>
        <div className="absolute bottom-12 right-8 animate-float" style={{ animationDuration: '6s' }}>
          <ShapeRenderer type="hati" color="red" size="lg" hasFace={false} />
        </div>
      </div>

      {/* --- TOP HEADER & BAR --- */}
      <header className="relative z-20 w-full bg-slate-900/80 backdrop-blur-md px-3 py-2 sm:px-4 border-b border-emerald-400/40 text-white flex items-center justify-between shadow-md">
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
              <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-['Fredoka']">
                🔢 2. Bentuk & Pola
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-slate-300 hidden xs:inline">
              {currentSet.subtitle}
            </span>
          </div>
        </div>

        {/* Center: Set Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
          {SHAPES_SETS.map((s, idx) => {
            const isSetCompleted = s.questions.every((q) => completedQuestions[`${s.id}-${q.id}`]);
            return (
              <button
                key={s.id}
                onClick={() => handleSwitchSet(idx)}
                className={`px-2 sm:px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer font-['Fredoka'] ${
                  currentSetIndex === idx
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow'
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
          <div className="hidden sm:flex items-center gap-1 bg-emerald-950/80 border border-emerald-400/40 px-2.5 py-1 rounded-lg text-xs font-bold text-emerald-300">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {totalAnsweredInSet}/{currentSet.questions.length}
            </span>
          </div>
        </div>
      </header>

      {/* --- QUESTION PROGRESS BAR / PILLS --- */}
      <div className="relative z-10 w-full px-3 py-1.5 bg-emerald-500/15 backdrop-blur-xs flex items-center justify-between border-b border-emerald-300/30">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={handlePrevQuestion}
            disabled={questionIndex === 0}
            className="p-1 rounded-lg text-emerald-900 bg-white/70 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer shadow-sm"
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
                      ? 'bg-emerald-600 text-white scale-110 shadow-md ring-2 ring-emerald-300'
                      : qDone
                      ? 'bg-emerald-400 text-emerald-950 shadow-sm'
                      : 'bg-white/80 text-emerald-900 hover:bg-white'
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
            className="p-1 rounded-lg text-emerald-900 bg-white/70 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer shadow-sm"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* --- MAIN GAME ARENA --- */}
      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-2 sm:p-4 overflow-y-auto">
        {/* QUESTION CARD */}
        <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-xl border-3 border-emerald-300/80 flex flex-col items-center relative transition-all duration-300">
          {/* Audio Speaker & Question Header */}
          <div className="w-full flex items-center justify-between gap-2 mb-2 sm:mb-3 pb-2 border-b border-emerald-100">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSpeakQuestion}
                className="p-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95 shadow-md transition cursor-pointer flex items-center gap-1.5"
                title="Dengar Arahan Suara"
              >
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                <span className="text-xs font-bold font-['Fredoka'] hidden xs:inline">Dengar</span>
              </button>
              <h2 className="text-sm sm:text-base md:text-lg font-black text-slate-800 font-['Fredoka'] leading-tight">
                {currentQ.questionText}
              </h2>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-['Fredoka'] flex-shrink-0">
              Soalan {questionIndex + 1}/{currentSet.questions.length}
            </span>
          </div>

          {/* QUESTION CONTENT DISPLAY AREA */}
          <div className="w-full min-h-[140px] sm:min-h-[180px] bg-gradient-to-br from-emerald-50/80 to-teal-50/80 rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center border-2 border-dashed border-emerald-300 relative overflow-hidden">
            {/* 1. PATTERN MODE (AB, AAB, ABC pattern row with target slot) */}
            {currentQ.mode === 'pattern' && (
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 my-2">
                {currentQ.pattern.map((item, pIdx) => (
                  <div
                    key={pIdx}
                    onClick={() => {
                      playPopSound();
                      speakMalayText(item.name);
                    }}
                    className="flex flex-col items-center cursor-pointer transform hover:scale-110 active:scale-95 transition-transform"
                    title={`Bentuk: ${item.name}`}
                  >
                    <ShapeRenderer type={item.shape} color={item.color} size={orientation === 'portrait' ? 'sm' : 'md'} />
                    <span className="text-[10px] sm:text-xs font-bold text-slate-600 mt-1 font-['Fredoka']">
                      {item.name}
                    </span>
                  </div>
                ))}

                {/* TARGET PLACEHOLDER SLOT [ ? ] */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`
                    w-16 h-16 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-2xl flex flex-col items-center justify-center border-3 transition-all duration-300
                    ${
                      feedbackStatus === 'correct'
                        ? 'bg-emerald-100/90 border-emerald-500 shadow-lg scale-105'
                        : wrongChoice
                        ? 'bg-rose-100/90 border-rose-400 animate-shake'
                        : isDragOver
                        ? 'bg-amber-100/90 border-amber-400 border-dashed scale-105 shadow-md'
                        : 'bg-white/90 border-dashed border-emerald-400 shadow-inner'
                    }
                  `}
                >
                  {selectedAnswer ? (
                    <div className="flex flex-col items-center animate-pop">
                      <ShapeRenderer
                        type={selectedAnswer.shape}
                        color={selectedAnswer.color}
                        size={orientation === 'portrait' ? 'sm' : 'md'}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-emerald-400">
                      <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
                      <span className="text-[9px] sm:text-[10px] font-bold text-emerald-600 font-['Fredoka']">
                        Letak Sini
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. OBJECT MATCH MODE (Real-world object illustration + target slot) */}
            {currentQ.mode === 'object_match' && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 my-2">
                {/* Object display */}
                <div
                  onClick={() => {
                    playPopSound();
                    speakMalayText(currentQ.object.name);
                  }}
                  className="flex flex-col items-center p-3 rounded-2xl bg-white shadow-md border-2 border-amber-300 hover:scale-105 transition cursor-pointer"
                >
                  <span className="text-5xl sm:text-6xl md:text-7xl animate-float">
                    {currentQ.object.emoji}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-amber-900 mt-1 font-['Fredoka']">
                    {currentQ.object.name}
                  </span>
                </div>

                <span className="text-2xl sm:text-3xl font-black text-emerald-600">➔</span>

                {/* Target slot */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`
                    w-20 h-20 sm:w-28 sm:h-28 rounded-2xl flex flex-col items-center justify-center border-3 transition-all duration-300
                    ${
                      feedbackStatus === 'correct'
                        ? 'bg-emerald-100/90 border-emerald-500 shadow-lg scale-105'
                        : wrongChoice
                        ? 'bg-rose-100/90 border-rose-400 animate-shake'
                        : isDragOver
                        ? 'bg-amber-100/90 border-amber-400 border-dashed scale-105 shadow-md'
                        : 'bg-white/90 border-dashed border-emerald-400 shadow-inner'
                    }
                  `}
                >
                  {selectedAnswer ? (
                    <div className="flex flex-col items-center animate-pop">
                      <ShapeRenderer
                        type={selectedAnswer.shape}
                        color={selectedAnswer.color}
                        size={orientation === 'portrait' ? 'md' : 'lg'}
                      />
                      <span className="text-[10px] sm:text-xs font-bold text-slate-700 mt-1 font-['Fredoka']">
                        {selectedAnswer.name}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-emerald-400">
                      <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
                      <span className="text-[10px] font-bold text-emerald-600 font-['Fredoka']">
                        Pilih Bentuk
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. IDENTIFY & PROPERTY MODE */}
            {(currentQ.mode === 'identify' || currentQ.mode === 'property') && (
              <div className="flex flex-col items-center justify-center my-2 text-center">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`
                    w-20 h-20 sm:w-28 sm:h-28 rounded-2xl flex flex-col items-center justify-center border-3 transition-all duration-300
                    ${
                      feedbackStatus === 'correct'
                        ? 'bg-emerald-100/90 border-emerald-500 shadow-lg scale-105'
                        : wrongChoice
                        ? 'bg-rose-100/90 border-rose-400 animate-shake'
                        : isDragOver
                        ? 'bg-amber-100/90 border-amber-400 border-dashed scale-105 shadow-md'
                        : 'bg-white/90 border-dashed border-emerald-400 shadow-inner'
                    }
                  `}
                >
                  {selectedAnswer ? (
                    <div className="flex flex-col items-center animate-pop">
                      <ShapeRenderer
                        type={selectedAnswer.shape}
                        color={selectedAnswer.color}
                        size={orientation === 'portrait' ? 'md' : 'lg'}
                      />
                      <span className="text-[10px] sm:text-xs font-bold text-slate-700 mt-1 font-['Fredoka']">
                        {selectedAnswer.name}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-emerald-400">
                      <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
                      <span className="text-[10px] font-bold text-emerald-600 font-['Fredoka']">
                        Letak Jawapan
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Positive Success Banner */}
            {feedbackStatus === 'correct' && (
              <div className="mt-2 flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white rounded-full font-bold text-xs sm:text-sm font-['Fredoka'] shadow animate-bounce">
                <Sparkles className="w-4 h-4" />
                <span>Tahniah! Jawapan Tepat!</span>
              </div>
            )}
          </div>

          {/* ANSWER CHOICES BANK (TAP OR DRAG & DROP) */}
          <div className="w-full mt-3 sm:mt-4">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <span className="text-xs font-bold text-slate-600 font-['Fredoka']">
                Pilih atau Seret Bentuk Jawapan:
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                Boleh Tekan / Tarik (Drag)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedAnswer?.shape === opt.shape;
                const isCorrectOpt = isCurrentQuestionAnswered && opt.shape === currentQ.answer;
                const isWrongOpt = wrongChoice === opt.shape;

                return (
                  <button
                    key={oIdx}
                    draggable={feedbackStatus !== 'correct'}
                    onDragStart={(e) => handleDragStart(e, opt)}
                    onClick={() => handleSelectOption(opt)}
                    className={`
                      relative p-2.5 sm:p-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer select-none
                      border-3 active:scale-95
                      ${
                        isCorrectOpt
                          ? 'bg-emerald-100 border-emerald-500 shadow-md scale-102 ring-2 ring-emerald-300'
                          : isWrongOpt
                          ? 'bg-rose-100 border-rose-500 animate-shake shadow-md'
                          : isSelected
                          ? 'bg-sky-100 border-sky-400 shadow-sm'
                          : 'bg-white hover:bg-emerald-50/70 border-slate-200 hover:border-emerald-300 shadow-md hover:shadow-lg'
                      }
                    `}
                  >
                    <ShapeRenderer
                      type={opt.shape}
                      color={opt.color}
                      size={orientation === 'portrait' ? 'sm' : 'md'}
                    />
                    <span className="text-xs sm:text-sm font-black text-slate-800 mt-1 font-['Fredoka']">
                      {opt.name}
                    </span>
                    {isCorrectOpt && (
                      <span className="absolute top-1.5 right-1.5 bg-emerald-500 text-white rounded-full p-0.5">
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
      <footer className="relative z-10 w-full px-3 py-2 bg-white/80 backdrop-blur-md border-t border-emerald-200 flex items-center justify-between">
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
          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer font-['Fredoka'] shadow-sm"
        >
          <span>Seterusnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>

      {/* --- VICTORY CELEBRATION MODAL --- */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-emerald-50 via-teal-50 to-amber-50 rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-emerald-300 text-center flex flex-col items-center animate-scaleUp">
            {/* Golden Star Banner */}
            <div className="mb-2">
              <ThreeGoldenStarsCluster className="w-24 sm:w-28 object-contain" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-emerald-700 font-['Fredoka'] mb-1">
              Tahniah! Hebat Sekali! 🎉
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mb-4">
              Anda telah berjaya menyelesaikan semua soalan dalam <span className="font-bold text-emerald-800">{currentSet.title}</span>!
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
                <span>👁️ Lihat Jawapan</span>
              </button>

              {/* NEXT SET BUTTON (if available) */}
              {currentSetIndex < SHAPES_SETS.length - 1 && (
                <button
                  onClick={() => {
                    handleSwitchSet(currentSetIndex + 1);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base font-['Fredoka'] shadow-md transition cursor-pointer flex items-center justify-center gap-2 active:scale-98"
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
