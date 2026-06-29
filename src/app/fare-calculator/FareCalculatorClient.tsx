"use client";

import { useState } from "react";
import { calculateFare, formatCurrency } from "@/lib/utils";
import { Calculator, MapPin, Car, ArrowRight } from "lucide-react";
import { useSettings } from "@/components/providers/SettingsProvider";

const commonCities = [
  "Charkhi Dadri",
  "Bhiwani",
  "Rohtak",
  "Hisar",
  "Gurgaon",
  "Delhi",
  "Chandigarh",
  "Jaipur",
  "Agra",
  "Shimla",
];

// Estimated distances in km between cities
const distanceMap: Record<string, number> = {
  "charkhi dadri-delhi": 125,
  "charkhi dadri-gurgaon": 105,
  "charkhi dadri-chandigarh": 210,
  "bhiwani-delhi": 140,
  "bhiwani-gurgaon": 120,
  "rohtak-delhi": 80,
  "rohtak-gurgaon": 65,
  "hisar-delhi": 165,
  "hisar-gurgaon": 175,
  "hisar-chandigarh": 250,
  "delhi-chandigarh": 250,
  "delhi-jaipur": 280,
  "delhi-agra": 210,
  "chandigarh-shimla": 120,
};

function getDistance(from: string, to: string): number {
  const key1 = `${from.toLowerCase()}-${to.toLowerCase()}`;
  const key2 = `${to.toLowerCase()}-${from.toLowerCase()}`;
  return distanceMap[key1] || distanceMap[key2] || 100;
}

export default function FareCalculatorClient({
  vehicles,
  popularRoutes,
}: {
  vehicles: any[];
  popularRoutes: any[];
}) {
  const settings = useSettings();
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [vehicleType, setVehicleType] = useState(vehicles[0]?.slug || "");
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [result, setResult] = useState<{ fare: number; distance: number } | null>(null);

  const handleCalculate = () => {
    if (!pickup || !drop) return;
    const distance = getDistance(pickup, drop);
    const fare = calculateFare(distance, vehicleType, tripType);
    setResult({ fare, distance });
  };

  const vehicle = vehicles.find((v) => v.slug === vehicleType);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="badge bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 mb-4">
            Fare Calculator
          </span>
          <h1 className="text-4xl font-black text-white mb-4">
            Estimate Your Taxi Fare
          </h1>
          <p className="text-gray-300 text-lg">
            Get an instant fare estimate for your journey. All fares are fixed — no surprises.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                <Calculator size={22} className="text-gray-900" />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900">Fare Calculator</h2>
                <p className="text-gray-500 text-sm">Enter your journey details</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Pickup */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Pickup City
                </label>
                <div className="relative">
                  <select
                    value={pickup}
                    onChange={(e) => { setPickup(e.target.value); setResult(null); }}
                    className="form-input pl-10 appearance-none"
                  >
                    <option value="">Select Pickup City</option>
                    {commonCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500" />
                </div>
              </div>

              {/* Drop */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Drop City
                </label>
                <div className="relative">
                  <select
                    value={drop}
                    onChange={(e) => { setDrop(e.target.value); setResult(null); }}
                    className="form-input pl-10 appearance-none"
                  >
                    <option value="">Select Drop City</option>
                    {commonCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" />
                </div>
              </div>

              {/* Vehicle */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Vehicle Type
                </label>
                <div className="relative">
                  <select
                    value={vehicleType}
                    onChange={(e) => { setVehicleType(e.target.value); setResult(null); }}
                    className="form-input pl-10 appearance-none"
                  >
                    {vehicles.map((v) => (
                      <option key={v.slug} value={v.slug}>
                        {v.name} — {v.seatingCapacity} Seats
                      </option>
                    ))}
                  </select>
                  <Car size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Trip Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Trip Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "one-way", label: "One Way" },
                    { value: "round-trip", label: "Round Trip" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setTripType(opt.value as "one-way" | "round-trip"); setResult(null); }}
                      className={`py-2.5 rounded-xl border-2 font-semibold text-sm transition-all ${
                        tripType === opt.value
                          ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculate */}
              <button
                onClick={handleCalculate}
                disabled={!pickup || !drop}
                className="w-full btn-primary py-3.5 text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calculator size={18} /> Calculate Fare
              </button>
            </div>

            {/* Result */}
            {result && vehicle && (
              <div className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-white">
                <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm">
                  <span className="text-green-400">{pickup}</span>
                  <ArrowRight size={14} />
                  <span className="text-red-400">{drop}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-gray-400 text-xs mb-1">Distance</div>
                    <div className="text-2xl font-black text-yellow-400">~{result.distance} km</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-gray-400 text-xs mb-1">Vehicle</div>
                    <div className="text-lg font-black">{vehicle.name}</div>
                    <div className="text-gray-400 text-xs">{vehicle.seatingCapacity} Seats · AC</div>
                  </div>
                </div>

                <div className="text-center bg-yellow-400 rounded-xl p-5 mb-5">
                  <div className="text-gray-900 text-sm font-semibold mb-1">
                    Estimated {tripType === "round-trip" ? "Round Trip" : "One Way"} Fare
                  </div>
                  <div className="text-gray-900 text-4xl font-black">
                    {formatCurrency(result.fare)}
                  </div>
                  <div className="text-gray-700 text-xs mt-1">
                    *Inclusive of driver allowance &amp; tolls
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={`tel:${settings.phone}`}
                    className="flex-1 text-center py-3 bg-yellow-400 text-gray-900 font-bold rounded-xl"
                  >
                    📞 Book Now
                  </a>
                  <a
                    href={`https://wa.me/${settings.whatsapp}?text=Hi! I want to book ${vehicle.name} from ${pickup} to ${drop}. Estimated fare: ${formatCurrency(result.fare)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 bg-green-500 text-white font-bold rounded-xl"
                  >
                    💬 WhatsApp
                  </a>
                </div>

                <p className="text-gray-400 text-xs text-center mt-3">
                  Final fare may vary based on exact pickup/drop points, time of travel, and waiting charges.
                </p>
              </div>
            )}
          </div>

          {/* Route suggestions */}
          <div className="mt-10">
            <h2 className="text-xl font-black text-gray-900 mb-5">Popular Route Fares</h2>
            <div className="grid gap-3">
              {popularRoutes.slice(0, 5).map((route) => (
                <div
                  key={route.id}
                  className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-500">🚖</span>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {route.from} → {route.to}
                      </div>
                      <div className="text-xs text-gray-500">{route.distance}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-gray-900">{route.fareEstimate}</div>
                    <div className="text-xs text-gray-500">from</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
