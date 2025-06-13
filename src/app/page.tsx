import Image from "next/image";

import Head from "next/head";
import Navbar from "../../components/Navbar";
import { Hero } from "../../components/Hero";
import Footer  from '../../components/Footer'
import FeaturedSection  from '../../components/FeaturedSection'
import AboutUsSection  from '../../components/AboutUsSection'



export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
    <Head>
      <title>Zara - Home</title>
      <meta
        name="description"
        content="Welcome to Zara-restaurant, where we serve delicious meals made with fresh ingredients."
      />
      <meta name="keywords" content="restaurant, food, dining" />
    </Head>

    <Navbar />

    <main className="flex-grow">
      
      <Hero/>
      <FeaturedSection />
      <AboutUsSection />
      <Footer />
      
    </main>
  </div>
  );
}
