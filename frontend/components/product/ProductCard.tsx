// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { Product } from '@/types';
// import { useCartStore } from '@/store/cartStore';
// import { useWishlistStore } from '@/store/wishlistStore';
// import { ShoppingCart, Star, Heart } from 'lucide-react';

// interface ProductCardProps {
//   product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   const addItem = useCartStore((state) => state.addItem);
//   const { toggleItem, isInWishlist } = useWishlistStore();
//   const wishlisted = isInWishlist(product.id);

//   return (
//     <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 relative group">
//       <Link href={`/products/${product.slug}`}>
//         <div className="relative h-48 bg-gray-100">
//           {product.images && product.images[0] ? (
//             <Image
//               src={product.images[0]}
//               alt={product.name}
//               fill
//               className="object-contain p-4"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400">
//               No Image
//             </div>
//           )}
//           {product.discount && (
//             <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
//               -{product.discount}%
//             </span>
//           )}
//           {product.isPrescriptionRequired && (
//             <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
//               Rx
//             </span>
//           )}
//         </div>
//       </Link>

//       {/* Wishlist Heart Button */}
//       <button
//         onClick={(e) => {
//           e.preventDefault();
//           toggleItem(product);
//         }}
//         title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
//         className={`absolute top-2 right-2 z-10 p-1.5 rounded-full shadow-sm transition-all duration-200
//           ${product.isPrescriptionRequired ? 'top-9' : 'top-2'}
//           ${wishlisted
//             ? 'bg-red-50 text-red-500'
//             : 'bg-white text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500'
//           }`}
//       >
//         <Heart
//           size={18}
//           fill={wishlisted ? 'currentColor' : 'none'}
//           strokeWidth={2}
//         />
//       </button>

//       <div className="p-4">
//         <Link href={`/products/${product.slug}`}>
//           <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition line-clamp-2">
//             {product.name}
//           </h3>
//         </Link>

//         <div className="flex items-center mt-1">
//           <div className="flex items-center text-yellow-400">
//             <Star size={14} fill="currentColor" />
//             <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
//           </div>
//           <span className="text-xs text-gray-400 ml-2">({product.reviews} reviews)</span>
//         </div>

//         <div className="mt-2 flex items-center gap-2">
//           <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
//           {product.originalPrice && (
//             <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
//           )}
//         </div>

//         <p className="text-xs text-gray-500 mt-1">{product.volume || ''}</p>

//         <button
//           onClick={() => addItem(product, 1)}
//           className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
//         >
//           <ShoppingCart size={16} />
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import Link from 'next/link';
// import { Product } from '@/types';
// import { useCartStore } from '@/store/cartStore';
// import { useWishlistStore } from '@/store/wishlistStore';
// import { ShoppingCart, Star, Heart } from 'lucide-react';
// import { useState } from 'react';

// interface ProductCardProps {
//   product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   const [isAdding, setIsAdding] = useState(false);
//   const addItem = useCartStore((state) => state.addItem);
//   const { toggleItem, isInWishlist } = useWishlistStore();
  
//   // Safe check for wishlist - convert id to number if needed
//   const wishlisted = isInWishlist ? isInWishlist(Number(product.id)) : false;
  
