// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useCartStore } from '@/store/cartStore';
// import Link from 'next/link';

// export default function CheckoutPage() {
//   const router = useRouter();
//   const { items, getTotalPrice, clearCart } = useCartStore();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);
  
//   const subtotal = getTotalPrice();
//   const shipping = subtotal > 500 ? 0 : 50;
//   const total = subtotal + shipping;
  
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: '',
//     paymentMethod: 'cod'
//   });
  
//   useEffect(() => {
//     if (mounted && items.length === 0) {
//       router.push('/cart');
//     }
//   }, [mounted, items.length, router]);

//   if (!mounted) return null;

//   if (items.length === 0) {
//     return null;
//   }
  
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsProcessing(true);
    
//     // Simulate order processing
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     // Clear cart and redirect to success page
//     clearCart();
//     router.push('/order-success');
//   };
  
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Checkout Form */}
//         <div className="lg:col-span-2">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="bg-white rounded-lg shadow p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Information</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
//                   <input
//                     type="text"
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     value={formData.fullName}
//                     onChange={(e) => setFormData({...formData, fullName: e.target.value})}
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
//                   <input
//                     type="email"
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     value={formData.email}
//                     onChange={(e) => setFormData({...formData, email: e.target.value})}
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
//                   <input
//                     type="tel"
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     value={formData.phone}
//                     onChange={(e) => setFormData({...formData, phone: e.target.value})}
//                   />
//                 </div>
                
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
//                   <input
//                     type="text"
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     value={formData.address}
//                     onChange={(e) => setFormData({...formData, address: e.target.value})}
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
//                   <input
//                     type="text"
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     value={formData.city}
//                     onChange={(e) => setFormData({...formData, city: e.target.value})}
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
//                   <input
//                     type="text"
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     value={formData.state}
//                     onChange={(e) => setFormData({...formData, state: e.target.value})}
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
//                   <input
//                     type="text"
//                     required
//                     pattern="[0-9]{6}"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                     value={formData.pincode}
//                     onChange={(e) => setFormData({...formData, pincode: e.target.value})}
//                   />
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-lg shadow p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>
              
//               <div className="space-y-3">
//                 <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="cod"
//                     checked={formData.paymentMethod === 'cod'}
//                     onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
//                     className="w-4 h-4"
//                   />
//                   <div>
//                     <p className="font-semibold">Cash on Delivery</p>
//                     <p className="text-sm text-gray-500">Pay when you receive the order</p>
//                   </div>
//                 </label>
                
//                 <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="online"
//                     checked={formData.paymentMethod === 'online'}
//                     onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
//                     className="w-4 h-4"
//                   />
//                   <div>
//                     <p className="font-semibold">Online Payment</p>
//                     <p className="text-sm text-gray-500">Credit/Debit Card, UPI, Net Banking</p>
//                   </div>
//                 </label>
//               </div>
//             </div>
            
//             <button
//               type="submit"
//               disabled={isProcessing}
//               className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
//             >
//               {isProcessing ? 'Processing...' : `Place Order (₹${total})`}
//             </button>
//           </form>
//         </div>
        
//         {/* Order Summary */}
//         <div className="lg:col-span-1">
//           <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Your Order</h2>
            
//             <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
//               {items.map((item) => (
//                 <div key={item.id} className="flex justify-between text-sm">
//                   <span>{item.name} x {item.quantity}</span>
//                   <span>₹{item.price * item.quantity}</span>
//                 </div>
//               ))}
//             </div>
            
//             <div className="border-t pt-3 space-y-2">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Subtotal</span>
//                 <span>₹{subtotal}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Shipping</span>
//                 <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
//               </div>
//               <div className="border-t pt-2 flex justify-between font-bold">
//                 <span>Total</span>
//                 <span>₹{total}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { token, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [error, setError] = useState('');

  const subtotal = getTotalPrice();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/account');
    }
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [isAuthenticated, items, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!shippingAddress.trim()) {
      setError('Please enter shipping address');
      setLoading(false);
      return;
    }

    const orderData = {
      items: items.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      })),
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
      notes: ''
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
        clearCart();
        router.push(`/order-success?order=${data.data.order_number}`);
      } else {
        setError(data.message || 'Failed to place order');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Shipping Address *</label>
              <textarea
                required
                rows={3}
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full address"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="cod">Cash on Delivery</option>
                <option value="online">Online Payment</option>
              </select>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4 max-h-96 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}