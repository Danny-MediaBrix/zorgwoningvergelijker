import React from "react";
import SharedDefs from "./svgDefs";

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationOntvangOffertes: React.FC<Props> = ({
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
    <SharedDefs id="offertes" />

    {/* Background */}
    <rect width="200" height="160" rx="8" fill={`url(#offertes-sky)`} />

    {/* Person figure — organic */}
    <circle cx="100" cy="70" r="12" fill="#E8524A" />
    <path d="M90 83 Q88 90 89 102 Q90 108 93 108 L96 108 Q97 100 96 92 L104 92 Q103 100 104 108 L107 108 Q108 100 107 92 Q112 87 110 83 Q108 82 100 82 Q92 82 90 83 Z" fill="#583A85" />
    {/* Arms */}
    <path d="M90 90 Q80 86 68 82" stroke="#583A85" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M110 90 Q120 86 132 82" stroke="#583A85" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    {/* Legs */}
    <path d="M93 108 Q92 114 93 124 Q94 126 96 126 Q97 120 96 112 Z" fill="#583A85" />
    <path d="M104 108 Q103 114 104 124 Q105 126 107 126 Q108 120 107 112 Z" fill="#583A85" />

    {/* Envelope 1 — top left, with paper gradient + shadow */}
    <g filter={`url(#offertes-shadowSoft)`}>
      <defs>
        <linearGradient id="offertes-paper" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F7F8FA" />
        </linearGradient>
      </defs>
      <rect x="22" y="22" width="40" height="28" rx="3" fill="url(#offertes-paper)" />
      <rect x="22" y="22" width="40" height="28" rx="3" stroke="#583A85" strokeWidth="1" strokeOpacity="0.4" fill="none" />
      <path d="M22 25 L42 40 L62 25" stroke="#583A85" strokeWidth="1.2" strokeOpacity="0.5" fill="none" />
    </g>
    <circle cx="56" cy="28" r="5" fill="#4AA076" />
    <path d="M54 28 L55.5 29.5 L58 27" stroke="white" strokeWidth="1.2" fill="none" />
    {/* Motion lines */}
    <line x1="64" y1="32" x2="72" y2="38" stroke="#E4E6EB" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="64" y1="38" x2="70" y2="44" stroke="#E4E6EB" strokeWidth="1" strokeLinecap="round" />

    {/* Envelope 2 — top right, with shadow */}
    <g filter={`url(#offertes-shadowSoft)`}>
      <rect x="138" y="18" width="40" height="28" rx="3" fill="url(#offertes-paper)" />
      <rect x="138" y="18" width="40" height="28" rx="3" stroke="#E8524A" strokeWidth="1" strokeOpacity="0.4" fill="none" />
      <path d="M138 21 L158 36 L178 21" stroke="#E8524A" strokeWidth="1.2" strokeOpacity="0.5" fill="none" />
    </g>
    <circle cx="172" cy="24" r="5" fill="#E8524A" />
    <path d="M170 24 L171.5 25.5 L174 23" stroke="white" strokeWidth="1.2" fill="none" />
    {/* Motion lines */}
    <line x1="136" y1="28" x2="128" y2="34" stroke="#E4E6EB" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="136" y1="34" x2="130" y2="40" stroke="#E4E6EB" strokeWidth="1" strokeLinecap="round" />

    {/* Document 1 — left, with shadow */}
    <g filter={`url(#offertes-shadowSoft)`}>
      <rect x="18" y="68" width="34" height="44" rx="3" fill="url(#offertes-paper)" />
      <rect x="18" y="68" width="34" height="44" rx="3" stroke="#E4E6EB" strokeWidth="1" fill="none" />
    </g>
    <rect x="24" y="74" width="22" height="3" rx="1" fill="#583A85" />
    <rect x="24" y="80" width="18" height="2" rx="1" fill="#E4E6EB" />
    <rect x="24" y="85" width="20" height="2" rx="1" fill="#E4E6EB" />
    <rect x="24" y="90" width="14" height="2" rx="1" fill="#E4E6EB" />
    <rect x="24" y="98" width="16" height="8" rx="2" fill="#E8F5EE" />
    <rect x="27" y="100" width="10" height="4" rx="1" fill="#4AA076" opacity="0.5" />

    {/* Document 2 — right, with shadow */}
    <g filter={`url(#offertes-shadowSoft)`}>
      <rect x="148" y="64" width="34" height="44" rx="3" fill="url(#offertes-paper)" />
      <rect x="148" y="64" width="34" height="44" rx="3" stroke="#E4E6EB" strokeWidth="1" fill="none" />
    </g>
    <rect x="154" y="70" width="22" height="3" rx="1" fill="#E8524A" />
    <rect x="154" y="76" width="18" height="2" rx="1" fill="#E4E6EB" />
    <rect x="154" y="81" width="20" height="2" rx="1" fill="#E4E6EB" />
    <rect x="154" y="86" width="16" height="2" rx="1" fill="#E4E6EB" />
    <rect x="154" y="94" width="16" height="8" rx="2" fill="#E8F5EE" />
    <rect x="157" y="96" width="10" height="4" rx="1" fill="#4AA076" opacity="0.5" />

    {/* Envelope 3 — bottom center, with shadow */}
    <g filter={`url(#offertes-shadowSoft)`}>
      <rect x="76" y="114" width="48" height="32" rx="3" fill="url(#offertes-paper)" />
      <rect x="76" y="114" width="48" height="32" rx="3" stroke="#4AA076" strokeWidth="1" strokeOpacity="0.4" fill="none" />
      <path d="M76 117 L100 134 L124 117" stroke="#4AA076" strokeWidth="1.2" strokeOpacity="0.5" fill="none" />
    </g>

    {/* Notification badge — glow */}
    <defs>
      <radialGradient id="offertes-badge" cx="0.4" cy="0.4" r="0.6">
        <stop offset="0%" stopColor="#F59A2C" />
        <stop offset="100%" stopColor="#E8524A" />
      </radialGradient>
    </defs>
    <circle cx="122" cy="116" r="7" fill="url(#offertes-badge)" opacity="0.3" />
    <circle cx="122" cy="116" r="6" fill="url(#offertes-badge)" />
    <text x="122" y="119" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">3</text>

    {/* Sparkle effects */}
    <circle cx="74" cy="58" r="2" fill="#E8524A" opacity="0.4" />
    <circle cx="126" cy="54" r="2" fill="#4AA076" opacity="0.4" />
    <circle cx="56" cy="56" r="1.5" fill="#4AA076" opacity="0.3" />
    <circle cx="146" cy="52" r="1.5" fill="#F59A2C" opacity="0.3" />
  </svg>
);

export default IllustrationOntvangOffertes;
