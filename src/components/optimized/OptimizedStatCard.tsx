import React, { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface OptimizedStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

/**
 * Optimized StatCard component with memoization to prevent unnecessary re-renders
 * Perfect for dashboard metrics that don't change frequently
 */
const OptimizedStatCard = memo<OptimizedStatCardProps>(({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  iconColor = 'text-blue-600',
  className
}) => {
  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <Icon className={cn("h-4 w-4", iconColor)} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {(subtitle || trend) && (
          <div className="flex items-center justify-between mt-1">
            {subtitle && (
              <p className="text-xs text-gray-500">{subtitle}</p>
            )}
            {trend && (
              <p className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
});

OptimizedStatCard.displayName = 'OptimizedStatCard';

export default OptimizedStatCard;