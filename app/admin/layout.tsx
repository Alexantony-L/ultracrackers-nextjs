"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminGuard from "../../components/admin/AdminGuard";
import { navItems } from "./AdminNavItem"; 



export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-white shadow">
        <aside className="flex w-64 flex-col border-r border-gray-200 bg-gray-50 p-5 text-black shadow">
{/* <aside className="flex w-64 flex-col bg-gradient-to-b from-gray-900 to-gray-800 p-5 text-gray-100 shadow-xl"> */}

          <nav className="flex flex-col gap-1 p-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
 
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-teal-50 text-teal-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>

          {/* Logout */}
          <div className="mt-1 border-t border-slate-800 pt-1">
            <button
              onClick={() => {
                localStorage.removeItem("adminLoggedIn");
                window.location.href = "/admin/login";
              }}
              className="
                flex w-full items-center justify-center gap-2
                rounded-lg border border-red-500/30 bg-red-500/10
                px-4 py-2.5 text-sm font-semibold text-red-400
                transition-colors duration-150
                hover:bg-red-500 hover:text-white
              "
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </AdminGuard>
  );
}