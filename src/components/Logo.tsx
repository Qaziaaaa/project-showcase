import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "", size = 40 }: LogoProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Background Glow - Subtle, non-animated */}
      <div className="absolute inset-0 bg-orange-500/5 blur-2xl rounded-full scale-125" />
      
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 50 50" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 overflow-visible"
      >
        {/* Refined, Bold Q - Premium Geometric Style */}
        <path 
          d="M25 5C13.9543 5 5 13.9543 5 25C5 36.0457 13.9543 45 25 45C29.4183 45 33.4183 43.5 36.6 41L45 45" 
          stroke="currentColor" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-orange-500"
        />
        
        {/* Solid, sharp focal point */}
        <circle 
          cx="25" 
          cy="25" 
          r="5" 
          fill="currentColor" 
          className="text-orange-600" 
        />
      </svg>
    </div>
  );
}
