"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { FadeInView } from "@/components/animations/FadeInView";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface FAQ { question: string; answer: string; }
interface ServiceFAQProps { faqs: FAQ[]; }

export function ServiceFAQ({ faqs }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative section-padding bg-section-white overflow-hidden">
      <Container className="relative">
        <FadeInView>
          <div className="mb-12 text-center">
            <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bronze">Common questions</p>
            <h2 className="mb-4 font-serif text-[2.25rem] leading-[1.1] text-ink sm:text-[2.75rem]">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-[480px] text-[1rem] leading-[1.7] text-stone">
              Honest answers to real questions.
            </p>
          </div>
        </FadeInView>

        <FadeInView delay={0.1}>
          <div className="mx-auto max-w-[640px] space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-bordered overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="pr-4 text-[0.9375rem] font-medium text-ink">{faq.question}</span>
                  <motion.div
                    animate={shouldReduceMotion ? {} : { rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={18} className="flex-shrink-0 text-stone" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      initial={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="border-t border-parchment px-5 pb-5 pt-4">
                        <p className="text-[0.9375rem] leading-[1.7] text-stone">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </FadeInView>
      </Container>
    </section>
  );
}
