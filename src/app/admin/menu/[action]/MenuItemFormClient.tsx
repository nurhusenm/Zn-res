'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Upload, 
  X,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getMenuItem, createMenuItem, updateMenuItem } from '@/lib/db/schema';

interface MenuItem {
  id: number;
  food_name: string;
  price: number;
  ingredients: string;
  related_image: string;
}

interface MenuItemFormClientProps {
  params: {
    action: string;
  };
}

export default function MenuItemFormClient({ params }: MenuItemFormClientProps) {
  const router = useRouter();
  const isEditing = params.action !== 'new';
  const itemId = isEditing ? parseInt(params.action) : null;

  const [formData, setFormData] = useState<Partial<MenuItem>>({
    food_name: '',
    price: 0,
    ingredients: '',
    related_image: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing && itemId) {
      fetchMenuItem();
    }
  }, [isEditing, itemId]);

  const fetchMenuItem = async () => {
    setIsLoading(true);
    try {
      const item = await getMenuItem(itemId!) as MenuItem;
      if (item) {
        setFormData(item);
        setImagePreview(item.related_image);
      }
    } catch (error) {
      console.error('Error fetching menu item:', error);
      setError('Failed to load menu item');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    try {
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // In a real application, you would upload the file to a storage service
      // For now, we'll just use the file name as the image path
      setFormData(prev => ({
        ...prev,
        related_image: `/images/menu/${file.name}`
      }));
    } catch (error) {
      console.error('Error handling image:', error);
      setError('Failed to process image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isEditing && itemId) {
        await updateMenuItem(itemId, formData);
      } else {
        await createMenuItem(formData as Required<MenuItem>);
      }
      router.push('/admin/menu');
    } catch (error) {
      console.error('Error saving menu item:', error);
      setError('Failed to save menu item');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#b5633e] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/menu"
          className="flex items-center space-x-2 text-[#452614] hover:text-[#b5633e] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Menu</span>
        </Link>
        <h1 className="text-2xl font-semibold text-[#452614]">
          {isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}
        </h1>
      </div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6 space-y-6"
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#452614]">
            Item Image
          </label>
          <div className="flex items-center space-x-4">
            <div className="relative w-32 h-32">
              {imagePreview ? (
                <>
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData(prev => ({ ...prev, related_image: '' }));
                    }}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-[#b8805a] rounded-md cursor-pointer hover:border-[#b5633e] transition-colors">
                  <Upload className="w-8 h-8 text-[#b8805a] mb-2" />
                  <span className="text-sm text-[#452614]">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="food_name" className="block text-sm font-medium text-[#452614] mb-1">
            Item Name
          </label>
          <input
            type="text"
            id="food_name"
            value={formData.food_name}
            onChange={(e) => setFormData(prev => ({ ...prev, food_name: e.target.value }))}
            className="w-full px-4 py-2 border border-[#b8805a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b5633e] focus:border-transparent"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-[#452614] mb-1">
            Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#452614]">
              $
            </span>
            <input
              type="number"
              id="price"
              value={formData.price || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
              className="w-full pl-8 pr-4 py-2 border border-[#b8805a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b5633e] focus:border-transparent"
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-[#452614] mb-1">
            Ingredients
          </label>
          <textarea
            id="ingredients"
            value={formData.ingredients}
            onChange={(e) => setFormData(prev => ({ ...prev, ingredients: e.target.value }))}
            className="w-full px-4 py-2 border border-[#b8805a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b5633e] focus:border-transparent h-32 resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors
            ${isSubmitting 
              ? 'bg-[#b8805a] cursor-not-allowed' 
              : 'bg-[#b5633e] hover:bg-[#5e3521]'
            }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Saving...
            </div>
          ) : (
            isEditing ? 'Update Item' : 'Add Item'
          )}
        </button>
      </motion.form>
    </div>
  );
} 