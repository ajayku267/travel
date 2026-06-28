import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { COMPANY_NAME, PHONE_NUMBER, EMAIL, ADDRESS } from "@/lib/utils";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: `Contact Us | ${COMPANY_NAME}`,
  description:
    "Contact Haryana Taxi Service. Call +91 98765 43210, WhatsApp, or send an email. 24/7 customer support for taxi bookings in Haryana and Delhi NCR.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="badge bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 mb-4">
            Contact Us
          </span>
          <h1 className="text-4xl font-black text-white mb-4">Get in Touch</h1>
          <p className="text-gray-300 text-lg">
            24/7 support — call, WhatsApp, or email us anytime
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-6">Contact Information</h2>

              <div className="space-y-5 mb-8">
                {[
                  {
                    icon: Phone,
                    title: "Phone / WhatsApp",
                    value: PHONE_NUMBER,
                    href: `tel:${PHONE_NUMBER}`,
                    color: "bg-yellow-400",
                    textColor: "text-gray-900",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    value: EMAIL,
                    href: `mailto:${EMAIL}`,
                    color: "bg-blue-500",
                    textColor: "text-white",
                  },
                  {
                    icon: MapPin,
                    title: "Office Address",
                    value: ADDRESS,
                    href: "#map",
                    color: "bg-green-500",
                    textColor: "text-white",
                  },
                  {
                    icon: Clock,
                    title: "Working Hours",
                    value: "24 Hours, 7 Days a Week",
                    href: null as string | null,
                    color: "bg-purple-500",
                    textColor: "text-white",
                  },
                ].map(({ icon: Icon, title, value, href, color, textColor }) => (
                  <div key={title} className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon size={20} className={textColor} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 font-medium">{title}</div>
                      {href ? (
                        <a href={href} className="font-bold text-gray-900 hover:text-yellow-600 transition-colors">
                          {value}
                        </a>
                      ) : (
                        <div className="font-bold text-gray-900">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center justify-center gap-2 py-3 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-500 transition-colors"
                >
                  <Phone size={16} /> Call Now
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors"
                >
                  💬 WhatsApp
                </a>
              </div>

              {/* Map */}
              <div id="map" className="mt-8 rounded-2xl overflow-hidden shadow-lg h-64 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28055.59843958975!2d76.2714!3d28.5921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b8f5a5a5a5a5a%3A0x5a5a5a5a5a5a5a5a!2sCharkhi%20Dadri%2C%20Haryana!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Haryana Taxi Service Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-6">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
