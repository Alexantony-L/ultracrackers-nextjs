"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [updating, setUpdating] = useState(false);
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
      setImageUrl(data?.imageUrl || "");
      setPreviewImage(data?.imageUrl || "");
    } catch (error) {
      console.error(error);
      alert("Failed to load category");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploadingImage(true);
    setPreviewImage(URL.createObjectURL(file));

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload/category", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const uploadedImageUrl = data.imageUrl || data.url;

      if (!response.ok || !uploadedImageUrl) {
        throw new Error("Image upload failed");
      }

      setImageUrl(uploadedImageUrl);
      setPreviewImage(uploadedImageUrl);
    } catch (error) {
      console.error(error);
      alert("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleUpdate = async () => {
    if (updating) return;

    setUpdating(true);

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug, imageUrl }),
      });

      if (!response.ok) throw new Error("Update failed");

      alert("Category Updated Successfully");
      router.push("/admin/category");
    } catch (error) {
      console.error(error);
      alert("Failed to update category");
    } finally {
      setUpdating(false);
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

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Category Image</label>

              <div className="flex h-72 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Category"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 8.25l4.5-4.5m0 0L12 8.25M7.5 3.75v9" />
                    </svg>
                    <span className="text-sm font-medium">No image selected</span>
                  </div>
                )}
              </div>

              <label className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-150 hover:bg-slate-50">
                {uploadingImage ? "Uploading..." : "Change Image"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
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
              disabled={updating}
              className="flex cursor-pointer items-center justify-center rounded-lg bg-[#f8ab13] px-8 py-3 font-semibold text-white shadow-md shadow-[#f8ab13]/30 transition-all duration-150 hover:bg-[#e0980a] hover:shadow-lg hover:shadow-[#f8ab13]/40 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {updating ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
