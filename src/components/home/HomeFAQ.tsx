import FAQAccordion from "@/components/ui/FAQAccordion";
import type { FAQ } from "@/types";

const homeFaqs: FAQ[] = [
  {
    question: "How do I book a taxi with Go Nainital?",
    answer:
      "You can book a taxi through our online booking form on the website, by calling +91 83929 86174, or by sending a WhatsApp message. We respond within 5 minutes.",
  },
  {
    question: "Do you offer one-way taxi service?",
    answer:
      "Yes, we offer one-way taxi service on all routes. You only pay for the distance you travel — no return charges.",
  },
  {
    question: "What vehicles are available for outstation trips?",
    answer:
      "For outstation trips, we have Small Cars (4 seats), Tata Sumo (7 seats), and Chevrolet Tavera (9 seats).",
  },
  {
    question: "Is the fare fixed or metered?",
    answer:
      "We charge fixed fares with no hidden charges. The fare is quoted upfront and includes tolls and driver allowances unless specified otherwise.",
  },
  {
    question: "Do you provide airport taxi service from Nainital?",
    answer:
      "Yes, we provide dedicated airport taxi service from all cities in Nainital to Delhi IGI Airport, Chandigarh Airport, and other airports. We track your flight for delays.",
  },
  {
    question: "Can I hire a cab for the whole day in Nainital?",
    answer:
      "Yes, we offer 8-hour/80 km and 12-hour/120 km packages for local use. The driver stays with you throughout the day.",
  },
  {
    question: "Do you offer corporate taxi service?",
    answer:
      "Yes, we have special corporate packages with monthly billing, GST invoices, and dedicated account managers for businesses in Nainital and all india.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, UPI (Google Pay, PhonePe, Paytm), bank transfer, and credit/debit cards. Corporate clients can opt for monthly invoicing.",
  },
];

export default function HomeFAQ() {
  return (
    <section className="py-20 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="badge badge-yellow mb-3">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 section-title">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mt-5">
            Have questions about our taxi service? Find quick answers below.
          </p>
        </div>

        <FAQAccordion faqs={homeFaqs} />

        <div className="mt-10 text-center p-6 bg-yellow-50 border border-yellow-200 rounded-2xl">
          <p className="text-gray-700 font-semibold mb-3">
            Still have questions? We&apos;re here to help!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+918392986174"
              className="px-5 py-2.5 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-500 transition-colors"
            >
              📞 Call +91 83929 86174
            </a>
            <a
              href="https://wa.me/918392986174"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
