import Link from "next/link";
import { Phone, ArrowRight, MessageCircle, Mail } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="relative py-24 bg-gray-900 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-400/3 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(245,197,24,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,24,0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
        <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
          <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          Available 24/7
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
          Ready to Travel?
          <span className="text-yellow-400 block">Book Your Taxi Now!</span>
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Get a confirmed cab in just 5 minutes. Call, WhatsApp, or book online —
          we&apos;re available 24/7 across Nainital and all india.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <a
            href="tel:+918392986174"
            className="group flex items-center justify-center gap-2.5 px-8 py-4 bg-yellow-400 text-gray-900 font-black text-lg rounded-2xl hover:bg-yellow-300 transition-all shadow-2xl shadow-yellow-400/20 hover:-translate-y-1"
          >
            <Phone size={22} className="group-hover:animate-bounce-subtle shrink-0" /> 
            <span className="leading-none mt-0.5">+91 83929 86174</span>
          </a>
          <a
            href="https://wa.me/918392986174?text=Hi! I want to book a taxi."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2.5 px-8 py-4 bg-green-500 text-white font-black text-lg rounded-2xl hover:bg-green-400 transition-all shadow-2xl shadow-green-500/15 hover:-translate-y-1"
          >
            <MessageCircle size={22} className="group-hover:animate-bounce-subtle shrink-0" />
            <span className="leading-none mt-0.5">WhatsApp Us</span>
          </a>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2.5 px-8 py-4 border-2 border-white/20 text-white font-bold text-lg rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all group"
          >
            <Mail size={22} className="shrink-0" />
            <span className="leading-none mt-0.5">Send Enquiry</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform shrink-0 ml-1" />
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-500 text-sm">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            Confirmation within 5 minutes
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            Fixed transparent pricing
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            24/7 customer support
          </span>
        </div>
      </div>
    </section>
  );
}
