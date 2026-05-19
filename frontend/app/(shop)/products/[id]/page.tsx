import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import { getProductBySlug } from '@/lib/products';

async function getProduct(slug: string) {
  try {
    const res = await fetch(`http://localhost:8080/api/products/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.success && data.data) {
      const p = data.data;
      
      let productImages = [];
      if (p.images) {
        try {
          let parsedImages = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
          if (Array.isArray(parsedImages)) {
            productImages = parsedImages.map((img: string) => {
              if (img.startsWith('http')) return img;
              if (img.startsWith('/')) return `http://localhost:8080${img}`;
              return `http://localhost:8080/${img}`;
            });
          }
        } catch(e) {
          productImages = [];
        }
      }
      if (!productImages.length) {
        productImages = ['/images/placeholder.jpg'];
      }
      let localProduct = getProductBySlug(slug);
      
      // Fallback: If slug matching fails (e.g., db slug is 'care-myo-sachets-1' but local is 'care-myo-sachets'), try matching by name.
      if (!localProduct) {
         const { products } = await import('@/lib/products');
         localProduct = products.find((prod) => prod.name.toLowerCase() === p.name.toLowerCase());
      }
      
      return {
        id: Number(p.id),
        name: p.name,
        slug: p.slug,
        category: p.category_name || p.category || '',
        categorySlug: p.category_slug || '',
        brand: p.brand || 'Glance Healthcare',
        price: Number(p.price),
        originalPrice: localProduct?.originalPrice,
        discount: localProduct?.discount,
        description: p.description || localProduct?.description || '',
        benefits: localProduct?.benefits || [],
        composition: localProduct?.composition,
        dosage: localProduct?.dosage,
        usage: localProduct?.usage,
        indications: localProduct?.indications,
        flavour: localProduct?.flavour,
        images: productImages,
        rating: localProduct?.rating || 4.5,
        reviews: localProduct?.reviews || 10,
        inStock: p.stock > 0,
        isPrescriptionRequired: p.is_prescription_required === 1,
        volume: p.volume || localProduct?.volume || '',
      };
    }
  } catch (error) {
    console.error('Failed to fetch product:', error);
  }
  return null;
}

async function getRelatedProducts(categorySlug: string, currentProductId: number) {
  try {
    const res = await fetch(`http://localhost:8080/api/products?category=${categorySlug}&limit=4`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    if (data.success && data.data.products) {
      return data.data.products
        .filter((p: any) => Number(p.id) !== currentProductId)
        .map((p: any) => {
          let productImages = [];
          if (p.images) {
            try {
              let parsedImages = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
              if (Array.isArray(parsedImages)) {
                productImages = parsedImages.map((img: string) => {
                  if (img.startsWith('http')) return img;
                  if (img.startsWith('/')) return `http://localhost:8080${img}`;
                  return `http://localhost:8080/${img}`;
                });
              }
            } catch(e) {
              productImages = [];
            }
          }
          if (!productImages.length) {
            productImages = ['/images/placeholder.jpg'];
          }
          return {
            id: Number(p.id),
            name: p.name,
            slug: p.slug,
            category: p.category_name || p.category || '',
            categorySlug: p.category_slug || '',
            brand: p.brand || 'Glance Healthcare',
            price: Number(p.price),
            originalPrice: undefined,
            discount: undefined,
            description: p.description || '',
            benefits: [],
            images: productImages,
            rating: 4.5,
            reviews: 10,
            inStock: p.stock > 0,
            isPrescriptionRequired: p.is_prescription_required === 1,
            volume: p.volume || '',
          };
        })
        .slice(0, 4);
    }
  } catch (error) {
    console.error('Failed to fetch related products:', error);
  }
  return [];
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  
  if (!product) {
    notFound();
  }
  
  const relatedProducts = await getRelatedProducts(product.categorySlug, product.id);
  
  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}