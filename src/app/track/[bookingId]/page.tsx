import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Phone, MapPin, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import MapWrapper from "@/components/MapWrapper";

export default async function TrackBookingPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params;
  const booking = await db.booking.findUnique({
    where: { bookingId },
    include: { driver: true }
  });

  if (!booking) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gray-900 text-white px-5 py-6 pt-10 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <Link href="/" className="text-sm text-gray-400 hover:text-white">← Home</Link>
          <div className="text-xs font-mono bg-gray-800 px-2 py-1 rounded-md text-gray-300">
            {booking.bookingId}
          </div>
        </div>
        <h1 className="text-2xl font-black mb-1">Live Tracking</h1>
        <p className="text-gray-400 text-sm">Watch your driver in real-time</p>
      </div>

      <div className="p-5 -mt-6">
        {/* Map Container */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 mb-6">
          <MapWrapper bookingId={booking.bookingId} />
        </div>

        {/* Ride Details */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-5">
          <h2 className="font-bold text-gray-900 border-b border-gray-100 pb-3">Trip Details</h2>
          
          <div className="relative pl-6 space-y-4">
            <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-gray-200"></div>
            
            <div className="relative">
              <div className="absolute -left-6 top-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white ring-2 ring-green-100"></div>
              <div className="text-xs text-gray-500 mb-0.5">Pickup</div>
              <div className="font-semibold text-gray-900">{booking.pickup}</div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-6 top-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-100"></div>
              <div className="text-xs text-gray-500 mb-0.5">Drop</div>
              <div className="font-semibold text-gray-900">{booking.drop}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div>
              <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
                <Calendar size={14} /> Date
              </div>
              <div className="font-medium text-sm text-gray-900">{booking.date}</div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-1">
                <Phone size={14} /> Support
              </div>
              <a href="tel:+919876543210" className="font-medium text-sm text-blue-600">Call Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
