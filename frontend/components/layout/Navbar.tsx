// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useCartStore } from '@/store/cartStore';
// import { useWishlistStore } from '@/store/wishlistStore';
// import { Menu, X, ShoppingCart, Search, User, Heart } from 'lucide-react';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const totalCartItems = useCartStore((state) => state.getTotalItems());
//   const totalWishlistItems = useWishlistStore((state) => state.getTotalItems());

//   const categories = [
//     { name: 'Neurological Support', slug: 'neurological-support' },
//     { name: 'Probiotics & Digestion', slug: 'probiotics-digestion' },
//     { name: 'Vitamin Supplements', slug: 'vitamin-supplements' },
//     { name: 'Sleep Support', slug: 'sleep-support' },
//     { name: 'Women Health', slug: 'women-reproductive-health' },
//     { name: 'Nutritional Supplements', slug: 'nutritional-supplements' }
//   ];

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center">
//             <Image
//               src="/images/medicines/glancelogo.jpeg"
//               alt="Glance Healthcare Logo"
//               width={150}
//               height={48}
//               className="object-contain h-12 w-auto"
//               priority
//             />
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link href="/products" className="text-gray-700 hover:text-blue-600 transition">
//               All Products
//             </Link>
//             <div className="relative group">
//               <button className="text-gray-700 hover:text-blue-600 transition flex items-center">
//                 Categories
//               </button>
//               <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                 {categories.map((cat) => (
//                   <Link
//                     key={cat.slug}
//                     href={`/categories/${cat.slug}`}
//                     className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
//                   >
//                     {cat.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//             <Link href="/brands/glance-healthcare" className="text-gray-700 hover:text-blue-600 transition">
//               Shop by Brand
//             </Link>
//             <Link href="/faq" className="text-gray-700 hover:text-blue-600 transition">
//               FAQ
//             </Link>
//             <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
//               Contact
//             </Link>
//           </div>

//           {/* Right Icons */}
//           <div className="flex items-center space-x-4">
//             {/* Search */}
//             <button
//               onClick={() => setIsSearchOpen(!isSearchOpen)}
//               className="text-black hover:text-blue-600"
//             >
//               <Search size={20} />
//             </button>

//             {/* Account */}
//             <Link href="/account" className="text-black hover:text-blue-600">
//               <User size={20} />
//             </Link>

//             {/* Wishlist */}
//             <Link href="/wishlist" className="relative text-black hover:text-red-500 transition-colors">
//               <Heart size={20} />
//               {totalWishlistItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
//                   {totalWishlistItems}
//                 </span>
//               )}
//             </Link>

//             {/* Cart */}
//             <Link href="/cart" className="relative text-black hover:text-blue-600">
//               <ShoppingCart size={20} />
//               {totalCartItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
//                   {totalCartItems}
//                 </span>
//               )}
//             </Link>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden text-black hover:text-blue-600"
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Search Bar */}
//         {isSearchOpen && (
//           <div className="py-4 border-t">
//             <form action="/products" method="GET" className="flex">
//               <input
//                 type="text"
//                 name="search"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search products..."
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
//               >
//                 Search
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t">
//             <div className="flex flex-col space-y-3">
//               <Link href="/products" className="text-gray-700 hover:text-blue-600 py-2">
//                 All Products
//               </Link>
//               <div className="pl-4">
//                 <p className="font-semibold text-gray-800 mb-2">Categories</p>
//                 {categories.map((cat) => (
//                   <Link
//                     key={cat.slug}
//                     href={`/categories/${cat.slug}`}
//                     className="block text-gray-600 hover:text-blue-600 py-1"
//                   >
//                     {cat.name}
//                   </Link>
//                 ))}
//               </div>
//               <Link href="/brands/glance-healthcare" className="text-gray-700 hover:text-blue-600 py-2">
//                 Shop by Brand
//               </Link>
//               <Link href="/faq" className="text-gray-700 hover:text-blue-600 py-2">
//                 FAQ
//               </Link>
//               <Link href="/contact" className="text-gray-700 hover:text-blue-600 py-2">
//                 Contact
//               </Link>
//               <Link href="/wishlist" className="text-gray-700 hover:text-red-500 py-2 flex items-center gap-2">
//                 <Heart size={16} />
//                 Wishlist {totalWishlistItems > 0 && `(${totalWishlistItems})`}
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useCartStore } from '@/store/cartStore';
// import { useWishlistStore } from '@/store/wishlistStore';
// import { Menu, X, ShoppingCart, Search, User, Heart } from 'lucide-react';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   // ✅ hydration fix
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const totalCartItems = useCartStore((state) => state.getTotalItems());
//   const totalWishlistItems = useWishlistStore((state) => state.getTotalItems());

