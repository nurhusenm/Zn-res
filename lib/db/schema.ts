// lib/db/schema.ts
'use server';

import clientPromise from '../mongodb';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { MenuItem, MenuItemInput } from '../../types/menu';

interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  created_at: Date;
  updated_at: Date;
}

const dbName = 'zara-restuarant';

export async function getMenuItems(): Promise<MenuItem[]> {
  const client = await clientPromise;
  const coll = client.db(dbName).collection('menu_items');
  const items = await coll.find().sort({ created_at: -1 }).toArray();
  return items as unknown as MenuItem[];
}

export async function getMenuItem(id: string): Promise<MenuItem | null> {
  const client = await clientPromise;
  const coll = client.db(dbName).collection('menu_items');
  const item = await coll.findOne({ _id: new ObjectId(id) });
  return item as unknown as MenuItem | null;
}

export async function createMenuItem(item: MenuItemInput): Promise<MenuItem> {
  const client = await clientPromise;
  const coll = client.db(dbName).collection('menu_items');
  const now = new Date();
  const res = await coll.insertOne({ ...item, created_at: now, updated_at: now });
  return { _id: res.insertedId.toString(), ...item, created_at: now, updated_at: now };
}

export async function updateMenuItem(id: string, updates: Partial<MenuItemInput>): Promise<MenuItem | null> {
  const client = await clientPromise;
  const coll = client.db(dbName).collection('menu_items');
  const now = new Date();
  const res = await coll.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...updates, updated_at: now } },
    { returnDocument: 'after' }
  );
  return res?.value as unknown as MenuItem | null;
}

export async function deleteMenuItem(id: string): Promise<{ success: boolean }> {
  const client = await clientPromise;
  const coll = client.db(dbName).collection('menu_items');
  await coll.deleteOne({ _id: new ObjectId(id) });
  return { success: true };
}

// -- USERS --

export async function createUser(user: {
  email: string;
  password: string;
  name: string;
  role?: 'admin' | 'user';
}): Promise<User> {
  const client = await clientPromise;
  const coll = client.db(dbName).collection('users');
  const hashed = await bcrypt.hash(user.password, 10);
  const now = new Date();
  const role = user.role || 'user';
  const res = await coll.insertOne({
    email: user.email,
    password: hashed,
    name: user.name,
    role,
    created_at: now,
    updated_at: now,
  });
  return { _id: res.insertedId.toString(), email: user.email, password: hashed, name: user.name, role, created_at: now, updated_at: now };
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const client = await clientPromise;
  const coll = client.db(dbName).collection('users');
  const user = await coll.findOne({ email });
  return user as unknown as User | null;
}

export async function verifyPassword(email: string, password: string): Promise<User | null> {
  const user = await getUserByEmail(email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password);
  return ok ? user : null;
}
