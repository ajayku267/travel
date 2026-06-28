"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon paths in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const carIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3204/3204018.png", // A simple car icon
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

export default function TrackingMap({ bookingId }: { bookingId: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch(`/api/track/${bookingId}`);
        if (!res.ok) throw new Error("Tracking not available");
        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
    
    // Poll every 5 seconds
    const interval = setInterval(fetchLocation, 5000);
    return () => clearInterval(interval);
  }, [bookingId]);

  if (loading) return <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">Loading map...</div>;
  if (error) return <div className="h-64 flex items-center justify-center bg-red-50 text-red-500 rounded-xl">{error}</div>;
  if (!data?.driver?.currentLat || !data?.driver?.currentLng) {
    return (
      <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-xl p-6 text-center border-2 border-dashed border-gray-200">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-2xl">⏳</div>
        <h3 className="font-bold text-gray-800">Waiting for driver location</h3>
        <p className="text-sm text-gray-500 mt-1">The map will automatically appear once the driver starts moving.</p>
      </div>
    );
  }

  const position: [number, number] = [data.driver.currentLat, data.driver.currentLng];

  return (
    <div className="relative h-[400px] rounded-xl overflow-hidden shadow-sm border border-gray-200 z-0">
      <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={carIcon}>
          <Popup>
            <div className="font-bold">{data.driver.name} is here</div>
            <div className="text-xs text-gray-500">
              Updated: {new Date(data.driver.lastLocationUpdate).toLocaleTimeString()}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      
      {/* Overlay Status */}
      <div className="absolute bottom-4 left-4 right-4 z-[400]">
        <div className="bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-0.5">Live Status</div>
            <div className="font-medium text-gray-900 capitalize">{data.status}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-0.5">Driver</div>
            <div className="font-bold text-gray-900">{data.driver.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
