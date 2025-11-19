import React from 'react';
import { cn } from '@/lib/utils';

interface FluidGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: {
    sm?: 1 | 2 | 3 | 4;
    md?: 1 | 2 | 3 | 4 | 5 | 6;
    lg?: 1 | 2 | 3 | 4 | 5 | 6;
    xl?: 1 | 2 | 3 | 4 | 5 | 6;
  };
}

export const FluidGrid: React.FC<FluidGridProps> = ({
  children,
  className,
  cols = 1,
  gap = 'md',
  responsive,
}) => {
  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-10',
  };

  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  const responsiveClasses = responsive
    ? [
        responsive.sm && `sm:grid-cols-${responsive.sm}`,
        responsive.md && `md:grid-cols-${responsive.md}`,
        responsive.lg && `lg:grid-cols-${responsive.lg}`,
        responsive.xl && `xl:grid-cols-${responsive.xl}`,
      ].filter(Boolean).join(' ')
    : '';

  return (
    <div
      className={cn(
        'grid',
        colClasses[cols],
        gapClasses[gap],
        responsiveClasses,
        className
      )}
    >
      {children}
    </div>
  );
};

// Professional preset layouts
export const StatsGrid: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <FluidGrid
    cols={1}
    responsive={{ sm: 2, lg: 4 }}
    gap="lg"
    className={className}
  >
    {children}
  </FluidGrid>
);

export const ContentGrid: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <FluidGrid
    cols={1}
    responsive={{ md: 2, lg: 3 }}
    gap="lg"
    className={className}
  >
    {children}
  </FluidGrid>
);

export const FormGrid: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <FluidGrid
    cols={1}
    responsive={{ md: 2 }}
    gap="md"
    className={className}
  >
    {children}
  </FluidGrid>
);

export default FluidGrid;