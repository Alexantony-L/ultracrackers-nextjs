import HomeHero from "@/components/landing/HomeHero";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import FireworksOutlet from "@/components/landing/FireworksOutlet";
import WhyChooseUltraCrackers from "@/components/landing/CrackersShopGallery";
import SafetyFooter from "@/components/common/Footer";



export default function HomePage() {
  return (
    <>
      <HomeHero />
      <WhyChooseUs />
      <FeatureShowcase />
      <FireworksOutlet />
      <WhyChooseUltraCrackers />
      <SafetyFooter />

    </>
  );
}
