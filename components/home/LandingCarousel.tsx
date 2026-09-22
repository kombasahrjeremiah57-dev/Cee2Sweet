'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const slides = [
  { eyebrow: 'The signature edit', title: 'Your Hair.\nYour Confidence.', description: 'Discover beautiful hair collections curated by Cee2Sweet for every style and occasion.', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=90', alt: 'Woman wearing voluminous natural hair', action: 'Shop Hair', href: '/shop' },
  { eyebrow: 'New season, new texture', title: 'Find Your\nSignature Look.', description: 'From soft waves to sleek straight styles, choose the texture that feels most like you.', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=90', alt: 'Woman with styled textured hair', action: 'Explore Wigs', href: '/categories/wigs' },
  { eyebrow: 'Build your collection', title: 'Beautiful Hair,\nMade Personal.', description: 'Shop bundles, closures, frontals, braids and accessories for the look you have in mind.', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=90', alt: 'Hair styling collection displayed in warm light', action: 'Shop Collections', href: '#categories' },
];

export function LandingCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive(current => (current + 1) % slides.length), 6000); return () => window.clearInterval(timer); }, []);
  const slide = slides[active];
  return <section className="bg-[#eaded5]" aria-label="Cee2Sweet featured collections"><div className="shell grid min-h-[650px] min-w-0 items-center gap-10 py-12 md:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] md:py-16"><div className="relative z-10 min-w-0"><p className="eyebrow">{slide.eyebrow}</p><h1 className="mt-4 max-w-full whitespace-pre-line font-display text-[clamp(2.4rem,11vw,4.5rem)] leading-[.94] lg:text-7xl">{slide.title}</h1><p className="mt-7 max-w-md text-base leading-7 text-stone-700">{slide.description}</p><div className="mt-8 flex flex-wrap gap-3"><Link href={slide.href} className="button button-dark">{slide.action}</Link><Link href="/shop" className="button button-outline">View all hair</Link></div><div className="mt-10 flex items-center gap-3" role="tablist" aria-label="Featured collections"><span className="mr-2 text-xs font-semibold text-stone-500">0{active + 1} / 0{slides.length}</span>{slides.map((item, index) => <button key={item.eyebrow} type="button" role="tab" aria-label={`Show slide ${index + 1}`} aria-selected={active === index} onClick={() => setActive(index)} className={`h-1.5 rounded-full transition-all ${active === index ? 'w-12 bg-stone-900' : 'w-6 bg-stone-400'}`} />)}</div></div><div className="relative h-[390px] min-w-0 overflow-hidden rounded-2xl md:h-[570px]"><Image key={slide.image} priority={active === 0} src={slide.image} alt={slide.alt} fill sizes="(max-width:768px) 100vw, 55vw" className="object-cover transition-opacity duration-500" /></div></div></section>;
}
