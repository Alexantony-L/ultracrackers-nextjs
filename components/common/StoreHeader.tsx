import React from "react";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";

/**
 * StoreHeader
 * Top info bar: business name + address (left), trust seal image (center),
 * WhatsApp + phone contact (right).
 *
 * NOTE: Replace `SEAL_IMAGE_SRC` below with the actual path to your
 * "Seal of Trust" image (e.g. "/images/seal-of-trust.png").
 */

const SEAL_IMAGE_SRC = "/ultrcrackers_logo.png";

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.23-8.24 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.16.24-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.24-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.24.25-.4.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.65.31-.23.24-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.16 1.73 2.64 4.2 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z" />
  </svg>
);

const StoreHeader: React.FC = () => {
  return (
    <header className="w-full border-b border-blue-200 bg-white">
      <div className="mx-auto flex justify-center px-4 py-4 sm:max-w-7xl sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-6 sm:px-8">
        {/* Left: Business name + address */}
        <div className="hidden min-w-0 justify-self-start sm:block">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-[#f8ab13] sm:text-xl">
              Ultra Crackers
            </h2>
            <div className="mt-1 flex items-start gap-2 text-sm text-gray-800">
              <div className="flex flex-col leading-snug">
                    Door no: 2/229 plot no 1008
survey no: 228/30
village e.muthu linga puram
taluk sattur
district virudhunagar
              </div>
            </div>
          </div>
        </div>

        {/* Center: Seal of Trust image */}
        <div className="flex justify-center ring-gray-100 sm:justify-self-center">
          <Image
            src={SEAL_IMAGE_SRC}
            alt="Seal of Trust - Celebrity Crackers Original"
            width={280}

            height={280}
            priority
            className="h-40 w-40 object-contain sm:h-36 sm:w-36 md:h-44 md:w-44"
            // quality={100}
          />
        </div>

        {/* Right: Contact info */}
        <div className="hidden flex-shrink-0 flex-col items-end gap-1 justify-self-end text-sm text-gray-800 sm:flex">
          <a
            href="https://wa.me/919360528398"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-teal-600"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#f8ab13]" />
            <span>+91 9360528398</span>
          </a>
          <a
            href="tel:+919360528398"
            className="flex items-center gap-2 hover:text-teal-600"
          >
            <Phone className="h-4 w-4 text-[#f8ab13]" />
            <span>+91 8526230861</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default StoreHeader;
