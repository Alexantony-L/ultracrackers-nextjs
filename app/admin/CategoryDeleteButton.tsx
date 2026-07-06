"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function CategoryDeleteButton({
  id,
}: {
  id: number;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    const response = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/admin/category?success=category_deleted");
      router.refresh();
    } else {
      alert("Delete failed");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="
        flex items-center gap-1
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
      <Trash2 className="h-3 w-3" />
      Delete
    </button>
  );
}
