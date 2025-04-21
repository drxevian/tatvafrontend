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
            <h3 className="text-2xl font-bold mb-4">Tatva<span className="text-tatva-teal">Engineers</span></h3>
            <p className="text-gray-300 mb-4">
              Providing innovative engineering solutions with excellence and precision for industrial operations.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-tatva-teal transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-tatva-teal transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" className="hover:text-tatva-teal transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com" className="hover:text-tatva-teal transition-colors" aria-label="Instagram">
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
                  Services
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-tatva-teal transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-tatva-teal transition-colors">
                  Contact
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
                  Erection and Installation
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-tatva-teal transition-colors">
                  Chemicals & Petrochemicals
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-tatva-teal transition-colors">
                  Pharmaceuticals
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
