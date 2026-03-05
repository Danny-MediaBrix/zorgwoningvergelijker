import React from "react";
import SharedDefs from "./svgDefs";

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationNatuur: React.FC<Props> = ({
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
    <SharedDefs id="natuur" />

    {/* Background */}
    <rect width="200" height="160" rx="8" fill={`url(#natuur-sky)`} />

    {/* Sun with glow */}
    <circle cx="160" cy="30" r="18" fill={`url(#natuur-sun)`} opacity="0.3" />
    <circle cx="160" cy="30" r="10" fill="#FFBE6A" opacity="0.4" />
    <circle cx="160" cy="30" r="5" fill="#FFF4E0" opacity="0.6" />

    {/* Clouds */}
    <path d="M34 22 Q42 12 52 15 Q60 10 68 15 Q76 12 74 22 Q70 28 54 26 Q42 30 36 24 Z" fill="white" opacity="0.6" />
    <path d="M98 28 Q104 20 112 22 Q118 18 122 22 Q126 26 118 28 Q110 30 100 28 Z" fill="white" opacity="0.45" />

    {/* Background hills — organic */}
    <path d="M0 110 Q30 90 70 100 Q110 88 140 100 Q170 90 200 98 L200 115 L0 115 Z" fill="#D6F5E3" opacity="0.5" />

    {/* Ground */}
    <path d="M0 110 Q25 105 50 108 Q75 103 100 107 Q125 104 150 108 Q175 105 200 108 L200 160 L0 160 Z" fill={`url(#natuur-ground)`} />
    <path d="M0 110 Q25 105 50 108 Q75 103 100 107 Q125 104 150 108 Q175 105 200 108" fill="none" stroke={`url(#natuur-grass)`} strokeWidth="2" />

    {/* Large tree left — organic, full foliage */}
    <rect x="12" y="64" width="6" height="46" rx="3" fill="#6B9E7E" />
    <path d="M15 22 Q-2 34 -4 56 Q-6 72 6 76 Q12 78 15 72 Q20 78 26 76 Q36 72 34 56 Q32 34 15 22 Z" fill={`url(#natuur-foliageLight)`} />
    <path d="M12 32 Q2 42 1 58 Q0 70 8 72 Q13 74 15 68 Q18 74 24 72 Q32 70 30 58 Q28 42 18 32 Z" fill={`url(#natuur-foliageDark)`} opacity="0.7" />

    {/* Medium tree right — organic */}
    <rect x="163" y="60" width="5" height="48" rx="2" fill="#6B9E7E" />
    <path d="M166 26 Q152 36 150 54 Q148 68 158 72 Q164 74 166 66 Q170 74 176 72 Q184 68 182 54 Q180 36 166 26 Z" fill={`url(#natuur-foliageLight)`} />
    <path d="M168 34 Q158 42 156 56 Q154 68 162 70 Q166 72 168 64 Q170 72 176 70 Q182 68 180 56 Q178 42 168 34 Z" fill={`url(#natuur-foliageDark)`} opacity="0.7" />

    {/* Small tree far right — organic */}
    <rect x="186" y="84" width="3" height="24" rx="1.5" fill="#6B9E7E" />
    <path d="M187 62 Q180 68 179 78 Q178 86 183 87 Q186 88 187 84 Q189 88 192 87 Q196 86 195 78 Q194 68 187 62 Z" fill={`url(#natuur-foliageDark)`} />

    {/* House nestled in nature — with shadow */}
    <g filter={`url(#natuur-shadowGround)`}>
      <rect x="70" y="74" width="60" height="36" rx="2" fill={`url(#natuur-wall)`} />
      <rect x="70" y="74" width="60" height="36" rx="2" stroke="#583A85" strokeWidth="1" strokeOpacity="0.3" fill="none" />

      <polygon points="65,76 100,50 135,76" fill="#583A85" />
      <polygon points="69,76 100,54 131,76" fill={`url(#natuur-roof)`} />

      {/* Chimney with smoke */}
      <rect x="112" y="54" width="8" height="16" rx="1" fill="#462D6B" />
      <path d="M116 52 Q118 46 116 40" stroke="#B8BCC4" strokeWidth="1.5" fill="none" opacity="0.35" strokeLinecap="round" />
      <path d="M118 50 Q121 44 118 38" stroke="#B8BCC4" strokeWidth="1" fill="none" opacity="0.2" strokeLinecap="round" />

      {/* Door */}
      <rect x="94" y="86" width="14" height="24" rx="2" fill={`url(#natuur-door)`} />
      <circle cx="104" cy="98" r="1.5" fill="white" opacity="0.6" />

      {/* Windows */}
      <rect x="76" y="80" width="12" height="10" rx="1" fill={`url(#natuur-glass)`} />
      <rect x="76" y="80" width="12" height="10" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="82" y1="80" x2="82" y2="90" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />

      <rect x="114" y="80" width="12" height="10" rx="1" fill={`url(#natuur-glass)`} />
      <rect x="114" y="80" width="12" height="10" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="120" y1="80" x2="120" y2="90" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />
    </g>

    {/* Garden path */}
    <path d="M100 112 Q100 125 98 145" stroke="#D1D5DB" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.5" />

    {/* Bushes near house — organic */}
    <path d="M60 110 Q64 104 70 106 Q76 104 78 108 Q76 112 70 112 Q64 114 60 110 Z" fill={`url(#natuur-foliageDark)`} opacity="0.7" />
    <path d="M126 110 Q130 104 136 106 Q140 104 142 108 Q140 112 134 112 Q128 114 126 110 Z" fill={`url(#natuur-foliageLight)`} opacity="0.6" />

    {/* Flowers */}
    <circle cx="50" cy="112" r="2.5" fill="#E8524A" opacity="0.55" />
    <circle cx="44" cy="116" r="2" fill="#F59A2C" opacity="0.45" />
    <circle cx="150" cy="114" r="2" fill="#E8524A" opacity="0.55" />
    <circle cx="156" cy="118" r="1.5" fill="#F59A2C" opacity="0.45" />

    {/* Birds */}
    <path d="M40 35 Q45 30 50 35" stroke="#6B7280" strokeWidth="1.2" fill="none" opacity="0.5" />
    <path d="M55 30 Q60 25 65 30" stroke="#6B7280" strokeWidth="1.2" fill="none" opacity="0.5" />
    <path d="M130 18 Q134 14 138 18" stroke="#6B7280" strokeWidth="1" fill="none" opacity="0.4" />

    {/* Butterfly — gradient wings */}
    <defs>
      <linearGradient id="natuur-wing" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F59A2C" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#E8524A" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <ellipse cx="142" cy="90" rx="3.5" ry="2.5" fill="url(#natuur-wing)" transform="rotate(-20 142 90)" />
    <ellipse cx="146" cy="88" rx="3.5" ry="2.5" fill="url(#natuur-wing)" transform="rotate(20 146 88)" />
    <line x1="143" y1="90" x2="145" y2="88" stroke="#6B7280" strokeWidth="0.5" opacity="0.5" />
  </svg>
);

export default IllustrationNatuur;
