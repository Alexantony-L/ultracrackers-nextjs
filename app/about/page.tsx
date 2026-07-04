import AboutIntro from "@/components/about/AboutIntro";
import OurProducts from "@/components/about/OurProducts";
import VisionMission from "@/components/about/VisionMission";
import SafetyFooter from "@/components/common/Footer";



export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <OurProducts />
          <VisionMission />
          <SafetyFooter/>
    </>
  );
}
