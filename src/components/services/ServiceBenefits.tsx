"use client";

import { Container } from "@/components/layout/Container";
import { FadeInView } from "@/components/animations/FadeInView";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

interface Benefit { title: string; description: string; }
interface ServiceBenefitsProps { benefits: Benefit[]; }

export function ServiceBenefits({ benefits }: ServiceBenefitsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative section-padding bg-section-white overflow-hidden">
      <Container className="relative">
        <FadeInView>
          <div className="mb-12 text-center">
            <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bronze">Why this matters</p>
            <h2 className="mb-4 font-serif text-[2.25rem] leading-[1.1] text-ink sm:text-[2.75rem]">
              Key Benefits
            </h2>
            <p className="mx-auto max-w-[480px] text-[1rem] leading-[1.7] text-stone">
              Every benefit is backed by real outcomes, not marketing promises.
            </p>
          </div>
        </FadeInView>

        <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-4 sm:grid-cols-2">
          {benefits.map((benefit, i) => (
            <FadeInView key={i} delay={i * 0.08}>
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                className="card-bordered group flex gap-4 p-5"
              >
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { rotate: 10, scale: 1.1 }}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-sage-light text-sage transition-colors duration-300 group-hover:bg-sage group-hover:text-white-pure"
                >
                  <Check size={18} />
                </motion.div>
                <div>
                  <h3 className="mb-1 text-[0.9375rem] font-semibold text-ink">{benefit.title}</h3>
                  <p className="text-[0.8125rem] leading-[1.65] text-stone">{benefit.description}</p>
                </div>
              </motion.div>
            </FadeInView>
          ))}
        </div>
      </Container>
    </section>
  );
}
