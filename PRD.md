# 📄 Product Requirement Document (PRD)

# EWS Learning Platform: AI-Augmented Environmental Education & Corporate BRSR Compliance System

| **Document Metadata** | **Specification** |
| :--- | :--- |
| **Product Name** | EWS Learning Platform (`ewslearning.com`) |
| **Version** | `v2.4.0-Production` |
| **Author / Lead Architect** | Principal Technical Product Architect & Super Senior SDE |
| **Target Audience** | Enterprise Leadership, EHS Directors, HR Leads, Industrial Engineers, Product Engineering & DevOps |
| **Document Status** | Approved for Production Architecture |
| **Release Target** | Q3 2026 |

---

## 1. Executive Summary & Product Vision

### 1.1 Problem Statement
Modern enterprises face unprecedented regulatory pressure to comply with strict statutory environmental norms:
1. **The Compliance Penalty Trap**: The Securities and Exchange Board of India (SEBI) mandates comprehensive Business Responsibility and Sustainability Reporting (BRSR Core) for top-listed companies. In addition, the Central Pollution Control Board (CPCB) enforces strict Extended Producer Responsibility (EPR) mandates for plastic packaging, battery waste, and e-waste.
2. **The Green Workforce Capability Void**: Ground personnel, facility managers, and procurement officers lack practical, actionable knowledge in 5-stream waste segregation, industrial hazardous waste handling (HOWM 2016), and carbon Scope 1-3 auditing.
3. **Fragmented Learning Experience**: Traditional LMS platforms offer generic, text-heavy courses with zero industry relevance, no verifiable tamper-proof accreditation, and no audit-ready reporting for statutory auditors.

### 1.2 Product Vision & Value Proposition
**EWS Learning** is the premier AI-driven environmental education academy and statutory compliance platform in India and globally. It bridges corporate policy with shop-floor execution by delivering:
* **Interactive, Sector-Specific Curricula**: Masterclasses across Solid Waste Management, Corporate ESG & BRSR, Circular Economy & EPR, and Sustainable Workforces.
* **1-Click Statutory BRSR Evidence Generation**: Instant CSV/PDF audit evidence packs detailing workforce training hours and test scores for external auditors.
* **Autonomous AI Architecture**: Automated weekly sustainability news ingestion and blog synthesis alongside an AI PDF-to-Video course generation studio.
* **Tamper-Proof Credential Verification**: Publicly verifiable digital credentials with 1-click LinkedIn certification synchronization.

---

## 2. Target User Personas & User Journeys

```
                               ┌─────────────────────────────────────────┐
                               │       EWS User Ecosystem & Personas     │
                               └────────────────────┬────────────────────┘
                                                    │
        ┌───────────────────────────────────────────┼───────────────────────────────────────────┐
        ▼                                           ▼                                           ▼
 🏢 Corporate Enterprise HR / EHS          🎓 Industrial Plant Engineer / Student        🔴 EWS Directorate & Admin
 (e.g., Vikram Malhotra - EcoIndustries)     (e.g., Ajay Kushwaha - Plant Operations)     (e.g., Dr. Rajeshwar Rao - Director)
 ──────────────────────────────────────      ────────────────────────────────────────     ───────────────────────────────────────
 • Goals: Onboard employee cohorts,          • Goals: Complete video masterclasses,       • Goals: Review incoming enterprise
   track department completion %, export       pass situational compliance exams,           training leads, generate new courses
   SEBI BRSR audit evidence packs.             claim verifiable LinkedIn credentials.       from technical PDFs, publish blogs.
```

### 2.1 Persona 1: Enterprise Client (HR / EHS / Sustainability Director)
* **Needs**: High-volume workforce enrollment, department-level completion tracking, verifiable ESG audit evidence.
* **Key User Flow**:
  1. Signs in via Enterprise Client Portal (`/login` ➔ `/corporate`).
  2. Views live dashboard metrics (Active Batches, Completion Rate %, Landfill Diversion Rate).
  3. Bulk enrolls employee batches via corporate email paste.
  4. Clicks **"Export SEBI BRSR Evidence Pack (CSV)"** for statutory compliance filing.

### 2.2 Persona 2: Industrial Engineer / Student Learner
* **Needs**: Practical training, bite-sized video modules, downloadable SOP toolkits, verified certificates.
* **Key User Flow**:
  1. Enters Learner Room (`/dashboard` ➔ `/learn/[slug]`).
  2. Streams interactive video lessons with real-world case studies and downloadable SOP spreadsheets.
  3. Completes 5-question situational compliance knowledge check (requires 80%+ score).
  4. Unlocks tamper-proof certificate, adds to LinkedIn with 1-click, and shares verification URL (`/verify/[id]`).

