import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { auth } from "@/auth";
import { contactSchema, formatZodErrors } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 3 contact submissions per minute per IP
    const ip = getClientIp(request);
    const limiter = await rateLimit(`contact:${ip}`, {
      windowSeconds: 60 * 60,
      maxRequests: 3,
    });

    if (!limiter.success) {
      return NextResponse.json(
        { success: false, message: "Too many submissions. Please wait and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate input
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: formatZodErrors(result.error) },
        { status: 400 }
      );
    }

    const data = result.data;

    const inquiry = await db.contactInquiry.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        subject: data.subject,
        message: data.message,
      },
    });

    // Send email notification (non-blocking)
    if (process.env.ADMIN_EMAIL) {
      sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Inquiry - ${inquiry.inquiryId}`,
        html: `
          <h2>New Inquiry Details</h2>
          <p><strong>Inquiry ID:</strong> ${inquiry.inquiryId}</p>
          <p><strong>Name:</strong> ${inquiry.name}</p>
          <p><strong>Phone:</strong> ${inquiry.phone}</p>
          <p><strong>Email:</strong> ${inquiry.email || 'N/A'}</p>
          <p><strong>Subject:</strong> ${inquiry.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${inquiry.message}</p>
        `,
      }).catch((err) => console.error("Email send failed:", err));
    }

    return NextResponse.json(
      { success: true, message: "Message received! We will get back to you within 24 hours.", id: inquiry.inquiryId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Inquiry error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please call us directly." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const inquiries = await db.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("Fetch inquiries error:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}
