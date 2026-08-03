"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/animations/FadeInView";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/constants";

export function FinalCTA() {
  return (
    <section
      id="book"
      className="relative overflow-hidden bg-linen section-padding"
    >
      <div className="noise-overlay" />
      <Container>
        <FadeInView>
          <div className="mx-auto max-w-[640px] text-center">
            <h2 className="font-serif text-[2rem] leading-[1.15] text-ink sm:text-[2.5rem] lg:text-[2.75rem]">
              Your Battery Deserves Restoration, Not Replacement
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-stone">
              Book a free battery health check. Get a digital report. Restore
              performance — or know exactly when to replace.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="/#book" size="lg" variant="glass">
                Book Free Battery Health Check
              </Button>
              <Button href={`tel:${SITE.phone}`} variant="secondary" size="lg">
                <Phone size={16} className="mr-2" />
                Call Us
              </Button>
            </div>
            <p className="mt-6 text-[0.8125rem] text-stone">
              Free for new customers. No obligation. No sales pressure.
            </p>
          </div>
        </FadeInView>
      </Container>
    </section>
  );
}
