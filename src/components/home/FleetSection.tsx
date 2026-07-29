"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/animations/FadeInView";
import { Truck, BarChart3, Clock, Shield } from "lucide-react";

const features = [
  { icon: Truck, title: "Reduce Downtime", description: "Scheduled maintenance that keeps your fleet on the road." },
  { icon: BarChart3, title: "Centralized Reporting", description: "Digital health reports for every vehicle in one place." },
  { icon: Clock, title: "Predictable Costs", description: "AMC plans that eliminate surprise maintenance expenses." },
  { icon: Shield, title: "Quality Assurance", description: "Consistent service standards across your entire fleet." },
];

export function FleetSection() {
  return (
    <section className="relative section-padding bg-ink overflow-hidden">
      <div className="absolute inset-0 texture-grain" />
      <div className="absolute inset-0 pattern-grid opacity-20" />

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeInView>
            <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bronze">
              For businesses
            </p>
            <h2 className="mb-4 font-serif text-[2rem] leading-[1.15] text-white-pure sm:text-[2.5rem]">
              Fleet Maintenance,<br />Simplified
            </h2>
            <p className="mb-6 max-w-[420px] text-[1rem] leading-[1.7] text-white-pure/60">
              Reduce downtime. Centralize reporting. Manage battery health
              across every vehicle. One platform for your entire fleet.
            </p>
            <Button href="/#contact" size="lg" variant="glass">Contact for Fleet Plans</Button>
          </FadeInView>

          <FadeInView delay={0.15}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((feature, i) => (
                <div key={i} className="glass-dark rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white-pure/10 text-bronze">
                    <feature.icon size={15} />
                  </div>
                  <h3 className="mb-1 text-[0.875rem] font-semibold text-white-pure">{feature.title}</h3>
                  <p className="text-[0.75rem] leading-[1.6] text-white-pure/50">{feature.description}</p>
                </div>
              ))}
            </div>
          </FadeInView>
        </div>
      </Container>
    </section>
  );
}
