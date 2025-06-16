// app/layout.js (or layout.tsx if you're using TypeScript)

// app/layout.tsx or app/layout.js

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar.js";
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import Providers from './providers';
import { Toaster } from 'react-hot-toast';
import ClientBody from "../../components/ClientBody";

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata = {
  title: 'Zara-Restuarant',
  description: 'At Zara Restaurant, we blend tradition with innovation to create a dining experience like no other. Discover our story.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <ClientBody>
        <Providers session={session}>
          <Navbar />
          {children}
          <Footer />
          <Toaster position="top-right" />
        </Providers>
      </ClientBody>
    </html>
  );
}
