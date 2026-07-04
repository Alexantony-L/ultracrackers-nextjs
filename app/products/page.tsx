// app/products/page.tsx
import { CartProvider } from "@/components/cart/CartContext";
import ProductListing from "@/components/products/ProductListing";
import CartButton from "@/components/cart/CartButton";
import CartDrawer from "@/components/cart/CartDrawer";

export default function ProductsPage() {
  return (
    <CartProvider>
      <ProductListing />
      <CartButton />
      <CartDrawer />
    </CartProvider>
  );
}