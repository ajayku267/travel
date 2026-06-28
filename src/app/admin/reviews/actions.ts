"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { reviewSchema, formatZodErrors } from "@/lib/validations";

export async function createReview(formData: FormData) {
  try {
    const raw = {
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      rating: parseInt(formData.get("rating") as string, 10),
      review: formData.get("review") as string,
      date: formData.get("date") as string,
      route: (formData.get("route") as string) || "",
    };

    const result = reviewSchema.safeParse(raw);
    if (!result.success) {
      return { success: false, error: formatZodErrors(result.error) };
    }

    const data = result.data;

    await db.review.create({
      data: {
        name: data.name,
        location: data.location,
        rating: data.rating,
        review: data.review,
        date: data.date,
        route: data.route || null,
        verified: true,
        featured: false,
      },
    });

    revalidatePath("/admin/reviews");
    revalidatePath("/reviews");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create review:", error);
    return { success: false, error: error.message || "Failed to create review" };
  }
}

export async function updateReview(id: string, formData: FormData) {
  try {
    const raw = {
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      rating: parseInt(formData.get("rating") as string, 10),
      review: formData.get("review") as string,
      date: formData.get("date") as string,
      route: (formData.get("route") as string) || "",
    };

    const result = reviewSchema.safeParse(raw);
    if (!result.success) {
      return { success: false, error: formatZodErrors(result.error) };
    }

    const data = result.data;

    await db.review.update({
      where: { id },
      data: {
        name: data.name,
        location: data.location,
        rating: data.rating,
        review: data.review,
        date: data.date,
        route: data.route || null,
      },
    });

    revalidatePath("/admin/reviews");
    revalidatePath("/reviews");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update review:", error);
    return { success: false, error: error.message || "Failed to update review" };
  }
}

export async function deleteReview(id: string) {
  try {
    await db.review.delete({ where: { id } });
    revalidatePath("/admin/reviews");
    revalidatePath("/reviews");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete review:", error);
    return { success: false, error: error.message || "Failed to delete review" };
  }
}

export async function toggleReviewFeatured(id: string) {
  try {
    const review = await db.review.findUnique({ where: { id } });
    if (!review) {
      return { success: false, error: "Review not found" };
    }

    await db.review.update({
      where: { id },
      data: { featured: !review.featured },
    });

    revalidatePath("/admin/reviews");
    revalidatePath("/reviews");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to toggle featured:", error);
    return { success: false, error: error.message || "Failed to toggle featured status" };
  }
}

export async function toggleReviewVerified(id: string) {
  try {
    const review = await db.review.findUnique({ where: { id } });
    if (!review) {
      return { success: false, error: "Review not found" };
    }

    await db.review.update({
      where: { id },
      data: { verified: !review.verified },
    });

    revalidatePath("/admin/reviews");
    revalidatePath("/reviews");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to toggle verified:", error);
    return { success: false, error: error.message || "Failed to toggle verified status" };
  }
}
