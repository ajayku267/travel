"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sendDriverAssignment } from "@/lib/twilio";
import { bookingSchema, formatZodErrors } from "@/lib/validations";

export async function updateBookingStatus(id: string, status: string) {
  try {
    await db.booking.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/bookings");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to update status", error);
    return { success: false, error: "Failed to update booking status" };
  }
}

export async function deleteBooking(id: string) {
  try {
    await db.booking.delete({ where: { id } });
    revalidatePath("/admin/bookings");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete booking", error);
    return { success: false, error: "Failed to delete booking" };
  }
}

export async function createBooking(formData: FormData) {
  try {
    const raw = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      pickup: formData.get("pickup") as string,
      drop: formData.get("drop") as string,
      vehicle: formData.get("vehicle") as string,
      date: formData.get("date") as string,
      tripType: formData.get("tripType") as string,
    };

    const result = bookingSchema.safeParse(raw);
    if (!result.success) {
      return { success: false, error: formatZodErrors(result.error) };
    }

    const data = result.data;

    await db.booking.create({
      data: {
        name: data.name,
        phone: data.phone,
        pickup: data.pickupLocation,
        drop: data.dropLocation,
        vehicle: data.vehicleType,
        date: data.journeyDate,
        tripType: data.tripType,
        status: "confirmed",
      },
    });

    revalidatePath("/admin/bookings");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create booking:", error);
    return { success: false, error: error.message || "Failed to create booking" };
  }
}

export async function assignDriverToBooking(bookingId: string, driverId: string, totalFare: number) {
  const booking = await db.booking.update({
    where: { bookingId },
    data: {
      driverId,
      totalFare,
      status: "confirmed"
    },
    include: { driver: true }
  });

  if (booking.driver) {
    // Notify the driver asynchronously
    sendDriverAssignment({
      driverPhone: booking.driver.phone,
      driverName: booking.driver.name,
      pickup: booking.pickup,
      drop: booking.drop,
      date: booking.date,
      totalFare,
      customerPhone: booking.phone,
      customerName: booking.name
    }).catch(console.error);
  }

  revalidatePath("/admin/bookings");
  return { success: true };
}
