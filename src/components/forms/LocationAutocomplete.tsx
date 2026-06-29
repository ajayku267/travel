"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Loader2, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export interface LocationData {
  name: string;
  lat: number;
  lon: number;
}

interface NominatimLocation {
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onLocationSelect?: (location: LocationData) => void;
  placeholder?: string;
  className?: string;
  iconColorClass?: string;
  error?: boolean;
  showLocateMe?: boolean;
}

export default function LocationAutocomplete({
  value,
  onChange,
  onLocationSelect,
  placeholder = "Search location...",
  className,
  iconColorClass = "text-green-500",
  error = false,
  showLocateMe = false,
}: LocationAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<NominatimLocation[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query || query === value) {
      setResults([]);
      return;
    }

    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/places?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
        setIsOpen(true);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchLocations, 600);
    return () => clearTimeout(debounceTimer);
  }, [query, value]);

  const handleSelect = (location: NominatimLocation) => {
    const name = location.display_name;
    const lat = parseFloat(location.lat);
    const lon = parseFloat(location.lon);

    setQuery(name);
    onChange(name);
    
    if (onLocationSelect) {
      onLocationSelect({ name, lat, lon });
    }
    
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setQuery(newVal);
    onChange(newVal);
    if (!isOpen) setIsOpen(true);
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`/api/reverse-geocode?lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          
          if (data && data.display_name) {
            const name = data.display_name;
            setQuery(name);
            onChange(name);
            if (onLocationSelect) {
              onLocationSelect({ name, lat: latitude, lon: longitude });
            }
            toast.success("Location found!");
          } else {
            toast.error("Could not determine address from coordinates");
          }
        } catch (error) {
          console.error("Reverse geocode error:", error);
          toast.error("Failed to fetch address");
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        setIsLocating(false);
        toast.error("Unable to retrieve your location. Please check permissions.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => {
          if (results.length > 0) setIsOpen(true);
        }}
        placeholder={placeholder}
        className={cn("form-input pl-10", showLocateMe ? "pr-10" : "", error && "border-red-400", className)}
      />
      
      {isLoading ? (
        <Loader2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin" />
      ) : (
        <MapPin size={15} className={cn("absolute left-3 top-1/2 -translate-y-1/2", iconColorClass)} />
      )}

      {showLocateMe && (
        <button
          type="button"
          onClick={handleLocateMe}
          disabled={isLocating}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600 transition-colors disabled:opacity-50"
          title="Use current location"
        >
          {isLocating ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Navigation size={16} />
          )}
        </button>
      )}

      {isOpen && results.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto divide-y divide-gray-50">
          {results.map((result, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(result)}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm transition-colors text-gray-700 flex items-start gap-3"
            >
              <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">{result.display_name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
