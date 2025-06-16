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
  },
  {
    food_name: "Hamli Dinish",
    price: 15.99,
    ingredients: "Potato, Onion, Red chili pepper, Garlic",
    related_image: "/images/menu/hamli-dinish.jpg"
  },
  {
    food_name: "Fritata Sega",
    price: 15.99,
    ingredients: "Beef stew, Shredded injera or French bread, Yogurt on the side",
    related_image: "/images/menu/fritata-sega.jpg"
  },
  {
    food_name: "Fritata Dinish",
    price: 14.99,
    ingredients: "Greens, Potato, Onion, Red chili pepper, Garlic",
    related_image: "/images/menu/fritata-dinish.jpg"
  },
  {
    food_name: "Bozena Shiro",
    price: 16.99,
    ingredients: "Prime beef simmered with shiro, Spicy pureed yellow split peas, Chickpeas",
    related_image: "/images/menu/bozena-shiro.jpg"
  },
  {
    food_name: "Gored Gored",
    price: 19.99,
    ingredients: "Chunked beef, Diced onion, Jalapenos, Garlic, Clarified butter, Served with injera",
    related_image: "/images/menu/gored-gored.jpg"
  },
  {
    food_name: "Quanta Firfir",
    price: 17.99,
    ingredients: "Dried beef (beef jerky), Cooked with onion, Jalapenos, Shredded injera, Boiled eggs",
    related_image: "/images/menu/quanta-firfir.jpg"
  },
  {
    food_name: "Shiro",
    price: 16.99,
    ingredients: "Pressed split peas, Chickpea, Onions, Tomatoes, Garlic, Sliced jalapenos, Served with injera",
    related_image: "/images/menu/shiro.jpg"
  },
  {
    food_name: "Goden Tibs",
    price: 20.99,
    ingredients: "Prime most beef ribs, Cooked with veggies",
    related_image: "/images/menu/goden-tibs.jpg"
  },
  {
    food_name: "Quanta Dinish",
    price: 18.99,
    ingredients: "Diced cubed beef (beef jerky), Cooked with onion, Jalapenos, Garlic, Boiled eggs, Potato, Served with injera",
    related_image: "/images/menu/quanta-dinish.jpg"
  },
  {
    food_name: "Mahberawi",
    price: 20.00,
    ingredients: "A combination of awaze beef tibs, Medium spicy split lentils, Yellow split peas, Cabbage, Collard greens, Salad",
    related_image: "/images/menu/mahberawi.jpg"
  },
  {
    food_name: "Lega Tibs",
    price: 18.99,
    ingredients: "Zara tomato sauce, Served with Italian bread rolls",
    related_image: "/images/menu/lega-tibs.jpg"
  },
  {
    food_name: "Bamya Dinish Siga",
    price: 17.99,
    ingredients: "Okra, Potato, Meat, Onion, Red chili pepper, Served with injera",
    related_image: "/images/menu/bamya-dinish-siga.jpg"
  },
  {
    food_name: "Tibs",
    price: 16.99,
    ingredients: "Onion, Tomatoes, Jalapenos, Garlic, Clarified butter, Mild, hot, and non-spicy stew",
    related_image: "/images/menu/tibs.jpg"
  },
  {
    food_name: "Banatu",
    price: 19.99,
    ingredients: "Spicy beef stew firfir, Kitfo, Cottage cheese",
    related_image: "/images/menu/banatu.jpg"
  },
  {
    food_name: "Fish Dullet",
    price: 17.99,
    ingredients: "Minced tilapia, Tomatoes, Onion",
    related_image: "/images/menu/fish-dullet.jpg"
  },
  {
    food_name: "Veggie Combination",
    price: 18.99,
    ingredients: "Split lentils, Yellow split peas, Cabbage, Potatoes, Shiro, Collard greens, Salad",
    related_image: "/images/menu/veggie-combination.jpg"
  },
  {
    food_name: "Dinish Siga",
    price: 17.99,
    ingredients: "Beef, Onions, Tomatoes, Jalapenos, Garlic, Potatoes, Clarified butter, Spicy or non-spicy",
    related_image: "/images/menu/dinish-siga.jpg"
  },
  {
    food_name: "Derek Tibs",
    price: 17.99,
    ingredients: "Beef, Onions, Jalapenos, Garlic",
    related_image: "/images/menu/derek-tibs.jpg"
  },
  {
    food_name: "Kitfo",
    price: 19.99,
    ingredients: "Ground beef, Clarified butter, Served rare, medium, or well done",
    related_image: "/images/menu/kitfo.jpg"
  },
  {
    food_name: "Asmara Salad",
    price: 14.99,
    ingredients: "Romain lettuce, Tomatoes, Jalapenos, Onions, Eggs, Peppers, Dressing",
    related_image: "/images/menu/asmara-salad.jpg"
  },
  {
    food_name: "House Salad",
    price: 11.99,
    ingredients: "Romain lettuce, Tomatoes, Onions, Jalapenos, Dressing, Italian bread",
    related_image: "/images/menu/house-salad.jpg"
  },
  {
    food_name: "Fritate",
    price: 13.99,
    ingredients: "Scrambled eggs, Plain or grilled veggies, Italian bread",
    related_image: "/images/menu/fritate.jpg"
  },
  {
    food_name: "Kitcha Fitfit (Quanta)",
    price: 16.99,
    ingredients: "Eritrean traditional bread, Clarified butter, Hot spicy chili peppers (Berbere), Cup of yogurt",
    related_image: "/images/menu/kitcha-fitfit.jpg"
  },
  {
    food_name: "Fuul",
    price: 13.99,
    ingredients: "Mashed faba beans, Onions, Tomatoes, Green peppers, Shredded boiled eggs, Feta cheese, Olive oil, Cumin, Italian bread rolls",
    related_image: "/images/menu/fuul.jpg"
  }
];

async function initializeMenu() {
  try {
    for (const item of menuItems) {
      await createMenuItem(item);
    }
    console.log('Menu items initialized successfully!');
  } catch (error) {
    console.error('Error initializing menu items:', error);
    process.exit(1);
  }
}

initializeMenu(); 