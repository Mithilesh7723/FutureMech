"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import Link from "next/link";
import { setPendingScroll } from "@/lib/pending-scroll";

type ButtonVariant = "primary" | "secondary" | "ghost" | "glass";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-white-pure shadow-[0_1px_2px_rgba(0,0,0,0.08)] hover:bg-graphite hover:shadow-[0_8px_24px_rgba(26,24,22,0.25)]",
  secondary:
    "border border-parchment text-graphite hover:border-bronze hover:text-bronze hover:shadow-[0_4px_16px_rgba(139,115,85,0.15)]",
  ghost: "text-graphite hover:text-bronze",
  glass: "bg-gradient-to-b from-white-pure via-white-pure to-[#e8e8e8] text-ink border border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.9)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-[0.8125rem]",
  md: "px-7 py-3 text-[0.9375rem]",
  lg: "px-8 py-3.5 text-[1rem]",
};

function GlassHighlight() {
  return (
    <>
      <span className="absolute inset-x-0 top-0 h-[45%] rounded-t-full bg-gradient-to-b from-white/70 to-transparent" aria-hidden="true" />
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" aria-hidden="true" />
    </>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  onClick,
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 overflow-hidden active:scale-[0.98]";

  const classes = cn(
    base,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      return (
        <Link
          href="/"
          className={classes}
          onClick={(e) => {
            e.preventDefault();
            setPendingScroll(id);
            window.location.href = "/";
          }}
        >
          {variant === "glass" && <GlassHighlight />}
          <span className="relative z-10">{children}</span>
        </Link>
      );
    }

    return (
      <Link href={href} className={classes}>
        {variant === "glass" && <GlassHighlight />}
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {variant === "glass" && <GlassHighlight />}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
