import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { Users, Luggage, Wind, CheckCircle, Phone } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { COMPANY_NAME } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Our Fleet | ${COMPANY_NAME} — Swift Dzire, Innova, Tempo Traveller`,
  description:
    "Choose from our fleet of well-maintained AC taxis: Swift Dzire, Maruti Ertiga, Toyota Innova, Innova Crysta, and Tempo Traveller. Book now at best prices.",
};

export default async function FleetPage() {
  const vehicles = await db.vehicle.findMany({
    orderBy: { baseFare: "asc" },
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="badge bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 mb-4">
            Our Fleet
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Premium Vehicles for
            <span className="text-yellow-400 block">Every Trip &amp; Budget</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            All our vehicles are air-conditioned, GPS-tracked, and serviced monthly. 
            Choose from budget sedans to luxury SUVs and group mini-buses.
          </p>
        </div>
      </section>

      {/* Fleet Cards */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {vehicles.map((vehicle, index) => {
              const features: string[] = (() => {
                try { return JSON.parse(vehicle.features); } catch { return []; }
              })();

              return (
                <div
                  key={vehicle.id}
                  id={vehicle.slug}
                  className="grid lg:grid-cols-2 gap-10 items-center scroll-mt-24 pb-16 border-b border-gray-100 last:border-0"
                >
                  {/* Image */}
                  <div className={`relative h-72 rounded-3xl overflow-hidden shadow-2xl ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {vehicle.popular && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                        ⭐ Most Popular
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-white font-black text-2xl">{vehicle.name}</div>
                      <div className="text-yellow-400 font-semibold">{vehicle.category}</div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-black text-gray-900">{vehicle.name}</h2>
                        <span className="badge badge-yellow">{vehicle.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Starting from</div>
                        <div className="text-2xl font-black text-gray-900">
                          {formatCurrency(vehicle.baseFare)}
                        </div>
                        <div className="text-sm text-gray-500">
                          + {formatCurrency(vehicle.pricePerKm)}/km
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6">{vehicle.description}</p>

                    {/* Specs */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                        <Users size={20} className="text-yellow-500 mx-auto mb-2" />
                        <div className="text-xl font-black text-gray-900">{vehicle.seatingCapacity}</div>
                        <div className="text-xs text-gray-500">Seats</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                        <Wind size={20} className="text-blue-500 mx-auto mb-2" />
                        <div className="text-xl font-black text-gray-900">AC</div>
                        <div className="text-xs text-gray-500">Available</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                        <Luggage size={20} className="text-green-500 mx-auto mb-2" />
                        <div className="text-sm font-black text-gray-900 leading-tight">{vehicle.luggageCapacity} Bags</div>
                        <div className="text-xs text-gray-500">Luggage</div>
                      </div>
                    </div>

                    {/* Features */}
                    {features.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-bold text-gray-900 mb-3">Features &amp; Amenities</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle size={14} className="text-green-500" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pricing */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6">
                      <h3 className="font-bold text-gray-900 mb-2">Pricing</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Base Fare:</span>
                          <span className="font-bold text-gray-900 ml-2">
                            {formatCurrency(vehicle.baseFare)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Per KM:</span>
                          <span className="font-bold text-gray-900 ml-2">
                            {formatCurrency(vehicle.pricePerKm)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Delhi (125km):</span>
                          <span className="font-bold text-gray-900 ml-2">
                            {formatCurrency(vehicle.baseFare + 125 * vehicle.pricePerKm)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Chandigarh (210km):</span>
                          <span className="font-bold text-gray-900 ml-2">
                            {formatCurrency(vehicle.baseFare + 210 * vehicle.pricePerKm)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex gap-3">
                      <a
                        href="tel:+919876543210"
                        className="flex items-center gap-2 px-5 py-2.5 btn-primary flex-1 justify-center"
                      >
                        <Phone size={16} /> Book {vehicle.name}
                      </a>
                      <a
                        href={`https://wa.me/919876543210?text=Hi! I want to book a ${vehicle.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
                      >
                        💬
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-yellow-400">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-3">
            Not Sure Which Vehicle to Choose?
          </h2>
          <p className="text-gray-800 mb-6">
            Call us and our team will help you pick the best vehicle for your trip and budget.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-yellow-400 font-bold rounded-xl hover:bg-gray-800 transition-colors"
            >
              <Phone size={18} /> Call +91 98765 43210
            </a>
            <Link
              href="/fare-calculator"
              className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-50 transition-colors"
            >
              💰 Calculate Fare
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
