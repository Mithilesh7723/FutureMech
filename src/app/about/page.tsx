import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { FadeInView } from "@/components/animations/FadeInView";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: "FutureMech is a technology-enabled automotive care company based in Jaipur. We diagnose before recommending.",
};

const values = [
  { number: "01", title: "Trust Before Transaction", description: "We build relationships, not invoices. Every interaction is designed to earn your confidence." },
  { number: "02", title: "Diagnose Before Recommending", description: "We never recommend service without first understanding the problem. Data drives every decision." },
  { number: "03", title: "Transparency Over Marketing", description: "We show you what we find, explain what it means, and let you decide." },
  { number: "04", title: "Engineering Over Assumptions", description: "Every recommendation is backed by diagnostic data and engineering expertise." },
  { number: "05", title: "Evidence Over Promises", description: "We document everything with photos, data, and digital records." },
  { number: "06", title: "Long-Term Relationships", description: "We are building something lasting. Our goal is to be the partner you trust for years." },
];

const stats = [
  { value: "2,500+", label: "Batteries Inspected" },
  { value: "97%", label: "Customer Satisfaction" },
  { value: "12", label: "Month Warranty" },
  { value: "14", label: "Point Inspection" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] overflow-hidden bg-ink">
          <div className="absolute inset-0 texture-grain" />
          <div className="absolute inset-0 pattern-grid opacity-[0.06]" />
          <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-bronze/[0.06] blur-[120px]" />
          <Container className="relative flex min-h-[60vh] items-center">
            <div className="pt-32 pb-20">
              <FadeInView>
                <p className="mb-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-bronze">
                  About FutureMech
                </p>
                <h1 className="max-w-[640px] font-serif text-[2.75rem] leading-[1.08] text-white-pure sm:text-[3.5rem] lg:text-[4.25rem]">
                  Where Engineering<br />Meets Trust
                </h1>
                <p className="mt-6 max-w-[480px] text-[1.0625rem] leading-[1.75] text-white-pure/45">
                  We are redefining automotive care in Jaipur — one diagnostic report at a time.
                </p>
              </FadeInView>
            </div>
          </Container>
        </section>

        {/* Story */}
        <section className="relative section-padding bg-section-white overflow-hidden">
          <Container className="relative">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
              <FadeInView>
                <div>
                  <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bronze">
                    Our Philosophy
                  </p>
                  <h2 className="mb-6 font-serif text-[2.25rem] leading-[1.1] text-ink sm:text-[2.75rem]">
                    Diagnose First.<br />Recommend Second.
                  </h2>
                  <p className="mb-6 text-[1rem] leading-[1.8] text-stone">
                    The automotive care industry has a trust problem. Most shops recommend services based on revenue, not need. FutureMech exists to change that.
                  </p>
                  <blockquote className="border-l-[3px] border-bronze py-2 pl-6 font-serif text-[1.125rem] italic leading-[1.7] text-graphite">
                    &ldquo;We do not sell battery regeneration. We sell confidence.&rdquo;
                  </blockquote>
                </div>
              </FadeInView>
              <FadeInView delay={0.12}>
                <div>
                  <p className="mb-6 text-[0.9375rem] leading-[1.8] text-graphite">
                    Founded in Jaipur, FutureMech is beginning operations with a focus on battery intelligence and preventive maintenance. We combine traditional automotive expertise with modern diagnostics technology.
                  </p>
                  <p className="mb-6 text-[0.9375rem] leading-[1.8] text-graphite">
                    Every battery health report we deliver includes photos, readings, and documentation — so you see exactly what we see, and understand exactly why we recommend what we do.
                  </p>
                  <p className="text-[0.9375rem] leading-[1.8] text-graphite">
                    Our goal is to set a new standard for automotive care in Rajasthan before expanding nationwide. Technology and transparency are not just features — they are the foundation of everything we build.
                  </p>
                </div>
              </FadeInView>
            </div>
          </Container>
        </section>

        {/* Stats */}
        <section className="relative overflow-hidden bg-ink py-20">
          <div className="absolute inset-0 texture-grain" />
          <Container className="relative">
            <StaggerChildren staggerDelay={0.1} className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <StaggerItem key={i}>
                  <div className="text-center">
                    <p className="font-serif text-[2.5rem] leading-none text-bronze sm:text-[3rem]">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white-pure/40">
                      {stat.label}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </Container>
        </section>

        {/* Values */}
        <section className="relative section-padding bg-section-ivory overflow-hidden">
          <Container className="relative">
            <FadeInView>
              <div className="mb-12 text-center">
                <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bronze">
                  What We Stand For
                </p>
                <h2 className="font-serif text-[2.25rem] leading-[1.1] text-ink sm:text-[2.75rem] lg:text-[3.25rem]">
                  Our Core Values
                </h2>
              </div>
            </FadeInView>

            <StaggerChildren staggerDelay={0.06} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value, i) => (
                <StaggerItem key={i}>
                  <div className="card-solid group relative overflow-hidden p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-bronze-light/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative">
                      <span className="mb-4 inline-block font-serif text-[2rem] text-bronze/20">
                        {value.number}
                      </span>
                      <h3 className="mb-2 text-[1rem] font-semibold text-ink">
                        {value.title}
                      </h3>
                      <p className="text-[0.875rem] leading-[1.7] text-stone">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </Container>
        </section>

        {/* CTA */}
        <section className="relative section-padding bg-section-white overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze/[0.04] blur-[100px]" />
          <Container className="relative">
            <FadeInView>
              <div className="mx-auto max-w-[560px] text-center">
                <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bronze">
                  Get Started
                </p>
                <h2 className="mb-4 font-serif text-[2rem] leading-[1.15] text-ink sm:text-[2.5rem]">
                  Experience the Difference
                </h2>
                <p className="mb-8 text-[1rem] leading-[1.7] text-stone">
                  Book a free battery health check and see what transparent automotive care looks like.
                </p>
                <Button href="/#book" size="lg" variant="primary">
                  Book Free Battery Health Check
                </Button>
                <p className="mt-4 text-[0.8125rem] text-stone">
                  Or call us at {SITE.phone}
                </p>
              </div>
            </FadeInView>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
