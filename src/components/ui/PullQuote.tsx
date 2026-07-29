import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface PullQuoteProps {
  children: ReactNode;
  className?: string;
}

export function PullQuote({ children, className }: PullQuoteProps) {
  return (
    <blockquote
      className={cn(
        "relative border-l-[3px] border-slate-blue py-2 pl-6 font-serif text-[1.375rem] italic leading-[1.5] text-graphite sm:text-[1.625rem]",
        className
      )}
    >
      {children}
    </blockquote>
  );
}
