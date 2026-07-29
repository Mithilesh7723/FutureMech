import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ProblemStatement } from "@/components/home/ProblemStatement";
import { HowItWorks } from "@/components/home/HowItWorks";
import { BatteryDeepDive } from "@/components/home/BatteryDeepDive";
import { TrustIndicators } from "@/components/home/TrustIndicators";
import { DigitalReports } from "@/components/home/DigitalReports";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FleetSection } from "@/components/home/FleetSection";
import { Testimonials } from "@/components/home/Testimonials";
import { ContactSection } from "@/components/home/ContactSection";
import { BookingForm } from "@/components/home/BookingForm";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesOverview />
        <ProblemStatement />
        <HowItWorks />
        <BatteryDeepDive />
        <TrustIndicators />
        <DigitalReports />
        <FleetSection />
        <Testimonials />
        <BookingForm />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
