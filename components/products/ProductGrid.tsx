import ProductCard from "./ProductCard";

type Product = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  active: boolean;
};

export default function ProductGrid({
  products,
}: {
  products: Product[];
}) {
  return (
    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-4
      gap-6
    "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
        />
      ))}
    </div>
  );
}