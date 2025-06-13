"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const menuData = [
  {
    food_name: "Spaghetti or Macaroni (meat)",
    price: 16.99,
    ingredients: ["Zara meat tomato sauce", "Italian bread rolls"],
    related_image: "/images/menu/pasta-meat.jpeg"
  },
  {
    food_name: "Spaghetti or Macaroni",
    price: 13.99,
    ingredients: ["Zara tomato sauce", "Italian bread rolls"],
    related_image: "/images/menu/pasta.jpg"
  },
  {
    food_name: "Kikil",
    price: 16.99,
    ingredients: ["Eggs", "Veggies"],
    related_image: "/images/menu/kikil.jpeg"
  },
  {
    food_name: "Zilzil Shekla",
    price: 19.99,
    ingredients: [
      "Onion",
      "Tomatoes",
      "Jalapenos",
      "Garlic",
      "Clarified butter",
      "Mild, hot, and non-spicy stew"
    ],
    related_image: "/images/menu/zilzil.jpg"
  },
  {
    food_name: "Hamli Siga",
    price: 18.99,
    ingredients: ["Greens", "Potato", "Beef", "Red chili pepper", "Garlic"],
    related_image: "/images/menu/hamli-siga.jpg"
  },
  {
    food_name: "Bamya Dinish",
    price: 15.99,
    ingredients: ["Potato", "Onion", "Red chili pepper", "Garlic"],
    related_image: "/images/menu/bamya.jpg"
  },
  {
    food_name: "Hamli Dinish",
    price: 15.99,
    ingredients: ["Potato", "Onion", "Red chili pepper", "Garlic"],
    related_image: "/images/menu/hamli-dinish.jpg"
  },
  {
    food_name: "Fritata Sega",
    price: 15.99,
    ingredients: [
      "Beef stew",
      "Shredded injera or French bread",
      "Yogurt on the side"
    ],
    related_image: "/images/menu/fritata-sega.jpg"
  },
  {
    food_name: "Fritata Dinish",
    price: 14.99,
    ingredients: ["Greens", "Potato", "Onion", "Red chili pepper", "Garlic"],
    related_image: "/images/menu/fritata-dinish.jpg"
  },
  {
    food_name: "Kikil",
    price: 16.99,
    ingredients: ["Eggs", "Veggies"],
    related_image: "/images/menu/kikil.jpg"
  },
  {
    food_name: "Zilzil Shekla",
    price: 19.99,
    ingredients: [
      "Onion",
      "Tomatoes",
      "Jalapenos",
      "Garlic",
      "Clarified butter",
      "Mild, hot, and non-spicy stew"
    ],
    related_image: "/images/menu/zilzil-shekla.jpg"
  },
  {
    food_name: "Hamli Siga",
    price: 18.99,
    ingredients: ["Greens", "Potato", "Beef", "Red chili pepper", "Garlic"],
    related_image: "/images/menu/hamli-siga.jpg"
  },
  {
    food_name: "Bamya Dinish",
    price: 15.99,
    ingredients: ["Potato", "Onion", "Red chili pepper", "Garlic"],
    related_image: "/images/menu/bamya-dinish.jpg"
  },
  {
    food_name: "Hamli Dinish",
    price: 15.99,
    ingredients: ["Greens", "Potato", "Onion", "Red chili pepper", "Garlic"],
    related_image: "/images/menu/hamli-dinish.jpg"
  },
  {
    food_name: "Fritata Sega",
    price: 15.99,
    ingredients: [
      "Beef stew",
      "Shredded injera or French bread",
      "Yogurt on the side"
    ],
    related_image: "/images/menu/fritata-sega.jpg"
  },
  {
    food_name: "Fritata Dinish",
    price: 14.99,
    ingredients: ["Greens", "Potato", "Onion", "Red chili pepper", "Garlic"],
    related_image: "/images/menu/fritata-dinish.jpg"
  },
  {
    food_name: "Bozena Shiro",
    price: 16.99,
    ingredients: ["Prime beef simmered with shiro", "Spicy pureed yellow split peas", "Chickpeas"],
    related_image: "/images/menu/bozena-shiro.jpg"
  },
  {
    food_name: "Gored Gored",
    price: 19.99,
    ingredients: ["Chunked beef", "Diced onion", "Jalapenos", "Garlic", "Clarified butter", "Served with injera"],
    related_image: "/images/menu/gored-gored.jpg"
  },
  {
    food_name: "Quanta Firfir",
    price: 17.99,
    ingredients: ["Dried beef (beef jerky)", "Cooked with onion", "Jalapenos", "Shredded injera", "Boiled eggs"],
    related_image: "/images/menu/quanta-firfir.jpg"
  },
  {
    food_name: "Shiro",
    price: 16.99,
    ingredients: ["Pressed split peas", "Chickpea", "Onions", "Tomatoes", "Garlic", "Sliced jalapenos", "Served with injera"],
    related_image: "/images/menu/shiro.jpg"
  },
  {
    food_name: "Goden Tibs",
    price: 20.99,
    ingredients: ["Prime most beef ribs", "Cooked with veggies"],
    related_image: "/images/menu/goden-tibs.jpg"
  },
  {
    food_name: "Quanta Dinish",
    price: 18.99,
    ingredients: ["Diced cubed beef (beef jerky)", "Cooked with onion", "Jalapenos", "Garlic", "Boiled eggs", "Potato", "Served with injera"],
    related_image: "/images/menu/quanta-dinish.jpg"
  },
  {
    food_name: "Mahberawi",
    price: 20.00,
    ingredients: ["A combination of awaze beef tibs", "Medium spicy split lentils", "Yellow split peas", "Cabbage", "Collard greens", "Salad"],
    related_image: "/images/menu/mahberawi.jpg"
  },
  {
    food_name: "Lega Tibs",
    price: 18.99,
    ingredients: ["Zara tomato sauce", "Served with Italian bread rolls"],
    related_image: "/images/menu/lega-tibs.jpg"
  },
  {
    food_name: "Bamya Dinish Siga",
    price: 17.99,
    ingredients: ["Okra", "Potato", "Meat", "Onion", "Red chili pepper", "Served with injera"],
    related_image: "/images/menu/bamya-dinish-siga.jpg"
  },
  {
    food_name: "Tibs",
    price: 16.99,
    ingredients: ["Onion", "Tomatoes", "Jalapenos", "Garlic", "Clarified butter", "Mild, hot, and non-spicy stew"],
    related_image: "/images/menu/tibs.jpg"
  },
  {
    food_name: "Banatu",
    price: 19.99,
    ingredients: ["Spicy beef stew firfir", "Kitfo", "Cottage cheese"],
    related_image: "/images/menu/banatu.jpg"
  },
  {
    food_name: "Fish Dullet",
    price: 17.99,
    ingredients: ["Minced tilapia", "Tomatoes", "Onion"],
    related_image: "/images/menu/fish-dullet.jpg"
  },
  {
    food_name: "Veggie Combination",
    price: 18.99,
    ingredients: ["Split lentils", "Yellow split peas", "Cabbage", "Potatoes", "Shiro", "Collard greens", "Salad"],
    related_image: "/images/menu/veggie-combination.jpg"
  },
  {
    food_name: "Dinish Siga",
    price: 17.99,
    ingredients: ["Beef", "Onions", "Tomatoes", "Jalapenos", "Garlic", "Potatoes", "Clarified butter", "Spicy or non-spicy"],
    related_image: "/images/menu/dinish-siga.jpg"
  },
  {
    food_name: "Derek Tibs",
    price: 17.99,
    ingredients: ["Beef", "Onions", "Jalapenos", "Garlic"],
    related_image: "/images/menu/derek-tibs.jpg"
  },
  {
    food_name: "Kitfo",
    price: 19.99,
    ingredients: ["Ground beef", "Clarified butter", "Served rare, medium, or well done"],
    related_image: "/images/menu/kitfo.jpg"
  },
  {
    food_name: "Asmara Salad",
    price: 14.99,
    ingredients: ["Romain lettuce", "Tomatoes", "Jalapenos", "Onions", "Eggs", "Peppers", "Dressing"],
    related_image: "/images/menu/asmara-salad.jpg"
  },
  {
    food_name: "House Salad",
    price: 11.99,
    ingredients: ["Romain lettuce", "Tomatoes", "Onions", "Jalapenos", "Dressing", "Italian bread"],
    related_image: "/images/menu/house-salad.jpg"
  },
  {
    food_name: "Fritate",
    price: 13.99,
    ingredients: ["Scrambled eggs", "Plain or grilled veggies", "Italian bread"],
    related_image: "/images/menu/fritate.jpg"
  },
  {
    food_name: "Kitcha Fitfit (Quanta)",
    price: 16.99,
    ingredients: ["Eritrean traditional bread", "Clarified butter", "Hot spicy chili peppers (Berbere)", "Cup of yogurt"],
    related_image: "/images/menu/kitcha-fitfit.jpg"
  },
  {
    food_name: "Fuul",
    price: 13.99,
    ingredients: ["Mashed faba beans", "Onions", "Tomatoes", "Green peppers", "Shredded boiled eggs", "Feta cheese", "Olive oil", "Cumin", "Italian bread rolls"],
    related_image: "/images/menu/fuul.jpg"
  },
  {
    food_name: "Fata",
    price: 13.99,
    ingredients: ["Hot spicy stew", "Italian bread", "Cup of yogurt"],
    related_image: "/images/menu/fata.jpg"
  },
  {
    food_name: "Injera Firfir",
    price: 14.99,
    ingredients: ["Spicy vegetarian stew", "Shredded injera"],
    related_image: "/images/menu/injera-firfir.jpg"
  },
  {
    food_name: "Egg Sandwich",
    price: 12.99,
    ingredients: ["Grilled eggs", "Veggies"],
    related_image: "/images/menu/egg-sandwich.jpg"
  },
  {
    food_name: "Steak Sandwich",
    price: 13.99,
    ingredients: ["Grilled steak", "Onions", "Tomatoes", "Swiss cheese", "Lettuce", "Ranch dressing"],
    related_image: "/images/menu/steak-sandwich.jpg"
  },
  {
    food_name: "Chicken Sandwich",
    price: 10.99,
    ingredients: ["Grilled chicken", "Onions", "Tomatoes", "Swiss cheese", "Lettuce", "Ranch dressing"],
    related_image: "/images/menu/chicken-sandwich.jpg"
  },
  {
    food_name: "Fish Sandwich",
    price: 13.99,
    ingredients: ["Grilled fish", "Onions", "Tomatoes", "Swiss cheese", "Lettuce", "Ranch dressing"],
    related_image: "/images/menu/fish-sandwich.jpg"
  }

];

