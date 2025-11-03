import { MongoClient } from 'mongodb';

// Using direct IP addresses with correct options
const uri = "mongodb://shadyosama658_db_user:KnKSJRihtnfJkYXT@159.41.66.226:27017,159.41.65.207:27017,159.41.66.31:27017/skyline_residences?replicaSet=atlas-9r3tc5s-shard-0&authSource=admin&retryWrites=true&w=majority";

async function connect() {
  console.log('🔍 Testing MongoDB connection...');
  
  const client = new MongoClient(uri, {
    connectTimeoutMS: 10000,
    socketTimeoutMS: 20000,
    serverSelectionTimeoutMS: 10000,
    ssl: true,
    tlsAllowInvalidCertificates: true, // Only for testing
    directConnection: false,
    retryWrites: true,
    retryReads: true
  });

  try {
    console.log('🔄 Connecting to MongoDB...');
    await client.connect();
    
    // Test the connection
    console.log('✅ Connected! Pinging the server...');
    await client.db().command({ ping: 1 });
    console.log('✅ Successfully pinged MongoDB!');
    
    // List databases
    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();
    console.log('\n📂 Available databases:');
    dbs.databases.forEach(db => console.log(`- ${db.name}`));
    
    return true;
  } catch (error) {
    console.error('\n❌ Connection failed:', error.message);
    
    if (error.message.includes('Authentication failed')) {
      console.log('\n🔑 Authentication failed. Please check:');
      console.log('1. Your username and password in the connection string');
      console.log('2. That the database user has the correct permissions');
    } else if (error.message.includes('timed out')) {
      console.log('\n⏱️  Connection timed out. Please check:');
      console.log('1. Your IP (105.192.50.88) is whitelisted in MongoDB Atlas');
      console.log('2. Your network is not blocking the connection');
      console.log('3. Try using a different network (e.g., mobile hotspot)');
    }
    
    return false;
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 Connection closed');
    }
  }
}

// Run the test
console.log('🚀 Starting MongoDB connection test...');
connect().then(success => {
  if (success) {
    console.log('\n🎉 Success! Your MongoDB connection is working correctly!');
    console.log('You can now proceed with running your application.');
  } else {
    console.log('\n❌ Connection failed. Please check the error messages above.');
    console.log('\nNext steps:');
    console.log('1. Go to MongoDB Atlas → Network Access');
    console.log('2. Add your IP (105.192.50.88) to the whitelist');
    console.log('3. For testing, you can temporarily allow all IPs (0.0.0.0/0)');
    console.log('4. Try using MongoDB Compass to test the connection');
  }
});
