'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product, ProductSelection, ProductVariant } from '@/types/product';
import { useCart } from '@/components/cart/CartProvider';
import { formatSLE } from '@/lib/products';

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { add } = useCart();
  const variants = product.variants?.filter(variant => variant.isActive !== false) ?? [];
  const lengths = [...new Set(variants.map(variant => variant.length).filter(Boolean))] as string[];
  const colors = [...new Set(variants.map(variant => variant.color).filter(Boolean))] as string[];
  const firstVariant = variants[0];
  const [imageIndex, setImageIndex] = useState(0);
  const [length, setLength] = useState(firstVariant?.length ?? product.length ?? lengths[0] ?? '');
  const [color, setColor] = useState(firstVariant?.color ?? product.color ?? colors[0] ?? '');
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [message, setMessage] = useState('');
  const selectedVariant: ProductVariant | undefined = variants.find(variant => (!length || variant.length === length) && (!color || variant.color === color));
  const selection: ProductSelection = { variant: selectedVariant, length: length || undefined, color: color || undefined, instructions: instructions.trim() || undefined };
  const price = selectedVariant?.price ?? product.price;
  const stock = selectedVariant?.stockQuantity ?? product.stockQuantity;
  const images = product.images.length ? product.images : [{ url: '/images/products/black-sleek-straight-wig.jpg', alt: product.name }];
  const action = (buyNow = false) => { if (variants.length && !selectedVariant) { setMessage('Please choose an available length and color.'); return; } if (!add(product, quantity, selection)) { setMessage('That quantity is not available.'); return; } setMessage('Added to your bag.'); if (buyNow) router.push('/checkout'); };

  return <div className="grid gap-10 lg:grid-cols-2"><div className="self-start"><div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand"><Image src={images[imageIndex].url} alt={images[imageIndex].alt} fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /></div><div className="mt-3 grid grid-cols-5 gap-3">{images.slice(0, 5).map((image, index) => <button type="button" key={`${image.url}-${index}`} aria-label={`View image ${index + 1}`} aria-pressed={imageIndex === index} onClick={() => setImageIndex(index)} className={`relative aspect-square overflow-hidden rounded-lg border-2 ${imageIndex === index ? 'border-ink' : 'border-transparent'}`}><Image src={image.url} alt="" fill sizes="100px" className="object-cover" /></button>)}</div></div><div className="lg:py-4"><p className="eyebrow">{product.category.name}</p><h1 className="mt-2 font-display text-4xl md:text-5xl">{product.name}</h1><p className="mt-5 text-2xl font-semibold">{formatSLE(price)} {selectedVariant?.compareAtPrice ? <del className="ml-2 text-base font-normal text-stone-400">{formatSLE(selectedVariant.compareAtPrice)}</del> : product.compareAtPrice && <del className="ml-2 text-base font-normal text-stone-400">{formatSLE(product.compareAtPrice)}</del>}</p><p className={`mt-4 text-sm font-semibold ${stock ? 'text-green-700' : 'text-red-700'}`}>{stock ? `${stock} available` : 'Out of stock'}</p><p className="mt-6 leading-7 text-stone-700">{product.description}</p><dl className="mt-7 grid grid-cols-2 gap-y-4 border-y border-stone-200 py-5 text-sm"><div><dt className="text-stone-500">Hair type</dt><dd className="mt-1 font-medium">{product.hairType ?? 'Not specified'}</dd></div><div><dt className="text-stone-500">SKU</dt><dd className="mt-1 font-medium">{selectedVariant?.sku ?? product.sku}</dd></div></dl>{lengths.length > 0 && <fieldset className="mt-7"><legend className="text-sm font-semibold">Length</legend><div className="mt-3 flex flex-wrap gap-2">{lengths.map(value => <button type="button" key={value} onClick={() => { setLength(value); setMessage(''); }} className={`rounded-full border px-4 py-2 text-sm ${length === value ? 'border-ink bg-ink text-white' : 'border-stone-300'}`}>{value}</button>)}</div></fieldset>}{colors.length > 0 && <fieldset className="mt-6"><legend className="text-sm font-semibold">Color</legend><div className="mt-3 flex flex-wrap gap-2">{colors.map(value => <button type="button" key={value} onClick={() => { setColor(value); setMessage(''); }} className={`rounded-full border px-4 py-2 text-sm ${color === value ? 'border-ink bg-ink text-white' : 'border-stone-300'}`}>{value}</button>)}</div></fieldset>}<label className="mt-6 block text-sm font-semibold">Special instructions<textarea value={instructions} onChange={event => setInstructions(event.target.value)} placeholder="Add any special request about your order..." className="mt-2 min-h-24 w-full rounded-xl border border-stone-300 px-4 py-3 font-normal outline-clay" /></label><div className="mt-6 flex w-fit items-center rounded-full border border-stone-300"><button type="button" aria-label="Decrease quantity" disabled={!stock} onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 disabled:opacity-40">-</button><span className="w-10 text-center text-sm" aria-live="polite">{quantity}</span><button type="button" aria-label="Increase quantity" disabled={!stock} onClick={() => setQuantity(Math.min(stock, quantity + 1))} className="px-4 py-2 disabled:opacity-40">+</button></div><div className="mt-4 flex gap-3"><button type="button" disabled={!stock} onClick={() => action()} className="button button-dark flex-1 disabled:opacity-50">{stock ? 'Add to cart' : 'Out of stock'}</button><button type="button" disabled={!stock} onClick={() => action(true)} className="button button-outline flex-1 disabled:opacity-50">Buy now</button></div>{message && <p role="status" className="mt-3 text-sm text-clay">{message}</p>}</div></div>;
}
