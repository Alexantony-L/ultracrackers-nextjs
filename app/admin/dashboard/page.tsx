import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Dashboard() {
  const totalProducts = await prisma.product.count();

  const activeProducts = await prisma.product.count({
    where: {
      active: true,
    },
  });

  const inactiveProducts = await prisma.product.count({
    where: {
      active: false,
    },
  });

  const recentProducts = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8ab13]/10">
          <svg
            className="h-7 w-7 text-[#f8ab13]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-slate-500">
            Welcome to Ultra Crackers Admin
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50">
          <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-[#f8ab13]/10" />
          <p className="relative text-sm font-medium text-slate-500">
            Total Products
          </p>
          <h2 className="relative mt-2 text-4xl font-bold text-slate-900">
            {totalProducts}
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50">
          <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-green-50" />
          <p className="relative text-sm font-medium text-slate-500">
            Active Products
          </p>
          <h2 className="relative mt-2 text-4xl font-bold text-green-600">
            {activeProducts}
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50">
          <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-red-50" />
          <p className="relative text-sm font-medium text-slate-500">
            Inactive Products
          </p>
          <h2 className="relative mt-2 text-4xl font-bold text-red-600">
            {inactiveProducts}
          </h2>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/products/add"
            className="
              flex items-center gap-2
              rounded-lg bg-[#f8ab13]
              px-5 py-3 font-semibold text-white
              shadow-md shadow-[#f8ab13]/30
              transition-all duration-150
              hover:bg-[#e0980a] hover:shadow-lg hover:shadow-[#f8ab13]/40
              hover:-translate-y-0.5
            "
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </Link>

          <Link
            href="/admin/products"
            className="
              flex items-center gap-2
              rounded-lg border border-slate-300 bg-white
              px-5 py-3 font-semibold text-slate-700
              transition-colors duration-150
              hover:bg-slate-50
            "
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            </svg>
            View Products
          </Link>

          
            <a href="/"
            target="_blank"
            className="
              flex items-center gap-2
              rounded-lg bg-slate-900
              px-5 py-3 font-semibold text-white
              transition-colors duration-150
              hover:bg-slate-800
            "
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
            Open Website
          </a>
        </div>
      </div>

      {/* Recent Products */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            Recent Products
          </h2>

          <Link
            href="/admin/products"
            className="
              text-sm font-semibold text-[#f8ab13]
              transition-colors duration-150
              hover:text-[#e0980a]
            "
          >
            View All →
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Name
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Price
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {recentProducts.map((product) => (
                <tr
                  key={product.id}
                  className="transition-colors duration-150 hover:bg-slate-50"
                >
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">
                    {product.name}
                  </td>

                  <td className="px-4 py-3 text-sm font-medium text-slate-700">
                    ₹{product.price}
                  </td>

                  <td className="px-4 py-3">
                    {product.active ? (
                      <span
                        className="
                          inline-flex items-center gap-1.5
                          rounded-full bg-green-50
                          px-3 py-1
                          text-xs font-semibold text-green-700
                          ring-1 ring-inset ring-green-200
                        "
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Active
                      </span>
                    ) : (
                      <span
                        className="
                          inline-flex items-center gap-1.5
                          rounded-full bg-red-50
                          px-3 py-1
                          text-xs font-semibold text-red-700
                          ring-1 ring-inset ring-red-200
                        "
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        Inactive
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {recentProducts.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-10 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <svg
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      <p className="text-sm font-medium">No Products Found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}