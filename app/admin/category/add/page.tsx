"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCategoryPage() {
  const router = useRouter();

const [name, setName] = useState("");
const [slug, setSlug] = useState("");
const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState("");
  

  const handleImageChange = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/upload/category", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setImageUrl(data.url);
    setPreview(data.url);
  } catch (error) {
    console.error(error);
    alert("Image upload failed");
  }
};

const handleSubmit = async () => {
  try {
    const response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        slug,
        imageUrl,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create category");
    }

    router.push("/admin/category");
  } catch (error) {
    console.error(error);
    alert("Failed to save category");
  }
};
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f8ab13]/10">
            <svg className="h-6 w-6 text-[#f8ab13]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Add New Category</h1>
            <p className="mt-1 text-slate-500">Create a new category</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
        <div className="grid gap-8 md:grid-cols-2">
  {/* Left */}
  <div>
    <label className="mb-2 block text-sm font-semibold text-slate-700">
      Category Name
    </label>

    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Rockets"
      className="w-full rounded-lg border border-slate-300 p-3"
    />

    <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">
      Slug
    </label>

    <input
      type="text"
      value={slug}
      onChange={(e) => setSlug(e.target.value)}
      placeholder="rockets"
      className="w-full rounded-lg border border-slate-300 p-3"
    />

    <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">
      Category Image
    </label>

    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="w-full rounded-lg border border-slate-300 p-3"
    />
  </div>

  {/* Right */}
  <div>
    <div
      className="
        flex h-72 items-center justify-center
        overflow-hidden rounded-xl
        border-2 border-dashed border-slate-300
        bg-slate-50
      "
    >
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-slate-400">
          Image Preview
        </span>
      )}
    </div>
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
              onClick={handleSubmit}
              className="rounded-lg bg-[#f8ab13] px-8 py-3 font-semibold text-white shadow-md shadow-[#f8ab13]/30 transition-all duration-150 hover:bg-[#e0980a] hover:shadow-lg hover:shadow-[#f8ab13]/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              Save Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
