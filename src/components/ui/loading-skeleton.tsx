import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ 
  className, 
  variant = 'default',
  width,
  height,
  style,
  ...props 
}: SkeletonProps) {
  const baseClasses = "animate-pulse bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 bg-[length:200%_100%]";
  
  const variantClasses = {
    default: "rounded-lg",
    text: "rounded h-4",
    circular: "rounded-full",
    rectangular: "rounded-none"
  };

  const inlineStyle = {
    width: width,
    height: height,
    ...style
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={inlineStyle}
      {...props}
    />
  );
}

// Predefined skeleton components for common use cases
export const SkeletonCard = ({ className }: { className?: string }) => (
  <div className={cn("card-default p-6 space-y-4", className)}>
    <div className="flex items-start space-x-4">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" className="h-4 w-3/4" />
        <Skeleton variant="text" className="h-3 w-1/2" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton variant="text" className="h-3 w-full" />
      <Skeleton variant="text" className="h-3 w-4/5" />
      <Skeleton variant="text" className="h-3 w-2/3" />
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5 }: { rows?: number }) => (
  <div className="w-full">
    {/* Header */}
    <div className="flex space-x-4 mb-4 p-4 bg-neutral-50 rounded-t-lg">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} variant="text" className="h-4 flex-1" />
      ))}
    </div>
    {/* Rows */}
    <div className="space-y-3 p-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex space-x-4 items-center">
          <Skeleton variant="circular" width={32} height={32} />
          {Array.from({ length: 3 }).map((_, j) => (
            <Skeleton key={j} variant="text" className="h-3 flex-1" />
          ))}
          <Skeleton variant="rectangular" width={80} height={32} className="rounded" />
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="card-default p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton variant="text" className="h-3 w-20" />
            <Skeleton variant="text" className="h-8 w-16" />
          </div>
          <Skeleton variant="circular" width={48} height={48} />
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonForm = () => (
  <div className="card-default p-6 space-y-6">
    <div className="space-y-2">
      <Skeleton variant="text" className="h-4 w-24" />
      <Skeleton variant="rectangular" className="h-11 w-full rounded-md" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Skeleton variant="text" className="h-4 w-20" />
        <Skeleton variant="rectangular" className="h-11 w-full rounded-md" />
      </div>
      <div className="space-y-2">
        <Skeleton variant="text" className="h-4 w-20" />
        <Skeleton variant="rectangular" className="h-11 w-full rounded-md" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton variant="text" className="h-4 w-28" />
      <Skeleton variant="rectangular" className="h-24 w-full rounded-md" />
    </div>
    <div className="flex justify-end space-x-2">
      <Skeleton variant="rectangular" width={80} height={40} className="rounded-md" />
      <Skeleton variant="rectangular" width={100} height={40} className="rounded-md" />
    </div>
  </div>
);