import fs from "fs";
import path from "path";

const SETTINGS_PATH = path.join(process.cwd(), "src/data/settings.json");

export interface SiteSettings {
  companyName: string;
  phone: string;
  email: string;
  whatsapp: string;
  heroTitle: string;
  heroSubtitle: string;
  address: string;
}

const defaultSettings: SiteSettings = {
  companyName: "Go Nainital",
  phone: "+91 98765 43210",
  email: "booking@gonainital.com",
  whatsapp: "919876543210",
  heroTitle: "Reliable Taxi Service in Nainital",
  heroSubtitle: "Book local and outstation cabs at the best prices. Clean cars, professional drivers, and 24/7 support.",
  address: "Near Hotel Basera, Mallital, Nainital | Add2: Near Shishu Bharti School, Bareilly Road, Haldwani"
};

export function getSettings(): SiteSettings {
  try {
    if (fs.existsSync(SETTINGS_PATH)) {
      const data = fs.readFileSync(SETTINGS_PATH, "utf8");
      return JSON.parse(data) as SiteSettings;
    }
  } catch (error) {
    console.error("Failed to read settings.json:", error);
  }
  return defaultSettings;
}

export function saveSettings(newSettings: SiteSettings): void {
  try {
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(newSettings, null, 2), "utf8");
  } catch (error) {
    console.error("Failed to write settings.json:", error);
    throw new Error("Failed to save settings");
  }
}
