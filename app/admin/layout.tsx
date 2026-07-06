"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import AdminGuard from "../../components/admin/AdminGuard";
import { navItems } from "./AdminNavItem"; 
import ToastNotification from "../../components/admin/ToastNotification";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-slate-50 text-slate-800">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800 bg-slate-900 p-5 text-slate-300 shadow-2xl transition-transform duration-300 ease-in-out
            md:sticky md:top-0 md:h-screen md:translate-x-0
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Sidebar Header */}
          <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
            <Link href="/admin/dashboard" className="flex items-center gap-2" onClick={() => setIsSidebarOpen(false)}>
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-xl font-bold tracking-tight text-transparent">
                Ultra Crackers
              </span>
              <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-xs font-semibold text-blue-400">
                Admin
              </span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-lg p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white md:hidden transition"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="mt-auto border-t border-slate-800 pt-4">
            <button
              onClick={() => {
                localStorage.removeItem("adminLoggedIn");
                window.location.href = "/admin/login";
              }}
              className="
                flex w-full items-center justify-center gap-2
                rounded-lg border border-red-500/20 bg-red-500/10
                px-4 py-2.5 text-sm font-semibold text-red-400
                transition-colors duration-150
                hover:bg-red-600 hover:text-white
              "
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar for Mobile */}
          <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 md:hidden">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-lg font-bold tracking-tight text-transparent">
                Ultra Crackers
              </span>
              <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600">
                Admin
              </span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 transition"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </header>

          <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>

        <ToastNotification />
      </div>
    </AdminGuard>
  );
}