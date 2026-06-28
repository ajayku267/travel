"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Location {
  display_name: string;
  lat: string;
  lon: string;
}

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  iconColorClass?: string;
  error?: boolean;
}

export default function LocationAutocomplete({
  value,
  onChange,
  placeholder = "Search location...",
  className,
  iconColorClass = "text-green-500",
  error = false,
}: LocationAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<Location[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync internal query state with external value changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch suggestions
  useEffect(() => {
    // If query is empty or same as selected value, don't fetch
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

  const handleSelect = (location: Location) => {
    const name = location.display_name;
    setQuery(name);
    onChange(name);
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setQuery(newVal);
    onChange(newVal); // update form immediately so it's not strictly controlled by the dropdown
    if (!isOpen) setIsOpen(true);
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
        className={cn("form-input pl-10", error && "border-red-400", className)}
      />
      
      {isLoading ? (
        <Loader2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin" />
      ) : (
        <MapPin size={15} className={cn("absolute left-3 top-1/2 -translate-y-1/2", iconColorClass)} />
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
