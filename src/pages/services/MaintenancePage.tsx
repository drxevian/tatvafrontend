import Hero from "src/components/Hero";
import { Cog } from "lucide-react";
import ServiceDetails from "src/components/services/ServiceDetails";

const MaintenancePage = () => {
  const serviceDetails = {
    title: "Maintenance Services",
    description: "At TATVA ENGINEERS, our maintenance solutions are crafted to deliver uninterrupted performance across industrial operations. We go beyond routine service by implementing strategic maintenance protocols that safeguard your equipment and maximize operational uptime.",
    capabilities: [
      "Proactive Preventive Maintenance - Scheduled inspections and tune-ups that prevent costly breakdowns and production halts.",
      "Rapid Emergency Response - On-demand repair services with minimal lead time, ensuring business continuity in critical moments.",
      "Retrofit & Optimization Services - Performance enhancements through system upgrades, reconfiguration, and modern retrofits.",
      "Operational Training & Technical Support - Empowering your team with hands-on training and expert guidance for day-to-day system handling.",
      "Annual Maintenance Contracts (AMC) - Fully customizable service packages that offer end-to-end care, support, and performance assurance."
    ],
    icon: <Cog className="h-10 w-10" />,
  };

  return (
    <>
      <Hero
        title="Maintenance Services"
        subtitle="Precision Maintenance for Peak Equipment Reliability"
        imageUrl="/mechanical.jpg"
        imageAlt="Maintenance services"
      />

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <ServiceDetails {...serviceDetails} />
        </div>
      </section>
    </>
  );
};

export default MaintenancePage; 