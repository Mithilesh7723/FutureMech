import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for using FutureMech services and website.`,
};

export default function TermsPage() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Header />
      <main>
        <section className="relative min-h-[35vh] overflow-hidden bg-ink">
          <div className="absolute inset-0 texture-grain" />
          <div className="absolute inset-0 pattern-grid opacity-[0.06]" />
          <Container className="relative flex min-h-[35vh] items-center">
            <div className="pt-32 pb-12">
              <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-bronze">
                Legal
              </p>
              <h1 className="font-serif text-[2.5rem] leading-[1.1] text-white-pure sm:text-[3rem]">
                Terms & Conditions
              </h1>
              <p className="mt-3 text-[0.875rem] text-white-pure/40">
                Last updated: July {currentYear}
              </p>
            </div>
          </Container>
        </section>

        <section className="relative section-padding bg-section-white overflow-hidden">
          <Container className="relative max-w-[760px]">
            <div className="prose-custom space-y-8">
              <div>
                <h2 className="mb-3 font-serif text-[1.5rem] text-ink">1. Acceptance of Terms</h2>
                <p className="text-[0.9375rem] leading-[1.8] text-stone">
                  By accessing and using the FutureMech website ({SITE.name.toLowerCase()}.in) and our services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-serif text-[1.5rem] text-ink">2. Services</h2>
                <p className="text-[0.9375rem] leading-[1.8] text-stone">
                  FutureMech provides technology-enabled automotive care services including but not limited to battery diagnostics, battery regeneration, car service, doorstep service, fleet maintenance, pre-delivery inspections, and digital vehicle reports. All services are subject to availability and applicable terms.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-serif text-[1.5rem] text-ink">3. Booking and Appointments</h2>
                <p className="text-[0.9375rem] leading-[1.8] text-stone">
                  When you submit a booking request through our website, you provide accurate and complete information. Appointment availability is subject to change. We will confirm your appointment via phone or email within a reasonable time. Free battery health checks are available for new customers only.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-serif text-[1.5rem] text-ink">4. Pricing and Payment</h2>
                <p className="text-[0.9375rem] leading-[1.8] text-stone">
                  All pricing for services will be communicated before any work begins. You have the right to decline any recommended service. Payment is due upon completion of the service unless otherwise agreed. Prices are subject to change without prior notice.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-serif text-[1.5rem] text-ink">5. Warranties</h2>
                <p className="text-[0.9375rem] leading-[1.8] text-stone">
                  Specific warranty terms will be communicated at the time of service. Warranty coverage applies only to the services performed and does not cover pre-existing conditions or unrelated issues. Warranty claims must be made through official FutureMech channels.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-serif text-[1.5rem] text-ink">6. Digital Reports</h2>
                <p className="text-[0.9375rem] leading-[1.8] text-stone">
                  Digital vehicle health reports are provided for informational purposes and reflect the condition of the vehicle at the time of inspection. Reports do not constitute a guarantee of future performance. You may share reports with third parties at your discretion.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-serif text-[1.5rem] text-ink">7. Intellectual Property</h2>
                <p className="text-[0.9375rem] leading-[1.8] text-stone">
                  All content on this website, including text, graphics, logos, images, and software, is the property of FutureMech and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-serif text-[1.5rem] text-ink">8. Limitation of Liability</h2>
                <p className="text-[0.9375rem] leading-[1.8] text-stone">
                  FutureMech shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services. Our total liability shall not exceed the amount paid for the specific service in question.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-serif text-[1.5rem] text-ink">9. Privacy</h2>
                <p className="text-[0.9375rem] leading-[1.8] text-stone">
                  Your use of our website and services is also governed by our Privacy Policy. We are committed to protecting your personal information and using it only for purposes related to providing our services.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-serif text-[1.5rem] text-ink">10. Changes to Terms</h2>
                <p className="text-[0.9375rem] leading-[1.8] text-stone">
                  We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on this page. Your continued use of our website and services after any changes constitutes acceptance of the new terms.
                </p>
              </div>

              <div>
                <h2 className="mb-3 font-serif text-[1.5rem] text-ink">11. Contact</h2>
                <p className="text-[0.9375rem] leading-[1.8] text-stone">
                  For questions about these Terms and Conditions, please contact us at {SITE.email} or call {SITE.phone}.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
