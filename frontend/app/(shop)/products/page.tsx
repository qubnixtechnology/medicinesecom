// 'use client';

// import { Suspense } from 'react';
// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import ProductGrid from '@/components/product/ProductGrid';
// import { products, categories } from '@/lib/products';
// import { Product } from '@/types';

// function ProductsContent() {
//   const searchParams = useSearchParams();
//   const searchQuery = searchParams.get('search') || '';
//   const categoryParam = searchParams.get('category') || 'all';

//   const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
//   const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);

//   useEffect(() => {
//     let filtered = [...products];

//     if (searchQuery) {
//       filtered = filtered.filter(p =>
//         p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         p.description.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter(p => p.categorySlug === selectedCategory);
//     }

//     filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

//     setFilteredProducts(filtered);
//   }, [searchQuery, selectedCategory, priceRange]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">
//         {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
//       </h1>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Filters Sidebar */}
//         <div className="md:w-64 space-y-6">
//           <div>
//             <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
//             <div className="space-y-2">
//               <button
//                 onClick={() => setSelectedCategory('all')}
//                 className={`block w-full text-left px-3 py-2 rounded ${
//                   selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
//                 }`}
//               >
//                 All Products
//               </button>
//               {categories.map((cat) => (
//                 <button
//                   key={cat.slug}
//                   onClick={() => setSelectedCategory(cat.slug)}
//                   className={`block w-full text-left px-3 py-2 rounded ${
//                     selectedCategory === cat.slug ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
//                   }`}
//                 >
//                   {cat.name} ({cat.count})
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
//             <div className="space-y-2">
//               <input
//                 type="range"
//                 min="0"
//                 max="1500"
//                 value={priceRange[1]}
//                 onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                 className="w-full"
//               />
//               <div className="flex justify-between text-sm text-gray-600">
//                 <span>₹0</span>
//                 <span>₹{priceRange[1]}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Products Grid */}
//         <div className="flex-1">
//           <ProductGrid products={filteredProducts} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ProductsPage() {
//   return (
//     <Suspense fallback={
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="animate-pulse">
//           <div className="h-10 bg-gray-200 rounded w-64 mb-6"></div>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     }>
//       <ProductsContent />
//     </Suspense>
//   );
// }

// 'use client';

// import { Suspense, useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import ProductGrid from '@/components/product/ProductGrid';
// import { Product } from '@/types';

// function ProductsContent() {
//   const searchParams = useSearchParams();
//   const searchQuery = searchParams.get('search') || '';
//   const categoryParam = searchParams.get('category') || 'all';

//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);

//   // Fetch products from backend API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         let url = 'http://localhost:8080/api/products';
//         const params = new URLSearchParams();
        
//         if (searchQuery) params.append('search', searchQuery);
//         if (selectedCategory !== 'all') params.append('category', selectedCategory);
//         if (priceRange[1] < 1500) params.append('max_price', priceRange[1].toString());
        
//         if (params.toString()) {
//           url += '?' + params.toString();
//         }
        
//         const response = await fetch(url);
//         const data = await response.json();
        
//         if (data.success) {
//           setProducts(data.data.products);
//         } else {
//           console.error('API error:', data);
//         }
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchProducts();
//   }, [searchQuery, selectedCategory, priceRange]);

//   // Fetch categories from backend API
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/categories');
//         const data = await response.json();
//         if (data.success) {
//           setCategories(data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="animate-pulse">
//           <div className="h-10 bg-gray-200 rounded w-64 mb-6"></div>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">
//         {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
//       </h1>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Filters Sidebar */}
//         <div className="md:w-64 space-y-6">
//           <div>
//             <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
//             <div className="space-y-2">
//               <button
//                 onClick={() => setSelectedCategory('all')}
//                 className={`block w-full text-left px-3 py-2 rounded ${
//                   selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
//                 }`}
//               >
//                 All Products
//               </button>
//               {categories.map((cat) => (
//                 <button
//                   key={cat.slug}
//                   onClick={() => setSelectedCategory(cat.slug)}
//                   className={`block w-full text-left px-3 py-2 rounded ${
//                     selectedCategory === cat.slug ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
//                   }`}
//                 >
//                   {cat.name} ({cat.product_count || 0})
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
//             <div className="space-y-2">
//               <input
//                 type="range"
//                 min="0"
//                 max="1500"
//                 value={priceRange[1]}
//                 onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                 className="w-full"
//               />
//               <div className="flex justify-between text-sm text-gray-600">
//                 <span>₹0</span>
//                 <span>₹{priceRange[1]}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Products Grid */}
//         <div className="flex-1">
//           {products.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-500">No products found.</p>
//             </div>
//           ) : (
//             <ProductGrid products={products} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ProductsPage() {
//   return (
//     <Suspense fallback={
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="animate-pulse">
//           <div className="h-10 bg-gray-200 rounded w-64 mb-6"></div>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     }>
//       <ProductsContent />
//     </Suspense>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import ProductGrid from '@/components/product/ProductGrid';
// import { Product } from '@/types';

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         console.log('Fetching products...');
//         const response = await fetch('http://localhost:8080/api/products');
//         const data = await response.json();
//         console.log('API Response:', data);
        
