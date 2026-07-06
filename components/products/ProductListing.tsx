"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Minus, Plus, X, LoaderCircle } from "lucide-react";
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

const ProductListing: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const categoryNames = useMemo(
    () => groupedByCategory.map(([categoryName]) => categoryName),
    [groupedByCategory]
  );

  const visibleCategories = useMemo(() => {
    if (selectedCategory === "All") return groupedByCategory;
    return groupedByCategory.filter(([categoryName]) => categoryName === selectedCategory);
  }, [groupedByCategory, selectedCategory]);

  const getQty = (id: number) => cartItems.find((i) => i.id === String(id))?.quantity ?? 0;

  const cartSummary = useMemo(() => {
    const selectedProducts = cartItems.length;
    const selectedQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const amount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const mrpTotal = cartItems.reduce(
      (sum, item) => sum + (item.mrp ?? item.price) * item.quantity,
      0
    );

    return {
      selectedProducts,
      selectedQuantity,
      amount,
      discount: Math.max(0, mrpTotal - amount),
    };
  }, [cartItems]);

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
    <section className="w-full bg-white px-3 py-8 sm:px-6 sm:py-10 lg:px-8">
<div className="mx-auto my-10 max-w-7xl sm:my-14 lg:my-16">
  <div className="flex items-center justify-center gap-3 sm:gap-5">
    <div className="hidden h-px flex-1 bg-gray-300 sm:block" />

    <h2 className="text-center text-2xl font-black uppercase leading-tight tracking-[0.12em] text-[#1E3A8A] sm:text-4xl sm:tracking-[0.2em]">
      Explore Our Crackers
    </h2>

    <div className="hidden h-px flex-1 bg-gray-300 sm:block" />
  </div>

  <p className="mt-3 text-center text-sm text-gray-500 sm:mt-4 sm:text-base">
    Premium Quality Fireworks at Wholesale Prices
  </p>
