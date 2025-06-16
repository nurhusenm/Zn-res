import { createUser } from '../lib/db/schema.js';

async function initializeDatabase() {
  try {
    // Create admin user
    const adminEmail = 'admin@zara.com';
    const adminPassword = 'admin123'; // Change this in production!

    await createUser({
      email: adminEmail,
      password: adminPassword, // Pass the plain password, let createUser handle hashing
      name: 'Admin',
      role: 'admin'
    });

    console.log('Database initialized successfully!');
    console.log('Admin credentials:');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase(); 