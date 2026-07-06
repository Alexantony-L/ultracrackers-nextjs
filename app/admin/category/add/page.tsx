"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FolderPlus, Loader2, UploadCloud } from "lucide-react";

export default function AddCategoryPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);
    setPreview(URL.createObjectURL(file));

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
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

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

      router.push("/admin/category?success=category_added");
    } catch (error) {
      console.error(error);
      alert("Failed to save category");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FolderPlus className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Add New Category</h1>
            <p className="mt-1 text-sm text-slate-500">Create a new category</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left */}
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Category Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rockets"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none transition-colors duration-150 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="rockets"
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none transition-colors duration-150 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Category Image
                </label>
                <label className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors duration-150 hover:bg-slate-50 gap-2">
                  <UploadCloud className="h-5 w-5 text-slate-400" />
                  {uploading ? "Uploading..." : "Choose File"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
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
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <UploadCloud className="h-10 w-10 text-slate-300" />
                    <span className="text-sm font-medium">Image Preview</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end gap-4 border-t border-slate-100 pt-6">
            <button
              onClick={() => router.push("/admin/category")}
              className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-50"
              type="button"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={submitting || uploading}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-md shadow-blue-500/20 transition-all duration-150 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? "Saving..." : "Save Category"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
