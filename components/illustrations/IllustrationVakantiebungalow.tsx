import React from "react";
import SharedDefs from "./svgDefs";

interface IllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationVakantiebungalow: React.FC<IllustrationProps> = ({
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
    <SharedDefs id="bungalow" />

    {/* Sky */}
    <rect width="200" height="160" rx="8" fill={`url(#bungalow-sky)`} />

    {/* Sun */}
    <circle cx="168" cy="28" r="16" fill={`url(#bungalow-sun)`} opacity="0.3" />
    <circle cx="168" cy="28" r="9" fill="#FFF4E0" opacity="0.5" />

    {/* Clouds */}
    <path d="M34 26 Q40 18 50 20 Q56 16 62 20 Q66 24 60 28 Q52 30 40 28 Z" fill="white" opacity="0.6" />

    {/* Ground */}
    <path d="M0 116 Q25 111 50 114 Q75 109 100 113 Q125 110 150 114 Q175 111 200 114 L200 160 L0 160 Z" fill={`url(#bungalow-ground)`} />
    <path d="M0 116 Q25 111 50 114 Q75 109 100 113 Q125 110 150 114 Q175 111 200 114" fill="none" stroke={`url(#bungalow-grass)`} strokeWidth="2" />

    {/* Bungalow with shadow */}
    <g filter={`url(#bungalow-shadowGround)`}>
      {/* Body */}
      <rect x="25" y="78" width="140" height="40" rx="2" fill={`url(#bungalow-wall)`} />
      <rect x="25" y="78" width="140" height="40" rx="2" stroke="#583A85" strokeWidth="1" strokeOpacity="0.3" fill="none" />

      {/* Low pitch roof */}
      <polygon points="18,80 95,60 172,78 172,82 25,82" fill="#583A85" />
      <polygon points="22,80 95,62 168,79 168,81 26,81" fill={`url(#bungalow-roof)`} />

      {/* Door */}
      <rect x="85" y="88" width="18" height="28" rx="2" fill={`url(#bungalow-door)`} />
      <rect x="87" y="90" width="14" height="10" rx="1" fill="white" opacity="0.12" />
      <circle cx="98" cy="104" r="1.5" fill="white" opacity="0.6" />

      {/* Windows */}
      <rect x="32" y="86" width="18" height="14" rx="1" fill={`url(#bungalow-glass)`} />
      <rect x="32" y="86" width="18" height="14" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="41" y1="86" x2="41" y2="100" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />
      <line x1="32" y1="93" x2="50" y2="93" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />

      <rect x="56" y="86" width="18" height="14" rx="1" fill={`url(#bungalow-glass)`} />
      <rect x="56" y="86" width="18" height="14" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="65" y1="86" x2="65" y2="100" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />
      <line x1="56" y1="93" x2="74" y2="93" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />

      <rect x="114" y="86" width="18" height="14" rx="1" fill={`url(#bungalow-glass)`} />
      <rect x="114" y="86" width="18" height="14" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="123" y1="86" x2="123" y2="100" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />
      <line x1="114" y1="93" x2="132" y2="93" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />

      <rect x="138" y="86" width="18" height="14" rx="1" fill={`url(#bungalow-glass)`} />
      <rect x="138" y="86" width="18" height="14" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="147" y1="86" x2="147" y2="100" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />
      <line x1="138" y1="93" x2="156" y2="93" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />
    </g>

    {/* Patio area */}
    <rect x="25" y="116" width="60" height="10" rx="1" fill="#D1D5DB" opacity="0.3" />

    {/* Patio furniture with shadows */}
    <g filter={`url(#bungalow-shadowSoft)`}>
      {/* Chair 1 */}
      <rect x="32" y="110" width="8" height="8" rx="1" fill="#E8524A" opacity="0.5" />
      <rect x="32" y="108" width="8" height="3" rx="1" fill={`url(#bungalow-door)`} opacity="0.7" />
      {/* Table */}
      <rect x="46" y="112" width="12" height="2" rx="1" fill={`url(#bungalow-metal)`} opacity="0.6" />
      <rect x="51" y="114" width="2" height="6" rx="0.5" fill="#6B7280" opacity="0.4" />
      {/* Chair 2 */}
      <rect x="64" y="110" width="8" height="8" rx="1" fill="#E8524A" opacity="0.5" />
      <rect x="64" y="108" width="8" height="3" rx="1" fill={`url(#bungalow-door)`} opacity="0.7" />
    </g>

    {/* Plants right */}
    <path d="M172 112 Q176 104 182 106 Q188 104 190 110 Q192 114 184 116 Q176 116 172 112 Z" fill={`url(#bungalow-foliageDark)`} opacity="0.7" />

    {/* Flowers left */}
    <circle cx="14" cy="114" r="2" fill="#E8524A" opacity="0.5" />
    <circle cx="20" cy="112" r="2.5" fill="#F59A2C" opacity="0.4" />
    <rect x="14.5" y="116" width="1" height="4" fill="#4AA076" />
    <rect x="20.5" y="114" width="1" height="5" fill="#4AA076" />

    {/* Stepping stones */}
    <rect x="88" y="120" width="14" height="3" rx="1.5" fill="#D1D5DB" opacity="0.5" />
    <rect x="90" y="128" width="12" height="3" rx="1.5" fill="#D1D5DB" opacity="0.4" />
    <rect x="87" y="136" width="14" height="3" rx="1.5" fill="#D1D5DB" opacity="0.35" />
  </svg>
);

export default IllustrationVakantiebungalow;
