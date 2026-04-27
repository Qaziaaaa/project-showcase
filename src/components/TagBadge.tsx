import React from 'react';

interface TagBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'primary';
  className?: string;
}

export function TagBadge({ children, variant = 'default', className = '' }: TagBadgeProps) {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors";
  
  const variants = {
    default: "bg-white/[0.05] text-zinc-300 border-white/10 ring-1 ring-white/5",
    outline: "bg-transparent text-zinc-400 border-white/20",
    primary: "bg-orange-500/10 text-orange-400 border-orange-500/20"
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
