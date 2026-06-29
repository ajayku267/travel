import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import SiteLayout from "@/components/layout/SiteLayout";
import { getSettings } from "@/lib/settings";
import { SettingsProvider } from "@/components/providers/SettingsProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  const COMPANY_NAME = settings.companyName;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nainitaltaxi.com"),
    verification: {
      google: "DSPBAVU2kCBdxYmlzhvyeekLGIfgrJ6btoD0Pr70ISk",
    },
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = getSettings();

  return (
    <html lang="en" className={`${inter.variable}`} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://nainitaltaxi.com",
              name: settings.companyName,
              description:
                "Trusted taxi and cab rental service in Nainital, Delhi NCR. Local, outstation, airport, and corporate cab services.",
              url: "https://nainitaltaxi.com",
              telephone: settings.phone,
              email: settings.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: settings.address,
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
        <SettingsProvider settings={settings}>
          <SiteLayout>
            {children}
          </SiteLayout>
        </SettingsProvider>
        <Analytics />
      </body>
    </html>
  );
}
