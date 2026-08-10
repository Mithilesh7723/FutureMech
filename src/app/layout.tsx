import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { SplashScreen } from "@/components/ui/SplashScreen";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-serif",
  weight: "400",
  style: ["normal", "italic"],
  preload: true,
});

const SITE_URL = "https://futuremech.horizonflare.in";

export const viewport: Viewport = {
  themeColor: "#1A1816",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FutureMech — Intelligent Automotive Care",
    template: "%s — FutureMech",
  },
  description:
    "Diagnose before recommending. Battery health diagnostics, regeneration, and preventive maintenance powered by technology and transparency. Based in Jaipur, Rajasthan.",
  keywords: [
    "battery regeneration Jaipur",
    "battery diagnostics Jaipur",
    "car service Jaipur",
    "automotive care Rajasthan",
    "battery health check",
    "fleet maintenance Jaipur",
    "doorstep car service Jaipur",
    "pre-delivery inspection",
    "PDI car inspection",
    "digital vehicle reports",
    "battery repair near me",
    "car mechanic Jaipur",
  ],
  authors: [{ name: "FutureMech" }],
  creator: "FutureMech",
  publisher: "FutureMech",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    title: "FutureMech — Intelligent Automotive Care",
    description:
      "We diagnose before recommending. Battery health reports, not sales pitches. Jaipur's most trusted automotive diagnostics.",
    url: SITE_URL,
    siteName: "FutureMech",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/FutureMEch Logo.png",
        width: 1200,
        height: 630,
        alt: "FutureMech - Intelligent Automotive Care",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FutureMech — Intelligent Automotive Care",
    description:
      "We diagnose before recommending. Battery health reports, not sales pitches.",
    images: ["/FutureMEch Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AutoRepair",
      name: "FutureMech",
      description:
        "Intelligent automotive care powered by technology, transparency, and trust. Battery diagnostics, regeneration, and preventive maintenance.",
      url: SITE_URL,
      image: "/FutureMEch Logo.png",
      telephone: "+916378528881",
      email: "hello@futuremech.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Nirman Nagar",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302019",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "26.9124",
        longitude: "75.7873",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "19:00",
        },
      ],
      priceRange: "$$",
      areaServed: {
        "@type": "City",
        name: "Jaipur",
      },
      sameAs: [],
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerif.variable} h-full`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/FutureMEch Logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/hero-frames-new/frame-0001.webp" type="image/webp" fetchPriority="high" />
        <link rel="preload" as="image" href="/FutureMEch Logo.png" fetchPriority="high" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <SplashScreen />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
