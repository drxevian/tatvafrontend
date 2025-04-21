import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card";
import { ArrowRight } from "lucide-react";
import ServiceInquiryForm from "./ServiceInquiryForm";
import { Button } from "src/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const ServiceCard = ({ title, description, icon, link }: ServiceCardProps) => {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 h-full flex flex-col group bg-gradient-to-br from-tatva-blue/5 via-tatva-teal/5 to-background dark:from-tatva-blue/10 dark:via-tatva-teal/10 dark:to-tatva-dark border-tatva-blue/10 hover:from-tatva-blue/10 hover:via-tatva-teal/10 hover:to-background dark:hover:from-tatva-blue/20 dark:hover:via-tatva-teal/20 dark:hover:to-tatva-dark">
      <Link to={link} className="flex-grow">
        <CardHeader>
          <div className="bg-gradient-to-br from-tatva-blue/20 to-tatva-teal/20 w-14 h-14 rounded-full flex items-center justify-center text-tatva-blue mb-4 group-hover:from-tatva-blue/30 group-hover:to-tatva-teal/30 transition-all duration-300 group-hover:scale-110">
            {icon}
          </div>
          <CardTitle className="text-xl text-tatva-dark dark:text-tatva-light group-hover:text-tatva-blue transition-colors duration-300 flex items-center">
            {title}
            <ArrowRight className="w-5 h-5 ml-2 inline-block opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base text-tatva-gray dark:text-tatva-light/80 group-hover:text-tatva-gray/90 dark:group-hover:text-tatva-light/90 transition-colors duration-300">
            {description}
          </CardDescription>
        </CardContent>
      </Link>
      <div className="p-4 pt-0">
        <ServiceInquiryForm
          serviceName={title}
          trigger={
            <Button 
              variant="outline" 
              className="w-full group-hover:border-tatva-blue/30 group-hover:text-tatva-blue transition-all duration-300 bg-gradient-to-r from-tatva-blue/5 to-tatva-teal/5 dark:from-tatva-blue/10 dark:to-tatva-teal/10 hover:from-tatva-blue/10 hover:to-tatva-teal/10 dark:hover:from-tatva-blue/20 dark:hover:to-tatva-teal/20"
            >
              <span className="flex items-center justify-center gap-2">
                Inquire Now
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
              </span>
            </Button>
          }
        />
      </div>
    </Card>
  );
};

export default ServiceCard;