//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsAdding(true);
//     try {
//       addItem(product, 1);
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     } finally {
//       setIsAdding(false);
//     }
//   };
  
//   const handleWishlistToggle = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     toggleItem(product);
//   };
  
//   // Get image URL with fallback
//   const imageUrl = product.images?.[0] || '/images/placeholder.jpg';
  
//   return (
//     <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 relative group">
//       <Link href={`/products/${product.slug}`}>
//         <div className="relative h-48 bg-gray-100">
//           <img
//             src={imageUrl}
//             alt={product.name}
//             className="w-full h-full object-contain p-4"
//             onError={(e) => {
//               (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
//             }}
//           />
//           {product.discount && product.discount > 0 && (
//             <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
//               -{product.discount}%
//             </span>
//           )}
//           {product.isPrescriptionRequired && (
//             <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
//               Rx
//             </span>
//           )}
//         </div>
//       </Link>

//       {/* Wishlist Heart Button */}
//       <button
//         onClick={handleWishlistToggle}
//         title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
//         className={`absolute top-2 right-2 z-10 p-1.5 rounded-full shadow-sm transition-all duration-200
//           ${product.isPrescriptionRequired ? 'top-9' : 'top-2'}
//           ${wishlisted
//             ? 'bg-red-50 text-red-500'
//             : 'bg-white text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500'
//           }`}
//       >
//         <Heart
//           size={18}
//           fill={wishlisted ? 'currentColor' : 'none'}
//           strokeWidth={2}
//         />
//       </button>

//       <div className="p-4">
//         <Link href={`/products/${product.slug}`}>
//           <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition line-clamp-2 min-h-[48px]">
//             {product.name}
//           </h3>
//         </Link>

//         <div className="flex items-center mt-1">
//           <div className="flex items-center text-yellow-400">
//             <Star size={14} fill="currentColor" />
//             <span className="text-xs text-gray-600 ml-1">{product.rating || 4.5}</span>
//           </div>
//           <span className="text-xs text-gray-400 ml-2">({product.reviews || 10} reviews)</span>
//         </div>

//         <div className="mt-2 flex items-center gap-2">
//           <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
//           {product.originalPrice && product.originalPrice > product.price && (
//             <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
//           )}
//         </div>

//         {product.volume && (
//           <p className="text-xs text-gray-500 mt-1">{product.volume}</p>
//         )}

//         <button
//           onClick={handleAddToCart}
//           disabled={isAdding || !product.inStock}
//           className={`mt-3 w-full py-2 rounded-lg transition flex items-center justify-center gap-2
//             ${product.inStock 
//               ? 'bg-blue-600 text-white hover:bg-blue-700' 
//               : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//             }
//           `}
//         >
//           <ShoppingCart size={16} />
//           {isAdding ? 'Adding...' : (!product.inStock ? 'Out of Stock' : 'Add to Cart')}
//         </button>
//       </div>
//     </div>
//   );
// }

'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [imgError, setImgError] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  
  const wishlisted = isInWishlist ? isInWishlist(Number(product.id)) : false;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    try {
      addItem(product, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };
  
  // Get image URL - FIXED: properly handle the images array
  let imageUrl = '/images/placeholder.jpg';
  if (product.images && product.images.length > 0 && !imgError) {
    imageUrl = product.images[0];
  }
  
  // Fallback if image fails to load
  const fallbackImage = `https://placehold.co/400x400/2563eb/white?text=${encodeURIComponent(product.name.substring(0, 15))}`;
  
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 relative group">
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-48 bg-gray-100">
          <img
            src={imgError ? fallbackImage : imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-4"
            onError={(e) => {
              console.log('Image failed to load:', imageUrl);
              setImgError(true);
              (e.target as HTMLImageElement).src = fallbackImage;
            }}
          />
          {product.discount && product.discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{product.discount}%
            </span>
          )}
          {product.isPrescriptionRequired && (
            <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
              Rx
            </span>
          )}
        </div>
      </Link>

      {/* Wishlist Heart Button */}
      {/* <button
        onClick={handleWishlistToggle}
        title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        className={`absolute top-2 right-2 z-10 p-1.5 rounded-full shadow-sm transition-all duration-200
          ${product.isPrescriptionRequired ? 'top-9' : 'top-2'}
          ${wishlisted
            ? 'bg-red-50 text-red-500'
            : 'bg-white text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500'
          }`}
      >
        <Heart
          size={18}
          fill={wishlisted ? 'currentColor' : 'none'}
          strokeWidth={2}
        />
      </button> */}

      {/* Wishlist Heart Button */}
<button
  onClick={handleWishlistToggle}
  title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
  className={`absolute top-2 right-2 z-10 p-1.5 rounded-full shadow-sm transition-all duration-200
    ${product.isPrescriptionRequired ? 'top-9' : 'top-2'}
  `}
>
  <Heart
    size={18}
    fill={wishlisted ? '#ef4444' : 'none'}
    stroke={wishlisted ? '#ef4444' : '#9ca3af'}
    strokeWidth={1.5}
    className={wishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500 transition-colors'}
  />
</button>

      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition line-clamp-2 min-h-[48px]">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mt-1">
          <div className="flex items-center text-yellow-400">
            <Star size={14} fill="currentColor" />
            <span className="text-xs text-gray-600 ml-1">{product.rating || 4.5}</span>
          </div>
          <span className="text-xs text-gray-400 ml-2">({product.reviews || 10} reviews)</span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
          )}
        </div>

        {product.volume && (
          <p className="text-xs text-gray-500 mt-1">{product.volume}</p>
        )}

        <button
          onClick={handleAddToCart}
          disabled={isAdding || !product.inStock}
          className={`mt-3 w-full py-2 rounded-lg transition flex items-center justify-center gap-2
            ${product.inStock 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          <ShoppingCart size={16} />
          {isAdding ? 'Adding...' : (!product.inStock ? 'Out of Stock' : 'Add to Cart')}
        </button>
      </div>
    </div>
  );
}