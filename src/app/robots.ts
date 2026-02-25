import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://convex.world";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    // @ts-expect-error — Next.js types don't include custom directives yet
    "LLMs-Txt": `${baseUrl}/llms.txt`,
  };
}

