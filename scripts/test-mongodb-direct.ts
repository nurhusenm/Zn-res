import 'dotenv/config';
import { MongoClient } from 'mongodb';

async function testDirectConnection() {
  try {
    console.log('Testing direct MongoDB connection...');
    
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI not found in environment variables');
    }
    
    console.log('Connection URI:', uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
    
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    });
    
    console.log('Attempting to connect...');
    await client.connect();
    console.log('✅ Connected successfully!');
    
    const db = client.db('zara-restuarant');
    console.log('✅ Database accessed successfully');
    
    // Test collections
    const collections = await db.listCollections().toArray();
    console.log('📋 Available collections:', collections.map(c => c.name));
    
    await client.close();
    console.log('✅ Connection closed successfully');
    
  } catch (error) {
    console.error('❌ Connection failed:', error);
    process.exit(1);
  }
}

testDirectConnection(); 