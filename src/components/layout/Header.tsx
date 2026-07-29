"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { Menu, X, Home, Wrench, Settings, Info, Phone } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from "framer-motion";
import { MenuBar } from "@/components/ui/glow-menu";
import { consumePendingScroll, setPendingScroll } from "@/lib/pending-scroll";

const NAV_LINKS_MOBILE = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Contact", href: "/#contact" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
];

const DESKTOP_NAV_ITEMS = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Wrench, label: "Services", href: "/services" },
  { icon: Settings, label: "How It Works", href: "/#how-it-works" },
  { icon: Info, label: "About", href: "/about" },
  { icon: Phone, label: "Contact", href: "/#contact" },
];

const HEADER_HEIGHT = 72;

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setPastHero(y > window.innerHeight * 1.5);

      if (pathname === "/") {
        const sections = ["how-it-works", "contact", "book"];
        let found = "";
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= HEADER_HEIGHT + 100) {
              found = id;
            }
          }
        }
        setActiveHash(found);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on scroll
  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnScroll = () => setMobileOpen(false);
    window.addEventListener("scroll", closeOnScroll, { passive: true, capture: true });
    return () => window.removeEventListener("scroll", closeOnScroll, { capture: true });
  }, [mobileOpen]);

  useEffect(() => {
    const id = consumePendingScroll();
    if (!id) return;
    const isDesktop = window.innerWidth >= 768;
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        const offset = el.offsetTop - HEADER_HEIGHT + 200;
        window.scrollTo({ top: offset, behavior: isDesktop ? "instant" : "smooth" });
      } else if (attempts < 20) {
        attempts++;
        setTimeout(tryScroll, 100);
      }
    };
    setTimeout(tryScroll, 200);
  }, [pathname]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.offsetTop - HEADER_HEIGHT + 200;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("/#")) {
        e.preventDefault();
        const id = href.replace("/#", "");
        if (isHome) {
          scrollToSection(id);
        } else {
          setPendingScroll(id);
          router.push("/");
        }
        setMobileOpen(false);
        return;
      }
      if (href === "/" && isHome) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setMobileOpen(false);
        return;
      }
      setMobileOpen(false);
    },
    [isHome, router, scrollToSection]
  );

  const activeNavItem = (() => {
    if (pathname !== "/") {
      if (pathname.startsWith("/services")) return "Services";
      if (pathname === "/about") return "About";
      return "Home";
    }
    if (activeHash === "how-it-works") return "How It Works";
    if (activeHash === "contact") return "Contact";
    return "Home";
  })();

  const handleMenuItemClick = useCallback(
    (label: string) => {
      const item = DESKTOP_NAV_ITEMS.find((i) => i.label === label);
      if (!item) return;
      if (item.href.startsWith("/#")) {
        const id = item.href.replace("/#", "");
        if (isHome) {
          scrollToSection(id);
        } else {
          setPendingScroll(id);
          router.push("/");
        }
        return;
      }
      window.location.href = item.href;
    },
    [isHome, router, scrollToSection]
  );

  const showFrost = !isHome || pastHero;
  const showMobileHeroFrost = isHome && !pastHero;

  return (
    <>
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        showFrost
          ? "border-b border-parchment/40 bg-white/70 backdrop-blur-xl"
          : showMobileHeroFrost
            ? "border-b border-white/30 bg-white/40 backdrop-blur-xl md:bg-transparent md:backdrop-blur-none md:border-b-0"
            : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-[72px] w-full items-center justify-between px-[5vw]">
        <Link
          href="/"
          className="relative z-10"
          onClick={(e) => {
            e.preventDefault();
            if (isHome) {
              window.scrollTo({ top: 0, behavior: "instant" });
            } else {
              router.push("/");
            }
            setMobileOpen(false);
          }}
        >
          <Image
            src="/FutureMEch Logo.png"
            alt="FutureMech"
            width={180}
            height={40}
            className={cn(
              "h-8 w-auto transition-all duration-300 sm:h-9",
              showFrost ? "" : showMobileHeroFrost ? "" : "mix-blend-screen brightness-200 contrast-150"
            )}
            priority
          />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <MenuBar
            items={DESKTOP_NAV_ITEMS}
            activeItem={activeNavItem}
            onItemClick={handleMenuItemClick}
            dark={!showFrost}
            frosted={showFrost}
          />
        </div>

        <div className="hidden md:block">
          <Link
            href="/#book"
            onClick={(e) => handleNavClick(e, "/#book")}
            className={cn(
              "group relative inline-flex items-center overflow-hidden rounded-full px-6 py-2.5 text-[0.8125rem] font-medium transition-all duration-300",
              showFrost
                ? "bg-gradient-to-b from-white-pure via-white-pure to-[#e8e8e8] text-ink border border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.9)]"
                : "bg-ink/90 text-white-pure border border-ink/20 shadow-[0_2px_12px_rgba(0,0,0,0.15)] backdrop-blur-sm hover:bg-graphite"
            )}
          >
            <span className={cn(
              "absolute inset-x-0 top-0 h-[45%] rounded-t-full bg-gradient-to-b to-transparent",
              showFrost ? "from-white/70" : "from-white/10"
            )} aria-hidden="true" />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-full" aria-hidden="true" />
            <span className="relative z-10">Book Free Check</span>
          </Link>
        </div>

        {/* Hamburger — dark circle, always visible */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 md:hidden",
            showMobileHeroFrost
              ? "bg-ink/80 shadow-[0_2px_12px_rgba(0,0,0,0.1)]"
              : "bg-graphite shadow-[0_2px_12px_rgba(0,0,0,0.2)]"
          )}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X size={20} className="text-white-pure" strokeWidth={2.5} />
          ) : (
            <Menu size={20} className="text-white-pure" strokeWidth={2.5} />
          )}
        </button>
      </nav>
    </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Transparent overlay — click-away only, below header, no visual effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 bottom-0 top-[72px] z-30 md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={shouldReduceMotion ? {} : { y: -8, scaleY: 0.95 }}
              animate={{ y: 0, scaleY: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scaleY: 0.95 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-[5vw] left-auto top-[72px] z-40 w-[min(320px,90vw)] origin-top md:hidden"
            >
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-[0_16px_48px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
                <LayoutGroup>
                  <div className="flex flex-col gap-0.5 p-3">
                    {NAV_LINKS.map((link) => {
                      const isActive = link.label === activeNavItem;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className="group relative rounded-xl px-4 py-3 text-[1rem] font-medium text-white-pure/90 transition-colors"
                        >
                          {!isActive && (
                            <span className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-white/10" />
                          )}
                          {isActive && (
                            <motion.span
                              layoutId="active-mobile-menu-item"
                              className="absolute inset-0 rounded-xl bg-white/15 backdrop-blur-md border border-white/20"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          )}
                          <span className="relative z-10">{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </LayoutGroup>
                <div className="border-t border-white/15 p-3 pt-3">
                  <Link
                    href="/#book"
                    onClick={(e) => handleNavClick(e, "/#book")}
                    className="flex w-full items-center justify-center rounded-xl bg-white-pure px-7 py-3 text-[0.9375rem] font-medium text-ink active:bg-white-pure/90"
                  >
                    Book Free Check
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
