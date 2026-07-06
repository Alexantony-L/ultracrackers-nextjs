"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "@/app/admin/orders/actions";
import { Loader2 } from "lucide-react";

export default function OrderStatusUpdater({
  orderId,
  currentStatus,
}: {
  orderId: number;
  currentStatus: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(currentStatus);

  const handleUpdate = () => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("id", String(orderId));
        formData.append("status", status);
        
        await updateOrderStatus(formData);
        router.refresh();
      } catch (error) {
        console.error(error);
        alert("Failed to update status");
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slate-700 bg-slate-50 focus:border-blue-600 outline-none"
        disabled={isPending}
      >
        <option value="pending">Pending</option>
        <option value="dispatch">Dispatch</option>
      </select>
      <button
        onClick={handleUpdate}
        disabled={isPending || status === currentStatus}
        className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:opacity-55 disabled:cursor-not-allowed"
      >
        {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
        Update
      </button>
    </div>
  );
}
