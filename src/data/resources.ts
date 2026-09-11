export interface Resource {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Sustainability" | "Waste Management" | "EPR & Policy" | "Corporate ESG" | "Case Study";
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  downloadablePdf?: {
    title: string;
    size: string;
  };
  content: string;
}

export const RESOURCES: Resource[] = [
  {
    id: "res-1",
    slug: "navigating-brsr-core-guidelines-india",
    title: "Navigating BRSR Core Guidelines: A Roadmap for Indian Enterprises",
    excerpt: "Demystifying SEBI's mandatory Business Responsibility and Sustainability Reporting (BRSR) Core framework and how companies can achieve verifiable ESG disclosures.",
    category: "Corporate ESG",
    readTime: "6 min read",
    publishedAt: "August 12, 2025",
    author: {
      name: "Ananya Deshmukh",
      role: "Global ESG Strategist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    downloadablePdf: {
      title: "BRSR_Compliance_Whitepaper_EWS.pdf",
      size: "3.2 MB"
    },
    content: `
## The Shift from Voluntary CSR to Mandatory ESG Disclosures

The Securities and Exchange Board of India (SEBI) has transformed the corporate sustainability landscape by mandating the **Business Responsibility and Sustainability Reporting (BRSR) Core** framework for the top listed entities in India. 

Unlike traditional corporate social responsibility (CSR) spend reports, BRSR demands **verifiable, quantitative data** covering environmental KPIs, greenhouse gas emissions, water stewardship, waste diversion, and ethical supply chain governance.

### The 9 Essential BRSR Principles

1. **Integrity & Ethics**: Conducting business with transparency and accountability.
2. **Product Lifecycle Sustainability**: Designing goods and services that are safe and resource-efficient.
3. **Employee Wellbeing**: Ensuring equitable health, safety, and upskilling opportunities.
4. **Stakeholder Inclusiveness**: Prioritizing marginalized and vulnerable groups.
5. **Human Rights**: Upholding dignity across direct operations and tier-1 vendor supply chains.
6. **Environmental Stewardship**: Measurable targets for emissions, water, waste, and biodiversity.
7. **Responsible Public Policy Engagement**: Transparent advocacy without conflicting lobbying.
8. **Inclusive Growth**: Meaningful community enrichment and equitable development.
9. **Consumer Value**: Truthful marketing, data privacy, and fair consumer protection.

### How EWS Learning Helps Corporations Prepare

Through our customized **Corporate Sustainability Programs**, EWS Learning delivers hands-on masterclasses for CXOs, internal audit teams, and sustainability heads. We provide the mathematical models, activity data templates, and employee engagement strategies needed to ensure 100% compliance without operational friction.
    `
  },
  {
    id: "res-2",
    slug: "zero-waste-to-landfill-roadmap",
    title: "The Zero-Waste-to-Landfill Blueprint for Industrial Campuses",
    excerpt: "How modern manufacturing facilities can divert 95%+ of solid and organic waste through 5-stream segregation, onsite composting, and authorized circular partnerships.",
    category: "Waste Management",
    readTime: "8 min read",
    publishedAt: "July 28, 2025",
    author: {
      name: "Dr. Rajeshwar Rao",
      role: "Lead Environmental Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    coverImage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80",
    downloadablePdf: {
      title: "Zero_Waste_Campus_Blueprint_2025.pdf",
      size: "4.8 MB"
    },
    content: `
## Why 'Zero Waste to Landfill' is a Financial Asset, Not a Cost Center

For decades, industrial waste was treated as a disposable nuisance with associated hauling fees. Today, forward-thinking manufacturers are turning waste into a resource stream, generating secondary revenue while drastically cutting municipal disposal tariffs.

### The 5-Stream Segregation Hierarchy

1. **Organic / Biodegradable Waste**: Cafeteria food scraps, garden trimmings — diverted to onsite aerobic composters or biomethanation plants.
2. **Dry Recyclables**: Cardboard, HDPE plastics, aluminium cans, and paper — bailed and sold directly to certified recyclers.
3. **E-Waste & Batteries**: Segregated under strict storage conditions and handed exclusively to authorized R2-certified e-waste recyclers.
4. **Hazardous & Industrial Chemical Sludge**: Managed under Form 10 hazardous manifest compliance protocols.
5. **Non-Recyclable Combustible Inerts**: Refuse-Derived Fuel (RDF) sent to waste-to-energy or cement kilns for co-processing.

### Implementing Behavioral Training

Technology and bins alone do not achieve zero waste. The true bottleneck is human compliance. EWS Learning's workforce training modules train floor supervisors and ground staff with bilingual, visual micro-nudges that increase segregation compliance from 40% to over 98% within 60 days.
    `
  },
  {
    id: "res-3",
    slug: "plastic-waste-management-epr-credits-guide",
    title: "Mastering Plastic EPR Credits & CPCB Compliance in 2025",
    excerpt: "A practical guide for Producers, Importers, and Brand Owners (PIBOs) to meet Extended Producer Responsibility targets and avoid heavy environmental compensation fines.",
    category: "EPR & Policy",
    readTime: "5 min read",
    publishedAt: "June 15, 2025",
    author: {
      name: "Dr. Rajeshwar Rao",
      role: "Lead Environmental Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    coverImage: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=1000&q=80",
    content: `
## Demystifying Plastic Waste Management (PWM) Rules

Under India's Plastic Waste Management Rules, brand owners and packaging manufacturers are legally obligated to collect and recycle a defined percentage of the plastic packaging they introduce into the market.

Failure to register on the Central Pollution Control Board (CPCB) portal or meet mandated recycling quotas triggers steep **Environmental Compensation (EC)** penalties.

### Key Action Items for PIBOs

- **Category Categorization**: Classify packaging into Category I (Rigid), Category II (Flexible single/multi-layer), Category III (Multi-layered plastic), and Category IV (Compostable plastic).
- **Credit Procurement**: Partnering exclusively with validated Plastic Waste Processors (PWPs) registered on the national portal.
- **Traceability Auditing**: Ensuring digital QR code manifests verify that recycling actually occurred.
    `
  }
];
