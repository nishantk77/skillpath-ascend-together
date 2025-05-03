
import { useState, useEffect } from "react";

type XPProgressProps = {
  xp: number;
  size?: number;
  strokeWidth?: number;
  level?: number;
};

export default function XPProgress({ xp, size = 80, strokeWidth = 6, level = 1 }: XPProgressProps) {
  // Calculate level and progress towards next level
  const xpPerLevel = 1000;
  const calculatedLevel = Math.floor(xp / xpPerLevel) + 1;
  const currentLevelXp = xp % xpPerLevel;
  const progress = (currentLevelXp / xpPerLevel) * 100;
  const displayLevel = level || calculatedLevel;
  
  // Animation
  const [displayProgress, setDisplayProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);
  
  // Calculate SVG parameters
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (displayProgress / 100) * circumference;
  
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(126, 105, 171, 0.2)"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          className="progress-ring"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9b87f5" />
            <stop offset="100%" stopColor="#7E69AB" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Level display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="block text-lg font-bold">{displayLevel}</span>
          <span className="block text-xs text-gray-500">Level</span>
        </div>
      </div>
    </div>
  );
}
