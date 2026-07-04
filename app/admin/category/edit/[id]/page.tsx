"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const res = await fetch(`/api/categories/${id}`);
      const data = await res.json();

      setName(data?.name || "");
      setSlug(data?.slug || "");
    } catch (error) {
      console.error(error);
      alert("Failed to load category");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug }),
      });

      if (!response.ok) throw new Error("Update failed");

      alert("Category Updated Successfully");
      router.push("/admin/category");
    } catch (error) {
      console.error(error);
      alert("Failed to update category");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#f8ab13]/20 border-t-[#f8ab13]" />
          <p className="text-sm font-medium text-slate-500">Loading category...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f8ab13]/10">
            <svg className="h-6 w-6 text-[#f8ab13]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Edit Category</h1>
            <p className="mt-1 text-slate-500">Update details for <span className="font-semibold text-slate-700">{name || "this category"}</span></p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Category Name</label>
              <input
                type="text"
                placeholder="Rockets"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3 outline-none transition-colors duration-150 focus:border-[#f8ab13] focus:ring-2 focus:ring-[#f8ab13]/20"
              />

              <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">Slug (optional)</label>
              <input
                type="text"
                placeholder="rockets"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-3 outline-none transition-colors duration-150 focus:border-[#f8ab13] focus:ring-2 focus:ring-[#f8ab13]/20"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4 border-t border-slate-100 pt-6">
            <button
              onClick={() => router.push("/admin/category")}
              className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="rounded-lg bg-[#f8ab13] px-8 py-3 font-semibold text-white shadow-md shadow-[#f8ab13]/30 transition-all duration-150 hover:bg-[#e0980a] hover:shadow-lg hover:shadow-[#f8ab13]/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
