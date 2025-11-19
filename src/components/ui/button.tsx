import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary - Professional medical blue
        default: "bg-primary text-primary-foreground shadow-md hover:bg-primary-600 hover:shadow-lg active:scale-[0.98] focus:ring-primary/30",
        
        // Secondary - Dental teal
        secondary: "bg-secondary text-secondary-foreground shadow-md hover:bg-secondary-600 hover:shadow-lg active:scale-[0.98] focus:ring-secondary/30",
        
        // Success - Medical green
        success: "bg-success text-success-foreground shadow-md hover:bg-success-600 hover:shadow-lg active:scale-[0.98] focus:ring-success/30",
        
        // Warning - Medical amber
        warning: "bg-warning text-warning-foreground shadow-md hover:bg-warning-600 hover:shadow-lg active:scale-[0.98] focus:ring-warning/30",
        
        // Error - Medical red
        destructive: "bg-error text-error-foreground shadow-md hover:bg-error-600 hover:shadow-lg active:scale-[0.98] focus:ring-error/30",
        
        // Outline - Clean border style
        outline: "border border-neutral-300 bg-background hover:bg-neutral-50 hover:border-neutral-400 active:scale-[0.98] focus:ring-primary/20",
        
        // Ghost - Minimal hover style
        ghost: "hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200 focus:ring-primary/20",
        
        // Link - Text button
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-600 active:text-primary-700",
        
        // Gradient variants for special cases
        gradient: "bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 focus:ring-primary/30",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-button-sm [&_svg]:h-3 [&_svg]:w-3",
        default: "h-9 px-4 py-2 text-button [&_svg]:h-4 [&_svg]:w-4",
        lg: "h-11 rounded-lg px-8 text-button-lg [&_svg]:h-5 [&_svg]:w-5",
        xl: "h-12 rounded-xl px-10 text-button-lg font-semibold [&_svg]:h-6 [&_svg]:w-6",
        icon: "h-9 w-9 [&_svg]:h-4 [&_svg]:w-4",
        "icon-sm": "h-8 w-8 [&_svg]:h-3 [&_svg]:w-3",
        "icon-lg": "h-11 w-11 [&_svg]:h-5 [&_svg]:w-5",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    asChild = false, 
    loading = false,
    loadingText = "Chargement...",
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // If loading, disable the button and show spinner
    const isDisabled = disabled || loading;
    
    const content = loading ? (
      <>
        <Loader2 className="animate-spin mr-2" />
        {loadingText}
      </>
    ) : (
      <>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </>
    );

    return (
      <Comp 
        className={cn(buttonVariants({ variant, size, fullWidth, className }))} 
        ref={ref} 
        disabled={isDisabled}
        {...props}
      >
        {content}
      </Comp>
    );
  },
);
Button.displayName = "Button";

// Professional button presets for medical/dental CRM
export const PrimaryButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="default" {...props} />
);

export const SecondaryButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="secondary" {...props} />
);

export const OutlineButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="outline" {...props} />
);

export const GhostButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="ghost" {...props} />
);

export const SuccessButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="success" {...props} />
);

export const DestructiveButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="destructive" {...props} />
);

export const GradientButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="gradient" {...props} />
);

PrimaryButton.displayName = "PrimaryButton";
SecondaryButton.displayName = "SecondaryButton";
OutlineButton.displayName = "OutlineButton";
GhostButton.displayName = "GhostButton";
SuccessButton.displayName = "SuccessButton";
DestructiveButton.displayName = "DestructiveButton";
GradientButton.displayName = "GradientButton";

export { Button, buttonVariants };
