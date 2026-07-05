import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateOrderStatus } from "./actions";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
          <p className="mt-1 text-sm text-gray-500">Track customer orders and view invoices.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">Order #</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">Total</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.orderNo}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <div>{order.customer}</div>
                    <div className="text-xs text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{order.phone}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">₹{Number(order.total).toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-sm">
                    <form action={updateOrderStatus} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={order.id} />
                      <select
                        name="status"
                        defaultValue={order.status}
                        className="rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700"
                      >
                        <option value="pending">Pending</option>
                        <option value="dispatch">Dispatch</option>
                      </select>
                      <button
                        type="submit"
                        className="rounded-md bg-teal-600 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-teal-700"
                      >
                        Update
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {order.invoiceUrl ? (
                      <Link
                        href={`/admin/orders/view?url=${encodeURIComponent(order.invoiceUrl)}`}
                        className="text-teal-600 hover:text-teal-700"
                      >
                        View Bill
                      </Link>
                    ) : (
                      <span className="text-gray-400">Not available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
