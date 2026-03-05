import React from "react";
import SharedDefs from "./svgDefs";

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationVergelijk: React.FC<Props> = ({
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
    <SharedDefs id="vergelijk" />

    {/* Background */}
    <rect width="200" height="160" rx="8" fill={`url(#vergelijk-sky)`} />

    {/* Person figure — organic */}
    <circle cx="100" cy="28" r="10" fill="#E8524A" />
    <path d="M92 39 Q90 44 91 52 Q92 58 95 58 L97 58 Q98 52 97 46 L103 46 Q102 52 103 58 L106 58 Q107 52 106 46 Q110 42 108 39 Q106 38 100 38 Q94 38 92 39 Z" fill="#583A85" />
    {/* Arms pointing */}
    <path d="M92 44 Q82 50 68 55" stroke="#583A85" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M108 44 Q118 50 132 55" stroke="#583A85" strokeWidth="3" strokeLinecap="round" fill="none" />

    {/* Card 1 — left, with shadow */}
    <g filter={`url(#vergelijk-shadowSoft)`}>
      <rect x="16" y="62" width="52" height="70" rx="4" fill="white" />
      <rect x="16" y="62" width="52" height="70" rx="4" stroke="#E4E6EB" strokeWidth="1" fill="none" />
    </g>
    {/* House icon on card 1 */}
    <polygon points="26,82 42,70 58,82" fill={`url(#vergelijk-roof)`} />
    <rect x="30" y="82" width="24" height="16" rx="1" fill={`url(#vergelijk-wall)`} stroke="#583A85" strokeWidth="0.8" strokeOpacity="0.4" />
    <rect x="38" y="88" width="8" height="10" rx="1" fill={`url(#vergelijk-door)`} />
    {/* Checkmarks */}
    <circle cx="28" cy="108" r="3" fill="#4AA076" />
    <path d="M26 108 L27.5 109.5 L30 107" stroke="white" strokeWidth="1" fill="none" />
    <rect x="34" y="106" width="20" height="3" rx="1" fill="#E4E6EB" />
    <circle cx="28" cy="118" r="3" fill="#4AA076" />
    <path d="M26 118 L27.5 119.5 L30 117" stroke="white" strokeWidth="1" fill="none" />
    <rect x="34" y="116" width="16" height="3" rx="1" fill="#E4E6EB" />

    {/* Card 2 — center (highlighted), with shadow */}
    <g filter={`url(#vergelijk-shadowSoft)`}>
      <rect x="74" y="62" width="52" height="70" rx="4" fill="white" />
      <rect x="74" y="62" width="52" height="70" rx="4" stroke="#E8524A" strokeWidth="1.5" fill="none" />
    </g>
    {/* House icon on card 2 */}
    <defs>
      <linearGradient id="vergelijk-roofAccent" x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#F59A2C" />
        <stop offset="100%" stopColor="#E8524A" />
      </linearGradient>
    </defs>
    <polygon points="84,82 100,70 116,82" fill="url(#vergelijk-roofAccent)" />
    <rect x="88" y="82" width="24" height="16" rx="1" fill={`url(#vergelijk-wall)`} stroke="#E8524A" strokeWidth="0.8" strokeOpacity="0.4" />
    <rect x="96" y="88" width="8" height="10" rx="1" fill={`url(#vergelijk-door)`} />
    {/* Checkmarks */}
    <circle cx="86" cy="108" r="3" fill="#4AA076" />
    <path d="M84 108 L85.5 109.5 L88 107" stroke="white" strokeWidth="1" fill="none" />
    <rect x="92" y="106" width="20" height="3" rx="1" fill="#E4E6EB" />
    <circle cx="86" cy="118" r="3" fill="#4AA076" />
    <path d="M84 118 L85.5 119.5 L88 117" stroke="white" strokeWidth="1" fill="none" />
    <rect x="92" y="116" width="24" height="3" rx="1" fill="#E4E6EB" />

    {/* Star badge — radial gradient */}
    <defs>
      <radialGradient id="vergelijk-star" cx="0.4" cy="0.4" r="0.6">
        <stop offset="0%" stopColor="#F59A2C" />
        <stop offset="100%" stopColor="#E8524A" />
      </radialGradient>
    </defs>
    <circle cx="120" cy="66" r="7" fill="url(#vergelijk-star)" />
    <path d="M120 60.5 L121.5 64 L125 64.5 L122.5 67 L123 70.5 L120 69 L117 70.5 L117.5 67 L115 64.5 L118.5 64Z" fill="white" />

    {/* Card 3 — right, with shadow */}
    <g filter={`url(#vergelijk-shadowSoft)`}>
      <rect x="132" y="62" width="52" height="70" rx="4" fill="white" />
      <rect x="132" y="62" width="52" height="70" rx="4" stroke="#E4E6EB" strokeWidth="1" fill="none" />
    </g>
    {/* House icon on card 3 */}
    <polygon points="142,82 158,70 174,82" fill={`url(#vergelijk-roof)`} />
    <rect x="146" y="82" width="24" height="16" rx="1" fill={`url(#vergelijk-wall)`} stroke="#4AA076" strokeWidth="0.8" strokeOpacity="0.4" />
    <rect x="154" y="88" width="8" height="10" rx="1" fill={`url(#vergelijk-door)`} />
    {/* Checkmarks */}
    <circle cx="144" cy="108" r="3" fill="#4AA076" />
    <path d="M142 108 L143.5 109.5 L146 107" stroke="white" strokeWidth="1" fill="none" />
    <rect x="150" y="106" width="22" height="3" rx="1" fill="#E4E6EB" />
    <circle cx="144" cy="118" r="3" fill="#E4E6EB" />
    <rect x="150" y="116" width="14" height="3" rx="1" fill="#E4E6EB" />

    {/* Comparison arrows */}
    <path d="M68 97 L74 97" stroke="#6B7280" strokeWidth="1" strokeDasharray="2 1" />
    <path d="M126 97 L132 97" stroke="#6B7280" strokeWidth="1" strokeDasharray="2 1" />

    {/* Bottom label */}
    <rect x="60" y="142" width="80" height="12" rx="4" fill="#E8F5EE" />
    <rect x="76" y="145" width="48" height="6" rx="2" fill="#4AA076" opacity="0.4" />
  </svg>
);

export default IllustrationVergelijk;
