import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ReceiptEmailProps {
  bookingId: string;
  name: string;
  pickup: string;
  drop: string;
  date: string;
  vehicle: string;
  amountPaid: number;
  paymentId: string;
}

export const ReceiptEmail = ({
  bookingId,
  name,
  pickup,
  drop,
  date,
  vehicle,
  amountPaid,
  paymentId,
}: ReceiptEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your booking receipt for {bookingId}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Booking Confirmed! 🚖</Heading>
          <Text style={text}>Hi {name},</Text>
          <Text style={text}>
            Thank you for booking with Haryana Taxi Service. We have received your advance payment and your ride is confirmed.
          </Text>

          <Section style={detailsContainer}>
            <Text style={detailsTitle}>Booking Details</Text>
            <Hr style={hr} />
            <Text style={detailItem}><strong>Booking ID:</strong> {bookingId}</Text>
            <Text style={detailItem}><strong>Date:</strong> {date}</Text>
            <Text style={detailItem}><strong>Pickup:</strong> {pickup}</Text>
            <Text style={detailItem}><strong>Drop:</strong> {drop}</Text>
            <Text style={detailItem}><strong>Vehicle:</strong> {vehicle}</Text>
          </Section>

          <Section style={detailsContainer}>
            <Text style={detailsTitle}>Payment Receipt</Text>
            <Hr style={hr} />
            <Text style={detailItem}><strong>Advance Paid:</strong> ₹{amountPaid}</Text>
            <Text style={detailItem}><strong>Transaction ID:</strong> {paymentId}</Text>
            <Text style={detailItem}><small>The remaining balance will be paid directly to the driver.</small></Text>
          </Section>

          <Text style={footer}>
            If you need to make changes to your booking, please reply to this email or call us.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  borderRadius: "5px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
};

const h1 = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  padding: "0 20px",
};

const text = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "24px",
  padding: "0 20px",
};

const detailsContainer = {
  padding: "20px",
  backgroundColor: "#f9fafb",
  margin: "20px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
};

const detailsTitle = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#111827",
  margin: "0 0 10px 0",
};

const detailItem = {
  color: "#374151",
  fontSize: "14px",
  margin: "5px 0",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "10px 0",
};

const footer = {
  color: "#9ca3af",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "30px",
  padding: "0 20px",
};

export default ReceiptEmail;
