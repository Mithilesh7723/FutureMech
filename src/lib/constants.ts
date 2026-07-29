export const SITE = {
  name: "FutureMech",
  tagline: "Intelligent Automotive Care",
  description:
    "Diagnose before recommending. Battery health diagnostics, regeneration, and preventive maintenance powered by technology and transparency.",
  phone: "+91 63785 28881",
  email: "hello@futuremech.in",
  address: "Nirman Nagar, Jaipur, Rajasthan 302019",
  city: "Jaipur",
  state: "Rajasthan",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const SERVICES = [
  {
    slug: "battery-regeneration",
    title: "Battery Regeneration",
    short: "Restore performance without replacement.",
    icon: "RefreshCw",
  },
  {
    slug: "battery-diagnostics",
    title: "Battery Diagnostics",
    short: "Know your battery's true condition.",
    icon: "Activity",
  },
  {
    slug: "car-service",
    title: "Car Service",
    short: "Expert care with digital records.",
    icon: "Car",
  },
  {
    slug: "doorstep-service",
    title: "Doorstep Service",
    short: "We come to you — on your schedule.",
    icon: "MapPin",
  },
  {
    slug: "fleet-maintenance",
    title: "Fleet Maintenance",
    short: "Reduce downtime across every vehicle.",
    icon: "Truck",
  },
  {
    slug: "amc-plans",
    title: "AMC Plans",
    short: "Predictable maintenance, zero surprises.",
    icon: "Calendar",
  },
  {
    slug: "pre-delivery-inspection",
    title: "Pre-Delivery Inspection",
    short: "Verify before you drive away.",
    icon: "ClipboardCheck",
  },
  {
    slug: "digital-vehicle-reports",
    title: "Digital Vehicle Reports",
    short: "Complete transparency, delivered digitally.",
    icon: "FileText",
  },
] as const;

export const METRICS = [
  { value: 2500, suffix: "+", label: "Batteries Inspected" },
  { value: 97, suffix: "%", label: "Customer Satisfaction" },
  { value: 12, suffix: "-Month", label: "Warranty Coverage" },
  { value: 14, suffix: "-Point", label: "Inspection Process" },
] as const;
