"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { locationSchema, formatZodErrors } from "@/lib/validations";
import { slugify } from "@/lib/utils";

export async function createLocation(formData: FormData) {
  try {
    const raw = {
      name: formData.get("name") as string,
      state: formData.get("state") as string,
      description: formData.get("description") as string,
      about: formData.get("about") as string,
      metaTitle: formData.get("metaTitle") as string,
      metaDescription: formData.get("metaDescription") as string,
      keywords: (formData.get("keywords") as string) || "",
      highlights: (() => {
        try {
          const val = formData.get("highlights") as string;
          return val ? JSON.parse(val) : [];
        } catch {
          return [];
        }
      })(),
      services: (() => {
        try {
          const val = formData.get("services") as string;
          return val ? JSON.parse(val) : [];
        } catch {
          return [];
        }
      })(),
      popularRoutes: (() => {
        try {
          const val = formData.get("popularRoutes") as string;
          return val ? JSON.parse(val) : [];
        } catch {
          return [];
        }
      })(),
      faqs: (() => {
        try {
          const val = formData.get("faqs") as string;
          return val ? JSON.parse(val) : [];
        } catch {
          return [];
        }
      })(),
    };

    const result = locationSchema.safeParse(raw);
    if (!result.success) {
      return { success: false, error: formatZodErrors(result.error) };
    }

    const data = result.data;
    const slug = slugify(data.name);

    // Check for duplicate slug
    const existing = await db.location.findUnique({ where: { slug } });
    if (existing) {
      return { success: false, error: `A location with slug "${slug}" already exists` };
    }

    await db.location.create({
      data: {
        slug,
        name: data.name,
        state: data.state,
        description: data.description,
        about: data.about,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords,
        highlights: JSON.stringify(data.highlights),
        services: JSON.stringify(data.services),
        popularRoutes: JSON.stringify(data.popularRoutes),
        faqs: JSON.stringify(data.faqs),
      },
    });

    revalidatePath("/admin/locations");
    revalidatePath("/locations");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create location:", error);
    return { success: false, error: error.message || "Failed to create location" };
  }
}

export async function updateLocation(id: string, formData: FormData) {
  try {
    const raw = {
      name: formData.get("name") as string,
      state: formData.get("state") as string,
      description: formData.get("description") as string,
      about: formData.get("about") as string,
      metaTitle: formData.get("metaTitle") as string,
      metaDescription: formData.get("metaDescription") as string,
      keywords: (formData.get("keywords") as string) || "",
      highlights: (() => {
        try {
          const val = formData.get("highlights") as string;
          return val ? JSON.parse(val) : [];
        } catch {
          return [];
        }
      })(),
      services: (() => {
        try {
          const val = formData.get("services") as string;
          return val ? JSON.parse(val) : [];
        } catch {
          return [];
        }
      })(),
      popularRoutes: (() => {
        try {
          const val = formData.get("popularRoutes") as string;
          return val ? JSON.parse(val) : [];
        } catch {
          return [];
        }
      })(),
      faqs: (() => {
        try {
          const val = formData.get("faqs") as string;
          return val ? JSON.parse(val) : [];
        } catch {
          return [];
        }
      })(),
    };

    const result = locationSchema.safeParse(raw);
    if (!result.success) {
      return { success: false, error: formatZodErrors(result.error) };
    }

    const data = result.data;
    const slug = slugify(data.name);

    // Check for duplicate slug (excluding current record)
    const existing = await db.location.findUnique({ where: { slug } });
    if (existing && existing.id !== id) {
      return { success: false, error: `A location with slug "${slug}" already exists` };
    }

    await db.location.update({
      where: { id },
      data: {
        slug,
        name: data.name,
        state: data.state,
        description: data.description,
        about: data.about,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords,
        highlights: JSON.stringify(data.highlights),
        services: JSON.stringify(data.services),
        popularRoutes: JSON.stringify(data.popularRoutes),
        faqs: JSON.stringify(data.faqs),
      },
    });

    revalidatePath("/admin/locations");
    revalidatePath("/locations");
    revalidatePath(`/locations/${slug}`);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update location:", error);
    return { success: false, error: error.message || "Failed to update location" };
  }
}

export async function deleteLocation(id: string) {
  try {
    const location = await db.location.findUnique({ where: { id } });
    await db.location.delete({ where: { id } });

    revalidatePath("/admin/locations");
    revalidatePath("/locations");
    if (location) {
      revalidatePath(`/locations/${location.slug}`);
    }
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete location:", error);
    return { success: false, error: error.message || "Failed to delete location" };
  }
}
