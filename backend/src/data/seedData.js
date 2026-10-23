/**
 * Seed data for RouteMate AI
 * Includes verified passengers, licensed drivers, multi-capacity vehicles,
 * realistic Indian routes (Jaipur, Delhi, Ajmer), and matching fixtures.
 */

export const INITIAL_USERS = [
  // Demo Passengers
  {
    id: "usr_rohan",
    email: "rohan.sharma@example.com",
    name: "Rohan Sharma",
    role: "passenger",
    phone: "+91 98290 12345",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    phoneVerified: true,
    emailVerified: true,
    idVerified: true,
    bio: "Senior Product Designer working remotely. Frequent traveler between Jaipur and Delhi NCR. Appreciates quiet, punctual rides.",
    preferredLanguage: "English, Hindi",
    preferences: {
      quietRide: true,
      acPreferred: true,
      allowPet: false,
      luggageCapacity: "1 suitcase + 1 backpack"
    },
    totalCompletedRides: 38,
    averageRating: 4.9,
    ratingBreakdown: {
      punctuality: 4.9,
      courtesy: 5.0,
      communication: 4.8,
      cleanliness: 4.9,
      overall: 4.9
    },
    reviewCount: 32,
    topTags: ["On time", "Polite", "Respectful", "Good communicator"],
    emergencyContacts: [
      { id: "em_1", name: "Ananya Sharma", relationship: "Sister", phone: "+91 98290 54321" },
      { id: "em_2", name: "Dr. R.K. Sharma", relationship: "Father", phone: "+91 98290 99887" }
    ]
  },
  {
    id: "usr_priya",
    email: "priya.patel@example.com",
    name: "Priya Patel",
    role: "passenger",
    phone: "+91 94140 22334",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    phoneVerified: true,
    emailVerified: true,
    idVerified: true,
    bio: "Management consultant traveling for corporate client meetings. Values safe, eco-friendly carpooling and verified co-passengers.",
    preferredLanguage: "Hindi, English, Gujarati",
    preferences: {
      quietRide: false,
      acPreferred: true,
      allowPet: false,
      luggageCapacity: "1 cabin trolley"
    },
    totalCompletedRides: 26,
    averageRating: 4.8,
    ratingBreakdown: {
      punctuality: 4.8,
      courtesy: 4.9,
      communication: 4.9,
      cleanliness: 4.8,
      overall: 4.8
    },
    reviewCount: 21,
    topTags: ["On time", "Friendly", "Professional", "Polite"],
    emergencyContacts: [
      { id: "em_3", name: "Kunal Patel", relationship: "Spouse", phone: "+91 94140 88776" }
    ]
  },
  {
    id: "usr_amit",
    email: "amit.verma@example.com",
    name: "Amit Verma",
    role: "passenger",
    phone: "+91 97840 33445",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    phoneVerified: true,
    emailVerified: true,
    idVerified: false,
    bio: "Software Architect & tech conference attendee. Enjoys listening to podcasts and collaborating on road journeys.",
    preferredLanguage: "English, Hindi",
    preferences: {
      quietRide: false,
      acPreferred: true,
      allowPet: true,
      luggageCapacity: "2 medium bags"
    },
    totalCompletedRides: 14,
    averageRating: 4.7,
    ratingBreakdown: {
      punctuality: 4.6,
      courtesy: 4.8,
      communication: 4.7,
      cleanliness: 4.7,
      overall: 4.7
    },
    reviewCount: 11,
    topTags: ["Good communicator", "Polite", "Flexible"],
    emergencyContacts: [
      { id: "em_4", name: "Suresh Verma", relationship: "Brother", phone: "+91 97840 99001" }
    ]
  },
  {
    id: "usr_sneha",
    email: "sneha.kulkarni@example.com",
    name: "Dr. Sneha Kulkarni",
    role: "passenger",
    phone: "+91 96500 44556",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    phoneVerified: true,
    emailVerified: true,
    idVerified: true,
    bio: "Healthcare specialist visiting AIIMS and SMS Hospital. Punctual, courteous, and mindful of travel safety.",
    preferredLanguage: "English, Marathi, Hindi",
    preferences: {
      quietRide: true,
      acPreferred: true,
      allowPet: false,
      luggageCapacity: "1 laptop bag + medical kit"
    },
    totalCompletedRides: 42,
    averageRating: 4.95,
    ratingBreakdown: {
      punctuality: 5.0,
      courtesy: 5.0,
      communication: 4.9,
      cleanliness: 4.9,
      overall: 4.95
    },
    reviewCount: 38,
    topTags: ["On time", "Extremely courteous", "Respectful", "Quiet"],
    emergencyContacts: []
  },
  {
    id: "usr_vikas",
    email: "vikas.yadav@example.com",
    name: "Vikas Yadav",
    role: "passenger",
    phone: "+91 99280 55667",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    phoneVerified: true,
    emailVerified: false,
    idVerified: false,
    bio: "University researcher visiting research labs between Jaipur and Ajmer. Friendly and easygoing travel companion.",
    preferredLanguage: "Hindi, Rajasthani, English",
    preferences: {
      quietRide: false,
      acPreferred: false,
      allowPet: false,
      luggageCapacity: "1 backpack"
    },
    totalCompletedRides: 8,
    averageRating: 4.6,
    ratingBreakdown: {
      punctuality: 4.5,
      courtesy: 4.7,
      communication: 4.6,
      cleanliness: 4.6,
      overall: 4.6
    },
    reviewCount: 6,
    topTags: ["Polite", "Helpful"],
    emergencyContacts: []
  },

  // Demo Drivers
  {
    id: "drv_vikram",
    email: "vikram.singh@routemate.com",
    name: "Vikram Singh Shekhawat",
    role: "driver",
    phone: "+91 98299 88776",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    phoneVerified: true,
    emailVerified: true,
    idVerified: true,
    driverLicenseNumber: "RJ-14-2017-0098231",
    commercialPermit: "All India Tourist Permit (AITP)",
    experienceYears: 9,
    rating: 4.92,
    totalTrips: 620,
    vehicleId: "veh_innova",
    status: "online",
    todayEarnings: 4250,
    walletBalance: 18400
  },
  {
    id: "drv_manoj",
    email: "manoj.sharma@routemate.com",
    name: "Manoj Sharma",
    role: "driver",
    phone: "+91 98288 77665",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    phoneVerified: true,
    emailVerified: true,
    idVerified: true,
    driverLicenseNumber: "DL-01-2019-0044129",
    commercialPermit: "Delhi-NCR & Rajasthan State Permit",
    experienceYears: 6,
    rating: 4.85,
    totalTrips: 410,
    vehicleId: "veh_dzire",
    status: "online",
    todayEarnings: 2800,
    walletBalance: 12150
  },
  {
    id: "drv_sita",
    email: "sita.ram@routemate.com",
    name: "Sitaram Gurjar",
    role: "driver",
    phone: "+91 98277 66554",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    phoneVerified: true,
    emailVerified: true,
    idVerified: true,
    driverLicenseNumber: "RJ-26-2021-0021980",
    commercialPermit: "EV Commercial Green Permit",
    experienceYears: 4,
    rating: 4.88,
    totalTrips: 295,
    vehicleId: "veh_tigor_ev",
    status: "online",
    todayEarnings: 1950,
    walletBalance: 9800
  },

  // Demo Administrator
  {
    id: "usr_admin",
    email: "admin@routemate.com",
    name: "Neha Kapoor",
    role: "admin",
    phone: "+91 98111 00000",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    phoneVerified: true,
    emailVerified: true,
    idVerified: true,
    department: "Head of Operations & Safety",
    accessLevel: "superadmin"
  }
];

