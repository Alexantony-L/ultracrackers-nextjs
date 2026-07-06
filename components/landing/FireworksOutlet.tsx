import React from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedReveal from "./AnimatedReveal";

/**
 * FireworksOutlet
 * Left: "Fireworks Direct Outlet" heading + description + "Request a quote"
 * link (animates from the left).
 * Right: product images — sparklers/incense sticks and fireworks bundles
 * (animates from the right).
 *
 * NOTE: Replace the image paths with your actual product photos.
 */

const STICKS_IMAGE_SRC = "/dummy.webp"; // <-- update this path
const BUNDLE_IMAGE_SRC = "/crackers_minimal.png"; // <-- update this path

const FireworksOutlet: React.FC = () => {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-16 sm:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        {/* Left: text */}
        <AnimatedReveal direction="left">
          <h2 className="text-2xl font-bold text-[#4361EE] sm:text-3xl">
            Premium Fireworks from Sivakasi
          </h2>

          <p className="mt-4 text-base leading-8 text-gray-600">
            Experience the joy of celebrations with our carefully curated collection
            of premium fireworks. We are committed to delivering quality, safety, and
            exceptional value through a wide selection of crackers for families,
            retailers, and festive events across India.
          </p>
          {/* <Link
            href="/quick-order"
            className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline"
          >
            Request a quote
          </Link> */}
        </AnimatedReveal>

        {/* Right: product images */}
        <AnimatedReveal direction="right" className="flex items-end justify-center gap-6">

          <Image
            src={BUNDLE_IMAGE_SRC}
            alt="Fireworks bundles"
            width={280}
            height={260}
            className="h-56 w-auto object-contain"
          />
        </AnimatedReveal>
      </div>
    </section>
  );
};

export default FireworksOutlet;
