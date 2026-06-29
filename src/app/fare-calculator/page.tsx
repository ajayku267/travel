import type { Metadata } from "next";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import FareCalculatorClient from "./FareCalculatorClient";

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return {
    title: `Fare Calculator | ${settings.companyName} — Taxi Fare Estimate`,
    description:
      "Calculate instant taxi fare for your journey across Nainital and Delhi NCR. Fixed and transparent pricing for one-way and round-trip journeys.",
  };
}

export default async function FareCalculatorPage() {
  const [vehicles, popularRoutes] = await Promise.all([
    db.vehicle.findMany({ orderBy: { baseFare: "asc" } }),
    db.route.findMany({ take: 5, orderBy: { fareEstimate: "asc" } }),
  ]);

  return <FareCalculatorClient vehicles={vehicles} popularRoutes={popularRoutes} />;
}
