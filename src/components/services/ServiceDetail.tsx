import { CheckCircle } from "lucide-react";
import { ReactNode } from "react";

interface ServiceDetailProps {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  icon: ReactNode;
  imageUrl: string;
  index: number;
}

const ServiceDetail = ({ 
  id, 
  title, 
  description, 
  capabilities, 
  icon, 
  imageUrl, 
  index 
}: ServiceDetailProps) => {
  return (
    <div 
      id={id}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
        index !== 0 ? "mb-24" : ""
      }`}
    >
      <div className={index % 2 === 0 ? "" : "lg:order-2"}>
        <div className="mb-4 text-tatva-blue">{icon}</div>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="space-y-2">
          {capabilities.map((capability, capIndex) => (
            <li key={capIndex} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-tatva-teal mr-2 flex-shrink-0 mt-0.5" />
              <span>{capability}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={index % 2 === 0 ? "lg:order-2" : ""}>
        <img 
          src={imageUrl}
          alt={title}
          className="rounded-lg shadow-lg w-full"
        />
      </div>
    </div>
  );
};

export default ServiceDetail;
