import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { EcoMentorCopilot } from "@/components/eco-mentor";
import { AuthProvider } from "@/context/auth-context";
import { getEducationalOrgSchema } from "@/lib/schema-generator";
import "./globals.css";

export const metadata: Metadata = {
  title: "EWS Learning | AI-Driven Environmental Education & Corporate Sustainability",
  description: "Leading academy for Waste Management Training, Corporate ESG, Extended Producer Responsibility (EPR), and Sustainable Workforces in India and globally.",
  keywords: [
    "Environmental Education",
    "Waste Management Training",
    "Corporate Sustainability",
    "BRSR Compliance",
    "Recycling Programs",
    "EWS Learning",
    "Green Skills"
  ],
  authors: [{ name: "EWS Learning" }],
  openGraph: {
    title: "EWS Learning | Environmental Education for Everyone, Everywhere",
    description: "Empowering sustainable futures through practical training, corporate compliance, and green workforce development.",
    url: "https://ewslearning.com",
    siteName: "EWS Learning",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getEducationalOrgSchema();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <EcoMentorCopilot />
        </AuthProvider>
      </body>
    </html>
  );
}
