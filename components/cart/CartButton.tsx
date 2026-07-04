"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";

/**
 * CartButton
 * Floating circular cart icon, fixed to the bottom-right of the viewport.
 * Shows a small badge with the current item count. Clicking it opens
 * the CartDrawer.
 *
 * SCOPING TO THE PRODUCT PAGE ONLY:
 * Don't render this in your root layout. Instead, render it (and wrap
 * with <CartProvider>) only inside your product listing page component,
 * e.g.:
 *
 *   // app/products/page.tsx
 *   import { CartProvider } from "@/components/cart/CartContext";
 *   import CartButton from "@/components/cart/CartButton";
 *   import CartDrawer from "@/components/cart/CartDrawer";
 *
 *   export default function ProductsPage() {
 *     return (
 *       <CartProvider>
 *         <ProductGrid />
 *         <CartButton />
 *         <CartDrawer />
 *       </CartProvider>
 *     );
 *   }
 *
 * Because it's only mounted inside that page's tree, it naturally
 * disappears on every other route — no path-checking logic needed.
 */

const CartButton: React.FC = () => {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label="Open cart"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg transition hover:bg-teal-700 hover:shadow-xl active:scale-95 sm:bottom-8 sm:right-8"
    >
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white ring-2 ring-white">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default CartButton;
