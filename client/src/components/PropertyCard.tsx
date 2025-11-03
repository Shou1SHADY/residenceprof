import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Maximize2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Property } from '@shared/schema';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden border-card-border hover-elevate transition-all duration-300" data-testid={`card-property-${property.id}`}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground border-0">
            {property.location}
          </Badge>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary-foreground transition-colors" data-testid={`text-property-name-${property.id}`}>
              {property.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {property.description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-border">
            <div className="flex items-center gap-2 text-sm">
              <Bed className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground" data-testid={`text-bedrooms-${property.id}`}>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Bath className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground" data-testid={`text-bathrooms-${property.id}`}>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Maximize2 className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground" data-testid={`text-size-${property.id}`}>{property.size} m²</span>
            </div>
          </div>

          <div className="space-y-2">
            {property.rentalPrice && (
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Rental</span>
                <span className="font-mono text-lg font-bold text-foreground" data-testid={`text-rental-price-${property.id}`}>
                  ${Number(property.rentalPrice).toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/mo</span>
                </span>
              </div>
            )}
            {property.salePrice && (
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Sale Price</span>
                <span className="font-mono text-lg font-bold text-primary-foreground" data-testid={`text-sale-price-${property.id}`}>
                  ${Number(property.salePrice).toLocaleString()}
                </span>
              </div>
            )}
          </div>

          <button className="w-full flex items-center justify-between px-4 py-3 bg-muted/50 rounded-md hover-elevate transition-all group/btn" data-testid={`button-view-details-${property.id}`}>
            <span className="text-sm font-medium text-foreground">View Details</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </Card>
    </motion.div>
  );
}
