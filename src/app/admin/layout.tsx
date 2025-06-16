'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  Utensils, 
  Settings, 
  LogOut,
  ChevronDown
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/auth/login');
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/admin/dashboard' },
    // { icon: Utensils, label: 'Menu Management', href: '/admin/menu' },
  ];

  return (
    <div className="min-h-screen bg-[#e8e0d5]">
      {/* Add a spacer div instead of mt-20 */}
      <div className="h-[90px]" /> {/* This matches the navbar height */}
      
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-[90px] left-1 z-50 p-2 rounded-md bg-[#452614] text-white lg:hidden"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-0 left-0 h-full w-64 bg-[#452614] text-white p-4 lg:translate-x-0"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Zara Admin</h1>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 p-3 rounded-md hover:bg-[#5e3521] transition-colors"
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`lg:ml-64 min-h-screen transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-[#452614]">
              Admin Dashboard
            </h2>

            {/* Profile & Logout */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-[#452614] hover:text-[#b5633e] transition-colors"
                >
                  <span>{session?.user?.name}</span>
                  <ChevronDown size={20} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    >
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-[#452614] hover:bg-[#e8e0d5] transition-colors"
                      >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Direct Logout Button */}
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-3 py-2 bg-[#b5633e] text-white rounded hover:bg-[#5e3521] transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 