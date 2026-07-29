"use client";

// ============================================================================
// BACKUP: Timeline Layout (commented out — kept for reference)
// ============================================================================
// To restore the alternating timeline layout, uncomment the code below
// and comment out the Feature Carousel import + usage at the bottom.
//
// import { Container } from "@/components/layout/Container";
// import { FadeInView } from "@/components/animations/FadeInView";
// import Image from "next/image";
//
// const steps = [
//   {
//     number: "01",
//     title: "Book",
//     tagline: "Your time, your schedule",
//     description: "Schedule online or by phone. Pick a time that fits your routine. Same-day appointments available.",
//     image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=1000&fit=crop&q=80",
//   },
//   {
//     number: "02",
//     title: "Diagnose",
//     tagline: "Data, not guesswork",
//     description: "Advanced diagnostics, 14-point inspection, capacity testing — all documented with real-time data you can see.",
//     image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=1000&fit=crop&q=80",
//   },
//   {
//     number: "03",
//     title: "Decide",
//     tagline: "Evidence, not pressure",
//     description: "We explain what we find — with photos, readings, and documentation. You decide with complete information.",
//     image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=1000&fit=crop&q=80",
//   },
//   {
//     number: "04",
//     title: "Service",
//     tagline: "Expert care, documented",
//     description: "Expert care with digital records, warranty documentation, and ongoing support. Every service has proof.",
//     image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&h=1000&fit=crop&q=80",
//   },
// ];
//
// function StepImage({ step }) {
//   return (
//     <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
//       <div className="relative aspect-[4/3] overflow-hidden">
//         <Image src={step.image} alt="" fill className="object-cover transition-transform duration-700 hover:scale-105" sizes="(max-width: 1024px) 100vw, 42vw" />
//       </div>
//       <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
//     </div>
//   );
// }
//
// function StepContent({ step, align }) {
//   return (
//     <div className={align === "right" ? "lg:text-right" : ""}>
//       <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-bronze">Step {step.number}</p>
//       <h3 className="mb-1 font-serif text-[2rem] leading-[1.1] text-ink sm:text-[2.5rem] lg:text-[2.75rem]">{step.title}</h3>
//       <p className="mb-3 font-serif text-[1rem] italic text-bronze/70 sm:text-[1.125rem]">{step.tagline}</p>
//       <p className="max-w-sm text-[0.9375rem] leading-[1.75] text-stone">{step.description}</p>
//     </div>
//   );
// }
//
// export function HowItWorks() {
//   return (
//     <section id="how-it-works" className="relative section-padding overflow-hidden scroll-mt-[72px]">
//       <div className="absolute inset-0 bg-section-ivory texture-paper" />
//       <Container className="relative">
//         <FadeInView>
//           <div className="mb-16 text-center sm:mb-20">
//             <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bronze">The process</p>
//             <h2 className="mb-4 font-serif text-[2.25rem] leading-[1.1] text-ink sm:text-[2.75rem] lg:text-[3.25rem]">Transparent From<br className="hidden sm:block" /> Start to Finish</h2>
//             <p className="mx-auto max-w-[480px] text-[1rem] leading-[1.7] text-stone">Every step documented. Every recommendation backed by data. Every customer receives the full picture.</p>
//           </div>
//         </FadeInView>
//         <div className="relative mx-auto max-w-5xl">
//           <div className="absolute left-[26px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-bronze/5 via-bronze/30 to-bronze/5 lg:left-1/2 lg:-translate-x-1/2">
//             <div className="timeline-line absolute inset-0 bg-gradient-to-b from-bronze/40 via-bronze to-bronze/40" />
//           </div>
//           <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
//             {steps.map((step, i) => {
//               const isLeft = i % 2 === 0;
//               return (
//                 <div key={i} className="relative">
//                   <div className="flex items-start gap-6 lg:hidden">
//                     <div className="relative z-10 flex-shrink-0">
//                       <div className="timeline-node flex h-12 w-12 items-center justify-center rounded-full border-2 border-bronze/40 bg-ink font-serif text-[1rem] font-bold text-bronze shadow-[0_0_24px_rgba(139,115,85,0.2)]">{step.number}</div>
//                     </div>
//                     <div className="flex-1 pt-1"><StepContent step={step} align="left" /></div>
//                   </div>
//                   <div className="mt-6 pl-[60px] lg:hidden"><StepImage step={step} /></div>
//                   <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-12">
//                     <div className={isLeft ? "" : "text-right"}>
//                       {isLeft ? (<div className="step-enter-left" style={{ animationDelay: `${i * 0.2}s` }}><StepContent step={step} align="right" /></div>) : (<div className="step-enter-right" style={{ animationDelay: `${i * 0.2}s` }}><StepImage step={step} /></div>)}
//                     </div>
//                     <div className="relative z-10 flex justify-center">
//                       <div className="timeline-node flex h-14 w-14 items-center justify-center rounded-full border-2 border-bronze/40 bg-ink font-serif text-[1.25rem] font-bold text-bronze shadow-[0_0_24px_rgba(139,115,85,0.2)]">{step.number}</div>
//                     </div>
//                     <div>
//                       {isLeft ? (<div className="step-enter-right" style={{ animationDelay: `${i * 0.2}s` }}><StepImage step={step} /></div>) : (<div className="step-enter-left" style={{ animationDelay: `${i * 0.2}s` }}><StepContent step={step} align="left" /></div>)}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }
// ============================================================================

import { HeroSection } from "@/components/ui/feature-carousel";
import { Container } from "@/components/layout/Container";
import { FadeInView } from "@/components/animations/FadeInView";

const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=800&fit=crop&q=80",
    alt: "Digital battery diagnostics on screen",
  },
  {
    src: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=800&fit=crop&q=80",
    alt: "Advanced automotive diagnostic equipment",
  },
  {
    src: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=800&fit=crop&q=80",
    alt: "Professional car service bay",
  },
  {
    src: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600&h=800&fit=crop&q=80",
    alt: "Expert mechanic performing battery service",
  },
  {
    src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=800&fit=crop&q=80",
    alt: "Doorstep automotive service in action",
  },
];

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
        images={carouselImages}
        steps={carouselSteps}
      />
    </section>
  );
}
