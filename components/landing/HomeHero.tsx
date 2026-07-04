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
          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Crackers Win Crackers
          </h1>
          <p className="mt-3 text-sm font-bold uppercase tracking-wide text-gray-800">
            We Have The Glory Begining In Fireworks Business
          </p>
          <p className="mt-6 text-sm leading-relaxed text-gray-600">
            Crackers Win Crackers has been a well-known Fireworks Store in
            Sivakasi. What started out as a hobby, has become our passion and
            we&apos;re delighted to share it with you. we&apos;re committed to
            offering quality products, unparalleled service and the most
            competitive prices in town. Great service begins with great
            people and industry experience, which is why our staff is made up
            of the best and most qualified in the business.
          </p>
        </AnimatedReveal>
      </div>
    </section>
  );
};

export default HomeHero;
