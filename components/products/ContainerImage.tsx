"use client";

import Image from "next/image";

interface ContainerImageProps {
  src: string;
  alt: string;
  height?: number;
  priority?: boolean;
  className?: string;
}

const ContainerImage = ({
  src,
  alt,
  height = 600,
  priority = false,
  className = "",
}: ContainerImageProps) => {
  return (
<section className={`w-full ${className}`}>
  <div
    className="
      relative
      w-full
      overflow-hidden
     
     
      h-[220px]
      sm:h-[320px]
      md:h-[420px]
      lg:h-[500px]
      xl:h-[600px]
    "
  >
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="100vw"
      className="object-cover transition-transform duration-500 hover:scale-105"
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

<div className="absolute inset-0 flex items-center">
  <div className="max-w-2xl px-6 sm:px-10 lg:px-16 text-white">
    <h1 className="text-3xl font-bold sm:text-5xl lg:text-6xl">
      Celebrate Diwali with
      <span className="block text-[#FABD23]">Ultra Crackers</span>
    </h1>

    <p className="mt-4 max-w-xl text-sm sm:text-lg text-white/90">
      Premium quality fireworks at wholesale prices. Safe, colorful,
      and delivered to your doorstep.
    </p>

    {/* <button className="mt-8 rounded-xl bg-[#4361EE] px-8 py-4 font-semibold text-white transition hover:bg-[#3651D4]">
      Shop Now
    </button> */}
  </div>
</div>

              
  </div>
</section>
  );
};

export default ContainerImage;