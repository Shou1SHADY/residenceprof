import { motion } from 'framer-motion';
import { 
  Waves, 
  Dumbbell, 
  Car, 
  Sofa, 
  Palmtree, 
  Flame, 
  Shield, 
  HeadphonesIcon, 
  Wifi, 
  Wind 
} from 'lucide-react';

const features = [
  { icon: Waves, label: 'Swimming Pool' },
  { icon: Dumbbell, label: 'Fitness Center' },
  { icon: Car, label: 'Parking' },
  { icon: Sofa, label: 'Fully Furnished' },
  { icon: Palmtree, label: 'Beach Access' },
  { icon: Flame, label: 'Heating' },
  { icon: Shield, label: '24/7 Security' },
  { icon: HeadphonesIcon, label: 'Concierge' },
  { icon: Wifi, label: 'High-Speed WiFi' },
  { icon: Wind, label: 'Climate Control' },
];

export function Features() {
  return (
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
            Unparalleled Amenities & Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every detail crafted for your comfort and convenience
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card hover-elevate transition-all duration-300 border border-card-border"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              data-testid={`feature-${feature.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">{feature.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
