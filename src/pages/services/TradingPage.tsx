import Hero from "src/components/Hero";
import { ShoppingBag } from "lucide-react";
import ServiceDetails from "src/components/services/ServiceDetails";

const TradingPage = () => {
  const serviceDetails = {
    title: "Industrial Trading",
    description: "At TATVA ENGINEERS, we simplify your procurement process with a robust catalog of industrial and MRO products—delivered with speed, reliability, and technical precision. Backed by a trusted vendor ecosystem and deep industry insight, we ensure every component aligns with your engineering needs and project timelines.",
    capabilities: [
      "MRO Products - From lubricants to cleaning agents, our inventory keeps your operations maintained and efficient.",
      "Motors & Power Transmission - Precision-engineered AC/DC motors, belts, pulleys, and power transmission assemblies.",
      "Fasteners & Spares - Durable nuts, bolts, anchors, and custom spares designed for industrial endurance.",
      "Hand Tools & Power Tools - Certified tools for construction, fabrication, and on-site maintenance—built for heavy-duty use.",
      "Electrical Products - Cables, relays, connectors, and lighting solutions that power your operations.",
      "Pneumatics & Hydraulics - Pneumatic and hydraulic fittings, valves, and actuators for motion control and automation.",
      "Smart Transmitters & Fittings - Smart sensors and transmitters to measure pressure, temperature, flow, and level with accuracy.",
      "Pumps & Plumbing Components - High-performance pumps and plumbing components for industrial fluid management.",
      "Material Handling & Packaging - Tools for safer and smarter logistics: hoists, conveyors, packaging wraps, and containers.",
      "Infrastructure Supplies - Scaffolding, reinforcement material, safety barriers, and project site essentials.",
      "Test Instruments - Industrial multimeters, clamp meters, calibrators, and diagnostic equipment."
    ],
    icon: <ShoppingBag className="h-10 w-10" />,
    additionalInfo: "With TATVA ENGINEERS, your supply chain gets a partner—not just a vendor. We enable streamlined procurement with a single point of contact, competitive pricing, and uncompromised quality."
  };

  return (
    <>
      <Hero
        title="Industrial Trading"
        subtitle="Your Trusted Partner for Industrial Supplies & MRO Solutions"
        imageUrl="/treading.jpg"
        imageAlt="Industrial trading"
      />

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <ServiceDetails {...serviceDetails} />
        </div>
      </section>
    </>
  );
};

export default TradingPage; 