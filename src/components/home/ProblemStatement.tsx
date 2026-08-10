"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeInView } from "@/components/animations/FadeInView";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const questions = [
  {
    number: "01",
    question: "Does my battery actually need replacement?",
    context: "Most shops recommend replacement by default. We test first, recommend only when data supports it.",
    image: "https://images.unsplash.com/photo-1617886322168-72b886573c35?w=640&h=420&fit=crop&q=80",
  },
  {
    number: "02",
    question: "Am I wasting money on services I don't need?",
    context: "We only recommend what's necessary — every suggestion backed by diagnostic evidence you can see.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=640&h=420&fit=crop&q=80",
  },
  {
    number: "03",
    question: "Can I trust this recommendation?",
    context: "Every recommendation includes photos, readings, and documentation you can verify yourself.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=640&h=420&fit=crop&q=80",
  },
  {
    number: "04",
    question: "Will I receive proof of what was done?",
    context: "Complete digital reports with photos, data, and technician notes — delivered before you pay.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=420&fit=crop&q=80",
  },
];

function QuestionRow({ item, index }: { item: (typeof questions)[0]; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const reversed = index % 2 !== 0;
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 0.88", "end 0.25"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div ref={rowRef}>
      <FadeInView delay={0.04}>
        <motion.div
          style={{ y: shouldReduceMotion ? undefined : imgY }}
          className={`group flex flex-col items-center gap-6 overflow-hidden rounded-2xl sm:flex-row sm:gap-0 ${
            reversed ? "sm:flex-row-reverse" : ""
          }`}
        >
          {/* Image */}
          <div className="relative h-56 w-full shrink-0 overflow-hidden sm:h-72 sm:w-[55%] lg:h-80">
            <Image
              src={item.image}
              alt=""
              fill
              className="object-cover img-zoom"
              sizes="(max-width: 640px) 100vw, 55vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent sm:bg-gradient-to-r" />
            <span className="absolute left-5 top-5 font-serif text-[3rem] font-bold leading-none text-white-pure/15 sm:text-[4rem]">
              {item.number}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-center gap-3 px-6 py-6 sm:px-10 lg:px-14">
            <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-bronze sm:text-[0.6875rem]">
              Question {item.number}
            </span>
            <h3 className="font-serif text-[1.25rem] leading-[1.25] text-ink sm:text-[1.5rem] lg:text-[1.625rem]">
              {item.question}
            </h3>
            <p className="text-[0.8125rem] leading-[1.7] text-stone sm:text-[0.9375rem]">
              {item.context}
            </p>
          </div>
        </motion.div>
      </FadeInView>
    </div>
  );
}

export function ProblemStatement() {
  return (
    <section className="relative section-padding bg-section-white overflow-hidden">
      <Container className="relative">
        <FadeInView>
          <SectionHeading
            label="The real questions"
            heading="Questions You Deserve Answers To"
            subheading="Every car owner has these concerns. Most shops avoid them. We built our entire process around answering them."
          />
        </FadeInView>

        <div className="flex flex-col gap-6 sm:gap-8">
          {questions.map((q, i) => (
            <QuestionRow key={i} item={q} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
