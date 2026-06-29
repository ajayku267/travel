import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PopularRoutes from "@/components/home/PopularRoutes";
import VehicleFleet from "@/components/home/VehicleFleet";
import CustomerReviews from "@/components/home/CustomerReviews";
import HomeFAQ from "@/components/home/HomeFAQ";
import ContactCTA from "@/components/home/ContactCTA";
import ServicesOverview from "@/components/home/ServicesOverview";
import { COMPANY_NAME } from "@/lib/utils";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: `${COMPANY_NAME} | Best Taxi & Cab Service in Nainital, Delhi NCR`,
  description:
    "Book affordable taxi in Nainital. Local, outstation, airport & corporate cab. 24/7 service, professional drivers.",
  openGraph: {
    title: `${COMPANY_NAME} | Best Taxi Service in Nainital`,
    description:
      "Book reliable taxi in Nainital & Delhi NCR. Local, outstation, airport transfer from ₹300. 24/7 available.",
  },
};

export default function Home() {
  const settings = getSettings();
  
  return (
    <>
      <HeroSection 
        title={settings.heroTitle}
        subtitle={settings.heroSubtitle}
      />
      <WhyChooseUs />
      <ServicesOverview />
      <PopularRoutes />
      <VehicleFleet />
      <CustomerReviews />
      <HomeFAQ />
      <ContactCTA />
    </>
  );
}
