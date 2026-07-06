import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

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
  email: "support@ultracrackers.com",
};

const IconBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#4361EE] text-white shadow-sm">
    {children}
  </div>
);

const ContactInfo: React.FC = () => {
  return (
    <section className="w-full bg-[#F8FAFF] px-4 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4361EE]">
            Contact Us
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-[#1E3A8A] sm:text-4xl">
            We are here to help with your cracker orders
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            Reach us by phone, email, or visit our showroom for product details,
            pricing, and order support.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#DCE4FF] bg-white p-5 shadow-sm transition hover:border-[#4361EE] hover:shadow-md">
            <div className="flex items-start gap-4">
              <IconBox>
                <MapPin className="h-6 w-6" />
              </IconBox>
              <div>
                <h3 className="text-lg font-extrabold text-[#1E3A8A]">Address</h3>
                <div className="mt-3 space-y-1 text-sm leading-relaxed text-gray-600">
                  {CONTACT_DATA.address.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#DCE4FF] bg-white p-5 shadow-sm transition hover:border-[#4361EE] hover:shadow-md">
            <div className="flex items-start gap-4">
              <IconBox>
                <Phone className="h-6 w-6" />
              </IconBox>
              <div>
                <h3 className="text-lg font-extrabold text-[#1E3A8A]">Phone</h3>
                <div className="mt-3 space-y-3 text-sm">
                  {CONTACT_DATA.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block rounded-xl border border-[#DCE4FF] bg-[#F8FAFF] px-3 py-2 font-semibold text-gray-700 transition hover:border-[#4361EE] hover:text-[#4361EE]"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#DCE4FF] bg-white p-5 shadow-sm transition hover:border-[#4361EE] hover:shadow-md">
            <div className="flex items-start gap-4">
              <IconBox>
                <Mail className="h-6 w-6" />
              </IconBox>
              <div className="min-w-0">
                <h3 className="text-lg font-extrabold text-[#1E3A8A]">
                  Connect With Us
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  Send us your product questions or order details anytime.
                </p>
                <a
                  href={`mailto:${CONTACT_DATA.email}`}
                  className="mt-3 block break-words rounded-xl border border-[#DCE4FF] bg-[#F8FAFF] px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-[#4361EE] hover:text-[#4361EE]"
                >
                  {CONTACT_DATA.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
