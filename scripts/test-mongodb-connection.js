import { MongoClient, ServerApiVersion } from 'mongodb';

// Your connection string with the password
const uri = "mongodb+srv://shadyosama658_db_user:KnKSJRihtnfJkYXT@cluster0.9r3tc5s.mongodb.net/?appName=Cluster0";

// Create a new MongoClient with the specified options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  // Add these options to help with connection issues
  connectTimeoutMS: 10000, // 10 seconds
  socketTimeoutMS: 45000, // 45 seconds
  maxPoolSize: 10,
  retryWrites: true,
  w: 'majority'
});

async function run() {
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Successfully connected to MongoDB Atlas!');
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    // List all databases
    const adminDb = client.db().admin();
    const dbs = await adminDb.listDatabases();
    console.log("\nAvailable databases:");
    dbs.databases.forEach(db => console.log(`- ${db.name}`));
    
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    // Close the connection when done
    await client.close();
    console.log("\nConnection closed");
  }
}

// Run the test
run().catch(console.dir);
