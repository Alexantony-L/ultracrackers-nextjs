import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CategoryDeleteButton from "../CategoryDeleteButton";
import { Plus, Pencil, ChevronLeft, ChevronRight, FolderOpen, Image as ImageIcon } from "lucide-react";

export default async function CategoriesPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const itemsPerPage = 8;

  const totalCategories = await prisma.category.count();
  const totalPages = Math.ceil(totalCategories / itemsPerPage);

  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Categories
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Total Categories: <span className="font-semibold text-gray-700">{totalCategories}</span>
          </p>
        </div>

        <Link
          href="/admin/category/add"
          className="
            flex items-center justify-center gap-2
            rounded-xl
            bg-blue-600
            px-5 py-2.5
            text-sm font-semibold text-white
            shadow-md shadow-blue-200
            transition-all duration-200
            hover:bg-blue-700 hover:shadow-lg
            hover:-translate-y-0.5
            active:translate-y-0
          "
        >
          <Plus className="h-4 w-4" />
          Add Category
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-slate-900 text-white border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Image</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {categories.map((cat, idx) => (
                <tr key={cat.id} className="group transition-colors duration-150 hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-400">
                    #{(currentPage - 1) * itemsPerPage + idx + 1}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{cat.name}</td>
                  <td className="px-6 py-4">
                    {cat.imageUrl ? (
                      <img
                        src={cat.imageUrl}
                        alt={cat.name}
                        className="h-12 w-12 rounded-lg border border-gray-200 object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-gray-400">
                        <ImageIcon className="h-4 w-4" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(cat.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/admin/category/edit/${cat.id}`}
                        className="
                          flex items-center gap-1
                          rounded-lg bg-blue-50 px-3 py-2
                          text-xs font-semibold text-blue-700
                          transition-colors duration-150
                          hover:bg-blue-600 hover:text-white
                        "
                      >
                        <Pencil className="h-3 w-3" />
                        Edit
                      </Link>
                      <CategoryDeleteButton id={cat.id} />
                    </div>
                  </td>
                </tr>
              ))}

              {categories.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <FolderOpen className="h-10 w-10 text-gray-300 animate-bounce" />
                      <p className="text-sm font-medium">No categories found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between border border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-2xl shadow-sm">
          <div className="flex flex-1 justify-between sm:hidden">
            <Link
              href={`/admin/category?page=${Math.max(currentPage - 1, 1)}`}
              className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === 1 ? 'pointer-events-none opacity-40' : ''}`}
            >
              Previous
            </Link>
            <Link
              href={`/admin/category?page=${Math.min(currentPage + 1, totalPages)}`}
              className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === totalPages ? 'pointer-events-none opacity-40' : ''}`}
            >
              Next
            </Link>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold">{Math.min(currentPage * itemsPerPage, totalCategories)}</span> of{' '}
                <span className="font-semibold">{totalCategories}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <Link
                  href={`/admin/category?page=${Math.max(currentPage - 1, 1)}`}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 ? 'pointer-events-none opacity-40' : ''}`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </Link>
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  const isCurrent = pageNum === currentPage;
                  return (
                    <Link
                      key={pageNum}
                      href={`/admin/category?page=${pageNum}`}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${isCurrent ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'}`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
                <Link
                  href={`/admin/category?page=${Math.min(currentPage + 1, totalPages)}`}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === totalPages ? 'pointer-events-none opacity-40' : ''}`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
