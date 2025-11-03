import { MongoClient } from 'mongodb';

// Connection URI from MongoDB Atlas
const uri = 'mongodb+srv://shadyosama658_db_user:KnKSJRihtnfJkYXT@cluster0.9r3tc5s.mongodb.net/skyline_residences?retryWrites=true&w=majority&appName=Cluster0';

async function testConnection() {
  const client = new MongoClient(uri);
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Successfully connected to MongoDB Atlas!');
    
    // List all databases
    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();
    console.log('Available databases:');
    dbs.databases.forEach(db => console.log(`- ${db.name}`));
    
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

testConnection().catch(console.error);
