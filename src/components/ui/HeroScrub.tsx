"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type HeroScrubProps = {
  frameCount: number;
  frameUrl: (index: number) => string;
};

const PRELOAD_CONCURRENCY = 12;

function setCardStyle(card: HTMLDivElement | null, p: number) {
  if (!card) return;
  const s = card.style;
  if (p < 0.45) {
    s.width = "100vw";
    s.height = "100vh";
    s.transform = "translate(0,0)";
    s.borderRadius = "0";
    s.boxShadow = "none";
  } else if (p < 0.65) {
    const t = (p - 0.45) / 0.2;
    const e = t * t * (3 - 2 * t);
    s.width = `${100 - e * 44}vw`;
    s.height = `${100 - e * 14}vh`;
    s.transform = `translate(${e * 22}vw,${e * 3}vh)`;
    s.borderRadius = `${e * 8}px`;
    s.boxShadow = `${-e * 30}px 0 ${e * 80}px rgba(0,0,0,${e * 0.15})`;
  } else {
    s.width = "56vw";
    s.height = "86vh";
    s.transform = "translate(22vw,3vh)";
    s.borderRadius = "8px";
    s.boxShadow = "-30px 0 80px rgba(0,0,0,0.15)";
  }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

export function HeroScrub({ frameCount, frameUrl }: HeroScrubProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>(new Array(frameCount));
  const loadedRef = useRef<boolean[]>(new Array(frameCount).fill(false));
  const lastDrawnRef = useRef<number>(0);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const canvasSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const [ready, setReady] = useState(false);
  const [framesOk, setFramesOk] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const reduced = usePrefersReducedMotion();

  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!loadedRef.current[idx]) return;
    const img = imagesRef.current[idx];
    if (!img) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const { w, h } = canvasSizeRef.current;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, w, h);
    lastDrawnRef.current = idx;
  }, []);

  const findNearest = useCallback((target: number): number => {
    if (loadedRef.current[target]) return target;
    for (let d = 1; d < frameCount; d++) {
      if (target - d >= 0 && loadedRef.current[target - d]) return target - d;
      if (target + d < frameCount && loadedRef.current[target + d]) return target + d;
    }
    return -1;
  }, [frameCount]);

  const scheduleDraw = useCallback((index: number, progress: number) => {
    setCardStyle(cardRef.current, progress);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      if (index === lastDrawnRef.current) return;
      let useIdx = findNearest(index);
      if (useIdx === -1) useIdx = lastDrawnRef.current;
      drawFrame(useIdx);
    });
  }, [findNearest, drawFrame]);

  useEffect(() => {
    if (reduced) return;
    let destroyed = false;
    let loaded = 0;

    const canvas = canvasRef.current;
    if (canvas) {
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      canvas.width = cw;
      canvas.height = ch;
      canvasSizeRef.current = { w: cw, h: ch };
    }

    const onFrameLoad = (i: number) => {
      if (destroyed) return;
      loadedRef.current[i] = true;
      loaded++;
      setLoadProgress(Math.round((loaded / frameCount) * 100));

      if (i === 0) {
        drawFrame(0);
        setReady(true);
      }
    };

    const loadImage = (i: number) => {
      if (loadedRef.current[i]) return;
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(i);
      imagesRef.current[i] = img;
      img.onload = () => onFrameLoad(i);
      img.onerror = () => { if (i === 0) setFramesOk(false); };
    };

    loadImage(0);

    let nextFrame = 1;
    let inFlight = 0;

    const loadNext = () => {
      if (destroyed) return;
      while (inFlight < PRELOAD_CONCURRENCY && nextFrame < frameCount) {
        const idx = nextFrame++;
        inFlight++;
        const img = new Image();
        img.decoding = "async";
        img.src = frameUrl(idx);
        imagesRef.current[idx] = img;
        img.onload = () => { inFlight--; onFrameLoad(idx); loadNext(); };
        img.onerror = () => { inFlight--; loadNext(); };
      }
    };

    const startTimer = setTimeout(loadNext, 0);

    return () => {
      destroyed = true;
      clearTimeout(startTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced, frameCount, frameUrl, drawFrame]);

  useEffect(() => {
    if (reduced || !ready) return;
    const indicator = scrollIndicatorRef.current;
    if (!indicator) return;
    const ctx = gsap.context(() => {
      gsap.to(indicator, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "5% top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, [ready, reduced]);

  useEffect(() => {
    if (reduced) return;
    setCardStyle(cardRef.current, 0);
  }, [reduced]);

  useEffect(() => {
    if (reduced || !ready || !framesOk) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      setCardStyle(cardRef.current, 0);

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const frameIdx = Math.min(frameCount - 1, Math.round(p * (frameCount - 1)));
            scheduleDraw(frameIdx, p);
          },
        },
      });

      master.fromTo(
        headingRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" },
        0.48
      );
      master.to(headingRef.current, { opacity: 1, duration: 0.35 }, 0.5);

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [ready, framesOk, reduced, frameCount, scheduleDraw]);

  return (
    <>
      {/* ─── DESKTOP ─── */}
      <section
        ref={sectionRef}
        className="relative hidden w-full bg-section-ivory texture-paper md:block"
        style={{ height: "300vh" }}
      >
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          <div
            ref={headingRef}
            className="absolute left-0 top-0 z-10 flex h-full w-[44vw] items-center pl-[5vw] pr-[3vw] pt-[4vh] opacity-0"
          >
            <div className="max-w-[440px]">
              <p className="mb-4 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-bronze">
                Diagnostic-First Automotive Care
              </p>
              <h1 className="font-serif text-[3.25rem] leading-[1.08] text-ink lg:text-[4rem]">
                We Don&apos;t Sell.
                <br />
                <span className="text-bronze">We Diagnose.</span>
              </h1>
              <p className="mt-7 max-w-[380px] text-[1rem] leading-[1.8] text-graphite">
                Battery health reports, not sales pitches. 14-point digital
                diagnostics with transparent recommendations and proof of
                every service.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById("book");
                    if (el) window.scrollTo({ top: el.offsetTop - 72 + 200, behavior: "smooth" });
                  }}
                  className="inline-flex items-center rounded-xl bg-ink px-7 py-3.5 text-[0.875rem] font-medium text-white-pure transition-all duration-200 hover:bg-graphite"
                >
                  Book Free Health Check
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById("how-it-works");
                    if (el) window.scrollTo({ top: el.offsetTop - 72 + 200, behavior: "smooth" });
                  }}
                  className="inline-flex items-center rounded-xl border border-stone/30 px-7 py-3.5 text-[0.875rem] font-medium text-graphite transition-all duration-200 hover:border-stone/50 hover:text-ink"
                >
                  See How It Works
                </button>
              </div>
            </div>
          </div>

          <div
            ref={cardRef}
            className="relative z-20 overflow-hidden will-change-transform"
          >
            <div className="pointer-events-none absolute inset-0 z-30" />
            {framesOk ? (
              <canvas
                ref={canvasRef}
                className="h-full w-full"
                style={{ objectFit: "cover", imageRendering: "auto" }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-ink text-white/40">
                <p className="text-sm">Unable to load video frames.</p>
              </div>
            )}
          </div>

          {!reduced && (
            <div
              ref={scrollIndicatorRef}
              className="absolute bottom-8 left-1/2 z-40 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-stone/60">
                Scroll to explore
              </span>
              <div className="h-10 w-6 rounded-full border-2 border-stone/30 flex justify-center pt-2">
                <div className="h-2 w-1 rounded-full bg-stone/40 animate-bounce" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── MOBILE ─── */}
      <section className="relative h-[100dvh] flex flex-col justify-end overflow-hidden bg-ink md:hidden">
        {/* Static fallback — always visible, video layers on top */}
        <img
          src="/hero-frames-new/frame-0001.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
        />

        {/* Video background — overlays the static image when loaded */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src="/new_hero.mp4" type="video/mp4" />
        </video>

        {/* Cinematic gradient overlay — slightly dimmed for mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-transparent" />

        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.035] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1Ii8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')] pointer-events-none" />

        {/* Warm bronze glow — positioned behind headline */}
        <div className="absolute left-1/2 top-[55%] h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze/[0.07] blur-[70px] pointer-events-none" />

        {/* Content — anchored to bottom */}
        <div className="relative z-10 px-7 pb-10 pt-16">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-4 text-[0.5625rem] font-semibold uppercase tracking-[0.28em] text-bronze"
          >
            Diagnostic-First Automotive Care
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-[3rem] leading-[0.92] tracking-[-0.02em] text-white-pure sm:text-[3.5rem]"
          >
            We Don&apos;t Sell.
            <br />
            <span className="text-bronze">We Diagnose.</span>
          </motion.h1>

          {/* Bronze divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-5 h-px w-12 origin-left bg-gradient-to-r from-bronze/50 to-transparent"
          />

          {/* Body */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-4 max-w-[260px] text-[0.8125rem] leading-[1.65] text-white-pure/45"
          >
            Battery health reports, not sales pitches. Transparent diagnostics you can trust.
          </motion.p>

          {/* CTA buttons — clean, no glass card, just buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-7"
          >
            <button
              onClick={() => {
                const el = document.getElementById("book");
                if (el) window.scrollTo({ top: el.offsetTop - 72 + 200, behavior: "smooth" });
              }}
              className="w-full rounded-full bg-white-pure py-3.5 text-[0.875rem] font-semibold text-ink shadow-[0_2px_16px_rgba(0,0,0,0.12)] transition-all duration-200 active:scale-[0.97]"
            >
              Book Free Health Check
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("how-it-works");
                if (el) window.scrollTo({ top: el.offsetTop - 72 + 200, behavior: "smooth" });
              }}
              className="mt-2.5 w-full py-2.5 text-[0.8125rem] font-medium text-white-pure/35 transition-colors duration-200 hover:text-white-pure/55"
            >
              See how it works &rarr;
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <div className="h-8 w-5 rounded-full border border-white/15 flex justify-center pt-1.5">
            <div className="h-1.5 w-0.5 rounded-full bg-white/30 animate-bounce" />
          </div>
        </motion.div>
      </section>
    </>
  );
}
