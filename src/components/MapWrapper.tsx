"use client";

import dynamic from "next/dynamic";

const TrackingMap = dynamic(() => import("./TrackingMap"), { 
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl animate-pulse">Loading Map Engine...</div>
});

export default function MapWrapper({ bookingId }: { bookingId: string }) {
  return <TrackingMap bookingId={bookingId} />;
}