export const INITIAL_VEHICLES = [
  {
    id: "veh_innova",
    driverId: "drv_vikram",
    make: "Toyota",
    model: "Innova Crysta 2.4 VX",
    category: "SUV",
    color: "Pearl White",
    plateNumber: "RJ 14 TC 8821",
    seatingCapacity: 6,
    luggageCapacity: "4 Large Suitcases",
    fuelType: "Diesel / BS6",
    acType: "Dual Zone Climate Control",
    amenities: ["Free High-speed Wi-Fi", "USB-C Fast Chargers", "Bottled Water", "First Aid Kit", "Child Seat on Request"],
    verifiedInspectionDate: "2026-08-15"
  },
  {
    id: "veh_dzire",
    driverId: "drv_manoj",
    make: "Maruti Suzuki",
    model: "Dzire Tour Prime",
    category: "Sedan",
    color: "Silky Silver",
    plateNumber: "DL 01 ZB 4590",
    seatingCapacity: 4,
    luggageCapacity: "2 Medium Bags",
    fuelType: "CNG + Petrol",
    acType: "Air Conditioned",
    amenities: ["Phone Charger", "Clean Tissue Box", "FM Radio", "Sanitizer"],
    verifiedInspectionDate: "2026-09-01"
  },
  {
    id: "veh_tigor_ev",
    driverId: "drv_sita",
    make: "Tata",
    model: "Tigor EV Commercial",
    category: "Electric",
    color: "Teal Blue Metallic",
    plateNumber: "RJ 14 EV 2034",
    seatingCapacity: 4,
    luggageCapacity: "2 Cabin Bags",
    fuelType: "100% Electric Zero-Emission",
    acType: "Automatic Climate Control",
    amenities: ["Zero Tailpipe Emissions", "Silent Drive", "Fast USB Ports", "Eco Tracking Dashboard"],
    verifiedInspectionDate: "2026-09-10"
  }
];

