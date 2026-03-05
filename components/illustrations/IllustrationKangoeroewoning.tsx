import React from "react";
import SharedDefs from "./svgDefs";

interface IllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationKangoeroewoning: React.FC<IllustrationProps> = ({
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
    <SharedDefs id="kang" />

    {/* Sky */}
    <rect width="200" height="160" rx="8" fill={`url(#kang-sky)`} />

    {/* Clouds */}
    <path d="M22 22 Q28 14 38 16 Q44 12 50 16 Q54 20 48 24 Q40 26 28 24 Z" fill="white" opacity="0.6" />
    <path d="M148 26 Q154 18 164 20 Q172 16 176 22 Q180 20 178 28 Q172 32 160 30 Q150 32 148 26 Z" fill="white" opacity="0.5" />

    {/* Ground */}
    <path d="M0 118 Q25 113 50 116 Q75 111 100 115 Q125 112 150 116 Q175 113 200 116 L200 160 L0 160 Z" fill={`url(#kang-ground)`} />
    <path d="M0 118 Q25 113 50 116 Q75 111 100 115 Q125 112 150 116 Q175 113 200 116" fill="none" stroke={`url(#kang-grass)`} strokeWidth="2" />

    {/* Main large house with shadow */}
    <g filter={`url(#kang-shadowGround)`}>
      <rect x="18" y="54" width="100" height="66" rx="2" fill={`url(#kang-wall)`} />
      <rect x="18" y="54" width="100" height="66" rx="2" stroke="#583A85" strokeWidth="1" strokeOpacity="0.3" fill="none" />

      {/* Main house roof */}
      <polygon points="12,56 68,24 124,56" fill="#583A85" />
      <polygon points="16,56 68,28 120,56" fill={`url(#kang-roof)`} />

      {/* Chimney */}
      <rect x="92" y="30" width="8" height="18" rx="1" fill="#462D6B" />
      <rect x="90" y="28" width="12" height="4" rx="1" fill="#583A85" />

      {/* Upper window */}
      <rect x="55" y="60" width="26" height="14" rx="1" fill={`url(#kang-glass)`} />
      <rect x="55" y="60" width="26" height="14" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="68" y1="60" x2="68" y2="74" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />
      <line x1="55" y1="67" x2="81" y2="67" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />

      {/* Lower windows */}
      <rect x="24" y="80" width="16" height="14" rx="1" fill={`url(#kang-glass)`} />
      <rect x="24" y="80" width="16" height="14" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="32" y1="80" x2="32" y2="94" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />

      <rect x="88" y="80" width="16" height="14" rx="1" fill={`url(#kang-glass)`} />
      <rect x="88" y="80" width="16" height="14" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="96" y1="80" x2="96" y2="94" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />

      {/* Main door */}
      <rect x="54" y="90" width="18" height="28" rx="2" fill={`url(#kang-wallGreen)`} />
      <rect x="56" y="92" width="14" height="10" rx="1" fill="white" opacity="0.15" />
      <circle cx="67" cy="106" r="1.5" fill="white" opacity="0.6" />
    </g>

    {/* Attached smaller section with shadow */}
    <g filter={`url(#kang-shadowGround)`}>
      <rect x="118" y="72" width="60" height="48" rx="2" fill={`url(#kang-wall)`} />
      <rect x="118" y="72" width="60" height="48" rx="2" stroke="#583A85" strokeWidth="1" strokeOpacity="0.3" fill="none" />

      {/* Connection overlap */}
      <rect x="116" y="72" width="6" height="48" fill={`url(#kang-wall)`} />
      <line x1="118" y1="72" x2="118" y2="120" stroke="#E8524A" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.6" />

      {/* Smaller section roof — accent orange */}
      <defs>
        <linearGradient id="kang-roofAccent" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#F59A2C" />
          <stop offset="100%" stopColor="#E8524A" />
        </linearGradient>
      </defs>
      <polygon points="114,74 148,52 182,74" fill="#E8524A" />
      <polygon points="118,74 148,56 178,74" fill="url(#kang-roofAccent)" />

      {/* Smaller section door */}
      <rect x="136" y="98" width="14" height="22" rx="2" fill={`url(#kang-door)`} />
      <circle cx="146" cy="110" r="1.5" fill="white" opacity="0.6" />

      {/* Smaller section windows */}
      <rect x="124" y="80" width="10" height="10" rx="1" fill={`url(#kang-glass)`} />
      <rect x="124" y="80" width="10" height="10" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.5" fill="none" />

      <rect x="158" y="80" width="10" height="10" rx="1" fill={`url(#kang-glass)`} />
      <rect x="158" y="80" width="10" height="10" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.5" fill="none" />
    </g>

    {/* Connection arrow */}
    <path d="M112,90 L122,90" stroke="#E8524A" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.5" />

    {/* Tree far right — organic */}
    <rect x="186" y="98" width="4" height="20" rx="2" fill="#6B9E7E" />
    <path d="M188 76 Q180 84 179 92 Q178 100 184 101 Q187 102 188 98 Q190 102 193 101 Q198 100 197 92 Q196 84 188 76 Z" fill={`url(#kang-foliageDark)`} />

    {/* Bush left */}
    <path d="M0 116 Q4 110 10 112 Q16 110 18 115 Q20 118 12 120 Q4 120 0 116 Z" fill={`url(#kang-foliageLight)`} opacity="0.7" />

    {/* Garden details */}
    <ellipse cx="140" cy="126" rx="6" ry="2" fill="#D1D5DB" opacity="0.4" />
    <ellipse cx="58" cy="128" rx="8" ry="2" fill="#D1D5DB" opacity="0.4" />
  </svg>
);

export default IllustrationKangoeroewoning;
