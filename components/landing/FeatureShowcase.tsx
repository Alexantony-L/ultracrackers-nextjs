import React from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedReveal from "./AnimatedReveal";

/**
 * FeatureShowcase
 * Numbered rows: text/number/"Explore Now" on the left (animates from
 * the left), product illustration on the right (animates from the right).
 *
 * NOTE: Replace each `image` path with your actual product illustration.
 */

const ROWS = [
  {
    title: "Festival Gift Boxes",
    description:
      "Make every celebration unforgettable with our beautifully curated fireworks gift boxes. Featuring a handpicked selection of premium crackers, our gift packs are perfect for Diwali, weddings, birthdays, corporate events, and festive gifting. Enjoy the convenience of online ordering, competitive prices, and reliable doorstep delivery.",
    exploreHref: "/crackers",
    image: "/cracker2.webp",
  },
];

const FeatureShowcase: React.FC = () => {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl space-y-20">
        {ROWS.map((row,idx) => (
          <div
            key={idx+1}
            className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16"
          >
            {/* Left: number + title + description + link */}
            <AnimatedReveal direction="left">
              {row.title && (
                <h3 className="mt-2 text-2xl font-bold text-[#4361EE]">{row.title}</h3>
              )}
              {row.description && (
                <p className="mt-4 text-sm leading-relaxed text-gray-700">
                  {row.description}
                </p>
              )}
              {/* <Link
                href={row.exploreHref}
                className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
              >
                Explore Now
              </Link> */}
            </AnimatedReveal>

            {/* Right: image */}
            <AnimatedReveal direction="right" className="flex justify-center">
              <Image
                src={row.image}
                alt={row.title || "Fireworks products"}
                width={480}
                height={300}
                className="h-auto w-full max-w-sm object-contain"
              />
            </AnimatedReveal>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureShowcase;
