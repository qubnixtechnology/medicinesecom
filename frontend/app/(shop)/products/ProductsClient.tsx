'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/product/ProductGrid';
import { Product } from '@/types';
import { api } from '@/lib/api';

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [maxPrice, setMaxPrice] = useState(1500);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.products.getAll();
        const data = await response.json();
        
        if (data.success && data.data.products) {
          const adaptedProducts = data.data.products.map((p: any) => {
            let productImages: string[] = [];
            if (p.images) {
              try {
                let parsedImages = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
                if (Array.isArray(parsedImages)) {
                  productImages = parsedImages.map((img: string) => {
                    if (img.startsWith('http')) return img;
                    if (img.startsWith('/')) return `${img}`;
                    return `/${img}`;
                  });
                }
              } catch(e) {
                productImages = [];
              }
            }
            
            if (!productImages.length) {
              productImages = ['/images/placeholder.jpg'];
            }

            return {
              id: Number(p.id),
              name: p.name,
              slug: p.slug,
              category: p.category || '',
              categorySlug: p.category_slug || '',
              brand: p.brand || 'Glance Healthcare',
              price: Number(p.price),
              originalPrice: undefined,
              discount: undefined,
              description: p.description || '',
              benefits: [],
              images: productImages,
              rating: 4.5,
              reviews: 10,
              inStock: p.stock > 0,
              isPrescriptionRequired: p.is_prescription_required === 1,
              volume: p.volume || '',
            };
          });
          
          setAllProducts(adaptedProducts);
          setProducts(adaptedProducts);
          
          const prices = adaptedProducts.map((p: { price: any; }) => p.price);
          const max = Math.max(...prices, 1500);
          setMaxPrice(max);
          setPriceRange([0, max]);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await api.categories.getAll();
        const data = await response.json();
        if (data.success) {
          const categoriesWithCount = data.data.map((cat: any) => {
            const count = allProducts.filter(p => p.categorySlug === cat.slug).length;
            return { ...cat, product_count: count };
          });
          setCategories(categoriesWithCount);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    }
    
    if (allProducts.length > 0) {
      fetchCategories();
    } else {
      async function fetchBasicCategories() {
        try {
          const response = await api.categories.getAll();
          const data = await response.json();
          if (data.success) {
            setCategories(data.data);
          }
        } catch (err) {
          console.error('Error fetching categories:', err);
        }
      }
      fetchBasicCategories();
    }
  }, [allProducts]);

  useEffect(() => {
    let filtered = [...allProducts];
    
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.categorySlug === selectedCategory);
    }
    
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    setProducts(filtered);
  }, [searchQuery, selectedCategory, priceRange, allProducts]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-8 text-center">Loading products...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-64 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`block w-full text-left px-3 py-2 rounded ${
                  selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Products ({allProducts.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    selectedCategory === cat.slug ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat.name} ({cat.product_count || allProducts.filter(p => p.categorySlug === cat.slug).length})
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-1/2 px-2 py-1 border rounded text-sm"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-1/2 px-2 py-1 border rounded text-sm"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found in this range.</p>
            </div>
          ) : (
            <>
              <p className="text-gray-500 mb-4">Showing {products.length} products</p>
              <ProductGrid products={products} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
