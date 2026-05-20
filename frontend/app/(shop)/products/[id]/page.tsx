import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import { getProductBySlug, products } from '@/lib/products';

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.slug,
  }));
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const localProduct = getProductBySlug(id);
  
  if (!localProduct) {
    notFound();
  }
  
  return <ProductDetailClient product={localProduct} relatedProducts={[]} />;
}
