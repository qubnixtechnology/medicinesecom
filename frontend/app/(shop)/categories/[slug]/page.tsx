import { products, categories } from '@/lib/products';
import ProductGrid from '@/components/product/ProductGrid';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const category = categories.find(c => c.slug === slug);
  const categoryProducts = products.filter(p => p.categorySlug === slug);
  
  if (!category) {
    notFound();
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