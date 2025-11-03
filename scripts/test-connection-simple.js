import { MongoClient } from 'mongodb';

async function testConnection() {
  const uri = "mongodb+srv://shadyosama658_db_user:KnKSJRihtnfJkYXT@cluster0.9r3tc5s.mongodb.net/test?retryWrites=true&w=majority";
  
  console.log('Attempting to connect to MongoDB...');
  
  try {
    const client = new MongoClient(uri, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
    });
    
    await client.connect();
    console.log('Successfully connected to MongoDB!');
    
    const db = client.db('test');
    const collections = await db.listCollections().toArray();
    console.log('Collections in test database:', collections.map(c => c.name));
    
    await client.close();
    console.log('Connection closed');
    
  } catch (error) {
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      codeName: error.codeName,
      errorResponse: error.errorResponse,
      stack: error.stack
    });
    
    if (error.name === 'MongoServerSelectionError') {
      console.log('\nTroubleshooting tips:');
      console.log('1. Check your internet connection');
      console.log('2. Verify your IP is whitelisted in MongoDB Atlas');
      console.log('3. Try using a different network (e.g., mobile hotspot)');
      console.log('4. Check if your firewall is blocking the connection');
    }
  }
}

testConnection();
