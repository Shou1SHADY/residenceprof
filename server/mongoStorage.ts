import { MongoClient, Collection, WithId } from 'mongodb';
import { 
  type Property, 
  type InsertProperty, 
  type Contact, 
  type InsertContact,
  type Partnership,
  type InsertPartnership
} from "@shared/schema";
import { IStorage } from "./storage";

// Document interfaces for MongoDB
type PropertyDocument = Omit<Property, 'id'> & { _id: string };
type ContactDocument = Omit<Contact, 'id'> & { _id: string };
type PartnershipDocument = Omit<Partnership, 'id'> & { _id: string };

interface Collections {
  properties: Collection<PropertyDocument>;
  contacts: Collection<ContactDocument>;
  partnerships: Collection<PartnershipDocument>;
}

// Helper functions to convert between database and application types
const toProperty = (doc: WithId<any>): Property => ({
  id: doc._id.toString(),
  name: doc.name,
  location: doc.location,
  description: doc.description,
  rentalPrice: doc.rentalPrice || null,
  salePrice: doc.salePrice || null,
  size: doc.size,
  bedrooms: doc.bedrooms,
  bathrooms: doc.bathrooms,
  image: doc.image,
  featured: doc.featured || 'false',
  createdAt: doc.createdAt || new Date().toISOString()
});

const toContact = (doc: WithId<any>): Contact => ({
  id: doc._id.toString(),
  name: doc.name,
  email: doc.email,
  phone: doc.phone || null,
  message: doc.message,
  propertyInterest: doc.propertyInterest || null,
  createdAt: doc.createdAt || new Date().toISOString()
});

const toPartnership = (doc: WithId<any>): Partnership => ({
  id: doc._id.toString(),
  companyName: doc.companyName,
  contactName: doc.contactName,
  email: doc.email,
  phone: doc.phone,
  message: doc.message,
  createdAt: doc.createdAt || new Date().toISOString()
});

// Helper functions to convert to database documents
const toPropertyDoc = (property: Omit<Property, 'id'> & { _id: string }): PropertyDocument => ({
  _id: property._id,
  name: property.name,
  location: property.location,
  description: property.description,
  rentalPrice: property.rentalPrice || null,
  salePrice: property.salePrice || null,
  size: property.size,
  bedrooms: property.bedrooms,
  bathrooms: property.bathrooms,
  image: property.image,
  featured: property.featured || 'false',
  createdAt: property.createdAt || new Date().toISOString()
});

const toContactDoc = (contact: Omit<Contact, 'id'> & { _id: string }): ContactDocument => ({
  _id: contact._id,
  name: contact.name,
  email: contact.email,
  phone: contact.phone || null,
  message: contact.message,
  propertyInterest: contact.propertyInterest || null,
  createdAt: contact.createdAt || new Date().toISOString()
});

const toPartnershipDoc = (partnership: Omit<Partnership, 'id'> & { _id: string }): PartnershipDocument => ({
  _id: partnership._id,
  companyName: partnership.companyName,
  contactName: partnership.contactName,
  email: partnership.email,
  phone: partnership.phone,
  message: partnership.message,
  createdAt: partnership.createdAt || new Date().toISOString()
});

export class MongoStorage implements IStorage {
  private client: MongoClient;
  private collections!: Collections;

  constructor(connectionString: string) {
    this.client = new MongoClient(connectionString);
  }

  async connect() {
    await this.client.connect();
    const db = this.client.db();
    
    // Initialize collections with proper typing
    this.collections = {
      properties: db.collection<PropertyDocument>('properties'),
      contacts: db.collection<ContactDocument>('contacts'),
      partnerships: db.collection<PartnershipDocument>('partnerships')
    };
    
    // Create indexes
    await this.collections.properties.createIndex({ name: 1 });
    await this.collections.properties.createIndex({ featured: 1 });
    await this.collections.contacts.createIndex({ email: 1 });
  }

  // Properties
  async getProperties(): Promise<Property[]> {
    const docs = await this.collections.properties.find<WithId<PropertyDocument>>({}).toArray();
    return docs.map(doc => toProperty(doc));
  }

  async getFeaturedProperties(): Promise<Property[]> {
    const docs = await this.collections.properties
      .find<WithId<PropertyDocument>>({ featured: 'true' })
      .toArray();
    return docs.map(doc => toProperty(doc));
  }

  async getProperty(id: string): Promise<Property | undefined> {
    const doc = await this.collections.properties.findOne<WithId<PropertyDocument>>({ _id: id });
    return doc ? toProperty(doc) : undefined;
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const _id = Math.random().toString(36).substr(2, 9);
    const now = new Date().toISOString();
    const doc: PropertyDocument = {
      ...property,
      _id,
      rentalPrice: property.rentalPrice || null,
      salePrice: property.salePrice || null,
      featured: property.featured || 'false',
      createdAt: now
    };
    await this.collections.properties.insertOne(doc);
    return {
      id: doc._id,
      name: doc.name,
      location: doc.location,
      description: doc.description,
      rentalPrice: doc.rentalPrice,
      salePrice: doc.salePrice,
      size: doc.size,
      bedrooms: doc.bedrooms,
      bathrooms: doc.bathrooms,
      image: doc.image,
      featured: doc.featured,
      createdAt: doc.createdAt
    };
  }

  // Contacts
  async createContact(contact: InsertContact): Promise<Contact> {
    const _id = Math.random().toString(36).substr(2, 9);
    const now = new Date().toISOString();
    const doc: ContactDocument = {
      ...contact,
      _id,
      phone: contact.phone || null,
      propertyInterest: contact.propertyInterest || null,
      createdAt: now
    };
    await this.collections.contacts.insertOne(doc);
    return {
      id: doc._id,
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      message: doc.message,
      propertyInterest: doc.propertyInterest,
      createdAt: doc.createdAt
    };
  }

  // Partnerships
  async createPartnership(partnership: InsertPartnership): Promise<Partnership> {
    const _id = Math.random().toString(36).substr(2, 9);
    const now = new Date().toISOString();
    const doc: PartnershipDocument = {
      ...partnership,
      _id,
      createdAt: now
    };
    await this.collections.partnerships.insertOne(doc);
    return {
      id: doc._id,
      companyName: doc.companyName,
      contactName: doc.contactName,
      email: doc.email,
      phone: doc.phone,
      message: doc.message,
      createdAt: doc.createdAt
    };
  }

  async disconnect() {
    await this.client.close();
  }
}

// Export a singleton instance
export let mongoStorage: MongoStorage;

export async function initializeMongoStorage(connectionString: string) {
  if (!mongoStorage) {
    mongoStorage = new MongoStorage(connectionString);
    await mongoStorage.connect();
  }
  return mongoStorage;
}
