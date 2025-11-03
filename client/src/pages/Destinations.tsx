import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PropertyCard } from '@/components/PropertyCard';
import { useQuery } from '@tanstack/react-query';
import type { Property } from '@shared/schema';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function Destinations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');

  const { data: properties, isLoading, isError } = useQuery<Property[]>({
    queryKey: ['/api/properties'],
  });

  const filteredProperties = properties?.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      locationFilter === 'all' || property.location.includes(locationFilter);

    const matchesPrice =
      priceFilter === 'all' ||
      (priceFilter === 'under-2000' &&
        property.rentalPrice &&
        Number(property.rentalPrice) < 2000) ||
      (priceFilter === '2000-4000' &&
        property.rentalPrice &&
        Number(property.rentalPrice) >= 2000 &&
        Number(property.rentalPrice) <= 4000) ||
      (priceFilter === 'over-4000' &&
        property.rentalPrice &&
        Number(property.rentalPrice) > 4000);

    return matchesSearch && matchesLocation && matchesPrice;
  });

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary" />
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h1
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our Destinations
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Explore our collection of luxury serviced apartments across Cairo's finest locations
            </motion.p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <section className="py-12 bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name or location..."
                  className="pl-10 h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-testid="input-search-properties"
                />
              </div>
            </div>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="h-12" data-testid="select-location-filter">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="New Cairo">New Cairo</SelectItem>
                <SelectItem value="Maadi">Maadi</SelectItem>
                <SelectItem value="Heliopolis">Heliopolis</SelectItem>
                <SelectItem value="Rehab City">Rehab City</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="h-12" data-testid="select-price-filter">
                <SelectValue placeholder="All Prices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-2000">Under $2,000/mo</SelectItem>
                <SelectItem value="2000-4000">$2,000 - $4,000/mo</SelectItem>
                <SelectItem value="over-4000">Over $4,000/mo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(searchTerm || locationFilter !== 'all' || priceFilter !== 'all') && (
            <div className="mt-4 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Active filters applied
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('all');
                  setPriceFilter('all');
                }}
                data-testid="button-clear-filters"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
          ) : filteredProperties && filteredProperties.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-muted-foreground">
                  Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                No properties found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('all');
                  setPriceFilter('all');
                }}
                data-testid="button-reset-filters"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
