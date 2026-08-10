"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeInView } from "@/components/animations/FadeInView";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { SERVICES } from "@/lib/constants";
import { SERVICE_IMAGES } from "@/lib/images";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

function Card({ service }: { service: (typeof SERVICES)[number] }) {
  const imgs = SERVICE_IMAGES[service.slug as keyof typeof SERVICE_IMAGES];
  const featured = service.slug === "battery-regeneration";

  return (
    <Link href={`/services/${service.slug}`} className="group relative block h-full overflow-hidden rounded-2xl">
      {imgs && (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={imgs.card}
            alt={imgs.alt}
            fill
            className="object-cover img-zoom"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent transition-all duration-[4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:from-ink/85 group-hover:via-ink/25" />
        </div>
      )}

      {featured && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-bronze px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-white-pure shadow-lg transition-all duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
          Our Specialty
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[-6px]">
        <h3 className="mb-1 text-[1.125rem] font-semibold text-white-pure sm:text-[1.25rem]">
          {service.title}
        </h3>
        <p className="text-[0.8125rem] leading-[1.5] text-white-pure/70">
          {service.short}
        </p>
      </div>

      <div className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white-pure/10 text-white-pure opacity-0 backdrop-blur-sm transition-all duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
        <ArrowRight size={16} />
      </div>
    </Link>
  );
}

export function ServicesOverview() {
  const regen = SERVICES.find((s) => s.slug === "battery-regeneration")!;
  const diag = SERVICES.find((s) => s.slug === "battery-diagnostics")!;
  const car = SERVICES.find((s) => s.slug === "car-service")!;
  const door = SERVICES.find((s) => s.slug === "doorstep-service")!;
  const fleet = SERVICES.find((s) => s.slug === "fleet-maintenance")!;
  const amc = SERVICES.find((s) => s.slug === "amc-plans")!;
  const pdi = SERVICES.find((s) => s.slug === "pre-delivery-inspection")!;
  const digital = SERVICES.find((s) => s.slug === "digital-vehicle-reports")!;

  return (
    <section className="relative section-padding overflow-hidden" style={{ backgroundColor: "#F5F4F0" }}>
      <Container className="relative">
        <FadeInView>
          <SectionHeading
            label="Our services"
            heading="Comprehensive Automotive Care"
            subheading="From battery diagnostics to fleet maintenance — technology-driven services built on engineering, not assumptions."
          />
        </FadeInView>

        <StaggerChildren staggerDelay={0.06}>
          <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-[280px_280px]">
            <StaggerItem className="md:col-span-2">
              <Card service={regen} />
            </StaggerItem>
            <StaggerItem>
              <Card service={diag} />
            </StaggerItem>
            <StaggerItem>
              <Card service={car} />
            </StaggerItem>
            <StaggerItem className="md:col-span-2">
              <Card service={door} />
            </StaggerItem>
          </div>
        </StaggerChildren>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[fleet, amc, pdi, digital].map((s) => (
            <div key={s.slug} className="h-[280px]">
              <Card service={s} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
