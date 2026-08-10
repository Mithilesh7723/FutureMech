"use client";

import { Container } from "@/components/layout/Container";
import { FadeInView } from "@/components/animations/FadeInView";
import { CountUp } from "@/components/animations/CountUp";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { motion, useReducedMotion } from "framer-motion";

const metrics = [
  { number: "01", value: 2500, suffix: "+", label: "Batteries Inspected" },
  { number: "02", value: 97, suffix: "%", label: "Customer Satisfaction" },
  { number: "03", value: 12, suffix: "-Month", label: "Warranty Coverage" },
  { number: "04", value: 14, suffix: "-Point", label: "Inspection Process" },
];

function MetricCard({ metric }: { metric: typeof metrics[0] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <StaggerItem>
      <motion.div
        whileHover={shouldReduceMotion ? {} : { y: -4 }}
        className="card-solid group relative overflow-hidden p-6 text-center sm:p-8"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-bronze-light/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative">
          {/* Number container */}
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-bronze-light font-serif text-[1.125rem] font-bold text-bronze/30 transition-all duration-500 group-hover:bg-bronze group-hover:text-white-pure">
            {metric.number}
          </div>

          {/* Big number */}
          <div className="mb-3">
            <CountUp
              target={metric.value}
              suffix={metric.suffix}
              className="block font-serif text-[2.25rem] leading-none text-ink sm:text-[2.75rem]"
            />
          </div>

          {/* Label */}
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-stone sm:text-[0.75rem]">
            {metric.label}
          </p>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

export function TrustIndicators() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 texture-concrete" />
      <Container className="relative">
        <FadeInView>
          <div className="mb-16 text-center">
            <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bronze">
              Built on evidence
            </p>
            <h2 className="mb-4 font-serif text-[2.25rem] leading-[1.1] text-ink sm:text-[2.75rem] lg:text-[3.25rem]">
              Built on Evidence,<br />Not Promises
            </h2>
            <p className="mx-auto max-w-[480px] text-[1rem] leading-[1.7] text-stone">
              Every claim we make is backed by data. Every process is documented.
              Every customer receives proof.
            </p>
          </div>
        </FadeInView>

        <StaggerChildren staggerDelay={0.08} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <MetricCard key={i} metric={metric} />
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
