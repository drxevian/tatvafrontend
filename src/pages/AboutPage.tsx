import Hero from "src/components/Hero.tsx";
import TestimonialCard from "src/components/TestimonialCard";
import { Button } from "src/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase, Award, Clock, CheckCircle, ChevronRight, Activity, Car, Beaker, Hotel, Factory, Pickaxe, Droplets, Shirt, Pill, Anchor } from "lucide-react";
import { Card, CardContent } from "src/components/ui/card";

const AboutPage = () => {
  const coreValues = [
    {
      title: "Innovation",
      description: "We constantly innovate and adapt to new technologies and methodologies to provide cutting-edge solutions.",
      icon: <Award className="h-8 w-8 text-tatva-blue" />,
    },
    {
      title: "Quality",
      description: "We maintain high standards of quality and ensure that every project is executed with precision and excellence.",
      icon: <CheckCircle className="h-8 w-8 text-tatva-blue" />,
    },
    {
      title: "Safety",
      description: "We prioritize safety in all our operations and adopt practices that protect both people and the environment.",
      icon: <Briefcase className="h-8 w-8 text-tatva-blue" />,
    },
    {
      title: "Client Relationships",
      description: "We foster long-term relationships with our clients by consistently delivering value and exceeding their expectations.",
      icon: <Clock className="h-8 w-8 text-tatva-blue" />,
    },
  ];

  const team = [
    {
      name: "Kush Thoriya",
      role: "Founder & CEO",
      bio: "Kush has extensive experience in engineering solutions and has led Tatva Engineers to become a trusted provider in the industry.",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80",
    },
    {
      name: "Team Member",
      role: "Chief Technical Officer",
      bio: "With expertise in technical aspects, our CTO brings innovative approaches to all our engineering projects.",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    },
    {
      name: "Team Member",
      role: "Head of Operations",
      bio: "Our operations head specializes in ensuring smooth execution of all projects with efficiency and precision.",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
    },
    {
      name: "Team Member",
      role: "Lead Engineer",
      bio: "Our lead engineer is an expert in designing and implementing innovative solutions for various industries.",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
    },
  ];

  const timeline = [
    {
      year: "Founding",
      title: "Tatva Engineers Founded",
      description: "Established as an engineering solutions provider in Vadodara by Kush Thoriya.",
    },
    {
      year: "Growth",
      title: "Expansion of Services",
      description: "Expanded our service offerings to include project planning, trading, and erection services.",
    },
    {
      year: "Present",
      title: "Industry Leader",
      description: "Serving multiple industries including chemicals, pharmaceuticals, plastic, and ceramic sectors.",
    }
  ];

  return (
    <>
      <Hero
        title="About Tatva Engineers"
        subtitle="Engineering Excellence for Industrial Operations"
        imageUrl="/home.avif"
        imageAlt="Tatva Engineers team"
      />

      {/* Vision and Mission */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-gray-600 mb-6">
                Our vision is to be a leading engineering solutions provider, recognized for our commitment to innovation, quality, and sustainability. We aim to set new industry standards by continuously improving our services and expanding our expertise to meet the evolving needs of our clients and the industries we serve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button asChild>
                  <Link to="/services">Our Services</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div>
              <img 
                src="/vision.jpg" 
                alt="Tatva Engineers vision" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our mission is to deliver exceptional engineering services that enhance the efficiency and reliability of industrial operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="h-full bg-gradient-to-br from-white via-white to-tatva-background/10 dark:from-tatva-dark dark:via-tatva-dark/90 dark:to-tatva-dark/70 border-tatva-blue/10 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 h-full">
                <h3 className="text-xl font-bold mb-4 text-tatva-dark dark:text-tatva-light group-hover:text-tatva-blue transition-colors duration-300">Provide Tailored Solutions</h3>
                <p className="text-tatva-gray dark:text-tatva-light/80">
                  Develop and implement customized engineering solutions that meet the specific needs of each client.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full bg-gradient-to-br from-white via-white to-tatva-background/10 dark:from-tatva-dark dark:via-tatva-dark/90 dark:to-tatva-dark/70 border-tatva-blue/10 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 h-full">
                <h3 className="text-xl font-bold mb-4 text-tatva-dark dark:text-tatva-light group-hover:text-tatva-blue transition-colors duration-300">Maintain High Standards of Quality</h3>
                <p className="text-tatva-gray dark:text-tatva-light/80">
                  Ensure that every project we undertake is executed with the highest level of quality and precision.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full bg-gradient-to-br from-white via-white to-tatva-background/10 dark:from-tatva-dark dark:via-tatva-dark/90 dark:to-tatva-dark/70 border-tatva-blue/10 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 h-full">
                <h3 className="text-xl font-bold mb-4 text-tatva-dark dark:text-tatva-light group-hover:text-tatva-blue transition-colors duration-300">Promote Safety and Sustainability</h3>
                <p className="text-tatva-gray dark:text-tatva-light/80">
                  Prioritize safety in all our operations while adopting sustainable practices that benefit both our clients and the environment.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full bg-gradient-to-br from-white via-white to-tatva-background/10 dark:from-tatva-dark dark:via-tatva-dark/90 dark:to-tatva-dark/70 border-tatva-blue/10 hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 h-full">
                <h3 className="text-xl font-bold mb-4 text-tatva-dark dark:text-tatva-light group-hover:text-tatva-blue transition-colors duration-300">Foster Long-Term Relationships</h3>
                <p className="text-tatva-gray dark:text-tatva-light/80">
                  Build lasting relationships with our clients by consistently delivering value and exceeding their expectations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide our work and define our approach to engineering excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="text-center h-full flex flex-col bg-gradient-to-br from-white via-white to-tatva-background/10 dark:from-tatva-dark dark:via-tatva-dark/90 dark:to-tatva-dark/70 border-tatva-blue/10 hover:shadow-xl transition-all duration-300 group">
                <CardContent className="pt-6 flex flex-col items-center h-full">
                  <div className="mb-4 bg-gradient-to-br from-tatva-blue/20 to-tatva-teal/20 p-4 rounded-full group-hover:from-tatva-blue/30 group-hover:to-tatva-teal/30 transition-all duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-tatva-dark dark:text-tatva-light group-hover:text-tatva-blue transition-colors duration-300">{value.title}</h3>
                  <p className="text-tatva-gray dark:text-tatva-light/80">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100 dark:from-tatva-dark/90 dark:to-tatva-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide engineering solutions across a variety of industrial sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[
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
            ].map((industry, index) => (
              <Card key={index} className="bg-gradient-to-br from-white to-white/90 dark:from-tatva-dark dark:to-tatva-dark/90 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-tatva-blue/5 hover:to-tatva-teal/5 dark:hover:from-tatva-blue/10 dark:hover:to-tatva-teal/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gradient-to-br from-tatva-blue/10 to-tatva-teal/10 p-3 rounded-lg text-tatva-blue">
                    {industry.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-tatva-dark dark:text-tatva-light">{industry.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{industry.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-tatva-blue to-tatva-teal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            For tailored solutions and expert engineering services, contact Tatva Engineers today. We are committed to helping your business thrive.
          </p>
          <Button asChild size="lg" variant="outline" className="text-white hover:text-white border-white hover:border-white bg-white/10 hover:bg-white/20">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
