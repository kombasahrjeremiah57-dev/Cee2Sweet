'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { formatSLE } from '@/lib/products';
import { useCart } from '@/components/cart/CartProvider';

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const image = product.images[0] ?? { url: '/images/products/black-sleek-straight-wig.jpg', alt: product.name };
  return <article className="group"><div className="relative overflow-hidden rounded-xl bg-sand"><Link href={`/shop/${product.slug}`} className="block"><div className="relative aspect-[4/5]"><Image src={image.url} alt={image.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />{product.isNew && <span className="absolute left-3 top-3 rounded-full bg-cream px-3 py-1 text-[10px] font-bold uppercase tracking-wider">New</span>}{product.compareAtPrice && <span className="absolute left-3 top-11 rounded-full bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Sale</span>}</div></Link><button type="button" aria-label={`Save ${product.name} to wishlist`} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-sm transition hover:bg-white">♡</button><button type="button" aria-label={`Add ${product.name} to cart`} onClick={() => add(product)} className="absolute inset-x-3 bottom-3 rounded-full bg-white px-4 py-2.5 text-xs font-bold opacity-0 shadow-sm transition group-hover:opacity-100 focus:opacity-100">Add to cart</button></div><div className="pt-4"><p className="text-[11px] uppercase tracking-wider text-stone-500">{product.category.name}</p><div className="mt-1 flex items-start justify-between gap-3"><Link href={`/shop/${product.slug}`} className="font-semibold hover:text-clay">{product.name}</Link><button type="button" aria-label={`Add ${product.name} to cart`} onClick={() => add(product)} className="shrink-0 text-sm md:hidden">+</button></div><p className="mt-2 font-semibold">{formatSLE(product.price)} {product.compareAtPrice && <del className="ml-1 text-sm font-normal text-stone-400">{formatSLE(product.compareAtPrice)}</del>}</p></div></article>;
}
