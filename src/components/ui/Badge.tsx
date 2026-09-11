import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "accent" | "success";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default:
      "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
    secondary:
      "bg-secondary text-secondary-foreground border-border hover:bg-secondary/80",
    outline:
      "bg-transparent text-foreground border-border/80 hover:bg-secondary/50",
    accent:
      "bg-accent text-accent-foreground border-accent/40 hover:bg-accent/80",
    success:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs font-medium",
    md: "px-2.5 py-1 text-xs font-medium tracking-wide",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}
