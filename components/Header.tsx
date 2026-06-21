"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { WHATSAPP_NUMBER } from "@/lib/constants";
export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    

  return (
<header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950 shadow-2xl">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

    {/* Logo */}
    <Link
      href="/"
      className="flex items-center gap-3 shrink-0"
    >
      <img
        src="/logo.jpeg"
        alt="Ultra Crackers"
        className="h-14 w-16 object-contain"
      />

      <div>
        <h1 className="text-2xl font-extrabold text-white">
          Ultra
          <span className="text-[#f8ab13]">
            {" "}Crackers
          </span>
        </h1>

        <p className="text-xs text-slate-400">
          Premium Fireworks
        </p>
      </div>
    </Link>

    {/* Desktop Nav */}
    <nav className="hidden md:block">
      <ul className="flex items-center gap-8">
        <li>
          <Link
            href="/"
            className="
              text-sm font-semibold text-white/90
              transition-colors
              hover:text-[#f8ab13]
            "
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            href="/"
            className="
              text-sm font-semibold text-white/90
              transition-colors
              hover:text-[#f8ab13]
            "
          >
            Products
          </Link>
        </li>

        <li>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              rounded-lg
              bg-[#f8ab13]
              px-4 py-2.5
              text-sm font-semibold
              text-white
              transition-all
              hover:bg-[#e0980a]
            "
          >
            WhatsApp Order
          </a>
        </li>
      </ul>
    </nav>

    {/* Mobile Toggle */}
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="text-white md:hidden"
    >
      ☰
    </button>

  </div>
</header>
  );
}