// src/components/AboutUsSection.jsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const AboutUsSection = () => {
  return (
    <section className="py-16 bg-[#e8e0d5]">
      <div className="container mx-auto text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl lg:text-4xl font-bold text-[#452614] mb-4"
        >
          About Us
        </motion.h2>
        <p className="text-lg text-[#452614]/80 mb-6 max-w-2xl mx-auto">
          At Zara Restaurant, we blend tradition with innovation to create a
          dining experience like no other. Discover our story.
        </p>
        <Link
          href="/about"
          className="text-[#b5633e] hover:text-[#b8805a] font-medium transition-colors"
        >
          Learn More
        </Link>

       
        
      </div>
    </section>
  );
};

export default AboutUsSection;