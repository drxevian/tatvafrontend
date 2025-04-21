import { ReactNode } from "react";

interface ServiceDetailsProps {
  title: string;
  description: string;
  capabilities: string[];
  icon: ReactNode;
}

const ServiceDetails = ({ title, description, capabilities, icon }: ServiceDetailsProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-primary/10 rounded-lg text-tatva-blue">
          {icon}
        </div>
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>

      <p className="text-lg text-gray-600 mb-8">{description}</p>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Our Capabilities</h3>
        <ul className="space-y-2">
          {capabilities.map((capability, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>{capability}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceDetails; 