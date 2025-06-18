'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { 
  Utensils, 
  Plus, 
  Edit, 
  Trash2, 
  TrendingUp,
  DollarSign,
  Clock,
  Upload
} from 'lucide-react';
import Link from 'next/link';
import { getMenuItems, deleteMenuItem } from '../../../../lib/db/schema';
import { MenuItem } from '../../../../types/menu';
import Image from 'next/image';
import ClientBody from "../../../components/ClientBody";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    food_name: '',
    price: 0,
    ingredients: '',
    related_image: ''
  });
  const [stats, setStats] = useState({
    totalItems: 0,
    averagePrice: 0,
    newestItem: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setIsLoading(true);
      const items = await getMenuItems();
      setMenuItems(items);

      // Calculate statistics
      const totalItems = items.length;
      const averagePrice = items.reduce((acc: number, item: MenuItem) => acc + item.price, 0) / totalItems;
      const newestItem = items[0]?.food_name || 'No items';

      setStats({
        totalItems,
        averagePrice,
        newestItem,
      });
    } catch (error) {
      toast.error('Failed to load menu items');
      console.error('Error fetching menu items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      toast.loading('Deleting menu item...');
      
      const response = await fetch(`/api/menu/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete item');
      }
      
      toast.dismiss();
      toast.success('Menu item deleted successfully');
      fetchMenuItems();
    } catch (error) {
      toast.dismiss();
      toast.error(error instanceof Error ? error.message : 'Failed to delete menu item');
      console.error('Error deleting menu item:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEditing: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      toast.loading('Uploading image...');
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      const imageUrl = data.url;

      if (isEditing && editingItem) {
        setEditingItem({ ...editingItem, related_image: imageUrl });
      } else {
        setNewItem({ ...newItem, related_image: imageUrl });
      }
      
      toast.dismiss();
      toast.success('Image uploaded successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error(error instanceof Error ? error.message : 'Failed to upload image');
      console.error('Error uploading image:', error);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      toast.loading('Updating menu item...');
      
      const response = await fetch(`/api/menu/${editingItem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          food_name: editingItem.food_name,
          price: editingItem.price,
          ingredients: editingItem.ingredients,
          related_image: editingItem.related_image
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update item');
      }
      
      toast.dismiss();
      toast.success('Menu item updated successfully');
      setIsEditing(false);
      setEditingItem(null);
      fetchMenuItems();
    } catch (error) {
      toast.dismiss();
      toast.error(error instanceof Error ? error.message : 'Failed to update menu item');
      console.error('Error updating menu item:', error);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      toast.loading('Adding menu item...');
      
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add item');
      }
      
      toast.dismiss();
      toast.success('Menu item added successfully');
      setIsAdding(false);
      setNewItem({
        food_name: '',
        price: 0,
        ingredients: '',
        related_image: ''
      });
      fetchMenuItems();
    } catch (error) {
      toast.dismiss();
      toast.error(error instanceof Error ? error.message : 'Failed to add menu item');
      console.error('Error adding menu item:', error);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-[#e8e0d5] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#b5633e] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8e0d5] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#452614]">Menu Management</h1>
          <button
            onClick={() => setIsAdding(true)} 
            className="bg-[#b5633e] text-white px-4 py-2 rounded-md hover:bg-[#5e3521] transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Item
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#e8e0d5] rounded-full">
                <Utensils className="w-6 h-6 text-[#452614]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Menu Items</p>
                <p className="text-2xl font-semibold text-[#452614]">{stats.totalItems}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#e8e0d5] rounded-full">
                <DollarSign className="w-6 h-6 text-[#452614]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Price</p>
                <p className="text-2xl font-semibold text-[#452614]">
                  ${stats.averagePrice.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#e8e0d5] rounded-full">
                <Clock className="w-6 h-6 text-[#452614]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Latest Addition</p>
                <p className="text-lg font-semibold text-[#452614] truncate">
                  {stats.newestItem}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Menu Items Grid */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative z-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#452614]">Menu Items</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {menuItems.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md overflow-hidden relative z-0"
              >
                <div className="relative aspect-[4/3] w-full bg-gray-100">
                  <Image
                    src={item.related_image}
                    alt={item.food_name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-[#452614] mb-2 truncate">
                    {item.food_name}
                  </h3>
                  <p className="text-[#b5633e] font-medium mb-2">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.ingredients}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 bg-[#b8805a] text-white px-3 py-1 rounded hover:bg-[#5e3521] transition-colors flex items-center justify-center gap-1"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Edit Modal */}
        <AnimatePresence>
          {isEditing && editingItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col"
              >
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-[#452614]">Edit Menu Item</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  <form id="edit-form" onSubmit={handleSaveEdit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#452614] mb-1">
                        Food Name
                      </label>
                      <input
                        type="text"
                        value={editingItem.food_name}
                        onChange={(e) => setEditingItem({ ...editingItem, food_name: e.target.value })}
                        className="w-full px-3 py-2 border border-[#b8805a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b5633e] bg-white text-[#452614] placeholder-gray-400"
                        required
                        placeholder="Enter food name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#452614] mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={editingItem.price}
                        onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                        className="w-full px-3 py-2 border border-[#b8805a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b5633e] bg-white text-[#452614] placeholder-gray-400"
                        required
                        placeholder="Enter price"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#452614] mb-1">
                        Ingredients
                      </label>
                      <textarea
                        value={editingItem.ingredients}
                        onChange={(e) => setEditingItem({ ...editingItem, ingredients: e.target.value })}
                        className="w-full px-3 py-2 border border-[#b8805a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b5633e] bg-white text-[#452614] placeholder-gray-400 min-h-[100px]"
                        required
                        placeholder="Enter ingredients (one per line)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#452614] mb-1">
                        Image
                      </label>
                      <div className="space-y-2">
                        <div className="relative w-full h-48 border-2 border-dashed border-[#b8805a] rounded-lg overflow-hidden bg-gray-50">
                          {editingItem?.related_image ? (
                            <Image
                              src={editingItem.related_image}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Upload className="w-8 h-8 text-[#b8805a]" />
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, true)}
                            className="hidden"
                            id="edit-image-upload"
                          />
                          <label
                            htmlFor="edit-image-upload"
                            className="flex-1 px-4 py-2 bg-[#e8e0d5] text-[#452614] rounded-md text-center cursor-pointer hover:bg-[#b8805a] hover:text-white transition-colors flex items-center justify-center gap-2"
                          >
                            <Upload className="w-4 h-4" />
                            Upload Image
                          </label>
                          <input
                            type="text"
                            value={editingItem?.related_image || ''}
                            onChange={(e) => setEditingItem({ ...editingItem!, related_image: e.target.value })}
                            placeholder="Or enter image URL"
                            className="flex-1 px-3 py-2 border border-[#b8805a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b5633e] bg-white text-[#452614] placeholder-gray-400"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      form="edit-form"
                      className="px-4 py-2 bg-[#b5633e] text-white rounded-md hover:bg-[#5e3521] transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Modal */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col"
              >
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-[#452614]">Add New Menu Item</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  <form onSubmit={handleAddItem} id="add-form" className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#452614] mb-1">
                        Food Name
                      </label>
                      <input
                        type="text"
                        value={newItem.food_name}
                        onChange={(e) => setNewItem({ ...newItem, food_name: e.target.value })}
                        className="w-full px-3 py-2 border border-[#b8805a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b5633e] bg-white text-[#452614] placeholder-gray-400"
                        required
                        placeholder="Enter food name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#452614] mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                        className="w-full px-3 py-2 border border-[#b8805a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b5633e] bg-white text-[#452614] placeholder-gray-400"
                        required
                        placeholder="Enter price"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#452614] mb-1">
                        Ingredients
                      </label>
                      <textarea
                        value={newItem.ingredients}
                        onChange={(e) => setNewItem({ ...newItem, ingredients: e.target.value })}
                        className="w-full px-3 py-2 border border-[#b8805a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b5633e] bg-white text-[#452614] placeholder-gray-400 min-h-[100px]"
                        required
                        placeholder="Enter ingredients (one per line)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#452614] mb-1">
                        Image
                      </label>
                      <div className="space-y-2">
                        <div className="relative w-full h-48 border-2 border-dashed border-[#b8805a] rounded-lg overflow-hidden bg-gray-50">
                          {newItem.related_image ? (
                            <Image
                              src={newItem.related_image}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Upload className="w-8 h-8 text-[#b8805a]" />
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e)}
                            className="hidden"
                            id="new-image-upload"
                          />
                          <label
                            htmlFor="new-image-upload"
                            className="flex-1 px-4 py-2 bg-[#e8e0d5] text-[#452614] rounded-md text-center cursor-pointer hover:bg-[#b8805a] hover:text-white transition-colors flex items-center justify-center gap-2"
                          >
                            <Upload className="w-4 h-4" />
                            Upload Image
                          </label>
                          <input
                            type="text"
                            value={newItem.related_image}
                            onChange={(e) => setNewItem({ ...newItem, related_image: e.target.value })}
                            placeholder="Or enter image URL"
                            className="flex-1 px-3 py-2 border border-[#b8805a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b5633e] bg-white text-[#452614] placeholder-gray-400"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      form="add-form"
                      className="px-4 py-2 bg-[#b5633e] text-white rounded-md hover:bg-[#5e3521] transition-colors"
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 