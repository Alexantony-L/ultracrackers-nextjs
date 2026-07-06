import React from "react";
import Image from "next/image";
import AnimatedReveal from "./AnimatedReveal";



const HERO_IMAGE_SRC = "/fireworks.webp"; 

const HomeHero: React.FC = () => {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-16 sm:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Left: image */}
        <AnimatedReveal direction="left" className="flex justify-center">
          <Image
            src={HERO_IMAGE_SRC}
            alt="Happy Diwali fireworks and gift boxes"
            width={520}
            height={420}
            className="h-auto w-full max-w-md object-contain"
          />
        </AnimatedReveal>

        {/* Right: text */}
        <AnimatedReveal direction="right" className="text-center md:text-center">
          <p className="text-sm font-medium text-gray-500">Welcome To</p>
          <h1 className="mt-2 text-3xl font-bold text-[#4361EE]
 sm:text-4xl">
            Ultra Crackers 
          </h1>
          <p className="mt-3 text-sm font-bold uppercase tracking-wide text-gray-800">
           Celebrating Every Festival with Quality & Trust
          </p>
          <p className="mt-6 text-sm leading-relaxed text-gray-600">
           At <b>Ultra Crackers</b>, we are dedicated to delivering premium-quality fireworks that bring excitement and joy to every celebration. Based in <b>Sivakasi</b>, we offer a wide collection of safe, reliable, and high-performance crackers at competitive prices. With a strong focus on quality, customer satisfaction, and timely delivery, we are committed to making every celebration brighter, safer, and truly unforgettable.

This version sounds more like a modern, premium e-commerce brand while avoiding claims (such as being the "best" or citing a specific history) that may be difficult to verify.
          </p>
        </AnimatedReveal>
      </div>
    </section>
  );
};

export default HomeHero;
