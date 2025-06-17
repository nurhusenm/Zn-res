import 'dotenv/config';
import clientPromise from '../lib/mongodb.js';

async function testMongoDBConnection() {
  try {
    console.log('Testing MongoDB connection...');
    
    const client = await clientPromise;
    console.log('✅ MongoDB client connected successfully');
    
    const db = client.db('zara-restuarant');
    console.log('✅ Database accessed successfully');
    
    // Test collections
    const collections = await db.listCollections().toArray();
    console.log('📋 Available collections:', collections.map(c => c.name));
    
    // Test menu_items collection
    const menuItems = db.collection('menu_items');
    const count = await menuItems.countDocuments();
    console.log(`📊 Menu items count: ${count}`);
    
    // Test users collection
    const users = db.collection('users');
    const userCount = await users.countDocuments();
    console.log(`👥 Users count: ${userCount}`);
    
    console.log('✅ All tests passed! MongoDB is working correctly.');
    
  } catch (error) {
    console.error('❌ MongoDB connection test failed:', error);
    process.exit(1);
  }
}

testMongoDBConnection(); 