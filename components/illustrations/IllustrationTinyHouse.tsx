import React from "react";
import SharedDefs from "./svgDefs";

interface IllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationTinyHouse: React.FC<IllustrationProps> = ({
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
    <SharedDefs id="tiny" />

    {/* Sky background */}
    <rect width="200" height="160" rx="8" fill={`url(#tiny-sky)`} />

    {/* Clouds — organic paths */}
    <path d="M30 30 Q36 20 46 23 Q52 18 58 23 Q64 20 65 28 Q68 27 66 32 Q62 36 48 35 Q36 38 32 33 Z" fill="white" opacity="0.65" />
    <path d="M142 24 Q148 16 156 19 Q162 14 168 18 Q172 22 166 26 Q158 30 148 28 Z" fill="white" opacity="0.5" />

    {/* Background tree left — reduced opacity for depth */}
    <g opacity="0.5">
      <rect x="18" y="72" width="4" height="28" rx="2" fill="#7BAF8E" />
      <path d="M20 48 Q10 56 9 68 Q8 77 15 79 Q19 80 20 76 Q22 80 26 79 Q32 77 31 68 Q30 56 20 48 Z" fill={`url(#tiny-foliageDark)`} />
    </g>

    {/* Background tree right — reduced opacity */}
    <g opacity="0.5">
      <rect x="170" y="74" width="4" height="24" rx="2" fill="#7BAF8E" />
      <path d="M172 52 Q163 60 162 70 Q161 78 167 79 Q171 80 172 76 Q174 80 178 79 Q183 78 182 70 Q181 60 172 52 Z" fill={`url(#tiny-foliageLight)`} />
    </g>

    {/* Ground — organic grass edge + gradient */}
    <path d="M0 120 Q20 115 40 118 Q60 113 80 117 Q100 112 120 116 Q140 113 160 118 Q180 114 200 118 L200 160 L0 160 Z" fill={`url(#tiny-ground)`} />
    <path d="M0 120 Q20 115 40 118 Q60 113 80 117 Q100 112 120 116 Q140 113 160 118 Q180 114 200 118" fill="none" stroke={`url(#tiny-grass)`} strokeWidth="2" />

    {/* House with ground shadow */}
    <g filter={`url(#tiny-shadowGround)`}>
      {/* Trailer frame — metallic gradient */}
      <rect x="50" y="108" width="100" height="12" rx="2" fill={`url(#tiny-metal)`} />
      <rect x="48" y="114" width="108" height="3" rx="1" fill="#D1D5DB" />

      {/* Trailer hitch */}
      <rect x="148" y="112" width="16" height="3" rx="1" fill={`url(#tiny-metal)`} />
      <circle cx="164" cy="113.5" r="3" fill="#D1D5DB" />
      <circle cx="164" cy="113.5" r="1.5" fill="#B8BCC4" />

      {/* House body — wall gradient with wood texture */}
      <rect x="55" y="68" width="90" height="42" rx="2" fill={`url(#tiny-wall)`} />
      {/* Horizontal wood siding lines */}
      <line x1="55" y1="76" x2="145" y2="76" stroke="#E4E6EB" strokeWidth="0.5" opacity="0.5" />
      <line x1="55" y1="84" x2="145" y2="84" stroke="#E4E6EB" strokeWidth="0.5" opacity="0.5" />
      <line x1="55" y1="92" x2="145" y2="92" stroke="#E4E6EB" strokeWidth="0.5" opacity="0.5" />
      <line x1="55" y1="100" x2="145" y2="100" stroke="#E4E6EB" strokeWidth="0.5" opacity="0.5" />
      <rect x="55" y="68" width="90" height="42" rx="2" stroke="#583A85" strokeWidth="1" strokeOpacity="0.3" fill="none" />

      {/* Pitched roof */}
      <polygon points="50,70 100,38 150,70" fill="#583A85" />
      <polygon points="54,70 100,42 146,70" fill={`url(#tiny-roof)`} />

      {/* Chimney with smoke */}
      <rect x="120" y="40" width="8" height="18" rx="1" fill="#583A85" />
      <rect x="118" y="38" width="12" height="4" rx="1" fill="#462D6B" />
      {/* Organic smoke puffs */}
      <path d="M124 36 Q126 30 124 26" stroke="#B8BCC4" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M126 34 Q129 28 126 22" stroke="#B8BCC4" strokeWidth="1" fill="none" opacity="0.25" strokeLinecap="round" />

      {/* Porch awning */}
      <rect x="68" y="80" width="24" height="2" rx="1" fill="#583A85" />

      {/* Door */}
      <rect x="72" y="82" width="16" height="26" rx="2" fill={`url(#tiny-door)`} />
      <circle cx="84" cy="96" r="1.5" fill="white" opacity="0.6" />

      {/* Window left */}
      <rect x="60" y="78" width="10" height="10" rx="1" fill={`url(#tiny-glass)`} />
      <rect x="60" y="78" width="10" height="10" rx="1" stroke="#583A85" strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
      <line x1="65" y1="78" x2="65" y2="88" stroke="#583A85" strokeWidth="0.4" opacity="0.3" />
      <line x1="60" y1="83" x2="70" y2="83" stroke="#583A85" strokeWidth="0.4" opacity="0.3" />

      {/* Window right */}
      <rect x="94" y="78" width="14" height="10" rx="1" fill={`url(#tiny-glass)`} />
      <rect x="94" y="78" width="14" height="10" rx="1" stroke="#583A85" strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
      <line x1="101" y1="78" x2="101" y2="88" stroke="#583A85" strokeWidth="0.4" opacity="0.3" />
      <line x1="94" y1="83" x2="108" y2="83" stroke="#583A85" strokeWidth="0.4" opacity="0.3" />

      {/* Porch step */}
      <rect x="70" y="108" width="20" height="4" rx="1" fill={`url(#tiny-metal)`} />
    </g>

    {/* Wheels — metallic gradient with hub detail */}
    <circle cx="68" cy="122" r="7" fill="#5A5F68" />
    <circle cx="68" cy="122" r="5" fill={`url(#tiny-metal)`} />
    <circle cx="68" cy="122" r="2" fill="#6B7280" />
    <circle cx="132" cy="122" r="7" fill="#5A5F68" />
    <circle cx="132" cy="122" r="5" fill={`url(#tiny-metal)`} />
    <circle cx="132" cy="122" r="2" fill="#6B7280" />

    {/* Small bushes */}
    <path d="M46 120 Q50 112 56 114 Q62 112 64 118 Q66 122 58 124 Q50 125 46 120 Z" fill={`url(#tiny-foliageDark)`} opacity="0.7" />
    <path d="M140 120 Q144 114 148 116 Q152 114 154 119 Q155 122 149 124 Q143 124 140 120 Z" fill={`url(#tiny-foliageLight)`} opacity="0.6" />
  </svg>
);

export default IllustrationTinyHouse;
