import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  active: boolean;
}

export default function ProductCard({
  id,
  name,
  description,
  imageUrl,
  price,
  active,
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group block">
      <div
        className="
          overflow-hidden rounded-2xl border border-slate-100
          bg-white shadow-md shadow-slate-200/50
          transition-all duration-300
          hover:-translate-y-1 hover:border-[#f8ab13]/30 hover:shadow-xl hover:shadow-[#f8ab13]/10
        "
      >
        {/* Image */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-100">
          <img
            src={imageUrl || "/placeholder.png"}
            alt={name}
            className="
              h-full w-full object-cover
              transition-transform duration-500
              group-hover:scale-110
            "
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Quick view badge */}
          <span
            className="
              absolute right-3 top-3
              rounded-full bg-white/90 px-3 py-1
              text-xs font-semibold text-slate-700
              opacity-0 backdrop-blur-sm
              transition-opacity duration-300
              group-hover:opacity-100
            "
          >
            View Details
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <h2
            className="
              line-clamp-1 text-base font-semibold text-slate-900
              transition-colors duration-150
              group-hover:text-[#f8ab13]
            "
          >
            {name}
          </h2>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-lg font-bold text-slate-900">
              ₹{price}
            </p>

            <span
              className="
                flex h-8 w-8 items-center justify-center
                rounded-full bg-[#f8ab13]/10 text-[#f8ab13]
                transition-colors duration-150
                group-hover:bg-[#f8ab13] group-hover:text-white
              "
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}