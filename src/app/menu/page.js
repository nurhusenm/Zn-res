"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from '../../../components/Navbar'

const menuData = [
  {
    food_name: "Spaghetti or Macaroni (meat)",
    price: 16.99,
    ingredients: ["Zara meat tomato sauce", "Italian bread rolls"],
    related_image: "/images/menu/pasta-meat.jpg"
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
  }
];

export default function MenuPage() {
  return (
    <section className="py-20 px-4 bg-[#e8e0d5] min-h-screen">
      <Navbar />
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
          src={item.related_image}
          alt={item.food_name}
          className="w-full h-full object-cover"
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
