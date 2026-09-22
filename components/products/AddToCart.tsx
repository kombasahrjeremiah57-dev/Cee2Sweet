"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { useCart } from "@/components/cart/CartProvider";
export function AddToCart({ product }: { product: Product }) {
  const [q, setQ] = useState(1);
  const [message, setMessage] = useState("");
  const { add } = useCart();
  const router = useRouter();
  const action = (buyNow = false) => {
    const added = add(product, q);
    setMessage(
      added ? "Added to your bag." : "That quantity is not available.",
    );
    if (added && buyNow) router.push("/checkout");
  };
  const unavailable = product.stockQuantity < 1;
  return (
    <div className="mt-7">
      <div className="flex w-fit items-center rounded-full border border-stone-300">
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={unavailable}
          onClick={() => setQ(Math.max(1, q - 1))}
          className="px-4 py-2 disabled:opacity-40"
        >
          −
        </button>
        <span className="w-8 text-center text-sm" aria-live="polite">
          {q}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          disabled={unavailable}
          onClick={() => setQ(Math.min(product.stockQuantity, q + 1))}
          className="px-4 py-2 disabled:opacity-40"
        >
          +
        </button>
      </div>
      <div className="mt-4 flex gap-3">
        <button
          disabled={unavailable}
          onClick={() => action()}
          className="button button-dark flex-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {unavailable ? "Out of stock" : "Add to cart"}
        </button>
        <button
          disabled={unavailable}
          onClick={() => action(true)}
          className="button button-outline flex-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Buy now
        </button>
      </div>
      {message && (
        <p role="status" className="mt-3 text-sm text-clay">
          {message}
        </p>
      )}
    </div>
  );
}
