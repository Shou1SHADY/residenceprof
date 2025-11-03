import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

// Connection URI - Using the direct connection string from MongoDB Atlas
const username = 'shadyosama658_db_user';
const password = 'KnKSJRihtnfJkYXT';
const cluster = 'cluster0.9r3tc5s.mongodb.net';
const dbName = 'skyline_residences';

const uri = `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${cluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

// Sample data
const sampleProperties = [
  {
    name: "Luxury Apartment in New Cairo",
    location: "New Cairo, Cairo",
    description: "A stunning luxury apartment with modern amenities and beautiful views.",
    rentalPrice: 2500,
    salePrice: 350000,
    size: 180,
    bedrooms: 3,
    bathrooms: 2,
    images: [
      "/assets/images/properties/property1-1.jpg",
      "/assets/images/properties/property1-2.jpg"
    ],
    featured: true,
    amenities: ["Swimming Pool", "Gym", "Parking", "24/7 Security", "Elevator"],
    status: "available",
    type: "apartment",
    floorPlan: "/assets/floorplans/floorplan1.jpg",
    locationDetails: {
      address: "90th Street, Fifth Settlement",
      city: "New Cairo",
      coordinates: {
        lat: 30.0444,
        lng: 31.2357
      }
    }
  },
  // Add more sample properties as needed
];

const sampleContacts = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+201234567890",
    message: "I'm interested in the luxury apartment in New Cairo.",
    propertyInterest: null,
    status: "new",
    source: "contact-form"
  }
];

const samplePartners = [
  {
    companyName: "Real Estate Pro",
    contactPerson: "Ahmed Mohamed",
    email: "ahmed@realestatepro.com",
    phone: "+201112345678",
    website: "https://realestatepro.com",
    partnershipType: "agent",
    message: "Interested in partnering for property listings.",
    status: "pending"
  }
];

const sampleAdmin = {
  name: "Admin User",
  email: "admin@skylineresidences.com",
  password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password: 'password'
  role: "admin"
};

async function run() {
  const client = new MongoClient(uri);
  
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const db = client.db(dbName);
    
    // Drop existing collections (be careful in production!)
    await db.collection('properties').drop().catch(() => console.log('Properties collection does not exist, creating...'));
    await db.collection('contacts').drop().catch(() => console.log('Contacts collection does not exist, creating...'));
    await db.collection('partners').drop().catch(() => console.log('Partners collection does not exist, creating...'));
    await db.collection('users').drop().catch(() => console.log('Users collection does not exist, creating...'));
    
    // Create collections with validation
    await db.createCollection('properties', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "location", "description", "size", "bedrooms", "bathrooms"],
          properties: {
            name: { bsonType: "string" },
            location: { bsonType: "string" },
            description: { bsonType: "string" },
            rentalPrice: { bsonType: ["number", "null"] },
            salePrice: { bsonType: ["number", "null"] },
            size: { bsonType: "number" },
            bedrooms: { bsonType: "number" },
            bathrooms: { bsonType: "number" },
            images: { 
              bsonType: "array",
              items: { bsonType: "string" }
            },
            featured: { bsonType: "bool" },
            amenities: { 
              bsonType: "array",
              items: { bsonType: "string" }
            },
            status: { 
              bsonType: "string",
              enum: ["available", "sold", "rented"]
            },
            type: { 
              bsonType: "string",
              enum: ["apartment", "villa", "penthouse", "duplex", "townhouse"]
            },
            floorPlan: { bsonType: ["string", "null"] },
            locationDetails: {
              bsonType: "object",
              properties: {
                address: { bsonType: "string" },
                city: { bsonType: "string" },
                coordinates: {
                  bsonType: "object",
                  properties: {
                    lat: { bsonType: "number" },
                    lng: { bsonType: "number" }
                  }
                }
              }
            },
            createdAt: { bsonType: "date" },
            updatedAt: { bsonType: "date" }
          }
        }
      }
    });

    // Create indexes for better query performance
    await db.collection('properties').createIndex({ name: 'text', description: 'text', 'locationDetails.address': 'text' });
    await db.collection('properties').createIndex({ 'locationDetails.coordinates': '2dsphere' });
    await db.collection('properties').createIndex({ status: 1 });
    await db.collection('properties').createIndex({ type: 1 });
    await db.collection('properties').createIndex({ rentalPrice: 1 });
    await db.collection('properties').createIndex({ salePrice: 1 });
    
    // Insert sample data
    const propertiesWithTimestamps = sampleProperties.map(property => ({
      ...property,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    await db.collection('properties').insertMany(propertiesWithTimestamps);
    console.log('Inserted sample properties');
    
    // Create users collection
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "email", "password", "role"],
          properties: {
            name: { bsonType: "string" },
            email: { 
              bsonType: "string",
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
            },
            password: { bsonType: "string" },
            role: { 
              bsonType: "string",
              enum: ["admin", "agent"]
            },
            lastLogin: { bsonType: ["date", "null"] },
            createdAt: { bsonType: "date" },
            updatedAt: { bsonType: "date" }
          }
        }
      }
    });
    
    // Insert admin user
    await db.collection('users').insertOne({
      ...sampleAdmin,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Created admin user');
    
    // Create contacts collection
    await db.createCollection('contacts', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "email", "message"],
          properties: {
            name: { bsonType: "string" },
            email: { 
              bsonType: "string",
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
            },
            phone: { bsonType: "string" },
            message: { bsonType: "string" },
            propertyInterest: { bsonType: ["string", "null"] },
            preferredDate: { bsonType: ["date", "null"] },
            preferredTime: { bsonType: ["string", "null"] },
            status: { 
              bsonType: "string",
              enum: ["new", "contacted", "completed"],
              default: "new"
            },
            source: { 
              bsonType: "string",
              enum: ["contact-form", "viewing-request", "other"],
              default: "contact-form"
            },
            createdAt: { bsonType: "date" }
          }
        }
      }
    });
    
    // Insert sample contacts with timestamps
    const contactsWithTimestamps = sampleContacts.map(contact => ({
      ...contact,
      createdAt: new Date()
    }));
    
    await db.collection('contacts').insertMany(contactsWithTimestamps);
    console.log('Inserted sample contacts');
    
    // Create partners collection
    await db.createCollection('partners', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["companyName", "contactPerson", "email", "partnershipType"],
          properties: {
            companyName: { bsonType: "string" },
            contactPerson: { bsonType: "string" },
            email: { 
              bsonType: "string",
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
            },
            phone: { bsonType: "string" },
            website: { bsonType: "string" },
            partnershipType: { 
              bsonType: "string",
              enum: ["corporate", "agent", "investor", "other"]
            },
            message: { bsonType: "string" },
            status: { 
              bsonType: "string",
              enum: ["pending", "approved", "rejected"],
              default: "pending"
            },
            createdAt: { bsonType: "date" },
            updatedAt: { bsonType: "date" }
          }
        }
      }
    });
    
    // Insert sample partners with timestamps
    const partnersWithTimestamps = samplePartners.map(partner => ({
      ...partner,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    await db.collection('partners').insertMany(partnersWithTimestamps);
    console.log('Inserted sample partners');
    
    console.log('Database setup completed successfully!');
    
  } catch (err) {
    console.error('Error setting up database:', err);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB Atlas');
  }
}

run().catch(console.dir);
