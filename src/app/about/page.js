// app/about/page.js
"use client";

import Button from "../../../components/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const milestones = [
    { year: 2015, event: "Founded with a passion for authentic flavors" },
    { year: 2018, event: "Introduced signature dishes loved by all" },
    { year: 2023, event: "Expanded to a second location" },
    { year: 2025, event: "Celebrating 10 years of culinary excellence" }, // Timely nod to 2025
  ];

  const values = [
    { title: "Quality", description: "Sourcing the finest ingredients daily" },
    { title: "Innovation", description: "Blending tradition with modern twists" },
    { title: "Hospitality", description: "Warmth in every guest experience" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/buna.jpg" 
              alt="Zara Restaurant Ambiance"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#5e3521]/60 to-transparent" />
          </div>
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold drop-shadow-lg">
              Our Journey of Flavors
            </h1>
            <p className="mt-4 text-lg lg:text-xl max-w-2xl">
              Discover the story behind Zara Restaurant, crafted with passion
              since 2015.
            </p>
          </motion.div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-[#e8e0d5]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#452614] text-center mb-12">
              Our Milestones
            </h2>
            <div className="relative">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className="flex items-center mb-12 last:mb-0"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-1/4 text-right pr-8">
                    <span className="text-2xl font-semibold text-[#b8805a]">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="w-1 h-16 bg-[#b5633e] mx-4" />
                  <div className="w-3/4 pl-8 border-l-2 border-[#5e3521]/20">
                    <p className="text-lg text-[#452614]">
                      {milestone.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-[#e8e0d5]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#452614] mb-12">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="p-6 bg-[#e8e0d5]/80 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ scale: 1.05, backgroundColor: "#e8e0d5" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold text-[#b5633e] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-[#452614]/80">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-b from-[#e8e0d5] to-[#b5633e]/20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#452614] mb-6">
              Ready to Experience Zara?
            </h2>
            {/* <Button
              href="/menu"
              className="bg-[#b5633e] hover:bg-[#b8805a] text-white px-8 py-3 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Our Menu
            </Button> */}

            
<motion.div whileHover={{ scale: 1.05 }}>
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
          </motion.div>
          </div>
        </section>
      </main>
      
    </div>
  );
}