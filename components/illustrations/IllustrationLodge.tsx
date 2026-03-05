import React from "react";
import SharedDefs from "./svgDefs";

interface IllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationLodge: React.FC<IllustrationProps> = ({
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
    <SharedDefs id="lodge" />

    {/* Sky */}
    <rect width="200" height="160" rx="8" fill={`url(#lodge-sky)`} />

    {/* Clouds */}
    <path d="M40 24 Q48 14 58 17 Q66 12 72 17 Q78 14 78 22 Q74 28 60 26 Q48 30 42 26 Z" fill="white" opacity="0.6" />
    <path d="M142 30 Q148 22 156 24 Q162 20 166 24 Q170 28 162 30 Q154 34 146 30 Z" fill="white" opacity="0.5" />

    {/* Tree background left — organic, reduced opacity */}
    <g opacity="0.5">
      <rect x="7" y="76" width="4" height="42" rx="2" fill="#7BAF8E" />
      <path d="M9 50 Q0 58 -1 70 Q-2 80 5 82 Q8 83 9 78 Q11 83 14 82 Q20 80 19 70 Q18 58 9 50 Z" fill={`url(#lodge-foliageDark)`} />
    </g>

    {/* Tree background right — organic, reduced opacity */}
    <g opacity="0.5">
      <rect x="184" y="78" width="4" height="40" rx="2" fill="#7BAF8E" />
      <path d="M186 52 Q178 60 177 70 Q176 80 182 82 Q185 83 186 78 Q188 83 191 82 Q196 80 195 70 Q194 60 186 52 Z" fill={`url(#lodge-foliageLight)`} />
    </g>

    {/* Small tree mid-right — organic */}
    <rect x="170" y="92" width="3" height="26" rx="1" fill="#6B9E7E" />
    <path d="M171 72 Q164 78 163 86 Q162 92 167 93 Q170 94 171 90 Q173 94 176 93 Q180 92 179 86 Q178 78 171 72 Z" fill={`url(#lodge-foliageDark)`} opacity="0.7" />

    {/* Ground */}
    <path d="M0 118 Q25 113 50 116 Q75 111 100 115 Q125 112 150 116 Q175 113 200 116 L200 160 L0 160 Z" fill={`url(#lodge-ground)`} />
    <path d="M0 118 Q25 113 50 116 Q75 111 100 115 Q125 112 150 116 Q175 113 200 116" fill="none" stroke={`url(#lodge-grass)`} strokeWidth="2" />

    {/* Lodge with shadow */}
    <g filter={`url(#lodge-shadowGround)`}>
      {/* Lodge body — warm wood */}
      <defs>
        <linearGradient id="lodge-woodWall" x1="0.3" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#D4A574" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C4956A" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect x="30" y="68" width="120" height="52" rx="2" fill="url(#lodge-woodWall)" />
      <rect x="30" y="68" width="120" height="52" rx="2" stroke="#C4956A" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />

      {/* Wood texture lines */}
      <line x1="30" y1="76" x2="150" y2="76" stroke="#C4956A" strokeWidth="0.3" opacity="0.25" />
      <line x1="30" y1="84" x2="150" y2="84" stroke="#C4956A" strokeWidth="0.3" opacity="0.25" />
      <line x1="30" y1="92" x2="150" y2="92" stroke="#C4956A" strokeWidth="0.3" opacity="0.25" />
      <line x1="30" y1="100" x2="150" y2="100" stroke="#C4956A" strokeWidth="0.3" opacity="0.25" />
      <line x1="30" y1="108" x2="150" y2="108" stroke="#C4956A" strokeWidth="0.3" opacity="0.25" />

      {/* Main roof */}
      <polygon points="24,70 90,36 156,70" fill="#583A85" />
      <polygon points="28,70 90,40 152,70" fill={`url(#lodge-roof)`} />

      {/* Chimney */}
      <rect x="118" y="40" width="8" height="20" rx="1" fill={`url(#lodge-metal)`} />
      <rect x="116" y="38" width="12" height="4" rx="1" fill="#6B7280" />
      {/* Smoke — organic puffs */}
      <path d="M122 36 Q124 30 122 26" stroke="#B8BCC4" strokeWidth="1.5" fill="none" opacity="0.35" strokeLinecap="round" />
      <path d="M124 34 Q127 28 124 22" stroke="#B8BCC4" strokeWidth="1" fill="none" opacity="0.2" strokeLinecap="round" />

      {/* Upper window in roof */}
      <rect x="82" y="50" width="16" height="12" rx="1" fill={`url(#lodge-glass)`} />
      <rect x="82" y="50" width="16" height="12" rx="1" stroke="#583A85" strokeWidth="0.5" strokeOpacity="0.5" fill="none" />
      <line x1="90" y1="50" x2="90" y2="62" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />

      {/* Door */}
      <rect x="80" y="90" width="20" height="28" rx="2" fill={`url(#lodge-door)`} />
      <rect x="82" y="92" width="16" height="10" rx="1" fill="white" opacity="0.12" />
      <circle cx="95" cy="106" r="1.5" fill="white" opacity="0.6" />

      {/* Windows */}
      <rect x="38" y="78" width="16" height="14" rx="1" fill={`url(#lodge-glass)`} />
      <rect x="38" y="78" width="16" height="14" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="46" y1="78" x2="46" y2="92" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />
      <line x1="38" y1="85" x2="54" y2="85" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />

      <rect x="110" y="78" width="16" height="14" rx="1" fill={`url(#lodge-glass)`} />
      <rect x="110" y="78" width="16" height="14" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="118" y1="78" x2="118" y2="92" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />
      <line x1="110" y1="85" x2="126" y2="85" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />
    </g>

    {/* Covered terrace with shadow */}
    <g filter={`url(#lodge-shadowSoft)`}>
      <rect x="150" y="82" width="34" height="36" fill="#D4A574" opacity="0.1" />
      <rect x="150" y="82" width="34" height="36" stroke="#C4956A" strokeWidth="0.6" strokeOpacity="0.4" fill="none" />

      {/* Terrace roof */}
      <polygon points="148,84 167,72 186,84" fill="#583A85" opacity="0.8" />

      {/* Support posts — wood gradient */}
      <rect x="152" y="84" width="3" height="34" fill={`url(#lodge-wood)`} opacity="0.6" />
      <rect x="179" y="84" width="3" height="34" fill={`url(#lodge-wood)`} opacity="0.6" />

      {/* Railing */}
      <line x1="152" y1="104" x2="182" y2="104" stroke="#C4956A" strokeWidth="1" opacity="0.5" />
      <line x1="160" y1="104" x2="160" y2="118" stroke="#C4956A" strokeWidth="0.5" opacity="0.4" />
      <line x1="172" y1="104" x2="172" y2="118" stroke="#C4956A" strokeWidth="0.5" opacity="0.4" />
    </g>

    {/* Ground path */}
    <ellipse cx="90" cy="124" rx="10" ry="2.5" fill="#D1D5DB" opacity="0.5" />
    <ellipse cx="88" cy="132" rx="8" ry="2" fill="#D1D5DB" opacity="0.4" />

    {/* Bush left */}
    <path d="M20 116 Q24 110 30 112 Q36 110 38 115 Q40 118 32 120 Q24 120 20 116 Z" fill={`url(#lodge-foliageDark)`} opacity="0.7" />
  </svg>
);

export default IllustrationLodge;
