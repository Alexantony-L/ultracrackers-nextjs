import React from "react";
import Image from "next/image";
import AnimatedReveal from "./AnimatedReveal";

/**
 * OurShop
 * Centered "Our Crackers Shop" heading followed by a responsive row of
 * shop-interior photos. Each image fades/slides up on scroll, staggered.
 *
 * NOTE: Replace each path in `SHOP_IMAGES` with your actual shop photos.
 */

const SHOP_IMAGES = [
  "/shop5.jpg", // <-- update this path
  "/shop6.webp", // <-- update this path
  "/shop7.jpg", // <-- update this path
  "/shop9.webp", // <-- update this path
];

const OurShop: React.FC = () => {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <AnimatedReveal direction="up" className="text-center">
          <h2 className="text-2xl font-bold text-[#4361EE] sm:text-3xl">
            Our Cracker Shop
          </h2>
        </AnimatedReveal>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SHOP_IMAGES.map((src, idx) => (
            <AnimatedReveal key={src} direction="up" delay={idx * 0.1}>
              <div className="relative h-40 w-full overflow-hidden rounded shadow-sm sm:h-48">
                <Image
                  src={src}
                  alt={`Crackers shop interior ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurShop;

