import type { Metadata } from "next";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import FareCalculatorClient from "./FareCalculatorClient";

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return {
    title: `Fare Calculator | ${settings.companyName} — Taxi Fare Estimate`,
    description:
      "Calculate instant taxi fare for your journey across Nainital and all india. Fixed and transparent pricing for one-way and round-trip journeys.",
  };
}

export default async function FareCalculatorPage() {
  const [vehicles, popularRoutes] = await Promise.all([
    db.vehicle.findMany({ orderBy: { baseFare: "asc" } }),
    db.route.findMany({ take: 5, orderBy: { fareEstimate: "asc" } }),
  ]);

  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <FareCalculatorClient vehicles={vehicles} popularRoutes={popularRoutes} />
    </Suspense>
  );
}

