import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, trendValue, className }: StatCardProps) {
  return (
    <Card className={cn("border-0 shadow-lg", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-base font-medium text-neutral-600 min-readable">{title}</p>
            <p className="text-3xl font-bold text-neutral-900 leading-tight">{value}</p>
            {trendValue && (
              <p className={cn(
                "text-sm font-medium min-readable",
                trend === 'up' ? 'text-emerald-700' :
                trend === 'down' ? 'text-orange-700' : 'text-neutral-600'
              )}>
                {trendValue}
              </p>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-full",
            trend === 'up' ? 'bg-emerald-50 text-emerald-700' :
            trend === 'down' ? 'bg-orange-50 text-orange-700' : 'bg-slate-100 text-slate-700'
          )}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}