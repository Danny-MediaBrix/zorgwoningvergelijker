interface SharedDefsProps {
  id: string;
}

export default function SharedDefs({ id }: SharedDefsProps) {
  return (
    <defs>
      {/* Sky gradient — subtle blue-white top to bottom */}
      <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E3F0FF" />
        <stop offset="60%" stopColor="#F0F6FF" />
        <stop offset="100%" stopColor="#F7F8FA" />
      </linearGradient>

      {/* Ground gradient — green gradient */}
      <linearGradient id={`${id}-ground`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C2E8D0" />
        <stop offset="40%" stopColor="#D6F5E3" />
        <stop offset="100%" stopColor="#EEFBF4" />
      </linearGradient>

      {/* Ground edge — darker grass line */}
      <linearGradient id={`${id}-grass`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4AA076" />
        <stop offset="100%" stopColor="#8ECBAA" />
      </linearGradient>

      {/* Wall gradient — light wall (white to gray-100) */}
      <linearGradient id={`${id}-wall`} x1="0.3" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F1F2F4" />
      </linearGradient>

      {/* Wall gradient — purple wall (brand) */}
      <linearGradient id={`${id}-wallGreen`} x1="0.3" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#583A85" />
        <stop offset="100%" stopColor="#462D6B" />
      </linearGradient>

      {/* Roof gradient */}
      <linearGradient id={`${id}-roof`} x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#9A6BBF" />
        <stop offset="100%" stopColor="#583A85" />
      </linearGradient>

      {/* Foliage gradient — light variant (radial) */}
      <radialGradient id={`${id}-foliageLight`} cx="0.4" cy="0.35" r="0.65">
        <stop offset="0%" stopColor="#6FCF97" />
        <stop offset="70%" stopColor="#4AA076" />
        <stop offset="100%" stopColor="#2D8A5E" />
      </radialGradient>

      {/* Foliage gradient — dark variant (radial) — stays green (nature) */}
      <radialGradient id={`${id}-foliageDark`} cx="0.4" cy="0.35" r="0.65">
        <stop offset="0%" stopColor="#4AA076" />
        <stop offset="70%" stopColor="#2D8A5E" />
        <stop offset="100%" stopColor="#1B6B4A" />
      </radialGradient>

      {/* Sun gradient — radial coral-peach with fade */}
      <radialGradient id={`${id}-sun`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#FAD4AE" />
        <stop offset="60%" stopColor="#E8524A" />
        <stop offset="100%" stopColor="#E8524A" stopOpacity="0" />
      </radialGradient>

      {/* Glass gradient — diagonal blue-white for windows */}
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#D4EEFF" />
        <stop offset="50%" stopColor="#E8F4FF" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.7" />
      </linearGradient>

      {/* Door gradient — coral */}
      <linearGradient id={`${id}-door`} x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#F26157" />
        <stop offset="100%" stopColor="#E8524A" />
      </linearGradient>

      {/* Metallic gradient — for trailers, cranes etc */}
      <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E4E6EB" />
        <stop offset="50%" stopColor="#D1D5DB" />
        <stop offset="100%" stopColor="#B8BCC4" />
      </linearGradient>

      {/* Wood gradient */}
      <linearGradient id={`${id}-wood`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C4956A" />
        <stop offset="100%" stopColor="#A67B52" />
      </linearGradient>

      {/* Shadow filter — building ground shadow */}
      <filter id={`${id}-shadowGround`} x="-20%" y="-10%" width="140%" height="130%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="2" dy="4" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.08" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Shadow filter — soft / floating elements */}
      <filter id={`${id}-shadowSoft`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
        <feOffset dx="1" dy="2" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.1" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Cloud blur filter */}
      <filter id={`${id}-cloudBlur`}>
        <feGaussianBlur stdDeviation="1.5" />
      </filter>
    </defs>
  );
}
