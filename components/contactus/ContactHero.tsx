import React from "react";
import Image from "next/image";

const HERO_IMAGE_SRC = "/contact-banner.webp"; 

const ContactHero: React.FC = () => {
  return (
    <section className="relative h-48 w-full overflow-hidden sm:h-64 md:h-80">
      {/* Background image */}
      <Image
        src={HERO_IMAGE_SRC}
        alt="Fireworks display"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Centered title */}
      <div className="relative flex h-full items-center justify-center">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg sm:text-4xl md:text-5xl">
          Contact Us
        </h1>
      </div>
    </section>
  );
};

export default ContactHero;
