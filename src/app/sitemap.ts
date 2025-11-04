import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://convex.world";
  const buildDate = new Date(); // Evaluated once at build time?

  return [
    {
      url: baseUrl,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/ecosystem`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.8,
    }

  ];
}

