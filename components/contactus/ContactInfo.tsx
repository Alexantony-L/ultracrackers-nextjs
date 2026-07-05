import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

/**
 * ContactInfo
 * "CONTACT US" heading followed by a 3-column info grid:
 * Address, Phone, and Connect With Us (email).
 * Each column has a circular outlined icon above bold heading text.
 */

const CONTACT_DATA = {
  address: {
    lines: [
      "Ultra Crackers",
      "Door No: 2/229, Plot No 1008",
      "Survey No: 228/30",
      "Village E. Muthu Linga Puram",
      "Taluk Sattur",
      "District Virudhunagar",
    ],
  },
  phones: ["+91 9360528398", "+91 8526230861"],
  email: "Ultracrackers2026@gmail.com",
};

const IconCircle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-teal-500 text-teal-500">
    {children}
  </div>
);

const ContactInfo: React.FC = () => {
  return (
    <section className="w-full bg-white px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-3xl font-extrabold tracking-wide text-gray-900 sm:text-4xl">
          CONTACT US
        </h2>

        <div className="grid grid-cols-1 gap-12 text-center sm:grid-cols-3 sm:gap-8">
          {/* Address */}
          <div className="flex flex-col items-center gap-4">
            <IconCircle>
              <MapPin className="h-6 w-6" />
            </IconCircle>
            <h3 className="text-lg font-bold text-gray-900">Address</h3>
            <div className="space-y-0.5 text-sm text-gray-700">
              {CONTACT_DATA.address.lines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center gap-4">
            <IconCircle>
              <Phone className="h-6 w-6" />
            </IconCircle>
            <h3 className="text-lg font-bold text-gray-900">Phone</h3>
            <div className="space-y-0.5 text-sm text-gray-700">
              {CONTACT_DATA.phones.map((phone, idx) => (
                <p key={idx}>
                  Mobile:{" "}
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-teal-600">
                    {phone}
                  </a>
                </p>
              ))}
            </div>
          </div>

          {/* Connect With Us */}
          <div className="flex flex-col items-center gap-4">
            <IconCircle>
              <Mail className="h-6 w-6" />
            </IconCircle>
            <h3 className="text-lg font-bold text-gray-900">Connect With Us</h3>
            <a
              href={`mailto:${CONTACT_DATA.email}`}
              className="text-sm text-gray-700 hover:text-teal-600"
            >
              {CONTACT_DATA.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
