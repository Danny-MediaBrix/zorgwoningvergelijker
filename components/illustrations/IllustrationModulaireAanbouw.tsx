import React from "react";
import SharedDefs from "./svgDefs";

interface IllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationModulaireAanbouw: React.FC<IllustrationProps> = ({
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
    <SharedDefs id="modul" />

    {/* Sky */}
    <rect width="200" height="160" rx="8" fill={`url(#modul-sky)`} />

    {/* Clouds */}
    <path d="M36 20 Q42 12 50 14 Q56 10 62 14 Q66 18 60 22 Q52 24 42 22 Z" fill="white" opacity="0.6" />
    <path d="M138 26 Q144 18 154 20 Q162 16 166 22 Q170 20 168 28 Q162 32 150 30 Q140 32 138 26 Z" fill="white" opacity="0.5" />

    {/* Ground */}
    <path d="M0 118 Q25 113 50 116 Q75 111 100 115 Q125 112 150 116 Q175 113 200 116 L200 160 L0 160 Z" fill={`url(#modul-ground)`} />
    <path d="M0 118 Q25 113 50 116 Q75 111 100 115 Q125 112 150 116 Q175 113 200 116" fill="none" stroke={`url(#modul-grass)`} strokeWidth="2" />

    {/* Existing house — left, gray gradient */}
    <g filter={`url(#modul-shadowGround)`}>
      <defs>
        <linearGradient id="modul-grayWall" x1="0.3" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#9CA3AF" />
          <stop offset="100%" stopColor="#6B7280" />
        </linearGradient>
        <linearGradient id="modul-grayRoof" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#D1D5DB" />
          <stop offset="100%" stopColor="#B8BCC4" />
        </linearGradient>
      </defs>
      <rect x="20" y="62" width="70" height="56" rx="2" fill="url(#modul-grayWall)" />

      {/* Existing roof */}
      <polygon points="16,62 55,38 94,62" fill="#B8BCC4" />
      <polygon points="20,62 55,42 90,62" fill="url(#modul-grayRoof)" />

      {/* Existing windows */}
      <rect x="30" y="72" width="14" height="12" rx="1" fill={`url(#modul-glass)`} />
      <rect x="30" y="72" width="14" height="12" rx="1" stroke="#6B7280" strokeWidth="0.6" strokeOpacity="0.5" fill="none" />
      <line x1="37" y1="72" x2="37" y2="84" stroke="#6B7280" strokeWidth="0.3" opacity="0.3" />
      <line x1="30" y1="78" x2="44" y2="78" stroke="#6B7280" strokeWidth="0.3" opacity="0.3" />

      <rect x="50" y="72" width="14" height="12" rx="1" fill={`url(#modul-glass)`} />
      <rect x="50" y="72" width="14" height="12" rx="1" stroke="#6B7280" strokeWidth="0.6" strokeOpacity="0.5" fill="none" />
      <line x1="57" y1="72" x2="57" y2="84" stroke="#6B7280" strokeWidth="0.3" opacity="0.3" />

      {/* Existing door */}
      <rect x="72" y="92" width="14" height="26" rx="1" fill={`url(#modul-glass)`} />
      <circle cx="82" cy="106" r="1.5" fill="#6B7280" />
    </g>

    {/* Connection seam */}
    <line x1="90" y1="62" x2="90" y2="118" stroke="#E8524A" strokeWidth="2" strokeDasharray="4 3" opacity="0.6" />

    {/* New extension — right, green gradient */}
    <g filter={`url(#modul-shadowGround)`}>
      <rect x="90" y="72" width="70" height="46" rx="2" fill={`url(#modul-wallGreen)`} />

      {/* New flat roof */}
      <rect x="88" y="68" width="75" height="5" rx="1" fill={`url(#modul-roof)`} />

      {/* Accent strip */}
      <defs>
        <linearGradient id="modul-stripe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F59A2C" />
          <stop offset="100%" stopColor="#E8524A" />
        </linearGradient>
      </defs>
      <rect x="90" y="73" width="70" height="3" fill="url(#modul-stripe)" />

      {/* New large window */}
      <rect x="96" y="82" width="26" height="20" rx="2" fill={`url(#modul-glass)`} />
      <rect x="96" y="82" width="26" height="20" rx="2" stroke="#4AA076" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="109" y1="82" x2="109" y2="102" stroke="#4AA076" strokeWidth="0.3" opacity="0.3" />
      <line x1="96" y1="92" x2="122" y2="92" stroke="#4AA076" strokeWidth="0.3" opacity="0.3" />

      {/* New second window */}
      <rect x="128" y="82" width="14" height="12" rx="1" fill={`url(#modul-glass)`} />
      <rect x="128" y="82" width="14" height="12" rx="1" stroke="#4AA076" strokeWidth="0.6" strokeOpacity="0.5" fill="none" />
      <line x1="135" y1="82" x2="135" y2="94" stroke="#4AA076" strokeWidth="0.3" opacity="0.3" />

      {/* New door */}
      <rect x="130" y="100" width="12" height="18" rx="1" fill={`url(#modul-glass)`} />
      <rect x="130" y="100" width="12" height="18" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.5" fill="none" />
      <circle cx="139" cy="110" r="1.5" fill="#E8524A" />
    </g>

    {/* Connection brackets */}
    <rect x="87" y="80" width="6" height="3" rx="0.5" fill="#E8524A" opacity="0.8" />
    <rect x="87" y="95" width="6" height="3" rx="0.5" fill="#E8524A" opacity="0.8" />
    <rect x="87" y="110" width="6" height="3" rx="0.5" fill="#E8524A" opacity="0.8" />

    {/* Tree — organic */}
    <rect x="174" y="94" width="4" height="24" rx="2" fill="#6B9E7E" />
    <path d="M176 72 Q168 80 167 88 Q166 96 172 98 Q175 99 176 94 Q178 99 181 98 Q186 96 185 88 Q184 80 176 72 Z" fill={`url(#modul-foliageDark)`} />

    {/* Bush */}
    <path d="M2 114 Q6 108 12 110 Q18 108 20 113 Q22 116 14 118 Q6 118 2 114 Z" fill={`url(#modul-foliageLight)`} opacity="0.7" />

    {/* Ground details */}
    <ellipse cx="55" cy="130" rx="5" ry="2" fill="#4AA076" opacity="0.2" />
    <ellipse cx="130" cy="134" rx="4" ry="1.5" fill="#4AA076" opacity="0.2" />
  </svg>
);

export default IllustrationModulaireAanbouw;
