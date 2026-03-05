import React from "react";
import SharedDefs from "./svgDefs";

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationBesparing: React.FC<Props> = ({
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
    <SharedDefs id="bespaar" />

    {/* Background */}
    <rect width="200" height="160" rx="8" fill={`url(#bespaar-sky)`} />

    {/* Ground */}
    <path d="M0 136 Q50 131 100 134 Q150 131 200 134 L200 160 L0 160 Z" fill={`url(#bespaar-ground)`} />

    {/* Piggy bank — radial 3D gradient */}
    <defs>
      <radialGradient id="bespaar-piggy" cx="0.35" cy="0.35" r="0.7">
        <stop offset="0%" stopColor="#F5C99A" stopOpacity="0.5" />
        <stop offset="40%" stopColor="#E8A66A" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#E8524A" stopOpacity="0.25" />
      </radialGradient>
      <radialGradient id="bespaar-piggyInner" cx="0.35" cy="0.35" r="0.65">
        <stop offset="0%" stopColor="#F5C99A" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#E8524A" stopOpacity="0.35" />
      </radialGradient>
    </defs>
    <ellipse cx="80" cy="90" rx="40" ry="30" fill="url(#bespaar-piggy)" />
    <ellipse cx="80" cy="90" rx="36" ry="27" fill="url(#bespaar-piggyInner)" />

    {/* Piggy snout */}
    <ellipse cx="116" cy="88" rx="8" ry="6" fill="#E8524A" opacity="0.4" />
    <circle cx="114" cy="86" r="1.5" fill="#E8524A" opacity="0.6" />
    <circle cx="118" cy="86" r="1.5" fill="#E8524A" opacity="0.6" />

    {/* Piggy ear */}
    <ellipse cx="70" cy="65" rx="8" ry="6" fill="#E8524A" opacity="0.35" transform="rotate(-15 70 65)" />

    {/* Piggy eye */}
    <circle cx="96" cy="80" r="2.5" fill="#583A85" />
    <circle cx="97" cy="79" r="1" fill="white" />

    {/* Piggy legs */}
    <rect x="56" y="112" width="8" height="12" rx="3" fill="#E8524A" opacity="0.3" />
    <rect x="68" y="114" width="8" height="10" rx="3" fill="#E8524A" opacity="0.3" />
    <rect x="88" y="114" width="8" height="10" rx="3" fill="#E8524A" opacity="0.3" />
    <rect x="100" y="112" width="8" height="12" rx="3" fill="#E8524A" opacity="0.3" />

    {/* Coin slot */}
    <rect x="72" y="62" width="16" height="3" rx="1.5" fill="#583A85" />

    {/* Coins — metallic gradient */}
    <defs>
      <linearGradient id="bespaar-coin" x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="#F5C542" />
        <stop offset="100%" stopColor="#E8A820" />
      </linearGradient>
    </defs>
    <g filter={`url(#bespaar-shadowSoft)`}>
      <ellipse cx="80" cy="50" rx="8" ry="3" fill="url(#bespaar-coin)" />
      <ellipse cx="80" cy="50" rx="5" ry="1.5" fill="white" opacity="0.3" />
    </g>
    <ellipse cx="72" cy="40" rx="7" ry="2.5" fill="url(#bespaar-coin)" opacity="0.8" />
    <ellipse cx="88" cy="36" rx="6" ry="2.5" fill="url(#bespaar-coin)" opacity="0.7" />

    {/* Coin motion lines */}
    <line x1="80" y1="55" x2="80" y2="58" stroke="#E8524A" strokeWidth="1" opacity="0.3" />
    <line x1="72" y1="44" x2="72" y2="47" stroke="#E8524A" strokeWidth="1" opacity="0.3" />

    {/* House icon — top right, with shadow */}
    <g filter={`url(#bespaar-shadowSoft)`}>
      <rect x="144" y="36" width="40" height="30" rx="2" fill={`url(#bespaar-wall)`} />
      <rect x="144" y="36" width="40" height="30" rx="2" stroke="#583A85" strokeWidth="1" strokeOpacity="0.3" fill="none" />
      <polygon points="140,38 164,18 188,38" fill="#583A85" />
      <polygon points="143,38 164,21 185,38" fill={`url(#bespaar-roof)`} />
      <rect x="158" y="48" width="12" height="16" rx="2" fill={`url(#bespaar-door)`} />
      <circle cx="166" cy="56" r="1.5" fill="white" opacity="0.6" />
      <rect x="148" y="44" width="8" height="8" rx="1" fill={`url(#bespaar-glass)`} />
      <rect x="148" y="44" width="8" height="8" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.5" fill="none" />
    </g>

    {/* Arrow connecting */}
    <line x1="124" y1="56" x2="138" y2="46" stroke="#6B7280" strokeWidth="1.5" strokeDasharray="3 2" />
    <polygon points="138,43 141,46 137,48" fill="#6B7280" />

    {/* Savings percentage badge */}
    <defs>
      <radialGradient id="bespaar-badge" cx="0.4" cy="0.4" r="0.6">
        <stop offset="0%" stopColor="#5BBF8E" />
        <stop offset="100%" stopColor="#4AA076" />
      </radialGradient>
    </defs>
    <circle cx="164" cy="80" r="14" fill="url(#bespaar-badge)" />
    <text x="164" y="83" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">%</text>

    {/* Down arrow */}
    <line x1="164" y1="96" x2="164" y2="108" stroke="#4AA076" strokeWidth="2" />
    <polygon points="158,106 164,114 170,106" fill="#4AA076" />

    {/* Euro signs */}
    <text x="28" y="36" fill="#4AA076" fontSize="12" opacity="0.3" fontWeight="bold">&euro;</text>
    <text x="140" y="126" fill="#4AA076" fontSize="10" opacity="0.25" fontWeight="bold">&euro;</text>
    <text x="170" y="140" fill="#583A85" fontSize="14" opacity="0.25" fontWeight="bold">&euro;</text>

    {/* Sparkle stars */}
    <circle cx="120" cy="26" r="2" fill="#F59A2C" opacity="0.35" />
    <circle cx="40" cy="30" r="1.5" fill="#4AA076" opacity="0.35" />
    <circle cx="186" cy="110" r="1.5" fill="#E8524A" opacity="0.35" />
  </svg>
);

export default IllustrationBesparing;
