"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// @ts-expect-error - fixing leaflet's missing type definition
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapBounds({ pickup, drop }: { pickup?: [number, number], drop?: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (pickup && drop) {
      const bounds = L.latLngBounds([pickup, drop]);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (pickup) {
      map.setView(pickup, 13);
    } else if (drop) {
      map.setView(drop, 13);
    }
  }, [pickup, drop, map]);

  return null;
}

interface BookingMapProps {
  pickupCoords?: [number, number] | null;
  dropCoords?: [number, number] | null;
  pickupName?: string;
  dropName?: string;
}

export default function BookingMap({ pickupCoords, dropCoords, pickupName, dropName }: BookingMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[250px] bg-gray-100 rounded-xl animate-pulse" />;

  // Default to India center if no coordinates
  const defaultCenter: [number, number] = [28.6139, 77.2090]; 

  return (
    <div className="h-[250px] sm:h-[300px] w-full rounded-xl overflow-hidden shadow-inner border border-gray-200 z-0 relative">
      <MapContainer 
        center={pickupCoords || dropCoords || defaultCenter} 
        zoom={pickupCoords || dropCoords ? 13 : 5} 
        scrollWheelZoom={false} 
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {pickupCoords && (
          <Marker position={pickupCoords} icon={greenIcon}>
            <Popup>
              <strong>Pickup Location</strong><br/>
              {pickupName || "Selected Location"}
            </Popup>
          </Marker>
        )}

        {dropCoords && (
          <Marker position={dropCoords} icon={redIcon}>
            <Popup>
              <strong>Drop Location</strong><br/>
              {dropName || "Selected Location"}
            </Popup>
          </Marker>
        )}

        <MapBounds pickup={pickupCoords || undefined} drop={dropCoords || undefined} />
      </MapContainer>
    </div>
  );
}
