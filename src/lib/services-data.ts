export interface ServiceDetail {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  cta: string;
  ctaSecondary?: string;
  process: { step: number; title: string; description: string }[];
  benefits: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  heroNote?: string;
}

export const SERVICES_DATA: Record<string, ServiceDetail> = {
  "battery-regeneration": {
    slug: "battery-regeneration",
    title: "Battery Regeneration",
    tagline: "Restore performance without replacement.",
    description:
      "Battery regeneration is a controlled, technology-driven process that restores degraded lead-acid batteries to near-original capacity. We use smart charging, cell balancing, and desulfation — not guesswork. Every battery we accept has been diagnosed as suitable for regeneration. If it isn't, we'll tell you honestly.",
    cta: "Book Battery Regeneration",
    ctaSecondary: "Check If Your Battery Qualifies",
    heroNote: "Not every battery can be regenerated. We only accept batteries we can genuinely help — that's how you know we're honest.",
    process: [
      {
        step: 1,
        title: "Health Inspection",
        description:
          "We inspect 14 parameters — voltage, internal resistance, capacity, temperature response, and more.",
      },
      {
        step: 2,
        title: "Digital Diagnostics",
        description:
          "Advanced diagnostic equipment generates a comprehensive health report with real data, not assumptions.",
      },
      {
        step: 3,
        title: "Capacity Testing",
        description:
          "We measure actual capacity against rated capacity. This tells us exactly how much life remains.",
      },
      {
        step: 4,
        title: "Smart Charging",
        description:
          "Controlled multi-phase charging dissolves sulfate crystals and restores active material on the plates.",
      },
      {
        step: 5,
        title: "Cell Balancing",
        description:
          "Each cell is individually balanced to ensure uniform performance across the entire battery.",
      },
      {
        step: 6,
        title: "Before & After Report",
        description:
          "You receive a complete digital report comparing performance before and after regeneration.",
      },
    ],
    benefits: [
      {
        title: "Cost Savings",
        description:
          "Regeneration costs a fraction of a new battery — typically 30-40% of replacement price.",
      },
      {
        title: "Proven Results",
        description:
          "Every regeneration is backed by before-and-after data. You see the improvement, not just hear about it.",
      },
      {
        title: "Environmental Impact",
        description:
          "Extending battery life reduces waste. One regenerated battery keeps materials out of landfills.",
      },
      {
        title: "Warranty Included",
        description:
          "We offer warranty based on the battery's condition after regeneration — because we stand behind our work.",
      },
    ],
    faqs: [
      {
        question: "Is battery regeneration safe?",
        answer:
          "Yes. The process uses controlled electrical currents and temperature monitoring. It's a well-established technique used across the automotive industry worldwide.",
      },
      {
        question: "How do I know if my battery can be regenerated?",
        answer:
          "Our 14-point diagnostic process determines suitability. We only accept batteries that show genuine potential for improvement. If yours isn't suitable, we'll recommend the best alternative.",
      },
      {
        question: "How long does regeneration take?",
        answer:
          "Most regenerations are completed within 4-6 hours. We'll provide an accurate timeline after your diagnostic appointment.",
      },
      {
        question: "What warranty do you offer?",
        answer:
          "Warranty terms depend on the battery's post-regeneration condition. We provide clear documentation of the warranty before any work begins.",
      },
      {
        question: "Will I receive proof of the work done?",
        answer:
          "Absolutely. You'll receive a complete digital report with before-and-after performance data, technician notes, and warranty documentation.",
      },
    ],
  },

  "battery-diagnostics": {
    slug: "battery-diagnostics",
    title: "Battery Diagnostics",
    tagline: "Know your battery's true condition.",
    description:
      "Before spending money on replacement, find out if your battery actually needs it. Our diagnostic process examines 14 key parameters and delivers a comprehensive digital report — so you can make an informed decision, not an expensive guess.",
    cta: "Book Battery Diagnostics",
    ctaSecondary: "Free Health Check for New Customers",
    process: [
      {
        step: 1,
        title: "Visual Inspection",
        description:
          "Physical examination for swelling, corrosion, leakage, and terminal condition.",
      },
      {
        step: 2,
        title: "Voltage Testing",
        description:
          "Open-circuit voltage and load voltage tested under real conditions.",
      },
      {
        step: 3,
        title: "Internal Resistance",
        description:
          "Measures how efficiently the battery delivers current — a key health indicator.",
      },
      {
        step: 4,
        title: "Capacity Analysis",
        description:
          "Actual capacity measured against rated capacity to determine remaining life.",
      },
      {
        step: 5,
        title: "Digital Report",
        description:
          "Complete health report delivered digitally with clear recommendations and next steps.",
      },
    ],
    benefits: [
      {
        title: "Avoid Unnecessary Costs",
        description:
          "Many batteries are replaced prematurely. Our diagnostics tell you the truth.",
      },
      {
        title: "Data-Driven Decisions",
        description:
          "Every recommendation is backed by measurable data, not assumptions.",
      },
      {
        title: "Complete Transparency",
        description:
          "You see everything we see — the full report, the raw data, our honest assessment.",
      },
      {
        title: "Quick Turnaround",
        description:
          "Most diagnostics completed in under an hour. Know your battery's condition today.",
      },
    ],
    faqs: [
      {
        question: "How much does a battery diagnostic cost?",
        answer:
          "We offer a free battery health check for new customers. This covers basic diagnostics. Advanced diagnostics may have a nominal fee, credited toward any service you book.",
      },
      {
        question: "How long does the diagnostic take?",
        answer:
          "Basic diagnostics: 20-30 minutes. Comprehensive diagnostics with capacity testing: up to 1 hour.",
      },
      {
        question: "Will you try to sell me a new battery?",
        answer:
          "No. We diagnose and report. If your battery is healthy, we'll tell you. If it needs replacement, we'll explain why — with evidence.",
      },
      {
        question: "Can I get the report digitally?",
        answer:
          "Yes. All reports are delivered digitally via email and can be accessed through your customer portal.",
      },
    ],
  },

  "car-service": {
    slug: "car-service",
    title: "Car Service",
    tagline: "Expert care with digital records.",
    description:
      "Professional car service that combines traditional automotive expertise with modern technology. Every service includes digital documentation, transparent pricing, and honest recommendations. We maintain your vehicle with the same care we'd want for our own.",
    cta: "Schedule Car Service",
    ctaSecondary: "View Service Packages",
    process: [
      {
        step: 1,
        title: "Booking",
        description:
          "Schedule online or by phone. Choose a time that works for your routine.",
      },
      {
        step: 2,
        title: "Inspection",
        description:
          "Comprehensive vehicle inspection with digital checklists and photo documentation.",
      },
      {
        step: 3,
        title: "Recommendation",
        description:
          "Clear explanation of what needs attention — urgent, recommended, and optional.",
      },
      {
        step: 4,
        title: "Service",
        description:
          "Expert technicians perform the work with quality parts and documented procedures.",
      },
      {
        step: 5,
        title: "Digital Record",
        description:
          "Complete service record with photos, parts used, and next service due date.",
      },
    ],
    benefits: [
      {
        title: "Transparent Pricing",
        description:
          "No surprises. You approve the work before we begin. Every cost is explained.",
      },
      {
        title: "Digital Documentation",
        description:
          "Photo evidence of work done, parts replaced, and conditions found.",
      },
      {
        title: "Qualified Technicians",
        description:
          "Certified professionals who explain what they find in language you understand.",
      },
      {
        title: "Service History",
        description:
          "Complete digital service history — valuable for you and future resale value.",
      },
    ],
    faqs: [
      {
        question: "Do you use original parts?",
        answer:
          "We offer both OEM and high-quality aftermarket options. We explain the differences and let you decide based on budget and preferences.",
      },
      {
        question: "Can I see photos of the work?",
        answer:
          "Yes. Every service includes photo documentation of key findings and completed work.",
      },
      {
        question: "How do I book?",
        answer:
          "Book online through our website, call us directly, or visit our facility in Jaipur.",
      },
    ],
  },

  "doorstep-service": {
    slug: "doorstep-service",
    title: "Doorstep Service",
    tagline: "We come to you — on your schedule.",
    description:
      "Professional automotive care delivered at your location. Whether you're at home, at work, or anywhere in Jaipur — our certified technicians bring the diagnostic equipment and expertise to you. Same quality, same transparency, zero inconvenience.",
    cta: "Book Doorstep Visit",
    ctaSecondary: "Check Your Area",
    heroNote: "Doorstep service covers Jaipur city. We bring full diagnostic capability — not a shortcut version of our workshop service.",
    process: [
      {
        step: 1,
        title: "Schedule",
        description:
          "Book online or by phone. Tell us your location and preferred time window.",
      },
      {
        step: 2,
        title: "Arrival",
        description:
          "Our technician arrives with portable diagnostic equipment and everything needed for the service.",
      },
      {
        step: 3,
        title: "Diagnosis",
        description:
          "Full diagnostic process — same 14-point inspection we perform at our facility.",
      },
      {
        step: 4,
        title: "Recommendation",
        description:
          "You receive the same transparent explanation and digital report as any in-shop visit.",
      },
      {
        step: 5,
        title: "Service or Follow-Up",
        description:
          "If the work can be done on-site, we complete it. If it requires facility equipment, we schedule a visit.",
      },
    ],
    benefits: [
      {
        title: "Zero Disruption",
        description:
          "No need to drive to a facility, wait, or rearrange your day. We come to you.",
      },
      {
        title: "Same Quality",
        description:
          "Portable diagnostics deliver the same data quality as our workshop equipment.",
      },
      {
        title: "Transparent Pricing",
        description:
          "The service costs the same as an in-shop visit. No convenience premium.",
      },
      {
        title: "Digital Reports",
        description:
          "You receive the same comprehensive digital report regardless of where the service is performed.",
      },
    ],
    faqs: [
      {
        question: "What areas do you cover for doorstep service?",
        answer:
          "We currently cover all areas within Jaipur city. Contact us to confirm if your specific location is within our service zone.",
      },
      {
        question: "Is doorstep service the same quality as in-shop?",
        answer:
          "Yes. We use portable versions of the same diagnostic equipment. The inspection process and report quality are identical.",
      },
      {
        question: "What if my car needs more work than can be done on-site?",
        answer:
          "We'll complete the diagnosis on-site and provide a recommendation. If facility-based work is needed, we'll schedule a convenient time for you to visit.",
      },
      {
        question: "Is there an extra charge for doorstep service?",
        answer:
          "No. Doorstep service is priced the same as in-shop service. We believe convenience shouldn't cost extra.",
      },
    ],
  },

  "fleet-maintenance": {
    slug: "fleet-maintenance",
    title: "Fleet Maintenance",
    tagline: "Reduce downtime across every vehicle.",
    description:
      "Centralized fleet maintenance with digital health tracking for every vehicle. We help fleet managers reduce downtime, control costs, and maintain consistent service standards — with complete visibility into every vehicle's condition.",
    cta: "Get Fleet Assessment",
    ctaSecondary: "Download Fleet Brochure",
    process: [
      {
        step: 1,
        title: "Fleet Assessment",
        description:
          "We assess your entire fleet's current condition and maintenance history.",
      },
      {
        step: 2,
        title: "Maintenance Plan",
        description:
          "Customized maintenance schedule based on vehicle usage, age, and manufacturer recommendations.",
      },
      {
        step: 3,
        title: "Regular Inspections",
        description:
          "Scheduled inspections with digital checklists and photo documentation for each vehicle.",
      },
      {
        step: 4,
        title: "Digital Dashboard",
        description:
          "Centralized reporting — health scores, upcoming maintenance, and cost tracking for your entire fleet.",
      },
      {
        step: 5,
        title: "Ongoing Support",
        description:
          "Dedicated fleet support with priority scheduling and consolidated billing.",
      },
    ],
    benefits: [
      {
        title: "Reduced Downtime",
        description:
          "Proactive maintenance prevents breakdowns. Keep your vehicles on the road.",
      },
      {
        title: "Centralized Visibility",
        description:
          "One dashboard for every vehicle's health, maintenance history, and upcoming service needs.",
      },
      {
        title: "Cost Control",
        description:
          "Predictable maintenance budgets with no surprise expenses. Consolidated billing for simplicity.",
      },
      {
        title: "Consistent Standards",
        description:
          "Every vehicle receives the same quality of care, regardless of which technician performs the service.",
      },
    ],
    faqs: [
      {
        question: "What fleet sizes do you support?",
        answer:
          "We work with fleets of all sizes — from 5 vehicles to 500+. Our systems scale to match your needs.",
      },
      {
        question: "Can we integrate with our existing fleet management system?",
        answer:
          "We provide digital reports and data that can complement your existing systems. Contact us to discuss integration options.",
      },
      {
        question: "Do you offer emergency roadside assistance?",
        answer:
          "Emergency support is available for fleet customers. Contact our dedicated fleet support line for immediate assistance.",
      },
      {
        question: "How is billing handled for fleet customers?",
        answer:
          "We offer consolidated monthly billing with detailed breakdowns per vehicle. Payment terms are flexible for enterprise clients.",
      },
    ],
  },

  "amc-plans": {
    slug: "amc-plans",
    title: "AMC Plans",
    tagline: "Predictable maintenance, zero surprises.",
    description:
      "Annual Maintenance Contracts that give you predictable costs and priority service. Choose a plan that matches your vehicle's needs — and enjoy the peace of mind that comes with knowing your maintenance is covered.",
    cta: "Explore AMC Plans",
    ctaSecondary: "Compare Plan Tiers",
    process: [
      {
        step: 1,
        title: "Plan Selection",
        description:
          "Choose from Basic, Standard, or Premium plans based on your vehicle's age and usage.",
      },
      {
        step: 2,
        title: "Vehicle Assessment",
        description:
          "We assess your vehicle's current condition to recommend the most suitable plan.",
      },
      {
        step: 3,
        title: "Scheduled Services",
        description:
          "Regular maintenance visits scheduled proactively — you never have to remember service dates.",
      },
      {
        step: 4,
        title: "Priority Support",
        description:
          "AMC customers receive priority scheduling and dedicated support channels.",
      },
      {
        step: 5,
        title: "Annual Report",
        description:
          "Year-end summary of all services performed, costs saved, and recommendations for the coming year.",
      },
    ],
    benefits: [
      {
        title: "Fixed Costs",
        description:
          "Know exactly what your maintenance will cost for the year. No surprises, no hidden fees.",
      },
      {
        title: "Priority Service",
        description:
          "AMC customers skip the queue. Your vehicle gets serviced on your schedule.",
      },
      {
        title: "Proactive Care",
        description:
          "We track your vehicle's condition and schedule maintenance before problems develop.",
      },
      {
        title: "Simplified Management",
        description:
          "One annual fee covers all scheduled maintenance. No separate invoices to track.",
      },
    ],
    faqs: [
      {
        question: "What's included in an AMC plan?",
        answer:
          "Each plan includes scheduled maintenance visits, priority scheduling, and digital service records. Specific inclusions vary by plan tier — we'll explain each option in detail.",
      },
      {
        question: "Can I upgrade my plan mid-term?",
        answer:
          "Yes. You can upgrade to a higher tier at any time. The price difference is prorated for the remaining term.",
      },
      {
        question: "What if my vehicle needs unscheduled work?",
        answer:
          "Unscheduled work is billed separately at preferred AMC customer rates. You'll receive a quote before any work begins.",
      },
      {
        question: "Are AMC plans available for new vehicles?",
        answer:
          "Yes. We recommend starting an AMC plan when your vehicle is new to maintain optimal condition and resale value.",
      },
    ],
  },

  "pre-delivery-inspection": {
    slug: "pre-delivery-inspection",
    title: "Pre-Delivery Inspection",
    tagline: "Verify before you drive away.",
    description:
      "Whether you're buying new or used, a Pre-Delivery Inspection ensures you know exactly what you're getting. We inspect the vehicle independently — before you take delivery — so you can negotiate with confidence and avoid hidden problems.",
    cta: "Book Pre-Delivery Inspection",
    ctaSecondary: "What We Inspect",
    heroNote: "For used car buyers: This inspection can save you lakhs. For new car buyers: It confirms the vehicle meets manufacturer standards before you accept delivery.",
    process: [
      {
        step: 1,
        title: "Pre-Inspection Brief",
        description:
          "We discuss your concerns, the vehicle's history (if used), and what to look for.",
      },
      {
        step: 2,
        title: "Exterior Assessment",
        description:
          "Panel gaps, paint condition, accident history indicators, glass and lighting check.",
      },
      {
        step: 3,
        title: "Interior Inspection",
        description:
          "Electronics, AC, seats, controls, and cabin condition assessment.",
      },
      {
        step: 4,
        title: "Mechanical Check",
        description:
          "Engine, transmission, suspension, brakes, and underbody inspection.",
      },
      {
        step: 5,
        title: "Diagnostic Scan",
        description:
          "OBD diagnostics to check for hidden fault codes and electronic issues.",
      },
      {
        step: 6,
        title: "Digital Report",
        description:
          "Comprehensive report with photos, findings, and an overall condition assessment.",
      },
    ],
    benefits: [
      {
        title: "Negotiate With Data",
        description:
          "A professional inspection report gives you leverage in price negotiations — especially for used cars.",
      },
      {
        title: "Avoid Hidden Costs",
        description:
          "Catch problems before they become expensive surprises. Know what you're buying.",
      },
      {
        title: "Independent Assessment",
        description:
          "We work for you, not the dealer. Our assessment is unbiased and thorough.",
      },
      {
        title: "Peace of Mind",
        description:
          "Drive away knowing exactly what condition your vehicle is in — no second-guessing.",
      },
    ],
    faqs: [
      {
        question: "When should I get a PDI?",
        answer:
          "For new cars: Before you accept delivery from the dealership. For used cars: Before you finalize the purchase. Never after.",
      },
      {
        question: "How long does a PDI take?",
        answer:
          "A comprehensive PDI takes 1.5-2 hours. We recommend scheduling at least 24 hours in advance.",
      },
      {
        question: "Can I be present during the inspection?",
        answer:
          "Absolutely. We encourage it. You'll learn a lot about your vehicle by watching and asking questions.",
      },
      {
        question: "What if the inspection reveals problems?",
        answer:
          "We provide a detailed report with severity ratings. You can use this to negotiate repairs, a price reduction, or walk away from a bad deal.",
      },
    ],
  },

  "digital-vehicle-reports": {
    slug: "digital-vehicle-reports",
    title: "Digital Vehicle Reports",
    tagline: "Complete transparency, delivered digitally.",
    description:
      "Every service at FutureMech comes with a comprehensive digital report. Health scores, capacity data, technician notes, photos, and recommendations — all documented and delivered to your inbox. Your vehicle's complete health record, always accessible.",
    cta: "Request Sample Report",
    ctaSecondary: "See How Reports Work",
    process: [
      {
        step: 1,
        title: "Data Collection",
        description:
          "Diagnostic equipment captures vehicle health data during inspection or service.",
      },
      {
        step: 2,
        title: "Analysis",
        description:
          "Data is analyzed against manufacturer specifications and historical benchmarks.",
      },
      {
        step: 3,
        title: "Report Generation",
        description:
          "A comprehensive report is generated with visual indicators, graphs, and clear explanations.",
      },
      {
        step: 4,
        title: "Delivery",
        description:
          "Report is delivered via email and available in your customer portal within 24 hours.",
      },
      {
        step: 5,
        title: "Archive",
        description:
          "All reports are archived in your account, building a complete history of your vehicle's health over time.",
      },
    ],
    benefits: [
      {
        title: "Complete Records",
        description:
          "Every inspection, every service, every finding — documented and accessible anytime.",
      },
      {
        title: "Visual Health Scores",
        description:
          "Easy-to-understand health indicators that make complex data accessible to everyone.",
      },
      {
        title: "Resale Value",
        description:
          "A documented service history increases your vehicle's resale value and buyer confidence.",
      },
      {
        title: "Trend Tracking",
        description:
          "See how your vehicle's health changes over time. Spot trends before they become problems.",
      },
    ],
    faqs: [
      {
        question: "How do I access my reports?",
        answer:
          "Reports are delivered via email and available in your customer portal. You can view, download, or share them anytime.",
      },
      {
        question: "What format are the reports in?",
        answer:
          "Reports are web-based with a clean, readable layout. You can also download them as PDF for your records.",
      },
      {
        question: "How long are reports kept?",
        answer:
          "Indefinitely. All reports are archived in your account forever. You can access your complete vehicle history anytime.",
      },
      {
        question: "Can I share reports with my mechanic or dealer?",
        answer:
          "Yes. Reports can be shared via a unique link or downloaded as PDF. They're designed to be useful for any automotive professional.",
      },
    ],
  },
};
