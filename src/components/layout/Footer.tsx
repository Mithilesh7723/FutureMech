import Link from "next/link";
import { SITE } from "@/lib/constants";

const socialLinks = [
  {
    name: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[1.125rem] w-[1.125rem]">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[1.125rem] w-[1.125rem]">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.73-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[1.125rem] w-[1.125rem]">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[1.125rem] w-[1.125rem]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const services = [
  { label: "Battery Regeneration", href: "/services/battery-regeneration" },
  { label: "Battery Diagnostics", href: "/services/battery-diagnostics" },
  { label: "Car Service", href: "/services/car-service" },
  { label: "Doorstep Service", href: "/services/doorstep-service" },
  { label: "Fleet Maintenance", href: "/services/fleet-maintenance" },
  { label: "AMC Plans", href: "/services/amc-plans" },
  { label: "Pre-Delivery Inspection", href: "/services/pre-delivery-inspection" },
  { label: "Digital Reports", href: "/services/digital-vehicle-reports" },
];

const company = [
  { label: "About Us", href: "/about" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Contact", href: "/#contact" },
  { label: "Terms & Conditions", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-parchment/10">
      {/* Premium dark background with warm undertone */}
      <div className="absolute inset-0 bg-[#1a1816]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#222019] via-[#1a1816] to-[#151311]" />
      <div className="absolute inset-0 texture-grain opacity-30" />

      {/* SVG watermark logo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden px-[5vw]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1050 400"
          className="h-auto w-full max-w-[800px] opacity-[0.55]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="footer-bronze" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6D5A43" />
              <stop offset="20%" stopColor="#8B7355" />
              <stop offset="40%" stopColor="#C9A97C" />
              <stop offset="60%" stopColor="#8B7355" />
              <stop offset="80%" stopColor="#5B4A35" />
              <stop offset="100%" stopColor="#6D5A43" />
            </linearGradient>
            <linearGradient id="footer-dark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3D3A36" />
              <stop offset="40%" stopColor="#1A1816" />
              <stop offset="70%" stopColor="#0A0908" />
              <stop offset="100%" stopColor="#2A2826" />
            </linearGradient>
            <filter id="footer-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.2" />
            </filter>
          </defs>

          <g filter="url(#footer-shadow)">
            {/* Left Arch */}
            <path d="M 240 215 Q 360 170 470 200 Q 360 190 240 215 Z" fill="url(#footer-bronze)" />
            {/* Main Top Canopy */}
            <path d="M 350 160 Q 540 60 880 200 Q 540 95 350 160 Z" fill="url(#footer-bronze)" />
            {/* Right Arch */}
            <path d="M 510 205 Q 670 220 860 190 Q 670 205 510 205 Z" fill="url(#footer-bronze)" />
            {/* Stylized E bars */}
            <rect x="790" y="258" width="55" height="10" rx="2" fill="url(#footer-bronze)" />
            <rect x="790" y="284" width="55" height="10" rx="2" fill="url(#footer-bronze)" />
            <rect x="790" y="310" width="55" height="10" rx="2" fill="url(#footer-bronze)" />
          </g>

          {/* Typography */}
          <g fontFamily="'Cinzel', 'Didot', 'Times New Roman', serif" fontSize="85" fill="url(#footer-dark)" stroke="url(#footer-bronze)" strokeWidth="0.5">
            <text x="140" y="320">F</text>
            <text x="230" y="320">U</text>
            <text x="320" y="320">T</text>
            <text x="410" y="320">U</text>
            <text x="500" y="320">R</text>
            <text x="590" y="320">E</text>
            <text x="680" y="320">M</text>
            <text x="885" y="320">C</text>
            <text x="975" y="320">H</text>
          </g>
        </svg>
      </div>

      {/* Frost glow at top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze/20 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1400px] px-[5vw]">
          <div className="grid grid-cols-1 gap-8 pt-16 pb-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand + Social column */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <div className="relative flex-1 rounded-2xl bg-white/[0.04] px-6 py-6 backdrop-blur-md">
              {/* Subtle decorative orbs */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-bronze/[0.08] blur-3xl" />
              <div className="pointer-events-none absolute -left-6 bottom-12 h-24 w-24 rounded-full bg-bronze/[0.05] blur-2xl" />
              <Link href="/" className="inline-block group relative z-10">
                <span className="font-serif text-[1.75rem] font-normal tracking-[0.04em] text-parchment transition-colors duration-300 group-hover:text-bronze">
                  FUTURE<span className="text-bronze"> MECH</span>
                </span>
              </Link>
              <p className="mt-4 max-w-[280px] text-[0.8125rem] leading-[1.8] text-sand/60">
                {SITE.description}
              </p>
            </div>
            <div className="flex-1 flex flex-col rounded-2xl bg-white/[0.04] px-6 py-5 backdrop-blur-md">
              <h4 className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-bronze">
                Follow Us
              </h4>
              <ul className="mt-auto space-y-1">
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <span
                      className="flex items-center gap-3 rounded-lg px-3 py-2 -mx-3 text-[0.8125rem] text-sand/50 transition-all duration-300 hover:bg-white/[0.04] hover:text-parchment cursor-default"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-parchment/10 bg-white/[0.03] text-bronze/60 transition-all duration-300">
                        {social.icon}
                      </span>
                      <span className="transition-all duration-300">{social.name}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Services column */}
          <div className="flex flex-col lg:col-span-4 lg:col-start-5">
            <div className="flex-1 flex flex-col rounded-2xl bg-white/[0.04] px-6 py-8 backdrop-blur-md">
              <h4 className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-bronze">
                Services
              </h4>
              <ul className="space-y-3.5">
                {services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group/link flex items-center rounded-lg px-3 py-2 -mx-3 text-[0.8125rem] text-sand/50 transition-all duration-300 hover:bg-white/[0.04] hover:text-parchment"
                    >
                      <span className="mr-0 inline-block w-0 overflow-hidden text-bronze transition-all duration-300 group-hover/link:mr-2.5 group-hover/link:w-3">/</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Company + Get in Touch */}
          <div className="flex flex-col gap-4 lg:col-span-4 lg:col-start-9">
            <div className="flex-1 rounded-2xl bg-white/[0.04] px-6 py-6 backdrop-blur-md">
              <h4 className="mb-5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-bronze">
                Company
              </h4>
              <ul className="space-y-1">
                {company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group/link flex items-center rounded-lg px-3 py-2 -mx-3 text-[0.8125rem] text-sand/50 transition-all duration-300 hover:bg-white/[0.04] hover:text-parchment"
                    >
                      <span className="mr-0 inline-block w-0 overflow-hidden text-bronze transition-all duration-300 group-hover/link:mr-2.5 group-hover/link:w-3">/</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 rounded-2xl bg-white/[0.04] px-6 py-6 backdrop-blur-md">
              <h4 className="mb-5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-bronze">
                Get in Touch
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="group/contact flex items-center gap-3 rounded-lg px-3 py-2 -mx-3 text-[0.8125rem] text-sand/50 transition-all duration-300 hover:bg-white/[0.04] hover:text-parchment">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-parchment/10 bg-white/[0.03] text-[0.6875rem] text-bronze/60 transition-all duration-300 group-hover/contact:border-bronze/30 group-hover/contact:bg-bronze/10">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </span>
                    {SITE.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE.email}`} className="group/contact flex items-center gap-3 rounded-lg px-3 py-2 -mx-3 text-[0.8125rem] text-sand/50 transition-all duration-300 hover:bg-white/[0.04] hover:text-parchment">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-parchment/10 bg-white/[0.03] text-[0.6875rem] text-bronze/60 transition-all duration-300 group-hover/contact:border-bronze/30 group-hover/contact:bg-bronze/10">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </span>
                    {SITE.email}
                  </a>
                </li>
                <li className="flex items-center gap-3 px-3 py-2 -mx-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-parchment/10 bg-white/[0.03] text-[0.6875rem] text-bronze/60">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  <span className="text-[0.8125rem] text-sand/50">{SITE.address}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative border-t border-parchment/[0.06] py-6 overflow-hidden">
          {/* Full-width watermark behind content — desktop only */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1050 400" className="pointer-events-none absolute inset-0 left-1/2 top-1/2 hidden h-full -translate-x-1/2 -translate-y-[65%] opacity-40 sm:block" aria-hidden="true">
            <defs>
              <linearGradient id="bottom-bronze" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6D5A43" />
                <stop offset="30%" stopColor="#C9A97C" />
                <stop offset="60%" stopColor="#8B7355" />
                <stop offset="100%" stopColor="#6D5A43" />
              </linearGradient>
            </defs>
            <path d="M 240 215 Q 360 170 470 200 Q 360 190 240 215 Z" fill="url(#bottom-bronze)" />
            <path d="M 350 160 Q 540 60 880 200 Q 540 95 350 160 Z" fill="url(#bottom-bronze)" />
            <path d="M 510 205 Q 670 220 860 190 Q 670 205 510 205 Z" fill="url(#bottom-bronze)" />
            <rect x="790" y="258" width="55" height="10" rx="2" fill="url(#bottom-bronze)" />
            <rect x="790" y="284" width="55" height="10" rx="2" fill="url(#bottom-bronze)" />
            <rect x="790" y="310" width="55" height="10" rx="2" fill="url(#bottom-bronze)" />
            <g fontFamily="'Cinzel', 'Didot', 'Times New Roman', serif" fontSize="85" fill="url(#bottom-bronze)">
              <text x="140" y="320">F</text>
              <text x="230" y="320">U</text>
              <text x="320" y="320">T</text>
              <text x="410" y="320">U</text>
              <text x="500" y="320">R</text>
              <text x="590" y="320">E</text>
              <text x="680" y="320">M</text>
              <text x="885" y="320">C</text>
              <text x="975" y="320">H</text>
            </g>
          </svg>
          <div className="relative z-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-[0.75rem] text-sand/30">
              &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.{" "}
              <Link
                href="/terms"
                className="transition-colors duration-300 hover:text-sand/50"
              >
                Terms & Conditions
              </Link>
            </p>
            <p className="text-[0.6875rem] tracking-wide text-sand/20">
              Designed with precision by{" "}
              <a
                href="https://horizonflare.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sand/30 underline decoration-sand/10 underline-offset-2 transition-colors duration-300 hover:text-sand/50"
              >
                Horizon Flare India
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
