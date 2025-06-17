"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import { MenuItem } from '../../../types/menu';

const DEFAULT_IMAGE = '/images/default-food.jpg';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menu');
        if (!response.ok) throw new Error('Failed to fetch menu items');
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        toast.error('Failed to load menu items');
        console.error('Error fetching menu items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleImageError = (itemId: string) => {
    setImageErrors(prev => ({ ...prev, [itemId]: true }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#e8e0d5] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#b5633e] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-20 px-4 bg-[#e8e0d5] min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-[#452614] text-center mb-12">
        Our Menu
      </h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
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
        {menuItems.map((item, index) => (
          <motion.div
            key={item._id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            <div className="h-48 overflow-hidden relative">
              {!imageErrors[item._id] ? (
                <Image
                  src={item.related_image}
                  alt={item.food_name}
                  fill
                  className="object-cover"
                  onError={() => handleImageError(item._id)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 6}
                />
              ) : (
                <Image
                  src={DEFAULT_IMAGE}
                  alt={`${item.food_name} (default image)`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold text-[#452614] mb-2">
                {item.food_name}
              </h3>
              <p className="text-gray-600 flex-1 mb-4">
                {item.ingredients}
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
        ))}
      </motion.div>
    </section>
  );
}