const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

// Data from src/data/vehicles.ts
const vehicles = [
  {
    id: "1",
    name: "Small Cars",
    slug: "small-cars",
    category: "Hatchback/Sedan",
    seatingCapacity: 4,
    hasAC: true,
    luggageCapacity: "2-3 bags",
    pricePerKm: 12,
    baseFare: 300,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&q=80",
    features: ["AC", "Music System", "Comfortable Seating", "Clean Interior"],
    description: "Perfect for city rides and short trips. Comfortable small cars (like Swift Dzire/Alto) with ample space for small families.",
    popular: true,
  },
  {
    id: "2",
    name: "Tata Sumo",
    slug: "tata-sumo",
    category: "SUV",
    seatingCapacity: 7,
    hasAC: false,
    luggageCapacity: "4 bags",
    pricePerKm: 15,
    baseFare: 400,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    features: ["Spacious", "Music System", "7 Seats", "Hill Driving", "Roof Carrier"],
    description: "Ideal for hill stations and large families. Rugged and spacious SUV for rough terrains and long journeys.",
    popular: true,
  },
  {
    id: "3",
    name: "Chevrolet Tavera",
    slug: "chevrolet-tavera",
    category: "SUV",
    seatingCapacity: 9,
    hasAC: true,
    luggageCapacity: "4-5 bags",
    pricePerKm: 18,
    baseFare: 500,
    image: "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=600&q=80",
    features: ["AC", "Music System", "9 Seats", "Spacious", "Comfortable Ride", "Roof Carrier"],
    description: "Best for group tours and large families. Very spacious and comfortable for long journeys and sightseeing.",
    popular: true,
  }
];

