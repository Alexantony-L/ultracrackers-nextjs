export default function AdminLoading() {
  return (
    <div className="w-full space-y-6 p-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-2xl bg-slate-200" />
        <div className="space-y-2">
          <div className="h-8 w-48 rounded bg-slate-200" />
          <div className="h-4 w-32 rounded bg-slate-200" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="mt-3 h-8 w-16 rounded bg-slate-200" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-4 h-6 w-32 rounded bg-slate-200" />
        <div className="space-y-3">
          <div className="h-10 w-full rounded bg-slate-100" />
          <div className="h-8 w-full rounded bg-slate-50" />
          <div className="h-8 w-full rounded bg-slate-50" />
          <div className="h-8 w-full rounded bg-slate-50" />
        </div>
      </div>
    </div>
  );
}
