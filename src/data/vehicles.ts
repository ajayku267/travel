import type { Vehicle } from "@/types";

export const vehicles: Vehicle[] = [
  {
    id: "1",
    name: "Small Cars",
    slug: "small-cars",
    category: "Hatchback/Sedan",
    seatingCapacity: 4,
    hasAC: true,
    luggageCapacity: "2-3 bags",
    pricePerKm: 12,
    baseFare: 300,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&q=80",
    features: ["AC", "Music System", "Comfortable Seating", "Clean Interior"],
    description: "Perfect for city rides and short trips. Comfortable small cars (like Swift Dzire/Alto) with ample space for small families.",
    popular: true,
  },
  {
    id: "2",
    name: "Tata Sumo",
    slug: "tata-sumo",
    category: "SUV",
    seatingCapacity: 7,
    hasAC: false,
    luggageCapacity: "4 bags",
    pricePerKm: 15,
    baseFare: 400,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    features: ["Spacious", "Music System", "7 Seats", "Hill Driving", "Roof Carrier"],
    description: "Ideal for hill stations and large families. Rugged and spacious SUV for rough terrains and long journeys.",
    popular: true,
  },
  {
    id: "3",
    name: "Chevrolet Tavera",
    slug: "chevrolet-tavera",
    category: "SUV",
    seatingCapacity: 9,
    hasAC: true,
    luggageCapacity: "4-5 bags",
    pricePerKm: 18,
    baseFare: 500,
    image: "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=600&q=80",
    features: ["AC", "Music System", "9 Seats", "Spacious", "Comfortable Ride", "Roof Carrier"],
    description: "Best for group tours and large families. Very spacious and comfortable for long journeys and sightseeing.",
    popular: true,
  },
];

export const vehicleTypes = vehicles.map((v) => ({
  value: v.slug,
  label: `${v.name} (${v.seatingCapacity} seats)`,
}));
