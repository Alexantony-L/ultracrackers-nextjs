// import React from "react";
// import Image from "next/image";
// import AnimatedReveal from "./AnimatedReveal";

// /**
//  * CrackersShopGallery
//  * Centered "Our Crackers Shop" heading followed by a responsive row of
//  * shop-interior photos. Each image fades/slides up on scroll, staggered.
//  *
//  * NOTE: Replace each path in `SHOP_IMAGES` with your actual shop photos.
//  */

// const SHOP_IMAGES = [
//   "/shop1.webp", // <-- update this path
//   "/shop2.webp", // <-- update this path
//   "/shop3.webp", // <-- update this path
//   "/shop4.webp", // <-- update this path
// ];

// const CrackersShopGallery: React.FC = () => {
//   return (
//     <section className="w-full overflow-hidden bg-white px-4 py-16 sm:px-8">
//       <div className="mx-auto max-w-6xl">
//         <AnimatedReveal direction="up" className="text-center">
//           <h2 className="text-2xl font-bold text-[#4361EE] sm:text-3xl">
//             Our Cracker Shop
//           </h2>
//         </AnimatedReveal>

//         <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
//           {SHOP_IMAGES.map((src, idx) => (
//             <AnimatedReveal key={src} direction="up" delay={idx * 0.1}>
//               <div className="relative h-40 w-full overflow-hidden rounded shadow-sm sm:h-48">
//                 <Image
//                   src={src}
//                   alt={`Crackers shop interior ${idx + 1}`}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             </AnimatedReveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CrackersShopGallery;



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