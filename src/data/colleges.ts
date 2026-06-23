export interface Course {
  name: string;
  fees: string;
  eligibility: string;
  duration: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  course: string;
}

export interface College {
  id: string;
  name: string;
  logo: string;
  bannerImage: string;
  location: string;
  state: string;
  rating: number;
  ownership: 'Public' | 'Private';
  established: number;
  fees: number; // Avg annual fee (numerical for filters)
  placementAverage: number; // in LPA
  placementHighest: number; // in LPA
  streams: ('Engineering' | 'Management' | 'Medical' | 'Law')[];
  courses: Course[];
  facilities: string[];
  gallery: string[];
  reviews: Review[];
  cutoffs: {
    [exam: string]: {
      minRank: number;
      maxRank: number;
    };
  };
}

export const mockColleges: College[] = [
  {
    id: "iit-bombay",
    name: "Indian Institute of Technology (IIT), Bombay",
    logo: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%231e3a8a'/%3E%3Ccircle cx='50' cy='50' r='42' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3Ctext x='50' y='54' font-family='sans-serif' font-size='14' font-weight='bold' fill='%23ffffff' text-anchor='middle'%3EIITB%3C/text%3E%3Cpath d='M50 20 L53 35 L68 35 L56 44 L60 59 L50 50 L40 59 L44 44 L32 35 L47 35 Z' fill='%23eab308' opacity='0.2'/%3E%3C/svg%3E",
    bannerImage: "/colleges/iit-bombay-banner.png",
    location: "Mumbai",
    state: "Maharashtra",
    rating: 4.9,
    ownership: "Public",
    established: 1958,
    fees: 220000,
    placementAverage: 21.82,
    placementHighest: 168.0,
    streams: ["Engineering", "Management"],
    courses: [
      { name: "B.Tech Computer Science & Engineering", fees: "₹2,10,000 / yr", eligibility: "10+2 with JEE Advanced", duration: "4 Years" },
      { name: "B.Tech Electrical Engineering", fees: "₹2,10,000 / yr", eligibility: "10+2 with JEE Advanced", duration: "4 Years" },
      { name: "B.Tech Mechanical Engineering", fees: "₹2,10,000 / yr", eligibility: "10+2 with JEE Advanced", duration: "4 Years" },
      { name: "Master of Business Administration (MBA)", fees: "₹4,00,000 / yr", eligibility: "Graduation + CAT", duration: "2 Years" }
    ],
    facilities: ["Supercomputing Lab", "Smart Classrooms", "Modern Hostels", "Olympic-sized Pool", "Gymnasium", "Startup Incubator"],
    gallery: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80"
    ],
    reviews: [
      { id: "r1", userName: "Aditya Sharma", rating: 5, comment: "Unparalleled peer group and world-class academic environment. The coding culture is outstanding.", date: "2026-04-12", course: "B.Tech Computer Science" },
      { id: "r2", userName: "Neha Patil", rating: 4.8, comment: "Hostel rooms could be upgraded, but the campus life, festivals (Mood Indigo), and placement opportunities make up for everything.", date: "2026-05-01", course: "B.Tech Electrical Engineering" }
    ],
    cutoffs: {
      "JEE Mains": { minRank: 1, maxRank: 500 }
    }
  },
  {
    id: "bits-pilani",
    name: "Birla Institute of Technology and Science (BITS), Pilani",
    logo: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%230284c7'/%3E%3Ccircle cx='50' cy='50' r='42' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3Ctext x='50' y='54' font-family='sans-serif' font-size='14' font-weight='bold' fill='%23ffffff' text-anchor='middle'%3EBITS%3C/text%3E%3C/svg%3E",
    bannerImage: "/colleges/bits-pilani-banner.png",
    location: "Pilani",
    state: "Rajasthan",
    rating: 4.7,
    ownership: "Private",
    established: 1964,
    fees: 520000,
    placementAverage: 18.25,
    placementHighest: 60.75,
    streams: ["Engineering", "Management"],
    courses: [
      { name: "B.E. Computer Science & Engineering", fees: "₹5,40,000 / yr", eligibility: "10+2 with BITSAT", duration: "4 Years" },
      { name: "B.E. Electronics & Communication", fees: "₹5,20,000 / yr", eligibility: "10+2 with BITSAT", duration: "4 Years" },
      { name: "M.E. Software Systems", fees: "₹4,80,000 / yr", eligibility: "Graduation + GATE/BITS Test", duration: "2 Years" }
    ],
    facilities: ["Zero Attendance Policy", "Sandbox Labs", "AC Hostels", "Student Union Library", "Multi-sports Arena"],
    gallery: [
      "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1627556704353-016ed9126a56?auto=format&fit=crop&w=600&q=80"
    ],
    reviews: [
      { id: "b1", userName: "Kunal Verma", rating: 4.6, comment: "The 'No Attendance policy' gives immense freedom to pursue side projects, startups, or competitive coding. A bit expensive but worth it.", date: "2026-03-22", course: "B.E. Computer Science" }
    ],
    cutoffs: {
      "JEE Mains": { minRank: 501, maxRank: 2500 }
    }
  },
  {
    id: "iim-ahmedabad",
    name: "Indian Institute of Management (IIM), Ahmedabad",
    logo: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23b91c1c'/%3E%3Ccircle cx='50' cy='50' r='42' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3Ctext x='50' y='54' font-family='sans-serif' font-size='14' font-weight='bold' fill='%23ffffff' text-anchor='middle'%3EIIMA%3C/text%3E%3C/svg%3E",
    bannerImage: "/colleges/iim-ahmedabad-banner.png",
    location: "Ahmedabad",
    state: "Gujarat",
    rating: 4.95,
    ownership: "Public",
    established: 1961,
    fees: 1250000,
    placementAverage: 32.7,
    placementHighest: 115.0,
    streams: ["Management"],
    courses: [
      { name: "PGP in Management (MBA equivalent)", fees: "₹12,50,000 / yr", eligibility: "Graduation + CAT", duration: "2 Years" },
      { name: "PGPX (Executive MBA)", fees: "₹15,00,000 / yr", eligibility: "Graduation + GMAT/GRE + Work Exp", duration: "1 Year" }
    ],
    facilities: ["Harvard Case Study Method", "Iconic Louis Kahn Plaza Campus", "Lending Library", "AC Syndicate Rooms", "Executive Residences"],
    gallery: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1498243691581-b148c3766a16?auto=format&fit=crop&w=600&q=80"
    ],
    reviews: [
      { id: "im1", userName: "Rahul Sen", rating: 5, comment: "Extremely rigorous curriculum. The case study discussions in syndicate groups teach you actual business strategy. Placements are legendary.", date: "2026-02-15", course: "PGP Management" }
    ],
    cutoffs: {
      "CAT": { minRank: 1, maxRank: 150 }
    }
  },
  {
    id: "xlri-jamshedpur",
    name: "XLRI – Xavier School of Management",
    logo: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%230f172a'/%3E%3Ccircle cx='50' cy='50' r='42' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3Ctext x='50' y='54' font-family='sans-serif' font-size='14' font-weight='bold' fill='%23ffffff' text-anchor='middle'%3EXLRI%3C/text%3E%3C/svg%3E",
    bannerImage: "/colleges/xlri-jamshedpur-banner.png",
    location: "Jamshedpur",
    state: "Jharkhand",
    rating: 4.8,
    ownership: "Private",
    established: 1949,
    fees: 1100000,
    placementAverage: 30.1,
    placementHighest: 75.0,
    streams: ["Management"],
    courses: [
      { name: "PGDM Human Resource Management", fees: "₹11,00,000 / yr", eligibility: "Graduation + XAT/GMAT", duration: "2 Years" },
      { name: "PGDM Business Management", fees: "₹11,00,000 / yr", eligibility: "Graduation + XAT/GMAT", duration: "2 Years" }
    ],
    facilities: ["Specialized Behavioral Lab", "Modern Lecture Halls", "Sports Complex", "Green Campus", "Global Student Exchange"],
    gallery: [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
    ],
    reviews: [
      { id: "xl1", userName: "Aishwarya Rai", rating: 4.8, comment: "The best HR course in Asia. The culture of XLRI is highly cooperative and down to earth. Placements are 100%.", date: "2026-05-18", course: "PGDM HRM" }
    ],
    cutoffs: {
      "CAT": { minRank: 151, maxRank: 600 }
    }
  },
  {
    id: "aiims-delhi",
    name: "All India Institute of Medical Sciences (AIIMS), New Delhi",
    logo: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%230d9488'/%3E%3Ccircle cx='50' cy='50' r='42' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3Ctext x='50' y='54' font-family='sans-serif' font-size='13' font-weight='bold' fill='%23ffffff' text-anchor='middle'%3EAIIMS%3C/text%3E%3C/svg%3E",
    bannerImage: "/colleges/aiims-delhi-banner.png",
    location: "New Delhi",
    state: "Delhi",
    rating: 4.97,
    ownership: "Public",
    established: 1956,
    fees: 1628, // Nominal Indian fee
    placementAverage: 24.0, // Calculated as medical practice packages
    placementHighest: 50.0,
    streams: ["Medical"],
    courses: [
      { name: "Bachelor of Medicine, Bachelor of Surgery (MBBS)", fees: "₹1,628 / yr", eligibility: "10+2 with NEET", duration: "5.5 Years" },
      { name: "M.D. General Medicine", fees: "₹2,200 / yr", eligibility: "MBBS + INI-CET", duration: "3 Years" }
    ],
    facilities: ["AIIMS Hospital Access", "Advanced Pathology Labs", "Simulation Research Center", "Subsidized Food courts", "Central Library"],
    gallery: [
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=600&q=80"
    ],
    reviews: [
      { id: "ai1", userName: "Dr. Vikas Kumar", rating: 5, comment: "Highly subsidized premium medical education. The clinical exposure is massive because of the patient footfall in AIIMS OPD.", date: "2026-01-30", course: "MBBS" }
    ],
    cutoffs: {
      "NEET": { minRank: 1, maxRank: 100 }
    }
  },
  {
    id: "cmc-vellore",
    name: "Christian Medical College (CMC), Vellore",
    logo: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%234f46e5'/%3E%3Ccircle cx='50' cy='50' r='42' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3Ctext x='50' y='54' font-family='sans-serif' font-size='14' font-weight='bold' fill='%23ffffff' text-anchor='middle'%3ECMC%3C/text%3E%3C/svg%3E",
    bannerImage: "/colleges/cmc-vellore-banner.png",
    location: "Vellore",
    state: "Tamil Nadu",
    rating: 4.8,
    ownership: "Private",
    established: 1900,
    fees: 48000,
    placementAverage: 14.5,
    placementHighest: 28.0,
    streams: ["Medical"],
    courses: [
      { name: "Bachelor of Medicine, Bachelor of Surgery (MBBS)", fees: "₹48,300 / yr", eligibility: "10+2 with NEET", duration: "5.5 Years" },
      { name: "B.Sc Nursing", fees: "₹24,000 / yr", eligibility: "10+2 with Board Exams", duration: "4 Years" }
    ],
    facilities: ["Specialty Hospital Labs", "Rural Health Centers", "Eco-friendly Hostels", "Student Counseling Cell"],
    gallery: [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80"
    ],
    reviews: [
      { id: "cm1", userName: "Diana Grace", rating: 4.7, comment: "Very compassionate clinical teaching style. Emphasis is placed on ethical patient care and community health.", date: "2026-04-05", course: "MBBS" }
    ],
    cutoffs: {
      "NEET": { minRank: 101, maxRank: 1000 }
    }
  },
  {
    id: "nls-bangalore",
    name: "National Law School of India University (NLSIU), Bangalore",
    logo: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%231e3a8a'/%3E%3Ccircle cx='50' cy='50' r='42' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3Ctext x='50' y='54' font-family='sans-serif' font-size='13' font-weight='bold' fill='%23ffffff' text-anchor='middle'%3ENLSIU%3C/text%3E%3C/svg%3E",
    bannerImage: "/colleges/nls-bangalore-banner.png",
    location: "Bengaluru",
    state: "Karnataka",
    rating: 4.9,
    ownership: "Public",
    established: 1986,
    fees: 320000,
    placementAverage: 16.0,
    placementHighest: 25.0,
    streams: ["Law"],
    courses: [
      { name: "B.A. LL.B. (Hons)", fees: "₹3,20,000 / yr", eligibility: "10+2 with CLAT", duration: "5 Years" },
      { name: "LL.M. (Master of Laws)", fees: "₹2,80,000 / yr", eligibility: "LL.B. + CLAT PG", duration: "1 Year" }
    ],
    facilities: ["Moot Court Hall", "Extensive Legal Library", "Residential campus", "Legal Aid Clinic", "Debating Society Hub"],
    gallery: [
      "https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80"
    ],
    reviews: [
      { id: "n1", userName: "Vikramaditya Hegde", rating: 4.9, comment: "The Harvard of the East for legal studies. Highly demanding trimester system, but placements in tier-1 law firms are almost guaranteed.", date: "2026-03-10", course: "B.A. LL.B. (Hons)" }
    ],
    cutoffs: {
      "CLAT": { minRank: 1, maxRank: 100 }
    }
  },
  {
    id: "symbiosis-law-pune",
    name: "Symbiosis Law School (SLS), Pune",
    logo: "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23800000'/%3E%3Ccircle cx='50' cy='50' r='42' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3Ctext x='50' y='54' font-family='sans-serif' font-size='14' font-weight='bold' fill='%23ffffff' text-anchor='middle'%3ESLS%3C/text%3E%3C/svg%3E",
    bannerImage: "/colleges/symbiosis-pune-banner.png",
    location: "Pune",
    state: "Maharashtra",
    rating: 4.4,
    ownership: "Private",
    established: 1977,
    fees: 440000,
    placementAverage: 9.8,
    placementHighest: 18.0,
    streams: ["Law"],
    courses: [
      { name: "B.A. LL.B. (Hons)", fees: "₹4,40,000 / yr", eligibility: "10+2 with SLAT", duration: "5 Years" },
      { name: "B.B.A. LL.B. (Hons)", fees: "₹4,40,000 / yr", eligibility: "10+2 with SLAT", duration: "5 Years" }
    ],
    facilities: ["Moot Court Rooms", "Multi-cuisine Cafeteria", "Modern IT Labs", "Gymnasium & Yoga Hall", "Hostels"],
    gallery: [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
    ],
    reviews: [
      { id: "sl1", userName: "Pooja Mehta", rating: 4.3, comment: "Great infrastructure and dynamic student activities. The placement cells works well to connect students with corporate firms.", date: "2026-05-25", course: "B.B.A. LL.B." }
    ],
    cutoffs: {
      "CLAT": { minRank: 101, maxRank: 1000 }
    }
  }
];
