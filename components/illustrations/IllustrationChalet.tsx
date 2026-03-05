import React from "react";
import SharedDefs from "./svgDefs";

interface IllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationChalet: React.FC<IllustrationProps> = ({
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
    <SharedDefs id="chalet" />

    {/* Sky */}
    <rect width="200" height="160" rx="8" fill={`url(#chalet-sky)`} />

    {/* Mountains — multi-stop gradient */}
    <defs>
      <linearGradient id="chalet-mountain1" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#D1D5DB" />
        <stop offset="40%" stopColor="#E4E6EB" />
        <stop offset="100%" stopColor="#E8F0F8" />
      </linearGradient>
      <linearGradient id="chalet-mountain2" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#C2E8D0" />
        <stop offset="100%" stopColor="#E8F5EE" />
      </linearGradient>
    </defs>
    <polygon points="0,100 40,50 80,90 100,55 140,85 170,45 200,100" fill="url(#chalet-mountain1)" />
    <polygon points="0,100 30,65 70,95 110,60 150,90 200,70 200,100" fill="url(#chalet-mountain2)" opacity="0.7" />

    {/* Snow caps */}
    <polygon points="40,50 35,60 45,60" fill="white" opacity="0.9" />
    <polygon points="170,45 164,57 176,57" fill="white" opacity="0.9" />

    {/* Ground */}
    <path d="M0 118 Q30 113 60 116 Q90 112 120 116 Q150 113 180 117 Q190 114 200 117 L200 160 L0 160 Z" fill={`url(#chalet-ground)`} />
    <path d="M0 118 Q30 113 60 116 Q90 112 120 116 Q150 113 180 117 Q190 114 200 117" fill="none" stroke={`url(#chalet-grass)`} strokeWidth="2" />

    {/* Pine tree left — layered triangle paths */}
    <rect x="17" y="92" width="5" height="28" rx="2" fill="#462D6B" />
    <path d="M20 55 L10 72 L14 70 L6 88 L12 86 L8 96 L32 96 L28 86 L34 88 L26 70 L30 72 Z" fill={`url(#chalet-foliageDark)`} />
    <path d="M20 58 L12 72 L15 70 L9 84 L14 82 L10 92 L30 92 L26 82 L31 84 L25 70 L28 72 Z" fill={`url(#chalet-foliageLight)`} opacity="0.7" />

    {/* Pine tree right — layered */}
    <rect x="176" y="94" width="4" height="24" rx="2" fill="#462D6B" />
    <path d="M178 58 L168 74 L172 72 L164 88 L170 86 L166 98 L190 98 L186 86 L192 88 L184 72 L188 74 Z" fill={`url(#chalet-foliageDark)`} />
    <path d="M178 62 L170 74 L173 72 L167 86 L172 84 L168 94 L188 94 L184 84 L189 86 L183 72 L186 74 Z" fill={`url(#chalet-foliageLight)`} opacity="0.7" />

    {/* Chalet with shadow */}
    <g filter={`url(#chalet-shadowGround)`}>
      {/* Lower floor — warm wood */}
      <defs>
        <linearGradient id="chalet-woodWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4A574" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C4956A" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <rect x="45" y="82" width="110" height="38" rx="1" fill="url(#chalet-woodWall)" />
      <rect x="45" y="82" width="110" height="38" rx="1" stroke="#C4956A" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />

      {/* Wood texture lines */}
      <line x1="45" y1="90" x2="155" y2="90" stroke="#C4956A" strokeWidth="0.3" opacity="0.3" />
      <line x1="45" y1="98" x2="155" y2="98" stroke="#C4956A" strokeWidth="0.3" opacity="0.3" />
      <line x1="45" y1="106" x2="155" y2="106" stroke="#C4956A" strokeWidth="0.3" opacity="0.3" />
      <line x1="45" y1="114" x2="155" y2="114" stroke="#C4956A" strokeWidth="0.3" opacity="0.3" />

      {/* A-frame roof */}
      <polygon points="38,84 100,30 162,84" fill="#583A85" />
      <polygon points="42,84 100,34 158,84" fill={`url(#chalet-roof)`} />

      {/* Roof edge */}
      <line x1="38" y1="84" x2="162" y2="84" stroke="#583A85" strokeWidth="2" />

      {/* Upper triangle window */}
      <polygon points="90,56 100,42 110,56" fill={`url(#chalet-glass)`} stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.5" />

      {/* Balcony */}
      <rect x="55" y="82" width="90" height="3" rx="0" fill="#583A85" />

      {/* Balcony railing */}
      <line x1="55" y1="78" x2="145" y2="78" stroke="#583A85" strokeWidth="1.2" />
      <line x1="55" y1="78" x2="55" y2="82" stroke="#583A85" strokeWidth="1" />
      <line x1="65" y1="78" x2="65" y2="82" stroke="#583A85" strokeWidth="0.6" />
      <line x1="75" y1="78" x2="75" y2="82" stroke="#583A85" strokeWidth="0.6" />
      <line x1="85" y1="78" x2="85" y2="82" stroke="#583A85" strokeWidth="0.6" />
      <line x1="95" y1="78" x2="95" y2="82" stroke="#583A85" strokeWidth="0.6" />
      <line x1="105" y1="78" x2="105" y2="82" stroke="#583A85" strokeWidth="0.6" />
      <line x1="115" y1="78" x2="115" y2="82" stroke="#583A85" strokeWidth="0.6" />
      <line x1="125" y1="78" x2="125" y2="82" stroke="#583A85" strokeWidth="0.6" />
      <line x1="135" y1="78" x2="135" y2="82" stroke="#583A85" strokeWidth="0.6" />
      <line x1="145" y1="78" x2="145" y2="82" stroke="#583A85" strokeWidth="1" />

      {/* Balcony doors */}
      <rect x="70" y="60" width="12" height="22" rx="1" fill={`url(#chalet-glass)`} stroke="#583A85" strokeWidth="0.5" strokeOpacity="0.5" />
      <rect x="118" y="60" width="12" height="22" rx="1" fill={`url(#chalet-glass)`} stroke="#583A85" strokeWidth="0.5" strokeOpacity="0.5" />

      {/* Lower door */}
      <rect x="90" y="96" width="20" height="24" rx="2" fill={`url(#chalet-door)`} />
      <circle cx="106" cy="110" r="1.5" fill="white" opacity="0.6" />

      {/* Lower windows */}
      <rect x="52" y="92" width="14" height="12" rx="1" fill={`url(#chalet-glass)`} />
      <rect x="52" y="92" width="14" height="12" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.5" fill="none" />
      <line x1="59" y1="92" x2="59" y2="104" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />

      <rect x="134" y="92" width="14" height="12" rx="1" fill={`url(#chalet-glass)`} />
      <rect x="134" y="92" width="14" height="12" rx="1" stroke="#583A85" strokeWidth="0.6" strokeOpacity="0.5" fill="none" />
      <line x1="141" y1="92" x2="141" y2="104" stroke="#583A85" strokeWidth="0.3" opacity="0.3" />
    </g>
  </svg>
);

export default IllustrationChalet;
