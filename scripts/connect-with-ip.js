import { MongoClient } from 'mongodb';

// Using direct IP addresses we resolved
const uri = "mongodb://shadyosama658_db_user:KnKSJRihtnfJkYXT@159.41.66.226:27017,159.41.65.207:27017,159.41.66.31:27017/skyline_residences?replicaSet=atlas-9r3tc5s-shard-0&authSource=admin&retryWrites=true&w=majority";

async function connect() {
  console.log('Attempting to connect to MongoDB with direct IPs...');
  
  const client = new MongoClient(uri, {
    connectTimeoutMS: 10000,
    socketTimeoutMS: 20000,
    serverSelectionTimeoutMS: 5000,
    ssl: true,
    sslValidate: true,
    directConnection: false,
    retryWrites: true,
    retryReads: true,
    maxPoolSize: 1
  });

  try {
    console.log('Connecting...');
    await client.connect();
    
    // Test the connection
    console.log('✅ Connected! Pinging the server...');
    await client.db().command({ ping: 1 });
    console.log('✅ Pinged your deployment. You successfully connected to MongoDB!');
    
    // List databases
    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();
    console.log('\n📂 Available databases:');
    dbs.databases.forEach(db => console.log(`- ${db.name}`));
    
    return true;
  } catch (error) {
    console.error('❌ Connection failed:', {
      name: error.name,
      message: error.message,
      code: error.code,
      codeName: error.codeName
    });
    
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Your IP (105.192.50.88) needs to be whitelisted in MongoDB Atlas');
    console.log('2. Go to MongoDB Atlas → Network Access → Add IP Address');
    console.log('3. Add "105.192.50.88" to the whitelist');
    console.log('4. For testing, you can temporarily allow all IPs (0.0.0.0/0)');
    
    return false;
  } finally {
    await client.close();
    console.log('\n🔌 Connection closed');
  }
}

// Run the connection test
connect().then(success => {
  console.log(success ? '\n🎉 Success! Your MongoDB connection is working!' : '\n❌ Connection failed. Please check the troubleshooting steps above.');
});
