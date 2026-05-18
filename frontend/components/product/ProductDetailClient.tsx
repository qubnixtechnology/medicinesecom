// 'use client';

// import Image from 'next/image';
// import { useState } from 'react';
// import { useCartStore } from '@/store/cartStore';
// import ProductGrid from '@/components/product/ProductGrid';
// import { Shield, Truck, Clock, Check } from 'lucide-react';
// import { Product } from '@/types';

// interface ProductDetailClientProps {
//   product: Product;
//   relatedProducts: Product[];
// }

// export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
//   const [quantity, setQuantity] = useState(1);
//   const addItem = useCartStore((state) => state.addItem);
  
//   const handleAddToCart = () => {
//     addItem(product, quantity);
//   };
  
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Product Main Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//         {/* Product Image */}
//         <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
//           {product.images && product.images[0] ? (
//             <Image
//               src={product.images[0]}
//               alt={product.name}
//               width={400}
//               height={400}
//               className="object-contain"
//             />
//           ) : (
//             <div className="text-gray-400">No Image Available</div>
//           )}
//         </div>
        
//         {/* Product Info */}
//         <div>
//           <div className="flex items-center gap-2 mb-2">
//             <span className="text-sm text-blue-600">{product.brand}</span>
//             {product.isPrescriptionRequired && (
//               <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">Prescription Required</span>
//             )}
//           </div>
          
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          
//           <div className="flex items-center gap-2 mb-4">
//             <div className="flex text-yellow-400">
//               {'★'.repeat(Math.floor(product.rating))}
//               {'☆'.repeat(5 - Math.floor(product.rating))}
//             </div>
//             <span className="text-gray-600">{product.rating} ({product.reviews} reviews)</span>
//           </div>
          
//           <div className="flex items-center gap-2 mb-4">
//             <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
//             {product.originalPrice && (
//               <>
//                 <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
//                 <span className="text-green-600 font-semibold">-{product.discount}%</span>
//               </>
//             )}
//           </div>
          
//           {product.volume && (
//             <p className="text-gray-600 mb-4">Size: {product.volume}</p>
//           )}
          
//           <p className="text-gray-600 mb-6">{product.description}</p>
          
//           {/* Quantity Selector */}
//           <div className="flex items-center gap-4 mb-6">
//             <div className="flex items-center border rounded-lg">
//               <button
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 className="px-3 py-2 border-r hover:bg-gray-100"
//               >
//                 -
//               </button>
//               <span className="px-4 py-2">{quantity}</span>
//               <button
//                 onClick={() => setQuantity(quantity + 1)}
//                 className="px-3 py-2 border-l hover:bg-gray-100"
//               >
//                 +
//               </button>
//             </div>
//             <button
//               onClick={handleAddToCart}
//               className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
//             >
//               Add to Cart
//             </button>
//           </div>
          
//           {/* Delivery Info */}
//           <div className="border-t pt-4 space-y-2">
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <Truck size={16} /> Free delivery on orders above ₹500
//             </div>
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <Clock size={16} /> Usually delivers in 3-5 days
//             </div>
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <Shield size={16} /> Authentic products guaranteed
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Product Details Tabs */}
//       <div className="border-t pt-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Benefits */}
//           <div className="md:col-span-2">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Key Benefits</h2>
//             <ul className="space-y-2">
//               {product.benefits.map((benefit, index) => (
//                 <li key={index} className="flex items-start gap-2">
//                   <Check size={18} className="text-green-600 mt-0.5" />
//                   <span className="text-gray-600">{benefit}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
          
//           {/* Product Details */}
//           <div className="bg-gray-50 p-6 rounded-lg">
//             <h3 className="font-semibold text-gray-800 mb-3">Product Details</h3>
//             {product.composition && (
//               <div className="mb-3">
//                 <p className="text-sm text-gray-500">Composition:</p>
//                 <p className="text-sm text-gray-700">{product.composition}</p>
//               </div>
//             )}
//             {product.dosage && (
//               <div className="mb-3">
//                 <p className="text-sm text-gray-500">Dosage:</p>
//                 <p className="text-sm text-gray-700">{product.dosage}</p>
//               </div>
//             )}
//             {product.flavour && (
//               <div className="mb-3">
//                 <p className="text-sm text-gray-500">Flavour:</p>
//                 <p className="text-sm text-gray-700">{product.flavour}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
      
//       {/* Related Products */}
//       {relatedProducts.length > 0 && (
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
//           <ProductGrid products={relatedProducts} />
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import ProductGrid from '@/components/product/ProductGrid';
import { Shield, Truck, Clock, Check, Minus, Plus, Heart, Share2 } from 'lucide-react';
import { Product } from '@/types';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  
  // ✅ CORRECT WAY - Call addItem with product and quantity
  const handleAddToCart = () => {
    addItem(product, quantity);
  };
  
  // Get image URL with fallback
  const imageUrl = product.images?.[selectedImage] || '/images/placeholder.jpg';
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Rest of your JSX remains the same */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image Section */}
        <div>
          <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center min-h-[400px] mb-4">
            <img
              src={imageUrl}
              alt={product.name}
              className="object-contain max-h-80 w-auto"
              onError={(e) => {
                e.currentTarget.src = '/images/placeholder.jpg';
              }}
            />
          </div>
          {/* Thumbnail images if multiple */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 border rounded-lg overflow-hidden ${
                    selectedImage === idx ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            {product.brand && (
              <span className="text-sm text-blue-600 font-medium">{product.brand}</span>
            )}
            {product.isPrescriptionRequired && (
              <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">Prescription Required</span>
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          
          {product.volume && (
            <p className="text-gray-500 text-sm mb-2">{product.volume}</p>
          )}
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="text-gray-600 text-sm">{product.rating} ({product.reviews} reviews)</span>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                <span className="text-green-600 font-semibold">-{product.discount}%</span>
              </>
            )}
          </div>
          
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
          
          {/* Stock Status */}
          <div className="mb-4">
            {product.inStock ? (
              <span className="text-green-600 text-sm flex items-center gap-1">
                <Check size={16} /> In Stock
              </span>
            ) : (
              <span className="text-red-600 text-sm">Out of Stock</span>
            )}
          </div>
          
          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 border-r hover:bg-gray-100"
                disabled={!product.inStock}
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-2 min-w-[50px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 border-l hover:bg-gray-100"
                disabled={!product.inStock}
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
            <button className="p-3 border rounded-lg hover:bg-gray-50 transition">
              <Heart size={20} className="text-gray-600" />
            </button>
          </div>
          
          {/* Delivery Info */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck size={16} /> Free delivery on orders above ₹500
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} /> Usually delivers in 3-5 business days
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield size={16} /> 100% authentic products guaranteed
            </div>
          </div>
        </div>
      </div>
      
      {/* Rest of your component (benefits, related products, etc.) */}
      <div className="border-t pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Key Benefits</h2>
            <ul className="space-y-2">
              {product.benefits && product.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Product Information</h3>
            <div className="space-y-3">
              {product.composition && (
                <div>
                  <p className="text-sm text-gray-500 font-medium">Composition:</p>
                  <p className="text-sm text-gray-700">{product.composition}</p>
                </div>
              )}
              {product.dosage && (
                <div>
                  <p className="text-sm text-gray-500 font-medium">Dosage:</p>
                  <p className="text-sm text-gray-700">{product.dosage}</p>
                </div>
              )}
              {product.volume && (
                <div>
                  <p className="text-sm text-gray-500 font-medium">Pack Size:</p>
                  <p className="text-sm text-gray-700">{product.volume}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">You May Also Like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
}