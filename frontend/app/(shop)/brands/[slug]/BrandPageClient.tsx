'use client';

import { useState, useEffect } from 'react';
import ProductGrid from '@/components/product/ProductGrid';
import { Product } from '@/types';
import { api } from '@/lib/api';

export default function BrandPageClient({ slug }: { slug: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [brandName, setBrandName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.products.getAll();
        const data = await response.json();
        
        if (data.success && data.data.products) {
          const allAdapted = data.data.products.map((p: any) => {
            let productImages: string[] = [];
            if (p.images) {
              try {
                productImages = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
              } catch(e) {
                productImages = [];
              }
            }
            
            if (!productImages.length) {
              productImages = [`https://placehold.co/400x400/2563eb/white?text=${encodeURIComponent(p.name.substring(0, 15))}`];
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
          
          const brandProducts = allAdapted.filter((p: Product) => {
            const brandSlug = p.brand.toLowerCase().replace(/\s+/g, '-');
            return brandSlug === slug;
          });
          
          if (brandProducts.length > 0) {
            setBrandName(brandProducts[0].brand);
          }
          
          setProducts(brandProducts);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{brandName || slug.replace(/-/g, ' ')}</h1>
        <p className="text-gray-600 mt-2">
          {products.length} products found
        </p>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found for this brand.</p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
