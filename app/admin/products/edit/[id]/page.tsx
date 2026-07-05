"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [unit, setUnit] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [active, setActive] = useState(true);
  const [previewImage, setPreviewImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);

      const product = await response.json();

      setName(product.name);
      setDescription(product.description || "");
      setImageUrl(product.imageUrl || "");
      setPreviewImage(product.imageUrl || "");
      setPrice(product.price.toString());
      setMrp(product.mrp?.toString() || "");
      setUnit(product.unit || "");
      setCategoryId(product.categoryId?.toString() || "");
      setActive(product.active);
    } catch (error) {
      console.error(error);
      alert("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");

      if (!response.ok) {
        throw new Error("Failed to load categories");
      }

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
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

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.imageUrl) {
        throw new Error("Image upload failed");
      }

      setImageUrl(data.imageUrl);
      setPreviewImage(data.imageUrl);
    } catch (error) {
      console.error(error);
      alert("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          imageUrl,
          price,
          mrp,
          unit,
          categoryId: categoryId ? Number(categoryId) : null,
          active
        }),
      });

      console.log("active",active)

      if (!response.ok) {
        throw new Error("Update failed");
      }

      alert("Product Updated Successfully");

      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#f8ab13]/20 border-t-[#f8ab13]" />
          <p className="text-sm font-medium text-slate-500">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f8ab13]/10">
            <svg
              className="h-6 w-6 text-[#f8ab13]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Edit Product
            </h1>
            <p className="mt-1 text-slate-500">
              Update details for{" "}
              <span className="font-semibold text-slate-700">
                {name || "this product"}
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Side */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Product Name
              </label>

              <input
                type="text"
                placeholder="Rocket Bomb"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-full rounded-lg border border-slate-300
                  p-3 outline-none
                  transition-colors duration-150
                  focus:border-[#f8ab13] focus:ring-2 focus:ring-[#f8ab13]/20
                "
              />

              <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">
                Description
              </label>

              <textarea
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="
                  w-full rounded-lg border border-slate-300
                  p-3 outline-none
                  transition-colors duration-150
                  focus:border-[#f8ab13] focus:ring-2 focus:ring-[#f8ab13]/20
                "
              />

              <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">
                Price
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ₹
                </span>
                <input
                  type="number"
                  placeholder="150"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="
                    w-full rounded-lg border border-slate-300
                    p-3 pl-7 outline-none
                    transition-colors duration-150
                    focus:border-[#f8ab13] focus:ring-2 focus:ring-[#f8ab13]/20
                  "
                />
              </div>

              <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">
                MRP
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ₹
                </span>
                <input
                  type="number"
                  placeholder="340"
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  className="
                    w-full rounded-lg border border-slate-300
                    p-3 pl-7 outline-none
                    transition-colors duration-150
                    focus:border-[#f8ab13] focus:ring-2 focus:ring-[#f8ab13]/20
                  "
                />
              </div>

              <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">
                Unit
              </label>

              <input
                type="text"
                placeholder="1 BOX"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="
                  w-full rounded-lg border border-slate-300
                  p-3 outline-none
                  transition-colors duration-150
                  focus:border-[#f8ab13] focus:ring-2 focus:ring-[#f8ab13]/20
                "
              />

              <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">
                Category
              </label>

              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="
                  w-full rounded-lg border border-slate-300
                  p-3 outline-none
                  transition-colors duration-150
                  focus:border-[#f8ab13] focus:ring-2 focus:ring-[#f8ab13]/20
                "
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">
  Product Status
</label>

<div className="flex gap-4">
  <button
    type="button"
    onClick={() => setActive(true)}
    className={`rounded-lg px-4 py-3 font-medium transition-all ${
      active
        ? "bg-green-600 text-white"
        : "border border-slate-300 bg-white text-slate-600"
    }`}
  >
    Active
  </button>

  <button
    type="button"
    onClick={() => setActive(false)}
    className={`rounded-lg px-4 py-3 font-medium transition-all ${
      !active
        ? "bg-red-600 text-white"
        : "border border-slate-300 bg-white text-slate-600"
    }`}
  >
    Inactive
  </button>
</div>
            </div>

            

            {/* Right Side */}
            <div>
              {/* <label className="mb-2 block text-sm font-semibold text-slate-700">
                Image URL
              </label> */}

              {/* <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="
                  w-full rounded-lg border border-slate-300
                  p-3 outline-none
                  transition-colors duration-150
                  focus:border-[#f8ab13] focus:ring-2 focus:ring-[#f8ab13]/20
                "
              /> */}

              <div
                className="
                  mt-4 flex h-72 items-center
                  justify-center overflow-hidden rounded-xl
                  border-2 border-dashed
                  border-slate-300 bg-slate-50
                "
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Product"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <svg
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 8.25l4.5-4.5m0 0L12 8.25M7.5 3.75v9"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      No image URL set
                    </span>
                  </div>
                )}
              </div>

              <label className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-150 hover:bg-slate-50">
                {uploadingImage ? "Uploading..." : "Change Photo"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Preview Details
                </h3>

                <p className="mt-3 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Name:</span>{" "}
                  {name || "-"}
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Price:</span>{" "}
                  <span className="text-[#f8ab13] font-bold">
                    ₹{price || "0"}
                  </span>
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">MRP:</span>{" "}
                  <span className="text-slate-700">₹{mrp || "0"}</span>
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Unit:</span>{" "}
                  {unit || "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4 border-t border-slate-100 pt-6">
            <button
              onClick={() => router.push("/admin/products")}
              className="
                rounded-lg border border-slate-300
                px-6 py-3 font-medium text-slate-700
                transition-colors duration-150
                hover:bg-slate-50
              "
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="
                rounded-lg bg-[#f8ab13]
                px-8 py-3 font-semibold
                text-white shadow-md shadow-[#f8ab13]/30
                transition-all duration-150
                hover:bg-[#e0980a] hover:shadow-lg hover:shadow-[#f8ab13]/40
                hover:-translate-y-0.5
                active:translate-y-0
              "
            >
              Update 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}