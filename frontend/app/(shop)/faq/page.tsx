'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs = [
    {
      question: "Are all products available without prescription?",
      answer: "While many of our products are over-the-counter supplements, some products require a valid prescription from a registered medical practitioner. Products that require a prescription are clearly marked with 'Rx' on the product page. Please consult your doctor before using any medication."
    },
    {
      question: "How long does delivery take?",
      answer: "We typically deliver within 3-5 business days across India. Delivery times may vary based on your location. You will receive a tracking number once your order is shipped."
    },
    {
      question: "What is your return policy?",
      answer: "Due to the nature of healthcare products, we cannot accept returns on opened or used products. However, if you receive a damaged or incorrect product, please contact us within 48 hours of delivery for a replacement or refund."
    },
    {
      question: "Are these products safe for children?",
      answer: "Our pediatric products are specially formulated for children under medical guidance. Always follow the recommended dosage and consult your pediatrician before starting any new supplement for your child."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we only ship within India. We are working on expanding our shipping capabilities to international destinations in the near future."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive an email and SMS with tracking information. You can also track your order from the 'My Orders' section in your account."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and cash on delivery (COD) for orders below ₹5000."
    },
    {
      question: "Are your products WHO-GMP certified?",
      answer: "Yes, all our products are manufactured in WHO-GMP and ISO certified facilities, ensuring the highest quality and safety standards."
    }
  ];
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Frequently Asked Questions</h1>
      <p className="text-center text-gray-600 mb-12">Find answers to common questions about our products and services</p>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
            >
              <span className="font-semibold text-gray-800">{faq.question}</span>
              {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50 border-t">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-blue-50 rounded-lg text-center">
        <h3 className="font-semibold text-gray-800 mb-2">Still have questions?</h3>
        <p className="text-gray-600 mb-4">Can't find the answer you're looking for? Please contact our support team.</p>
        <a
          href="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}