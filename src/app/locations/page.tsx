import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { ArrowRight, MapPin } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return {
    title: `Taxi Service Locations | ${settings.companyName} — Nainital & all india`,
    description:
      "Find taxi service in your city — Charkhi Dadri, Bhiwani, Rohtak, Hisar, Gurgaon, and more across Nainital and all india.",
  };
}

export default async function LocationsPage() {
  const locations = await db.location.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-black text-white mb-4">
            Taxi Service Locations
            <span className="text-yellow-400 block">Nainital &amp; all india</span>
          </h1>
          <p className="text-gray-300 text-lg">
            We operate in all major cities and towns across Nainital and all india.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => {
              const services: string[] = (() => {
                try { return JSON.parse(loc.services); } catch { return []; }
              })();

              return (
                <Link
                  key={loc.id}
                  href={`/locations/${loc.slug}`}
                  className="group border border-gray-100 rounded-2xl p-6 hover:border-yellow-300 hover:shadow-xl transition-all card-hover"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-gray-900" />
                    </div>
                    <div>
                      <h2 className="font-black text-gray-900 text-xl">{loc.name}</h2>
                      <span className="text-gray-500 text-sm">{loc.state}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{loc.about}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {services.slice(0, 3).map((s) => (
                      <span key={s} className="badge badge-yellow text-xs">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    View Services <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
