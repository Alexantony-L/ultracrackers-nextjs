import OfferBar from "@/components/common/OfferBar";
import ProductGrid from "@/components/products/ProductGrid";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const products =
    await prisma.product.findMany({
      where: {
        active: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      {/* <h1 className="mb-8 text-center text-4xl font-bold">
        Ultra Crackers
      </h1> */}
      <ProductGrid products={products} />
    </main>
  );
}