import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const SEAL_IMAGE_SRC = "/ultrcrackers_logo.png";

const MAP_LINK =
  "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3936.3746129466126!2d77.90764997502328!3d9.388481090687863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMjMnMTguNSJOIDc3wrA1NCczNi44IkU!5e0!3m2!1sen!2sin!4v1783230369768!5m2!1sen!2sin";

const QUICK_LINKS = [
  { label: "Home", href: "/home" },
  { label: "About Ultra Crackers", href: "/about" },
  { label: "Crackers", href: "/crackers" },
  { label: "Contact Us", href: "/contactus" },
  { label: "Safety Tips", href: "/safetytips" },
];

const SafetyFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#F8FAFF] text-gray-700">
      <div className="border-t border-[#DCE4FF] bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-3 sm:px-8">
          <div className="flex items-center gap-3 rounded-2xl border border-[#DCE4FF] bg-[#F8FAFF] p-4">
            <Phone className="h-5 w-5 shrink-0 text-[#4361EE]" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Call Us
              </p>
              <a href="tel:+918668130949" className="font-bold text-[#1E3A8A]">
                +91 8668130949
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#DCE4FF] bg-[#F8FAFF] p-4">
            <MessageCircle className="h-5 w-5 shrink-0 text-[#4361EE]" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                WhatsApp
              </p>
              <a
                href="https://wa.me/918668130949"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#1E3A8A]"
              >
                Quick Support
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#DCE4FF] bg-[#F8FAFF] p-4">
            <Mail className="h-5 w-5 shrink-0 text-[#4361EE]" />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Email
              </p>
              <a
                href="mailto:Ultracrackers2026@gmail.com"
                className="break-words font-bold text-[#1E3A8A]"
              >
                Ultracrackers2026@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-8 lg:grid-cols-[1.15fr_0.85fr_1.2fr]">
        <div>
          <div className="flex items-center gap-4">
            <Image
              src={SEAL_IMAGE_SRC}
              alt="Ultra Crackers logo"
              width={90}
              height={90}
              className="h-20 w-20 object-contain"
            />
            <div>
              <h3 className="text-2xl font-extrabold text-[#1E3A8A]">
                Ultra Crackers
              </h3>
              <p className="text-sm font-medium text-[#4361EE]">
                Premium quality fireworks at wholesale prices
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-600">
            Celebrate safely with quality crackers, friendly service, and a
            simple purchase experience from Ultra Crackers.
          </p>

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#DCE4FF] bg-white p-4">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#4361EE]" />
            <div>
              <h4 className="font-bold text-[#1E3A8A]">Our Showroom</h4>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                Door No: 2/229, Plot No: 1008, Survey No: 228/30, E. Muthu
                Linga Puram Village, Sattur Taluk, Virudhunagar District.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-[#1E3A8A]">Quick Links</h3>
          <div className="mt-4 grid gap-3">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-xl border border-[#DCE4FF] bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#4361EE] hover:text-[#4361EE] hover:shadow-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="text-lg font-extrabold text-[#1E3A8A]">Reach Us</h3>
              <p className="mt-1 text-sm text-gray-500">
                Visit our showroom or open the location in Google Maps.
              </p>
            </div>
            {/* <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-[#4361EE] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#1E3A8A]"
            >
              Open Map
            </a> */}
          </div>

          <div className="relative mt-4 h-64 w-full overflow-hidden rounded-2xl border border-[#DCE4FF] bg-white shadow-sm">
            <iframe
              src={MAP_LINK}
              title="Ultra Crackers Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 bg-[#4361EE] py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-center text-sm text-white sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Ultra Crackers. All Rights Reserved.</p>
          <p className="font-medium text-white/85">Safe celebrations start here.</p>
        </div>
      </div>
    </footer>
  );
};

export default SafetyFooter;
