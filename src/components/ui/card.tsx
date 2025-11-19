import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-neutral-200 bg-white shadow-sm hover:shadow-md",
        elevated: "border-neutral-200 bg-white shadow-md hover:shadow-lg",
        interactive: "border-neutral-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer",
        outline: "border-neutral-300 bg-transparent",
        ghost: "border-transparent bg-transparent shadow-none",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6", 
        lg: "p-8",
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-fluid-xs card-padding pb-4", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-snug tracking-tight text-neutral-900",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base text-neutral-600 leading-relaxed min-readable", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("card-padding", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center card-padding pt-fluid-xs border-t border-neutral-100", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// Professional preset cards for medical/dental CRM
export const StatsCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    title: string; 
    value: string | number; 
    icon: React.ReactNode; 
    trend?: string;
    trendUp?: boolean;
  }
>(({ className, title, value, icon, trend, trendUp, ...props }, ref) => (
  <Card ref={ref} variant="elevated" className={cn("", className)} {...props}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-neutral-600">{title}</p>
          <p className="text-2xl font-bold text-neutral-900">{value}</p>
          {trend && (
            <p className={cn(
              "text-xs font-medium",
              trendUp ? "text-success" : "text-error"
            )}>
              {trend}
            </p>
          )}
        </div>
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
));
StatsCard.displayName = "StatsCard";

export const ActionCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title: string;
    description?: string;
    action: React.ReactNode;
    icon?: React.ReactNode;
  }
>(({ className, title, description, action, icon, ...props }, ref) => (
  <Card ref={ref} variant="default" className={className} {...props}>
    <CardHeader className="pb-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {icon && (
          <div className="h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
    </CardHeader>
    <CardFooter className="pt-0">
      {action}
    </CardFooter>
  </Card>
));
ActionCard.displayName = "ActionCard";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
