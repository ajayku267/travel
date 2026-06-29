import twilio from "twilio";

// Initialize Twilio client only if the credentials exist
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const twilioWhatsapp = process.env.TWILIO_WHATSAPP_NUMBER;
const adminNumber = process.env.TWILIO_ADMIN_NUMBER;

// We use a dummy client if keys are missing so the app doesn't crash on Vercel
const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

// Helper to format phone numbers correctly
const formatNumber = (phone: string, useWhatsapp: boolean) => {
  let formatted = phone.trim();
  if (!formatted.startsWith("+")) {
    formatted = `+91${formatted.replace(/^0+/, "")}`;
  }
  return useWhatsapp ? `whatsapp:${formatted}` : formatted;
};

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
    const from = twilioWhatsapp || twilioNumber;
    const to = formatNumber(adminNumber, !!twilioWhatsapp);
    
    await client.messages.create({
      body: message,
      from: twilioWhatsapp ? `whatsapp:${twilioWhatsapp}` : from,
      to,
    });
    return true;
  } catch (error) {
    console.error("Twilio Admin Notification Error:", error);
    return false;
  }
}

export async function sendDriverAssignment(data: {
  driverPhone: string;
  driverName: string;
  pickup: string;
  drop: string;
  date: string;
  totalFare: number;
  customerPhone: string;
  customerName: string;
}) {
  if (!client) {
    console.warn("Twilio client not initialized, skipping driver assignment message.");
    return;
  }

  const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
  if (!twilioNumber) return;

  const toNumbers = [data.driverPhone];
  // If the admin wants WhatsApp for drivers as well, we could duplicate to whatsapp: but SMS is standard for drivers.
  
  const messageBody = `🚗 New Ride Assigned to you, ${data.driverName}!
From: ${data.pickup}
To: ${data.drop}
Date: ${data.date}

Customer: ${data.customerName}
Phone: ${data.customerPhone}
Total Fare: ₹${data.totalFare}

Please login to your driver portal to mark this ride as Started when you pick up the customer.`;

  for (const to of toNumbers) {
    try {
      const from = twilioWhatsapp || twilioNumber;
      const formattedTo = formatNumber(to, !!twilioWhatsapp);
      
      await client.messages.create({
        body: messageBody,
        from: twilioWhatsapp ? `whatsapp:${twilioWhatsapp}` : from,
        to: formattedTo,
      });
      console.log(`Driver assignment sent to ${formattedTo}`);
    } catch (error) {
      console.error(`Failed to send driver assignment to ${to}:`, error);
    }
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
- Go Nainital`;

  try {
    const from = twilioWhatsapp || twilioNumber;
    const formattedPhone = formatNumber(booking.phone, !!twilioWhatsapp);

    await client.messages.create({
      body: message,
      from: twilioWhatsapp ? `whatsapp:${twilioWhatsapp}` : from,
      to: formattedPhone,
    });
    return true;
  } catch (error) {
    console.error("Twilio Customer Notification Error:", error);
    return false;
  }
}
