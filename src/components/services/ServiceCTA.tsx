"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/animations/FadeInView";
import { Phone } from "lucide-react";

interface ServiceCTAProps {
  cta: string;
}

export function ServiceCTA({ cta }: ServiceCTAProps) {
  return (
    <section className="relative section-padding bg-section-ivory overflow-hidden">
      <Container className="relative">
        <FadeInView>
          <div className="card-solid mx-auto max-w-[600px] p-10 text-center">
            <h2 className="mb-3 font-serif text-[1.625rem] leading-[1.2] text-ink sm:text-[1.875rem]">
              Ready to Get Started?
            </h2>
            <p className="mb-6 text-[1rem] leading-[1.7] text-stone">
              Book a consultation. Get a digital report. Decide with confidence.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button href="/#book" size="lg" variant="glass">{cta}</Button>
              <Button href="tel:+916378528881" variant="secondary" size="lg">
                <Phone size={14} className="mr-1.5" />
                Call Us
              </Button>
            </div>
            <p className="mt-4 text-[0.75rem] text-stone">
              Same-day appointments available · Free for new customers
            </p>
          </div>
        </FadeInView>
      </Container>
    </section>
  );
}
