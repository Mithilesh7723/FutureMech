"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/animations/FadeInView";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const serviceImages: Record<string, string> = {
  "battery-regeneration": "https://images.unsplash.com/photo-1617886322168-72b886573c35?w=1920&h=900&fit=crop&q=80",
  "battery-diagnostics": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&h=900&fit=crop&q=80",
  "car-service": "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1920&h=900&fit=crop&q=80",
  "doorstep-service": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1920&h=900&fit=crop&q=80",
  "fleet-maintenance": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&h=900&fit=crop&q=80",
  "amc-plans": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&h=900&fit=crop&q=80",
  "pre-delivery-inspection": "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1920&h=900&fit=crop&q=80",
  "digital-vehicle-reports": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=900&fit=crop&q=80",
};

interface ServiceHeroProps {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  cta: string;
  ctaSecondary?: string;
  note?: string;
}

export function ServiceHero({ slug, title, tagline, description, cta, ctaSecondary, note }: ServiceHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imgSrc = serviceImages[slug];

  return (
    <section ref={heroRef} className="relative min-h-[70vh] overflow-hidden bg-section-ivory">
      {/* Full-bleed dramatic photo */}
      <motion.div
        className="absolute inset-0"
        style={shouldReduceMotion ? {} : { y: photoY }}
      >
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
      </motion.div>

      {/* Warm editorial overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-ivory/85 via-ivory/50 to-ivory/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-ivory/20" />

      <Container className="relative flex min-h-[60vh] sm:min-h-[70vh] items-center">
        <div className="w-full pt-28 pb-12 sm:pt-32 sm:pb-16 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div>
            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bronze">Our Service</p>
            </motion.div>

            <motion.h1
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-serif text-[2.75rem] leading-[1.08] text-ink sm:text-[3.5rem] lg:text-[4.25rem]"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-4 max-w-[440px] text-[1.125rem] leading-[1.7] text-graphite"
            >
              {tagline}
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button href="/#book" size="lg" variant="glass">{cta}</Button>
              {ctaSecondary && (
                <Button href="/#how-it-works" variant="glass" size="lg" className="bg-white-pure/60 backdrop-blur-sm">
                  {ctaSecondary}
                </Button>
              )}
            </motion.div>
          </div>

          {/* Description card — below CTA on mobile, right column on desktop */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 lg:mt-0 lg:block"
          >
            <div className="card-solid p-7 shadow-[0_16px_48px_rgba(0,0,0,0.06)]">
              <p className="text-[0.9375rem] leading-[1.75] text-stone">{description}</p>
              {note && (
                <div className="mt-5 rounded-xl border border-sage/20 bg-sage-light p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sage" />
                    <p className="text-[0.8125rem] leading-[1.65] text-graphite italic">{note}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
