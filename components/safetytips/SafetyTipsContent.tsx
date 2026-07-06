import React from "react";
import { Check, X } from "lucide-react";

/**
 * SafetyTipsContent
 * Intro heading/paragraph followed by a two-column "Do's" / "Don'ts" list,
 * each item with a bold title and a short description.
 */

const DOS = [
  {
    title: "Instructions",
    description: "Display fireworks as per the instructions mentioned on the pack.",
  },
  {
    title: "Outdoor",
    description: "Use fireworks only outdoor",
  },
  {
    title: "Branded Fireworks",
    description: "Buy fireworks from authorized / reputed manufacturers only.",
  },
  {
    title: "Distance",
    description:
      "Light only one firework at a time, by one person. Others should watch from a safe distance.",
  },
  {
    title: "Supervision",
    description: "Always have adult supervision",
  },
  {
    title: "Water",
    description: "Keep two buckets of water handy. In the event of fire or any mishap.",
  },
];

const DONTS = [
  {
    title: "Don't make tricks",
    description: "Never make your own fireworks.",
  },
  {
    title: "Don't relight",
    description: "Never try to re-light or pick up fireworks that have not ignited fully.",
  },
  {
    title: "Don't carry it",
    description: "Never carry fireworks in your pockets",
  },
  {
    title: "Don't Touch it",
    description:
      "After fireworks display never pick up fireworks that may be left over, they still may be active.",
  },
  {
    title: "Do not use Glass / Metal",
    description: "Never shoot fireworks in a metal or glass containers.",
  },
  {
    title: "Don't wear loose clothes",
    description: "Do not wear loose clothing while using fireworks.",
  },
];

const SafetyTipsContent: React.FC = () => {
  return (
    <section className="w-full bg-white px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Intro */}
        <h2 className="text-2xl font-bold text-[#1E3A8A] sm:text-3xl">
         Ultra Crackers 
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-700">
          There are certain Do&apos;s &amp; Don&apos;ts to follow while purchasing,
          bursting and storing crackers. Thus, it is very important to follow
          the precautions while bursting crackers. A little negligence,
          ignorance and carelessness can cause a fatal injury.
        </p>

        {/* Do's / Don'ts columns */}
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-16">
          {/* Do's */}
          <div>
            <h3 className="border-b border-gray-200 pb-3 text-2xl font-semibold text-indigo-900">
              Do&apos;s
              <span className="mt-1 block h-0.5 w-8 bg-red-600" />
            </h3>
            <ul className="mt-6 space-y-6">
              {DOS.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div>
            <h3 className="border-b border-gray-200 pb-3 text-2xl font-semibold text-indigo-900">
              Don&apos;ts
              <span className="mt-1 block h-0.5 w-8 bg-red-600" />
            </h3>
            <ul className="mt-6 space-y-6">
              {DONTS.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <X className="mt-1 h-4 w-4 flex-shrink-0 text-red-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyTipsContent;
