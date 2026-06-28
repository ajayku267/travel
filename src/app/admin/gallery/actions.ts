"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addGalleryImage(formData: FormData) {
  try {
    const url = formData.get("url") as string;
    const caption = formData.get("caption") as string;
    const category = formData.get("category") as string;

    if (!url || !caption || !category) {
      return { success: false, error: "Missing required fields" };
    }

    await db.galleryImage.create({
      data: { url, caption, category },
    });

    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to add gallery image:", error);
    return { success: false, error: error.message || "Failed to add image" };
  }
}

export async function deleteGalleryImage(id: string) {
  try {
    await db.galleryImage.delete({
      where: { id },
    });

    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete gallery image:", error);
    return { success: false, error: error.message || "Failed to delete image" };
  }
}
