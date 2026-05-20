// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { Product } from '@/types';

// interface WishlistStore {
//   items: Product[];
//   addItem: (product: Product) => void;
//   removeItem: (productId: string) => void;
//   toggleItem: (product: Product) => void;
//   isInWishlist: (productId: string) => boolean;
//   clearWishlist: () => void;
//   getTotalItems: () => number;
// }

// export const useWishlistStore = create<WishlistStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       addItem: (product) => {
//         const exists = get().items.find(item => item.id === product.id);
//         if (!exists) {
//           set({ items: [...get().items, product] });
//         }
//       },
//       removeItem: (productId) => {
//         set({ items: get().items.filter(item => item.id !== productId) });
//       },
//       toggleItem: (product) => {
//         const exists = get().items.find(item => item.id === product.id);
//         if (exists) {
//           set({ items: get().items.filter(item => item.id !== product.id) });
//         } else {
//           set({ items: [...get().items, product] });
//         }
//       },
//       isInWishlist: (productId) => {
//         return !!get().items.find(item => item.id === productId);
//       },
//       clearWishlist: () => set({ items: [] }),
//       getTotalItems: () => get().items.length,
//     }),
//     {
//       name: 'wishlist-storage',
//     }
//   )
// );

// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { Product } from '@/types';

// interface WishlistStore {
//   items: Product[];
//   toggleItem: (product: Product) => void;
//   isInWishlist: (id: number) => boolean;
//   getTotalItems: () => number;
// }

// export const useWishlistStore = create<WishlistStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
      
//       toggleItem: (product) => {
//         const { items } = get();
//         const exists = items.some(item => item.id === product.id);
        
//         if (exists) {
//           set({ items: items.filter(item => item.id !== product.id) });
//         } else {
//           set({ items: [...items, product] });
//         }
//       },
      
//       isInWishlist: (id) => {
//         return get().items.some(item => item.id === id);
//       },
      
//       getTotalItems: () => {
//         return get().items.length;
//       }
//     }),
//     {
//       name: 'wishlist-storage'
//     }
//   )
// );

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface WishlistStore {
  items: Product[];
  toggleItem: (product: Product) => void;
  addItem: (product: Product) => void;
  removeItem: (id: number | string) => void;
  isInWishlist: (id: number | string) => boolean;
  getTotalItems: () => number;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      toggleItem: (product) => {
        const { items } = get();
        const exists = items.some(item => item.id === product.id);
        
        if (exists) {
          set({ items: items.filter(item => item.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },
      
      addItem: (product) => {
        const { items } = get();
        const exists = items.some(item => item.id === product.id);
        
        if (!exists) {
          set({ items: [...items, product] });
        }
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter(item => item.id !== id) });
      },
      
      isInWishlist: (id) => {
        return get().items.some(item => item.id === id);
      },
      
      getTotalItems: () => {
        return get().items.length;
      },
      
      clearWishlist: () => {
        set({ items: [] });
      }
    }),
    {
      name: 'wishlist-storage'
    }
  )
);