//   const categories = [
//     { name: 'Neurological Support', slug: 'neurological-support' },
//     { name: 'Probiotics & Digestion', slug: 'probiotics-digestion' },
//     { name: 'Vitamin Supplements', slug: 'vitamin-supplements' },
//     { name: 'Sleep Support', slug: 'sleep-support' },
//     { name: 'Women Health', slug: 'women-reproductive-health' },
//     { name: 'Nutritional Supplements', slug: 'nutritional-supplements' }
//   ];

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">

//           {/* Logo */}
//           <Link href="/" className="flex items-center">
//             <Image
//               src="/images/medicines/glancelogo.jpeg"
//               alt="Glance Healthcare Logo"
//               width={150}
//               height={48}
//               className="object-contain h-12 w-auto"
//               priority
//             />
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link href="/products" className="text-gray-700 hover:text-blue-600 transition">
//               All Products
//             </Link>

//             <div className="relative group">
//               <button className="text-gray-700 hover:text-blue-600 transition flex items-center">
//                 Categories
//               </button>

//               <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                 {categories.map((cat) => (
//                   <Link
//                     key={cat.slug}
//                     href={`/categories/${cat.slug}`}
//                     className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
//                   >
//                     {cat.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             <Link href="/brands/glance-healthcare" className="text-gray-700 hover:text-blue-600 transition">
//               Shop by Brand
//             </Link>

//             <Link href="/faq" className="text-gray-700 hover:text-blue-600 transition">
//               FAQ
//             </Link>

//             <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
//               Contact
//             </Link>
//           </div>

//           {/* Right Icons */}
//           <div className="flex items-center space-x-4">

//             {/* Search */}
//             <button
//               onClick={() => setIsSearchOpen(!isSearchOpen)}
//               className="text-black hover:text-blue-600"
//             >
//               <Search size={20} />
//             </button>

//             {/* Account */}
//             <Link href="/account" className="text-black hover:text-blue-600">
//               <User size={20} />
//             </Link>

//             {/* Wishlist */}
//             <Link href="/wishlist" className="relative text-black hover:text-red-500 transition-colors">
//               <Heart size={20} />

//               {mounted && totalWishlistItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
//                   {totalWishlistItems}
//                 </span>
//               )}
//             </Link>

//             {/* Cart */}
//             <Link href="/cart" className="relative text-black hover:text-blue-600">
//               <ShoppingCart size={20} />

//               {mounted && totalCartItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
//                   {totalCartItems}
//                 </span>
//               )}
//             </Link>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden text-black hover:text-blue-600"
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Search Bar */}
//         {isSearchOpen && (
//           <div className="py-4 border-t">
//             <form action="/products" method="GET" className="flex">
//               <input
//                 type="text"
//                 name="search"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search products..."
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
//               >
//                 Search
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t">
//             <div className="flex flex-col space-y-3">

//               <Link href="/products" className="text-gray-700 hover:text-blue-600 py-2">
//                 All Products
//               </Link>

//               <div className="pl-4">
//                 <p className="font-semibold text-gray-800 mb-2">Categories</p>
//                 {categories.map((cat) => (
//                   <Link
//                     key={cat.slug}
//                     href={`/categories/${cat.slug}`}
//                     className="block text-gray-600 hover:text-blue-600 py-1"
//                   >
//                     {cat.name}
//                   </Link>
//                 ))}
//               </div>

