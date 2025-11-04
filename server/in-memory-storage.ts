import type { 
  IStorage, 
  Property, 
  InsertProperty, 
  Contact, 
  InsertContact, 
  Partnership, 
  InsertPartnership 
} from './storage';

class InMemoryStorage implements IStorage {
  private properties: Property[] = [];
  private contacts: Contact[] = [];
  private partnerships: Partnership[] = [];
  private nextId = 1;

  constructor() {
    // Add test properties
    this.createTestData();
  }

  private async createTestData() {
    console.log('Seeding initial data...');
    
    // Sample properties from the original storage.ts
    const sampleProperties = [
      {
        name: "Vanilla Apartment",
        location: "Rehab City, New Cairo",
        description: "Luxurious 3-bedroom apartment with stunning city views, modern amenities, and elegant interiors. Perfect for families seeking premium living.",
        rentalPrice: "3500",
        salePrice: "450000",
        size: 180,
        bedrooms: 3,
        bathrooms: 2,
        image: "/assets/generated_images/Luxury_bedroom_interior_24da5850.png",
        featured: "true"
      },
      {
        name: "Hilton Nile Residence",
        location: "Maadi, Cairo",
        description: "Premium waterfront apartment with panoramic Nile views. Features include marble flooring, designer kitchen, and exclusive amenities.",
        rentalPrice: "4200",
        salePrice: "520000",
        size: 200,
        bedrooms: 3,
        bathrooms: 3,
        image: "/assets/generated_images/Luxury_kitchen_interior_50342f99.png",
        featured: "true"
      },
      {
        name: "Sky Tower Penthouse",
        location: "New Cairo",
        description: "Elegant penthouse suite with floor-to-ceiling windows and private terrace. Experience luxury living at its finest with smart home integration.",
        rentalPrice: "5500",
        salePrice: "680000",
        size: 250,
        bedrooms: 4,
        bathrooms: 4,
        image: "/assets/generated_images/Hero_luxury_apartment_interior_82aea2df.png",
        featured: "true"
      },
      {
        name: "Garden View Villa",
        location: "Heliopolis",
        description: "Spacious villa-style apartment with private garden and pool access. Perfect blend of indoor-outdoor living with premium finishes.",
        rentalPrice: "4800",
        salePrice: "595000",
        size: 220,
        bedrooms: 4,
        bathrooms: 3,
        image: "/assets/generated_images/Rooftop_pool_amenity_76940a51.png",
        featured: "true"
      },
      {
        name: "Executive Studio",
        location: "New Cairo",
        description: "Modern studio apartment ideal for professionals. Fully furnished with contemporary design, high-speed internet, and 24/7 concierge.",
        rentalPrice: "1800",
        salePrice: "220000",
        size: 65,
        bedrooms: 1,
        bathrooms: 1,
        image: "/assets/generated_images/Luxury_bathroom_interior_2cc7de56.png",
        featured: "false"
      },
      {
        name: "Diplomat Suite",
        location: "Maadi, Cairo",
        description: "Prestigious 2-bedroom suite in diplomatic district. Features include marble bathrooms, gourmet kitchen, and private balcony.",
        rentalPrice: "3200",
        salePrice: "410000",
        size: 150,
        bedrooms: 2,
        bathrooms: 2,
        image: "/assets/generated_images/Luxury_fitness_center_c4fd52da.png",
        featured: "false"
      },
      {
        name: "Oasis Residence",
        location: "Rehab City, New Cairo",
        description: "Serene apartment with garden views and resort-style amenities. Includes gym access, swimming pool, and children's play area.",
        rentalPrice: "2900",
        salePrice: "365000",
        size: 140,
        bedrooms: 2,
        bathrooms: 2,
        image: "/assets/generated_images/Luxury_fitness_center_c4fd52da.png",
        featured: "false"
      },
      {
        name: "Premium Loft",
        location: "New Cairo",
        description: "Contemporary loft apartment with high ceilings and open-plan design. Features designer furniture and state-of-the-art appliances.",
        rentalPrice: "3800",
        salePrice: "475000",
        size: 175,
        bedrooms: 2,
        bathrooms: 2,
        image: "/assets/generated_images/Luxury_bedroom_interior_24da5850.png",
        featured: "false"
      }
    ];

    // Add all sample properties
    for (const property of sampleProperties) {
      await this.createProperty(property);
    }

    console.log('Initial data seeded successfully');
  }

  async getProperties(): Promise<Property[]> {
    return [...this.properties];
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return this.properties.filter(p => p.featured === 'true');
  }

  async getProperty(id: string): Promise<Property | undefined> {
    return this.properties.find(p => p.id === id);
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const newProperty: Property = {
      ...property,
      id: `prop-${this.nextId++}`,
      featured: property.featured || 'false',
      createdAt: new Date().toISOString(),
      rentalPrice: property.rentalPrice || null,
      salePrice: property.salePrice || null
    };
    this.properties.push(newProperty);
    return newProperty;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const newContact: Contact = {
      ...contact,
      id: `contact-${this.nextId++}`,
      phone: contact.phone || null,
      propertyInterest: contact.propertyInterest || null,
      createdAt: new Date().toISOString()
    };
    this.contacts.push(newContact);
    return newContact;
  }

  async createPartnership(partnership: InsertPartnership): Promise<Partnership> {
    const newPartnership: Partnership = {
      ...partnership,
      id: `partner-${this.nextId++}`,
      createdAt: new Date().toISOString()
    };
    this.partnerships.push(newPartnership);
    return newPartnership;
  }

  async close(): Promise<void> {
    // No cleanup needed for in-memory storage
  }
}

export function createInMemoryStorage(): IStorage {
  return new InMemoryStorage();
}
