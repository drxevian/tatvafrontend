import Hero from "src/components/Hero";
import { Map } from "lucide-react";
import ServiceDetails from "src/components/services/ServiceDetails";

const ProjectPlanningPage = () => {
  const serviceDetails = {
    title: "Project Planning",
    description: "At TATVA ENGINEERS, we provide end-to-end project planning solutions that lay the foundation for streamlined, cost-effective, and regulation-ready industrial projects. Our approach blends deep technical expertise with real-world constructability to design layouts and schematics that work — not just on paper, but in the field.",
    capabilities: [
      "Smart Plant Layouts - Customized designs for optimal flow, operational safety, and maximum floor utilization in production and assembly facilities.",
      "Civil & Structural Engineering Plans - Structural blueprints and site readiness designs that align with mechanical, load-bearing, and architectural requirements.",
      "Piping & Mechanical Layouts - Precise piping schematics for utility, process, and service lines — fully mapped to ensure installation and operational efficiency.",
      "Electrical & Control Layouts - Load flow diagrams, wiring routes, safety systems, and control cabinet layouts that align with performance and compliance goals.",
      "Design Validation & Compliance Audits - Expert-led documentation, review, and support to ensure that your plans meet all applicable codes, safety norms, and client specs."
    ],
    icon: <Map className="h-10 w-10" />,
    additionalInfo: "At TATVA ENGINEERS, our goal is to turn vision into a viable plan — one that's technically robust, operationally efficient, and ready for execution without delay or redesign."
  };

  return (
    <>
      <Hero
        title="Project Planning"
        subtitle="Blueprinting Industrial Excellence from Concept to Execution"
        imageUrl="/projectplanning.jpg"
        imageAlt="Project planning"
      />

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <ServiceDetails {...serviceDetails} />
        </div>
      </section>
    </>
  );
};

export default ProjectPlanningPage; 