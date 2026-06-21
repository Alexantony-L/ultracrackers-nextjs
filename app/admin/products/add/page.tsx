"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState("");

 const handleImageChange = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  setPreview(
    URL.createObjectURL(file)
  );

  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    "/api/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data =
    await response.json();

  setImageUrl(data.imageUrl);
};

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          imageUrl,
          price,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Failed to save product");
    }
  };

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
                d="M12 6v12m6-6H6"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Add New Product
            </h1>
            <p className="mt-1 text-slate-500">
              Create a new cracker product
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-full rounded-lg border border-slate-300
                  p-3 outline-none
                  transition-colors duration-150
                  focus:border-[#f8ab13] focus:ring-2 focus:ring-[#f8ab13]/20
                "
                placeholder="Rocket Bomb"
              />

              <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">
                Description
              </label>

              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="
                  w-full rounded-lg border border-slate-300
                  p-3 outline-none
                  transition-colors duration-150
                  focus:border-[#f8ab13] focus:ring-2 focus:ring-[#f8ab13]/20
                "
                placeholder="Enter product description"
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
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="
                    w-full rounded-lg border border-slate-300
                    p-3 pl-7 outline-none
                    transition-colors duration-150
                    focus:border-[#f8ab13] focus:ring-2 focus:ring-[#f8ab13]/20
                  "
                  placeholder="150"
                />
              </div>
            </div>

            {/* Right Side */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Product Image
              </label>

              <div
                className="
                  relative flex h-72 items-center
                  justify-center overflow-hidden rounded-xl
                  border-2 border-dashed
                  border-slate-300 bg-slate-50
                  transition-colors duration-150
                  hover:border-[#f8ab13]/60 hover:bg-[#f8ab13]/5
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
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 7.5L12 3m0 0L7.5 7.5M12 3v13.5"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      Upload Product Image
                    </span>
                  </div>
                )}
              </div>

              <label
                className="
                  mt-4 flex w-full cursor-pointer items-center justify-center
                  rounded-lg border border-slate-300 bg-white
                  px-4 py-2.5 text-sm font-semibold text-slate-700
                  transition-colors duration-150
                  hover:bg-slate-50
                "
              >
                Choose File
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
              onClick={handleSubmit}
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
              Save Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}