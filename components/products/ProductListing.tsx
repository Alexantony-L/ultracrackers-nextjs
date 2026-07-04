"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Minus, Plus, X, Check } from "lucide-react";
import { useCart } from "@/components/cart/CartContext"; // adjust path to wherever CartContext lives

/**
 * ProductListing
 * Cracker product listing — festive yellow accent-stripe card style.
 * Each card has a quantity stepper; the line total recalculates live,
 * and the whole card visibly changes (tinted background + stronger
 * stripe + a small "selected" check badge) once quantity > 0.
 *
 * COLOR NOTE:
 * The brand accent is #f0e85d (a light yellow). Because that color is
 * too light to put white/dark text directly on top of and stay
 * readable, it's used as the stripe/tint, while a darker gold
 * (`text-yellow-800` / `bg-yellow-600`) is used for text and the
 * "selected" badge so contrast stays solid in both card states.
 *
 * CART INTEGRATION:
 * Quantity is now backed by the shared cart (`useCart`) instead of local
 * state — so selecting a quantity here actually adds/updates/removes the
 * item in the same cart that CartButton's badge and CartDrawer read from.
 * This means ProductListing must be rendered inside a <CartProvider>,
 * alongside CartButton / CartDrawer, e.g.:
 *
 *   <CartProvider>
 *     <ProductListing />
 *     <CartButton />
 *     <CartDrawer />
 *   </CartProvider>
 *
 * DUMMY DATA NOTE:
 * `DUMMY_PRODUCTS` below is static placeholder data matching the shape
 * you'll eventually get from your API. Swap the `initialProducts` prop
 * for fetched data later — no other changes needed. Example:
 *
 *   const products = await fetch("/api/products").then((r) => r.json());
 *   <ProductListing initialProducts={products} />
 */

export interface Product {
  id: string;
  serial: number;
  name: string;
  image: string;
  mrp: number; // struck-through price
  price: number; // discounted / actual price
  unit: string; // e.g. "1 BOX", "2PCE", "Box 5pc"
}

const ACCENT = "#f0e85d";
const PLACEHOLDER_IMAGE = "/uploads/CHAKKAR ASHOKA.jpg"; // <-- update this path

const DUMMY_PRODUCTS: Product[] = [
  { id: "waterfalls-candle", serial: 1, name: "Water falls Candle 5pc", image: PLACEHOLDER_IMAGE, mrp: 340, price: 170, unit: "1 BOX" },
  { id: "golden-drops", serial: 2, name: "Golden Drops 5pc", image: PLACEHOLDER_IMAGE, mrp: 186, price: 93, unit: "1 BOX" },
  { id: "metro-train-fountain", serial: 3, name: "METRO train 3Step fountain", image: PLACEHOLDER_IMAGE, mrp: 480, price: 240, unit: "1 PCE" },
  { id: "kitkat-mega-crackling", serial: 4, name: "KITKAT MEGA Crackling", image: PLACEHOLDER_IMAGE, mrp: 80, price: 40, unit: "Box 10pc" },
  { id: "feather-drops", serial: 5, name: "Feather Drops 5pc", image: PLACEHOLDER_IMAGE, mrp: 180, price: 90, unit: "1 BOX" },
  { id: "jungle-beat", serial: 6, name: "JUNGLE Beat", image: PLACEHOLDER_IMAGE, mrp: 210, price: 105, unit: "Box 5pc" },
  { id: "starwell-5g-gun", serial: 7, name: "Starwell 5G Gun 2pc", image: PLACEHOLDER_IMAGE, mrp: 340, price: 170, unit: "2PCE" },
  { id: "race-car", serial: 8, name: "RACE CAR", image: PLACEHOLDER_IMAGE, mrp: 370, price: 185, unit: "Box 2PC" },
  { id: "elephant-water-shower", serial: 9, name: "ELEPHANT WATER Shower", image: PLACEHOLDER_IMAGE, mrp: 220, price: 110, unit: "Box 5pc" },
  { id: "i-cone-hand-shower", serial: 10, name: "I Cone Hand Shower 2pc", image: PLACEHOLDER_IMAGE, mrp: 450, price: 225, unit: "1 BOX" },
  { id: "siren-big", serial: 11, name: "SIREN Big", image: PLACEHOLDER_IMAGE, mrp: 220, price: 110, unit: "1 Box" },
  { id: "ring-gun-cap", serial: 12, name: "Ring Gun+cap 10 pkt", image: PLACEHOLDER_IMAGE, mrp: 340, price: 170, unit: "1 PCE" },
  { id: "cannon-ball", serial: 13, name: "Cannon Ball 6pc", image: PLACEHOLDER_IMAGE, mrp: 320, price: 160, unit: "1 BOX" },
  { id: "waterfalls-gun", serial: 14, name: "WATER FALLS GUN", image: PLACEHOLDER_IMAGE, mrp: 330, price: 165, unit: "1 PCE" },
  { id: "gun-shooter-crackling", serial: 15, name: "Gun shooter 5pc crackling", image: PLACEHOLDER_IMAGE, mrp: 340, price: 170, unit: "Box" },
];

interface ProductListingProps {
  initialProducts?: Product[];
}

const ProductListing: React.FC<ProductListingProps> = ({
  initialProducts = DUMMY_PRODUCTS,
}) => {
  const [products] = useState<Product[]>(initialProducts);
  const { items: cartItems, addItem, updateQuantity } = useCart();
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(
    null
  );

  const getQty = (id: string) => cartItems.find((i) => i.id === id)?.quantity ?? 0;

  const setQty = (product: Product, value: number) => {
    const clamped = Math.max(0, value);
    const alreadyInCart = cartItems.some((i) => i.id === product.id);

    if (!alreadyInCart) {
      if (clamped > 0) {
        addItem(
          { id: product.id, name: product.name, image: product.image, price: product.price },
          clamped
        );
      }
      return;
    }

    updateQuantity(product.id, clamped);
  };

  return (
    <section className="w-full bg-white px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
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
                {/* Serial number badge */}
                <span className="absolute -left-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white shadow">
                  {product.serial}
                </span>

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
                    setPreviewImage({ src: product.image, alt: product.name })
                  }
                  aria-label={`View larger image of ${product.name}`}
                  style={{ backgroundColor: isSelected ? "#f7f3c8" : "#fdfce8" }}
                  className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md transition hover:opacity-80"
                >
                  <Image
                    src={product.image}
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
                    <span className="text-xs text-gray-500">/ {product.unit}</span>
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