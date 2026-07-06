import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Calendar, ReceiptText, FileText } from "lucide-react";
import OrderStatusUpdater from "@/components/admin/OrderStatusUpdater";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ReceiptText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Orders</h1>
            <p className="mt-1 text-sm text-gray-500">Track customer orders, status updates, and view invoices.</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Order #</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Date</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Customer</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Phone</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Total</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition duration-150">
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">{order.orderNo}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-gray-400" />
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    <div className="font-semibold text-gray-900">{order.customer}</div>
                    <div className="text-xs text-gray-400">{order.email}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-medium">{order.phone}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">₹{Number(order.total).toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-sm">
                    <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {order.invoiceUrl ? (
                      <Link
                        href={`/admin/orders/view?url=${encodeURIComponent(order.invoiceUrl)}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
                      >
                        <FileText className="h-4 w-4" />
                        View Bill
                      </Link>
                    ) : (
                      <span className="text-gray-400 text-xs">Not available</span>
                    )}
                  </td>
                </tr>
              ))}
              
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-gray-400">
                    No orders found
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
