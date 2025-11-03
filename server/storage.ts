import { 
  type Property, 
  type InsertProperty, 
  type Contact, 
  type InsertContact,
  type Partnership,
  type InsertPartnership 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Properties
  getProperties(): Promise<Property[]>;
  getFeaturedProperties(): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
  
  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Partnerships
  createPartnership(partnership: InsertPartnership): Promise<Partnership>;
}

export class MemStorage implements IStorage {
  private properties: Map<string, Property>;
  private contacts: Map<string, Contact>;
  private partnerships: Map<string, Partnership>;

  constructor() {
    this.properties = new Map();
    this.contacts = new Map();
    this.partnerships = new Map();
    this.seedData();
  }

  private async seedData() {
    // Seed sample properties
    const sampleProperties: Omit<Property, 'id' | 'createdAt'>[] = [
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
        featured: "true",
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
        featured: "true",
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
        featured: "true",
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
        featured: "true",
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
        featured: "false",
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
        featured: "false",
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
        featured: "false",
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
        image: "/attached_assets/generated_images/Luxury_bedroom_interior_24da5850.png",
        featured: "false",
      },
    ];

    sampleProperties.forEach((property) => {
      const id = randomUUID();
      this.properties.set(id, { ...property, id });
    });
  }

  // Properties
  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      (property) => property.featured === "true"
    );
  }

  async getProperty(id: string): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = randomUUID();
    const property: Property = { ...insertProperty, id };
    this.properties.set(id, property);
    return property;
  }

  // Contacts
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date().toISOString(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  // Partnerships
  async createPartnership(insertPartnership: InsertPartnership): Promise<Partnership> {
    const id = randomUUID();
    const partnership: Partnership = {
      ...insertPartnership,
      id,
      createdAt: new Date().toISOString(),
    };
    this.partnerships.set(id, partnership);
    return partnership;
  }
}

export const storage = new MemStorage();
