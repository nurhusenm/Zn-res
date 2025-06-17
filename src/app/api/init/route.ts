import { NextResponse } from 'next/server';
import { createUser, createMenuItem } from '../../../../lib/db/schema';

export async function GET() {
  try {
    // Create admin user
    const adminUser = await createUser({
      email: 'admin@zara.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin'
    });

    // Create menu items
    const menuItems = [
      {
        food_name: "Spaghetti or Macaroni (meat)",
        price: 16.99,
        ingredients: "Zara meat tomato sauce, Italian bread rolls",
        related_image: "/images/menu/pasta-meat.jpeg"
      },
      {
        food_name: "Spaghetti or Macaroni",
        price: 13.99,
        ingredients: "Zara tomato sauce, Italian bread rolls",
        related_image: "/images/menu/pasta.jpg"
      },
      {
        food_name: "Kikil",
        price: 16.99,
        ingredients: "Eggs, Veggies",
        related_image: "/images/menu/kikil.jpeg"
      }
    ];

    const createdItems = [];
    for (const item of menuItems) {
      const createdItem = await createMenuItem(item);
      createdItems.push(createdItem);
    }

    return NextResponse.json({
      success: true,
      adminUser: {
        email: adminUser.email,
        password: 'admin123'
      },
      menuItems: createdItems.length
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 