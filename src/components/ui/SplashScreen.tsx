"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0908]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ animation: "splash-auto-hide 0.6s ease-in-out 4s forwards" }}
        >
          {/* Grain */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1Ii8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')] pointer-events-none" />

          {/* Glow behind car */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.5, ease: EASE }}
            className="absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-[55%] rounded-full bg-bronze/[0.08] blur-[80px] pointer-events-none"
          />

          {/* Car silhouette — BIG and BRIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.2, ease: EASE }}
            className="relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1050 400"
              className="w-[320px] sm:w-[420px] h-auto"
            >
              <defs>
                <linearGradient id="sp" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C9A97C" />
                  <stop offset="50%" stopColor="#E8D5B7" />
                  <stop offset="100%" stopColor="#8B7355" />
                </linearGradient>
                <filter id="sp-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g filter="url(#sp-glow)">
                <path d="M 240 215 Q 360 170 470 200 Q 360 190 240 215 Z" fill="url(#sp)" />
                <path d="M 350 160 Q 540 60 880 200 Q 540 95 350 160 Z" fill="url(#sp)" />
                <path d="M 510 205 Q 670 220 860 190 Q 670 205 510 205 Z" fill="url(#sp)" />

              </g>
            </svg>
          </motion.div>

          {/* Thin line below */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.0, duration: 0.8, ease: EASE }}
            className="absolute bottom-[38%] h-px w-[120px] bg-gradient-to-r from-transparent via-bronze/40 to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
