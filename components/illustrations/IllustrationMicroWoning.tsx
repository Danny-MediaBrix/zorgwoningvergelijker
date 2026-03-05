import React from "react";
import SharedDefs from "./svgDefs";

interface IllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationMicroWoning: React.FC<IllustrationProps> = ({
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
    <SharedDefs id="micro" />

    {/* Sky */}
    <rect width="200" height="160" rx="8" fill={`url(#micro-sky)`} />

    {/* Clouds */}
    <path d="M28 26 Q34 18 42 20 Q48 16 54 20 Q58 24 52 28 Q44 30 34 28 Z" fill="white" opacity="0.6" />
    <path d="M138 32 Q144 22 154 25 Q162 20 168 25 Q174 22 174 30 Q170 34 156 33 Q144 36 140 32 Z" fill="white" opacity="0.5" />

    {/* Ground */}
    <path d="M0 118 Q30 113 60 116 Q90 111 120 115 Q150 112 180 116 Q190 113 200 116 L200 160 L0 160 Z" fill={`url(#micro-ground)`} />
    <path d="M0 118 Q30 113 60 116 Q90 111 120 115 Q150 112 180 116 Q190 113 200 116" fill="none" stroke={`url(#micro-grass)`} strokeWidth="2" />

    {/* Ground path */}
    <path d="M85 118 L115 118 L112 160 L88 160 Z" fill="#E4E6EB" opacity="0.4" />

    {/* House with shadow */}
    <g filter={`url(#micro-shadowGround)`}>
      {/* House body */}
      <rect x="45" y="52" width="110" height="68" rx="3" fill={`url(#micro-wall)`} />
      <rect x="45" y="52" width="110" height="68" rx="3" stroke="#583A85" strokeWidth="1" strokeOpacity="0.3" fill="none" />

      {/* Slight angled roof */}
      <polygon points="40,54 100,38 160,50 160,56 45,56" fill="#583A85" />
      <polygon points="44,54 100,40 156,51 156,55 46,55" fill={`url(#micro-roof)`} />

      {/* Solar panel on roof */}
      <defs>
        <linearGradient id="micro-solar" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#583A85" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <rect x="70" y="42" width="24" height="10" rx="1" fill="url(#micro-solar)" />
      <line x1="76" y1="42" x2="76" y2="52" stroke="#E8F5EE" strokeWidth="0.3" opacity="0.6" />
      <line x1="82" y1="42" x2="82" y2="52" stroke="#E8F5EE" strokeWidth="0.3" opacity="0.6" />
      <line x1="88" y1="42" x2="88" y2="52" stroke="#E8F5EE" strokeWidth="0.3" opacity="0.6" />

      {/* Large window left — floor to ceiling */}
      <rect x="52" y="62" width="30" height="46" rx="2" fill={`url(#micro-glass)`} />
      <rect x="52" y="62" width="30" height="46" rx="2" stroke="#583A85" strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
      <line x1="67" y1="62" x2="67" y2="108" stroke="#583A85" strokeWidth="0.4" opacity="0.3" />
      <line x1="52" y1="85" x2="82" y2="85" stroke="#583A85" strokeWidth="0.4" opacity="0.3" />

      {/* Door — modern */}
      <rect x="90" y="62" width="22" height="56" rx="2" fill={`url(#micro-door)`} />
      <rect x="92" y="64" width="18" height="20" rx="1" fill="white" opacity="0.15" />
      <circle cx="106" cy="92" r="2" fill="white" opacity="0.6" />

      {/* Large window right */}
      <rect x="118" y="62" width="30" height="30" rx="2" fill={`url(#micro-glass)`} />
      <rect x="118" y="62" width="30" height="30" rx="2" stroke="#583A85" strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
      <line x1="133" y1="62" x2="133" y2="92" stroke="#583A85" strokeWidth="0.4" opacity="0.3" />
      <line x1="118" y1="77" x2="148" y2="77" stroke="#583A85" strokeWidth="0.4" opacity="0.3" />

      {/* Small accent window right bottom */}
      <rect x="118" y="98" width="12" height="12" rx="1" fill={`url(#micro-glass)`} />
      <rect x="118" y="98" width="12" height="12" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.5" fill="none" />
    </g>

    {/* Plant left — organic */}
    <rect x="27" y="102" width="3" height="16" rx="1" fill="#6B9E7E" />
    <path d="M28 82 Q20 88 19 96 Q18 102 23 104 Q27 105 28 101 Q30 105 34 104 Q38 102 37 96 Q36 88 28 82 Z" fill={`url(#micro-foliageDark)`} />

    {/* Plant right — organic */}
    <rect x="168" y="104" width="3" height="14" rx="1" fill="#6B9E7E" />
    <path d="M169 86 Q162 92 161 100 Q160 106 165 107 Q168 108 169 104 Q171 108 174 107 Q178 106 177 100 Q176 92 169 86 Z" fill={`url(#micro-foliageLight)`} />

    {/* Stepping stones */}
    <rect x="92" y="124" width="16" height="3" rx="1.5" fill="#D1D5DB" opacity="0.6" />
    <rect x="90" y="132" width="18" height="3" rx="1.5" fill="#D1D5DB" opacity="0.5" />
    <rect x="93" y="140" width="14" height="3" rx="1.5" fill="#D1D5DB" opacity="0.4" />
  </svg>
);

export default IllustrationMicroWoning;
