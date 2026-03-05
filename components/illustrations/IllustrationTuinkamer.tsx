import React from "react";
import SharedDefs from "./svgDefs";

interface IllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationTuinkamer: React.FC<IllustrationProps> = ({
  className,
  width = 200,
  height = 160,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <SharedDefs id="tuinkamer" />

    {/* Sky */}
    <rect width="200" height="160" rx="8" fill={`url(#tuinkamer-sky)`} />

    {/* Sun hint */}
    <circle cx="170" cy="25" r="14" fill={`url(#tuinkamer-sun)`} opacity="0.3" />
    <circle cx="170" cy="25" r="7" fill="#FFF4E0" opacity="0.5" />

    {/* Cloud */}
    <path d="M44 22 Q52 12 62 15 Q70 10 76 15 Q82 12 80 22 Q76 28 62 26 Q50 30 46 24 Z" fill="white" opacity="0.6" />

    {/* Ground */}
    <path d="M0 118 Q25 113 50 116 Q75 111 100 115 Q125 112 150 116 Q175 113 200 116 L200 160 L0 160 Z" fill={`url(#tuinkamer-ground)`} />
    <path d="M0 118 Q25 113 50 116 Q75 111 100 115 Q125 112 150 116 Q175 113 200 116" fill="none" stroke={`url(#tuinkamer-grass)`} strokeWidth="2" />

    {/* Garden room with shadow */}
    <g filter={`url(#tuinkamer-shadowGround)`}>
      {/* Structure frame */}
      <rect x="55" y="68" width="80" height="50" rx="2" fill="#4AA076" />

      {/* Glass panels — reflective gradient */}
      <defs>
        <linearGradient id="tuinkamer-glassPanel" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#E8F4FF" />
          <stop offset="40%" stopColor="#D4EEFF" />
          <stop offset="80%" stopColor="#F0F8FF" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <rect x="58" y="71" width="23" height="36" rx="1" fill="url(#tuinkamer-glassPanel)" />
      <rect x="83" y="71" width="23" height="36" rx="1" fill="url(#tuinkamer-glassPanel)" />
      <rect x="108" y="71" width="24" height="36" rx="1" fill="url(#tuinkamer-glassPanel)" />

      {/* Glass panel dividers */}
      <line x1="69.5" y1="71" x2="69.5" y2="107" stroke="#4AA076" strokeWidth="0.6" opacity="0.6" />
      <line x1="94.5" y1="71" x2="94.5" y2="107" stroke="#4AA076" strokeWidth="0.6" opacity="0.6" />
      <line x1="120" y1="71" x2="120" y2="107" stroke="#4AA076" strokeWidth="0.6" opacity="0.6" />
      <line x1="58" y1="89" x2="132" y2="89" stroke="#4AA076" strokeWidth="0.6" opacity="0.6" />

      {/* Glass roof */}
      <polygon points="52,68 95,48 138,68" fill="url(#tuinkamer-glassPanel)" stroke="#4AA076" strokeWidth="0.8" strokeOpacity="0.6" />
      <line x1="75" y1="58" x2="68" y2="68" stroke="#4AA076" strokeWidth="0.6" opacity="0.4" />
      <line x1="95" y1="48" x2="95" y2="68" stroke="#4AA076" strokeWidth="0.6" opacity="0.4" />
      <line x1="115" y1="58" x2="122" y2="68" stroke="#4AA076" strokeWidth="0.6" opacity="0.4" />

      {/* Door */}
      <rect x="86" y="92" width="16" height="26" rx="1" fill="url(#tuinkamer-glassPanel)" />
      <rect x="86" y="92" width="16" height="26" rx="1" stroke="#4AA076" strokeWidth="0.5" strokeOpacity="0.5" fill="none" />
      <circle cx="98" cy="106" r="1.5" fill="#E8524A" />
    </g>

    {/* Plant pot left */}
    <rect x="38" y="108" width="10" height="10" rx="2" fill={`url(#tuinkamer-door)`} />
    <path d="M43 90 Q36 96 35 102 Q34 108 40 108 Q42 109 43 105 Q45 109 47 108 Q52 108 51 102 Q50 96 43 90 Z" fill={`url(#tuinkamer-foliageDark)`} />
    <path d="M40 96 Q37 100 37 104 Q36 108 40 108 Q42 106 43 104 Q44 106 47 108 Q50 108 49 104 Q48 100 46 96 Z" fill={`url(#tuinkamer-foliageLight)`} opacity="0.6" />

    {/* Plant pot right */}
    <rect x="142" y="108" width="10" height="10" rx="2" fill={`url(#tuinkamer-door)`} />
    <path d="M147 90 Q140 96 139 102 Q138 108 144 108 Q146 109 147 105 Q149 109 151 108 Q156 108 155 102 Q154 96 147 90 Z" fill={`url(#tuinkamer-foliageDark)`} />
    <path d="M144 96 Q141 100 141 104 Q140 108 144 108 Q146 106 147 104 Q148 106 151 108 Q154 108 153 104 Q152 100 150 96 Z" fill={`url(#tuinkamer-foliageLight)`} opacity="0.6" />

    {/* Hanging plant */}
    <line x1="65" y1="68" x2="65" y2="74" stroke="#4AA076" strokeWidth="1" />
    <path d="M65 73 Q60 76 61 80 Q62 83 65 82 Q68 83 69 80 Q70 76 65 73 Z" fill="#583A85" />

    {/* Tree far left — organic, depth */}
    <g opacity="0.6">
      <rect x="11" y="90" width="4" height="28" rx="2" fill="#7BAF8E" />
      <path d="M13 68 Q4 76 3 86 Q2 94 9 96 Q12 97 13 92 Q15 97 18 96 Q24 94 23 86 Q22 76 13 68 Z" fill={`url(#tuinkamer-foliageDark)`} />
    </g>

    {/* Bush far right — organic */}
    <path d="M170 114 Q176 106 184 108 Q192 106 194 112 Q196 116 186 118 Q176 120 170 114 Z" fill={`url(#tuinkamer-foliageLight)`} opacity="0.7" />
    <path d="M180 112 Q184 106 190 108 Q194 110 192 114 Q188 116 182 116 Z" fill={`url(#tuinkamer-foliageDark)`} opacity="0.5" />

    {/* Flowers */}
    <circle cx="160" cy="116" r="2" fill="#E8524A" opacity="0.5" />
    <circle cx="164" cy="114" r="2" fill="#F59A2C" opacity="0.4" />
    <line x1="160" y1="116" x2="160" y2="122" stroke="#4AA076" strokeWidth="0.8" />
    <line x1="164" y1="114" x2="164" y2="122" stroke="#4AA076" strokeWidth="0.8" />

    {/* Path */}
    <rect x="88" y="118" width="12" height="18" rx="1" fill="#D1D5DB" opacity="0.35" />
  </svg>
);

export default IllustrationTuinkamer;
