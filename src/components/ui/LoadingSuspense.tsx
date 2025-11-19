import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSuspenseProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

/**
 * Optimized loading component for Suspense fallbacks
 * Lightweight and consistent across the app
 */
export function LoadingSuspense({ 
  className, 
  size = 'md', 
  text = 'Chargement...' 
}: LoadingSuspenseProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center min-h-[200px] bg-gray-50",
      className
    )}>
      <div className={cn(
        "border-4 border-blue-600 border-t-transparent rounded-full animate-spin",
        sizeClasses[size]
      )} />
      <div className="text-muted-foreground mt-4 text-sm">{text}</div>
    </div>
  );
}