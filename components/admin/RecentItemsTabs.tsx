"use client";

import { useState } from "react";
import type { Category, Product } from "@prisma/client";

type RecentItemsTabsProps = {
  products: Product[];
  categories: Category[];
};

export default function RecentItemsTabs({
  products,
  categories,
}: RecentItemsTabsProps) {
  const [activeTab, setActiveTab] = useState<"products" | "categories">(
    "products"
  );

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Recent Items</h2>
          <p className="mt-1 text-sm text-slate-500">
            Switch between the latest products and categories.
          </p>
        </div>

        <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("products")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === "products"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Products ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("categories")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === "categories"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Categories ({categories.length})
          </button>
        </div>
      </div>

      {activeTab === "products" ? (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[500px]">
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
              {products.map((product) => (
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
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-inset ring-red-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        Inactive
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
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
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[500px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="transition-colors duration-150 hover:bg-slate-50"
                >
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">
                    {category.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {new Date(category.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}

              {categories.length === 0 && (
                <tr>
                  <td colSpan={2} className="py-10 text-center">
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
                          d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                        />
                      </svg>
                      <p className="text-sm font-medium">No Categories Found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
