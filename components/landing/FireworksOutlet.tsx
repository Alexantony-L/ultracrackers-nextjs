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
const BUNDLE_IMAGE_SRC = "/dummy.webp"; // <-- update this path

const FireworksOutlet: React.FC = () => {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-16 sm:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        {/* Left: text */}
        <AnimatedReveal direction="left">
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">
            Fireworks Direct Outlet
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-700">
            We are selling branded fireworks products to our valuable
            customers in all working days with reasonable rates.
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
