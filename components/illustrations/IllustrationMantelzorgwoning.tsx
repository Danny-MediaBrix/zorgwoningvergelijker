import React from "react";
import SharedDefs from "./svgDefs";

interface IllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationMantelzorgwoning: React.FC<IllustrationProps> = ({
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
    <SharedDefs id="mantel" />

    {/* Sky */}
    <rect width="200" height="160" rx="8" fill={`url(#mantel-sky)`} />

    {/* Clouds */}
    <path d="M36 24 Q42 16 50 18 Q56 14 62 18 Q66 22 60 26 Q52 28 42 26 Z" fill="white" opacity="0.6" />
    <path d="M128 20 Q134 14 142 16 Q148 12 152 16 Q156 20 148 22 Q140 24 132 22 Z" fill="white" opacity="0.5" />

    {/* Ground */}
    <path d="M0 118 Q25 113 50 116 Q75 111 100 115 Q125 112 150 116 Q175 113 200 116 L200 160 L0 160 Z" fill={`url(#mantel-ground)`} />
    <path d="M0 118 Q25 113 50 116 Q75 111 100 115 Q125 112 150 116 Q175 113 200 116" fill="none" stroke={`url(#mantel-grass)`} strokeWidth="2" />

    {/* Main (larger) house with shadow */}
    <g filter={`url(#mantel-shadowGround)`}>
      <rect x="15" y="58" width="80" height="62" rx="2" fill={`url(#mantel-wall)`} />
      <rect x="15" y="58" width="80" height="62" rx="2" stroke="#583A85" strokeWidth="1" strokeOpacity="0.3" fill="none" />

      {/* Main house roof */}
      <polygon points="10,60 55,32 100,60" fill="#583A85" />
      <polygon points="14,60 55,36 96,60" fill={`url(#mantel-roof)`} />

      {/* Chimney */}
      <rect x="72" y="38" width="7" height="16" rx="1" fill="#462D6B" />

      {/* Main house door */}
      <rect x="42" y="86" width="18" height="32" rx="2" fill={`url(#mantel-wallGreen)`} />
      <circle cx="55" cy="104" r="1.5" fill="white" opacity="0.6" />

      {/* Main house windows */}
      <rect x="22" y="68" width="16" height="14" rx="1" fill={`url(#mantel-glass)`} />
      <rect x="22" y="68" width="16" height="14" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="30" y1="68" x2="30" y2="82" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />
      <line x1="22" y1="75" x2="38" y2="75" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />

      <rect x="66" y="68" width="16" height="14" rx="1" fill={`url(#mantel-glass)`} />
      <rect x="66" y="68" width="16" height="14" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="74" y1="68" x2="74" y2="82" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />
      <line x1="66" y1="75" x2="82" y2="75" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />
    </g>

    {/* Connecting path */}
    <rect x="95" y="100" width="20" height="18" rx="0" fill={`url(#mantel-metal)`} opacity="0.5" />
    <rect x="95" y="98" width="20" height="4" rx="1" fill="#4AA076" opacity="0.4" />

    {/* Smaller care house with shadow */}
    <g filter={`url(#mantel-shadowGround)`}>
      <rect x="115" y="72" width="60" height="46" rx="2" fill={`url(#mantel-wall)`} />
      <rect x="115" y="72" width="60" height="46" rx="2" stroke="#583A85" strokeWidth="1" strokeOpacity="0.3" fill="none" />

      {/* Small house roof */}
      <polygon points="110,74 145,50 180,74" fill="#583A85" />
      <polygon points="114,74 145,54 176,74" fill={`url(#mantel-roof)`} />

      {/* Small house door */}
      <rect x="135" y="94" width="14" height="24" rx="2" fill={`url(#mantel-door)`} />
      <circle cx="145" cy="108" r="1.5" fill="white" opacity="0.6" />

      {/* Small house windows */}
      <rect x="122" y="80" width="12" height="10" rx="1" fill={`url(#mantel-glass)`} />
      <rect x="122" y="80" width="12" height="10" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="128" y1="80" x2="128" y2="90" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />

      <rect x="155" y="80" width="12" height="10" rx="1" fill={`url(#mantel-glass)`} />
      <rect x="155" y="80" width="12" height="10" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="161" y1="80" x2="161" y2="90" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />
    </g>

    {/* Heart symbol — radial gradient */}
    <defs>
      <radialGradient id="mantel-heart" cx="0.5" cy="0.4" r="0.6">
        <stop offset="0%" stopColor="#F59A2C" />
        <stop offset="100%" stopColor="#E8524A" />
      </radialGradient>
    </defs>
    <path
      d="M105,88 C105,84 100,82 100,86 C100,82 95,84 95,88 C95,92 100,96 100,96 C100,96 105,92 105,88Z"
      fill="url(#mantel-heart)"
      opacity="0.85"
    />

    {/* Bush left */}
    <path d="M2 116 Q6 108 12 110 Q18 108 20 114 Q22 118 14 120 Q6 120 2 116 Z" fill={`url(#mantel-foliageDark)`} opacity="0.7" />

    {/* Garden path stones */}
    <ellipse cx="50" cy="126" rx="8" ry="2" fill="#D1D5DB" opacity="0.5" />
    <ellipse cx="72" cy="132" rx="6" ry="2" fill="#D1D5DB" opacity="0.4" />

    {/* Flowers right */}
    <circle cx="182" cy="114" r="3" fill="#E8524A" opacity="0.6" />
    <circle cx="188" cy="116" r="2.5" fill="#F59A2C" opacity="0.5" />
    <rect x="183" y="116" width="1.5" height="6" fill="#4AA076" />
    <rect x="189" y="118" width="1.5" height="5" fill="#4AA076" />
  </svg>
);

export default IllustrationMantelzorgwoning;
