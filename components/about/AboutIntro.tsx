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
          <h2 className="text-3xl font-semibold text-[#1E3A8A] sm:text-4xl">About</h2>
          <h1 className="mt-1 text-3xl font-bold text-[#1E3A8A] sm:text-4xl">
            Ultra Crackers 
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-gray-600">
           With years of experience in the fireworks industry, Ultra Crackers has earned the trust of customers by delivering quality, safety, and value. Based in Sivakasi, the heart of India's fireworks manufacturing, we operate with our own showroom and warehouse to ensure a wide selection of premium products is always available.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
        We carefully source our fireworks during the ideal production season to maintain the highest quality standards while offering competitive wholesale prices. Whether you're celebrating Diwali, a wedding, a birthday, a corporate event, a temple festival, or any special occasion, we provide fireworks that create unforgettable moments. Our commitment to quality, affordable pricing, and reliable year-round service makes Ultra Crackers your trusted destination for festive celebrations.
          </p>
        </AnimatedReveal>
      </div>
    </section>
  );
};

export default AboutIntro;
