import React from "react";
import SharedDefs from "./svgDefs";

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationHappyFamily: React.FC<Props> = ({
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
    <SharedDefs id="family" />

    {/* Background */}
    <rect width="200" height="160" rx="8" fill={`url(#family-sky)`} />

    {/* Sun */}
    <circle cx="170" cy="24" r="16" fill={`url(#family-sun)`} opacity="0.3" />
    <circle cx="170" cy="24" r="8" fill="#FFF4E0" opacity="0.5" />

    {/* Cloud */}
    <path d="M36 24 Q42 16 50 18 Q56 14 62 18 Q68 16 66 24 Q62 28 50 26 Q40 30 38 24 Z" fill="white" opacity="0.6" />

    {/* Ground */}
    <path d="M0 120 Q25 115 50 118 Q75 113 100 117 Q125 114 150 118 Q175 115 200 118 L200 160 L0 160 Z" fill={`url(#family-ground)`} />
    <path d="M0 120 Q25 115 50 118 Q75 113 100 117 Q125 114 150 118 Q175 115 200 118" fill="none" stroke={`url(#family-grass)`} strokeWidth="2" />

    {/* House with shadow */}
    <g filter={`url(#family-shadowGround)`}>
      <rect x="90" y="60" width="70" height="60" rx="2" fill={`url(#family-wall)`} />
      <rect x="90" y="60" width="70" height="60" rx="2" stroke="#583A85" strokeWidth="1" strokeOpacity="0.3" fill="none" />

      <polygon points="85,62 125,34 165,62" fill="#583A85" />
      <polygon points="89,62 125,38 161,62" fill={`url(#family-roof)`} />

      {/* Door */}
      <rect x="116" y="90" width="18" height="28" rx="2" fill={`url(#family-door)`} />
      <circle cx="130" cy="105" r="2" fill="white" opacity="0.6" />

      {/* Windows */}
      <rect x="98" y="72" width="14" height="12" rx="1" fill={`url(#family-glass)`} />
      <rect x="98" y="72" width="14" height="12" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="105" y1="72" x2="105" y2="84" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />
      <line x1="98" y1="78" x2="112" y2="78" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />

      <rect x="140" y="72" width="14" height="12" rx="1" fill={`url(#family-glass)`} />
      <rect x="140" y="72" width="14" height="12" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="147" y1="72" x2="147" y2="84" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />
    </g>

    {/* Adult 1 — organic */}
    <g>
      <circle cx="40" cy="88" r="10" fill="#E8524A" />
      <path d="M32 99 Q30 106 31 114 Q32 120 35 120 L37 120 Q38 114 37 106 L43 106 Q42 114 43 120 L46 120 Q47 114 46 106 Q50 102 48 99 Q46 98 40 98 Q34 98 32 99 Z" fill="#583A85" />
      {/* Arm waving */}
      <path d="M48 102 Q54 96 58 92" stroke="#583A85" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </g>

    {/* Adult 2 — organic */}
    <g>
      <circle cx="68" cy="90" r="9" fill="#E8524A" />
      <path d="M61 100 Q59 106 60 114 Q61 118 63 118 L65 118 Q66 112 65 106 L71 106 Q70 112 71 118 L73 118 Q74 112 73 106 Q76 103 75 100 Q73 99 68 99 Q63 99 61 100 Z" fill="#4AA076" />
      {/* Arm reaching */}
      <path d="M75 104 Q78 106 80 108" stroke="#4AA076" strokeWidth="3" strokeLinecap="round" fill="none" />
    </g>

    {/* Child — organic */}
    <g>
      <circle cx="82" cy="102" r="6" fill="#F59A2C" />
      <path d="M77 109 Q76 113 77 120 Q78 122 79 122 L80 122 Q81 118 80 114 L84 114 Q83 118 84 122 L85 122 Q86 118 85 114 Q88 112 87 109 Q86 108 82 108 Q78 108 77 109 Z" fill="#E8524A" opacity="0.85" />
    </g>

    {/* Hearts — radial gradient */}
    <defs>
      <radialGradient id="family-heart" cx="0.5" cy="0.4" r="0.6">
        <stop offset="0%" stopColor="#F59A2C" />
        <stop offset="100%" stopColor="#E8524A" />
      </radialGradient>
    </defs>
    <path d="M55 78 C55 75 58 73 60 75.5 C62 73 65 75 65 78 C65 82 60 85 60 85 C60 85 55 82 55 78Z" fill="url(#family-heart)" opacity="0.4" />
    <path d="M72 76 C72 74 74 73 75 74.2 C76 73 78 74 78 76 C78 78 75 80 75 80 C75 80 72 78 72 76Z" fill="url(#family-heart)" opacity="0.3" />

    {/* Confetti — gradient fills */}
    <circle cx="30" cy="70" r="2" fill="#E8524A" opacity="0.45" />
    <circle cx="45" cy="72" r="1.5" fill="#4AA076" opacity="0.45" />
    <rect x="52" y="68" width="4" height="4" rx="1" fill="#F59A2C" opacity="0.35" transform="rotate(20 54 70)" />
    <circle cx="76" cy="68" r="1.5" fill="#583A85" opacity="0.35" />

    {/* Bushes — organic */}
    <path d="M84 120 Q88 114 94 116 Q100 114 102 118 Q100 122 92 122 Q86 122 84 120 Z" fill={`url(#family-foliageDark)`} opacity="0.7" />
    <path d="M152 120 Q156 114 162 116 Q166 114 168 118 Q166 122 160 122 Q154 122 152 120 Z" fill={`url(#family-foliageLight)`} opacity="0.6" />

    {/* Tree — organic */}
    <rect x="176" y="94" width="4" height="26" rx="2" fill="#6B9E7E" />
    <path d="M178 70 Q168 78 167 88 Q166 96 174 98 Q177 99 178 94 Q180 99 183 98 Q190 96 189 88 Q188 78 178 70 Z" fill={`url(#family-foliageDark)`} />
  </svg>
);

export default IllustrationHappyFamily;
