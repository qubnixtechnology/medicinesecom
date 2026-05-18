

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Phone,
  Mail,
  MapPin,
  ChevronRight
} from 'lucide-react';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center gap-2">
                <Phone size={14} />
                 <span>+91 8919996196</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} />
                 <span>Care.glancehealthcare@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>Chintal, Hyderabad - 500043</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-blue-200">Need help? Call us anytime</span>
            </div>
          </div>
        </div>
      </div>
      

      
      {/* Breadcrumb */}
      {pathname !== '/' && (
        <div className="bg-gray-100 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-gray-800 font-medium capitalize">
                {pathname.split('/').pop()?.replace(/-/g, ' ') || 'Page'}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>
      

    </div>
  );
}