import { motion } from 'framer-motion';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { PropertyCard } from '@/components/PropertyCard';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import type { Property } from '@shared/schema';
import { Skeleton } from '@/components/ui/skeleton';
import { Award, Users, Building2, MapPin } from 'lucide-react';

export default function Home() {
  const [, setLocation] = useLocation();
  const { data: properties, isLoading, isError } = useQuery<Property[]>({
    queryKey: ['/api/properties/featured'],
  });

  const stats = [
    { icon: Building2, label: 'Properties', value: '50+' },
    { icon: MapPin, label: 'Locations', value: '12' },
    { icon: Users, label: 'Happy Residents', value: '2,500+' },
    { icon: Award, label: 'Years of Excellence', value: '15' },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />

      {/* Brand Introduction */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                At a Glance
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Since 2009, Sokón Residence has been redefining luxury living in Cairo's most 
                  prestigious neighborhoods. Our collection of meticulously designed serviced 
                  apartments represents the pinnacle of contemporary elegance and comfort.
                </p>
                <p>
                  Each residence is thoughtfully curated to provide an unparalleled living 
                  experience, combining sophisticated design with world-class amenities and 
                  personalized service that anticipates your every need.
                </p>
                <p>
                  We believe that luxury is not just about space and aesthetics—it's about 
                  creating a sanctuary where you can truly call home, where every detail is 
                  crafted to elevate your everyday living experience.
                </p>
              </div>
              <div className="mt-8">
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => setLocation('/about')}
                  data-testid="button-learn-more"
                >
                  Learn More About Us
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-lg bg-card border border-card-border text-center hover-elevate transition-all"
                  data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="font-mono text-3xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Signature Residences
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of luxury serviced apartments
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
                  <svg className="h-8 w-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Unable to Load Properties</h3>
                <p className="text-muted-foreground mb-6">We're having trouble loading our properties. Please try again later.</p>
                <Button onClick={() => window.location.reload()} data-testid="button-reload-properties">
                  Reload Page
                </Button>
              </div>
            </div>
          ) : properties && properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.slice(0, 6).map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No properties available at the moment.</p>
            </div>
          )}

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button 
              size="lg" 
              onClick={() => setLocation('/destinations')}
              data-testid="button-view-all-properties"
            >
              View All Properties
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Call to Action */}
      <section className="py-20 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Experience Luxury Living?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
              Let us help you find your perfect residence. Our dedicated team is ready to 
              guide you through our exclusive collection of luxury serviced apartments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setLocation('/contact')}
                data-testid="button-schedule-viewing"
              >
                Schedule a Viewing
              </Button>
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                onClick={() => setLocation('/destinations')}
                data-testid="button-browse-properties"
              >
                Browse Properties
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
