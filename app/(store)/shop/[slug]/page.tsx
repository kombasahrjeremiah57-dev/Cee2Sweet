import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getActiveProducts, getProductBySlug } from '@/lib/catalog';
import { ProductDetail } from '@/components/products/ProductDetail';
import { ProductGrid } from '@/components/products/ProductGrid';

type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const product=await getProductBySlug(slug);return product?{title:product.name,description:product.description}:{title:'Product not found'};}
export default async function ProductPage({params}:Props){const {slug}=await params;const product=await getProductBySlug(slug);if(!product)notFound();const products=await getActiveProducts();const related=products.filter(candidate=>candidate.category.slug===product.category.slug&&candidate.id!==product.id).slice(0,4);return <div className="shell section"><ProductDetail product={product}/><section className="mt-16 border-t border-stone-200 pt-10"><h2 className="font-display text-3xl">You May Also Like</h2><div className="mt-7"><ProductGrid products={related}/></div></section></div>;}