</div>
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
          <div className="mx-auto max-w-7xl space-y-10 sm:space-y-12">
            <div className="grid gap-3 rounded-2xl border border-[#DCE4FF] bg-[#F8FAFF] p-3 shadow-sm sm:grid-cols-3 sm:p-4">
              <div className="rounded-xl bg-white px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                  Selected
                </p>
                <p className="mt-1 text-base font-extrabold text-[#1E3A8A] sm:text-lg">
                  {cartSummary.selectedProducts} Products
                </p>
                <p className="text-xs font-medium text-gray-500">
                  {cartSummary.selectedQuantity} Qty
                </p>
              </div>

              <div className="rounded-xl bg-white px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                  Amount
                </p>
                <p className="mt-1 text-base font-extrabold text-[#4361EE] sm:text-lg">
                  ₹{cartSummary.amount.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="rounded-xl bg-white px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                  Discount
                </p>
                <p className="mt-1 text-base font-extrabold text-green-700 sm:text-lg">
                  ₹{cartSummary.discount.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                  Filter Category
                </p>
                <h3 className="text-sm font-extrabold text-[#1E3A8A] sm:text-base">
                  Browse by cracker type
                </h3>
              </div>

              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="w-full rounded-xl border border-[#DCE4FF] bg-[#F8FAFF] px-3 py-2 text-sm font-semibold text-gray-800 outline-none transition focus:border-[#4361EE] focus:ring-2 focus:ring-[#4361EE]/15 sm:w-72"
                aria-label="Filter products by category"
              >
                <option value="All">All Categories</option>
                {categoryNames.map((categoryName) => (
                  <option key={categoryName} value={categoryName}>
                    {categoryName}
                  </option>
                ))}
              </select>
            </div>

{visibleCategories.map(([categoryName, categoryProducts]) => (
  <div key={categoryName} className="mb-8">



    {/* Category heading */}
<div className="mb-4 flex items-center gap-3">
  <div className="flex min-w-0 items-center gap-2 rounded-full border border-[#DCE4FF] bg-[#F8FAFF] px-3 py-2 shadow-sm sm:px-4">
    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#4361EE]" />
    <h2 className="min-w-0 break-words text-sm font-extrabold uppercase tracking-wide text-[#1E3A8A] sm:text-base">
      {categoryName}
    </h2>
  </div>
  <div className="h-px flex-1 bg-gradient-to-r from-[#DCE4FF] to-transparent" />
</div>
    {/* <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"> */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {categoryProducts.map((product) => {
        const qty = getQty(product.id);
        const lineTotal = qty * product.price;
        const isSelected = qty > 0;

        return (
     <div
  key={product.id}
  className={`
    group
    relative
    cursor-pointer
    overflow-hidden
    rounded-2xl
    border
    bg-white
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-[#4361EE]
    hover:shadow-xl
    ${
      isSelected
        ? "border-[#4361EE] ring-4 ring-[#4361EE]/10 bg-[#EEF2FF]"
        : "border-gray-200"
    }
  `}
>
  {/* Discount Badge */}
  {product.mrp > product.price && (
    <div className="absolute left-2 top-2 z-20 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs">
      {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
    </div>
  )}

  {/* Quantity Badge */}
  {isSelected && (
    <div className="absolute right-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-[#4361EE] text-xs font-bold text-white shadow-lg sm:right-4 sm:top-4 sm:h-8 sm:w-8 sm:text-sm">
      {qty}
    </div>
  )}

  {/* Image */}
  <button
    type="button"
    onClick={() =>
      setPreviewImage({
        src: product.imageUrl,
        alt: product.name,
      })
    }
    className="relative flex h-32 w-full cursor-zoom-in items-center justify-center overflow-hidden bg-[#F8FAFF] sm:h-52 lg:h-56"
  >
    <Image
      src={product.imageUrl}
      alt={product.name}
      fill
      className="object-contain p-3 transition duration-500 group-hover:scale-110 sm:p-6"
    />
  </button>

  {/* Content */}
  <div className="space-y-2 p-3 sm:space-y-4 sm:p-5">

    {/* Product Name */}
    <h3 className="line-clamp-2 cursor-pointer text-sm font-bold leading-5 text-gray-900 transition group-hover:text-[#4361EE] sm:text-lg sm:leading-6">
      {product.name}
    </h3>

    {/* Price */}
    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between">

      <div>

        <p className="text-[10px] uppercase tracking-wide text-gray-400 sm:text-xs sm:tracking-widest">
          Wholesale Price
        </p>

        <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">

          <span className="text-xl font-black text-[#4361EE] sm:text-3xl">
            ₹{product.price}
          </span>

          {product.mrp > product.price && (
            <span className="text-sm text-gray-400 line-through sm:text-lg">
              ₹{product.mrp}
            </span>
          )}

        </div>

      </div>

      <span className="shrink-0 whitespace-nowrap rounded-full bg-green-100 px-2 py-0.5 text-[8px] font-semibold leading-none text-green-700 sm:px-3 sm:py-1 sm:text-xs">
        In Stock
      </span>

    </div>

    {/* Quantity */}
    <div className="flex items-center justify-between rounded-full border border-[#DCE4FF] bg-[#F8FAFF] p-1">

      <button
        type="button"
        onClick={() => setQty(product, qty - 1)}
        className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#4361EE] hover:text-white sm:h-10 sm:w-10"
      >
        <Minus className="h-5 w-5" />
      </button>

      <input
        type="number"
        min={0}
        value={qty}
        onChange={(e) =>
          setQty(product, Number(e.target.value) || 0)
        }
        className="min-w-0 flex-1 bg-transparent text-center text-sm font-bold outline-none sm:text-lg"
      />

      <button
        type="button"
        onClick={() => setQty(product, qty + 1)}
        className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#4361EE] hover:text-white sm:h-10 sm:w-10"
      >
        <Plus className="h-5 w-5" />
      </button>

    </div>

    {/* Total */}
    {isSelected && (
      <div className="flex items-center justify-between rounded-xl border border-[#DCE4FF] bg-[#F8FAFF] px-2.5 py-1.5 sm:px-3 sm:py-2">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
          Total
        </p>

        <h3 className="text-sm font-extrabold text-[#4361EE] sm:text-lg">
          ₹{lineTotal.toLocaleString("en-IN")}
        </h3>
      </div>
    )}

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
            className="relative w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-2xl sm:max-w-md"
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
