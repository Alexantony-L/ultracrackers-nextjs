  import { notFound } from "next/navigation";
  import Link from "next/link";
  import { prisma } from "@/lib/prisma";
  import { WHATSAPP_NUMBER } from "@/lib/constants";
  interface Props {
    params: Promise<{
      id: string;
    }>;
  }

  export default async function ProductDetails({ params }: Props) {
    const { id } = await params;
    console.log("prams id",id)
  const product =
    await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!product || !product.active) {
    notFound();
  }

    if (!product) {
      return notFound();
    }

    const whatsappNumber =
      WHATSAPP_NUMBER;

    const whatsappMessage =
      `Hi, I am interested in ${product.name} - ₹${product.price}`;

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;

    return (
      <div className="bg-slate-50">
        <div className="container mx-auto px-6 py-10">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#f8ab13]">
              Home
            </Link>
            <span>/</span>
            <Link href="/" className="hover:text-[#f8ab13]">
              Products
            </Link>
            <span>/</span>
            <span className="font-medium text-slate-700">{product.name}</span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50">
            <div className="grid gap-0 md:grid-cols-2">
              {/* Image */}
              <div className="relative bg-slate-100">
              <img
    src={
      product.imageUrl ||
      "/placeholder.jpg"
    }
    alt={product.name}
    className="h-full max-h-[520px] w-full object-cover"
  />
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center p-8 md:p-10">
                <span className="mb-3 w-fit rounded-full bg-[#f8ab13]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#f8ab13]">
                  Ultra Crackers
                </span>

                <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
                  {product.name}
                </h1>

                <p className="mt-4 leading-relaxed text-slate-600">
                  {product.description}
                </p>

                <div className="mt-6 flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-slate-900">
                    ₹{product.price}
                  </p>
                  <span className="text-sm text-slate-400">/ box</span>
                </div>

  {/* <div className="mt-4 flex gap-3">
    {product.category && (
      <span
        className="
        rounded-full
        bg-blue-100
        px-3 py-1
        text-sm
        text-blue-700
      "
      >
        {product.category}
      </span>
    )}

    <span
      className="
      rounded-full
      bg-green-100
      px-3 py-1
      text-sm
      text-green-700
    "
    >
      Stock: {product.stock}
    </span>
  </div> */}


                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  
                <a    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex items-center justify-center gap-2
                      rounded-lg bg-green-600
                      px-6 py-3.5 font-semibold text-white
                      shadow-md shadow-green-900/10
                      transition-all duration-150
                      hover:bg-green-700 hover:-translate-y-0.5
                    "
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.74.46 3.44 1.32 4.93L2.05 22l5.3-1.39a9.9 9.9 0 004.69 1.19h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2zm5.83 14.07c-.25.7-1.45 1.34-2 1.43-.54.08-1.18.12-1.9-.12-.44-.14-1-.32-1.72-.63-3.03-1.31-5-4.36-5.15-4.56-.15-.2-1.23-1.64-1.23-3.13 0-1.5.78-2.23 1.06-2.53.28-.3.6-.38.81-.38.2 0 .4 0 .58.01.18.01.44-.07.69.52.25.6.86 2.07.93 2.22.08.15.13.32.03.52-.1.2-.15.32-.3.5-.15.18-.31.4-.45.54-.15.15-.3.31-.13.61.18.3.78 1.29 1.68 2.09 1.16 1.03 2.13 1.36 2.43 1.51.3.15.48.13.65-.08.18-.2.75-.87.95-1.18.2-.3.4-.25.66-.15.27.1 1.7.8 1.99.95.3.15.49.22.56.35.08.13.08.74-.17 1.44z" />
                    </svg>
                    Contact Us On WhatsApp
                  </a>

                  <Link
                    href="/"
                    className="
                      flex items-center justify-center gap-2
                      rounded-lg border border-slate-300
                      px-6 py-3.5 font-semibold text-slate-700
                      transition-colors duration-150
                      hover:bg-slate-50
                    "
                  >
                    ← Back to Products
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-100 pt-6">
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <svg className="h-5 w-5 text-[#f8ab13]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-medium text-slate-500">Quality Assured</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <svg className="h-5 w-5 text-[#f8ab13]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25h5.625c.621 0 1.129.504 1.125 1.125v9.375m-9 0a1.5 1.5 0 01-3 0m3 0h-3" />
                    </svg>
                    <span className="text-xs font-medium text-slate-500">Fast Delivery</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <svg className="h-5 w-5 text-[#f8ab13]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                    <span className="text-xs font-medium text-slate-500">Safety Tested</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }