import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { COMPANY_NAME } from "@/lib/utils";
import { ArrowRight, Clock, MapPin, Banknote } from "lucide-react";

export const metadata: Metadata = {
  title: `All Taxi Routes | ${COMPANY_NAME} — Nainital, Delhi NCR`,
  description:
    "Browse all available taxi routes from Nainital — Dadri, Bhiwani, Rohtak, Hisar, Gurgaon to Delhi and beyond. Fixed fares, 24/7 service.",
};

export default async function RoutesIndexPage() {
  const routes = await db.route.findMany({
    orderBy: { from: "asc" },
  });

  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-black text-white mb-4">
            All Taxi Routes
            <span className="text-yellow-400 block">Nainital &amp; Delhi NCR</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Fixed-fare taxi on {routes.length}+ routes across Nainital, Delhi NCR, and nearby states.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route) => (
              <Link key={route.id} href={`/routes/${route.slug}`} className="route-card rounded-2xl p-6 block group">
                <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
                  <span>{route.from}</span>
                  <ArrowRight size={16} className="text-yellow-400 group-hover:translate-x-1 transition-transform" />
                  <span>{route.to}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center bg-white/5 rounded-lg p-2">
                    <MapPin size={12} className="text-yellow-400 mx-auto mb-1" />
                    <div className="text-white">{route.distance}</div>
                  </div>
                  <div className="text-center bg-white/5 rounded-lg p-2">
                    <Clock size={12} className="text-yellow-400 mx-auto mb-1" />
                    <div className="text-white">{route.travelTime}</div>
                  </div>
                  <div className="text-center bg-white/5 rounded-lg p-2">
                    <Banknote size={12} className="text-yellow-400 mx-auto mb-1" />
                    <div className="text-white text-xs leading-tight">{route.fareEstimate}</div>
                  </div>
                </div>
                <div className="mt-4 text-yellow-400 text-sm font-semibold flex items-center gap-1">
                  Book Now <ArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
