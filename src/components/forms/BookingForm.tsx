"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Calendar, MapPin, Car, CheckCircle, Loader2 } from "lucide-react";
import { vehicleTypes } from "@/data/vehicles";
import { cn } from "@/lib/utils";
import LocationAutocomplete from "./LocationAutocomplete";
import { toast } from "sonner";
import { COMPANY_NAME } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Enter valid 10-digit mobile number").max(13),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  pickupLocation: z.string().min(3, "Enter pickup location"),
  dropLocation: z.string().min(3, "Enter drop location"),
  journeyDate: z.string().min(1, "Select journey date"),
  vehicleType: z.string().min(1, "Select vehicle type"),
  tripType: z.enum(["one-way", "round-trip"]),
  message: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  className?: string;
  compact?: boolean;
  defaultPickup?: string;
  defaultDrop?: string;
}

export default function BookingForm({
  className,
  compact = false,
  defaultPickup = "",
  defaultDrop = "",
}: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      pickupLocation: defaultPickup,
      dropLocation: defaultDrop,
      tripType: "one-way",
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    try {
      // 1. Create a Razorpay Order for Advance Payment (Fixed ₹500)
      const orderRes = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 500, receipt: `rcpt_${Date.now()}` }),
      });
      
      const orderData = await orderRes.json();
      
      if (!orderData.success) {
        throw new Error("Could not initialize payment gateway");
      }

      // If backend is in test mode (missing API keys), simulate success immediately
      if (orderData.isTest) {
        toast.info("Test Mode: Simulating successful payment...");
        return simulateSuccess(orderData.order.id);
      }

      function simulateSuccess(orderId: string) {
        const bookingData = {
          ...data,
          razorpay_payment_id: "test_success",
          razorpay_order_id: orderId,
          razorpay_signature: "test_signature",
        };
        submitFinalBooking(bookingData);
      }

      async function submitFinalBooking(bookingData: any) {
        try {
          const finalRes = await fetch("/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData),
          });
          
          if (finalRes.ok) {
            toast.success("Payment successful! Booking confirmed.");
            setSubmitted(true);
            reset();
          } else {
            toast.error("Payment received, but failed to save booking. Please contact us.");
          }
        } catch (e) {
          toast.error("Error confirming booking. Please contact support.");
        } finally {
          setIsSubmitting(false);
        }
      }

      // 2. Open Razorpay Checkout Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY", 
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: COMPANY_NAME,
        description: "Advance Taxi Booking Token",
        order_id: orderData.order.id,
        handler: async function (response: any) {
          // 3. On successful payment, save booking in our database
          submitFinalBooking({
            ...data,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
        },
        prefill: {
          name: data.name,
          contact: data.phone,
          ...(data.email ? { email: data.email } : {}),
        },
        theme: {
          color: "#EAB308", // Tailwind yellow-500
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
            toast.error("Payment cancelled. Booking was not completed.");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        setIsSubmitting(false);
        toast.error(response.error.description || "Payment failed!");
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("Failed to start payment. Redirecting to WhatsApp.");
      setIsSubmitting(false);
      // Fallback
      const msg = `Hi! I want to book a taxi.%0AName: ${data.name}%0APhone: ${data.phone}%0APickup: ${data.pickupLocation}%0ADrop: ${data.dropLocation}%0ADate: ${data.journeyDate}%0AVehicle: ${data.vehicleType}`;
      window.open(`https://wa.me/919876543210?text=${msg}`, "_blank");
    }
  };

  if (submitted) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-10 text-center", className)}>
        <CheckCircle size={56} className="text-green-500 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Request Sent!</h3>
        <p className="text-gray-600 mb-6">
          We&apos;ll call you within 5 minutes to confirm your booking.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-primary px-6 py-2.5"
        >
          Book Another Ride
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
      {/* Name & Phone */}
      <div className={cn("grid gap-4", compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2")}>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Your Name *
          </label>
          <div className="relative">
            <input
              {...register("name")}
              placeholder="Enter your full name"
              className={cn("form-input pl-10", errors.name && "border-red-400")}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">👤</span>
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Mobile Number *
          </label>
          <div className="relative">
            <input
              {...register("phone")}
              placeholder="+91 98765 43210"
              type="tel"
              className={cn("form-input pl-10", errors.phone && "border-red-400")}
            />
            <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Pickup & Drop */}
      <div className={cn("grid gap-4", compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2")}>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Pickup Location *
          </label>
          <Controller
            control={control}
            name="pickupLocation"
            render={({ field }) => (
              <LocationAutocomplete
                value={field.value}
                onChange={field.onChange}
                placeholder="City, Area or Full Address"
                iconColorClass="text-green-500"
                error={!!errors.pickupLocation}
              />
            )}
          />
          {errors.pickupLocation && (
            <p className="text-red-500 text-xs mt-1">{errors.pickupLocation.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Drop Location *
          </label>
          <Controller
            control={control}
            name="dropLocation"
            render={({ field }) => (
              <LocationAutocomplete
                value={field.value}
                onChange={field.onChange}
                placeholder="City, Area or Full Address"
                iconColorClass="text-red-500"
                error={!!errors.dropLocation}
              />
            )}
          />
          {errors.dropLocation && (
            <p className="text-red-500 text-xs mt-1">{errors.dropLocation.message}</p>
          )}
        </div>
      </div>

      {/* Date, Vehicle, Trip Type */}
      <div className={cn("grid gap-4", compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3")}>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Journey Date *
          </label>
          <div className="relative">
            <input
              {...register("journeyDate")}
              type="date"
              min={today}
              className={cn("form-input pl-10", errors.journeyDate && "border-red-400")}
            />
            <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          {errors.journeyDate && (
            <p className="text-red-500 text-xs mt-1">{errors.journeyDate.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Vehicle Type *
          </label>
          <div className="relative">
            <select
              {...register("vehicleType")}
              className={cn("form-input pl-10 appearance-none", errors.vehicleType && "border-red-400")}
            >
              <option value="">Select Vehicle</option>
              {vehicleTypes.map((v) => (
                <option key={v.value} value={v.value}>
                  {v.label}
                </option>
              ))}
            </select>
            <Car size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          {errors.vehicleType && (
            <p className="text-red-500 text-xs mt-1">{errors.vehicleType.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Trip Type *
          </label>
          <select
            {...register("tripType")}
            className="form-input appearance-none"
          >
            <option value="one-way">One Way</option>
            <option value="round-trip">Round Trip</option>
          </select>
        </div>
      </div>

      {!compact && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Additional Notes
          </label>
          <textarea
            {...register("message")}
            rows={3}
            placeholder="Any specific requirements, flight number, pick-up time, etc."
            className="form-input resize-none"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary py-3.5 text-base flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Processing...
          </>
        ) : (
          <>🚖 Book Taxi Now</>
        )}
      </button>

      <p className="text-center text-xs text-gray-500">
        Or call directly:{" "}
        <a href="tel:+919876543210" className="text-yellow-600 font-semibold">
          +91 98765 43210
        </a>
      </p>
    </form>
  );
}