export default function MenuPage() {

  const [brokenImages, setBrokenImages] = useState({});

  
  const onImageError = (idx) => {
    setBrokenImages((prev) => ({ ...prev, [idx]: true }));
  };

  return (
    <section className="py-20 px-4 bg-[#e8e0d5] min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-[#452614] text-center mb-12">
        Our Menu
      </h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
       {menuData.map((item, index) => {
        const src = brokenImages[index]
        ? "/images/menu/default.jpg"
        : item.related_image;

  return (
    <motion.div
      key={index}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
    >
      <div className="h-48 overflow-hidden">
        <img
           src={src} 
          alt={item.food_name}
          className="w-full h-full object-cover"
          onError={() => onImageError(index)}
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-[#452614] mb-2">
          {item.food_name}
        </h3>
        <p className="text-gray-600 flex-1 mb-4">
          {item.ingredients.join(", ")}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#b5633e]">
            ${item.price.toFixed(2)}
          </span>
          <Link
            href="https://www.ubereats.com"
            target="_blank"
            className="px-4 py-2 bg-[#b5633e] hover:bg-[#b8805a] text-white rounded-lg transition"
          >
            Order
          </Link>
        </div>
      </div>
    </motion.div>
  );
})}

      </motion.div>
    </section>
  );
}

