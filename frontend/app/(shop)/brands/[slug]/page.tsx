import { products } from '@/lib/products';
import BrandPageClient from './BrandPageClient';

export function generateStaticParams() {
  return [{ slug: 'glance-healthcare' }];
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <BrandPageClient slug={resolvedParams.slug} />;
}
