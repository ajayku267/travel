"use client";

import { useEffect, useState } from "react";
import { Navigation } from "lucide-react";

export default function LocationTracker() {
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    let watchId: number;

    const startTracking = () => {
      if (!("geolocation" in navigator)) {
        setError("Geolocation is not supported by your browser");
        return;
      }

      setIsTracking(true);
      setError(null);

      watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            await fetch("/api/driver/location", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ lat: latitude, lng: longitude }),
            });
          } catch (err) {
            console.error("Failed to sync location:", err);
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError(err.message);
          setIsTracking(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    };

    startTracking();

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs">
      {isTracking ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-gray-300">Live Tracking On</span>
        </>
      ) : error ? (
        <span className="text-red-400 flex items-center gap-1">
          <Navigation size={12} /> {error}
        </span>
      ) : (
        <span className="text-gray-400">Locating...</span>
      )}
    </div>
  );
}
