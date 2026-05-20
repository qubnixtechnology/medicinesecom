

import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Glance Healthcare - Premium Pediatric, Neurological & Nutritional Supplements',
  description: 'Trusted healthcare solutions for children and families. WHO-GMP certified products for neurological support, digestion, vitamins, and more.',
  keywords: 'healthcare, supplements, pediatric, neurological, vitamins, probiotics, India',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}