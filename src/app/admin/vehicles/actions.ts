"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { vehicleSchema, formatZodErrors } from "@/lib/validations";
import { slugify } from "@/lib/utils";

export async function createVehicle(formData: FormData) {
  try {
    const raw = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      seatingCapacity: parseInt(formData.get("seatingCapacity") as string, 10),
      luggageCapacity: parseInt(formData.get("luggageCapacity") as string, 10),
      hasAC: formData.get("hasAC") === "true",
      baseFare: parseFloat(formData.get("baseFare") as string),
      pricePerKm: parseFloat(formData.get("pricePerKm") as string),
      popular: formData.get("popular") === "true",
      image: formData.get("image") as string,
      description: formData.get("description") as string,
      features: (() => {
        try {
          const val = formData.get("features") as string;
          return val ? JSON.parse(val) : [];
        } catch {
          return [];
        }
      })(),
    };

    const result = vehicleSchema.safeParse(raw);
    if (!result.success) {
      return { success: false, error: formatZodErrors(result.error) };
    }

    const data = result.data;
    const slug = slugify(data.name);

    // Check for duplicate slug
    const existing = await db.vehicle.findUnique({ where: { slug } });
    if (existing) {
      return { success: false, error: `A vehicle with slug "${slug}" already exists` };
    }

    await db.vehicle.create({
      data: {
        slug,
        name: data.name,
        category: data.category,
        seatingCapacity: data.seatingCapacity,
        luggageCapacity: data.luggageCapacity,
        hasAC: data.hasAC,
        baseFare: data.baseFare,
        pricePerKm: data.pricePerKm,
        popular: data.popular,
        image: data.image,
        description: data.description,
        features: JSON.stringify(data.features),
      },
    });

    revalidatePath("/admin/vehicles");
    revalidatePath("/fleet");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create vehicle:", error);
    return { success: false, error: error.message || "Failed to create vehicle" };
  }
}

export async function updateVehicle(id: string, formData: FormData) {
  try {
    const raw = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      seatingCapacity: parseInt(formData.get("seatingCapacity") as string, 10),
      luggageCapacity: parseInt(formData.get("luggageCapacity") as string, 10),
      hasAC: formData.get("hasAC") === "true",
      baseFare: parseFloat(formData.get("baseFare") as string),
      pricePerKm: parseFloat(formData.get("pricePerKm") as string),
      popular: formData.get("popular") === "true",
      image: formData.get("image") as string,
      description: formData.get("description") as string,
      features: (() => {
        try {
          const val = formData.get("features") as string;
          return val ? JSON.parse(val) : [];
        } catch {
          return [];
        }
      })(),
    };

    const result = vehicleSchema.safeParse(raw);
    if (!result.success) {
      return { success: false, error: formatZodErrors(result.error) };
    }

    const data = result.data;
    const slug = slugify(data.name);

    // Check for duplicate slug (excluding current record)
    const existing = await db.vehicle.findUnique({ where: { slug } });
    if (existing && existing.id !== id) {
      return { success: false, error: `A vehicle with slug "${slug}" already exists` };
    }

    await db.vehicle.update({
      where: { id },
      data: {
        slug,
        name: data.name,
        category: data.category,
        seatingCapacity: data.seatingCapacity,
        luggageCapacity: data.luggageCapacity,
        hasAC: data.hasAC,
        baseFare: data.baseFare,
        pricePerKm: data.pricePerKm,
        popular: data.popular,
        image: data.image,
        description: data.description,
        features: JSON.stringify(data.features),
      },
    });

    revalidatePath("/admin/vehicles");
    revalidatePath("/fleet");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update vehicle:", error);
    return { success: false, error: error.message || "Failed to update vehicle" };
  }
}

export async function deleteVehicle(id: string) {
  try {
    await db.vehicle.delete({ where: { id } });
    revalidatePath("/admin/vehicles");
    revalidatePath("/fleet");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete vehicle:", error);
    return { success: false, error: error.message || "Failed to delete vehicle" };
  }
}

export async function toggleVehiclePopular(id: string) {
  try {
    const vehicle = await db.vehicle.findUnique({ where: { id } });
    if (!vehicle) {
      return { success: false, error: "Vehicle not found" };
    }

    await db.vehicle.update({
      where: { id },
      data: { popular: !vehicle.popular },
    });

    revalidatePath("/admin/vehicles");
    revalidatePath("/fleet");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to toggle popular:", error);
    return { success: false, error: error.message || "Failed to toggle popular status" };
  }
}
