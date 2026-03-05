import React from "react";
import SharedDefs from "./svgDefs";

interface IllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationSysteemwoning: React.FC<IllustrationProps> = ({
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
    <SharedDefs id="systeem" />

    {/* Sky */}
    <rect width="200" height="160" rx="8" fill={`url(#systeem-sky)`} />

    {/* Cloud */}
    <path d="M126 24 Q134 14 144 17 Q152 12 158 17 Q164 14 164 22 Q160 28 146 26 Q134 30 128 24 Z" fill="white" opacity="0.6" />

    {/* Ground */}
    <path d="M0 120 Q25 115 50 118 Q75 113 100 117 Q125 114 150 118 Q175 115 200 118 L200 160 L0 160 Z" fill={`url(#systeem-ground)`} />
    <path d="M0 120 Q25 115 50 118 Q75 113 100 117 Q125 114 150 118 Q175 115 200 118" fill="none" stroke={`url(#systeem-grass)`} strokeWidth="2" />

    {/* Tree left — organic */}
    <rect x="19" y="96" width="4" height="24" rx="2" fill="#6B9E7E" />
    <path d="M21 72 Q12 80 11 90 Q10 98 17 100 Q20 101 21 96 Q23 101 26 100 Q32 98 31 90 Q30 80 21 72 Z" fill={`url(#systeem-foliageDark)`} />

    {/* Building with shadow */}
    <g filter={`url(#systeem-shadowGround)`}>
      {/* Bottom module row — alternating gradients */}
      <rect x="55" y="88" width="40" height="32" rx="1" fill={`url(#systeem-wallGreen)`} />
      <defs>
        <linearGradient id="systeem-moduleAlt" x1="0.3" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#4AA076" />
          <stop offset="100%" stopColor="#3D8A66" />
        </linearGradient>
      </defs>
      <rect x="97" y="88" width="40" height="32" rx="1" fill="url(#systeem-moduleAlt)" />

      {/* Module divider */}
      <line x1="96" y1="88" x2="96" y2="120" stroke="#E8F5EE" strokeWidth="1.5" />

      {/* Top module row — alternating */}
      <rect x="55" y="55" width="40" height="32" rx="1" fill="url(#systeem-moduleAlt)" />
      <rect x="97" y="55" width="40" height="32" rx="1" fill={`url(#systeem-wallGreen)`} />

      {/* Dividers */}
      <line x1="55" y1="87" x2="137" y2="87" stroke="#E8F5EE" strokeWidth="1.5" />
      <line x1="96" y1="55" x2="96" y2="87" stroke="#E8F5EE" strokeWidth="1.5" />

      {/* Flat roof cap */}
      <rect x="52" y="51" width="88" height="4" rx="1" fill="#583A85" />

      {/* Windows — glass gradient */}
      <rect x="63" y="96" width="10" height="8" rx="1" fill={`url(#systeem-glass)`} />
      <rect x="63" y="96" width="10" height="8" rx="1" stroke="#4AA076" strokeWidth="0.5" strokeOpacity="0.5" fill="none" />
      <rect x="78" y="96" width="10" height="8" rx="1" fill={`url(#systeem-glass)`} />
      <rect x="78" y="96" width="10" height="8" rx="1" stroke="#4AA076" strokeWidth="0.5" strokeOpacity="0.5" fill="none" />

      {/* Door */}
      <rect x="110" y="100" width="12" height="20" rx="1" fill={`url(#systeem-glass)`} />
      <rect x="110" y="100" width="12" height="20" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.5" fill="none" />
      <circle cx="119" cy="111" r="1.5" fill="#E8524A" />

      {/* Window bottom right */}
      <rect x="126" y="96" width="8" height="8" rx="1" fill={`url(#systeem-glass)`} />
      <rect x="126" y="96" width="8" height="8" rx="1" stroke="#4AA076" strokeWidth="0.5" strokeOpacity="0.5" fill="none" />

      {/* Top left windows */}
      <rect x="63" y="63" width="10" height="8" rx="1" fill={`url(#systeem-glass)`} />
      <rect x="63" y="63" width="10" height="8" rx="1" stroke="#4AA076" strokeWidth="0.5" strokeOpacity="0.5" fill="none" />
      <rect x="78" y="63" width="10" height="8" rx="1" fill={`url(#systeem-glass)`} />
      <rect x="78" y="63" width="10" height="8" rx="1" stroke="#4AA076" strokeWidth="0.5" strokeOpacity="0.5" fill="none" />

      {/* Top right windows */}
      <rect x="105" y="63" width="10" height="8" rx="1" fill={`url(#systeem-glass)`} />
      <rect x="105" y="63" width="10" height="8" rx="1" stroke="#4AA076" strokeWidth="0.5" strokeOpacity="0.5" fill="none" />
      <rect x="120" y="63" width="10" height="8" rx="1" fill={`url(#systeem-glass)`} />
      <rect x="120" y="63" width="10" height="8" rx="1" stroke="#4AA076" strokeWidth="0.5" strokeOpacity="0.5" fill="none" />
    </g>

    {/* Module connection indicators — glow */}
    <defs>
      <radialGradient id="systeem-glow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#F59A2C" />
        <stop offset="100%" stopColor="#E8524A" stopOpacity="0.3" />
      </radialGradient>
    </defs>
    <circle cx="96" cy="72" r="3" fill="url(#systeem-glow)" opacity="0.8" />
    <circle cx="96" cy="72" r="1.5" fill="#E8524A" />
    <circle cx="96" cy="104" r="3" fill="url(#systeem-glow)" opacity="0.8" />
    <circle cx="96" cy="104" r="1.5" fill="#E8524A" />

    {/* Tree right — organic */}
    <rect x="160" y="102" width="3" height="18" rx="1.5" fill="#6B9E7E" />
    <path d="M161 80 Q154 86 153 94 Q152 102 157 103 Q160 104 161 100 Q163 104 166 103 Q170 102 169 94 Q168 86 161 80 Z" fill={`url(#systeem-foliageLight)`} />

    {/* Ground details */}
    <ellipse cx="50" cy="128" rx="5" ry="2" fill="#4AA076" opacity="0.2" />
    <ellipse cx="150" cy="132" rx="4" ry="1.5" fill="#4AA076" opacity="0.2" />
  </svg>
);

export default IllustrationSysteemwoning;
