"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export async function addDriver(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const licenseNumber = formData.get("licenseNumber") as string;

  if (!name || !phone || !password) {
    throw new Error("Missing required fields");
  }

  // Check if driver with phone exists
  const existing = await db.driver.findUnique({ where: { phone } });
  if (existing) {
    throw new Error("Driver with this phone number already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.driver.create({
    data: {
      name,
      phone,
      password: hashedPassword,
      licenseNumber: licenseNumber || null,
      activeStatus: true,
    },
  });

  revalidatePath("/admin/drivers");
}

export async function deleteDriver(id: string) {
  await db.driver.delete({ where: { id } });
  revalidatePath("/admin/drivers");
  return { success: true };
}

export async function toggleDriverStatus(id: string, activeStatus: boolean) {
  await db.driver.update({
    where: { id },
    data: { activeStatus },
  });
  revalidatePath("/admin/drivers");
  return { success: true };
}
