import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CategoryDeleteButton from "../CategoryDeleteButton";

export default async function CategoriesPage() {
	const categories = await prisma.category.findMany({
		orderBy: { createdAt: "desc" },
	});

	console.log("Fetched categories:", categories); // Debugging line
	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-gray-900">
						Categories
					</h1>
					<p className="mt-1 text-sm text-gray-500">
						Total Categories: <span className="font-semibold text-gray-700">{categories.length}</span>
					</p>
				</div>

				<Link
					href="/admin/category/add"
					className="
						flex items-center gap-2
						rounded-lg
						bg-gradient-to-r from-green-600 to-emerald-600
						px-5 py-2.5
						text-sm font-semibold text-white
						shadow-md shadow-green-200
						transition-all duration-200
						hover:shadow-lg hover:shadow-green-300
						hover:-translate-y-0.5
						active:translate-y-0
					"
				>
					<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
					</svg>
					Add Category
				</Link>
			</div>

			<div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50">
				<table className="w-full">
					<thead>
						<tr className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
							<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">ID</th>
							<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Name</th>
							<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">image</th>
							<th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Created</th>
							<th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">Actions</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-gray-100">
						{categories.map((cat,idx) => (
							<tr key={cat.id} className="group transition-colors duration-150 hover:bg-slate-50">
								<td className="px-6 py-4 text-sm font-medium text-gray-400">#{idx + 1}</td>
								<td className="px-6 py-4 text-sm font-semibold text-gray-900">{cat.name}</td>
								<td className="px-6 py-4">
  {cat.imageUrl ? (
    <img
      src={cat.imageUrl}
      alt={cat.name}
      className="h-14 w-14 rounded-lg border border-gray-200 object-cover"
    />
  ) : (
    <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-dashed border-gray-300 text-xs text-gray-400">
      No Image
    </div>
  )}
</td>
								<td className="px-6 py-4 text-sm text-gray-500">{new Date(cat.createdAt).toLocaleString()}</td>
								<td className="px-6 py-4">
									<div className="flex justify-center gap-2">
										<Link href={`/admin/category/edit/${cat.id}`} className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition-colors duration-150 hover:bg-blue-600 hover:text-white">Edit</Link>
										<CategoryDeleteButton id={cat.id} />
									</div>
								</td>
							</tr>
						))}

						{categories.length === 0 && (
							<tr>
								<td colSpan={5} className="py-16 text-center">
									<div className="flex flex-col items-center gap-2 text-gray-400">
										<svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
											<path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
										</svg>
										<p className="text-sm font-medium">No categories found</p>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
