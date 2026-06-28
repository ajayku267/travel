"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { routeSchema, formatZodErrors } from "@/lib/validations";
import { slugify } from "@/lib/utils";

export async function createRoute(formData: FormData) {
  try {
    const raw = {
      from: formData.get("from") as string,
      to: formData.get("to") as string,
      fromState: formData.get("fromState") as string,
      toState: formData.get("toState") as string,
      distance: formData.get("distance") as string,
      travelTime: formData.get("travelTime") as string,
      fareEstimate: formData.get("fareEstimate") as string,
      description: formData.get("description") as string,
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
      faqs: (() => {
        try {
          const val = formData.get("faqs") as string;
          return val ? JSON.parse(val) : [];
        } catch {
          return [];
        }
      })(),
    };

    const result = routeSchema.safeParse(raw);
    if (!result.success) {
      return { success: false, error: formatZodErrors(result.error) };
    }

    const data = result.data;
    const slug = slugify(`${data.from}-to-${data.to}`);

    // Check for duplicate slug
    const existing = await db.route.findUnique({ where: { slug } });
    if (existing) {
      return { success: false, error: `A route with slug "${slug}" already exists` };
    }

    await db.route.create({
      data: {
        slug,
        from: data.from,
        to: data.to,
        fromState: data.fromState,
        toState: data.toState,
        distance: data.distance,
        travelTime: data.travelTime,
        fareEstimate: data.fareEstimate,
        description: data.description,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords,
        highlights: JSON.stringify(data.highlights),
        faqs: JSON.stringify(data.faqs),
      },
    });

    revalidatePath("/admin/routes");
    revalidatePath("/routes");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create route:", error);
    return { success: false, error: error.message || "Failed to create route" };
  }
}

export async function updateRoute(id: string, formData: FormData) {
  try {
    const raw = {
      from: formData.get("from") as string,
      to: formData.get("to") as string,
      fromState: formData.get("fromState") as string,
      toState: formData.get("toState") as string,
      distance: formData.get("distance") as string,
      travelTime: formData.get("travelTime") as string,
      fareEstimate: formData.get("fareEstimate") as string,
      description: formData.get("description") as string,
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
      faqs: (() => {
        try {
          const val = formData.get("faqs") as string;
          return val ? JSON.parse(val) : [];
        } catch {
          return [];
        }
      })(),
    };

    const result = routeSchema.safeParse(raw);
    if (!result.success) {
      return { success: false, error: formatZodErrors(result.error) };
    }

    const data = result.data;
    const slug = slugify(`${data.from}-to-${data.to}`);

    // Check for duplicate slug (excluding current record)
    const existing = await db.route.findUnique({ where: { slug } });
    if (existing && existing.id !== id) {
      return { success: false, error: `A route with slug "${slug}" already exists` };
    }

    await db.route.update({
      where: { id },
      data: {
        slug,
        from: data.from,
        to: data.to,
        fromState: data.fromState,
        toState: data.toState,
        distance: data.distance,
        travelTime: data.travelTime,
        fareEstimate: data.fareEstimate,
        description: data.description,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        keywords: data.keywords,
        highlights: JSON.stringify(data.highlights),
        faqs: JSON.stringify(data.faqs),
      },
    });

    revalidatePath("/admin/routes");
    revalidatePath("/routes");
    revalidatePath(`/routes/${slug}`);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update route:", error);
    return { success: false, error: error.message || "Failed to update route" };
  }
}

export async function deleteRoute(id: string) {
  try {
    const route = await db.route.findUnique({ where: { id } });
    await db.route.delete({ where: { id } });

    revalidatePath("/admin/routes");
    revalidatePath("/routes");
    if (route) {
      revalidatePath(`/routes/${route.slug}`);
    }
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete route:", error);
    return { success: false, error: error.message || "Failed to delete route" };
  }
}
