"use client";

import { Container } from "@/components/layout/Container";
import { FadeInView } from "@/components/animations/FadeInView";
import { SITE } from "@/lib/constants";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactItems = [
  { icon: Phone, title: "Call Us", detail: SITE.phone, sub: "Available during business hours" },
  { icon: Mail, title: "Email Us", detail: SITE.email, sub: "We respond within a few hours" },
  { icon: MapPin, title: "Visit Us", detail: `${SITE.city}, ${SITE.state}`, sub: "Walk-ins welcome" },
  { icon: Clock, title: "Business Hours", detail: "Mon–Sat: 9 AM – 7 PM", sub: "Sunday: By appointment" },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative section-padding overflow-hidden scroll-mt-[72px]">
      <div className="absolute inset-0 texture-concrete" />
      <Container className="relative">
        <FadeInView>
          <div className="mb-12 text-center">
            <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bronze">
              Get in touch
            </p>
            <h2 className="mb-4 font-serif text-[2rem] leading-[1.15] text-ink sm:text-[2.25rem]">
              We&apos;re Here to Help
            </h2>
            <p className="mx-auto max-w-[440px] text-[1rem] leading-[1.7] text-stone">
              Have a question? Need to book a service? Reach out — we respond within a few hours.
            </p>
          </div>
        </FadeInView>

        <FadeInView delay={0.1}>
          <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-4 sm:grid-cols-2">
            {contactItems.map((item, i) => (
              <div key={i} className="card-solid p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-bronze-light text-bronze">
                  <item.icon size={16} />
                </div>
                <h3 className="mb-0.5 text-[0.9375rem] font-semibold text-ink">{item.title}</h3>
                <p className="text-[0.875rem] text-graphite">{item.detail}</p>
                <p className="mt-0.5 text-[0.6875rem] text-stone">{item.sub}</p>
              </div>
            ))}
          </div>
        </FadeInView>
      </Container>
    </section>
  );
}
