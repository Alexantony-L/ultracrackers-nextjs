import ContactFooter from "@/components/contactus/ContactFooter";
import ContactHero from "@/components/contactus/ContactHero";
import ContactInfo from "@/components/contactus/ContactInfo";
import ContactMap from "@/components/contactus/ContactMap";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInfo />
          <ContactMap />
          <ContactFooter/>
    </>
  );
}