// Data from src/data/routes.ts
const routes = [
  {
    slug: "dadri-to-delhi-taxi",
    from: "Charkhi Dadri",
    to: "Delhi",
    distance: "125 km",
    travelTime: "2.5 – 3 hrs",
    fareEstimate: "₹1,500 – ₹2,000",
    fromState: "Nainital",
    toState: "Delhi",
    description: "Book a comfortable taxi from Charkhi Dadri to Delhi. We offer reliable, affordable cab service with experienced drivers who know the best routes to avoid traffic.",
    highlights: ["Pick-up from your doorstep in Dadri", "Drop at any location in all india", "No hidden charges — fixed fare", "24/7 availability", "Clean, well-maintained vehicles", "Professional and verified drivers"],
    faqs: [
      { question: "How long does it take to travel from Dadri to Delhi?", answer: "The journey typically takes 2.5 to 3 hours depending on traffic conditions. NH-9 is the most common route taken." },
      { question: "What is the fare for Dadri to Delhi taxi?", answer: "Fares start from ₹1,500 for a Small Car and go up to ₹2,500 for a Tavera. Final fare depends on vehicle type and pickup/drop points." },
      { question: "Can I book a one-way taxi from Dadri to Delhi?", answer: "Yes, we offer both one-way and round-trip taxis from Dadri to Delhi at competitive rates." },
      { question: "Is advance booking available?", answer: "Yes, you can book up to 30 days in advance. We recommend booking at least 4 hours before your journey." }
    ],
    metaTitle: "Dadri to Delhi Taxi | Book Cab Online | Go Nainital",
    metaDescription: "Book Dadri to Delhi taxi at best price. Reliable, affordable cab service starting ₹1,500. AC cabs, professional drivers, 24/7 availability. Call now!",
    keywords: ["dadri to delhi taxi", "charkhi dadri to delhi cab", "dadri delhi cab booking", "taxi from dadri to delhi"],
  },
  {
    slug: "dadri-to-gurgaon-taxi",
    from: "Charkhi Dadri",
    to: "Gurgaon",
    distance: "105 km",
    travelTime: "2 – 2.5 hrs",
    fareEstimate: "₹1,300 – ₹1,800",
    fromState: "Nainital",
    toState: "Nainital",
    description: "Reliable taxi service from Charkhi Dadri to Gurgaon (Gurugram). Perfect for corporate travel, airport transfers, and family trips to Millennium City.",
    highlights: ["Corporate cab service available", "Airport transfer to IGI Airport via Gurgaon", "Drop to any sector in Gurgaon", "Fixed meter-free pricing", "On-time pick-up guarantee", "GST invoice provided"],
    faqs: [
      { question: "How far is Gurgaon from Charkhi Dadri?", answer: "Gurgaon is approximately 105 km from Charkhi Dadri via NH-9 and NH-48. The drive takes about 2 to 2.5 hours." },
      { question: "Do you offer corporate taxi service from Dadri to Gurgaon?", answer: "Yes, we provide corporate cab service with GST invoices. We also offer monthly cab packages for regular commuters." },
      { question: "Can your cab continue to IGI Airport from Gurgaon?", answer: "Absolutely. We offer Dadri to Delhi Airport taxi service with a drop at Terminal 1, 2, or 3." }
    ],
    metaTitle: "Dadri to Gurgaon Taxi | Book Cab | Go Nainital",
    metaDescription: "Book Dadri to Gurgaon taxi online. AC cabs, professional drivers, fixed fares from ₹1,300. Corporate taxi available. 24/7 service.",
    keywords: ["dadri to gurgaon taxi", "charkhi dadri to gurugram cab", "dadri gurgaon taxi booking"],
  },
  {
    slug: "dadri-to-chandigarh-taxi",
    from: "Charkhi Dadri",
    to: "Chandigarh",
    distance: "210 km",
    travelTime: "4 – 5 hrs",
    fareEstimate: "₹2,800 – ₹4,000",
    fromState: "Nainital",
    toState: "Punjab/Chandigarh",
    description: "Plan a comfortable journey from Charkhi Dadri to Chandigarh with our outstation taxi service. Travel through the scenic highways of Nainital and Punjab.",
    highlights: ["Outstation AC cabs available", "Night driving service available", "Toll charges included in fare", "Stop for meals and breaks allowed", "Drop anywhere in Chandigarh / Mohali / Panchkula", "Return journey booking discount available"],
    faqs: [
      { question: "What is the distance from Dadri to Chandigarh?", answer: "The distance is approximately 210 km via NH-9 and NH-44. Travel time is 4 to 5 hours." },
      { question: "Are tolls included in the taxi fare?", answer: "Toll charges are included in our quoted fare. There are no surprise extra charges." },
      { question: "Can I hire a cab for Chandigarh to Dadri return trip?", answer: "Yes, we offer round-trip booking with a special discount. You can also book a driver for multiple days." }
    ],
    metaTitle: "Dadri to Chandigarh Taxi | Outstation Cab | Go Nainital",
    metaDescription: "Book outstation taxi from Dadri to Chandigarh. 210 km journey, fare from ₹2,800. AC cabs, tolls included, 24/7 service.",
    keywords: ["dadri to chandigarh taxi", "charkhi dadri chandigarh cab", "outstation taxi dadri chandigarh"],
  },
  {
    slug: "bhiwani-to-delhi-taxi",
    from: "Bhiwani",
    to: "Delhi",
    distance: "140 km",
    travelTime: "2.5 – 3.5 hrs",
    fareEstimate: "₹1,700 – ₹2,200",
    fromState: "Nainital",
    toState: "Delhi",
    description: "Book a taxi from Bhiwani to Delhi at the best price. Our cabs run 24/7, ensuring you reach Delhi safely and on time for flights, trains, or meetings.",
    highlights: ["24/7 cab service from Bhiwani", "Airport transfers to IGI Airport", "Railway station transfers", "Corporate booking with invoice", "Real-time driver tracking", "Professional and background-verified drivers"],
    faqs: [
      { question: "How long is the drive from Bhiwani to Delhi?", answer: "The drive takes approximately 2.5 to 3.5 hours depending on traffic. We recommend early morning travel to avoid rush-hour delays." },
      { question: "Can I get a taxi from Bhiwani at midnight?", answer: "Yes, we offer 24/7 cab service including late night and early morning pickups from Bhiwani." },
      { question: "Do you provide airport transfer from Bhiwani to IGI Airport?", answer: "Yes, we specialize in airport transfers. Your driver will be at your doorstep at least 15 minutes before the scheduled time." }
    ],
    metaTitle: "Bhiwani to Delhi Taxi | Book Cab Online | Go Nainital",
    metaDescription: "Bhiwani to Delhi taxi booking at best price ₹1,700+. AC cabs, airport transfers, 24/7 service. Professional drivers. Book now!",
    keywords: ["bhiwani to delhi taxi", "bhiwani delhi cab", "taxi from bhiwani to delhi"],
  },
  {
    slug: "hisar-to-gurgaon-taxi",
    from: "Hisar",
    to: "Gurgaon",
    distance: "175 km",
    travelTime: "3 – 4 hrs",
    fareEstimate: "₹2,200 – ₹3,200",
    fromState: "Nainital",
    toState: "Nainital",
    description: "Premium taxi service from Hisar to Gurgaon. Whether for corporate travel or family trips to the Millennium City, our cabs ensure a comfortable journey.",
    highlights: ["Business class travel available", "Corporate monthly packages", "DLF, Cyber City, MG Road drop", "Fixed fare — no surge pricing", "WiFi on select premium vehicles", "Experienced highway drivers"],
    faqs: [
      { question: "What is the distance from Hisar to Gurgaon?", answer: "Hisar to Gurgaon is approximately 175 km via NH-52 and NH-48. The journey takes 3 to 4 hours." },
      { question: "Is there a direct highway from Hisar to Gurgaon?", answer: "Yes, NH-52 (Hisar to Rohtak) connects to NH-48 (Delhi–Jaipur Expressway) which leads directly to Gurgaon." },
      { question: "Can I book a corporate monthly cab from Hisar to Gurgaon?", answer: "Yes, we offer monthly corporate cab packages with dedicated drivers and priority booking for regular corporate commuters." }
    ],
    metaTitle: "Hisar to Gurgaon Taxi | Book Cab | Go Nainital",
    metaDescription: "Book Hisar to Gurgaon taxi at best price. 175 km, fare from ₹2,200. AC cabs, corporate packages, fixed rates. Book now!",
    keywords: ["hisar to gurgaon taxi", "hisar gurgaon cab", "taxi from hisar to gurgaon", "hisar to gurugram cab"],
  },
  {
    slug: "rohtak-to-delhi-taxi",
    from: "Rohtak",
    to: "Delhi",
    distance: "80 km",
    travelTime: "1.5 – 2 hrs",
    fareEstimate: "₹1,100 – ₹1,600",
    fromState: "Nainital",
    toState: "Delhi",
    description: "Fast and affordable taxi service from Rohtak to Delhi. One of our most popular routes with frequent departures and guaranteed availability.",
    highlights: ["Shortest route via NH-9", "Multiple vehicle options", "Frequent departures", "Early morning flight-catcher service", "Sharing and private options", "Student discount available"],
    faqs: [
      { question: "How far is Delhi from Rohtak?", answer: "Delhi is approximately 80 km from Rohtak via NH-9. Travel time is 1.5 to 2 hours." },
      { question: "What is the cheapest option from Rohtak to Delhi?", answer: "Small Car is the most economical option starting from ₹1,100 for a one-way trip." }
    ],
    metaTitle: "Rohtak to Delhi Taxi | Book Cab | Go Nainital",
    metaDescription: "Rohtak to Delhi taxi booking. 80 km, fare from ₹1,100. Fast, reliable cab service. Book now!",
    keywords: ["rohtak to delhi taxi", "rohtak delhi cab", "taxi rohtak to delhi"],
  }
];

