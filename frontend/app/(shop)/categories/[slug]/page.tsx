import { products as localProducts, categories } from '@/lib/products';
import ProductGrid from '@/components/product/ProductGrid';
import { notFound } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const category = categories.find(c => c.slug === slug);
  if (!category) {
    return notFound();
  }
  
  let categoryProducts: any[] = [];
  try {
    const res = await fetch(`${API_BASE_URL}/products?category=${slug}`, { cache: 'no-store' });
    const data = await res.json();
    
    if (data.success && data.data.products) {
      categoryProducts = data.data.products.map((p: any) => {
        const cleanSlug = p.slug.replace(/-[0-9]+$/, '');
        const localProd = localProducts.find(
          lp => lp.slug === p.slug || lp.slug === cleanSlug
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
        
        return {
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
          images: productImages,
          rating: localProd?.rating || 4.5,
          reviews: localProd?.reviews || 10,
          inStock: p.stock > 0,
          isPrescriptionRequired: p.is_prescription_required === 1 || localProd?.isPrescriptionRequired || false,
          volume: p.volume || localProd?.volume || '',
        };
      });
    }
  } catch (error) {
    console.error("Error fetching category products:", error);
    // Fallback to local products
    categoryProducts = localProducts.filter(p => p.categorySlug === slug);
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{category.name}</h1>
        <p className="text-gray-600 mt-2">
          {categoryProducts.length} products available in this category
        </p>
      </div>
      
      <ProductGrid products={categoryProducts} />
    </div>
  );
}