"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeInView } from "@/components/animations/FadeInView";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { SERVICES } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import {
  RefreshCw, Activity, Car, MapPin, Truck, Calendar, ClipboardCheck, FileText, ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  RefreshCw, Activity, Car, MapPin, Truck, Calendar, ClipboardCheck, FileText,
};

const serviceImages: Record<string, string> = {
  "battery-regeneration": "https://images.unsplash.com/photo-1617886322168-72b886573c35?w=600&h=500&fit=crop&q=80",
  "battery-diagnostics": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=500&fit=crop&q=80",
  "car-service": "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600&h=500&fit=crop&q=80",
  "doorstep-service": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=500&fit=crop&q=80",
  "fleet-maintenance": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=500&fit=crop&q=80",
  "amc-plans": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=500&fit=crop&q=80",
  "pre-delivery-inspection": "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=500&fit=crop&q=80",
  "digital-vehicle-reports": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=500&fit=crop&q=80",
};

export function ServicesOverview() {
  return (
    <section className="relative section-padding bg-section-white overflow-hidden">
      <Container className="relative">
        <FadeInView>
          <SectionHeading
            label="Our services"
            heading="Comprehensive Automotive Care"
            subheading="From battery diagnostics to fleet maintenance — technology-driven services built on engineering, not assumptions."
          />
        </FadeInView>

        <StaggerChildren staggerDelay={0.05} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => {
            const imgSrc = serviceImages[service.slug];
            const isFeatured = service.slug === "battery-regeneration";
            return (
              <StaggerItem key={i} className={isFeatured ? "sm:col-span-2 lg:col-span-2" : ""}>
                <Link href={`/services/${service.slug}`} className="group block h-full">
                  <div className={`card-solid flex h-full flex-col overflow-hidden ${isFeatured ? "relative border-2 border-bronze/20 bg-gradient-to-br from-white-pure to-bronze/5" : ""}`}>
                    {isFeatured && (
                      <div className="absolute right-4 top-4 z-10 rounded-full bg-bronze/10 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-bronze backdrop-blur-sm">
                        Our Specialty
                      </div>
                    )}
                    {imgSrc && (
                      <div className={`relative overflow-hidden ${isFeatured ? "h-64" : "h-48"}`}>
                        <Image
                          src={imgSrc}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className={`mb-1.5 font-semibold text-ink group-hover:text-bronze transition-colors duration-200 ${isFeatured ? "text-[1.125rem]" : "text-[1rem]"}`}>
                        {service.title}
                      </h3>
                      <p className="mb-4 flex-1 text-[0.8125rem] leading-[1.6] text-stone">
                        {service.short}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-bronze sm:opacity-0 sm:translate-y-1 transition-all duration-300 sm:group-hover:opacity-100 sm:group-hover:translate-y-0">
                        Explore <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </Container>
    </section>
  );
}
