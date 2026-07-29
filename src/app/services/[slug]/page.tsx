import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceProcess } from "@/components/services/ServiceProcess";
import { ServiceBenefits } from "@/components/services/ServiceBenefits";
import { ServiceFAQ } from "@/components/services/ServiceFAQ";
import { ServiceCTA } from "@/components/services/ServiceCTA";
import { SERVICES_DATA } from "@/lib/services-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];
  if (!service) return { title: "Service Not Found" };

  return {
    title: service.title,
    description: service.tagline,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <ServiceHero
          slug={slug}
          title={service.title}
          tagline={service.tagline}
          description={service.description}
          cta={service.cta}
          ctaSecondary={service.ctaSecondary}
          note={service.heroNote}
        />
        <ServiceProcess steps={service.process} />
        <ServiceBenefits benefits={service.benefits} />
        <ServiceFAQ faqs={service.faqs} />
        <ServiceCTA cta={service.cta} />
      </main>
      <Footer />
    </>
  );
}
