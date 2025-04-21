
import { ReactNode } from "react";
import ServiceCard from "src/components/ServiceCard";

interface ServicesListProps {
  services: {
    title: string;
    description: string;
    icon: ReactNode;
    link: string;
  }[];
}

const ServicesList = ({ services }: ServicesListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          title={service.title}
          description={service.description}
          icon={service.icon}
          link={service.link}
        />
      ))}
    </div>
  );
};

export default ServicesList;
