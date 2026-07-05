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
    number: "01",
    title: "", // no title shown for row 01 in the source design
    description: "",
    exploreHref: "/products",
    image: "/cracker1.webp", // <-- update this path
  },
  {
    number: "02",
    title: "Gift Boxes",
    description:
      "We are specialists in fireworks gift boxes collection. We have a wide range of cracker collections that's meant for all celebrations. The ease of sitting at home and ordering Fire Crackers this festive season at a very affordable price.",
    exploreHref: "/products",
    image: "/cracker2.webp", // <-- update this path
  },
];

const FeatureShowcase: React.FC = () => {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl space-y-20">
        {ROWS.map((row) => (
          <div
            key={row.number}
            className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16"
          >
            {/* Left: number + title + description + link */}
            <AnimatedReveal direction="left">
              <span className="text-lg font-semibold text-gray-400">{row.number}</span>
              {row.title && (
                <h3 className="mt-2 text-2xl font-bold text-gray-900">{row.title}</h3>
              )}
              {row.description && (
                <p className="mt-4 text-sm leading-relaxed text-gray-700">
                  {row.description}
                </p>
              )}
              <Link
                href={row.exploreHref}
                className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
              >
                Explore Now
              </Link>
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
