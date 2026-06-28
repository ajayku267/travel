import Link from "next/link";
import { COMPANY_NAME, EMAIL, PHONE_NUMBER } from "@/lib/utils";

export const metadata = {
  title: `Terms of Service - ${COMPANY_NAME}`,
  description: `Terms and conditions for booking taxis with ${COMPANY_NAME}.`,
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-5">
        <h1 className="text-4xl font-black text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6 text-gray-600">
          <p>
            Welcome to {COMPANY_NAME}. By booking a taxi with us, you agree to the following terms and conditions.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Booking and Cancellation</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Bookings are subject to vehicle availability.</li>
            <li>You may cancel your booking up to 24 hours in advance for a full refund of any advance payments.</li>
            <li>Cancellations made within 24 hours of the pickup time may incur a cancellation fee.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Payments</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>An advance token amount (usually ₹500) may be required to confirm your booking.</li>
            <li>The remaining balance must be paid directly to the driver upon completion of the trip.</li>
            <li>Toll taxes and parking fees are extra unless explicitly stated in your booking quote.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Passenger Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Passengers are responsible for their own belongings. {COMPANY_NAME} is not liable for lost items.</li>
            <li>Any damage caused to the vehicle by the passenger will be charged to the passenger.</li>
            <li>Smoking and consumption of alcohol are strictly prohibited inside the vehicles.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Contact Us</h2>
          <p>
            If you have any questions regarding these terms, please contact us at:
            <br />
            <strong>Phone:</strong> <a href={`tel:${PHONE_NUMBER}`} className="text-yellow-600 hover:underline">{PHONE_NUMBER}</a>
            <br />
            <strong>Email:</strong> <a href={`mailto:${EMAIL}`} className="text-yellow-600 hover:underline">{EMAIL}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
