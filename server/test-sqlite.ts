// server/test-sqlite.ts
import { sqliteStorage } from './sqlite-storage.js';
import type { Property, Contact, Partnership } from '@shared/schema.js';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';
import path from 'path';

// Add .js extension to imports for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTests() {
  try {
    console.log('Starting SQLite storage tests...');

    // Test 1: Get all properties
    console.log('\n--- Testing getProperties() ---');
    const properties = await sqliteStorage.getProperties();
    console.log(`Found ${properties.length} properties`);
    if (properties.length > 0) {
      console.log('Sample property:', JSON.stringify(properties[0], null, 2));
    }

    // Test 2: Create a new property
    console.log('\n--- Testing createProperty() ---');
    const newProperty = {
      name: 'Test Property',
      location: 'Test Location',
      description: 'This is a test property',
      rentalPrice: '1500',
      salePrice: '300000',
      size: 1000,
      bedrooms: 2,
      bathrooms: 1,
      image: '/images/test.jpg',
      featured: 'true',  // Must be string 'true' or 'false'
      id: randomUUID(),
      createdAt: new Date().toISOString()
    };
    const createdProperty = await sqliteStorage.createProperty(newProperty);
    console.log('Created property:', JSON.stringify(createdProperty, null, 2));

    // Test 3: Get property by ID
    console.log('\n--- Testing getProperty() ---');
    const fetchedProperty = await sqliteStorage.getProperty(createdProperty.id);
    console.log('Fetched property:', JSON.stringify(fetchedProperty, null, 2));

    // Test 4: Create a contact
    console.log('\n--- Testing createContact() ---');
    const newContact = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      message: 'This is a test message',
      propertyInterest: createdProperty.id
    };
    const createdContact = await sqliteStorage.createContact(newContact);
    console.log('Created contact:', JSON.stringify(createdContact, null, 2));

    // Test 5: Create a partnership
    console.log('\n--- Testing createPartnership() ---');
    const newPartnership = {
      companyName: 'Test Company',
      contactName: 'Test Partner',
      email: 'partner@example.com',
      phone: '0987654321',
      message: 'Interested in partnership'
    };
    const createdPartnership = await sqliteStorage.createPartnership(newPartnership);
    console.log('Created partnership:', JSON.stringify(createdPartnership, null, 2));

    console.log('\n--- All tests completed successfully! ---');
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  } finally {
    // Close the database connection
    await sqliteStorage.close();
    process.exit(0);
  }
}

runTests();
