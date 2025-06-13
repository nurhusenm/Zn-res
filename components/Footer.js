// src/components/Footer.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="bg-[#e8e0d5] text-[#452614] py-12 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Zara Restaurant</h3>
          <p className="text-sm">
            Welcome to Zara, where culinary artistry meets unforgettable
            experiences. Join us for a taste of excellence.
          </p>
          <div className="flex space-x-4">
            {/* Add social media icons or links */}
            <a href="#" className="hover:text-[#b5633e] transition-colors">
              <span><FaFacebookF /></span> 
            </a>
            <a href="#" className="hover:text-[#b5633e] transition-colors">
              <span><FaInstagram /></span>
            </a>
            <a href="#" className="hover:text-[#b5633e] transition-colors">
              <span><FaTwitter /></span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-[#b5633e] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#b5633e] transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-[#b5633e] transition-colors">
                Menu
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-[#b5633e] transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Contact Us</h3>
          <p className="text-sm">123 Flavor Street, Food City</p>
          <p className="text-sm">Phone: +251 911 123 456</p>
          <p className="text-sm">Email: info@zararestaurant.com</p>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="mt-8 text-center border-t border-[#5e3521]/20 pt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Zara Restaurant. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;