import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import { COMPANY_NAME } from "@/lib/utils";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${COMPANY_NAME} | Taxi & Cab Service in Nainital, Delhi NCR`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description:
    "Nainital's most trusted taxi service. Book AC cab for local, outstation, airport transfer in Charkhi Dadri, Bhiwani, Rohtak, Hisar, Gurgaon, Delhi NCR. 24/7 availability.",
  keywords: [
    "taxi service nainital",
    "cab service nainital",
    "taxi booking nainital",
    "outstation taxi nainital",
    "airport taxi nainital",
    "charkhi dadri taxi",
    "bhiwani taxi",
    "rohtak taxi",
    "hisar taxi",
    "gurgaon taxi",
    "delhi ncr taxi",
  ],
  authors: [{ name: COMPANY_NAME }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: COMPANY_NAME,
    title: `${COMPANY_NAME} | Taxi & Cab Service in Nainital, Delhi NCR`,
    description:
      "Nainital's most trusted taxi service. Book AC cab for local, outstation, airport transfer. 24/7 availability, professional drivers, fixed fares.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_NAME} | Taxi Service in Nainital`,
    description: "Book reliable taxi service in Nainital & Delhi NCR. 24/7 availability.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://nainitaltaxi.com",
  },
};

import Script from "next/script";
import SiteLayout from "@/components/layout/SiteLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://nainitaltaxi.com",
              name: COMPANY_NAME,
              description:
                "Trusted taxi and cab rental service in Nainital, Delhi NCR. Local, outstation, airport, and corporate cab services.",
              url: "https://nainitaltaxi.com",
              telephone: "+918392986174",
              email: "info@nainitaltaxi.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Near Hotel basera, Mallital",
                addressLocality: "Nainital",
                addressRegion: "Uttarakhand",
                postalCode: "263001",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "28.5921",
                longitude: "76.2714",
              },
              openingHours: "Mo-Su 00:00-24:00",
              priceRange: "₹₹",
              serviceType: ["Taxi Service", "Car Rental", "Airport Transfer", "Outstation Cab"],
              areaServed: ["Nainital", "Delhi NCR", "Punjab", "Rajasthan", "Uttarakhand"],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "500",
                bestRating: "5",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        <Toaster position="top-center" richColors />
        <SiteLayout>
          {children}
        </SiteLayout>
        <Analytics />
      </body>
    </html>
  );
}
