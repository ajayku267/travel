import Link from "next/link";
import { getSettings } from "@/lib/settings";

export async function generateMetadata() {
  const settings = getSettings();
  return {
    title: `Privacy Policy - ${settings.companyName}`,
    description: `Privacy policy and data handling for ${settings.companyName}.`,
  };
}

export default function PrivacyPolicyPage() {
  const settings = getSettings();
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-5">
        <h1 className="text-4xl font-black text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6 text-gray-600">
          <p>
            At {settings.companyName}, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          <p>
            When you book a taxi with us, we collect necessary information such as:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Your Name</li>
            <li>Phone Number</li>
            <li>Email Address (if provided)</li>
            <li>Pickup and Drop Locations</li>
            <li>Date and Time of travel</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We use your personal data strictly to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide and manage your taxi booking.</li>
            <li>Send you booking confirmations and driver details via SMS, WhatsApp, or Email.</li>
            <li>Process payments securely (via Razorpay).</li>
            <li>Improve our customer service.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Data Security and Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We only share necessary trip details (like your name and phone number) with the assigned driver to facilitate the pickup. Payment processing is handled securely by our payment gateway (Razorpay), and we do not store your credit card or bank details on our servers.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Location Tracking</h2>
          <p>
            For safety and transparency, we track the live GPS location of our drivers during active rides. This data is shared with you so you can track your cab, but we do not track your personal device location.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Contact Us</h2>
          <p>
            If you have any questions regarding our privacy practices, please contact us at:
            <br />
            <strong>Phone:</strong> <a href={`tel:${settings.phone}`} className="text-yellow-600 hover:underline">{settings.phone}</a>
            <br />
            <strong>Email:</strong> <a href={`mailto:${settings.email}`} className="text-yellow-600 hover:underline">{settings.email}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
