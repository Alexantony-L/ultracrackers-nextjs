

import React from "react";
import {
  ShieldCheck,
  BadgeIndianRupee,
  Truck,
  Gift,
  Sparkles,
  Headset,
} from "lucide-react";
import AnimatedReveal from "./AnimatedReveal";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    description:
      "We offer only genuine branded fireworks that are quality checked for a safe celebration.",
    iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100/50 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500",
  },
  {
    icon: BadgeIndianRupee,
    title: "Factory Prices",
    description:
      "Enjoy wholesale pricing with the best value on a wide range of fireworks.",
    iconBg: "bg-amber-50 text-amber-600 border border-amber-100/50 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Timely and secure delivery to ensure your festive shopping is hassle-free.",
    iconBg: "bg-sky-50 text-sky-600 border border-sky-100/50 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500",
  },
  {
    icon: Gift,
    title: "Gift Boxes",
    description:
      "Choose from attractive gift packs perfect for families, friends, and corporate gifting.",
    iconBg: "bg-rose-50 text-rose-600 border border-rose-100/50 group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500",
  },
  {
    icon: Sparkles,
    title: "Wide Product Range",
    description:
      "From sparklers to aerial fireworks, explore a complete collection for every celebration.",
    iconBg: "bg-purple-50 text-purple-600 border border-purple-100/50 group-hover:bg-purple-500 group-hover:text-white group-hover:border-purple-500",
  },
  {
    icon: Headset,
    title: "Customer Support",
    description:
      "Our team is always ready to assist you with product selection and order support.",
    iconBg: "bg-indigo-50 text-indigo-600 border border-indigo-100/50 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500",
  },
];

const WhyChooseUltraCrackers: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <AnimatedReveal direction="up">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#4361EE] sm:text-4xl">
              Why Choose Ultra Crackers?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              We are committed to providing high-quality fireworks, competitive
              prices, and reliable service to make your celebrations brighter
              and safer.
            </p>
          </div>
        </AnimatedReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <AnimatedReveal
                key={feature.title}
                direction="up"
                delay={index * 0.1}
              >
                <div className="group h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#4361EE] hover:shadow-lg">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 ${feature.iconBg}`}>
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUltraCrackers;