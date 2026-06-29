export interface TourPackage {
  id: string;
  name: string;
  type?: string;
  covers: string;
  prices: {
    tavera: number | string;
    sumo: number | string;
    smallCars: number | string;
    note?: string;
  };
}

export const tourPackages: TourPackage[] = [
  {
    id: "nainital-darshan",
    name: "NAINITAL DARSHAN",
    covers:
      "Cave Garden, Barapather, Himalaya Darshan, Lake View Point, Lover's Point, Khurpatal Lake view Point, Botanical Garden, Saritatal, Waterfall, Mansa Devi Temple, Hanumangarh, Raj Bhawan.",
    prices: {
      tavera: "6,000/-",
      sumo: "5,000/-",
      smallCars: "4,500/-",
    },
  },
  {
    id: "lakes-tour",
    name: "LAKES TOUR",
    covers:
      "Bhowali, Sattal, Garur Tal, Bhimtal, Hanumangarh Temple, Naukuchiyatal and Kamal Tal (Kainchi Dham + Extra Charge)",
    prices: {
      tavera: "5,500/-",
      sumo: "5,000/-",
      smallCars: "4,500/-",
    },
  },
  {
    id: "nainital-darshan-lake-tour",
    name: "NAINITAL DARSHAN & LAKE TOUR",
    covers:
      "Himalaya Darshan, Cave Garden, Bara Pathar, Lover's Point Nainital lake view Point, Water Fall, Manasa Devi Temple, Hanuman Garh Temple, Botanical Garden, Saritatal, Khurpatal View Point/Lake, Bhowali, Sattal, Garur Tal, Bhimtal, Hanumangarhi Temple, Naukuchiyatal, Kamal Tal.",
    prices: {
      tavera: "7,000/-",
      sumo: "6,000/-",
      smallCars: "5,500/-",
    },
  },
  {
    id: "mukteshwar",
    name: "MUKTESHWAR",
    type: "One Day",
    covers:
      "Bhowali, Ghorakhai Temple, Tea Garden, Tea Factory, Gagar, Ramgarh (Apple Garden), Mukteshwar, Himalaya View, Choli-Ki-Jali, Mahadev Temple. (Kainchi Dham + Extra Charge)",
    prices: {
      tavera: "5,500/-",
      sumo: "5,000/-",
      smallCars: "4,500/-",
    },
  },
  {
    id: "ranikhet",
    name: "RANIKHET",
    type: "One Day",
    covers:
      "Bhowali, Kainchi Temple, Frog Point, Ranikhet, Golf Ground, Kalika, Mankemeshwar Temple.",
    prices: {
      tavera: "5,500/-",
      sumo: "5,000/-",
      smallCars: "4,500/-",
    },
  },
  {
    id: "kausani",
    name: "KAUSANI",
    type: "Two Day",
    covers:
      "Bhowali, Kainchi Temple, Frog Point, Almora, Kausani (Night Halt), Tea Garden. (Day 2) Kalika, Golf Ground, Ranikhet, Mankameshwar Temple, Shawl Factory & Back To Nainital.",
    prices: {
      tavera: "9,000/-",
      sumo: "8,500/-",
      smallCars: "8,000/-",
    },
  },
  {
    id: "jageshwar",
    name: "JAGESHWAR",
    type: "Full Day",
    covers:
      "Bhowali, Kainchi Temple, Frog Point, Almora, Dear Park, Chital Temple, Jageshwar",
    prices: {
      tavera: "7,500/-",
      sumo: "7,000/-",
      smallCars: "6,000/-",
    },
  },
  {
    id: "wild-life-corbett-park",
    name: "WILD LIFE CORBETT PARK",
    type: "Full Day",
    covers:
      "Khurpatal, Kaladhugi, Corbett Museum & Corbett Fall, Ramnagar), Laidhang & Bijrani (Permitted By Wild Life Warden, Ramnagar), Back To Nainital Same Day.",
    prices: {
      tavera: "6,000/-",
      sumo: "5,000/-",
      smallCars: "4,500/-",
    },
  },
  {
    id: "jumble-tour",
    name: "JUMBLE TOUR",
    covers:
      "Bhowali, Sattal, Ghorakhal Temple, Tea Garden, Kainchi Temple, Frog Point, Hanumangarh.",
    prices: {
      tavera: "6,000/-",
      sumo: "5,000/-",
      smallCars: "4,500/-",
    },
  },
  {
    id: "kumaun-darshan",
    name: "KUMAUN DARSHAN",
    covers:
      "Nainital to Ranikhet (N/H), Kausani (N/H), Chokori (N/H), Munshyari (2 N/H), Patal Bhuwneshawar (N/H), Jageshwar, Almora (N/H), Almora to Nainital, Kathgodam Drop. Including Toll Tax, Parking, Driver Night.",
    prices: {
      tavera: "5,000/-",
      sumo: "4,500/-",
      smallCars: "4,000/-",
      note: "Per Day",
    },
  },
];
