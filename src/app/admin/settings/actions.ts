"use server";

import { saveSettings, SiteSettings } from "@/lib/settings";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

export async function updateSettings(formData: FormData) {
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

    // Update utils.ts to ensure client components get static updates
    const utilsPath = path.join(process.cwd(), "src/lib/utils.ts");
    let utilsContent = fs.readFileSync(utilsPath, "utf8");
    
    utilsContent = utilsContent.replace(/export const PHONE_NUMBER = ".*";/, `export const PHONE_NUMBER = "${newSettings.phone}";`);
    utilsContent = utilsContent.replace(/export const WHATSAPP_NUMBER = ".*";/, `export const WHATSAPP_NUMBER = "${newSettings.whatsapp}";`);
    utilsContent = utilsContent.replace(/export const EMAIL = ".*";/, `export const EMAIL = "${newSettings.email}";`);
    utilsContent = utilsContent.replace(/export const COMPANY_NAME = ".*";/, `export const COMPANY_NAME = "${newSettings.companyName}";`);
    utilsContent = utilsContent.replace(/export const TAGLINE = ".*";/, `export const TAGLINE = "${newSettings.heroTitle}";`);

    fs.writeFileSync(utilsPath, utilsContent, "utf8");

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save settings" };
  }
}
