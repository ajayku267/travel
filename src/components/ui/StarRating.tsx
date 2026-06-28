import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
  showCount?: boolean;
  count?: number;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 16,
  className,
  showCount,
  count,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            "transition-colors",
            i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-100"
          )}
        />
      ))}
      {showCount && count !== undefined && (
        <span className="ml-1 text-sm text-gray-500">({count})</span>
      )}
    </div>
  );
}
