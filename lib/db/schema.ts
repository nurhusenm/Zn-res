'use server';

import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

// Initialize SQLite database only on the server side
let db: Database.Database | null = null;

if (typeof window === 'undefined') {
  db = new Database('sqlite.db');

  // Create tables if they don't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      food_name TEXT NOT NULL,
      price REAL NOT NULL,
      ingredients TEXT NOT NULL,
      related_image TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// Menu items
export async function getMenuItems() {
  if (!db) throw new Error('Database not initialized');
  return db.prepare('SELECT * FROM menu_items ORDER BY created_at DESC').all();
}

export async function getMenuItem(id: number) {
  if (!db) throw new Error('Database not initialized');
  return db.prepare('SELECT * FROM menu_items WHERE id = ?').get(id);
}

export async function createMenuItem(item: {
  food_name: string;
  price: number;
  ingredients: string;
  related_image: string;
}) {
  if (!db) throw new Error('Database not initialized');
  const stmt = db.prepare(`
    INSERT INTO menu_items (food_name, price, ingredients, related_image)
    VALUES (?, ?, ?, ?)
  `);
  return stmt.run(item.food_name, item.price, item.ingredients, item.related_image);
}

export async function updateMenuItem(id: number, item: {
  food_name?: string;
  price?: number;
  ingredients?: string;
  related_image?: string;
}) {
  if (!db) throw new Error('Database not initialized');
  const updates = Object.entries(item)
    .filter(([_, value]) => value !== undefined)
    .map(([key]) => `${key} = ?`)
    .join(', ');
  
  if (!updates) return null;
  
  const stmt = db.prepare(`
    UPDATE menu_items 
    SET ${updates}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);
  
  return stmt.run(...Object.values(item).filter(v => v !== undefined), id);
}

export async function deleteMenuItem(id: number) {
  if (!db) throw new Error('Database not initialized');
  return db.prepare('DELETE FROM menu_items WHERE id = ?').run(id);
}

// Users
export async function createUser(user: {
  email: string;
  password: string;
  name: string;
  role?: 'admin' | 'user';
}) {
  if (!db) throw new Error('Database not initialized');
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const stmt = db.prepare(`
    INSERT INTO users (email, password, name, role)
    VALUES (?, ?, ?, ?)
  `);
  return stmt.run(user.email, hashedPassword, user.name, user.role || 'user');
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  if (!db) throw new Error('Database not initialized');
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined;
}

export async function verifyPassword(email: string, password: string): Promise<User | null> {
  if (!db) throw new Error('Database not initialized');
  console.log('Verifying password for email:', email);
  
  const user = await getUserByEmail(email);
  console.log('User found in database:', user ? 'Yes' : 'No');
  
  if (!user) return null;
  
  const isValid = await bcrypt.compare(password, user.password);
  console.log('Password valid:', isValid);
  
  return isValid ? user : null;
} 