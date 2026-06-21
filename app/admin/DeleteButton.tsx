"use client";

import { useRouter } from "next/navigation";

export default function DeleteButton({
  id,
}: {
  id: number;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    const response = await fetch(
      `/api/products/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      router.refresh();
    } else {
      alert("Delete failed");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="
        rounded-lg
        bg-red-50
        px-3 py-2
        text-xs font-semibold
        text-red-700
        transition-colors
        hover:bg-red-600
        hover:text-white
      "
    >
      Delete
    </button>
  );
}