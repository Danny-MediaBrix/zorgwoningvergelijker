import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  reviewCount?: number;
  className?: string;
}

export default function StarRating({
  rating,
  maxStars = 5,
  size = "md",
  showLabel = false,
  reviewCount,
  className,
}: StarRatingProps) {
  const sizes = {
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex gap-0.5">
        {Array.from({ length: maxStars }, (_, i) => {
          const filled = i < Math.floor(rating);
          const halfFilled = !filled && i < rating;
          return (
            <Star
              key={i}
              className={cn(
                sizes[size],
                filled
                  ? "text-yellow-400 fill-yellow-400"
                  : halfFilled
                  ? "text-yellow-400 fill-yellow-400/50"
                  : "text-gray-200 fill-gray-200"
              )}
            />
          );
        })}
      </div>
      {showLabel && (
        <span className="text-body-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-body-sm text-gray-600">
          ({reviewCount} reviews)
        </span>
      )}
    </div>
  );
}
