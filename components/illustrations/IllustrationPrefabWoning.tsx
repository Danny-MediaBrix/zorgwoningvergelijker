import React from "react";
import SharedDefs from "./svgDefs";

interface IllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationPrefabWoning: React.FC<IllustrationProps> = ({
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
    <SharedDefs id="prefab" />

    {/* Sky */}
    <rect width="200" height="160" rx="8" fill={`url(#prefab-sky)`} />

    {/* Clouds */}
    <path d="M32 28 Q38 18 48 20 Q54 16 60 20 Q66 18 64 26 Q60 32 48 30 Q38 34 34 28 Z" fill="white" opacity="0.6" />
    <path d="M138 32 Q142 24 150 26 Q156 22 160 26 Q164 30 156 32 Q148 34 140 32 Z" fill="white" opacity="0.5" />

    {/* Ground */}
    <path d="M0 120 Q25 115 50 118 Q75 113 100 117 Q125 114 150 118 Q175 115 200 118 L200 160 L0 160 Z" fill={`url(#prefab-ground)`} />
    <path d="M0 120 Q25 115 50 118 Q75 113 100 117 Q125 114 150 118 Q175 115 200 118" fill="none" stroke={`url(#prefab-grass)`} strokeWidth="2" />

    {/* Tree left — organic */}
    <rect x="15" y="94" width="4" height="26" rx="2" fill="#6B9E7E" />
    <path d="M17 68 Q8 76 7 86 Q6 94 13 96 Q16 97 17 92 Q19 97 22 96 Q28 94 27 86 Q26 76 17 68 Z" fill={`url(#prefab-foliageDark)`} />

    {/* House base — already placed section */}
    <g filter={`url(#prefab-shadowGround)`}>
      <rect x="55" y="72" width="60" height="48" rx="2" fill={`url(#prefab-wallGreen)`} />

      {/* Roof */}
      <polygon points="50,72 85,50 120,72" fill={`url(#prefab-roof)`} />

      {/* Door */}
      <rect x="78" y="96" width="14" height="24" rx="2" fill={`url(#prefab-glass)`} />
      <rect x="78" y="96" width="14" height="24" rx="2" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.5" fill="none" />
      <circle cx="89" cy="109" r="1.5" fill="#E8524A" />

      {/* Window */}
      <rect x="62" y="82" width="12" height="10" rx="1" fill={`url(#prefab-glass)`} />
      <rect x="62" y="82" width="12" height="10" rx="1" stroke="#4AA076" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
      <line x1="68" y1="82" x2="68" y2="92" stroke="#4AA076" strokeWidth="0.3" opacity="0.3" />
      <line x1="62" y1="87" x2="74" y2="87" stroke="#4AA076" strokeWidth="0.3" opacity="0.3" />
    </g>

    {/* Floating panel being placed — with soft shadow */}
    <g filter={`url(#prefab-shadowSoft)`}>
      <rect x="100" y="80" width="14" height="22" rx="1" fill={`url(#prefab-door)`} opacity="0.9" />
      <rect x="104" y="84" width="6" height="6" rx="1" fill={`url(#prefab-glass)`} />
      <line x1="100" y1="102" x2="114" y2="102" stroke="#E8524A" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
    </g>

    {/* Crane arm — metallic gradient */}
    <line x1="107" y1="30" x2="107" y2="78" stroke={`url(#prefab-metal)`} strokeWidth="2.5" />
    <line x1="90" y1="30" x2="130" y2="30" stroke="#6B7280" strokeWidth="2.5" />
    <rect x="88" y="28" width="44" height="4" rx="1" fill={`url(#prefab-metal)`} />
    <line x1="130" y1="25" x2="130" y2="35" stroke="#6B7280" strokeWidth="2" />

    {/* Crane cable */}
    <line x1="107" y1="34" x2="107" y2="78" stroke="#9CA3AF" strokeWidth="0.8" strokeDasharray="3 2" />

    {/* Small tree right — organic */}
    <rect x="170" y="104" width="3" height="16" rx="1.5" fill="#6B9E7E" />
    <path d="M171 84 Q164 90 163 98 Q162 104 167 105 Q170 106 171 102 Q173 106 176 105 Q180 104 179 98 Q178 90 171 84 Z" fill={`url(#prefab-foliageLight)`} />

    {/* Ground details */}
    <ellipse cx="140" cy="125" rx="6" ry="2" fill="#4AA076" opacity="0.2" />
    <ellipse cx="40" cy="130" rx="4" ry="1.5" fill="#4AA076" opacity="0.2" />
  </svg>
);

export default IllustrationPrefabWoning;
