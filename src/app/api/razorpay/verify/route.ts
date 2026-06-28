import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      bookingId 
    } = await request.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;

    // Handle test/mock mode if no keys are provided
    if (!secret) {
      if (razorpay_payment_id === "test_success") {
        if (bookingId) {
          await db.booking.update({
            where: { bookingId },
            data: { 
              paymentStatus: "success", 
              paymentId: "test_success", 
              orderId: razorpay_order_id 
            }
          });
        }
        return NextResponse.json({ success: true, verified: true });
      }
      return NextResponse.json(
        { success: false, message: "Server misconfigured - Missing Razorpay Secret" },
        { status: 500 }
      );
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
       // Payment is legitimate, update the database
       if (bookingId) {
         await db.booking.update({
           where: { bookingId },
           data: {
             paymentStatus: "success",
             paymentId: razorpay_payment_id,
             orderId: razorpay_order_id,
           }
         });
       }
       return NextResponse.json({ success: true, verified: true });
    } else {
       return NextResponse.json(
         { success: false, message: "Invalid signature" },
         { status: 400 }
       );
    }
  } catch (error) {
    console.error("Razorpay verification error:", error);
    return NextResponse.json(
      { success: false, message: "Verification failed" },
      { status: 500 }
    );
  }
}
