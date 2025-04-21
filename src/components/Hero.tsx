import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  description?: string;
  primaryCTA?: {
    text: string;
    link: string;
  };
  secondaryCTA?: {
    text: string;
    link: string;
  };
  imageUrl: string;
  imageAlt: string;
  isHomepage?: boolean;
}

const Hero = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  imageUrl,
  imageAlt,
  isHomepage = false,
}: HeroProps) => {
  return (
    <div className={`relative ${isHomepage ? 'min-h-screen' : 'min-h-[60vh]'} flex items-center`}>
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-tatva-dark/80 to-tatva-dark/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className={`grid grid-cols-1 ${isHomepage ? 'lg:grid-cols-2' : ''} gap-8 items-center`}>
          <div className={`text-white ${!isHomepage && 'text-center mx-auto max-w-3xl'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
              {title}
            </h1>
            <h2 className="text-xl md:text-2xl font-medium mb-6 text-tatva-teal animate-fade-in" style={{ animationDelay: '200ms' }}>
              {subtitle}
            </h2>
            {description && (
              <p className="text-lg opacity-90 mb-8 max-w-lg animate-fade-in" style={{ animationDelay: '400ms' }}>
                {description}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '600ms' }}>
              {primaryCTA && (
                <Button asChild size="lg" className="font-medium">
                  <Link to={primaryCTA.link}>{primaryCTA.text}</Link>
                </Button>
              )}
              {secondaryCTA && (
                <Button asChild variant="outline" size="lg" className="text-white hover:text-white border-white hover:border-tatva-teal">
                  <Link to={secondaryCTA.link} className="flex items-center">
                    {secondaryCTA.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {isHomepage && (
            <div className="hidden lg:block">
              {/* Optional content for homepage hero right side */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
