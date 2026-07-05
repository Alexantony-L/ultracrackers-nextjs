"use client";

import { useSearchParams } from "next/navigation";

export default function OrderInvoiceViewPage() {
  const searchParams = useSearchParams();
  const invoiceUrl = searchParams.get("url");

  if (!invoiceUrl) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
        No invoice selected.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Invoice Preview</h1>
          <p className="mt-1 text-sm text-gray-500">View the generated PDF for this order.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <iframe src={invoiceUrl} className="h-[80vh] w-full" title="Invoice PDF" />
      </div>
    </div>
  );
}
