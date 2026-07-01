"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MapPin, Loader2, Navigation, Search, Clock, Plane, Landmark, Building2, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { searchWorldPlaces, trendingPlaces, type WorldPlace } from "@/data/worldPlaces";

export interface LocationData {
  name: string;
  lat: number;
  lon: number;
}

interface NominatimLocation {
  display_name: string;
  lat: string;
  lon: string;
  place_type?: string;
  country?: string;
  city?: string;
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
  compact?: boolean;
  variant?: "default" | "hero" | "header";
}

const RECENT_STORAGE_KEY = "recent-places";
const MAX_RECENT = 5;

function getRecentPlaces(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(RECENT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveRecentPlace(place: string) {
  if (typeof window === "undefined") return;
  try {
    const recent = getRecentPlaces().filter((p) => p !== place);
    recent.unshift(place);
    localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
  } catch {
    // Ignore localStorage errors
  }
}

function getPlaceTypeIcon(type?: string) {
  switch (type) {
    case "airport":
      return <Plane size={14} className="text-blue-500" />;
    case "landmark":
      return <Landmark size={14} className="text-amber-500" />;
    case "city":
      return <Building2 size={14} className="text-emerald-500" />;
    case "state":
      return <Globe size={14} className="text-purple-500" />;
    default:
      return <MapPin size={14} className="text-gray-400" />;
  }
}

function highlightMatch(text: string, query: string) {
  if (!query || query.length === 0) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="autocomplete-highlight">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function LocationAutocomplete({
  value,
  onChange,
  onLocationSelect,
  placeholder = "Search any place in the world...",
  className,
  iconColorClass = "text-green-500",
  error = false,
  showLocateMe = false,
  compact = false,
  variant = "default",
}: LocationAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<NominatimLocation[]>([]);
  const [localResults, setLocalResults] = useState<WorldPlace[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showRecent, setShowRecent] = useState(false);
  const [recentPlaces, setRecentPlaces] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Load recent places on mount
  useEffect(() => {
    setRecentPlaces(getRecentPlaces());
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowRecent(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Client-side instant search (fires immediately)
  useEffect(() => {
    if (!query || query.length === 0) {
      setLocalResults([]);
      return;
    }
    const matches = searchWorldPlaces(query, 6);
    setLocalResults(matches);
  }, [query]);

  // API search (debounced, fires after 300ms)
  useEffect(() => {
    if (!query || query.length === 0 || query === value) {
      setResults([]);
      return;
    }

    const fetchLocations = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/places?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setResults(data);
          setIsOpen(true);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchLocations, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, value]);

  const handleSelect = useCallback((name: string, lat?: number, lon?: number) => {
    setQuery(name);
    onChange(name);
    saveRecentPlace(name);
    setRecentPlaces(getRecentPlaces());

    if (onLocationSelect && lat !== undefined && lon !== undefined) {
      onLocationSelect({ name, lat, lon });
    }

    setIsOpen(false);
    setShowRecent(false);
    setActiveIndex(-1);
  }, [onChange, onLocationSelect]);

  const handleNominatimSelect = useCallback((location: NominatimLocation) => {
    handleSelect(
      location.display_name,
      parseFloat(location.lat),
      parseFloat(location.lon)
    );
  }, [handleSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setQuery(newVal);
    onChange(newVal);
    setActiveIndex(-1);
    if (newVal.length > 0) {
      setIsOpen(true);
      setShowRecent(false);
    } else {
      setIsOpen(false);
      setShowRecent(true);
    }
  };

  const handleFocus = () => {
    if (query && query.length > 0 && (results.length > 0 || localResults.length > 0)) {
      setIsOpen(true);
    } else if (!query || query.length === 0) {
      setShowRecent(true);
    }
  };

  // Total items for keyboard nav
  const allItems = [
    ...localResults.map((p) => ({
      type: "local" as const,
      name: p.name,
      sub: p.country,
      placeType: p.type,
    })),
    ...results.map((r) => ({
      type: "api" as const,
      name: r.display_name,
      sub: r.country || "",
      placeType: r.place_type || "place",
      lat: r.lat,
      lon: r.lon,
    })),
  ];

  // Deduplicate by name
  const seen = new Set<string>();
  const uniqueItems = allItems.filter((item) => {
    const key = item.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const itemCount = showRecent ? recentPlaces.length : uniqueItems.length;
    if (!itemCount) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % itemCount);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      if (showRecent && recentPlaces[activeIndex]) {
        handleSelect(recentPlaces[activeIndex]);
      } else if (uniqueItems[activeIndex]) {
        const item = uniqueItems[activeIndex];
        if (item.type === "api" && "lat" in item && "lon" in item) {
          handleSelect(item.name, parseFloat(item.lat as string), parseFloat(item.lon as string));
        } else {
          handleSelect(item.name);
        }
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setShowRecent(false);
      inputRef.current?.blur();
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const items = listRef.current.children;
      if (items[activeIndex]) {
        (items[activeIndex] as HTMLElement).scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex]);

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
            handleSelect(data.display_name, latitude, longitude);
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
      () => {
        setIsLocating(false);
        toast.error("Unable to retrieve your location. Please check permissions.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleChipClick = (place: string) => {
    setQuery(place);
    onChange(place);
    saveRecentPlace(place);
    setRecentPlaces(getRecentPlaces());
    setShowRecent(false);
    setIsOpen(false);
  };

  const hasAnyResults = isOpen && uniqueItems.length > 0;
  const showDropdown = hasAnyResults || (showRecent && recentPlaces.length > 0);

  const inputClasses = cn(
    variant === "hero"
      ? "w-full py-3.5 px-12 bg-transparent text-white placeholder-white/50 text-base focus:outline-none"
      : variant === "header"
        ? "w-full py-2.5 px-9 bg-transparent text-gray-900 placeholder-gray-500 text-[13px] font-medium focus:outline-none"
        : cn("form-input pl-10", showLocateMe ? "pr-10" : "", error && "border-red-400"),
    className
  );

  return (
    <div ref={wrapperRef} className="relative">
      {/* Input Field */}
      <div className={cn(
        "relative",
        variant === "hero" ? "hero-search-bar" : variant === "header" ? "header-search" : ""
      )}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={inputClasses}
          autoComplete="off"
          role="combobox"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          aria-autocomplete="list"
        />

        {/* Left icon */}
        {variant === "hero" ? (
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400" />
        ) : variant === "header" ? (
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        ) : isLoading ? (
          <Loader2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin" />
        ) : (
          <MapPin size={15} className={cn("absolute left-3 top-1/2 -translate-y-1/2", iconColorClass)} />
        )}

        {/* Loading indicator for hero/header */}
        {(variant === "hero" || variant === "header") && isLoading && (
          <Loader2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-400 animate-spin" />
        )}

        {/* Locate me button */}
        {showLocateMe && variant === "default" && (
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
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute z-50 w-full mt-1.5 bg-white border border-gray-200 rounded-2xl shadow-2xl shadow-black/8 max-h-80 overflow-auto autocomplete-dropdown"
        >
          {/* Recent places section */}
          {showRecent && recentPlaces.length > 0 && (
            <>
              <li className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock size={11} /> Recent Searches
              </li>
              {recentPlaces.map((place, idx) => (
                <li
                  key={`recent-${idx}`}
                  onClick={() => handleSelect(place)}
                  className={cn(
                    "px-4 py-3 cursor-pointer text-sm transition-all flex items-center gap-3 autocomplete-item",
                    activeIndex === idx ? "autocomplete-active" : "hover:bg-gray-50"
                  )}
                  role="option"
                  aria-selected={activeIndex === idx}
                >
                  <Clock size={14} className="text-gray-300 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{place}</span>
                </li>
              ))}

              {/* Popular chips below recents */}
              <li className="px-4 pt-3 pb-2">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">🔥 Popular</div>
                <div className="flex flex-wrap gap-1.5">
                  {trendingPlaces.slice(0, 8).map((place, i) => (
                    <button
                      key={place}
                      type="button"
                      onClick={() => handleChipClick(place)}
                      className="place-chip chip-enter text-xs"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      {place}
                    </button>
                  ))}
                </div>
              </li>
            </>
          )}

          {/* Search results */}
          {hasAnyResults && (
            <>
              {/* Local matches label */}
              {localResults.length > 0 && query.length > 0 && (
                <li className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  ⚡ Instant Results
                </li>
              )}

              {/* Local results */}
              {localResults.length > 0 && query.length > 0 && (
                <>
                  {localResults.map((place, idx) => {
                    const itemIdx = idx;
                    return (
                      <li
                        key={`local-${place.name}`}
                        onClick={() => handleSelect(place.name)}
                        className={cn(
                          "px-4 py-3 cursor-pointer text-sm transition-all flex items-start gap-3 autocomplete-item",
                          activeIndex === itemIdx ? "autocomplete-active" : "hover:bg-gray-50"
                        )}
                        role="option"
                        aria-selected={activeIndex === itemIdx}
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          {getPlaceTypeIcon(place.type)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 truncate">
                            {highlightMatch(place.name, query)}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                            <span>{place.country}</span>
                            <span className="text-gray-300">•</span>
                            <span className="capitalize">{place.type}</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </>
              )}

              {/* API results */}
              {results.length > 0 && (
                <>
                  {localResults.length > 0 && (
                    <li className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 border-t border-gray-100">
                      <Globe size={11} /> World Results
                    </li>
                  )}
                  {results
                    .filter((r) => {
                      // Skip results already shown in local
                      const key = r.display_name.toLowerCase();
                      return !localResults.some((lr) => key.includes(lr.name.toLowerCase()));
                    })
                    .slice(0, 6)
                    .map((result, idx) => {
                      const itemIdx = localResults.length + idx;
                      return (
                        <li
                          key={`api-${idx}`}
                          onClick={() => handleNominatimSelect(result)}
                          className={cn(
                            "px-4 py-3 cursor-pointer text-sm transition-all flex items-start gap-3 autocomplete-item",
                            activeIndex === itemIdx ? "autocomplete-active" : "hover:bg-gray-50"
                          )}
                          role="option"
                          aria-selected={activeIndex === itemIdx}
                        >
                          <div className="mt-0.5 flex-shrink-0">
                            {getPlaceTypeIcon(result.place_type)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-gray-800 line-clamp-2">
                              {highlightMatch(result.display_name, query)}
                            </div>
                            {result.country && (
                              <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                <span>{result.country}</span>
                                {result.place_type && (
                                  <>
                                    <span className="text-gray-300">•</span>
                                    <span className="capitalize">{result.place_type}</span>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    })}
                </>
              )}
            </>
          )}

          {/* Loading skeletons */}
          {isLoading && results.length === 0 && localResults.length === 0 && (
            <>
              {[1, 2, 3].map((i) => (
                <li key={`skel-${i}`} className="px-4 py-3 flex items-center gap-3 autocomplete-item">
                  <div className="w-5 h-5 rounded-full skeleton-pulse" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3.5 skeleton-pulse w-3/4" />
                    <div className="h-2.5 skeleton-pulse w-1/2" />
                  </div>
                </li>
              ))}
            </>
          )}

          {/* No results */}
          {!isLoading && query.length > 0 && uniqueItems.length === 0 && !showRecent && (
            <li className="px-4 py-8 text-center">
              <Search size={24} className="text-gray-300 mx-auto mb-2" />
              <div className="text-sm text-gray-500 font-medium">No places found</div>
              <div className="text-xs text-gray-400 mt-1">Try a different search term</div>
            </li>
          )}
        </ul>
      )}

      {/* Popular chips shown below the input (only when focused and empty, outside dropdown) */}
      {!compact && variant === "default" && !isOpen && !showRecent && !query && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {trendingPlaces.slice(0, 6).map((place, i) => (
            <button
              key={place}
              type="button"
              onClick={() => handleChipClick(place)}
              className="place-chip chip-enter text-xs"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              📍 {place}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
