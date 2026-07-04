import React from "react";
import AnimatedReveal from "@/components/landing/AnimatedReveal"; // adjust path to wherever you placed AnimatedReveal

/**
 * VisionMission
 * Simple text section: "Our Vision & Mission" heading followed by
 * three statements. Fades/slides up as it scrolls into view.
 */

const VisionMission: React.FC = () => {
  return (
    <section className="w-full bg-white px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <AnimatedReveal direction="up">
          <h2 className="text-2xl font-bold text-red-600 sm:text-3xl">
            Our Vision &amp; Mission
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-700">
            <p>
              To maintain quality of crackers in every aspect by offering
              safe, unique and environmental-friendly sparklers.
            </p>
            <p>
              To be the first class wholesale &amp; retail Company, producing
              safe and compliant crackers with{" "}
              <span className="font-semibold">HIGHEST QUALITY</span> at low
              price enabling you to spread joy and happiness.
            </p>
            <p>
              &ldquo;To provide genuine fireworks at the best price, while
              strictly following Supreme Court orders and PESO regulations.&rdquo;
            </p>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
};

export default VisionMission;
