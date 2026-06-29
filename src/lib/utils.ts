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
    month: "long",
    year: "numeric",
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
  const rateMap: Record<string, number> = {
    "swift-dzire": 12,
    "maruti-ertiga": 14,
    "toyota-innova": 18,
    "innova-crysta": 20,
    "tempo-traveller": 25,
  };

  const baseFareMap: Record<string, number> = {
    "swift-dzire": 300,
    "maruti-ertiga": 350,
    "toyota-innova": 450,
    "innova-crysta": 500,
    "tempo-traveller": 800,
  };

  const ratePerKm = rateMap[vehicleType] || 14;
  const baseFare = baseFareMap[vehicleType] || 350;
  const fare = baseFare + distanceKm * ratePerKm;

  return tripType === "round-trip" ? Math.round(fare * 1.8) : Math.round(fare);
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export const PHONE_NUMBER = "+91 98765 43210";
export const WHATSAPP_NUMBER = "919876543210";
export const EMAIL = "info@nainitaltaxi.com";
export const ADDRESS = "Near Hotel basera, Mallital, Nainital";
export const ADDRESS2 = "Near shishu bharti school, bareilly road, haldwani";
export const COMPANY_NAME = "Go Nainital";
export const TAGLINE = "Your Trusted Travel Partner in Nainital & NCR";