//         if (data.success && data.data.products) {
//           const adaptedProducts = data.data.products.map((p: any) => ({
//             id: Number(p.id),
//             name: p.name,
//             slug: p.slug,
//             category: p.category || '',
//             categorySlug: p.category_slug || '',
//             brand: p.brand || 'Glance Healthcare',
//             price: Number(p.price),
//             originalPrice: undefined,
//             discount: undefined,
//             description: p.description || '',
//             benefits: [],
//             composition: undefined,
//             dosage: undefined,
//             usage: undefined,
//             indications: [],
//             images: ['/images/placeholder.jpg'],
//             rating: 4.5,
//             reviews: 10,
//             inStock: p.stock > 0,
//             isPrescriptionRequired: p.is_prescription_required === 1,
//             volume: p.volume || '',
//             flavour: undefined,
//             ageGroup: undefined
//           }));
//           setProducts(adaptedProducts);
//           console.log('Products set:', adaptedProducts.length);
//         } else {
//           setError('No products found');
//         }
//       } catch (err) {
//         console.error('Fetch error:', err);
//         setError('Failed to fetch products. Make sure backend is running at http://localhost:8080');
//       } finally {
//         setLoading(false);
//       }
//     }
    
//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <div className="max-w-7xl mx-auto px-4 py-8 text-center">Loading products...</div>;
//   }

//   if (error) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8 text-center">
//         <p className="text-red-600">{error}</p>
//         <p className="mt-4">Check that backend is running at: http://localhost:8080</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">All Products</h1>
//       {products.length === 0 ? (
//         <p>No products found in database.</p>
//       ) : (
//         <ProductGrid products={products} />
//       )}
//     </div>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import ProductGrid from '@/components/product/ProductGrid';
// import { Product } from '@/types';

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const response = await fetch('http://localhost:8080/api/products');
//         const data = await response.json();
        
//         if (data.success && data.data.products) {
//           const adaptedProducts = data.data.products.map((p: any) => {
//             // Handle images properly
//             let productImages = [];
//             if (p.images) {
//               if (typeof p.images === 'string') {
//                 try {
//                   productImages = JSON.parse(p.images);
//                 } catch(e) {
//                   productImages = [];
//                 }
//               } else {
//                 productImages = p.images;
//               }
//             }
            
//             // If still no images, create placeholder
//             if (!productImages.length) {
//               const productName = encodeURIComponent(p.name.substring(0, 15));
//               productImages = [`https://placehold.co/400x400/2563eb/white?text=${productName}`];
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
//           setProducts(adaptedProducts);
//         }
//       } catch (err) {
//         console.error('Fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     }
    
//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <div className="max-w-7xl mx-auto px-4 py-8 text-center">Loading products...</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">All Products</h1>
//       {products.length === 0 ? (
//         <p>No products found.</p>
//       ) : (
//         <ProductGrid products={products} />
//       )}
//     </div>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import ProductGrid from '@/components/product/ProductGrid';
// import { Product } from '@/types';

// export default function ProductsPage() {
//   const searchParams = useSearchParams();
//   const searchQuery = searchParams.get('search') || '';
//   const categoryParam = searchParams.get('category') || 'all';

//   const [products, setProducts] = useState<Product[]>([]);
//   const [allProducts, setAllProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
//   const [maxPrice, setMaxPrice] = useState(1500);

//   // Fetch products from API
//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const response = await fetch('http://localhost:8080/api/products');
//         const data = await response.json();
        
//         if (data.success && data.data.products) {
//           const adaptedProducts = data.data.products.map((p: any) => {
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
          
//           setAllProducts(adaptedProducts);
//           setProducts(adaptedProducts);
          
//           // Calculate max price for range
//           const prices = adaptedProducts.map((p: { price: any; }) => p.price);
//           const max = Math.max(...prices, 1500);
//           setMaxPrice(max);
//           setPriceRange([0, max]);
//         }
//       } catch (err) {
//         console.error('Fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     }
    
//     fetchProducts();
//   }, []);

