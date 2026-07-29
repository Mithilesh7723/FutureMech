"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface FadeInViewProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export function FadeInView({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  className,
}: FadeInViewProps) {
  const shouldReduceMotion = useReducedMotion();

  const offset = { x: 0, y: 0 };
  if (direction === "up") offset.y = 24;
  else if (direction === "down") offset.y = -24;
  else if (direction === "left") offset.x = 24;
  else if (direction === "right") offset.x = -24;

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
