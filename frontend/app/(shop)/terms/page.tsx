export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms and Conditions</h1>
      <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By accessing and using the Glance Healthcare website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.
          </p>
        </section>
        
                <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Medical Disclaimer</h2>
          <p className="text-gray-600">
            All products sold on this website are for use under medical supervision. The information provided on this website is for informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Prescription Requirements</h2>
          <p className="text-gray-600">
            Certain products on our website require a valid prescription from a registered medical practitioner. By ordering such products, you confirm that you have a valid prescription and will provide it upon request. We reserve the right to cancel any order that does not comply with prescription requirements.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Product Information</h2>
          <p className="text-gray-600">
            We strive to provide accurate product information including descriptions, pricing, and availability. However, we do not warrant that product descriptions or other content on the site are accurate, complete, reliable, current, or error-free. If a product offered is not as described, your sole remedy is to return it in unused condition.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Pricing and Payments</h2>
          <p className="text-gray-600">
            All prices are in Indian Rupees (INR) and are subject to change without notice. We accept various payment methods including credit/debit cards, UPI, net banking, and cash on delivery. We reserve the right to refuse or cancel any order for any reason including pricing errors or suspected fraud.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Shipping and Delivery</h2>
          <p className="text-gray-600">
            We ship to addresses within India. Delivery times are estimates and not guaranteed. We are not responsible for delays caused by courier services or customs. Free shipping is available on orders above ₹500. A shipping fee of ₹50 applies to orders below ₹500.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Returns and Refunds</h2>
          <p className="text-gray-600">
            Due to the nature of healthcare products, we do not accept returns on opened or used products. If you receive a damaged, defective, or incorrect product, please contact us within 48 hours of delivery. Refunds will be processed after verification and may take 7-10 business days.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Account Responsibility</h2>
          <p className="text-gray-600">
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Limitation of Liability</h2>
          <p className="text-gray-600">
            To the fullest extent permitted by law, Glance Healthcare shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website or purchase of products.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Contact Information</h2>
          <p className="text-gray-600">
            For any questions regarding these Terms and Conditions, please contact us at:<br />
            Email: care@glancehealthcare.in<br />
            Phone: +91 98765 43210<br />
            Address: Bhubaneswar, Odisha, India
          </p>
        </section>
      </div>
    </div>
  );
}