//               <Link href="/brands/glance-healthcare" className="text-gray-700 hover:text-blue-600 py-2">
//                 Shop by Brand
//               </Link>

//               <Link href="/faq" className="text-gray-700 hover:text-blue-600 py-2">
//                 FAQ
//               </Link>

//               <Link href="/contact" className="text-gray-700 hover:text-blue-600 py-2">
//                 Contact
//               </Link>

//               <Link href="/wishlist" className="text-gray-700 hover:text-red-500 py-2 flex items-center gap-2">
//                 <Heart size={16} />
//                 Wishlist {mounted && totalWishlistItems > 0 && `(${totalWishlistItems})`}
//               </Link>

//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useCartStore } from '@/store/cartStore';
// import { useWishlistStore } from '@/store/wishlistStore';
// import { Menu, X, ShoppingCart, Search, User, Heart } from 'lucide-react';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [mounted, setMounted] = useState(false);
//   const [totalCartItems, setTotalCartItems] = useState(0);
//   const [totalWishlistItems, setTotalWishlistItems] = useState(0);

//   // Get stores
//   const cartItems = useCartStore((state) => state.items);
//   const wishlistItems = useWishlistStore((state) => state.items);

//   // Set mounted and update totals
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (mounted) {
//       setTotalCartItems(cartItems.reduce((sum, item) => sum + item.quantity, 0));
//       setTotalWishlistItems(wishlistItems.length);
//     }
//   }, [cartItems, wishlistItems, mounted]);

//   const categories = [
//     { name: 'Neurological Support', slug: 'neurological-support' },
//     { name: 'Probiotics & Digestion', slug: 'probiotics-digestion' },
//     { name: 'Vitamin Supplements', slug: 'vitamin-supplements' },
//     { name: 'Sleep Support', slug: 'sleep-support' },
//     { name: 'Women Health', slug: 'women-reproductive-health' },
//     { name: 'Nutritional Supplements', slug: 'nutritional-supplements' }
//   ];

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">

//           {/* Logo */}
//           <Link href="/" className="flex items-center">
//             <Image
//               src="/images/medicines/glancelogo.jpeg"
//               alt="Glance Healthcare Logo"
//               width={150}
//               height={48}
//               className="object-contain h-12 w-auto"
//               priority
//             />
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link href="/products" className="text-gray-700 hover:text-blue-600 transition">
//               All Products
//             </Link>

//             <div className="relative group">
//               <button className="text-gray-700 hover:text-blue-600 transition flex items-center">
//                 Categories
//               </button>

//               <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                 {categories.map((cat) => (
//                   <Link
//                     key={cat.slug}
//                     href={`/categories/${cat.slug}`}
//                     className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
//                   >
//                     {cat.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             <Link href="/brands/glance-healthcare" className="text-gray-700 hover:text-blue-600 transition">
//               Shop by Brand
//             </Link>

//             <Link href="/faq" className="text-gray-700 hover:text-blue-600 transition">
//               FAQ
//             </Link>

//             <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
//               Contact
//             </Link>
//           </div>

//           {/* Right Icons */}
//           <div className="flex items-center space-x-4">

//             {/* Search */}
//             <button
//               onClick={() => setIsSearchOpen(!isSearchOpen)}
//               className="text-black hover:text-blue-600"
//             >
//               <Search size={20} />
//             </button>

//             {/* Account */}
//             <Link href="/account" className="text-black hover:text-blue-600">
//               <User size={20} />
//             </Link>

//             {/* Wishlist */}
//             <Link href="/wishlist" className="relative text-black hover:text-red-500 transition-colors">
//               <Heart size={20} />
//               {mounted && totalWishlistItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
//                   {totalWishlistItems}
//                 </span>
//               )}
//             </Link>

//             {/* Cart */}
//             <Link href="/cart" className="relative text-black hover:text-blue-600">
//               <ShoppingCart size={20} />
//               {mounted && totalCartItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
//                   {totalCartItems}
//                 </span>
//               )}
//             </Link>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden text-black hover:text-blue-600"
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Search Bar */}
//         {isSearchOpen && (
//           <div className="py-4 border-t">
//             <form action="/products" method="GET" className="flex">
//               <input
//                 type="text"
//                 name="search"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search products..."
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
//               >
//                 Search
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t">
//             <div className="flex flex-col space-y-3">

