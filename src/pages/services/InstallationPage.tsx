import Hero from "src/components/Hero";
import { Construction } from "lucide-react";
import ServiceDetails from "src/components/services/ServiceDetails";

const InstallationPage = () => {
  const serviceDetails = {
    title: "Erection Commissioning & Installation",
    description: "At TATVA ENGINEERS, we offer start-to-finish erection and commissioning services designed to bring your projects to life—efficiently, safely, and seamlessly. From laying the first bolt to flipping the final switch, our experienced team ensures your systems are installed with precision and fully functional upon handover.",
    capabilities: [
      "Site Readiness & Civil Setup - Ground preparation and foundational infrastructure tailored for swift equipment installation.",
      "Mechanical & Electrical Assembly - Accurate positioning, installation, and connection of machinery and control systems.",
      "Integrated System Commissioning - Aligning new installations with existing systems for harmonious operation.",
      "Functional Testing & Calibration - Exhaustive checks to validate performance and ensure operational compliance.",
      "Handover with Documentation & Training - A thorough transition process, complete with manuals, certificates, and on-site guidance for your team."
    ],
    icon: <Construction className="h-10 w-10" />,
  };

  return (
    <>
      <Hero
        title="Erection Commissioning & Installation"
        subtitle="Precision Setup for Peak Industrial Performance"
        imageUrl="/installation.jpg"
        imageAlt="Erection and commissioning services"
      />

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <ServiceDetails {...serviceDetails} />
        </div>
      </section>
    </>
  );
};

export default InstallationPage; 