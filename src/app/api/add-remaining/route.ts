import { NextResponse } from 'next/server';
import { createMenuItem } from '../../../../lib/db/schema';

export async function GET() {
  try {
    console.log('🔧 Adding remaining menu items...');
    
    const remainingItems = [
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
    
    const createdItems = [];
    for (const item of remainingItems) {
      const createdItem = await createMenuItem(item);
      createdItems.push(createdItem);
      console.log(`✅ Added: ${createdItem.food_name}`);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Remaining menu items added',
      items: createdItems
    });
    
  } catch (error) {
    console.error('❌ Error adding remaining items:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 