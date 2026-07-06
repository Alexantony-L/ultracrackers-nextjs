import React from "react";
import { Puzzle, Wand2, Tag, HeartHandshake } from "lucide-react";
import AnimatedReveal from "./AnimatedReveal";

/**
 * WhyChooseUs
 * Left: "Why Choose Us" heading + description (animates from the left).
 * Right: 2x2 grid of feature cards (animates from the right, staggered).
 */

const FEATURES = [
  {
    icon: Puzzle,
    title: "Premium Quality",
    description:
      "Every firework is carefully selected to deliver vibrant displays, consistent performance, and an unforgettable festive experience.",
  },
  {
    icon: Wand2,
    title: "Safe to Use",
    description:
      "We source our fireworks from trusted Sivakasi manufacturers who follow strict quality and safety standards for reliable celebrations.",
  },
  {
    icon: Tag,
    title: "Best Value Pricing",
    description:
      "Enjoy premium-quality crackers at competitive wholesale prices with transparent pricing and exceptional value for every purchase.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Satisfaction",
    description:
      "We are committed to delivering quality products, prompt service, and on-time delivery to ensure every customer enjoys a hassle-free shopping experience.",
  },
];
const WhyChooseUs: React.FC = () => {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-16 sm:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        {/* Left: heading + text */}
        <AnimatedReveal direction="left">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Why <span className="text-[#4361EE]">Choose Us</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-700">
      At Ultra Crackers, we are committed to making every celebration brighter, safer, and more memorable. With years of experience in the fireworks industry, we bring you a carefully curated collection of premium-quality crackers from trusted manufacturers in Sivakasi. Our focus on quality, affordability, and customer satisfaction has made us a preferred choice for families, retailers, and event organizers
          </p>
        </AnimatedReveal>

        {/* Right: 2x2 feature grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 text-center">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <AnimatedReveal key={feature.title} direction="right" delay={idx * 0.1}>
                <Icon className="mx-auto h-7 w-7 text-gray-800" />
                <h3 className="mt-3 font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
