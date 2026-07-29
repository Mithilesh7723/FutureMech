"use client";

import { Container } from "@/components/layout/Container";
import { FadeInView } from "@/components/animations/FadeInView";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";

const testimonials = [
  {
    quote:
      "They told me my battery didn't need replacement — even though that meant losing a sale. That's when I knew I could trust them.",
    name: "Rahul M.",
    detail: "SUV Owner, Jaipur",
    vehicle: "Hyundai Creta",
    avatar: "R",
  },
  {
    quote:
      "The digital report was something I'd never seen before. Real data, real photos, real explanation. No other shop has ever done that.",
    name: "Priya K.",
    detail: "EV Owner, Jaipur",
    vehicle: "Tata Nexon EV",
    avatar: "P",
  },
  {
    quote:
      "My fleet of 40 vehicles now has centralized battery health reports. Downtime has dropped by 20% since we started with FutureMech.",
    name: "Ankit S.",
    detail: "Fleet Manager, Jaipur",
    vehicle: "Commercial Fleet",
    avatar: "A",
  },
];

export function Testimonials() {
  return (
    <section className="relative section-padding bg-section-ivory overflow-hidden">
      <Container className="relative">
        <FadeInView>
          <div className="mb-12 text-center md:mb-16">
            <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bronze">
              What people say
            </p>
            <h2 className="font-serif text-[2.25rem] leading-[1.1] text-ink sm:text-[2.75rem] lg:text-[3.25rem]">
              Trusted by Real Customers
            </h2>
          </div>
        </FadeInView>

        <StaggerChildren
          staggerDelay={0.08}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <div className="card-solid flex h-full flex-col p-7">
                {/* Stars */}
                <div className="mb-5 flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="h-4 w-4 text-amber-muted" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="mb-6 flex-1 font-serif text-[1.0625rem] italic leading-[1.65] text-graphite">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3 border-t border-parchment pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bronze text-white-pure font-semibold text-[0.875rem]">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-[0.875rem] font-semibold text-ink">{t.name}</p>
                    <p className="text-[0.75rem] text-stone">{t.vehicle} · {t.detail}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
