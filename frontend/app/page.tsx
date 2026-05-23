

// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { useState, useEffect } from 'react';
// import ProductGrid from '@/components/product/ProductGrid';
// import { products } from '@/lib/products';
// import { ArrowRight, Shield, Truck, Clock, Award, Star, ChevronLeft, ChevronRight } from 'lucide-react';

// export default function HomePage() {
//   const featuredProducts = products.slice(0, 8);
//   const newArrivals = products.slice(4, 12);

//   // Hero section slideshow images - Only medicine images
//   const slides = [
//     {
//       id: 1,
//       image: "/images/medicines/medi.jpg",
//       alt: "Healthcare Products"
//     },
//     {
//       id: 2,
//       image: "/images/medicines/med.jpg",
//       alt: "Medical Professional"
//     },
//     {
//       id: 3,
//       image: "/images/medicines/me.jpg",
//       alt: "Medical Research"
//     }
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Auto slide functionality
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 4000); // Change slide every 4 seconds

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   const categories = [
//     { name: 'Neurological Support', slug: 'neurological-support', icon: '🧠', description: 'Brain & nerve health', color: 'bg-purple-100', textColor: 'text-purple-600' },
//     { name: 'Probiotics & Digestion', slug: 'probiotics-digestion', icon: '🌿', description: 'Gut health & immunity', color: 'bg-green-100', textColor: 'text-green-600' },
//     { name: 'Vitamin Supplements', slug: 'vitamin-supplements', icon: '💊', description: 'Essential nutrients', color: 'bg-blue-100', textColor: 'text-blue-600' },
//     { name: 'Sleep Support', slug: 'sleep-support', icon: '😴', description: 'Restful sleep solutions', color: 'bg-indigo-100', textColor: 'text-indigo-600' },
//     { name: 'Women Health', slug: 'women-reproductive-health', icon: '🌸', description: 'Reproductive wellness', color: 'bg-pink-100', textColor: 'text-pink-600' },
//     { name: 'Nutritional Supplements', slug: 'nutritional-supplements', icon: '🍎', description: 'Complete nutrition', color: 'bg-orange-100', textColor: 'text-orange-600' }
//   ];

//   const testimonials = [
//     {
//       name: 'Priya Sharma',
//       role: 'Mother of 2-year old',
//       content: 'Brain Zen Drops have made a noticeable difference in my child\'s focus and development. Highly recommend Glance Healthcare products!',
//       rating: 5
//     },
//     {
//       name: 'Dr. Rajesh Kumar',
//       role: 'Pediatrician',
//       content: 'I recommend AVERION syrup to my patients with cerebral folate deficiency. The results have been excellent and parents are very satisfied.',
//       rating: 5
//     },
//     {
//       name: 'Sneha Patel',
//       role: 'Fertility Patient',
//       content: 'CARE-MYO sachets helped regulate my cycles. After 3 months of use, I conceived naturally. Thank you Glance Healthcare!',
//       rating: 5
//     }
//   ];

//   return (
//     <main className="overflow-x-hidden">
//       {/* ================= HERO SECTION WITH SLIDESHOW ================= */}
//       <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white overflow-hidden">
//         {/* Slideshow Background Images */}
//         <div className="absolute inset-0">
//           {slides.map((slide, index) => (
//             <div
//               key={slide.id}
//               className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//                 index === currentSlide ? 'opacity-100' : 'opacity-0'
//               }`}
//             >
//               <img
//                 src={slide.image}
//                 alt={slide.alt}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black opacity-40"></div>
//             </div>
//           ))}
//         </div>

//         {/* Dark overlay for better text readability */}
//         <div className="absolute inset-0 bg-black opacity-30"></div>

//         {/* Slide Navigation Buttons */}
//         <button
//           onClick={prevSlide}
//           className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 rounded-full p-2 sm:p-3 transition-all duration-300 backdrop-blur-sm"
//           aria-label="Previous slide"
//         >
//           <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 rounded-full p-2 sm:p-3 transition-all duration-300 backdrop-blur-sm"
//           aria-label="Next slide"
//         >
//           <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//         </button>

//         {/* Slide Indicators */}
//         <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`transition-all duration-300 rounded-full ${
//                 index === currentSlide
//                   ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-white'
//                   : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/80'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 z-10">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
//             {/* LEFT CONTENT */}
//             <div className="text-center lg:text-left">
//               <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
//                 Premium Pediatric, Neurological & Women Nutritional Supplements
//               </h1>
//               <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-blue-100 px-4 sm:px-0">
//                 Trusted healthcare solutions for your family. WHO-GMP certified products for better health and wellness.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                 <Link
//                   href="/products"
//                   className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg text-base sm:text-lg"
//                 >
//                   Shop Now <ArrowRight size={18} className="sm:w-5 sm:h-5" />
//                 </Link>
//                 <Link
//                   href="/categories/neurological-support"
//                   className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition text-base sm:text-lg"
//                 >
//                   Explore Categories
//                 </Link>
//               </div>
//             </div>

//             {/* RIGHT IMAGE - Hero product showcase */}
//             <div className="block mt-8 lg:mt-0">
//               <img
//                 src="/images/medicines/medi.jpg"
//                 alt="Healthcare Products"
//                 className="rounded-2xl shadow-2xl w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[500px] object-cover"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Wave SVG */}
//         <div className="absolute bottom-0 left-0 right-0 hidden sm:block z-10">
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
//             <path fill="#f9fafb" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,186.7C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
//           </svg>
//         </div>
//       </section>

//       {/* WhatsApp Floating Button */}
//       <a
//         href="https://wa.me/918919996196"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 group"
//       >
//         <div className="bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 sm:gap-3">
//           <span className="text-xl sm:text-2xl">💬</span>
//           <span className="hidden group-hover:block whitespace-nowrap font-medium text-sm sm:text-base">
//             Chat on WhatsApp
//           </span>
//         </div>
//       </a>

//       {/* Features Section */}
//       <section className="py-8 sm:py-12 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
//             <div className="flex flex-col items-center text-center p-2">
//               <div className="bg-blue-100 rounded-full p-2 sm:p-3 mb-2 sm:mb-3">
//                 <Shield className="text-blue-600 w-6 h-6 sm:w-8 sm:h-8" />
//               </div>
//               <h3 className="font-semibold text-gray-800 text-sm sm:text-base">WHO-GMP Certified</h3>
//               <p className="text-xs text-gray-500">Highest standards</p>
//             </div>
//             <div className="flex flex-col items-center text-center p-2">
//               <div className="bg-green-100 rounded-full p-2 sm:p-3 mb-2 sm:mb-3">
//                 <Truck className="text-green-600 w-6 h-6 sm:w-8 sm:h-8" />
//               </div>
//               <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Free Shipping</h3>
//               <p className="text-xs text-gray-500">Above ₹500</p>
//             </div>
//             <div className="flex flex-col items-center text-center p-2">
//               <div className="bg-orange-100 rounded-full p-2 sm:p-3 mb-2 sm:mb-3">
//                 <Clock className="text-orange-600 w-6 h-6 sm:w-8 sm:h-8" />
//               </div>
//               <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Quick Delivery</h3>
//               <p className="text-xs text-gray-500">Pan India</p>
//             </div>
//             <div className="flex flex-col items-center text-center p-2">
//               <div className="bg-purple-100 rounded-full p-2 sm:p-3 mb-2 sm:mb-3">
//                 <Award className="text-purple-600 w-6 h-6 sm:w-8 sm:h-8" />
//               </div>
//               <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Trusted Brand</h3>
//               <p className="text-xs text-gray-500">10k+ customers</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Categories Section */}
//       <section className="py-12 sm:py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-8 sm:mb-12">
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
//               Shop by Category
//             </h2>
//             <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
//               Explore our wide range of healthcare products categorized by your specific needs
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//             {categories.map((cat) => (
//               <Link
//                 key={cat.slug}
//                 href={`/categories/${cat.slug}`}
//                 className={`${cat.color} p-4 sm:p-6 rounded-xl hover:shadow-lg transition-all duration-300 group transform hover:-translate-y-1`}
//               >
//                 <div className="flex items-center gap-3 sm:gap-4">
//                   <div className={`text-4xl sm:text-5xl ${cat.textColor}`}>{cat.icon}</div>
//                   <div>
//                     <h3 className={`text-lg sm:text-xl font-bold ${cat.textColor} group-hover:underline`}>
//                       {cat.name}
//                     </h3>
//                     <p className="text-gray-600 text-xs sm:text-sm">{cat.description}</p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>

//           <div className="text-center mt-6 sm:mt-8">
//             <Link 
//               href="/products" 
//               className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 text-sm sm:text-base"
//             >
//               View All Categories <ArrowRight size={16} className="sm:w-4 sm:h-4" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Banner Section */}
//       <section className="py-10 sm:py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Special Offer!</h2>
//             <p className="text-lg sm:text-xl mb-4 sm:mb-6">Get up to 20% off on all nutritional supplements</p>
//             <Link 
//               href="/products?category=nutritional-supplements"
//               className="inline-block bg-white text-blue-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-base sm:text-lg"
//             >
//               Shop Now
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="py-12 sm:py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-3">
//             <div className="text-center sm:text-left">
//               <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Featured Products</h2>
//               <p className="text-gray-600 text-sm sm:text-base mt-1">Most popular products loved by our customers</p>
//             </div>
//             <Link 
//               href="/products" 
//               className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold text-sm sm:text-base"
//             >
//               View All <ArrowRight size={14} className="sm:w-4 sm:h-4" />
//             </Link>
//           </div>
//           <ProductGrid products={featuredProducts} />
//         </div>
//       </section>

//       {/* New Arrivals */}
//       <section className="py-12 sm:py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-3">
//             <div className="text-center sm:text-left">
//               <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">New Arrivals</h2>
//               <p className="text-gray-600 text-sm sm:text-base mt-1">Recently added products to our collection</p>
//             </div>
//             <Link 
//               href="/products" 
//               className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold text-sm sm:text-base"
//             >
//               View All <ArrowRight size={14} className="sm:w-4 sm:h-4" />
//             </Link>
//           </div>
//           <ProductGrid products={newArrivals} />
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="py-12 sm:py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
//             {/* LEFT CONTENT */}
//             <div>
//               <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
//                 About <span className="text-blue-600">Glance Healthcare</span>
//               </h2>
//               <div className="w-16 sm:w-20 h-1 bg-blue-600 mb-5 sm:mb-6"></div>
//               <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
//                 Glance Healthcare is a fast-growing pharmaceutical and healthcare company committed to improving lives through high-quality, innovative, and affordable healthcare solutions.
//               </p>
//               <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
//                 With a strong focus on patient well-being, we specialize in developing and delivering a wide range of pharmaceutical products, nutraceuticals, and pediatric formulations.
//               </p>
//               <p className="text-gray-600 text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed">
//                 Our organization is built on the principles of quality, trust, and care. We work with advanced manufacturing facilities that follow WHO-GMP and ISO standards, ensuring that every product meets the highest safety and efficacy benchmarks.
//               </p>
//               <div className="flex gap-3 sm:gap-4">
//                 <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md flex-1 text-center">
//                   <p className="text-xl sm:text-2xl font-bold text-blue-600">50+</p>
//                   <p className="text-xs text-gray-600">Products</p>
//                 </div>
//                 <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md flex-1 text-center">
//                   <p className="text-xl sm:text-2xl font-bold text-blue-600">10k+</p>
//                   <p className="text-xs text-gray-600">Happy Customers</p>
//                 </div>
//                 <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md flex-1 text-center">
//                   <p className="text-xl sm:text-2xl font-bold text-blue-600">100+</p>
//                   <p className="text-xs text-gray-600">Cities</p>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT IMAGES */}
//             <div className="grid grid-cols-1 gap-4 sm:gap-5">
//               <img
//                 src="/images/medicines/med.jpg"
//                 alt="Medical professional"
//                 className="rounded-xl sm:rounded-2xl h-[200px] sm:h-[250px] md:h-[280px] w-full object-cover shadow-lg"
//               />
//               <img
//                 src="/images/medicines/me.jpg"
//                 alt="Medical research"
//                 className="rounded-xl sm:rounded-2xl h-[200px] sm:h-[250px] md:h-[280px] w-full object-cover shadow-lg"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-12 sm:py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-8 sm:mb-12">
//             <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">What Our Customers Say</h2>
//             <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
//               Trusted by thousands of happy customers across India
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="bg-white rounded-xl shadow-md p-5 sm:p-6 hover:shadow-lg transition">
//                 <div className="flex items-center gap-1 mb-3 sm:mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} size={16} className="sm:w-[18px] sm:h-[18px] fill-yellow-400 text-yellow-400" />
//                   ))}
//                 </div>
//                 <p className="text-gray-600 text-sm sm:text-base italic mb-3 sm:mb-4">"{testimonial.content}"</p>
//                 <div className="border-t pt-3 sm:pt-4">
//                   <p className="font-semibold text-gray-800 text-sm sm:text-base">{testimonial.name}</p>
//                   <p className="text-xs text-gray-500">{testimonial.role}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Quality Commitment Section */}
//       <section className="py-12 sm:py-16 bg-blue-900 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Our Quality Commitment</h2>
//           <p className="text-base sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
//             At Glance Healthcare, quality is our top priority. Every product undergoes strict quality control and complies with national and international healthcare standards.
//           </p>
//           <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
//             <span className="bg-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">✓ WHO-GMP Certified</span>
//             <span className="bg-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">✓ ISO 9001:2015</span>
//             <span className="bg-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">✓ FSSAI Approved</span>
//             <span className="bg-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">✓ GMP Compliant</span>
//           </div>
//         </div>
//       </section>

//       {/* Newsletter Section */}
//       <section className="py-12 sm:py-16 bg-gray-100">
//         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">Subscribe to Our Newsletter</h2>
//           <p className="text-gray-600 text-sm sm:text-base mb-5 sm:mb-6">
//             Get the latest updates on new products, health tips, and exclusive offers
//           </p>
//           <form className="flex flex-col sm:flex-row gap-3 sm:gap-4">
//             <input
//               type="email"
//               placeholder="Enter your email address"
//               className="flex-1 px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
//               required
//             />
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
//             >
//               Subscribe Now
//             </button>
//           </form>
//           <p className="text-xs text-gray-500 mt-3 sm:mt-4">
//             We respect your privacy. Unsubscribe at any time.
//           </p>
//         </div>
//       </section>

//       {/* Trust Badges */}
//       <section className="py-10 sm:py-12 bg-white border-t">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 text-center">
//             <div>
//               <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🏆</div>
//               <p className="font-semibold text-gray-800 text-sm sm:text-base">Award Winning</p>
//               <p className="text-xs text-gray-500">Best Brand 2024</p>
//             </div>
//             <div>
//               <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🔬</div>
//               <p className="font-semibold text-gray-800 text-sm sm:text-base">Scientific Research</p>
//               <p className="text-xs text-gray-500">Evidence-based</p>
//             </div>
//             <div>
//               <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">💚</div>
//               <p className="font-semibold text-gray-800 text-sm sm:text-base">Customer First</p>
//               <p className="text-xs text-gray-500">24/7 support</p>
//             </div>
//             <div>
//               <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🚚</div>
//               <p className="font-semibold text-gray-800 text-sm sm:text-base">Fast Shipping</p>
//               <p className="text-xs text-gray-500">Trackable delivery</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProductGrid from '@/components/product/ProductGrid';
import { Product } from '@/types';
import { api } from '@/lib/api';
import { ArrowRight, Shield, Truck, Clock, Award, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  // Fetch products from API
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
              } catch (e) {
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

          setProducts(adaptedProducts);
          setFeaturedProducts(adaptedProducts.slice(0, 8));
          setNewArrivals(adaptedProducts.slice(4, 12));
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Hero section slideshow images
  const slides = [
    { id: 1, image: "/images/medicines/medi.jpg", alt: "Healthcare Products" },
    { id: 2, image: "/images/medicines/med.jpg", alt: "Medical Professional" },
    { id: 3, image: "/images/medicines/me.jpg", alt: "Medical Research" }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const categories = [
    { name: 'Neurological Support', slug: 'neurological-support', icon: '🧠', description: 'Brain & nerve health', color: 'bg-purple-100', textColor: 'text-purple-600' },
    { name: 'Probiotics & Digestion', slug: 'probiotics-digestion', icon: '🌿', description: 'Gut health & immunity', color: 'bg-green-100', textColor: 'text-green-600' },
    { name: 'Vitamin Supplements', slug: 'vitamin-supplements', icon: '💊', description: 'Essential nutrients', color: 'bg-blue-100', textColor: 'text-blue-600' },
    { name: 'Sleep Support', slug: 'sleep-support', icon: '😴', description: 'Restful sleep solutions', color: 'bg-indigo-100', textColor: 'text-indigo-600' },
    { name: 'Women Health', slug: 'women-reproductive-health', icon: '🌸', description: 'Reproductive wellness', color: 'bg-pink-100', textColor: 'text-pink-600' },
    { name: 'Nutritional Supplements', slug: 'nutritional-supplements', icon: '🍎', description: 'Complete nutrition', color: 'bg-orange-100', textColor: 'text-orange-600' }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Mother of 2-year old',
      content: 'Brain Zen Drops have made a noticeable difference in my child\'s focus and development. Highly recommend Glance Healthcare products!',
      rating: 5
    },
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Pediatrician',
      content: 'I recommend AVERION syrup to my patients with cerebral folate deficiency. The results have been excellent and parents are very satisfied.',
      rating: 5
    },
    {
      name: 'Sneha Patel',
      role: 'Fertility Patient',
      content: 'CARE-MYO sachets helped regulate my cycles. After 3 months of use, I conceived naturally. Thank you Glance Healthcare!',
      rating: 5
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="overflow-x-hidden">
      {/* ================= HERO SECTION WITH SLIDESHOW ================= */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white overflow-hidden">
        {/* Slideshow Background Images */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-40"></div>
            </div>
          ))}
        </div>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-30"></div>

        {/* Slide Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 rounded-full p-2 sm:p-3 transition-all duration-300 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 rounded-full p-2 sm:p-3 transition-all duration-300 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${index === currentSlide
                  ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-white'
                  : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/80'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            {/* LEFT CONTENT */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Premium Pediatric, Neurological & Women Nutritional Supplements
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-blue-100 px-4 sm:px-0">
                Trusted healthcare solutions for your family. WHO-GMP certified products for better health and wellness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg text-base sm:text-lg"
                >
                  Shop Now <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                </Link>
                <Link
                  href="/categories/neurological-support"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition text-base sm:text-lg"
                >
                  Explore Categories
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE - Hero product showcase */}
            <div className="hidden lg:block">
              <img
                src="/images/medicines/medi.jpg"
                alt="Healthcare Products"
                className="rounded-2xl shadow-2xl w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[500px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0 hidden sm:block z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f9fafb" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,186.7C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/918919996196"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 group"
      >
        <div className="bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 sm:gap-3">
          <span className="text-xl sm:text-2xl">💬</span>
          <span className="hidden group-hover:block whitespace-nowrap font-medium text-sm sm:text-base">
            Chat on WhatsApp
          </span>
        </div>
      </a>

      {/* Features Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex flex-col items-center text-center p-2">
              <div className="bg-blue-100 rounded-full p-2 sm:p-3 mb-2 sm:mb-3">
                <Shield className="text-blue-600 w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">WHO-GMP Certified</h3>
              <p className="text-xs text-gray-500">Highest standards</p>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <div className="bg-green-100 rounded-full p-2 sm:p-3 mb-2 sm:mb-3">
                <Truck className="text-green-600 w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Free Shipping</h3>
              <p className="text-xs text-gray-500">Above ₹500</p>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <div className="bg-orange-100 rounded-full p-2 sm:p-3 mb-2 sm:mb-3">
                <Clock className="text-orange-600 w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Quick Delivery</h3>
              <p className="text-xs text-gray-500">Pan India</p>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <div className="bg-purple-100 rounded-full p-2 sm:p-3 mb-2 sm:mb-3">
                <Award className="text-purple-600 w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Trusted Brand</h3>
              <p className="text-xs text-gray-500">10k+ customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
              Explore our wide range of healthcare products categorized by your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className={`${cat.color} p-4 sm:p-6 rounded-xl hover:shadow-lg transition-all duration-300 group transform hover:-translate-y-1`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`text-4xl sm:text-5xl ${cat.textColor}`}>{cat.icon}</div>
                  <div>
                    <h3 className={`text-lg sm:text-xl font-bold ${cat.textColor} group-hover:underline`}>
                      {cat.name}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">{cat.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 text-sm sm:text-base"
            >
              View All Categories <ArrowRight size={16} className="sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-10 sm:py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Special Offer!</h2>
          <p className="text-lg sm:text-xl mb-4 sm:mb-6">Get up to 20% off on all nutritional supplements</p>
          <Link
            href="/products?category=nutritional-supplements"
            className="inline-block bg-white text-blue-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-base sm:text-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-3">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Featured Products</h2>
              <p className="text-gray-600 text-sm sm:text-base mt-1">Most popular products loved by our customers</p>
            </div>
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold text-sm sm:text-base"
            >
              View All <ArrowRight size={14} className="sm:w-4 sm:h-4" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-3">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">New Arrivals</h2>
              <p className="text-gray-600 text-sm sm:text-base mt-1">Recently added products to our collection</p>
            </div>
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold text-sm sm:text-base"
            >
              View All <ArrowRight size={14} className="sm:w-4 sm:h-4" />
            </Link>
          </div>
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* LEFT CONTENT */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                About <span className="text-blue-600">Glance Healthcare</span>
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-blue-600 mb-5 sm:mb-6"></div>
              <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
                Glance Healthcare is a fast-growing pharmaceutical and healthcare company committed to improving lives through high-quality, innovative, and affordable healthcare solutions.
              </p>
              <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
                With a strong focus on patient well-being, we specialize in developing and delivering a wide range of pharmaceutical products, nutraceuticals, and pediatric formulations.
              </p>
              <p className="text-gray-600 text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed">
                Our organization is built on the principles of quality, trust, and care. We work with advanced manufacturing facilities that follow WHO-GMP and ISO standards, ensuring that every product meets the highest safety and efficacy benchmarks.
              </p>
              <div className="flex gap-3 sm:gap-4">
                <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md flex-1 text-center">
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">50+</p>
                  <p className="text-xs text-gray-600">Products</p>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md flex-1 text-center">
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">10k+</p>
                  <p className="text-xs text-gray-600">Happy Customers</p>
                </div>
                <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md flex-1 text-center">
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">100+</p>
                  <p className="text-xs text-gray-600">Cities</p>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGES */}
            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              <img
                src="/images/medicines/med.jpg"
                alt="Medical professional"
                className="rounded-xl sm:rounded-2xl h-[200px] sm:h-[250px] md:h-[280px] w-full object-cover shadow-lg"
              />
              <img
                src="/images/medicines/me.jpg"
                alt="Medical research"
                className="rounded-xl sm:rounded-2xl h-[200px] sm:h-[250px] md:h-[280px] w-full object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">What Our Customers Say</h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Trusted by thousands of happy customers across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-5 sm:p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-1 mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="sm:w-[18px] sm:h-[18px] fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm sm:text-base italic mb-3 sm:mb-4">"{testimonial.content}"</p>
                <div className="border-t pt-3 sm:pt-4">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitment Section */}
      <section className="py-12 sm:py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Our Quality Commitment</h2>
          <p className="text-base sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            At Glance Healthcare, quality is our top priority. Every product undergoes strict quality control and complies with national and international healthcare standards.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <span className="bg-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">✓ WHO-GMP Certified</span>
            <span className="bg-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">✓ ISO 9001:2015</span>
            <span className="bg-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">✓ FSSAI Approved</span>
            <span className="bg-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">✓ GMP Compliant</span>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 bg-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-5 sm:mb-6">
            Get the latest updates on new products, health tips, and exclusive offers
          </p>
          <form className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
            >
              Subscribe Now
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-3 sm:mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-10 sm:py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🏆</div>
              <p className="font-semibold text-gray-800 text-sm sm:text-base">Award Winning</p>
              <p className="text-xs text-gray-500">Best Brand 2024</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🔬</div>
              <p className="font-semibold text-gray-800 text-sm sm:text-base">Scientific Research</p>
              <p className="text-xs text-gray-500">Evidence-based</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">💚</div>
              <p className="font-semibold text-gray-800 text-sm sm:text-base">Customer First</p>
              <p className="text-xs text-gray-500">24/7 support</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🚚</div>
              <p className="font-semibold text-gray-800 text-sm sm:text-base">Fast Shipping</p>
              <p className="text-xs text-gray-500">Trackable delivery</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
