import React from "react";
import Image from "next/image";
import { MessageCircle, Phone, Mail } from "lucide-react";

/**
 * Footer
 * Four-column footer: Seal image + showroom address, Contact Us
 * (WhatsApp / Mobile / Email), Quick Links button grid, and a
 * Google Maps embed under "Reach Us". Copyright bar runs along the bottom.
 *
 * NOTE: Replace `SEAL_IMAGE_SRC` and `MAP_EMBED_SRC` with your actual
 * seal image path and Google Maps embed URL.
 */

const SEAL_IMAGE_SRC = "/ultrcrackers_logo.png";


const MAP_LINK ="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3936.3746129466126!2d77.90764997502328!3d9.388481090687863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMjMnMTguNSJOIDc3wrA1NCczNi44IkU!5e0!3m2!1sen!2sin!4v1783230369768!5m2!1sen!2sin"


const QUICK_LINKS = [
  { label: "Home", href: "/home" },
  { label: "About Ultra Crackers", href: "/about" },
  // { label: "Fire Crackers", href: "/fire-crackers" },
  // { label: "Fireworks Gift Box", href: "/gift-box" },
  // { label: "Price List", href: "/price-list" },
  { label: "Quick Purchase", href: "/quick-order" },
  { label: "Contact us", href: "/contact" },
];

const SafetyFooter: React.FC = () => {
  return (
    <footer className="w-full bg-gray-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-8 md:grid-cols-4 md:gap-8">
        {/* Column 1: Seal + Showroom */}
        <div>
          <Image
            src={SEAL_IMAGE_SRC}
            alt="Seal of Trust - Celebrity Crackers Original"
            width={110}
            height={110}
            className="h-24 w-24 object-contain"
          />
          <h3 className="mt-4 text-lg font-bold text-[#f8ab13]">Our Showroom</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-700 lowercase">
            door no: 2/229 plot no 1008
survey no: 228/30
village e.muthu linga puram
taluk sattur
district virudhunagar
          </p>
        </div>

        {/* Column 2: Contact Us */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">Contact Us</h3>

          <div className="mt-4">
            <h4 className="font-semibold text-[#f8ab13]">Whats App</h4>
            <a
              href="https://wa.me/918668130949"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center gap-2 text-sm text-gray-700 hover:text-teal-600"
            >
              <MessageCircle className="h-4 w-4" />
              +91 8668130949
            </a>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-[#f8ab13]">Mobile</h4>
            <a
              href="tel:+918668130949"
              className="mt-1 flex items-center gap-2 text-sm text-gray-700 hover:text-teal-600"
            >
              <Phone className="h-4 w-4" />
              +91 8668130949
            </a>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-[#f8ab13]">Email</h4>
            <a
              href="mailto:Ultracrackers2026@gmail.com"
              className="mt-1 flex items-center gap-2 text-sm text-gray-700 hover:text-teal-600"
            >
              <Mail className="h-4 w-4" />
              Ultracrackers2026@gmail.com
            </a>
          </div>
        </div>

        {/* Column 3: Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">Quick Links</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {QUICK_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded bg-[#f8ab13] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#d98c00]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Column 4: Reach Us (Map) */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">Reach Us</h3>
          <div className="relative mt-4 h-48 w-full overflow-hidden rounded shadow-sm">
            <iframe
              src={MAP_LINK}
              title="Celebrity Crackers Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            Open in Maps ↗
          </a>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-gray-200 py-4">
       <div className="flex flex-col items-center gap-1 sm:flex-row sm:justify-center sm:gap-2">
        <p>© {new Date().getFullYear()} Ultra Crackers. All Rights Reserved.</p>
      </div>
      </div>
    </footer>
  );
};

export default SafetyFooter;
