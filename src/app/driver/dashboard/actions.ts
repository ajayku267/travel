"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function markRideStatus(bookingId: string, status: "completed") {
  await db.booking.update({
    where: { bookingId },
    data: { status },
  });
  revalidatePath("/driver/dashboard");
  return { success: true };
}
