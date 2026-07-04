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

const SEAL_IMAGE_SRC = "/trusted_logo.png"; 

const MAP_LINK = 
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31487.018627975347!2d77.8066977028841!3d9.432157503066504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cb86df4d7425%3A0xa8777c3077322058!2sCelebrity%20Crackers!5e0!3m2!1sen!2sin!4v1661878160597!5m2!1sen!2sin"; // <-- update this path/URL


const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Celebrity Crackers", href: "/about" },
  { label: "Fire Crackers", href: "/fire-crackers" },
  { label: "Fireworks Gift Box", href: "/gift-box" },
  { label: "Price List", href: "/price-list" },
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
          <h3 className="mt-4 text-lg font-bold text-teal-600">Our Showroom</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            Advik Pyro World 14/452/1, Sri Annamalaiyar Nagar , Sivakasi to
            Sattur Main Road Anupankulam, Sivakasi (East)- 626 189
          </p>
        </div>

        {/* Column 2: Contact Us */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">Contact Us</h3>

          <div className="mt-4">
            <h4 className="font-semibold text-teal-600">Whats App</h4>
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
            <h4 className="font-semibold text-teal-600">Mobile</h4>
            <a
              href="tel:+918668130949"
              className="mt-1 flex items-center gap-2 text-sm text-gray-700 hover:text-teal-600"
            >
              <Phone className="h-4 w-4" />
              +91 8668130949
            </a>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-teal-600">Email</h4>
            <a
              href="mailto:celebritycrackers@gmail.com"
              className="mt-1 flex items-center gap-2 text-sm text-gray-700 hover:text-teal-600"
            >
              <Mail className="h-4 w-4" />
              celebritycrackers@gmail.com
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
                className="rounded bg-teal-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-teal-600"
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
