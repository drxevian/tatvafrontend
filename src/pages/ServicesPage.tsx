import Hero from "src/components/Hero";
import { 
  Activity, Briefcase, Building, Construction, Cog, Gauge, CheckCircle,
  Map, ShoppingBag, Factory, Car, Beaker, Hotel, Truck, 
  Package, Pickaxe, Droplets, Shirt, Pill, Anchor
} from "lucide-react";
import ServicesList from "src/components/services/ServicesList";
import ServicesHeader from "src/components/services/ServicesHeader";
import CallToAction from "src/components/services/CallToAction";

const ServicesPage = () => {
  const services = [
    {
      title: "Project Planning",
      description: "we provide end-to-end project planning solutions that lay the foundation for streamlined, cost-effective, and regulation-ready industrial projects. Our approach blends deep technical expertise with real-world constructability to design layouts and schematics that work — not just on paper, but in the field.",
      icon: <Map className="h-6 w-6" />,
      link: "/services/project-planning",
    },
    {
      title: "Trading",
      description: "we simplify your procurement process with a robust catalog of industrial and MRO products—delivered with speed, reliability, and technical precision. Backed by a trusted vendor ecosystem and deep industry insight, we ensure every component aligns with your engineering needs and project timelines.",
      icon: <ShoppingBag className="h-6 w-6" />,
      link: "/services/trading",
    },
    {
      title: "Erection Commissioning and Installation",
      description: "we offer start-to-finish erection and commissioning services designed to bring your projects to life—efficiently, safely, and seamlessly. From laying the first bolt to flipping the final switch, our experienced team ensures your systems are installed with precision and fully functional upon handover.",
      icon: <Construction className="h-6 w-6" />,
      link: "/services/installation",
    },
    {
      title: "Maintenance",
      description: "our maintenance solutions are crafted to deliver uninterrupted performance across industrial operations. We go beyond routine service by implementing strategic maintenance protocols that safeguard your equipment and maximize operational uptime.",
      icon: <Cog className="h-6 w-6" />,
      link: "/services/maintenance",
    },
     {
      title: "logistics",
      description: "we specialize in managing end-to-end logistics for engineering and industrial operations. Our logistics framework is built to ensure fast, secure, and reliable delivery of project-critical materials and MRO goods—whether across town or across borders.",
      icon: <Truck className="h-6 w-6" />,
      link: "/services/logistics",
    },
  ];

  return (
    <>
      <Hero
        title="Engineering Services"
        subtitle="Comprehensive Solutions for Complex Challenges"
        imageUrl="/service.jpg"
        imageAlt="Engineering services"
      />

      {/* Services Overview */}
      <section className="section-padding bg-gradient-to-br from-white to-white/90 dark:from-tatva-dark dark:to-tatva-dark/90">
        <div className="container mx-auto px-4">
          <ServicesHeader />
          <ServicesList services={services} />
        </div>
      </section>

      {/* CTA Section */}
      <CallToAction />
    </>
  );
};

export default ServicesPage;
