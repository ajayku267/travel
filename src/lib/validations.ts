import { z } from "zod";

// ── Booking ──────────────────────────────────────────────────────────────────

export const bookingSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .trim(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be under 15 digits")
    .regex(/^[+\d\s-]+$/, "Invalid phone number format"),
  pickupLocation: z
    .string()
    .min(2, "Pickup location is required")
    .max(200, "Pickup location is too long")
    .trim(),
  dropLocation: z
    .string()
    .min(2, "Drop location is required")
    .max(200, "Drop location is too long")
    .trim(),
  vehicleType: z
    .string()
    .min(1, "Vehicle type is required")
    .max(100),
  journeyDate: z
    .string()
    .min(1, "Journey date is required"),
  tripType: z.enum(["one-way", "round-trip"], {
    error: "Trip type must be one-way or round-trip",
  }),
});

export type BookingInput = z.infer<typeof bookingSchema>;

// ── Contact Inquiry ──────────────────────────────────────────────────────────

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .trim(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be under 15 digits")
    .regex(/^[+\d\s-]+$/, "Invalid phone number format"),
  email: z
    .string()
    .email("Invalid email address")
    .max(200)
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .min(2, "Subject is required")
    .max(200, "Subject is too long")
    .trim(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters")
    .trim(),
});

export type ContactInput = z.infer<typeof contactSchema>;

// ── Vehicle ──────────────────────────────────────────────────────────────────

export const vehicleSchema = z.object({
  name: z
    .string()
    .min(2, "Vehicle name is required")
    .max(100)
    .trim(),
  category: z
    .string()
    .min(1, "Category is required")
    .max(100)
    .trim(),
  seatingCapacity: z
    .number()
    .int()
    .min(1, "Seating capacity must be at least 1")
    .max(50, "Seating capacity is too high"),
  luggageCapacity: z
    .number()
    .int()
    .min(0, "Luggage capacity cannot be negative")
    .max(50),
  hasAC: z.boolean().default(true),
  baseFare: z
    .number()
    .min(0, "Base fare cannot be negative")
    .max(100000),
  pricePerKm: z
    .number()
    .min(0, "Price per km cannot be negative")
    .max(1000),
  popular: z.boolean().default(false),
  image: z
    .string()
    .min(1, "Image URL is required")
    .max(500),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000)
    .trim(),
  features: z
    .array(z.string().trim())
    .default([]),
});

export type VehicleInput = z.infer<typeof vehicleSchema>;

// ── Route ────────────────────────────────────────────────────────────────────

export const routeSchema = z.object({
  from: z.string().min(2, "From city is required").max(100).trim(),
  to: z.string().min(2, "To city is required").max(100).trim(),
  fromState: z.string().min(2, "From state is required").max(100).trim(),
  toState: z.string().min(2, "To state is required").max(100).trim(),
  distance: z.string().min(1, "Distance is required").max(50).trim(),
  travelTime: z.string().min(1, "Travel time is required").max(50).trim(),
  fareEstimate: z.string().min(1, "Fare estimate is required").max(100).trim(),
  description: z.string().min(10, "Description must be at least 10 characters").max(5000).trim(),
  metaTitle: z.string().min(5, "Meta title is required").max(200).trim(),
  metaDescription: z.string().min(10, "Meta description is required").max(500).trim(),
  keywords: z.string().max(500).trim().default(""),
  highlights: z.array(z.string().trim()).default([]),
  faqs: z
    .array(
      z.object({
        question: z.string().min(5).max(500),
        answer: z.string().min(5).max(2000),
      })
    )
    .default([]),
});

export type RouteInput = z.infer<typeof routeSchema>;

// ── Location ─────────────────────────────────────────────────────────────────

export const locationSchema = z.object({
  name: z.string().min(2, "Location name is required").max(100).trim(),
  state: z.string().min(2, "State is required").max(100).trim(),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000).trim(),
  about: z.string().min(10, "About section is required").max(5000).trim(),
  metaTitle: z.string().min(5, "Meta title is required").max(200).trim(),
  metaDescription: z.string().min(10, "Meta description is required").max(500).trim(),
  keywords: z.string().max(500).trim().default(""),
  highlights: z.array(z.string().trim()).default([]),
  services: z.array(z.string().trim()).default([]),
  popularRoutes: z.array(z.string().trim()).default([]),
  faqs: z
    .array(
      z.object({
        question: z.string().min(5).max(500),
        answer: z.string().min(5).max(2000),
      })
    )
    .default([]),
});

export type LocationInput = z.infer<typeof locationSchema>;

// ── Review ───────────────────────────────────────────────────────────────────

export const reviewSchema = z.object({
  name: z.string().min(2, "Name is required").max(100).trim(),
  location: z.string().min(2, "Location is required").max(100).trim(),
  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  review: z.string().min(10, "Review must be at least 10 characters").max(2000).trim(),
  date: z.string().min(1, "Date is required"),
  route: z.string().max(200).optional().or(z.literal("")),
});

export type ReviewInput = z.infer<typeof reviewSchema>;

// ── Public Review Submission (less strict — verified=false by default) ────────

export const publicReviewSchema = z.object({
  name: z.string().min(2, "Name is required").max(100).trim(),
  location: z.string().min(2, "Location is required").max(100).trim(),
  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  review: z.string().min(10, "Review must be at least 10 characters").max(2000).trim(),
  route: z.string().max(200).optional().or(z.literal("")),
});

export type PublicReviewInput = z.infer<typeof publicReviewSchema>;

// ── Gallery Image ────────────────────────────────────────────────────────────

export const gallerySchema = z.object({
  url: z.string().url("Must be a valid URL").max(500),
  caption: z.string().min(2, "Caption is required").max(200).trim(),
  category: z.string().min(1, "Category is required").max(50).trim(),
});

export type GalleryInput = z.infer<typeof gallerySchema>;

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Formats Zod validation errors into a user-friendly error string.
 */
export function formatZodErrors(error: z.ZodError): string {
  return error.issues.map((e) => e.message).join(", ");
}
