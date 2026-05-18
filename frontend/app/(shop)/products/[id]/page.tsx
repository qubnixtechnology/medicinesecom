import { notFound } from 'next/navigation';
import { products, getProductBySlug, getRelatedProducts } from '@/lib/products';
import ProductDetailClient from '@/components/product/ProductDetailClient';

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.slug,
  }));
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductBySlug(id);
  
  if (!product) {
    notFound();
  }
  
  const relatedProducts = getRelatedProducts(product.categorySlug, product.id);
  
  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}