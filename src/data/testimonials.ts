export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  programTaken: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Ajay Kushwaha",
    role: "Sustainability Manager",
    company: "EcoIndustries Corp",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    content: "EWS transformed our sustainability efforts with their expert guidance and tailored training. Their support has helped us meet compliance and lead in corporate responsibility. We couldn't be happier with the partnership!",
    rating: 5,
    programTaken: "Waste Management & Recycling Programs"
  },
  {
    id: "test-2",
    name: "Priya Sundaram",
    role: "Head of Environment, Health & Safety (EHS)",
    company: "Apex Tech Campuses",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    content: "The corporate sustainability masterclass gave our board the exact metrics needed for our BRSR report. The custom interactive modules for our 4,000+ employees increased waste segregation compliance to 99%.",
    rating: 5,
    programTaken: "Corporate Sustainability & ESG Strategy"
  },
  {
    id: "test-3",
    name: "Rohan Varma",
    role: "Plant Operations Director",
    company: "GreenPack Manufacturing Ltd",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    content: "Navigating EPR plastic credits was a compliance nightmare before we enrolled our procurement team with EWS. Their practical audit checklists saved us both penalties and months of confusion.",
    rating: 5,
    programTaken: "Circular Economy & Extended Producer Responsibility"
  }
];

export interface Partner {
  name: string;
  logo: string;
  category?: string;
}

export const PARTNERS: Partner[] = [
  { name: "EcoCorp Global", logo: "🌿 EcoCorp Global", category: "Manufacturing" },
  { name: "CleanTech India", logo: "⚡ CleanTech India", category: "Renewables" },
  { name: "Circular Manufacturing Council", logo: "🔄 Circular Council", category: "Industry Body" },
  { name: "Green Campus Initiative", logo: "🏛️ Green Campus", category: "Institutions" },
  { name: "Sustainable Industry Alliance", logo: "🌐 Sustainability Alliance", category: "ESG Consortium" }
];
