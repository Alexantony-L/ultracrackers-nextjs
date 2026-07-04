import React from "react";
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

export interface Product {
  id: string;
  name: string;
  image: string;
}

const DUMMY_PRODUCTS: Product[] = [
  { id: "bijili-crackers", name: "Bijili Crackers", image: "/images/products/placeholder.png" },
  { id: "single-sound", name: "Single Sound", image: "/images/products/placeholder.png" },
  { id: "atom-bomb", name: "Atom Bomb", image: "/images/products/placeholder.png" },
  { id: "rockets", name: "Rockets", image: "/images/products/placeholder.png" },
  { id: "ground-chakars", name: "Ground Chakars", image: "/images/products/placeholder.png" },
  { id: "flower-pots", name: "Flower Pots", image: "/images/products/placeholder.png" },
  { id: "sparklers", name: "Sparklers", image: "/images/products/placeholder.png" },
  { id: "pencils", name: "Pencils", image: "/images/products/placeholder.png" },
  { id: "colour-matches", name: "Colour Matches", image: "/images/products/placeholder.png" },
  { id: "fancy-fountains", name: "Fancy Fountains", image: "/images/products/placeholder.png" },
  { id: "sky-shots", name: "Sky Shots", image: "/images/products/placeholder.png" },
];

interface OurProductsProps {
  products?: Product[];
}

const BG_IMAGE_SRC = "/images/products-bg-fireworks.jpg"; // <-- update this path

const OurProducts: React.FC<OurProductsProps> = ({ products = DUMMY_PRODUCTS }) => {
  return (
    <section className="relative w-full overflow-hidden  px-4 py-16 sm:px-8">
      {/* Background fireworks image */}
      <Image
        src={BG_IMAGE_SRC}
        alt=""
        fill
        className="object-cover opacity-40"
      />
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
          {products.map((product, idx) => (
            <AnimatedReveal key={product.id} direction="up" delay={(idx % 4) * 0.08}>
              <div className="flex flex-col items-center gap-4 rounded-lg bg-orange-50 px-4 py-8">
                <div className="relative h-20 w-20">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm font-semibold text-blue-700">{product.name}</p>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
