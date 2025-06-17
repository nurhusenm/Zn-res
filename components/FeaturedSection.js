// src/components/FeaturedSection.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
// import  {Button}  from "./ui/customBtn";

const FeaturedSection = () => {
  return (
    <section className="py-16 bg-[#e8e0d5] overflow-hidden">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-4">
        {/* Image Section */}
        <motion.div
          className="relative w-full lg:w-1/2 h-64 lg:h-96 overflow-hidden rounded-lg"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/buna.jpg" 
            alt="Featured Dish"
            width={500}
            height={400}
            className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#5e3521]/40 to-transparent" />
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="w-full lg:w-1/2 lg:pl-12 mt-8 lg:mt-0"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-[#452614] mb-4">
            Signature Dishes
          </h2>
          <p className="text-lg text-[#452614]/80 mb-6 leading-relaxed">
            Indulge in our expertly crafted dishes, prepared with the freshest
            ingredients to elevate your dining experience. Let Zara bring
            flavors to your table that linger in memory.
          </p>
         

<motion.div whileHover={{ scale: 1.05 }}>
  <Link href="/menu">
            <button
              onClick={() => scrollToSection("menu")}
              className="relative px-6 py-3 rounded-lg 
                         bg-gradient-to-r from-[#b5633e] to-[#b8805a] overflow-hidden group"
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r 
                                from-transparent via-white/20 to-transparent shimmer" />
              </div>
              <span className="relative z-10 text-white font-semibold">
                Explore Menu
              </span>
            </button>
  </Link>

          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSection;