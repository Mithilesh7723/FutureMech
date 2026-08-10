"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ShadcnButton } from "@/components/ui/shadcn-button";
import { cn } from "@/lib/utils";

interface StepContent {
  number: string;
  title: string;
  tagline: string;
  description: string;
}

interface HeroProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  subtitle: string;
  images: { src: string; alt: string }[];
  steps: StepContent[];
}

export const HeroSection = React.forwardRef<HTMLDivElement, HeroProps>(
  ({ title, subtitle, images, steps, className, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const touchStartX = React.useRef(0);
    const touchEndX = React.useRef(0);

    const handleNext = React.useCallback(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, [images.length]);

    const handlePrev = React.useCallback(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    }, [images.length]);

    // Touch/swipe handlers
    const handleTouchStart = (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const diff = touchStartX.current - touchEndX.current;
      const threshold = 50;
      if (diff > threshold) {
        handleNext();
      } else if (diff < -threshold) {
        handlePrev();
      }
    };

    // Pause auto-rotate on touch/hover
    const [paused, setPaused] = React.useState(false);

    React.useEffect(() => {
      if (paused) return;
      const timer = setInterval(handleNext, 4000);
      return () => clearInterval(timer);
    }, [handleNext, paused]);

    const currentStep = steps[currentIndex];

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden bg-background text-foreground",
          className
        )}
        {...props}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 z-0 opacity-20" aria-hidden="true">
          <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(139,115,85,0.3),rgba(255,255,255,0))]" />
          <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(91,138,95,0.3),rgba(255,255,255,0))]" />
        </div>

        {/* Split Layout */}
        <div className="relative z-10 mx-auto max-w-7xl px-[5vw] py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — Content */}
            <div className="flex flex-col justify-center">
              {/* Step indicator */}
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bronze/10 font-serif text-[1rem] font-bold text-bronze">
                  {currentStep.number}
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-bronze/30 to-transparent" />
              </div>

              {/* Animated content */}
              <div key={currentIndex} className="animate-fade-in-up">
                <p className="mb-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-bronze sm:text-[0.8125rem]">
                  Step {currentStep.number}
                </p>
                <h3 className="mb-3 font-serif text-[1.75rem] leading-[1.1] text-ink sm:text-[2.5rem] lg:text-[3rem]">
                  {currentStep.title}
                </h3>
                <p className="mb-4 font-serif text-[1rem] italic text-bronze/70 sm:text-[1.125rem]">
                  {currentStep.tagline}
                </p>
                <p className="max-w-md text-[0.9375rem] leading-[1.75] text-stone sm:text-[1rem]">
                  {currentStep.description}
                </p>
              </div>

              {/* Step dots */}
              <div className="mt-8 flex items-center gap-2 sm:mt-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-300 sm:h-2",
                      i === currentIndex
                        ? "w-8 sm:w-8 bg-bronze"
                        : "w-2.5 sm:w-2 bg-stone/30 hover:bg-stone/50"
                    )}
                    aria-label={`Go to step ${i + 1}`}
                  />
                ))}
              </div>

              {/* Nav arrows */}
              <div className="mt-5 flex items-center gap-3 sm:mt-6">
                <ShadcnButton
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-full border-bronze/30 text-graphite hover:bg-bronze hover:text-white-pure"
                  onClick={handlePrev}
                  aria-label="Previous step"
                >
                  <ChevronLeft className="h-5 w-5" />
                </ShadcnButton>
                <ShadcnButton
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-full border-bronze/30 text-graphite hover:bg-bronze hover:text-white-pure"
                  onClick={handleNext}
                  aria-label="Next step"
                >
                  <ChevronRight className="h-5 w-5" />
                </ShadcnButton>
                <span className="ml-2 text-[0.8125rem] text-stone">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>
            </div>

            {/* Right — Carousel */}
            <div
              className="relative h-[350px] sm:h-[450px] lg:h-[520px] flex items-center justify-center [perspective:1200px]"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {images.map((image, index) => {
                const offset = index - currentIndex;
                const total = images.length;
                let pos = ((offset % total) + total) % total;
                if (pos > Math.floor(total / 2)) {
                  pos = pos - total;
                }

                const isCenter = pos === 0;
                const isAdjacent = Math.abs(pos) === 1;

                return (
                  <div
                    key={index}
                    className={cn(
                      "absolute transition-all duration-500 ease-in-out group",
                      "w-48 h-72 sm:w-64 sm:h-96 lg:w-72 lg:h-[460px]"
                    )}
                    style={{
                      transform: `translateX(${pos * 50}%) scale(${isCenter ? 1 : isAdjacent ? 0.82 : 0.65}) rotateY(${pos * -12}deg)`,
                      zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                      opacity: isCenter ? 1 : isAdjacent ? 0.35 : 0,
                      filter: isCenter ? "blur(0px)" : "blur(3px)",
                      visibility: Math.abs(pos) > 1 ? "hidden" : "visible",
                    }}
                  >
                    <div className="w-full h-full overflow-hidden rounded-2xl lg:rounded-3xl">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="object-cover w-full h-full border-2 border-foreground/8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] img-zoom"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

HeroSection.displayName = "HeroSection";