export const INITIAL_RIDE_REQUESTS = [
  // --- PAIR 1 (HIGHLY COMPATIBLE INTERSTATE): Jaipur -> Delhi Airport ---
  // Request A: Rohan (Jaipur Station -> Delhi Airport T3)
  {
    id: "ride_101",
    userId: "usr_rohan",
    passengerName: "Rohan Sharma",
    passengerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    passengerRating: 4.9,
    journeyType: "interstate",
    rideType: "shared",
    pickup: {
      id: "loc_jpr_station",
      name: "Jaipur Junction Railway Station",
      address: "Station Road, Gopalbari, Jaipur",
      lat: 26.9196,
      lng: 75.7878
    },
    dropoff: {
      id: "loc_del_igi_t3",
      name: "Delhi IGI Airport (DEL) Terminal 3",
      address: "Indira Gandhi International Airport, New Delhi",
      lat: 28.5562,
      lng: 77.1000
    },
    travelDate: "2026-10-24",
    departureTime: "07:00",
    passengerCount: 1,
    luggageCount: 2,
    maxDetourMinutes: 25,
    status: "matched", // Matched with ride_102, awaiting passenger acceptance
    activeMatchId: "match_jpr_del_01",
    createdAt: "2026-10-23T18:00:00Z"
  },
  // Request B: Priya (Ajmer Road Jaipur -> Delhi Airport T3)
  {
    id: "ride_102",
    userId: "usr_priya",
    passengerName: "Priya Patel",
    passengerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    passengerRating: 4.8,
    journeyType: "interstate",
    rideType: "shared",
    pickup: {
      id: "loc_jpr_ajmer_rd",
      name: "Ajmer Road / 200 Ft Bypass",
      address: "Ajmer Road, Purani Chungi, Jaipur",
      lat: 26.8905,
      lng: 75.7289
    },
    dropoff: {
      id: "loc_del_igi_t3",
      name: "Delhi IGI Airport (DEL) Terminal 3",
      address: "Indira Gandhi International Airport, New Delhi",
      lat: 28.5562,
      lng: 77.1000
    },
    travelDate: "2026-10-24",
    departureTime: "07:15",
    passengerCount: 1,
    luggageCount: 1,
    maxDetourMinutes: 20,
    status: "matched",
    activeMatchId: "match_jpr_del_01",
    createdAt: "2026-10-23T18:15:00Z"
  },

  // --- PAIR 2 (COMPATIBLE OUTSTATION): Jaipur -> Ajmer Sharif ---
  // Request C: Amit (Mansarovar -> Ajmer Dargah)
  {
    id: "ride_103",
    userId: "usr_amit",
    passengerName: "Amit Verma",
    passengerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    passengerRating: 4.7,
    journeyType: "outstation",
    rideType: "shared",
    pickup: {
      id: "loc_jpr_mansarovar",
      name: "Mansarovar Metro Station",
      address: "Bhrigu Marg, Mansarovar, Jaipur",
      lat: 26.8687,
      lng: 75.7628
    },
    dropoff: {
      id: "loc_ajm_dargah",
      name: "Ajmer Sharif Dargah Gate",
      address: "Dargah Bazar, Ajmer",
      lat: 26.4561,
      lng: 74.6282
    },
    travelDate: "2026-10-25",
    departureTime: "08:30",
    passengerCount: 2,
    luggageCount: 2,
    maxDetourMinutes: 20,
    status: "pending_match",
    createdAt: "2026-10-23T19:00:00Z"
  },
  // Request D: Vikas (Vaishali Nagar -> Ajmer Station)
  {
    id: "ride_104",
    userId: "usr_vikas",
    passengerName: "Vikas Yadav",
    passengerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    passengerRating: 4.6,
    journeyType: "outstation",
    rideType: "shared",
    pickup: {
      id: "loc_jpr_vaishali",
      name: "Vaishali Nagar Amrapali Circle",
      address: "Amrapali Marg, Vaishali Nagar, Jaipur",
      lat: 26.9080,
      lng: 75.7380
    },
    dropoff: {
      id: "loc_ajm_station",
      name: "Ajmer Junction Railway Station",
      address: "Station Road, Topdara, Ajmer",
      lat: 26.4542,
      lng: 74.6391
    },
    travelDate: "2026-10-25",
    departureTime: "08:45",
    passengerCount: 1,
    luggageCount: 1,
    maxDetourMinutes: 20,
    status: "pending_match",
    createdAt: "2026-10-23T19:10:00Z"
  },

  // --- PAIR 3 (COMPATIBLE CITY INTRA-JAIPUR): WTP to Jaipur Airport ---
  // Request E: Sneha (MI Road -> Jaipur Airport)
  {
    id: "ride_105",
    userId: "usr_sneha",
    passengerName: "Dr. Sneha Kulkarni",
    passengerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    passengerRating: 4.95,
    journeyType: "city",
    rideType: "shared",
    pickup: {
      id: "loc_jpr_mi_rd",
      name: "MI Road (Mirza Ismail Road)",
      address: "Panch Batti, C-Scheme, Jaipur",
      lat: 26.9171,
      lng: 75.8118
    },
    dropoff: {
      id: "loc_jpr_airport",
      name: "Jaipur International Airport (JAI)",
      address: "Airport Road, Sanganer, Jaipur",
      lat: 26.8242,
      lng: 75.8122
    },
    travelDate: "2026-10-24",
    departureTime: "11:00",
    passengerCount: 1,
    luggageCount: 1,
    maxDetourMinutes: 15,
    status: "pending_match",
    createdAt: "2026-10-23T19:30:00Z"
  },
  // Request F: Rohan city trip (WTP Malviya Nagar -> Jaipur Airport)
  {
    id: "ride_106",
    userId: "usr_rohan",
    passengerName: "Rohan Sharma",
    passengerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    passengerRating: 4.9,
    journeyType: "city",
    rideType: "shared",
    pickup: {
      id: "loc_jpr_wtp",
      name: "World Trade Park (WTP) / Malviya Nagar",
      address: "Jawahar Lal Nehru Marg, Malviya Nagar, Jaipur",
      lat: 26.8530,
      lng: 75.8050
    },
    dropoff: {
      id: "loc_jpr_airport",
      name: "Jaipur International Airport (JAI)",
      address: "Airport Road, Sanganer, Jaipur",
      lat: 26.8242,
      lng: 75.8122
    },
    travelDate: "2026-10-24",
    departureTime: "11:15",
    passengerCount: 1,
    luggageCount: 1,
    maxDetourMinutes: 15,
    status: "pending_match",
    createdAt: "2026-10-23T19:40:00Z"
  },

  // --- INCOMPATIBLE FIXTURE 1: OPPOSITE DIRECTIONS ---
  // Request G: Jaipur to Ajmer (Southwest) vs Request H: Jaipur to Delhi (Northeast)
  {
    id: "ride_107_incompat_dir",
    userId: "usr_amit",
    passengerName: "Amit Verma",
    passengerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    passengerRating: 4.7,
    journeyType: "outstation",
    rideType: "shared",
    pickup: {
      id: "loc_jpr_station",
      name: "Jaipur Junction Railway Station",
      address: "Station Road, Gopalbari, Jaipur",
      lat: 26.9196,
      lng: 75.7878
    },
    dropoff: {
      id: "loc_ajm_dargah",
      name: "Ajmer Sharif Dargah Gate",
      address: "Dargah Bazar, Ajmer",
      lat: 26.4561,
      lng: 74.6282
    },
    travelDate: "2026-10-24",
    departureTime: "07:00",
    passengerCount: 1,
    luggageCount: 1,
    maxDetourMinutes: 20,
    status: "pending_match",
    createdAt: "2026-10-23T18:05:00Z"
  },

  // --- INCOMPATIBLE FIXTURE 2: DATE & TIME MISMATCH ---
  {
    id: "ride_108_incompat_time",
    userId: "usr_vikas",
    passengerName: "Vikas Yadav",
    passengerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    passengerRating: 4.6,
    journeyType: "interstate",
    rideType: "shared",
    pickup: {
      id: "loc_jpr_station",
      name: "Jaipur Junction Railway Station",
      address: "Station Road, Gopalbari, Jaipur",
      lat: 26.9196,
      lng: 75.7878
    },
    dropoff: {
      id: "loc_del_igi_t3",
      name: "Delhi IGI Airport (DEL) Terminal 3",
      address: "Indira Gandhi International Airport, New Delhi",
      lat: 28.5562,
      lng: 77.1000
    },
    travelDate: "2026-10-26", // 2 days later!
    departureTime: "22:00",
    passengerCount: 4, // Exceeds capacity when combined with another 3
    luggageCount: 4,
    maxDetourMinutes: 10,
    status: "pending_match",
    createdAt: "2026-10-23T18:20:00Z"
  },

  // --- ACTIVE ONGOING TRIP (For live simulation & driver view) ---
  {
    id: "ride_109_active",
    userId: "usr_priya",
    passengerName: "Priya Patel",
    passengerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    passengerRating: 4.8,
    journeyType: "interstate",
    rideType: "shared",
    pickup: {
      id: "loc_jpr_station",
      name: "Jaipur Junction Railway Station",
      address: "Station Road, Gopalbari, Jaipur",
      lat: 26.9196,
      lng: 75.7878
    },
    dropoff: {
      id: "loc_ggn_cyberhub",
      name: "Cyber Hub / DLF Phase 2 Gurugram",
      address: "NH 48, DLF Cyber City, Gurugram",
      lat: 28.4950,
      lng: 77.0895
    },
    travelDate: "2026-10-23",
    departureTime: "17:30",
    passengerCount: 1,
    luggageCount: 1,
    status: "in_progress",
    assignedDriverId: "drv_vikram",
    assignedVehicleId: "veh_innova",
    driverName: "Vikram Singh Shekhawat",
    driverPhone: "+91 98299 88776",
    driverRating: 4.92,
    vehiclePlate: "RJ 14 TC 8821",
    vehicleModel: "Toyota Innova Crysta",
    fare: 2150,
    privateFare: 3650,
    savingsAmount: 1500,
    savingsPct: 41,
    coPassenger: {
      id: "usr_rohan",
      name: "Rohan Sharma",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 4.9,
      verified: true
    },
    otp: "7824",
    currentLocation: {
      lat: 27.8872,
      lng: 76.2825,
      checkpoint: "Behror Midway Plaza (NH 48)"
    },
    etaMinutes: 65,
    createdAt: "2026-10-23T16:00:00Z"
  },

  // --- RECENT COMPLETED RIDE (Ready for Review Testing) ---
  {
    id: "ride_110_completed",
    userId: "usr_rohan",
    passengerName: "Rohan Sharma",
    passengerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    journeyType: "outstation",
    rideType: "shared",
    pickup: {
      id: "loc_jpr_station",
      name: "Jaipur Junction Railway Station",
      address: "Station Road, Gopalbari, Jaipur",
      lat: 26.9196,
      lng: 75.7878
    },
    dropoff: {
      id: "loc_ajm_station",
      name: "Ajmer Junction Railway Station",
      address: "Station Road, Topdara, Ajmer",
      lat: 26.4542,
      lng: 74.6391
    },
    travelDate: "2026-10-22",
    departureTime: "09:00",
    passengerCount: 1,
    luggageCount: 1,
    status: "completed",
    assignedDriverId: "drv_manoj",
    assignedVehicleId: "veh_dzire",
    driverName: "Manoj Sharma",
    driverRating: 4.85,
    vehiclePlate: "DL 01 ZB 4590",
    vehicleModel: "Maruti Suzuki Dzire",
    fare: 980,
    privateFare: 1620,
    savingsAmount: 640,
    savingsPct: 40,
    coPassenger: {
      id: "usr_priya",
      name: "Priya Patel",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      rating: 4.8,
      verified: true
    },
    completedAt: "2026-10-22T11:45:00Z",
    hasReviewedCoPassenger: false
  }
];

