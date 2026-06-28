"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Enter valid 10-digit mobile number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  subject: z.string().min(3, "Enter a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Message sent successfully!");
        setSubmitted(true);
        reset();
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Failed to send message. Redirecting to WhatsApp.");
      const msg = `Hi! I have a query.%0AName: ${data.name}%0APhone: ${data.phone}%0ASubject: ${data.subject}%0AMessage: ${data.message}`;
      window.open(`https://wa.me/919876543210?text=${msg}`, "_blank");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-green-50 rounded-3xl border border-green-200">
        <CheckCircle size={56} className="text-green-500 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-6">
          We&apos;ll get back to you within 24 hours. For urgent queries, please call us.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-primary px-6 py-2.5"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-gray-50 rounded-3xl p-8 border border-gray-100">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
          <input
            {...register("name")}
            placeholder="Enter your name"
            className={`form-input ${errors.name ? "border-red-400" : ""}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number *</label>
          <input
            {...register("phone")}
            placeholder="+91 98765 43210"
            type="tel"
            className={`form-input ${errors.phone ? "border-red-400" : ""}`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email (optional)</label>
        <input {...register("email")} type="email" placeholder="you@example.com" className="form-input" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject *</label>
        <select {...register("subject")} className={`form-input ${errors.subject ? "border-red-400" : ""}`}>
          <option value="">Select a subject</option>
          <option value="Taxi Booking">Taxi Booking</option>
          <option value="Fare Enquiry">Fare Enquiry</option>
          <option value="Corporate Booking">Corporate Booking</option>
          <option value="Complaint">Complaint</option>
          <option value="Feedback">Feedback</option>
          <option value="Other">Other</option>
        </select>
        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Tell us about your travel requirement..."
          className={`form-input resize-none ${errors.message ? "border-red-400" : ""}`}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary py-3.5 text-base flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <><Loader2 size={18} className="animate-spin" /> Sending...</>
        ) : (
          <>📧 Send Message</>
        )}
      </button>
    </form>
  );
}
