// // import { create } from 'zustand';
// // import { persist } from 'zustand/middleware';
// // import { Product, CartItem } from '@/types';

// // interface CartStore {
// //   items: CartItem[];
// //   addItem: (product: Product, quantity?: number) => void;
// //   removeItem: (productId: string) => void;
// //   updateQuantity: (productId: string, quantity: number) => void;
// //   clearCart: () => void;
// //   getTotalPrice: () => number;
// //   getTotalItems: () => number;
// // }

// // export const useCartStore = create<CartStore>()(
// //   persist(
// //     (set, get) => ({
// //       items: [],
// //       addItem: (product, quantity = 1) => {
// //         const items = get().items;
// //         const existingItem = items.find(item => item.id === product.id);
        
// //         if (existingItem) {
// //           set({
// //             items: items.map(item =>
// //               item.id === product.id
// //                 ? { ...item, quantity: item.quantity + quantity }
// //                 : item
// //             )
// //           });
// //         } else {
// //           set({ items: [...items, { ...product, quantity }] });
// //         }
// //       },
// //       removeItem: (productId) => {
// //         set({ items: get().items.filter(item => item.id !== productId) });
// //       },
// //       updateQuantity: (productId, quantity) => {
// //         if (quantity <= 0) {
// //           get().removeItem(productId);
// //           return;
// //         }
// //         set({
// //           items: get().items.map(item =>
// //             item.id === productId ? { ...item, quantity } : item
// //           )
// //         });
// //       },
// //       clearCart: () => set({ items: [] }),
// //       getTotalPrice: () => {
// //         return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
// //       },
// //       getTotalItems: () => {
// //         return get().items.reduce((total, item) => total + item.quantity, 0);
// //       }
// //     }),
// //     {
// //       name: 'cart-storage'
// //     }
// //   )
// // );

// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { api } from '@/lib/api';

// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   images?: string[];
//   volume?: string;
// }

// interface CartStore {
//   items: CartItem[];
//   addItem: (item: CartItem) => void;
//   removeItem: (id: number) => void;
//   updateQuantity: (id: number, quantity: number) => void;
//   clearCart: () => void;
//   getTotalPrice: () => number;
//   getTotalItems: () => number;
//   checkout: (token: string, shippingAddress: string, paymentMethod?: string) => Promise<any>;
// }

// export const useCartStore = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
      
//       addItem: (item) => {
//         const { items } = get();
//         const existingItem = items.find(i => i.id === item.id);
        
//         if (existingItem) {
//           set({
//             items: items.map(i =>
//               i.id === item.id
//                 ? { ...i, quantity: i.quantity + item.quantity }
//                 : i
//             )
//           });
//         } else {
//           set({ items: [...items, item] });
//         }
//       },
      
//       removeItem: (id) => {
//         set({ items: get().items.filter(i => i.id !== id) });
//       },
      
//       updateQuantity: (id, quantity) => {
//         if (quantity <= 0) {
//           get().removeItem(id);
//         } else {
//           set({
//             items: get().items.map(i =>
//               i.id === id ? { ...i, quantity } : i
//             )
//           });
//         }
//       },
      
//       clearCart: () => set({ items: [] }),
      
//       getTotalPrice: () => {
//         return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
//       },
      
//       getTotalItems: () => {
//         return get().items.reduce((total, item) => total + item.quantity, 0);
//       },
      
//       checkout: async (token, shippingAddress, paymentMethod = 'cod') => {
//         const items = get().items;
//         const orderData = {
//           items: items.map(item => ({
//             product_id: item.id,
//             quantity: item.quantity
//           })),
//           shipping_address: shippingAddress,
//           payment_method: paymentMethod
//         };
        
//         const response = await api.orders.create(orderData, token);
//         const data = await response.json();
        
//         if (response.ok && data.success) {
//           get().clearCart();
//           return data.data;
//         } else {
//           throw new Error(data.message || 'Checkout failed');
//         }
//       }
//     }),
//     {
//       name: 'cart-storage',
//     }
//   )
// );

// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { CartItem, Product } from '@/types';

// interface CartStore {
//   items: CartItem[];
//   addItem: (product: Product, quantity?: number) => void;
//   removeItem: (id: number) => void;
//   updateQuantity: (id: number, quantity: number) => void;
//   clearCart: () => void;
//   getTotalPrice: () => number;
//   getTotalItems: () => number;
// }

// export const useCartStore = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
      
//       addItem: (product, quantity = 1) => {
//         const { items } = get();
//         const existingItem = items.find(item => item.id === product.id);
        
//         if (existingItem) {
//           set({
//             items: items.map(item =>
//               item.id === product.id
//                 ? { ...item, quantity: item.quantity + quantity }
//                 : item
//             )
//           });
//         } else {
//           set({
//             items: [...items, { ...product, quantity }]
//           });
//         }
        
//         // Optional: Show feedback
//         console.log(`Added ${quantity} x ${product.name} to cart`);
//       },
      
//       removeItem: (id) => {
//         set({ items: get().items.filter(item => item.id !== id) });
//       },
      
//       updateQuantity: (id, quantity) => {
//         if (quantity <= 0) {
//           get().removeItem(id);
//         } else {
//           set({
//             items: get().items.map(item =>
//               item.id === id ? { ...item, quantity } : item
//             )
//           });
//         }
//       },
      
//       clearCart: () => set({ items: [] }),
      
//       getTotalPrice: () => {
//         return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
//       },
      
//       getTotalItems: () => {
//         return get().items.reduce((total, item) => total + item.quantity, 0);
//       }
//     }),
//     {
//       name: 'cart-storage'
//     }
//   )
// );

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  checkout: (token: string, shippingAddress: string, paymentMethod?: string) => Promise<{ success: boolean; order?: any; error?: string }>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.id === product.id);
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({
            items: [...items, { ...product, quantity }]
          });
        }
        
        console.log(`Added ${quantity} x ${product.name} to cart`);
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter(item => item.id !== id) });
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
        } else {
          set({
            items: get().items.map(item =>
              item.id === id ? { ...item, quantity } : item
            )
          });
        }
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      // Checkout function - sends order to backend
      checkout: async (token: string, shippingAddress: string, paymentMethod: string = 'cod') => {
        const { items, getTotalPrice } = get();
        
        if (items.length === 0) {
          return { success: false, error: 'Cart is empty' };
        }

        const orderData = {
          items: items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            price: item.price
          })),
          shipping_address: shippingAddress,
          payment_method: paymentMethod,
          total: getTotalPrice()
        };
        
        try {
          const response = await fetch('http://localhost:8080/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
          });
          
          const data = await response.json();
          
          if (response.ok && data.success) {
            // Clear cart on successful order
            get().clearCart();
            return { success: true, order: data.data };
          } else {
            return { success: false, error: data.message || 'Checkout failed' };
          }
        } catch (error) {
          console.error('Checkout error:', error);
          return { success: false, error: 'Network error. Please try again.' };
        }
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);