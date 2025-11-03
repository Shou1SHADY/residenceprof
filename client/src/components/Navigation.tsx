import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

function NavigateButton({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: any }) {
  const [, setLocation] = useLocation();
  return (
    <Button onClick={() => setLocation(href)} {...props}>
      {children}
    </Button>
  );
}

export function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/destinations', label: 'Our Destinations' },
    { path: '/partner', label: 'Be Our Partner' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link 
            href="/" 
            className="flex items-center gap-2 cursor-pointer group"
            data-testid="link-home"
          >
            <div className="text-2xl font-serif font-bold tracking-tight">
              <span className={`${isScrolled ? 'text-foreground' : 'text-white'} transition-colors`}>
                SkyLine
              </span>
              <span className="text-primary-foreground"> Residence</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`text-sm font-medium tracking-wide transition-colors hover-elevate px-3 py-2 rounded-md ${
                  location === link.path
                    ? isScrolled
                      ? 'text-primary-foreground'
                      : 'text-primary-foreground'
                    : isScrolled
                    ? 'text-foreground hover:text-primary-foreground'
                    : 'text-white/90 hover:text-white'
                }`}
                data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <NavigateButton
              href="/contact"
              variant={isScrolled ? 'default' : 'outline'}
              className={`${!isScrolled && 'backdrop-blur-md bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
              data-testid="button-get-started"
            >
              Get Started
            </NavigateButton>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu-toggle"
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-foreground' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-foreground' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-lg border-t border-border">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors hover-elevate ${
                  location === link.path
                    ? 'bg-primary/10 text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </Link>
            ))}
            <NavigateButton
              href="/contact"
              className="w-full mt-4" 
              onClick={() => setIsMobileMenuOpen(false)}
              data-testid="button-mobile-get-started"
            >
              Get Started
            </NavigateButton>
          </div>
        </div>
      )}
    </nav>
  );
}
