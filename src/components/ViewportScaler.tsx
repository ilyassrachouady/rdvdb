import React, { useMemo } from 'react';
import { useViewportScale } from '@/hooks/use-viewport-scale';

interface ViewportScalerProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  fallbackScale?: number;
}

export const ViewportScaler: React.FC<ViewportScalerProps> = ({ 
  children, 
  className = '',
  disabled = false,
  fallbackScale = 1
}) => {
  const { scale, isReady, breakpoint } = useViewportScale();

  const scaledStyles = useMemo(() => {
    const activeScale = disabled ? fallbackScale : scale;
    
    return {
      transform: `scale(${activeScale})`,
      transformOrigin: 'top left',
      width: `${100 / activeScale}%`,
      height: 'auto',
      minHeight: '100vh',
      position: 'relative' as const,
      overflow: 'visible' as const,
    };
  }, [scale, disabled, fallbackScale]);

  // Show loading state while calculating
  if (!isReady && !disabled) {
    return (
      <div 
        style={{ 
          opacity: 0, 
          visibility: 'hidden' as const,
          minHeight: '100vh',
          width: '100%'
        }}
        aria-hidden="true"
      >
        {children}
      </div>
    );
  }

  // If disabled, render children without scaling
  if (disabled) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      style={scaledStyles}
      className={`viewport-scaler ${className}`}
      data-breakpoint={breakpoint}
      data-scale={scale}
      role="main"
    >
      {children}
    </div>
  );
};

ViewportScaler.displayName = 'ViewportScaler';