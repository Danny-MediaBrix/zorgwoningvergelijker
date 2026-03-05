import React from "react";
import SharedDefs from "./svgDefs";

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

const IllustrationHero: React.FC<Props> = ({
  className,
  width = 400,
  height = 300,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <SharedDefs id="hero" />

    {/* Sky background */}
    <rect width="400" height="300" rx="12" fill={`url(#hero-sky)`} />

    {/* Sun with radial glow */}
    <circle cx="340" cy="55" r="32" fill={`url(#hero-sun)`} opacity="0.3" />
    <circle cx="340" cy="55" r="18" fill="#FFBE6A" opacity="0.5" />
    <circle cx="340" cy="55" r="10" fill="#FFF4E0" opacity="0.7" />

    {/* Clouds — organic bezier paths */}
    <path d="M55 48 Q62 32 78 36 Q88 28 100 35 Q112 30 115 40 Q122 38 118 48 Q112 54 95 52 Q80 56 65 52 Z" fill="white" opacity="0.7" />
    <path d="M240 38 Q248 24 262 28 Q270 22 280 28 Q290 24 292 34 Q298 32 295 40 Q288 46 270 44 Q255 48 245 42 Z" fill="white" opacity="0.6" />
    <path d="M170 52 Q176 42 186 45 Q192 40 198 44 Q204 48 196 52 Q188 56 176 54 Z" fill="white" opacity="0.45" />

    {/* Background hills — organic paths with depth */}
    <path d="M0 220 Q60 175 140 195 Q200 210 260 190 Q330 175 400 200 L400 230 L0 230 Z" fill="#D6F5E3" opacity="0.5" />

    {/* Ground — organic grass edge + gradient fill */}
    <path d="M0 218 Q30 210 60 215 Q100 208 140 213 Q180 206 220 212 Q260 207 300 214 Q340 209 370 213 Q390 210 400 215 L400 300 L0 300 Z" fill={`url(#hero-ground)`} />
    <path d="M0 218 Q30 210 60 215 Q100 208 140 213 Q180 206 220 212 Q260 207 300 214 Q340 209 370 213 Q390 210 400 215" fill="none" stroke={`url(#hero-grass)`} strokeWidth="3" />

    {/* Tree far left — background, reduced opacity */}
    <g opacity="0.5">
      <rect x="60" y="162" width="5" height="50" rx="2" fill="#7BAF8E" />
      <path d="M62 118 Q45 130 42 152 Q40 165 50 168 Q55 170 62 166 Q70 170 76 168 Q84 165 82 152 Q80 130 62 118 Z" fill={`url(#hero-foliageDark)`} />
    </g>

    {/* Tree left — organic crown, full opacity */}
    <rect x="30" y="148" width="7" height="66" rx="3" fill="#6B9E7E" />
    <path d="M34 95 Q12 110 10 140 Q8 158 22 162 Q28 165 34 160 Q40 165 48 162 Q60 158 58 140 Q56 110 34 95 Z" fill={`url(#hero-foliageLight)`} />
    <path d="M30 108 Q18 120 17 142 Q16 155 26 158 Q32 160 34 155 Q38 160 44 158 Q52 155 51 142 Q50 120 38 108 Z" fill={`url(#hero-foliageDark)`} opacity="0.7" />

    {/* Tree right — organic crown */}
    <rect x="340" y="155" width="6" height="58" rx="3" fill="#6B9E7E" />
    <path d="M343 105 Q325 118 322 142 Q320 158 332 162 Q338 165 343 158 Q350 165 356 162 Q366 158 364 142 Q362 118 343 105 Z" fill={`url(#hero-foliageLight)`} />
    <path d="M340 118 Q330 128 328 146 Q327 157 335 159 Q340 161 343 155 Q347 161 352 159 Q360 157 358 146 Q356 128 346 118 Z" fill={`url(#hero-foliageDark)`} opacity="0.7" />

    {/* Small bush right */}
    <path d="M365 215 Q370 205 378 208 Q386 205 390 212 Q392 216 385 218 Q375 220 365 215 Z" fill={`url(#hero-foliageDark)`} opacity="0.6" />

    {/* House with ground shadow */}
    <g filter={`url(#hero-shadowGround)`}>
      {/* House body */}
      <rect x="140" y="130" width="140" height="82" rx="3" fill={`url(#hero-wall)`} />
      <rect x="140" y="130" width="140" height="82" rx="3" stroke="#583A85" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />

      {/* Roof */}
      <polygon points="130,132 210,78 290,132" fill="#583A85" />
      <polygon points="136,132 210,84 284,132" fill={`url(#hero-roof)`} />

      {/* Chimney */}
      <rect x="245" y="86" width="12" height="30" rx="2" fill="#583A85" />
      <rect x="243" y="84" width="16" height="5" rx="2" fill="#462D6B" />

      {/* Door */}
      <rect x="192" y="162" width="26" height="48" rx="3" fill={`url(#hero-door)`} />
      <circle cx="212" cy="186" r="2.5" fill="white" opacity="0.6" />

      {/* Door step */}
      <rect x="188" y="210" width="34" height="5" rx="2" fill={`url(#hero-metal)`} />

      {/* Window left */}
      <rect x="152" y="146" width="22" height="18" rx="2" fill={`url(#hero-glass)`} />
      <rect x="152" y="146" width="22" height="18" rx="2" stroke="#583A85" strokeWidth="1" strokeOpacity="0.6" fill="none" />
      <line x1="163" y1="146" x2="163" y2="164" stroke="#583A85" strokeWidth="0.6" opacity="0.3" />
      <line x1="152" y1="155" x2="174" y2="155" stroke="#583A85" strokeWidth="0.6" opacity="0.3" />

      {/* Window right */}
      <rect x="236" y="146" width="22" height="18" rx="2" fill={`url(#hero-glass)`} />
      <rect x="236" y="146" width="22" height="18" rx="2" stroke="#583A85" strokeWidth="1" strokeOpacity="0.6" fill="none" />
      <line x1="247" y1="146" x2="247" y2="164" stroke="#583A85" strokeWidth="0.6" opacity="0.3" />
      <line x1="236" y1="155" x2="258" y2="155" stroke="#583A85" strokeWidth="0.6" opacity="0.3" />
    </g>

    {/* Garden path */}
    <path d="M205 216 Q205 240 200 270" stroke="#E4E6EB" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.7" />

    {/* Garden flowers left */}
    <circle cx="155" cy="220" r="3" fill="#E8524A" opacity="0.7" />
    <circle cx="165" cy="224" r="2.5" fill="#F59A2C" opacity="0.6" />
    <circle cx="148" cy="226" r="2" fill="#E8524A" opacity="0.5" />

    {/* Garden flowers right */}
    <circle cx="260" cy="222" r="3" fill="#E8524A" opacity="0.7" />
    <circle cx="270" cy="226" r="2.5" fill="#F59A2C" opacity="0.6" />

    {/* Bushes near house */}
    <path d="M132 214 Q136 205 143 208 Q150 205 152 212 Q154 216 146 218 Q138 220 132 214 Z" fill={`url(#hero-foliageDark)`} />
    <path d="M268 214 Q274 206 280 209 Q286 206 288 213 Q290 217 282 219 Q274 220 268 214 Z" fill={`url(#hero-foliageLight)`} />

    {/* Person 1 — organic adult figure, left */}
    <g>
      <circle cx="108" cy="194" r="8" fill="#E8524A" />
      <path d="M100 203 Q98 208 99 218 Q100 225 104 225 L106 225 Q107 218 106 210 L110 210 Q109 218 110 225 L113 225 Q114 218 113 210 Q118 205 114 203 Q112 202 108 202 Q104 202 100 203 Z" fill="#583A85" />
      {/* Arm waving */}
      <path d="M114 206 Q120 200 126 198" stroke="#583A85" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </g>

    {/* Person 2 — organic adult figure, right */}
    <g>
      <circle cx="316" cy="197" r="7" fill="#E8524A" />
      <path d="M310 205 Q308 210 309 218 Q310 224 313 224 L315 224 Q316 218 315 210 L318 210 Q317 218 318 224 L321 224 Q322 218 321 210 Q324 207 322 205 Q320 204 316 204 Q312 204 310 205 Z" fill="#4AA076" />
    </g>

    {/* Child figure — organic */}
    <g>
      <circle cx="302" cy="207" r="5.5" fill="#F59A2C" />
      <path d="M297 213 Q296 217 297 224 Q298 228 300 228 L301 228 Q302 224 301 218 L303 218 Q302 224 303 228 L305 228 Q306 224 305 218 Q308 215 306 213 Q305 212 302 212 Q299 212 297 213 Z" fill="#E8524A" opacity="0.85" />
    </g>

    {/* Heart / warmth symbol */}
    <path d="M206 100 C206 96 210 93 213 96 C216 93 220 96 220 100 C220 105 213 110 213 110 C213 110 206 105 206 100Z" fill="#E8524A" opacity="0.4" />

    {/* Birds */}
    <path d="M170 60 Q175 55 180 60" stroke="#6B7280" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M185 55 Q190 50 195 55" stroke="#6B7280" strokeWidth="1.5" fill="none" opacity="0.5" />
  </svg>
);

export default IllustrationHero;
