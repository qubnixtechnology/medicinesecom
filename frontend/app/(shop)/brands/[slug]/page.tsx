// import { products, brands } from '@/lib/products';
// import ProductGrid from '@/components/product/ProductGrid';
// import { notFound } from 'next/navigation';

// export async function generateStaticParams() {
//   return brands.map((brand) => ({
//     slug: brand.slug,
//   }));
// }

// export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = await params;
  
//   const brand = brands.find(b => b.slug === slug);
//   const brandProducts = products.filter(p => 
//     p.brand.toLowerCase().replace(/\s+/g, '-') === slug
//   );
  
//   if (!brand) {
//     notFound();
//   }
  
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">{brand.name}</h1>
//         <p className="text-gray-600 mt-2">
//           {brandProducts.length} products from {brand.name}
//         </p>
//       </div>
      
//       <ProductGrid products={brandProducts} />
//     </div>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import ProductGrid from '@/components/product/ProductGrid';
// import { Product } from '@/types';

// export default function BrandPage() {
//   const params = useParams();
//   const slug = params.slug as string;
  
//   const [products, setProducts] = useState<Product[]>([]);
//   const [brandName, setBrandName] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [categories, setCategories] = useState<string[]>(['all']);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const response = await fetch('http://localhost:8080/api/products');
//         const data = await response.json();
        
//         if (data.success && data.data.products) {
//           // First, adapt all products
//           const allAdapted = data.data.products.map((p: any) => {
//             let productImages = [];
//             if (p.images) {
//               try {
//                 productImages = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
//               } catch(e) {
//                 productImages = [];
//               }
//             }
            
//             if (!productImages.length) {
//               productImages = [`https://placehold.co/400x400/2563eb/white?text=${encodeURIComponent(p.name.substring(0, 15))}`];
//             }
            
//             return {
//               id: Number(p.id),
//               name: p.name,
//               slug: p.slug,
//               category: p.category || '',
//               categorySlug: p.category_slug || '',
//               brand: p.brand || 'Glance Healthcare',
//               price: Number(p.price),
//               originalPrice: undefined,
//               discount: undefined,
//               description: p.description || '',
//               benefits: [],
//               images: productImages,
//               rating: 4.5,
//               reviews: 10,
//               inStock: p.stock > 0,
//               isPrescriptionRequired: p.is_prescription_required === 1,
//               volume: p.volume || '',
//             };
//           });
          
//           // Filter by brand
//           const brandProducts = allAdapted.filter((p: Product) => {
//             const brandSlug = p.brand.toLowerCase().replace(/\s+/g, '-');
//             return brandSlug === slug;
//           });
          
//           // Get unique categories from brand products (fix the error)
//           const categorySet = new Set<string>();
//           brandProducts.forEach((p: Product) => {
//             if (p.category) {
//               categorySet.add(p.category);
//             }
//           });
//           const uniqueCats = ['all', ...Array.from(categorySet)];
//           setCategories(uniqueCats);
          
//           // Set brand name
//           if (brandProducts.length > 0) {
//             setBrandName(brandProducts[0].brand);
//           }
          
//           setProducts(brandProducts);
//         }
//       } catch (err) {
//         console.error('Error fetching products:', err);
//       } finally {
//         setLoading(false);
//       }
//     }
    
//     fetchProducts();
//   }, [slug]);

//   // Filter products by category
//   const filteredProducts = selectedCategory === 'all' 
//     ? products 
//     : products.filter(p => p.category === selectedCategory);

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {[...Array(4)].map((_, i) => (
//               <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">{brandName || slug.replace(/-/g, ' ')}</h1>
//         <p className="text-gray-600 mt-2">
//           {filteredProducts.length} products found
//         </p>
//       </div>
      
//       {/* Category Filter */}
//       {categories.length > 1 && (
//         <div className="mb-6 flex flex-wrap gap-2">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setSelectedCategory(cat)}
//               className={`px-4 py-2 rounded-full text-sm transition ${
//                 selectedCategory === cat
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               {cat === 'all' ? 'All Products' : cat}
//             </button>
//           ))}
//         </div>
//       )}
      
//       {filteredProducts.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No products found for this brand.</p>
//         </div>
//       ) : (
//         <ProductGrid products={filteredProducts} />
//       )}
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductGrid from '@/components/product/ProductGrid';
import { Product } from '@/types';

export default function BrandPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [brandName, setBrandName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:8080/api/products');
        const data = await response.json();
        
        if (data.success && data.data.products) {
          const allAdapted = data.data.products.map((p: any) => {
            let productImages = [];
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