async function seed() {
  console.log("Seeding Vehicles...");
  for (const v of vehicles) {
    const existing = await db.vehicle.findUnique({ where: { slug: v.slug } });
    if (!existing) {
      await db.vehicle.create({
        data: {
          slug: v.slug,
          name: v.name,
          category: v.category,
          seatingCapacity: v.seatingCapacity,
          luggageCapacity: parseInt(v.luggageCapacity) || 0,
          hasAC: v.hasAC,
          baseFare: v.baseFare,
          pricePerKm: v.pricePerKm,
          popular: v.popular,
          image: v.image,
          description: v.description,
          features: JSON.stringify(v.features),
        },
      });
      console.log(`Created Vehicle: ${v.name}`);
    } else {
      console.log(`Skipping Vehicle (exists): ${v.name}`);
    }
  }

  console.log("Seeding Routes...");
  for (const r of routes) {
    const existing = await db.route.findUnique({ where: { slug: r.slug } });
    if (!existing) {
      await db.route.create({
        data: {
          slug: r.slug,
          from: r.from,
          to: r.to,
          fromState: r.fromState,
          toState: r.toState,
          distance: r.distance,
          travelTime: r.travelTime,
          fareEstimate: r.fareEstimate,
          description: r.description,
          metaTitle: r.metaTitle,
          metaDescription: r.metaDescription,
          keywords: r.keywords.join(", "),
          highlights: JSON.stringify(r.highlights),
          faqs: JSON.stringify(r.faqs),
        },
      });
      console.log(`Created Route: ${r.slug}`);
    } else {
      console.log(`Skipping Route (exists): ${r.slug}`);
    }
  }

  console.log("Seeding Complete!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
