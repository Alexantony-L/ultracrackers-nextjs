import SafetyFooter from "@/components/common/Footer";
import SafetyHero from "@/components/safetytips/SafetyHero";
import SafetyTipsContent from "@/components/safetytips/SafetyTipsContent";

export default function SafetyTipsPage() {
  return (
    <>
      <SafetyHero />
          <SafetyTipsContent />
          <SafetyFooter/>
    </>
  );
}