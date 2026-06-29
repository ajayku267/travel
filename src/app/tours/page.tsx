import type { Metadata } from "next";
import { COMPANY_NAME } from "@/lib/utils";
import ToursList from "@/components/tours/ToursList";

export const metadata: Metadata = {
  title: `Tour Packages | ${COMPANY_NAME} — Nainital Darshan & Sightseeing`,
  description:
    "Explore our exclusive Nainital tour packages including Nainital Darshan, Lakes Tour, Mukteshwar, Ranikhet, Kausani, and Corbett Park. Book your cab today!",
};

export default function ToursPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="badge bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 mb-4">
            Sightseeing Tours
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Explore with <span className="text-yellow-400">Our Tour Packages</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover the beauty of Nainital and surrounding areas with our curated sightseeing tours. Choose from a variety of packages to suit your travel plans.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ToursList />
        </div>
      </section>
    </>
  );
}
