import twilio from "twilio";

// Initialize Twilio client only if the credentials exist
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const adminNumber = process.env.TWILIO_ADMIN_NUMBER;

// We use a dummy client if keys are missing so the app doesn't crash on Vercel
const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

export interface BookingDetails {
  bookingId: string;
  name: string;
  phone: string;
  pickup: string;
  drop: string;
  date: string;
  vehicle: string;
  tripType: string;
}

/**
 * Sends a WhatsApp or SMS notification to the Admin
 */
export async function sendAdminNotification(booking: BookingDetails) {
  if (!client || !twilioNumber || !adminNumber) {
    console.warn("Twilio credentials missing. Skipping admin notification.");
    return false;
  }

  const message = `🚨 *New Taxi Booking* 🚨
ID: ${booking.bookingId}
Name: ${booking.name}
Phone: ${booking.phone}
Route: ${booking.pickup} ➔ ${booking.drop}
Date: ${booking.date}
Vehicle: ${booking.vehicle} (${booking.tripType})`;

  try {
    await client.messages.create({
      body: message,
      from: twilioNumber,
      to: adminNumber,
    });
    return true;
  } catch (error) {
    console.error("Twilio Admin Notification Error:", error);
    return false;
  }
}

/**
 * Sends a WhatsApp or SMS confirmation to the Customer
 */
export async function sendCustomerConfirmation(booking: BookingDetails) {
  if (!client || !twilioNumber) {
    console.warn("Twilio credentials missing. Skipping customer confirmation.");
    return false;
  }

  const message = `Hi ${booking.name}, your booking request (${booking.bookingId}) is received! 
Route: ${booking.pickup} ➔ ${booking.drop}
We will call you shortly to confirm.
- Haryana Taxi Service`;

  try {
    // Basic phone number formatting: Make sure it has +91 for India if not present
    let formattedPhone = booking.phone.trim();
    if (!formattedPhone.startsWith("+")) {
      // Assuming India as default if no country code is provided
      formattedPhone = `+91${formattedPhone.replace(/^0+/, "")}`;
    }

    await client.messages.create({
      body: message,
      from: twilioNumber,
      to: formattedPhone,
    });
    return true;
  } catch (error) {
    console.error("Twilio Customer Notification Error:", error);
    return false;
  }
}
