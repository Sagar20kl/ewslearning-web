export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  isFreePreview?: boolean;
  summary: string;
  resources?: { name: string; url: string; size: string }[];
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  sector: "Corporate" | "Industrial" | "Municipal" | "Universal";
  mode: "Online" | "Offline" | "Hybrid";
  duration: string;
  level: "Beginner" | "Intermediate" | "Executive / Professional";
  rating: number;
  reviewCount: number;
  enrolledCount: number;
  featured?: boolean;
  badge?: string;
  coverImage: string;
  priceINR: number;
  priceUSD: number;
  instructor: {
    name: string;
    role: string;
    avatar: string;
    organization: string;
  };
  highlights: string[];
  learningOutcomes: string[];
  targetAudience: string[];
  prerequisites: string[];
  curriculum: Module[];
}

export const PROGRAMS: Program[] = [
  {
    id: "1",
    slug: "waste-management-recycling",
    title: "Waste Management & Recycling Programs",
    tagline: "Comprehensive hands-on training for segregation, circular recovery, and compliance.",
    description: "Equip your organization with actionable methodologies to eliminate landfill waste, implement source segregation, optimize recycling supply chains, and meet municipal compliance mandates with measurable ROI.",
    sector: "Industrial",
    mode: "Hybrid",
    duration: "2 to 8 hours",
    level: "Intermediate",
    rating: 4.9,
    reviewCount: 142,
    enrolledCount: 1850,
    featured: true,
    badge: "Most Popular",
    coverImage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
    priceINR: 4999,
    priceUSD: 69,
    instructor: {
      name: "Dr. Rajeshwar Rao",
      role: "Lead Environmental Engineer & Circular Economy Advisor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      organization: "EWS Advisory Council"
    },
    highlights: [
      "Customizable based on specific industry sector (Manufacturing, FMCG, IT Parks)",
      "Tailored to team size (10 to 500+ employees)",
      "Includes audit templates, EPR compliance checklists, and digital certifications"
    ],
    learningOutcomes: [
      "Design zero-waste-to-landfill operational protocols",
      "Understand Extended Producer Responsibility (EPR) legal frameworks",
      "Deploy smart IoT-driven waste tracking and segregation metrics",
      "Reduce disposal overheads while increasing recycled resource revenue"
    ],
    targetAudience: [
      "Sustainability Managers & EHS Officers",
      "Facility Heads & Operations Directors",
      "Corporate CSR Teams & Green Campus Committees"
    ],
    prerequisites: [
      "No prior environmental engineering degree required. Basic familiarity with corporate operations is beneficial."
    ],
    curriculum: [
      {
        id: "mod-1",
        title: "Module 1: Principles of Modern Waste Auditing & Stream Analysis",
        duration: "45 mins",
        lessons: [
          {
            id: "les-1-1",
            title: "Introduction to Corporate Waste Streams & Regulatory Landscape",
            duration: "12:30",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            isFreePreview: true,
            summary: "Understanding the Indian and global statutory norms around solid, hazardous, and electronic waste.",
            resources: [
              { name: "Waste_Audit_Toolkit_2025.pdf", url: "#", size: "2.4 MB" },
              { name: "Compliance_Checklist.xlsx", url: "#", size: "850 KB" }
            ]
          },
          {
            id: "les-1-2",
            title: "Conducting Source Segregation Audits & Material Flow Analysis",
            duration: "18:45",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            isFreePreview: false,
            summary: "Step-by-step framework to quantify organic, dry recyclable, sanitary, and inert waste output."
          },
          {
            id: "les-1-3",
            title: "Key Performance Indicators (KPIs) for Waste Diversion",
            duration: "14:15",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            isFreePreview: false,
            summary: "How to calculate diversion rate, carbon offset metrics, and cost recovery per tonne."
          }
        ]
      },
      {
        id: "mod-2",
        title: "Module 2: Recycling Technology & Vendor Integration",
        duration: "1 hr 15 mins",
        lessons: [
          {
            id: "les-2-1",
            title: "Vetting Authorized Recyclers and Chain of Custody Verification",
            duration: "22:10",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            isFreePreview: false,
            summary: "Preventing illegal dumping and ensuring full transparency with authorized recyclers."
          },
          {
            id: "les-2-2",
            title: "Composting & Bio-Methanation for Organic Campus Waste",
            duration: "25:00",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            isFreePreview: false,
            summary: "Practical onsite composting systems, vermicomposting, and anaerobic digesters."
          },
          {
            id: "les-2-3",
            title: "Plastic Waste Management Rules & EPR Certificate Procurement",
            duration: "28:30",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            isFreePreview: false,
            summary: "Navigating CPCB/SPCB portal filing and EPR credits."
          }
        ]
      },
      {
        id: "mod-3",
        title: "Module 3: Employee Behavioral Change & Sustainable Workspaces",
        duration: "50 mins",
        lessons: [
          {
            id: "les-3-1",
            title: "Gamification & Green Nudge Interventions",
            duration: "20:15",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            isFreePreview: false,
            summary: "Driving high compliance among desk employees, cafeteria staff, and maintenance crews."
          },
          {
            id: "les-3-2",
            title: "Final Assessment & Action Plan Blueprint",
            duration: "30:00",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            isFreePreview: false,
            summary: "Draft your facility's customized 90-day Zero Waste Roadmap to earn certification."
          }
        ]
      }
    ]
  },
  {
    id: "2",
    slug: "corporate-sustainability",
    title: "Corporate Sustainability & ESG Strategy",
    tagline: "Build compliant, profitable, and resilient corporate ESG roadmaps.",
    description: "A comprehensive executive program helping enterprise leaders align with BRSR (Business Responsibility and Sustainability Reporting), GRI standards, GHG Protocol Scope 1/2/3 emissions accounting, and net-zero commitments.",
    sector: "Corporate",
    mode: "Online",
    duration: "4 to 8 hours",
    level: "Executive / Professional",
    rating: 5.0,
    reviewCount: 98,
    enrolledCount: 1240,
    featured: true,
    badge: "Executive Masterclass",
    coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    priceINR: 7999,
    priceUSD: 99,
    instructor: {
      name: "Ananya Deshmukh",
      role: "Global ESG Strategist & Certified GRI Practitioner",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      organization: "EWS Sustainability Board"
    },
    highlights: [
      "SEBI BRSR Core compliance frameworks & disclosures",
      "Scope 1, 2, and 3 Carbon Footprint emission calculators included",
      "Real-world case studies from Tata, Unilever, and Tech Mahindra"
    ],
    learningOutcomes: [
      "Master BRSR reporting requirements and data governance",
      "Formulate Science-Based Targets initiative (SBTi) roadmaps",
      "Integrate ESG metrics into board reporting and investor pitch decks",
      "Mitigate supply chain environmental risks and greenwashing liabilities"
    ],
    targetAudience: [
      "CXOs, Board Members & Corporate Strategy Heads",
      "ESG Analysts, Investor Relations & Legal Counsels",
      "Procurement & Supply Chain Leaders"
    ],
    prerequisites: ["Familiarity with corporate governance and business reporting."],
    curriculum: [
      {
        id: "mod-c1",
        title: "Module 1: Foundations of Corporate ESG & Regulatory Drivers",
        duration: "1 hr 10 mins",
        lessons: [
          {
            id: "les-c1-1",
            title: "The Evolution of ESG from CSR to Core Business Value",
            duration: "18:20",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            isFreePreview: true,
            summary: "Why global investors and regulators are prioritizing sustainability metrics over superficial CSR."
          },
          {
            id: "les-c1-2",
            title: "BRSR Framework Deep Dive: 9 Principles of Responsible Business",
            duration: "25:40",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            isFreePreview: false,
            summary: "Detailed review of mandatory leadership indicators and core KPIs."
          }
        ]
      },
      {
        id: "mod-c2",
        title: "Module 2: Carbon Accounting & Net-Zero Strategy",
        duration: "1 hr 45 mins",
        lessons: [
          {
            id: "les-c2-1",
            title: "Calculating Scope 1, 2, and 3 GHG Emissions",
            duration: "32:15",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            isFreePreview: false,
            summary: "Applying emission factors, activity data, and GHG Protocol standards."
          },
          {
            id: "les-c2-2",
            title: "Setting Science-Based Targets (SBTi) and Carbon Offsetting",
            duration: "28:50",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            isFreePreview: false,
            summary: "High-integrity carbon credits vs actual operational decarbonization."
          }
        ]
      }
    ]
  },
  {
    id: "3",
    slug: "sustainable-workforces",
    title: "Sustainable Workforces & Green Skills",
    tagline: "Empowering everyday employees to champion climate action and green practices.",
    description: "Foster an organization-wide culture of sustainability. This interactive course transforms passive employees into proactive green ambassadors, reducing workplace energy usage, water consumption, and single-use plastics.",
    sector: "Universal",
    mode: "Online",
    duration: "2 to 4 hours",
    level: "Beginner",
    rating: 4.8,
    reviewCount: 215,
    enrolledCount: 3400,
    featured: true,
    badge: "All Employees",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    priceINR: 2499,
    priceUSD: 39,
    instructor: {
      name: "Vikram Malhotra",
      role: "Director of People & Cultural Transformation",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      organization: "EWS Learning Faculty"
    },
    highlights: [
      "Bite-sized, engaging micro-lessons suitable for all staff tiers",
      "Interactive quizzes and green badge certification upon completion",
      "Includes departmental green challenge templates"
    ],
    learningOutcomes: [
      "Identify everyday energy and resource waste in office/remote workspaces",
      "Adopt sustainable procurement habits and low-carbon commuting options",
      "Champion internal green committees and sustainability initiatives"
    ],
    targetAudience: [
      "All Corporate Employees, New Hires, and Remote Teams",
      "HR & Employee Engagement Leaders",
      "Green Campus Student Leaders"
    ],
    prerequisites: ["None. Designed for everyone regardless of technical background."],
    curriculum: [
      {
        id: "mod-s1",
        title: "Module 1: Everyday Climate Action in the Workplace",
        duration: "40 mins",
        lessons: [
          {
            id: "les-s1-1",
            title: "Your Personal & Digital Carbon Footprint",
            duration: "10:15",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            isFreePreview: true,
            summary: "Surprising impacts of email storage, video streaming, and office power standby."
          },
          {
            id: "les-s1-2",
            title: "Smart Energy & Water Conservation Hacks",
            duration: "14:30",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            isFreePreview: false,
            summary: "Practical behavioral changes that slash utility bills."
          }
        ]
      }
    ]
  },
  {
    id: "4",
    slug: "circular-economy-epr",
    title: "Circular Economy & Extended Producer Responsibility (EPR)",
    tagline: "Transitioning manufacturing from linear 'take-make-waste' to closed loops.",
    description: "Detailed regulatory and operational training for packaging engineers, brand owners, and recyclers on mastering EPR compliance, circular product design, and post-consumer recycled (PCR) resin adoption.",
    sector: "Industrial",
    mode: "Hybrid",
    duration: "4 to 8 hours",
    level: "Intermediate",
    rating: 4.9,
    reviewCount: 67,
    enrolledCount: 890,
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    priceINR: 5999,
    priceUSD: 79,
    instructor: {
      name: "Dr. Rajeshwar Rao",
      role: "Lead Environmental Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      organization: "EWS Advisory Council"
    },
    highlights: [
      "Deep dive into Plastic Waste Management (PWM) Rules & E-Waste Management Rules",
      "Circular packaging redesign principles",
      "Auditing formal vs informal collection channels"
    ],
    learningOutcomes: [
      "Understand EPR liability calculation matrices",
      "Source certified PCR materials for sustainable packaging",
      "Build collaborative take-back and buy-back consumer schemes"
    ],
    targetAudience: [
      "Packaging Designers & Material Sourcing Managers",
      "FMCG Brand Owners & Importers",
      "Waste Management Aggregators & Recyclers"
    ],
    prerequisites: ["Basic knowledge of product lifecycle or supply chain."],
    curriculum: [
      {
        id: "mod-e1",
        title: "Module 1: EPR Regulatory Compliance & Filing",
        duration: "1 hr",
        lessons: [
          {
            id: "les-e1-1",
            title: "CPCB Portal Registration and EPR Credit Trading",
            duration: "24:00",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            isFreePreview: true,
            summary: "Step-by-step guidance on registering as PIBO (Producer, Importer, Brand Owner)."
          }
        ]
      }
    ]
  }
];
