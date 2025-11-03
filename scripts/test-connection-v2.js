import { MongoClient } from 'mongodb';
import dns from 'dns';

// Test DNS resolution first
const testHost = 'cluster0.9r3tc5s.mongodb.net';
console.log(`Testing DNS resolution for: ${testHost}`);

dns.lookup(testHost, async (err, address, family) => {
  if (err) {
    console.error('DNS lookup failed:', err);
    return;
  }
  
  console.log(`DNS resolved: ${testHost} -> ${address} (IPv${family})`);
  
  // Try to connect
  const uri = `mongodb+srv://shadyosama658_db_user:KnKSJRihtnfJkYXT@${testHost}/test?retryWrites=true&w=majority`;
  
  console.log('\nAttempting to connect to MongoDB...');
  console.log('Connection string:', `mongodb+srv://shadyosama658_db_user:*****@${testHost}/test?retryWrites=true&w=majority`);
  
  const client = new MongoClient(uri, {
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 20000,
    maxPoolSize: 1,
    retryWrites: true,
    w: 'majority',
    ssl: true,
    sslValidate: true
  });

  try {
    console.log('\nInitiating connection...');
    await client.connect();
    console.log('✅ Successfully connected to MongoDB!');
    
    // Test the connection
    const adminDb = client.db().admin();
    const serverStatus = await adminDb.serverStatus();
    console.log('\nServer status:', {
      host: serverStatus.host,
      version: serverStatus.version,
      process: serverStatus.process,
      connections: serverStatus.connections
    });
    
    // List databases
    const dbs = await adminDb.listDatabases();
    console.log('\nAvailable databases:');
    dbs.databases.forEach(db => console.log(`- ${db.name}`));
    
  } catch (error) {
    console.error('\n❌ Connection failed:', {
      name: error.name,
      message: error.message,
      code: error.code,
      codeName: error.codeName,
      errorLabels: error.errorLabels,
      stack: error.stack
    });
    
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Check if your IP (105.192.50.88) is whitelisted in MongoDB Atlas');
    console.log('2. Try using MongoDB Compass with the same connection string');
    console.log('3. Test with a different network (e.g., mobile hotspot)');
    console.log('4. Check your firewall/antivirus settings');
    console.log('5. Try using a VPN');
    
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 Connection closed');
    }
    
    // Additional diagnostic info
    console.log('\n🌐 Network information:');
    console.log('- Node.js version:', process.version);
    console.log('- Platform:', process.platform);
    console.log('- Architecture:', process.arch);
    console.log('- Current time:', new Date().toISOString());
  }
});