//               <Link href="/products" className="text-gray-700 hover:text-blue-600 py-2">
//                 All Products
//               </Link>

//               <div className="pl-4">
//                 <p className="font-semibold text-gray-800 mb-2">Categories</p>
//                 {categories.map((cat) => (
//                   <Link
//                     key={cat.slug}
//                     href={`/categories/${cat.slug}`}
//                     className="block text-gray-600 hover:text-blue-600 py-1"
//                   >
//                     {cat.name}
//                   </Link>
//                 ))}
//               </div>

//               <Link href="/brands/glance-healthcare" className="text-gray-700 hover:text-blue-600 py-2">
//                 Shop by Brand
//               </Link>

//               <Link href="/faq" className="text-gray-700 hover:text-blue-600 py-2">
//                 FAQ
//               </Link>

//               <Link href="/contact" className="text-gray-700 hover:text-blue-600 py-2">
//                 Contact
//               </Link>

//               <Link href="/wishlist" className="text-gray-700 hover:text-red-500 py-2 flex items-center gap-2">
//                 <Heart size={16} />
//                 Wishlist {mounted && totalWishlistItems > 0 && `(${totalWishlistItems})`}
//               </Link>

//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useCartStore } from '@/store/cartStore';
// import { useWishlistStore } from '@/store/wishlistStore';
// import { Menu, X, ShoppingCart, Search, User, Heart, LogOut } from 'lucide-react';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [mounted, setMounted] = useState(false);
//   const [totalCartItems, setTotalCartItems] = useState(0);
//   const [totalWishlistItems, setTotalWishlistItems] = useState(0);
//   const [user, setUser] = useState<any>(null);

//   // Get stores
//   const cartItems = useCartStore((state) => state.items);
//   const wishlistItems = useWishlistStore((state) => state.items);

//   // Check if user is logged in
//   useEffect(() => {
//     const checkAuth = () => {
//       try {
//         const authData = localStorage.getItem('auth-storage');
//         if (authData) {
//           const parsed = JSON.parse(authData);
//           if (parsed.state?.user && parsed.state?.token) {
//             setUser(parsed.state.user);
//           } else {
//             setUser(null);
//           }
//         } else {
//           setUser(null);
//         }
//       } catch (e) {
//         setUser(null);
//       }
//     };
    
//     checkAuth();
//     setMounted(true);
    
//     // Listen for storage changes (logout from other tabs)
//     window.addEventListener('storage', checkAuth);
//     return () => window.removeEventListener('storage', checkAuth);
//   }, []);

//   useEffect(() => {
//     if (mounted) {
//       setTotalCartItems(cartItems.reduce((sum, item) => sum + item.quantity, 0));
//       setTotalWishlistItems(wishlistItems.length);
//     }
//   }, [cartItems, wishlistItems, mounted]);

//   const handleLogout = () => {
//     localStorage.removeItem('auth-storage');
//     setUser(null);
//     window.location.href = '/';
//   };

//   const categories = [
//     { name: 'Neurological Support', slug: 'neurological-support' },
//     { name: 'Probiotics & Digestion', slug: 'probiotics-digestion' },
//     { name: 'Vitamin Supplements', slug: 'vitamin-supplements' },
//     { name: 'Sleep Support', slug: 'sleep-support' },
//     { name: 'Women Health', slug: 'women-reproductive-health' },
//     { name: 'Nutritional Supplements', slug: 'nutritional-supplements' }
//   ];

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">

