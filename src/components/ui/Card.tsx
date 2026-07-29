import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "solid" | "bordered";
}

export function Card({ children, className, hover = true, variant = "solid" }: CardProps) {
  const base = variant === "solid"
    ? "rounded-2xl border border-parchment bg-white-pure p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-8"
    : "rounded-2xl border border-parchment bg-transparent p-6 sm:p-8";

  return (
    <div
      className={cn(
        base,
        hover &&
          "transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardIconProps {
  children: ReactNode;
  className?: string;
  variant?: "filled" | "bordered" | "subtle";
}

export function CardIcon({ children, className, variant = "filled" }: CardIconProps) {
  const styles = {
    filled: "bg-bronze-light text-bronze",
    bordered: "border border-parchment bg-transparent text-bronze",
    subtle: "bg-linen text-graphite",
  };

  return (
    <div
      className={cn(
        "mb-5 flex h-12 w-12 items-center justify-center rounded-full",
        styles[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
