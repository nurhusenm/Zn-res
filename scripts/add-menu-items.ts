import 'dotenv/config';
import { createMenuItem } from '../lib/db/schema.js';

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

async function addMenuItems() {
  try {
    console.log('🍽️ Adding menu items to database...');
    
    for (const item of menuItems) {
      await createMenuItem(item);
      console.log(`✅ Added: ${item.food_name}`);
    }
    
    console.log('🎉 All menu items added successfully!');
    
  } catch (error) {
    console.error('❌ Error adding menu items:', error);
    process.exit(1);
  }
}

addMenuItems(); 