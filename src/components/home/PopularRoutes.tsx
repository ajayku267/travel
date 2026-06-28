import Link from "next/link";
import { db } from "@/lib/db";
import { ArrowRight, Clock, MapPin, Banknote } from "lucide-react";

export default async function PopularRoutes() {
  const routes = await db.route.findMany({
    orderBy: { fareEstimate: "asc" },
    take: 6,
  });

  if (routes.length === 0) return null;

  return (
    <section className="py-20 bg-gray-900" id="routes">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="badge bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 mb-3">
            Popular Routes
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white section-title">
            Most Booked Taxi Routes
          </h2>
          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            Book a taxi on these popular routes with fixed transparent pricing and guaranteed
            availability 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route) => (
            <Link key={route.id} href={`/routes/${route.slug}`} className="route-card rounded-2xl p-6 block group">
              {/* Route header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <span>{route.from}</span>
                    <ArrowRight size={18} className="text-yellow-400 group-hover:translate-x-1 transition-transform" />
                    <span>{route.to}</span>
                  </div>
                  <div className="text-gray-400 text-sm mt-0.5">
                    {route.fromState} → {route.toState}
                  </div>
                </div>
                <div className="w-10 h-10 bg-yellow-400/10 border border-yellow-400/20 rounded-xl flex items-center justify-center text-yellow-400">
                  🚖
                </div>
              </div>

              {/* Route details */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="text-center bg-white/5 rounded-xl p-3">
                  <MapPin size={14} className="text-yellow-400 mx-auto mb-1" />
                  <div className="text-white font-semibold text-sm">{route.distance}</div>
                  <div className="text-gray-500 text-xs">Distance</div>
                </div>
                <div className="text-center bg-white/5 rounded-xl p-3">
                  <Clock size={14} className="text-yellow-400 mx-auto mb-1" />
                  <div className="text-white font-semibold text-sm">{route.travelTime}</div>
                  <div className="text-gray-500 text-xs">Duration</div>
                </div>
                <div className="text-center bg-white/5 rounded-xl p-3">
                  <Banknote size={14} className="text-yellow-400 mx-auto mb-1" />
                  <div className="text-white font-semibold text-sm leading-tight">{route.fareEstimate}</div>
                  <div className="text-gray-500 text-xs">Est. Fare</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">AC · Fixed Price · 24/7</span>
                <span className="text-yellow-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Book Now <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/routes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-300 transition-all"
          >
            View All Routes <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
