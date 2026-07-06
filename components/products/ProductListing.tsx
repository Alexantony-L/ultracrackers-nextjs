"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Minus, Plus, X, LoaderCircle, ZoomIn, Flame, Icon } from "lucide-react";
import { useCart } from "@/components/cart/CartContext"; // adjust path to wherever CartContext lives
import { ShoppingBag, Tag } from "lucide-react";
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

  const [localQuantities, setLocalQuantities] = useState<Record<number, number>>({});

  // Sync local quantities with the cart when cart items are updated
  useEffect(() => {
    const newLocal: Record<number, number> = {};
    for (const item of cartItems) {
      newLocal[Number(item.id)] = item.quantity;
    }
    setLocalQuantities(newLocal);
  }, [cartItems]);

  const getDisplayQty = (productId: number) => {
    return localQuantities[productId] ?? 0;
  };

  const handleStepperChange = (productId: number, val: number) => {
    setLocalQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, val),
    }));
  };

  const handleAddToCart = (product: Product) => {
    const currentLocal = localQuantities[product.id] ?? 0;
    const inCartQty = getQty(product.id);

    let targetQty = currentLocal;
    if (inCartQty === 0 && currentLocal === 0) {
      targetQty = 1;
    }

    setQty(product, targetQty);
  };

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

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((product) => (product.category?.name ?? "Other") === selectedCategory);
  }, [products, selectedCategory]);

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

  const originalTotal = cartSummary.amount + cartSummary.discount;
  const percentSaved = originalTotal > 0
    ? Math.round((cartSummary.discount / originalTotal) * 100)
    : 0;

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

          <div className="flex flex-col gap-4 rounded-2xl border border-[#DCE4FF] bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:gap-0 sm:px-6 sm:py-4">

            {/* Selected — supporting info */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-[#4361EE]">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                  Selected
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {cartSummary.selectedProducts} products
                  <span className="ml-1 font-medium text-gray-400">· {cartSummary.selectedQuantity} qty</span>
                </p>
              </div>
            </div>

            <div className="hidden h-10 w-px bg-[#DCE4FF] sm:mx-6 sm:block" />
            <div className="h-px w-full bg-[#DCE4FF] sm:hidden" />

            {/* Amount — the hero figure */}
            <div className="sm:flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                Total amount
              </p>
              <p className="text-2xl font-black text-[#1E3A8A] sm:text-3xl">
                ₹{cartSummary.amount.toLocaleString("en-IN")}
              </p>
            </div>

            {/* Discount — framed as a savings badge, not just a number */}
            {cartSummary.discount > 0 && (
              <div className="flex items-center gap-2 self-start rounded-full bg-green-50 px-3 py-1.5 sm:self-center">
                <Tag className="h-3.5 w-3.5 text-green-700" />
                <p className="text-xs font-bold text-green-700 sm:text-sm">
                  You saved ₹{cartSummary.discount.toLocaleString("en-IN")}
                  <span className="ml-1 font-medium text-green-600">({percentSaved}%)</span>
                </p>
              </div>
            )}

          </div>


          <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">

            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
              Filter By Crackers category
            </p>

            <div
              className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Filter products by category"
            >
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === "All"}
                onClick={() => setSelectedCategory("All")}
                className={`
        shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition
        ${selectedCategory === "All"
                    ? "bg-[#4361EE] text-white shadow-sm"
                    : "border border-[#DCE4FF] bg-[#F8FAFF] text-gray-600 hover:border-[#4361EE] hover:text-[#4361EE]"
                  }
      `}
              >
                All categories
              </button>

              <div
                className="flex gap-5 overflow-x-auto border-b border-gray-200 pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                role="tablist"
                aria-label="Filter products by category"
              >
                {categoryNames.map((categoryName) => {
                  // const Icon = getCategoryIcon(categoryName);
                  const isActive = selectedCategory === categoryName;

                  return (
                    <button
                      key={categoryName}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(categoryName)}
                      className={`
          group relative flex shrink-0 items-center gap-1.5 whitespace-nowrap pb-3 pt-1 text-sm font-semibold transition
          ${isActive ? "text-[#4361EE]" : "text-gray-500 hover:text-[#4361EE]"}
        `}
                    >
                      {/* <Icon className={`h-4 w-4 transition ${isActive ? "text-[#4361EE]" : "text-gray-400 group-hover:text-[#4361EE]"}`} /> */}
                      {categoryName}
                      <span
                        className={`
            absolute -bottom-px left-0 h-[2.5px] w-full rounded-full bg-[#4361EE] transition-transform duration-200
            ${isActive ? "scale-x-100" : "scale-x-0"}
          `}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {filteredProducts.map((product, index) => {
              const qty = getQty(product.id);
              const displayQty = getDisplayQty(product.id);
              const lineTotal = displayQty * product.price;
              const isSelected = qty > 0;
              const categoryName = product.category?.name ?? "Other";

              return (
                <div
                  key={product.id}
                  className={`
                    group relative flex flex-col justify-between overflow-hidden shadow-xl rounded-md   bg-white transition-all duration-500
                    ${isSelected
                      ? " ring-2 ring-[#4361EE]/15 shadow-[0_8px_20px_-6px_rgba(67,97,238,0.2)]"
                      : "border-slate-100 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)]  hover:shadow-[0_8px_20px_-6px_rgba(67,97,238,0.25)] hover:-translate-y-1"
                    }
                  `}
                >
                  {/* Media Area */}
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewImage({
                        src: product.imageUrl,
                        alt: product.name,
                      })
                    }
                    className="relative flex h-36 w-full cursor-zoom-in items-center justify-center overflow-hidden bg-gradient-to-b from-[#F3F6FF]/60 to-white sm:h-40 lg:h-44"
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-105"
                      loading={index < 4 ? "eager" : "lazy"}
                    />

                    {/* Premium Discount Badge */}
                    {product.mrp > product.price && (
                      <div className="absolute left-2.5 top-2.5 z-20 flex items-center gap-1.5 rounded-lg bg-rose-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                        <Flame className="h-2.5 w-2.5 text-yellow-300 fill-yellow-300" strokeWidth={2.5} />
                        {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                      </div>
                    )}

                    {/* Floating Selected Qty Circle */}
                    {isSelected && (
                      <div className="absolute right-2.5 top-2.5 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-[#4361EE] text-[10px] font-bold text-white shadow-sm border border-white/20">
                        {qty}
                      </div>
                    )}

                    {/* Glassmorphic Zoom Indicator */}
                    <div className="absolute bottom-2.5 right-2.5 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[#4361EE] opacity-0 shadow-md backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 hover:bg-[#4361EE] hover:text-white">
                      <ZoomIn className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                  </button>

                  {/* Content Area */}
                  <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
                    <div className="space-y-2">
                      {/* Category Name Kicker */}
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                          {categoryName}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          In Stock
                        </span>
                      </div>

                      {/* Product Title */}
                      <h3
                        className="font-serif text-sm font-bold leading-snug text-slate-900 group-hover:text-[#4361EE] transition-colors line-clamp-1"
                        title={product.name}
                      >
                        {product.name}
                      </h3>

                      {/* Price Row */}
                      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                        <span className="font-sans text-lg font-black text-[#4361EE]">
                          ₹{product.price}
                        </span>
                        {product.mrp > product.price && (
                          <>
                            <span className="text-xs text-slate-400 line-through">
                              ₹{product.mrp}
                            </span>
                            <span className="rounded-md bg-green-50 border border-green-100 px-1.5 py-0.5 text-[9px] font-bold text-green-700">
                              Save ₹{product.mrp - product.price}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    {/* Line Total Badge if selected */}
                    {displayQty > 0 && (
                      <div className="flex items-center justify-between rounded-xl border border-[#DCE4FF] bg-[#F8FAFF] px-2.5 py-1.5 text-[11px] transition-all">
                        <span className="font-semibold text-slate-500 uppercase tracking-wider text-[9px]">
                          Item total
                        </span>
                        <span className="font-bold text-[#4361EE]">
                          ₹{lineTotal.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                    {/* Actions Control Section */}
                    <div className="mt-3.5 space-y-2">
                      <div className="flex items-center gap-2">
                        {/* Minimally designed Pill Stepper */}
                        <div className="flex items-center justify-between rounded-xl border border-[#DCE4FF] bg-[#F8FAFF] p-1 w-24 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleStepperChange(product.id, displayQty - 1)}
                            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg transition-colors text-red-500 hover:bg-red-500 hover:text-white bg-red-50/50"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>

                          <input
                            type="number"
                            min={0}
                            value={displayQty}
                            onChange={(e) =>
                              handleStepperChange(product.id, Number(e.target.value) || 0)
                            }
                            className="w-6 bg-transparent text-center text-xs font-bold text-slate-900 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          />

                          <button
                            type="button"
                            onClick={() => handleStepperChange(product.id, displayQty + 1)}
                            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg transition-colors text-emerald-600 hover:bg-emerald-600 hover:text-white bg-emerald-50/50"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Upscale Action Button */}
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 rounded-xl bg-[#4361EE] py-2 text-center text-xs font-bold tracking-wider uppercase text-white transition-all duration-300 hover:bg-[#3651D4] hover:shadow-md hover:shadow-[#4361EE]/20 active:scale-[0.98]"
                        >
                          Add to cart
                        </button>
                      </div>


                    </div>
                  </div>
                </div>
              );
            })}
          </div>

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
