import React from "react";
import Image from "next/image";
import AnimatedReveal from "@/components/landing/AnimatedReveal"; // adjust path to wherever you placed AnimatedReveal


const DIYA_IMAGE_SRC = "/aboutside.webp"; 

const AboutIntro: React.FC = () => {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-16 sm:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        {/* Left: image */}
        <AnimatedReveal direction="left" className="flex justify-center">
          <div className="relative h-64 w-full max-w-md overflow-hidden rounded-lg sm:h-80">
            <Image
              src={DIYA_IMAGE_SRC}
              alt="Diwali diya illustration"
              fill
              className="object-cover"
            />
          </div>
        </AnimatedReveal>

        {/* Right: text */}
        <AnimatedReveal direction="right">
          <h2 className="text-3xl font-semibold text-gray-800 sm:text-4xl">About</h2>
          <h1 className="mt-1 text-3xl font-bold text-gray-900 sm:text-4xl">
            Ultra Crackers 
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-gray-600">
            This is an outcome of the experience and knowledge we share in
            the field of selling crackers. We are in the field of selling
            crackers. since our inception. We have our own exclusive
            showroom and godown in SIVAKASI. We offer the best quality
            products at best price. We procure the products well in advance
            during the best sun drying months of March, April and May to
            serve the customers with quality products at better price.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            We provide public &amp; private display shows for marriages,
            parties, gala events, product launches, temple festivals and
            award functions and sports nights. One can buy crackers from us
            round the year.
          </p>
        </AnimatedReveal>
      </div>
    </section>
  );
};

export default AboutIntro;
