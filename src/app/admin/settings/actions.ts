"use server";

import { saveSettings, SiteSettings } from "@/lib/settings";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

export async function updateSettings(formData: FormData): Promise<void> {
  try {
    const newSettings: SiteSettings = {
      companyName: formData.get("companyName") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      whatsapp: formData.get("whatsapp") as string,
      heroTitle: formData.get("heroTitle") as string,
      heroSubtitle: formData.get("heroSubtitle") as string,
      address: formData.get("address") as string,
    };

    saveSettings(newSettings);

    // Everything is now dynamically sourced from SettingsProvider and getSettings().

    revalidatePath("/");
  } catch (error) {
    console.error("Failed to save settings:", error);
  }
}
