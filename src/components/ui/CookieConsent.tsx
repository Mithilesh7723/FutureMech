"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Never show on home page
    if (pathname === "/") return;

    // Already made a choice — never show again
    const choice = localStorage.getItem("fm-cookie-consent");
    if (choice) return;

    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleChoice = (accepted: boolean) => {
    localStorage.setItem("fm-cookie-consent", accepted ? "accepted" : "rejected");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[90] px-4 pb-4 sm:bottom-6 sm:px-6"
        >
          <div className="mx-auto flex max-w-[600px] flex-col items-start gap-4 rounded-2xl border border-parchment/30 bg-white-pure/90 px-6 py-5 shadow-[0_10px_40px_rgba(0,0,0,0.1)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <p className="text-[0.875rem] font-medium text-ink">
                We use cookies to enhance your experience.
              </p>
              <p className="mt-1 text-[0.75rem] leading-[1.6] text-stone">
                By continuing to browse, you agree to our use of cookies.{" "}
                <Link
                  href="/terms"
                  className="font-medium text-bronze underline decoration-bronze/30 underline-offset-2 transition-colors hover:text-bronze-hover"
                >
                  Terms & Conditions
                </Link>
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => handleChoice(false)}
                className="rounded-xl border border-parchment px-5 py-2.5 text-[0.8125rem] font-medium text-graphite transition-all duration-200 hover:bg-linen active:scale-[0.97]"
              >
                Reject
              </button>
              <button
                onClick={() => handleChoice(true)}
                className="rounded-xl bg-ink px-5 py-2.5 text-[0.8125rem] font-medium text-white-pure transition-all duration-200 hover:bg-graphite active:scale-[0.97]"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