//   // Fetch categories from API
//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await fetch('http://localhost:8080/api/categories');
//         const data = await response.json();
//         if (data.success) {
//           setCategories(data.data);
//         }
//       } catch (err) {
//         console.error('Error fetching categories:', err);
//       }
//     }
//     fetchCategories();
//   }, []);

//   // Filter products based on search, category, and price
//   useEffect(() => {
//     let filtered = [...allProducts];
    
//     // Filter by search query
//     if (searchQuery) {
//       filtered = filtered.filter(p =>
//         p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         p.description.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
    
//     // Filter by category
//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter(p => p.categorySlug === selectedCategory);
//     }
    
//     // Filter by price range
//     filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
//     setProducts(filtered);
//   }, [searchQuery, selectedCategory, priceRange, allProducts]);

//   if (loading) {
//     return <div className="max-w-7xl mx-auto px-4 py-8 text-center">Loading products...</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">
//         {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
//       </h1>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Filters Sidebar */}
//         <div className="md:w-64 space-y-6">
//           {/* Categories Filter */}
//           <div>
//             <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
//             <div className="space-y-2 max-h-96 overflow-y-auto">
//               <button
//                 onClick={() => setSelectedCategory('all')}
//                 className={`block w-full text-left px-3 py-2 rounded ${
//                   selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
//                 }`}
//               >
//                 All Products ({allProducts.length})
//               </button>
//               {categories.map((cat) => (
//                 <button
//                   key={cat.slug}
//                   onClick={() => setSelectedCategory(cat.slug)}
//                   className={`block w-full text-left px-3 py-2 rounded ${
//                     selectedCategory === cat.slug ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
//                   }`}
//                 >
//                   {cat.name} ({cat.product_count || 0})
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Price Range Filter */}
//           <div>
//             <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
//             <div className="space-y-3">
//               <input
//                 type="range"
//                 min="0"
//                 max={maxPrice}
//                 value={priceRange[1]}
//                 onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                 className="w-full"
//               />
//               <div className="flex justify-between text-sm text-gray-600">
//                 <span>₹{priceRange[0]}</span>
//                 <span>₹{priceRange[1]}</span>
//               </div>
//               <div className="flex gap-2">
//                 <input
//                   type="number"
//                   value={priceRange[0]}
//                   onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
//                   className="w-1/2 px-2 py-1 border rounded text-sm"
//                   placeholder="Min"
//                 />
//                 <input
//                   type="number"
//                   value={priceRange[1]}
//                   onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
//                   className="w-1/2 px-2 py-1 border rounded text-sm"
//                   placeholder="Max"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Products Grid */}
//         <div className="flex-1">
//           {products.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-500">No products found in this range.</p>
//             </div>
//           ) : (
//             <>
//               <p className="text-gray-500 mb-4">Showing {products.length} products</p>
//               <ProductGrid products={products} />
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/product/ProductGrid';
import { Product } from '@/types';

export default function ProductsPage() {
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

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:8080/api/products');
        const data = await response.json();
        
        if (data.success && data.data.products) {
          const adaptedProducts = data.data.products.map((p: any) => {
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

    //       const adaptedProducts = data.data.products.map((p: any) => {
    // let productImages = [];
    // if (p.images) {
    //     try {
    //         let images = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
    //         // Make sure image URLs are absolute
    //         productImages = images.map((img: string) => {
    //             if (img.startsWith('http')) {
    //                 return img;
    //             } else if (img.startsWith('/uploads/')) {
    //                 return 'http://localhost:8080' + img;
    //             } else if (img.startsWith('/images/')) {
    //                 return 'http://localhost:8080' + img;
    //             } else {
    //                 return 'http://localhost:8080/serve-image.php?file=' + encodeURIComponent(img);
    //             }
    //         });
    //     } catch(e) {
    //         productImages = [];
    //     }
    // }
    
    // if (!productImages.length) {
    //     productImages = ['http://localhost:8080/images/medicines/placeholder.jpg'];
    // }
            
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
          
          // Calculate max price for range
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

  // Fetch categories from API
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:8080/api/categories');
        const data = await response.json();
        if (data.success) {
          // Calculate product count for each category
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
      // Fetch categories without product count initially
      async function fetchBasicCategories() {
        try {
          const response = await fetch('http://localhost:8080/api/categories');
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

  // Filter products based on search, category, and price
  useEffect(() => {
    let filtered = [...allProducts];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.categorySlug === selectedCategory);
    }
    
    // Filter by price range
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
        {/* Filters Sidebar */}
        <div className="md:w-64 space-y-6">
          {/* Categories Filter */}
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

          {/* Price Range Filter */}
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

        {/* Products Grid */}
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