export const INITIAL_MATCHES = [
  {
    id: "match_jpr_del_01",
    rideAId: "ride_101",
    rideBId: "ride_102",
    passengerAName: "Rohan Sharma",
    passengerBName: "Priya Patel",
    passengerAId: "usr_rohan",
    passengerBId: "usr_priya",
    passengerAAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    passengerBAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    journeyType: "interstate",
    routeTitle: "Jaipur Central & Ajmer Road to Delhi IGI Airport (DEL T3)",
    score: 94,
    status: "pending_acceptance",
    acceptedByA: true, // Rohan already accepted
    acceptedByB: false, // Waiting for Priya to accept!
    reasons: [
      "Pickups are 3.8 km apart along the western exit corridor of Jaipur (under 8 min drive).",
      "Both routes travel Northeast along NH48 with 95% highway corridor overlap.",
      "Departure times align within 15 minutes (7:00 AM & 7:15 AM).",
      "Optimal sequence: Pick Rohan at Jaipur Station -> Pick Priya at Ajmer Rd Bypass -> Drop at Delhi IGI T3.",
      "Detour is only +11 minutes for Rohan and +4 minutes for Priya.",
      "Combined passenger count: 2 / 6 seats. Plenty of luggage room in Toyota Innova Crysta."
    ],
    pricing: {
      passengerA: {
        passengerId: "usr_rohan",
        name: "Rohan Sharma",
        privateFare: 3850,
        sharedFare: 2420,
        savingsAmount: 1430,
        savingsPct: 37,
        detourMinutes: 11
      },
      passengerB: {
        passengerId: "usr_priya",
        name: "Priya Patel",
        privateFare: 3700,
        sharedFare: 2320,
        savingsAmount: 1380,
        savingsPct: 37,
        detourMinutes: 4
      },
      totalPassengerCollected: 4740,
      driverPayout: 4076,
      platformFee: 664,
      totalCo2SavedKg: 44.5
    },
    waypoints: [
      { order: 1, type: "pickup", passenger: "Rohan Sharma", locationName: "Jaipur Junction Railway Station", time: "07:00 AM" },
      { order: 2, type: "pickup", passenger: "Priya Patel", locationName: "Ajmer Road / 200 Ft Bypass", time: "07:18 AM" },
      { order: 3, type: "dropoff", passenger: "Shared Drop", locationName: "Delhi IGI Airport (DEL) Terminal 3", time: "11:45 AM" }
    ],
    vehicleRecommendation: {
      model: "Toyota Innova Crysta",
      category: "SUV (6 Seats)",
      driverName: "Vikram Singh Shekhawat",
      driverRating: 4.92
    },
    createdAt: "2026-10-23T18:16:00Z"
  }
];

