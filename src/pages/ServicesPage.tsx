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

  const industries = [
    {
      title: "Agriculture",
      description: "Specialized solutions for agricultural equipment, irrigation systems, and processing facilities.",
      icon: <Activity className="h-10 w-10" />,
    },
    {
      title: "Automotive",
      description: "Comprehensive services for automotive manufacturing plants and assembly lines.",
      icon: <Car className="h-10 w-10" />,
    },
    {
      title: "Chemicals",
      description: "Expert solutions for chemical processing plants and safety systems.",
      icon: <Beaker className="h-10 w-10" />,
    },
    {
      title: "Hospitality",
      description: "Custom engineering solutions for hotels, resorts, and hospitality facilities.",
      icon: <Hotel className="h-10 w-10" />,
    },
    {
      title: "Logistics",
      description: "Comprehensive solutions for warehouse management, material handling, and supply chain optimization.",
      icon: <Truck className="h-6 w-6" />,
      link: "/services/logistics",
    },
    {
      title: "Manufacturing",
      description: "End-to-end solutions for manufacturing facilities and production lines.",
      icon: <Factory className="h-10 w-10" />,
    },
    {
      title: "Metal and Mining",
      description: "Specialized services for metal processing plants and mining operations.",
      icon: <Pickaxe className="h-10 w-10" />,
    },
    {
      title: "Oil & Gas",
      description: "Expert solutions for oil refineries, gas processing plants, and extraction facilities.",
      icon: <Droplets className="h-10 w-10" />,
    },
    {
      title: "Textile",
      description: "Comprehensive services for textile manufacturing and processing facilities.",
      icon: <Shirt className="h-10 w-10" />,
    },
    {
      title: "Pharmaceuticals",
      description: "Specialized solutions for pharmaceutical manufacturing and research facilities.",
      icon: <Pill className="h-10 w-10" />,
    },
    {
      title: "Ports",
      description: "Expert services for port infrastructure, cargo handling, and logistics.",
      icon: <Anchor className="h-10 w-10" />,
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

      {/* Industries We Serve */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100 dark:from-tatva-dark/90 dark:to-tatva-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-tatva-dark dark:text-tatva-light">Industries We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-white/90 dark:from-tatva-dark dark:to-tatva-dark/90 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-tatva-blue/5 hover:to-tatva-teal/5 dark:hover:from-tatva-blue/10 dark:hover:to-tatva-teal/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gradient-to-br from-tatva-blue/10 to-tatva-teal/10 p-3 rounded-lg text-tatva-blue">
                    {industry.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-tatva-dark dark:text-tatva-light">{industry.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CallToAction />
    </>
  );
};

export default ServicesPage;
