"use client";

import { Container } from "@/components/layout/Container";
import { FadeInView } from "@/components/animations/FadeInView";
import Image from "next/image";

export function DigitalReports() {
  return (
    <section className="relative section-padding bg-section-white overflow-hidden">
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeInView>
            <div>
              <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bronze">
                Digital transparency
              </p>
              <h2 className="mb-4 font-serif text-[2rem] leading-[1.15] text-ink sm:text-[2.25rem]">
                Complete Transparency, Delivered Digitally
              </h2>
              <p className="mb-7 text-[1rem] leading-[1.75] text-stone">
                You receive a detailed report before and after service — including
                health scores, capacity data, and technician notes.
              </p>
              <div className="space-y-3">
                {[
                  "Health score with visual indicators",
                  "Capacity measurement vs rated capacity",
                  "Internal resistance readings",
                  "Before and after comparison",
                  "Technician observations and notes",
                  "Warranty documentation",
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-sage-light">
                      <svg className="h-3 w-3 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[0.875rem] text-graphite">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInView>

          <FadeInView delay={0.15}>
            <div className="relative">
              {/* Main image */}
              <div className="relative overflow-hidden rounded-2xl border border-parchment">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80"
                    alt="Digital vehicle health report dashboard"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Overlay card — solid, not glass */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-parchment bg-white-pure p-4 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-light">
                        <svg className="h-5 w-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[0.8125rem] font-semibold text-ink">Health Score: 87%</p>
                        <p className="text-[0.6875rem] text-stone">Battery condition: Good</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-sage-light px-3 py-1 text-[0.6875rem] font-medium text-sage">
                      Post-Service
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating element */}
              <div className="absolute top-3 right-3 rounded-xl border border-parchment bg-white-pure px-3 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <p className="text-[0.625rem] font-medium text-ink">Delivered to inbox</p>
              </div>
            </div>
          </FadeInView>
        </div>
      </Container>
    </section>
  );
}
