import { HomeSections } from '@/components/home/HomeSections';
import { LandingCarousel } from '@/components/home/LandingCarousel';
import { getActiveCategories, getActiveProducts } from '@/lib/catalog';

export default async function Home() {
  const [categories, products] = await Promise.all([getActiveCategories(), getActiveProducts()]);
  return <>
    <LandingCarousel />
    <section className="border-b border-stone-200 bg-white"><div className="shell grid gap-5 py-7 text-center sm:grid-cols-3 sm:text-left"><div><p className="font-display text-xl">Made for your moment</p><p className="mt-1 text-sm text-stone-600">Hair for everyday confidence and standout occasions.</p></div><div><p className="font-display text-xl">Curated collections</p><p className="mt-1 text-sm text-stone-600">Explore wigs, bundles, braids and finishing details.</p></div><div><p className="font-display text-xl">Shop in SLE</p><p className="mt-1 text-sm text-stone-600">Clear pricing for customers shopping in Sierra Leone.</p></div></div></section>
    <div id="categories"><HomeSections categories={categories} products={products} /></div>
  </>;
}
