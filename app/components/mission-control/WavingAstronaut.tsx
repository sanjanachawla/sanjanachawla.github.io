"use client";

import { motion } from "framer-motion";

export function WavingAstronaut() {
  return (
    <svg
      aria-label="Girl astronaut with black hair waving"
      className="h-full w-full drop-shadow-[0_24px_70px_rgba(14,165,233,0.25)]"
      role="img"
      viewBox="0 0 420 420"
    >
      <defs>
        <linearGradient id="astronautSuit" x1="122" x2="302" y1="138" y2="352">
          <stop stopColor="#f8fafc" />
          <stop offset="1" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="helmetGlass" x1="141" x2="278" y1="72" y2="214">
          <stop stopColor="#e0f2fe" stopOpacity="0.92" />
          <stop offset="0.55" stopColor="#7dd3fc" stopOpacity="0.5" />
          <stop offset="1" stopColor="#082f49" stopOpacity="0.32" />
        </linearGradient>
        <radialGradient id="visorGlow" cx="50%" cy="32%" r="62%">
          <stop stopColor="#ffffff" stopOpacity="0.86" />
          <stop offset="0.5" stopColor="#67e8f9" stopOpacity="0.2" />
          <stop offset="1" stopColor="#0e7490" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d="M70 300C108 258 124 216 153 181C189 137 250 117 315 92"
        fill="none"
        stroke="#38bdf8"
        strokeDasharray="5 14"
        strokeLinecap="round"
        strokeOpacity="0.36"
        strokeWidth="2"
      />
      <circle cx="82" cy="102" r="2.5" fill="#a5f3fc" opacity="0.75" />
      <circle cx="345" cy="126" r="2" fill="#e0f2fe" opacity="0.7" />
      <circle cx="362" cy="272" r="2.5" fill="#67e8f9" opacity="0.65" />
      <circle cx="104" cy="344" r="1.8" fill="#f8fafc" opacity="0.72" />
      <path d="M318 321l7 4 8-3-4 8 4 8-8-3-7 4 3-8z" fill="#facc15" opacity="0.75" />

      <motion.g
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.2, ease: "easeInOut", repeat: Infinity }}
      >
        <path
          d="M168 282c-16 24-28 48-38 75"
          fill="none"
          stroke="#dbeafe"
          strokeLinecap="round"
          strokeWidth="30"
        />
        <path
          d="M250 282c17 25 28 50 36 76"
          fill="none"
          stroke="#dbeafe"
          strokeLinecap="round"
          strokeWidth="30"
        />
        <path
          d="M118 352h48"
          fill="none"
          stroke="#64748b"
          strokeLinecap="round"
          strokeWidth="20"
        />
        <path
          d="M260 352h47"
          fill="none"
          stroke="#64748b"
          strokeLinecap="round"
          strokeWidth="20"
        />

        <path
          d="M140 193c-36 21-51 49-45 82"
          fill="none"
          stroke="#e2e8f0"
          strokeLinecap="round"
          strokeWidth="30"
        />
        <circle cx="94" cy="277" r="17" fill="#cbd5e1" />

        <motion.g
          animate={{ rotate: [-8, 12, -6, 10, -8] }}
          style={{ transformBox: "fill-box", transformOrigin: "28% 83%" }}
          transition={{ duration: 1.9, ease: "easeInOut", repeat: Infinity }}
        >
          <path
            d="M274 191c32-19 41-50 30-79"
            fill="none"
            stroke="#e2e8f0"
            strokeLinecap="round"
            strokeWidth="30"
          />
          <path
            d="M304 112c12-18 28-19 37-7 10 13 4 31-15 36"
            fill="none"
            stroke="#cbd5e1"
            strokeLinecap="round"
            strokeWidth="15"
          />
          <circle cx="305" cy="112" r="14" fill="#e2e8f0" />
        </motion.g>

        <path
          d="M133 214c7-48 37-79 78-79s71 31 78 79l9 64c5 36-22 68-58 68h-58c-36 0-63-32-58-68z"
          fill="url(#astronautSuit)"
          stroke="#bae6fd"
          strokeOpacity="0.45"
          strokeWidth="3"
        />
        <rect
          fill="#0f172a"
          height="58"
          rx="14"
          stroke="#67e8f9"
          strokeOpacity="0.45"
          width="84"
          x="168"
          y="228"
        />
        <circle cx="190" cy="258" r="7" fill="#22d3ee" />
        <circle cx="213" cy="258" r="7" fill="#34d399" />
        <path d="M236 255h18" stroke="#f8fafc" strokeLinecap="round" strokeOpacity="0.56" strokeWidth="4" />

        <circle cx="210" cy="137" r="80" fill="#e2e8f0" />
        <circle cx="210" cy="137" r="66" fill="url(#helmetGlass)" />
        <circle cx="210" cy="137" r="66" fill="url(#visorGlow)" />
        <path
          d="M163 132c6-34 24-54 50-54 31 0 50 22 53 59-26-15-78-14-103-5z"
          fill="#050816"
          opacity="0.96"
        />
        <path
          d="M154 139c17-19 38-29 62-29 25 0 44 10 57 29-5 41-29 64-62 64-34 0-55-24-57-64z"
          fill="#b9826d"
        />
        <path
          d="M158 138c13-24 34-38 61-38 24 0 42 13 52 34-31-11-63-9-113 4z"
          fill="#050816"
        />
        <path
          d="M184 100c-19 21-23 51-14 82-22-7-35-25-36-51 12-21 28-32 50-31z"
          fill="#050816"
          opacity="0.98"
        />
        <path
          d="M239 101c18 18 24 46 14 79 22-8 35-25 35-48-11-20-27-31-49-31z"
          fill="#050816"
          opacity="0.98"
        />
        <path d="M181 154c8 5 17 5 25 0" stroke="#422006" strokeLinecap="round" strokeWidth="3" />
        <path d="M223 154c8 5 17 5 25 0" stroke="#422006" strokeLinecap="round" strokeWidth="3" />
        <path d="M204 178c13 9 28 9 42 0" stroke="#7f1d1d" strokeLinecap="round" strokeWidth="4" />
        <path
          d="M165 90c25-31 71-35 102-8"
          fill="none"
          stroke="#f8fafc"
          strokeLinecap="round"
          strokeOpacity="0.82"
          strokeWidth="11"
        />
        <path
          d="M165 90c-16 11-25 28-28 49"
          fill="none"
          stroke="#94a3b8"
          strokeLinecap="round"
          strokeWidth="10"
        />
        <path
          d="M267 82c18 13 28 31 31 55"
          fill="none"
          stroke="#94a3b8"
          strokeLinecap="round"
          strokeWidth="10"
        />
        <path
          d="M169 111c19-23 61-33 92-7"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeOpacity="0.5"
          strokeWidth="5"
        />
      </motion.g>
    </svg>
  );
}
