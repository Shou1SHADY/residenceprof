// server/sqlite-storage.ts
import Database from 'better-sqlite3';
import path from 'path';
import { randomUUID } from 'crypto';
import { IStorage } from './storage';
import { 
  Property, 
  InsertProperty, 
  Contact, 
  InsertContact, 
  Partnership, 
  InsertPartnership 
} from '@shared/schema';
import fs from 'fs';

// Type definitions for database rows
type DbProperty = Omit<Property, 'id' | 'createdAt'> & { 
  id: string; 
  createdAt: string;
};

type DbContact = Omit<Contact, 'id' | 'createdAt' | 'propertyInterest'> & { 
  id: string; 
  createdAt: string;
  propertyInterest?: string;
};

type DbPartnership = Omit<Partnership, 'id' | 'createdAt' | 'contactName'> & { 
  id: string; 
  createdAt: string;
  contactName: string;
};

/**
 * SQLiteStorage implements the IStorage interface using SQLite as the backing store.
 * It provides methods to manage properties, contacts, and partnerships.
 */
class SQLiteStorage {
  private db: Database.Database;
  private static instance: SQLiteStorage | null = null;

  /**
   * Private constructor to enforce singleton pattern
   */
  private constructor() {
    const dbPath = this.getDbPath();
    this.db = this.initializeDatabase(dbPath);
    this.setupCleanupHandlers();
  }

  /**
   * Get the singleton instance of SQLiteStorage
   */
  public static getInstance(): SQLiteStorage {
    if (!SQLiteStorage.instance) {
      SQLiteStorage.instance = new SQLiteStorage();
    }
    return SQLiteStorage.instance;
  }

  /**
   * Close the database connection and clean up resources
   */
  public static async closeInstance(): Promise<void> {
    if (SQLiteStorage.instance) {
      await SQLiteStorage.instance.close();
      SQLiteStorage.instance = null;
    }
  }

  /**
   * Get the database file path
   */
  private getDbPath(): string {
    const dbPath = path.join(process.cwd(), 'data', 'residence-finder.db');
    console.log(`Using SQLite database at: ${dbPath}`);
    return dbPath;
  }

  /**
   * Initialize the database connection and schema
   */
  private initializeDatabase(dbPath: string): Database.Database {
    // Create data directory if it doesn't exist
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    // Open database connection
    const db = new Database(dbPath);
    
    // Configure database settings
    db.pragma('journal_mode = WAL');
    db.pragma('synchronous = NORMAL');
    db.pragma('temp_store = MEMORY');
    db.pragma('mmap_size = 30000000000'); // 30GB
    db.pragma('page_size = 32768');
    db.pragma('foreign_keys = ON');
    db.pragma('wal_autocheckpoint = 100');

    // Create tables
    this.createTables(db);
    
    // Add test data in development
    if (process.env.NODE_ENV !== 'production') {
      this.addTestData(db);
    }

    return db;
  }

  /**
   * Create database tables if they don't exist
   */
  private createTables(db: Database.Database): void {
    // Use a transaction for atomic table creation
    const transaction = db.transaction(() => {
      // Properties table
      db.exec(`
        CREATE TABLE IF NOT EXISTS properties (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          location TEXT NOT NULL,
          description TEXT NOT NULL,
          rentalPrice TEXT,
          salePrice TEXT,
          size INTEGER NOT NULL,
          bedrooms INTEGER NOT NULL,
          bathrooms INTEGER NOT NULL,
          image TEXT NOT NULL,
          featured TEXT NOT NULL DEFAULT 'false',
          createdAt TEXT NOT NULL
        );
      `);

      // Contacts table
      db.exec(`
        CREATE TABLE IF NOT EXISTS contacts (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          message TEXT NOT NULL,
          propertyInterest TEXT,
          createdAt TEXT NOT NULL
        );
      `);

      // Partnerships table
      db.exec(`
        CREATE TABLE IF NOT EXISTS partnerships (
          id TEXT PRIMARY KEY,
          companyName TEXT NOT NULL,
          contactName TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          message TEXT NOT NULL,
          createdAt TEXT NOT NULL
        );
      `);

      // Create indexes
      db.exec(`
        CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
        CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);
        CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
        CREATE INDEX IF NOT EXISTS idx_partnerships_email ON partnerships(email);
      `);
    });

    // Execute the transaction
    transaction();
  }

