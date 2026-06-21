import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className=" bg-slate-950 text-white">
      {/* Top accent strip */}
      <div className="h-1 bg-gradient-to-r " />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-2xl">🎆</span>
              <h3 className="text-xl font-bold">
                Ultra <span className="text-[#f8ab13]">Crackers</span>
              </h3>
            </div>

            <p className="text-sm leading-relaxed text-slate-400">
              Premium quality crackers at affordable prices. Lighting up
              every celebration, the safe way.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#f8ab13]">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-400 transition-colors duration-150 hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-slate-400 transition-colors duration-150 hover:text-white"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-slate-400 transition-colors duration-150 hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#f8ab13]">
              Contact
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0 text-[#f8ab13]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a1.5 1.5 0 001.5-1.5v-3.379a1.5 1.5 0 00-1.06-1.435l-4.318-1.45a1.5 1.5 0 00-1.51.27l-1.434 1.27a11.13 11.13 0 01-5.135-5.135l1.27-1.434a1.5 1.5 0 00.27-1.51L8.564 3.31a1.5 1.5 0 00-1.435-1.06H3.75a1.5 1.5 0 00-1.5 1.5v3z" />
                </svg>
                {WHATSAPP_NUMBER}
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0 text-[#f8ab13]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Sivakasi, Tamil Nadu
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} Ultra Crackers. All Rights Reserved.</p>
          <p className="text-slate-600">Made with care in Sivakasi 🎇</p>
        </div>
      </div>
    </footer>
  );
}