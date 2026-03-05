import React from "react";
import SharedDefs from "./svgDefs";

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationConfigureer: React.FC<Props> = ({
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
    <SharedDefs id="config" />

    {/* Background */}
    <rect width="200" height="160" rx="8" fill={`url(#config-sky)`} />

    {/* Ground hint */}
    <path d="M0 140 Q40 135 80 138 Q120 133 160 137 Q180 135 200 138 L200 160 L0 160 Z" fill={`url(#config-ground)`} />
    <path d="M0 140 Q40 135 80 138 Q120 133 160 137 Q180 135 200 138" fill="none" stroke={`url(#config-grass)`} strokeWidth="1.5" />

    {/* Tablet / screen with shadow */}
    <g filter={`url(#config-shadowSoft)`}>
      <rect x="50" y="20" width="100" height="72" rx="6" fill={`url(#config-metal)`} />
      <rect x="54" y="24" width="92" height="62" rx="3" fill="white" />
      {/* Inner screen subtle shadow */}
      <rect x="54" y="24" width="92" height="4" rx="2" fill="#E8F0F8" opacity="0.5" />
    </g>

    {/* House being configured on screen */}
    <polygon points="72,52 100,34 128,52" fill={`url(#config-roof)`} opacity="0.7" />
    <rect x="78" y="52" width="44" height="30" rx="1" fill={`url(#config-wall)`} stroke="#583A85" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="3 2" />

    {/* Configurable modules highlighted */}
    <rect x="78" y="52" width="20" height="15" rx="1" fill="#583A85" opacity="0.2" />
    <rect x="102" y="52" width="20" height="15" rx="1" fill="#E8524A" opacity="0.3" />

    {/* Door on screen */}
    <rect x="94" y="66" width="12" height="16" rx="1" fill={`url(#config-door)`} opacity="0.7" />

    {/* Plus icons with subtle shadows */}
    <g filter={`url(#config-shadowSoft)`}>
      <circle cx="136" cy="45" r="6" fill="#FFF0E0" />
      <line x1="136" y1="42" x2="136" y2="48" stroke="#E8524A" strokeWidth="1.5" />
      <line x1="133" y1="45" x2="139" y2="45" stroke="#E8524A" strokeWidth="1.5" />
    </g>
    <g filter={`url(#config-shadowSoft)`}>
      <circle cx="136" cy="60" r="6" fill="#E8F5EE" />
      <line x1="136" y1="57" x2="136" y2="63" stroke="#4AA076" strokeWidth="1.5" />
      <line x1="133" y1="60" x2="139" y2="60" stroke="#4AA076" strokeWidth="1.5" />
    </g>

    {/* Slider controls on screen */}
    <rect x="60" y="72" width="36" height="3" rx="1.5" fill="#E4E6EB" />
    <rect x="60" y="72" width="18" height="3" rx="1.5" fill="#E8524A" opacity="0.3" />
    <circle cx="78" cy="73.5" r="3" fill={`url(#config-door)`} />
    <rect x="60" y="79" width="36" height="3" rx="1.5" fill="#E4E6EB" />
    <rect x="60" y="79" width="12" height="3" rx="1.5" fill="#4AA076" opacity="0.3" />
    <circle cx="72" cy="80.5" r="3" fill="#4AA076" />

    {/* Tablet home button */}
    <circle cx="100" cy="95" r="2" fill="#D1D5DB" />

    {/* Person sitting and configuring — organic */}
    <g>
      <circle cx="34" cy="79" r="9" fill="#E8524A" />
      <path d="M26 89 Q24 95 25 104 Q26 108 29 108 L31 108 Q32 102 31 96 L37 96 Q36 102 37 108 L40 108 Q41 102 40 96 Q44 92 42 89 Q40 88 34 88 Q28 88 26 89 Z" fill="#583A85" />
      {/* Arm reaching to tablet */}
      <path d="M42 93 Q48 86 54 78" stroke="#583A85" strokeWidth="3" strokeLinecap="round" fill="none" />
    </g>

    {/* Chair */}
    <rect x="24" y="106" width="20" height="3" rx="1" fill={`url(#config-metal)`} />
    <rect x="24" y="89" width="3" height="20" rx="1" fill="#6B7280" />
    <rect x="26" y="109" width="3" height="10" rx="1" fill="#6B7280" />
    <rect x="39" y="109" width="3" height="10" rx="1" fill="#6B7280" />

    {/* Legs */}
    <path d="M28 108 Q27 114 28 119 Q29 120 31 120 Q32 114 31 108 Z" fill="#583A85" />
    <path d="M35 108 Q34 114 35 119 Q36 120 38 120 Q39 114 38 108 Z" fill="#583A85" />

    {/* Floating card — with soft shadow */}
    <g filter={`url(#config-shadowSoft)`}>
      <rect x="158" y="30" width="24" height="18" rx="3" fill="white" />
      <rect x="158" y="30" width="24" height="18" rx="3" stroke="#4AA076" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />
      <rect x="162" y="34" width="7" height="4" rx="1" fill="#4AA076" />
      <rect x="162" y="40" width="16" height="2" rx="1" fill="#E4E6EB" />
      <rect x="162" y="44" width="12" height="2" rx="1" fill="#E4E6EB" />
    </g>

    {/* Gear icon with gradient */}
    <g opacity="0.6">
      <circle cx="170" cy="64" r="8" fill="none" stroke="#6B7280" strokeWidth="1.5" />
      <circle cx="170" cy="64" r="3" fill="none" stroke="#6B7280" strokeWidth="1.5" />
      <line x1="170" y1="54" x2="170" y2="57" stroke="#6B7280" strokeWidth="2" />
      <line x1="170" y1="71" x2="170" y2="74" stroke="#6B7280" strokeWidth="2" />
      <line x1="160" y1="64" x2="163" y2="64" stroke="#6B7280" strokeWidth="2" />
      <line x1="177" y1="64" x2="180" y2="64" stroke="#6B7280" strokeWidth="2" />
    </g>

    {/* Sparkle dots with gradient feel */}
    <circle cx="154" cy="110" r="2" fill="#E8524A" opacity="0.35" />
    <circle cx="168" cy="120" r="1.5" fill="#4AA076" opacity="0.35" />
    <circle cx="180" cy="108" r="1.5" fill="#F59A2C" opacity="0.3" />
    <circle cx="162" cy="130" r="1" fill="#E8524A" opacity="0.25" />
  </svg>
);

export default IllustrationConfigureer;