export const INITIAL_REVIEWS = [
  {
    id: "rev_1",
    bookingId: "ride_110_completed",
    reviewerId: "usr_priya",
    reviewerName: "Priya Patel",
    reviewerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    targetPassengerId: "usr_rohan",
    tripRoute: "Jaipur to Ajmer",
    tripDate: "2026-10-22",
    ratings: {
      punctuality: 5,
      courtesy: 5,
      communication: 5,
      cleanliness: 5,
      overall: 5
    },
    tags: ["On time", "Polite", "Respectful", "Quiet"],
    comment: "Rohan was ready at the exact pickup spot and time. Very polite, respected quiet travel time during the highway drive. Would gladly share a cab again!",
    createdAt: "2026-10-22T14:30:00Z"
  },
  {
    id: "rev_2",
    bookingId: "ride_prev_09",
    reviewerId: "usr_amit",
    reviewerName: "Amit Verma",
    reviewerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    targetPassengerId: "usr_rohan",
    tripRoute: "Jaipur to Delhi Cyber City",
    tripDate: "2026-10-14",
    ratings: {
      punctuality: 5,
      courtesy: 5,
      communication: 4,
      cleanliness: 5,
      overall: 4.8
    },
    tags: ["On time", "Good communicator", "Polite"],
    comment: "Great co-passenger! Kept the cab clean and we split the highway tolls seamlessly through the app.",
    createdAt: "2026-10-14T18:00:00Z"
  },
  {
    id: "rev_3",
    bookingId: "ride_prev_08",
    reviewerId: "usr_sneha",
    reviewerName: "Dr. Sneha Kulkarni",
    reviewerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    targetPassengerId: "usr_priya",
    tripRoute: "Jaipur WTP to Delhi IGI Airport",
    tripDate: "2026-10-08",
    ratings: {
      punctuality: 5,
      courtesy: 5,
      communication: 5,
      cleanliness: 5,
      overall: 5
    },
    tags: ["On time", "Professional", "Friendly"],
    comment: "Priya is an ideal ride-sharing companion. Very professional and respectful.",
    createdAt: "2026-10-08T16:15:00Z"
  }
];

export const INITIAL_SAFETY_INCIDENTS = [
  {
    id: "inc_1",
    reporterId: "usr_priya",
    reporterName: "Priya Patel",
    reportedUserId: "usr_demo_bad",
    reportedUserName: "Gaurav S.",
    bookingId: "ride_sample_historical",
    category: "courtesy",
    severity: "low",
    description: "Passenger was talking loudly on phone on speaker mode during a 3-hour journey despite polite requests.",
    status: "investigating",
    adminNotes: "Warning issued to user on ride etiquette policies.",
    createdAt: "2026-10-19T10:15:00Z"
  }
];
