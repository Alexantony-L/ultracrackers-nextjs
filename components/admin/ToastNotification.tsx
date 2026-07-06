"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { CheckCircle2, X } from "lucide-react";

export default function ToastNotification() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const success = searchParams.get("success");
    if (success) {
      if (success === "product_added") {
        setMessage("Product added successfully!");
        setShow(true);
      } else if (success === "product_updated") {
        setMessage("Product updated successfully!");
        setShow(true);
      } else if (success === "product_deleted") {
        setMessage("Product deleted successfully!");
        setShow(true);
      } else if (success === "category_added") {
        setMessage("Category added successfully!");
        setShow(true);
      } else if (success === "category_updated") {
        setMessage("Category updated successfully!");
        setShow(true);
      } else if (success === "category_deleted") {
        setMessage("Category deleted successfully!");
        setShow(true);
      }

      // Clean the search params to avoid toast showing again on reload
      const params = new URLSearchParams(searchParams.toString());
      params.delete("success");
      const cleanUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      
      const t = setTimeout(() => {
        router.replace(cleanUrl);
      }, 100);
      return () => clearTimeout(t);
    }
  }, [searchParams, pathname, router]);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-800 shadow-xl transition-all duration-300">
      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
      <span className="text-sm font-semibold">{message}</span>
      <button
        onClick={() => setShow(false)}
        className="ml-2 text-slate-400 hover:text-slate-600 transition"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
