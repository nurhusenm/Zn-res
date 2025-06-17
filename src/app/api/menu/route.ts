// src/app/api/menu/route.ts
import { NextResponse } from 'next/server';
import {
  getMenuItems,
  createMenuItem,
} from '../../../../lib/db/schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth/options';

export async function GET() {
  try {
    const items = await getMenuItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 });
  }
}

export async function POST() {
  try {
    // Add a test menu item
    const testItem = await createMenuItem({
      food_name: "Test Pasta",
      price: 15.99,
      ingredients: "Test ingredients",
      related_image: "/images/menu/test.jpg"
    });
    
    return NextResponse.json({
      success: true,
      message: 'Test item added',
      item: testItem
    });
  } catch (error) {
    console.error('Error adding test item:', error);
    return NextResponse.json({ error: 'Failed to add test item' }, { status: 500 });
  }
}
