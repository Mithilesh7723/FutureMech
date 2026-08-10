"use client";

import { HeroSection } from "@/components/ui/feature-carousel";
import { Container } from "@/components/layout/Container";
import { FadeInView } from "@/components/animations/FadeInView";
import { HOW_IT_WORKS_IMAGES } from "@/lib/images";

const carouselSteps = [
  {
    number: "01",
    title: "Book",
    tagline: "Your time, your schedule",
    description:
      "Schedule online or by phone. Pick a time that fits your routine. Same-day appointments available — no waiting, no hassle.",
  },
  {
    number: "02",
    title: "Diagnose",
    tagline: "Data, not guesswork",
    description:
      "Advanced 14-point diagnostics, capacity testing, and real-time data analysis — all documented with proof you can see.",
  },
  {
    number: "03",
    title: "Decide",
    tagline: "Evidence, not pressure",
    description:
      "We explain what we find with photos, readings, and documentation. You decide with complete information — zero pressure.",
  },
  {
    number: "04",
    title: "Service",
    tagline: "Expert care, documented",
    description:
      "Expert care with digital records, warranty documentation, and ongoing support. Every service has proof and accountability.",
  },
  {
    number: "05",
    title: "Support",
    tagline: "Always there for you",
    description:
      "Post-service follow-ups, warranty claims handled digitally, and a team that remembers your vehicle. Built for the long term.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden scroll-mt-[72px]"
    >
      <div className="absolute inset-0 bg-section-ivory texture-paper" />

      <Container className="relative">
        <FadeInView>
          <div className="mb-8 pt-8 text-center sm:mb-12 sm:pt-12">
            <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bronze">
              The process
            </p>
            <h2 className="mb-4 font-serif text-[2.25rem] leading-[1.1] text-ink sm:text-[2.75rem] lg:text-[3.25rem]">
              Transparent From<br className="hidden sm:block" /> Start to Finish
            </h2>
            <p className="mx-auto max-w-[480px] text-[1rem] leading-[1.7] text-stone">
              Every step documented. Every recommendation backed by data. Every customer receives the full picture.
            </p>
          </div>
        </FadeInView>
      </Container>

      <HeroSection
        title={
          <>
            Book.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bronze to-bronze-hover">
              Diagnose.
            </span>{" "}
            Decide. Service.
          </>
        }
        subtitle="Four simple steps to transparent automotive care. Every step documented, every recommendation backed by data."
        images={HOW_IT_WORKS_IMAGES}
        steps={carouselSteps}
      />
    </section>
  );
}
