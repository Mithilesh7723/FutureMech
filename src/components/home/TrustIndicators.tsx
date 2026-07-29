"use client";

import { Container } from "@/components/layout/Container";
import { FadeInView } from "@/components/animations/FadeInView";
import { CountUp } from "@/components/animations/CountUp";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { motion, useReducedMotion } from "framer-motion";

const BatteryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="16" height="10" rx="2" />
    <path d="M22 11v2" />
    <path d="M6 11v2" />
    <path d="M10 11v2" />
    <path d="M14 11v2" />
  </svg>
);

const SatisfactionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const WarrantyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const InspectionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const metrics = [
  { value: 2500, suffix: "+", label: "Batteries Inspected", icon: BatteryIcon },
  { value: 97, suffix: "%", label: "Customer Satisfaction", icon: SatisfactionIcon },
  { value: 12, suffix: "-Month", label: "Warranty Coverage", icon: WarrantyIcon },
  { value: 14, suffix: "-Point", label: "Inspection Process", icon: InspectionIcon },
];

function MetricCard({ metric, index }: { metric: typeof metrics[0]; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = metric.icon;

  return (
    <StaggerItem>
      <motion.div
        whileHover={shouldReduceMotion ? {} : { y: -4 }}
        className="card-solid group relative overflow-hidden p-6 text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-bronze-light/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-bronze-light text-bronze transition-colors duration-300 group-hover:bg-bronze group-hover:text-white-pure">
            <Icon />
          </div>

          <div className="mb-2">
            <CountUp
              target={metric.value}
              suffix={metric.suffix}
              className="block font-serif text-[2rem] leading-none text-ink sm:text-[2.5rem]"
            />
          </div>

          <p className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-stone">
            {metric.label}
          </p>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

export function TrustIndicators() {
  const shouldReduceMotion = useReducedMotion();

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

        <StaggerChildren staggerDelay={0.08} className="mb-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <MetricCard key={i} metric={metric} index={i} />
          ))}
        </StaggerChildren>

        <StaggerChildren staggerDelay={0.06}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { number: "01", title: "Transparent Process", description: "Every step of our process is documented and explained. You know exactly what's happening with your vehicle." },
              { number: "02", title: "Honest Recommendations", description: "If your battery doesn't need service, we'll tell you. Our goal is your trust, not a quick sale." },
              { number: "03", title: "Digital Documentation", description: "Complete digital records with photos, data, and technician notes. Your service history, always accessible." },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { y: -2 }}
                  className="card-bordered group h-full p-6"
                >
                  <div className="mb-4 font-serif text-[2rem] font-bold text-bronze/20 transition-colors duration-300 group-hover:text-bronze/40">
                    {item.number}
                  </div>
                  <h3 className="mb-2 text-[1rem] font-semibold text-ink">{item.title}</h3>
                  <p className="text-[0.875rem] leading-[1.65] text-stone">{item.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>
      </Container>
    </section>
  );
}
