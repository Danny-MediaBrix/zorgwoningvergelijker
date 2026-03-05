import React from "react";
import SharedDefs from "./svgDefs";

interface IllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationContainerwoning: React.FC<IllustrationProps> = ({
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
    <SharedDefs id="container" />

    {/* Sky */}
    <rect width="200" height="160" rx="8" fill={`url(#container-sky)`} />

    {/* Clouds */}
    <path d="M26 22 Q32 14 42 16 Q48 12 54 16 Q58 20 52 24 Q44 26 32 24 Z" fill="white" opacity="0.6" />
    <path d="M148 28 Q154 20 164 22 Q172 18 176 24 Q180 22 178 28 Q172 34 160 32 Q150 34 148 28 Z" fill="white" opacity="0.5" />

    {/* Ground */}
    <path d="M0 118 Q25 113 50 116 Q75 111 100 115 Q125 112 150 116 Q175 113 200 116 L200 160 L0 160 Z" fill={`url(#container-ground)`} />
    <path d="M0 118 Q25 113 50 116 Q75 111 100 115 Q125 112 150 116 Q175 113 200 116" fill="none" stroke={`url(#container-grass)`} strokeWidth="2" />

    {/* Container with shadow */}
    <g filter={`url(#container-shadowGround)`}>
      {/* Container body — dark green gradient */}
      <defs>
        <linearGradient id="container-body" x1="0.3" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#583A85" />
          <stop offset="100%" stopColor="#134D36" />
        </linearGradient>
      </defs>
      <rect x="35" y="70" width="120" height="48" rx="2" fill="url(#container-body)" />

      {/* Corrugation lines — subtle */}
      <line x1="50" y1="70" x2="50" y2="118" stroke="#4AA076" strokeWidth="0.6" opacity="0.3" />
      <line x1="65" y1="70" x2="65" y2="118" stroke="#4AA076" strokeWidth="0.6" opacity="0.3" />
      <line x1="125" y1="70" x2="125" y2="118" stroke="#4AA076" strokeWidth="0.6" opacity="0.3" />
      <line x1="140" y1="70" x2="140" y2="118" stroke="#4AA076" strokeWidth="0.6" opacity="0.3" />

      {/* Top edge */}
      <rect x="33" y="67" width="124" height="5" rx="1" fill={`url(#container-roof)`} />

      {/* Large window left */}
      <rect x="42" y="78" width="28" height="20" rx="2" fill={`url(#container-glass)`} />
      <rect x="42" y="78" width="28" height="20" rx="2" stroke="#4AA076" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="56" y1="78" x2="56" y2="98" stroke="#4AA076" strokeWidth="0.3" opacity="0.3" />
      <line x1="42" y1="88" x2="70" y2="88" stroke="#4AA076" strokeWidth="0.3" opacity="0.3" />

      {/* Large window center */}
      <rect x="76" y="78" width="24" height="20" rx="2" fill={`url(#container-glass)`} />
      <rect x="76" y="78" width="24" height="20" rx="2" stroke="#4AA076" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="88" y1="78" x2="88" y2="98" stroke="#4AA076" strokeWidth="0.3" opacity="0.3" />

      {/* Door */}
      <rect x="112" y="78" width="16" height="40" rx="1" fill={`url(#container-door)`} />
      <rect x="114" y="80" width="12" height="16" rx="1" fill={`url(#container-glass)`} />
      <circle cx="123" cy="102" r="1.5" fill="white" opacity="0.6" />

      {/* Porthole window — radial glass */}
      <defs>
        <radialGradient id="container-porthole" cx="0.35" cy="0.35" r="0.65">
          <stop offset="0%" stopColor="#E8F4FF" />
          <stop offset="100%" stopColor="#D4EEFF" />
        </radialGradient>
      </defs>
      <circle cx="142" cy="88" r="6" fill="url(#container-porthole)" />
      <circle cx="142" cy="88" r="6" stroke="#4AA076" strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
      <circle cx="142" cy="88" r="4.5" stroke="#4AA076" strokeWidth="0.5" strokeOpacity="0.3" fill="none" />
    </g>

    {/* Foundation blocks — metallic */}
    <rect x="40" y="118" width="14" height="6" rx="1" fill={`url(#container-metal)`} />
    <rect x="80" y="118" width="14" height="6" rx="1" fill={`url(#container-metal)`} />
    <rect x="130" y="118" width="14" height="6" rx="1" fill={`url(#container-metal)`} />

    {/* Tree left — organic */}
    <rect x="13" y="92" width="4" height="26" rx="2" fill="#6B9E7E" />
    <path d="M15 68 Q6 76 5 86 Q4 94 11 96 Q14 97 15 92 Q17 97 20 96 Q26 94 25 86 Q24 76 15 68 Z" fill={`url(#container-foliageDark)`} />

    {/* Plant right — organic */}
    <rect x="170" y="106" width="3" height="12" rx="1.5" fill="#6B9E7E" />
    <path d="M171 90 Q164 96 163 102 Q162 108 167 109 Q170 110 171 106 Q173 110 176 109 Q180 108 179 102 Q178 96 171 90 Z" fill={`url(#container-foliageLight)`} />

    {/* Ground details */}
    <ellipse cx="95" cy="132" rx="6" ry="2" fill="#4AA076" opacity="0.2" />
  </svg>
);

export default IllustrationContainerwoning;
