

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { Trash2, ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import { Product } from '@/types';

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    // Optional: Remove from wishlist after adding to cart
    // removeItem(product.id);
  };
  
  const handleRemove = (id: number | string) => {
    removeItem(id);
  };
  
  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Heart size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-600 mb-6">Save your favorite items here!</p>
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Wishlist ({items.length})</h1>
        <button
          onClick={() => clearWishlist()}
          className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
        >
          <Trash2 size={16} />
          Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group relative border">
            {/* Product Image */}
            <Link href={`/products/${product.slug}`}>
              <div className="relative h-48 bg-gray-100">
                <img
                  src={product.images?.[0] || '/images/placeholder.jpg'}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                  }}
                />
                {product.isPrescriptionRequired && (
                  <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    Rx
                  </span>
                )}
              </div>
            </Link>
            
            {/* Remove Button */}
            <button
              onClick={() => handleRemove(product.id)}
              className="absolute top-2 left-2 bg-white rounded-full p-1.5 shadow-md hover:bg-red-50 transition group-hover:opacity-100 opacity-70"
              title="Remove from wishlist"
            >
              <Trash2 size={16} className="text-red-500" />
            </button>
            
            {/* Product Info */}
            <div className="p-4">
              <Link href={`/products/${product.slug}`}>
                <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition line-clamp-2 min-h-[48px]">
                  {product.name}
                </h3>
              </Link>
              
              {product.volume && (
                <p className="text-xs text-gray-500 mt-1">{product.volume}</p>
              )}
              
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">
                  ₹{typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                </span>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition flex items-center gap-1 text-sm"
                >
                  <ShoppingCart size={14} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}