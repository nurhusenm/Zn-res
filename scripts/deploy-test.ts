import 'dotenv/config';
import { MongoClient } from 'mongodb';

async function testDeploymentConnection() {
  try {
    console.log('🔍 Testing MongoDB connection for deployment...');
    
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('❌ MONGODB_URI environment variable not found');
    }
    
    console.log('✅ MONGODB_URI found');
    console.log('🔗 Connection string format:', uri.includes('mongodb+srv://') ? 'Valid Atlas URI' : 'Invalid URI');
    
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000,
    });
    
    console.log('🔄 Attempting to connect to MongoDB Atlas...');
    await client.connect();
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    const db = client.db('zara-restuarant');
    console.log('✅ Database "zara-restuarant" accessed successfully');
    
    // Test collections
    const collections = await db.listCollections().toArray();
    console.log('📋 Available collections:', collections.map(c => c.name));
    
    // Test menu_items collection
    const menuItems = db.collection('menu_items');
    const menuCount = await menuItems.countDocuments();
    console.log(`🍽️  Menu items count: ${menuCount}`);
    
    // Test users collection
    const users = db.collection('users');
    const userCount = await users.countDocuments();
    console.log(`👥 Users count: ${userCount}`);
    
    await client.close();
    console.log('✅ Connection closed successfully');
    console.log('🎉 All tests passed! Ready for deployment.');
    
  } catch (error) {
    console.error('❌ Deployment test failed:', error);
    console.log('💡 Troubleshooting tips:');
    console.log('   1. Check if MongoDB Atlas cluster is running');
    console.log('   2. Verify connection string is correct');
    console.log('   3. Ensure IP is whitelisted in Atlas Network Access');
    console.log('   4. Check if username/password are correct');
    process.exit(1);
  }
}

testDeploymentConnection(); 