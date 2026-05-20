import { products } from '@/lib/products';
import BrandPageClient from './BrandPageClient';

export function generateStaticParams() {
  return [{ slug: 'glance-healthcare' }];
}

export default function BrandPage({ params }: { params: { slug: string } }) {
  return <BrandPageClient slug={params.slug} />;
}
