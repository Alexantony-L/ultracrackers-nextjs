'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AnimatedReveal from "@/components/landing/AnimatedReveal"; // adjust path to wherever you placed AnimatedReveal


/**
 * OurProducts
 * Red fireworks-background section with a heading, description, and a
 * responsive grid of product cards.
 *
 * DUMMY DATA NOTE:
 * `DUMMY_PRODUCTS` below is placeholder data with placeholder image paths.
 * This component accepts an optional `products` prop, so once you're
 * fetching from your API, just pass the fetched array in instead — no
 * changes needed to the component itself. Example:
 *
 *   const products = await fetch("/api/products").then((r) => r.json());
 *   <OurProducts products={products} />
 *
 * Each product just needs { id, name, image } shape to work.
 */

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}


const BG_IMAGE_SRC = "/images/products-bg-fireworks.jpg"; // <-- update this path

const OurProducts: React.FC= () => {
  const [categories, setCategories] = useState<Category[]>([]);

 useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to load categories");

        const data = await response.json();
        setCategories(data);
    
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  console.log("Fetched categories:", categories);
  return (
    <section className="relative w-full overflow-hidden  px-4 py-16 sm:px-8">
      {/* Background fireworks image */}

      <div className="absolute inset-0 " />

      <div className="relative mx-auto max-w-6xl">
        <AnimatedReveal direction="up" className="text-center">
          <h2 className="text-3xl font-bold text-red-700 sm:text-4xl">Our Products</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-black">
            Our motto is to make every festival celebration bright and safe.
            This, we bring out with our wide range of firecrackers. With over
            200 varieties of crackers developed and marketed every year, we
            are among the most sought brands in the Sivakasi region and
            around the country. Our products are known for their safety and
            we take great efforts to ensure that all our orders are
            delivered in a standard time frame with an economical pricing.
          </p>
        </AnimatedReveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((category, idx) => (
            <AnimatedReveal key={category.id} direction="up" delay={(idx % 4) * 0.08}>
              <div className="flex flex-col items-center gap-4 rounded-lg bg-orange-50 px-4 py-8">
                <div className="relative h-20 w-20">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm font-semibold text-blue-700">{category.name}</p>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
