import React from "react";
import SharedDefs from "./svgDefs";

interface IllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationFlexwoning: React.FC<IllustrationProps> = ({
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
    <SharedDefs id="flex" />

    {/* Sky */}
    <rect width="200" height="160" rx="8" fill={`url(#flex-sky)`} />

    {/* Clouds */}
    <path d="M36 26 Q42 18 50 20 Q56 16 62 20 Q66 24 60 28 Q52 30 42 28 Z" fill="white" opacity="0.6" />
    <path d="M142 20 Q146 14 154 16 Q160 12 164 16 Q168 20 160 22 Q152 24 144 20 Z" fill="white" opacity="0.5" />

    {/* Ground */}
    <path d="M0 120 Q25 115 50 118 Q75 113 100 117 Q125 114 150 118 Q175 115 200 118 L200 160 L0 160 Z" fill={`url(#flex-ground)`} />
    <path d="M0 120 Q25 115 50 118 Q75 113 100 117 Q125 114 150 118 Q175 115 200 118" fill="none" stroke={`url(#flex-grass)`} strokeWidth="2" />

    {/* House with shadow */}
    <g filter={`url(#flex-shadowGround)`}>
      {/* Foundation / skid frame — metallic */}
      <rect x="45" y="112" width="100" height="8" rx="2" fill={`url(#flex-metal)`} />

      {/* Main body */}
      <rect x="48" y="72" width="94" height="40" rx="3" fill={`url(#flex-wallGreen)`} />

      {/* Modern slanted roof */}
      <polygon points="44,72 100,48 148,72" fill={`url(#flex-roof)`} />

      {/* Large front window */}
      <rect x="56" y="80" width="22" height="18" rx="2" fill={`url(#flex-glass)`} />
      <rect x="56" y="80" width="22" height="18" rx="2" stroke="#4AA076" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="67" y1="80" x2="67" y2="98" stroke="#4AA076" strokeWidth="0.3" opacity="0.3" />

      {/* Second window */}
      <rect x="84" y="80" width="14" height="12" rx="1" fill={`url(#flex-glass)`} />
      <rect x="84" y="80" width="14" height="12" rx="1" stroke="#4AA076" strokeWidth="0.6" strokeOpacity="0.5" fill="none" />

      {/* Door */}
      <rect x="108" y="82" width="14" height="30" rx="2" fill={`url(#flex-glass)`} />
      <rect x="108" y="82" width="14" height="30" rx="2" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.5" fill="none" />
      <circle cx="118" cy="98" r="1.5" fill="#E8524A" />

      {/* Step */}
      <rect x="106" y="112" width="18" height="4" rx="1" fill="#4AA076" />
    </g>

    {/* Wheels — metallic gradient */}
    <circle cx="58" cy="122" r="5" fill="#5A5F68" />
    <circle cx="58" cy="122" r="3.5" fill={`url(#flex-metal)`} />
    <circle cx="58" cy="122" r="1.5" fill="#6B7280" />
    <circle cx="132" cy="122" r="5" fill="#5A5F68" />
    <circle cx="132" cy="122" r="3.5" fill={`url(#flex-metal)`} />
    <circle cx="132" cy="122" r="1.5" fill="#6B7280" />

    {/* Movement arrows — gradient */}
    <defs>
      <linearGradient id="flex-arrow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#E8524A" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#E8524A" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    <line x1="150" y1="100" x2="176" y2="100" stroke="url(#flex-arrow)" strokeWidth="1.5" />
    <polygon points="170,95 180,100 170,105" fill="#E8524A" opacity="0.6" />

    {/* Tree — organic */}
    <rect x="17" y="98" width="3" height="22" rx="1.5" fill="#6B9E7E" />
    <path d="M18 76 Q10 84 9 92 Q8 100 14 101 Q17 102 18 98 Q20 102 23 101 Q28 100 27 92 Q26 84 18 76 Z" fill={`url(#flex-foliageDark)`} />

    {/* Bush right — organic */}
    <path d="M168 116 Q174 108 182 110 Q190 108 192 114 Q194 118 186 120 Q176 122 168 116 Z" fill={`url(#flex-foliageLight)`} opacity="0.7" />
    <path d="M176 114 Q180 108 186 110 Q190 108 192 112 Q190 116 184 116 Q178 118 176 114 Z" fill={`url(#flex-foliageDark)`} opacity="0.5" />

    {/* Ground details */}
    <ellipse cx="90" cy="135" rx="5" ry="2" fill="#4AA076" opacity="0.2" />
  </svg>
);

export default IllustrationFlexwoning;
