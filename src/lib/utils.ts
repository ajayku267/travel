import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(dateString));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function calculateFare(
  distanceKm: number,
  vehicleType: string,
  tripType: "one-way" | "round-trip"
): number {
  const priceMap: Record<string, number> = {
    "small-cars": 12,
    "tata-sumo": 15,
    "chevrolet-tavera": 18,
  };

  const baseMap: Record<string, number> = {
    "small-cars": 300,
    "tata-sumo": 400,
    "chevrolet-tavera": 500,
  };

  const ratePerKm = priceMap[vehicleType] || 14;
  const baseFare = baseMap[vehicleType] || 350;
  const fare = baseFare + distanceKm * ratePerKm;

  return tripType === "round-trip" ? Math.round(fare * 1.8) : Math.round(fare);
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}


