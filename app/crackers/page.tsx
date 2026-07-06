// app/products/page.tsx
import { CartProvider } from "@/components/cart/CartContext";
import ProductListing from "@/components/products/ProductListing";
import CartButton from "@/components/cart/CartButton";
import CartDrawer from "@/components/cart/CartDrawer";
import SafetyFooter from "@/components/common/Footer";
import ContainerImage from "@/components/products/ContainerImage";
import OfferBar from "@/components/common/OfferBar";

export default function ProductsPage() {
  return (
    <CartProvider>
         <ContainerImage
        src="/banner1.png"
        alt="Ultra Crackers Banner"
        priority
      />
   <OfferBar />

      <ProductListing />
      <CartButton />
      <CartDrawer />
      <SafetyFooter/>
    </CartProvider>
  );
}