import { MetadataRoute } from "next";
import { PROGRAMS } from "@/data/programs";
import { INITIAL_BLOGS } from "@/data/blogs";
import { SUSTAINABILITY_EVENTS } from "@/data/sustainability-calendar";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ewslearning.com";
  const lastModified = new Date();

  // 1. Core Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/programs`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/calendar`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/corporate`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/company`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 2. Programmatic Course Masterclasses
  const programRoutes: MetadataRoute.Sitemap = PROGRAMS.map((prog) => ({
    url: `${baseUrl}/programs/${prog.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. Programmatic Weekly Sustainability Articles
  const blogRoutes: MetadataRoute.Sitemap = INITIAL_BLOGS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...programRoutes, ...blogRoutes];
}
