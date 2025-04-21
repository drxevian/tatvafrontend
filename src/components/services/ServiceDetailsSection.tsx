
import { ReactNode } from "react";
import ServiceDetail from "./ServiceDetail";

interface ServiceDetailData {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  icon: ReactNode;
}

interface ServiceDetailsSectionProps {
  serviceDetails: ServiceDetailData[];
}

const ServiceDetailsSection = ({ serviceDetails }: ServiceDetailsSectionProps) => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Core Expertise</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dive deeper into our primary service offerings and discover how we can address your specific engineering challenges.
          </p>
        </div>

        {serviceDetails.map((service, index) => (
          <ServiceDetail
            key={service.id}
            id={service.id}
            title={service.title}
            description={service.description}
            capabilities={service.capabilities}
            icon={service.icon}
            imageUrl={`https://images.unsplash.com/photo-${index === 0 ? "1581092580198-7bb087afee3e" : 
              index === 1 ? "1581094250312-9d5a486a9122" : 
              index === 2 ? "1581094242459-2f648e489122" : "1581094288637-06e5fe5229d0"}?auto=format&fit=crop&q=80`}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceDetailsSection;
