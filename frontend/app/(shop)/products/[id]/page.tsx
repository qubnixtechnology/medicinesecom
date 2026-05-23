import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import { products as localProducts } from '@/lib/products';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, { cache: 'no-store' });
    const data = await res.json();
    
    if (data.success && data.data.products) {
      return data.data.products.map((product: any) => ({
        id: product.slug,
      }));
    }
  } catch (error) {
    console.error("Failed to generate static params:", error);
  }
  
  // Fallback to empty array if API is unreachable
  return [];
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, { cache: 'no-store' });
    const data = await res.json();
    
    if (!res.ok || !data.success || !data.data) {
      return notFound();
    }
    
    const p = data.data;
    
    // Find rich details in local products if available
    const cleanSlug = id.replace(/-[0-9]+$/, ''); // Removes trailing digits like -1, -2
    const localProd = localProducts.find(
      lp => lp.slug === id || lp.slug === cleanSlug || lp.name.toLowerCase() === id.replace(/-/g, ' ').toLowerCase()
    );
    
    let productImages: string[] = [];
    if (p.images) {
      try {
        let parsedImages = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
        if (Array.isArray(parsedImages)) {
          productImages = parsedImages.map((img: string) => {
            if (img.startsWith('http')) return img;
            if (img.startsWith('/')) return `${img}`;
            return `/${img}`;
          });
        }
      } catch(e) {
        productImages = [];
      }
    }
    
    if (!productImages.length) {
      productImages = localProd?.images || [`https://placehold.co/400x400/2563eb/white?text=${encodeURIComponent(p.name.substring(0, 15))}`];
    }
    
    const product = {
      id: Number(p.id),
      name: p.name || localProd?.name || '',
      slug: p.slug || localProd?.slug || '',
      category: p.category || localProd?.category || '',
      categorySlug: p.category_slug || localProd?.categorySlug || '',
      brand: p.brand || localProd?.brand || 'Glance Healthcare',
      price: Number(p.price),
      originalPrice: localProd?.originalPrice,
      discount: localProd?.discount,
      description: p.description || localProd?.description || '',
      benefits: localProd?.benefits || [],
      composition: localProd?.composition || '',
      dosage: localProd?.dosage || '',
      indications: localProd?.indications || [],
      images: productImages,
      rating: localProd?.rating || 4.5,
      reviews: localProd?.reviews || 10,
      inStock: p.stock > 0,
      isPrescriptionRequired: p.is_prescription_required === 1 || localProd?.isPrescriptionRequired || false,
      volume: p.volume || localProd?.volume || '',
    };
    
    const relatedProducts = localProducts
      .filter(lp => lp.categorySlug === product.categorySlug && lp.slug !== product.slug)
      .slice(0, 4);
    
    return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return notFound();
  }
}
