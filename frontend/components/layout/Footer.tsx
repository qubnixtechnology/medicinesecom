

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Send } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'All Products', href: '/products' },
    { name: 'Pediatric Care', href: '/categories/neurological-support' },
    { name: 'Women Health', href: '/categories/women-reproductive-health' },
    { name: 'Nutritional Supplements', href: '/categories/nutritional-supplements' }
  ];

  const categories = [
    { name: 'Neurological Support', href: '/categories/neurological-support' },
    { name: 'Probiotics & Digestion', href: '/categories/probiotics-digestion' },
    { name: 'Vitamin Supplements', href: '/categories/vitamin-supplements' },
    { name: 'Sleep Support', href: '/categories/sleep-support' },
    { name: 'Women Reproductive Health', href: '/categories/women-reproductive-health' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/glancehealthcare', color: 'hover:text-blue-500' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/glancehealthcare', color: 'hover:text-pink-500' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@glancehealthcare', color: 'hover:text-red-600' },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Glance Healthcare</h3>
            <p className="text-gray-400 text-sm">
              Committed to providing high-quality, innovative, and affordable healthcare solutions for children and families.
            </p>
            <div className="mt-4">
              <span className="inline-block bg-blue-600 text-xs px-2 py-1 rounded mr-2">WHO-GMP</span>
              <span className="inline-block bg-green-600 text-xs px-2 py-1 rounded">ISO Certified</span>
            </div>
            
            {/* Social Media Links */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-sm">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${social.color} transition-colors duration-300`}
                    aria-label={social.name}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
                {/* WhatsApp Social Link */}
                <a
                  href="https://wa.me/918919996196"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-500 transition-colors duration-300"
                  aria-label="WhatsApp"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 2.002c-5.514 0-9.985 4.471-9.985 9.984 0 1.762.458 3.476 1.318 4.987L2 21.995l5.233-1.315c1.451.84 3.099 1.287 4.798 1.288 5.513 0 9.985-4.471 9.985-9.984s-4.472-9.982-9.985-9.982zm0 18.397c-1.505 0-2.987-.406-4.247-1.166l-.304-.18-3.101.779.832-3.008-.192-.316c-.863-1.418-1.319-3.058-1.319-4.761 0-4.705 3.833-8.538 8.543-8.538 4.71 0 8.539 3.833 8.539 8.538 0 4.707-3.829 8.538-8.539 8.538zm4.684-6.397c-.257-.129-1.524-.751-1.76-.837-.236-.086-.409-.129-.58.129-.172.258-.668.837-.819 1.009-.151.172-.301.194-.558.065-1.422-.707-2.352-2.54-2.594-2.978-.043-.073-.043-.138.022-.203.129-.129.344-.344.516-.516.129-.129.172-.258.258-.43.086-.172.043-.323-.022-.451-.064-.129-.58-1.396-.795-1.91-.215-.515-.43-.387-.58-.387-.151 0-.323-.022-.495-.022-.172 0-.451.065-.688.323-.236.258-.902.881-.902 2.149 0 1.268.924 2.494 1.054 2.666.129.172 1.822 2.78 4.414 3.9.617.266 1.098.426 1.474.545.619.195 1.182.166 1.628.1.497-.074 1.524-.622 1.738-1.223.215-.6.215-1.115.151-1.223-.064-.108-.236-.172-.493-.301z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link href={cat.href} className="text-gray-400 hover:text-white text-sm transition">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400 text-sm leading-6">
              <li>
                📍 <span className="font-medium text-white">GLANCE HEALTH CARE</span>
                <br />
                5-365/2A Ground Floor, Chintal,
                <br />
                Hyderabad - 500043
              </li>
              <li>
                📞 <a href="tel:+918919996196" className="hover:text-white transition">+91 8919996196</a>
              </li>
              <li>
                ✉️ <a href="mailto:Care.glancehealthcare@gmail.com" className="hover:text-white transition">Care.glancehealthcare@gmail.com</a>
              </li>
              {/* WhatsApp Contact */}
              <li>
                💬 <a href="https://wa.me/918919996196" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">Chat on WhatsApp</a>
              </li>
            </ul>
            <p className="text-xs text-gray-500 mt-4">
              *Use all products under medical supervision
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p className="leading-7">
            © {new Date().getFullYear()} Glance Healthcare. All Rights Reserved.
            <br className="block lg:hidden" />
            Designed & Developed by{" "}
            <a
              href="https://www.qubnixtechnology.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2b57b5] font-semibold hover:underline"
            >
              Qubnix Technology
            </a>
          </p>
          <div className="mt-3 space-x-4">
            <Link href="/terms" className="hover:text-white transition">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/shipping" className="hover:text-white transition">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}