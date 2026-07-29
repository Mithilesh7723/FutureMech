"use client";

import { Container } from "@/components/layout/Container";
import { FadeInView } from "@/components/animations/FadeInView";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface Step { step: number; title: string; description: string; }
interface ServiceProcessProps { steps: Step[]; }

function ProcessStep({ step, index, total }: { step: Step; index: number; total: number }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.4], [-30, 0]);
  const numberScale = useTransform(scrollYProgress, [0.1, 0.5], [0.3, 1]);

  return (
    <motion.div
      ref={ref}
      style={shouldReduceMotion ? {} : { opacity }}
      className="relative"
    >
      <div className="flex gap-6 md:gap-10">
        {/* Left: Number + connector */}
        <div className="relative flex flex-col items-center">
          <motion.div
            style={shouldReduceMotion ? {} : { scale: numberScale }}
            className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-bronze font-serif text-[1.5rem] font-bold text-white-pure shadow-[0_8px_24px_rgba(139,115,85,0.3)]"
          >
            {step.step}
          </motion.div>
          {index < total - 1 && (
            <div className="w-[1px] flex-1 bg-gradient-to-b from-bronze/30 to-parchment" />
          )}
        </div>

        {/* Right: Content */}
        <motion.div
          style={shouldReduceMotion ? {} : { x }}
          className="flex-1 pb-10 pt-2 last:pb-0"
        >
          <h3 className="mb-2 font-serif text-[1.375rem] leading-[1.2] text-ink sm:text-[1.5rem]">
            {step.title}
          </h3>
          <p className="max-w-[480px] text-[0.9375rem] leading-[1.7] text-stone">
            {step.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ServiceProcess({ steps }: ServiceProcessProps) {
  return (
    <section className="relative section-padding bg-section-linen overflow-hidden">
      <Container className="relative">
        <FadeInView>
          <div className="mb-16 text-center">
            <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bronze">The process</p>
            <h2 className="mb-4 font-serif text-[2.25rem] leading-[1.1] text-ink sm:text-[2.75rem]">
              Step by Step
            </h2>
            <p className="mx-auto max-w-[480px] text-[1rem] leading-[1.7] text-stone">
              Every step is documented and explained. You always know what&apos;s happening.
            </p>
          </div>
        </FadeInView>

        <FadeInView delay={0.1}>
          <div className="mx-auto max-w-[600px]">
            {steps.map((step, i) => (
              <ProcessStep key={i} step={step} index={i} total={steps.length} />
            ))}
          </div>
        </FadeInView>
      </Container>
    </section>
  );
}
