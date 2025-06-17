import 'dotenv/config';
import { createUser } from '../lib/db/schema.js';

async function createAdminUser() {
  try {
    console.log('🔧 Creating admin user...');
    
    // Create admin user with simple password
    const adminUser = await createUser({
      email: 'admin@zara.com',
      password: 'admin123', // Simple password for testing
      name: 'Admin User',
      role: 'admin'
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', adminUser.email);
    console.log('🔑 Password: admin123');
    console.log('👤 Name:', adminUser.name);
    console.log('🔐 Role:', adminUser.role);
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser(); 