//           {/* Logo */}
//           <Link href="/" className="flex items-center">
//             <Image
//               src="/images/medicines/glancelogo.jpeg"
//               alt="Glance Healthcare Logo"
//               width={150}
//               height={48}
//               className="object-contain h-12 w-auto"
//               priority
//             />
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link href="/products" className="text-gray-700 hover:text-blue-600 transition">
//               All Products
//             </Link>

//             <div className="relative group">
//               <button className="text-gray-700 hover:text-blue-600 transition flex items-center">
//                 Categories
//               </button>

//               <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                 {categories.map((cat) => (
//                   <Link
//                     key={cat.slug}
//                     href={`/categories/${cat.slug}`}
//                     className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
//                   >
//                     {cat.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             <Link href="/brands/glance-healthcare" className="text-gray-700 hover:text-blue-600 transition">
//               Shop by Brand
//             </Link>

//             <Link href="/faq" className="text-gray-700 hover:text-blue-600 transition">
//               FAQ
//             </Link>

//             <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
//               Contact
//             </Link>
//           </div>

//           {/* Right Icons */}
//           <div className="flex items-center space-x-4">

//             {/* Search */}
//             <button
//               onClick={() => setIsSearchOpen(!isSearchOpen)}
//               className="text-black hover:text-blue-600"
//             >
//               <Search size={20} />
//             </button>

//             {/* Account / User Menu */}
//             {user ? (
//               <div className="flex items-center gap-3">
//                 <span className="text-sm text-gray-700 hidden sm:inline-block">
//                   👋 {user.name?.split(' ')[0]}
//                 </span>
//                 <Link href="/account" className="text-black hover:text-blue-600">
//                   <User size={20} />
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="text-red-600 hover:text-red-700 transition-colors"
//                   title="Logout"
//                 >
//                   <LogOut size={20} />
//                 </button>
//               </div>
//             ) : (
//               <Link href="/account" className="text-black hover:text-blue-600">
//                 <User size={20} />
//               </Link>
//             )}

//             {/* Wishlist */}
//             <Link href="/wishlist" className="relative text-black hover:text-red-500 transition-colors">
//               <Heart size={20} />
//               {mounted && totalWishlistItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
//                   {totalWishlistItems}
//                 </span>
//               )}
//             </Link>

//             {/* Cart */}
//             <Link href="/cart" className="relative text-black hover:text-blue-600">
//               <ShoppingCart size={20} />
//               {mounted && totalCartItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
//                   {totalCartItems}
//                 </span>
//               )}
//             </Link>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden text-black hover:text-blue-600"
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Search Bar */}
//         {isSearchOpen && (
//           <div className="py-4 border-t">
//             <form action="/products" method="GET" className="flex">
//               <input
//                 type="text"
//                 name="search"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search products..."
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
//               >
//                 Search
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t">
//             <div className="flex flex-col space-y-3">

//               <Link href="/products" className="text-gray-700 hover:text-blue-600 py-2">
//                 All Products
//               </Link>

//               <div className="pl-4">
//                 <p className="font-semibold text-gray-800 mb-2">Categories</p>
//                 {categories.map((cat) => (
//                   <Link
//                     key={cat.slug}
//                     href={`/categories/${cat.slug}`}
//                     className="block text-gray-600 hover:text-blue-600 py-1"
//                   >
//                     {cat.name}
//                   </Link>
//                 ))}
//               </div>

//               <Link href="/brands/glance-healthcare" className="text-gray-700 hover:text-blue-600 py-2">
//                 Shop by Brand
//               </Link>

//               <Link href="/faq" className="text-gray-700 hover:text-blue-600 py-2">
//                 FAQ
//               </Link>

//               <Link href="/contact" className="text-gray-700 hover:text-blue-600 py-2">
//                 Contact
//               </Link>

//               <Link href="/wishlist" className="text-gray-700 hover:text-red-500 py-2 flex items-center gap-2">
//                 <Heart size={16} />
//                 Wishlist {mounted && totalWishlistItems > 0 && `(${totalWishlistItems})`}
//               </Link>

