"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Minus, Plus, X, Check, LoaderCircle } from "lucide-react";
import { useCart } from "@/components/cart/CartContext"; // adjust path to wherever CartContext lives

/**
 * ProductListing
 * Cracker product listing — festive yellow accent-stripe card style.
 * Products are grouped by `category.name` from the API response, with
 * each group rendered under its own heading (e.g. "ColourMatches",
 * "Fancyfountain", "Skyshots" from your sample data).
 *
 * CART INTEGRATION:
 * Quantity is backed by the shared cart (`useCart`) — selecting a
 * quantity here adds/updates/removes the item in the same cart that
 * CartButton's badge and CartDrawer read from. `mrp` is passed into
 * addItem too, so CartDrawer's "Discount Total" row can actually
 * calculate real savings instead of showing ₹0.
 * ProductListing must be rendered inside a <CartProvider>, alongside
 * CartButton / CartDrawer:
 *
 *   <CartProvider>
 *     <ProductListing />
 *     <CartButton />
 *     <CartDrawer />
 *   </CartProvider>
 */

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  mrp: number;
  unit: string | null;
  categoryId: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    name: string;
  };
}

const ACCENT = "#f0e85d";

const ProductListing: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to load products");

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const { items: cartItems, addItem, updateQuantity } = useCart();
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(
    null
  );

  // Group products by category name, preserving first-seen category order.
  const groupedByCategory = useMemo(() => {
    const groups = new Map<string, Product[]>();
    for (const product of products) {
      const categoryName = product.category?.name ?? "Other";
      if (!groups.has(categoryName)) {
        groups.set(categoryName, []);
      }
      groups.get(categoryName)!.push(product);
    }
    return Array.from(groups.entries()); // [ [categoryName, Product[]], ... ]
  }, [products]);

  const getQty = (id: number) => cartItems.find((i) => i.id === String(id))?.quantity ?? 0;

  const setQty = (product: Product, value: number) => {
    const clamped = Math.max(0, value);
    const cartId = String(product.id);
    const alreadyInCart = cartItems.some((i) => i.id === cartId);

    if (!alreadyInCart) {
      if (clamped > 0) {
        addItem(
          {
            id: cartId,
            name: product.name,
            image: product.imageUrl,
            price: product.price,
            mrp: product.mrp,
          },
          clamped
        );
      }
      return;
    }

    updateQuantity(cartId, clamped);
  };

  return (
    <section className="w-full bg-white px-4 py-10 sm:px-8">
      {isLoading ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-yellow-200 bg-yellow-50/80 px-8 py-10 text-center shadow-sm">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
              <LoaderCircle className="h-8 w-8 animate-spin text-[#f8ab13]" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">Loading crackers...</p>
              <p className="mt-1 text-sm text-gray-600">
                Please wait while we bring the products to life.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {groupedByCategory.map(([categoryName, categoryProducts]) => (
          <div key={categoryName}>
            {/* Category heading */}
            <div
              className="mb-5 w-full rounded-md py-1 text-center bg-[#f8ab13]"
            >
              <h2 className="text-lg font-bold uppercase tracking-wide text-white">
                {categoryName}
              </h2>
              {/* <span className="text-xs font-medium text-gray-700">
                {categoryProducts.length} item{categoryProducts.length !== 1 ? "s" : ""}
              </span> */}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryProducts.map((product) => {
                const qty = getQty(product.id);
                const lineTotal = qty * product.price;
                const isSelected = qty > 0;

                return (
                  <div
                    key={product.id}
                    style={{
                      borderLeftColor: ACCENT,
                      borderLeftWidth: isSelected ? 6 : 4,
                      backgroundColor: isSelected ? "#fdfbe9" : undefined,
                    }}
                    className={`relative flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md ${
                      isSelected ? "ring-1 ring-yellow-300" : ""
                    }`}
                  >
                    {/* Selected badge */}
                    {isSelected && (
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-600 text-white shadow">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}

                    {/* Thumbnail — click to preview */}
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewImage({ src: product.imageUrl, alt: product.name })
                      }
                      aria-label={`View larger image of ${product.name}`}
                      style={{ backgroundColor: isSelected ? "#f7f3c8" : "#fdfce8" }}
                      className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md transition hover:opacity-80"
                    >
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </button>

                    {/* Name + price */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {product.name}
                      </p>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-xs text-gray-400 line-through">
                          ₹{product.mrp}
                        </span>
                        <span className="text-sm font-bold text-yellow-800">
                          ₹{product.price}
                        </span>
                        {product.unit && (
                          <span className="text-xs text-gray-500">/ {product.unit}</span>
                        )}
                      </div>

                      {/* Quantity stepper */}
                      <div className="mt-2 inline-flex items-center rounded-md border border-gray-200 bg-white">
                        <button
                          type="button"
                          onClick={() => setQty(product, qty - 1)}
                          className="flex h-7 w-7 items-center justify-center text-gray-500 transition hover:bg-gray-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <input
                          type="number"
                          min={0}
                          value={qty}
                          onChange={(e) => setQty(product, Number(e.target.value) || 0)}
                          className="w-12 border-x border-gray-200 py-1 text-center text-sm text-gray-900 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setQty(product, qty + 1)}
                          className="flex h-7 w-7 items-center justify-center text-gray-500 transition hover:bg-gray-50"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Live-calculated line total */}
                    <div
                      className={`flex-shrink-0 rounded-md px-3 py-2 text-sm font-semibold ${
                        lineTotal > 0
                          ? "bg-yellow-600 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      ₹{lineTotal.toLocaleString("en-IN")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          ))}
        </div>
      )}

      {/* Image preview popup */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              aria-label="Close preview"
              className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-1.5 text-gray-600 shadow transition hover:bg-white hover:text-gray-900"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="relative aspect-square w-full bg-gray-50">
              <Image
                src={previewImage.src}
                alt={previewImage.alt}
                fill
                className="object-contain"
              />
            </div>
            <p className="px-4 py-3 text-center text-sm font-medium text-gray-800">
              {previewImage.alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductListing;