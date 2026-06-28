import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      // Return a simulated success for development/testing if keys are missing
      return NextResponse.json({
        success: true,
        order: { id: "order_test_" + Date.now(), amount: 50000, currency: "INR" },
        isTest: true
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount, receipt } = await request.json();

    // Razorpay requires amount in paise (multiply by 100)
    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
