import { NextResponse } from 'next/server';
import { createUser, createMenuItem } from '../../../../lib/db/schema';

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
  },
  {
    food_name: "Zilzil Shekla",
    price: 19.99,
    ingredients: "Onion, Tomatoes, Jalapenos, Garlic, Clarified butter, Mild, hot, and non-spicy stew",
    related_image: "/images/menu/zilzil.jpg"
  },
  {
    food_name: "Hamli Siga",
    price: 18.99,
    ingredients: "Greens, Potato, Beef, Red chili pepper, Garlic",
    related_image: "/images/menu/hamli-siga.jpg"
  },
  {
    food_name: "Bamya Dinish",
    price: 15.99,
    ingredients: "Potato, Onion, Red chili pepper, Garlic",
    related_image: "/images/menu/bamya.jpg"
  }
];

export async function POST() {
  try {
    console.log('🔧 Setting up database...');
    
    // Create admin user
    const adminUser = await createUser({
      email: 'admin@zara.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin'
    });
    
    console.log('✅ Admin user created:', adminUser.email);
    
    // Add menu items
    const createdItems = [];
    for (const item of menuItems) {
      const createdItem = await createMenuItem(item);
      createdItems.push(createdItem);
      console.log(`✅ Added menu item: ${createdItem.food_name}`);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Database setup completed',
      adminUser: {
        email: adminUser.email,
        name: adminUser.name,
        role: adminUser.role
      },
      menuItemsCount: createdItems.length,
      menuItems: createdItems.map(item => ({
        id: item._id,
        name: item.food_name,
        price: item.price
      }))
    });
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 