### 2.3 Persona 3: EWS Directorate Administrator
* **Needs**: Inbound corporate lead management, automated news ingestion, AI PDF-to-Video course synthesis.
* **Key User Flow**:
  1. Navigates directly to secret URL (`/admin`).
  2. Manages B2B corporate inquiry pipeline (NEW ➔ CONTACTED ➔ PROPOSAL SENT ➔ ENROLLED).
  3. Uploads technical regulatory PDFs (e.g. CPCB Hazardous Waste guidelines) to auto-generate video course modules.
  4. Triggers autonomous weekly sustainability blog ingestion.

---

## 3. Regulatory Framework & Standards Alignment

The platform is designed around statutory compliance mandates in India and international markets:

| Regulatory Body / Standard | Mandatory Statutory Requirement | EWS Learning Feature Solution |
| :--- | :--- | :--- |
| **SEBI BRSR Core** | Principle 6 (Environment): GHG emissions, energy efficiency, waste management & employee training disclosures. | One-click exportable BRSR CSV/PDF evidence packs containing employee training hours and assessment scores. |
| **CPCB PWM Rules 2024** | Mandatory Extended Producer Responsibility (EPR) registration, plastic recycling quotas, and certificate reconciliation. | *Circular Economy & Plastic EPR* masterclass and live compliance checklists for PIBOs. |
| **HOWM Rules 2016** | Hazardous and Other Wastes Management: Form 10 manifest tracking and authorized TSDF dispatch. | Practical hazardous waste segregation training and SOP generator. |
| **BEE Energy Conservation** | Industrial energy audits, peak power factor optimization, and energy intensity reduction under the EC Act. | *National Energy Conservation Day* reminders and energy efficiency masterclasses. |
| **EU CBAM** | Carbon Border Adjustment Mechanism: Embedded carbon calculation for steel, aluminum, and chemical exports. | Scope 1, 2, and 3 carbon accounting training module. |
| **UN SDGs** | Agenda 2030 Sustainable Development Goals (SDGs 6, 7, 11, 12, 13, 14, 15). | Direct SDG mapping across all courses and Sustainability Calendar events. |

---

## 4. System Architecture & Portal Specifications

```
 ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                   EWS 4-TIER PORTAL ARCHITECTURE                                 │
 ├─────────────────┬─────────────────┬─────────────────┬────────────────────────────────────────────┤
 │ 🌐 PUBLIC PORTAL│ 🏢 CORPORATE HUB│ 🎓 LEARNER ROOM │ 🔐 SECRET ADMIN CMS                        │
 ├─────────────────┼─────────────────┼─────────────────┼────────────────────────────────────────────┤
 │ • / (Homepage)  │ • /corporate    │ • /dashboard    │ • /admin (Secret URL Only)                 │
 │ • /programs/*   │ • Team Rosters  │ • Video Player  │ • Inbound Lead Pipeline (CRM)              │
 │ • /blog/*       │ • Dept Analytics│ • Exam Engine   │ • AI PDF-to-Video Studio                   │
 │ • /calendar     │ • BRSR Export   │ • Certificates  │ • Automated RSS Blog Ingestion             │
 │ • /verify/:id   │ • Bulk Invites  │ • SOP Toolkits  │ • Program Pricing & Curricula Manager      │
 └─────────────────┴─────────────────┴─────────────────┴────────────────────────────────────────────┘
```

### 4.1 Server-Side Middleware & RBAC Security Layer (`src/middleware.ts`)
* **Isolated Role Boundaries**:
  * `GUEST` ➔ Public browsing permitted on `/`, `/programs`, `/blog`, `/calendar`, `/verify/*`, `/services`, `/company`, `/contact`.
  * `STUDENT` ➔ Authorized access to `/dashboard` and `/learn/*`. Direct attempts to access `/admin` or `/corporate` are intercepted and redirected with `HTTP 307`.
  * `CORPORATE_CLIENT` ➔ Authorized access to `/corporate`, `/dashboard`, and `/learn/*`.
  * `ADMIN` ➔ Universal access to `/admin` and all portals.
* **API Protection**: Direct backend requests to `/api/courses/*` and `/api/blog/generate` require an Admin Bearer Token or valid session cookie; unauthorized requests return `HTTP 403 Forbidden`.

---

## 5. Functional Feature Requirements (FR)

### FR-01: AI PDF-to-Video Course Deconstruction Studio
* **Requirement**: Enable administrators to upload technical PDF manuals or paste regulatory notes and automatically deconstruct them into 3 structured learning modules with 5 video lessons, summaries, quizzes, and downloadable spreadsheets.
* **Inputs**: PDF file / Raw text notes, Target Sector, Difficulty Level.
* **Outputs**: Auto-generated structured course schema saved directly into `PROGRAMS` and persistent database storage.

