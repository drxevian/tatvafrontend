import Hero from "src/components/Hero";
import { Truck, Warehouse, Package, Forklift, Settings, Route } from "lucide-react";
import ServiceDetails from "src/components/services/ServiceDetails";

const LogisticsPage = () => {
  const serviceDetails = {
    title: "Logistics",
    description: "At TATVA ENGINEERS, we specialize in managing end-to-end logistics for engineering and industrial operations. Our logistics framework is built to ensure fast, secure, and reliable delivery of project-critical materials and MRO goods—whether across town or across borders.",
    capabilities: [
      "Multimodal Transportation - Timely movement of goods by road, rail, or air to meet your project schedule.",
      "Smart Warehousing - Secure, scalable warehousing with inventory intelligence and dispatch optimization.",
      "Order Management - Streamlined order processing with full visibility from placement to final delivery.",
      "Compliance & Clearance - End-to-end customs handling, documentation, and regulatory compliance for seamless cross-border trade.",
      "Logistics Risk Mitigation - Insured transit, proactive tracking, and exception handling to protect your investments."
    ],
    icon: <Truck className="h-10 w-10" />,
  };

  return (
    <>
      <Hero
        title="Logistics"
        subtitle="Tailored Logistics Solutions for Engineering Supply Chains"
        imageUrl="/Logistics.jpg"
        imageAlt="Logistics services"
      />

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <ServiceDetails {...serviceDetails} />
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-tatva-dark">Our Logistics Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-white/90 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:from-tatva-blue/5 hover:to-tatva-teal/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-tatva-blue/10 to-tatva-teal/10 p-3 rounded-lg">
                  <Truck className="h-8 w-8 text-tatva-blue" />
                </div>
                <h3 className="text-xl font-semibold text-tatva-dark">Multimodal Transportation</h3>
              </div>
              <p className="text-gray-600">
                Comprehensive transportation solutions by road, rail, and air to ensure timely delivery of your materials.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-white/90 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:from-tatva-blue/5 hover:to-tatva-teal/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-tatva-blue/10 to-tatva-teal/10 p-3 rounded-lg">
                  <Warehouse className="h-8 w-8 text-tatva-blue" />
                </div>
                <h3 className="text-xl font-semibold text-tatva-dark">Smart Warehousing</h3>
              </div>
              <p className="text-gray-600">
                Advanced warehousing solutions with real-time inventory tracking and optimized dispatch systems.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-white/90 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:from-tatva-blue/5 hover:to-tatva-teal/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-tatva-blue/10 to-tatva-teal/10 p-3 rounded-lg">
                  <Settings className="h-8 w-8 text-tatva-blue" />
                </div>
                <h3 className="text-xl font-semibold text-tatva-dark">Order Management</h3>
              </div>
              <p className="text-gray-600">
                End-to-end order tracking and management for complete visibility of your supply chain.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-white/90 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:from-tatva-blue/5 hover:to-tatva-teal/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-tatva-blue/10 to-tatva-teal/10 p-3 rounded-lg">
                  <Package className="h-8 w-8 text-tatva-blue" />
                </div>
                <h3 className="text-xl font-semibold text-tatva-dark">Compliance & Clearance</h3>
              </div>
              <p className="text-gray-600">
                Expert handling of customs documentation and regulatory compliance for international shipments.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-white/90 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:from-tatva-blue/5 hover:to-tatva-teal/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-tatva-blue/10 to-tatva-teal/10 p-3 rounded-lg">
                  <Route className="h-8 w-8 text-tatva-blue" />
                </div>
                <h3 className="text-xl font-semibold text-tatva-dark">Risk Mitigation</h3>
              </div>
              <p className="text-gray-600">
                Comprehensive insurance coverage and proactive tracking to safeguard your shipments.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogisticsPage; 