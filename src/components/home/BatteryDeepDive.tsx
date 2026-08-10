"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeInView } from "@/components/animations/FadeInView";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const processSteps = [
  { title: "Battery Health Inspection", description: "Visual and electrical assessment of battery condition." },
  { title: "Digital Diagnostics", description: "14-parameter diagnostic scan with real-time data." },
  { title: "Smart Charging", description: "Controlled multi-phase charging to dissolve sulfate crystals." },
  { title: "Cell Balancing", description: "Individual cell balancing for uniform performance." },
  { title: "Before & After Reports", description: "Complete digital documentation of results." },
  { title: "Warranty & Support", description: "Warranty based on post-regeneration condition." },
];

function ProcessStepItem({ step, index }: { step: typeof processSteps[0]; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [20, 0]);

  return (
    <motion.div
      ref={ref}
      style={shouldReduceMotion ? {} : { opacity, y }}
      className="group relative"
    >
      <div className="flex items-center gap-5 py-5">
        {/* Number container */}
        <motion.div
          whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-bronze-light font-serif text-[1.125rem] font-bold text-bronze/30 transition-all duration-500 group-hover:bg-bronze group-hover:text-white-pure"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="mb-1 text-[1rem] font-semibold text-ink">{step.title}</h3>
          <p className="text-[0.875rem] leading-[1.65] text-stone">{step.description}</p>
        </div>
      </div>

      {/* Separator line */}
      {index < processSteps.length - 1 && (
        <div className="ml-[68px] h-[1px] bg-parchment" />
      )}
    </motion.div>
  );
}

export function BatteryDeepDive() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative section-padding bg-section-white overflow-hidden">
      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeInView>
            <div>
              <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bronze">
                Battery Regeneration
              </p>
              <h2 className="mb-4 font-serif text-[2.25rem] leading-[1.1] text-ink sm:text-[2.75rem]">
                Restore Performance<br />Without Replacement
              </h2>
              <p className="mb-6 text-[1rem] leading-[1.75] text-stone">
                Battery regeneration is a controlled, technology-driven process
                that restores degraded lead-acid batteries to near-original capacity.
              </p>

              <blockquote className="border-l-[3px] border-sage py-2 pl-5 font-serif text-[1.125rem] italic leading-[1.6] text-graphite">
                Every battery we accept is one we can genuinely help. We turn
                away batteries that aren&apos;t suitable — that&apos;s how you know
                we&apos;re honest.
              </blockquote>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Cost Savings", "Proven Results", "Eco-Friendly", "Warranty"].map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    className="cursor-default rounded-full border border-parchment bg-linen px-3.5 py-1.5 text-[0.75rem] font-medium text-graphite transition-colors hover:border-bronze hover:text-bronze"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </FadeInView>

          <FadeInView delay={0.15}>
            <div className="relative">
              {/* Animated progress line at top */}
              <div className="mb-8 h-[2px] overflow-hidden rounded-full bg-parchment">
                <motion.div
                  style={shouldReduceMotion ? {} : { width: lineWidth }}
                  className="h-full bg-bronze"
                />
              </div>

              <div className="space-y-0">
                {processSteps.map((step, i) => (
                  <ProcessStepItem key={i} step={step} index={i} />
                ))}
              </div>
            </div>
          </FadeInView>
        </div>
      </Container>
    </section>
  );
}
