"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function markInquiryResponded(id: string, responded: boolean) {
  try {
    await db.contactInquiry.update({
      where: { id },
      data: { responded },
    });
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    console.error("Failed to update inquiry", error);
    return { success: false, error: "Failed to update inquiry" };
  }
}

export async function deleteInquiry(id: string) {
  try {
    await db.contactInquiry.delete({ where: { id } });
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete inquiry", error);
    return { success: false, error: "Failed to delete inquiry" };
  }
}
