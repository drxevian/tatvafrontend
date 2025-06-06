import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-tatva-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4"><span className="text-white">Tatva</span><span className="text-tatva-yellow">Engineers</span></h3>
            <p className="text-gray-300 mb-4">
              Providing innovative engineering solutions with excellence and precision for industrial operations.
            </p>
            <div className="flex space-x-4">
              
              <a href="https://www.linkedin.com/in/tatva-engineers-b6a2b2344" className="hover:text-tatva-teal transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/tatva_engineers?igsh=OHN6OGp1ZGZ6NTAw" className="hover:text-tatva-teal transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-tatva-teal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-tatva-teal transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-tatva-teal transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-tatva-teal transition-colors">
                  Our Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-tatva-teal transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-tatva-teal transition-colors">
                  Project Planning
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-tatva-teal transition-colors">
                  Trading
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-tatva-teal transition-colors">
                  Erection Commissioning and Installation
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-tatva-teal transition-colors">
                  Maintenance
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-tatva-teal transition-colors">
                  Logistics
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-tatva-teal flex-shrink-0 mt-1" />
                <p className="text-gray-300">B-3 Maruti Complex, TP-13, Chhani Jakat Naka, Vadodara</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-tatva-teal flex-shrink-0" />
                <p className="text-gray-300">+91 81608 56345</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-tatva-teal flex-shrink-0" />
                <p className="text-gray-300">tatvaengineerbaroda@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>© {currentYear} Tatva Engineers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
