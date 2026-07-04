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
    title: "Quality",
    description: "Quality & innovation are the key behind our success",
  },
  {
    icon: Wand2,
    title: "Safe to Use",
    description: "Crackers we offer are safe & are made from fine quality raw materials",
  },
  {
    icon: Tag,
    title: "Genuine Price",
    description: "Quality products at economic price is the main motto for us",
  },
  {
    icon: HeartHandshake,
    title: "Customer Satisfaction",
    description: "Our quality and timely delivery has attracted customers easily",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="w-full overflow-hidden bg-white px-4 py-16 sm:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        {/* Left: heading + text */}
        <AnimatedReveal direction="left">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Why <span className="text-red-600">Choose Us</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-700">
            We have 5+ years of experience in the crackers business. We are
            the direct dealer of all leading and reputed brands. We provide
            high-quality crackers at a competitive price. We have wide range
            of crackers collections for all types of celebrations. We give
            you quick response with 24/7 support and on-time delivery.
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
