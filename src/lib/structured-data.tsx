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

function resolveTitle(title: Metadata["title"]): string {
  if (!title) return "Convex";
  if (typeof title === "string") return title;
  if ("default" in title) return title.default ?? "Convex";
  if ("absolute" in title) return title.absolute;
  return "Convex";
}

function buildSchema(
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

/**
 * Renders a <script type="application/ld+json"> tag from a page's
 * existing Next.js `metadata` export.
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
  const schema = buildSchema(type, metadata, path);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
