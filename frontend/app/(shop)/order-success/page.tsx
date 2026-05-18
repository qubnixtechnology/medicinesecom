'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={48} className="text-green-600" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
      <p className="text-gray-600 mb-8">
        Thank you for shopping with Glance Healthcare. Your order has been received and is being processed.
      </p>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="font-semibold text-gray-800 mb-2">What's Next?</h2>
        <ul className="text-gray-600 space-y-2">
          <li>📧 You will receive an order confirmation email shortly</li>
          <li>📱 We'll notify you via SMS when your order ships</li>
          <li>🚚 Delivery typically takes 3-5 business days</li>
          <li>💳 For COD orders, please keep cash ready for delivery</li>
        </ul>
      </div>
      
      <div className="flex gap-4 justify-center">
        <Link
          href="/products"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}