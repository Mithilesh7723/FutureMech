"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { LayoutGroup, motion } from "framer-motion";

interface MenuItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  href: string;
}

interface MenuBarProps {
  items: MenuItem[];
  activeItem: string;
  onItemClick: (label: string) => void;
  className?: string;
  /** When true, dock sits on a dark background — lighter glass, no hard border */
  dark?: boolean;
  /** When true, dock gets frosted glass bg/border (after scrolling past hero) */
  frosted?: boolean;
}

export function MenuBar({ items, activeItem, onItemClick, className, dark, frosted }: MenuBarProps) {
  return (
    <LayoutGroup>
      <div
        className={cn(
          "flex items-center gap-0.5 rounded-full px-1 py-1 transition-all duration-500 ease-out",
          frosted
            ? dark
              ? "bg-white/10 border border-white/15 shadow-[0_0_20px_rgba(0,0,0,0.25)] backdrop-blur-xl"
              : "bg-white/50 border border-white/40 shadow-[0_2px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl"
            : "bg-transparent border-transparent shadow-none",
          className
        )}
      >
        {items.map((item) => {
          const isActive = activeItem === item.label;
          return (
            <button
              key={item.label}
              onClick={() => onItemClick(item.label)}
              className={cn(
                "group relative flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.8125rem] font-medium transition-all duration-300",
                isActive
                  ? frosted
                    ? dark
                      ? "text-white"
                      : "text-bronze"
                    : "text-graphite"
                  : frosted
                    ? dark
                      ? "text-white/60 hover:text-white"
                      : "text-stone hover:text-graphite"
                    : "text-graphite/60 hover:text-graphite"
              )}
            >
              {!isActive && (
                <span className={cn(
                  "absolute inset-0 rounded-full opacity-0 transition-opacity duration-300",
                  frosted
                    ? dark
                      ? "bg-white/10"
                      : "bg-parchment/30"
                    : "bg-graphite/5",
                  "group-hover:opacity-100"
                )} />
              )}
              {isActive && (
                <motion.div
                  layoutId="active-menu-item"
                  className={cn(
                    "absolute inset-0 rounded-full",
                    frosted
                      ? dark
                        ? "bg-white/15 border border-white/20"
                        : "bg-bronze/10 border border-bronze/15"
                      : "bg-graphite/8 border border-graphite/10"
                  )}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <item.icon size={15} className="relative z-10" />
              <span className="relative z-10 hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
