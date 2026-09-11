import { Program } from "@/data/programs";
import { BlogPost } from "@/data/blogs";
import { SustainabilityEvent } from "@/data/sustainability-calendar";

export function getEducationalOrgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "EWS Learning",
    "alternateName": "Environmental & Waste Sustainability Learning Academy",
    "url": "https://ewslearning.com",
    "logo": "https://ewslearning.com/logo.png",
    "description": "Leading academy for Solid Waste Management Training, Corporate ESG Strategy, Extended Producer Responsibility (EPR), and Sustainable Workforces in India and globally.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Gurugram",
      "addressRegion": "Haryana",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.linkedin.com/company/ews-learning",
      "https://twitter.com/ewslearning"
    ],
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "4999",
      "highPrice": "24999",
      "offerCount": "4"
    }
  };
}

export function getCourseSchema(program: Program) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": program.title,
    "description": program.description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "EWS Learning",
      "sameAs": "https://ewslearning.com"
    },
    "educationalLevel": program.level,
    "timeRequired": program.duration,
    "offers": [
      {
        "@type": "Offer",
        "category": "Paid",
        "price": program.priceINR.toString(),
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "url": `https://ewslearning.com/programs/${program.slug}`
      },
      {
        "@type": "Offer",
        "category": "Paid",
        "price": program.priceUSD.toString(),
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": `https://ewslearning.com/programs/${program.slug}`
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": program.rating.toString(),
      "reviewCount": (program.reviewCount || 48).toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "instructor": {
      "@type": "Person",
      "name": program.instructor?.name || "EWS Senior Faculty",
      "jobTitle": program.instructor?.role || "Environmental & Sustainability Lead"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": program.mode === "Online" ? "online" : "blended",
      "courseWorkload": program.duration
    }
  };
}

export function getArticleSchema(blog: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": blog.title,
    "description": blog.excerpt,
    "datePublished": blog.publishedAt,
    "dateModified": blog.publishedAt,
    "author": {
      "@type": "Organization",
      "name": blog.author?.name || "EWS Regulatory Intelligence Desk",
      "url": "https://ewslearning.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EWS Learning",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ewslearning.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ewslearning.com/blog/${blog.slug}`
    },
    "citation": blog.sourceCitations?.[0] || "https://cpcb.nic.in"
  };
}

export function getEventSchema(event: SustainabilityEvent) {
  const currentYear = new Date().getFullYear();
  const monthMap: Record<string, string> = {
    Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
    Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
  };
  const monthStr = monthMap[event.month] || "03";
  const dayStr = event.day.toString().padStart(2, "0");
  const isoDate = `${currentYear}-${monthStr}-${dayStr}`;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": `${event.tagline} - ${event.description}`,
    "startDate": isoDate,
    "endDate": isoDate,
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "organizer": {
      "@type": "Organization",
      "name": "United Nations / EWS Learning",
      "url": "https://ewslearning.com/calendar"
    }
  };
}
