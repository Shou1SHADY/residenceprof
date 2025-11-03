import { MongoClient } from 'mongodb';

// Using the direct connection string with IP addresses from SRV records
const uri = "mongodb://shadyosama658_db_user:KnKSJRihtnfJkYXT@ac-cstbbvm-shard-00-00.9r3tc5s.mongodb.net:27017,ac-cstbbvm-shard-00-01.9r3tc5s.mongodb.net:27017,ac-cstbbvm-shard-00-02.9r3tc5s.mongodb.net:27017/skyline_residences?ssl=true&replicaSet=atlas-9r3tc5s-shard-0&authSource=admin&retryWrites=true&w=majority";

async function connect() {
  console.log('Attempting to connect to MongoDB with direct connection...');
  
  const client = new MongoClient(uri, {
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 5000,
  });

  try {
    await client.connect();
    console.log('Successfully connected to MongoDB!');
    
    // List all databases
    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();
    console.log('\nAvailable databases:');
    dbs.databases.forEach(db => console.log(`- ${db.name}`));
    
    return true;
  } catch (error) {
    console.error('Connection failed:', {
      name: error.name,
      message: error.message,
      code: error.code,
      codeName: error.codeName,
      errorResponse: error.errorResponse,
      stack: error.stack
    });
    return false;
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

// Run the test
connect().then(success => {
  if (!success) {
    console.log('\nTroubleshooting tips:');
    console.log('1. Check if your IP is whitelisted in MongoDB Atlas');
    console.log('2. Try using MongoDB Compass to test the connection');
    console.log('3. Check your firewall settings');
    console.log('4. Try using a different network');
  }
});
