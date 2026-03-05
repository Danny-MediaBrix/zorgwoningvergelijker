import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import { WoningCategorie } from "@/lib/types";
import woningtypeIllustrations from "@/components/illustrations/woningtypeIllustrations";

type PlaceholderType = "woning" | "aanbieder" | "artikel" | "portfolio";

interface PlaceholderImageProps {
  type?: PlaceholderType;
  text?: string;
  initials?: string;
  icon?: React.ReactNode;
  color?: string;
  className?: string;
  aspectRatio?: "video" | "square" | "wide" | "hero";
  categorie?: WoningCategorie;
  woningSlug?: string;
  size?: "sm" | "md" | "lg";
}

const aspectStyles = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[2/1]",
  hero: "aspect-[3/1]",
};

export default function PlaceholderImage({
  text,
  initials,
  icon,
  className,
  aspectRatio = "video",
  woningSlug,
  size = "md",
}: PlaceholderImageProps) {
  // Aanbieder initialen badge
  if (initials) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-primary-100 text-primary font-bold",
          aspectRatio === "square" ? "rounded-full" : "rounded-xl",
          aspectStyles[aspectRatio],
          className
        )}
      >
        <span className="text-xl">{initials}</span>
      </div>
    );
  }

  // Woningtype: use SVG illustration if available
  const Illustration = woningSlug ? woningtypeIllustrations[woningSlug] : null;

  if (Illustration) {
    const illustrationSizes = {
      sm: { w: 100, h: 80 },
      md: { w: 140, h: 112 },
      lg: { w: 180, h: 140 },
    };
    const dims = illustrationSizes[size];

    return (
      <div
        className={cn(
          "relative flex items-center justify-center bg-gray-50 overflow-hidden rounded-xl",
          aspectStyles[aspectRatio],
          className
        )}
      >
        <Illustration width={dims.w} height={dims.h} />
      </div>
    );
  }

  // Fallback: simple icon placeholder
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-gray-50 gap-2 overflow-hidden rounded-xl",
        aspectStyles[aspectRatio],
        className
      )}
    >
      <div className="text-gray-300">
        {icon || <Home className="w-12 h-12" />}
      </div>
      {text && (
        <span className="text-caption text-gray-600 font-medium">{text}</span>
      )}
    </div>
  );
}
