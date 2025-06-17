"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/customBtn";
import { useState, useEffect } from "react";
import Link from "next/link";

export function Hero() {
  const videos = ["/videos/video.mp4", "/videos/video4.mp4", "/videos/video3.mp4"];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentVideoIndex((i) => (i + 1) % videos.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const text = "Welcome to Zara - restaurant";
  const zaraWord = "Zara";
  const letters = text.split("");

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* video bg */}
      <div className="absolute inset-0">
        <video
          key={currentVideoIndex}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
        </video>
      </div>

      {/* overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[rgba(74,44,31,0.6)] px-4"
      >
        {/* Responsive heading */}
        <h1 className="font-bold text-white text-center leading-tight
                       text-3xl sm:text-4xl md:text-5xl lg:text-[5.5rem]">
          {letters.map((ltr, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={
                text.slice(i, i + zaraWord.length) === zaraWord
                  ? "text-[#e8e0d5] italic"
                  : ""
              }
            >
              {ltr}
            </motion.span>
          ))}
        </h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-4 max-w-xl text-center text-white 
                     text-base sm:text-lg md:text-xl font-light leading-relaxed"
        >
          Where culinary artistry meets unforgettable experiences
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-6 flex flex-row  gap-4"
        >
          <Link href="/about">
          <Button
            onClick={() => scrollToSection("about-us")}
            size="lg"
            className="bg-[#e8e0d5] hover:bg-[#faf9f7] text-[#452614] 
                       px-8 py-3 text-base sm:text-lg font-medium rounded-lg shadow-md"
          >
            Our Story
          </Button>
          </Link>


          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/menu" >
            <button
              // onClick={() => scrollToSection("menu")}
              className="relative px-6 py-3 rounded-lg 
                         bg-gradient-to-r from-[#b5633e] to-[#b8805a] overflow-hidden group"
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r 
                                from-transparent via-white/20 to-transparent shimmer" />
              </div>
              <span className="relative z-10 text-white font-semibold">
                View Menu
              </span>
            </button>
            </Link>

          </motion.div>

        </motion.div>
      </motion.div>

      {/* Scroll down arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={() => scrollToSection("menu")}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[#D48C70] hover:text-[#A6744A]"
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>
    </section>
  );
}
