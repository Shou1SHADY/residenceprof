import { Link } from 'wouter';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="font-serif text-2xl font-bold mb-4">
              Sokón <span className="text-foreground/80">Residence</span>
            </div>
            <p className="text-primary-foreground/80 text-sm mb-6 leading-relaxed">
              Experience unparalleled luxury living in Cairo's most prestigious locations. 
              Where elegance meets everyday splendor.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover-elevate transition-all" aria-label="Facebook" data-testid="link-social-facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover-elevate transition-all" aria-label="Instagram" data-testid="link-social-instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover-elevate transition-all" aria-label="LinkedIn" data-testid="link-social-linkedin">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover-elevate transition-all" aria-label="Twitter" data-testid="link-social-twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm inline-block"
                  data-testid="link-footer-home"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm inline-block"
                  data-testid="link-footer-about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/destinations" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm inline-block"
                  data-testid="link-footer-destinations"
                >
                  Our Destinations
                </Link>
              </li>
              <li>
                <Link 
                  href="/partner" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm inline-block"
                  data-testid="link-footer-partner"
                >
                  Be Our Partner
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm inline-block"
                  data-testid="link-footer-contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-foreground/70 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  123 Luxury Boulevard, New Cairo, Egypt
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-foreground/70" />
                <a href="tel:+201234567890" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm" data-testid="link-phone">
                  +20 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-foreground/70" />
                <a href="mailto:info@sokonresidence.com" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm" data-testid="link-email">
                  info@sokonresidence.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Opening Hours</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary-foreground/70 mt-0.5" />
                <div className="text-primary-foreground/80 text-sm">
                  <p className="font-medium">Monday - Friday</p>
                  <p>9:00 AM - 6:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary-foreground/70 mt-0.5" />
                <div className="text-primary-foreground/80 text-sm">
                  <p className="font-medium">Saturday</p>
                  <p>10:00 AM - 4:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary-foreground/70 mt-0.5" />
                <div className="text-primary-foreground/80 text-sm">
                  <p className="font-medium">Sunday</p>
                  <p>Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/70 text-sm">
              © {new Date().getFullYear()} Sokón Residence. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm" data-testid="link-privacy">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm" data-testid="link-terms">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
