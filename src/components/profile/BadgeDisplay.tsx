
import { Badge as BadgeType } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Award } from "lucide-react";
import { format } from "date-fns";

type BadgeDisplayProps = {
  badges: BadgeType[];
  size?: "sm" | "md" | "lg";
};

export default function BadgeDisplay({ badges, size = "md" }: BadgeDisplayProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-20 h-20"
  };
  
  const hasBadges = badges && badges.length > 0;
  
  if (!hasBadges) {
    return (
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-center mb-2">
          <Award className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-gray-600">No badges earned yet</p>
      </div>
    );
  }
  
  const formatDate = (date: Date) => {
    // Parse the date if it's a string (which might happen after localStorage storage/retrieval)
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMM d, yyyy');
  };
  
  return (
    <div className="flex flex-wrap gap-4">
      <TooltipProvider>
        {badges.map((badge) => (
          <Tooltip key={badge.id}>
            <TooltipTrigger>
              <div className={`${sizeClasses[size]} rounded-full bg-skillpath-pale-purple flex items-center justify-center`}>
                {badge.iconUrl ? (
                  <img src={badge.iconUrl} alt={badge.name} className="w-2/3 h-2/3" />
                ) : (
                  <Award className="w-2/3 h-2/3 text-skillpath-purple" />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="p-2 max-w-xs">
                <p className="font-semibold">{badge.name}</p>
                <p className="text-sm text-gray-600">{badge.description}</p>
                <p className="text-xs text-gray-500 mt-1">Earned on {formatDate(badge.dateEarned)}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
