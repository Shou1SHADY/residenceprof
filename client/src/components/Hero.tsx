import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
const heroImage = '/assets/generated_images/Hero_luxury_apartment_interior_82aea2df.png';

export function Hero() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
              Where Lavishness Meets Tranquility
            </h1>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto font-light tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience unparalleled luxury living in Cairo's most prestigious locations. 
            Discover serviced apartments where elegance meets everyday splendor in perfect harmony.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="backdrop-blur-md bg-white/15 border border-white/30 text-white hover:bg-white/25 px-8 py-6 text-base"
              onClick={() => setLocation('/destinations')}
              data-testid="button-hero-explore-destinations"
            >
              Explore Destinations
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="backdrop-blur-md bg-transparent border-2 border-white/40 text-white hover:bg-white/10 px-8 py-6 text-base"
              onClick={() => setLocation('/contact')}
              data-testid="button-hero-view-availability"
            >
              View Availability
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </div>
      </motion.div>
    </div>
  );
}
