"use client";

import { useState } from "react";
import { ArrowRight, MapPin, Car, Info } from "lucide-react";
import { tourPackages, TourPackage } from "@/data/tours";
import TourBookingModal from "@/components/tours/TourBookingModal";
import Link from "next/link";

export default function ToursList() {
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {tourPackages.map((tour) => (
          <div key={tour.id} className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col hover:-translate-y-1 transition-all duration-300">
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-black text-gray-900 leading-tight mb-2">
                    {tour.name}
                  </h3>
                  {tour.type && (
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                      {tour.type}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 mb-6 bg-gray-50 p-4 rounded-2xl">
                <MapPin size={18} className="text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Places Covered</span>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {tour.covers}
                  </p>
                </div>
              </div>

              <div className="mt-auto">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3">Vehicle Pricing {tour.prices.note ? `(${tour.prices.note})` : ""}</span>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="bg-white border border-gray-100 rounded-xl p-3 text-center shadow-sm">
                    <Car size={16} className="text-gray-400 mx-auto mb-2" />
                    <div className="text-[10px] font-bold text-gray-500 mb-1">SMALL CARS</div>
                    <div className="text-sm font-black text-gray-900">₹{tour.prices.smallCars}</div>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-xl p-3 text-center shadow-sm">
                    <Car size={16} className="text-gray-400 mx-auto mb-2" />
                    <div className="text-[10px] font-bold text-gray-500 mb-1">SUMO</div>
                    <div className="text-sm font-black text-gray-900">₹{tour.prices.sumo}</div>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-xl p-3 text-center shadow-sm">
                    <Car size={16} className="text-gray-400 mx-auto mb-2" />
                    <div className="text-[10px] font-bold text-gray-500 mb-1">TAVERA</div>
                    <div className="text-sm font-black text-gray-900">₹{tour.prices.tavera}</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedTour(tour)}
                className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-yellow-400 hover:text-gray-900 transition-colors flex items-center justify-center gap-2 group"
              >
                Book This Tour
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-yellow-50 rounded-3xl p-8 md:p-12 border border-yellow-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-400/30">
            <Info size={24} className="text-gray-900" />
          </div>
          <div>
            <h4 className="text-xl font-black text-gray-900 mb-2">Need a custom itinerary?</h4>
            <p className="text-gray-700">
              We also provide tailored tour packages based on your preferences and schedule. Contact us to discuss your requirements.
            </p>
          </div>
        </div>
        <Link
          href="/contact"
          className="flex-shrink-0 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-all whitespace-nowrap"
        >
          Contact Us Now
        </Link>
      </div>

      {selectedTour && (
        <TourBookingModal
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </>
  );
}