  /**
   * Add test data to the database (development only)
   */
  private addTestData(db: Database.Database): void {
    try {
      // Check if properties table is empty
      const result = db.prepare("SELECT COUNT(*) as count FROM properties").get() as { count: number };
      
      if (result.count > 0) {
        return; // Don't add test data if the table already has data
      }

      const properties = [
        {
          name: 'Luxury Apartment',
          location: 'Downtown',
          description: 'Beautiful luxury apartment in the heart of the city',
          rentalPrice: '2500',
          salePrice: '500000',
          size: 1200,
          bedrooms: 2,
          bathrooms: 2,
          image: '/images/property1.jpg',
          featured: 'true'
        },
        {
          name: 'Modern Villa',
          location: 'Beachfront',
          description: 'Stunning modern villa with ocean view',
          rentalPrice: '5000',
          salePrice: '1000000',
          size: 2500,
          bedrooms: 4,
          bathrooms: 3,
          image: '/images/property2.jpg',
          featured: 'true'
        }
      ];

      const insertProperty = db.prepare(`
        INSERT INTO properties (
          id, name, location, description, rentalPrice, salePrice, 
          size, bedrooms, bathrooms, image, featured, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const now = new Date().toISOString();
      
      // Use a transaction for atomic insertion
      const transaction = db.transaction((items: any[]) => {
        for (const prop of items) {
          insertProperty.run(
            randomUUID(),
            prop.name,
            prop.location,
            prop.description,
            prop.rentalPrice,
            prop.salePrice,
            prop.size,
            prop.bedrooms,
            prop.bathrooms,
            prop.image,
            prop.featured,
            now
          );
        }
      });

      // Execute the transaction
      transaction(properties);
      
      console.log('Added test data to the database');
    } catch (error) {
      console.error('Error adding test data:', error);
    }
  }

  // Property Methods
  
  async getProperties(): Promise<Property[]> {
    try {
      const stmt = this.db.prepare('SELECT * FROM properties ORDER BY createdAt DESC');
      const results = stmt.all() as DbProperty[];
      return results.map(row => this.mapToProperty(row));
    } catch (error) {
      console.error('Error getting properties:', error);
      throw new Error('Failed to fetch properties');
    }
  }

  async getFeaturedProperties(): Promise<Property[]> {
    try {
      const stmt = this.db.prepare(
        "SELECT * FROM properties WHERE featured = 'true' ORDER BY createdAt DESC"
      );
      const results = stmt.all() as DbProperty[];
      return results.map(row => this.mapToProperty(row));
    } catch (error) {
      console.error('Error getting featured properties:', error);
      throw new Error('Failed to fetch featured properties');
    }
  }

  async getProperty(id: string): Promise<Property | undefined> {
    try {
      const stmt = this.db.prepare('SELECT * FROM properties WHERE id = ?');
      const result = stmt.get(id) as DbProperty | undefined;
      return result ? this.mapToProperty(result) : undefined;
    } catch (error) {
      console.error(`Error getting property ${id}:`, error);
      throw new Error('Failed to fetch property');
    }
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const id = randomUUID();
    const now = new Date().toISOString();
    
    try {
      const stmt = this.db.prepare(`
        INSERT INTO properties (
          id, name, location, description, rentalPrice, salePrice,
          size, bedrooms, bathrooms, image, featured, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const dbProperty = {
        ...property,
        rentalPrice: property.rentalPrice || null,
        salePrice: property.salePrice || null,
        featured: property.featured || 'false'
      };
      
      stmt.run(
        id,
        dbProperty.name,
        dbProperty.location,
        dbProperty.description,
        dbProperty.rentalPrice,
        dbProperty.salePrice,
        dbProperty.size,
        dbProperty.bedrooms,
        dbProperty.bathrooms,
        dbProperty.image,
        dbProperty.featured,
        now
      );
      
      return {
        ...dbProperty,
        id,
        createdAt: now
      };
    } catch (error) {
      console.error('Error creating property:', error);
      throw new Error('Failed to create property');
    }
  }

  // Contact Methods
  
  async createContact(contact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const now = new Date().toISOString();
    
    try {
      const dbContact = {
        ...contact,
        phone: contact.phone || null,
        propertyInterest: contact.propertyInterest || null
      };
      
      const stmt = this.db.prepare(`
        INSERT INTO contacts (
          id, name, email, phone, message, propertyInterest, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      
      stmt.run(
        id,
        dbContact.name,
        dbContact.email,
        dbContact.phone,
        dbContact.message,
        dbContact.propertyInterest,
        now
      );
      
      return {
        ...dbContact,
        id,
        createdAt: now
      };
    } catch (error) {
      console.error('Error creating contact:', error);
      throw new Error('Failed to create contact');
    }
  }

  // Partnership Methods
  
  async createPartnership(partnership: InsertPartnership): Promise<Partnership> {
    const id = randomUUID();
    const now = new Date().toISOString();
    
    try {
      const stmt = this.db.prepare(`
        INSERT INTO partnerships (
          id, companyName, contactName, email, phone, message, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      
      stmt.run(
        id,
        partnership.companyName,
        partnership.contactName,
        partnership.email,
        partnership.phone,
        partnership.message,
        now
      );
      
      return {
        ...partnership,
        id,
        createdAt: now
      };
    } catch (error) {
      console.error('Error creating partnership:', error);
      throw new Error('Failed to create partnership');
    }
  }

  // Helper Methods
  
  private mapToProperty(row: DbProperty): Property {
    return {
      id: row.id,
      name: row.name,
      location: row.location,
      description: row.description,
      rentalPrice: row.rentalPrice || null,
      salePrice: row.salePrice || null,
      size: row.size,
      bedrooms: row.bedrooms,
      bathrooms: row.bathrooms,
      image: row.image,
      featured: row.featured,
      createdAt: row.createdAt
    };
  }

  private mapToContact(row: DbContact): Contact {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone || null,
      message: row.message,
      propertyInterest: row.propertyInterest || null,
      createdAt: row.createdAt
    };
  }

  private mapToPartnership(row: DbPartnership): Partnership {
    return {
      id: row.id,
      companyName: row.companyName,
      contactName: row.contactName,
      email: row.email,
      phone: row.phone,
      message: row.message,
      createdAt: row.createdAt
    };
  }

  /**
   * Setup cleanup handlers for graceful shutdown
   */
  private setupCleanupHandlers(): void {
    const cleanup = async () => {
      console.log('Closing database connection...');
      await this.close();
      process.exit(0);
    };

    // Handle different termination signals
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    process.on('uncaughtException', async (error) => {
      console.error('Uncaught exception:', error);
      await cleanup();
    });
  }

  /**
   * Close the database connection
   */
  async close(): Promise<void> {
    try {
      // Ensure all statements are finalized
      this.db.pragma('optimize');
      
      // Close the database
      this.db.close();
      
      // Clear the singleton instance
      if (SQLiteStorage.instance === this) {
        SQLiteStorage.instance = null;
      }
      
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error closing database:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
export const sqliteStorage: IStorage = SQLiteStorage.getInstance();

// Export the SQLiteStorage class as default
export default SQLiteStorage;
