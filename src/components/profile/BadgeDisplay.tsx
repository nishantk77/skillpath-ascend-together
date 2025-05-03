
import { Badge as BadgeType } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Award, Star, Trophy } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

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

  // Function to get the appropriate icon based on badge type
  const getBadgeIcon = (badge: BadgeType) => {
    switch (badge.type) {
      case 'streak':
        return <Star className="w-2/3 h-2/3 text-yellow-500" />;
      case 'mastery':
        return <Trophy className="w-2/3 h-2/3 text-purple-600" />;
      case 'completion':
        return <Award className="w-2/3 h-2/3 text-green-500" />;
      default:
        return <Award className="w-2/3 h-2/3 text-skillpath-purple" />;
    }
  };

  // Function to get the appropriate background color based on badge tier
  const getBadgeBackground = (badge: BadgeType) => {
    if (!badge.tier) return "bg-skillpath-pale-purple";
    
    switch (badge.tier) {
      case 'gold':
        return "bg-amber-100";
      case 'silver':
        return "bg-gray-100";
      case 'bronze':
        return "bg-amber-50";
      default:
        return "bg-skillpath-pale-purple";
    }
  };
  
  return (
    <div className="flex flex-wrap gap-4">
      <TooltipProvider>
        {badges.map((badge) => (
          <Tooltip key={badge.id}>
            <TooltipTrigger>
              <div className="flex flex-col items-center gap-1">
                <div 
                  className={`${sizeClasses[size]} rounded-full ${getBadgeBackground(badge)} flex items-center justify-center border-2 ${badge.tier === 'gold' ? 'border-amber-400' : badge.tier === 'silver' ? 'border-gray-300' : badge.tier === 'bronze' ? 'border-amber-600' : 'border-skillpath-purple'}`}
                >
                  {badge.iconUrl ? (
                    <img src={badge.iconUrl} alt={badge.name} className="w-2/3 h-2/3" />
                  ) : (
                    getBadgeIcon(badge)
                  )}
                </div>
                {size === "lg" && (
                  <Badge variant={
                    badge.type === "streak" ? "streak" : 
                    badge.type === "mastery" ? "mastery" : 
                    badge.tier === "gold" ? "gold" :
                    badge.tier === "silver" ? "silver" :
                    badge.tier === "bronze" ? "bronze" :
                    "default"
                  }>
                    {badge.name}
                  </Badge>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="p-2 max-w-xs">
                <p className="font-semibold">{badge.name}</p>
                <p className="text-sm text-gray-600">{badge.description}</p>
                <p className="text-xs text-gray-500 mt-1">Earned on {formatDate(badge.dateEarned)}</p>
                <div className="mt-2">
                  <Badge variant={
                    badge.type === "streak" ? "streak" : 
                    badge.type === "mastery" ? "mastery" : 
                    badge.tier === "gold" ? "gold" :
                    badge.tier === "silver" ? "silver" :
                    badge.tier === "bronze" ? "bronze" :
                    "default"
                  }>
                    {badge.type.charAt(0).toUpperCase() + badge.type.slice(1)} {badge.tier ? `(${badge.tier})` : ''}
                  </Badge>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
