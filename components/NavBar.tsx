"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

/**
 * NavBar
 * Teal navigation bar with a pill-style "Quick Order" CTA and
 * serif nav links. Collapses into a hamburger menu on mobile.
 *
 * LOGIC OVERVIEW:
 * 1. `isOpen` (useState) controls whether the mobile dropdown is visible.
 *    Clicking the hamburger icon flips it true/false.
 * 2. `usePathname()` (Next.js hook) tells us the current URL path, so we
 *    can compare it against each link's `href` and highlight the active
 *    page — no manual state needed, it's derived from the route itself.
 * 3. A `useEffect` + `useRef` pair listens for clicks anywhere on the
 *    document. If the click lands outside the nav element while the
 *    mobile menu is open, we close it — standard "click outside to
 *    dismiss" pattern.
 * 4. Every link uses Next.js `<Link>` instead of a plain `<a>` tag so
 *    navigation is client-side (no full page reload) and prefetched.
 * 5. Clicking any link in the mobile menu also closes the menu
 *    (`setIsOpen(false)`) so it doesn't stay open after navigating.
 */

const NAV_LINKS = [
  { label: "Home", href: "/home", isDefault: true, isQuickOrder: true },
  { label: "Crackers", href: "/crackers" },
  { label: "About", href: "/about" },
  { label: "Safety Tips", href: "/safetytips" },
  { label: "Contact", href: "/contactus" },
];

const BrandLogo = ({ isMobile = false }: { isMobile?: boolean }) => (
  <Link href="/home" className="flex shrink-0 items-center gap-3">
    <Image
      src="/ultrcrackers_logo.png"
      alt="Ultra Crackers"
      width={isMobile ? 76 : 58}
      height={isMobile ? 76 : 58}
      priority
      className={`${isMobile ? "h-16 w-16" : "h-12 w-12"} rounded-lg object-contain`}
    />

    <div className={isMobile ? "hidden" : "hidden lg:block"}>
      <h1 className="text-lg font-bold tracking-wide text-white">
        Ultra Crackers
      </h1>
      <p className="text-xs text-white/80">
        Premium Fireworks
      </p>
    </div>
  </Link>
);

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Close the mobile menu if the user clicks/taps outside the nav
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const isActive = (href: string, isDefault = false) => {
    if (pathname === href) {
      return true;
    }

    if (isDefault) {
      return pathname === "/" || pathname === "/quick-order" || pathname.startsWith("/quick-order/");
    }

    return false;
  };

  const getLinkClasses = (href: string, isDefault = false) => {
    const active = isActive(href, isDefault);

    if (active) {
      return "rounded-full bg-white px-4 py-2 font-serif text-[#4361EE] shadow-sm transition";
    }

    return "rounded-full px-4 py-2 font-serif text-white/90 transition hover:bg-white/15 hover:text-white";
  };

  return (
    <nav ref={navRef} className="relative z-50 w-full bg-[#4361EE]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-8">
        {/* Mobile: logo + hamburger toggle */}

        <div className="flex w-full items-center justify-between sm:hidden">
          <BrandLogo isMobile />

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 active:scale-90"
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden w-full items-center justify-between gap-8 sm:flex">
          <BrandLogo />

          <div className="flex items-center gap-6 lg:gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={getLinkClasses(link.href, link.isDefault)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 flex w-full flex-col items-center gap-3 border-t border-white/20 bg-[#4361EE] px-4 py-4 shadow-2xl sm:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={getLinkClasses(link.href, link.isDefault)}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
