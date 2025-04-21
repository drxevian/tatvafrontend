import Hero from "src/components/Hero";
import ContactForm from "src/components/ContactForm";
import { Card, CardContent } from "src/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactPage = () => {
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-tatva-blue" />,
      title: "Our Location",
      details: ["B-3 Maruti Complex, TP-13", "Chhani Jakat Naka", "Vadodara, Gujarat, India"],
    },
    {
      icon: <Phone className="h-6 w-6 text-tatva-blue" />,
      title: "Phone",
      details: ["+91 81608 56345", "+91 99989 62098"],
    },
    {
      icon: <Mail className="h-6 w-6 text-tatva-blue" />,
      title: "Email",
      details: ["tatvaengineerbaroda@gmail.com", "thoriyakush@gmail.com"],
    },
    
  ];

  return (
    <>
      <Hero
        title="Contact Us"
        subtitle="Get in Touch with Our Team"
        imageUrl="/contact.avif"
        imageAlt="Contact Tatva Engineers"
      />

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="bg-gradient-to-br from-white via-white to-tatva-background/10 dark:from-tatva-dark dark:via-tatva-dark/90 dark:to-tatva-dark/70 border-tatva-blue/10 hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
                        <div className="bg-gradient-to-br from-tatva-blue/20 to-tatva-teal/20 p-3 rounded-full mr-4 mb-3 sm:mb-0 group-hover:from-tatva-blue/30 group-hover:to-tatva-teal/30 transition-all duration-300">
                          {info.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-tatva-dark dark:text-tatva-light group-hover:text-tatva-blue transition-colors duration-300">{info.title}</h3>
                      </div>
                      <div className="space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-tatva-gray dark:text-tatva-light/80">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Social Media */}
              <h3 className="text-xl font-semibold mt-8 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {[
                  { platform: "linkedin", url: "https://www.linkedin.com/in/tatva-engineers-b6a2b2344" },
                  { platform: "instagram", url: "https://www.instagram.com/tatva_engineers?igsh=OHN6OGp1ZGZ6NTAw" }
                ].map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-muted hover:bg-tatva-blue hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                    aria-label={`Follow us on ${social.platform}`}
                  >
                    <span className="capitalize">{social.platform[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mt-8 mb-16">
        <div className="container mx-auto px-4">
          <div className="bg-muted rounded-lg overflow-hidden h-96">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.772952927495!2d73.15460917538987!3d22.7291416370655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e5c8a6d13a01f%3A0xee2a419b7f729e6f!2sChhani%20Jakat%20Naka%2C%20Vadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1712483033971!5m2!1sen!2sin!4v1712483033971!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              title="Tatva Engineers Location"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