### FR-02: Autonomous Weekly Sustainability News & Blog Synthesis Engine
* **Requirement**: Fetch global wire feeds (UNEP, CPCB, SEBI, EU CBAM) every Monday at 9:00 AM, filter for high-impact environmental regulatory updates, synthesize long-form markdown articles with source citations, and publish automatically without human intervention.
* **Endpoint**: `/api/cron/generate-weekly-blog` (Protected with `CRON_SECRET`).
* **UI Features**: Categorized tags, search filters, read-time calculator, verified official source links.

### FR-03: EcoMentor 24/7 AI Regulatory & Compliance Copilot
* **Requirement**: Floating AI copilot on all pages trained on Indian environmental law (CPCB Plastic EPR, HOWM 2016 Form 10, SEBI BRSR formulas, EU CBAM).
* **Capabilities**: Answers employee compliance questions, suggests SOPs, and directs users to relevant course modules.

### FR-04: Public Tamper-Proof Certificate Registry & 1-Click LinkedIn Credential Sync
* **Requirement**: Every student who scores 80%+ on a certification exam is awarded a unique digital certificate with a verifiable alphanumeric ID (e.g. `EWS-2025-WM-8492`).
* **Public URL**: `/verify/[id]` displays candidate name, program, issuance date, distinction badge, and official accreditation seal.
* **LinkedIn Integration**: 1-Click **"Add to LinkedIn Profile"** button pre-filled with certification name, issuing organization (`EWS Learning`), issuance date, and verification URL.

### FR-05: Interactive Certification Exam & Knowledge Check Scoring Engine
* **Requirement**: 5 situational compliance multiple-choice questions per course.
* **Rules**: Real-time scoring calculation. 80%+ score unlocks certificate modal with celebration confetti; scores below 80% prompt review with instant feedback.

### FR-06: Annual Sustainability Calendar & 30% Right Landing Page Widget
* **Requirement**: Registry of 20+ global environmental observances (Earth Day, Water Day, Zero Waste Day, Ozone Day, COP Summit) and Indian statutory deadlines (CPCB Plastic EPR, National Pollution Control Day, BEE Energy Conservation Day).
* **Capabilities**:
  * Month dropdown and category filters.
  * 1-Click **"Add to Google Calendar"** per event.
  * 1-Click **"Export All Dates (.ICS)"** for Outlook, Apple Calendar, and Google Calendar.
  * Integrated **30% right-side vertical glance widget** on the homepage.

### FR-07: B2B Enterprise Client Portal & BRSR Evidence Pack Generator
* **Requirement**: Corporate managers can track team progress across departments (Plant Operations, EHS, Procurement, Executive).
* **Export Capability**: Instant 1-click download of **`EWS_Corporate_BRSR_Compliance_Audit_Pack.csv`** formatted for SEBI BRSR Principle 6 reporting.

---

## 6. Non-Functional Requirements (NFR)

```
 ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                               NON-FUNCTIONAL REQUIREMENTS (NFR) MATRIX                           │
 ├─────────────────┬─────────────────┬─────────────────┬─────────────────┬──────────────────────────┤
 │ PERFORMANCE     │ SECURITY        │ RELIABILITY     │ ACCESSIBILITY   │ SEO & WEB VITALS         │
 ├─────────────────┼─────────────────┼─────────────────┼─────────────────┼──────────────────────────┤
 │ • Sub-1.2s LCP  │ • Zero-Trust IAM│ • 99.95% Uptime │ • WCAG 2.1 AA   │ • JSON-LD Schema.org     │
 │ • Zero CLS      │ • HTTP-Only JWT │ • PgBouncer     │ • Screen Reader │ • Dynamic OpenGraph      │
 │ • <50ms INP     │ • OWASP Top 10  │   Pooler        │   Aria Labels   │ • Dynamic XML Sitemap    │
 │ • Edge Caching  │ • Rate Limiting │ • Auto DB Backup│ • Contrast >=4.5│ • Automated Robots.txt   │
 └─────────────────┴─────────────────┴─────────────────┴─────────────────┴──────────────────────────┘
```

### 6.1 Performance & Core Web Vitals
* **Largest Contentful Paint (LCP)**: `< 1.2s` on 4G connections.
* **Cumulative Layout Shift (CLS)**: `0.00` with strict image aspect ratios and font preloading.
* **Interaction to Next Paint (INP)**: `< 50ms` via lightweight React hydration.

### 6.2 Security & Data Privacy
* **Transport & Storage Encryption**: 256-Bit SSL/TLS 1.3 in transit; AES-256 at rest.
* **Authentication Security**: Cryptographically signed HTTP-Only, Secure, SameSite=Lax cookies.
* **Sanitization**: Prevention of XSS via sanitized markdown rendering and parameterized SQL queries via Prisma ORM.

