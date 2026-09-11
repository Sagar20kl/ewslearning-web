export interface SustainabilityEvent {
  id: string;
  title: string;
  date: string; // e.g. "March 22"
  month: "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";
  day: number;
  category: "UN & Global Observance" | "Waste & Recycling" | "Climate & Energy" | "Water & Nature" | "Indian Statutory Compliance";
  sdgGoals: number[]; // e.g. [6, 12, 13]
  tagline: string;
  description: string;
  enterpriseAction: string;
  googleCalendarUrl?: string;
}

export const SUSTAINABILITY_EVENTS: SustainabilityEvent[] = [
  // MARCH
  {
    id: "event-world-wildlife-day",
    title: "World Wildlife Day",
    date: "March 3",
    month: "Mar",
    day: 3,
    category: "Water & Nature",
    sdgGoals: [14, 15],
    tagline: "Connecting People and Planet: Digital Innovation in Wildlife Conservation",
    description: "United Nations day celebrating the world's wild fauna and flora, raising awareness of the benefits of conservation.",
    enterpriseAction: "Audit campus supply chains for deforestation-free sourcing and biodiversity impact assessments."
  },
  {
    id: "event-global-recycling-day",
    title: "Global Recycling Day",
    date: "March 18",
    month: "Mar",
    day: 18,
    category: "Waste & Recycling",
    sdgGoals: [12, 13],
    tagline: "Recognizing the Role of Secondary Recycled Raw Materials",
    description: "Promoting the Seventh Resource (recyclables) to secure the future of our planet's circular economy.",
    enterpriseAction: "Launch an enterprise-wide e-waste and paper recycling drive across corporate headquarters."
  },
  {
    id: "event-world-water-day",
    title: "World Water Day",
    date: "March 22",
    month: "Mar",
    day: 22,
    category: "Water & Nature",
    sdgGoals: [6, 12],
    tagline: "Accelerating Change to Solve the Global Water Crisis",
    description: "UN observance highlighting the importance of freshwater management, wastewater recycling, and water security.",
    enterpriseAction: "Audit cooling tower water meters, inspect rainwater harvesting sumps, and verify zero liquid discharge (ZLD) norms."
  },
  {
    id: "event-international-zero-waste-day",
    title: "International Day of Zero Waste",
    date: "March 30",
    month: "Mar",
    day: 30,
    category: "Waste & Recycling",
    sdgGoals: [11, 12],
    tagline: "Joint UNEP and UN-Habitat Global Circularity Initiative",
    description: "Advancing sustainable consumption and production patterns, encouraging societal transition toward circularity.",
    enterpriseAction: "Conduct a 5-stream waste characterization audit to eliminate single-use plastics from campus cafeterias."
  },

  // APRIL
  {
    id: "event-earth-day",
    title: "Earth Day (World Earth Day)",
    date: "April 22",
    month: "Apr",
    day: 22,
    category: "UN & Global Observance",
    sdgGoals: [12, 13, 14, 15],
    tagline: "Planet vs. Plastics & Global Climate Action",
    description: "The world's largest environmental movement mobilizing over 1 billion people annually for ecological protection.",
    enterpriseAction: "Conduct mandatory employee sustainability upskilling workshops and commit to a 30% campus plastic reduction target."
  },
  {
    id: "event-cpcb-epr-q1-deadline",
    title: "CPCB Plastic EPR Annual Filing Deadline",
    date: "April 30",
    month: "Apr",
    day: 30,
    category: "Indian Statutory Compliance",
    sdgGoals: [12],
    tagline: "Mandatory Central Pollution Control Board Compliance",
    description: "Statutory deadline for Producers, Importers, and Brand Owners (PIBOs) to reconcile annual plastic EPR certificates.",
    enterpriseAction: "Reconcile quarterly packaging invoices with registered Plastic Waste Processors (PWPs) on the CPCB centralized portal."
  },

  // MAY
  {
    id: "event-world-biodiversity-day",
    title: "International Day for Biological Diversity",
    date: "May 22",
    month: "May",
    day: 22,
    category: "Water & Nature",
    sdgGoals: [14, 15],
    tagline: "Be Part of the Plan: Biodiversity Action",
    description: "Raising global awareness of biodiversity issues, ecosystem restoration, and natural habitat conservation.",
    enterpriseAction: "Develop captive native tree micro-forests (Miyawaki forests) on industrial campus perimeters."
  },

  // JUNE
  {
    id: "event-world-environment-day",
    title: "World Environment Day",
    date: "June 5",
    month: "Jun",
    day: 5,
    category: "UN & Global Observance",
    sdgGoals: [11, 12, 13, 14, 15],
    tagline: "The Principal Vehicle of the UN for Environmental Action",
    description: "Led by UNEP since 1973, focusing on land restoration, desertification, and climate resilience.",
    enterpriseAction: "Release your enterprise's annual sustainability report, announce decarbonization targets, and reward green champions."
  },
  {
    id: "event-world-oceans-day",
    title: "World Oceans Day",
    date: "June 8",
    month: "Jun",
    day: 8,
    category: "Water & Nature",
    sdgGoals: [14],
    tagline: "Awakening New Depths in Ocean & Coastal Protection",
    description: "Highlighting the impact of marine plastic debris and the necessity for global coastal cleanup initiatives.",
    enterpriseAction: "Inspect stormwater runoff drains to prevent microplastic and chemical oil discharge into waterways."
  },

  // JULY
  {
    id: "event-plastic-free-july",
    title: "Plastic Free July",
    date: "July 1 – 31",
    month: "Jul",
    day: 1,
    category: "Waste & Recycling",
    sdgGoals: [12, 14],
    tagline: "Global Month of Action to Refuse Single-Use Plastics",
    description: "Global campaign helping millions of individuals and businesses become part of the solution to plastic pollution.",
    enterpriseAction: "Replace all single-use packaging in logistics with reusable corrugated totes and biodegradable fill."
  },

  // SEPTEMBER
  {
    id: "event-clean-air-day",
    title: "International Day of Clean Air for Blue Skies",
    date: "September 7",
    month: "Sep",
    day: 7,
    category: "Climate & Energy",
    sdgGoals: [3, 11, 13],
    tagline: "Invest in Clean Air: Lowering PM2.5 & Ambient Emissions",
    description: "UN observance emphasizing the urgent need to strengthen international cooperation to improve air quality.",
    enterpriseAction: "Calibrate factory boiler bag filters, test DG stack emissions, and enforce EV fleet mandates for internal logistics."
  },
  {
    id: "event-world-ozone-day",
    title: "World Ozone Day",
    date: "September 16",
    month: "Sep",
    day: 16,
    category: "UN & Global Observance",
    sdgGoals: [13],
    tagline: "Montreal Protocol: Advancing Climate Action",
    description: "Commemorating the signing of the Montreal Protocol that successfully phased out ozone-depleting CFC gases.",
    enterpriseAction: "Audit facility HVAC chillers and refrigerants, transitioning from R-22 to low-GWP hydrofluoroolefins (HFOs)."
  },
  {
    id: "event-global-goals-week",
    title: "Global Goals Week & SDG Flag Day",
    date: "September 20 – 29",
    month: "Sep",
    day: 20,
    category: "UN & Global Observance",
    sdgGoals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    tagline: "Accelerating Action for the 17 Sustainable Development Goals",
    description: "Annual week of action and awareness during the UN General Assembly to drive progress toward Agenda 2030.",
    enterpriseAction: "Map corporate CSR budgets and BRSR Section C disclosures directly against UN SDG indicators."
  },

  // OCTOBER
  {
    id: "event-world-habitat-day",
    title: "World Habitat Day",
    date: "October 6",
    month: "Oct",
    day: 6,
    category: "UN & Global Observance",
    sdgGoals: [11],
    tagline: "Engaging Youth to Create a Better Urban Future",
    description: "Reflecting on the state of our towns and cities and on the basic right of all to adequate shelter.",
    enterpriseAction: "Implement Green Building retrofits (IGBC / LEED rating upgrades) across corporate headquarters."
  },
  {
    id: "event-international-e-waste-day",
    title: "International E-Waste Day",
    date: "October 14",
    month: "Oct",
    day: 14,
    category: "Waste & Recycling",
    sdgGoals: [12],
    tagline: "You Can Recycle Anything with a Plug, Battery or Cable!",
    description: "Global campaign to raise the public profile of electronic waste recycling and circular raw material recovery.",
    enterpriseAction: "Retire obsolete IT servers and laptops strictly through authorized R2-certified e-waste recyclers."
  },
  {
    id: "event-world-sustainability-day",
    title: "World Sustainability Day",
    date: "October 28",
    month: "Oct",
    day: 28,
    category: "UN & Global Observance",
    sdgGoals: [7, 12, 13],
    tagline: "Promoting Enterprise Decarbonization & Circularity",
    description: "Celebrated annually on the fourth Wednesday of October to encourage eco-friendly habits and sustainable corporate policies.",
    enterpriseAction: "Host a facility-wide Carbon Handprint Day, quantifying employee emission savings through remote work and green transit."
  },

  // NOVEMBER
  {
    id: "event-un-cop-climate-summit",
    title: "UN Climate Change Conference (COP)",
    date: "November 10 – 21",
    month: "Nov",
    day: 10,
    category: "Climate & Energy",
    sdgGoals: [13, 17],
    tagline: "Annual Global Climate Summit Under the UNFCCC",
    description: "Heads of state and global climate leaders assemble to assess progress in dealing with climate change and carbon border mechanisms.",
    enterpriseAction: "Evaluate corporate exposure to international carbon border adjustment mechanisms (EU CBAM) and renewable PPAs."
  },

  // DECEMBER
  {
    id: "event-national-pollution-control-day-india",
    title: "National Pollution Control Day (India)",
    date: "December 2",
    month: "Dec",
    day: 2,
    category: "Indian Statutory Compliance",
    sdgGoals: [3, 9, 12],
    tagline: "Honoring Bhopal Gas Tragedy Victims & Industrial Safety",
    description: "National day in India focused on industrial safety compliance, hazardous chemical handling, and air/water pollution mitigation.",
    enterpriseAction: "Conduct emergency hazardous chemical spill drills and inspect on-site Effluent Treatment Plants (ETP)."
  },
  {
    id: "event-world-soil-day",
    title: "World Soil Day",
    date: "December 5",
    month: "Dec",
    day: 5,
    category: "Water & Nature",
    sdgGoals: [2, 15],
    tagline: "Caring for Soils: Measure, Monitor, Manage",
    description: "Focusing attention on the importance of healthy soil and advocating for sustainable management of soil resources.",
    enterpriseAction: "Test composted cafeteria organic waste for nutrient and heavy metal safety before campus gardening application."
  },
  {
    id: "event-national-energy-conservation-day-india",
    title: "National Energy Conservation Day (India)",
    date: "December 14",
    month: "Dec",
    day: 14,
    category: "Climate & Energy",
    sdgGoals: [7, 13],
    tagline: "Bureau of Energy Efficiency (BEE) National Initiative",
    description: "Showcasing India's achievements in energy efficiency and conservation under the Ministry of Power.",
    enterpriseAction: "Perform ASHRAE Level II energy audits, transition factory lighting to smart IoT LEDs, and audit peak power factor."
  }
];

// Helper to generate Google Calendar Add URL
export function generateGoogleCalendarUrl(event: SustainabilityEvent): string {
  const year = new Date().getFullYear();
  const title = encodeURIComponent(event.title + " (EWS Sustainability Calendar)");
  const details = encodeURIComponent(
    `${event.tagline}\n\nDescription: ${event.description}\n\nEnterprise Action Blueprint: ${event.enterpriseAction}\n\nTracked by EWS Learning: https://ewslearning.com/calendar`
  );
  const location = encodeURIComponent("Worldwide / Corporate Campus");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
}
