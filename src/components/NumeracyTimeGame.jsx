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
  Clock,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  HelpCircle,
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

// --- VECTOR ANALOG CLOCK RENDERER ---
export function ClockRenderer({ hour, minute = 0, size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'w-24 h-24 sm:w-28 sm:h-28',
    md: 'w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48',
    lg: 'w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64',
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Calculate hand angles in degrees
  const minuteAngle = minute * 6; // 360 / 60 = 6 deg per minute
  const hourAngle = (hour % 12) * 30 + (minute / 60) * 30; // 360 / 12 = 30 deg per hour

  // 12 hour number coordinates around radius 33 on 100x100 viewBox
  const numbers = [
    { num: 12, x: 50, y: 19 },
    { num: 1, x: 67.5, y: 23.5 },
    { num: 2, x: 79.5, y: 35.5 },
    { num: 3, x: 84, y: 53.5 },
    { num: 4, x: 79.5, y: 71.5 },
    { num: 5, x: 67.5, y: 83.5 },
    { num: 6, x: 50, y: 87.5 },
    { num: 7, x: 32.5, y: 83.5 },
    { num: 8, x: 20.5, y: 71.5 },
    { num: 9, x: 16, y: 53.5 },
    { num: 10, x: 20.5, y: 35.5 },
    { num: 11, x: 32.5, y: 23.5 },
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${currentSize} ${className} filter drop-shadow-xl select-none transform hover:scale-105 transition-transform duration-200`}
      fill="none"
    >
      {/* Outer Case / Rim */}
      <circle cx="50" cy="50" r="48" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
      <circle cx="50" cy="50" r="44" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="40" fill="#FFFFFF" />

      {/* Gloss reflection */}
      <path
        d="M20 30 C30 16 70 16 80 30"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Hour numbers 1-12 */}
      {numbers.map(({ num, x, y }) => (
        <text
          key={num}
          x={x}
          y={y}
          textAnchor="middle"
          fill="#1E293B"
          fontSize={num === 12 || num === 3 || num === 6 || num === 9 ? '8.5' : '7.5'}
          fontWeight="900"
          fontFamily="'Fredoka', sans-serif"
        >
          {num}
        </text>
      ))}

      {/* Cute Kawaii Face in center */}
      <g transform="translate(50, 42)">
        <circle cx="-7" cy="0" r="1.8" fill="#475569" />
        <circle cx="7" cy="0" r="1.8" fill="#475569" />
        <ellipse cx="-11" cy="2" rx="1.8" ry="1.2" fill="#FDA4AF" />
        <ellipse cx="11" cy="2" rx="1.8" ry="1.2" fill="#FDA4AF" />
        <path d="M-3 2 Q0 5 3 2" stroke="#475569" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </g>

      {/* Hour Hand (Jarum Pendek Jam - Dark Blue / Indigo) */}
      <g transform={`rotate(${hourAngle} 50 50)`}>
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="28"
          stroke="#1E1B4B"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="29"
          stroke="#4F46E5"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* Minute Hand (Jarum Panjang Minit - Rose / Red) */}
      <g transform={`rotate(${minuteAngle} 50 50)`}>
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="17"
          stroke="#991B1B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="18"
          stroke="#EF4444"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>

      {/* Central Glowing Pin */}
      <circle cx="50" cy="50" r="4.5" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="2" fill="#FFFFFF" />
    </svg>
  );
}

// TIME GAME DATA SETS
export const TIME_SETS = [
  {
    id: 'set1',
    title: 'Set 1: Kenal Jam Tepat',
    subtitle: 'Waktu Pukul ... Tepat (:00)',
    instruction: 'Perhatikan jarum pendek dan jarum panjang pada muka jam untuk membaca waktu tepat!',
    questions: [
      {
        id: 'q1',
        hour: 3,
        minute: 0,
        digitalTime: '3:00',
        questionText: 'Muka jam ini menunjukkan pukul berapa?',
        spokenText: 'Jarum pendek di angka tiga dan jarum panjang di angka dua belas. Pukul berapakah ini?',
        answerId: 'opt_3',
        answerName: 'Pukul 3:00',
        answerSpeech: 'Pukul tiga tepat',
        options: [
          { id: 'opt_1', label: 'Pukul 1:00', digital: '1:00', speech: 'Pukul satu tepat' },
          { id: 'opt_3', label: 'Pukul 3:00', digital: '3:00', speech: 'Pukul tiga tepat' },
          { id: 'opt_5', label: 'Pukul 5:00', digital: '5:00', speech: 'Pukul lima tepat' },
          { id: 'opt_12', label: 'Pukul 12:00', digital: '12:00', speech: 'Pukul dua belas tepat' },
        ],
      },
      {
        id: 'q2',
        hour: 8,
        minute: 0,
        digitalTime: '8:00',
        questionText: 'Muka jam ini menunjukkan pukul berapa?',
        spokenText: 'Jarum pendek di angka lapan dan jarum panjang di angka dua belas. Pukul berapakah ini?',
        answerId: 'opt_8',
        answerName: 'Pukul 8:00',
        answerSpeech: 'Pukul lapan tepat',
        options: [
          { id: 'opt_7', label: 'Pukul 7:00', digital: '7:00', speech: 'Pukul tujuh tepat' },
          { id: 'opt_8', label: 'Pukul 8:00', digital: '8:00', speech: 'Pukul lapan tepat' },
          { id: 'opt_9', label: 'Pukul 9:00', digital: '9:00', speech: 'Pukul sembilan tepat' },
          { id: 'opt_6', label: 'Pukul 6:00', digital: '6:00', speech: 'Pukul enam tepat' },
        ],
      },
      {
        id: 'q3',
        hour: 1,
        minute: 0,
        digitalTime: '1:00',
        questionText: 'Muka jam ini menunjukkan pukul berapa?',
        spokenText: 'Jarum pendek di angka satu dan jarum panjang di angka dua belas. Pukul berapakah ini?',
        answerId: 'opt_1',
        answerName: 'Pukul 1:00',
        answerSpeech: 'Pukul satu tepat',
        options: [
          { id: 'opt_1', label: 'Pukul 1:00', digital: '1:00', speech: 'Pukul satu tepat' },
          { id: 'opt_2', label: 'Pukul 2:00', digital: '2:00', speech: 'Pukul dua tepat' },
          { id: 'opt_11', label: 'Pukul 11:00', digital: '11:00', speech: 'Pukul sebelas tepat' },
          { id: 'opt_4', label: 'Pukul 4:00', digital: '4:00', speech: 'Pukul empat tepat' },
        ],
      },
      {
        id: 'q4',
        hour: 6,
        minute: 0,
        digitalTime: '6:00',
        questionText: 'Muka jam ini menunjukkan pukul berapa?',
        spokenText: 'Jarum pendek di angka enam dan jarum panjang di angka dua belas. Pukul berapakah ini?',
        answerId: 'opt_6',
        answerName: 'Pukul 6:00',
        answerSpeech: 'Pukul enam tepat',
        options: [
          { id: 'opt_5', label: 'Pukul 5:00', digital: '5:00', speech: 'Pukul lima tepat' },
          { id: 'opt_6', label: 'Pukul 6:00', digital: '6:00', speech: 'Pukul enam tepat' },
          { id: 'opt_12', label: 'Pukul 12:00', digital: '12:00', speech: 'Pukul dua belas tepat' },
          { id: 'opt_7', label: 'Pukul 7:00', digital: '7:00', speech: 'Pukul tujuh tepat' },
        ],
      },
      {
        id: 'q5',
        hour: 10,
        minute: 0,
        digitalTime: '10:00',
        questionText: 'Muka jam ini menunjukkan pukul berapa?',
        spokenText: 'Jarum pendek di angka sepuluh dan jarum panjang di angka dua belas. Pukul berapakah ini?',
        answerId: 'opt_10',
        answerName: 'Pukul 10:00',
        answerSpeech: 'Pukul sepuluh tepat',
        options: [
          { id: 'opt_9', label: 'Pukul 9:00', digital: '9:00', speech: 'Pukul sembilan tepat' },
          { id: 'opt_10', label: 'Pukul 10:00', digital: '10:00', speech: 'Pukul sepuluh tepat' },
          { id: 'opt_11', label: 'Pukul 11:00', digital: '11:00', speech: 'Pukul sebelas tepat' },
          { id: 'opt_2', label: 'Pukul 2:00', digital: '2:00', speech: 'Pukul dua tepat' },
        ],
      },
      {
        id: 'q6',
        hour: 12,
        minute: 0,
        digitalTime: '12:00',
        questionText: 'Kedua-dua jarum menunjuk ke angka 12. Pukul berapakah ini?',
        spokenText: 'Kedua-dua jarum jam menunjuk ke angka dua belas. Pukul berapakah ini?',
        answerId: 'opt_12',
        answerName: 'Pukul 12:00',
        answerSpeech: 'Pukul dua belas tepat',
        options: [
          { id: 'opt_6', label: 'Pukul 6:00', digital: '6:00', speech: 'Pukul enam tepat' },
          { id: 'opt_12', label: 'Pukul 12:00', digital: '12:00', speech: 'Pukul dua belas tepat' },
          { id: 'opt_1', label: 'Pukul 1:00', digital: '1:00', speech: 'Pukul satu tepat' },
          { id: 'opt_11', label: 'Pukul 11:00', digital: '11:00', speech: 'Pukul sebelas tepat' },
        ],
      },
    ],
  },
  {
    id: 'set2',
    title: 'Set 2: Kenal Setengah Jam',
    subtitle: 'Waktu Pukul ... Setengah (:30)',
    instruction: 'Apabila jarum panjang di angka 6, ia menunjukkan waktu setengah jam (30 minit)!',
    questions: [
      {
        id: 'q1',
        hour: 2,
        minute: 30,
        digitalTime: '2:30',
        questionText: 'Jarum panjang di angka 6. Pukul berapakah ini?',
        spokenText: 'Jarum pendek melepasi angka dua dan jarum panjang di angka enam. Pukul berapakah ini?',
        answerId: 'opt_2_30',
        answerName: 'Pukul 2:30 (Dua Setengah)',
        answerSpeech: 'Pukul dua setengah',
        options: [
          { id: 'opt_2_00', label: 'Pukul 2:00', digital: '2:00', speech: 'Pukul dua tepat' },
          { id: 'opt_2_30', label: 'Pukul 2:30', digital: '2:30', speech: 'Pukul dua setengah' },
          { id: 'opt_3_30', label: 'Pukul 3:30', digital: '3:30', speech: 'Pukul tiga setengah' },
          { id: 'opt_1_30', label: 'Pukul 1:30', digital: '1:30', speech: 'Pukul satu setengah' },
        ],
      },
      {
        id: 'q2',
        hour: 7,
        minute: 30,
        digitalTime: '7:30',
        questionText: 'Jarum panjang di angka 6. Pukul berapakah ini?',
        spokenText: 'Jarum pendek melepasi angka tujuh dan jarum panjang di angka enam. Pukul berapakah ini?',
        answerId: 'opt_7_30',
        answerName: 'Pukul 7:30 (Tujuh Setengah)',
        answerSpeech: 'Pukul tujuh setengah',
        options: [
          { id: 'opt_6_30', label: 'Pukul 6:30', digital: '6:30', speech: 'Pukul enam setengah' },
          { id: 'opt_7_30', label: 'Pukul 7:30', digital: '7:30', speech: 'Pukul tujuh setengah' },
          { id: 'opt_8_30', label: 'Pukul 8:30', digital: '8:30', speech: 'Pukul lapan setengah' },
          { id: 'opt_7_00', label: 'Pukul 7:00', digital: '7:00', speech: 'Pukul tujuh tepat' },
        ],
      },
      {
        id: 'q3',
        hour: 4,
        minute: 30,
        digitalTime: '4:30',
        questionText: 'Jarum panjang di angka 6. Pukul berapakah ini?',
        spokenText: 'Jarum pendek melepasi angka empat dan jarum panjang di angka enam. Pukul berapakah ini?',
        answerId: 'opt_4_30',
        answerName: 'Pukul 4:30 (Empat Setengah)',
        answerSpeech: 'Pukul empat setengah',
        options: [
          { id: 'opt_4_30', label: 'Pukul 4:30', digital: '4:30', speech: 'Pukul empat setengah' },
          { id: 'opt_5_30', label: 'Pukul 5:30', digital: '5:30', speech: 'Pukul lima setengah' },
          { id: 'opt_4_00', label: 'Pukul 4:00', digital: '4:00', speech: 'Pukul empat tepat' },
          { id: 'opt_3_30', label: 'Pukul 3:30', digital: '3:30', speech: 'Pukul tiga setengah' },
        ],
      },
      {
        id: 'q4',
        hour: 9,
        minute: 30,
        digitalTime: '9:30',
        questionText: 'Jarum panjang di angka 6. Pukul berapakah ini?',
        spokenText: 'Jarum pendek melepasi angka sembilan dan jarum panjang di angka enam. Pukul berapakah ini?',
        answerId: 'opt_9_30',
        answerName: 'Pukul 9:30 (Sembilan Setengah)',
        answerSpeech: 'Pukul sembilan setengah',
        options: [
          { id: 'opt_8_30', label: 'Pukul 8:30', digital: '8:30', speech: 'Pukul lapan setengah' },
          { id: 'opt_9_30', label: 'Pukul 9:30', digital: '9:30', speech: 'Pukul sembilan setengah' },
          { id: 'opt_10_30', label: 'Pukul 10:30', digital: '10:30', speech: 'Pukul sepuluh setengah' },
          { id: 'opt_9_00', label: 'Pukul 9:00', digital: '9:00', speech: 'Pukul sembilan tepat' },
        ],
      },
      {
        id: 'q5',
        hour: 11,
        minute: 30,
        digitalTime: '11:30',
        questionText: 'Jarum panjang di angka 6. Pukul berapakah ini?',
        spokenText: 'Jarum pendek melepasi angka sebelas dan jarum panjang di angka enam. Pukul berapakah ini?',
        answerId: 'opt_11_30',
        answerName: 'Pukul 11:30 (Sebelas Setengah)',
        answerSpeech: 'Pukul sebelas setengah',
        options: [
          { id: 'opt_10_30', label: 'Pukul 10:30', digital: '10:30', speech: 'Pukul sepuluh setengah' },
          { id: 'opt_11_30', label: 'Pukul 11:30', digital: '11:30', speech: 'Pukul sebelas setengah' },
          { id: 'opt_12_30', label: 'Pukul 12:30', digital: '12:30', speech: 'Pukul dua belas setengah' },
          { id: 'opt_11_00', label: 'Pukul 11:00', digital: '11:00', speech: 'Pukul sebelas tepat' },
        ],
      },
      {
        id: 'q6',
        hour: 1,
        minute: 30,
        digitalTime: '1:30',
        questionText: 'Jarum panjang di angka 6. Pukul berapakah ini?',
        spokenText: 'Jarum pendek melepasi angka satu dan jarum panjang di angka enam. Pukul berapakah ini?',
        answerId: 'opt_1_30',
        answerName: 'Pukul 1:30 (Satu Setengah)',
        answerSpeech: 'Pukul satu setengah',
        options: [
          { id: 'opt_1_00', label: 'Pukul 1:00', digital: '1:00', speech: 'Pukul satu tepat' },
          { id: 'opt_1_30', label: 'Pukul 1:30', digital: '1:30', speech: 'Pukul satu setengah' },
          { id: 'opt_2_30', label: 'Pukul 2:30', digital: '2:30', speech: 'Pukul dua setengah' },
          { id: 'opt_12_30', label: 'Pukul 12:30', digital: '12:30', speech: 'Pukul dua belas setengah' },
        ],
      },
    ],
  },
  {
    id: 'set3',
    title: 'Set 3: Masa & Rutin Harian',
    subtitle: 'Waktu & Aktiviti Seharian',
    instruction: 'Padankan waktu jam dengan aktiviti harian yang biasa dilakukan!',
    questions: [
      {
        id: 'q1',
        hour: 7,
        minute: 0,
        digitalTime: '7:00 Pagi',
        activityIcon: '🥞',
        activityTitle: 'Bangun Tidur & Sarapan',
        period: 'Pagi ☀️',
        questionText: 'Ali bangun tidur dan bersarapan 🥞 pada waktu ini. Pukul berapakah ini?',
        spokenText: 'Ali bangun tidur dan bersarapan pada waktu pagi. Pukul berapakah ini?',
        answerId: 'opt_7_pagi',
        answerName: '7:00 Pagi',
        answerSpeech: 'Tujuh pagi',
        options: [
          { id: 'opt_7_pagi', label: '7:00 Pagi ☀️', speech: 'Tujuh pagi' },
          { id: 'opt_12_malam', label: '12:00 Malam 🌙', speech: 'Dua belas malam' },
          { id: 'opt_3_petang', label: '3:00 Petang ⛅', speech: 'Tiga petang' },
          { id: 'opt_10_malam', label: '10:00 Malam 🌙', speech: 'Sepuluh malam' },
        ],
      },
      {
        id: 'q2',
        hour: 8,
        minute: 0,
        digitalTime: '8:00 Pagi',
        activityIcon: '🏫',
        activityTitle: 'Belajar di Sekolah',
        period: 'Pagi ☀️',
        questionText: 'Murid masuk ke kelas untuk belajar 🎒 pada waktu ini. Pukul berapakah ini?',
        spokenText: 'Murid belajar di sekolah pada waktu pagi. Pukul berapakah ini?',
        answerId: 'opt_8_pagi',
        answerName: '8:00 Pagi',
        answerSpeech: 'Lapan pagi',
        options: [
          { id: 'opt_8_pagi', label: '8:00 Pagi ☀️', speech: 'Lapan pagi' },
          { id: 'opt_8_malam', label: '8:00 Malam 🌙', speech: 'Lapan malam' },
          { id: 'opt_1_tgh', label: '1:00 Tengah Hari 🌤️', speech: 'Satu tengah hari' },
          { id: 'opt_5_petang', label: '5:00 Petang ⛅', speech: 'Lima petang' },
        ],
      },
      {
        id: 'q3',
        hour: 1,
        minute: 0,
        digitalTime: '1:00 T.Hari',
        activityIcon: '🍛',
        activityTitle: 'Makan Tengah Hari',
        period: 'Tengah Hari 🌤️',
        questionText: 'Waktu makan tengah hari yang enak 🍛. Pukul berapakah ini?',
        spokenText: 'Waktu makan tengah hari yang enak. Pukul berapakah ini?',
        answerId: 'opt_1_tgh',
        answerName: '1:00 Tengah Hari',
        answerSpeech: 'Satu tengah hari',
        options: [
          { id: 'opt_7_pagi', label: '7:00 Pagi ☀️', speech: 'Tujuh pagi' },
          { id: 'opt_1_tgh', label: '1:00 Tengah Hari 🌤️', speech: 'Satu tengah hari' },
          { id: 'opt_9_malam', label: '9:00 Malam 🌙', speech: 'Sembilan malam' },
          { id: 'opt_6_pagi', label: '6:00 Pagi ☀️', speech: 'Enam pagi' },
        ],
      },
      {
        id: 'q4',
        hour: 5,
        minute: 0,
        digitalTime: '5:00 Petang',
        activityIcon: '⚽',
        activityTitle: 'Bermain Bola di Padang',
        period: 'Petang ⛅',
        questionText: 'Adam bermain bola di taman permainan 🛝 pada waktu ini. Pukul berapakah ini?',
        spokenText: 'Adam bermain bola di padang pada waktu petang. Pukul berapakah ini?',
        answerId: 'opt_5_petang',
        answerName: '5:00 Petang',
        answerSpeech: 'Lima petang',
        options: [
          { id: 'opt_10_pagi', label: '10:00 Pagi ☀️', speech: 'Sepuluh pagi' },
          { id: 'opt_5_petang', label: '5:00 Petang ⛅', speech: 'Lima petang' },
          { id: 'opt_11_malam', label: '11:00 Malam 🌙', speech: 'Sebelas malam' },
          { id: 'opt_2_tgh', label: '2:00 Tengah Hari 🌤️', speech: 'Dua tengah hari' },
        ],
      },
      {
        id: 'q5',
        hour: 8,
        minute: 0,
        digitalTime: '8:00 Malam',
        activityIcon: '📚',
        activityTitle: 'Ulang Kaji Pelajaran',
        period: 'Malam 🌙',
        questionText: 'Aina mengulang kaji pelajaran 📖 di rumah pada waktu ini. Pukul berapakah ini?',
        spokenText: 'Aina mengulang kaji pelajaran pada waktu malam. Pukul berapakah ini?',
        answerId: 'opt_8_malam',
        answerName: '8:00 Malam',
        answerSpeech: 'Lapan malam',
        options: [
          { id: 'opt_8_malam', label: '8:00 Malam 🌙', speech: 'Lapan malam' },
          { id: 'opt_8_pagi', label: '8:00 Pagi ☀️', speech: 'Lapan pagi' },
          { id: 'opt_12_tgh', label: '12:00 Tengah Hari 🌤️', speech: 'Dua belas tengah hari' },
          { id: 'opt_4_petang', label: '4:00 Petang ⛅', speech: 'Empat petang' },
        ],
      },
      {
        id: 'q6',
        hour: 9,
        minute: 30,
        digitalTime: '9:30 Malam',
        activityIcon: '🛌',
        activityTitle: 'Masuk Tidur Malam',
        period: 'Malam 🌙',
        questionText: 'Waktu tidur malam untuk rehat yang cukup 😴. Pukul berapakah ini?',
        spokenText: 'Waktu tidur malam untuk rehat yang cukup. Pukul berapakah ini?',
        answerId: 'opt_9_30_malam',
        answerName: '9:30 Malam',
        answerSpeech: 'Sembilan setengah malam',
        options: [
          { id: 'opt_7_pagi', label: '7:00 Pagi ☀️', speech: 'Tujuh pagi' },
          { id: 'opt_2_petang', label: '2:00 Petang ⛅', speech: 'Dua petang' },
          { id: 'opt_9_30_malam', label: '9:30 Malam 🌙', speech: 'Sembilan setengah malam' },
          { id: 'opt_12_tgh', label: '12:00 Tengah Hari 🌤️', speech: 'Dua belas tengah hari' },
        ],
      },
    ],
  },
];

export default function NumeracyTimeGame({ orientation, onBackToMenu, onOpenSettings }) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const currentSet = TIME_SETS[currentSetIndex] || TIME_SETS[0];

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
  const [draggedItem, setDraggedItem] = useState(null);
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

  // Handle selecting / placing a time option
  const handleSelectOption = (opt) => {
    if (feedbackStatus === 'correct') return;
    playPopSound();

    setSelectedAnswer(opt);

    const isCorrect = opt.id === currentQ.answerId;
    const spokenFeedback = isCorrect
      ? `Tahniah! Jawapannya ialah ${currentQ.answerSpeech || currentQ.answerName}!`
      : `Cuba lagi! Itu bukan ${currentQ.answerName}.`;

    if (isCorrect) {
      // Correct!
      playMatchSuccessSound();
      setFeedbackStatus('correct');
      setWrongChoice(null);

      speakMalayText(spokenFeedback);

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
            colors: ['#F59E0B', '#3B82F6', '#10B981', '#EC4899', '#8B5CF6'],
          });
        }, 800);
      }
    } else {
      // Wrong
      playOopsSound();
      setFeedbackStatus('wrong');
      setWrongChoice(opt.id);
      speakMalayText(spokenFeedback);

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
    setDraggedItem(opt);
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
    if (draggedItem) {
      handleSelectOption(draggedItem);
      setDraggedItem(null);
    }
  };

  // Speak question instruction
  const handleSpeakQuestion = () => {
    playWhooshSound();
    speakMalayText(currentQ.spokenText || currentQ.questionText);
  };

  // Speak Clock Time on Tap
  const handleTapClock = () => {
    playPopSound();
    speakMalayText(currentQ.answerSpeech || currentQ.answerName);
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
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-amber-400 via-orange-100 to-sky-100 font-['Nunito',sans-serif]">
      {/* Background Decorative Clocks & Sun/Moon */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-6 left-6 animate-float" style={{ animationDuration: '4s' }}>
          <Sun className="w-16 h-16 text-amber-500" />
        </div>
        <div className="absolute top-12 right-10 animate-float" style={{ animationDuration: '5s' }}>
          <Moon className="w-16 h-16 text-indigo-600" />
        </div>
        <div className="absolute bottom-16 left-12 animate-float" style={{ animationDuration: '4.5s' }}>
          <Clock className="w-16 h-16 text-orange-600" />
        </div>
      </div>

      {/* --- TOP HEADER & BAR --- */}
      <header className="relative z-20 w-full bg-slate-900/80 backdrop-blur-md px-3 py-2 sm:px-4 border-b border-amber-400/40 text-white flex items-center justify-between shadow-md">
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
              <span className="text-xs sm:text-sm font-extrabold text-amber-400 font-['Fredoka']">
                🔢 8. Masa & Waktu
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-slate-300 hidden xs:inline">
              {currentSet.subtitle}
            </span>
          </div>
        </div>

        {/* Center: Set Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
          {TIME_SETS.map((s, idx) => {
            const isSetCompleted = s.questions.every((q) => completedQuestions[`${s.id}-${q.id}`]);
            return (
              <button
                key={s.id}
                onClick={() => handleSwitchSet(idx)}
                className={`px-2 sm:px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer font-['Fredoka'] ${
                  currentSetIndex === idx
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow'
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
          <div className="hidden sm:flex items-center gap-1 bg-amber-950/80 border border-amber-400/40 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-300">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {totalAnsweredInSet}/{currentSet.questions.length}
            </span>
          </div>
        </div>
      </header>

      {/* --- QUESTION PROGRESS BAR / PILLS --- */}
      <div className="relative z-10 w-full px-3 py-1.5 bg-amber-500/15 backdrop-blur-xs flex items-center justify-between border-b border-amber-300/30">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={handlePrevQuestion}
            disabled={questionIndex === 0}
            className="p-1 rounded-lg text-amber-950 bg-white/70 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer shadow-sm"
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
                      ? 'bg-amber-600 text-white scale-110 shadow-md ring-2 ring-amber-300'
                      : qDone
                      ? 'bg-amber-400 text-amber-950 shadow-sm'
                      : 'bg-white/80 text-amber-950 hover:bg-white'
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
            className="p-1 rounded-lg text-amber-950 bg-white/70 hover:bg-white disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer shadow-sm"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* --- MAIN GAME ARENA --- */}
      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-2 sm:p-4 overflow-y-auto">
        {/* QUESTION CARD */}
        <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-xl border-3 border-amber-300/80 flex flex-col items-center relative transition-all duration-300">
          {/* Audio Speaker & Question Header */}
          <div className="w-full flex items-center justify-between gap-2 mb-2 sm:mb-3 pb-2 border-b border-amber-100">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSpeakQuestion}
                className="p-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600 active:scale-95 shadow-md transition cursor-pointer flex items-center gap-1.5"
                title="Dengar Arahan Suara"
              >
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                <span className="text-xs font-bold font-['Fredoka'] hidden xs:inline">Dengar</span>
              </button>
              <h2 className="text-sm sm:text-base md:text-lg font-black text-slate-800 font-['Fredoka'] leading-tight">
                {currentQ.questionText}
              </h2>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-['Fredoka'] flex-shrink-0">
              Soalan {questionIndex + 1}/{currentSet.questions.length}
            </span>
          </div>

          {/* QUESTION CONTENT DISPLAY AREA */}
          <div className="w-full min-h-[160px] sm:min-h-[200px] bg-gradient-to-br from-amber-50/80 via-orange-50/80 to-yellow-50/80 rounded-2xl p-3 sm:p-5 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 border-2 border-dashed border-amber-300 relative overflow-hidden">
            {/* Clock Illustration Card */}
            <div
              onClick={handleTapClock}
              className="flex flex-col items-center p-2 rounded-2xl bg-white shadow-md border-2 border-amber-300 hover:scale-105 transition cursor-pointer"
              title="Ketik untuk dengar waktu"
            >
              <ClockRenderer
                hour={currentQ.hour}
                minute={currentQ.minute}
                size={orientation === 'portrait' ? 'sm' : 'md'}
              />
              <span className="text-[10px] sm:text-xs font-black text-amber-800 mt-1 font-['Fredoka'] flex items-center gap-1">
                <span>🔊 Ketik Jam</span>
              </span>
            </div>

            {/* If Set 3: Show Activity Card */}
            {currentQ.activityIcon && (
              <div className="flex flex-col items-center p-2.5 rounded-2xl bg-white shadow-md border-2 border-amber-300 max-w-[150px] text-center">
                <span className="text-3xl sm:text-4xl animate-float">{currentQ.activityIcon}</span>
                <span className="text-xs font-black text-slate-800 mt-1 font-['Fredoka']">
                  {currentQ.activityTitle}
                </span>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mt-0.5">
                  {currentQ.period}
                </span>
              </div>
            )}

            <span className="text-2xl sm:text-3xl font-black text-amber-600">➔</span>

            {/* Target Answer Slot [ ? ] */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-28 rounded-2xl flex flex-col items-center justify-center border-3 transition-all duration-300
                ${
                  feedbackStatus === 'correct'
                    ? 'bg-emerald-100/90 border-emerald-500 shadow-lg scale-105'
                    : wrongChoice
                    ? 'bg-rose-100/90 border-rose-400 animate-shake'
                    : isDragOver
                    ? 'bg-amber-100/90 border-amber-400 border-dashed scale-105 shadow-md'
                    : 'bg-white/90 border-dashed border-amber-400 shadow-inner'
                }
              `}
            >
              {selectedAnswer ? (
                <div className="flex flex-col items-center animate-pop p-2 text-center">
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white font-black text-sm sm:text-base font-['Fredoka'] shadow">
                    {selectedAnswer.label}
                  </div>
                  {selectedAnswer.digital && (
                    <span className="text-xs font-bold text-slate-600 mt-1 font-['Fredoka']">
                      Digital: {selectedAnswer.digital}
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center text-amber-500">
                  <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
                  <span className="text-[10px] sm:text-xs font-bold text-amber-700 font-['Fredoka'] text-center">
                    Letak Waktu Sini
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Positive Success Banner */}
          {feedbackStatus === 'correct' && (
            <div className="mt-2 flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white rounded-full font-bold text-xs sm:text-sm font-['Fredoka'] shadow animate-bounce">
              <Sparkles className="w-4 h-4" />
              <span>Tahniah! Waktu yang Tepat!</span>
            </div>
          )}

          {/* ANSWER CHOICES BANK (TAP OR DRAG & DROP) */}
          <div className="w-full mt-3 sm:mt-4">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <span className="text-xs font-bold text-slate-600 font-['Fredoka']">
                Pilih atau Seret Kad Waktu:
              </span>
              <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full font-bold">
                Boleh Tekan / Tarik (Drag)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedAnswer?.id === opt.id;
                const isCorrectOpt = isCurrentQuestionAnswered && opt.id === currentQ.answerId;
                const isWrongOpt = wrongChoice === opt.id;

                return (
                  <button
                    key={oIdx}
                    draggable={feedbackStatus !== 'correct'}
                    onDragStart={(e) => handleDragStart(e, opt)}
                    onClick={() => handleSelectOption(opt)}
                    className={`
                      relative p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer select-none
                      border-3 active:scale-95
                      ${
                        isCorrectOpt
                          ? 'bg-emerald-100 border-emerald-500 shadow-md scale-102 ring-2 ring-emerald-300'
                          : isWrongOpt
                          ? 'bg-rose-100 border-rose-500 animate-shake shadow-md'
                          : isSelected
                          ? 'bg-sky-100 border-sky-400 shadow-sm'
                          : 'bg-white hover:bg-amber-50/70 border-slate-200 hover:border-amber-300 shadow-md hover:shadow-lg'
                      }
                    `}
                  >
                    <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500 mb-1" />
                    <span className="text-xs sm:text-sm font-black text-slate-800 font-['Fredoka'] text-center leading-tight">
                      {opt.label}
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
      <footer className="relative z-10 w-full px-3 py-2 bg-white/80 backdrop-blur-md border-t border-amber-200 flex items-center justify-between">
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
          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer font-['Fredoka'] shadow-sm"
        >
          <span>Seterusnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>

      {/* --- VICTORY CELEBRATION MODAL --- */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50 rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-amber-300 text-center flex flex-col items-center animate-scaleUp">
            {/* Golden Star Banner */}
            <div className="mb-2">
              <ThreeGoldenStarsCluster className="w-24 sm:w-28 object-contain" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-amber-700 font-['Fredoka'] mb-1">
              Tahniah! Hebat Sekali! 🎉
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mb-4">
              Anda telah berjaya menyelesaikan semua soalan dalam <span className="font-bold text-amber-800">{currentSet.title}</span>!
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
              {currentSetIndex < TIME_SETS.length - 1 && (
                <button
                  onClick={() => {
                    handleSwitchSet(currentSetIndex + 1);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm sm:text-base font-['Fredoka'] shadow-md transition cursor-pointer flex items-center justify-center gap-2 active:scale-98"
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