### 6.3 Scalability & High Availability
* **Connection Pooling**: PgBouncer pooling supporting up to 5,000 concurrent employee assessment submissions.
* **Edge Caching**: Cloudflare Anycast CDN caching static assets, OpenGraph images, and blog posts via Next.js ISR (Incremental Static Regeneration).

---

## 7. Data Models & Entity Relationship Overview

```
 ┌──────────────┐          ┌────────────────┐          ┌──────────────┐
 │ Organization │ 1──────* │      User      │ 1──────* │  Enrollment  │
 └──────────────┘          └────────────────┘          └──────┬───────┘
                                                              │ 1
                                                              │
                                                              ▼ 1
 ┌──────────────┐ 1──────* ┌────────────────┐          ┌──────────────┐
 │   Program    │          │     Module     │ 1──────* │ Certificate  │
 └──────────────┘          └──────┬─────────┘          └──────────────┘
                                  │ 1
                                  │
                                  ▼ *
                           ┌────────────────┐
                           │     Lesson     │
                           └────────────────┘
```

### 7.1 Database Entities (PostgreSQL / Prisma)
* **`User`**: `id`, `name`, `email`, `passwordHash`, `role` (`ADMIN | CORPORATE_CLIENT | STUDENT | GUEST`), `organization`, `department`, `avatar`, `createdAt`.
* **`Program`**: `id`, `slug`, `title`, `tagline`, `description`, `sector`, `mode`, `duration`, `priceINR`, `priceUSD`, `highlights`, `learningOutcomes`, `curriculum`.
* **`Module` & `Lesson`**: `id`, `programId`, `title`, `duration`, `videoUrl`, `summary`, `order`.
* **`Enrollment`**: `id`, `userId`, `programId`, `progress`, `status` (`ENROLLED | IN_PROGRESS | COMPLETED`), `assessmentScore`.
* **`Certificate`**: `id`, `certificateId`, `studentName`, `courseTitle`, `enrollmentId`, `issuedAt`, `verifyUrl`.
* **`Inquiry`**: `id`, `name`, `email`, `phone`, `organization`, `programInterest`, `teamSize`, `mode`, `status` (`NEW | CONTACTED | PROPOSAL_SENT | ENROLLED`).
* **`BlogPost`**: `id`, `slug`, `title`, `category`, `readTime`, `publishedAt`, `author`, `sourceName`, `sourceUrl`, `summary`, `content`, `tags`.

---

## 8. Success Metrics & Key Performance Indicators (KPIs)

| Metric Category | Target KPI | Business Impact |
| :--- | :--- | :--- |
| **Workforce Impact** | 50,000+ Certified Sustainable Professionals by Q4 2026 | Fulfilling India's green industrial skills mandate. |
| **Landfill Diversion** | 10,000+ Metric Tonnes Diverted via trained plant protocols | Demonstrable physical environmental impact. |
| **BRSR Compliance Velocity** | Under 60 seconds to export complete statutory audit evidence | Significant reduction in corporate compliance audit overhead. |
| **Course Completion Rate** | > 88% Course Completion & Exam Pass Rate | Industry-leading engagement through interactive video & toolkits. |
| **Organic Discovery (SEO)** | 100,000+ Monthly Organic Visits to Blog & Sustainability Calendar | Zero-cost inbound corporate lead acquisition. |

---

## 9. Phased Execution Roadmap

```
 ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                  PHASED EXECUTION ROADMAP                                        │
 ├─────────────────┬─────────────────┬─────────────────┬─────────────────┬──────────────────────────┤
 │ PHASE 1 (COMPL) │ PHASE 2 (COMPL) │ PHASE 3 (ACTIVE)│ PHASE 4 (Q4 '26)│ PHASE 5 (Q1 '27)         │
 ├─────────────────┼─────────────────┼─────────────────┼─────────────────┼──────────────────────────┤
 │ • Next.js 14    │ • AI Blog Engine│ • Edge Middle-  │ • Live Razorpay/│ • Enterprise SSO         │
 │   Modular Core  │ • PDF-to-Video  │   ware SSR Guard│   Stripe Gateway│   (Okta / Azure AD)      │
 │ • 4 Core Courses│ • EcoMentor AI  │ • Sustainability│ • PostgreSQL DB │ • Native Mobile App      │
 │ • Interactive   │ • Verified Cert │   Calendar 30%  │   Migration     │ • Multi-Language Support │
 │   Exams         │   Registry      │ • JSON-LD Schema│ • Production CI │   (Hindi, Tamil, Marathi)│
 └─────────────────┴─────────────────┴─────────────────┴─────────────────┴──────────────────────────┘
```

---

## 10. Conclusion & Approval

This Product Requirement Document serves as the single source of truth for the engineering, product, and compliance teams building the production-grade **EWS Learning Platform**. All technical features adhere strictly to enterprise security, zero-trust RBAC isolation, high-performance SEO standards, and statutory Indian & global environmental compliance frameworks.