//               {/* Mobile user info and logout */}
//               {user && (
//                 <>
//                   <div className="border-t pt-3 mt-2">
//                     <p className="text-sm text-gray-600 py-1">👋 Logged in as: <span className="font-semibold">{user.name}</span></p>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left text-red-600 hover:text-red-700 py-2 flex items-center gap-2"
//                     >
//                       <LogOut size={16} />
//                       Logout
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { Menu, X, ShoppingCart, Search, User, Heart, LogOut } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [totalWishlistItems, setTotalWishlistItems] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [categories, setCategories] = useState<{name: string, slug: string}[]>([]);

  // Get stores
  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);

  // Fetch categories from API
  useEffect(() => {
    fetch('http://localhost:8080/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategories(data.data);
        }
      })
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem('auth-storage');
        if (authData) {
          const parsed = JSON.parse(authData);
          if (parsed.state?.user && parsed.state?.token) {
            setUser(parsed.state.user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (e) {
        setUser(null);
      }
    };
    
    checkAuth();
    setMounted(true);
    
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  useEffect(() => {
    if (mounted) {
      setTotalCartItems(cartItems.reduce((sum, item) => sum + item.quantity, 0));
      setTotalWishlistItems(wishlistItems.length);
    }
  }, [cartItems, wishlistItems, mounted]);

  const handleLogout = () => {
    localStorage.removeItem('auth-storage');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/medicines/glancelogo.jpeg"
              alt="Glance Healthcare Logo"
              width={150}
              height={48}
              className="object-contain h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition">
              All Products
            </Link>

            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 transition flex items-center">
                Categories
              </button>

              <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/brands/glance-healthcare" className="text-gray-700 hover:text-blue-600 transition">
              Shop by Brand
            </Link>

            <Link href="/faq" className="text-gray-700 hover:text-blue-600 transition">
              FAQ
            </Link>

            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
              Contact
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-black hover:text-blue-600"
            >
              <Search size={20} />
            </button>

            {/* Account / User Menu */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700 hidden sm:inline-block">
                  👋 {user.name?.split(' ')[0]}
                </span>
                {user.role === 'admin' && (
                  <a href="http://localhost:8080/admin/" target="_blank" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                    Admin
                  </a>
                )}
                <Link href="/account" className="text-black hover:text-blue-600">
                  <User size={20} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link href="/account" className="text-black hover:text-blue-600">
                <User size={20} />
              </Link>
            )}

            {/* Wishlist */}
            <Link href="/wishlist" className="relative text-black hover:text-red-500 transition-colors">
              <Heart size={20} />
              {mounted && totalWishlistItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative text-black hover:text-blue-600">
              <ShoppingCart size={20} />
              {mounted && totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {totalCartItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-black hover:text-blue-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t">
            <form action="/products" method="GET" className="flex">
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link href="/products" className="text-gray-700 hover:text-blue-600 py-2">
                All Products
              </Link>

              <div className="pl-4">
                <p className="font-semibold text-gray-800 mb-2">Categories</p>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="block text-gray-600 hover:text-blue-600 py-1"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              <Link href="/brands/glance-healthcare" className="text-gray-700 hover:text-blue-600 py-2">
                Shop by Brand
              </Link>

              <Link href="/faq" className="text-gray-700 hover:text-blue-600 py-2">
                FAQ
              </Link>

              <Link href="/contact" className="text-gray-700 hover:text-blue-600 py-2">
                Contact
              </Link>

              <Link href="/wishlist" className="text-gray-700 hover:text-red-500 py-2 flex items-center gap-2">
                <Heart size={16} />
                Wishlist {mounted && totalWishlistItems > 0 && `(${totalWishlistItems})`}
              </Link>

              {user && (
                <>
                  <div className="border-t pt-3 mt-2">
                    <p className="text-sm text-gray-600 py-1">👋 Logged in as: <span className="font-semibold">{user.name}</span></p>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-red-600 hover:text-red-700 py-2 flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}