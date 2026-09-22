'use client';
export default function ShopError({reset}:{reset:()=>void}){return <div className="shell section text-center"><h1 className="font-display text-4xl">The collection couldn’t load.</h1><p className="mt-3 text-stone-600">Please try again in a moment.</p><button onClick={reset} className="button button-dark mt-6">Try again</button></div>}
