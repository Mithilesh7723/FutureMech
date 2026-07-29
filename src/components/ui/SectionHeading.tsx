import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface SectionHeadingProps {
  label?: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  label,
  heading,
  subheading,
  align = "center",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <p className="mb-4 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-bronze">
          {label}
        </p>
      )}
      <h2 className="font-serif text-[2rem] leading-[1.15] text-ink sm:text-[2.25rem] lg:text-[2.5rem]">
        {heading}
      </h2>
      {subheading && (
        <p
          className={cn(
            "mt-5 text-[1.0625rem] leading-[1.7] text-stone",
            align === "center" && "mx-auto max-w-[560px]"
          )}
        >
          {subheading}
        </p>
      )}
      {children}
    </div>
  );
}
