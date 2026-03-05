import React from "react";
import SharedDefs from "./svgDefs";

interface IllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationWoonunit: React.FC<IllustrationProps> = ({
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
    <SharedDefs id="woonunit" />

    {/* Sky */}
    <rect width="200" height="160" rx="8" fill={`url(#woonunit-sky)`} />

    {/* Clouds */}
    <path d="M40 24 Q48 16 56 18 Q62 14 68 18 Q72 22 66 26 Q58 28 46 26 Z" fill="white" opacity="0.6" />
    <path d="M132 20 Q138 14 146 16 Q150 12 156 16 Q158 14 158 20 Q154 24 142 22 Q134 24 132 20 Z" fill="white" opacity="0.5" />

    {/* Ground */}
    <path d="M0 118 Q25 113 50 116 Q75 111 100 115 Q125 112 150 116 Q175 113 200 116 L200 160 L0 160 Z" fill={`url(#woonunit-ground)`} />
    <path d="M0 118 Q25 113 50 116 Q75 111 100 115 Q125 112 150 116 Q175 113 200 116" fill="none" stroke={`url(#woonunit-grass)`} strokeWidth="2" />

    {/* Unit with shadow */}
    <g filter={`url(#woonunit-shadowGround)`}>
      {/* Body */}
      <rect x="55" y="62" width="80" height="56" rx="3" fill={`url(#woonunit-wallGreen)`} />

      {/* Flat roof with overhang */}
      <rect x="50" y="57" width="90" height="7" rx="2" fill={`url(#woonunit-roof)`} />

      {/* Accent stripe — gradient */}
      <defs>
        <linearGradient id="woonunit-stripe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F59A2C" />
          <stop offset="100%" stopColor="#E8524A" />
        </linearGradient>
      </defs>
      <rect x="55" y="64" width="80" height="3" fill="url(#woonunit-stripe)" />

      {/* Large window */}
      <rect x="62" y="74" width="30" height="22" rx="2" fill={`url(#woonunit-glass)`} />
      <rect x="62" y="74" width="30" height="22" rx="2" stroke="#4AA076" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="77" y1="74" x2="77" y2="96" stroke="#4AA076" strokeWidth="0.3" opacity="0.3" />
      <line x1="62" y1="85" x2="92" y2="85" stroke="#4AA076" strokeWidth="0.3" opacity="0.3" />

      {/* Small high window */}
      <rect x="98" y="74" width="12" height="8" rx="1" fill={`url(#woonunit-glass)`} />
      <rect x="98" y="74" width="12" height="8" rx="1" stroke="#4AA076" strokeWidth="0.5" strokeOpacity="0.5" fill="none" />

      {/* Awning over door */}
      <line x1="98" y1="88" x2="118" y2="88" stroke="#4AA076" strokeWidth="2" />
      <line x1="98" y1="88" x2="96" y2="85" stroke="#4AA076" strokeWidth="1.5" />
      <line x1="118" y1="88" x2="120" y2="85" stroke="#4AA076" strokeWidth="1.5" />

      {/* Door */}
      <rect x="100" y="90" width="16" height="28" rx="2" fill={`url(#woonunit-glass)`} />
      <rect x="100" y="90" width="16" height="28" rx="2" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.5" fill="none" />
      <rect x="102" y="92" width="12" height="12" rx="1" fill="#4AA076" opacity="0.15" />
      <circle cx="112" cy="108" r="1.5" fill="#E8524A" />

      {/* Entry step */}
      <rect x="98" y="118" width="20" height="4" rx="1" fill={`url(#woonunit-metal)`} />

      {/* House number */}
      <rect x="120" y="72" width="8" height="8" rx="1" fill={`url(#woonunit-door)`} />
    </g>

    {/* Tree left — organic */}
    <rect x="21" y="94" width="4" height="24" rx="2" fill="#6B9E7E" />
    <path d="M23 70 Q14 78 13 88 Q12 96 19 98 Q22 99 23 94 Q25 99 28 98 Q34 96 33 88 Q32 78 23 70 Z" fill={`url(#woonunit-foliageDark)`} />

    {/* Bush right — organic */}
    <path d="M150 114 Q156 106 164 108 Q172 106 176 112 Q178 116 168 118 Q158 120 150 114 Z" fill={`url(#woonunit-foliageLight)`} opacity="0.7" />
    <path d="M160 112 Q164 106 170 108 Q176 106 178 112 Q176 116 170 116 Q162 116 160 112 Z" fill={`url(#woonunit-foliageDark)`} opacity="0.5" />

    {/* Path */}
    <rect x="104" y="122" width="10" height="16" rx="1" fill="#D1D5DB" opacity="0.4" />

    {/* Ground details */}
    <ellipse cx="70" cy="130" rx="4" ry="1.5" fill="#4AA076" opacity="0.2" />
  </svg>
);

export default IllustrationWoonunit;
