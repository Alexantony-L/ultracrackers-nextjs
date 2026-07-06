"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Loader2, Pencil, UploadCloud } from "lucide-react";

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

      router.push("/admin/category?success=category_updated");
    } catch (error) {
      console.error(error);
      alert("Failed to update category");
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-sm font-medium text-slate-500">Loading category...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-55 p-4 sm:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Pencil className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Edit Category</h1>
            <p className="mt-1 text-sm text-slate-500">Update details for <span className="font-semibold text-slate-700">{name || "this category"}</span></p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Category Name</label>
                <input
                  type="text"
                  placeholder="Rockets"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none transition-colors duration-150 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Slug (optional)</label>
                <input
                  type="text"
                  placeholder="rockets"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none transition-colors duration-150 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Category Image</label>
                <label className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors duration-150 hover:bg-slate-50 gap-2">
                  <UploadCloud className="h-5 w-5 text-slate-400" />
                  {uploadingImage ? "Uploading..." : "Change Image"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
              </div>
            </div>

            <div>
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
                    <UploadCloud className="h-10 w-10 text-slate-300" />
                    <span className="text-sm font-medium">No image selected</span>
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
              onClick={handleUpdate}
              disabled={updating || uploadingImage}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-md shadow-blue-500/20 transition-all duration-150 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {updating && <Loader2 className="h-4 w-4 animate-spin" />}
              {updating ? "Updating..." : "Update Category"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
