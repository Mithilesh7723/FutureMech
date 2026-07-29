import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { FadeInView } from "@/components/animations/FadeInView";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { SERVICES } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import {
  RefreshCw, Activity, Car, MapPin, Truck, Calendar, ClipboardCheck, FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Technology-driven automotive care services — battery diagnostics, regeneration, car service, doorstep service, fleet maintenance, and more.",
};

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

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative min-h-[55vh] overflow-hidden bg-ink">
          <div className="absolute inset-0 texture-grain" />
          <div className="absolute inset-0 pattern-grid opacity-10" />
          <Container className="relative flex min-h-[55vh] items-center">
            <div className="pt-32 pb-16">
              <FadeInView>
                <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bronze">Our Services</p>
                <h1 className="font-serif text-[2.75rem] leading-[1.08] text-white-pure sm:text-[3.5rem] lg:text-[4.25rem]">
                  Technology-Driven<br />Automotive Care
                </h1>
                <p className="mt-4 max-w-[500px] text-[1.0625rem] leading-[1.7] text-white-pure/50">
                  From battery diagnostics to fleet maintenance — every service is built on engineering, transparency, and honest recommendations.
                </p>
              </FadeInView>
            </div>
          </Container>
        </section>

        <section className="relative section-padding bg-section-white overflow-hidden">
          <Container className="relative">
            <StaggerChildren staggerDelay={0.05} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service, i) => {
                const Icon = iconMap[service.icon];
                const imgSrc = serviceImages[service.slug];
                return (
                  <StaggerItem key={i}>
                    <Link href={`/services/${service.slug}`} className="group block h-full">
                      <div className="card-solid flex h-full flex-col overflow-hidden">
                        {imgSrc && (
                          <div className="relative h-52 overflow-hidden">
                            <Image
                              src={imgSrc}
                              alt={service.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-ink/10 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white-pure shadow-[0_4px_12px_rgba(0,0,0,0.15)] text-bronze">
                                {Icon && <Icon size={18} />}
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="flex flex-1 flex-col p-5">
                          <h2 className="mb-1.5 text-[1.0625rem] font-semibold text-ink">{service.title}</h2>
                          <p className="text-[0.875rem] leading-[1.65] text-stone">{service.short}</p>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
