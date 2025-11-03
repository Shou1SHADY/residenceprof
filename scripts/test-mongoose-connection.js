import mongoose from 'mongoose';

// Connection URI with direct IPs and SSL disabled for testing
const uri = "mongodb://shadyosama658_db_user:KnKSJRihtnfJkYXT@ac-cstbbvm-shard-00-00.9r3tc5s.mongodb.net:27017,ac-cstbbvm-shard-00-01.9r3tc5s.mongodb.net:27017,ac-cstbbvm-shard-00-02.9r3tc5s.mongodb.net:27017/skyline_residences?replicaSet=atlas-9r3tc5s-shard-0&authSource=admin&retryWrites=true&w=majority";

async function testConnection() {
  console.log('🚀 Testing MongoDB connection with Mongoose...');
  
  // Set mongoose options
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    ssl: false, // Try without SSL first
    sslValidate: false,
    directConnection: false
  };

  try {
    console.log('🔄 Attempting to connect...');
    
    // Set up event listeners
    mongoose.connection.on('connecting', () => {
      console.log('🔌 Connecting to MongoDB...');
    });
    
    mongoose.connection.on('connected', () => {
      console.log('✅ Successfully connected to MongoDB!');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });
    
    // Attempt to connect
    await mongoose.connect(uri, options);
    
    // If we get here, connection was successful
    console.log('\n📊 Connection successful! Database info:');
    const adminDb = mongoose.connection.db.admin();
    const dbInfo = await adminDb.serverInfo();
    console.log('- MongoDB Version:', dbInfo.version);
    
    // List databases
    const dbs = await adminDb.listDatabases();
    console.log('\n📂 Available databases:');
    dbs.databases.forEach(db => console.log(`- ${db.name}`));
    
    return true;
    
  } catch (error) {
    console.error('\n❌ Connection failed:', error.message);
    
    // Provide specific troubleshooting based on error
    if (error.message.includes('bad auth')) {
      console.log('\n🔑 Authentication failed. Please check:');
      console.log('1. Your username and password in the connection string');
      console.log('2. That the database user has the correct permissions');
    } else if (error.message.includes('timed out')) {
      console.log('\n⏱️  Connection timed out. Please check:');
      console.log('1. Your network connection');
      console.log('2. That your IP is whitelisted in MongoDB Atlas');
      console.log('3. Try using a different network (e.g., mobile hotspot)');
    }
    
    return false;
  } finally {
    // Close the connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('\n🔌 Disconnected from MongoDB');
    }
  }
}

// Run the test
testConnection().then(success => {
  console.log('\n' + (success ? '🎉 Success! Your MongoDB connection is working!' : '❌ Connection failed. Please check the error messages above.'));
  process.exit(success ? 0 : 1);
});
