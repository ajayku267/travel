import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { Users, Luggage, Wind, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default async function VehicleFleet() {
  const vehicles = await db.vehicle.findMany({
    orderBy: { baseFare: "asc" },
  });

  if (vehicles.length === 0) return null;

  return (
    <section className="py-20 bg-white" id="fleet">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="badge badge-yellow mb-3">Our Fleet</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 section-title">
            Choose Your Comfortable Ride
          </h2>
          <p className="text-gray-500 mt-5 max-w-2xl mx-auto">
            From small cars to spacious SUVs like Sumo and Tavera — we have the perfect
            vehicle for every hill trip and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => {
            const features: string[] = (() => {
              try { return JSON.parse(vehicle.features); } catch { return []; }
            })();

            return (
              <div key={vehicle.id} className="vehicle-card group">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {vehicle.popular && (
                    <div className="absolute top-3 left-3 bg-yellow-400 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full">
                      ⭐ Popular
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full">
                    {vehicle.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="text-xl font-black text-gray-900 mb-1">{vehicle.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{vehicle.description}</p>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="flex flex-col items-center bg-gray-50 rounded-xl p-3 gap-1">
                      <Users size={16} className="text-yellow-500" />
                      <span className="text-sm font-bold text-gray-900">{vehicle.seatingCapacity}</span>
                      <span className="text-xs text-gray-500">Seats</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 rounded-xl p-3 gap-1">
                      <Wind size={16} className="text-blue-500" />
                      <span className="text-sm font-bold text-gray-900">AC</span>
                      <span className="text-xs text-gray-500">Available</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 rounded-xl p-3 gap-1">
                      <Luggage size={16} className="text-green-500" />
                      <span className="text-sm font-bold text-gray-900 text-center leading-tight">
                        {vehicle.luggageCapacity}
                      </span>
                      <span className="text-xs text-gray-500">Luggage</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {features.slice(0, 4).map((f) => (
                      <span key={f} className="badge badge-yellow text-xs">
                        ✓ {f}
                      </span>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <span className="text-xs text-gray-500">Starting from</span>
                      <div className="text-lg font-black text-gray-900">
                        {formatCurrency(vehicle.baseFare)}
                      </div>
                      <span className="text-xs text-gray-500">+ {formatCurrency(vehicle.pricePerKm)}/km</span>
                    </div>
                    <Link
                      href={`/fleet#${vehicle.slug}`}
                      className="vehicle-book-btn flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl transition-all"
                    >
                      Book Now <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 font-bold rounded-xl hover:bg-gray-900 hover:text-white transition-all"
          >
            View Full Fleet Details <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
