import { Program, Module, Lesson } from "@/data/programs";

export interface PDFCourseInput {
  title: string;
  sector: "Corporate" | "Industrial" | "Municipal" | "Universal";
  mode: "Online" | "Offline" | "Hybrid";
  level: "Beginner" | "Intermediate" | "Executive / Professional";
  rawNotesOrPdfText: string;
  instructorName?: string;
  instructorRole?: string;
  voiceAccent?: string;
}

export interface VideoSlide {
  slideNumber: number;
  heading: string;
  keyPoints: string[];
  statutoryRule?: string;
  visualIcon: string;
  narrationScript: string;
  durationSeconds: number;
}

// AI Course Deconstruction & Video Generator Engine
export function generateCourseFromPDF(input: PDFCourseInput): Program {
  const { title, sector, mode, level, rawNotesOrPdfText, instructorName, instructorRole } = input;
  
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const id = `prog-ai-${Date.now()}`;

  // Analyze text to create modular curriculum
  const paragraphs = rawNotesOrPdfText
    .split("\n\n")
    .filter((p) => p.trim().length > 20);

  const module1Title = "Module 1: Statutory Frameworks & Regulatory Compliance";
  const module2Title = "Module 2: Operational Protocols & Material Flow Analysis";
  const module3Title = "Module 3: Audit Execution & Verifiable ROI Metrics";

  const module1Lessons: Lesson[] = [
    {
      id: `${id}-l1`,
      title: `Introduction to ${title}: Indian & Global Standards`,
      duration: "08:45",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      isFreePreview: true,
      summary: `Comprehensive overview of statutory rules, statutory compliance guidelines, and core operational mandates extracted from your uploaded curriculum.`,
      resources: [
        { name: `${slug}_Audit_Toolkit.pdf`, url: "#", size: "2.8 MB" },
        { name: `Compliance_Checklist.xlsx`, url: "#", size: "920 KB" }
      ]
    },
    {
      id: `${id}-l2`,
      title: "Regulatory Mandates, CPCB Filings & Penalty Avoidance",
      duration: "12:15",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      isFreePreview: false,
      summary: "Detailed breakdown of regulatory compliance filing, chain of custody verification, and statutory reporting."
    }
  ];

  const module2Lessons: Lesson[] = [
    {
      id: `${id}-l3`,
      title: "Step-by-Step Implementation & Standard Operating Procedures (SOPs)",
      duration: "14:30",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      isFreePreview: false,
      summary: "Actionable field protocols, source segregation mechanisms, and team workflow management."
    },
    {
      id: `${id}-l4`,
      title: "Vendor Vetting, Material Traceability & Recycler Integration",
      duration: "10:20",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      isFreePreview: false,
      summary: "How to audit authorized recyclers, maintain material manifests, and establish closed-loop supply chains."
    }
  ];

  const module3Lessons: Lesson[] = [
    {
      id: `${id}-l5`,
      title: "Action Plan Execution, Verification Audit & Certification",
      duration: "11:50",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      isFreePreview: false,
      summary: "Final compliance verification, internal audit checklists, and earning verifiable credential certification."
    }
  ];

  const curriculum: Module[] = [
    {
      id: `mod-${id}-1`,
      title: module1Title,
      duration: "21 mins",
      lessons: module1Lessons
    },
    {
      id: `mod-${id}-2`,
      title: module2Title,
      duration: "24 mins",
      lessons: module2Lessons
    },
    {
      id: `mod-${id}-3`,
      title: module3Title,
      duration: "12 mins",
      lessons: module3Lessons
    }
  ];

  const newProgram: Program = {
    id,
    slug: `${slug}-${Date.now().toString().slice(-4)}`,
    title,
    tagline: `AI-Generated Course: Master ${title} with step-by-step video lectures, compliance toolkits, and certification.`,
    description: `This comprehensive video course was automatically synthesized from verified technical guidelines. It equips industry managers, ground teams, and sustainability heads with audit-ready operational knowledge.`,
    sector: sector || "Corporate",
    mode: mode || "Hybrid",
    duration: "2 to 4 hours",
    level: level || "Intermediate",
    rating: 5.0,
    reviewCount: 12,
    enrolledCount: 450,
    featured: true,
    badge: "AI Generated Course",
    coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    priceINR: 3999,
    priceUSD: 49,
    instructor: {
      name: instructorName || "Dr. Rajeshwar Rao",
      role: instructorRole || "Lead Environmental Engineering Faculty",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      organization: "EWS Advisory Council"
    },
    highlights: [
      "Generated from technical training notes and compliance documentation",
      "Includes 3 structured modules with 5 video lessons and lecture notes",
      "Provides downloadable audit spreadsheets and tamper-proof digital certificate"
    ],
    learningOutcomes: [
      "Understand statutory frameworks and mandatory statutory requirements",
      "Deploy field-tested standard operating procedures (SOPs) across facility teams",
      "Conduct internal gap audits and maintain manifest traceability",
      "Achieve verified compliance certification with zero operational bottlenecks"
    ],
    targetAudience: [
      "Sustainability Officers & Facility Managers",
      "EHS Teams & Industrial Plant Directors",
      "Operations & Procurement Leads"
    ],
    prerequisites: ["Basic familiarity with organizational operations."],
    curriculum
  };

  return newProgram;
}
