import type { Metadata } from "next";

const BASE_URL = "https://convex.world";

const PUBLISHER = {
  "@type": "Organization",
  name: "Convex",
  url: BASE_URL,
  logo: `${BASE_URL}/images/convex.svg`,
};

type SchemaType =
  | "WebSite"
  | "WebPage"
  | "WebApplication"
  | "AboutPage";

export function resolveTitle(title: Metadata["title"]): string {
  if (!title) return "Convex";
  if (typeof title === "string") return title;
  if ("default" in title) return title.default ?? "Convex";
  if ("absolute" in title) return title.absolute;
  return "Convex";
}

export function buildSchema(
  type: SchemaType,
  metadata: Metadata,
  path: string,
): Record<string, unknown> {
  const name = resolveTitle(metadata.title);
  const description = metadata.description ?? "";
  const url = `${BASE_URL}${path}`;

  const base = {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url,
    publisher: PUBLISHER,
  };

  if (type === "WebSite") {
    return {
      ...base,
      potentialAction: {
        "@type": "SearchAction",
        target: `https://docs.convex.world/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };
  }

  if (type === "WebApplication") {
    return {
      ...base,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
    };
  }

  return base;
}

export function buildBreadcrumbList(
  name: string,
  path: string,
): Record<string, unknown> | null {
  // Homepage has no breadcrumb trail
  if (path === "/") return null;

  const items: Record<string, unknown>[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name,
      item: `${BASE_URL}${path}`,
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

/**
 * Renders structured data and a canonical link from a page's
 * existing Next.js `metadata` export.
 *
 * Emits:
 * - Page-type JSON-LD schema (WebPage, WebSite, etc.)
 * - BreadcrumbList JSON-LD schema (all pages except homepage)
 * - <link rel="canonical"> for the page URL
 *
 * Usage (in any page that already exports `metadata`):
 *
 *   <StructuredData type="WebPage" metadata={metadata} path="/vision/" />
 */
export default function StructuredData({
  type,
  metadata,
  path,
}: {
  type: SchemaType;
  metadata: Metadata;
  path: string;
}) {
  const name = resolveTitle(metadata.title);
  const pageSchema = buildSchema(type, metadata, path);
  const breadcrumbSchema = buildBreadcrumbList(name, path);
  const canonicalUrl = `${BASE_URL}${path}`;

  const schemas = breadcrumbSchema
    ? [pageSchema, breadcrumbSchema]
    : [pageSchema];

  return (
    <>
      <link rel="canonical" href={canonicalUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
    </>
  );
}
