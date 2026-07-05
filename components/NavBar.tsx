"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

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
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Safety Tips", href: "/safetytips" },
  { label: "Contact", href: "/contactus" },
];

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

  // Close the mobile menu automatically whenever the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
      return "rounded-full bg-white px-4 py-2 font-serif text-teal-600 shadow-sm transition";
    }

    return "rounded-full px-4 py-2 font-serif text-white/90 transition hover:bg-white/15 hover:text-white";
  };

  return (
    <nav ref={navRef} className="w-full bg-teal-500">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:justify-center sm:gap-10 sm:px-8">
        {/* Mobile: CTA + hamburger toggle */}
        <div className="flex w-full items-center justify-between sm:hidden">
          {/* <Link
            href="/quick-order"
            className={`rounded-full px-5 py-2 font-serif shadow-sm transition hover:bg-teal-50 active:scale-95 ${
              isActive("/quick-order", true)
                ? "bg-white text-teal-600"
                : "bg-white/90 text-teal-600"
            }`}
          >
            Quick Order
          </Link> */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            className="text-white transition active:scale-90"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-10 sm:flex">
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

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="flex flex-col items-center gap-4 border-t border-teal-400 bg-teal-500 px-4 py-4 sm:hidden">
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
