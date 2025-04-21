import { ArrowRight, Wrench, Briefcase, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "src/components/ui/button";
import Hero from "src/components/Hero";
import ServiceCard from "src/components/ServiceCard";
import TestimonialCard from "src/components/TestimonialCard";

const HomePage = () => {
  const featuredServices = [
    {
      title: "Mechanical Engineering",
      description: "Comprehensive mechanical engineering solutions including design, analysis, and optimization for various industrial applications.",
      icon: <Wrench className="h-6 w-6" />,
      link: "/services",
    },
    {
      title: "Electrical Engineering",
      description: "Expert electrical engineering services from power systems design to control systems and automation solutions.",
      icon: <Briefcase className="h-6 w-6" />,
      link: "/services",
    },
    {
      title: "Civil Engineering",
      description: "Professional civil engineering expertise for infrastructure projects, including structural design and project management.",
      icon: <Award className="h-6 w-6" />,
      link: "/services",
    },
    {
      title: "Consulting Services",
      description: "Strategic consulting for engineering projects, helping optimize processes, costs, and outcomes.",
      icon: <Users className="h-6 w-6" />,
      link: "/services",
    },
  ];

  const testimonials = [
    {
      quote: "TATVA ENGINEERS executed the erection and commissioning phase with exceptional precision. Their structured approach and on-site coordination and ensured a safe startup.",
      author: "Yashodhar Patel",
      role: "Managing Director",
      company: "Krishanj Pharmaceutical Industries",
    },
    {
      quote: "Tatva Engineers helped us procure quality industrial components at competitive prices. Their industry network and after-sales support truly stood out.",
      author: "Amish Patel",
      role: "Plant Supervisor",
      company: "Hitachi Energy India",
    },
    {
      quote: "Tatva Engineers always has the right inventory. Their broad network and market knowledge make them incredibly efficient at sourcing even rare components.",
      author: "Pradeep Kurup",
      role: "Founder",
      company: "Grace Fire Service",
    },
  ];

  return (
    <>
      <Hero
        title="Engineering Excellence for a Better Tomorrow"
        subtitle="Innovative Solutions for Complex Challenges"
        description="Tatva Engineers combines expertise, innovation, and precision engineering to deliver outstanding solutions for the most complex industrial challenges."
        primaryCTA={{ text: "Explore Services", link: "/services" }}
        secondaryCTA={{ text: "Contact Us", link: "/contact" }}
        imageUrl="/home.avif"
        imageAlt="Engineering professionals working together"
        isHomepage={true}
      />

      {/* Services Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Expert Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how our comprehensive range of engineering services can help your business achieve its goals with innovative and sustainable solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild>
              <Link to="/services" className="flex items-center">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Engineering Excellence Since 2022</h2>
              <p className="text-gray-600 mb-6">
                At Tatva Engineers, we combine expertise, innovation, and technology to deliver world-class engineering solutions across multiple industries.
              </p>
              <p className="text-gray-600 mb-6">
                Our team of seasoned engineers brings decades of combined experience, ensuring that every project exceeds expectations in quality, efficiency, and innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button asChild>
                  <Link to="/about">Learn About Us</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-tatva-blue to-tatva-teal hover:from-tatva-blue/90 hover:to-tatva-teal/90 text-white">
                  <Link to="/contact">Contact Our Team</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/founder.jpg" 
                alt="Engineering team at work" 
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-tatva-blue via-tatva-blue/90 to-tatva-teal text-white p-6 rounded-lg shadow-lg md:max-w-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                <p className="font-medium text-lg">
                  "Our mission is to deliver engineering solutions that create lasting value for our clients and society."
                </p>
                <p className="mt-4 font-semibold">— kush Thoriya, Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Hear from the clients who have experienced our engineering excellence firsthand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                company={testimonial.company}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-tatva-blue to-tatva-teal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Engineering Projects?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Partner with Tatva Engineers to bring innovation, efficiency, and excellence to your next project.
          </p>
          <Button asChild size="lg" variant="outline" className="text-white hover:text-white border-white hover:border-white bg-white/10 hover:bg-white/20">
            <Link to="/contact">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default HomePage;
